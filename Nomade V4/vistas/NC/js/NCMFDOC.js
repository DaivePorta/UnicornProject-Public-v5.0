var oTableDetalle;
var oTableFormatos;
tipo_impr = null;
rutaImagen="";
var NCLFDOC = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
    };

    var fillTablaFormatos = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "CTLG_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                 {
                     data: "SCSL_DESC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 },
                 {
                     data: "DESC_DCTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 },
                 {
                     data: "DCTO_CODE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "NRO_ITEMS",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "ESTADO_IND",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 }
            ]

        }

        oTableFormatos = iniciaTabla('tabla_formatos', parms);
        $('#tabla_formatos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tabla_formatos').DataTable().row(this).data();
                var cod = row.CODIGO;
                window.location.href = '?f=NCMFDOC&codigo=' + cod;
            }
        });
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=" + $("#ctl00_txtus").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //select.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        //select.select2('val', $('#ctl00_hddctlg').val());
    };

    var cargarEstablecimientos = function () {
        var select = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        select.select2('val', $('#ctl00_hddestablecimiento').val());
    };

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            cargarEstablecimientos();
            ListarTabla($(this).val(), "")
        });
        $('#cboEstablecimiento').on('change', function () {
            ListarTabla($("#cboEmpresa").val(), $(this).val())

        });

    };

    var ListarTabla = function (CTLG, SCSL) {

        Bloquear("ventana");
        setTimeout(function () {

            var data = new FormData();
            data.append('FORM_CODE', "");
            data.append('CTLG_CODE', CTLG);
            data.append('SCSL_CODE', SCSL);
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=LF",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).done(function (datos) {
                if (!isEmpty(datos)) { //if (datos != null && datos != "") {
                    oTableFormatos.fnClearTable();
                    oTableFormatos.fnAddData(datos);
                    Desbloquear("ventana");
                }
                else {
                    oTableFormatos.fnClearTable();
                    infoCustom2("No se listaron correctamente  o no existe data disponible de los detalles...!"); // infocustom2
                    Desbloquear("ventana");
                }
            }).fail(function () {
                noexito();
                Desbloquear("ventana");
            });

        }, 100);
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            cargarEstablecimientos();
            fillTablaFormatos();
            eventoControles();
            ListarTabla($("#cboEmpresa").val(), $('#cboEstablecimiento').val());

        }
    };
}();

var detalles = [];
var NCMFDOC = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDocumento').select2();
        $('#cbCampos').select2();
        $('#cboCampoAsociado').select2();
        $('#cboTipoCampo').select2();
        $('#cboEstiloLetra').select2();
        $('#cboAlineacion').select2(); 
        $('.colorpicker-default').colorpicker({
            format: 'rgb'
        });
        $("#cboUnMeTam").select2();

        $('#flImagen').attr("accept", "image/*");
        $('#flImagen').bootstrapFileInput();
        $("#flImagen").siblings("span").html("<i class=\"icon-picture\"></i> Subir Imagen")
    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            cargarEstablecimientos();
            cargarTipoDC();
        });

        $('#btncancelar').on('click', function () {
            Cancelar();
        });

        $('#btnAgregarDet').on('click', function () {
            GrabarDetalle();
        });

        $('#cboTipoDocumento').on('change', function () {
            ListarCampos($(this).val());
        });

        $("#btnPrevisualizar").on('click', function () {
            //Cargar campos 
            var campos = $("#tabla_det").DataTable().data();

            var margenX, margenY;
            try {
                margenX = parseFloat($("#txtmargx").val());
            } catch (e) {
                margenX = 0;
            }
            try {
                margenY = parseFloat($("#txtmagy").val());
            } catch (e) {
                margenY = 0;
            }

            $("#divPrevContenido span").remove();
            for (var i = 0; i < campos.length; i++) {

                var id = campos[i].CODIGO;
                var desc = campos[i].DESCRIPCION;
                //var valory = parsefloat(campos[i].valor_y) * (2.20) + margeny;
                //var valorx = parsefloat(campos[i].valor_x) * (2.20) + margenx;
                var valorY = campos[i].VALOR_Y;
                var valorX =campos[i].VALOR_X;
                var longMax = parseFloat(campos[i].LONG_MAXIMA);
                var fontSize = campos[i].TAMANIO_LETRA;
                var fontFamily = campos[i].TIPO_LETRA;
                var nombre = campos[i].NOMBRE_CAMPO;

                if (nombre.length < longMax && longMax > 0) {
                    var long = longMax - nombre.length;
                    for (var k = 0; k < long; k++) {
                        nombre += "_";
                    }
                } else if (nombre.length > longMax) {
                    nombre = nombre.substring(0, longMax);
                }

                var ancho_x_align = "";

                if (campos[i].ALIGN_LETRA == "right") {
                    ancho_x_align += "width:" + obtenerAnchoTexto(campos[i].LONG_MAXIMA, campos[i].TAMANIO_LETRA + " px " + campos[i].TIPO_LETRA) + "px;" + "text-align:" + campos[i].ALIGN_LETRA + ";";
                }

                var campo = '<span id="c_' + id + '" title=\"' + desc + '\"  class="campo" style="top: ' + valorY + 'px; left:' + valorX + 'px;font-size:' + fontSize + 'px;font-family:' + fontFamily +";"+ ancho_x_align + '">' + nombre + '</span>';
                $("#divPrevContenido").append(campo);
            }


            $(".campo").draggable({
                //helper: 'clone',
                cursor: 'move',
                snap: '#divPrevContenido',
                // tolerance: 'fit',
                // stack: '.drop',
                revert: "invalid",
                containment:"parent"
            });

            //Mostrar modal

            if (rutaImagen != "") {
                $("#btnImprimir").css({ "display": "inline-block" });
                $("#modalPrev").modal('show');
            } else {
                infoCustom2("se necesita de una imagen!");
            }
        });

        $("#txtImpresora,#cboUnMeTam").change(function () {
            if (tipo_impr == "MATRICIAL") {               

                switch ( $("#cboUnMeTam").val()){
                    
                    case "in": 
                        $("#txtAncho").val("8");
                        break;
                    case "mm":
                        $("#txtAncho").val("203.2");
                        break;
                    case "cm":
                        $("#txtAncho").val("20.32");
                        break;
                    
                }

                $("#txtAncho").attr("disabled", 1);
            }
        });

        $("#btnImprimir").on('click', function () {
            TestImprimir();
        });


        $("#cboTipoCampo").on("change", function () {
            if ($(this).val() == "DC" || $(this).val() == "DI" || $(this).val() == "DF") {
                //$("#cboCampoAsociado").select2("val", "").attr("disabled", "disabled");
                $("#cboCampoAsociado").removeAttr("disabled", "disabled");
                $("#divNombreEstatico").attr("style", "display:none");
                $("#divNombreDinamico").attr("style", "display:block");
                $("#txtValor").val("DINAMICO").attr("disabled", "disabled");

            } else {
                $("#cboCampoAsociado").select2("val", "").attr("disabled", "disabled");
                //$("#cboCampoAsociado").removeAttr("disabled", "disabled");
                $("#divNombreDinamico").attr("style", "display:none");
                $("#divNombreEstatico").attr("style", "display:block");
                $("#txtValor").val("").removeAttr("disabled", "disabled");
            }
            ListarCamposEstaticos($(this).val().substring(0,1))
        });

        $("#divPrevContenido").droppable({
            hoverClass: "ui-state-active",
            drop: function (event, ui) {

                var margenX, margenY;
                try {
                    margenX = parseFloat($("#txtmargx").val());
                } catch (e) {
                    margenX = 0;
                }
                try {
                    margenY = parseFloat($("#txtmagy").val());
                } catch (e) {
                    margenY = 0;
                }

                var id = ui.draggable.attr("id").split("_")[1];
                var x, y;
                //x = ui.position.left / (2.20) - margenX;
                //y = ui.position.top / (2.20) - margenY;
                x = ui.position.left;
                y = ui.position.top;
                //  infoCustom2("Campo:" + id + "<br/> X:" + x.toFixed(0) + " Y:" + y.toFixed(0));

                if (y < 0) {
                    y = 0;
                }
                if (x < 0) {
                    x = 0;
                }

                var nroExito = 0;
                try {
                    var data = new FormData();
                    data.append('columnName', "VALOR X");
                    data.append('value', x.toFixed(0));
                    data.append('id', id);

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/nc/ajax/NCMFDOC.ashx?OPCION=UPD_CAMPO",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        nroExito++;
                        if (nroExito == 2) {
                            ListarDetalleF("");
                            infoCustom2("Campo:" + id + "<br/> X:" + x.toFixed(0) + " Y:" + y.toFixed(0));
                        }
                    })
                } catch (e) { }

                try {
                    var data = new FormData();
                    data.append('columnName', "VALOR Y");
                    data.append('value', y.toFixed(0));
                    data.append('id', id);

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/nc/ajax/NCMFDOC.ashx?OPCION=UPD_CAMPO",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        nroExito++;
                        if (nroExito == 2) {
                            ListarDetalleF("");
                            infoCustom2("Campo:" + id + "<br/> X:" + x.toFixed(0) + " Y:" + y.toFixed(0));
                        }
                    })
                } catch (e) { }

            }
        });


        $("#txtNombreCampo").on("keyup", function () {
            if ($("#cboTipoCampo").val() == "DC" || $("#cboTipoCampo").val() == "DI" || $("#cboTipoCampo").val() == "DF") {
            } else {
                var valor = $(this).val();
                $("#txtValor").val(valor);
                $("#txttamaniomaximo").val(valor.length);
                $("#txtdescripcioncampo").val(valor);
            }
        });

        $("#txtValor").on("keyup", function () {
            var valor = $(this).val();
            $("#txtValor").val(valor);
            $("#txttamaniomaximo").val(valor.length);
            if ($("#cboTipoCampo").val() == "DC" || $("#cboTipoCampo").val() == "DI" || $("#cboTipoCampo").val() == "DF") {
            } else {
                $("#txtdescripcioncampo").val(valor);
            }
        });
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=" + $("#ctl00_txtus").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //select.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        //select.select2('val', $('#ctl00_hddctlg').val());
    };

    var cargarTipoDC = function () {
        var select = $('#cboTipoDocumento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LTDC&P_CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].DCTO_CODE + '" codesunat="' + datos[i].SUNAT_CODE + '" tipodoc="' + datos[i].TIPO_DOC + '" almacen="' + datos[i].ALMACEN.charAt(0) + '" compraventa="' + datos[i].COMPRA_VENTA.charAt(0) + '" gastos="' + datos[i].GASTOS.charAt(0) + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DCTO_DESC + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        select.select2();
    };

    var cargarEstablecimientos = function () {
        var select = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        select.select2('val', $('#ctl00_hddestablecimiento').val());
    };

    var cargarSucursal = function () {
        var select = $('#cboEnlace');
        select.prop('disabled', true);
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LA&P_CTLG_CODE=" + $('#cboEmpresa').val() + "&P_SCSL_CODE=" + $('#cboEstablecimiento').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.html('');
                if (datos !== null) {
                    select.append('<option value="' + datos[0].CODIGO + '">' + datos[0].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Almacenes.');
            }
        });
        select.select2();
        $('#lblEnlace').text('Almacen');
    };

    var autocompletarImpresoras = function () {
        impresoraCode = "";
        $("#divImpresoras").html('<div class="span2"><div class="control-group"><label class="control-label" for="txtImpresora">Impresora</label></div></div><div class="span8"><div class="control-group"><div class="controls"><input type="text" id="txtImpresora" class="span10" style="text-transform: uppercase" />&nbsp;&nbsp;<a href="?f=ncmimpr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a></div></div></div>');
        //$("#cboFormato").change();

        v_value = "";
        var txt = $('#txtImpresora');

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCIMPR.ashx?p_OPCION=4&p_EMPRESA=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    impresoras = datos;
                    txt.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                //if (datos[i].TIPO == "TICKETERA") {
                                arrayNC.push(datos[i].MARCA + " " + datos[i].MODELO + " " + datos[i].SERIE);
                                obj += '{"CODIGO" : "' + datos[i].CODIGO + '",'
                                obj += '"MARCA" : "' + datos[i].MARCA + '",'
                                obj += '"MODELO" : "' + datos[i].MODELO + '",'
                                obj += '"TIPO" : "' + datos[i].TIPO + '",'
                                obj += '"ESTADO" : "' + datos[i].ESTADO + '",'
                                obj += '"MAQUINA" : "' + datos[i].MAQUINA + '",'
                                obj += '"SERIE" : "' + datos[i].SERIE + '"'
                                obj += '},';
                                //}
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';

                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.MARCA + " " + objeto.MODELO + " " + objeto.SERIE] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            impresoraCode = map[item].CODIGO;
                            $("#HF_IMPR_CODE").val(impresoraCode);
                            tipo_impr = map[item].TIPO;
                            return item;
                        }
                    });

                    txt.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($(this).val().length == 0) {
                            impresoraCode = "";
                        }
                        $("#HF_IMPR_CODE").val(impresoraCode);
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    txt.val(v_value);
                }
            },
            error: function (msg) {
                alertCustom("Impresoras no se listaron correctamente");
            }
        });
    };

    var ListarCampos = function (cod_dcto) {

        Bloquear("divCboCampos");
        $('#cbCampos').html("");
        var select = $('#cbCampos');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=LC&DCTO_CODE=" + cod_dcto ,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //select.empty();
                Desbloquear("divCboCampos");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CAMPO + '">' + datos[i].CAMPO + '</option>');
                    }
                }
            },
            error: function (msg) {
                Desbloquear("divCboCampos");
                alertCustom(msg);
            }
        });

    };

    var ListarCamposEstaticos = function (tipo_campo) {

        Bloquear("divCboCampos");
        var select = $('#cboCampoAsociado');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=LDCE&FORM_CODE=" + $("#txtcodigo").val() + "&TIPO=" + tipo_campo,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                
                Desbloquear("divCboCampos");
                if (datos != null && datos.length > 0) {
                    select.empty();
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_CAMPO + '</option>');
                    }
                } else {
                    //select.empty();
                    select.select2();
                }
            },
            error: function (msg) {
                Desbloquear("divCboCampos");
                alertCustom(msg);
            }
        });

    };



    var GrabarDetalle = function () {
        var a = ['txtTamanioLetra', 'cboTipoLetra', 'txttamaniomaximo', 'txtvalorx', 'txtvalory', 'txtColor', 'cboEstiloLetra', 'cboTipoCampo'];


        if (vCamposO(a)) {

            var continuar = false;
            if (($("#cboTipoCampo").val() == "DC" || $("#cboTipoCampo").val() == "DF" || $("#cboTipoCampo").val() == "DI")) {
                if (vErrors(['cbCampos'])) {
                    continuar = true;
                }
            } else {
                if (vErrors(['txtValor', 'txtNombreCampo'])) {
                    continuar = true;
                }
            }

            var conv_letras_ind = "";
            if ($("#chxconvlet").is(':checked')) {
                conv_letras_ind = "S";
            } else {
                conv_letras_ind = "N";
            }

            if (continuar) {
                Bloquear("tabDetalle");
                setTimeout(function () {
                    var data = new FormData();
                    data.append('FORM_CODE', $("#txtcodigo").val());
                    if ($("#cboTipoCampo").val() == "DC" || $("#cboTipoCampo").val() == "DI" || $("#cboTipoCampo").val() == "DF") {
                        data.append('NOM_CAMPO', $('#cbCampos').val());
                    } else {
                        data.append('NOM_CAMPO', $('#txtNombreCampo').val());
                    }
                    data.append('TIPO_LETRA', $("#cboTipoLetra").val());
                    data.append('TAM_LETRA', $("#txtTamanioLetra").val());
                    data.append('VALORX', $("#txtvalorx").val());
                    data.append('VALORY', $('#txtvalory').val());
                    data.append('TAM_MAXIMO', $('#txttamaniomaximo').val());
                    data.append('DESC_DET', $('#txtdescripcioncampo').val());
                    //OTROS
                    var t = $("#txtColor").val();
                    var r = t.substring(t.indexOf("(") + 1, t.indexOf(","))
                    var t2 = t.substring(t.indexOf(",") + 1)
                    var g = t2.substring(0, t2.indexOf(","))
                    var b = t2.substring(t2.indexOf(",") + 1, t2.length - 1)
                    data.append('RED', r);
                    data.append('GREEN', g);
                    data.append('BLUE', b);
                    data.append('VALOR', $("#txtValor").val());
                    data.append('TIPO', $("#cboTipoCampo").val());
                    data.append('ESTILO_LETRA', $("#cboEstiloLetra").val());
                    data.append('ALIGN_LETRA', $("#cboAlineacion").val()); 
                    //TO DO: Campo Asociado
                    data.append('CAMPO_ASOCIADO', $("#cboCampoAsociado").val());
                    //Indica si el campo se puede esxpresar en letras
                    data.append('CONV_LETRAS_IND', conv_letras_ind);

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=GD",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        if (datos[0].SUCCESS == "OK") {

                            var detalle = {};
                            detalle.CODIGO = datos[0].CODIGO;
                            detalle.TIPO = $("#cboTipoCampo").val();
                            detalle.NOMBRE = $('#cbCampos').val();
                            detalles.push(detalle);
                            //ListarCamposAsociados();
                            Desbloquear("tabDetalle");
                            ListarDetalleF("");
                            LimpiarCampos();
                            exito();
                        }
                        else {
                            alertCustom("La operación no se ha realizado correctamente!");
                            Desbloquear("tabDetalle");
                        }
                    }).fail(function () {
                        noexito();
                        Desbloquear("tabDetalle");
                    });

                }, 100);
            }
        }
    };

    //TO DO: Verificar donde se usa
    var ActualizarDetalle = function () {
        var a = ['txtnombrecampo', 'txtTamanioLetra', 'cboTipoLetra', 'txttamaniomaximo', 'txtvalorx', 'txtvalory', 'txtdescripcioncampo', 'cboAlineacion'];

        if (vCamposO(a)) {
            Bloquear("tabDetalle");
            setTimeout(function () {

                var data = new FormData();
                data.append('FORM_CODE', $("#txtcodigo").val());
                data.append('DET_CODE', $("#txtcodigo").val());
                if ($("#cboTipoCampo").val() == "DC" || $("#cboTipoCampo").val() == "DI" || $("#cboTipoCampo").val() == "DF") {
                    data.append('NOM_CAMPO', $('#cbCampos').val());
                } else {
                    data.append('NOM_CAMPO', $('#txtNombreCampo').val());
                }
                data.append('TIPO_LETRA', $("#cboTipoLetra").val());
                data.append('TAM_LETRA', $("#txtTamanioLetra").val());
                data.append('VALORX', $("#txtvalorx").val());
                data.append('VALORY', $('#txtvalory').val());
                data.append('TAM_MAXIMO', $('#txttamaniomaximo').val());
                data.append('DESC_DET', $('#txtdescripcioncampo').val());

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=GD",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).done(function (datos) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].CODIGO == "") {
                            alertCustom("Ocurrió un error en el servidor al registrar la Operación.");
                        } else {
                            Desbloquear("tabDetalle");
                            exito();
                        }
                    }
                    else {
                        alertCustom("Fallo El Registro...!");
                        Desbloquear("tabDetalle");
                    }
                }).fail(function () {
                    noexito();
                    Desbloquear("tabDetalle");
                });

            }, 100);
        }
    };

    var LimpiarCampos = function () {
        //combos
        $("#cboCampoAsociado").select2("val", "");
        $("#cbCampos").select2("val", "");
        $("#cboEstiloLetra").select2("val", "");
        $("#cboAlineacion").select2("val", "");
        $("#cboTipoLetra").val("");

        $('#txtValor').val("");
        $('#txtdescripcioncampo').val("");
        $("#txtTamanioLetra").val("10");
        $("#txtvalorx").val("0");
        $('#txtvalory').val("0");
        $('#txttamaniomaximo').val("100");
        $('#txtNombreCampo').val("").focus();

        $("#txtColor").val("rgb(0,0,0)");
        $($("#txtColor").siblings()[0]).find("i").attr("style", "background-color: rgb(0, 0, 0);");

    };

    var fillTablaDet = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            scrollX: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                {
                    data: "NOMBRE_CAMPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left').attr('id', rowData.CODIGO)
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left').attr('id', rowData.CODIGO)
                    }
                },
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left').attr('id', rowData.CODIGO)
                    }
                },
                 {
                     data: "LONG_MAXIMA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                     }
                 },
                 {
                     data: "TIPO_LETRA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                     }
                 },
                 {
                     data: "TAMANIO_LETRA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                     }
                 },


                   {
                       data: "ESTILO_LETRA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                       }
                   },
                     {
                         data: "COLOR",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                         }
                     },
                     {
                         data: "ALIGN_LETRA",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                         }
                     },
                       {
                           data: "VALOR",
                           createdCell: function (td, cellData, rowData, row, col) {
                               $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                           }
                       },

                 {
                     data: "VALOR_X",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                     }
                 },
                 {
                     data: "VALOR_Y",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)

                     }
                 },
                 {
                     data: null,
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center').attr('id', rowData.CODIGO)
                         $(td).html('<a class="btn red"><i class="icon-trash"></i></a>');
                     }
                 }
            ]

        }

        oTableDetalle = iniciaTabla('tabla_det', parms);
        $('#tabla_det tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tabla_det').DataTable().row($(this).parent().parent()).index();
            var row = $('#tabla_det').DataTable().row(pos).data();
            var code = row.CODIGO;
            DeleteDetalle(code);
        });

        var o = $("#tabla_det").dataTable();
        o._fnAdjustColumnSizing()

    };

    var DeleteDetalle = function (codigo) {
        Bloquear("tabDetalle");
        setTimeout(function () {
            var data = new FormData();
            data.append('DET_CODE', codigo);

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=DLDT",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            }).done(function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("tabDetalle");
                    exito();
                    ListarDetalleF("");
                    LimpiarCampos();
                }
                else {
                    alertCustom("Fila no Eliminada...!");
                    Desbloquear("tabDetalle");
                }
            }).fail(function () {
                noexito();
                Desbloquear("tabDetalle");
            });

        }, 100);
    };

    var ListarDetalleF = function (cod_det) {

        Bloquear("tabDetalle");
        setTimeout(function () {

            var data = new FormData();
            data.append('FORM_CODE', $("#txtcodigo").val());
            data.append('CTLG_CODE', $("#cboEmpresa").val());
            data.append('SCSL_CODE', $('#cboEstablecimiento').val()); 
            data.append('DCTO_CODE', $("#cboTipoDocumento").val());
            data.append('DET_CODE', cod_det);
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=LD",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            }).done(function (datos) {
                if (datos != null && datos != "") {

                    detalles = [];
                    for (var i = 0; i < datos.length; i++) {
                        var detalle = {};
                        detalle.CODIGO = datos[0].CODIGO;
                        detalle.TIPO = datos[0].TIPO;
                        detalle.NOMBRE = datos[0].NOMBRE_CAMPO;
                        detalles.push(detalle);
                    }
                    //ListarCamposAsociados();

                    oTableDetalle.fnClearTable();
                    oTableDetalle.fnAddData(datos);
                    Desbloquear("tabDetalle");
                }
                else {
                    oTableDetalle.fnClearTable();
                    alertCustom("No se listaron correctamente Los detalles...!");
                    Desbloquear("tabDetalle");
                }

                setTimeout(function () {
                    //EDICION
                    oTable = $("#tabla_det").dataTable();
                    oTable.makeEditable({
                        sUpdateURL: "vistas/nc/ajax/NCMFDOC.ashx?OPCION=UPD_CAMPO",
                        aoColumns: [
                            null,
                            null,
                            null,
                            null,
                            {//LONGITUD MÁXIMA
                                cssclass: "required number span10",
                                oValidationOptions: { rules: { value: { maxlength: 5 } } },
                                indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                tooltip: 'Doble click para cambiar Longitud Máxima.',
                                loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                type: 'text',
                                style: 'margin: 0px; text-align: center; padding: 3px',
                                onblur: 'submit',
                                fnOnCellUpdated: function (sStatus, sValue, settings) {
                                    setTimeout(function () {
                                        ListarDetalleF("");
                                    }, 10);
                                }
                            },
                             {//TIPO LETRA
                                 cssclass: "required span10",
                                 indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                 tooltip: 'Doble click para cambiar Letra.',
                                 loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                 type: 'select',
                                 data: function () {
                                     var fuente;
                                     var letras = $("#cboTipoLetra option");
                                     var obj = "";
                                     if (letras.length>0) {                                         
                                         obj += '{';
                                         for (var i = 0; i < letras.length; i++) {  
                                             obj += '"' + $(letras[i]).attr("value") + '":"' + $(letras[i]).html() + '",';
                                         };
                                         obj += "{}";
                                         obj = obj.replace(",{}", "");
                                         obj += '}';
                                         fuente = JSON.parse(obj);
                                     }    
                                     return fuente;
                                 },
                                 style: 'margin: 0px; text-align: center; padding: 3px',
                                 onblur: 'submit',
                                 fnOnCellUpdated: function (sStatus, sValue, settings) {
                                     setTimeout(function () {
                                         ListarDetalleF("");
                                     }, 10);
                                 }
                             },
                            {//TAMAÑO LETRA
                                cssclass: "required number span10",
                                oValidationOptions: { rules: { value: { maxlength: 5 } } },
                                indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                tooltip: 'Doble click para cambiar Tamaño de Letra',
                                loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                type: 'text',
                                style: 'margin: 0px; text-align: center; padding: 3px',
                                onblur: 'submit',
                                fnOnCellUpdated: function (sStatus, sValue, settings) {
                                    setTimeout(function () {
                                        ListarDetalleF("");
                                    }, 10);
                                }
                            },
                              {//ESTILO LETRA
                                  cssclass: "required span10",
                                  indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                  tooltip: 'Doble click para cambiar el estilo de letra.',
                                  loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                  type: 'select',
                                  data: function () {
                                      var fuente; 
                                      var letras = $("#cboEstiloLetra option");
                                      var obj = "";
                                      if (letras.length > 0) {
                                          obj += '{';
                                          for (var i = 0; i < letras.length; i++) {
                                              obj += '"' + $(letras[i]).attr("value") + '":"' + $(letras[i]).html() + '",';
                                          };
                                          obj += "{}";
                                          obj = obj.replace(",{}", "");
                                          obj += '}';
                                          fuente = JSON.parse(obj);
                                      }
                                      return fuente;
                                  },
                                  style: 'margin: 0px; text-align: center; padding: 3px',
                                  onblur: 'submit',
                                  fnOnCellUpdated: function (sStatus, sValue, settings) {
                                      setTimeout(function () {
                                          ListarDetalleF("");
                                      }, 10);
                                  }
                              },
                            null,
                              {//ALINEACION
                                  cssclass: "required span10",
                                  indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                  tooltip: 'Doble click para cambiar la alineación del texto.',
                                  loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                  type: 'select',
                                  data: function () {
                                      var fuente;
                                      var letras = $("#cboAlineacion option");
                                      var obj = "";
                                      if (letras.length > 0) {
                                          obj += '{';
                                          for (var i = 0; i < letras.length; i++) {
                                              obj += '"' + $(letras[i]).attr("value") + '":"' + $(letras[i]).html() + '",';
                                          };
                                          obj += "{}";
                                          obj = obj.replace(",{}", "");
                                          obj += '}';
                                          fuente = JSON.parse(obj);
                                      }
                                      return fuente;
                                  },
                                  style: 'margin: 0px; text-align: center; padding: 3px',
                                  onblur: 'submit',
                                  fnOnCellUpdated: function (sStatus, sValue, settings) {
                                      setTimeout(function () {
                                          ListarDetalleF("");
                                      }, 10);
                                  }
                              },
                             null,
                            {//VALOR X
                                cssclass: "required number span10",
                                oValidationOptions: { rules: { value: { maxlength: 5 } } },
                                indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                tooltip: 'Doble click para cambiar la posición X.',
                                loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                type: 'text',
                                style: 'margin: 0px; text-align: center; padding: 3px',
                                onblur: 'submit',
                                fnOnCellUpdated: function (sStatus, sValue, settings) {
                                    setTimeout(function () {
                                        // infoCustom2(sStatus + " " + sValue + " " + settings);
                                        ListarDetalleF("");
                                    }, 10);
                                }
                            },
                            {//VALOR Y
                                cssclass: "required number span10",
                                oValidationOptions: { rules: { value: { maxlength: 5 } } },
                                indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                                tooltip: 'Doble click para cambiar la posición Y.',
                                loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                                type: 'text',
                                style: 'margin: 0px; text-align: center; padding: 3px',
                                onblur: 'submit',
                                fnOnCellUpdated: function (sStatus, sValue, settings) {
                                    setTimeout(function () {
                                        ListarDetalleF("");
                                    }, 10);
                                }
                            },
                            null
                        ]
                    });
                }, 100);
            }).fail(function () {
                noexito();
                Desbloquear("tabDetalle");
            });

            var o = $("#tabla_det").dataTable();
            o._fnAdjustColumnSizing()
        }, 100);
    };

    var CargarFormatos = function () {
        var cod = ObtenerQueryString("codigo");

        if (cod !== undefined) {
            setTimeout(function () {
                $('#btngrabar').html("<i class='icon-pencil'></i> Modificar").attr("href", "javascript:Actualizar();");
                var data = new FormData();
                data.append('FORM_CODE', cod);
                data.append('CTLG_CODE', "");
                data.append('SCSL_CODE', "");
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=LF",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).done(function (datos) {
                    if (datos != null && datos != "") {

                        $("#txtcodigo").val(datos[0].CODIGO);
                        $("#cboEmpresa").val(datos[0].CTLG_CODE);
                        $('#cboEstablecimiento').val(datos[0].SCSL_CODE);
                        $("#cboTipoDocumento").select2('val', datos[0].DCTO_CODE);
                        $("#HF_IMPR_CODE").val(datos[0].IMPR_CODE);
                        $('#txtnroitems').val(datos[0].NRO_ITEMS);
                        $('#txtespacioitms').val(datos[0].ESPACIO_ITEMS);
                        $('#txtmargx').val(datos[0].MARGEN_X);
                        $('#txtmagy').val(datos[0].MARGEN_Y);
                        $('#txtdescformato').val(datos[0].DESCRIPCION);
                        $('#txtImpresora').val(datos[0].IMPRESORA);
                        $('#txtImpresora').keyup().siblings("ul").children("li").click();

                        $('#txtAlto').val(datos[0].ALTO);
                        $('#txtAncho').val(datos[0].ANCHO);
                        $('#cboUnMeTam').select2("val",datos[0].UNME);


                        if (datos[0].IMG != "") {
                            alto=datos[0].ALTO.toString() + datos[0].UNME;
                            ancho = datos[0].ANCHO.toString() + datos[0].UNME;
                            margenx = datos[0].MARGEN_X + datos[0].UNME;
                            $("#flImagen").siblings("span").html("<i class=\"icon-picture\"></i> Cambiar Imagen")
                            $("#divPrev").css({ "background": 'url("' + datos[0].IMG + '")', "background-size": "auto " + alto, "height": alto });
                            $("#divPrevContenido").css({ "height": alto, "width": ancho,"left":margenx});
                        }
                        rutaImagen = datos[0].IMG.toString();

                        ListarDetalleF("");
                        $("#tab_det").click();

                        var estado = (datos[0].ESTADO_IND == 'ACTIVO');
                        $('#chkEstado').prop('checked', estado);

                        Desbloquear("tabDetalle");

                        ListarCampos(datos[0].DCTO_CODE);
                    }
                    else {
                        alertCustom("No cargo correctamente los datos...!");
                        Desbloquear("tabDetalle");
                    }
                }).fail(function () {
                    noexito();
                    Desbloquear("tabDetalle");
                });

            }, 100);
        }
    }

    return {
        init: function () {
            plugins();
            fillTablaDet();
            cargarEmpresas();
            cargarEstablecimientos();
            cargarTipoDC();
            autocompletarImpresoras();

            eventoControles();
            CargarFormatos();



        }
    };
}();

function ListarCamposAsociados() {
    $("#cboCampoAsociado option").remove();
    $("#cboCampoAsociado").append('<option value="">NINGUNO</option>');
    for (var i = 0; i < detalles.length; i++) {
        if (detalles[i].TIPO == "DC" || detalles[i].TIPO == "DI" || detalles[i].TIPO == "DF") {
            $("#cboCampoAsociado").append('<option value="' + detalles[i].CODIGO + '">' + detalles[i].NOMBRE + '</option>');
        }
    }
}

function TestImprimir() {
    var alto = $('#txtAlto').val() + $('#cboUnMeTam').val();
    var winPrint = window.open('', '', 'left=0,top=0,width=' + 800 + ',height=' + 600 + ',toolbar=0,scrollbars=0,status=0,location=0');
    winPrint.document.write('<link rel="stylesheet" href="../../recursos/css/Impresion.css" />');
    txtCssFormato = "@media print {html, body { height: " + alto + "!important;}}";
    winPrint.document.write('<style>' + txtCssFormato + ' </style>');
    winPrint.document.write('<title>Prueba</title>');   
    winPrint.document.write( $("#divPrevContenido").html());
    winPrint.document.close();
    winPrint.focus();
    var document_focus = false;
    setTimeout(function () { winPrint.print(); document_focus = true; }, 100);
    var int = setInterval(function () {
        if (document_focus === true) {
            winPrint.close();
            clearInterval(int);
        }
    }, 300);

}

function Grabar() {
    var a = ['cboEmpresa', 'cboEstablecimiento', 'cboTipoDocumento', 'txtImpresora', 'txtnroitems', 'txtespacioitms'];

    if (vCamposO(a)) {
        Bloquear("tabGenerales");
        setTimeout(function () {

            var data = new FormData();
            data.append('CTLG_CODE', $("#cboEmpresa").val());
            data.append('SCSL_CODE', $('#cboEstablecimiento').val());
            data.append('DCTO_CODE', $("#cboTipoDocumento").val());
            data.append('IMPR_CODE', $("#HF_IMPR_CODE").val());
            data.append('NROITMS', $('#txtnroitems').val());
            data.append('ESPACIOITMS', $('#txtespacioitms').val());
            data.append('MARGX', $('#txtmargx').val());
            data.append('MARGY', $('#txtmagy').val());
            data.append('DESCRIPCION', $('#txtdescformato').val());
            data.append('ALTO', $('#txtAlto').val());
            data.append('ANCHO', $('#txtAncho').val());
            data.append('UNME', $('#cboUnMeTam').val());
            data.append('IMG', $("#flImagen")[0].files[0]);
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=G",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).done(function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    $('#txtcodigo').val(datos[0].CODIGO);
                    $('#btngrabar').html("<i class='icon-pencil'></i> Modificar").attr("href", "javascript:Actualizar();");
                    $("#tab_det").click();

                    if ($("#flImagen")[0].files.length > 0) {
                        alto = $('#txtAlto').val() + $('#cboUnMeTam').val();
                        ancho = $('#txtAncho').val() + $('#cboUnMeTam').val();
                        margenx = $('#txtmargx').val() + $('#cboUnMeTam').val();
                        imgName = "IMG_" + $("#cboEmpresa").val() + "_" + $("#cboTipoDocumento").val()+".jpg";
                        $("#flImagen").siblings("span").html("<i class=\"icon-picture\"></i> Cambiar Imagen")
                        $("#divPrev").css({ "background": 'url("' + "../../../recursos/img/Imagenes/DocumentosImprimir/"+imgName + "?" + Math.random()+'")', "background-size": "auto " + alto, "height": alto });
                        $("#divPrevContenido").css({ "height": alto, "width": ancho, "left": margenx });
                        rutaImagen = "../../../recursos/img/Imagenes/DocumentosImprimir/" + imgName + "?" + Math.random();
                    }


                    Desbloquear("tabGenerales");
                    exito();



                }
                else {
                    alertCustom("Fallo El Registro...!");
                    Desbloquear("tabGenerales");
                }
            }).fail(function () {
                noexito();
                Desbloquear("tabGenerales");
            });

        }, 100);
    }
};

function Actualizar() {
    var a = ['cboEmpresa', 'cboEstablecimiento', 'cboTipoDocumento', 'txtImpresora', 'txtnroitems', 'txtespacioitms'];
    var estado = "";
    if ($("#chkEstado").is(':checked')) {
        estado = "S";
    } else {
        estado = "N";
    }
    if (vCamposO(a)) {
        Bloquear("tabGenerales");
        setTimeout(function () {

            var data = new FormData();
            data.append('FORM_CODE', $("#txtcodigo").val());
            data.append('CTLG_CODE', $("#cboEmpresa").val());
            data.append('SCSL_CODE', $('#cboEstablecimiento').val());
            data.append('DCTO_CODE', $("#cboTipoDocumento").val());
            data.append('IMPR_CODE', $("#HF_IMPR_CODE").val());
            data.append('NROITMS', $('#txtnroitems').val());
            data.append('ESPACIOITMS', $('#txtespacioitms').val());
            data.append('MARGX', $('#txtmargx').val());
            data.append('MARGY', $('#txtmagy').val());
            data.append('DESCRIPCION', $('#txtdescformato').val());
            data.append('ESTADOF', estado);
            data.append('ALTO', $('#txtAlto').val());
            data.append('ANCHO', $('#txtAncho').val());
            data.append('UNME', $('#cboUnMeTam').val());
            data.append('IMG', $("#flImagen")[0].files.length > 0 ? $("#flImagen")[0].files[0] : new File(new Array(), rutaImagen));

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMFDOC.ashx?OPCION=A",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).done(function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("tabGenerales");

                    if ($("#flImagen")[0].files.length > 0 || rutaImagen!="") {
                        alto = $('#txtAlto').val() + $('#cboUnMeTam').val();
                        ancho = $('#txtAncho').val() + $('#cboUnMeTam').val();
                        margenx = $('#txtmargx').val() + $('#cboUnMeTam').val();
                        imgName = "IMG_" + $("#cboEmpresa").val() + "_" + $("#cboTipoDocumento").val() + ".jpg";
                        $("#flImagen").siblings("span").html("<i class=\"icon-picture\"></i> Cambiar Imagen")
                        $("#divPrev").css({ "background": 'url("' + "../../../recursos/img/Imagenes/DocumentosImprimir/" + imgName + "?" + Math.random()+'")', "background-size": "auto " + alto, "height": alto });
                        $("#divPrevContenido").css({ "height": alto, "width": ancho, "left": margenx });
                    }



                    exito();
                }
                else {
                    alertCustom("Fallo La Actualizacion...!");
                    Desbloquear("tabGenerales");
                }
            }).fail(function () {
                noexito();
                Desbloquear("tabGenerales");
            });

        }, 100);
    }
};