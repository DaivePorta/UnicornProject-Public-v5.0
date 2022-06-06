var NNMREFE = function () {

    var plugins = function () {

        $('#txt_Anio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });

        $('#slcEmpresa').select2();
        $('#slcSucural').select2();

        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", new Date());


  
        $("#cbo_fechas").select2({
            formatResult: formatState,
            formatSelection: formatState

        });

    
    }

    function formatState(state) {

        if (!state.id) { return state.text; }
       
        var est = $(state.element).attr("estado");
        if (est == "1") {
            var $state = $(
                       '<span><img src="../../recursos/img/ok2.png"> ' + state.text + '</span>'
                     );
        } else {
            var $state = $(
           '<span><img src="../../recursos/img/error2.png"> ' + state.text + '</span>'
         );
        }

       

        return $state;

    };





    var eventoControles = function () {


    };


  
    var CargaInicial = function () {
        //Bloquear("ventana")
        var oMes = ($("#txt_Mes").datepicker('getDate').getMonth() + 1).toString();
        var oAnho = $("#txt_Anio").val();
        if (oMes == "NaN") { oMes = ""; }
        if (oMes.length == 1) { oMes = "0" + oMes; }
        $("#hf_anho").val(oAnho)
        $("#hf_mes").val(oMes)
        $("#hf_ctlg_code").val($('#slcEmpresa').val())
        $("#hf_scsl_code").val($('#slcSucural').val())
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
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

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
                    noexito();
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
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
            CargaInicial();
           


        }
    };

}();

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}