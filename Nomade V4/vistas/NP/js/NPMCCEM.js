var NPLCCEM = function () {
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val()).change();
                    fillCboEstablecimiento();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var Emp = $("#cboEmpresa").val();
        if (Emp == 'TODOS') { Emp = '' };

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + Emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option val="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    if (Emp == '') {
                        $('#cboSucursal').select2('val', 'TODOS').change();
                    }
                    else {
                        $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                    }


                } else {
                    $('#cboSucursal').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
            if ($('#cboEmpresa').val() == 'TODOS') {
                $('#cboSucursal').attr('disabled', 'disabled');
            }
            else {
                $('#cboSucursal').removeAttr('disabled');
            }
        });
        $('#cboSucursal').on('change', function () {
            ListarCentroCosto();
        });
    }

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();
    }

    return {
        init: function () {
            crearTablaVacia();
            plugins();
            eventoControles();
            fillCboEmpresa();   
        }
    };

}();

function crearTablaVacia() {

    var parms = {
        data: null,
        sDom: 'T<"clear">lfrtip',         
        order: [[0, "desc"]],
        oTableTools: {
            sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
            aButtons: [
                { "sExtends": "copy", "sButtonText": "Copiar" },
                { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
            ]
        },
        columns: [
            {
                data: "EMPRESA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "SUCURSAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')

                }
            },
            {
                data: "NOMBRE_EMPLEADO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left')
                }
            },
            {
                data: "DNI",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "CCD_CODE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')

                }
            },
            {
                data: "CENTRO_COSTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: "PORCENTAJE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                    $(td).html(cellData + '%'); 
                }
            },
            {
                data: "PIDM",
                visible: false
            }
        ]
    }

    oTableEmp = iniciaTabla('tblEmpleadosCC', parms);

    $('#tblEmpleadosCC tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableEmp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableEmp.fnGetPosition(this);
            var row = oTableEmp.fnGetData(pos);
            var pidm = row.PIDM;

            window.location.href = '?f=NPMCCEM&nIdPersona=' + pidm;
        }
    });
}

function ListarCentroCosto() {

    var Emp = $("#cboEmpresa").val();
    var Suc = $('#cboSucursal').val();

    if (Emp == 'TODOS') { Emp = '' };
    if (Suc == 'TODOS') { Suc = '' };

    $.ajax({
        type: "POST",
        url: "vistas/NP/ajax/NPMCCEM.ashx?OPCION=" + "1.5" + "&CTLG_CODE=" + Emp + "&SCSL_CODE=" + Suc,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            console.log(datos)
            oTableEmp.fnClearTable();
            if (!isEmpty(datos) && datos != null) {
                oTableEmp.fnAddData(datos);
            }
        },
        error: function (msg) {
            console.log(msg);
            alertCustom("Empleados no se listaron correctamente");
        }
    });

}

var NPMCCEM = function () {
    var oCentroCostoCab = [];
    var sCentroCostoCab = "";
    var aoNiveles = [];
    var aoNiveles = [];
    datos2 = null;
    var pidm = ObtenerQueryString("nIdPersona");
    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = CargarNivelesCentroCostos(psPlanCostos);
    };

    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    var plugins = function () {
        $("#cboEmpresa").select2();
        $('#cboEmpleado').select2();
        $('#cboArea').select2();
        $('#cboSeccion').select2();
        $('#cboProceso').select2();
        $('#cboActividad').select2();
        $('#cboPeriodo').select2();
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#cboEmpresa").append(fnGetEmpresas(1));
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var fillCboEmpleado = function () {
        var CTLG_CODE = $("#cboEmpresa").val();
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + CTLG_CODE,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" val_ctlg_code ="' + datos[i].CTLG_CODE + '" val_Empresa ="' + datos[i].CTLG_DESC_CORTA + '"  val_Sucursal ="' + datos[i].SCSL_DESC + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }

                    //El botón de C. Costo ya existente enviaba el pidm desde la pagina de empleados pero no hacia nada con esto
                    //Esta condicional pondra el pidm que reciba desde la pagina de empleados
                    //Tambien confirma si el pidm que se envia de la pagina de empleados existe en la lista
                    //De no estarlo tendra su comportamiento convencional
                    if ($('#cboEmpleado option[value=' + pidm + ']').length > 0) {
                        $('#cboEmpleado').val(pidm).trigger('change');
                    } else {
                        $('#cboEmpleado').select2('val', datos[0].PIDM);
                    };
                    $("#btnAsignar").trigger('click');
                } else {
                    $('#cboEmpleado').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };
    function CargaCombos() {
        $.ajax({
            type: "post",
            url: "vistas/NP/ajax/NPMCCEM.ashx?OPCION=OBT&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $("#dvCombos").html(fnCargarCombos(datos));
            },
            error: function (msg) {
                alertCustom(msg + "Areas no se listaron correctamente");
            }
        });
    }
    function fnCargarCombos(datos) {

        var sResultado = "";
        var iNivel = datos[0].NIVELES;
        for (var j = 1; j < iNivel; j++) {
            sResultado += "<div class='span1'>Nivel " + j + "</div>";
            sResultado += "<div class='span2'>";
            sResultado += "<select id='cboNivel_" + j + "'>";
            for (var i = 0; i < datos.length; i++) {
                if (j == datos[i].NIVEL) {
                    sResultado += "<option id='" + datos[i].CECD_CODIGO + "'>" + datos[i].DESC + "</option>";
                }
            }
            sResultado += "</select>";
            sResultado += "</div>";
        }
        return sResultado;
    }

    var CargaComboss = function () {
        var data = new FormData();
        data.append('PIDM', $('#cboEmpleado').val());

        //Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NP/ajax/NPMCCEM.ashx?OPCION=OBT&CTLG_CODE=" + $('#cboEmpresa').val(),
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
            .success(function (datos) {
                $("#dvCombos").html(datos);
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });

    }
    function ListarAreas(CTLG_CODE) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=1&CTLG_CODE=" + $('#hfCTLG_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboArea').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboArea').append('<option value="' + datos[i].CODIGO + '" val_CC_code ="' + datos[i].CECC_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboArea').val(datos[0].CODIGO).change();
                    $('#cboArea').change();
                }
            },
            error: function (msg) {
                alertCustom("Areas no se listaron correctamente");
            }
        });
        $('#cboArea').select2('destroy').select2();

        ListarSeccioanes($('#cboArea').val());
    }
    function ListarSeccioanes(area) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=2&p_area=" + area + "&CTLG_CODE=" + $('#hfCTLG_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSeccion').empty();
                if (datos != null && datos != "") {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSeccion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSeccion').val(datos[0].CODIGO).change();


                }

            },
            error: function (msg) {
                alertCustom("Secciones no se listaron correctamente");
            }
        });
        $('#cboSeccion').select2('destroy').select2();
        ListarProceso($('#cboSeccion').val());
    }
    function ListarProceso(seccion) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=3&p_seccion=" + seccion + "&CTLG_CODE=" + $('#hfCTLG_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboProceso').empty();
                if (datos != null && datos != "") {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboProceso').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboProceso').val(datos[0].CODIGO).change();

                }
            },
            error: function (msg) {
                alertCustom("Procesos no se listaron correctamente");
            }
        });
        $('#cboProceso').select2('destroy').select2();
        ListarActividad($('#cboProceso').val());
    }
    function ListarActividad(proceso) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=4&p_proceso=" + proceso + "&CTLG_CODE=" + $('#hfCTLG_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboActividad').empty();
                if (datos != null && datos != "") {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboActividad').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboActividad').val(datos[0].CODIGO).change();
                }
            },
            error: function (msg) {
                alertCustom("Actividades no se listaron correctamente");
            }
        });
        $('#cboActividad').select2('destroy').select2();

    }
    function CargaContrato(v_PPBIDEN_PIDM) {
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=CONT&PIDM=" + v_PPBIDEN_PIDM + "&CTLG_CODE=&SCSL_CODE=&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null) {
                    if (datos[0] == null) {
                        infoCustom("El empleado seleccionado no tiene un contrato asignado");
                    } else {
                        $('#lblNroContrato').text(datos[0].NRO)
                        $('#lblFechaInicio').text(datos[0].FECHA_INI);
                        $('#lblFechaFin').text(datos[0].FECHA_FIN);
                        $('#lblEstadoCont').text(datos[0].ESTADO);

                        $('#hfESTADO_CONT').val(datos[0].ESTADO_IND);
                        CargaCombos();
                        //ListarAreas();
                        GetCentroCostos();

                        $('#DatosEmp').slideDown();
                        //$('#btnAsignar').attr('disabled', 'disabled');
                        //$('#cboEmpleado').attr('disabled', 'disabled');
                        $('#btnCancelar').removeAttr('disabled');
                    }
                }
                else {
                    infoCustom("El empleado seleccionado no tiene un contrato asignado");
                }
            },
            error: function (msg) {
                alertCustom("Contrato no se listó correctamente");
            }
        });

    }
    var eventoControles = function () {

        $("#btnAsignar").on("click", function () {

            if ($('#btnAsignar').attr('disabled') != 'disabled') {
                if ($('#cboEmpleado').val() != "") {
                    if (vErrors(['cboEmpleado'])) {
                        var val_Empresa = $('#cboEmpleado [value="' + $('#cboEmpleado').val() + '"]').attr('val_Empresa')
                        var val_Sucursal = $('#cboEmpleado [value="' + $('#cboEmpleado').val() + '"]').attr('val_Sucursal')
                        var val_ctlg_code = $('#cboEmpleado [value="' + $('#cboEmpleado').val() + '"]').attr('val_ctlg_code')
                        $('#lblEmpresa').text(val_Empresa)
                        $('#lblEstablecimiento').text(val_Sucursal)
                        $('#hfCTLG_CODE').val(val_ctlg_code)
                        CargaContrato($('#cboEmpleado').val());
                    }
                } else {
                    alertCustom("Seleccione Empleado");
                }
            }

        });


        $("#btnCancelar").on("click", function () {
            if ($('#btnCancelar').attr('disabled') != 'disabled') {
                $('#btnAsignar').removeAttr('disabled');
                $('#cboEmpleado').removeAttr('disabled')
                $('#btnCancelar').attr('disabled', 'disabled')
                $('#DatosEmp').slideUp();
            }
        });




        $("#AgregaCC").on("click", function () {
            //if ($('#hfESTADO_CONT').val() == "A" || $('#hfESTADO_CONT').val() == "F") {
            AgregaCentroC();
            //}
            //else {
            //    alertCustom("No se puede editar porque el contrato está en estado: " + $('#lblEstadoCont').text());
            //}
        });

        $('#cboArea').on('change', function () {

            ListarSeccioanes($('#cboArea').val());
        });

        $('#cboSeccion').on('change', function () {

            ListarProceso($('#cboSeccion').val());
        });


        $('#cboProceso').on('change', function () {

            ListarActividad($('#cboProceso').val());
        });

        $('#cboEmpresa').on('change', function () {
            fillCboEmpleado();

        }
        );

    }

    function AgregaCentroC() {

        var v_continue = true;
        var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
        var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");
        //v_continue = validarCentroCosto();

        var c = $("#tblCentroCostos").DataTable().columns(0).data()
        var a = $("#tblCentroCostos").DataTable().columns(1).data()
        var b = $("#tblCentroCostos").DataTable().columns(3).data()

        var sumaTotal

        if (c[0][0] != "") {
            for (var i = 0; i < a[0].length; i++) {
                if (p_CECD == a[0][i] && p_CECC == c[0][i]) {

                    alertCustom("El empleado ya tiene asignado el centro de costos");
                    v_continue = false;
                    break;

                }
            }

            var suma;
            suma = "0";

            for (var i = 0; i < b[0].length; i++) {
                suma = parseFloat(suma) + parseFloat(b[0][i])
            }


        }
        else { suma = "0" }

        sumaTotal = parseFloat(suma) + parseFloat($('#txtPorcentaje').val())


        if (parseFloat(sumaTotal) > 100) {
            vErrorsNotMessage(['txtPorcentaje']);
            alertCustom("El porcentaje total supera el 100%");
            v_continue = false;
        }

        if (v_continue) {



            //Datos Basicos
            var PIDM = $('#cboEmpleado').val();
            var PTVCECD_CODE = p_CECD;// $('#cboActividad').val();
            var PORCENTAJE = $('#txtPorcentaje').val();
            var CECC_CODE = p_CECC;// $('#cboArea [value="' + $('#cboArea').val() + '"]').attr('val_CC_code')
            var USUARIO = $('#ctl00_txtus').val();
            var NRO_CONTRATO = $('#lblNroContrato').text();


            var data = new FormData();
            data.append('OPCION', "3");
            data.append('PIDM', PIDM);
            data.append('PTVCECD_CODE', PTVCECD_CODE);
            data.append('PORCENTAJE', PORCENTAJE);
            data.append('USUARIO', USUARIO);
            data.append('NRO_CONTRATO', NRO_CONTRATO);
            data.append('CECC_CODE', CECC_CODE);

            Bloquear("ventana");

            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/NPMCCEM.ashx",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].VALIDACION != "") {
                                alertCustom(datos[0].VALIDACION);
                                $("#txt_centro_costo").val("");
                            }
                            else {
                                exito();
                                GetCentroCostos();
                                //var result = (100 - parseFloat(sumaTotal)).toFixed(2)                         
                                //$('#txtPorcentaje').val(result)


                            }
                        }
                    }
                    else {
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexito();
                }
            });
        }


    }
    function validarCentroCosto() {

        var v_continue = true;


        if (!vErrors(['cboArea', 'cboSeccion', 'cboProceso', 'cboActividad', 'txtPorcentaje'])) {
            v_continue = false;
        }

        else {
            v_continue = true;
        }

        return v_continue
    }
    function cargainicial() {
        $('#DatosEmp').slideUp();
        //fillCboEmpleado();
        fillCboEmpresa();
        $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
        $('#cboEmpresa').change();
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargainicial();
        }
    };

}();

var GetCentroCostos = function () {
    var data = new FormData();
    data.append('PIDM', $('#cboEmpleado').val());

    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NP/ajax/NPMCCEM.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $('#divCentroCostos').html(datos);

                $("#tblCentroCostos").DataTable({
                    // "sDom": '<"clear">lfrtip',
                    "sPaginationType": "full_numbers",
                    //"oTableTools": {
                    //    "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                    //    "aButtons": [
                    //{
                    //    "sExtends": "copy",
                    //    "sButtonText": "Copiar"
                    //},
                    //{
                    //    "sExtends": "pdf",
                    //    "sPdfOrientation": "landscape",
                    //    "sButtonText": "Exportar a PDF"
                    //},
                    //{
                    //    "sExtends": "xls",
                    //    "sButtonText": "Exportar a Excel"
                    //}
                    //    ]
                    //}
                }).columns(0).visible(false);
                //actualizarEstilos()
                var sTabla = sumaTabla();
                $('#txtPorcentaje').val((100 - parseFloat(sTabla)).toFixed(2))
            } else {
                noexito();
                $('#txtPorcentaje').val("100")
            }
        })
        .error(function () {
            Desbloquear("ventana");
            noexito();
        });

}

function eliminaCentroCosto(CECC_CODE, PTVCECD_CODE) {

    var v_continue = true;

    //v_continue = validarCentroCosto();


    if ($('#hfESTADO_CONT').val() != "A") {
        v_continue = false;
        alertCustom("No se puede editar porque el contrato está en estado: " + $('#lblEstadoCont').text());
    }


    if (v_continue) {

        //Datos Basicos
        var PIDM = $('#cboEmpleado').val();
        var NRO_CONTRATO = $('#lblNroContrato').text();

        var data = new FormData();
        data.append('OPCION', "4");
        data.append('PIDM', PIDM);
        data.append('PTVCECD_CODE', PTVCECD_CODE);
        data.append('NRO_CONTRATO', NRO_CONTRATO);
        data.append('CECC_CODE', CECC_CODE);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/np/ajax/NPMCCEM.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].VALIDACION != "") {
                            alertCustom(datos[0].VALIDACION);
                        }
                        else {
                            exito();
                            GetCentroCostos();
                            //var sTabla = sumaTabla();
                            //$('#txtPorcentaje').val((100 - parseFloat(sTabla)).toFixed(2))
                        }
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexito();
            }
        });
    }


}

function sumaTabla() {

    var c = $("#tblCentroCostos").DataTable().columns(0).data()
    var b = $("#tblCentroCostos").DataTable().columns(3).data()

    var suma;

    if (c[0][0] != "") {

        suma = "0";
        for (var i = 0; i < b[0].length; i++) {
            suma = parseFloat(suma) + parseFloat(b[0][i])
        }

    }
    else { suma = "0" }

    return suma
}

