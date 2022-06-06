var persona = [];
var CCLCCUO = function () {

    const sMonedaBase = "PEN";
    const sSimboloMonedaBase = "S/.";
    const sMonedaAlterna = "USD";
    const sSimbMonedaAlterna = "$";


    var oTable = {};

    var plugins = function () {
        $('#cboEmpresa').select2();
        inifechas("txtDesde", "txtHasta");
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");
    }

    var fillCboEmpresa = function () {
        var cboEmpresa = $("#cboEmpresa");
        cboEmpresa.append(fnGetEmpresas());
        cboEmpresa.val($("#ctl00_hddctlg").val()).change();
    }

    var fillCboEstablecimiento = function (empresa) {
        var select = $('#cboEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + empresa,
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };
    
    function filltxtrazsocial(v_ID, v_value) {
     
        var selectRazonSocial = $(v_ID);
        //Proveedores
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    persona = datos;
                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },

                        updater: function (item) {
                            $("#hfPIDM").val("0");
                            $("#hfDNI").val("");
                            $("#hfRUC").val("");

                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfDNI").val(map[item].DNI);
                            $("#hfRUC").val(map[item].RUC);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            if (map[item].RUC == "") {
                                $("#txtRuc").val(map[item].DNI);
                            }
                            else {
                                $("#txtRuc").val(map[item].RUC);
                            }
                            return item;
                        },


                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {
                            //$(this).attr("placeholder", "TODOS");
                            $("#txtRuc").val("");
                            $("#hfPIDM").val("0");
                        }
                    });

                } else {
                    persona = [];
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html(`<input id="txtRuc" class="span3" type="text" disabled="disabled" /> 
                                       <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" placeholder="TODOS"/>`); 
            $("#hfPIDM").val("0");

            fillCboEstablecimiento(this.value);
            filltxtrazsocial('#txtrazsocial', '');                    

            $("#bloqueTotales").attr("style", "display:none;");
            $("#bloqueTipoCambio").attr("style", "display:none;"); 
        });        

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa"])) {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    obtenerReporteCuentasPorCobrar();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    obtenerReporteCuentasPorCobrar();
                } else {
                    alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
                }
            }
        });

        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblCuentasPorCobrar", "CUENTAS POR COBRAR CON CUOTAS " + $("#txtrazsocial").val() + " al " + new Date().format("dd.MM.yyyy"), "CUENTAS POR COBRAR CON CUOTAS " + $("#txtrazsocial").text())
        });

        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblCuentasPorCobrar", "CUENTAS POR COBRAR CON CUOTAS " + $("#txtrazsocial").val() + " al " + new Date().format("dd.MM.yyyy"));
        });

        $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);
    }

    var obtenerReporteCuentasPorCobrar = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_CLIE_PIDM', $("#hfPIDM").val());
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());
        data.append('p_SCSL_CODE', $('#cboEstablec').val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cc/ajax/CCLCCUO.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           oTable.fnClearTable();
           if (datos.length>0) {

               //"TotalCuentasPorCobrar              
               $("#bloqueTotales").attr("style", "display:block;");
               //Datos moneda
               $("#lblMonedaBase").html(sMonedaBase);
               $("#lblSimboloMonedaBase").html(sSimboloMonedaBase);
               $("#lblMonedaAlterna").html(sMonedaAlterna);
               $("#lblSimboloMonedaAlterna").html(sSimbMonedaAlterna);
               //Datos tipo de cambio
               $("#fechaTipoCambio").html(datos[0].FECHA_TIPO_CAMBIO);
               $("#valorTipoCambio").html(datos[0].VALOR_TIPO_CAMBIO);

               if ($("#hfFechaTipoCambio").val() != "-")
                   $("#bloqueTipoCambio").attr("style", "display:block;");
               else
                   $("#bloqueTipoCambio").attr("style", "display:block;");   

               var oConCuotas = datos.filter(function (o) { return o.CUOTAS !== null });
               var oNewObj = {};
               oConCuotas.forEach(function (obj) {
                   oNewObj = obj;
                   var oCuotasOrdenadas = JSON.parse(obj.CUOTAS).sort(function (ob1, ob2) { return parseInt(ob1.ITEM) > parseInt(ob2.ITEM) }); // de menor a mayor
                   var nCuotas = oCuotasOrdenadas.length;                
                   var nMontoTotalAmDctoB = oNewObj.AMORTIZADO_MONE_BASE;
                   var nMontoTotalAmDctoA = oNewObj.AMORTIZADO_MONE_ALTER;

                   oCuotasOrdenadas.forEach(function (objCuotas) {
                       oNewObj.CUOTAS = "Cuota " + objCuotas.ITEM + " de " + nCuotas;
                       oNewObj.FECHA_VENCIMIENTO = objCuotas.FECHA_VENC;

                       if (oNewObj.ES_MONEDA_BASE == 'S') {
                           oNewObj.MONTO_MONE_BASE = objCuotas.MONTO.Redondear(2);
                           oNewObj.MONTO_MONE_ALTER = (objCuotas.MONTO / oNewObj.VALOR_TIPO_CAMBIO).Redondear(2);                      
                       } else {
                           oNewObj.MONTO_MONE_BASE = (objCuotas.MONTO * oNewObj.VALOR_TIPO_CAMBIO).Redondear(2);
                           oNewObj.MONTO_MONE_ALTER = objCuotas.MONTO.Redondear(2);                        
                       }

                       if ((nMontoTotalAmDctoB - oNewObj.MONTO_MONE_BASE) > 0) {
                           oNewObj.POR_PAGAR_BASE = oNewObj.MONTO_MONE_BASE;
                           oNewObj.POR_PAGAR_ALTER = oNewObj.MONTO_MONE_ALTER;
                           nMontoTotalAmDctoB -= oNewObj.MONTO_MONE_BASE;
                           nMontoTotalAmDctoA -= oNewObj.MONTO_MONE_ALTER;
                       } else {
                           oNewObj.POR_PAGAR_BASE = oNewObj.MONTO_MONE_BASE - nMontoTotalAmDctoB;
                           oNewObj.POR_PAGAR_ALTER = oNewObj.MONTO_MONE_ALTER - nMontoTotalAmDctoA;
                       }
                       datos.push(JSON.parse(JSON.stringify(oNewObj)));
                   });

                   datos.splice(datos.indexOf(obj), 1);                  

               });             

               oTable.fnAddData(datos);

           } else {
               infoCustom("No existen registros.");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    var handleTable = function () {

        var parms = {
            data: null,
            columns: [
                { data: "DOCUMENTO" },
                {
                    data: "CUOTAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.CUOTAS === null) {
                            $(td).html("Sin Cuotas");
                        }                       
                    }
                },
                {
                    data: "FECHA_EMISION",
                    type: "fecha",
                    align: "center"
                },
                {
                    data: "FECHA_VENCIMIENTO",
                    type: "fecha",
                    align: "center"
                },
                { data: "MONTO_MONE_BASE",type:"formatoMiles" },
                { data: "MONTO_MONE_ALTER", type: "formatoMiles" },
                { data: "POR_PAGAR_BASE", type: "formatoMiles" },
                { data: "POR_PAGAR_ALTER", type: "formatoMiles" },
               
                { data: "GLOSA" }
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var oArrayMonBase = new Array();
                var oArrayMonAlte = new Array();
                if (api.data().length > 0) {
                    $("#btnLibroPdf,#btnLibroXls").attr("disabled", false);
                    api.data().filter(function (obj) {
                        oArrayMonBase.push(obj.POR_PAGAR_BASE);
                        oArrayMonAlte.push(obj.POR_PAGAR_ALTER);
                    });

                    if (oArrayMonBase.length > 0) {
                        var nPorPagarBase = oArrayMonBase.reduce(function (num1, num2) { return num1 + num2; });
                        $("#txtTotalMonedaBase").html(formatoMiles(nPorPagarBase));

                        $("#lblcargos").html(formatoMiles());
                    }
                    if (oArrayMonAlte.length > 0) {
                        var nPorPagarAlter = oArrayMonAlte.reduce(function (num1, num2) { return num1 + num2; });
                        $("#txtTotalMonedaAlterna").html(formatoMiles(nPorPagarAlter));
                    }
                } else {
                    $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);
                }
            },
            sDom: 'C<"clear">lfrtip',
            order : [0,'asc'],
        }
        oTable = iniciaTabla("tblCuentasPorCobrar", parms);
        //$("#divExportBtns")
        actualizarEstilos();
        $(".ColVis.TableTools").append($("#divExportBtns"));
        $('#tblCuentasPorCobrar tbody').on('dblclick', 'tr', function () {
            var pos = oTableTReg.fnGetPosition(this);
            var row = oTableTReg.fnGetData(pos);
            var tabla = row[0];
            var codigo = row[1];
            if (tabla == "VENTA") {
                if (codigo != "") {
                    window.open("?f=NVMDOCV&codigo=" + codigo, '_blank');
                }
            }

        });

    }

    var cargaInicial = function () {
        $("#hfPIDM").val("0");
        var pidm = ObtenerQueryString("p");
        if (pidm != undefined && pidm != null) {
            var nombre = "";
            for (var i = 0; i < persona.length; i++) {
                if (persona[i].PIDM == pidm) {
                    nombre = persona[i].RAZON_SOCIAL;
                    break;
                }
            }
            if (nombre != "") {
                $("#txtrazsocial").val(nombre);
                $("#txtrazsocial").keyup().siblings("ul").children("li").click();
                obtenerReporteCuentasPorCobrar();
            }
        }
    }

    return {
        init: function () {
            plugins();           
            handleTable();
            eventoControles();
            fillCboEmpresa();          
            cargaInicial();
        }
    };

}();

