var codigoCaja = "";
var codigoCtlg = "";
var codigoScsl = "";
var codigoMovi = "";
var indCerrado = "";
var fechaApertura = "";
var fechaCierre = "";

var CALDEMO = function () {

    var eventoControles = function () {

        if (indCerrado== "S"){
            $("#btnCerrarCaja").css("display", "none");
        }

        $("#btnActualizar").on('click', function () {
            listarDetallesMovimientosCaja(codigoMovi);
            listarTotales(codigoMovi);
            ListaDescEmpresa();
            ListaDescCaja();
        });

        $("#btnMail").on('click', function () {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("MOVIMIENTO DE CAJA " + codigoMovi + ", APERTURA: " + fechaApertura + ", CIERRE: " + fechaCierre + "");
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $("#btnDiferirEfectivo").on('click', function () {
            window.location.href = "?f=camdife&codcaja=" + codigoCaja + "&codempr=" + codigoCtlg + "&codscsl=" + codigoScsl;
        });
        
        $("#btnCerrarCaja").on( 'click', function (){
            window.location.href = "?f=camcerr&codcaja=" + codigoCaja + "&codempr=" + codigoCtlg + "&codscsl=" + codigoScsl + "&codultmov=" + codigoMovi + "&ind=C";
        });
        
        $("#btnRegresar").on('click', function () {
            var codigoCaja = ObtenerQueryString("codcaja");
            var codigoCtlg = ObtenerQueryString("codempr");
            var codigoScsl = ObtenerQueryString("codscsl");
            if (typeof (codigoCaja) !== "undefined" && typeof (codigoCtlg) !== "undefined" && typeof (codigoScsl) !== "undefined") {
                window.location.href = "?f=calvica&codcaja=" + codigoCaja + "&codempr=" + codigoCtlg + "&codscsl=" + codigoScsl
            }
            else {
                window.location.href = "?f=calvica"
            }
        });

        $("#btnDetallesCaja").on("click", function () {
            $("#divTotales").slideToggle();
            if ($("#btnDetallesCaja i").hasClass("icon-chevron-down")) {
                $("#btnDetallesCaja i").removeClass("icon-chevron-down");
                $("#btnDetallesCaja i").addClass("icon-chevron-up");
                $("#btnDetallesCaja span").html("&nbsp;Ocultar Totales");
            }
            else {
                $("#btnDetallesCaja i").addClass("icon-chevron-down");
                $("#btnDetallesCaja i").removeClass("icon-chevron-up");
                $("#btnDetallesCaja span").html("&nbsp;Ver Totales");
            }
        });

        $('#btnReporteDetallado').on('click', function () {
            reporte();
        });

        $('#btnReporteResumen').on('click', function () {
            reporteResumenCaja();

        });

        $("#btnVerPendientes").on("click", function () {
            var caja = ObtenerQueryString("codcaja");
            var ctlg = ObtenerQueryString("codempr");
            var scsl = ObtenerQueryString("codscsl");
            window.open('?f=CALPEND&caja=' + caja + '&ctlg=' + ctlg + '&scsl=' + scsl + '', '_blank');
        });

        $("#contenedorDetalles .portlet-title").on("click", function () {
            $("#detalles").slideToggle();
        });

    }

    var oTable;
    var IniciaTabla = function () {
        var parms = {
            data: null,
            "sDom": 'T<"clear">lfrtip',
            "sPaginationType": "full_numbers",
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
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
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            },
            "order": [[0, "desc"]],
            "scrollX": true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fechaHora"
                },
                {
                    data: "PERSONA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                  {
                      data: "DESCRIPCION_CONCEPTO",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  },
                    {
                        data: "DESCRIPCION",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                      {
                          data: "TIPO_PAGO",
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).attr('align', 'center')
                          }
                      },
                        {
                            data: "NRO_DOCUMENTO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                 {
                     data: "MONTO_INGRESO_SOLES",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'right')
                         if (rowData.MONTO_INGRESO_SOLES == "" ||
                                  rowData.MONTO_INGRESO_SOLES == "0.00") {
                             $(td).html("");
                         } else {
                             var f = formatoMiles(rowData.MONTO_INGRESO_SOLES);
                             $(td).html(f);
                         }
                     }
                 },
                 {
                     data: "MONTO_INGRESO_DOLARES",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'right')
                         if (rowData.MONTO_INGRESO_DOLARES == "" ||
                             rowData.MONTO_INGRESO_DOLARES == "0.00") {
                             $(td).html("");
                         } else {
                            var f= formatoMiles(rowData.MONTO_INGRESO_DOLARES);
                             $(td).html(f);
                         }
                     }
                 },
                  {
                      data: "MONTO_EGRESO_SOLES",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'right')
                          if (rowData.MONTO_EGRESO_SOLES == "" ||
                              rowData.MONTO_EGRESO_SOLES == "0.00") {
                              $(td).html("");
                          } else {
                              var f = formatoMiles(rowData.MONTO_EGRESO_SOLES);
                              $(td).html(f);
                          }
                      }
                  },
                    {
                        data: "MONTO_EGRESO_DOLARES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'right')
                            if (rowData.MONTO_EGRESO_DOLARES == "" ||
                                rowData.MONTO_EGRESO_DOLARES == "0.00") {
                                $(td).html("");
                            } else {
                                var f = formatoMiles(rowData.MONTO_EGRESO_DOLARES);
                                $(td).html(f);
                            }
                        }
                    },
                      {
                          data: "CAJERO",
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).attr('align', 'center')
                          }
                      },
                {
                    data: "CODIGO_VENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.CODIGO_VENTA == "" || rowData.CODIGO_VENTA== null) {
                            $(td).html("");
                        } else {
                            if ((rowData.CODIGO_VENTA).toString().search("V") == 0) {
                                var s = "<td style='text-align:center;'>";
                                s += "<span><a class='btn blue' onclick=\"imprimirDetalle('" + rowData.CODIGO_VENTA + "')\"><i class='icon-print'></i></a></span>";
                                s += "</td>";
                                $(td).html(s);
                            } else if ((rowData.CODIGO_VENTA).toString().search("AP") == 0) {
                                var s = "<td style='text-align:center;'>";
                                s += "<span><a class='btn black' onclick=\"imprimirDetalle('" + rowData.CODIGO_VENTA + "')\"><i class='icon-print'></i></a></span>";
                                s += "</td>";
                                $(td).html(s);
                            } else {
                                $(td).html("");
                            }

                        }
                    }
                }
            ]
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);
    }


    var listarDetallesMovimientosCaja = function (movi) {
        var data = new FormData();
        //data.append('OPCION', '2');
        data.append('OPCION', '5');
        data.append('p_CODE_MOVI', movi);

        Bloquear('detalles');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/caldemo.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            if (datos != null && datos.length > 0) {            
                oTable.fnClearTable();
                if (datos != null && datos.length > 0) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();
                }
            }
            Desbloquear("detalles");
        }).error(function () {
            Desbloquear("detalles");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
    }

    var listarTotales = function (movi) {
        var data = new FormData();
        data.append('OPCION', '3');
        data.append('p_CODE_MOVI', movi);

        Bloquear('divTotales');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/caldemo.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            Desbloquear("divTotales");
            if (datos != null) {
                $("#divTotales").html(datos);
                if ($("#datosMoba").val()!=undefined) {
                    $(".simboloMoba").html($("#datosMoba").val());
                    $(".simboloMoal").html($("#datosMoal").val());
                }                
            }
        }).error(function () {
            Desbloquear("divTotales");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
    }

    var cargaInicial = function () {
        codigoCaja = ObtenerQueryString("codcaja");
        codigoCtlg = ObtenerQueryString("codempr");
        codigoScsl = ObtenerQueryString("codscsl");
        codigoMovi = ObtenerQueryString("codmov");
        indCerrado = ObtenerQueryString("ind");
        if (typeof (codigoCaja) !== "undefined") {
            //listarPendientes(codigoCtlg, codigoScsl, codigoCaja);
            listarDetallesMovimientosCaja(codigoMovi);
            listarTotales(codigoMovi);
            ListaDescEmpresa();
            ListaDescCaja();
        } else {
            infoCustom2("Debe seleccionar un movimiento.")
            window.location.href = "?f=calvica"
        }
    }

    return {
        init: function () {
            cargaInicial();
            datosMovimientoCaja();
            eventoControles();
            IniciaTabla();
            
        }
    };

}();

function datosMovimientoCaja () {
    var data = new FormData();
    data.append('OPCION', '6');
    data.append('p_CODE_MOVI', codigoMovi);
    data.append('p_CTLG_CODE', codigoCtlg);
    data.append('p_SCSL_CODE', codigoScsl);
    data.append('p_CAJA_CODE', codigoCaja);
    Bloquear('detalles');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/caldemo.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        if (datos !== null) {
            fechaApertura = datos[0].FECHA_APERTURA;
            fechaCierre = datos[0].FECHA_CIERRE;
            
        }
        Desbloquear("detalles");
    }).error(function () {
        Desbloquear("detalles");
        alertCustom("Error al cargar datos de movimiento de caja.");
    });
}

function imprimirDetalle(codigo) {
    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.chat-window {display: none !important;}.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedor{display: none  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;font-size: 10px  !important;line-height: 11px  !important;}.container-fluid {padding: 0px  !important;}}</style>';
        $("#ventana").append(estilos);
    }

    //var data = new FormData();
    //data.append('OPCION', '4');
    //data.append('p_CODE_DET_MOVI', codigo);
    //Bloquear('ventana');
    //var jqxhr = $.ajax({
    //    type: "POST",
    //    url: "vistas/ca/ajax/caldemo.ASHX",
    //    contentType: false,
    //    data: data,
    //    processData: false,
    //    cache: false,
    //    async: false
    //}).success(function (datos) {
    //    if (datos != null) {
    //        $("#divDctoImprimir").html(datos);
    //        setTimeout(function () {
    //            window.print();
    //        }, 0.0000000000000001)
    //    } else {
    //        noexito();
    //    }
    //    Desbloquear("ventana");
    //}).error(function (msg) {
    //    Desbloquear("ventana");
    //    alertCustom("Error al generar detalles. Por favor intente nuevamente.");
    //});
    if (codigo.toString().search("V") == 0) {
        var data = new FormData();
        data.append('p_CODE', codigo);
        data.append('USAR_IGV_IND', '')
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {

                    $("#divDctoImprimir").html(datos);
                    setTimeout(function () {
                        window.print();
                    }, 0.0000000000000001)

                } else {
                    noexito();
                }
            })
            .error(function () {
                noexito();
            });
    } else if (codigo.toString().search("AP") == 0){
        var data = new FormData();
        data.append('p_CODE', codigo);
        data.append('USAR_IGV_IND', '')
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMANTI.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {
                    $("#divDctoImprimir").html(datos);
                    setTimeout(function () {
                        window.print();
                    }, 0.0000000000000001)

                } else {
                    noexito();
                }
            })
            .error(function () {
                noexito();
            });
    }    
}

var reporte = function () {
    Bloquear('ventana', 'Se está generando el reporte, espere un momento por favor...');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CALREPO.ashx?OPCION=5&COD_CTLG=" + codigoCtlg + "&COD_ESTABLE=" + codigoScsl + "&COD_CAJA=" + codigoCaja + "&USUA_ID=" + $('#ctl00_txtus').val() + "&COD_MOV=" + codigoMovi,
        async: true,
        success: function (datos) {
            if (datos == "ok") {
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btndescarga").click();
            }
            setTimeout(function () {
                Desbloquear('ventana');
            }, 400);
        },
        error: function (msg) {
            alertCustom("Reporte no se generó correctamente.");
            Desbloquear('ventana');
        }
    });


};

var reporteResumenCaja = function () {
    Bloquear('ventana');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CALREPO.ashx?OPCION=6&COD_CTLG=" + codigoCtlg + "&COD_ESTABLE=" + codigoScsl + "&COD_CAJA=" + codigoCaja + "&USUA_ID=" + $('#ctl00_txtus').val() + "&COD_MOV=" + codigoMovi,
        async: true,
        success: function (datos) {
            if (datos == "ok") {
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btndescarga_re").click();
            }
            setTimeout(function () {
                Desbloquear('ventana');
            }, 400);
        },
        error: function (msg) {
            Desbloquear('ventana');
            alertCustom("Reporte no se generó correctamente.");
        }
    });


};


var ListaDescEmpresa = function () {

    if (typeof (codigoCtlg) !== "undefined") {

        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $("#lblEmpresa").html("");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO == codigoCtlg) {
                            $("#lblEmpresa").html(datos[i].DESCRIPCION);
                            break;
                        }
                    }
                }
            },
            error: function (msg) {
                $("#lblEmpresa").html("");
            }
        });
    }
}


var ListaDescCaja = function () {

    if (typeof (codigoCaja) !== "undefined") {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + codigoCtlg + "&p_SCSL_CODE=" + codigoScsl + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $("#lblCaja").html("");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CAJA_CODE == codigoCaja) {
                            $("#lblCaja").html(datos[i].DESCRIPCION_CAJA);
                            break;
                        }
                    }
                }
            },
            error: function (msg) {
                $("#lblCaja").html("");
            }
        });
    }
};

function cargarCorreos() {
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

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/CA/ajax/CALDEMO.ashx?OPCION=correo" +
            "&p_CTLG_CODE=" + codigoCtlg +
            "&p_SCSL_CODE=" + codigoScsl +
            "&p_CAJA_CODE=" + codigoCaja +
            "&p_CODE_MOVI=" + codigoMovi +
            "&REMITENTE=" + $('#txtRemitente').val() +
            "&DESTINATARIOS=" + destinos +
            "&ASUNTO=" + $('#txtAsunto').val() +
            "&MENSAJE=" + $('#txtcontenido').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");
                } else {
                    exito();
                }
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


function imprimirTodo(_divs, titulo) { //arreglo de div(s) que iran,titulo(opcional) 

    var auxiliar = new Array();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    if (!(Object.prototype.toString.call(_divs) == "[object Array]")) {
        auxiliar[0] = _divs; //solo cuerpo
    } else { auxiliar = _divs; } //arreglo de div, > 1, cabeza, cuerpo, footer(alternativo) 
    //configuraciones generales
    var flag = false;
    $("div").css("display", "none");
    $(".portlet").css("border", "none");
    var url = window.location.href;

    $("body").append("<div style='top: 0;position: absolute;left: 92%;'><small>" + $("#ctl00_lblusuario").html() + "<br>" + today + "</small></div>");
    //$(".portlet").append("<div style='float:right;'><small><img style='width: 100px;' src='" + $(".brand img").attr("src") + "'/>" + "</small></div>");

    //-titulo
    $(".portlet-title").css("display", "block").attr("align", "center");
    $(".icon-reorder").css("display", "none");
    $(".chat-window").css("display", "none");
    $(".nav-tabs").css("display", "none");
    if ($.trim(titulo) != "" && titulo != undefined) $(".portlet-title h4").html(titulo);

    //-conf especiales
    for (var i = 0; i < auxiliar.length; i++) {
        var _div = "#" + auxiliar[i];
        $(".highcharts-contextmenu,.highcharts-button").css("display", "none");
        $(".highcharts-container").css("margin", "auto");
        var isdatatable = $(_div + " .dataTables_wrapper").html() != undefined ? true : false;

        if (!isdatatable) {
            $(_div + " label").css("font-weight", "bold");
            select2label(_div);
            input2label(_div);
            txtarea2label(_div);
            $(_div).css("display", "block").parents().css("display", "block");
            $(_div).attr("style", "overflow:none");
            //
            $(".page-content").attr("style", "margin-left:0px;");
            $(_div).attr("style", "width:100%;");
            $(_div + " table").attr("style", "width:100%;");
            //
            $(_div + " div").css("display", "block");
            $(".btn").css("display", "none");
        } else {
            var id_tabla = $("" + _div + " table").length > 1 ? $($("" + _div + " table")[1]).attr("id") : $("" + _div + " table").attr("id");
            if (typeof id_tabla == "undefined") {
                id_tabla = $("" + _div + " table").length > 1 ? $($("" + _div + " table")[2]).attr("id") : $("" + _div + " table").attr("id");
            }
            var ncol = $("#" + id_tabla).DataTable().column()[0].length;
            $("#" + id_tabla).DataTable().destroy();
            if ($("" + _div + " td .btn").html() != undefined) {
                $("#" + id_tabla).DataTable().column(ncol - 1).visible(false)
            } else {
                $("#" + id_tabla).DataTable();
            }
            $(_div + " div").css("display", "none");
            $("#" + id_tabla).css("display", "block");
            $("#" + id_tabla).parents().css("display", "block");
            // $("#" + id_tabla).attr("border", "1").css("width", "100%");
            $("#" + id_tabla).attr("style", "width:100% !important");
            $("#" + id_tabla + "_rppag").val("-1");
        }
    }



    //imprime
    var document_focus = false;
    $(document).ready(function () { window.print(); $(".page-content").css("display", "none"); document_focus = true; });
    var int = setInterval(function () {
        if (document_focus === true) {
            if (flag) {

            }
            window.location.href = url;
            clearInterval(int);
        }
    }, 300);

}