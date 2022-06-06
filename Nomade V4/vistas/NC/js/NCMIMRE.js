
var NCLIMRE = function () {

    var cargaInicial = function () {
        var json;
        var data = new FormData();
        $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/ncmimre.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
        .success(function (datos) {
            if (!isEmpty(datos)) {
                json = datos;
            }
            else {
                infoCustom2("No se encontraron datos de impuesto a la renta")
            }
        })
        .error(function () {
            alertCustom("Datos de impuesto a la renta no se cargaron correctamente")
        });


        var parms = {
            data: json,
            columns: [
                 {
                     data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     visible:false

                 },              
                {
                    data: { _: "FECHA_APLICACION_2.display", sort: "FECHA_APLICACION_2.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },              
                {
                    data: "FACTOR", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "IMPUESTO_RENTA", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "INGRESO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DIFERENCIA", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "COEFICIENTE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_TRANSACCION_2.display", sort: "FECHA_TRANSACCION_2.order" },
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                }
            ],
            order: ["1","desc"]
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');
      

        $('#tblBandeja tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;               
                window.location.href = '?f=NCMIMRE&code=' + code;
            }
        });      
    }
    return {
        init: function () {
            cargaInicial();
        }
    };
}();

var NCMIMRE = function () {

    var plugins = function () {
        $('#txtFechaAplicacion').datepicker();
        $('#txtFechaTransaccion').datepicker("setDate", "now");
    }

    var eventoControles = function () {

        $("#txtImpuestoRenta,#txtIngreso,#txtDiferencia,#txtCoeficiente").on("keyup", function () {
            var c1, c2, c3, c4;
            var factor;
            c1 = $("#txtImpuestoRenta").val();
            c2 = $("#txtIngreso").val();
            c3 = $("#txtDiferencia").val();
            c4 = $("#txtCoeficiente").val();

            if (c1 != "" && c2 != "" && c3 != "" && c4 != "") {
                factor = (c1 / (c2 - c3)) * c4;
                $("#txtFactor").val(factor.toFixed(4));

                if ($("#txtFactor").val() == "Infinity") {
                    $("#txtFactor").val("División entre 0")
                    $("#txtIngreso").parent().parent().addClass("error");
                    $("#txtDiferencia").parent().parent().addClass("error");
                }
                else if ($("#txtFactor").val() == "NaN") {
                    $("#txtFactor").val("Indeterminado")
                    $("#txtIngreso").parent().parent().addClass("error");
                    $("#txtDiferencia").parent().parent().addClass("error");
                }
                else {                    
                    $("#txtIngreso").parent().parent().removeClass("error");
                    $("#txtDiferencia").parent().parent().removeClass("error");
                }

                (factor != "" && factor.toString() != "NaN" && factor != Infinity) ? $("#F").html($("#txtFactor").val()) : $("#F").html("F");
            }
            else {
                $("#txtFactor").val("...");
                $("#F").html("F");
            }

            (c1 != "") ? $("#A").html($("#txtImpuestoRenta").val()) : $("#A").html("A");
            (c2 != "") ? $("#B").html($("#txtIngreso").val()) : $("#B").html("B");
            (c3 != "") ? $("#C").html($("#txtDiferencia").val()) : $("#C").html("C");
            (c4 != "") ? $("#D").html($("#txtCoeficiente").val()) : $("#D").html("D");

        }).on("paste", function () {
            return false;
        });
    }

    var cargaInicial = function () {
        var code = ObtenerQueryString('code');

        if (code != undefined) {
            var data = new FormData();
            data.append('p_CODE', code);
            //data.append('p_FECHA_TRANSACCION', $("#txtFechaTransaccion").val());
            //data.append('p_FECHA_APLICACION', $("#txtFechaAplicacion").val());
            //data.append('p_FECHA_BUSQUEDA', "");
            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nc/ajax/ncmimre.ashx?OPCION=1",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (datos) {
                Desbloquear("ventana");
                if (!isEmpty(datos)) {
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:ActualizarImpuestoRenta();");
                    $("#hfCodeImpuestoRenta").val(datos[0].CODIGO);
                    $("#txtFechaAplicacion").attr("disabled", "disabled");

                    $("#txtFechaTransaccion").val(datos[0].FECHA_TRANSACCION);
                    $("#txtFechaAplicacion").val(datos[0].FECHA_APLICACION);
                    $("#txtFactor").val(datos[0].FACTOR);
                    $("#txtImpuestoRenta").val(datos[0].IMPUESTO_RENTA);
                    $("#txtIngreso").val(datos[0].INGRESO);
                    $("#txtDiferencia").val(datos[0].DIFERENCIA);
                    $("#txtCoeficiente").val(datos[0].COEFICIENTE);
                  
                    $("#A").html($("#txtImpuestoRenta").val());
                    $("#B").html($("#txtIngreso").val());
                    $("#C").html($("#txtDiferencia").val());
                    $("#D").html($("#txtCoeficiente").val());
                    $("#F").html($("#txtFactor").val());
                }
                else {
                    alertCustom("Datos de impuesto a la renta no se cargaron correctamente")
                }
            })
            .error(function () {
                Desbloquear("ventana");
            });
        }
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargaInicial();

        }
    };
}();


function GrabarImpuestoRenta() {
    var continuar = true;
    if (vErrors(['txtImpuestoRenta', 'txtIngreso', 'txtDiferencia', 'txtCoeficiente', 'txtFactor', 'txtFechaTransaccion', 'txtFechaAplicacion'])) {

        if ($("#txtFactor").val() == "...") {
            continuar = false;
            alertCustom("Necesita completar todos los campos para calcular Factor y continuar!")
        }
        if ($("#txtIngreso").val() == $("#txtDiferencia").val()) {
            continuar = false;
            alertCustom("El valor de 'Ingresos Totales Año Anterior' y de 'Ingresos Diferencia Cambio' NO pueden ser iguales (división entre 0)!")
        }
        if (parseFloat($("#txtIngreso").val()) < parseFloat($("#txtDiferencia").val())) {
            continuar = false;
            alertCustom("El valor de 'Ingresos Totales Año Anterior' NO puede ser menor al de 'Ingresos Diferencia Cambio'!")
            $("#txtIngreso").parent().parent().addClass("error");
            $("#txtDiferencia").parent().parent().addClass("error");
        }
        if (continuar) {
            var data = new FormData();
            data.append('p_USUA_ID', $('#ctl00_lblusuario').text());
            data.append('p_FECHA_TRANSACCION', $("#txtFechaTransaccion").val());
            data.append('p_FECHA_APLICACION', $("#txtFechaAplicacion").val());
            data.append('p_FACTOR', $("#txtFactor").val());
            data.append('p_IMPUESTO_RENTA', $("#txtImpuestoRenta").val());
            data.append('p_INGRESO', $("#txtIngreso").val());
            data.append('p_DIFERENCIA', $("#txtDiferencia").val());
            data.append('p_COEFICIENTE', $("#txtCoeficiente").val());

            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nc/ajax/ncmimre.ashx?OPCION=2",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "") {
                    if (datos[0].CODIGO != 'EXISTE') {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:ActualizarImpuestoRenta();");
                        $("#hfCodeImpuestoRenta").val(datos[0].CODIGO);
                        $("#txtFechaAplicacion").attr("disabled", "disabled");
                    } else {
                        alertCustom('Ya existe un registro para la fecha de aplicación indicada!');
                    }
                } else {
                    noexito();
                }
            })
            .error(function () {
                noexito();
                Desbloquear("ventana");
            });
        }

    }

}

function ActualizarImpuestoRenta() {
    var continuar = true;
    if (vErrors(['txtImpuestoRenta', 'txtIngreso', 'txtDiferencia', 'txtCoeficiente', 'txtFactor', 'txtFechaTransaccion', 'txtFechaAplicacion'])) {

        if ($("#txtFactor").val() == "...") {
            continuar = false;
            alertCustom("Necesita completar todos los campos para calcular Factor y continuar!")
        }
        if ($("#txtIngreso").val() == $("#txtDiferencia").val()) {
            continuar = false;
            alertCustom("El valor de 'Ingresos Totales Año Anterior' y de 'Ingresos Diferencia Cambio' NO pueden ser iguales (división entre 0)!")
        }
        if (parseFloat($("#txtIngreso").val()) < parseFloat($("#txtDiferencia").val())) {
            continuar = false;
            alertCustom("El valor de 'Ingresos Totales Año Anterior' NO puede ser menor al de 'Ingresos Diferencia Cambio'!")
            $("#txtIngreso").parent().parent().addClass("error");
            $("#txtDiferencia").parent().parent().addClass("error");
        }
        if (continuar) {
            var data = new FormData();
            data.append('p_CODE', $("#hfCodeImpuestoRenta").val());
            data.append('p_USUA_ID', $('#ctl00_lblusuario').text());
            data.append('p_FECHA_TRANSACCION', $("#txtFechaTransaccion").val());
            data.append('p_FECHA_APLICACION', $("#txtFechaAplicacion").val());
            data.append('p_FACTOR', $("#txtFactor").val());
            data.append('p_IMPUESTO_RENTA', $("#txtImpuestoRenta").val());
            data.append('p_INGRESO', $("#txtIngreso").val());
            data.append('p_DIFERENCIA', $("#txtDiferencia").val());
            data.append('p_COEFICIENTE', $("#txtCoeficiente").val());

            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nc/ajax/ncmimre.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (datos) {
                Desbloquear("ventana");
                if (!isEmpty(datos)) {
                    if (datos[0].CODIGO != '') {
                        exito();
                        $("#hfCodeImpuestoRenta").val(datos[0].CODIGO);
                        $("#txtFechaAplicacion").attr("disabled", "disabled");
                    } else {
                        noexito();
                    }
                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
            });
        }

    }

}