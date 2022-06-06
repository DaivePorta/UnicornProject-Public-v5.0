
var NOLRCAC = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda,#cbosubgrupo,#cboGrupo,#cboVendedor,#cboProducto').select2();

        $('#cboAnio').multiselect({
            nonSelectedText: 'Seleccione Años!'
        });

        $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
    }

    var cargarFechaDefecto = function () {

        var mes = new Date().getMonth() + 1;
        if (parseInt(mes) < 10) {
            mes = "0" + mes.toString()
        }

        if (typeof $('#cboAnio').val() != "undefined") {
            cargarDatos();
            setTimeout(function () {
                cargarGrafico("contenedor", "Comparativo Analítico Compras", "", "tblDatos");
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

    var fillCboSucursal = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboSucursal').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboGrupo = function () {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#cboEmpresa').val()) + "&OPCION2=TX&CODE_EXIS=",
            async: false,
            success: function (datos) {
                $('#cboGrupo').empty();
                $('#cboGrupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboGrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupo').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboSubgrupos = function () {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $('#cboGrupo').val() + "&CTLG_CODE=" + $.trim($('#cboEmpresa').val()),
            async: false,
            success: function (datos) {
                $('#cbosubgrupo').empty();
                $('#cbosubgrupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '"  data-grup="' + $("#cboGrupo").val() + '">' + datos[i].Descripcion + '</option>');
                    }
                    $('#cbosubgrupo').removeAttr("disabled");
                } else {
                    $('#cbosubgrupo').attr("disabled", "disabled");
                }
                $('#cbosubgrupo').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function filltxtdescproducto() {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboSucursal').val() + "&SERIADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    // UPDATER_DESC_PROD
                    var input = $('#txt_desc_producto');
                    input.typeahead({
                        source: function (query, process) {
                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                       '","CODIGO":"' + datos[i].CODIGO +
                                       '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                       '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                       '","CODIGO_GRUPO": "' + datos[i].CODIGO_GRUPO +
                                       '","CODIGO_SUBGRUPO": "' + datos[i].CODIGO_SUBGRUPO +
                                       '","MONEDA": "' + datos[i].MONEDA +
                                        '","DETRACCION":"' + datos[i].DETRACCION + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";

                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            $("#cboGrupo").select2("val", map[item].CODIGO_GRUPO).change();
                            $("#cbosubgrupo").select2("val", map[item].CODIGO_SUBGRUPO);
                            $("#txt_cod_producto").val(map[item].CODIGO);
                            $("#txt_cod_a_producto").val(map[item].CODIGO_ANTIGUO);
                            $("#txt_desc_producto").val(map[item].DESC_ADM);

                            return item;
                        },
                    });
                    input.keyup(function (e) {
                        $(this).siblings("ul").css("min-width", $(this).css("width"))
                        if ($(this).val().length <= 0) {
                            $('#txt_cod_a_producto, #txt_cod_producto').val('');
                        }
                    });

                    var input = $('#txt_cod_a_producto');
                    input.typeahead({
                        source: function (query, process) {
                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].CODIGO_ANTIGUO);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                    '","CODIGO":"' + datos[i].CODIGO +
                                    '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                    '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                    '","CODIGO_GRUPO": "' + datos[i].CODIGO_GRUPO +
                                    '","CODIGO_SUBGRUPO": "' + datos[i].CODIGO_SUBGRUPO +
                                    '","DETRACCION":"' + datos[i].DETRACCION + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.CODIGO_ANTIGUO] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            $("#cboGrupo").select2("val", map[item].CODIGO_GRUPO).change();
                            $("#cbosubgrupo").select2("val", map[item].CODIGO_SUBGRUPO);
                            $("#txt_cod_producto").val(map[item].CODIGO);
                            $("#txt_cod_a_producto").val(map[item].CODIGO_ANTIGUO);
                            $("#txt_desc_producto").val(map[item].DESC_ADM);


                            return item;
                        },
                    });
                    input.keyup(function () {
                        $(this).siblings("ul").css("min-width", $(this).css("width"))
                        if ($(this).val().length <= 0) {
                            $('#txt_desc_producto, #txt_cod_producto').val('');
                        }
                    });
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {

                        selectEst.append('<option value="' + datos[i].CODIGO + '" data-grup="' + datos[i].CODIGO_GRUPO + '" data-subgrup="' + datos[i].CODIGO_SUBGRUPO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');


                    }
                    $('#cboProducto').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboProducto').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillProveedor = function () {
        //var selectEst = $('#cboVendedor');
        //$.ajax({
        //    type: "post",
        //    url: "vistas/NO/ajax/NOLRACM.ashx?OPCION=PROVEEDORES&CTLG_CODE=" + $("#cboEmpresa").val(),
        //    contenttype: "application/json;",
        //    datatype: "json",
        //    async: false,
        //    success: function (datos) {
        //        $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');
        //        if (datos !== null) {
        //            for (var i = 0; i < datos.length; i++) {
        //                selectEst.append('<option value="' + datos[i].PIDM + '">' + datos[i].PROVEEDOR + '</option>');
        //            }
        //            $('#cboVendedor').select2('val', 'TODOS');
        //        }
        //    },
        //    error: function (msg) {
        //        alertCustom('Error al listar Proveedores.');
        //    }
        //});
        var v_value = '';
        var input = $('#txtProveedor');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=4",
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    input.typeahead({
                        minLength: 2,
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });

                            process(arrayRazonSocial);
                        },
                        updater: function (item) {
                            $("#txtPIDM").val(map[item].PIDM);
                            return item;
                        },
                    });
                    input.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length === 0) {
                            $("#txtPIDM").val(null);
                        }
                    });
                }
                if (datos !== null && $.trim(v_value).length > 0) {
                    input.val('');
                }
            },
            error: function (msg) {
                alertCustom('Error al listar proveedores.');
            }
        });
    };

    var fillcboMoneda = function () {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboAnios = function () {
        var data = new FormData();
        data.append('OPCION', '2');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLRCAV.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            if (datos != null) {
                $('#cboAnio').empty();
                $('#cboAnio').append('<option></option>');
                var arr = [];
                for (var i = 0; i < datos.length; i++) {
                    arr.push({ "label": datos[i].ANIO, "title": datos[i].ANIO, "value": datos[i].ANIO });
                }

                $('#cboAnio').multiselect('dataprovider', arr);
                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
            }
        }).error(function () {
            alertCustom("Error al listar Años. Por favor intente nuevamente.");
        });
    }

    var cargarDatos = function () {
        var data = new FormData();
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $("#cboSucursal").val());
        data.append('MONE_CODE', $("#cboMoneda").val());
        data.append('GRUP_CODE', $("#cboGrupo").val());
        data.append('SUBGRUP_CODE', $("#cbosubgrupo").val());
        data.append('PROD_CODE', $("#cboProducto").val());
        data.append('USVE_CODE', $("#txtPIDM").val());
        data.append('ANIOS', ($('#cboAnio').val() !== null) ? $('#cboAnio').val().toString() : "");

        data.append('p_USUA_ID', $('#ctl00_txtus').val());

        Bloquear('divDatos');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NO/ajax/NOLRACM.ASHX?OPCION=COMPARATIVO_COMPRAS",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        }).success(function (datos) {
            Desbloquear("divDatos");
            if (datos !== null) {
                $("#divDatos").html(datos)
            }
        }).error(function () {
            Desbloquear("divDatos");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });

    }

    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'line',
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: true,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>Monto: ' + $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.point.y);
                }
            }
        });
    }

    var eventoControles = function () {
        var empresaAnterior = "";
        var grupoAnterior = "x";

        $("#cboEmpresa").on("change", function () {
            if ($(this).val() != empresaAnterior) {
                fillCboSucursal($("#cboEmpresa").val());
                fillCboGrupo();
                fillProveedor();
                $("#cbosubgrupo").empty().append("<option value='' selected='selected'>TODOS</option>").attr("disabled", "disabled").select2("val", "");
                //$('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" type="hidden" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span12" type="text" placeholder="Código"/>');
                //$("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Nombre Producto'/>");
                //filltxtdescproducto();
                fillProducto();
                empresaAnterior = $(this).val();
            }
        });

        $("#cboGrupo").on("change", function () {
            if ($(this).val() != grupoAnterior) {
                fillCboSubgrupos();
                grupoAnterior = $(this).val();
            }
            if ($("#cboProducto :selected").val() != "TODOS") {
                $("#cboProducto").select2("val", "TODOS");
            }
            //if ($("#txt_cod_producto").val() != "") {
            //    $("#txt_cod_producto,#txt_cod_a_producto,#txt_desc_producto").val("");
            //}
        });

        $("#cbosubgrupo").on("change", function () {
            //if ($("#txt_cod_producto").val() != "") {
            //    $("#txt_cod_producto,#txt_cod_a_producto,#txt_desc_producto").val("");
            //}
            if ($("#cboProducto :selected").val() != "TODOS") {
                $("#cboProducto").select2("val", "TODOS");
            }
        });

        $("#cboProducto").on("change", function () {
            var val = $("#cboProducto").val();
            var grupo = $("#cboProducto :selected").attr("data-grup");
            var subgrupo = $("#cboProducto :selected").attr("data-subgrup");
            $("#cboGrupo").select2("val", grupo).change();
            $("#cbosubgrupo").select2("val", subgrupo);
            $("#cboProducto").select2("val", val);
        });

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["cboMoneda", "cboEmpresa"])) {
                Bloquear("divGrafico")
                cargarDatos();
                setTimeout(function () {
                    cargarGrafico("contenedor", "Comparativo Analítico Compras", "", "tblDatos");
                    $('#buscar').removeAttr("disabled");
                    Desbloquear("divGrafico")
                }, 250);
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });

    }

    return {
        init: function () {
            plugins();
            fillCboAnios();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());
            fillCboGrupo();
            fillProveedor();
            fillcboMoneda();
            cargarFechaDefecto();
            fillProducto();
            eventoControles();
        }
    };

}();