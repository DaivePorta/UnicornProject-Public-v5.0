var NCLCUCO = function () {

    var fillBandejaCCContable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCCContable').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODE" },
                { data: "CODIGO_SUNAT" },
                { data: "NCTIPL_CODE" },
                { data: "CLASE_CUENTA" },
                { data: "NOMBRE_CORTO" },
                {
                   data: "NESTADO_IND",
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



        oTableCCContable = iniciaTabla('tblCCContable', parms);
        $('#tblCCContable').removeAttr('style');



        $('#tblCCContable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCCContable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCCContable.fnGetPosition(this);
                var row = oTableCCContable.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmcuco&codigo=' + codigo;
            }

        });



        $('#tblCCContable tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableCCContable.api(true).row($(this).parent().parent()).index();
            var row = oTableCCContable.fnGetData(pos);
            var cod = row.CODE;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMCUCO.ASHX", { OPCION: 'RO', CODE: cod},
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableCCContable.fnGetData(pos).NESTADO_IND = res;
                        refrescaTabla(oTableCCContable);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }

    //   function ponerevento(id) {
    //       $(id + '.cambiarbt').on('click', function () {

    //           $('#tblBandejaClaseCuenta tbody').off('click', 'tr');

    //           var cod = $(this).attr("id").split('_')[1];

    //           Bloquear("ventana");
    //           $.post("vistas/NC/ajax/NCMCUCO.ASHX", {
    //               OPCION: 'RO',
    //               CODE: cod

    //           })
    //           .done(function (res) {
    //               Desbloquear("ventana");
    //               if (res != null) {
    //                   if (res == "I") res = "INACTIVO";
    //                   else res = "ACTIVO"


    //                   var celda = oTableCC.api(true).cell($("#est" + cod)).index();

    //                   oTableCC.api(true).cell(celda.row, celda.column).data(res);


    //                   ponerevento("#_" + cod);
    //                   exito();
    //                   editaconclick();

    //               }
    //               else {
    //                   noexito();
    //               }
    //           });
    //       });
    //   }

    //   ponerevento("");

    //oTableCC = iniciaTabla('tblBandejaClaseCuenta');

    //   function editaconclick() {
    //       $('#tblBandejaClaseCuenta tbody').on('click', 'tr', function () {
    //           if ($(this).hasClass('selected')) {
    //               $(this).removeClass('selected');
    //           }
    //           else {
    //               oTableCC.$('tr.selected').removeClass('selected');
    //               $(this).addClass('selected');
    //               var code = $(this).attr('id');
    //               window.location.href = '?f=ncmcuco&codigo=' + code;
    //           }
    //       });
    //   }
    //       editaconclick();

    //   }

    return {
        init: function () {
            fillBandejaCCContable();
        }
    };

}();

var NCMCUCO = function () {

    var plugins = function () {

        $('#cboTipoPlan').select2();

        $('#txtCodigoSunat').on('focus', function () {
            $('#txtCodigoSunat').inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        });

        $('#txtClaseCuenta').on('focus', function () {
            $('#txtClaseCuenta').inputmask({ "mask": "%", "repeat": 120, "greedy": false });
        });

        $('#txtNombreCorto').on('focus', function () {
            $('#txtNombreCorto').inputmask({ "mask": "%", "repeat": 20, "greedy": false });
        });

    }

    var fillCboTipoPlan = function () {

        var selectTipoPlan = $('#cboTipoPlan');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcuco.ashx?opcion=0",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectTipoPlan.empty();
                if (datos != null) {
                    selectTipoPlan.append('<option></option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectTipoPlan.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                else {
                    selectTipoPlan.append('<option></option>');
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmcuco.ashx?opcion=1&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    if (datos != null) {
                        $("#txtcodigoClaseCuenta").val(datos[0].CODE);

                        $('#cboTipoPlan').select2('val', datos[0].CODE_PL);

                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                            //$('#chkEstado').parent().parent().siblings('span').html('Activo');
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                            //$('#chkEstado').parent().parent().siblings('span').html('Inactivo');
                        }

                        $('#txtClaseCuenta').val(datos[0].CLASE_CUENTA);
                        $('#txtCodigoSunat').val(datos[0].CODIGO_SUNAT);
                        $('#txtNombreCorto').val(datos[0].NOMBRE_CORTO);
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
            fillCboTipoPlan();
            cargaInicial();
        }
    };
}();

function Grabar() {

    var Errors = true;

    var CODIGO_SUNAT = '';
    var TIPL_CODE = '';
    var CLASE_CUENTA = '';
    var NOMBRE_CORTO = '';
    var ESTADO_IND = '';
    var USUA_ID = '';

    CODIGO_SUNAT = $('#txtCodigoSunat').val();
    TIPL_CODE = $('#cboTipoPlan').val();
    CLASE_CUENTA = $('#txtClaseCuenta').val();
    NOMBRE_CORTO = $('#txtNombreCorto').val();
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    Errors = validarClasesCuentas();

    if (Errors) {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCUCO.ASHX?OPCION=N&CODIGO_SUNAT=" + CODIGO_SUNAT + "&TIPL_CODE=" + TIPL_CODE +
                                              "&CLASE_CUENTA=" + CLASE_CUENTA + "&NOMBRE_CORTO=" + NOMBRE_CORTO +
                                              "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("EXISTE CODIGO INGRESADO");
                    }
                    else {
                        $('#txtcodigoClaseCuenta').val(datos[0].CODIGO);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                }
                else {
                    Desbloquear("ventana");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                alert(msg);
            }
        });

    }
    else {

        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");

    }

}

function Modificar() {

    var Errors = true;

    var CODE = '';
    var CODIGO_SUNAT = '';
    var TIPL_CODE = '';
    var CLASE_CUENTA = '';
    var NOMBRE_CORTO = '';
    var ESTADO_IND = '';
    var USUA_ID = '';

    CODE = $('#txtcodigoClaseCuenta').val();
    CODIGO_SUNAT = $('#txtCodigoSunat').val();
    TIPL_CODE = $('#cboTipoPlan').val();
    CLASE_CUENTA = $('#txtClaseCuenta').val();
    NOMBRE_CORTO = $('#txtNombreCorto').val();
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    Errors = validarClasesCuentas();

    if (Errors) {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCUCO.ASHX?OPCION=M&CODE=" + CODE + "&CODIGO_SUNAT=" + CODIGO_SUNAT + "&TIPL_CODE=" + TIPL_CODE +
                                              "&CLASE_CUENTA=" + CLASE_CUENTA + "&NOMBRE_CORTO=" + NOMBRE_CORTO +
                                              "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("EXISTE CODIGO INGRESADO");
                    }
                    else {
                        $('#txtcodigoClaseCuenta').val(datos[0].CODIGO);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                    }
                }
                else {
                    Desbloquear("ventana");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modalDpt");
                alert(msg);
            }
        });

    }
    else {

        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");

    }
}

function validarClasesCuentas() {
    var v_Errors = true;
    if (vErrorsNotMessage(["cboTipoPlan"]) == false) {
        v_Errors = false;
    }
    if (vErrorsNotMessage(["txtClaseCuenta"]) == false) {
        v_Errors = false;
    }
    if (vErrorsNotMessage(["txtCodigoSunat"]) == false) {
        v_Errors = false;
    }
    if (vErrorsNotMessage(["txtNombreCorto"]) == false) {
        v_Errors = false;
    }
    return v_Errors;
}