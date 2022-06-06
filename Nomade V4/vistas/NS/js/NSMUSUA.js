var NSLUSUA = function () {

    var fillBandejaUsuarios = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                { data: "USUARIO" },
                { data: "NOMBRE" },
                {
                    data: { _: "FECHA_INICIO.display", sort: "FECHA_INICIO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_LIMITE.display", sort: "FECHA_LIMITE.order" },
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

        oTableBandeja = iniciaTabla('divBandejaUsuarios', parms);
        $('#divBandejaUsuarios').removeAttr('style');


        $('#divBandejaUsuarios tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableBandeja.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableBandeja.fnGetPosition(this);
                var row = oTableBandeja.fnGetData(pos);
                var code = row.USUARIO;
                window.location.href = '?f=nsmusua&codigo=' + code;
            }
        });



    }

    return {
        init: function () {
            fillBandejaUsuarios();
        }
    };

}();

var NSMUSUA = function () {

    var fillCboZonaHoraria = function () {
        var selectZonaHoraria = $('#cboZonaHoraria');
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=ZH",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    selectZonaHoraria.empty();
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectZonaHoraria.append('<option></option>');
                        }
                        selectZonaHoraria.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var plugins = function () {
        $('#cboPersona').select2();
        $('#cboEmpresa').select2();
        $('#cboCargo').select2();

        /*inifechas("txtFechaInicio");
        inifechas("txtFechaLimite");*/
        $("#txtHoraInicio").focus(function () { $(this).inputmask("H:0") });
        $("#txtHoraFin").focus(function () { $(this).inputmask("H:0") });
        $('#cboZonaHoraria').select2();
    }

    var eventoControles = function () {

        HandlerUsuario();
        HandlerEmpresa();
        HandlerTabPermisos();
        HandlerTabCorporativo();
        HandlerTabHorarios();
        HandlerJqxgridRol();
        HandlerJqxgridEmpresa();

    }

    var cargaInicial = function () {
        fillCorreo();
        $('#txtregistro').val('');
        $('#txtClave1').val('');
        $('#txtClave2').val('');

        $('#hfTabActivo').val('');
        $('#hfUsuaID').val('');

        inifechas("txtFechaInicio", "txtFechaLimite");

        verificarClave();

        eventosCheck();

        fillCboEmpresa();
        fillCboCargo();

        initJqxGridRol("[]");

        initJqxGridHorario("[]");

        $('#cboPersona').attr('disabled', false);

        var cod = ObtenerQueryString("codigo");

        if (typeof (cod) !== "undefined") {

            $('#cboPersona').attr('disabled', true);

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=RU&ID=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "") {
                        $('#hfUsuaID').val(datos[0].USUARIO);

                        $("#txtregistro").val(datos[0].USUARIO);
                        $("#txtClave1").val(datos[0].CLAVE);
                        $("#txtClave2").val(datos[0].CLAVE);
                        fillCboPersona(datos[0].PIDM);
                       // $('#cboPersona').select2('val', datos[0].PIDM);

                        $("#txtFechaInicio").val(datos[0].FECHA_INICIO);
                        $("#txtFechaLimite").val(datos[0].FECHA_LIMITE);
                        $("#txtEmail").val(datos[0].EMAIL);
                        $('#divPestaniaUsuario').removeAttr('style');

                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }

                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizar();");

                        obtenerDetalleHorario();
                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos del Usuario.");
                }

            });

        }
        else {
            fillCboPersona(0);
        }
    }

    return {
        init: function () {
            fillCboZonaHoraria();
            plugins();
            cargaInicial();
            eventoControles();

        }
    };
}();

function HandlerUsuario() {
    $('#txtregistro').on('focus', function () {
        $('#txtregistro').inputmask({ "mask": "O", "repeat": 30, "greedy": false });
    });
}

function HandlerEmpresa() {
    $('#cboEmpresa').on('change', function () {
        $('#delRol').removeClass();
        $('#delRol').addClass('btn red disabled');
        $('#delRol').removeAttr('onclick');
        $('#delRol').attr('onclick', 'javascript:;');
        obtenerPermisos(this.value);
    });
}

function HandlerTabPermisos() {
    $("#tabPermisos").on("click", function () {
        if ($.trim($('#hfTabActivo').val()) != "PERMISOS") {
            $('#hfTabActivo').val("PERMISOS");
        }
    });
}

function HandlerTabCorporativo() {
    $("#tabCorporativo").on("click", function () {
        if ($.trim($('#hfTabActivo').val()) != "CORPORATIVO") {
            obtenerEmpresa();
            initJqxGridEstablecimiento("[]");

            //$('#delEstablecimiento').removeClass();
            //$('#delEstablecimiento').addClass('btn red disabled');
            //$('#delEstablecimiento').removeAttr('onclick');
            //$('#delEstablecimiento').attr('onclick', 'javascript:;');

            $('#addEstablecimiento').removeClass();
            $('#addEstablecimiento').addClass('btn green disabled');
            $('#addEstablecimiento').removeAttr('onclick');
            $('#addEstablecimiento').attr('onclick', 'javascript:;');

            $('#hfTabActivo').val("CORPORATIVO");
        }
    });
}

function HandlerTabHorarios() {
    $("#tabHorarios").on("click", function () {
        if ($.trim($('#hfTabActivo').val()) != "HORARIOS") {
            $('#hfTabActivo').val("HORARIOS");
        }
    });
}

function HandlerJqxgridRol() {
    $("#jqxgridRol").on('rowselect', function (event) {
        var v_CODE = $('#jqxgridRol').jqxGrid('getdisplayrows')[event.args.rowindex].ROLC_CODE;
        var v_INDEX = $('#jqxgridRol').jqxGrid('getdisplayrows')[event.args.rowindex].uid;
        $('#delRol').removeClass();
        $('#delRol').addClass('btn red');
        $('#delRol').removeAttr('onclick');
        $('#delRol').attr('onclick', 'javascript:deleteRowJqxgridRol(' + v_INDEX + ',\'' + v_CODE + '\');');
    });
}

function HandlerJqxgridEmpresa() {
    $("#jqxgridEmpresa").on('rowselect', function (event) {
        var v_CTLG_CODE = $('#jqxgridEmpresa').jqxGrid('getdisplayrows')[event.args.rowindex].CTLG_CODE;
        var v_INDEX = $('#jqxgridEmpresa').jqxGrid('getdisplayrows')[event.args.rowindex].uid;

        $('#addEstablecimiento').removeClass();
        $('#addEstablecimiento').addClass('btn green');
        $('#addEstablecimiento').removeAttr('onclick');
        $('#addEstablecimiento').attr('onclick', 'javascript:showModalEstablecimiento(\'' + v_CTLG_CODE + '\');');

        obtenerCorporativo(v_CTLG_CODE);

        $('#delEstablecimiento').removeClass();
        $('#delEstablecimiento').addClass('btn red disabled');
        $('#delEstablecimiento').removeAttr('onclick');
        $('#delEstablecimiento').attr('onclick', 'javascript:;');

    });
    $("#jqxgridEstablecimiento").on('rowselect', function (event) {
        $('#delEstablecimiento').removeClass();
        $('#delEstablecimiento').addClass('btn red');
        $('#delEstablecimiento').removeAttr('onclick');
        $('#delEstablecimiento').attr('onclick', 'javascript:deleteRowJqxgridEstablecimiento();');

    });

}

function obtenerPermisos(v_Value) {
    var ID = $('#hfUsuaID').val();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=5&ID=" + ID + "&CTLG_CODE=" + v_Value,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {
                $('#cboCargo').select2('val', datos[0].CARG_CODE);
                $('#cboCargo').attr('disabled', true);

                $('#proRol').removeAttr('class');
                $('#proRol').attr('class', 'btn blue disabled');
                $('#proRol').attr('onclick', 'javascript:;');

                $('#addRol').removeAttr('class');
                $('#addRol').attr('class', 'btn green');
                $('#addRol').attr('onclick', 'javascript:showModalRol();');


                if ($("#cboCargo").val() != "") {
                    obtenerRolesCargo($("#cboCargo").val(), datos);
                }



                initJqxGridRol(JSON.stringify(datos));
            }
            else {
                $('#cboCargo').select2('val', '');
                $('#cboCargo').attr('disabled', false);

                $('#proRol').removeAttr('class');
                $('#proRol').attr('class', 'btn blue');
                $('#proRol').attr('onclick', 'javascript:grabarRol(0);');

                $('#addRol').removeAttr('class');
                $('#addRol').attr('class', 'btn green disabled');
                $('#addRol').attr('onclick', 'javascript:;');

                initJqxGridRol("[]");
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la pestaña Permisos.");
        }
    });
}

/*srl 21-09-2015*/
  arrayNuevo = new Array();
function obtenerRolesCargo(v_Value, actual) {
    arrayNuevo = new Array();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=10&CODE=" + v_Value,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {


                datos.filter(function (e, d) {
                    if ((e.estado.substring(0, 1) == "I" &&
                        JSON.stringify(actual).indexOf(e.codigo) >= 0
                        ) || (e.estado.substring(0, 1) == "A" &&
                        JSON.stringify(actual).indexOf(e.codigo) < 0)) {
                        arrayNuevo.push(e);
                    }
                });


            }
            else {


                initJqxGridRol("[]");
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la pestaña Permisos.");
        }
    });
}

function obtenerCorporativo(v_CTLG_CODE) {
    var ID = $('#hfUsuaID').val();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=9&ID=" + ID + "&CTLG_CODE=" + v_CTLG_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {
                initJqxGridEstablecimiento(JSON.stringify(datos))
            }
            else {
                initJqxGridEstablecimiento("[]");
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la pestaña Corporativo.");
        }
    });
}

function fillCorreo() {
   var  selectPersona = $('#cboPersona');

   selectPersona.change(function () {
       if ($("#txtEmail").val() == "") {
           var pidm = $(this).val();
           $.ajax({
               type: "post",
               url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=EMAIL&PIDM=" + pidm,
               contenttype: "application/json;",
               datatype: "json",
               beforeSend: function () { Bloquear($("#txtEmail").parents("div")[0]) },
               async: true,
               success: function (datos) {
                   offObjectEvents("txtEmail");
                   if (datos.length > 0) {//tiene 1 o mas correos
                       var arrayCorreos = new Array();
                       datos.filter(function (e) { arrayCorreos.push(e.CORREO); });
                       $("#txtEmail")
                           .typeahead({ source: arrayCorreos }, { highlight: true, hint: true })
                           .keyup(function () {
                               $(this).siblings("ul").css("width", $(this).css("width"))
                           });
                   }
               },
               complete: function () {
                   Desbloquear($("#txtEmail").parents("div")[0])
               }
           });

       }
   });

}

function fillCboPersona(v_Value) {
    selectPersona = $('#cboPersona');
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=1&PIDM=" + v_Value,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            selectPersona.empty();
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectPersona.append('<option></option>');
                    }
                    selectPersona.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            else {
                selectPersona.append('<option></option>');
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Persona.");
        },
        complete: function () {
            if (v_Value != 0)
                $('#cboPersona').select2('val', v_Value);
        }
    });

}

function fillCboEmpresa() {
    selectEmpresa = $('#cboEmpresa');
    var v_Usuario_Session = $('#ctl00_txtus').val();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=4&USUA_ID=" + v_Usuario_Session,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEmpresa.empty();
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectEmpresa.append('<option></option>');
                    }
                    selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            else {
                selectEmpresa.append('<option></option>');
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Empresa.");
        }
    });
}

function fillCboCargo() {
    selectCargo = $('#cboCargo');
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=2",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectCargo.empty();
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectCargo.append('<option></option>');
                    }
                    selectCargo.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            else {
                selectCargo.append('<option></option>');
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Cargo.");
        }
    });
}

function initJqxGridRol(v_JsonString) {

    $('#jqxgridRol').jqxGrid('clear');
    $('#jqxgridRol').jqxGrid('clearselection');

    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json'
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgridRol').jqxGrid({
        source: dataAdapter,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        scrollmode: 'logical',
        enabletooltips: true,
        columns: [
            { text: 'CODIGO ROL', datafield: 'ROLC_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            {
                text: 'ROL', datafield: 'NROLC_CODE', width: '100%', cellsalign: 'left', align: 'center'               
            }
        ]
    });

    $('#jqxgridRol').jqxGrid('refreshdata');    


}



function deleteRowJqxgridEstablecimiento() {
    var p_ID = $.trim($('#hfUsuaID').val());
    var v_INDEX = $('#jqxgridEstablecimiento').jqxGrid('selectedrowindex');
    var p_SCSL_CODE = $('#jqxgridEstablecimiento').jqxGrid('getcellvalue', v_INDEX, 'SCSL_CODE');
    var p_ESTADO_IND = "I";
    var p_USUA_ID = $('#ctl00_lblusuario').html();

    var rowindex = $('#jqxgridEmpresa').jqxGrid('getselectedrowindex');
    var p_CTLG_CODE = $('#jqxgridEmpresa').jqxGrid('getdisplayrows')[rowindex].CTLG_CODE;

    Bloquear("corporativo");
    $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
        OPCION: "CEUC",
        ID: p_ID,
        SCSL_CODE: p_SCSL_CODE,
        CTLG_CODE: p_CTLG_CODE,
        ESTADO_IND: p_ESTADO_IND,
        USUA_ID: p_USUA_ID
    }).done(function (res) {
        Desbloquear("corporativo");
        if (res == "OK") {
            $('#delEstablecimiento').removeClass();
            $('#delEstablecimiento').addClass('btn red disabled');
            $('#delEstablecimiento').removeAttr('onclick');
            $('#delEstablecimiento').attr('onclick', 'javascript:;');

            $('#jqxgridEstablecimiento').jqxGrid('deleterow', v_INDEX);

            $("#jqxgridEstablecimiento").jqxGrid('clearselection');
            $('#jqxgridEstablecimiento').jqxGrid('refreshdata');
            exito();
        }
        else {
            noexito();
        }
    }).fail(function () {
        Desbloquear("permisos");
        noexito();
    });
}

function deleteRowJqxgridRol(v_INDEX, v_CODE) {
    var p_ID = $.trim($('#hfUsuaID').val());
    var p_CTLG_CODE = $.trim($('#cboEmpresa').val());
    var p_CARG_CODE = $.trim($('#cboCargo').val());
    var p_ROLC_CODE = v_CODE;
    var p_ESTADO_IND = "I";
    var p_USUA_ID = $('#ctl00_lblusuario').html();

    Bloquear("permisos");
    $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
        OPCION: "CEUP",
        ID: p_ID,
        CTLG_CODE: p_CTLG_CODE,
        CARG_CODE: p_CARG_CODE,
        ROLC_CODE: p_ROLC_CODE,
        ESTADO_IND: p_ESTADO_IND,
        USUA_ID: p_USUA_ID
    })
        .done(function (res) {
            Desbloquear("permisos");
            if (res == "OK") {
                $('#delRol').removeClass();
                $('#delRol').addClass('btn red disabled');
                $('#delRol').removeAttr('onclick');
                $('#delRol').attr('onclick', 'javascript:;');

                $('#jqxgridRol').jqxGrid('deleterow', v_INDEX);

                $("#jqxgridRol").jqxGrid('clearselection');
                $('#jqxgridRol').jqxGrid('refreshdata');
                exito();
            }
            else {
                noexito();
            }
        })
        .fail(function () {
            Desbloquear("permisos");
            noexito();
        });
}

function grabar() {

    var p_ID = $.trim($('#txtregistro').val());
    var p_CLAVE = $.trim($('#txtClave1').val());
    var p_PIDM = $.trim($('#cboPersona').val());
    var p_EMPLEADO_IND = '';
    var p_FECHA_INICIO = $('#txtFechaInicio').val();
    var p_FECHA_LIMITE = $('#txtFechaLimite').val();
    var p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var email = $("#txtEmail").val();

    if (vErrors(["txtClave1", "txtClave2", "txtregistro", "cboPersona", "txtFechaInicio", "txtFechaLimite", "txtEmail"]) && verficaSintactiCaclave()) {

        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
            OPCION: "CU",
            ID: p_ID,
            CLAVE: p_CLAVE,
            PIDM: p_PIDM,
            EMPLEADO_IND: p_EMPLEADO_IND,
            FECHA_INICIO: p_FECHA_INICIO,
            FECHA_LIMITE: p_FECHA_LIMITE,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID,
            EMAIL: email

        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("YA EXISTE USUARIO.");
                }
                else {

                    $('#hfUsuaID').val(res);
                    $('#txtregistro').val(res);
                    $('#divPestaniaUsuario').removeAttr('style');

                    initJqxGridRol("[]");
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

function actualizar() {

    var p_ID = $.trim($('#txtregistro').val());
    var p_CLAVE = $.trim($('#txtClave1').val());
    var p_PIDM = $.trim($('#cboPersona').val());
    var p_EMPLEADO_IND = '';
    var p_FECHA_INICIO = $('#txtFechaInicio').val();
    var p_FECHA_LIMITE = $('#txtFechaLimite').val();
    var p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var email = $("#txtEmail").val();
    if (vErrors(["txtClave1", "txtClave2", "txtregistro", "cboPersona", "txtFechaInicio", "txtFechaLimite", "txtEmail"]) && verficaSintactiCaclave()) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
            OPCION: "AU",
            ID: p_ID,
            CLAVE: p_CLAVE,
            PIDM: p_PIDM,
            EMPLEADO_IND: p_EMPLEADO_IND,
            FECHA_INICIO: p_FECHA_INICIO,
            FECHA_LIMITE: p_FECHA_LIMITE,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID,
            EMAIL: email

        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("YA EXISTE USUARIO.");
                }
                else {
                    $('#hfUsuaID').val(res);
                    $('#txtregistro').val(res);
                    $('#divPestaniaUsuario').removeAttr('style');
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function grabarRol(v_Value) {

    var Errors = true;

    Errors = validarPermiso(v_Value);

    if (Errors) {
        var p_ID = $.trim($('#hfUsuaID').val());
        var p_CTLG_CODE = $.trim($('#cboEmpresa').val());
        var p_CARG_CODE = $.trim($('#cboCargo').val());
        var p_ROLC_CODE = v_Value == 0 ? '' : $('#cboRolModal').val();
        var p_ESTADO_IND = "A";
        var p_USUA_ID = $('#ctl00_lblusuario').html();

        Bloquear("permisos");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
            OPCION: "CUP",
            ID: p_ID,
            CTLG_CODE: p_CTLG_CODE,
            CARG_CODE: p_CARG_CODE,
            ROLC_CODE: p_ROLC_CODE,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("permisos");
                if (res == "OK") {

                    if (v_Value == 1) {
                        cerrarModalRol();
                    }

                    exito();

                    obtenerPermisos(p_CTLG_CODE);

                    $('#cboCargo').attr('disabled', true);
                    $('#cboCargo').select2('val', p_CARG_CODE);


                    $('#proRol').removeAttr('class');
                    $('#proRol').attr('class', 'btn blue disabled');
                    $('#proRol').attr('onclick', 'javascript:;');

                    $('#addRol').removeAttr('class');
                    $('#addRol').attr('class', 'btn green');
                    $('#addRol').attr('onclick', 'javascript:showModalRol();');

                }
                else {
                    noexito();
                }
            })
            .fail(function () {
                Desbloquear("permisos");
                noexito();
            });
    }


}

function grabarEstablecimiento() {
    var Errors = true;

    Errors = validarEstablecimiento();

    if (Errors) {
        var p_ID = $.trim($('#hfUsuaID').val());
        var rowindex = $('#jqxgridEmpresa').jqxGrid('getselectedrowindex');
        var v_CTLG_CODE = $('#jqxgridEmpresa').jqxGrid('getdisplayrows')[rowindex].CTLG_CODE;
        var p_SCSL_CODE = $.trim($('#cboEstablecimientoModal').val());
        var p_ESTADO_IND = "A";
        var p_USUA_ID = $('#ctl00_lblusuario').html();

        Bloquear("corporativo");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
            OPCION: "CUE",
            ID: p_ID,
            CTLG_CODE: v_CTLG_CODE,
            SCSL_CODE: p_SCSL_CODE,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        }).done(function (res) {
            Desbloquear("corporativo");
            if (res == "OK") {
                exito();
                cerrarModalEstablecimiento();
                obtenerCorporativo(v_CTLG_CODE);
            }
            else {
                noexito();
            }
        }).fail(function () {
            Desbloquear("corporativo");
            noexito();
        });
    }

}

function validarPermiso(v_Value) {
    var v_Errors = true;

    if (v_Value == 0) {
        v_Errors &= vErrors(["cboEmpresa", "cboCargo"]);
    }

    if (v_Value == 1) {
        if (!vErrorsNotMessage(["cboRolModal"])) {
            v_Errors = false;
        }


        if (!v_Errors) {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
        }
    }

    return v_Errors;
}

function validarEstablecimiento() {
    var v_Errors = true;

    if (!vErrorsNotMessage(["cboEstablecimientoModal"])) {
        v_Errors = false;
    }

    if (!v_Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!.");
    }

    return v_Errors;
}

function showModalRol() {
    $('#cboRolModal').select2();
    fillCboRolModal();
    $('#cboRolModal').select2('val', '');
    offValidationError('cboRolModal');
    $('#ModalRol').modal('show');
}

function showModalEstablecimiento(v_CTLG_CODE) {
    $('#cboEstablecimientoModal').select2();
    fillCboEstablecimientoModal(v_CTLG_CODE);
    $('#cboEstablecimientoModal').select2('val', '');
    offValidationError('cboEstablecimientoModal');
    $('#ModalEstablecimiento').modal('show');
}

function cerrarModalRol() {
    $('#ModalRol').modal('hide');
}

function cerrarModalEstablecimiento() {
    $('#ModalEstablecimiento').modal('hide');
}

function fillCboRolModal() {
    selectRolModal = $('#cboRolModal');
    var ID = $('#hfUsuaID').val();
    var CTLG_CODE = $('#cboEmpresa').val();
    var CARG_CODE = $('#cboCargo').val();

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=6&ID=" + ID + "&CTLG_CODE=" + CTLG_CODE + "&CARG_CODE=" + CARG_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectRolModal.empty();
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectRolModal.append('<option></option>');
                    }
                    selectRolModal.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            else {
                selectRolModal.append('<option></option>');
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Rol.");
        }
    });
}

function fillCboEstablecimientoModal(v_CTLG_CODE) {
    selectEstablecimientoModal = $('#cboEstablecimientoModal');
    var ID = $('#hfUsuaID').val();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=8&ID=" + ID + "&CTLG_CODE=" + v_CTLG_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEstablecimientoModal.empty();
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectEstablecimientoModal.append('<option></option>');
                    }
                    selectEstablecimientoModal.append('<option value="' + datos[i].CODE + '">' + datos[i].DESCR + '</option>');
                }
            }
            else {
                selectEstablecimientoModal.append('<option></option>');
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Establecimiento.");
        }
    });
}

function offValidationError(v_Id) {
    $('#' + v_Id).parent().parent().removeAttr('class');
    $('#' + v_Id).off("change");
    $('#' + v_Id).off('paste');
    $('#' + v_Id).off('keyup');
    $('#' + v_Id).parent().children('span').remove();
}

function obtenerEmpresa() {
    var ID = $('#hfUsuaID').val();
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=7&ID=" + ID,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {
                initJqxGridEmpresa(JSON.stringify(datos));
            } else {
                initJqxGridEmpresa("[]");
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la pestaña Corporativo.");
        }
    });
}

function initJqxGridEmpresa(v_JsonString) {

    $('#jqxgridEmpresa').jqxGrid('clear');
    $('#jqxgridEmpresa').jqxGrid('clearselection');

    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json'
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgridEmpresa').jqxGrid({
        source: dataAdapter,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        scrollmode: 'logical',
        enabletooltips: true,
        columns: [
            { text: 'CODIGO EMPRESA', datafield: 'CTLG_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            { text: 'EMPRESA', datafield: 'NCTLG_CODE', width: '100%', cellsalign: 'left', align: 'center' }
        ]
    });

    $('#jqxgridEmpresa').jqxGrid('refreshdata');

}

function verficaSintactiCaclave() {
    var error = false;
    var flag = true;
    if ($('#txtClave1').attr("value") != $('#txtClave2').attr("value")) {
        alertCustom("Las claves no coinciden!");
        error |= true;
    }

    for (var i = 1; i < 3; i++) {

        $('#txtClave' + i).focus();
        flag &= $('#txtClave' + i).hasClass("validado");
        if (!$('#txtClave' + i).hasClass("validado")) {
            $('#txtClave' + i).parent().parent().attr("class", "control-group error");
            $('#txtClave' + i).on("keyup", function () { $(this).parent().parent().removeClass("error"); });
        }

        $('#txtClave' + i).blur();
    }

    if (!flag) {//hay error

        alertCustom("La contraseña debe cumplir los requerimientos especificados!")
    }
    error |= !flag;
    return !error;
}

function initJqxGridEstablecimiento(v_JsonString) {

    $('#jqxgridEstablecimiento').jqxGrid('clear');
    $('#jqxgridEstablecimiento').jqxGrid('clearselection');

    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json'
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgridEstablecimiento').jqxGrid({
        source: dataAdapter,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        scrollmode: 'logical',
        enabletooltips: true,
        columns: [
            { text: 'CODIGO ESTABLECIMIENTO', datafield: 'SCSL_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            { text: 'ESTABLECIMIENTO', datafield: 'NSCSL_CODE', width: '100%', cellsalign: 'left', align: 'center' }
        ]
    });

    $('#jqxgridEstablecimiento').jqxGrid('refreshdata');

}

/*****/

function initJqxGridHorario(v_JsonString) {
    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json',
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
        deleterow: function (rowid, commit) {
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            commit(true);
        }
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $('#jqxgrid').jqxGrid({
        source: dataAdapter,
        pagerButtonsCount: 20,
        altrows: true,
        filterable: false,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        columns: [{ text: 'HORA INICIO', datafield: 'HORA_INICIO', columntype: 'textbox', width: '10%', cellsalign: 'center', align: 'center' },
                    { text: 'HORA FIN', datafield: 'HORA_FIN', columntype: 'textbox', width: '10%', cellsalign: 'center', align: 'center' },
                    { text: 'L', datafield: 'NLUNES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'M', datafield: 'NMARTES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'M', datafield: 'NMIERCOLES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'J', datafield: 'NJUEVES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'V', datafield: 'NVIERNES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'S', datafield: 'NSABADO_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'D', datafield: 'NDOMINGO_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'ZONA HORARIA', datafield: 'NZOHO_CODE', columntype: 'textbox', width: '38%', cellsalign: 'left', align: 'center' }
        ]
    });
}

function obtenerDetalleHorario() {
    var data = new FormData();
    data.append('OPCION', '3');
    data.append('CODE', $('#txtregistro').val());

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ASHX",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {
                initJqxGridHorario(JSON.stringify(datos));
                if (datos[0].HORA_EMPL_IND == "S") {

                    $('#uniform-Checkbox2 span').removeClass().addClass("checked");
                    $('#Checkbox2').attr('checked', true);
                } else {

                    $('#uniform-Checkbox2 span').removeClass();
                    $('#Checkbox2').attr('checked', false);
                }
                if (datos[0].INCLUIR_FERIADOS_IND == "S") {

                    $('#uniform-Checkbox1 span').removeClass().addClass("checked");
                    $('#Checkbox1').attr('checked', true);
                } else {

                    $('#uniform-Checkbox1 span').removeClass();
                    $('#Checkbox1').attr('checked', false);
                }
            }
            else {
                initJqxGridHorario("[]");
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function rptano() {

    $('#uniform-Checkbox2 span').removeClass();
    $('#Checkbox2').attr('checked', false);
    $("#modalconfirmacion").modal('hide');
}

function rptasi() {

    var p_USUARIO_ID = $('#txtregistro').val();
    var p_ESTADO_IND = "A";
    var p_CTLG_CODE = $.trim($('#cboEmpresa').val());

    $.ajaxSetup({ async: false });
    Bloquear("ventana");
    $.post("vistas/NS/ajax/NSMUSUA.ASHX", { OPCION: "HE", USUARIO_ID: p_USUARIO_ID, ESTADO_HE_IND: p_ESTADO_IND, CTLG_CODE: CTLG_CODE},
        function (res) {
            Desbloquear("ventana");
            if (res == "OK") {
                $('#uniform-Checkbox2 span').removeClass().addClass("checked");
                $('#Checkbox2').attr('checked', true);
                $("#modalconfirmacion").modal('hide');
                obtenerDetalleHorario();
                $('#jqxgrid').jqxGrid('refreshdata');
                exito();
            } else {
                noexito();
            }
        });
    $.ajaxSetup({ async: true });

}

function eventosCheck() {
    $('#Checkbox2').change(function () {//horario empleado
        var p_USUARIO_ID = $('#txtregistro').val();

        if ($(this).is(':checked')) {

            $("#mdlusuario").html($("#txtregistro").val());
            $("#mdlempleado").html($("#cboPersona option[value=" + $("#cboPersona").val() + "]").html());
            $("#modalconfirmacion").modal('show');
            $('#uniform-Checkbox2 span').removeClass();
            $('#Checkbox2').attr('checked', false);

        } else {

            $.ajaxSetup({ async: false });
            Bloquear("ventana");
            $.post("vistas/NS/ajax/NSMUSUA.ASHX", { OPCION: "HE", USUARIO_ID: p_USUARIO_ID, ESTADO_HE_IND: "I" },
                function (res) {
                    Desbloquear("ventana");
                    if (res == "OK") {

                        exito();
                    } else {
                        noexito();
                    }
                });
            $.ajaxSetup({ async: true });

        }

    });


    $('#Checkbox1').change(function () {//horario inc feriado
        var p_USUARIO_ID = $('#txtregistro').val();
        var p_ESTADO_IF_IND;
        if ($(this).is(':checked')) {

            p_ESTADO_IF_IND = "S";

        } else { p_ESTADO_IF_IND = "N"; }

        $.ajaxSetup({ async: false });
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", { OPCION: "IF", USUARIO_ID: p_USUARIO_ID, ESTADO_IF_IND: p_ESTADO_IF_IND },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {

                    exito();
                } else {
                    noexito();
                }
            });
        $.ajaxSetup({ async: true });

    });


}


function eliminarDetalleHorario() {
    var indx = $('#jqxgrid').jqxGrid('getselectedrowindex');
    var usid = $('#jqxgrid').jqxGrid('getcellvalue', indx, "USUA_ID");
    var code = $('#jqxgrid').jqxGrid('getcellvalue', indx, "CODE");

    Bloquear("divHorarioDetalle");
    $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
        OPCION: "EE",
        USUARIO_ID: usid,
        CODE: code
    })
    .done(function (res) {
        Desbloquear("divHorarioDetalle");
        if (res == "OK") {
            exito();
            limpiarControlesDetalle();
            obtenerDetalleHorario();
        } else {
            noexito();
        }
    });
}

function agregarDetalleHorario() {

    var Errors = true;

    var p_USUARIO_ID = $('#txtregistro').val();
    var p_HORARIO_EMPL = $('#Checkbox2').is(':checked') ? 'S' : 'N';
    var p_INCLUIR_FERIADOS = $('#Checkbox1').is(':checked') ? 'S' : 'N';
    var p_HORA_INICIO = $('#txtHoraInicio').val();
    var p_HORA_FIN = $('#txtHoraFin').val();
    var p_LUNES_IND = $('#chkLunes').is(':checked') ? 'S' : 'N';
    var p_MARTES_IND = $('#chkMartes').is(':checked') ? 'S' : 'N';
    var p_MIERCOLES_IND = $('#chkMiercoles').is(':checked') ? 'S' : 'N';
    var p_JUEVES_IND = $('#chkJueves').is(':checked') ? 'S' : 'N';
    var p_VIERNES_IND = $('#chkViernes').is(':checked') ? 'S' : 'N';
    var p_SABADO_IND = $('#chkSabado').is(':checked') ? 'S' : 'N';
    var p_DOMINGO_IND = $('#chkDomingo').is(':checked') ? 'S' : 'N';
    var p_ZOHO_CODE = $('#cboZonaHoraria').val();
    var p_ESTADO_IND = 'A';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var dias = {
        LUNES_IND: p_LUNES_IND,
        MARTES_IND: p_MARTES_IND,
        MIERCOLES_IND: p_MIERCOLES_IND,
        JUEVES_IND: p_JUEVES_IND,
        VIERNES_IND: p_VIERNES_IND,
        SABADO_IND: p_SABADO_IND,
        DOMINGO_IND: p_DOMINGO_IND
    };




    Errors = validarHorarioEmpleado() && validarIngresoTabla(dias);

    if (Errors) {
        //if (vErrors(["txtHoraInicio", "txtHoraFin", "cboZonaHoraria"])) {
        Bloquear("divHorarioDetalle");
        $.post("vistas/NS/ajax/NSMUSUA.ASHX", {
            OPCION: "GD",
            USUARIO_ID: p_USUARIO_ID,
            HORARIO_EMPLEADO: p_HORARIO_EMPL,
            INCLUIR_FERIADOS: p_INCLUIR_FERIADOS,
            HORA_INICIO: p_HORA_INICIO,
            HORA_FIN: p_HORA_FIN,
            LUNES_IND: p_LUNES_IND,
            MARTES_IND: p_MARTES_IND,
            MIERCOLES_IND: p_MIERCOLES_IND,
            JUEVES_IND: p_JUEVES_IND,
            VIERNES_IND: p_VIERNES_IND,
            SABADO_IND: p_SABADO_IND,
            DOMINGO_IND: p_DOMINGO_IND,
            ZOHO_CODE: p_ZOHO_CODE,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("divHorarioDetalle");
                if (res == "OK") {
                    exito();
                    limpiarControlesDetalle();
                    obtenerDetalleHorario();
                } else {
                    noexito();
                }
            })
            .fail(function () {
                Desbloquear("divHorarioDetalle");
                noexito();
            });
        //}
    }
}

function validarIngresoTabla(dias) {
    var rows = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";
    var flag = true;
    var p_HORA_INICIO = $('#txtHoraInicio').val();
    var p_HORA_FIN = $('#txtHoraFin').val();

    if (dias.LUNES_IND == "N" &&
        dias.MARTES_IND == "N" &&
        dias.MIERCOLES_IND == "N" &&
        dias.JUEVES_IND == "N" &&
        dias.VIERNES_IND == "N" &&
        dias.SABADO_IND == "N" &&
        dias.DOMINGO_IND == "N"
        ) {
        alertCustom("No se encontró ningún día marcado.");
        return false;
    }

    for (var i = 0; i < rows; i++) {

        var horaini = $('#jqxgrid').jqxGrid('getcellvalue', i, "HORA_INICIO");
        var horafin = $('#jqxgrid').jqxGrid('getcellvalue', i, "HORA_FIN");
        var nlunes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NLUNES_IND"));
        var nmartes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMARTES_IND"));
        var nmiercoles = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMIERCOLES_IND"));
        var njueves = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NJUEVES_IND"));
        var nviernes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NVIERNES_IND"));
        var nsabado = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NSABADO_IND"));
        var ndomingo = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NDOMINGO_IND"));


        if ((p_HORA_INICIO > horaini) && (p_HORA_INICIO < horafin) || (p_HORA_FIN > horaini) && (p_HORA_INICIO < horafin)) {

            if (dias.LUNES_IND == 'S' && nlunes) { stringfinal += "LUNES "; flag &= false; }
            if (dias.MARTES_IND == 'S' && nmartes) { stringfinal += "MARTES "; flag &= false; }
            if (dias.MIERCOLES_IND == 'S' && nmiercoles) { stringfinal += "MIERCOLES "; flag &= false; }
            if (dias.JUEVES_IND == 'S' && njueves) { stringfinal += "JUEVES "; flag &= false; }
            if (dias.VIERNES_IND == 'S' && nviernes) { stringfinal += "VIERNES "; flag &= false; }
            if (dias.SABADO_IND == 'S' && nsabado) { stringfinal += "SABADO "; flag &= false; }
            if (dias.DOMINGO_IND == 'S' && ndomingo) { stringfinal += "DOMINGO "; flag &= false; }

        }


    }

    if (!flag) {
        alertCustom("Horas no disponibles en día(s): " + stringfinal);
    }

    return flag;

}

function validarHorarioEmpleado() {
    var v_Errors = true;
    var v_message = "";

    var v_HoraInicoOrigen = $('#txtHoraInicio').val();
    var v_HoraFinOrigen = $('#txtHoraFin').val();

    v_message += "Campos incorrectos: <br><br>";

    if (!vErrorsNotMessage(["txtHoraInicio"])) {
        v_message += "* Hora Inicio." + "<br>";
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["txtHoraFin"])) {
        v_message += "* Hora Fin." + "<br>";
        v_Errors = false;
    }

    if (v_Errors) {

        if ($('#txtHoraInicio').val().indexOf('_') != -1) {
            $('#txtHoraInicio').val('');
            if (!vErrorsNotMessage(["txtHoraInicio"])) {
                v_message += "* Hora Inicio." + "<br>";
                v_Errors = false;
                $('#txtHoraInicio').val(v_HoraInicoOrigen);
            }
        }

        if ($('#txtHoraFin').val().indexOf('_') != -1) {
            $('#txtHoraFin').val('');
            if (!vErrorsNotMessage(["txtHoraFin"])) {
                v_message += "* Hora Inicio." + "<br>";
                v_Errors = false;
                $('#txtHoraFin').val(v_HoraFinOrigen);
            }
        }
        if (v_Errors) {

            var v_HoraInicio = parseInt($('#txtHoraInicio').val().split(':')[0] + $('#txtHoraInicio').val().split(':')[1]);
            var v_HoraFin = parseInt($('#txtHoraFin').val().split(':')[0] + $('#txtHoraFin').val().split(':')[1]);

            if (v_HoraInicio >= v_HoraFin) {
                $('#txtHoraInicio').val('');
                if (!vErrorsNotMessage(["txtHoraInicio"])) {
                    v_message += "* Hora Inicio debe ser menor a Hora Fin." + "<br>";
                    v_Errors = false;
                    $('#txtHoraInicio').val(v_HoraInicoOrigen);
                }
            }

        }
    }

    if (!vErrorsNotMessage(["cboZonaHoraria"])) {
        v_message += "* Zona Horaria." + "<br>";
        v_Errors = false;
    }

    if (!v_Errors) {
        alertCustom(v_message);
    }

    return v_Errors;
}

function limpiarControlesDetalle() {
    $('#txtHoraInicio').val('');
    $('#txtHoraFin').val('');

    $('#uniform-chkLunes span').removeClass();
    $('#chkLunes').attr('checked', false);

    $('#uniform-chkMartes span').removeClass();
    $('#chkMartes').attr('checked', false);

    $('#uniform-chkMiercoles span').removeClass();
    $('#chkMiercoles').attr('checked', false);

    $('#uniform-chkJueves span').removeClass();
    $('#chkJueves').attr('checked', false);

    $('#uniform-chkViernes span').removeClass();
    $('#chkViernes').attr('checked', false);

    $('#uniform-chkSabado span').removeClass();
    $('#chkSabado').attr('checked', false);

    $('#uniform-chkDomingo span').removeClass();
    $('#chkDomingo').attr('checked', false);

    $('#cboZonaHoraria').select2('val', '');
}

