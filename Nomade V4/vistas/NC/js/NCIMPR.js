
var NCLIMPR = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal').select2();
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //$(select).html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=9&ID=" + $('#ctl00_txtus').val() + "&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).html('');
                if (datos != null) {
                    $(select).append('<option value=" ">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].SCSL_CODE + '">' + datos[i].NSCSL_CODE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        select.select2();
    };

    var fillBandejaImpresoras = function () {
        //var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjImpresoras').val());
        var parms = {
            sDom: 'TC<"clear">lfrtip ',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center').css('width', '10%');
                    }
                },
                {
                    data: "MAQUINA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MODELO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "TIPO_DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center').css('width', '10%');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center').css('width', '8%');
                    }
                },
                {
                    data: "CTLG_CODE",
                    visible: false
                },
                {
                    data: "SCSL_CODE",
                    visible: false
                }
            ]
        };

     
        oTableImpresoras = iniciaTabla('tblImpresoras', parms);
        $('#tblImpresoras').removeAttr('style');
        $('.ColVis_Button').addClass('btn blue').css("margin-bottom", "10px");
        $('.DTTT').css("float", "right");
        //$('#tblImpresoras').DataTable().column(7).search($("#cboEmpresa").val()).draw();
        //$('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
        //            <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
        //            <div id="enlaces" style="display: inline-block">\
        //                <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="1" href="#">MARCA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="2" href="#">MODELO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="3" href="#">SERIE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="4" href="#">TIPO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="5" href="#">ESTADO</a>\
        //            </div>');

        //$('a.toggle-vis').on('click', function (e) {
        //    e.preventDefault();
        //    var column = $('#tblImpresoras').DataTable().column($(this).attr('data-column'));
        //    column.visible(!column.visible());
        //});

        $('#tblImpresoras tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableImpresoras.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableImpresoras.fnGetPosition(this);
                var row = oTableImpresoras.fnGetData(pos);
                var codigo = row.CODIGO;
                window.location.href = '?f=ncmimpr&codigo=' + codigo;
            }

        });
        $('#tblImpresoras tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTableImpresoras.api(true).row($(this).parent().parent()).index();
            var row = oTableImpresoras.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCIMPR.ASHX", { p_OPCION: 3, p_CODIGO: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";
                        oTableImpresoras.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableImpresoras);
                        exito();
                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });
        });
    }

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            //$('#tblImpresoras').DataTable().column(7).search($(this).val()).draw();
            //$('#cboSucursal').change();
            CargarDatosTabla();
        });

        $('#cboSucursal').change(function () {
            //$('#tblImpresoras').DataTable().column(8).search($(this).val()).draw();
            CargarDatosTabla();
        });
    };

    var CargarDatosTabla = function () {
        Bloquear("ventana");

        $.ajax({
            url: "vistas/NC/ajax/NCIMPR.ASHX?p_OPCION=5&p_EMPRESA=" + $('#cboEmpresa').val() + "&p_SCSL=" + $('#cboSucursal').val(),
            type: "post",
            contenttype: "application/json;",
            datatype: "json",
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    oTableImpresoras.fnClearTable();
                    oTableImpresoras.fnAddData(datos);

                } else { oTableImpresoras.fnClearTable(); }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Listado!")
            }
        });
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            cargarSucursales();
            fillBandejaImpresoras();
            CargarDatosTabla();
            eventos();
        }
    };

}();

var NCIMPR = function () {

    var cargainicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {
            $("#actualizar").attr("style", "display:inline");
            $("#grabar").attr("style", "display:none");            
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCIMPR.ASHX?p_CODIGO=" + cod + "&p_EMPRESA=" + $("#cboEmpresa").val() + "&p_SCSL=" + $("#cboSucursal").val(),
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].CODIGO);
                    $('#cboEmpresa').val(datos[0].CTLG_CODE).change();
                    $('#cboSucursal').val(datos[0].SCSL_CODE).change();
                    $("#txtMarca").val(datos[0].MARCA);
                    $("#txtModelo").val(datos[0].MODELO);
                    $("#txtSerie").val(datos[0].SERIE);
                    $("#txtMaquina").val(datos[0].MAQUINA);
                    $("#cboTipo").select2("val",datos[0].TIPO);
                    if (datos[0].ESTADO == "ACTIVO") {
                        $('#uniform-chkActivo span').removeClass().addClass("checked");
                        $('#chkActivo').attr('checked', true);
                    } else {
                        $('#uniform-chkActivo span').removeClass();
                        $('#chkActivo').attr('checked', false);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $(select).empty();
                    $(select).append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNVMDOCV", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '" direccion="' + datos[i].DIRECCION + '" ruc="' + datos[i].RUC + '" ruta="' + datos[i].RUTA_IMAGEN + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $(select).val($('#ctl00_hddctlg').val());
                    $(select).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente.");
                }
            });
        }
        else {
            $(select).empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $(select).append('<option value="' + dPermanente[i].CODIGO + '" agente-reten-ind="' + dPermanente[i].AGENTE_RETEN_IND + '" data-pidm="' + dPermanente[i].PIDM + '" direccion="' + dPermanente[i].DIRECCION + '" ruc="' + dPermanente[i].RUC + '" ruta="' + dPermanente[i].RUTA_IMAGEN + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $(select).val($('#ctl00_hddctlg').val());
            $(select).change();
        }
        $(select).select2();
    }   

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=9&ID=" + $('#ctl00_txtus').val() + "&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].SCSL_CODE + '">' + datos[i].NSCSL_CODE + '</option>');
                    }
                }
                
                $(select).select2('val', $('#ctl00_hddestablecimiento').val());
                //$(select).change();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var plugins = function () {
        //aMayuscula(":input");
        $('#cboEmpresa, #cboSucursal, #cboTipo').select2();
        $('#txtserie').inputmask({ "mask": "P", "repeat": 30, "greedy": false });
        $('#txtmodelo').inputmask({ "mask": "P", "repeat": 35, "greedy": false });
        $('#txtmarca').inputmask({ "mask": "L", "repeat": 30, "greedy": false });
    }

    var crear = function () {       
        var p_EMPRESA = $("#cboEmpresa").val();
        var p_SCSL = $("#cboSucursal").val();
        var p_MARCA = $('#txtMarca').val();
        var p_MODELO = $('#txtModelo').val();
        var p_SERIE = $('#txtSerie').val();
        var p_USUARIO = $('#ctl00_lblusuario').val();
        var p_TIPO = $('#cboTipo').val();
        var p_MAQUINA = $('#txtMaquina').val();
        var p_ESTADO = $("#chkActivo").is(':checked') ? 'A' : 'I';

        if (vErrors(["txtMarca", "txtModelo", "txtSerie"])) {
            Bloquear("ventana");
            var data = new FormData();
            data.append('p_OPCION', 1);
            data.append('p_EMPRESA', p_EMPRESA);
            data.append('p_SCSL', p_SCSL);
            data.append('p_MARCA', p_MARCA);
            data.append('p_MODELO', p_MODELO);
            data.append('p_SERIE', p_SERIE);
            data.append('p_USUARIO', p_USUARIO);
            data.append('p_TIPO', p_TIPO);
            data.append('p_MAQUINA', p_MAQUINA);
            data.append('p_ESTADO', p_ESTADO);

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCIMPR.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (res) {
                    Desbloquear("ventana");
                    if (res != "") {
                        exito();
                        $("#actualizar").attr("style", "display:inline");
                        $("#grabar").attr("style", "display:none");
                        $("#txtCodigo").val(res);
                        window.history.pushState("Object", "Impresoras", "/Default.aspx?f=ncmimpr&codigo=" + res);
                    } else {
                        noexito();
                    }                                       
                    //fnListaMovContable();
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    Desbloquear("modal-confirmar");
                    alertCustom('Error en el servidor al intentar completar el documento.');
                }
            });

        }

        
    }


    var actualizar = function () {
        var p_EMPRESA = $("#cboEmpresa").val();
        var p_CODIGO = $("#txtCodigo").val();
        var p_SCSL = $("#cboSucursal").val();
        var p_MARCA = $('#txtMarca').val();
        var p_MODELO = $('#txtModelo').val();
        var p_SERIE = $('#txtSerie').val();
        var p_USUARIO = $('#ctl00_lblusuario').val();
        var p_TIPO = $('#cboTipo').val();
        var p_MAQUINA = $('#txtMaquina').val();
        var p_ESTADO = $("#chkActivo").is(':checked') ? 'A' : 'I';

        if (vErrors(["txtMarca", "txtModelo", "txtSerie"])) {
            Bloquear("ventana");
            var data = new FormData();
            data.append('p_OPCION', 2);
            data.append('p_CODIGO', p_CODIGO);
            data.append('p_EMPRESA', p_EMPRESA);
            data.append('p_SCSL', p_SCSL);
            data.append('p_MARCA', p_MARCA);
            data.append('p_MODELO', p_MODELO);
            data.append('p_SERIE', p_SERIE);
            data.append('p_USUARIO', p_USUARIO);
            data.append('p_TIPO', p_TIPO);
            data.append('p_MAQUINA', p_MAQUINA);
            data.append('p_ESTADO', p_ESTADO);

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCIMPR.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (res) {
                    Desbloquear("ventana");
                    if (res != "") {
                        exito();                       
                        $("#actualizar").attr("style", "display:inline");
                        $("#grabar").attr("style", "display:none");                        
                        
                    } else {
                        noexito();
                    }
                    //fnListaMovContable();
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    Desbloquear("modal-confirmar");
                    alertCustom('Error en el servidor al intentar completar el documento.');
                }
            });

        }


    }


    var eventos = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').change();
        });

        $('#grabar').click(function () {
            crear();
        });

        $('#actualizar').click(function () {
            actualizar();
        });
    };

    return {
        init: function () {
            plugins();
            eventos();
            cargarEmpresas();                        
            cargainicial();
        }
    };
}();

