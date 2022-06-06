var code;

var EFLEXML = function () {

    function crearCaptcha() { //DPORTA
        //Borrar primero los contenidos de div "captcha"
        document.getElementById('captcha').innerHTML = "";
        var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            //"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%+&*";
        var lengthOtp = 4;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            //No permitirá la repetición de caracteres.
            var index = Math.floor(Math.random() * charsArray.length + 1); //obtener el siguiente caracter de la matriz
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }
        var canv = document.createElement("canvas");
        canv.id = "captcha";
        canv.width = 120;
        canv.height = 40;
        var ctx = canv.getContext("2d");
        ctx.font = "25px Georgia";
        ctx.strokeText(captcha.join(""), 32, 30);
        //ctx.textAlign = 'left';
        //almacena el captcha para que pueda validarlo
        code = captcha.join("");
        document.getElementById("captcha").appendChild(canv); // agrega el canvas al cuerpo
    }

    var plugins = function () {

        $('#cboDocumento').select2();
        $('#txt_serie').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 4, "greedy": false }); });
        $('#txt_dcto_ref').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 7, "greedy": false }); });
        $('#txt_RucEmpresa').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 11, "greedy": false }); });

    }

    var eventoComtroles = function () {

        $('#btnVerificarCaptcha').on('click', function () {
            validaCaptcha();
        });

        $('#btnRefrescar').on('click', function () {
            crearCaptcha();
            $("#cpatchaTextBox").val('');
        })

    }

    function validaCaptcha() {

        var cadena = $('#cpatchaTextBox').val();
        var ruc = $('#txt_RucEmpresa').val();
        var serie = $('#txt_serie').val();
        var numdoc = $('#txt_dcto_ref').val();

        if (ruc != "" & serie != "" & numdoc != "") {

            if (numdoc.length == 1) {
                numdoc = ("000000" + numdoc).slice(-7);
            } else if (numdoc.length == 2) {
                numdoc = ("00000" + numdoc).slice(-7);
            } else if (numdoc.length == 3) {
                numdoc = ("0000" + numdoc).slice(-7);
            } else if (numdoc.length == 4) {
                numdoc = ("000" + numdoc).slice(-7);
            } else if (numdoc.length == 5) {
                numdoc = ("00" + numdoc).slice(-7);
            } else if (numdoc.length == 6) {
                numdoc = ("0" + numdoc).slice(-7);
            } else {
                numdoc
            }

            if (cadena == code) {
                exitoCustom("Los campos se han validado correctante.");
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val(ruc);
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCodDoc").val($('#cboDocumento').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddSerie").val(serie);
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddNumDoc").val(numdoc);

                $('.btnLibroPDF').attr('disabled', false);
                $('.btnLibroTXT').attr('disabled', false);

            } else {
                infoCustom2("El código ingresado no coincide con el de la imagen.");
                crearCaptcha();
                $('#cpatchaTextBox').val("");
            }
        } else {
            infoCustom2("Verifique que algún campo no se encuentre vacío.");
            crearCaptcha();
            $('#cpatchaTextBox').val("");
        }

    }

    var cargaInicial = function () {
        $('.btnLibroPDF').attr('disabled', true);
        $('.btnLibroTXT').attr('disabled', true);
    }

    return {
        init: function () {
            plugins();
            eventoComtroles();
            cargaInicial();
            crearCaptcha();
        }
    };

}();

var Nuevo = function () {
    window.location.href = '?f=EFLEXML'
}