var NOLRCPP = function () {
    var plugins = function () {

        $('#cbosubgrupo').select2();
        $('#cboEmpresas').select2();
        $('#slcSucural').select2();
    }






    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option value="">TODOS</option>');
                if (!isEmpty(datos)) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());

                    } else {

                        $("#slcSucural").select2("val", "");
                    }
                }
                else {
                    infoCustom2("No existen establecimientos registradas!")
                }

                Desbloquear("div_scsl");

            },
            error: function (msg) {
               alertCustom("Error listar establecimientos")
                Desbloquear("div_scsl");
            }
        });
    }

    var eventoComtroles = function () {

        $('#buscar').on('click', function () {
           
         
           
            if ($("#txtFechaInicial").val() != "" && $("#txtFechaFinal").val() == "") {
                infoCustom2("Por favor selecciona la una fecha final para realizar la búsqueda!")
                return;
            }
            if ($("#txtFechaFinal").val() != "" && $("#txtFechaInicial").val() == "") {
                infoCustom2("Por favor selecciona la una fecha inicial para realizar la búsqueda!")
                return;
            }
            if ($("#txtFechaInicial").val() != "" && $("#txtFechaFinal").val() != "") {
               var f_i =  $("#txtFechaInicial").val().split("/")
               var f_f = $("#txtFechaFinal").val().split("/")
               var dia_ini = new Date(f_i[1] + "/" + f_i[0] + "/" + f_i[2])
               var dia_fin = new Date(f_f[1] + "/" + f_f[0] + "/" + f_f[2])

               if (dia_ini > dia_fin) {
                   infoCustom2("Fecha inicial no puede ser mayor a la fecha final!")
                   return;
               }

            }





            if (vErrors(["txt_proveedor"])) {
                listar();
            }


            setTimeout(function(){
                var oTable = $("#tblbmodal").dataTable();
                oTable.fnAdjustColumnSizing();
            },500)
           
        });







        $('#cboEmpresas').on('change', function () {

            Bloquear("input_desc_prod")
            Bloquear("div_subgrupo")
            Bloquear("div_scsl");
            $("#hfPIDM").val("");
            setTimeout(function(){
                $("#txt_proveedor").remove();
                $("#input_desc_prod").html("<input id='txt_proveedor' class='span12' type='text' placeholder='Proveedor' />");
                filltxtproveedor("#txt_proveedor", "");
                ListarSubGruposCbo();
                ListarSucursales($('#cboEmpresas').val());
            },600)

           

           

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


    function ListarSubGruposCbo() {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + " " + "&CTLG_CODE=" + $("#cboEmpresas").val(),
            async: true,
            success: function (datos) {
                $('#cbosubgrupo').empty();
                $('#cbosubgrupo').append('<option value="">TODOS</option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cbosubgrupo').select2('val', '');
                Desbloquear("div_subgrupo")
            },
            error: function (msg) {
                alertCustom("Error obtener subgrupos!")
                Desbloquear("div_subgrupo")
            }
        });
    }


    function listar() {

        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=2&p_pidm=" + $('#hfPIDM').val() + "&p_desde=" + $('#txtFechaInicial').val() + "&p_hasta=" + $('#txtFechaFinal').val() + "&p_subgrupo=" + $('#cbosubgrupo').val() + 
                                                            "&p_CTLG_CODE=" + $('#cboEmpresas').val() + "&p_SCSL_CODE=" + $('#slcSucural').val(),

           
            async: false,
            success: function (datos) {

                if (datos != null) {

                    $('#tblProveedores').html(datos)

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


    var cargaInicial = function () {

        
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();

    }

    var controlesfecha = function () {

        //$('#txtFechaInicial').datepicker();
        //$('#txtFechaInicial').inputmask("date");
        //inifechas("txtFechaFinal");


        $('#txtFechaInicial').datepicker();
        $('#txtFechaInicial').inputmask("date",
        {
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            }
        });

        $('#txtFechaFinal').datepicker();
        $('#txtFechaFinal').inputmask("date",
        {
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            }
        });
    }


    return {
        init: function () {
            plugins();
            controlesfecha();
           
            eventoComtroles();
            fillCboEmpresa();
            cargaInicial();
        }
    };

}();


function filltxtproveedor(v_ID, v_value) {

    var selectRazonSocial = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=3&p_scl=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (!isEmpty(datos)) {

                selectRazonSocial.typeahead({

                    source: function (query, process) {
                        arrayRazonSocial = [];

                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            obj += '"RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                        $("#hfPIDM").val(map[item].PIDM);
                        return item;
                    },

                });

            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);

            }
            Desbloquear("input_desc_prod")
        },
        error: function (msg) {
            alertCustom('Error al intentar consultar proveedores.');
            Desbloquear("input_desc_prod")
        }
    });

    selectRazonSocial.keyup(function () {
        $(this).siblings("ul").css("min-width", $(this).css("width"));
        if ($("#txt_proveedor").val().length <= 0) {

            $("#hfPIDM").val("");
           
        }
    });

}