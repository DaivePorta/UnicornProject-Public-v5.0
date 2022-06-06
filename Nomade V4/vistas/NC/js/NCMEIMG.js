var NCMEIMG = function () {

    var imagenVacia = "data:image/gif;base64,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";

    var plugins = function () {
        $('#cboEmpresa').select2();
    }

    var fillCboEmpresa = function (tipo) {
        var select = $('#cboEmpresa').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/NCMEIMG.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" imgSup="' + datos[i].IMG_SUPERIOR + '"  imgInf="' + datos[i].IMG_INFERIOR + '" >' + datos[i].DESCRIPCION + '</option>');

                    }
                }
                if (tipo == undefined) {
                    $(select).val($('#ctl00_hddctlg').val());
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    };

    var eventoControles = function () {
        $("#cboEmpresa").on("change", function () {

            if ($("#cboEmpresa :selected").attr("imgSup") != "") {
                $("#imgSuperior").attr("src", $("#cboEmpresa :selected").attr("imgSup"));
            } else {
                $("#imgSuperior").attr("src", "../../../recursos/img/imagenes/Encabezados/SIN_IMAGEN.png");
            }
            if ($("#cboEmpresa :selected").attr("imgInf") != "") {
                $("#imgInferior").attr("src", $("#cboEmpresa :selected").attr("imgInf"));
            } else {
                $("#imgInferior").attr("src", "../../../recursos/img/imagenes/Encabezados/SIN_IMAGEN.png");
            }

        });
    }

    var cargaInicial = function () {
        inputFile("inferior", "imgInferior", "../../../recursos/img/imagenes/Encabezados/SIN_IMAGEN.png");
        inputFile("superior", "imgSuperior", "../../../recursos/img/imagenes/Encabezados/SIN_IMAGEN.png");
        $("#cboEmpresa").change();
    }
    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            cargaInicial();
        }
    };
}();

var fillCboEmpresa = function (tipo) {
    var select = $('#cboEmpresa').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/NCMEIMG.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).empty();
            $(select).append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].CODIGO + '" imgSup="' + datos[i].IMG_SUPERIOR + '"  imgInf="' + datos[i].IMG_INFERIOR + '" >' + datos[i].DESCRIPCION + '</option>');
                }
            }
            if (tipo == undefined) {
                $(select).val($('#ctl00_hddctlg').val());
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $(select).select2();
};

function Grabar() {

    var data = new FormData();
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('RUTA_SUPERIOR', $("#imgSuperior").attr("src"));
    data.append('RUTA_INFERIOR', $("#imgInferior").attr("src"));
    data.append('IMG_SUPERIOR', $("#superior")[0].files[0]);
    data.append('IMG_INFERIOR', $("#inferior")[0].files[0]);
    Bloquear("ventana");
    $.ajax({
        url: "vistas/NC/ajax/NCMEIMG.ashx?OPCION=1",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,
        success: function (res) {
            var datos = $.parseJSON(res);
            if (datos[0].SUCCESS == "OK") {
                var empresaAnterior = $("#cboEmpresa").val();
                fillCboEmpresa("NoPorDefecto");
                $("#cboEmpresa").select2("val", empresaAnterior);
                exito();
            }
            else {
                noexito();
            }
            Desbloquear("ventana");
        },
        error: function () {
            Desbloquear("ventana");
            noexito();
        }
    });

}