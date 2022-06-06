function Actualizar() {
    var p_acti = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtCodigo').val();
    var p_fein = $("#txtFechIni").val();
    
    var p_fefi = $('#txtFechFin').val();
    var p_cosu = $('#txtCodSunat').val();
    var p_pidm = $('#txtpidm').val();

    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtFechIni", "txtCodSunat", "txtpidm"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMEPSA.ASHX", { flag: 2, fein: p_fein, fefi: p_fefi, user: p_user, acti: p_acti, codigo: p_codi, cosu: p_cosu, pidm:p_pidm },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkEstado').is(':checked') ? 'A' : 'I';

    var p_fein = $("#txtFechIni").val();

    var p_fefi = $('#txtFechFin').val();
    var p_cosu = $('#txtCodSunat').val();
    var p_pidm = $('#txtpidm').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtFechIni", "txtCodSunat", "txtpidm"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMEPSA.ASHX", { flag: 1, fein: p_fein, fefi: p_fefi, user: p_user, acti: p_acti, cosu: p_cosu, pidm: p_pidm },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtCodigo").val(res);
                } else {
                    noexito();
                }
            });
    }
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

function creareps() {

    var razon = $("#txtrazonsocial").val();
    var ruc = $("#txtrucmodal").val();
   
    if (ruc.length == 11) {

        var data = new FormData();
        data.append('OPCION', 'NPJ');
        data.append('APELL_PATE', razon);
        data.append('FECHA', "");
        data.append('RAZO_COME', "");
        data.append('ACTIVIDAD', "");
        data.append('CONTACTO', "");
        data.append('REP_LEGAL', "");
        data.append('WEB', "");
        data.append('AGENTE_RETEN_IND', "N");
        data.append('FECHA_AGENTE_RETEN', "");
        data.append('AGENTE_PERCEP_IND', "");
        data.append('FECHA_AGENTE_PERCEP', "");
        data.append('RELACIONADA_IND', "N");
        data.append('RELACIONADA_CODE', "");
        data.append('ENTIDAD_IND', "J");
        data.append('TINO_CODE', "PJUR");
        data.append('USUA_ID', $('#ctl00_lblusuario').html());
        data.append('DOID_CODE', "6");
        data.append('NRO', ruc);
        data.append('ESTADO_IND', "A");
        data.append('PPRTELE_TIDT_CODE', "0003");
        data.append('NUMERO', "");
        data.append('PPRCORR_TIDT_CODE', "0001");
        data.append('CORREO', "");
        data.append('TIPO', "J");
        data.append('PPBIMAG', "../../recursos/img/150x200.gif");


        Bloquear("ventana");

        $.ajax({

            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    var datos = $.parseJSON(res);
                    if (datos.length > 0) {
                        if (datos[0].SUCCESS == "OK") {
                            exito();
                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Actualizar();");

                            $("#txtpidmmodal").val(datos[0].p_PPBIDEN_PIDM);
                            $("#muestralistap").modal("hide")

                            $('#txtpidm').val($('#txtpidmmodal').val());
                            $('#txtnombre').val($('#txtrazonsocial').val());

                            $('#txtruc').val($('#txtrucmodal').val());
                        }
                    }
                } else {
                    noexito();
                }
            }
        });

    } else { alertCustom("RUC debe tener 11 caracteres"); }
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
                "paging": false,
                "info": false
            });


            $('#tblbmodal tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tablemod.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }


                $("#grabar").html("<i class='icon-pencil'></i> Grabar Datos");
                $("#grabar").attr("href", "javascript:Crear();");


                $('#txtcodigo').val("");
                $('#muestralistap').modal('hide');
                var IDPER2 = $(this).attr("id");


                $('#txtpidm').val(IDPER2);
                $('#txtnombre').val($('#per' + IDPER2).html());

                $('#txtruc').val($('#ruc' + IDPER2).html());

            });

        });

}

function listareps() {
    $("#myModalLabel").html("LISTA DE PERSONAS JURIDICAS");

    $("#MuestraModal").css("display", "none");

    cargalistapj()


}


var NCLEPSA = function () {


    var plugins = function () {

        

    }

    var fillBandejaEpsa = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjEpsa').val());
        var parms = {
            data: json,
            columns: [
                { data: "codigo" },
                { data: "codigo_sunat" },
                { data: "eps" },
                
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



        oTableEpsa = iniciaTabla('tblEpsa', parms);
        $('#tblEpsa').removeAttr('style');



        $('#tblEpsa tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableEpsa.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableEpsa.fnGetPosition(this);
                var row = oTableEpsa.fnGetData(pos);
                var codigo = row.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmepsa&codigo=' + codigo;
            }

        });



        $('#tblEpsa tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableEpsa.api(true).row($(this).parent().parent()).index();
            var row = oTableEpsa.fnGetData(pos);
            var cod = row.codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMEPSA.ASHX", { flag: '3', codigo: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableEpsa.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableEpsa);
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
            fillBandejaEpsa();
            //datatable();
            plugins();

        }
    };

}();

var NCMEPSA = function () {

    var cargamodal = function () {

         $("#BuscaPJ").click(function () {

                     cargalistapj()



        });

    }


    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });

        inifechas("txtFechIni", "txtFechFin");
        aMayuscula(":input");
    }



    var cargainicial = function () {

        $('#chkEstado').on('change', function () {
            if ($("#chkEstado").is(':checked')) {

                $('#txtFechFin').attr("disabled", true);
                $('#txtFechFin').val('');
            } else {

                $('#txtFechFin').attr("disabled", false);
            }
        });




        var CODE = ObtenerQueryString("codigo");

        if (CODE != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmepsa.ashx?flag=4&codigo=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

              
                    $('#txtCodigo').val(datos[0].CODIGO);
                    $("#txtFechIni").datepicker("setDate", datos[0].FECHA_INICIO);

                    $('#txtFechFin').datepicker("setDate", datos[0].FECHA_FIN);
                    $('#txtCodSunat').val(datos[0].CODIGO_SUNAT);
                    $('#txtpidm').val(datos[0].PIDM);
                    $('#txtruc').val(datos[0].RUC);
                    $('#txtnombre').val(datos[0].EPS);

                    if (datos[0].ESTADO == 'ACTIVO') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                        $('#txtFechFin').attr("disabled", false);
                    }



                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }

    return {
        init: function () {
            plugins();
            cargainicial();
            cargamodal();
        }
    };

}();
//$(document).keypress(function (e) { if (e.which == 13) { $("#BuscaPJ").click(); } })