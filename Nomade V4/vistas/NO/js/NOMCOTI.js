
/***VARIABLES*************************/
seleccionados = [], posSeleccionados = [], selecCotizados = [], posSelectCotizados = [];
/***VARIABLES*************************/
nohayproveedores = false;
contador = 0;

var NOLCOTI = function () {
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $("#cbo_tip_sol").select2();
    }

    var fillBandejaSolCot = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "NRO_SOLICITUD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({ 'text-align': 'left', 'text-transform': 'uppercase' })
                    }
                },
                {
                    data: "FECHA_TRAN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
             {
                 data: "DESC_EST_COMPLETADO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             }
            ]
        }

        oTableSolCot = iniciaTabla('tbl_cot', parms);
        $('#tbl_cot').removeAttr('style');
        $('#tbl_cot tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableSolCot.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableSolCot.fnGetPosition(this);
                var row = oTableSolCot.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=nomcoti&codigo=' + CODIGO;
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
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear($('#slcSucural').parent().parent().parent())
                ListarSucursales($('#slcEmpresa').val());
                emp_ant = $(this).val();
                // $("#cbo_tip_sol").select2("val", "").change();
                //  ListaSolCotizacion();
            } else { emp_ant = ""; }
        });

        $('#btn_listar').on('click', function () {
            if (vErrors(["slcEmpresa", "slcSucural"])) {
                ListaSolCotizacion();
            }
        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#slcSucural").select2("val", datos[0].CODIGO);
                    }
                    Desbloquear($('#slcSucural').parent().parent().parent())
                }
                else {
                    noexito();
                    Desbloquear($('#slcSucural').parent().parent().parent())
                }
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var ListaSolCotizacion = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=0&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&TIPO_COTI=E",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val(datos);
                    //var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
                    oTableSolCot.fnClearTable();
                    oTableSolCot.fnAddData(datos);
                }
                else {
                    //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val("");
                    oTableSolCot.fnClearTable();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom("Solicitudes de cotizaciones no se listaron correctamente");
                Desbloquear("ventana");
            }
        });
    }
    return {
        init: function () {
            plugins();
            fillBandejaSolCot();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            ListaSolCotizacion();
        }
    };

}();

var NOMCOTI = function () {
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $("#cbo_tipo_prov").select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $("#completar").attr("style", "display:none");
        // $("#txt_forma_pago").inputmask({ "mask": "n" });
        //$("#txt_forma_pago").inputmask("N");
    }
 
    var Listar_Requerimeintos_Compra = function () {
        //$("#slcEmpresa").val(),$('#slcSucural').val()
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomreqc.ashx?OPCION=133&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&EST_COTI=" + "1",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTbl_requerimientos.fnClearTable()
                if (!isEmpty(datos)) {
                    oTbl_requerimientos.fnAddData(datos);
                    $("#modal_info").modal("show")
                }
                else {
                    //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val("");
                    //oTableTReqPedidos.fnClearTable();
                    infoCustom2("NO HAY DATOS PARA MOSTRAR")
                }

                Desbloquear("ventana")
            },
            error: function (msg) {
                alertCustom("Requerimientos de compra no se listaron correctamente")
                Desbloquear("ventana")
            }

        });
    }

    var fillBandejaReqCompra = function () {

        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "order": [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({ 'text-align': 'left', 'text-transform': 'uppercase' })
                    }
                },
                {
                    data: "FECHA_TRAN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }
            ]
        }

        oTbl_requerimientos = $('#tbl_requerimiento').dataTable(parms);
        $('#tbl_requerimiento').removeAttr('style');

        $('#tbl_requerimiento tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).parent().find("tr").attr("class", "")
                $(this).addClass('selected');
                var pos = oTbl_requerimientos.fnGetPosition(this);
                var row = oTbl_requerimientos.fnGetData(pos);

                $("#td_codreq").html(row.CODIGO)
                $("#td_desreq").html(row.NOMBRE)
                $("#td_fecha").html(row.FECHA_TRAN)
                Add_Requerieminto_cotizacion(row.CODIGO);
                $("#hfreq").val(row.CODIGO);
                $("#modal_info").modal("hide")
            }
        });

    }

    var fillBandejaDetalleReq = function () {
        
        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "order": [[0, "desc"]],
            columns: [
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }, {
                    data: "PROD_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                        $(td).html('<input id="Desc' + rowData.COD_PROD + '" class="form-control span8 Pdesc"/>');
                        $(td).children("#Desc" + rowData.COD_PROD).val(rowData.PROD_DESC);

                        desc_ref = '';
                        $(td).children(".Pdesc").focus(function () {
                            prec_ref = $(this).val();
                            $(td).children(".Pdesc").val(rowData.PROD_DESC);
                        });

                        $(td).children(".Pdesc").blur(function () {
                            if ($(this).val() == "") {
                                $(td).children(".Pdesc").val(prec_ref);
                                prec_ref = '';
                            }
                            else {
                                rowData.PROD_DESC = $.trim($(this).val());                                
                                $(td).children(".Pdesc").val($(this).val());
                                prec_ref = '';
                            }
                        });

                    }
                }, {
                    data: "PRECIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html('<input type="text" id="Prec' + rowData.COD_PROD + '" class="Cprec span12 bloquear" onkeypress="return ValidaDecimales(event,this)"/>');
                        $(td).children("#Prec" + rowData.COD_PROD).val(formatoMiles(parseFloat(rowData.PRECIO)));

                        prec_ref = 0;
                        $(td).children(".Cprec").focus(function () {
                            prec_ref = $(this).val();                            
                            $(td).children(".Cprec").val("");
                        });

                        $(td).children(".Cprec").blur(function () {
                            if ($(this).val() == "") {
                                $(td).children(".Cprec").val(formatoMiles(prec_ref.split(",").join("")));
                                prec_ref = 0;
                            }
                            else {
                                rowData.PRECIO = $.trim($(this).val());
                                rowData.PRECIO = parseFloat(rowData.PRECIO).Redondear(2);
                                rowData.TOTAL = (parseFloat(rowData.CANTIDAD) * parseFloat(rowData.PRECIO)).Redondear(2);
                                $("#" + rowData.COD_PROD + "total").html(formatoMiles(($(this).val() * rowData.CANTIDAD).toFixed(2)));
                                $(td).children(".Cprec").val(formatoMiles($(this).val()));
                                prec_ref = 0;
                            }
                        });
                        rowData.PRECIO = parseFloat(rowData.PRECIO).Redondear(2);
                        rowData.TOTAL = (parseFloat(rowData.CANTIDAD) * parseFloat(rowData.PRECIO)).Redondear(2);
                    }
                }, {
                    data: "TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("id", "" + rowData.COD_PROD + "total");
                        //var total = parseFloat(rowData.CANTIDAD) * parseFloat(rowData.PRECIO);
                        //$(td).html(formatoMiles(total));

                    }
                   
                }
            ]
        }

        otbl_detalle_req = $('#tbl_detalle_req').dataTable(parms);
        $('#tbl_detalle_req').removeAttr('style');
    }

    var fillBandejaGruProveedor = function () {

        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            responsive: true,
            columns: [
                 {
                     data: null,
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center');
                         $(td).html('D.N.I<br>R.U.C')
                     }
                 }, {
                     data: null,
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center');
                         var dni = '', ruc = '';
                         if (rowData.DNI === "") { dni = "-" } else { dni = rowData.DNI }
                         if (rowData.RUC === "") { ruc = "-" } else { ruc = rowData.RUC }
                         $(td).html(dni + "<br>" + ruc)
                     }
                 }, {
                     data: "RAZON_SOCIAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center')
                     }
                 }, {
                     data: "CORREO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css({ 'text-align': 'left', 'text-transform': 'uppercase' })
                         var html = $(td).html().fnReplaceAll(",", "<br>")
                         $(td).html(html);
                     }
                 }
            ]
        }

        otbl_grup_prov = $('#tbl_grup_prov').dataTable(parms);
        $('#tbl_grup_prov').removeAttr('style');
    }

    var fillcboTipoProv = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=1&EST_IND=" + "A" + "&TIPO=" + "NORMAL",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_prov').empty();
                $('#cbo_tipo_prov').append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_tipo_prov').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                } else {
                    infoCustom("No existen grupos de Proveedores")
                }
                $('#cbo_tipo_prov').select2("val", "").change()
                Desbloquear($("#cbo_tipo_prov").parent().parent().parent())
            },
            error: function (msg) {
                alertCustom("Grupos de proveedores no se listaron correctamente")
                Desbloquear($("#cbo_tipo_prov").parent().parent().parent())
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
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {

            Bloquear($("#slcSucural").parent().parent().parent())
            if (emp_ant != $(this).val()) {
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 100)

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#btn_imprime').on('click', function () {
            window.print();
        });

        $('#btn_ver_proveedores').on('click', function () {
            if (vErrors("cbo_tipo_prov")) {
                $("#lbl_grupo_prov").html($("#cbo_tipo_prov option:selected").text());
                $("#modal_proveedores").modal("show");
                $("#tbl_grup_prov").css({ "width": ($("#modal_proveedores .modal-body").width() - 30) })

            }
        });

        var tipo_prov_ant = ""
        $('#cbo_tipo_prov').on('change', function () {
            if ($(this).val() !== "") {

                if (tipo_prov_ant != $(this).val()) {
                    Bloquear($("#cbo_tipo_prov").parent().parent().parent())
                    setTimeout(function () {
                        ListaGrupoProv();
                    }, 100)

                    tipo_prov_ant = $(this).val();
                } else { tipo_prov_ant = ""; }
            } else { tipo_prov_ant = "" }
        });

        $('#btn_agregar_proveedores').on('click', function () {
            window.location.href = '?f=ncmgpro';
        });

        $('#btn_ver_prov').on('click', function () {
            window.location.href = '?f=NRLGEPR';
        });

        $('#btn_ver_req').on('click', function () {
            Bloquear("ventana")
            setTimeout(function () {
                Listar_Requerimeintos_Compra();
                $("#txt_forma_pago").val("")
                $("#txt_plazo_entrega").val("")
                $("#txt_lugar_entrega").val("")
            }, 1000)
        });

        $('#btn_actualizar').on('click', function () {
            Bloquear($("#cbo_tipo_prov").parent().parent().parent())
            setTimeout(function () {
                fillcboTipoProv();
            }, 100)
        });

        $('#guardar').on('click', function () {

            if (otbl_detalle_req.fnGetData().length <= 0) {
                infoCustom("Debe seleccionar al menos un requerimiento!")
                return;
            }

            if (vErrors(["txt_descripcion", "cbo_tipo_prov", "slcSucural", "slcEmpresa", "txtFecTransaccion"])) {

                if (otbl_grup_prov.fnGetData().length <= 0) {
                    infoCustom("No existe ningún proveedor en el grupo, por favor registrar proveedores en el grupo.")
                    return;
                }
                for (var i = 0 ; i < otbl_grup_prov.fnGetData().length; i++) {

                    if (otbl_grup_prov.fnGetData()[i].CORREO === "") {
                        infoCustom("Se encontró un proveedor sin correo en el grupo, por favor agregue un correo al proveedor " + otbl_grup_prov.fnGetData()[i].RAZON_SOCIAL)
                        return;
                    }
                }
                $("#modal_condiciones").modal("show")
            }
        });

        $('#btn_continuar').on('click', function () {
            $(this).blur()
            if (vErrors(["txt_forma_pago", "txt_plazo_entrega", "txt_lugar_entrega"])) {
                $("#modal_condiciones").modal('hide')
                $("#EnviaCorreo").modal("show")
                $("#td_fopa").html($("#txt_forma_pago").val())
                $("#td_plazo").html($("#txt_plazo_entrega").val())
                $("#td_lugar").html($("#txt_lugar_entrega").val())

                $("#tabla_prov_envio_mail").html("")
                $("#tabla_prov_envio_mail").append('<td colspan="2" style="text-align:left;font-weight:bolder;background-color :#eee; ">PROVEEDORES ENVIÓ COTIZACION :</td>')
                for (var i = 0 ; i < otbl_grup_prov.fnGetData().length ; i++) {
                    $("#tabla_prov_envio_mail").append("<tr><td>" + otbl_grup_prov.fnGetData()[i].RAZON_SOCIAL + "</td><td>" + otbl_grup_prov.fnGetData()[i].CORREO + "</td></tr>")
                }
            }
        });

        $('#btn_aceptar').on('click', function () {
            $(this).blur()
            Bloquear("ventana");
            Guardar()
        });

        $('#btnMail').on('click', function () {
            $("#EnviaCorreo2").modal("show")
        });

        $('#btn_aceptar2').on('click', function () {
            $(this).blur()
            Bloquear("ventana");
            setTimeout(function () {
                EnviaCorreo("SOPORTE@ORBITUM.ORG", "DEL SISTEMA ADMINISTRADOR", $("#hfcorreos").val());
            }, 1000)
        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#slcSucural").select2("val", datos[0].CODIGO);
                    }
                }
                else {
                    noexito();
                }

                Desbloquear($("#slcSucural").parent().parent().parent())

            },
            error: function (msg) {
                alertCustom("Error al listar establecimientos")
                Desbloquear($("#slcSucural").parent().parent().parent())
            }
        });
    }

    var ListaReqCompractlgxscsl = function (CODE_REQ) {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomreqc.ashx?OPCION=13&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&CODE_REQ=" + CODE_REQ,
            //contenttype: "application/json;",
            //datatype: "json",
            async: true,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    // $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val(datos);
                    var json = jQuery.parseJSON(datos);

                    $("#td_codreq").html(json[0].CODIGO);
                    $("#td_desreq").html(json[0].NOMBRE);
                    $("#td_fecha").html(json[0].FECHA_TRAN);
                }
                else {
                }
            },
            error: function (msg) {
                noexito()
            }
        });
    }

    var ListaSolCotDetalle = function (CODIGO) {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomcoti.ashx?OPCION=2&CODIGO=" + CODIGO + "&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                otbl_detalle_req.fnClearTable();
                if (!isEmpty(datos)) {
                    otbl_detalle_req.fnAddData(datos);
                }
                else {
                    noexito()
                }
            },
            error: function (msg) {
                noexito()
            }
        });
    }

    var CargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {
            var data = new FormData();
            data.append('OPCION', '0');
            data.append('CODIGO', CODE);
            $.ajax({

                url: "vistas/no/ajax/nomcoti.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (!isEmpty(datos)) {
                        //$("#cbo_tipo_sol").attr("disabled", true);
                        //$("#slcEmpresa").attr("disabled", true);
                        //$("#slcSucural").attr("disabled", true);
                        //$("#guardar").html("<i class='icon-pencil'></i>   Modificar");
                        //$("#guardar").attr("href", "javascript:Modificar();");
                        //$('#txt_num_sol_coti').val(datos[0].NRO_SOLICITUD);
                        //$('#txtFecTransaccion').val(datos[0].FECHA_TRAN);
                        //$('#txt_descripcion').val(datos[0].DESCRIPCION);
                        //$("#slcEmpresa").select2("val", datos[0].CTLG_CODE);
                        //$("#slcSucural").select2("val", datos[0].SCSL_CODE);
                        //$("#cbo_tipo_prov").select2("val", datos[0].TIPO_PROV);
                        //$("#txt_forma_pago").val((datos[0].CONDICIONES).split("%")[0]);
                        //$("#txt_plazo_entrega").val((datos[0].CONDICIONES).split("%")[1]);
                        //$("#txt_lugar_entrega").val((datos[0].CONDICIONES).split("%")[2]);
                        //$("#completar").attr("style", "");
                        //$("#cbo_tipo_sol").select2("val", datos[0].TIPO_COTI_BS).change();

                        //if (datos[0].EST_COMPLETADO == "S") {

                        //    oTableTReqPedidos.fnClearTable();
                        //    oTableTReqPedidos.fnDestroy();
                        //    $("#tbl_req_pedidos").parent().remove();
                        //    $("#add").parent().remove();
                        //    $(".bloquear").attr("disabled", true);
                        //    $(".Cprec").attr("disabled", true);
                        //    $("#acciones_generales").remove();
                        //    $("#tbl_cotizados").parent().parent().parent().parent().attr("class", "span12")
                        //    oTableTcotizados.fnDraw()
                        //    oTableTcotizados.fnSetColumnVis(0, false);

                        //}
                        ListaSolCotDetalle(CODE);
                        ListaReqCompractlgxscsl(datos[0].CODIGO_REQ)
                        $("#div_informacion").css("display", "block")
                        $(".bloquear").attr("disabled", true)
                        $(".Cprec").attr("disabled", true)
                        $(".Pdesc").attr("disabled", true)
                        
                        $("#acciones_generales").remove();
                        $("#btn_ver_req").remove()
                        $("#btnOrigen").remove()

                        $('#txt_num_sol_coti').val(datos[0].NRO_SOLICITUD);
                        $('#txtFecTransaccion').val(datos[0].FECHA_TRAN);
                        $('#txt_descripcion').val(datos[0].DESCRIPCION);
                        $("#slcEmpresa").select2("val", datos[0].CTLG_CODE).change();
                        $("#slcSucural").select2("val", datos[0].SCSL_CODE);


                        $("#td_fopa").html((datos[0].CONDICIONES).split("%")[0])
                        $("#td_plazo").html((datos[0].CONDICIONES).split("%")[1])
                        $("#td_lugar").html((datos[0].CONDICIONES).split("%")[2])

                        $("#cbo_tipo_prov").select2("val", datos[0].TIPO_PROV);

                        $("#tabla_prov_envio_mail").html("")
                        $("#tabla_prov_envio_mail").append('<td colspan="2" style="text-align:left;font-weight:bolder;background-color :#eee; ">PROVEEDORES ENVIÓ COTIZACION :</td>')
                        for (var i = 0 ; i < (datos[0].PROV_CORREOS).split(",").length ; i++) {

                            $("#tabla_prov_envio_mail").append("<tr><td>" + (datos[0].PROV_CORREOS).split(",")[i] + "</td></tr>")
                        }

                        $("#imprime").html(ArmaTabla_Imprimir());
                        $("#btn_imprime").css("display", "");
                        $("#btnMail").css("display", "");
                        $("#entrega").html((datos[0].CONDICIONES).split("%")[2])
                        $("#plazo").html((datos[0].CONDICIONES).split("%")[1])
                        $("#forma").html((datos[0].CONDICIONES).split("%")[0])
                        $("#hfcorreos").val(datos[0].CORREOS)


                        $("#txt_forma_pago").val((datos[0].CONDICIONES).split("%")[0])
                        $("#txt_plazo_entrega").val((datos[0].CONDICIONES).split("%")[1])
                        $("#txt_lugar_entrega").val((datos[0].CONDICIONES).split("%")[2])

                    }
                    else { noexito(); }
                }
            });
        }
    }

    return {
        init: function () {
            plugins();
            fillBandejaReqCompra();
            fillBandejaDetalleReq();
            fillBandejaGruProveedor();
            //fillBandejaSolCotizacion();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            fillcboTipoProv();
            eventoControles();
            //ListaReqCompra();
            //funcionalidadTabla();
            CargaInicial();
            //crearmodal("prueba", "Grupo Proveedores", "", "");
        }
    };

}();

function Add_Requerieminto_cotizacion(cod_req) {

    Bloquear("tbl_detalle_req")
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=11&CODE_REQ_USUA=" + cod_req,
        async: true,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            otbl_detalle_req.fnClearTable();

            if (!isEmpty(datos)) {            
                otbl_detalle_req.fnAddData(datos);                

            } else {
                infoCustom2("No existen datos que mostrar!")
            }
            Desbloquear("tbl_detalle_req")
        },
        error: function (msg) {
            Desbloquear("tbl_detalle_req")
            alertCustom("Error al listar detalle del requerimiento!")
        }
    });
}


var ListaGrupoProv = function () {

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmgpro.ashx?OPCION=8&GRUP_CODE=" + $("#cbo_tipo_prov").val(),
        async: true,
        success: function (datos) {
            otbl_grup_prov.fnClearTable();
            if (!isEmpty(datos)) {
                otbl_grup_prov.fnAddData(datos)
            } else {
                //  alertCustom("No hay datos para mostrar!")
            }
            //console.log(datos)
            Desbloquear($("#cbo_tipo_prov").parent().parent().parent())
        },
        error: function (msg) {
            alertCustom("Error al listar grupo de proveedores!")
            Desbloquear($("#cbo_tipo_prov").parent().parent().parent())
        }
    });

}

var Guardar = function () {
    var DESC = '';
    var USUA_ID = '';
    var FECHA_TRAN = '';
    var TIPO_PROV = '';
    var CTLG_CODE = '';
    var SCSL_CODE = '';
    var CADENA = ArmaString();
    var CONDICIONES = "";
    var COD_REQ = "";
    var TIPO_COTI_BS = "B";
    var p_PROV_CORREOS = ArmaPidmCorreos();
    var p_CORREOS = ArmaCorreos();
 
    DESC = $.trim($('#txt_descripcion').val());
    USUA_ID = $.trim($('#ctl00_txtus').val());
    FECHA_TRAN = $.trim($('#txtFecTransaccion').val());
    TIPO_PROV = $.trim($('#cbo_tipo_prov').val());
    SCSL_CODE = $.trim($('#slcSucural').val());
    CTLG_CODE = $.trim($('#slcEmpresa').val());
    CONDICIONES = $("#txt_forma_pago").val() + "%" + $("#txt_plazo_entrega").val() + "%" + $("#txt_lugar_entrega").val()
    COD_REQ = $("#hfreq").val();

    var data = new FormData();

    data.append("OPCION", "G");
    data.append("DESC", DESC);
    data.append("USUA_ID", USUA_ID);
    data.append("FECHA_TRAN", FECHA_TRAN);
    data.append("TIPO_PROV", TIPO_PROV);
    data.append("SCSL_CODE", SCSL_CODE);
    data.append("CTLG_CODE", CTLG_CODE);
    data.append("TIPO_COTI", "E");
    data.append("CONDICIONES", CONDICIONES);
    data.append("DATA", CADENA);
    data.append("p_COD_REQ", COD_REQ);
    data.append("TIPO_COTI_BS", TIPO_COTI_BS);
    data.append("p_PROV_CORREOS", p_PROV_CORREOS);
    data.append("p_CORREOS", p_CORREOS);

    //if (CADENA != "}") {
    //    if (vErrors(["txt_descripcion", "cbo_tipo_prov", "slcSucural", "slcEmpresa", "txtFecTransaccion", "txt_forma_pago", "txt_plazo_entrega", "txt_lugar_entrega"])) {
    //        Bloquear("ventana");
    $.ajax({
        url: "vistas/no/ajax/NOMCOTI.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {

            if (!isEmpty(datos)) {
                var res = datos.split(";");
                if (res[0] == "OK") {
                    $("#div_informacion").css("display", "block")
                    $(".bloquear").attr("disabled", true)
                    $("#acciones_generales").remove();
                    $("#btn_ver_req").remove()
                    $("#btnOrigen").remove()
                    $("#txt_num_sol_coti").val(res[4]);
                    //$("#guardar").html("<i class='icon-pencil'></i>   Modificar");
                    //$("#guardar").attr("href", "javascript:Modificar();");
                    //$("#completar").removeAttr("style");
                    //$("#cbo_tipo_sol").attr("disabled", true);
                    //$("#slcEmpresa").attr("disabled", true);
                    //$("#slcSucural").attr("disabled", true);
                    //exito();
                    //if ($("#cbo_tipo_sol").val() == "B") {
                    //    ListaReqCompra();
                    //}
                    //if ($("#cbo_tipo_sol").val() == "S") {
                    //    ListaReqServ();
                    //}}}}

                    $("#imprime").html(ArmaTabla_Imprimir());
                    $("#btn_imprime").css("display", "");
                    $('#btnMail').css("display", "");
                    $("#entrega").html($("#txt_lugar_entrega").val())
                    $("#plazo").html($("#txt_plazo_entrega").val())
                    $("#forma").html($("#txt_forma_pago").val())
                    $(".Pdesc").attr("disabled", true)
                    $("#hfcorreos").val(p_CORREOS);
                    EnviaCorreo(res[2], res[3], res[1]);
                    // exito();
                }

            } else { noexito(); }

        },
        error: function (msg) {
            noexito();
            Desbloquear("ventana");
        }
    });

}

function ArmaString() {

    var json = otbl_detalle_req.fnGetData();
    var str = "";

    for (var i = 0 ; i < json.length ; i++) {
        str += json[i].COD_PROD + ","
        str += json[i].PROD_DESC + ","
        str += json[i].CANTIDAD + ","

        str += json[i].PRECIO
        str += ";"
    }

    str += "}";
    str = str.replace(";}", "");
    return str;
}

function ArmaPidmCorreos() {

    var json = otbl_grup_prov.fnGetData();
    var str = "";

    for (var i = 0 ; i < json.length ; i++) {
        str += json[i].RAZON_SOCIAL + ","


    }

    str += "}";
    str = str.replace(",}", "");
    return str;
}

function ArmaCorreos() {

    //otbl_grup_prov.fnGetData()[0]
    var json = otbl_grup_prov.fnGetData();
    var str = "";

    for (var i = 0 ; i < json.length ; i++) {
        str += json[i].CORREO + ","


    }

    str += "}";
    str = str.replace(",}", "");
    return str;
}

function EnviaCorreo(cor_remitente, nremitente, correos) {

    var html = "";
    var tabla = otbl_detalle_req.fnGetData();
    for (var i = 0 ; i < tabla.length; i++) {
        html += "|tr role='row' class='odd'?"
        html += "|td align='center'?" + (i + 1) + "|/td?"
        html += "|td align='left'?" + tabla[i].PROD_DESC + "|/td?"
        html += "|td style='text-align:center' class='cant'?" + tabla[i].CANTIDAD + "|/td?"
        html += "|td style='text-align:right;'?" + formatoMiles(tabla[i].PRECIO) + "|/td?"
        html += "|td style='text-align:right;'?" + formatoMiles((parseFloat(tabla[i].PRECIO) * parseFloat(tabla[i].CANTIDAD)).toFixed(2)) + "|/td?"
        html += "|/tr?";
    }
    html += "|/tbody?|/table?";

    ////if ($("#cbo_tipo_sol").val() == "B") {
    ////    var asunto = "Solicitud de Cotizacion Bienes N°" + $("#txt_num_sol_coti").val();
    ////    var tipo = "Bienes";
    ////    var titulo = "PRODUCTOS";
    ////} else{
    ////    var asunto = "Solicitud de Cotizacion Servicios N°" + $("#txt_num_sol_coti").val();
    ////    var tipo = "Servicios";
    ////    var titulo = "SERVICIOS";

    var tipo = "";
    var titulo = "PRODUCTOS"
    var asunto = "Solicitud de Cotizacion  N°" + $("#txt_num_sol_coti").val();

    var cuerpo =

                  "|table?" +
                  "|tr?" +
                  "|td?N° Solicitud Cotizacion " + tipo + ":|/td?" +
                  "|td?" + "|b?" + $("#txt_num_sol_coti").val() + "|/b?" + "|/td?" +
                  "|/tr?" +
                  "|tr?" +
                  "|td?Empresa :|/td?" +
                  "|td?|b?" + $("#slcEmpresa option:selected").text() + "|/b?|/td?" +
                  "|/tr?" +
                   "|tr?" +
                  "|td?Establecimiento :|/td?" +
                   "|td?" + "|b?" + $("#slcSucural option:selected").text() + "|/b?" + "|/td?" +
                  "|/tr?" +

                  "|tr?" +
                  "|td?Forma Pago :|/td?" +
                  "|td?" + "|b?" + $("#txt_forma_pago").val() + "|/b?" + "|/td?" +
                  "|/tr?" +


                   "|tr?" +
                  "|td?Plazo Entrega :|/td?" +
                  "|td?" + "|b?" + $("#txt_plazo_entrega").val() + "  días|/b?" + "|/td?" +
                  "|/tr?" +

                    "|tr?" +
                  "|td?Lugar Entrega :|/td?" +
                  "|td?" + "|b?" + $("#txt_lugar_entrega").val() + "|/b?" + "|/td?" +
                  "|/tr?" +

                   "|tr?" +
                  "|td?Fecha :|/td?" +
                   "|td?" + "|b?" + $("#txtFecTransaccion").val() + "|/b?" + "|/td?" +
                  "|/tr?" +
                  "|/table?" +
                   "|br?|br?|p?" +
                    "|b?|h2?|p  style='color:black'?|u?|center?LISTA " + titulo + " COTIZAR|/center?|/u?|p?|/h2?|b?" +
                   "|table id='tbl_cotizados' border='1' class='table table-bordered' style='height: 50px;color:black;width:100%;border-collapse:collapse;'?" +
                                "|thead style='background-color: steelblue; color: aliceblue;'?" +
                                    "|tr?" +
                                       "|th?ITEM|/th?" +
                                        "|th style='text-align:left;' ?PRODUCTO|/th?" +
                                          "|th style='text-align:center;'?CANT.|/th?" +
                                        "|th?PRECIO REF (S/.)|/th?" +
                                        "|th?TOTAL (S/.)|/th?" +
                                    "|/tr?" +
                                "|/thead?" +
                                "|tbody?";
    cuerpo += html;



    var data = new FormData();

    data.append('OPCION', 'SENDMAIL');
    data.append('REMITENTE', cor_remitente);
    data.append('NREMITENTE', nremitente);
    data.append('DESTINATARIOS', correos);
    data.append('ASUNTO', asunto);
    data.append('CUERPO', cuerpo);
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMCOTI.ASHX",
        //  url: "vistas/no/ajax/NOMCOTI.ASHX?OPCION=SENDMAIL&REMITENTE=" + cor_remitente + "&NREMITENTE=" + nremitente + "&DESTINATARIOS=" + correos + "&ASUNTO=" + asunto + "&CUERPO=" + cuerpo,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            if (datos == "OK") {              
                exito();
            } else { noexito(); }
            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor reenvíelo.');
            Desbloquear("ventana");        
        }
    });
}

function ArmaTabla_Imprimir() {
    var html = "";
    var tabla = otbl_detalle_req.fnGetData();
    for (var i = 0 ; i < tabla.length; i++) {
        html += "<tr role='row' class='odd'>"
        html += "<td align='center'>" + (i + 1) + "</td>"
        html += "<td align='left'>" + tabla[i].PROD_DESC + "</td>"
        html += "<td style='text-align:center' class='cant'>" + tabla[i].CANTIDAD + "</td>"
        html += "<td style='text-align:right;'>" + formatoMiles(tabla[i].PRECIO) + "</td>"
        html += "<td style='text-align:right;'>" + formatoMiles((parseFloat(tabla[i].PRECIO) * parseFloat(tabla[i].CANTIDAD)).toFixed(2)) + "</td>"
        html += "</tr>";
    }
    html += "</tbody></table>";


    var tipo = "";
    var titulo = "PRODUCTOS"
    var asunto = "Solicitud de Cotizacion  N°" + $("#txt_num_sol_coti").val();

    var cuerpo =
                  "<table>" +
                  "<tr>" +
                  "<td>N° Solicitud Cotizacion " + tipo + ":</td>" +
                  "<td>" + "<b>" + $("#txt_num_sol_coti").val() + "</b>" + "</td>" +
                  "</tr>" +
                  "<tr>" +
                  "<td>Empresa :</td>" +
                  "<td><b>" + $("#slcEmpresa option:selected").text() + "</b></td>" +
                  "</tr>" +
                   "<tr>" +
                  "<td>Establecimiento :</td>" +
                   "<td>" + "<b>" + $("#slcSucural option:selected").text() + "</b>" + "</td>" +
                  "</tr>" +

                  "<tr>" +
                  "<td>Forma Pago :</td>" +
                  "<td style='font-weight:bolder' id='forma'></td>" +
                  "</tr>" +

                   "<tr>" +
                  "<td>Plazo Entrega :</td>" +
                  "<td style='font-weight:bolder' id='plazo'></td>" +
                  "</tr>" +

                    "<tr>" +
                  "<td>Lugar Entrega :</td>" +
                  "<td style='font-weight:bolder' id='entrega'></td>" +
                  "</tr>" +

                   "<tr>" +
                  "<td>Fecha :</td>" +
                   "<td>" + "<b>" + $("#txtFecTransaccion").val() + "</b>" + "</td>" +
                  "</tr>" +
                  "</table>" +
                   "<br><br><p>" +
                    "<b><h2><p  style='color:black'><u><center>LISTA " + titulo + " COTIZAR</center></u><p></h2><b>" +
                   "<table id='tbl_cotizados' border='1' class='table table-bordered' style='height: 50px;color:black;width:100%;border-collapse:collapse;'>" +
                                "<thead style='background-color: steelblue; color: aliceblue;'>" +
                                    "<tr>" +
                                       "<th>ITEM</th>" +
                                        "<th style='text-align:left;' >PRODUCTO</th>" +
                                          "<th style='text-align:center;'>CANT.</th>" +
                                        "<th>PRECIO REF (S/.)</th>" +
                                        "<th>TOTAL (S/.)</th>" +
                                    "</tr>" +
                                "</thead>" +
                                "<tbody>";
    cuerpo += html;

    return cuerpo;

}