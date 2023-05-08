
function GrabarTC() {

    var mensaje = ' ';

    var valorventabase = $("#txtVentaOficial").val();
    var valorcomprabase = $("#txtCompraOficial").val();


    var valorventalt = $("#txtVentaAlterna").val();
    var valorcompralt = $("#txtCompraAlterna").val();

    var fecha = $("#txtFechaVigencia").val();

    var codbase = $("#txtCodMonOficial").val();
    var codalt = $("#txtCodMonAlterna").val();


    if (valorventabase == '0.00') {
        alertCustom('Debe ingresar  el tipo de cambio de la venta oficial.');
        return false;
    }

    if (valorcomprabase == '0.00') {
        alertCustom('Debe ingresar el tipo de cambio de la compra oficial.');
        return false;
    }

    if (valorventalt == '0.00') {
        alertCustom('Debe ingresar el tipo de cambio de la venta alterna.');
        return false;
    }

    if (valorcompralt == '0.00') {
        alertCustom('Debe ingresar el tipo de cambio de la compra alterna.');
        return false;
    }

    // se empieza la grabacion
    var usuario = $('#ctl00_txtus').val();
    
    Bloquear("modal");
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=3&valorcomprabase=" + valorcomprabase + "&valorventabase=" + valorventabase +
        "&valorcompralt=" + valorcompralt + "&valorventalt=" + valorventalt + "&fecha=" + fecha + "&usuario=" + usuario +
        "&codbase=" + codbase + "&codalt=" + codalt,
        //contentType: "application/json;",
        //dataType: "json",
        success: function (datos) {

            if (datos == "OK") {
                Desbloquear("modal");
                exito();
                $("#grabar").hide();
            }

            else {
                Desbloquear("modal");
                noexito();
            }
        },

        error: function (msg) {
            Desbloquear("modal");
            alert(msg);
        }
    });
}

function Modificar() {

    var mensaje = ' ';
    
    var valorventalt = $("#txtVentaAlterna").val();
    var valorcompralt = $("#txtCompraAlterna").val();

    var fecha = $("#txtFechaVigencia").val();
    var hms = $("#hfhms").val();

    var tipo_cambio = ObtenerQueryString("TIPO_CAMBIO");

    if (valorventalt == '0.00') {
        alertCustom('Debe ingresar el tipo de cambio de la venta alterna.');
        return false;
    }

    if (valorcompralt == '0.00') {
        alertCustom('Debe ingresar el tipo de cambio de la compra alterna.');
        return false;
    }
    
    var usuario = $('#ctl00_txtus').val();
    
    
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=8&valorcompralt=" + valorcompralt + "&valorventalt=" + valorventalt + "&fecha=" + fecha + "&usuario=" + usuario + "&p_HMS=" + hms + "&p_TIPO_CAMBIO=" + tipo_cambio,
        success: function (datos) {

            if (datos == "OK") {
                exito();
                $("#grabar").hide();
                $('#txtCompraAlterna').attr('disabled', true);
                $('#txtVentaAlterna').attr('disabled', true);
            }

            else {
                noexito();
            }
        },

        error: function (msg) {
            alert(msg);
        }
    });
}

function ValidaDecimales(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true

    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                regexp = /[0-9]{3}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /[0-9]{10}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}

var NCTCAM = function () {
    /* Se carga la moneda oficial de la base de datos*/
    
    var peticion = function () {

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=1",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {

                if (datos[0].VENTA != '0') {
                    $("#txtVentaOficial").val(datos[0].VENTA);
                    $("#txtCompraOficial").val(datos[0].COMPRA);
                } else {
                    alertCustom('No existe tipo de cambio.');
                    $("#txtVentaOficial").removeAttr('disabled');
                    $("#txtCompraOficial").removeAttr('disabled');
                    $("#txtVentaOficial").val('0.00');
                    $("#txtCompraOficial").val('0.00');
                    
                }

            },
            error: function (msg) {

                alert(msg);
            }
        });
    }

    var desmonedas = function () {


        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=2",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {


                //alert(datos.length);

                for (var i = 0; i < datos.length; i++) {

                    //              $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    //alert(datos[i].Codigo);

                    if (datos[i].CodParam == 'MOBA') {
                        //alert(datos[i].Descripcion);
                        $("#txtMonedaOficial").val(datos[i].Descripcion);
                        $("#txtCodMonOficial").val(datos[i].Codigo);
                    }

                    if (datos[i].CodParam == 'MOAL') {
                        $("#txtMonedaAlterna").val(datos[i].Descripcion);
                        $("#txtCodMonAlterna").val(datos[i].Codigo);
                    }

                }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }

    var asignavalores = function () {
        $("#txtVentaAlterna").val('0.00');
        $("#txtCompraAlterna").val('0.00');
        $("#txtVentaAlterna").removeAttr('disabled');
        $("#txtCompraAlterna").removeAttr('disabled');

    }


    var fecvigente = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=4",
            //contentType: "application/json;",
            //dataType: "json",
            success: function (datos) {

                $("#txtFechaVigencia").val(datos);
            },

            error: function (msg) {
                Desbloquear("modal");
                alert(msg);
            }
        });


    }

    var cargaInicial = function () {

        var FECHA = ObtenerQueryString("FECHA");
        
        if (typeof (FECHA) !== "undefined") {

            var XXX = FECHA.substring(0, 10);
            var YYY = FECHA.substring(13, 21);
            var ZZZ = FECHA.substring(24, 27);

            Bloquear("ventana")

            var data = new FormData();
            data.append('OPCION', '7');
            data.append('p_FECHA', XXX);
            data.append('p_HORA', YYY);
            data.append('p_TEMP', ZZZ);

            Bloquear("ventana");
            $.ajax({
                url: "vistas/NC/ajax/NCMTCAM.ashx?",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {

                    console.log(datos);
                    if (datos != null) {
                        $('#txtFechaVigencia').val(datos[0].FECHA_VIGENTE);
                        $('#txtCompraOficial').val(datos[0].VALOR_CAMBIO_COMPRA);
                        $('#txtVentaOficial').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#txtCompraAlterna').val(datos[0].VALOR_CAMBIO_COMPRA);
                        $('#txtVentaAlterna').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#hfhms').val(datos[0].HMS);
                        $("#msg_tipo_cambio").html("<label>Modifica Tipo de Cambio</label>");//DAPO
                        //----------------------------
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");

                    }
                    else { noexito(); }
                },
                error: function (msg) {
                    noexitoCustom("No se listó correctamente.")
                    Desbloquear("ventana");
                },
                complete: function (msg) {
                    Desbloquear("ventana");
                }
            });
        }
        else {
            peticion();
            fecvigente();
        }
    }


    return {
        init: function () {
            //peticion();
            desmonedas();
            asignavalores();
            //fecvigente();
            cargaInicial();
        }
    };

}();

var NCLTCAM = function () {

    var plugins = function () {

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });

    };

    function EventoControles() {
        $("#btnBuscar").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerTipoCambio();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerTipoCambio();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
    };


    var crearTablaVacia = function () {
        var parms = {
            data: null,
            columns: [
                {
                    //data: { _: "FechaVigencia.display", sort: "FechaVigencia.order" },
                    //createdCell: function (td, cellData, rowData, row, col) {
                    //    $(td).attr('align', 'center')
                    //}
                    data: "FechaVigencia", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(rowData.FechaVigencia);

                        $(td).attr("align", "left");
                    },
                    type: "fechaHora"

                },
                {
                    data: "Codigomoneda", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "descripcion", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "valorcompra", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "valorventa", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "tipocambio", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ULTIMO_IND", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }

            ]

        }

        oTable = iniciaTabla('tbltc', parms);

        $('#tbltc').removeAttr('style');
        $('#tbltc tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var FECHA = row.FechaVigencia;
                var TIPO_CAMBIO = row.tipocambio;
                window.open("?f=NCMTCAM&FECHA=" + FECHA + "&TIPO_CAMBIO=" + TIPO_CAMBIO, '_blank');

            }

        });
    }

    var obtenerTipoCambio = function () {
        var data = new FormData();

        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ashx?opcion=6",
            beforeSend: Bloquear("tbltc"),
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            cache: false,
            async: true,
            success: function (datos) {
                console.log(datos);
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                    oTable.fnSort([[0, 'desc']]);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            error: function () {
                noexito();
            }, complete: function () {
                Desbloquear("tbltc");
            }
        });

    };

    return {
        init: function () {
            plugins();
            EventoControles();
            crearTablaVacia();
            $("#btnBuscar").click();
        }
    };
}();