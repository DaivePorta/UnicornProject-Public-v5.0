var gDatos = null;
var first = true;
var CALANCL = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboEstado').select2();
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

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val(), $("#txtDesde").val(), $("#txtHasta").val());
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

    function fillCboEmpresa() {
        Bloquear("divCboEmpresa");
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboEmpresa");
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
                Fin1_CargaEmpresa();
            },
            error: function (msg) {
                Desbloquear("divCboEmpresa");
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    }

    function fillCboEstablecimiento(ctlg) {
        //Bloquear("divCboEstablecimiento");
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=1&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("divCboEstablecimiento");
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');
                }
                //Fin2_CargaEstablecimiento();
            },
            error: function (msg) {
                //Desbloquear("divCboEstablecimiento");
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });

    }

    var Fin1_CargaEmpresa = function () {
        if ($("#cboEmpresa").val() != "") {
            fillCboEstablecimiento($("#cboEmpresa").val());
        }
    };

    //var Fin2_CargaEstablecimiento = function () {
    //    if (gDatos != null) {
    //        //$("#cboEstablecimiento").select2("val", gDatos[0].SUCURSAL_CODE);
    //    }
    //    //if (first) {
    //    //    first = false;
    //    //    ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
    //    //}
    //};

    function ListarNotasCredito(ctlg, scsl, desde, hasta)  {
        //Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calnocr.ashx?OPCION=4&p_CTLG_CODE=" + ctlg +
                "&p_SCSL_CODE=" + scsl +
                "&p_DESDE=" + desde +
                "&p_HASTA=" + hasta +
                "&p_COMPRA_VENTA_IND=V"+
                "&p_ESTADO="+$("#cboEstado").val(),
            contenttype: "application/text;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("ventana");
                if (datos != null) {

                    $('#divTblNotasCredito').html(datos);

                    var oTable = $("#tblNotasCredito").DataTable({
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        },
                        "scrollX": "true"
                        //"order": [[0, "desc"]]
                    });

                    oTable.column(0).visible(false);

                }
            },
            error: function (msg) {
                //Desbloquear("ventana")
                alertCustom(msg);
            }
        });
    }

    return {
        init: function () {
            //Bloquear("divCboEstablecimiento");
            plugins();
            fillCboEmpresa();
            eventoControles();
        }
    };

}();

function cargarNotaCredito(codigo, codempr) {  
        window.location.href = "?f=CAMNOCL&codigo=" + codigo + "&codempr=" + codempr
    
}

function irAnularDcto(codigo) {
    window.location.href = "?f=CAMANCL&codigo=" + codigo
}