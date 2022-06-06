var arrayRango = [];
var b_update = false;

var NMMPRDI = function () {    

    var plugins = function () {

        $("#txtLimite").inputmask({ "mask": "9", "repeat": 4, "greedy": false });

        $("#cbo_rango").select2();
        $("#cboEmpresa").select2(); 
    }
    
    var cargacombos = function () { 
        cargarRangos();
        cargarEmpresas();   
        
    }

    var eventosControles = function () {

        $("#cboEmpresa").on('change', function () {
            var empresa = $("#cboEmpresa").val();
            verificarConfiguracion(empresa);
        });

        $("#info_btnf").on("click", function () {
            $("#bloqueInfo").slideToggle();
        });

        $('#cbo_rango').on('change', function () {

            $("#txtLimite").val("");

            if ($(this).val() !== "") {
                var current_index = parseInt($('#cbo_rango :selected').attr("index"));
                var last_index = arrayRango.length - 1;
                var valor = '-';

                if (current_index !== last_index) {
                    valor = arrayRango[(current_index + 1)].RANGO_INICIO;
                }

                $("#txtLimite").val(valor);   
            }

        });

        $("#grabar").click(grabar);
        $("#actualizar").click(actualizar);
        $("#cancelar").click(cancelar);

    }

    return {
        init: function () {
            plugins();
            cargacombos();
            eventosControles();
        }
    };
}();

function cargarEmpresas() {
    var select = $('#cboEmpresa').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).empty();
            $(select).append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].CODIGO + '" data-pidm="' + datos[i].PIDM + '" ruc="' + datos[i].RUC + '">' + datos[i].DESCRIPCION + '</option>');

                }
            }
            var empresa = $('#ctl00_hddctlg').val();
            $(select).val(empresa);
            $(select).change(verificarConfiguracion(empresa));
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $(select).select2();
}

function cargarRangos() {
    var select = $('#cbo_rango').select2('destroy');
    var empresa = $("#cboEmpresa").val();
    $("#txtLimite").val("");
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmrang.ashx?OPCION=1",
        async: false,
        success: function (datos) {
            $('#cbo_rango').empty();
            $('#cbo_rango').append('<option></option>');
            if (datos != null) {
                arrayRango = datos;
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_rango').append('<option value="' + datos[i].CODIGO + '" index="' + i + '" >' + datos[i].NOMBRE.toUpperCase() + '</option>');
                }
                
            }
            else {
                noexito();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $(select).select2();
}

function verificarConfiguracion(empresa) {

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmprdi.ashx?flag=1&codigo_empresa=" + empresa,
        async: false,
        success: function (datos) {
           
            if (datos !== null) {
                b_update = true;
                $("#cbo_rango").val(datos[0].CODIGO_RANGO).trigger('change');
                var limite = (datos[0].LIMITE == "") ? "-" : datos[0].LIMITE;
                $("#txtLimite").val(limite);
                $("#txtDescuento").val(parseFloat(datos[0].DESCUENTO) * 100);
                if ($("#txtCodigo").length == 0) {
                    crearInputCodigo(datos[0].CODIGO);
                } else {
                    $("#txtCodigo").remove();
                    crearInputCodigo(datos[0].CODIGO);
                }                     
                $("#grabar").hide();
                $("#actualizar").show();
            } else {
                b_update = false;
                cargarRangos(); 
                $("#txtLimite").val("");
                $("#txtDescuento").val(0);
                $("#txtCodigo").remove();
                $("#actualizar").hide();
                $("#grabar").show();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function grabar() {   

    if (!b_update) {
        if (!vErrors(['cbo_rango', 'txtLimite'])) {
            return;
        }

        var data = new FormData();

        var descuento = (parseFloat($("#txtDescuento").val()) / 100);
        var limite = parseFloat($("#txtLimite").val());

        if (isNaN(limite)) {
            limite = null;
        }

        if (descuento < 0 || descuento > 1) {
            infoCustom2("El descuento como máximo puede ser 100%");
            $("#txtDescuento").focus();
            return;
        } else {
            data.append('flag', 2);
            data.append('codigo_empresa', $('#cboEmpresa').val());
            data.append('codigo_rango', $("#cbo_rango").val());
            data.append('limite', limite);
            data.append('descuento', descuento);
            data.append('user', $('#ctl00_lblusuario').text());

            Bloquear("content_precio_distribuidor");

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmprdi.ashx",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).
                success(function (res) {    
                    if (res[0].RESPUESTA.length == 4 && res[0].RESPUESTA !== "EXICON") {
                        b_update = true;
                        exito();     
                        crearInputCodigo(res[0].RESPUESTA);
                        $("#grabar").hide();
                        $("#actualizar").show();
                        Desbloquear("content_precio_distribuidor");
                    } else {
                        b_update = false;
                        noexito();
                        $("#actualizar").hide();
                        $("#grabar").show();
                        Desbloquear("content_precio_distribuidor");
                    }

                }).
                error(function () {
                    b_update = false;
                    noexito();                    
                    $("#actualizar").hide();
                    $("#grabar").show();
                    Desbloquear("content_precio_distribuidor");
                });
        }

        
    }    

}

function actualizar() {

    if (b_update && $("#txtCodigo").length > 0) {

        if (!vErrors(['cbo_rango', 'txtLimite'])) {
            return;
        }

        var data = new FormData();

        var descuento = (parseFloat($("#txtDescuento").val()) / 100);
        var limite = parseFloat($("#txtLimite").val());

        if (isNaN(limite)) {
            limite = null;
        }

        if (descuento < 0 || descuento > 1) {
            infoCustom2("El descuento como máximo puede ser 100%");
            $("#txtDescuento").focus();
            return;
        } else {
            data.append('flag', 3);
            data.append('codigo', $("#txtCodigo").val());
            data.append('codigo_empresa', $('#cboEmpresa').val());
            data.append('codigo_rango', $("#cbo_rango").val());
            data.append('limite', limite);
            data.append('descuento', descuento);
            data.append('user', $('#ctl00_lblusuario').text());

            Bloquear("content_precio_distribuidor");

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmprdi.ashx",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).
                success(function (res) {
                    if (res[0].RESPUESTA.length == 4 && res[0].RESPUESTA !== "EXICON") {
                        b_update = true;
                        exito();
                        if ($("#txtCodigo").length == 0) {
                            crearInputCodigo(res[0].RESPUESTA);
                        } else {
                            $("#txtCodigo").val(res[0].RESPUESTA);
                        } 
                        $("#grabar").hide();
                        $("#actualizar").show();
                        Desbloquear("content_precio_distribuidor");
                    } else {
                        b_update = false;
                        noexito();
                        $("#actualizar").hide();
                        $("#grabar").show();
                        Desbloquear("content_precio_distribuidor");
                    }

                }).
                error(function () {
                    b_update = false;
                    noexito();
                    $("#actualizar").hide();
                    $("#grabar").show();
                    Desbloquear("content_precio_distribuidor");
                });
        }

    }

}

function cancelar() {
    window.location.href = '?f=NMMPRDI';
}

function crearInputCodigo(codigo) {
    var codigo_html = $('<input>', {
        'type': 'hidden',
        'value': codigo,
        'id': 'txtCodigo'
    });
    $("#content_precio_distribuidor").append(codigo_html);
}