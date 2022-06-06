
var GLLRENO = function () {

    var fillCboEmpresa = function () {

        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $('#cboEmpresa').select2();
        $("#cboEmpresa").val($("#ctl00_hddctlg").val());
        $('#cboEmpresa').change();
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillTablaLetra(this.getAttribute("tipo"));
        });        
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "NUMERO" },
                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + formatoMiles($(td).html()));
                    }
                },
                { data: "EMPRESA.NOMBRE" },
                { data: "GLOSA" }
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                var empresa = row.EMPRESA.CODIGO;

                window.location.href = '?f=glmreno&codigo=' + codigo + '&tipo=' + 'L' + '&empresa=' + empresa;
            }

        });


    }

    var fillTablaLetra = function (tipo) {
        var empresa = $('#cboEmpresa').val();
        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMRENO.ashx?flag=6&empresa=" + empresa + "&tipo=" + tipo,
            //url: "vistas/gl/ajax/GLMRENO.ashx?flag=6",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos != null)
                    oTable.fnAddData(datos);
                else
                    infoCustom("No se encontraron registros.");
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            eventos();
            fillCboEmpresa();
            creaTablaVacia();

        }
    };

}();


var GLMRENO = function () {

    var bBalanceado = false;
    var sMoneda = "";
    var ObjJsonRowSelected = null;
    var ObjJsonRowSelectedDetalle = null;
    var tipoLetra = "";
    var cTipo = "";
    var nPlazoDiasLinea = 0;

    //var cargarCombos = function () {
    //    $.ajaxSetup({ async: false });
    //    $("#slcEmpresa").select2();
    //    $.post("vistas/GL/ajax/GLMRENO.ASHX", { flag: 5 },
    //        function (res) {
    //            if (res != null && res != "" && res.indexOf("error") < 0) {
    //                $("#slcEmpresa").html(res);
    //            }

    //        });
    //    $.ajaxSetup({ async: true });
    //}

    var cargarCombos = function () {
        $("#slcEmpresa").select2();
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '" data-pidm = "' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());


                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        $("#cboEstablecimiento").select2();
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                //selectEst.append('<option></option>');
                if (datos != null) {
                    // $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    var dataTable = function () {
        cargatablavacia();
    }

    var fnGetLineaCredito = function (tipo, pidm, empresa) {
        if (tipo === 'C') {//cliente
            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El cliente no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del Cliente.");
                }
            });
        } else { //proveedor

            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El proveedor no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del proveedor.");
                }
            });
        }
    }

    var funcionalidad = function () {

        $('#slcEmpresa').on('change', function () {
            fillCboEstablecimiento();            
        });

        $("#txtFechaRegistro").datepicker("setDate", new Date()).attr("disabled", true);

        confirmacion();

        $("#btnBuscaDoc").click(function () {
            tipo = "L"; // letra            
            ref = 'M'; // Maestro
            buscaDocumento(tipo, "N", "", tipoLetra, "", "");
        });

        $("#chkLetrasFijas").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoLetras").attr("disabled", false);
            } else {
                $("#txtPeriodoLetras").val("");
                $("#txtPeriodoLetras").attr("disabled", true);
            }
        });

        $("#btnSimular").click(function () {
            if (!vErrorBodyNotIcon(["txtnumdoc", "txtNroLetras", "txtFechaGiro"])) {
                let dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                let nroLetras = parseInt($("#txtNroLetras").val());
                let bLetrasFijas = $("#chkLetrasFijas").is(":checked");
                let dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                var objArrayLetrasGen = new Array();
                var suma = 0;


                //.format("dd/MM/yyyy")
                if (bLetrasFijas) {
                    if (!vErrorBodyNotIcon(["txtPeriodoLetras"])) {
                        let nPeriodoLetras = parseInt($("#txtPeriodoLetras").val());
                        if ((nPeriodoLetras * nroLetras) <= nPlazoDiasLinea) {
                            for (var i = 0; i < nroLetras; i++) {
                                let objJsonLetraGen = {};
                                objJsonLetraGen.NRO_DOC_DETALLE = ObjJsonRowSelected.NUMERO + "-" + (i + 1);
                                objJsonLetraGen.NRO_DIAS = nPeriodoLetras * (i + 1);
                                objJsonLetraGen.FECHA = dFechaInicial.addDays(nPeriodoLetras * (i + 1)).format("dd/MM/yyyy");

                                if (i == nroLetras - 1) {
                                    objJsonLetraGen.MONTO = ObjJsonRowSelected.MONTO - suma;
                                } else {
                                    suma += (ObjJsonRowSelected.MONTO / nroLetras).Redondear(2);
                                    objJsonLetraGen.MONTO = (ObjJsonRowSelected.MONTO / nroLetras).Redondear(2);
                                }
                                
                                objArrayLetrasGen.push(objJsonLetraGen);

                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }

                } else {

                    for (var i = 0; i < nroLetras; i++) {
                        let objJsonLetraGen = {};
                        objJsonLetraGen.NRO_DOC_DETALLE = ObjJsonRowSelected.NUMERO + "-" + (i + 1);
                        objJsonLetraGen.NRO_DIAS = 1;
                        objJsonLetraGen.FECHA = "";
                        objJsonLetraGen.MONTO = 1;
                        objArrayLetrasGen.push(objJsonLetraGen);
                    }

                }

                oTable_detalle.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle.fnAddData(objArrayLetrasGen);
                    if (!bLetrasFijas) {
                        switch (cTipo) {
                            case "C": editaTabla(); break;
                            case "P": editaTablaCompra(); break;
                        }                      
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        function buscaDocumento(tipo, canje, moneda, tipod, tipodn, codigo) {


            $("#documentosModal_title").html("BUSCAR LETRA " + tipodn);
            $.ajax({
                type: "POST",
                url: "vistas/GL/ajax/GLMRENO.ASHX?flag=4&empresa=" + $("#slcEmpresa").val() + "&canje=" + canje + "&moneda=" + moneda + "&tipo=" + tipod + "&codigo=" + codigo + "&renova_ind=S", // canjeadas
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos.length > 0) {
                        var json = new Array();
                        if ($("#txtnumdoc").val() != "") {
                            datos.filter(function (e) {
                                if (JSON.stringify(e) != JSON.stringify(ObjJsonRowSelected) && e.ESTADO_LETRA != 'P') {
                                    json.push(e);
                                }
                            }); // no pagadas y no seleccionadas
                        } else {
                            datos.filter(function (e) {
                                if (e.ESTADO_LETRA != 'P') {
                                    json.push(e);
                                }
                            }); // no pagadas y no seleccionadas
                        }
                    }
                    oTableModal_doc.fnClearTable()
                    if (json != null && json[0] != null) {
                        oTableModal_doc.fnAddData(json);
                    }

                }
            });


            if (ref == "D") {
                oTableModal_doc.api(true).columns(1).visible(false);
            } else {
                oTableModal_doc.api(true).columns(1).visible(true);
            }

            if (codigo == "") {
                $("#documentosModal").modal('show');
            }
        }

        $("#grabarA").click(function () {
            $("#confirmacionModal").modal("show");
        });



    


    }

    var editaTabla = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0])) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 1) {
                        return false;
                    }
                    if ($(input.parents("form")[0]).hasClass("monto")) {
                        if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > ObjJsonRowSelected.MONTO) {
                            infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                            input[0].value = parseFloat(original);
                            $(input.parents("form")[0]).submit();
                        } else {
                            return true;
                        }
                    }

                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    var editaTablaCompra = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                {
                    cssclass: "required nletra",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                },          
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {

                if ($(input.parents("form")[0]).hasClass("nletra")) {
                    var oArrayColumnaLetras = oTable_detalle.api(true).column(0).data();
                    if (oArrayColumnaLetras.indexOf(input[0].value) >= 0 && input[0].value != original) {
                        infoCustom("Número de letra ya existe en tabla");
                        input[0].value = original;
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

                if ($(input.parents("form")[0]).hasClass("number")) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 1) {
                        return false;
                    }
                    if ($(input.parents("form")[0]).hasClass("monto")) {
                        if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > ObjJsonRowSelected.MONTO) {
                            infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                            input[0].value = parseFloat(original);
                            $(input.parents("form")[0]).submit();
                        } else {
                            return true;
                        }
                    }
                }

                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    

    var cargaInicial = function () {

    var codigo = ObtenerQueryString("codigo");
    var tipo = ObtenerQueryString("tipo");
    var empresa = ObtenerQueryString("empresa");

    if (codigo != null) {
        ref = 'M';
        $("#btnBuscaDoc").css("display", "none");
        $("#slcEmpresa").val(empresa).change();
        $("#divPrmtsSimulacion, #grabarA").remove();
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMRENO.ASHX?flag=4&empresa=&canje=&moneda=&tipo=&renova_ind=&codigo=" + codigo,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var json = datos;

                if (json != null) { funcionRegistro(json[0]); }

            }
        });

    }

}
    
    var CreaModal = function () {

    var cuerpo = `<div class="row-fluid">
                      <div class="span12">
                       <table id="tblModalDoc" border="0" class="display DTTT_selectable" style="display:none;" >     
                               <thead>    
                                    <tr>  
                                       <th>NRO DOCUMENTO
                                       </th>    
                                       <th>TIPO    
                                       </th>
                                       <th>REFERENTE
                                       </th> 
                                       <th>FECHA EMISION
                                       </th>
                                       <th>FECHA VENC.
                                       </th>
                                        <th>MONEDA
                                       </th>
                                        <th>MONTO
                                       </th>
                                    </tr>
                                </thead>
                          </table>    
                      </div>
                      </div>`;

    var titulo = "BUSCAR DOCUMENTO";

    crearmodal("documentosModal", titulo, cuerpo, '*Elija un registro de la tabla');
    $("#documentosModal").attr("style", "width: 40%; display: block;width: 60%;left: 40%;")
    oTableModal_doc = iniciaTabla('tblModalDoc', {
        data: null,
        columns: [
            {
                data: "NUMERO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "NTIPO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: "NPIDM_SUJ",
            },
            {
                data: "FECHA_GIRO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "FECHA_VENC",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "NMONEDA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
        ],
        scrollCollapse: true,
        paging: false,
        info: false
    });

    $('#tblModalDoc').removeAttr('style');

    $('#tblModalDoc tbody').on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableModal_doc.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableModal_doc.fnGetPosition(this);
            var row = oTableModal_doc.fnGetData(pos);
            funcionRegistro(row);
            if (row.TIPO === 'C') { //cliente
                fnGetLineaCredito('C', row.GIRADOA, row.EMPRESA);
                cTipo = 'C';
            } else { // proveedor
                fnGetLineaCredito('P', row.GIRADOR, row.EMPRESA);
                cTipo = 'P';
            }
        }

    });

}
    
    var plugins = function () {

    $("#txtFechaGiro,#txtFechaRegistro").datepicker();

}
    
    var cargatablavacia = function () {

    oTable_detalle = iniciaTabla('tblDetalle', {
        data: null,
        columns: [
            {
                data: "NRO_DOC_DETALLE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: "NRO_DIAS",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: "FECHA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                },
                type: "fecha"
            },
            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    $(td).attr('data-type-decimal', true);
                },
                type: "formatoMiles"
            }
        ],
        scrollCollapse: true,
        paging: false,
        info: false,
        sort: false,
        preDrawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var columnaFechas = 2;
            var dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
            // actualiza fecha
            api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                api.data()[d].FECHA = valor;
                $($(rows).eq(d).children()[columnaFechas]).html(valor);
            });
        },
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            api.column(3, { page: 'current' }).data().filter(function (e, d) {
                $($(rows).eq(d).children()[3]).html(formatoMiles(e));
            });
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();
            let spnStatus = $("#txtBalanceadoStatus");
            if (data.length > 0) {
                let fSumaTotalTabla = api.column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                if (ObjJsonRowSelected.MONTO === fSumaTotalTabla) {
                    bBalanceado = true;
                    spnStatus.text("BALANCEADO");
                    spnStatus.removeClass("noBalanceado").addClass("balanceado");
                } else {
                    bBalanceado = false;
                    spnStatus.text("NO BALANCEADO");
                    spnStatus.removeClass("balanceado").addClass("noBalanceado");
                }
            }
        }

    });

    $('#tblDetalle').removeAttr('style').attr("style", "border-style: hidden;");
    $('#tblDetalle_filter').css('display', 'none');

}
    
    var CargaTabla_detalle = function (cod) {
    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMRENO.ASHX?codigo=" + cod + "&flag=3",
        contentType: "application/json;",
        dataType: "json",
        beforeSend: function () { Bloquear("divSimuLetras","Cargando Letras ...");},       
        success: function (datos) {
            oTable_detalle.fnClearTable();
            if (datos.length > 0) {
                $("#txtFechaGiro").datepicker("setDate", datos[0].FECHA_GIRO.parseDate());
                $("#txtLugarGiro").val(datos[0].LUGAR_GIRO);
                $("#txtFechaRegistro").val(datos[0].FECHA_REGISTRO);
                
                datos.filter(function (objectDetalle) {
                    objectDetalle.NRO_DIAS = DateDiff(objectDetalle.FECHA_VCMTO.parseDate(), objectDetalle.FECHA_GIRO.parseDate());
                    objectDetalle.FECHA = objectDetalle.FECHA_VCMTO;
                });         

                setTimeout(function () {
                    oTable_detalle.fnAddData(datos);
                }, 500);

            }

            oTable_detalle.fnAdjustColumnSizing();
        },
        complete: function () {
            Desbloquear("divSimuLetras");
        }
    });

}
    
    var funcionRegistro = function (r) {

    if (ref == 'M') {
        $("#txtnumdoc").val(r.NUMERO);

        $("#lblref").html((r.TIPO == 'P' ? 'Proveedor' : 'Cliente') + ' :');

        $("#lblref_cont").html(r.NPIDM_SUJ);

        $("#lbldoc").html((r.DOCUMENTO_PERSONA.length > 8 ? 'RUC' : 'DNI') + ' :');

        $("#lbldoc_cont").html(r.DOCUMENTO_PERSONA);

        $("#lblmonto").html('Monto (' + r.NMONEDA + ')' + ' :');

        $("#lblmonto_cont").html(formatoMiles(r.MONTO));

        sMoneda = r.SMONEDA;

        $("#spnMoneda").text(sMoneda);

        $("#documentosModal").modal('hide');

        ObjJsonRowSelected = r;

        $("#divSimuLetras").fadeIn();

        CargaTabla_detalle(r.CODIGO);
    }
    if (ref == 'D') {
        ObjJsonRowSelectedDetalle = r;

        var body = "Está seguro de agregar la " + "LETRA" + ' ' + r.NUMERO_DOC;
        $("#confirmacionModal_body").html(body);
        $("#documentosModal").modal('hide');
        $("#confirmacionModal").modal('show');

    }
}
    
    var confirmacion = function () {

    crearmodal("confirmacionModal",
        "CONFIRMACION",
        "Desea completar la transacción?",
        ' <button type="button" id="rptano" class="btn">No</button><button  type="button" id="rptasi"  class="btn blue">Si</button>');

   

    $("#rptasi").click(function () {
        CrearDetalles();

        $("#confirmacionModal").modal('hide');
    });

    $("#rptano").click(function () {

        $("#documentosModal").modal('show');
        $("#confirmacionModal").modal('hide');
    });
}
    
    var CrearDetalles = function () {

        if (bBalanceado) {
            var data = {
                flag: 1,
                letra: JSON.stringify(ObjJsonRowSelected),
                detalle: JSON.stringify(oTable_detalle.fnGetData()),
                usuario: $('#ctl00_lblusuario').html(),
                empresa: $("#slcEmpresa").val(),
                lugar: $("#txtLugarGiro").val(),
                p_sucursal: $("#cboEstablecimiento").val(),
                fechaGiro: $("#txtFechaGiro").val()
            }
            $.ajax({
                type: "post",
                url: "vistas/GL/ajax/GLMRENO.ASHX",
                contenttype: "application/json;",
                datatype: "json",
                data: data,
                beforeSend: function () { Bloquear("ventana", "Grabando datos ..."); },
                success: function (response) {
                    Desbloquear("ventana");
                    if (response.indexOf("error") < 0) {
                        exito();
                        CargaTabla_detalle(ObjJsonRowSelected.CODIGO);
                    } else {
                        noexito();
                    }
                },
                complete: function () {
                    Desbloquear("ventana");
                    $("#divPrmtsSimulacion, #grabarA").remove();
                }
            });
        } else {
            infoCustom("Los montos no están balanceados");
        }
    }

return {
    init: function (cTipoLetra) {
        tipoLetra = cTipoLetra;
        plugins();
        cargarCombos();
        dataTable();
        CreaModal();
        funcionalidad();
        cargaInicial();
    }
};

}();


