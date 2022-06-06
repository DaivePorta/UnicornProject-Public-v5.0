
var NOMRCOM = function () {

    let flagTb = false;
    let oCentroCostoCab = [];
    let aoNiveles = [];
    let fnCargarParametros = function(psPlanCostos) { aoNiveles = CargarNivelesCentroCostos(psPlanCostos);};
    let CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    let plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $('#cboEmpleado').select2();
    };

    let eventoControles = function () {

        $('#cboRque').on('change', function () {

            if (flagTb) {
                if (oTableActividad.fnGetData().length != 0) {

                    //$('#detalle').DataTable().data().clear().draw()
                    // $('#detalle').dataTable().fnClearTable();
                    oTableActividad.fnClearTable();
                }
            }

            if ($('#cboRque').val() == '5') {

                limpiar();
                Bloquear($($("#txtdescprod").parents("div")[2]));
                $("#txtdescprod").remove();
                $("#input_desc_prod").html("<input class='span12' type='text' id='txtdescprod' name='txtdescprod'>");

                setTimeout(function () {
                    fillTxtProducto('#txtdescprod', '');

                }, 1000)
            } else {

                limpiar();
                Bloquear($($("#txtdescprod").parents("div")[2]));
                $("#txtdescprod").remove();
                $("#input_desc_prod").html("<input class='span12' type='text' id='txtdescprod' name='txtdescprod'>");

                setTimeout(function () {
                    fillTxtProducto('#txtdescprod', '');
                }, 1000)
            }

        });

        var emp_ant = ""
        $('#cboEmpresas').on('change', function () {
            if (emp_ant != $(this).val()) {
                fillCboEstablecimiento($('#cboEmpresas').val());
                //Genera_Centro_Costos();

                var codigo = ObtenerQueryString('codigo');
                if (codigo === undefined) {
                    Bloquear($($("#txtdescprod").parents("div")[2]));
                    $("#txtdescprod").remove();
                    $("#input_desc_prod").html("<input class='span12' type='text' id='txtdescprod' name='txtdescprod'>");

                    setTimeout(function () {
                        fillTxtProducto('#txtdescprod', '');
                    }, 1000)
                }

                oTableActividad.fnClearTable();
                limpiar();
                emp_ant = $(this).val();
            } emp_ant = $(this).val();
            fnlimpiaCentroCostos();
        });
                
        $('#idRegis').on('click', function () {
            REGISTRAR();
        });

        $("#btn_new_cc").on('click', function () {
            GrabarDet();
        });

        $("#btnRefrescarProd").on('click', function () {
            CargaProductos();
        }); 


        var lastPattern = '';
 
        $('#cboEstablecimiento').on('change', function () {
            
        });

    };

    var GrabarDet = function () {

        if (!vErrors(["txtcodprod", "txtdescprod", "txtcant", "txtUnidad"])) {
            return;
        }

        if ($('#txtcant').val() == "") {
            infoCustom("Ingrese Cantidad");
        }
        else {
            var a = {
                "CODIGO": $('#txtcodprod').val(),
                "DES_PRODUCTO": $('#txtdescprod').val(),
                "UNIDAD_MEDIDAD": $('#txtUnidad').val(),
                "CODIGO_MEDIDAD": $('#txtUnidad').data("codunidad"),
                "CANTIDAD": $('#txtcant').val(),
                "FECHA_REQ": $("#txtFecha").val()
            }

            var ar = oTableActividad.fnGetData();
            var flag = false;
            ar.filter(function (e, f) {
                if (e.CODIGO == $('#txtcodprod').val()) {
                    alertCustom("Producto Repetido")
                    flag = true;
                }
            });
            if (!flag) {
                oTableActividad.fnAddData(a);
                limpiar();
            }
        }
    };

    var REGISTRAR = function () {

        if (oTableActividad.fnGetData().length === 0) {
            infoCustom("Debe agreguar detalle de productos.");
            return;
        }

        if (!vErrors(["cboEmpresas", "cboEstablecimiento", "txtFecha", "cboEmpleado", "cbPrioridad", "cboRque", "txt_centro_costo", "txtGlosa"])) {
            return;
        }
    
        let aoDetalle = [];        
        $('#detalle tbody').children().each(function (i) {
            let pos = oTableActividad.fnGetPosition(this);
            let row = oTableActividad.fnGetData(pos);

            let oDetalle = {};
            oDetalle.p_CODE_PROD = row.CODIGO;
            oDetalle.p_CANTIDAD = row.CANTIDAD;
            oDetalle.p_CODE_UNM = row.CODIGO_MEDIDAD;
            oDetalle.p_FECHA_REQ = row.FECHA_REQ;            

            aoDetalle.push(oDetalle);
        });
        
        var data = new FormData;
        data.append('p_SOLICITA', $('#cboEmpleado').val());
        data.append('p_FECHA', $('#txtFecha').val());
        data.append('p_PRIORIDAD', $('#cbPrioridad').val());
        data.append('p_TIPOREQ', $('#cboRque').val());
        data.append('p_GLOSA', Enter_MYSQL($("#txtGlosa").val()));
        data.append('p_CATALOGO', $("#cboEmpresas").val());
        data.append('p_ESTABLECIMIENTO', $("#cboEstablecimiento").val());
        data.append('p_CECC_CODE', $("#txt_centro_costo").data("CodCentroCostoCab"));
        data.append('p_CECD_CODE', $("#txt_centro_costo").data("CodCentroCosto"));
        data.append('p_CODEUSU', $('#ctl00_txtus').val());
        
        data.append('sJSONDetalle', JSON.stringify(aoDetalle));

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=6",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");

                if (datos.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (datos.indexOf("[Error]:") > -1) {
                    alertCustom("Error al intentar Guardar.");
                    return;
                }
                                
                $('#txtRequi').val(datos)
                exito();

                window.location.href = '?f=NOMRCOM&codigo=' + datos;
                $("#idRegis").remove();
            },
            error: function (msg) {
                alertCustom(msg.d);
                Desbloquear("ventana");
            }
        });

    };

    var fnlimpiaCentroCostos = function () {
        $("#txt_centro_costo").val('');
        $("#txt_centro_costo").data("CodCentroCostoCab", '');
        $("#txt_centro_costo").data("CodCentroCosto", '');
    };
            
    var cargaInicial = function () {
       
        $("#txtFecha").attr('disabled', true);
    
        $("#txtRequi").attr('disabled', true);
        $("#txtUnidad").attr('disabled', true);
        $("#txtcodprod").attr('disabled', true);
        $("#txtFecha").datepicker("setDate", "now")



    };

    var tabla = function () {
        var parms = {
            data: null,
            paging: false,
            filter: false,
            columns: [
                { data: "CODIGO" },
                { data: "DES_PRODUCTO" },
                { data: "UNIDAD_MEDIDAD" },
                { data: "CODIGO_MEDIDAD" },
                { data: "CANTIDAD" },
                { data: "FECHA_REQ" },
                 {
                     data: null,
                     defaultContent: '<a  class="btn red eliminar" title="Eliminar detalle"><i class="icon-trash"></i></a>',
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ]

        }
        oTableActividad = iniciaTabla('detalle', parms);
        $('#detalle').removeAttr('style');

        flagTb = true;
        $('#detalle tbody').on('click', '.eliminar', function () {
            var pos = oTableActividad.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableActividad.fnGetData(pos);
            oTableActividad.fnDeleteRow(pos);
        });

    }

    function cantidad() {
        var canti = document.getElementById("detalle").rows.length;
        //alert(canti)
    }

    var cargarPOS = function () {
        var codigo = ObtenerQueryString('codigo');

        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=9&p_CODEUSU=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {

                        $('#cboEmpresas').select2('val', data[0].CATALOGO).change();
                        $('#cboEstablecimiento').select2('val', data[0].ESTABLECIMIENTO).change();
                        $('#txtRequi').val(data[0].CODIGO);
                        $('#txtFecha').val(data[0].FECHA);

                        $('#cboEmpleado').val(data[0].SOLICITANTE).change();
            

                        $('#cbPrioridad').select2('val', data[0].PRIORIDAD);
                        $('#cboRque').select2('val', data[0].TIPOREQUE);


                        $('#txt_centro_costo').val(data[0].CENTRO_COSTOS);
                        

                        $('#txtGlosa').val(data[0].GLOSA);

                        $('#div select').attr('disabled', true);
                        $('#div input').attr('disabled', true);
                        $('#div textarea').attr('disabled', true);
                        $('#oculta').remove();

                        listarDetalle(data[0].CODIGO);
                        generarHtmlImpresion();
                        $('#btnMail').removeClass('hidden');
                        $('#btnBuscarCentroCto').hide()
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

    var generarHtmlImpresion = function () {
        htmltabla = '<table class="table table-bordered">' + $("#tblbmodal").html().toString() + '</table>';
    };

    $('#btnMail').click(function (e) {
        e.preventDefault();
        var cadena = '';
        for (var i = 0 ; i < $("#div_cc").children().find("select").length ; i++) {

            cadena += '<b>' + $($("#div_cc").children().find("label:not(.select2-offscreen)")[i]).text() + ':</b>&nbsp;'
            cadena += $($("#div_cc").children().find("select option:selected")[i]).text() + '&nbsp;&nbsp;-&nbsp;&nbsp;'
        }
        cadena += "}"
        cadena = cadena.replace("-&nbsp;&nbsp;}", "")
        var cuerpo = '<div class="row-fluid">\
                                    <div class="span2"><div class="control-group"><label class="control-label">De:</label></div></div>\
                                    <div class="span10">\
                                        <div class="control-group">\
                                            <div class="controls"><input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden"></div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row-fluid" style="padding-bottom: 10px">\
                                    <div class="span2"><div class="control-group"><label class="control-label">Para:</label></div></div>\
                                    <div class="span10" >\
                                        <div class="control-group">\
                                            <div class="controls"><select multiple class="span12" id="cboCorreos"></select></div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row-fluid">\
                                    <div class="span2"><div class="control-group"><label class="control-label">Asunto:</label></div></div>\
                                    <div class="span10">\
                                        <div class="control-group">\
                                            <div class="controls"><input type="text" id="txtAsunto" class="span12" value="Requerimiento de ' + $('#cboRque option:selected').html() + ' para el Area de ' + $('#cboArea :selected').text() + '"></div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row-fluid">\
                                    <div class="span12" style="padding: 10px; border: thin inset">\
                                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">\
                                        <h4>' + $('#cboEmpresas :selected').text() + '</h4>\
                                        <h5> Establecimiento: ' + $('#cboEstablecimiento :selected').text() + '</h5>\
                                        <h6><strong>EMISION:</strong> ' + $('#txtFecha').val() + '</h6>\
                                        <h6><strong>SOLICITANTE:</strong> ' + $('#cboEmpleado :selected').text() + '</h6>\
                                        <h6><strong></strong> </h6>\
                                        <h6><strong>Nro. Requisición: </strong>' + $('#txtRequi').val() + '</h6>\ ' +

                                       cadena +


                                          ' </h6>\
                                        <h6><strong>GLOSA: </strong>' + $('#txtGlosa').val() + '</h6>\
                                        <div class="row-fluid"><div class="span12" style="overflow-x: scroll;">' + htmltabla + '</div></div>\
                                   </div>\
                                </div>';
        crearmodal('divMail', 'Redactar correo electrónico', cuerpo, '<button id="btnEnviarCorreo" class="btn green" onclick="enviarCorreo()"><i class="icon-plane"></i>&nbsp;Enviar</button>');
        cargarCorreos();
        $('#cboCorreos').select2();
        $('#divMail').css('width', '55%');
        $('#divMail').modal('show');
    });

    $('#cboALmc_tranf').change(function () {
        $('#txtorigenT').val($('#cboALmc_tranf :selected').attr('direccion'));
    });

    function listarDetalle(detalle) {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=10&p_CODEDETALLE=" + detalle + "&P_ESTADO=" + '',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null) {
                    $('#tblProductos').html(datos);
                    //  iniciaTabla("tblbmodal");
                    $("#tblbmodal").dataTable();

                    /* $("#tblbmodal").DataTable({
                         "scrollX": "true",
                         "sPaginationType": "full_numbers"
                     });*/
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alertCustom("Detalle no se listó correctamente");
            }
        });
    }

    function CargaProductos() {

        //CARGA PRODUCTOS
        Bloquear($($("#txtdescprod").parents("div")[2]));
        $("#txtdescprod").remove();
        $("#input_desc_prod").html("<input class='span12' type='text' id='txtdescprod' name='txtdescprod'>");

        setTimeout(function () {
            fillTxtProducto('#txtdescprod', '');
        }, 1000)
    }

    function fillTxtProducto(v_ID, v_value) {
        var seriado = ''
        var almacenable = 'S'
        if ($("#cboRque").val() == '5') {
            seriado = 'N'
            almacenable = 'N'
        }

        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomrcom.ashx?OPCION=LPROD2&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=" + seriado +
            "&p_ALMACENABLE_IND=" + almacenable,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    selectRazonSocial.typeahead({
                        items: 100,
                        source: function (query, process) {
                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].NOMBRE_COMERCIAL);
                                obj += '{';
                                obj += '"NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL + '","CODIGO":"' + datos[i].CODIGO + '","UNIDAD":"' + datos[i].UNIDAD + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_COMERCIAL] = objeto;
                            });
                            process(array);

                        },
                        updater: function (item) {

                            $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                            $("#txtUnidad").data("codunidad", map[item].UNIDAD);

                            $("#txtcodprod").val(map[item].CODIGO);
                            //$("#hdcodUNI").val(map[item].UNIDAD);

                            return item;
                        },
                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width")).css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        if ($(this).val().length == 0) {
                            $("#txtUnidad").val('');
                            $("#txtUnidad").data("codunidad", "");
                            $("#txtcodprod").val('');
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
                Desbloquear($($("#txtdescprod").parents("div")[2]));
            },
            error: function (msg) {
                alertCustom("Productos no se listaron correctamente");
                Desbloquear($($("#txtdescprod").parents("div")[2]));
            }
        });

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
                    $("#cboEmpresas").change()
                } else {
                    $("#cboEmpresas").select2("val", "");
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };

    var fillCboEstablecimiento = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                //$('#slcSucural').append('<option value="T">TODOS</option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

                    } else {
                        $("#cboEstablecimiento").select2("val", "");
                    }
                }
                else {
                    noexito();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
                Desbloquear("ventana");
            }
        });
    }


    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val() + "&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value =""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '').change();
                }
            },
            error: function (msg) {
                noexitoCustom('Error al cargar empleados.');
            }
        });
    };

    var limpiar = function () {
        $('#txtcodprod').val("");
        $('#txtdescprod').val("");
        $('#txtUnidad').val("");
        $('#txtUnidad').data("codunidad", "");
        $('#txtcant').val("");
    }


    return {
        init: function () {
            plugins();
            tabla();
            eventoControles();
            fillCboEmpresa();
            fillCboEmpleado();
            cargaInicial();
            cargarPOS();            
        }
    };

}();


//EMAIL
function cargarCorreos() {
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        for (var u in data) {
            if (data[u].usuario === $('#ctl00_txtus').val()) {
                $('#txtRemitente').val(data[u].email);
                $('#txtNRemitente').val(data[u].Nombres);
                break;
            }
        }
        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                    '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alert('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');
    });

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {

        var cadena = '';
        for (var i = 0 ; i < $("#div_cc").children().find("select").length ; i++) {

            cadena += $($("#div_cc").children().find("label:not(.select2-offscreen)")[i]).text() + ':'
            cadena += $($("#div_cc").children().find("select option:selected")[i]).text() + ','
        }
        cadena += "}"
        cadena = cadena.replace(",}", "")

        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
                "&NREMITENTE=" + $('#txtNRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val() +
                "&EMPRESA=" + $('#cboEmpresas option:selected').html() +
                "&ESTABLECI=" + $('#cboEstablecimiento option:selected').html() +
                "&SOLICITANTE=" + $('#cboEmpleado :selected').text() +
                "&NUM_DOC_ORIGEN=" + $('#txtRequi').val() +
                "&centro_costo=" + cadena +
                //"&Cseccion=" + $('#cboSeccion option:selected').html() +
                //"&Cproceso=" + $('#cboProceso option:selected').html() +
                //"&Cactividad=" + $('#cboActividad option:selected').html() +
                "&GLOSA=" + $('#txtGlosa').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("Correo no se envió correctamente.");
                } else {
                    exito();
                }
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);

            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });

    }
};

function ENVIAGLOSA(codigoCaja) {

    var glosa = $('#txt_' + codigoCaja).val();

    var data = new FormData;
    data.append('P_CODE_DETA', codigoCaja);
    data.append('P_GLOSA_DETA', glosa);
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=11",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            exito();
            window.location.href = '?f=NOMRCOM&codigo=' + $('#txtRequi').val();
        },
        error: function (msg) {
            alertCustom(msg.d);
        }
    });
}


