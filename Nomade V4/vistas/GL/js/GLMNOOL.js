var GLMNOOL = function () {
    var plugins = function () {
        $('#txtMnemonico').inputmask({ mask: 'A', repeat: 3, greedy: false });
        $('#txtInicio').inputmask({ mask: '9', repeat: 3, greedy: false });
    };

    var eventos = function () {
        $('#txtContenido').keyup(function () {
            var repeat = $(this).val();
            if (repeat !== '') {
                $('#txtInicio').inputmask({ mask: '9', repeat: (parseInt(repeat)), greedy: false });
            }

            //Setear valor de inicio
            //$.ajax({
            //    type: 'post',
            //    url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=VERIFICAR_REGISTROS',
            //    async: false,
            //    data: { NOMENCLATURA: '^'.concat($('#txtMnemonico').val().toUpperCase().concat('[0-9]{'.concat($('#txtContenido').val()).concat('}$'))) }
            //}).done(function (data) {
            //    if (data !== null && data !== '') {
            //        data = data.substring($('#txtMnemonico').val().length, data.length);
            //        $('#txtInicio').prop('disabled', true).val(parseInt(data));
            //    } else {
            //        $('#txtInicio').prop('disabled', false);
            //    }
            //}).fail(function () { });

        });

        $('#txtInicio').mouseover(function () {
            $(this).parent().find('.popover-content').html('Valor numérico inicial de todos los códigos.<br><br>Ejemplo:<br> Si MNEMONICO = AB<br>DIGITOS NUMERICOS = 5<br>VALOR DE INICIO = 100<br>Primer código generado = AB00100</div>');
        });

        $('#btnGrabar').click(function () {
            let fechaHoy = new Date();
            let anio = fechaHoy.getFullYear().toString();  
            if (vErrors(['txtMnemonico', 'txtContenido', 'txtInicio'])) {
                Bloquear('ventana');
                $.ajax({
                    type: 'post',
                    url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=GLETRA',
                    async: false,
                    data: {
                        NEMONICO : $('#txtMnemonico').val().toUpperCase(),
                        NOMENCLATURA: ''.lpad('0', parseInt($('#txtContenido').val())),
                        INICIO: anio.substring(2, 4) + $('#txtInicio').val().lpad('0', parseInt($('#txtContenido').val())),
                        USUA_ID: $('#ctl00_txtus').val()
                    }
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
            let fechaHoy = new Date();
            let anio = fechaHoy.getFullYear().toString();      
            $('#lblPad').text($('#txtMnemonico').val() + anio.substring(2, 4) + $('#txtInicio').val().lpad('0', parseInt($('#txtContenido').val())));
        });
    };

    var cargarDatos = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMNOOL.ashx?OPCION=LCODLETRAS',
            async: false
        }).done(function (data) {
            if (data.length > 0) {
                let nroDigitos = data[0].NOMENCLATURA.toString().length
                $('#txtMnemonico').val(data[0].NEMONICO).keyup();
                $('#txtContenido').val(nroDigitos);
                $('#txtInicio').val(data[0].INICIO.toString().substring(3, nroDigitos + 2));
                $('#lblPad').text($('#txtMnemonico').val() + data[0].INICIO.toString().lpad('0', parseInt($('#txtContenido').val())));
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
    if (key >= 51 && key <= 57) { return true; }
    return false;
}

String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}