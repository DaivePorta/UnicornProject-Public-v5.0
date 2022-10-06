var prmtACON = "NO";

var NALAPES = function () {
    var vAsientoContable = null;
    const sCodModulo = "0004"; // Código del módilo de almacen para contabilidad.

    var plugins = function () {
        $('select').select2();

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
    };

    var eventoControles = function () {

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);


        $('#cboEmpresa').change(function () {
            $('#cboEmpresa2').select2('val', $(this).val());
            cargarAlmacenes();
        });

        $('#cboAlmacen').change(function () {
            $('#cboAlmacen2').select2('val', $(this).val());
            $('#tblLISTA').DataTable().column(14).search($(this).val()).draw();
        });

        $('#tblLISTA tbody').on('click', 'tr', function () {
            var obj = $('#tblLISTA').DataTable().row($(this)).data();

            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);

           // console.log(row.MOVCONT_CODE);

            $('#tblDetalles').DataTable().destroy();
            $.ajax({
                type: 'post',
                url: 'vistas/NA/ajax/NALAPES.ashx?OPCION=LISTAR_DETALLES',
                contenttype: "application/json",
                datatype: "json",
                async: false,
                data: { ISAC_CODE: obj.CODIGO }
            }).success(function (data) {
                data = (data === null) ? [] : data;
                $('#tblDetalles').DataTable({
                    data: data,
                    columns: [
                        { data: 'ITEM', width: '5%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                        { data: 'PROD_CODE', visible: false },
                        { data: 'PRODUCTO', width: '8%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                        { data: 'DESC_PRODUCTO' },
                        { data: 'NRO_SERIE', width: '15%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                        { data: 'CENTRO_COSTO', width: '10%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                        { data: 'CANTIDAD_BASE', width: '5%', createdCell: function (cell) { $(cell).css('text-align', 'right') } },
                        { data: 'DESC_UNME_BASE', width: '15%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                        { data: 'TOTAL', width: '10%', createdCell: function (cell, cellData) { $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(2)) } },
                        { data: 'TOTAL_ALTERNO', width: '10%', createdCell: function (cell, cellData) { $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(2)) } }
                    ]
                });
            });
            if (obj.COMPLETO === 'COMPLETO') { $('#btnAprobar').html('<i class="icon-ok-circle"></i>&nbsp;Completo').prop('disabled', true); }
            else { $('#btnAprobar').html('<i class="icon-ok-sign"></i>&nbsp;Aprobar y Completar').prop('disabled', false); }
            $('#txtNumDctoAlmc').val(obj.CODIGO);
            $('#txtRetorno').val(obj.RETORNO);
            $('#txtOperacion').val(obj.TIPO_MOVIMIENTO);
            $('#txtSolicitante').val(obj.SOLICITANTE);
            $('#txtEntregar').val(obj.ENTREGAR_A);
            $('#txtEmision').val(obj.FECHA_EMISION);
            $('#txtTransaccion').val(obj.FECHA_TRANS);
            $('#txtCostoTransporte').val(obj.COSTO_TRANSPORTE);
            $('#hfCOSTO_TOTAL').val(obj.IMPORTE_BIEN);
            $('#hfPESO_TOTAL').val(obj.PESO_TOTAL);
            $('#hfElectronicoInd').val(obj.ELECTRONICO_IND);
            // Lista Asiento en Carga Inicial
            if (prmtACON == "SI") {
                sCodAlmacen = $("#txtNumDctoAlmc").val();
                sCodAlmacen = $.trim(sCodAlmacen);
                console.log(sCodAlmacen);
                oDocAlmc = fnGetDocAlmacen(sCodAlmacen);

                fnCargaTablaCuentasC(sCodAlmacen, oDocAlmc, row.MOVCONT_CODE);
            }
            


            $('#divDetalles').modal('show');



        });

        $('#btnAprobar').click(function () {
            if ($('#tblDetalles').DataTable().data().toArray().length > 0) {
                Bloquear('divCuerpo');
                setTimeout(function () {
                    $.ajax({
                        type: 'post',
                        //url: 'vistas/NA/ajax/NALAPES.ashx?OPCION=COMPLETAR',
                        url: 'vistas/NA/ajax/NALAPES.ashx?OPCION=COMPLETAR_VALI',
                        contenttype: "application/json",
                        datatype: "json",
                        async: false,
                        data: { ISAC_CODE: $('#txtNumDctoAlmc').val() }
                    }).success(function (data) {
                        if (data != null && data.length > 0) {
                            if (data[0].p_RPTA === 'OK') {
                                $('#btnAprobar').html('<i class="icon-ok-circle"></i>&nbsp;Completo').prop('disabled', true);
                                exito();
                                //Asiento al completar
                                if (prmtACON == "SI") {
                                    var sCodAlmc = $("#txtNumDctoAlmc").val();
                                    sCodAlmc = $.trim(sCodAlmc);
                                    var oDocAlmc = fnGetDocAlmacen(sCodAlmc);
                                    vAsientoContable.sCodDoc = sCodAlmc;
                                    vAsientoContable.objDoc = oDocAlmc;

                                    $('#btnGenerarAsiento').click();
                                }
                                //if ($('#hfElectronicoInd').val() == 'S') {
                                //    $("#hfCodigoNaminsa").val($('#txtNumDctoAlmc').val());
                                //    var miCodigoQR = new QRCode("codigoQR");
                                //    miCodigoQR.makeCode(data[0].DATOS_QR);
                                //    $('#codigoQR').hide();
                                //    //setTimeout(guardarQR, 0.0000000000000001);
                                //    setTimeout(guardarQR, 500);
                                //}    
                                listarMovimientos();
                                $("#divDetalles").modal('hide');
                            }
                            else if (data[0].p_RPTA.split("-")[0] === "X_SEPAR") {
                                infoCustom2("El producto " + data[0].p_RPTA.split("-")[1] + " no cuenta con separados suficientes para despachar.")
                            }
                            else if (datos[0].p_RPTA.split("-")[0] === "X_STOCK") {
                                infoCustom2("El producto " + data[0].p_RPTA.split("-")[1] + " no cuenta con el stock suficiente. Revise su stock disponible.")
                            }
                            else {
                                alertCustom("El doc. no se completó, porque la serie " + data[0].p_RPTA + " ya se encuentra registrada en el almacén.")
                                //infoCustom2("La serie " + data + " ya se encuentra registrada en el almacén.")
                            }
                        } else {
                            noexito();
                        }                        
                        Desbloquear('divCuerpo');
                    }).error(function (msg) {
                        alertCustom(msg.statusText);
                        Desbloquear('divCuerpo');
                    });
                }, 50);
            } else {
                alertCustom('El movimiento no tiene detalles de productos.');
            }
        });

        $("#buscar").on("click", function () {
            if (vErrors(['cboEmpresa', 'cboAlmacen'])) {
                listarMovimientos();             
            }
        });
    };

    var fnGetDocAlmacen = function (sCodDoc) {
        let aoDoc = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=GET_DOC_ALMACEN&p_CODE=" + sCodDoc,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDoc = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de almacen.");
            }
        });
        Desbloquear("ventana");

        return aoDoc;
    };

    var fnCargaTablaCuentasC = function (sCodVenta, oDocVta, sCodAsiento) {

        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodVenta;
                    vAsientoContable.objDoc = oDocVta;
                    vAsientoContable.init(sCodAsiento);
                });
        });

    }


    var cargarEmpresas = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NA/ajax/NALAPES.ashx?OPCION=LISTAR_EMPRESAS',
            contenttype: "application/json",
            datatype: "json",
            async: false,
            data: { USUA_ID: $('#ctl00_txtus').val() }
        }).success(function (data) {
            data = (data === null) ? [] : data;
            var select = $('#cboEmpresa, #cboEmpresa2');
            select.html('<option></option>');
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
            }
        }).error(function (msg) {
            alertCustom(msg.statusText);
        });
    };

    var cargarAlmacenes = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NA/ajax/NALAPES.ashx?OPCION=LISTAR_ALMACENES',
            contenttype: "application/json",
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), USUA_ID: $('#ctl00_txtus').val() }
        }).success(function (data) {
            data = (data === null) ? [] : data;
            
            var select = $('#cboAlmacen, #cboAlmacen2');
            $('#cboAlmacen').empty();
            $('#cboAlmacen2').empty();            
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].CODIGO + '" data-scsl-code="' + data[i].SCSL_CODE + '">' + data[i].DESCRIPCION + '</option>');
            }
            $('#cboAlmacen').select2("val", data[0].CODIGO);
        }).error(function (msg) {
            alertCustom(msg.statusText);
        });
    };

    var listarMovimientos = function () {       

        Bloquear("ventana");
        $.ajax({
            type: 'post',
            url: "vistas/NA/ajax/NALAPES.ashx?OPCION=S2" +
            "&CTLG_CODE=" + $("#cboEmpresa").val() +
            "&ALMC_CODE=" + $("#cboAlmacen").val() +
            "&DESDE=" + $("#txtDesde").val() + "&HASTA=" + $("#txtHasta").val(),
            contenttype: "application/json",
            datatype: "json",
            async: true
        }).success(function (data) {
            data = (data === null) ? [] : data;
            oTable.fnClearTable();
            if (data != null && data.length > 0) {
                oTable.fnAddData(data);
                oTable.fnAdjustColumnSizing();
            }
            $('#cboAlmacen').change();
        }).error(function (msg) {
            alertCustom(msg.statusText);
        }).complete(function (msg) {
            Desbloquear("ventana");
        });
    };

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                        {
                            data: 'COMPLETO', createdCell: function (cell, cellData) {
                                $(cell).css('text-align', 'center');
                                if (cellData === 'COMPLETO') { $(cell).html('<i class="icon-ok" style="color: green"></i>'); }
                                else { $(cell).html('<i class="icon-pushpin" style="color: red"></i>'); }
                            }
                        },
                        { data: "CODIGO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                        { data: "RETORNO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                        { data: "TIPO_MOVIMIENTO" },
                        //{ data: "ALMACEN", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                        //{ data: "RAZON_DEST", visible: false },
                        { data: "FECHA_EMISION", createdCell: function (cell) { $(cell).css('text-align', 'center'); }, type:"fecha"},
                        { data: "TIPO_DCTO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                        { data: "NRO_DCTO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                        { data: "SOLICITANTE" },
                        {
                            data: "PESO_TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'center');
                                $(td).html(formatoMiles(rowData.PESO_TOTAL));
                            }
                        },
                        {
                            data: "IMPORTE_BIEN", createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'center');
                                $(td).html(formatoMiles(rowData.IMPORTE_BIEN));
                            }
                        },
                        {
                            data: "ANULADO_IND",
                            createdCell: function (cell) { $(cell).css('text-align', 'center'); }
                        },
                        { data: "EMPRESA", visible: false },
                        { data: "ALMC_CODE", visible: false },
                        { data: 'ENTREGAR_A', visible: false }
            ],
            order: [[1, "desc"]],
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            sDom: 'T<"clear">lfrtip'
        }

        oTable = iniciaTabla('tblLISTA', parms);
        $('#tblLISTA').removeAttr('style');


        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                <div id="enlaces" style="display: inline-block">\
                    <a class="toggle-vis" data-column="1" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    <a class="toggle-vis" data-column="2" href="#">FLUJO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    <a class="toggle-vis" data-column="3" href="#">OPERACION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    <a class="toggle-vis" data-column="4" href="#">ALMACEN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    <a class="toggle-vis" data-column="6" href="#">EMISION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    <a class="toggle-vis" data-column="9" href="#">SOLICITANTE</a>\
                </div>');

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblLISTA').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

    }
    
    return {
        init: function () {
            cargarParametrosSistema();
            plugins();
            IniciaTabla();
            eventoControles();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
            $('#cboAlmacen').select2('val', $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val());
            listarMovimientos();            
        }
    };
}();

function guardarQR() {
    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
    var NombreQR = $('#codigoQR img').attr('src');

    var qrData = new FormData();
    qrData.append('p_IMGQR', NombreQR);

    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=GQR_GRE&ISAC_CODE=" + $("#hfCodigoNaminsa").val(), //CUANDO SE PRESIONA EL BOTON COMPLETAR
        data: qrData,
        async: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res != "OK") {
                noexito();
            }
        },
        error: function () {
            alertCustom("No se guardaron correctamente los datos!")
        }
    });
}

//DPORTA
function cargarParametrosSistema() {
    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (COSTO)
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGC",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                prmtDIGI = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro DIGC!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro DIGC!");
        }
    });

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                prmtACON = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro ACON!");
        }
    });
}