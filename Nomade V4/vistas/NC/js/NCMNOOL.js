var NCMNOOL = function () {
    var plugins = function () {
        $('#txtMnemonico').inputmask({ mask: 'A', repeat: 2, greedy: false });
        $('#txtInicio').inputmask({ mask: '9', repeat: 3, greedy: false });
    };

    var eventos = function () {
        $('#txtContenido').keyup(function () {
            var repeat = $(this).val();
            if (repeat !== '') {
                $('#txtInicio').inputmask({ mask: '9', repeat: (parseInt(repeat) - 1), greedy: false });
            }

            //Setear valor de inicio
            $.ajax({
                type: 'post',
                url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=VERIFICAR_REGISTROS',
                async: false,
                data: { NOMENCLATURA: '^'.concat($('#txtMnemonico').val().toUpperCase().concat('[0-9]{'.concat($('#txtContenido').val()).concat('}$'))) }
            }).done(function (data) {
                if (data !== null && data !== '') {
                    data = data.substring($('#txtMnemonico').val().length, data.length);
                    $('#txtInicio').prop('disabled', true).val(parseInt(data));
                } else {
                    $('#txtInicio').prop('disabled', false);
                }
            }).fail(function () { });
        });

        $('#txtInicio').mouseover(function () {
            $(this).parent().find('.popover-content').html('Valor numérico inicial de todos los códigos.<br><br>Ejemplo:<br> Si MNEMONICO = AB<br>DIGITOS NUMERICOS = 5<br>VALOR DE INICIO = 100<br>Primer código generado = AB00100</div>');
        });

        $('#btnGrabar').click(function () {
            if (vErrors(['txtMnemonico', 'txtContenido', 'txtInicio'])) {
                Bloquear('ventana');
                $.ajax({
                    type: 'post',
                    url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=G',
                    async: false,
                    data: { NOMENCLATURA: $('#txtMnemonico').val().toUpperCase().concat(''.lpad('0', parseInt($('#txtContenido').val()))), INICIO: $('#txtInicio').val(), USUA_ID: $('#ctl00_txtus').val() }
                }).done(function (data) {
                    if (data === 'OK') {
                        exito();
                        $('#btnGrabar').html('<i class="icon-pencil"></i>&nbsp;Actualizar');
                    }
                    else { noexito(); }
                    Desbloquear('ventana');
                }).fail(function () {
                    noexito();
                    Desbloquear('ventana');
                });
            } else {
                setTimeout(function () { $(".control-group").removeClass("error"); }, 2000);
            }
        });

        $('#txtMnemonico, #txtContenido, #txtInicio').keyup(function () {
            $('#lblPad').text($('#txtMnemonico').val() + $('#txtInicio').val().lpad('0', parseInt($('#txtContenido').val())));
        });
    };

    var cargarDatos = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=S',
            async: false
        }).done(function (data) {
            if (data.length > 0) {
                $('#txtMnemonico').val(data[0].NOMENCLATURA.substring(0, (data[0].NOMENCLATURA.indexOf('0'))));
                $('#txtContenido').val(data[0].NOMENCLATURA.substring(data[0].NOMENCLATURA.indexOf('0')).length).keyup();
                $('#txtInicio').val(data[0].INICIO);
                $('#lblPad').text($('#txtMnemonico').val() + $('#txtInicio').val().lpad('0', parseInt($('#txtContenido').val())));
                $('#btnGrabar').html('<i class="icon-pencil"></i>&nbsp;Actualizar');
            }
        }).fail(function () {
            alertCustom('Error al cargar los datos de la nomenclatura actual.');
        });
    };

    return {
        init: function () {
            plugins();
            eventos();
            cargarDatos();
        }
    };
}();

var validaNumeros = function (event, input) {
    var key = event.keyCode;
    if ($(input).val().length > 0) { return false; }
    if (key >= 52 && key <= 57) { return true; }
    return false;
}

String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}