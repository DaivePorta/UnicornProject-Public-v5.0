var NALLRIV = function () {
    var plugins = function () {

        $('#cboEmpresas').select2()
        $("#hf10").select2();
     
        $("#cboMes").select2();
        $('#txtanio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });;

        
    }

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


                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function listarAlmacenes(empresa) {

        var obj = "";
        $.ajax({
            type: "post",

            // $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 10, codempr: $("#slcEmpresa").val() },
            url: "vistas/na/ajax/NAMSECC.ashx?flag=10&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#hf10").empty();

                if (datos != null) {

                    $("#hf10").html(datos);
                }
                $('#hf10').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    function listarANIO() {

        var obj = "";
        $.ajax({
            type: "post",

            // $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 10, codempr: $("#slcEmpresa").val() },
            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=5&p_tipo_op=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#txtanio").empty();

                if (datos != null) {

                    $("#txtanio").html(datos);
                }
                $('#txtanio').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    function listarMES() {

        var obj = "";
        $.ajax({
            type: "post",

            // $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 10, codempr: $("#slcEmpresa").val() },
            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=5&p_tipo_op=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#cboMes").empty();

                if (datos != null) {

                    $("#cboMes").html(datos);
                }
                $('#cboMes').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });


    }


    function limpiarCampos() {
        $("#txtTipo").val('');
        $("#txtExist").val('');
        $("#txtTipo").val('');
        $("#txtDireccion").val('');
        $("#txtCodUni").val('');
    }



    var eventoComtroles = function () {

        //$('#txtanio').on('change', function () {


        //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#txtanio option:selected').html());


        //    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button1').attr('disabled', true);
        //    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button2').attr('disabled', true);
        //    limpiarCampos();
        //});

        var today = new Date();
        var yyyy = today.getFullYear();
        $("#txtanio").keyup(function (e) { if (parseInt($(this).val()) > yyyy) $(this).val(""); });

        $('#cboMes').on('change', function () {


            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val($('#cboMes').val());

            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button1').attr('disabled', true);
            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button2').attr('disabled', true);


            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#txtanio').val());
            limpiarCampos();
        });


        $('#cboEmpresas').on('change', function () {

            limpiarCampos();
            $("#txtRuc").val('');
            listarAlmacenes($('#cboEmpresas').val());
            llenarRuc();
            $("#txtDescr").remove();
            $("#input_desc_prod").html("<input id='txtDescr' class='span12' type='text' />");
            filltxtrazsocial('#txtDescr', '');

            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#txtRuc').val());


            // $("#hddMes").val($('#txtanio').val());

        });


        $('#hf10').on('change', function () {
         //   limpiarCampos()
            llenarDireccion();
           


        });



        $('#exportar').on('click', function () {

            if (vErrors(["txtTipo", "txtExist", "txtTipo", "txtCodUni", "txtRuc", "txtDireccion", "txtanio", "cboMes"])) {
                Exportar();
            }



        });

        $('#buscar').on('click', function () {

            if (vErrors(["txtTipo", "txtExist", "txtTipo", "txtCodUni", "txtRuc", "txtDireccion", "txtanio", "cboMes"])) {
                listar();
            }



        });

        $('#descargar').on('click', function () {

            if (vErrors(["txtTipo", "txtExist", "txtTipo", "txtCodUni", "txtRuc", "txtDireccion", "txtanio", "cboMes"])) {
                descargar();
            }



        });


        $('#exportar').on('click', function () {

            if (vErrors(["txtTipo", "txtExist", "txtTipo", "txtCodUni", "txtRuc", "txtDireccion", "txtanio", "cboMes"])) {
                $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button1').attr('disabled', false);
                $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button2').attr('disabled', false);
            }



        });


    }

    function descargar() {
        var data = new FormData;
        data.append('p_anio', $('#txtanio').val());
        data.append('p_mes', $('#cboMes').val());
        data.append('p_mesDes', $('#cboMes option:selected').html());
        data.append('p_ruc', $('#txtRuc').val());
        data.append('p_emp', $('#cboEmpresas option:selected').html());

        data.append('p_direcc', $('#txtDireccion').val());
        data.append('p_codExis', $('#txtExist').val());
        data.append('p_tipoExist', $('#txtTipo').val());

        data.append('p_Descr', $('#txtDescr').val());
        data.append('p_unidad', $('#txtCodUni').val());
        data.append('p_alamcen1', $('#hf10').val());

        data.append("p_scl1", $('#cboEmpresas').val());
        data.append('p_prd1', $('#hdcodProd2').val());
        //data.append('OPCION', '7');


        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=9",
            //&p_anio=" + $('#txtanio option:selected').html() + "&p_mes=" + $('#cboMes option:selected').html() + "&p_ruc=" + $('#txtRuc').val() + "&p_emp=" + $('#cboEmpresas option:selected').html() + "&p_direcc=" + $('#txtDireccion').val() + "&p_codExis=" + $('#txtExist').val() + "&p_tipoExist=" + $('#txtTipo').val() + "&p_Descr=" + $('#txtDescr').val() + "&p_unidad=" + $('#txtCodUni').val() + "&p_alamcen1=" + $('#hf10').val() +  "&p_scl1=" + $('#cboEmpresas').val() + "&p_prd1=" + $('#hdcodProd2').val(),
            //  url: "vistas/na/ajax/nalmerc.ashx?OPCION=4&p_alamcen=" + $('#hf10').val() + "&p_grupo=" + grupos + "&p_scl=" + empresa + "&p_UNME_DET=" + unmed + "&p_TIPO=" + tipo,
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            //async: false,
            success: function (datos) {


                $('#tbllink').html(datos)

                //if (datos != null) {

                //    if (datos = 'ok')
                //    {
                //        exito();
                //    }


                //}


            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function Exportar() {
        var data = new FormData;
        data.append('p_anio', $('#txtanio').val());
        data.append('p_mes', $('#cboMes').val());
        data.append('p_mesDes', $('#cboMes option:selected').html());
        data.append('p_ruc', $('#txtRuc').val());
        data.append('p_emp', $('#cboEmpresas option:selected').html());

        data.append('p_direcc', $('#txtDireccion').val());
        data.append('p_codExis', $('#txtExist').val());
        data.append('p_tipoExist', $('#txtTipo').val());

        data.append('p_Descr', $('#txtDescr').val());
        data.append('p_unidad', $('#txtCodUni').val());
        data.append('p_alamcen1', $('#hf10').val());

        data.append("p_scl1", $('#cboEmpresas').val());
        data.append('p_prd1', $('#hdcodProd2').val());
        //data.append('OPCION', '7');


        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/NALLRIV.ashx?OPCION=7",
            //&p_anio=" + $('#txtanio option:selected').html() + "&p_mes=" + $('#cboMes option:selected').html() + "&p_ruc=" + $('#txtRuc').val() + "&p_emp=" + $('#cboEmpresas option:selected').html() + "&p_direcc=" + $('#txtDireccion').val() + "&p_codExis=" + $('#txtExist').val() + "&p_tipoExist=" + $('#txtTipo').val() + "&p_Descr=" + $('#txtDescr').val() + "&p_unidad=" + $('#txtCodUni').val() + "&p_alamcen1=" + $('#hf10').val() +  "&p_scl1=" + $('#cboEmpresas').val() + "&p_prd1=" + $('#hdcodProd2').val(),
            //  url: "vistas/na/ajax/nalmerc.ashx?OPCION=4&p_alamcen=" + $('#hf10').val() + "&p_grupo=" + grupos + "&p_scl=" + empresa + "&p_UNME_DET=" + unmed + "&p_TIPO=" + tipo,
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            //async: false,
            success: function (datos) {



                if (datos == 'ok') {
                    exito();
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

    function llenarRuc() {
        var obj = "";
        $.ajax({
            type: "post",


            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=3&p_scl=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#txtRuc").empty();

                if (datos != null) {

                    $("#txtRuc").val(datos[0].RUC);

                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    function llenarDireccion() {
        var obj = "";
        $.ajax({
            type: "post",


            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=4&p_scl=" + $('#cboEmpresas').val() + "&p_alamcen=" + $("#hf10").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#txtDireccion").empty();

                if (datos != null) {

                    $("#txtDireccion").val(datos[0].DIRECCION);

                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function listar() {

        // url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=9&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE,

        // p_prd, p_alamcen, p_moneda, p_scl
        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/NALLRIV.ashx?OPCION=8&p_alamcen=" + $('#hf10').val() + "&p_scl=" + $('#cboEmpresas').val() + "&p_prd=" + $('#hdcodProd2').val() + "&p_anio=" + $('#txtanio').val() + "&p_mes=" + $('#cboMes').val(),

            // data.append('p_anio', $('#txtanio option:selected').html());
            //data.append('p_mes', $('#cboMes').val());
            //  url: "vistas/na/ajax/nalmerc.ashx?OPCION=4&p_alamcen=" + $('#hf10').val() + "&p_grupo=" + grupos + "&p_scl=" + empresa + "&p_UNME_DET=" + unmed + "&p_TIPO=" + tipo,
            async: false,
            success: function (datos) {

                if (datos != null) {

                    $('#tblProductos').html(datos)

                    $("#tblbmodal").DataTable({

                        "scrollX": "true",
                        "sDom": 'TC<"clear">lfrtip',
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
                        }
                    })



                }


            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    $(document).ready(function () {
        $(".numeros").keydown(function (event) {
            if (event.shiftKey) {
                event.preventDefault();
            }

            if (event.keyCode == 46 || event.keyCode == 8) {
            }
            else {
                if (event.keyCode < 95) {
                    if (event.keyCode < 48 || event.keyCode > 57) {
                        event.preventDefault();
                    }
                }
                else {
                    if (event.keyCode < 96 || event.keyCode > 105) {
                        event.preventDefault();
                    }
                }
            }
        });
    });

    var cargaInicial = function () {

        $("#txtTipo").attr('disabled', true);
        $("#txtExist").attr('disabled', true);
        $("#txtTipo").attr('disabled', true);
        $("#txtRuc").attr('disabled', true);
        $("#txtDireccion").attr('disabled', true);
        $("#txtCodUni").attr('disabled', true);
        $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button1').attr('disabled', true);
        $('#ctl00_cph_ctl00_PCONGEN1_ctl00_Button2').attr('disabled', true);

    }


    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            listarANIO();
            listarMES();
            eventoComtroles();
            cargaInicial();
            // cargaInicial();
        }
    };

}();


function filltxtrazsocial(v_ID, v_value) {
    //var obj = '';
    var selectRazonSocial = $(v_ID);

    $.ajax({
        type: "post",
        //url: "vistas/na/ajax/NALLRIF.ashx?OPCION=1&p_scl=" + $("#ctl00_hddctlg").val(),
        // url: "vistas/na/ajax/naminsa.ashx?OPCION=4",
        url: "vistas/na/ajax/NALLRIF.ashx?OPCION=1&p_scl=" + $('#cboEmpresas').val() + "&p_alamcen=" + $('#hf10').val(),
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
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","CODE_SUNAT":"' + datos[i].CODE_SUNAT + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';

                            // obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","UNIDAD":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '"';
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
                        $("#hdcodProd2").val(map[item].CODIGO);
                        $("#txtCodUni").val(map[item].COD_UNMED_SUNAT + " " + map[item].DESC_UNIDAD_DESPACHO);
                        $("#txtExist").val(map[item].CODE_EXISTENCIA);
                        $("#txtTipo").val(map[item].CODE_SUNAT + " " + map[item].DESC_EXISTENCIA);
                        // $("#txtCodUni").val(map[item].UNIDAD_DESP));
                        //if ($("#hfRUC").val()) {
                        //    $("#cbotipoDoc").val("6");
                        //    $("#cbotipoDoc").change();
                        //    $("#txtnumdoc").val($("#hfRUC").val());
                        //}
                        //else {
                        //    $("#cbotipoDoc").val("6");
                        //    $("#cbotipoDoc").change();
                        //    $("#txtnumdoc").val($("#hfRUC").val());
                        //}
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