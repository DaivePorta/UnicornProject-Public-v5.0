var NNLADAP = function () {
    var oTableBandejaAdelanto = [];
    const sCodEstadoGenerado = 'G';


    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();
        $('#cboEstado').select2();
        $('#txt_Anio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '+1y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());

    };

    var fillCboEmpresa = function () {

        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option   value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboSucursal").select2("val", $("#ctl00_hddestablecimiento").val()).change();

                    } else {

                        $("#cboSucursal").select2("val",datos[0].CODIGO).change();
                    }


                }
                else {
                    infocustom2("No existen establecimientos registrados")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
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
                $('#cboEmpleado').append('<option  value ="">TODOS</option>');
                if (datos != null) {
                    
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }               
                }
                $('#cboEmpleado').select2('val', '').change();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($(this).val());
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
        });

        $('#cboEmpleado').on('change', function () {
            fnGetAdelantos();
        });

        $("#txt_Mes").datepicker().on("changeDate", function () {
            fnGetAdelantos();
        });

        $("#txt_Anio").datepicker().on("changeDate", function () {
            fnGetAdelantos();
        });


        $('#chkTodos').on('change', function () {

            if ($('#chkTodos').is(':checked')) {
                $('#txt_Mes').attr('disabled', 'disabled');
                $('#txt_Anio').attr('disabled', 'disabled');

            } else {
                $('#txt_Mes').removeAttr('disabled');
                $('#txt_Anio').removeAttr('disabled');
            }
            fnGetAdelantos();
        });


        $('#cboEstado').on('change', function () {
            fnGetAdelantos();        
        });




    };


    var handleTblBandeja = function () {
        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [

                {
                    data: "NRO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                  {
                      data: "NOMBRE_EMPLEADO",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'left');
                      }
                  },


                {
                    data: "FECHA_REG",
                    stye: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(rowData.MONE_SIMB + ' ' + formatoMiles(cellData));

                    }
                },
                {
                    data: "MONTO_APR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(rowData.MONE_SIMB + ' ' + formatoMiles(cellData));;
                    }
                },
                {
                    data: "MONE_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                    }
                },
                {
                    data: "MOTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                    }
                },

                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('text-align', 'center');                
                        if (rowData.ESTADO_IND !== sCodEstadoGenerado) {
                            $(td).html("");
                        }
                        else {
                            $(td).html("<button type='button' id='btnInciaAprob' title='Aprobar' class='btn green InciaAprob' style='margin:2px;'><i class='icon-thumbs-up'></i></button>");
                            $(td).append("<button type='button' id='btnRechaAdel' class='btn red RechaAdel' title='Rechazar'><i class='icon-thumbs-down'></i></button>")
                            
                        }

                    }

                },



            ]
        }

        oTableBandejaAdelanto = iniciaTabla("tblAdelanto", parms);

        $('#tblAdelanto_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modificar la caja de texto del buscador
        $('#tblAdelanto_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modificar el combo de paginacion


        $('#tblAdelanto tbody').on('click', 'tr', function () {
            oTableBandejaAdelanto.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var pos = oTableBandejaAdelanto.fnGetPosition(this);
            var row = oTableBandejaAdelanto.fnGetData(pos);     

            var code = row.CODIGO;
            var estado = row.ESTADO_IND;
            if (estado !== sCodEstadoGenerado) {
                window.location.href = '?f=nnmadap&code=' + code;
            }

        });


        $('#tblAdelanto tbody').on('click', '.InciaAprob', function () {
            var pos = oTableBandejaAdelanto.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableBandejaAdelanto.fnGetData(pos);
            iniciaAprobacion(row.CODIGO);
        });

        $('#tblAdelanto tbody').on('click', '.RechaAdel', function () {
            var pos = oTableBandejaAdelanto.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableBandejaAdelanto.fnGetData(pos);
            rechazarAdelanto(row.CODIGO);
        });



    };

    var fnGetAdelantos = function () {
        Bloquear('divAdelanto');
        let pidmEmp = '';
        let mesSelect = '';
        let anioSelect = '';
        let sEstado = '';
        let sCodeSelect = '';
        let ctlg_code = '';
        let scsl_code = '';

         pidmEmp = $('#cboEmpleado').val();
        if ($('#chkTodos').is(':checked')) {
            mesSelect = '0';
            anioSelect = '0';
        }
        else {
            mesSelect =  $('#txt_Mes').datepicker('getDate').getMonth() + 1;
            anioSelect =  $('#txt_Anio').val();
        }

        sEstado =  $('#cboEstado').val();
        sCodeSelect = '0'
        ctlg_code = $('#cboEmpresa').val();
        scsl_code = $('#cboSucursal').val();

        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=7" +
            "&PIDM=" + pidmEmp +
            "&MES=" + mesSelect +
            "&ANIO=" + anioSelect +
            "&ESTADO_IND=" + sEstado +
            "&p_CODE=" + sCodeSelect + 
            "&CTLG_CODE=" + ctlg_code +
            "&SCSL_CODE=" + scsl_code ,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableBandejaAdelanto.fnClearTable();
                if (datos != null && datos.length > 0) {
                    oTableBandejaAdelanto.fnAddData(datos);
                    Desbloquear('divAdelanto');
                }
                else {
                    infoCustom2("No hay adelantos para aprobar.")
                    oTableBandejaAdelanto.fnClearTable();
                    Desbloquear('divAdelanto');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de detalle de garantía");
                Desbloquear('divAdelanto');
                oTableDetGarantia.fnClearTable();
            }
        });
    };


    var rechazarAdelanto = function(code) {
                var USUA_ID = $.trim($('#ctl00_lblusuario').html());

                var data = new FormData();
                data.append('OPCION', "8");

                data.append('CODE', code);
                data.append('USUA_ID', USUA_ID);
        
                Bloquear("ventana");

                $.ajax({
                    type: "POST",
                    url: "vistas/nn/ajax/nnmadem.ashx",
                    data: data,
                    contentType: false,
                    processData: false,
                    cache: false,
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos != null) {
                            if (datos[0].SUCCESS == "OK") {                                                 
                                exito();
                                fnGetAdelantos();
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

    };

    var iniciaAprobacion = function(code) {
        window.location.href = '?f=nnmadap&code=' + code;    
    };


    function cargainicial() {
        $('#chkTodos').attr('checked', true).parent().addClass("checked")
        fillCboEmpresa();
        fillCboEstablecimiento( $("#cboEmpresa").val());
        $('#cboEstado').select2('val', sCodEstadoGenerado);
        $('#chkTodos').change();

    };

    return {
        init: function () {
            plugins();
            handleTblBandeja();
            eventoControles();
            cargainicial();
        }
    };


}();


var oTableAdelantoDet = [];
var NNMADAP = function () {
   

    let diasCorte = 0;

    var plugins = function () {
       
        $('#txt_Anio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '+1y').datepicker('setStartDate', 'y').keydown(function () { return false; });
        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());
        $('#txt_Mes').datepicker('setStartDate', new Date())
 
        $('#txtMotivo').inputmask({ "mask": "L", "repeat": 100, "greedy": false });
    }

    var fillCboMoneda = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" val_simb="' + datos[i].SIMBOLO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    if ($('#hfMOBA_CODE').val() != '') {
                        $("#cboMoneda").select2('val', $('#hfMOBA_CODE').val()).change();
                    }
                    else {
                        $("#cboMoneda").select2('val', datos[0].CODIGO).change();
                    }
                } else {
                    $('#cboMoneda').append('<option  value =""></option>');
                    $('#cboMoneda').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=9&CODE=0&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoPlanilla').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoPlanilla').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    $("#cboTipoPlanilla").select2('val', datos[0].CODIGO).change();
                 
                } else {
                    $('#cboTipoPlanilla').append('<option  value =""></option>');
                    $('#cboTipoPlanilla').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

   
    var eventoControles = function () {

            
        $('#cboMoneda').on('change', function () {
            var val_simb = $('#cboMoneda [value="' + $('#cboMoneda').val() + '"]').attr('val_simb');
            $('#lblSimb').text(val_simb);
            $('#lblSimb2').text(val_simb);            
            
        });

        $('#txtMonto').on('keyup', function () {
            if ($(this).val().trim() == '') { $(this).val('0') }
        });
        
        $('#btnConfirmar').on('click', function () {
            if ($('#btnConfirmar').attr('disabled') != 'disabled') {

                if (parseFloat($('#txtMonto').val()) > 0) {
                    $('#DivPlanillas').slideDown();
                    $('#txtMonto').attr('disabled', 'disabled')
                    $('#btnConfirmar').attr('disabled', 'disabled');
                }
                else {
                    alertCustom("Confirmne Monto mayor a 0")                        
                }
             
            }
        });

        $("#txt_Anio").datepicker().on("changeDate", function () {
            var date = new Date();
            var year = date.getFullYear();
            var monthAct = date.getMonth() + 1;
            var yearCont = $('#lblFechaFin').text().substring(6, 10);
            var mesCont = $('#lblFechaFin').text().substring(3, 5);
            mesCont = parseInt(mesCont).toString();

            if (year == $('#txt_Anio').val()) {
                //$('#txt_Mes').datepicker('setStartDate', new Date()).datepicker('update');
                $('#txt_Mes').datepicker('setStartDate', '+'+monthAct.toString()+'mm').datepicker('update');
                $('#txt_Mes').datepicker('setEndDate', '+' + mesCont + 'mm').datepicker('update');
            }
            else if (yearCont == $('#txt_Anio').val()) {
                $('#txt_Mes').datepicker('setStartDate', '+1mm').datepicker('update');
                $('#txt_Mes').datepicker('setEndDate', '+' + mesCont + 'mm').datepicker('update');
            }
            else {
                $('#txt_Mes').datepicker('setStartDate', '+1mm').datepicker('update');
                $('#txt_Mes').datepicker('setEndDate', '+12mm').datepicker('update');
            }

        });


        $('#grabar').on('click', function () {
            if ($('#grabar').attr('disabled') != 'disabled') {
                $('#lblMensaje').text('Desea aprobar el adelando de: S/.' + $('#txtMonto').val() + ' al empleado ' + $('#lblEmpleado').text() + '?');
                $('#MuestraModalAceptar').show()
            }
        });

        $('#cancelar').on('click', function () {
            CancelarAdelanto();
        });


        $('#btnAceptarModal').on('click', function () {
            var flag = true
            if (parseFloat(sumaTabla()) != parseFloat($('#txtMonto').val())) {
                flag = false;
                alertCustom("Debe completar de los descuentos en planilla.");
            }
            if (flag) {
                RegistrarDetalleAdelanto();
            }
           
        });


        $('#btnCancelarModal').on('click', function () {
            $('#lblMensaje').text('');
            $('#MuestraModalAceptar').hide();
        });

        $('#btnAgregaDetalle').on('click', function () {
            AgregarDetalleAdelanto();
        });

        

    }


    var cargarParametrosSistema = function () {

        //OBTENER PARAMETRO DE REDONDEO
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MOBA",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfMOBA_CODE').val(datos[0].VALOR);
                }
                else {
                    alertCustom("No se recuperó el Parámetro de Moneda Base correctamente!");
                    $('#hfMOBA_CODE').val('');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


     var handleTblAdelantoDet = function () {
        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns:  [
                          {
                              data: "CODE",
                              visible: false,
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).css('display', 'none');
                              }
                          },
                          {
                              data: "MES",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).css('display', 'none');

                              },

                              visible: false
                          },
                          
                             {
                                 data: "ANIO",
                                 visible: false,
                                 createdCell: function (td, cellData, rowData, row, col) {
                                     $(td).attr('align', 'center');
                                     $(td).css('display', 'none');
                                 }
                             },
                                  {
                                      data: "MESANIO",
                                      visible: false,
                                      createdCell: function (td, cellData, rowData, row, col) {
                                          $(td).attr('align', 'center');
                                          $(td).css('display', 'none');
                                      }
                                  },
                         {
                             data: "PERIODO",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center');
                             }
                         },

                         {
                             data: "CODE_PLANILLA",
                             visible: false,
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center');
                                 $(td).css('display', 'none');
                             }
                         },


                           {
                               data: "PLANILLA",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).attr('align', 'center');
                               }
                           },


                         {
                             data: "MONTO",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center');
                             }
                         },
                          {
                              data: "ESTADO_IND",
                              visible: false,
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center');
                                  $(td).css('display', 'none');
                              }
                          },
                         {
                             data: "ESTADO",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center');
                             }
                         },

                          {
                              data: null,
                              defaultContent: '<a  class="btn red eliminar"><i class="icon-minus"></i></a>',
                              createdCell: function (td, cellData, rowData, row, col) {

                                  $(td).attr('align', 'center')

                              }
                          }

                    ]
        }

        oTableAdelantoDet = iniciaTabla("tblDetalleAdelanto", parms);
         
        $('#tblDetalleAdelanto_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modificar la caja de texto del buscador
        $('#tblDetalleAdelanto_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modificar el combo de paginacion


        $('#tblDetalleAdelanto tbody').on('click', 'tr', function () {
            oTableAdelantoDet.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var pos = oTableAdelantoDet.fnGetPosition(this);
            var row = oTableAdelantoDet.fnGetData(pos);     
        });


        $('#tblDetalleAdelanto tbody').on('click', '.eliminar', function () {
            var pos = oTableAdelantoDet.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableAdelantoDet.fnGetData(pos);
           
            let estado_ind = row.ESTADO_IND;

            if (estado_ind == 'G') {
                oTableAdelantoDet.fnDeleteRow(pos);
            }
            else {
                alertCustom("No se puede eliminar registro")
            }
                  
        });

    };


    function cargainicial() {
        var code = ObtenerQueryString("code");
        fillCboMoneda();
        fillTipoPlanilla();
        $('#DivPlanillas').slideUp();

        if (code != undefined) {
            
            CargaDatosAdelanto(code);
            //listarDetalle(code);

            var dateAct = new Date();
            var yearAct = dateAct.getFullYear();
            var AnioCont = $('#lblFechaFin').text().substring(6, 10);
            var resta = parseInt(AnioCont) - parseInt(yearAct);

            $('#txt_Anio').datepicker("setDate", new Date()).datepicker('setEndDate', '+' + resta.toString() + 'y').datepicker('setStartDate', 'y');
                                    
        }
        else {
            $('#hfRHADEMP_CODE').val('')
            window.location.href = '?f=nnladap';
        }
    }


    var CargaDatosAdelanto = function(code) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmadem.ashx?OPCION=6&PIDM=&MES=0&ANIO=0&ESTADO_IND=&CODE=" + code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {


                if (datos != null) {
                    $('#lblNroDoc').text(datos[0].NRO_DOCUMENTO);
                    $('#lblFechaReg').text(datos[0].FECHA_REG);

                    $('#lblEmpresa').text(datos[0].EMPRESA);
                    $('#lblSucursal').text(datos[0].SUCURSAL);
                    $('#lblEmpleado').text(datos[0].NOMBRE_EMPLEADO);

            
                    $('#lblMonto').text(datos[0].MONTO);
                    $('#txtMonto').val(datos[0].MONTO);
                    $('#cboMoneda').select2('val', datos[0].MONE_CODE).change();
                    $('#txtMotivo').val(datos[0].MOTIVO);

                    $('#txtMotivo').attr('disabled', 'disabled');

                    $('#hfRHADEMP_CODE').val(code);
                    $('#hfCTLG_CODE').val(datos[0].CTLG_CODE);
                    $('#hfPIDM').val(datos[0].PIDM);
                    $('#hfCodeAdel').val(datos[0].CODIGO);
                    $('#hfSCSL_CODE').val(datos[0].SCSL_CODE);
                    $('#hfEstadoAdel').val(datos[0].ESTADO_IND);


                    CargaContrato(datos[0].PIDM);
                    cargarDiasCorte();
                }
                else {
                    alertCustom("Error al Cargar los datos del adelanto");
                }
            },
            error: function (msg) {

                alert(msg);
            }
        });

    }


    var CargaContrato = function(v_PPBIDEN_PIDM) {
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=CONT&PIDM=" + v_PPBIDEN_PIDM + "&CTLG_CODE=&SCSL_CODE=&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null) {
                    $('#lblFechaIni').text(datos[0].FECHA_INI);
                    if (datos[0].FECHA_CESE = '') {
                        $('#lblFechaFin').text(datos[0].FECHA_CESE);
                    }
                    else {
                        $('#lblFechaFin').text(datos[0].FECHA_FIN);
                    }               
                    $('#lblEstaddoCont').text(datos[0].ESTADO);
                }
                else {
                    alertCustom("El empleado seleccionado no tiene un contrato asignado");
                    $('#lblEstaddoCont').text('SIN CONTRATO');
                }
            },
            error: function (msg) {
                noexitoCustom(msg);
            }
        });

    }


    
    var cargarDiasCorte = function () {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmadem.ashx?OPCION=12&CODE=" + $('#hfCTLG_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    diasCorte = datos[0].DIAS_CORTE;
                }
                else {
                    diasCorte = 0;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }



    var AgregarDetalleAdelanto = function () {

        if ($('#btnAgregaDetalle').attr('disabled') != 'disabled') {

            var flag = true;
            var date = new Date();
            var mesact = date.getMonth() + 1;
            var anioact = date.getFullYear();
            var messelect = $('#txt_Mes').datepicker('getDate').getMonth() + 1;
            var proxmes = date.getMonth() + 2
            var mescad;
            if (mesact.toString().length == 1) {
                mescad = '0' + mesact;
            }
            else {
                mescad = mesact;
            }
            var fechaquincena = '15/' + mescad + '/' + anioact.toString();
            var fechaproxmes = anioact.toString() + '-' + proxmes.toString() + '-' + '1';
            var fechafinmes = new Date(fechaproxmes).setDate(new Date(fechaproxmes).getDate() - (1 + diasCorte));
            var x = new Date(fechafinmes)


            if (!vErrors(['txtMonto', 'cboTipoPlanilla', 'txt_Mes', 'txt_Anio', 'txtMontoDet'])) {
                flag = false;
                return false;
            }
            else if (parseFloat($('#txtMontoDet').val()) <= 0) {
                flag = false;
                alertCustom("Ingrese monto mayor a 0")
                return false;
            }
            else if ((parseFloat(sumaTabla()) + parseFloat($('#txtMontoDet').val())) > parseFloat($('#txtMonto').val())) {
                flag = false;
                alertCustom("El monto total supera al monto aprobado");
                return false;
            }

            var fechaval = new String();
            if ($('#cboTipoPlanilla').val() == '0002') {
                fechaval = fechaquincena;
                fechaval = (fechaval).split("/").reverse().join("");
            }
            else {

                fechaval = ConvertirDate(x.toLocaleDateString());
                fechaval = (fechaval).split("-").join("");
            }

            var fechafinCont = ($('#lblFechaFin').text()).split("/").reverse().join("");


            if (parseInt(fechaval) >= parseInt(fechafinCont)) {
                flag = false;
                alertCustom("La planilla no puede ser mayor a la fecha de fin de contrato");
                return false;
            }

            if (mesact == messelect) {
                if ($('#cboTipoPlanilla').val() == '0002' && (DateDiff(new Date(ConvertirDate(fechaquincena)), new Date(ConvertirDate(date.toLocaleDateString()))) < 1)) {
                    flag = false;
                    alertCustom("No se puede descontar en la planilla quincenal actual , de ser máximo con un dia antes de la quincena");
                    return false;
                }
                else if ($('#cboTipoPlanilla').val() == '0002' && (DateDiff(new Date(ConvertirDate(x.toLocaleDateString())), new Date(ConvertirDate(date.toLocaleDateString()))) < 1)) {
                    alertCustom("No se puede descontar en la planilla mensual actual , de ser máximo con un dia antes de la fecha de corte");
                    return false;
                }

            }



            var mes = $('#txt_Mes').datepicker('getDate').getMonth() + 1
            var mes_cad
            if (mes.toString().length == 1) {
                mes_cad = '0' + mes
            } else {
                mes_cad = mes
            }
            var a = {
                "CODE": '0',
                "MES": mes,
                "ANIO": $('#txt_Anio').val(),
                "MESANIO": $('#txt_Anio').val() + mes_cad,
                "PERIODO": $('#txt_Mes').val() + ' ' + $('#txt_Anio').val(),
                "CODE_PLANILLA": $('#cboTipoPlanilla').val(),
                "PLANILLA": $('#cboTipoPlanilla option:selected').html(),
                "MONTO": parseFloat($('#txtMontoDet').val()).toFixed(2),
                "ESTADO_IND": 'G',
                "ESTADO": 'GENERADO',

            }

            var ar = oTableAdelantoDet.fnGetData();
            ar.filter(function (e, f) {
                if (e.MES == mes && e.ANIO == $('#txt_Anio').val() && e.CODE_PLANILLA == $('#cboTipoPlanilla').val()) {

                    alertCustom("Planilla y Periodo ya ingresados")
                    flag = false;

                }

            });
            if (flag) {
                oTableAdelantoDet.fnAddData(a);
            }
        }
    }


    var CancelarAdelanto = function () {
        if ($('#cancelar').attr('disabled') != 'disabled') {
            oTableAdelantoDet.fnClearTable();
            $('#DivPlanillas').slideUp();
            $('#txtMontoDet').val('');
            $('#btnConfirmar').removeAttr('disabled');
            $('#txtMonto').removeAttr('disabled');
        }
    }


    var  RegistrarDetalleAdelanto = function() {


        if ($('#grabar').attr('disabled') != 'disabled') {
            var tablas = datosTabla();
            var data = new FormData;

            var flag = true;

            data.append('CODE', $('#hfRHADEMP_CODE').val());
            data.append('MONTO', $('#txtMonto').val());
            data.append('DETALLE', tablas);
            data.append('USUA_ID', $.trim($('#ctl00_lblusuario').html()));
            data.append('MONE_CODE', $('#cboMoneda').val());
            data.append('PIDM', $('#hfPIDM').val());
            data.append('NRO_DOC', $('#lblNroDoc').text());
            data.append('CTLG_CODE', $('#hfCTLG_CODE').val());
            data.append('SCSL_CODE', $('#hfSCSL_CODE').val());


            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nn/ajax/NNMADEM.ashx?OPCION=11",
                contentType: false,
                data: data,
                processData: false,
                cache: false,

                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].SUCCESS == "OK") {
                            exito();
                            $('#MuestraModalAceptar').hide();
                            DeshabilitaAdelantos();
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



    var datosTabla = function() {
        var datos_tabla;
        var datos_fila = '';

        var MES, ANIO, CODE_PLANILLA, MONTO, ESTADO_IND;

        $.each(oTableAdelantoDet.fnGetData(), function (key, value) {
            MES = value.MES;
            ANIO = value.ANIO;
            CODE_PLANILLA = value.CODE_PLANILLA;
            MONTO = value.MONTO;
            ESTADO_IND = value.ESTADO_IND;

            datos_fila += MES + ',' + ANIO + ',' + CODE_PLANILLA + ',' + MONTO + ',' + ESTADO_IND;
            datos_fila += '|';
        });

        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }


    var DeshabilitaAdelantos = function() {

        $('#grabar').attr('disabled', 'disabled');
        $('#cancelar').attr('disabled', 'disabled');
        $('#btnConfirmar').attr('disabled', 'disabled');
        $('#txtMonto').attr('disabled', 'disabled');
        BloquearSinGif('#DivPlanillas');
    }





    return {
        init: function () {
            plugins();
            handleTblAdelantoDet();
            eventoControles();
            cargainicial();

        }
    };


}();





function sumaTabla() {

    var c = $("#tblDetalleAdelanto").DataTable().columns(0).data()
    var b = $("#tblDetalleAdelanto").DataTable().columns(7).data()

    var suma;

    if (c[0][0] != undefined) {

        suma = "0";
        for (var i = 0; i < b[0].length; i++) {
            suma = parseFloat(suma) + parseFloat(b[0][i])
        }

    }
    else { suma = "0" }

    return suma
}




function DeshabilitaRechazados() {
    $('#grabar').attr('disabled', 'disabled');
    $('#cancelar').attr('disabled', 'disabled');
    $('#btnAgregaDetalle').attr('disabled', 'disabled');
    $('#txt_Mes').attr('disabled', 'disabled');
    $('#txt_Anio').attr('disabled', 'disabled');
    $('#cboTipoPlanilla').attr('disabled', 'disabled');
    $('#btnConfirmar').attr('disabled', 'disabled');
    $('#txtMonto').attr('disabled', 'disabled');
    $('#txtMontoDet').attr('disabled', 'disabled');
}


