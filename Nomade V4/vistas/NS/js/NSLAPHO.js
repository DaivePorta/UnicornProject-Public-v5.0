var oTable;
var oTable_marcaciones;
var NSLAPHO = function () {

    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();

        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
    }

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
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());
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
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboSucursal').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val() + "&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value ="">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
        });
    }


    function cargainicial() {
        fillCboEmpresa();

    }

    return {
        init: function (OPC) {

            plugins();
            eventoControles();
            cargainicial();

            if (OPC == 'Z') {
                $('#cboEstado').select2();
                $('#cboEstado').select2('val', 'S').change();
                ListarApro();
                funcionalidadTabla();
            }
           
            
        }
    };
}();

var ListarApro = function () {

    var Emp = $("#cboEmpresa").val();
    var Suc = $('#cboSucursal').val();
    var ESTADO = $('#cboEstado').val();

    var aa = $("#optanho").val();
    var mm = $("#optmes").val();
    var Peri = mm + " " + aa;
    Peri = Peri.toUpperCase();

    var empleadoPIDM = ''

    if ($('#cboEmpleado').val() == '') {
        empleadoPIDM = '0';
    }
    else {
        empleadoPIDM = $('#cboEmpleado').val() === null ? 0 : $('#cboEmpleado').val(); //solucion
    }

    var mes = $('#optmes').datepicker('getDate').getMonth() + 1

    var fechaHoy = new Date();
    var mesActual = fechaHoy.getMonth() + 1;
    var apruerech = true;

    if (parseInt(mes) >= parseInt(mesActual)) {
        apruerech = true;
    }
    else {
        apruerech = false;
    }

    if (typeof oTable != "undefined") {
        oTable.fnClearTable();
    }

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSLAPHO.ashx?Opcion=" + "Z" + "&Emp=" + Emp + "&Suc=" + Suc + "&PIDM=" + empleadoPIDM + "&MES=" + mes + "&ANIO=" + aa + "&ESTADO=" + ESTADO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                var json = datos;
                var parms = {
                    data: json,
                    //order: [[2, 'asc']],
                    //iDisplayLength: 25,
                    columns: [

                        {
                            data: "CODIGO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "EMPLEADO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'left');
                            }
                        },
                        {
                            data: "FECHA_PROCESO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "FECHA_ACT",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "INICIO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: "FIN",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },

                          {
                              data: "TIPO_HE",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center')
                              }
                          },

                         {
                             data: "SOLICITA",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 //$(td).attr('align', 'center')
                                 $(td).css('text-align', 'left');
                             }
                         },

                        {
                            data: "AUTORIZA",
                            createdCell: function (td, cellData, rowData, row, col) {
                                //$(td).attr('align', 'center')
                                $(td).css('text-align', 'left');

                            }
                        },

                           {
                               data: "MOTIVO",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   //$(td).attr('align', 'center')
                                   $(td).css('text-align', 'left');

                               }
                           },
                        {
                            data: "ESTADO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        }
                        ,
                        {
                            data: null,
                            defaultContent: '<a class="btn green Apro" title="Autorizar"><i class="icon-thumbs-up"></i></a>',
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                                if (apruerech == false) {
                                    $(td).css('display', 'none')
                                }
                            }
                        }
                         ,
                        {
                            data: null,
                            defaultContent: '<a class="btn red Rech" title="Rechazar"><i class="icon-thumbs-down"></i></a>',
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                                if (apruerech == false) {
                                    $(td).css('display', 'none')
                                }
                            }
                        }



                    ]

                }

            
          
                $('#tblHoraExtra').dataTable().fnDestroy();
                oTable = iniciaTabla('tblHoraExtra', parms);
                oTable.fnSort([[0, "desc"]]);
                $('#tblHoraExtra').removeAttr('style');


                $('#tblHoraExtra tbody').on('click', 'tr', function () {

                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        oTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                    }

                });                         


            }
            else {

                oTable = $('#tblHoraExtra').dataTable();
            }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}



var NSMAPHO = function () {

    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();
        $('#cboTipo').select2();
        $('#cboSolicitante').select2();        
        $('#txtFechaAutorizada').datepicker();
       
        $("#txtHoraInicio").focus(function () { $(this).inputmask("H:0") });
        $("#txtHoraFin").focus(function () { $(this).inputmask("H:0") });

    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
            getFechasCorte();
                     
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
            fillCboSolicitante();
        });

        $('#cboEmpleado').on('change', function () {
            if ($('#txtFechaAutorizada').val() != '') {
                listaHorarioEmp();
            }
            if (typeof oTable_marcaciones != "undefined") {
                oTable_marcaciones.fnClearTable();
            }
        });

        $("#txtFechaAutorizada").keyup(function () {
            if ($('#txtFechaAutorizada').val().length == 0) {
                if (typeof oTableHorario != "undefined") {
                    oTableHorario.fnClearTable();
                }
            }
         
        });

        $("#txtFechaAutorizada").datepicker().on("changeDate", function () {
            if ($('#txtFechaAutorizada').val().length == 10) {
                if ($('#cboEmpleado').val() == '') {
                    vErrorsNotMessage(['cboEmpleado']);
                }
                else {
                    listaHorarioEmp();
                }
            }
            else {
                if (typeof oTableHorario != "undefined") {
                    oTableHorario.fnClearTable();
                }
            }
            if (typeof oTable_marcaciones != "undefined") {
                oTable_marcaciones.fnClearTable();
            }

        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            //if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)
                var NroMes = $('#txtFechaAutorizada').datepicker('getDate').getMonth() + 1;
                var anioVal = $('#txtFechaAutorizada').val().substr(6, 4);
                var NomMes = devuelveNombreMes(NroMes);
                var tipo = "";

                if ($('#lblProceso').text() == 'Aprobado') {
                    $('#lblApro').text('Aprobado:');
                    $('#lblAprobanteM').text($('#lblAprobante').text());
                    tipo =  "Aprobación"
                }
                else if ($('#lblProceso').text() == 'Rechazado') {
                    $('#lblApro').text('Rechazado:');
                    $('#lblAprobanteM').text($('#lblAprobante').text());
                    tipo = "Rechazo Solicitud"
                }
                else {
                    $('#lblApro').text('');
                    $('#lblAprobanteM').text('');
                    tipo = "Solicitud"
                }
                
                $('#txtAsunto').val( tipo +' de Horas Extra - ' + $('#cboEmpleado :selected').html());
                $('#lblAsunto').text(tipo + ' de Horas Extra');
                $('#lblEmpresa').text($('#cboEmpresa :selected').html());
                $('#lblTipoHoraExtra').text($('#cboPlame :selected').html());
                $('#lblEmpleado').text($('#cboEmpleado :selected').html());
                $('#lblFechaProceso').text($('#txtFechaProceso').val());
                $('#lblFechaPermiso').text($('#txtFechaAutorizada').val());
                $('#lblHoraIni').text($('#txtHoraInicio').val());
                $('#lblHoraFin').text($('#txtHoraFin').val());
                $('#lblPeriodo').text(NomMes + '-' + anioVal);
                $('#lblMotivo').text($('#txtMotivo').val());
                $('#lblSolicitanteM').text($('#cboSolicitante :selected').html());
                $('#lblEstadoM').text($('#lblProceso').text());
                 
               
              
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();

                $('#divMail').modal('show');

            //}


        });

        $('#brn_get_Marcaciones').on('click', function () {

            Bloquear("ventana")
            setTimeout(function () {

                Get_Marcaciones();

            }, 500);


        });

    }


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
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());
                    fillCboEstablecimiento();
                    getFechasCorte();

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
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboSucursal').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",            
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=11&PIDM=0&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value =""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };


    var fillCboSolicitante = function () {

        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=NIVCARG&PIDM=0&ESTADO_IND=A&NIVEL_CARGO=G,J&IND_CONFIANZA=&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSolicitante').empty();
                if (datos != null) {
                    $('#cboSolicitante').append('<option  value =""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSolicitante').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboSolicitante').select2('val', '').change();
                } else {
                    $('#cboSolicitante').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };


    var Get_Marcaciones = function () {
        var oFecha = $("#txtFechaAutorizada").val();
        var ctlg_code = $("#cboEmpresa").val();
        var vPidm = $("#cboEmpleado").val();
        var v_Errors = true;
        var v_message = '';


        if (vPidm == '') {
            v_message += "* Seleccione Empleado" + "<br>";
            infoCustom(v_message);
            //v_Errors = false
            Desbloquear("ventana");
            return false            
        }

        if ($('#txtFechaAutorizada').val().length != 10) {
            $('#txtFechaAutorizada').val('');
            if (!vErrorsNotMessage(["txtFechaAutorizada"])) {
                v_message += "* Formato Fecha Incorrecto" + "<br>";
                v_Errors = false;
            }
        }

        if (v_Errors) {
            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/nnmrefe.ashx?OPCION=2&p_FECHA=" + oFecha + "&p_CTLG_CODE=" + ctlg_code,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos == "OK") {
                        //LISTA MARCACIONES
                        Get_Marcacion_Real_Biometrico(vPidm, oFecha);

                    }
                    if (datos != "E" && datos != "OK") {

                        infoCustom(datos);

                    }
                    if (datos == "E") {


                        alertCustom("Error al obtener marcaciones");

                    }

                    if (datos == "") {


                        alertCustom("Error al obtener marcaciones");

                    }
                    Desbloquear("ventana");

                },
                error: function (msg) {
                    alertCustom("Error al obtener marcaciones");
                    Desbloquear("ventana");
                }

            });
        }
        else {
            Desbloquear("ventana");
        }

    }


    var Get_Marcacion_Real_Biometrico = function (pidm, fecha) {
        if (typeof oTable_marcaciones != "undefined") {
            oTable_marcaciones.fnClearTable();
        }
        

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=4&PIDM=" + pidm + "&FECHA=" + fecha,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    $('#tbl_marcaciones .odd').remove()

                    var json = datos;
                    var parms = {
                        data: json,
                        paging: false,
                        searching: false,
                        info: false,
                        columns: [

                            {
                                data: "MARCACION",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).attr('align', 'center');
                                    $(td).css('text-align', 'center');                                   
                                }

                            }

                        ]

                    }
              
                    $('#tbl_marcaciones').dataTable().fnDestroy();
                    oTable_marcaciones = iniciaTabla("tbl_marcaciones", parms);
                    $('#tbl_marcaciones_wrapper').children().first().html('');
                    Desbloquear("ventana");

                }                  
                else {


                    //$('#tbl_marcaciones .odd').remove()
                    oTable_marcaciones = $('#tbl_marcaciones').dataTable();
                    $('#tbl_marcaciones_filter').remove()
                    $('#tbl_marcaciones_length').remove()
                    $('#tbl_marcaciones_paginate').remove()
                    $('#tbl_marcaciones_info').remove()                   
                    $('#tbl_marcaciones_wrapper').children().first().html('');
                    Desbloquear("ventana");
                               
                }
               
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }


    var verificarPermiso = function () {

        $.ajax({
            type: "post",
            //url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=ROL&p_USUA_ID=" + $("#ctl00_txtus").val(),
            url: "vistas/NS/ajax/NSMAPHO.ashx?OPCION=ROL",
            async: false,
            success: function (datos) {
                //$("#hf_permiso").val(datos);
                if (datos != "" && datos != "0") {
                    $("#grabar").html("<i class='icon-circle-arrow-right'></i>&nbsp;Guardar y Aprobar");
                }
            },
            error: function (msg) {
                alertCustom("No se obtuvo correctamente el indicador de permiso");
            }
        });

    }

    return {
        init: function (Op) {
            verificarPermiso();
            plugins();
            eventoControles();
            fillCboEmpresa();           
            CargaInicial(Op);
            Listar_Plame();
        }
    };    
    function CargaInicial(Op) {

        var codigo = ObtenerQueryString("codigo");
        var Peri = ObtenerQueryString("Peri");       

        $('#btnMail').addClass('hidden');
        var v = ObtenerQueryString("v");

        if (codigo != null) {
            Peri = Peri.replace('%20', '&nbsp;');
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMAPHO.ashx?Opcion=X&codigo=" + codigo,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {


                    $('#btnNuevo').attr({ 'href': '?f=NSMAPHO' });
                    $('#btnCancelar').attr({ 'href': '?f=NSMAPHO' });


                    $("#cboPlame").select2('val', datos[0].CODIGO_PLAME).change();
                    $("#cboPlame").attr('disabled', 'disabled');

                    $("#txtCodigo").html(datos[0].CODIGO);
                    $('#txtFechaProceso').html(datos[0].FECHA_PROCESO);
                    $('#txtFechaAutorizada').html(datos[0].FECHA_ACT);
                    $("#txtHoraInicio").html(datos[0].INICIO);
                    $("#txtHoraFin").html(datos[0].FIN);
                    $("#txtMotivo").html(datos[0].MOTIVO);
                    $("#chkEstado").attr({ 'disabled': 'disabled' });
                        
                    
                    
                    $('#txtAsunto').val('SOLICITUD DE HORA EXTRA ');
                    $('#lblDe').html(datos[0].CORREO);
                    cargarCorreos();


                    $("#cboEmpresa").html('');
                    $("#cboEmpresa").html("<option value='" + datos[0].COD_EMPRESA + "'>" + datos[0].EMPRESA + "</option>");
                    $("#cboEmpresa").select2('val', datos[0].COD_EMPRESA).change();
                    $("#cboEmpresa").attr('disabled', 'disabled');

                    $('#cboSucursal').select2('val', datos[0].COD_SUCURSAL);
                    $("#cboSucursal").attr('disabled', 'disabled');

                    $("#cboEmpleado").html('');
                    $("#cboEmpleado").html("<option value='" + datos[0].COD_EMPLEADO + "'>" + datos[0].EMPLEADO + "</option>");
                    $("#cboEmpleado").select2('val', datos[0].COD_EMPLEADO).change();
                    $("#cboEmpleado").attr('disabled', 'disabled');
                    
                   
                    $('#cboSolicitante option[value="' + datos[0].PIDM_SOL + '"]').remove()
                    $("#cboSolicitante").append("<option value='" + datos[0].PIDM_SOL + "'>" + datos[0].SOLICITA + "</option>");
                    $("#cboSolicitante").select2('val', datos[0].PIDM_SOL).change();



                    if (datos[0].AUTORIZA == '') {
                        $("#lblAprobante").html('PENDIENTE.');
                    } else {
                        $("#lblAprobante").html(datos[0].AUTORIZA);
                    }

                    if (datos[0].ESTADO != 'Inactivo') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }


                    $('#lblUsuarioReg').text(datos[0].USUA_REG);
                    fechaproceso = (datos[0].FECHA_PROCESO).split("/").reverse().join("");
                    fechacorte_INI = (fechaCorteIni).split("/").reverse().join("");


                    if (datos[0].ESTADO == 'Aprobado' || datos[0].ESTADO == 'Rechazado' || (parseInt(fechaproceso) < parseInt(fechacorte_INI)) ) {
                        deshabilitaControles();
                    }
                   
                    $('#lblProceso').html(datos[0].ESTADO);                                       
                    $('#btnMail').removeClass('hidden');
                    
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        } else {
            var FechaHoy = getFechaActual();
            $('#txtFechaProceso').val(FechaHoy)
        }
    }

}();

var ListarEmpleado = function () {
    var Emp = $("#cboEmpresa").val();
    var Suc = $('#ctl00_hddestablecimiento').val();
    var us = $('#ctl00_txtus').val();
    $.ajax({
        type: "POST",
        url: "vistas/NS/ajax/NSMAPHO.ashx?Opcion=L&Emp=" + Emp + "&Suc=" + Suc,
        success: function (res) {
            $('#cboEmpleado').html('');
            $('#select2-chosen-2').html('');
            
            $('#cboEmpleado').html(res);
            $('#cboEmpleado').change();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


var deshabilitaControles = function () {

    $('#grabar').attr({ 'disabled': 'disabled' });
    $('#grabar').removeAttr('href');
    $("#cboPlame").attr('disabled', 'disabled');

    $('#txtFechaAutorizada').attr('disabled', 'disabled')
    $('#txtHoraInicio').attr('disabled', 'disabled');
    $('#txtHoraFin').attr('disabled', 'disabled');
    $('#txtMotivo').attr('disabled', 'disabled');
    $('#chkEstado').attr('disabled', 'disabled');

    $('#cboSolicitante').attr('disabled', 'disabled');

}

function ListarNegocio() {
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    $("#cboEmpresa").select2();

    $.ajaxSetup({ async: false });

    $.post("vistas/NS/ajax/NSMAPHO.ASHX", { OPCION: "EM", us: p_USUA_ID },
    function (res) {
        $("#cboEmpresa").html(res);
        $("#cboEmpresa").val($("#ctl00_hddctlg").val());
    
        $('#cboEmpresa').change();
      
    });
    $.ajaxSetup({ async: true });
}



function Listar_Plame() {
    $("#cboPlame").select2();

    $.ajaxSetup({ async: false });

    $.post("vistas/NS/ajax/NSMAPHO.ASHX", { OPCION: "PL" },
    function (res) {
        $("#cboPlame").html(res);
        $('#cboPlame').change();

    });
    $.ajaxSetup({ async: true });
}

function Validar() {
    var v_Errors = true;
    var v_message = '';

    var NroFilas = 0;
    horaInicio = parseInt($('#txtHoraInicio').val().split(":").join(""));
    horaFin = parseInt($('#txtHoraFin').val().split(":").join(""));

    fechaPermiso = $('#txtFechaAutorizada').val().split("/").reverse().join("");

    fechaCorte_Ini = (fechaCorteIni).split("/").reverse().join("");
    fechaCorte_Fin= (fechaCorteFin).split("/").reverse().join("");


    if (typeof oTableHorario != "undefined" ){
        NroFilas = oTableHorario.fnGetData().length;    
    }


    if ($('#txtHoraInicio').val().indexOf('_') != -1) {
        $('#txtHoraInicio').val('');
        if (!vErrorsNotMessage(["txtHoraInicio"])) {
            v_message += "Ingrese formato de hora correcto * Hora Inicio." + "<br>";
            v_Errors = false;
        }
    }
    else if ($('#txtHoraFin').val().indexOf('_') != -1) {
        $('#txtHoraFin').val('');
        if (!vErrorsNotMessage(["txtHoraFin"])) {
            v_message += "Ingrese formato de hora correcto * Hora Fin." + "<br>";
            v_Errors = false;
        }
    }

    else if (!vErrorsNotMessage(["cboEmpresa", "cboEmpleado", "txtHoraInicio", "txtHoraFin", "txtMotivo", "txtFechaAutorizada", "cboSolicitante"])) {
        v_Errors = false;
        v_message = 'Ingrese los campos obligatorios'
    }
    else if (parseInt(fechaPermiso) < parseInt(fechaCorte_Ini) || parseInt(fechaPermiso) > parseInt(fechaCorte_Fin)) {

        v_Errors = false;
        v_message = "La fecha seleccionada está fuera del Periodo del proceso: Del " + fechaCorteIni + "al " + fechaCorteFin;

    }
    else if (parseInt(NroFilas) > 0) {
        for (var i = 0; i <= parseInt(NroFilas) - 1; i++) {

            var row = oTableHorario.fnGetData(i);
            horaInicioTabla = row["HORA_INICIO"];            
            horaFinTabla = row["HORA_FIN"];           
            horaInicioTabla = parseInt((horaInicioTabla).split(":").join(""));
            horaFinTabla = parseInt((horaFinTabla).split(":").join(""));
            if (parseInt(horaInicio) > parseInt(horaInicioTabla) && parseInt(horaInicio) < parseInt(horaFinTabla)) {
                v_Errors = false;
            }
            else if (parseInt(horaFin) > parseInt(horaInicioTabla) && parseInt(horaFin) < parseInt(horaFinTabla)) {
                v_Errors = false;
            }

            if (!v_Errors) {
                v_message = "El rango de horas extra está dentro de su horario";
            }
   

        }

    }

   
    
    

    if (!v_Errors) {
        infoCustom(v_message);
    }

    return v_Errors;
}

function grabar() {

    var v_Errors = true;    
    v_Errors = Validar();
    
    if (v_Errors) {
        var p_RHAPRHO_CODE = '';
        var p_RHAPRHO_CTLG_CODE = $("#ctl00_hddctlg").val();
        var p_RHAPRHO_FTVSCSL_CODE = $('#cboSucursal').val();
        var p_RHAPRHO_HOR_NI = $("#txtHoraInicio").val();
        var p_RHAPRHO_HOR_FIN = $("#txtHoraFin").val();
        var p_RHAPRHO_MOTIVO = Enter_MYSQL($("#txtMotivo").val());

        var p_RHAPRHO_FEC_ACT = $("#txtFechaAutorizada").val();

        var p_RHAPRHO_USUA_ID = $('#ctl00_txtus').val();
        var p_RHAPRHO_PPBIDEN_PIDM_EMP = $('#cboEmpleado').val();

        var p_RHAPRHO_PLAME = $('#cboPlame').val();

        var p_RHAPRHO_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var p_SOLICITANTE = $('#cboSolicitante').val();
      

        Bloquear("ventana");

        $.post("vistas/NS/ajax/NSMAPHO.ashx",
            {
                opcion: 'R',
                p_RHAPRHO_CODE: p_RHAPRHO_CODE,
                p_RHAPRHO_CTLG_CODE: p_RHAPRHO_CTLG_CODE,
                p_RHAPRHO_FTVSCSL_CODE : p_RHAPRHO_FTVSCSL_CODE,
                p_RHAPRHO_HOR_NI: p_RHAPRHO_HOR_NI,
                p_RHAPRHO_HOR_FIN: p_RHAPRHO_HOR_FIN,
                p_RHAPRHO_MOTIVO: p_RHAPRHO_MOTIVO,
                p_RHAPRHO_USUA_ID: p_RHAPRHO_USUA_ID,
                p_RHAPRHO_PPBIDEN_PIDM_EMP: p_RHAPRHO_PPBIDEN_PIDM_EMP,
                p_RHAPRHO_ESTADO_IND: p_RHAPRHO_ESTADO_IND,
                p_RHAPRHO_FEC_ACT: p_RHAPRHO_FEC_ACT,
                p_RHAPRHO_PLAME: p_RHAPRHO_PLAME,
                p_SOLICITANTE: p_SOLICITANTE
            },
            function (res) {              
               
                if (res == 'HORA') {
                    Desbloquear("ventana");
                    infoCustom('La hora de fin debe ser mayor a la de inicio.');
                    return false;
                }
                else if (res == 'CRUCE') {
                    Desbloquear("ventana");
                    infoCustom('Existe un cruce de horas en la fecha seleccionada.');
                    return false;
                }
                var arreglo = res.split(',');
                if (arreglo[4] == 'OK') {
                    $('#txtCodigo').val(arreglo[0]);
                    $('#lblProceso').html('Solicitado');
                    $('#lblUsuarioReg').text($('#ctl00_txtus').val());
                    
                    exito();
                    if (arreglo[1] == 'APRUEBA') {
                        $('#lblProceso').html('Aprobado');
                        $('#lblAprobante').text($('#ctl00_txtus').val());
                        deshabilitaControles();
                        //exitoCustom("La solicitud se aprobó automaticamente");
                        enviar(false, 'A', arreglo[0]);
                    }
                    else {
                        $("#grabar").html("<i class='icon-pencil'></i> modificar");
                        $("#grabar").attr("href", "javascript:Modificar()");
                    }
                                        
                    $('#cboEmpresa').attr({ 'disabled': 'disabled' });
                    $('#cboSucursal').attr({ 'disabled': 'disabled' });
                    $('#cboEmpleado').attr({ 'disabled': 'disabled' });

                    $('#btnMail').removeClass('hidden');

                    Desbloquear("ventana");

                } else {
                    Desbloquear("ventana");
                    alertCustom("Error al registrar Hora extra");                   
                }
            });
    } 
}


function Modificar() {

    var v_Errors = true;
   
    v_Errors = Validar();
   
    if (v_Errors) {

        var p_RHAPRHO_CODE = $('#txtCodigo').val();
        var p_RHAPRHO_HOR_NI = $("#txtHoraInicio").val();
        var p_RHAPRHO_HOR_FIN = $("#txtHoraFin").val();
        var p_RHAPRHO_MOTIVO = Enter_MYSQL($("#txtMotivo").val());
        var p_RHAPRHO_FEC_ACT = $("#txtFechaAutorizada").val();
        var p_RHAPRHO_USUA_ID = $('#ctl00_txtus').val();
        
        var p_RHAPRHO_PLAME = $('#cboPlame').val();

        var p_RHAPRHO_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var p_RHAPRHO_PPBIDEN_PIDM_EMP = $('#cboEmpleado').val();

        var p_SOLICITANTE = $('#cboSolicitante').val();

        Bloquear("ventana");

        $.post("vistas/NS/ajax/NSMAPHO.ashx",
            {
                opcion: 'M',
                p_RHAPRHO_CODE: p_RHAPRHO_CODE,
                p_RHAPRHO_HOR_NI: p_RHAPRHO_HOR_NI,
                p_RHAPRHO_HOR_FIN: p_RHAPRHO_HOR_FIN,
                p_RHAPRHO_MOTIVO: p_RHAPRHO_MOTIVO,
                p_RHAPRHO_USUA_ID: p_RHAPRHO_USUA_ID,
                p_RHAPRHO_ESTADO_IND: p_RHAPRHO_ESTADO_IND,
                p_RHAPRHO_FEC_ACT: p_RHAPRHO_FEC_ACT,
                p_RHAPRHO_PLAME: p_RHAPRHO_PLAME,
                p_RHAPRHO_PPBIDEN_PIDM_EMP: p_RHAPRHO_PPBIDEN_PIDM_EMP,
                p_SOLICITANTE: p_SOLICITANTE
            },
            function (res) {
                Desbloquear("ventana");
                if (res == 'HORA') {
                    infoCustom('La hora de fin debe ser mayor a la de inicio.');
                    return false;
                }
                else if (res == 'CRUCE') {
                    infoCustom('Existe un cruce de horas en la fecha seleccionada.');
                    return false;
                }

                var arreglo = res.split(',');
                if (arreglo[2] == 'OK') {
                    exito();
                    $('#lblUsuarioReg').text($('#ctl00_txtus').val());
                    $("#grabar").html("<i class='icon-pencil'></i> modificar");
                    $("#grabar").attr("href", "javascript:Modificar()");
                    $('#cboEmpresa').attr({ 'disabled': 'disabled' });
                    $('#cboEmpleado').attr({ 'disabled': 'disabled' });

                } else {

                    alertCustom('Error al modificar Hora Extra.');
                }
            });
    }
}



function MostrarPopUp() {

    Bloquear("ventana");
    var p_RHDEPL_RHPLAHO_CODE = "";
    var p_PEBHOED_HOEC_CODE = "";
    $.post("vistas/NS/ajax/NSMAPHO.ashx",
        { OPCION: "C", p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE, p_PEBHOED_HOEC_CODE: p_PEBHOED_HOEC_CODE })
    .done(function (res) {
        Desbloquear("ventana");
        if (res == "OK") {
            //exito();
            //$('#muestralistap').modal('hide');
            $('#muestralistap').modal('show');
            cargaHmtl();
        } else {
            noexito();
        }
    });
}

var cargarCorreos = function () {
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        for (var u in data) {
            if (data[u].usuario === $('#ctl00_txtus').val()) {
                $('#txtRemitente').val(data[u].email);
                break;
            }
        }
        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                    '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alert('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');
    });
};

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmapho.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
              "&NREMITENTE=" + $('#txtNRemitente').val() + "&DESTINATARIOS=" + destinos +
              "&ASUNTO=" + $('#txtAsunto').val() + "&MENSAJE=" + $('#txtcontenido').val() +
              "&EMPRESA=" + $('#cboEmpresa :selected').html() +
              "&TIPO_HE=" + $('#lblTipoHoraExtra').text() +
              "&EMPLEADO=" + $('#lblEmpleado').text() +
              "&FEC_PROC=" + $('#lblFechaProceso').text() +
              "&FEC_PERM=" + $('#lblFechaPermiso').text() +
              "&HORA_INI=" + $('#lblHoraIni').text() +
              "&HORA_FIN=" + $('#lblHoraFin').text() +
              "&PERIODO=" + $('#lblPeriodo').text() +
              "&MOTIVO=" + $('#lblMotivo').text() +
              "&SOLICITANTE=" + $('#lblSolicitanteM').text() +
              "&APROBANTE=" + $('#lblAprobanteM').text() +
              "&TITULO=" + $('#lblAsunto').text() +
              "&ESTADO=" + $('#lblEstadoM').text(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                exito();
                $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });
    }
};


var enviar = function (b, t, c) {
    var p_RHAPRHO_CODE = c;
    var v = b;    

        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMAPHO.ashx?OPCION=SEND" +
                "&v=" + v +
            "&t=" + t +
            "&p_RHAPRHO_CODE=" + p_RHAPRHO_CODE,
            contentType: "application/json;",
            async: false,
            dataType: false,
            success: function (datos) {
                if (datos == "OK") {
                    exitoCustom("El correo de confirmación se envió correctamente");
                }
                else if (datos == "NO EMAIL") {
                    alertCustom('No se puedo enviar el correo electrónico de confirmación , los destinatarios no cuentan con correo electrónico');
                }
                else {
                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico de confirmación. Por favor, inténtelo nuevamente.');
                }
            },
            error: function (msg) {
                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico de confirmación. Por favor, inténtelo nuevamente.');
            }
        });   
};

var cargaHmtl = function (b, t, c) {
   
    var p_RHAPRHO_CODE=$('#txtCodigo').val();

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMAPHO.ashx?OPCION=HTML" +
            "&p_RHAPRHO_CODE=" + p_RHAPRHO_CODE,
        contentType: "application/json;",
        async: false,
        dataType: false,
        success: function (res) {
 
            $('#Contenido').html(res);
            
        },
        error: function (msg) {
            //alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico de confirmación. Por favor, inténtelo nuevamente.');
        }
    });
    //Desbloquear('muestralistap');

};

var fechaCorteIni = '';
var fechaCorteFin = '';

var getFechasCorte = function () {

    $.ajax({
        type: "post",
        url: "vistas/ns/ajax/NSMAPHO.ashx?OPCION=FECHACORTE&p_RHAPRHO_CTLG_CODE=" + $('#cboEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null) {
                fechaCorteIni = datos[0].FECHA_INI_PERIODO;
                fechaCorteFin = datos[0].FECHA_FIN_PERIODO;
            } else {

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });


};

var getFechaActual = function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Enero es 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}


var oTableHorario;

var listaHorarioEmp = function () {

    var fecha = $('#txtFechaAutorizada').val();
    var empleado = $('#cboEmpleado').val();
    var ctlg_code = $('#cboEmpresa').val();
    
    if (typeof oTableHorario != "undefined") {
        oTableHorario.fnClearTable();
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmreho.ashx?OPCION=2&FECHA=" + fecha + "&PIDM=" + empleado + "&CTLG_CODE=" + ctlg_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#tbl_Horario .odd').remove()

                var json = datos;
                var parms = {
                    data: json,
                    //order: [[2, 'asc']],
                    //iDisplayLength: 25,
                    paging: false,
                    searching: false,
                    info:false,
                    columns: [

                        {
                            data: "SEQ",                            
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                $(td).css('text-align', 'center');
                                $(td).attr('style', 'display:none');
                            },
                            visible:false

                        },
                           {
                               data: "HORA_INICIO",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).css('text-align', 'center');
                               }

                           },

                               {
                                   data: "HORA_FIN",
                                   createdCell: function (td, cellData, rowData, row, col) {
                                       $(td).css('text-align', 'center');
                                   }
                               }
                                



                    ]

                }

                $('#tbl_Horario').dataTable().fnDestroy();
                oTableHorario = iniciaTabla("tbl_Horario", parms);
                $('#tbl_Horario_wrapper').children().first().html('');

            }
            else {
                $('#tbl_Horario .odd').remove()
                oTableHorario = $('#tbl_Horario').dataTable();
                $('#tbl_Horario_filter').remove()
                $('#tbl_Horario_length').remove()
                $('#tbl_Horario_paginate').remove()
                $('#tbl_Horario_info').remove()                
                $('#tbl_Horario_wrapper').children().first().html('');

                
            }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}

var funcionalidadTabla = function () {


    $('#tblHoraExtra tbody').on('click', '.Apro', function () {
        var p_RHAPRHO_USUA_ID = $('#ctl00_txtus').val();
        $('#tblHoraExtra tbody').parent().parent().addClass('selected');

        var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
        var row = oTable.fnGetData(pos);
    
        var p_RHAPRHO_CODE = row["CODIGO"];
        var USUA_APR = row["AUTORIZA"];
        var usuario = $('#ctl00_txtus').val();

        Bloquear("ventana");

        var data = new FormData();
        data.append('Opcion', "E");

        data.append('p_RHAPRHO_ESTADO_IND', "A");
        data.append('p_RHAPRHO_CODE', p_RHAPRHO_CODE);
        data.append('p_RHAPRHO_USUA_ID', p_RHAPRHO_USUA_ID);

        if (USUA_APR == '' || USUA_APR == usuario) {



            $.ajax({
                type: "POST",
                url: "vistas/ns/ajax/nsmapho.ashx",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        var ar = datos.split(',');
                        if (ar[0] == "A") datos = "Aprobado";
                        if (ar[0] == "R") datos = "Rechazado";

                        oTable.fnGetData(pos).ESTADO = datos;
                        oTable.fnGetData(pos).AUTORIZA = ar[1];
                        refrescaTabla(oTable);
                        exito();
                        ListarApro();
                        enviar(false, 'A', p_RHAPRHO_CODE);
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
        else {
            infoCustom('No puede modificar un registro aprobado o rechazado por otro usuario');
            Desbloquear("ventana");
        }


    });


    $('#tblHoraExtra tbody').on('click', '.Rech', function () {
        var p_RHAPRHO_USUA_ID = $('#ctl00_txtus').val();
        $('#tblHoraExtra tbody').parent().parent().addClass('selected');

        var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
        var row = oTable.fnGetData(pos);

        var p_RHAPRHO_CODE = row["CODIGO"];
        var USUA_APR = row["AUTORIZA"];
        var usuario = $('#ctl00_txtus').val();

        Bloquear("ventana");

        if (USUA_APR == '' || USUA_APR == usuario) {
            $.ajaxSetup({ async: false });
            $.post("vistas/NS/ajax/NSMAPHO.ASHX", { opcion: 'E', p_RHAPRHO_ESTADO_IND: 'R', p_RHAPRHO_CODE: p_RHAPRHO_CODE, p_RHAPRHO_USUA_ID: p_RHAPRHO_USUA_ID },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        var ar = res.split(',');

                        if (ar[0] == "A") res = "Aprobado";
                        if (ar[0] == "R") res = "Rechazado";

                        oTable.fnGetData(pos).ESTADO = res;
                        oTable.fnGetData(pos).AUTORIZA = ar[1];
                        refrescaTabla(oTable);
                        exito();
                        ListarApro();
                        enviar(false, 'R', p_RHAPRHO_CODE);
                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });
        }
        else {
            infoCustom('No puede modificar un registro aprobado o rechazado por otro usuario');
            Desbloquear("ventana");
        }
    });


}


var ImprimirBandeja = function (tipo) {

    var titulo = '';
    if (tipo = 'Apro') {
        titulo = 'Bandeja Aprobación Horas Extra'
    }
    else if (tipo = 'Soli') {
        titulo = ''
    }

    imprimirDiv('tblHoraExtra', titulo);
}

