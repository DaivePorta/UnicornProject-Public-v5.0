var NNLAFPP = function () {
    var plugins = function () {

        $('#slcEmpresa').select2()
        $('#cbo_estado').select2()
        $('#cbo_afp').select2()
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y');
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        });
        
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option value="T">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboAfp = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMAFPP.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_afp').empty();
                $('#cbo_afp').append('<option value="T">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_afp').append('<option value="' + datos[i].CODE_SUNAT + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_afp').select2('val', 'T');
                } else {
                    $('#cbo_afp').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("error listar afps")
            }
        });
    }

    var fillBandeja = function () {


        var parms = {
            data: null,
            //scrollCollapse: true,
            scrollX: true,
            iDisplayLength: -1,
            order : [[0,false]],
          //ordering : false,
            columns: [
                {
                    data: "DESC_CTLG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },

                {
                    data: "PERIODO_DEVENGUE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                 {
                     data: "DESC_AFP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'left')
                     }
                 },
                   {
                       data: "NRO_PLANILLA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                   ,
                   {
                       data: "NRO_EMPLEADOS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                         
                       }
                   }
                   ,
                   {
                       data: "TOTAL_FONDO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).html(formatoMiles(rowData.TOTAL_FONDO))
                           //rowData.TOTAL_FONDO
                       }
                   }
                    ,
                   {
                       data: "TOTAL_RETENCION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).html(formatoMiles(rowData.TOTAL_RETENCION))
                       }
                   }
                     ,
                   {
                       data: "NESTADO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                      ,
                   {
                       data: "FECHA_GENERACION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                    ,
                   {
                       data: "FECHA_PRESENTACION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                     ,
                   {
                       data: "USUA_PRESENTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                //TOTAL FONDO
                api.data().filter(function (e) {
                 
                    y.push(parseFloat(e.TOTAL_FONDO));
                       

                    

                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }
                $("#lbl_total_fondo").text("S/. " + formatoMiles(v_total))

                //TOTAL_RETENCION
                y = new Array();
                api.data().filter(function (e) {
                   
                    y.push(parseFloat(e.TOTAL_RETENCION));
                   

                });
                var v_total2 = 0;
                if (y.length > 0) {
                    v_total2 = y.reduce(function (a, b) { return a + b; });
                }

                $("#lbl_total_retencion").text("S/. " + formatoMiles(v_total2))

            }

        }

        oTable = iniciaTabla('tbl_afp', parms);
        $('#tbl_afp').removeAttr('style');
        $('#tbl_afp tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=NNMAFPP&codigo=' + CODIGO;
            }
        });
    }




    var eventoComtroles = function () {


        $('#btn_filtrar').on('click', function () {
            $("#btn_filtrar").blur()

            if (vErrors(["slcEmpresa"])) {
                ListaCabPlanillaAfp();
            }
        });


    }




    var ListaCabPlanillaAfp = function () {
        Bloquear("ventana");


        var emp = ""
        if($("#slcEmpresa").val() != "T"){
            emp = $("#slcEmpresa").val()
        }
        var anio = $("#optanho").val()
        var mes = "";
        if (($("#optmes").datepicker('getDate').getMonth() + 1).toString() != "NaN") {
            mes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
        }
        var estado = "";
        if ($("#cbo_estado").val() != "T") {
            estado = $("#cbo_estado").val()
        }
        var afp = "";
        if ($("#cbo_afp").val() != "T") {
            afp = $("#cbo_afp").val()
        }

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMPAFP.ashx?OPCION=3&p_CTLG_CODE=" + emp +
                                                      "&p_ANIO=" + anio +
                                                        "&p_MES=" + mes +
                                                        "&p_ESTADO_IND=" + estado +
                                                        "&p_COD_AFP_SUNAT=" + afp,
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            fillCboAfp();
            fillBandeja();
            ListaCabPlanillaAfp();
            eventoComtroles();

        }
    };

}();


var NNMAFPP = function () {



    var plugins = function () {

        $('#txt_num_planilla').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 10, "greedy": false }); });
    }





    var eventoComtroles = function () {






        $('#btn_detalle').on('click', function () {
            $('#btn_detalle').blur();

            $("#div_table").attr("style", "display:block")



        });


        $('#btn_presentar').on('click', function () {
            $('#btn_presentar').blur();

            if (vErrors(["txt_fec_presentacion", "txt_num_planilla", "txt_usua"])) {

                $("#ConfirmPresentar").modal("show");
            }

        });


        $('#btn_aceptar').on('click', function () {

            Bloquear("ventana")
            setTimeout(function () {

                Presentar_Planilla_Afp();

            }, 1000);



        });


        $('#btn_imprime').on('click', function () {
            window.print();
        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {




                var asunto = "PLANILLAS AFP - [" + $("#hf_descafp").val() + "]  [" + $("#hf_peri").val() + "]  ["+  $("#hf_desc_emp").val() + "]"

                $('#txtAsunto').val(asunto);
              
              


                var datos = [];
                datos = devuelveDatosUsuario($("#ctl00_txtus").val());
                if(datos.length > 0){
                   var nom =  datos[0]["NOMBRE"]
                }

                $('#lblAsunto').text(asunto);
                $('#lblEmpresa').text( $("#hf_desc_emp").val())
               


                $('#txtNRemitente').val(nom);
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


    var Presentar_Planilla_Afp = function () {

        var data = new FormData();

        data.append("OPCION", "3");
        data.append("p_CODIGO", $("#hf_codigo").val());
        data.append("p_NUM_PLANILLA", $('#txt_num_planilla').val());
        data.append("p_FEC_PRESENTACION", $('#txt_fec_presentacion').val());
        data.append("p_USUA_ID", $("#ctl00_txtus").val());

        $.ajax({
            url: "vistas/NN/ajax/NNMAFPP.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })


    .success(function (datos) {
        if (datos != null && datos != "") {

            switch (datos) {
                case "E":
                    noexitoCustom("Error al Presentar Planilla!")
                    Desbloquear("ventana")
                    break;
            
                case "OK":
                    $('#txt_num_planilla').attr("disabled","disabled")
                    $('#txt_fec_presentacion').attr("disabled", "disabled")
                    $("#btn_presentar").remove();

                    /*LLENO TABLA PARA IMPRESION CUANDO EL ESTADO ES PRESENTADO O PAGADO*/
                    $("#span_num_planilla").html("").html($('#txt_num_planilla').val())
                    $("#span_estado").html("").html("PRESENTADO")
                    $("#span_fec_presentacion").html("").html($('#txt_fec_presentacion').val())
                    FillTableDetalle($("#hf_codigo").val());
                    $("#btn_imprime").css("display", "")
                    $("#btnMail").css("display", "")
                    exito();
                    break;




            }



        } else { noexitoCustom("Error al Presentar Planilla!") }

      //  Desbloquear("ventana")

    })
   .error(function () {
       Desbloquear("ventana");
       noexitoCustom("Error al Presentar Planilla!")
   })

    }


    var FillTableDetalle = function (codigo) {

      Bloquear("ventana")
        var data = new FormData();

        data.append('OPCION', '2');
        data.append('p_CODIGO', codigo);

        $.ajax({

            url: "vistas/nn/ajax/NNMAFPP.ashx",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:
            function (datos) {
                if (datos != null) {

                    $('#body_table').html("");
                    $('#Tbody1').html("")
                    var total_pagar = 0;
                    var sum_primas = 0;
                    var sum_comisiones = 0;
                    var sum_aportes = 0;
                    for (var i = 0; i < datos.length; i++) {

                        var cadena = "";
                        cadena += "<tr>"
                        cadena += '<td style="text-align:right;">' + datos[i].ITEM + '</td>'
                        cadena += '<td>' + datos[i].CUSSP + '</td>'
                        cadena += '<td>' + datos[i].NOMBRES + '</td>'
                        cadena += '<td style="text-align:right;">' + formatoMiles(datos[i].REM_BASICA) + '</td>'
                        cadena += '<td style="text-align:right;">' + formatoMiles(datos[i].APORTE_OBLIGATORIO) + '</td>'
                        cadena += '<td style="text-align:right;">' + formatoMiles(datos[i].PRIMA_SEGURO) + '</td>'
                        cadena += '<td style="text-align:right;">' + formatoMiles(datos[i].COMISION_AFP) + '</td>'
                        cadena += '<td style="text-align:right;">' + formatoMiles(datos[i].TOTAL_APORTE) + '</td>'
                        cadena += "</tr>"

                        $('#body_table').append(cadena);
                        $('#Tbody1').append(cadena);
                        
                        total_pagar += parseFloat(datos[i].TOTAL_APORTE)
                        sum_primas += parseFloat(datos[i].PRIMA_SEGURO)
                        sum_comisiones += parseFloat(datos[i].COMISION_AFP)
                        sum_aportes += parseFloat(datos[i].APORTE_OBLIGATORIO)
                    }
                    $("#span_total").html("").html("S/. " + formatoMiles(total_pagar))
                    $("#span_npagar").html("").html("S/. " + formatoMiles(total_pagar))
                    $("#span_prima").html("").html("S/. " + formatoMiles(sum_primas))
                    $("#span_comision").html("").html("S/. " + formatoMiles(sum_comisiones))
                    $("#span_subtotal").html("").html("S/. " + formatoMiles(sum_comisiones + sum_primas))
                    $("#span_intereses").html("").html("S/. " + formatoMiles(0.00))
                    $("#span_total_retenciones").html("").html("S/. " + formatoMiles(sum_comisiones + sum_primas))
                    $("#span_total_fondo").html("").html("S/. " + formatoMiles(sum_aportes))

                    Desbloquear("ventana")
                }
                else { Desbloquear("ventana");alertCustom("no hay datos que mostrar"); }
            }



        });

    }

 

    var cargaInicial = function () {

        $("#txt_usua").val($("#ctl00_txtus").val())

        $(".b").attr("disabled", true);
        $(".b").css("font-weight", "700")


        var CODE = ObtenerQueryString("codigo");
        if (typeof (CODE) !== "undefined") {

            $("#btn_detalle").css("display", "block")
          

            Bloquear("ventana")
            var data = new FormData();

            data.append('OPCION', '3');
            data.append('p_CODIGO', CODE);

            $.ajax({

                url: "vistas/nn/ajax/NNMPAFP.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {

                        $("#txt_empresa").val(datos[0].DESC_CTLG)
                        $("#txt_planilla").val(datos[0].DESC_PLANILLA)
                        $("#txt_codigo").val(datos[0].CODIGO)
                        $("#hf_codigo").val(datos[0].CODIGO)
                        $("#txt_periodo").val(datos[0].PERIODO_DEVENGUE)

                        $("#txt_afp").val(datos[0].DESC_AFP)
                        $("#txt_estado").val(datos[0].NESTADO)

                        $("#txt_fondo").val("S/. " + formatoMiles(datos[0].TOTAL_FONDO))
                        $("#txt_retenciones").val("S/. " + formatoMiles(datos[0].TOTAL_RETENCION))


                        $("#txt_fec_generacion").datepicker("setDate", datos[0].FECHA_GENERACION)
                        $("#txt_fec_presentacion").datepicker("setDate", "now")
                        FillTableDetalle(datos[0].CODIGO);

                        /*LLENO TABLA PARA IMPRESION CUANDO EL ESTADO ES PRESENTADO O PAGADO*/
                        $("#span_periodo").html("").html(datos[0].PERIODO_DEVENGUE)
                        $("#span_emp").html("").html(datos[0].DESC_CTLG)
                        $("#span_afp").html("").html(datos[0].DESC_AFP)
                        $("#span_nafiliados").html("").html(datos[0].NRO_EMPLEADOS)
                        $("#img").attr("src", datos[0].IMAGEN)

                        $("#hf_descafp").val(datos[0].DESC_AFP)
                        $("#hf_img64").val((datos[0].IMAGEN.split("base64,")[1]))
                       

                        $("#hf_peri").val(datos[0].PERIODO_DEVENGUE)
                        $("#hf_desc_emp").val(datos[0].DESC_CTLG)

                        if (datos[0].RHPAFPC_ESTADO != "1") {
                            $("#btn_presentar").remove()
                            $("#btn_imprime").css("display", "")
                            $("#btnMail").css("display", "")
                            /*LLENO TABLA PARA IMPRESION CUANDO EL ESTADO ES PRESENTADO O PAGADO*/
                            $("#span_num_planilla").html("").html(datos[0].NRO_PLANILLA)
                            $("#span_estado").html("").html(datos[0].NESTADO)
                            $("#span_fec_presentacion").html("").html(datos[0].FECHA_PRESENTACION)
                            

                        } else if (datos[0].RHPAFPC_ESTADO == "1") {
                            $("#btn_presentar").css("display", "block")

                           
                        }

                        if (datos[0].NRO_PLANILLA != "-") {
                            $("#txt_num_planilla").attr("disabled", "disabled")
                            $("#txt_num_planilla").val(datos[0].NRO_PLANILLA)
                        }

                        if (datos[0].FECHA_PRESENTACION != "-") {
                            $("#txt_fec_presentacion").attr("disabled", "disabled")
                            $("#txt_fec_presentacion").datepicker("setDate", datos[0].FECHA_PRESENTACION)
                        }
                        
                        if (datos[0].USUA_PRESENTO != "-") {
                            $("#txt_usua").val(datos[0].USUA_PRESENTO)
                        }


                        

                    }
                    else { Desbloquear("ventana"); alertCustom("no hay datos que mostrar"); }
                }



            });


        } else {

            //$("#div_btn_generar").css("display", "block");
        }
    }


    return {
        init: function () {
            plugins();
            eventoComtroles();
            cargaInicial();
        }
    };

}();


var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('p_ARCHIVO', $("#hf_img64").val())
        $("#img").attr("src", "cid:pic")
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $('#datos_correo').html() + $("#imprime").html().toString() );
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());
     
       
       

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/NNMAFPP.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            exito();
            $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            $("#img").attr("src", "data:image/png;base64," + $("#hf_img64").val())
            setTimeout(function () {
                $('#divMail').modal('hide');

            }, 25);
        })
        .error(function () {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            $("#img").attr("src", "data:image/png;base64," + $("#hf_img64").val())
        });

    }
};