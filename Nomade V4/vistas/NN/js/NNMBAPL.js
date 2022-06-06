
var oTableDetPlaBa;
var NNLBAPL = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboBanco").select2();
    }

    var fillCboEmpresa = function () {
        //var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
      
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    //$('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        //CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        $('#cboEmpresa').append('<option val="TODOS"> TODOS </option>');
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        
    }

    var fillCboBanco = function () {
        //$.ajaxSetup({ async: false });
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cboBanco").html(res);
                  $('#cboBanco').append('<option val="TODOS"> TODOS </option>');
                  $('#cboBanco').select2('val','TODOS').change();
              }
          });
    }

 
    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            listaPlanillaBancaria();
        });

        $("#cboBanco").on("change", function () {
            listaPlanillaBancaria();
        });
      
    }

    var cargaInicial = function () {
        listaPlanillaBancaria();
    }



    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboBanco();            
            cargaInicial();
            //funcionalidadTabla();
        }
    };
}();


var NNMBAPL = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboBanco,#cboCtaOrigen,#cboTipoPla,#cboEmpleado,#cboBancoEmp,#cboCuentaEmp").select2();
        $('#txNomPlanilla').inputmask({ "mask": "L", "repeat": 150, "greedy": false });
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        }
    }

    var fillCboBanco = function () {
        $.ajaxSetup({ async: false });
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cboBanco").html(res);
                  $("#cboBancoEmp").html(res);
              }
          });
    }

    var fillCboMoneda = function () {
        $.ajaxSetup({ async: false });
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                $('#cboMoneda').empty();
                //$('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboMoneda').select2('val', datos[0].CODIGO).change();
            },
            error: function (msg) {
                alertCustom("La moneda no se listó correctamente");
                $('#cboMoneda').empty();
            }
        });

        $('#cboMoneda').select2('val', '');

    }

    var fillCboCuentasBanc = function () {
        var empresa = $('#cboEmpresa').val();
        var banco = $('#cboBanco').val();
        var moneda = $('#cboMoneda').val();

        if (empresa != "" && banco != "" && moneda != "") {
            $.ajax({
                type: "post",
                url: "vistas/nb/ajax/nbmccue.ashx?opcion=LCB&empresa=" + empresa + '&codigo=&P_BANC_CODE=' + banco + '&codigo=&P_MONEDA=' + moneda,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboCtaOrigen').empty();
                    $('#cboCtaOrigen').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboCtaOrigen').append('<option value="' + datos[i].CODE + '">' + datos[i].NRO_CUENTA + '</option>');
                        }
                    }
                    $('#cboCtaOrigen').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Cuentas no se listaron correctamente");
                }
            });

            $('#cboCtaOrigen').select2('val', '');
        }
        else {
            $('#cboCtaOrigen').empty();
        }
           
    }



    var fillCboCuentasBancEmp = function () {
        var banco = $('#cboBanco').val();

        var empleado = $('#cboEmpleado').val();
        var moneda = $('#cboMoneda').val();
        var mismoBanco = true;
        var indicador;
        
        if ($('#cboTipoPla').val() == '0004') {
            indicador = 'CTS';
        }
        else {
            indicador = 'AHO';
        }



        if (banco != "" && moneda != "" && empleado != "") {
            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/NNMBAPL.ashx?opcion=4&PIDM=" + empleado + '&codigo=&BANC_CODE=' + banco + '&MONEDA=' + moneda + '&ESTADO_IND=A&INDICADOR=' + indicador,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboCuentaEmp').empty();
                    $('#cboCuentaEmp').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                        
                            $('#cboCuentaEmp').append('<option value="' + datos[i].CUEN_CODE + '"  nro_cta="' + datos[i].NRO_CTA + '"   banco_code="' + datos[i].BANC_CODE + '">' + datos[i].NRO_CTA_DESC + '</option>');
                           
                            
                        }
                    }
                    $('#cboCuentaEmp').select2('val', '');

                 
                        $('#lblCuentaEmp').text('Cuenta Emp.');
                   
                   
                },
                error: function (msg) {
                    alertCustom("Cuentas de Empleados no se listaron correctamente");
                    $('#cboCuentaEmp').empty();
                    $('# lblCuentaEmp').text('Cuenta Emp.');
                }
            });

            $('#cboCuentaEmp').select2('val', '');
        }
        else {
            $('#cboCuentaEmp').select2('val', '').change();
            $('#cboCuentaEmp').empty();
        }
    }

   
    
    var fillTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=9&CODE=0&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoPla').empty();
                $('#cboTipoPla').append('<option  value =""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoPla').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    $('#cboTipoPla').select2('val', '');

                } else {
                    $('#cboTipoPla').append('<option  value =""></option>');
                    $('#cboTipoPla').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Error al Listar Tipo de Planillas");
            }
        });
    };

   
    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboBanco();
        });

        $("#cboBanco").on("change", function () {
            fillCboCuentasBanc();
        });

        $('#txtDiaPAgo').on('keyup', function () {

            $(this).siblings("small").remove();
            var valortxt;
            valortxt = $(this).val().trim()


            if (valortxt == '') { valortxt = 0 }
            if (parseInt(valortxt) <= 0 || parseInt(valortxt) > 30) {

                $(this).parent().append("<small style='color:red;'>Día Incorrecto</small>")
                $(this).parents(".control-group").addClass("error");
                $(this).addClass("errorPor");
            } else {
                $(this).parents(".control-group").removeClass("error");
                $(this).removeClass("errorPor");
            }

        });

  

        $("#cboMoneda").on("change", function () {
            fillCboCuentasBanc();
        });

        $("#cboEmpleado").on("change", function () {
            fillCboCuentasBancEmp();
   
            $("#cboCuentaEmp").select2('val', '').change();
        });

        $("#btnAdd").on("click", function () {
            AgregaDetalle();
        });


        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)

                $('#txtAsunto').val('PLANILLA BANCARIA: ' + $('#txtCodPlanilla').val() + ' - ' + $('#txNomPlanilla').val());
                $('#lblAsunto').text($('#txtCodPlanilla').val() + ' - ' + $('#txNomPlanilla').val());
                $('#lblEmpresa').text($('#cboEmpresa :selected').html());
                htmltabla = '<table class="table table-bordered">' + $("#tbl_DetPla").html().toString() + '</table>';
                $('#lblBanco').text($('#cboBanco :selected').html());
                $('#lblCuenta').text($('#cboCtaOrigen :selected').html());
                $('#lblTipoPlanilla').text($('#cboTipoPla :selected').html());
                $('#lblDiaPago').text($('#txtDiaPAgo').val());

                $('#lblTablaHtml').html(htmltabla);
                var nrofilas = oTableDetPlaBa.fnGetData().length;
                for (i = 0 ; i < nrofilas ; i++) {
                    $($('#divMail .eliminaDetalle').parents('td')[i]).css('display', 'none');
                }
                //$($('#divMail th')[7]).css('display', 'none');
                $($('#divMail th')[6]).css('display', 'none');
                //$('#txtRemitente').val(datosUsuario[0].NOMBRE);
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();
                $('#divMail').modal('show');

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












    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {

            $.ajax({
                type: "POST",
                url: "vistas/NN/ajax/NNMBAPL.ASHX?OPCION=3&CODE=" + cod ,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {

                        $('#hfCODE').val(datos[0].CODE);

                        if (datos[0].ESTADO_IND == "A") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado ').attr('checked', true).parent().addClass("checked")
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false).parent().removeClass("checked")
                        }

                        $('#cboEmpresa').select2('val', datos[0].CTLG_CODE).change();

                        $('#cboMoneda').select2('val', datos[0].MONE_CODE).change();

                        $('#cboBanco').select2('val', datos[0].BANC_CODE);
                        $('#cboBanco').change();



                        $('#cboCtaOrigen').select2('val', datos[0].CUEN_CODE).change();

                        $('#txtCodPlanilla').val(datos[0].PLANI_CODE);
                        $('#txNomPlanilla').val(datos[0].DESCRIPCION);
                        $('#txtDiaPAgo').val(datos[0].DIA_PAGO);

                        $('#cboTipoPla').select2('val', datos[0].RHTIPLA_CODE).change();

                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizaPlanillaBancaria();");
                        $('#cboEmpresa').attr('disabled', 'disabled');
                        $('#cboBanco').attr('disabled', 'disabled')
                        $('#cboMoneda').attr('disabled', 'disabled')
                        $('#cboTipoPla').attr('disabled', 'disabled');
                        //$('#divEmpleados').slideDown();
                        muestraEmpleados();
                       
                        //listaMes(datos[0].CODIGO);
                    }
                    else {
                        alertCustom("Error al obtener datos de Planilla Bancaria");
                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos de Planilla Bancaria");
                }

            });





        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }

    }

    return {
        init: function () {
            plugins();
            $('#divEmpleados').slideUp();
            eventoControles();
            fillCboEmpresa();
            fillCboMoneda();
            fillCboBanco();
            //fillCboDiaPago();
            fillTipoPlanilla();
            $('#hfCODE').val("");
            cargaInicial();
        }
    };
}();


var muestraEmpleados = function () {
    $('#divEmpleados').slideDown();
    $('#btnMail').removeAttr('disabled');
    fillCboEmpleado();
    listaDetallePlanillaBancaria();
    funcionalidadTablaDetalle();
    $('#btnMail').removeAttr('disabled');

}


var fillCboEmpleado = function () {
    var empresa = $('#cboEmpresa').val();
    $.ajax({
        type: "post",
        url: "vistas/NN/ajax/NNMBAPL.ashx?opcion=99&CTLG_CODE=" + empresa ,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: true,
        success: function (datos) {
            $('#cboEmpleado').empty();
            $('#cboEmpleado').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                }
            }
            $('#cboEmpleado').select2('val', '').change();
        },
        error: function (msg) {
            alertCustom("Los empleados no se listaron correctamente");
            $('#cboBancoEmp').empty();
            $('#cboCuentaEmp').empty();
        }
    });

    $('#cboEmpleado').select2('val', '');
}


function grabaPlanillaBancaria() {

    var data = new FormData;

    if (vErrors(["cboEmpresa", "cboBanco", "cboCtaOrigen", "txtCodPlanilla", "txNomPlanilla", "txtDiaPAgo", "cboTipoPla"])) {

        var flag = true;

        var PLANI_CODE = $('#txtCodPlanilla').val();
        var DESCRIPCION = $('#txNomPlanilla').val();
        var CTLG_CODE = $('#cboEmpresa').val();
        var BANC_CODE = $('#cboBanco').val();
        var CUEN_CODE = $('#cboCtaOrigen').val();
        var TIPLA_CODE = $('#cboTipoPla').val();
        var DIA_PAGO = $('#txtDiaPAgo').val();
        var ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var USUA_ID = $.trim($('#ctl00_lblusuario').html());
        var MONEDA = $('#cboMoneda').val();

        Bloquear("ventana");

        $.post("vistas/NN/ajax/NNMBAPL.ASHX", {
            OPCION: "1",
            PLANI_CODE: PLANI_CODE,
            DESCRIPCION: DESCRIPCION,
            CTLG_CODE: CTLG_CODE,
            BANC_CODE: BANC_CODE,
            CUEN_CODE: CUEN_CODE,
            TIPLA_CODE: TIPLA_CODE,
            DIA_PAGO: DIA_PAGO,
            ESTADO_IND: ESTADO_IND,
            USUA_ID: USUA_ID,
            MONEDA:MONEDA,
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO_DESC") {
                    alertCustom("Ya existe una Planilla Bancaria con la misma descripción");
                }
                else if (res == "DUPLICADO_COD") {
                    alertCustom("Ya existe una Planilla Bancaria con el mismo código");
                }
                //else if (res == "DUPLICADO_CUEN") {
                //    alertCustom("Ya existe una Planilla Bancaria con la cuenta seleccionada");
                //}
                else {
                    exito();
                    $('#hfCODE').val(res);
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizaPlanillaBancaria();");
                    //$('#divEmpleados').slideDown();

                    $('#cboEmpresa').attr('disabled', 'disabled');
                    $('#cboBanco').attr('disabled', 'disabled');
                    $('#cboMoneda').attr('disabled', 'disabled');
                    $('#cboTipoPla').attr('disabled', 'disabled');

                    muestraEmpleados();
                
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
                $('#hfCODE').val("");
            });

    }

}

function actualizaPlanillaBancaria() {
    var data = new FormData;

    if (vErrors(["cboEmpresa", "cboBanco", "cboCtaOrigen", "txtCodPlanilla", "txNomPlanilla", "txtDiaPAgo", "cboTipoPla"])) {

        var flag = true;

        var CODE = $('#hfCODE').val();
        var PLANI_CODE = $('#txtCodPlanilla').val();
        var DESCRIPCION = $('#txNomPlanilla').val();
        var CTLG_CODE = $('#cboEmpresa').val();
        var BANC_CODE = $('#cboBanco').val();
        var CUEN_CODE = $('#cboCtaOrigen').val();
        var TIPLA_CODE = $('#cboTipoPla').val();
        var DIA_PAGO = $('#txtDiaPAgo').val();
        var ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var USUA_ID = $.trim($('#ctl00_lblusuario').html());
        var MONEDA = $('#cboMoneda').val();

        Bloquear("ventana");

        $.post("vistas/NN/ajax/NNMBAPL.ASHX", {
            OPCION: "2",
            CODE:CODE,
            PLANI_CODE: PLANI_CODE,
            DESCRIPCION: DESCRIPCION,
            CTLG_CODE: CTLG_CODE,
            BANC_CODE: BANC_CODE,
            CUEN_CODE: CUEN_CODE,
            TIPLA_CODE: TIPLA_CODE,
            DIA_PAGO: DIA_PAGO,
            ESTADO_IND: ESTADO_IND,
            USUA_ID: USUA_ID,
            MONEDA:MONEDA,
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO_DESC") {
                    alertCustom("Existe una Planilla Bancaria con la misma descripción");
                }
                else if (res == "DUPLICADO_COD") {
                    alertCustom("Existe una Planilla Bancaria con el mismo código");
                }
                //else if (res == "DUPLICADO_CUEN") {
                //    alertCustom("Ya existe una Planilla Bancaria con la cuenta seleccionada");
                //}
                else {
                    exito();                    
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

var listaPlanillaBancaria = function () {
    var ctlg_code = $('#cboEmpresa').val();
    var banc_code = $('#cboBanco').val();

    if (ctlg_code == "TODOS") { ctlg_code = '' };
    if (banc_code == "TODOS") { banc_code = '' };

    

    if (typeof oTablePlaBa != "undefined") {
        oTablePlaBa.fnClearTable();
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmbapl.ashx?OPCION=3&CTLG_CODE=" + ctlg_code + "&BANC_CODE=" + banc_code,
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
                            data: "CODE",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                $(td).attr('style', 'display:none');
                            }

                        },
                           {
                               data: "PLANI_CODE",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).css('text-align', 'center');
                               }

                           },
                        {
                            data: "DESCRIPCION",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'center');
                            }
                        },
                           {
                               data: "CTLG_DESC",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).css('text-align', 'center');
                               }
                           },

                              {
                                  data: "BANC_DESC",
                                  createdCell: function (td, cellData, rowData, row, col) {
                                      $(td).css('text-align', 'center');
                                  }
                              },

                               {
                                   data: "MONE_DESC",
                                   createdCell: function (td, cellData, rowData, row, col) {
                                       $(td).css('text-align', 'center');
                                   }
                               },

                                 {
                                     data: "NRO_CUENTA",
                                     createdCell: function (td, cellData, rowData, row, col) {
                                         $(td).css('text-align', 'center');
                                     }
                                 },

                                  {
                                      data: "RHTIPLA_DESC",
                                      createdCell: function (td, cellData, rowData, row, col) {
                                          $(td).css('text-align', 'center');
                                      }
                                  },
                                     {
                                         data: "DIA_PAGO",
                                         createdCell: function (td, cellData, rowData, row, col) {
                                             $(td).css('text-align', 'center');
                                         }
                                     },
                                        {
                                            data: "ESTADO",
                                            createdCell: function (td, cellData, rowData, row, col) {
                                                $(td).css('text-align', 'center');
                                            }
                                        },





                 {
                     data: null,
                     defaultContent: '<a  class="btn green actualizaEstado"><i class="icon-refresh"></i></a>',
                     createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr('align', 'center')

                     }
                 }



                    ]

                }

                $('#tbl_PlaBanc').dataTable().fnDestroy();
                oTablePlaBa = iniciaTabla("tbl_PlaBanc", parms);


                $('#tbl_PlaBanc tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table = $('#tbl_PlaBanc').dataTable();
                        var pos = table.fnGetPosition(this);
                        var row = table.fnGetData(pos);
                        var code = row["CODE"];
                        window.location.href = '?f=nnmbapl&codigo=' + code;
                    }
                });


                $('#tbl_PlaBanc tbody').on('click', 'a', function () {

                    //$(this).parent().parent().addClass('selected');

                    var pos = oTablePlaBa.api(true).row($(this).parent().parent()).index();
                    var row = oTablePlaBa.fnGetData(pos);
                    var cod = row.CODE;

                    Bloquear("ventana");
                    $.ajaxSetup({ async: false });
                    $.post("vistas/NN/ajax/NNMBAPL.ASHX", {
                        OPCION: "8",
                        CODE: cod,
                    })
                        .done(function (res) {
                            Desbloquear("ventana");
                            exito();
                            listaPlanillaBancaria();
                        })
                        .fail(function () {
                            Desbloquear("ventana");
                            noexito();
                        });
                   
                });




            }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}

var listaDetallePlanillaBancaria = function () {
    var code = $('#hfCODE').val();


    if (typeof oTableDetPlaBa != "undefined") {
        oTableDetPlaBa.fnClearTable();
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmbapl.ashx?OPCION=5&CODE=" + code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                var json = datos;
                var parms = {
                    data: json,
                    //order: [[2, 'asc']],
                    iDisplayLength:-1,
                    columns: [

                        {
                            data: "ITEM",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                $(td).attr('style', 'display:none');
                            }

                        },
                           {
                               data: "FILA",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).css('text-align', 'center');
                               }

                           },
                               {
                                   data: "NRO_CUENTA",
                                   createdCell: function (td, cellData, rowData, row, col) {
                                       $(td).css('text-align', 'center');
                                   }
                               },
                                {
                                    data: "BANC_ACRO",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                        {
                            data: "NOMBRE",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'center');
                            }
                        },
                           {
                               data: "DOC_IDEN",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).css('text-align', 'center');
                               }
                           },



                                       {
                                           data: null,
                                           defaultContent: '<a  class="btn red eliminaDetalle"><i class="icon-trash"></i></a>',
                                           createdCell: function (td, cellData, rowData, row, col) {

                                               $(td).attr('align', 'center')

                                           }
                                       }



                    ]

                }

                $('#tbl_DetPla').dataTable().fnDestroy();
                oTableDetPlaBa = iniciaTabla("tbl_DetPla", parms);

            }
            else {

                oTableDetPlaBa = $('#tbl_DetPla').dataTable();
            }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}

function AgregaDetalle() {

    var data = new FormData;
    if (vErrors(["cboEmpleado",  "cboCuentaEmp"])) {

        var flag = true;

        var CODE = $('#hfCODE').val();
        var PIDM = $('#cboEmpleado').val();
        var BANC_CODE = $("#cboCuentaEmp option:selected").attr("banco_code");
        var NRO_CUENTA = $("#cboCuentaEmp option:selected").attr("nro_cta");


        



        if ($('#cboCuentaEmp option:selected').attr("nro_cta") != "") {

            Bloquear("ventana");
            setTimeout(function () {
                $.post("vistas/NN/ajax/NNMBAPL.ASHX", {
                    OPCION: "6",
                    CODE: CODE,
                    PIDM: PIDM,
                    BANC_CODE: BANC_CODE,
                    NRO_CUENTA: NRO_CUENTA,

                })
               .done(function (res) {
                   Desbloquear("ventana");
                   if (res == "OK") {

                       $("#cboEmpleado option:selected").remove()
                       $("#cboEmpleado").select2("val", "").change()
                       // $('#cboCuentaEmp').select2('val', '').change()
                       listaDetallePlanillaBancaria();
                       $($("#cboEmpleado").parent().parent()).removeClass("error")
                       $($("#cboCuentaEmp").parent().parent()).removeClass("error")
                       exito();
                   }
                   else if (res == "EMPLEADO REPETIDO") {
                       infoCustom("El empleado ya está registrado en la planila");
                       vErrorsNotMessage(['cboEmpleado']);
                   }
                   else {
                       alertCustom("Error al agregar detalle");
                   }

               })
               .fail(function () {
                   Desbloquear("ventana");
                   noexito();
               });




            }, 1000);

           

        } else { alertCustom("Error al agregar, por favor ingresar el numero de cuenta! "); }

    }

}

var funcionalidadTablaDetalle = function() {



    $('#tbl_DetPla tbody').on('click', '.eliminaDetalle', function () {
        var pos = oTableDetPlaBa.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableDetPlaBa.fnGetData(pos);

        var item = row["ITEM"];       
        var data = new FormData;
        Bloquear("ventana");
        setTimeout(function () {

            $.post("vistas/NN/ajax/NNMBAPL.ASHX", {
                OPCION: "7",
                ITEM: item,
            })
                          .done(function (res) {
                            
                              fillCboEmpleado();
                              listaDetallePlanillaBancaria();
                              $($("#cboEmpleado").parent().parent()).removeClass("error")
                              $($("#cboCuentaEmp").parent().parent()).removeClass("error")
                              exito();
                              Desbloquear("ventana");
                          })
                          .fail(function () {
                            
                              noexito();
                              Desbloquear("ventana");
                          });




        }, 1000);

          
          
      
    });

}


var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
  
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmbapl.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
              "&NREMITENTE=" + $('#txtNRemitente').val() + "&DESTINATARIOS=" + destinos +
              "&ASUNTO=" + $('#txtAsunto').val() + "&MENSAJE=" + $('#txtcontenido').val() +
              "&EMPRESA=" + $('#cboEmpresa :selected').html() + 
              "&PLANI_CODE=" + $('#txtCodPlanilla').val() +
              "&DESCRIPCION=" + $('#txNomPlanilla').val() +
              "&BANCO=" + $('#cboBanco :selected').html() +
              "&NRO_CUENTA=" + $('#cboCtaOrigen :selected').html() +
              "&TIPOPLANILLA=" + $('#cboTipoPla :selected').html() + 
              "&DIA_PAGO=" + $('#txtDiaPAgo').val() +
              "&USUA_ID=" +  $.trim($('#ctl00_lblusuario').html()) +
              "&CODE=" + $('#hfCODE').val(),
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
