var NCMAFIG = function () {

    var plugins = function () {
        $('#cbo_tipo_bien').select2();
        $('#txtcosu').inputmask({ "mask": 9, "repeat": 2, "greedy": false });
    };

    var cargainicial = function () {
        var cod = ObtenerQueryString("codigo");

        if (cod !== undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMAFIG.ASHX?flag=3&cod=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#txtcosu").val(datos[0].CODIGO_SUNAT);
                    $("#txtdescripcion").val(datos[0].DESCRIPCION);

                    $("#cbo_tipo_bien").select2("val", datos[0].TIPO_BIEN_COD);
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
        }
    };

}();

function Crear() {

    var p_cosu = $('#txtcosu').val();
    var p_descripcion = $("#txtdescripcion").val();
    var p_tipo_bien = $('#cbo_tipo_bien').val();

    if (vErrors(["txtcosu", "txtdescripcion", "cbo_tipo_bien"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMAFIG.ASHX",
            {
                flag: 1,
                cosu: p_cosu,
                des: p_descripcion,
                tipo: p_tipo_bien

            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res.indexOf("[Error]") >= 0) {
                    alertCustom(res);
                    return;
                }

                if (res != "" && res != null && res !='0') {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
        
    }
}

function Actualizar() {
    var p_codigo = $('#txtcodigo').val();
    var p_cosu = $('#txtcosu').val();
    var p_descripcion = $("#txtdescripcion").val();
    var p_tipo_bien = $('#cbo_tipo_bien').val();

    if (vErrors(["txtcosu", "txtdescripcion", "cbo_tipo_bien"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMAFIG.ASHX",
            {
                flag: 2,
                cod : p_codigo,
                cosu: p_cosu,
                des: p_descripcion,
                tipo: p_tipo_bien
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res.indexOf("[Error]") >= 0) {
                    alertCustom(res);
                    return;
                }
                if (res != "" && res != null) {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

