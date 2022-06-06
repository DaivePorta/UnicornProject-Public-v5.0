var NOLRPPF = function () {


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

    var plugins = function () {

        $('#cboEmpresas').select2();

    }

    var controlesfecha = function () {


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

    var EventoControles = function () {

        $('#cboEmpresas').on('change', function () {

            //  listarproveedores($('#cboEmpresas').val());
           // $("#txtProv").remove();
            $("#text_prov").html(" <input type='text' class='span12' id='txtProv' />")
            filltxtproveedor("#txtProv", "")

        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas", "txtProv", "txtFechaInicial", "txtFechaFinal"])) {
                buscar();
            }
        });
    }

    var cargaInicial = function () {
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
    }

 
    function filltxtproveedor(v_ID, v_value) {

            var selectRazonSocial = $(v_ID);

            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=3&p_scl=" + $('#cboEmpresas').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {

                        selectRazonSocial.typeahead({

                            source: function (query, process) {
                                arrayRazonSocial = [];

                                map = {};

                                var obj = "[";
                                for (var i = 0; i < datos.length; i++) {
                                    arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                    obj += '{';
                                    obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '","ID":"' + datos[i].ID + '"';
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
                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
 
    
    function buscar() {

        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOLRPPF.ashx?opcion=1&proveedor=" + $('#hfPIDM').val() + "&fechainicial=" + $('#txtFechaInicial').val() + "&fechafinal=" + $('#txtFechaFinal').val(),
            async: false,
            success: function (datos) {

                if (datos != null) {

                    $('#tblDocumentos').html(datos)
                   // $("#tblbmodal").DataTable();
                    //$("#tblbmodal").DataTable({

                    //    "scrollX": "true",

                    //    "sDom": 'TC<"clear">lfrtip',
                    //    "sPaginationType": "full_numbers",
                    //    "oTableTools": {
                    //        "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                    //        "aButtons": [
                    //    {
                    //        "sExtends": "copy",
                    //        "sButtonText": "Copiar"
                    //    },
                    //    {
                    //        "sExtends": "pdf",
                    //        "sPdfOrientation": "landscape",
                    //        "sButtonText": "Exportar a PDF"
                    //    },
                    //    {
                    //        "sExtends": "xls",
                    //        "sButtonText": "Exportar a Excel"
                    //    }
                    //        ]
                    //    }
                    //})
                }
               
            },
            error: function (msg) {
                alert(msg);
            }
        });
       }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            controlesfecha();
            EventoControles();
            cargaInicial();

        }
    };

}();

