/*variables*/
posSeleccionados = [];
nohayproveedores = false;
contador = 0;

var NOLCOTD = function () {
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $('#cbo_tipo_solic').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");

    }
    var fillBandejaSolCot = function () {


        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "NRO_SOLICITUD",
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
                     data: "DESC_CTLG",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "DESC_SCSL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "FECHA_TRAN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
             {
                 data: "DESC_EST_COMPLETADO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             }

            ]

        }

        oTableSolCot = iniciaTabla('tbl_cot', parms);
        $('#tbl_cot').removeAttr('style');
        $('#tbl_cot tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableSolCot.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableSolCot.fnGetPosition(this);
                var row = oTableSolCot.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=nomcotd&codigo=' + CODIGO;
            }
        });


    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var eventoControles = function () {
        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
            ListaSolCotizacion();
        });


        $('#slcSucural').on('change', function () {
            if ($('#slcSucural').val() != "") {
                ListaSolCotizacion();
            }

        });

        $('#cbo_tipo_solic').on('change', function () {
            if ($('#slcSucural').val() != "") {
                ListaSolCotizacion();
            }

        });

    }

    var ListarSucursales = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    // $("#slcSucural").change();

                }
                else {
                    noexito();
                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListaSolCotizacion = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post", 
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=0&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&TIPO_COTI_BS=" + $('#cbo_tipo_solic').val() + "&TIPO_COTI=D",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val(datos);
                    //var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
                    oTableSolCot.fnClearTable();
                    oTableSolCot.fnAddData(datos);


                }
                else {
                    //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val("");
                    oTableSolCot.fnClearTable();
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
            fillBandejaSolCot();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            ListaSolCotizacion();
        }
    };

}();

var flagTb = false;


var NOMCOTD = function () {

    
    var TIPOSOLI = "";
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $("#cbo_tipo_prov").select2();
        $("#cbo_tipo_solic").select2();
        $("#cbo_moneda").select2();
        
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        //$("#completar").attr("style", "display:none");

    }

    var fillBandejaSolCotiDirecta = function () {

        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "scrollY": "280px",
            columns: [
               
                {
                    data: "CANTIDAD_PEDIDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'text-align:center')
                        $(td).attr('class', 'cant');
                    }
                },
                {
                    data: "CODIGO_PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).attr('style', 'display:none')
                    }
                },
                 {
                     data: "DESC_PRODUCTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "PRECIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html('<input type="text" id="Prec' + rowData.CODIGO_PRODUCTO + '" class="Cprec span12 m-wrap" onkeypress="return ValidaDecimales(event,this)"/>');
                        $(td).children("#Prec" + rowData.CODIGO_PRODUCTO).val(formatoMiles(parseFloat(rowData.PRECIO)));

                        prec_ref = 0;
                        $(td).children(".Cprec").focus(function () {

                            prec_ref = $(this).val();
                          
                              
                           
                            $(td).children(".Cprec").val("");

                        });

                        $(td).children(".Cprec").blur(function () {

                            if ($(this).val() == "") {
                                $(td).children(".Cprec").val(formatoMiles(prec_ref.split(",").join("")));
                                prec_ref = 0;
                            }
                            else {
                                console.log(($(this).val() * rowData.CANTIDAD_PEDIDA));

                                rowData.PRECIO = $.trim($(this).val());
                                $("#" + rowData.CODIGO_PRODUCTO + "total").html(formatoMiles(($(this).val() * rowData.CANTIDAD_PEDIDA).toFixed(2)));
                                $(td).children(".Cprec").val(formatoMiles($(this).val()));
                                prec_ref = 0;
                            }


                        });


                    }
                },
                //{
                //    data: "PRECIO_",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('style', 'display:none');
                //    }
                //},
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("id", "" + rowData.CODIGO_PRODUCTO + "total");
                        var total = parseFloat(rowData.CANTIDAD_PEDIDA) * parseFloat(rowData.PRECIO);
                        $(td).html(formatoMiles(total));


                    }
                },
                    {
                        data: null,
                        defaultContent: '<a class="btn red" style="border-radius: 3px !important;"><i class="icon-trash"></i></a>',
                        createdCell: function (td, cellData, rowData, row, col) {

                            $(td).attr('style', 'text-align:center')

                        }
                    },
            ]

        }
        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");
        oTableTcotizados = iniciaTabla('tbl_cotizados', parms);
        $('#tbl_cotizados').removeAttr('style');



    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var eventoControles = function () {

        

        $('#cbo_tipo_solic').on('change', function () {


            if (flagTb) {
                if (oTableTcotizados.fnGetData().length != 0) {

                    $('#tbl_cotizados').DataTable().data().clear().draw()
                }
            }

            $(".limpiar").val("");
            if ($('#cbo_tipo_solic').val() == 'B')
            {
                
               
                TIPOSOLI = 'S';
                filltxtdescprod("#txtdescprod", "")
               
            }
            else
            {
               
                TIPOSOLI = 'N';
                filltxtdescprod("#txtdescprod", "")
              
            }
           

            // ListarSucursales($('#slcEmpresa').val());
            //ListaReqCompractlgxscsl();

        });

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
            //ListaReqCompractlgxscsl();
        });

        $('#slcSucural').on('change', function () {
            if ($('#slcSucural').val() != "") {
                //ListaReqCompractlgxscsl();
            }

        });

        $('#btn_ver_proveedores').on('click', function () {
            if (vErrors("cbo_tipo_prov")) {

                var cuerpo = ListaGrupoProv();
                $("#prueba_body").html(cuerpo);
                $("#prueba").modal("show");

            }
        });

        $('#btn_actualizar_prov').on('click', function () {
            ListaGrupoProv();
        });

        
        $('#btn_agregar_proveedores').on('click', function () {
            window.open("?f=ncmgpro", "_blank");            
        });

        $('#btn_ver_prov').on('click', function () {
            window.open("?f=NRLGEPR", "_blank");             
        });

    }

    var ListaGrupoProv = function () {
        Bloquear("grupo");
        var html = "";
        html += "<table id='tbl_prov' class='table table-bordered' style='height: 50px;color:black;max-width:100%;'>" +
                                     "<thead style='background-color: steelblue; color: aliceblue;'>" +
                                         "<tr>" +
                                            "<th>Tipo DCTO</th>" +
                                            "<th>Nro DCTO</th>" +
                                            "<th>RAZON SOCIAL</th>" +
                                             "<th>CORREO</th>" +
                                         "</tr>" +
                                     "</thead>" +
                                     "<tbody>";
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmgpro.ashx?OPCION=2&GRUP_CODE=" + $("#cbo_tipo_prov").val(),
            async: false,
            success: function (datos) {
                if (datos != "") {
                    var json = jQuery.parseJSON(datos);
                    for (var i = 0 ; i < json.length ; i++) {
                        if (json[i].CORREO == "") { var correo = "Sin correo"; } else { var correo = json[i].CORREO; contador++; }
                        html += "<tr role='row' class='odd'>"
                        html += "<td style='text-align:center'>" + json[i].TIPO_DCTO + "</td>"
                        html += "<td style='text-align:center'>" + json[i].NRO_DCTO + "</td>"
                        html += "<td style='text-align:center'>" + json[i].RAZON_SOCIAL + "</td>"
                        html += "<td style='text-align:center;'>" + correo.split(",").join("<br>") + "</td>"

                        html += "</tr>";
                        Desbloquear("grupo");
                        nohayproveedores = true;
                    }
                }
                else {
                    nohayproveedores = false;
                    contador = 0;
                }


            },
            error: function (msg) {
                alert(msg);
            }

        });

        html += "</tbody></table>"
        return html;


    }

    var ListarSucursales = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());


                }
                else {
                    noexito();
                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillcboMoneda = function () {
        $('#cbo_moneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);               
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cbo_moneda').select2();
    }

    var funcionalidadTabla = function () {
        $('#tbl_cotizados tbody').on('click', 'a', function () {


            var pos = oTableTcotizados.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableTcotizados.fnGetData(pos);

            oTableTcotizados.fnDeleteRow(pos);
         
        });

        

    }

    var fillcboTipoProv = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=1&EST_IND=" + "A" + "&TIPO=" + "NORMAL",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_prov').empty();
                $('#cbo_tipo_prov').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_prov').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }

                    $("#cbo_tipo_prov").select2("val", datos[0].CODIGO);
                }
                var cuerpo = ListaGrupoProv();

            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var ListaSolCotDetalle = function (CODIGO) {


        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=2&CODIGO=" + CODIGO + "&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTableTcotizados.fnClearTable();
                    oTableTcotizados.fnAddData(datos);


                }
                else {

                    oTableTcotizados.fnClearTable();
                }


            },
            error: function (msg) {
                alert(msg);
            }

        });




    }

    var CargaInicial = function () {

        $('#cbo_tipo_solic').change();

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {
            var data = new FormData();        
            data.append('OPCION', '0');
            data.append('CODIGO', CODE);

            $.ajax({

                url: "vistas/no/ajax/nomcoti.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {
                        $("#guardar").html("<i class='icon-pencil'></i>   Modificar");
                        $("#guardar").attr("href", "javascript:Modificar();");
                        $('#txt_num_sol_coti').val(datos[0].NRO_SOLICITUD);
                        $('#txtFecTransaccion').val(datos[0].FECHA_TRAN);
                        $('#txt_descripcion').val(datos[0].DESCRIPCION);
                        $("#slcEmpresa").select2("val", datos[0].CTLG_CODE);
                        $("#slcSucural").select2("val", datos[0].SCSL_CODE);
                        $("#cbo_tipo_prov").select2("val", datos[0].TIPO_PROV);
                        $("#txt_forma_pago").val((datos[0].CONDICIONES).split("%")[0]);
                        $("#txt_plazo_entrega").val((datos[0].CONDICIONES).split("%")[1]);
                        $("#txt_lugar_entrega").val((datos[0].CONDICIONES).split("%")[2]);
                        $("#completar").attr("style", "");
                        ListaSolCotDetalle(CODE);

                        $("#cbo_tipo_solic").attr('disabled', true)

                        $("#cbo_tipo_solic").val(datos[0].TIPO_COTI_BS)
                        $("#slcEmpresa").attr('disabled', true)
                        $("#slcSucural").attr('disabled', true)
                      

                        if (datos[0].EST_COMPLETADO == "S") {

                            $(".eliminar").remove();
                            $(".bloquear").attr("disabled", true);
                            $(".Cprec").attr("disabled", true);
                            $("#acciones_generales").remove();

                            oTableTcotizados.fnSetColumnVis(5, false);

                        }

                    }
                    else { noexito(); }
                }

            });


        }
    }


    //Llenar productos
    var productos = [];
    var ajaxProducto = null;

    var filltxtdescprod = function (v_ID, v_value) {
        $('#txtcodprod').html('<input id="txtcodprod" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código" />');
        $("#txtdescprod").html("<input id='txtdescprod' class='span12' type='text' placeholder='Nombre' />");

        Bloquear("txtcodprod");
        Bloquear("txtdescprod");
        //Bloquear("form_add_prod")
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=4&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $("#slcSucural").val() + "&ALMACENABLE=" + TIPOSOLI,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("form_add_prod")
                Desbloquear("txtcodprod");
                Desbloquear("txtdescprod");

                if (datos != null) {
                    productos = datos;
                    // UPDATER_DESC_PROD
                    var input = $('#txtdescprod');
                    input.typeahead({
                        items: 100,
                        source: function (query, process) {
                            array = [];
                            map = {};
                            let aoObj = new Array();
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                var obj = {};
                                obj.DESC_ADM = datos[i].DESC_ADM;
                                obj.CODIGO = datos[i].CODIGO;                              
                                obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;                             
                                obj.PRECIO = datos[i].PRECIO;                              
                                aoObj.push(obj);
                            }

                            $.each(aoObj, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            $("#hfcod_prod").val(map[item].CODIGO);
                            $("#txtcodprod").val(map[item].CODIGO_ANTIGUO);
                            $("#txtcodprod1").val(map[item].CODIGO);
                            $("#txtcant").val("");
                            $("#txt_prec_ref").val(map[item].PRECIO);
                            return item;
                        },
                    });
                    input.keyup(function (e) {
                        $(this).siblings("ul").css("min-width", $(this).css("width"));
                        if ($("#txtdescprod").val().length <= 0) {
                            $("#hfcod_prod").val("");
                            $("#txtcodprod").val("");
                            $("#txtcodprod1").val("");
                            $("#txtcant").val("");
                            $("#txt_prec_ref").val("");
                        }
                    });

                    var input = $('#txtcodprod');
                    input.typeahead({
                        items: 100,
                        source: function (query, process) {
                            array = [];
                            map = {};
                            let aoObj = new Array();
                            for (var i = 0; i < datos.length; i++) {                              

                                array.push(datos[i].CODIGO_ANTIGUO);
                                var obj = {};
                                obj.DESC_ADM = datos[i].DESC_ADM;
                                obj.CODIGO = datos[i].CODIGO;                                
                                obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;                               
                                obj.PRECIO = datos[i].PRECIO;                               
                                aoObj.push(obj);
                            }

                            $.each(aoObj, function (i, objeto) {
                                map[objeto.CODIGO_ANTIGUO] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            $("#hfcod_prod").val(map[item].CODIGO);
                            $("#txtcodprod1").val(map[item].CODIGO);
                            $("#txtdescprod").val(map[item].DESC_ADM);
                            $("#txtcant").val("");
                            $("#txt_prec_ref").val(map[item].PRECIO);
                            return item;
                        },
                    });
                    input.keyup(function () {
                        $(this).siblings("ul").css("min-width", $(this).css("width"));
                        if ($("#txtcodprod").val().length <= 0) {
                            $("#hfcod_prod").val("");
                            $("#txtdescprod").val("");
                            $("#txtcodprod1").val("");
                            $("#txtcant").val("");
                            $("#txt_prec_ref").val("");
                        }
                    });
                }
            },
            error: function (msg) {
                Desbloquear("form_add_prod")
                Desbloquear("input_cod_prod");
                Desbloquear("input_desc_prod");
                if (msg.statusText != "abort") {
                    alertCustom("Productos no se listaron correctamente");
                }
            }
        });
    }

    var filltxtcodprod = function (v_ID, v_value) {
        var selectProds = $(v_ID);
        /*
        
        MARTIN CAMISETA!!!
        
        */
        selectProds.typeahead({
            minLength: 3,
            source: function (query, process) {
                arrayProductos = [];
                map = {};
                $.ajax({
                    type: 'post',
                    url: "vistas/no/ajax/nomcoti.ashx?OPCION=4&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $("#slcSucural").val() ,
                    data: { type: 'keyword', q: query },
                    cache: false,
                    dataType: 'json',
                    success: function (datos) {
                        if (datos != null) {
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayProductos.push(datos[i].CODIGO_ANTIGUO);
                                obj += '{';
                                obj += '"CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '",';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '",';
                                obj += '"PRECIO":"' + datos[i].PRECIO + '",';
                                obj += '"CODIGO":"' + datos[i].CODIGO + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.CODIGO_ANTIGUO] = objeto;
                            });
                            return process(arrayProductos);
                        }
                    }
                });
            },
            updater: function (item) {
                $("#hfcod_prod").val(map[item].CODIGO);
                $("#txtdescprod").val(map[item].DESC_ADM);
                
                $("#txt_prec_ref").val(map[item].PRECIO);
                $("#txtcant").val("");
                return item;
            },

        });
        selectProds.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txtcodprod").val().length <= 0) {
                $("#hfcod_prod").val("");
                $("#txtdescprod").val("");
                $("#txt_prec_ref").val("");
                $("#txtcant").val("");
            }
        });
    }

        return {
            init: function () {
                plugins();
                fillBandejaSolCotiDirecta();
                fillCboEmpresa();
                fillcboTipoProv();                
                eventoControles();
                ListarSucursales($('#slcEmpresa').val());
                //ListaReqCompra();
                funcionalidadTabla();
                fillcboMoneda();
                CargaInicial();
                //filltxtdescprod("#txtdescprod", "")
               
                crearmodal("prueba", "Grupo Proveedores", "", "");
            }
        };

    }();



function Agregar() {

    if (vErrors(["txtdescprod", "txt_prec_ref", "txtcant"])) {

        var bool = false;
        if ($("#hfcod_prod").val() != '') {
            var ar = oTableTcotizados.fnGetData();
            if (ar.length > 0) {
                for (var i = 0 ; i < ar.length ; i++) {
                    if (ar[i].CODIGO_PRODUCTO == $("#hfcod_prod").val()) {
                        bool = true;
                    }

                }
            }


            if (bool) {

                infoCustom2("Producto ya se agrego anteriormente!!");
                $(".limpiar").val("");
            }
            else {
                flagTb = true;
                var json = [];
                json.push({ CANTIDAD_PEDIDA: $("#txtcant").val(), CODIGO_PRODUCTO: $("#hfcod_prod").val(), DESC_PRODUCTO: $("#txtdescprod").val(), PRECIO: $("#txt_prec_ref").val(), PRECIO_: $("#txt_prec_ref").val() });
                oTableTcotizados.fnAddData(json);
                $(".limpiar").val("");

            }


        }
        else {
            infoCustom2("Seleccione un producto");
        }


    }
   
    
}


var Guardar = function () {
    var DESC = '';
    var USUA_ID = '';
    var FECHA_TRAN = '';
    var TIPO_PROV = '';
    var CTLG_CODE = '';
    var SCSL_CODE = '';
    var CADENA = ArmaString();
    var CONDICIONES = "";

    DESC = $.trim($('#txt_descripcion').val());
    USUA_ID = $.trim($('#ctl00_txtus').val());
    FECHA_TRAN = $.trim($('#txtFecTransaccion').val());
    TIPO_PROV = $.trim($('#cbo_tipo_prov').val());
    SCSL_CODE = $.trim($('#slcSucural').val());
    CTLG_CODE = $.trim($('#slcEmpresa').val());
    CODE_MONEDA = $.trim($('#cbo_moneda').val());
    CONDICIONES = $("#txt_forma_pago").val() + "%" + $("#txt_plazo_entrega").val() + "%" + $("#txt_lugar_entrega").val()

    var data = new FormData();

    data.append("OPCION", "GD");
    data.append("DESC", DESC);
    data.append("USUA_ID", USUA_ID);
    data.append("FECHA_TRAN", FECHA_TRAN);
    data.append("TIPO_PROV", TIPO_PROV);
    data.append("SCSL_CODE", SCSL_CODE);
    data.append("CTLG_CODE", CTLG_CODE);
    data.append("CODE_MONEDA", CODE_MONEDA);    
    data.append("TIPO_COTI", "D");
    data.append("IND_COMPLETADO", "N");
    data.append("CONDICIONES", CONDICIONES);
    data.append("TIPO_COTI_BS", $("#cbo_tipo_solic").val());
    
    data.append("DATA", CADENA);

    if (CADENA != "}") {
        if (vErrors(["txt_descripcion", "cbo_tipo_prov", "slcSucural", "slcEmpresa", "txtFecTransaccion", "txt_forma_pago", "txt_plazo_entrega", "txt_lugar_entrega"])) {

            Bloquear("ventana");

            $.ajax({
                url: "vistas/no/ajax/NOMCOTI.ASHX",
                type: "post",
                contentType: false,
                data: data,
                async: false,
                processData: false,
                cache: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {

                        $("#txt_num_sol_coti").val(datos);
                        $("#guardar").html("<i class='icon-pencil'></i>   Modificar");
                        $("#guardar").attr("href", "javascript:Modificar();");
                        $("#completar").removeAttr("style");
                        $("#cbo_tipo_solic").attr('disabled', true)
                        $("#slcEmpresa").attr('disabled', true)
                        $("#slcSucural").attr('disabled', true)
                        exito();

                    } else { noexito(); }

                },
                error: function (msg) {

                    alert(msg);
                }
            });

        }
    } else { infoCustom2("No hay ningun producto en el listado de cotizacion"); }
}


var Modificar = function () {
    var DESC = '';
    var USUA_ID = '';
    var FECHA_TRAN = '';
    var TIPO_PROV = '';
    var CTLG_CODE = '';
    var SCSL_CODE = '';
    var CADENA = ArmaString();
    var CODIGO = '';
    var CONDICIONES = "";

    DESC = $.trim($('#txt_descripcion').val());
    USUA_ID = $.trim($('#ctl00_txtus').val());
    FECHA_TRAN = $.trim($('#txtFecTransaccion').val());
    TIPO_PROV = $.trim($('#cbo_tipo_prov').val());
    SCSL_CODE = $.trim($('#slcSucural').val());
    CODE_MONEDA = $.trim($('#cbo_moneda').val());
    CTLG_CODE = $.trim($('#slcEmpresa').val());
    CODIGO = $("#txt_num_sol_coti").val().substr(5)
    CONDICIONES = $("#txt_forma_pago").val() + "%" + $("#txt_plazo_entrega").val() + "%" + $("#txt_lugar_entrega").val()

    var data = new FormData();

    data.append("OPCION", "A");
    data.append("DESC", DESC);
    data.append("USUA_ID", USUA_ID);
    data.append("FECHA_TRAN", FECHA_TRAN);
    data.append("TIPO_PROV", TIPO_PROV);
    data.append("SCSL_CODE", SCSL_CODE);
    data.append("CTLG_CODE", CTLG_CODE);
    data.append("CODE_MONEDA", CODE_MONEDA); 
    data.append("CODIGO", CODIGO);
    data.append("CONDICIONES", CONDICIONES);

    data.append("DATA", CADENA);

    if (CADENA != "}") {
        if (vErrors(["txt_descripcion", "cbo_tipo_prov", "slcSucural", "slcEmpresa", "txtFecTransaccion", "txt_forma_pago", "txt_plazo_entrega", "txt_lugar_entrega"])) {

            Bloquear("ventana");

            $.ajax({
                url: "vistas/no/ajax/NOMCOTI.ASHX",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos == "OK") {


                        exitoCustom("Se Actualizo Correctamente!!");

                    } else { noexito(); }

                },
                error: function (msg) {

                    alert(msg);
                }
            });

        }
    } else { infoCustom2("No hay ningun producto en el listado de cotizacion"); }
}

function ArmaString() {

    var json = oTableTcotizados.fnGetData();
    var str = "";

    for (var i = 0 ; i < json.length ; i++) {
        str += json[i].CODIGO_PRODUCTO + ","        
        str += json[i].DESC_PRODUCTO + ","
        str += json[i].CANTIDAD_PEDIDA + ","
        str += json[i].PRECIO + ";"
    }

    str += "}";
    str = str.replace(";}", "");
    return str;
}


var Completar = function () {
  
    var CADENA = ArmaString();
    var CODIGO = '';
    var TIPO_PROV = '';
    var USUA_ID = '';

    if ($("#txt_num_sol_coti").val() == "") {
        Guardar();
    } else {
        Modificar();
    }

    CODIGO = $("#txt_num_sol_coti").val().substr(5);
    TIPO_PROV = $("#cbo_tipo_prov").val();
    USUA_ID = $("#ctl00_txtus").val();
    var data = new FormData();


    
    data.append("OPCION", "C");
    data.append("CODIGO", CODIGO);
    data.append("TIPO_PROV", TIPO_PROV);
    data.append("USUA_ID", USUA_ID);

  if (nohayproveedores) {
   if (contador > 0) {
    if (CADENA != "}") {
        if (vErrors(["txt_descripcion", "cbo_tipo_prov", "slcSucural", "slcEmpresa", "txtFecTransaccion"])) {

            Bloquear("ventana");
            

            
            $.ajax({
                url: "vistas/no/ajax/NOMCOTI.ASHX",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (datos) {

                    var res = datos.split(";");
                    if (res[0] == "OK") {
                       
                        nohayproveedores = false;
                        contador = 0;
                        $(".eliminar").remove();
                        $(".bloquear").attr("disabled", true);
                        $(".Cprec").attr("disabled", true);
                        $("#acciones_generales").remove();
                       
                       
                        oTableTcotizados.fnSetColumnVis(5, false);
                        EnviaCorreo(res[2], res[3], res[1]);

                    } else { noexito(); }

                },
                error: function (msg) {

                    alert(msg);
                }
            });

        }
    } else { infoCustom2("No hay ningun producto en el listado de cotizacion"); }
       } else {
           infoCustom2("No hay correos a quien enviar, porfavor agregar correos");
       }
    } else {
        infoCustom2("No hay proveedores en el grupo seleccionado");
  }
  //nohayproveedores = false;
  //contador = 0;
}

var ShowModal = function () {

    $("#EnviaCorreo").modal("show");

}


var EnviaCorreo = function (cor_remitente, nremitente, correos) {
    if (correos != "") {
        Bloquear("ventana");
        var html = "";
        var tabla = oTableTcotizados.fnGetData();
        for (var i = 0 ; i < tabla.length; i++) {
            html += "|tr role='row' class='odd'?"
            html += "|td align='center'?" + (i + 1) + "|/td?"
            html += "|td align='center'?" + tabla[i].DESC_PRODUCTO + "|/td?"
            html += "|td style='text-align:center' class='cant'?" + tabla[i].CANTIDAD_PEDIDA + "|/td?"
            html += "|td style='text-align:right;'?" + formatoMiles(tabla[i].PRECIO) + "|/td?"
            html += "|td style='text-align:right;'?" + formatoMiles((parseFloat(tabla[i].PRECIO) * parseFloat(tabla[i].CANTIDAD_PEDIDA)).toFixed(2)) + "|/td?"
            html += "|/tr?";
        }
        html += "|/tbody?|/table?";

        //var data = new FormData();


        if ($('#cbo_tipo_solic').val() == 'S')
        {
            var asunto = "Solicitud de Cotizacion de Servicio N°" + $("#txt_num_sol_coti").val();
        }
        else
        {
            var asunto = "Solicitud de Cotizacion de Bienes N°" + $("#txt_num_sol_coti").val();
        }
       


        var cuerpo =

                      "|table?" +
                      "|tr?" +
                      "|td?N° Solicitud Cotizacion :|/td?" +
                      "|td?" + "|b?" + $("#txt_num_sol_coti").val() + "|/b?" + "|/td?" +
                      "|/tr?" +
                      "|tr?" +
                      "|td?Empresa :|/td?" +
                      "|td?|b?" + $("#slcEmpresa option:selected").text() + "|/b?|/td?" +
                      "|/tr?" +
                       "|tr?" +
                      "|td?Establecimiento :|/td?" +
                       "|td?" + "|b?" + $("#slcSucural option:selected").text() + "|/b?" + "|/td?" +
                      "|/tr?" +


                        "|tr?" +
                      "|td?Forma Pago :|/td?" +
                      "|td?" + "|b?" + $("#txt_forma_pago").val() + "|/b?" + "|/td?" +
                      "|/tr?" +

                       "|tr?" +
                      "|td?Plazo Entrega :|/td?" +
                      "|td?" + "|b?" + $("#txt_plazo_entrega").val() + "  días|/b?" + "|/td?" +
                      "|/tr?" +

                        "|tr?" +
                      "|td?Lugar Entrega :|/td?" +
                      "|td?" + "|b?" + $("#txt_lugar_entrega").val() + "|/b?" + "|/td?" +
                      "|/tr?" +

                       "|tr?" +
                      "|td?Fecha :|/td?" +
                       "|td?" + "|b?" + $("#txtFecTransaccion").val() + "|/b?" + "|/td?" +
                      "|/tr?" +
                      "|/table?" +
                       "|br?|br?|p?" +
                        "|b?|h2?|p  style='color:black'?|u?|center?LISTA PRODUCTOS COTIZAR|/center?|/u?|p?|/h2?|b?" +
                       "|table id='tbl_cotizados' class='table table-bordered' style='height: 50px;color:black;width:100%;'?" +
                                    "|thead style='background-color: steelblue; color: aliceblue;'?" +
                                        "|tr?" +
                                           "|th?ITEM|/th?" +
                                            "|th?PRODUCTO|/th?" +
                                              "|th style='text-align:center;'?CANT.|/th?" +
                                            "|th?PRECIO REF (S/.)|/th?" +
                                            "|th?TOTAL (S/.)|/th?" +
                                        "|/tr?" +
                                    "|/thead?" +
                                    "|tbody?";
        cuerpo += html;




        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMCOTI.ASHX?OPCION=SENDMAIL&REMITENTE=" + cor_remitente + "&NREMITENTE=" + nremitente + "&DESTINATARIOS=" + correos + "&ASUNTO=" + asunto + "&CUERPO=" + cuerpo,
            //contentType: "application/json;",
            async: false,
            dataType: false,
            success: function (datos) {
                if (datos == "OK") {
                    Desbloquear("ventana");
                    exitoCustom("Se completo Correctamente!!");
                } else { noexito(); }
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            }
        });
    } else { alertCustom('No hay correos a quien enviar '); }

}