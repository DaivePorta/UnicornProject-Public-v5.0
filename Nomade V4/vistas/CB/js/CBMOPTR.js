var CBLOPTR = function () {

    var fnCargarBandeja = function () {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CB/ajax/CBMOPTR.ASHX?OPCION=0&CODIGO=",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
                Desbloquear("ventana");
            },
            error: function (result) {
                alertCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    }

    var fnFillBandeja = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '15%');
                    }
                },
                {
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('width', '40%');
                    }
                },
                {
                    data: "NOMBRE_COMERCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '30%');
                    }
                }, {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('width', '15%');
                    }
                }
            ]
        }

        oTableLista = iniciaTabla('tblLista', parms);

        $("#tblLista").removeAttr("style");

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('#tblLista tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableLista.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableLista.fnGetPosition(this);
                var row = oTableLista.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=CBMOPTR&codigo=' + cod;
            }
        });
    };

    return {
        init: function () {
            fnFillBandeja();
            fnCargarBandeja();
        }
    };
}();

var CBMOPTR = function () {

    var plugins = function () {
        $('#cboEmpresaMN, #cboEmpresaME, #cboEmpresaNuevaCuentaMN, #cboNuevaCuentaMN, #cboEmpresaNuevaCuentaME, #cboNuevaCuentaME').select2();
        $('#tblMarcasOperador').DataTable().columns([0]).visible(false);
        $('#tblMarcasOperador tbody').on('click', '.eliminar', function () {
            var codigo = $('#tblMarcasOperador').DataTable().row($(this).parents('tr')).data().CODIGO_MARCA;
            var index = -1;
            for (var i in marcasTarjetaOperador) {
                if (marcasTarjetaOperador[i].CODIGO_MARCA === codigo) {
                    index = i;
                    break;
                }
            }
            marcasTarjetaOperador.splice(index, 1);
            listarMarcasTabla();
        });

        $('#tblMarcasOperador tbody').on('click', '.cambiaEstado', function () {
            var pos = tablaMarcasOperador.api(true).row($(this).parents("tr")[0]).index();
            var row = tablaMarcasOperador.fnGetData(pos);
            actualizarEstadoOperadorMarca(row.CODIGO_REL, row.ESTADO.substring(0, 1) == 'A' ? 'I' : 'A');
        });
    };

    var cargaInicial = function () {
        var codigo = ObtenerQueryString('codigo');
        $('#cboEmpresaNuevaCuentaMN').on('change', function () {
            cargarComboNuevaCuentaMN();
        });

        $('#cboEmpresaNuevaCuentaME').on('change', function () {
            cargarComboNuevaCuentaME();
        });

        $('#btnNuevaCuentaMN').click(function (e) {
            cargarEmpresasCuenta('#cboEmpresaNuevaCuentaMN');
            $('#cboEmpresaNuevaCuentaMN').select2('val', $('#ctl00_hddctlg').val()).change();
            $('#divCuentaMN').modal('show');
        });

        $('#btnNuevaCuentaME').click(function (e) {
            cargarEmpresasCuenta('#cboEmpresaNuevaCuentaME');
            $('#cboEmpresaNuevaCuentaME').select2('val', $('#ctl00_hddctlg').val()).change();
            $('#divCuentaME').modal('show');
        });

        $('#txtFechaNuevaCuentaMN, #txtFechaNuevaCuentaME').datepicker({ format: 'dd/mm/yyyy' });

        if (codigo !== undefined) {
            $('#liCuentaMN, #liCuentaME, #liComisiones').removeClass('hidden');
            $('#btnGrabar').css('display', 'none');
            $('#btnActualizar').css('display', 'inline-block');
            $('#info').css('display', 'block');
        } else {
            $('#btnGrabar').css('display', 'inline-block');
            $('#btnActualizar').css('display', 'none');
            
        }

        cargarComisionesOperador();

    };

    var autocompletarPersona = function (v_ID, v_value) {
        var txtResp = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/CB/ajax/CBMOPTR.ashx?OPCION=JURIDICAS",
            data: { q: '' },
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    txtResp.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].RazonSocial);
                                obj += '{ "PIDM" : "' + datos[i].PIDM + '", "RAZONSOCIAL" : "' + datos[i].RazonSocial + '", "RAZO_COME" : "' + datos[i].NombreComer + '", "RUC" : "' + datos[i].NroDocIdent + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZONSOCIAL] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfPIDM').val(map[item].PIDM);
                            $('#txtNombreComercial').val(map[item].RAZO_COME);
                            $('#txtRuc').val(map[item].RUC);
                            return item;
                        }
                    });
                    txtResp.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (txtResp.val().length <= 0) {
                            $('#hfPIDM').val('');
                            $('#txtNombreComercial').val('');
                        }
                    });
                }
            },
            error: function () {
                alertCustom('Error al listar personas jurídicas');
            }
        });
    };

    var cargarMarcasTarjeta = function () {
        $.ajax({
            type: "post",
            url: "vistas/CB/ajax/CBMOPTR.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    marcasTarjeta = datos;
                    listarMarcasCombo();
                }
                $('#cboMarca').select2();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresaMN, #cboEmpresaME');
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=0",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).html('<option value="">TODAS</option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function () {
                alertCustom('Error al listar empresas.');
            }
        });
    };
    
    var cargarOperador = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/CB/ajax/CBMOPTR.ashx?OPCION=0&CODIGO=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $('#hfOPTR_CODE').val(datos[0].CODIGO);
                        $('#hfPIDM').val(datos[0].PIDM);
                        $('#txtPersona').val(datos[0].RAZON_SOCIAL);
                        $('#txtNombreComercial').val(datos[0].NOMBRE_COMERCIAL);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargaInicial();
            cargarOperador();
            autocompletarPersona('#txtPersona', '');
            cargarMarcasOperador();
            cargarMarcasTarjeta();
            cargarCuentas();
            cargarEmpresas();
            listarCuentasMN();
            listarCuentasME();
        }
    };
}();

var marcasTarjeta = []; //marcas de tarjeta para el combo
var marcasTarjetaOperador = []; //marcas de tarjeta del operador
var cuentas = [];

String.prototype.esFechaMayorQue = function (fecha) {
    var valoresFecha = this.split('/');
    var mayor = true;
    if (fecha != null) {
        var valoresFecha2 = fecha.split('-').reverse();
        mayor = (valoresFecha[2] > valoresFecha2[2]);

        if (!mayor) {
            mayor = (valoresFecha[2] == valoresFecha2[2]);
            if (mayor) {
                mayor = (valoresFecha[1] > valoresFecha2[1]);
                if (!mayor) {
                    mayor = (valoresFecha[1] == valoresFecha2[1]);
                    if (mayor) {
                        mayor = (valoresFecha[0] > valoresFecha2[0]);
                    }
                }
            }
        }
    }
    return mayor;
}

var contieneMarcaOperador = function (obj) {
    for (var i = 0; i < marcasTarjetaOperador.length; i++) {
        if (marcasTarjetaOperador[i].CODIGO_MARCA == obj.CODIGO) {
            return true;
        }
    }
    return false;
};

Array.prototype.contains = function (obj) {
    if (this.length == 0 || this == undefined) {
        return false;
    } else {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) { return true; }
        }
        return false;
    }
};

var listarCuentasMN = function () {
    var codigo = ObtenerQueryString("codigo");
    if (codigo !== undefined) {
        var cuentasMN = [];
        for (var i = 0; i < cuentas.length; i++) {
            if (cuentas[i].MONE_CODE === '0002') {
                cuentasMN.push(cuentas[i]);
            }
        }
        $('#tblCuentasMN').DataTable().destroy();
        $('#tblCuentasMN').DataTable({
            data: cuentasMN,
            columns: [
                { data: 'DESC_CUENTA' },
                {
                    data: 'VIGENCIA',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        var fecha = $(td).text().split('-');
                        fecha = fecha[0] + '/' + fecha[1] + '/' + fecha[2];
                        $(td).text(fecha);
                    }
                },
                {
                    data: 'EMPRESA',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'CTLG_CODE',
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'ESTADO',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'CODIGO',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        var codigo = $(td).text();
                        $(td).html('');
                        $(td).html('<a href="javascript:cambiarEstadoCuenta(\'' + codigo + '\')" class="btn green"><i class="icon-refresh"></i></a>');
                    }
                }
            ]
        });

        $('#cboEmpresaMN').on('change', function () {
            $('#tblCuentasMN').DataTable().column(3).search($(this).val()).draw();
        });

        $('#cboEmpresaMN').select2('val', '').change();
    }
};

var listarCuentasME = function () {
    var codigo = ObtenerQueryString("codigo");
    if (codigo !== undefined) {
        var cuentasME = [];
        for (var i = 0; i < cuentas.length; i++) {
            if (cuentas[i].MONE_CODE === '0003') {
                cuentasME.push(cuentas[i]);
            }
        }
        $('#tblCuentasME').DataTable().destroy();
        $('#tblCuentasME').DataTable({
            data: cuentasME,
            columns: [
                { data: 'DESC_CUENTA', },
                {
                    data: 'VIGENCIA',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                        var fecha = $(td).text().split('-');
                        fecha = fecha[0] + '/' + fecha[1] + '/' + fecha[2];
                        $(td).text(fecha);
                    }
                },
                {
                    data: 'EMPRESA',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'CTLG_CODE',
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'ESTADO',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: 'CODIGO',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        var codigo = $(td).text();
                        $(td).html('');
                        $(td).html('<a href="javascript:cambiarEstadoCuenta(\'' + codigo + '\')" class="btn green"><i class="icon-refresh"></i></a>');
                    }
                }
            ]
        });

        $('#cboEmpresaME').on('change', function () {
            $('#tblCuentasME').DataTable().column(3).search($(this).val()).draw();
        });

        $('#cboEmpresaME').select2('val', '').change();
    } else {
        $('#p_cuentas_me').css('display', 'none');
    }
};

var cargarCuentas = function () {
    var codigo = ObtenerQueryString('codigo');
    if (codigo !== undefined) {
        $.ajax({
            type: "post",
            url: 'vistas/CB/ajax/CBMOPTR.ASHX?OPCION=8&CODIGO=' + codigo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== "" && datos !== null) {
                    cuentas = datos;
                }
            },
            error: function (msg) {
                alertCustom("Error al obtener Cuentas del Operador Actual");
            }
        });
    }
};

var cargarEmpresasFiltro = function (select) {
    var codigo = ObtenerQueryString('codigo');
    if (codigo != undefined) {
        selectEmpresa = $(select);
        var v_Usuario_Session = $('#ctl00_txtus').val();
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=4&USUA_ID=" + v_Usuario_Session,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEmpresa.empty();
                if (datos != "" && datos != null) {
                    selectEmpresa.append('<option value="Todas">Todas</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                else {
                    selectEmpresa.append('<option></option>');
                }
            },
            error: function (msg) {
                alertCustom("Error al obtener lista de Empresa.");
            }
        });
        selectEmpresa.select2();
    }
};

var cargarEmpresasCuenta = function (select) {
    var codigo = ObtenerQueryString('codigo');
    if (codigo != undefined) {
        selectEmpresa = $(select);
        var v_Usuario_Session = $('#ctl00_txtus').val();
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=4&USUA_ID=" + v_Usuario_Session,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEmpresa.html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function () {
                alertCustom("Error al obtener lista de Empresa.");
            }
        });
    }
};

var cargarMarcasOperador = function () {
    var codigo = ObtenerQueryString('codigo');
    if (codigo !== undefined) {
        $.ajax({
            type: "post",
            url: "vistas/CB/ajax/CBMOPTR.ashx?OPCION=3&CODIGO=" + codigo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null) {
                    marcasTarjetaOperador = data;
                    listarMarcasTabla();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
};

var cargarComisionesOperador = function () {
    $($(".add-on").siblings("input")).css("text-align", "right");
    var codigo = ObtenerQueryString('codigo');
    if (codigo === undefined) {
        return;
    }

    var comisionesoperador = "";
    $.ajax({
        type: 'post',
        url: 'vistas/CB/ajax/CBMCMOP.ashx',
        async: false,
        data: { OPCION: 'S', CODIGO: "", OPERADOR: codigo }
    }).done(function (data) {
        if (isEmpty(data))
            return;
        $("#txtcdebito").val(parseFloat(data[0].COMISION_TOTAL_DEBITO).toFixed(2));
        $("#txtccredito").val(parseFloat(data[0].COMISION_TOTAL_CREDITO).toFixed(2));
        $("#txtcigv").val(parseFloat(data[0].IGV).toFixed(2));
        $("#txtcemisores").val(parseFloat(data[0].COMISION_EMISORES).toFixed(2));
        $("#txtxoperadores").val(parseFloat(data[0].COMISION_OPERADOR).toFixed(2));
        comisionesoperador = data[0].CODIGO;
        });
    if (comisionesoperador !== "")
        $("#editarComisiones").click(function () { window.open('?f=CBMCMOP&codigo=' + comisionesoperador,"_blank"); });
};

var crearCuentaOperadorMarca = function (codigo, CTLG_CODE, CUEN_CODE, CUEN_TIPO, VIGENCIA, panel_bloquear) {
    var data = new FormData();
    data.append('OPCION', '7');
    data.append('CODIGO', codigo);
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('CUEN_CODE', CUEN_CODE);
    data.append('CUEN_TIPO', CUEN_TIPO);
    data.append('VIGENCIA', VIGENCIA);

    Bloquear(panel_bloquear);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CB/ajax/CBMOPTR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
    .success(function (res) {
        Desbloquear(panel_bloquear);
        if (res != null) {
            if (res == 'OK') {
                exito();
                $('#tblCuentasMN').DataTable().destroy();
                $('#tblCuentasME').DataTable().destroy();
                cargarCuentas();
                listarCuentasMN();
                listarCuentasME();
            } else {
                alert('Cuenta ya establecida');
            }
        }
    })
    .error(function () {
        Desbloquear(panel_bloquear);
        alert("Error al grabar Nuevo Operador de Tarjeta. Por favor intente nuevamente.");
    });
};

var listarMarcasCombo = function () {
    $('#cboMarca').html('<option></option>');
    for (var i = 0; i < marcasTarjeta.length; i++) {
        if (!contieneMarcaOperador(marcasTarjeta[i])) {
            $('#cboMarca').append('<option value="' + i + '">' + marcasTarjeta[i].MARCA + '</option>');
        }
    }
};

var listarMarcasTabla = function () {
    $('#tblMarcasOperador').DataTable().destroy();
    tablaMarcasOperador = $('#tblMarcasOperador').dataTable({
        data: marcasTarjetaOperador,
        columns: [
            { data: 'CODIGO_MARCA', visible: false },
            { data: 'MARCA' },
            { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
            {
                data: 'NUEVO', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'center').html((cellData === 'NO' ? '<a class="btn green cambiaEstado"><i class="icon-refresh"></i></a>' : '<a class="btn red eliminar"><i class="icon-remove"></i></a>'));
                }
            }
        ]
    });

 

};

var listarMarcasTarjetaOperadorCombo = function (select) {
    $(select).empty();
    for (var i = 0; i < marcasTarjetaOperador.length; i++) {
        var marca = marcasTarjetaOperador[i];
        $(select).append('<option value="' + marca.CODIGO_REL + '">' + marca.MARCA + '</option>');
    }
    $(select).select2();
};

var agregarNuevaMarca = function () {
    var marca = marcasTarjeta[$('#cboMarca').val()];
    if (!marcasTarjetaOperador.contains(marca)) {
        marca.NUEVO = "SI";
        marca.CODIGO_MARCA = marca.CODIGO;
        marca.ESTADO = 'NO AGREGADO';
        marcasTarjetaOperador.push(marca);
        listarMarcasTabla();
        $('#cboMarca').select2('val', '');
    } else {
        alertCustom('La Marca de Tarjeta ya está agregada.');
    }
};

var establecerMN = function () {
    if (vErrorsNotMessage(['cboEmpresaNuevaCuentaMN', 'cboNuevaCuentaMN', 'txtFechaNuevaCuentaMN'])) {
        var mayor = true;
        for (var i = 0; i < cuentas.length; i++) {
            if (cuentas[i].TIPO == 'MN') {
                mayor = ($('#txtFechaNuevaCuentaMN').val().esFechaMayorQue(cuentas[i].VIGENCIA));
            }
        }
        if (mayor) {
            var codigo = ObtenerQueryString('codigo');
            var CTLG_CODE = $('#cboEmpresaNuevaCuentaMN').val();
            var CUEN_CODE = $('#cboNuevaCuentaMN').val();
            var fechaVigencia = $('#txtFechaNuevaCuentaMN').val().split('/').reverse().join('-');

            crearCuentaOperadorMarca(codigo, CTLG_CODE, CUEN_CODE, 'MN', fechaVigencia, 'p_cuentas_mn');
            oTablaCuentasMN.DataTable().destroy();
            cargarCuentas();
            listarCuentasMN();
            $("#divCuentaMN").modal('hide');
        } else {
            alert('Ingrese una fecha de Vigencia válida');
        }
    }
};

var establecerME = function () {
    if (vErrorsNotMessage(['cboEmpresaNuevaCuentaME', 'cboNuevaCuentaME', 'txtFechaNuevaCuentaME'])) {
        var mayor = true;
        for (var i = 0; i < cuentas.length; i++) {
            if (cuentas[i].TIPO == 'ME') {
                mayor = ($('#txtFechaNuevaCuentaME').val().esFechaMayorQue(cuentas[i].VIGENCIA));
            }
        }
        if (mayor) {
            var codigo = ObtenerQueryString('codigo');
            var CTLG_CODE = $('#cboEmpresaNuevaCuentaME').val();
            var CUEN_CODE = $('#cboNuevaCuentaME').val();
            var fechaVigencia = $('#txtFechaNuevaCuentaME').val().split('/').reverse().join('-');

            crearCuentaOperadorMarca(codigo, CTLG_CODE, CUEN_CODE, 'ME', fechaVigencia, 'p_cuentas_me');
            oTablaCuentasME.DataTable().destroy();
            cargarCuentas();
            listarCuentasME();
            $("#divCuentaME").modal('hide');
        } else {
            alert('Ingrese una fecha de Vigencia válida');
        }
    }
};

var Grabar = function () {
    if (vErrors(['txtPersona'])) {
        if (marcasTarjetaOperador.length > 0) {
            var PIDM = $('#hfPIDM').val();
            var MARCAS = '';

            for (var i in marcasTarjetaOperador) {
                if (marcasTarjetaOperador[i].NUEVO === 'SI') {
                    MARCAS += marcasTarjetaOperador[i].CODIGO_MARCA + ',';
                }
            }
            MARCAS += '}';
            MARCAS = MARCAS.replace(',}', '');

            var data = new FormData();
            data.append('OPCION', '4');
            data.append('PIDM', PIDM);
            data.append('MARCAS', MARCAS);

            Bloquear('operador');

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CB/ajax/CBMOPTR.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                Desbloquear('operador');
                if (res !== null) {
                    if (res !== '00000') {
                        $('#cboMarca').select2('val', '');
                        window.history.pushState("Object", "Operador de Tarjeta", "/Default.aspx?f=CBMOPTR&codigo=" + res);
                        cargarMarcasOperador();
                        listarMarcasCombo();
                        listarMarcasTabla();
                        exito();
                        $('#btnGrabar').css('display', 'none');
                        $('#btnActualizar').css('display', 'inline-block');
                        $('#liCuentaMN, #liCuentaME').removeClass('hidden');
                        $('#info').css('display', 'block');
                    } else {
                        noexito();
                    }
                }
            }).error(function () {
                Desbloquear('operador');
                alertCustom("Error al grabar Nuevo Operador de Tarjeta. Por favor intente nuevamente.");
            });
        } else {
            alertCustom('Agregue por lo menos una marca de tarjeta.');
        }
    }
};

var Actualizar = function () {
    if (vErrorsNotMessage(['txtPersona'])) {
        var CODIGO = $('#hfOPTR_CODE').val();
        var PIDM = $('#hfPIDM').val();
        var MARCAS = '';

        for (var i in marcasTarjetaOperador) {
            if (marcasTarjetaOperador[i].NUEVO === 'SI') {
                MARCAS += marcasTarjetaOperador[i].CODIGO_MARCA + ',';
            }
        }

        if (MARCAS != '') {
            MARCAS += '}';
            MARCAS = MARCAS.replace(',}', '');
        }

        var data = new FormData();
        data.append('OPCION', '6');
        data.append('CODIGO', CODIGO);
        data.append('PIDM', PIDM);
        if (MARCAS !== '') {
            data.append('MARCAS', MARCAS);
        }

        Bloquear('operador');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CB/ajax/CBMOPTR.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res !== null) {
                if (res === 'OK') {
                    nuevasMarcasTarjetaOperador = [];
                    $('#listaNuevasMarcasTarjetas').html('');
                    $('#cboMarca').select2('val', '');
                    cargarMarcasOperador();
                    listarMarcasCombo();
                    listarMarcasTabla();
                    exito();
                } else {
                    alertCustom('Por favor, verifique que la nueva marca de tarjeta agregada no pertenezca a otro operador.');
                }
            }
            Desbloquear('operador');
        }).error(function () {
            alert("Error al grabar Nuevo Operador de Tarjeta. Por favor intente nuevamente.");
            Desbloquear('operador');
        });
    }
};

var cargarComboNuevaCuentaMN = function () {
    var codigo = ObtenerQueryString('codigo');
    if (codigo != undefined) {
        $.ajax({
            type: "post",
            url: 'vistas/CB/ajax/CBMOPTR.ASHX?OPCION=5&CTLG_CODE=' + $('#cboEmpresaNuevaCuentaMN').val() + '&MONE_CODE=' + $('#txtMonedaMN').val() + '&ESTADO=A',
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboNuevaCuentaMN').select2("val", "");
                $('#cboNuevaCuentaMN').html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].MONE_CODE === '0002') {
                            $('#cboNuevaCuentaMN').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
            },
            error: function () {
                alertCustom("Error al obtener Cuentas de la Empresa seleccionada");
            }
        });
    }
};

var cargarComboNuevaCuentaME = function () {
    var codigo = ObtenerQueryString('codigo');
    if (codigo != undefined) {
        $.ajax({
            type: "post",
            url: 'vistas/CB/ajax/CBMOPTR.ASHX?OPCION=5&CTLG_CODE=' + $('#cboEmpresaNuevaCuentaME').val() + '&MONE_CODE=' + $('#txtMonedaME').val() + '&ESTADO=A',
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboNuevaCuentaME').html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].MONE_CODE === '0003') {
                            $('#cboNuevaCuentaME').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
            },
            error: function () {
                alertCustom("Error al obtener Cuentas de la Empresa seleccionada");
            }
        });
    }
};

var cambiarEstadoCuenta = function (omtc_code) {
    var data = new FormData();
    data.append('OPCION', '9');
    data.append('OMTC_CODE', omtc_code);

    Bloquear('p_cuentas_mn');
    Bloquear('p_cuentas_me');

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CB/ajax/CBMOPTR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
    .success(function (res) {
        if (res != null) {
            if (res == 'OK') {
                exito();
                $('#tblCuentasMN').DataTable().destroy();
                $('#tblCuentasME').DataTable().destroy();
                cargarCuentas();
                listarCuentasMN();
                listarCuentasME();
            } else {
                noexito();
            }
        }
        Desbloquear('p_cuentas_mn');
        Desbloquear('p_cuentas_me');
    })
    .error(function () {
        Desbloquear('p_cuentas_mn');
        Desbloquear('p_cuentas_me');
        alert("Error al cambiar estado de Cuenta. Por favor intente nuevamente.");
    });
};

var actualizarEstadoOperadorMarca = function (omtr_code, estado) {
    var data = new FormData();
    data.append('OPCION', '10');
    data.append('OMTR_CODE', omtr_code);
    data.append('ESTADO', estado);

    Bloquear('tblMarcas');

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CB/ajax/CBMOPTR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
    .success(function (res) {
        if (res != null) {
            if (res == 'OK') {
                exito();
                cargarMarcasOperador();
            } else {
                noexito();
            }
        }
        Desbloquear('tblMarcas');
    })
    .error(function () {
        Desbloquear('tblMarcas');
        alert("Error al grabar actualizar estado de Marca de Tarjeta. Por favor intente nuevamente.");
    });
};