var CTLDEAS = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();

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

        //$("#txtSerie").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });


    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }
    
    var fillCboEmpresa = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var select = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };
    
    var obtenerDocumentos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTLDEAS.ashx?OPCION=1",
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
                    oTable.fnSort([[2, "asc"]]);
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
                    //        window.location.href = '?f=ctldeas&codigo=' + code;
                    //    }
                    //});


                    //$('#tblDocumento tbody').on('click', 'a', function () {
                    //    $(this).parent().parent().addClass('selected');
                    //});

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
            Desbloquear("ventana");
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerDocumentos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerDocumentos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
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
            //mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);

        /*$(".refreshProcess").click(function () { EjecutarAsientosPendientesVenta(); });*/
    }

    return {
        init: function () {
            fillCboEmpresa();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            fillCboEstablecimiento();
            $('#cboEstablecimiento').val('');
            plugins();
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

function imprimirListaDctosVenta() {
    Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : $("#cboCliente :selected").text();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('DCTO_CODE', DCTO_CODE);
    data.append('VENDEDOR', VENDEDOR);
    data.append('CLIENTE', CLIENTE);
    data.append('PRODUCTO', PRODUCTO);
    data.append('ESTADO', ESTADO);
    data.append('SERIE_DCTO', $("#txtSerie").val());
    data.append('NUM_DCTO', $("#txtNumero").val());
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLDOCV.ashx?OPCION=5",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                $("#divDctoImprimir").prepend("<hr></hr>")
                $("#divDctoImprimir").prepend("<h5 class='arial'>DOCUMENTOS DE VENTA - " + nomSucursal + "</h5>")
                $("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
                setTimeout(function () {
                    window.print();
                }, 200);
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//function EjecutarAsientosPendientesVenta() {

//    $.ajax({
//        type: "post",
//        url: "vistas/CT/ajax/CTLDEAS.ASHX",
//        data: { OPCION: 6 },
//        success: function (res) {
//            if (res == "OK") {
//                exito();
//            } else {
//                alertCustom(res);
//            }
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });

//}