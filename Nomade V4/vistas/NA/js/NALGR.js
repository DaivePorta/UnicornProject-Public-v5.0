function buscar() {

    $.ajax({
        type: "POST",
        url: "vistas/na/ajax/NALGR.ashx?opcion=1&p_almacen=" + $('#hf10').val() + "&p_fechainicial=" + $('#txtFechaInicial').val() + "&p_fechafinal=" + $('#txtFechaFinal').val(),
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



var NALGR = function () {

    var fillBandejaGR = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjGR').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "NRO_DOC", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBREDESTINO" },
                { data: "FECHA" },
                { data: "MOVIMIENTO" },
                { data: "OPERACION" },
                { data: "ALMACEN" },
                { data: "CHOFER" },

                {
                    data: "DESPACHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }



        oTableGR = iniciaTabla('tblGR', parms);
        $('#tblGR').removeAttr('style');

      }

    var plugins = function () {       
       
        $('#cboEmpresas').select2();

        $('#hf10').multiselect(

           {
               nonSelectedText: 'Seleccione un Almacen!'
           }
           );
        
        //  $('#slsGrupos').select2();
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

                    $("#cboEmpresas").select2('val', $('#ctl00_hddctlg').val());

                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    var eventoComtroles = function () {
        $('#cboEmpresas').on('change', function () {

            listarAlmacenes($('#cboEmpresas').val());
                       
        });

        $('#hf10').on('change', function () {


            // listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
            //listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val(), "N", "1")

        });

        $('#buscar').on('click', function () {

            buscar();   
        });

        var fecha = new Date();
        
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var mes2 = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        

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

        var fechaIni = dia + '/' + mes2 + '/' + ano;

        $("#txtFechaInicial").val(fNueva);
        $("#txtFechaFinal").val(fechaIni);
        
    }

    var cargaInicial = function () {
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();

        $('#hf10').multiselect('destroy');
        $('#hf10').multiselect();
        $('#hf10').val($('#ctl00_hddestablecimiento').val());
        $('#hf10').multiselect('refresh');        
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

    function listarAlmacenes(empresa) {

        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {


                if (datos != null) {
                    var arr = [];
                    obj += '[';

                    if (datos[0].MENSAJE == "Error") {
                        $('#hf10').multiselect('disable');
                        $('#slsGrupos').multiselect('disable');

                        // $('#slsGrupos').attr('disabled', true);
                        //  alertCustom("No se cuenta con alamcenes registrados");
                    }
                    else {
                        $('#hf10').multiselect('enable');
                        $('#slsGrupos').multiselect('enable');
                        //$('#slsGrupos').attr('disabled', false);

                        for (var i = 0; i < datos.length; i++) {

                            arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                            obj += '{';
                            obj += '"NOMBRE":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';


                    }

                    $('#hf10').multiselect('dataprovider', arr);                                        

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
            eventoComtroles();
            cargaInicial();
            controlesfecha();
            fillBandejaGR();
            buscar();
        }
    };

}();


