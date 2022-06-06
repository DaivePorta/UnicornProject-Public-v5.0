var oTableCRegional;

var NCLCONF = function () {

    var fillBandejaCRegional = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCRegional').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "descripcion" },
                { data: "desc_pais" },
                { data: "desc_idioma" },
                { data: "desc_moneda" },
                { data: "desc_zona_h" },
                {
                    data: "separacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "ubicacion" },
                {
                    data: "estado",
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

        oTableCRegional = iniciaTabla('tblCRegional', parms);
        $('#tblCRegional').removeAttr('style');

        $('#tblCRegional tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCRegional.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCRegional.fnGetPosition(this);
                var row = oTableCRegional.fnGetData(pos);
                var codigo = row.codigo;

                window.location.href = '?f=ncmconf&codigo=' + codigo;
            }

        });

        $('#tblCRegional tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableCRegional.api(true).row($(this).parent().parent()).index();
            var row = oTableCRegional.fnGetData(pos);
            var cod = row.codigo;

            confirmacionModal('divModalConfirmacion', '¿Desea cambiar el estado del código ' + cod + '?', pos, cod);
           
        });
    }

    return {
        init: function () {
            fillBandejaCRegional();
        }
    };

}();

function siConfirmacion(v_Pos, v_Values) {
    Bloquear("ventana");
    $.ajaxSetup({ async: false });
    $.post("vistas/NC/ajax/NCMCONF.ASHX",
        { opcion: 'A', CODE: v_Values })
    .done(function (res) {
        Desbloquear("ventana");
        if (res != null) {

            if (res == "I") res = "INACTIVO";
            else res = "ACTIVO";

            oTableCRegional.fnGetData(v_Pos).estado = res;
            refrescaTabla(oTableCRegional);
            exito();
        }
    })
    .fail(function () {
        Desbloquear("ventana");
        noexito();
    });
    $.ajaxSetup({ async: true });
}
function noConfirmacion() {
    $('#divModal').modal('hide');
}

var NCMCONF = function () {

    var plugins = function () {
        aMayuscula(":input");

        $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 60, "greedy": false }); })

        $('#cboPais').select2();
        $('#cboMoneda').select2();
        $('#cboIdioma').select2();
        $('#cboConfig').select2();
        $('#cboZonaHoraria').select2();
        $('#cboSimb').select2();
        $('#cboDec').select2();
        //$('#s2id_cboDec').css("font-size", "25px").attr("align", "center");
        //$('#s2id_cboDec a span').css("line-height", "30px")
        //$('#cboDec').css("font-size", "25px").attr("align", "center");
        //$('#select2-results-6').css("font-size", "30px")
    }

    var fillCboZonaHorario = function () {

        var selectCboConfigm = $("#cboZonaHoraria");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCONF.ASHX?opcion=configm",
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectCboConfigm.empty();
                selectCboConfigm.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectCboConfigm.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboPais = function () {

        var selectCboPais = $("#cboPais");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCONF.ASHX?opcion=pais",
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectCboPais.empty();
                selectCboPais.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectCboPais.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboMoneda = function () {

        var selectCboMoneda = $("#cboMoneda");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCONF.ASHX?opcion=moneda",
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectCboMoneda.empty();
                selectCboMoneda.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectCboMoneda.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboIdioma = function () {

        var selectCboIdioma = $("#cboIdioma");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCONF.ASHX?opcion=idioma",
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectCboIdioma.empty();
                selectCboIdioma.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectCboIdioma.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
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
                url: "vistas/nc/ajax/ncmconf.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {

                    $("#txtCodConfig").val(datos[0].CODE);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    $("#cboPais").select2('val', datos[0].COD_PAIS);
                    $("#cboIdioma").select2('val', datos[0].COD_IDIOMA);
                    $("#cboMoneda").select2('val', datos[0].COD_MONEDA);
                    $("#cboZonaHoraria").select2('val', datos[0].COD_ZONA);
                    $("#cboDec").select2('val', datos[0].COD_SEPA);
                    $("#cboSimb").select2('val', datos[0].COD_UBICACION);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
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

            fillCboZonaHorario();
            fillCboIdioma();
            fillCboMoneda();
            fillCboPais();
            plugins();
            cargaInicial();
        }
    };

}();

function ObtenerQueryString(param) {
    var urlpagina = window.location.search.substring(1);
    var variables = urlpagina.split('&');
    for (var i = 0; i < variables.length; i++) {
        var nombrparam = variables[i].split('=');
        if (nombrparam[0] == param) {
            return nombrparam[1]; //valor

        }
    }
}

function GrabarConfig() {

    if (vErrors(["txtDescripcion", "cboIdioma", "cboPais", "cboZonaHoraria", "cboMoneda", "cboSimb", "cboDec"])) {
        var configuracion = $("#txtDescripcion").val();
        var idioma = $("#cboIdioma").val();
        var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
        var pais = $("#cboPais").val();
        var moneda = $("#cboMoneda").val();
        var zonaHoraria = $("#cboZonaHoraria").val();
        var UbiSimbolo = $("#cboSimb").val();
        var sep_decimal = $("#cboDec").val();
        var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

        Bloquear("ventana");

        $.post("vistas/NC/ajax/NCMCONF.ASHX", {
            opcion: 'N',
            configuracion: configuracion,
            idioma: idioma,
            estado: estado,
            pais: pais,
            moneda: moneda,
            zonaHoraria: zonaHoraria,
            UbiSimbolo: UbiSimbolo,
            sep_decimal: sep_decimal,
            usuario: usuario
        })
            .done(function (res) {
                Desbloquear("ventana");
                $("#txtCodConfig").val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }



}

function Modificar() {
    if (vErrors(["txtDescripcion", "cboIdioma", "cboPais", "cboZonaHoraria", "cboMoneda", "cboSimb", "cboDec"])) {

        var codigo = $("#txtCodConfig").val();
        var configuracion = $("#txtDescripcion").val();
        var idioma = $("#cboIdioma").val();
        var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
        var pais = $("#cboPais").val();
        var moneda = $("#cboMoneda").val();
        var zonaHoraria = $("#cboZonaHoraria").val();
        var UbiSimbolo = $("#cboSimb").val();
        var sep_decimal = $("#cboDec").val();
        var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

        Bloquear("ventana");

        $.post("vistas/NC/ajax/NCMCONF.ASHX",
            {
                opcion: 'M',
                codigo: codigo,
                configuracion: configuracion,
                idioma: idioma,
                estado: estado,
                pais: pais,
                moneda: moneda,
                zonaHoraria: zonaHoraria,
                UbiSimbolo: UbiSimbolo,
                sep_decimal: sep_decimal,
                usuario: usuario
            })
                .done(function (res) {
                    Desbloquear("ventana");
                    if (res == "OK") {
                        exito();
                    }
                    else if (res == "EXIS") {
                        alertCustom("La Descripción " + configuracion + "  está siendo utilizado.");
                    }
                    else {
                        noexito();
                    }
                })
                .fail(function () {
                    Desbloquear("ventana");
                    noexito();
                });
    }
}