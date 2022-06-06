var NPLFPRO = function () {
    var plugins = function () {

        $('#cboEmpresas').select2();
      

    }

    var eventoControles = function () {

        $('#cboEmpresas').on('change', function () {
            table.fnClearTable();
            listarAlmacenes();


            $("#txtdescprod").remove();
            $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
            filltxtrazsocial('#txtdescprod', '', 'S', '');
            
            $('#txtUni').val('');
            table.fnClearTable();
        });

        $('#txtdescprod').on('blur', function () {





        });

    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    //Iniciar valores con valores de login
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                    listarAlmacenes();

                    filltxtrazsocial('#txtdescprod', '', 'S', '');

                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    function listarAlmacenes() {
        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $("#hf10").multiselect("destroy");
                $('#hf10').empty();
                if (datos[0].MENSAJE != "Error") {
                    
                    //var arr = [];                
                    for (var i = 0; i < datos.length; i++) {
                       
                        $('#hf10').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
              
                }
                else {  }
                $('#hf10').multiselect({
                    inheritClass: true,
                    nonSelectedText: 'Seleccione Almacen!',
                    buttonWidth: '186px',
                    includeSelectAllOption: true,
                    selectAllText: 'Seleccione Todo!',
                    //enableFiltering: true,
                    numberDisplayed: 1
                });
                    
                   
                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");

            },
            error: function (msg) {
                alert(msg);
            }
        });

        //$(".btn-group").attr("style", "max-width:100%");
        //$(".multiselect.dropdown-toggle").attr("style", "max-width:100%");
    };
    function filltxtrazsocial(v_ID, v_value, SERVICIO, TEXTI) {
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            //url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresas").val() + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + '' + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({

                        source: function (query, process) {

                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },

                        updater: function (item) {
                            //$("#hdcodProd2").val(map[item].CODIGO);
                            $("#txtUni").val(map[item].DESC_UNIDAD_DESPACHO);
                            $("#hdproducto").val(map[item].CODIGO);
                            //$("#txtStock").val(map[item].STOCK);
                            $("#hdcodUNI").val(map[item].UNIDAD);


                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                    });
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
    var cargainicial = function ()
    {
       
        //filltxtrazsocial('#txtProducto', '', '', '02,');

        $('#txtCantidad').val('0.00');


        $('#txtCantidad').click(function () {

            $(this).val('');
        });


        $('#txtProducto').blur(function () {

            if ($('#txtProducto').val() == '') {
                $('#txtUni').val('');
                $("#hdproducto").val('0');
            }


        });

        $("#hdproducto").val('0');

        detailsHtml = $("#tbldetalle").html();

        var nCloneTh = document.createElement('th');
        var nCloneTd = document.createElement('td');

        nCloneTd.innerHTML = '<img src="/recursos/img/details_open.png">';
        nCloneTd.className = "center";

        $('#tblBandeja thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        $('#tblBandeja tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });


        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: '<img src="recursos/img/details_open.png">'

                },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }

                },
                {
                    data: "Producto"    ,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "Cantidad"  ,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CantidadTotal"  ,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }

            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }

        table = $('#tblBandeja').dataTable(parms);
      
       

        $('#tblBandeja tbody td img').live('click', function () {
            var nTr = $(this).parents('tr')[0];
            var nTds = this;
          

            if (table.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                table.fnClose(nTr);
                table2.fnClearTable();
                $('#recetaDetalle').css('display', 'none')
            }
            else {
                /* Open this row */
              


                var rowIndex = table.fnGetPosition($(nTds).closest('tr')[0]);
                var detailsRowData = table.fnGetData(rowIndex).detalle;

                var id = table.fnGetData(rowIndex).CODIGO;
                var cantidad = table.fnGetData(rowIndex).Cantidad;
                var titulo = '';
                titulo = table.fnGetData(rowIndex).Producto;

                $('#titulo').html("FORMULACION DE " + titulo);

                llenarDetalleDetalle(id, cantidad);

                

                this.src = "recursos/img/details_close.png";
               table.fnOpen(nTr, fnFormatDetails(id, detailsHtml), 'details');

                table.fnOpen(nTr, '<div id="d_' + id + '" style="border:1px solid #cbcbcb; text-align:center;">jhjkhkjhk</div>', 'details');

                $("#d_" + id).html("<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'></table>")
                $("#tblBandejaDetalleF" + id).html(detailsHtml);
                oInnerTable = $("#tblBandejaDetalleF" + id).dataTable({
                    "bJQueryUI": true,
                    "bFilter": false,
                    "aaData": detailsRowData,
                    "bSort": true, // disables sorting
                    "aoColumns": [
                    { "mDataProp": "Almacen" },
	                { "mDataProp": "Cantidad" },
	                { "mDataProp": "Condicion" }
                    ],
                    "bPaginate": false,
                    "oLanguage": {
                        "sInfo": "_TOTAL_ entries"
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        //var imgLink = aData['pic'];
                        //var imgTag = '<img width="100px" src="' + imgLink + '"/>';
                        //$('td:eq(0)', nRow).html(imgTag);
                        return nRow;
                    }
                });

              
               
            }
        });

       
       
        $('#btnBuscar').on('click', function () {

            
            if ($("#hdproducto").val()=='0') {
            
                alertCustom('Debe seleccionar una producto');
                return false;
            }


            if ($('#txtCantidad').val() == "undefined")
            {
                alertCustom('Debe ingresar una cantidad');
                return false;

            }

            if ($('#txtCantidad').val() == "") {
                alertCustom('Debe ingresar una cantidad');
                return false;

            }

            if ($('#hf10').val() == "") {
                alertCustom('Seleccione un almacen');
                return false;

            }

            

            CargarGrilla(table);

            //table2.fnClearTable();
            //$('#recetaDetalle').css('display', 'none')
            



        });

        

        function CargarGrilla(oTable)
        {
            Bloquear('ventana')
            $.ajax({
                url: "vistas/np/ajax/nplfpro.ashx?OPCION=2&p_ctlg=" + $("#cboEmpresas").val() + '&p_prod=' + $("#hdproducto").val() + '&p_cant=' + $('#txtCantidad').val() + '&p_almacen=' + $('#hf10').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    Desbloquear('ventana')
                    if (datos != null) {
                        table.fnClearTable();
                        LlenarGrilla(datos, oTable);
                        table2.fnClearTable();
                        $('#recetaDetalle').css('display', 'none')

                    }
                    else {
                        table.fnClearTable();
                        table2.fnClearTable();
                        $('#recetaDetalle').css('display', 'none')
                    }
                
                 
                },
                error: function (msg) {
                    Desbloquear('ventana')
                    alert(msg);
                }
            });

        }
        

        function LlenarGrilla(data_json, otable) {

            otable.fnClearTable();
            otable.fnAddData(data_json);
        }

    }
     function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
     var llenarDetalleDetalle = function (prod, cant) {
         Bloquear('ventana')
        $.ajax({
            url: "vistas/np/ajax/nplfpro.ashx?OPCION=2&p_ctlg=" + $("#cboEmpresas").val() + '&p_prod=' + prod + '&p_cant=' + cant + '&p_almacen=' + $('#hf10').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear('ventana')
                table2.fnClearTable();
                $('#recetaDetalle').css('display','block')
                if (datos != null)
                {
                  
                    
                    table2.fnAddData(datos);
                }
                

                //LlenarGrilla(datos, oTable);

            },
            error: function (msg) {
                Desbloquear('ventana')
                alert(msg);
            }
        });
    };
    var DetalleDetalleReceta = function () {

        detailsHtml = $("#tbldetalleD").html();

        var nCloneTh = document.createElement('th');
        var nCloneTd = document.createElement('td');

        nCloneTd.innerHTML = '<img src="/recursos/img/details_open.png">';
        nCloneTd.className = "center";

        $('#tblBandejaD thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        $('#tblBandejaD tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });


        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: '<img src="recursos/img/details_open.png">'

                },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }

                },
                {
                    data: "Producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "Cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CantidadTotal",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }

            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }

        table2 = $('#tblBandejaD').dataTable(parms);


        $('#tblBandejaD tbody td img').live('click', function () {
            var nTr = $(this).parents('tr')[0];
            var nTds = this;


            if (table2.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                table2.fnClose(nTr);
            }
            else {
                /* Open this row */
                var rowIndex = table2.fnGetPosition($(nTds).closest('tr')[0]);
                var detailsRowData = table2.fnGetData(rowIndex).detalle;
                var id = table2.fnGetData(rowIndex).CODIGO;

                this.src = "recursos/img/details_close.png";
                //  table.fnOpen(nTr, fnFormatDetails(id, detailsHtml), 'details');

                table2.fnOpen(nTr, '<div id="d_' + id + '" style="border:1px solid #cbcbcb; text-align:center;">jhjkhkjhk</div>', 'details');
                $("#d_" + id).html("<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'></table>")
                $("#tblBandejaDetalleF" + id).html(detailsHtml);
                oInnerTable = $("#tblBandejaDetalleF" + id).dataTable({
                    "bJQueryUI": true,
                    "bFilter": false,
                    "aaData": detailsRowData,
                    "bSort": true, // disables sorting
                    "aoColumns": [
                    { "mDataProp": "Almacen" },
                    { "mDataProp": "Cantidad" },
                    { "mDataProp": "Condicion" }
                    ],
                    "bPaginate": false,
                    "oLanguage": {
                        "sInfo": "_TOTAL_ entries"
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        //var imgLink = aData['pic'];
                        //var imgTag = '<img width="100px" src="' + imgLink + '"/>';
                        //$('td:eq(0)', nRow).html(imgTag);
                        return nRow;
                    }
                });

            }
        });

    }
    return {
        init: function ()
        {
            plugins();
            eventoControles();
            cargainicial();
            DetalleDetalleReceta();
            fillCboEmpresa();
            listarAlmacenes();


        }

    };

}();