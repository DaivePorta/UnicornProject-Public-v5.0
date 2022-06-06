function ActualizarAseguradora() {
    var p_acti = $('#chkactivoaseg').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
   
    var p_fect = $('#txtfechafaseg').val();
    var p_feci = $('#txtfechaiaseg').val();
    var p_empr = $('#slcEmpresaaseg').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtfechaiaseg", "slcEmpresaaseg"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Aseguradora.ASHX", { flag: 2, pidm: p_pidm, fein: p_feci, user: p_user, acti: p_acti, fete: p_fect, empr: p_empr },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabaraseg").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabaraseg").attr("href", "javascript:ActualizarAseguradora();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearAseguradora() {

    var p_acti = $('#chkactivoaseg').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    
    var p_fect = $('#txtfechafaseg').val();
    var p_feci = $('#txtfechaiaseg').val();
    var p_empr = $('#slcEmpresaaseg').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtfechaiaseg", "slcEmpresaaseg"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Aseguradora.ASHX", { flag: 1, pidm: p_pidm,fein: p_feci, user: p_user, acti: p_acti, fete: p_fect, empr: p_empr },
           function (res) {
               Desbloquear("ventana");
               if (res != "") {
                   exito();
                   $("#grabaraseg").html("<i class='icon-pencil'></i> Modificar Datos");
                   $("#grabaraseg").attr("href", "javascript:ActualizarAseguradora();");
               } else {
                   noexito();
               }
           });
    }

}

function cargarAseguradora(empresa) {

    Bloquear("ventana");

    $.ajax({

        type: "POST",
        url: "vistas/NC/estereotipos/ajax/Aseguradora.ASHX?pidm=" + $("#hfPPBIDEN_PIDM").val() + "&flag=3&empr=" + empresa,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {

            $("#grabaraseg").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabaraseg").attr("href", "javascript:ActualizarAseguradora();");

            $("#txtfechaiaseg").datepicker("setDate", datos[0].FECHA_INICIO);

            $("#txtfechafaseg").datepicker("setDate", datos[0].FECHA_FIN);


            if (datos[0].ESTADO == "ACTIVO") {
                $('#txtfechafaseg').attr("disabled", true);
                $('#uniform-chkactivoaseg span').removeClass().addClass("checked");
                $('#chkactivoaseg').attr('checked', true);
            } else {
                $('#txtfechafaseg').attr("disabled", false);
                $('#uniform-chkactivoaseg span').removeClass();
                $('#chkactivoaseg').attr('checked', false);
            }


        }
    });





}


var ASEGURADORA = function () {

    var datagrid = function () {

        var row1 = {};
        var row2 = {};
        var data = new Array();

        row1["titulos"] = "Vehículos";


        data[0] = row1;

        row2["titulos"] = "Inmuebles";

        data[1] = row2;

        var source =
        {
            localdata: data,
            datatype: "array",
            datafields:
               [
                   { name: 'titulos', type: 'string' },
                   { name: 'actual', type: 'string' },
                   { name: 'historico', type: 'string' },
                   { name: 'pagomes', type: 'string' },
                   { name: 'montoretornable', type: 'string' }
              
               ]
        };


        var dataAdapter = new $.jqx.dataAdapter(source, {
            loadComplete: function (data) { },
            loadError: function (xhr, status, error) { }
        });



        $("#detalleaseg").jqxGrid(
            {
                source: dataAdapter,
                width: '101%',
                theme: 'bootstrap',
                autoheight: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'none',
                
                columns: [
                  { text: '      ', datafield: 'titulos', pinned: true,},
                  { text: 'Actual', datafield: 'actual' },
                  { text: 'Historico', datafield: 'historico' },
                  { text: 'Pago Mes', datafield: 'pagomes' },
                  { text: 'Monto Retornable', datafield: 'montoretornable' }

                ]
            });

    }





    var cargainicial = function () {

        $('#chkactivoaseg').on('change', function () {
            if ($("#chkactivoaseg").is(':checked')) {

                $('#txtfechafaseg').attr("disabled", true);
                $('#txtfechafaseg').val('');
            } else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = dd + '/' + mm + '/' + yyyy;
                $('#txtfechafaseg').val(today);
                $('#txtfechafaseg').attr("disabled", false);
            }
        });


        $.post("vistas/NC/estereotipos/ajax/Aseguradora.ASHX", { flag: 4, usua: $("#ctl00_txtus").val() },
            function (res) {
                $("#controlempresaaseg").html(res);
                $("#slcEmpresaaseg option[value=0]").remove();
                $("#slcEmpresaaseg").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });
                $("#slcEmpresaaseg").change(function (event, empresa) {
                    $('#txtfechafaseg').attr("disabled", true);
                    if (empresa == null) {
                        empresa = $('#slcEmpresaaseg').val();

                        $("#txtfechaiaseg").val("");

                        $("#txtfechafaseg").val("");

                        $("#grabaraseg").html("<i class='icon-pencil'></i> Grabar Datos");
                        $("#grabaraseg").attr("href", "javascript:CrearAseguradora();");
                    }

                    if ($("#hfPPBIDEN_PIDM").val() != "")
                    { cargarAseguradora(empresa); }

                });
            });

    }


    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaiaseg", "txtfechafaseg");


    }


    return {
        init: function () {
            cargainicial();
            plugins();
            datagrid();
        }
    };


}();