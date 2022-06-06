
var CCLRACR = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#cboMes").select2();
        $('#txtanio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
       
    }
    var cargarFechaDefecto = function () {
        $('#txtanio').val(new Date().getFullYear().toString());
        var mes = new Date().getMonth() + 1;
        if (parseInt(mes) < 10) {
            mes = "0" + mes.toString()
        }
        $('#cboMes').select2("val", mes.toString());

        if (typeof $('#cboMes').val() != "undefined" && typeof $('#txtanio').val() != "undefined") {
            cargarDatos();
            setTimeout(function () {
                cargarGrafico("contenedor", "Análisis De Créditos A Clientes", $("#cboMes option:selected").html()+" - "+$("#txtanio").val(), "tblDatos");
            }, 250);
        }
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function listarMES() {     
        $('#cboMes').select2();
        $('#cboMes').select2('val', '');          
    }

    var cargarDatos = function () {
            var data = new FormData();
            data.append('OPCION', '1');
            //data.append('p_CTLG_CODE', $("#ctl00_hddctlg").val());
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_USUA_ID', $('#ctl00_txtus').val());
            data.append('p_ANIO', $('#txtanio').val());
            data.append('p_MES', $('#cboMes').val());

            Bloquear('divDatos');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CC/ajax/CCLRACR.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async:false
            }).success(function (datos) {
                Desbloquear("divDatos");
                if (datos != null) {
                    $("#divDatos").html(datos)
                }
            }).error(function () {
                Desbloquear("divDatos");
                alertCustom("Error al listar. Por favor intente nuevamente.");
            });

    }
    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            data: {
                table: idTabla
            },
            chart: {
                type: 'line'
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: ''
                }
            },
            xAxis: {
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    return  '<b>' + this.series.name + '</b><br/>Día:' + this.point.x +'=' + this.point.y;
                }
            }
        });
    }



    var eventoComtroles = function () {

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["txtanio", "cboMes"])) {
                cargarDatos();
                setTimeout(function () {
                    cargarGrafico("contenedor", "Análisis De Créditos A Clientes", $("#cboMes option:selected").html() + " - " + $("#txtanio").val(), "tblDatos");
                    $('#buscar').removeAttr("disabled");
                }, 250);
            } else {
                $('#buscar').removeAttr("disabled");
            }
         
        });


       

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            listarMES();
            cargarFechaDefecto();
            eventoComtroles();
        }
    };

}();