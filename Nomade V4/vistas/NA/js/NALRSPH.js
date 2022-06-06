var NALRSPH = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboAlmacen').select2();
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

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    if (ObtenerQueryString("ctlg") == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    } else {
                        $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                    }

                    fillCboEstablecimiento();
                    fillCboAlmacenes();
                    if (ObtenerQueryString("scsl") == undefined) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                        $("#cboAlmacen").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                        $("#txtDesde").val(ObtenerQueryString("desde"));
                        $("#txtHasta").val(ObtenerQueryString("hasta"));
                    }
                    
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
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
    
    var fillCboAlmacenes = function () {
        var select = $('#cboAlmacen');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cboEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                //$(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Almacenes.');
            }
        });
    };
    
    var obtenerDocumentos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var ALMC_CODE = $("#cboAlmacen").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('ALMC_CODE', ALMC_CODE);
        data.append('FECHA', $("#txtHasta").val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NA/ajax/NALRSPH.ashx?OPCION=LDMOVKAR",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divDocumento').html(datos);

               $("#tblDocumento").dataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
                   "scrollX": true,
                   "bAutoWidth": false,    
                   "oLanguage": {
                       "sEmptyTable": "No hay datos disponibles en la tabla.",
                       "sZeroRecords": "No hay datos disponibles en la tabla."
                   },
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
               });

               var oTable = $('#tblDocumento').dataTable();
               oTable.fnSort([[0, "desc"]]);

               $("#tblDocumento").DataTable();
               actualizarEstilos()

               //$('#tblDocumento tbody').on('click', 'tr', function () {
               //    if ($(this).hasClass('selected')) {
               //        $(this).removeClass('selected');
               //    }
               //    else {
               //        table = $('#tblDocumento').dataTable();
               //        //table.$('tr.selected').removeClass('selected');
               //        // $(this).addClass('selected');
               //        var pos = table.fnGetPosition(this);
               //        var row = table.fnGetData(pos);
               //        var code = row[0];
               //        window.location.href = '?f=nvmdocv&codigo=' + code;
               //    }
               //});


               $('#tblDocumento tbody').on('click', 'a', function () {
                   $(this).parent().parent().addClass('selected');
               });

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    function cargainicial() {

        var controlProCli = false;

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboAlmacenes();
            Desbloquear("ventana");
        });

        $('#cboAlmacen').on('change', function () {
            Bloquear("ventana");
            Desbloquear("ventana");
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtHasta").val().trim() == "") {
                obtenerDocumentos();
            } else if ($("#txtHasta").val().trim() != "") {
                obtenerDocumentos();
            } else {
                alertCustom("Ingrese fecha para filtrar por Fecha.")
            }
        });
        

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
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'BEF1234567890';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
} 

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}