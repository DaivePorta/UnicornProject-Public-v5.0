var NCLREPE = function () {
    function editareps(id) {

        $("#myModalLabel").html("NUEVA ENTIDAD");

        var cont = $("#MuestraModal").css("display", "block").html();
        $("#divmodal").html("");
        $("#divmodal").html(cont);
        $("#MuestraModal").css("display", "none");

        //plugs
        aMayuscula(":input");
        $("#txtrazonsocial").focus(function () { $(this).inputmask({ "mask": "Z", "repeat": 150, "greedy": false }); });
        $("#txtrucmodal").inputmask({ "mask": "9", "repeat": 11, "greedy": false });;    

    }
    var fillBandejaRegimen = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjRegimen').val());
        var parms = {
            data: json,
            columns: [
                { data: "codigo" },                
                { data: "Codigo_Sunat" },
                { data: "TIPO" },
                { data: "Descripcion" },                
                {
                    data: { _: "fecha_ini.display", sort: "fecha_ini.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },                
                {
                    data: { _: "fecha_fin.display", sort: "fecha_fin.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableRegimen = iniciaTabla('tblRegimen', parms);
        $('#tblRegimen').removeAttr('style');



        $('#tblRegimen tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableRegimen.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableRegimen.fnGetPosition(this);
                var row = oTableRegimen.fnGetData(pos);
                var codigo = row.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmrepe&codigo=' + codigo;
            }

        });



        $('#tblRegimen tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableRegimen.api(true).row($(this).parent().parent()).index();
            var row = oTableRegimen.fnGetData(pos);
            var cod = row.codigo;
            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMREPE.ASHX", { opcion: 'A', CODE: cod},
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        var ar = res.split(',');
                        
                        if (ar[0] == "I") res = "INACTIVO";
                        else res = "ACTIVO";
                      
                        oTableRegimen.fnGetData(pos).fecha_fin.display = ar[1];
                        oTableRegimen.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableRegimen);
                        exito();
                        

                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }




    return {
        init: function () {

            fillBandejaRegimen();
        }
    };

}();

var NCMREPE = function () {

    var plugins = function () {
        $("#txtCodigoSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtPension").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 60, "greedy": false }); })
        inifechas("txtfechainicio", "txtfechfin");
    }

    var eventoControl = function () {
        $('#chkEstado').on('change', function () {
            if ($("#chkEstado").is(':checked')) {
                $('#txtfechfin').attr('placeholder', '');
                $('#txtfechfin').attr("disabled", true);
                $('#txtfechfin').val('');
                offObjectEvents('txtfechfin');
            } else {
                $('#txtfechfin').attr('placeholder', 'dd/mm/yyyy');
                $('#txtfechfin').attr("disabled", false);
            }
        });
    }

    var cargainicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (CODE != null) {

            $("#grabar").html("<i class='icon-pencil'></i>Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMREPE.ASHX?opcion=0&CODE=" + CODE,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodigoSunat").val(datos[0].CODE_SUNAT);
                    $("#txtPension").val(datos[0].DESCRIPCION);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#txtfechfin').attr('placeholder', '');
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);

                        $('#txtfechfin').attr('placeholder', '');
                        $('#txtfechfin').attr("disabled", true);
                        $('#txtfechfin').val('');
                        offObjectEvents('txtfechfin');
                    }
                    else {
                        $('#txtfechfin').attr('placeholder', 'dd/mm/yyyy');
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);

                        $('#txtfechfin').attr('placeholder', 'dd/mm/yyyy');
                        $('#txtfechfin').attr("disabled", false);
                    }
                    $("#txtfechainicio").datepicker("setDate", datos[0].FECHA_INI);
                    $("#txtfechfin").datepicker("setDate", datos[0].FECHA_FIN);
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM").val(datos[0].PDIM);
                    $("#txtnombre").val(datos[0].PERSONA);
                    $("#cboTipo").val(datos[0].TIP);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    var cargamodal = function () {

    $("#BuscaPJ").click(function () {

        cargalistapj()



    });

}
    return {
        init: function () {
            plugins();
            eventoControl();
            cargainicial();
            cargamodal();
            //$('#cboTipo').selec2();
        }
    };
}();

function GrabarPension() {

    var v_Errors = true;

    v_Errors = validarRegimen();

    if (v_Errors) {
        var emp = $("#ctl00_hddctlg").val();
        var cod_sunat = $('#txtCodigoSunat').val();
        var pension = $('#txtPension').val();
        var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var fecha_ini = $('#txtfechainicio').val();
        var fecha_fin = $('#txtfechfin').val();
        var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();
        var tipo = $('#cboTipo').val();
        var PDIM = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM').val();
        
        Bloquear("ventana");

        $.post("vistas/NC/ajax/NCMREPE.ASHX",
            {
                opcion: 'N', cod_sunat: cod_sunat, pension: pension, estado: estado, fecha_ini: fecha_ini, fecha_fin: fecha_fin,
                usuario: usuario, tipo: tipo, PDIM: PDIM, emp: emp
            },
            function (res) {
                Desbloquear("ventana");
                if (res != 'EXIS' && res.length == 4) {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> modificar");
                    $("#grabar").attr("href", "javascript:Modificar()");
                } else {


                    switch (res) {
                        //SI ESTA SIENDO USADO EL CODIGO DE SUNAT
                        case 'EXIS':
                            existeCod(cod_sunat);
                            break;
                            //SI ESTA SIENDO USADO LA DESCRIPCIÓN
                        case 'DUP':
                            duplicidadCod(pension);
                            break;
                            // SI ESTA SIENDO USADO EL CÓDIGO DE SUNAT Y LA DESCRIPCIÓN 
                        case 'CSN':
                            CodDescDup(cod_sunat, pension);
                            break;
                    }
                }
            });
    }
}

function Modificar() {

    var v_Errors = true;

    v_Errors = validarRegimen();

    if (v_Errors) {


        //var mensaje = '';
        var codigo = $('#txtCodigo').val();
        var cod_sunat = $('#txtCodigoSunat').val();
        var pension = $('#txtPension').val();
        var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var fecha_ini = $('#txtfechainicio').val();
        var fecha_fin = $('#txtfechfin').val();
        var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();
        var tipo = $('#cboTipo').val();
        var PDIM = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM').val();
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMREPE.ASHX",
            {
                opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, pension: pension, estado: estado, fecha_ini: fecha_ini, fecha_fin: fecha_fin,
                usuario: usuario, tipo: tipo, PDIM: PDIM
            },
             function (res) {
                 Desbloquear("ventana");
                 if (res == "OK") {
                     exito();
                 } else {

                     switch (res) {
                         //SI ESTA SIENDO USADO EL CODIGO DE SUNAT
                         case 'EXIS':
                             existeCod(cod_sunat);
                             break;
                             //SI ESTA SIENDO USADO LA DESCRIPCIÓN
                         case 'DUP':
                             duplicidadCod(pension);
                             break;
                             // SI ESTA SIENDO USADO EL CÓDIGO DE SUNAT Y LA DESCRIPCIÓN 
                         case 'CSN':
                             CodDescDup(cod_sunat, pension);
                             break;
                     }
                 }
             });
    }
}

function validarRegimen() {
    var v_Errors = true;

    if ($('#chkEstado').is(':checked')) {
        offObjectEvents('txtfechfin');
        if (!vErrorsNotMessage(["txtCodigoSunat", "txtPension", "txtfechainicio"])) {
            v_Errors = false;
        }
    }
    else {
        if (!vErrorsNotMessage(["txtCodigoSunat", "txtPension", "txtfechainicio", "txtfechfin"])) {
            v_Errors = false;
        }
    }

    if (!v_Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
    }

    return v_Errors;
}



function editareps(id) {

    $("#myModalLabel").html("NUEVA ENTIDAD");

    var cont = $("#MuestraModal").css("display", "block").html();
    $("#divmodal").html("");
    $("#divmodal").html(cont);
    $("#MuestraModal").css("display", "none");

    //plugs
    aMayuscula(":input");
    $("#txtrazonsocial").focus(function () { $(this).inputmask({ "mask": "Z", "repeat": 150, "greedy": false }); });
    $("#txtrucmodal").inputmask({ "mask": "9", "repeat": 11, "greedy": false });;    

}

function listareps() {
    $("#myModalLabel").html("LISTA DE PERSONAS JURIDICAS");

    $("#MuestraModal").css("display", "none");

    cargalistapj()


}

function cargalistapj() {
    Bloquear("muestralistap");
    $.post("vistas/NC/ajax/NCMEPSA.ASHX", { flag: 5 },
        function (res) {
            Desbloquear("muestralistap");
            $("#divmodal").html("");
            $("#divmodal").html(res);

            //  alert(res);

            var tablemod = $('#tblbmodal').DataTable({

                "scrollCollapse": true,
                //"paging": false,
                //"info": false
            });


            $('#tblbmodal tbody').on('click', 'tr', function () {
                //if ($(this).hasClass('selected')) {
                //    $(this).removeClass('selected');
                //}
                //else {
                //    tablemod.$('tr.selected').removeClass('selected');
                //    $(this).addClass('selected');
                //}


                //$("#grabar").html("<i class='icon-pencil'></i> Grabar Datos");
                //$("#grabar").attr("href", "javascript:GrabarPension();");


                $('#txtcodigo').val("");
                $('#muestralistap').modal('hide');
                var IDPER2 = $(this).attr("id");


                $('#txtpidm').val(IDPER2);
                $('#txtnombre').val($('#per' + IDPER2).text());

                $('#txtruc').val($('#ruc' + IDPER2).text());
                //$('#txtPension').val($('#raz' + IDPER2).text());

                $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM').val(IDPER2);
            });

        });

}
//function Crear() {

//    var p_acti = $('#chkEstado').is(':checked') ? 'A' : 'I';

//    var p_fein = $("#txtfechainicioni").val();

//    var p_fefi = $('#txtFechFin').val();
//    var p_cosu = $('#txtCodSunat').val();
//    var p_pidm = $('#txtpidm').val();
//    var p_user = $('#ctl00_lblusuario').html();

//    if (vErrors(["txtfechainicioni", "txtCodSunat", "txtpidm"])) {
//        Bloquear("ventana");
//        $.post("vistas/NC/ajax/NCMEPSA.ASHX", { flag: 1, fein: p_fein, fefi: p_fefi, user: p_user, acti: p_acti, cosu: p_cosu, pidm: p_pidm },
//            function (res) {
//                Desbloquear("ventana");
//                if (res != "") {
//                    exito();
//                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
//                    $("#grabar").attr("href", "javascript:Actualizar();");
//                    $("#txtCodigo").val(res);
//                } else {
//                    noexito();
//                }
//            });
//    }
//}
