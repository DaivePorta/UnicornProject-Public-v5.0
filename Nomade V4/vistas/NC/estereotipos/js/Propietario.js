function ActualizarPropietario() {
    var p_acti = $('#chkactivoprop').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_fecf = $('#txtfechafprop').val();
    var p_feci = $('#txtfechaiprop').val();
    var p_empr = $('#slcEmpresaprop').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtfechaiprop", "slcEmpresaprop"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Propietario.ASHX", {
            flag: 2,
            pidm: p_pidm,
            feci: p_feci,
            user: p_user,
            acti: p_acti,
            fecf: p_fecf,
            empr: p_empr
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabarprop").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarprop").attr("href", "javascript:ActualizarPropietario();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearPropietario() {

    var p_acti = $('#chkactivoprop').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_fecf = $('#txtfechafprop').val();
    var p_feci = $('#txtfechaiprop').val();
    var p_empr = $('#slcEmpresaprop').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtfechaiprop", "slcEmpresaprop"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Propietario.ASHX", {
            flag: 1,
            pidm: p_pidm,
            feci: p_feci,
            user: p_user,
            acti: p_acti,
            fecf: p_fecf,
            empr: p_empr
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabarprop").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarprop").attr("href", "javascript:ActualizarPropietario();");
                } else {
                    noexito();
                }
            });
    }
}

function cargarPropietario(empresa) {
    Bloquear("ventana");

    $.ajax({

        type: "POST",
        url: "vistas/NC/estereotipos/ajax/Propietario.ASHX?pidm=" + $("#hfPPBIDEN_PIDM").val() + "&flag=3&empr="+empresa,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos.length>0) {
                $("#grabarprop").html("<i class='icon-pencil'></i> Modificar Datos");
                $("#grabarprop").attr("href", "javascript:ActualizarPropietario();");

                $("#txtfechaiprop").datepicker("setDate", datos[0].FECHA_INICIO);
                $("#txtfechafprop").datepicker("setDate", datos[0].FECHA_FIN);

                if (datos[0].ESTADO == "ACTIVO") {

                    $('#uniform-chkactivoprop span').removeClass().addClass("checked");
                    $('#chkactivoprop').attr('checked', true);
                    $('#txtfechafprop').attr("disabled", true);
                } else {

                    $('#uniform-chkactivoprop span').removeClass();
                    $('#chkactivoprop').attr('checked', false);
                    $('#txtfechafprop').attr("disabled", false);
                }
            }     
        }
    });



}


function cargagrid(data) {

                 var source =
                 {
                     datatype: "json",
                     datafields: [
                         { name: 'PLACA' },
                         { name: 'CARROCERIA' },
                         { name: 'UNIDAD' },
                         { name: 'CODIGO_VIN' },
                         { name: 'NRO_TARJETA' },
                         { name: 'FECHA_INI' }
                     ],
                     localdata: data
                 };
                 
                     var dataAdapter = new $.jqx.dataAdapter(source, {
                         loadComplete: function (data) { },
                         loadError: function (xhr, status, error) { }
                     });
                 
                     $("#jqxgrid").jqxGrid(
                               {
                                   width: '100%',
                                   theme: 'bootstrap',
                                   autoheight: true,
                                   // editable: true,
                                   // pageable: true,
                                   scrollmode: 'logical',
                                   // sortable: true,
                                   selectionmode: 'singlerow',
                                   altrows: true,
                                   enabletooltips: true,
                                   //columnsresize: true,
                                   //selectionmode: 'singlecell',
                                   source: dataAdapter,
                                   columns: [
                                     { text: 'Placa', datafield: 'PLACA' },
                                     { text: 'Carroceria', datafield: 'CARROCERIA' },
                                     { text: 'Unidad           ', datafield: 'UNIDAD' },
                                     { text: 'Codigo VIN', datafield: 'CODIGO_VIN', },
                                     //{ text: 'Uso', datafield: 'uso' },
                                     { text: 'Partida Reg', datafield: 'NRO_TARJETA', cellsalign: 'left' },
                                     { text: 'Fecha Inicio', datafield: 'FECHA_INI', columntype: 'datetimeinput', cellsformat: 'dd/MM/yyyy' }
                                   ]
                               });

}

var PROPIETARIO = function () {

       var cargainicial = function () {
          
         


        $('#chkactivoprop').on('change', function () {
            if ($("#chkactivoprop").is(':checked')) {

                $('#txtfechafprop').attr("disabled", true);
                $('#txtfechafprop').val('');
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
                $('#txtfechafprop').val(today);
                $('#txtfechafprop').attr("disabled", false);
            }
        });



        cargagrid("");
    
    
        $.ajax({
            async: false,
            type: "POST",
            url: "vistas/NC/estereotipos/ajax/Propietario.ASHX?flag="+4+"&usua="+$("#ctl00_txtus").val(),
            
            success: function (res) {
                $("#controlempresaprop").html(res);
                $("#slcEmpresaprop option[value=0]").remove();
                $("#slcEmpresaprop").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });
              
                $("#slcEmpresaprop").select2("val", $("#ctl00_hddctlg").val());

                //CHANGE
                $("#slcEmpresaprop").change(function (event,empresa) {
                    $('#txtfechafprop').attr("disabled", true);
                    var pidm = $("#hfPPBIDEN_PIDM").val();                   
                    $.ajax({                       
                        type: "POST",
                        url: "vistas/NC/estereotipos/ajax/Propietario.ASHX?empr=" + $("#slcEmpresaprop").val()+
                            "&flag=5"+
                            "&pidm=" + pidm,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos) {                         
                            var data = datos;
                            cargagrid(data);
                        },
                        error: function (msg) {

                            $('#jqxgrid').jqxGrid('clear');
                        }
                    });

                    if (empresa == null) {
                        empresa = $('#slcEmpresaprop').val();
                        $("#txtfechaiprop").val("");
                        $("#txtfechafprop").val("");
                        $("#grabarprop").html("<i class='icon-pencil'></i> Grabar Datos");
                        $("#grabarprop").attr("href", "javascript:CrearPropietario();");
                    } else { $('#slcEmpresaprop').select2("val",empresa) }

                    if ($("#hfPPBIDEN_PIDM").val() != "")
                    { cargarPropietario(empresa); }

                });
                //----------
                if ($("#hfPPBIDEN_PIDM").val() != "")
                {
                    //cargarPropietario($('#slcEmpresaprop').val());
                    $('#slcEmpresaprop').change();
                }


            }
        });


        if (ObtenerQueryString("empr") != undefined && ObtenerQueryString("prop") != undefined) {
            $("#slcEmpresaprop").trigger("change", ObtenerQueryString("empr"));
        }

    }


    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaiprop", "txtfechafprop");


    }


    return {
        init: function () {
            cargainicial();
            plugins();
        
        }
    };


}();