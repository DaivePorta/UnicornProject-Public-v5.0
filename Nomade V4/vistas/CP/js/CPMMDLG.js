var CPLMDLG = function () {

    var cargaInicial = function () {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMDLG.ASHX?OPCION=4",
            contentType: false,        
            processData: false,
            async: true,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $("#divTabla").html(datos);
                    oTable = $("#tblTabla").dataTable({
                        "order": ["0", "desc"],
                        "sPaginationType": "full_numbers",
                        "scrollX": true,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    });
                    oTable.fnSetColumnVis(0, false, true)
                    oTable.fnSetColumnVis(4, false, true)
                    $('#tblTabla tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            oTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');

                            var pos = oTable.fnGetPosition(this);
                            var row = oTable.fnGetData(pos);
                            var code = row[0];
                            window.location.href = '?f=CPMMDLG&codigo=' + code;
                        }
                    });
                }
            },
            error: function () {
                Desbloquear("ventana");
                noexito();
            }
        });
    }

    return {
        init: function () {     
            cargaInicial();
        }
    };

}();

var CPMMDLG = function () {

    var plugins = function () {

    }

    var eventoControles = function () {

    }

    var cargaInicial = function (codigo) {
        $("#hfCode").val(codigo);
        var data = new FormData();
        data.append("p_CODE", codigo);        
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMDLG.ASHX?OPCION=3",          
            contentType: false,
            data: data,
            processData: false,
            async: true,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null ) {
                    $("#txtDesc").val(datos[0].DESC)
                    $("#txtDescCorta").val(datos[0].DESC_CORTA)
                    if (datos[0].ESTADO_IND == "A") {
                        $("#chkEstado").attr("checked", true).parent().addClass("checked");
                    } else {
                        $("#chkEstado").attr("checked", false).parent().removeClass("checked");
                    }

                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                }
            },
            error: function () {
                Desbloquear("ventana");
                noexito();
            }
        });

    }
       
    return {
        init: function () {
            plugins();

            var codigo = ObtenerQueryString("codigo");
            if (typeof (codigo) !== "undefined") {
                cargaInicial(codigo)
            }
            eventoControles();

        }
    };

}();

function Grabar() {
    if (vErrors(['txtDesc', 'txtDescCorta'])) {
        var data = new FormData();
        data.append("p_DESC", $("#txtDesc").val().trim());
        data.append("p_DESC_CORTA", $("#txtDescCorta").val().trim());
        data.append("p_ESTADO_IND", ($("#chkEstado").is(":checked") ? "A" : "I"));
        data.append("p_USUA_ID", $("#ctl00_lblusuario").html());
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMDLG.ASHX?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            async: true,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && typeof(datos[0].RESPUESTA) != "undefined") {
                    if (datos[0].RESPUESTA == "OK") {
                        exito();
                        $("#hfCode").val(datos[0].CODIGO);
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Actualizar();");
                    } else {
                        alertCustom(datos[0].RESPUESTA);
                    }
                } else {
                    noexito();
                }
            },
            error: function () {
                Desbloquear("ventana");
                noexito();
            }
        });
    }
}

function Actualizar() {
    if (vErrors(['txtDesc', 'txtDescCorta'])) {
        var data = new FormData();
        data.append("p_CODE", $("#hfCode").val());
        data.append("p_DESC", $("#txtDesc").val().trim());
        data.append("p_DESC_CORTA", $("#txtDescCorta").val().trim());
        data.append("p_ESTADO_IND", ($("#chkEstado").is(":checked") ? "A" : "I"));
        data.append("p_USUA_ID", $("#ctl00_lblusuario").html());
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMDLG.ASHX?OPCION=2",
            contentType: "application/json;",
            contentType: false,
            data: data,
            processData: false,
            async: true,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && typeof (datos[0].RESPUESTA) != "undefined") {
                    if (datos[0].RESPUESTA == "OK") {
                        $("#hfCode").val(datos[0].CODIGO);
                        exito();
                    } else {
                        alertCustom(datos[0].RESPUESTA);
                    }
                } else {
                    noexito();
                }
            },
            error: function () {
                Desbloquear("ventana");
                noexito();
            }
        });
    }
}

function Nuevo() {
    $("#txtDesc").val("");
    $("#txtDescCorta").val("");
    $("hfCode").val("");
    $("#grabar").html("<i class='icon-save'></i> Grabar");
    $("#grabar").attr("href", "javascript:Grabar();");
    $("#chkEstado").attr("checked", true).parent().addClass("checked");
}