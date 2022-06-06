var impresoraCode = "";
var impresoras = [];



var NCLAUTD = function () {

    var listarAutorizaciones = function () {
        //$('#tAUTD').DataTable({
        //    ajax: {
        //        url: 'vistas/NC/ajax/NCMAUTD.ashx?OPCION=L',
        //        type: 'post',
        //        data: { P_CODE: '' },
        //        dataSrc: ''
        //    },
        var parms = {
            sDom: 'TC<"clear">lfrtip',
            //scrollX: true,
            oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td) { $(td).css('text-align', 'center'); $(td).css('width', '4%'); }
                },
                {
                    data: "TIPO_DOC",
                    createdCell: function (td) { $(td).css('text-align', 'left'); }
                },
                {
                    data: "SCSL",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '13%'); }
                },
                {
                    data: "CORRELATIVO_DESC",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '13%'); }
                },
                {
                    data: "EMISION",
                    createdCell: function (td) { $(td).css('text-align', 'center'); },
                    type: "fecha"
                },
                {
                    data: "NRO_AUTORIZACION",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "FORMATO_DESC",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "SERIE",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "VALOR_INICIO",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "VALOR_FIN_MOSTRAR",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "FORMATO_TICKET_IND",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: "ESTADO_IND",
                    createdCell: function (td) { $(td).css('text-align', 'center'); }
                },
                {
                    data: null,
                    defaultContent: '<b class="btn blue"><i class="icon-refresh"></i></b>',
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '5%'); }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '5%'); }
                }
                
               
            ]
        };
        oTableAutorizaciones = iniciaTabla("tAUTD", parms);
        //$("#tAUTD").removeAttr("style");
        //$('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
        //            <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
        //            <div id="enlaces" style="display: inline-block">\
        //                <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="1" href="#">TIPO DCTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="2" href="#">ESTABLECIMIENTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="3" href="#">CORRELATIVO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="4" href="#">EMISION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="5" href="#">NRO AUT</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="6" href="#">FORMATO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="7" href="#">SERIE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="8" href="#">INICIO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        //                <a class="toggle-vis" data-column="9" href="#">FIN</a>\
        //            </div>');
        //$('input.column_filter').on('keyup click', function () {
        //    filterColumn($(this).parents('tr').attr('data-column'));
        //});

        //$('a.toggle-vis').on('click', function (e) {
        //    e.preventDefault();
        //    var column = $('#tAUTD').DataTable().column($(this).attr('data-column'));
        //    column.visible(!column.visible());
        //});
        $('.ColVis_Button').addClass('btn blue').css("margin-bottom", "10px");
        $('.DTTT').css("float", "right");

        $('#tAUTD tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tAUTD').DataTable().row(this).data();
                var cod = row.CODIGO;
                window.location.href = '?f=NCMAUTD&codigo=' + cod;
            }
        });
        

        $('#tAUTD tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tAUTD').DataTable().row($(this).parent().parent()).index();
            var row = $('#tAUTD').DataTable().row(pos).data();
            var code = row.CODIGO;
            
            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMAUTD.ASHX",
                { OPCION: 'CE', P_CODE: code, P_USUA_ID: $('#ctl00_txtus').val() },
                function (res) {
                    Desbloquear("ventana");
                    if (res !== null) {
                        res = (res === 'I') ? 'INACTIVO' : 'ACTIVO';
                        $('#tAUTD').DataTable().cell(pos, 11).data(res).draw();
                        exito();
                    } else { noexito(); }
                });
            $.ajaxSetup({ async: true });
        });

        $('#tAUTD tbody').on('click', 'b', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tAUTD').DataTable().row($(this).parent().parent()).index();
            var row = $('#tAUTD').DataTable().row(pos).data();
            var code = row.CODIGO;
            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMAUTD.ASHX",
                { OPCION: 'CT', P_CODE: code, P_USUA_ID: $('#ctl00_txtus').val() },
                function (res) {
                    Desbloquear("ventana");
                    if (res !== null) {
                        res = (res === 'N') ? 'NO' : 'SI';
                        $('#tAUTD').DataTable().cell(pos, 10).data(res).draw();
                        exito();
                    } else { noexito(); }
                });
            $.ajaxSetup({ async: true });
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
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val()).change();
                    fillCboEstablecimiento($('#ctl00_hddctlg').val());
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                }
                
            },
            error: function (msg) {
                alert(msg);
            }
        });
        select.select2();
    };


    var fillCboEstablecimiento = function (Emp) {
    
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + Emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option val=" ">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }


                    if (Emp == $('#ctl00_hddctlg').val()) {
                        $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                    }
                    else {
                        $('#cboSucursal').select2('val', 'TODOS').change();
                    }
                    
                     



                } else {
                    $('#cboSucursal').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboSucursal').select2();
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
                select.append('<option value=" ">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        select.select2();
    };

    var CargarDatosTabla = function () {
        Bloquear("ventana");
        var Suc = $('#cboSucursal').val();
        if (Suc == 'TODOS') { Suc = '' };

        $.ajax({
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=L&P_CTLG_CODE=" + $('#cboEmpresa').val() + "&P_TIPO_DOC=" + $('#cboTipoDocumento').val() + "&P_SCSL_CODE=" + Suc,
            type: "post",
            contenttype: "application/json;",
            datatype: "json",
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    oTableAutorizaciones.fnClearTable();
                    oTableAutorizaciones.fnAddData(datos);

                } else { oTableAutorizaciones.fnClearTable(); }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Listado!")
            }
        });
    };

    var eventos = function () {

        $('#cboEmpresa').change(function () {
            fillCboEstablecimiento($(this).val());
        });

        $('#cboTipoDocumento').change(function () {
            Bloquear("ventana");
            setTimeout(function () {
                CargarDatosTabla();
            }, 1000);
            emp_ant = $(this).val();
            Desbloquear("ventana");
        });

        $('#cboSucursal').change(function () {
            Bloquear("ventana");
            setTimeout(function () {
                CargarDatosTabla();
            }, 1000);
            emp_ant = $(this).val();
            Desbloquear("ventana");
        });

    }
    
    return {
        init: function () {          
            listarAutorizaciones();
            cargarEmpresas();
            cargarTipoDC();
            CargarDatosTabla();
            eventos();                        
        }
    };
}();

var NCMAUTD = function () {

    verificar_ind = true;
    var plugins = function () {
        $('#txtEmision').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtEmision').datepicker('setDate', 'now');
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDocumento').select2();
        $('#cboCorrelativo').select2();
        $('#cboEnlace').select2();
        $('#cboTipoCampo').select2();
        $('#cboTipoCampo').select2('val', '9');
        $('#cboTipoCampo').attr('disabled','disabled');
        $('#txtNroDigitos').inputmask({ mask: '9', repeat: 2, greedy: false });
        $('#txtNroDigitos').val(7);
        $('#txtNroLineas').inputmask({ mask: '9', repeat: 3, greedy: false });
        $('#txtSerie').inputmask({ mask: '#', repeat: 4, greedy: false });
        $('#txtIni').inputmask({ mask: '9', repeat: 7, greedy: false });
        $('#txtFin').inputmask({ mask: '9', repeat: 7, greedy: false });
        $('#cboFormato').select2();
        $('#cboEstado').select2();
        //$('#txtNroAutorizacion').inputmask({ mask: '#', repeat: 35, greedy: false });
        $('#uniform-chkAutorizacion span').removeClass()
        $('#chkAutorizacion').attr('checked', false).parent().removeClass("checked");
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

    var cargarCajas = function () {
        var select = $('#cboEnlace');
        select.prop('disabled', false);
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LC&P_CTLG_CODE=" + $('#cboEmpresa').val() + "&P_SCSL_CODE=" + $('#cboEstablecimiento').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                } else {
                    select.html('<option value=" ">TODAS LAS CAJAS</option>');
                    select.prop('disabled', true);
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        select.select2();
        $('#lblEnlace').text('Caja');
    };

    var cargarVendedores = function () {
        var select = $('#cboEnlace');
        select.prop('disabled', false);
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
            "&CTLG=" + $('#cboEmpresa').val() +
            "&SCSL=" + $('#cboEstablecimiento').val() +
            "&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        //if (datos[i].PIDM !== undefined) {
                        select.append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                        //}
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar vendedores.');
            }
        });
        select.select2().change();
        $('#lblEnlace').text('Vendedor');
    };

    var autocompletarImprentas = function (v_value) {
        $('#hfIMPRENTA_PIDM').val("");
        $("#divImprenta").html('\
            <div class="span2"><div class="control-group">\
                  <label class="control-label" for="txtImprenta">Imprenta</label>\
             </div></div>\
            <div class="span10"><div class="control-group"><div class="controls">\
                    <input type="text" id="txtImprenta" class="span8" style="text-transform: uppercase" />&nbsp;&nbsp;\
                    <a href="?f=nrmgepr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a>\
                    <a id="btnRecargarImprentas" class="btn green" style="margin-top: -9px"><i class="icon-refresh" style="line-height: initial"></i></a>\
             </div></div></div>');

        var txt = $('#txtImprenta');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LIMPR&P_CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    txt.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].RAZON_SOCIAL);
                                obj += '{ "RAZON_SOCIAL" : "' + datos[i].RAZON_SOCIAL + '", "PIDM" : "' + datos[i].PIDM + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfIMPRENTA_PIDM').val(map[item].PIDM);
                            return item;
                        }
                    });

                    txt.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($(this).val().length == 0) {
                            $('#hfIMPRENTA_PIDM').val(null);
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    txt.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var autocompletarImpresoras = function () {
        impresoraCode = "";
        $("#divImpresoras").html('<div class="span2"><div class="control-group"><label class="control-label" for="txtImpresora">Impresora</label></div></div><div class="span8"><div class="control-group"><div class="controls"><input type="text" id="txtImpresora" class="span10" style="text-transform: uppercase" />&nbsp;&nbsp;<a href="?f=ncmimpr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a>\
<a id="btnRecargarImpresoras" class="btn green"  style="margin-top: -9px"><i class="icon-refresh"  style="line-height: initial"></i></a>\
</div></div></div>');

        $("#divImpresoras").html('\
 <div class="span2"><div class="control-group">\
     <label class="control-label" for="txtImpresora">Impresora</label>\
 </div></div>\
 <div class="span10"><div class="control-group"><div class="controls">\
     <input type="text" id="txtImpresora" class="span8" style="text-transform: uppercase" placeholder="Impresoras Tiketeras" />&nbsp;&nbsp;\
     <a href="?f=ncmimpr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a>\
     <a id="btnRecargarImpresoras" class="btn green" style="margin-top: -9px"><i class="icon-refresh"  style="line-height: initial"></i></a>\
  </div></div></div>');
        //$("#cboFormato").change();
        v_value = "";
        var txt = $('#txtImpresora');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCIMPR.ashx?p_CODIGO=4&p_EMPRESA=" + $('#cboEmpresa').val() + "&p_SCSL=" + $('#cboEstablecimiento').val(),
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
                                // if (datos[i].TIPO == "TICKETERA") {
                                arrayNC.push(datos[i].MARCA + " " + datos[i].MODELO + " " + datos[i].SERIE);
                                obj += '{"CODIGO" : "' + datos[i].CODIGO + '",'
                                obj += '"MARCA" : "' + datos[i].MARCA + '",'
                                obj += '"MODELO" : "' + datos[i].MODELO + '",'
                                obj += '"TIPO" : "' + datos[i].TIPO + '",'
                                obj += '"ESTADO" : "' + datos[i].ESTADO + '",'
                                obj += '"MAQUINA" : "' + datos[i].MAQUINA + '",'
                                obj += '"SERIE" : "' + datos[i].SERIE + '"'
                                obj += '},';
                                // }
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
                            return item;
                        }
                    });

                    txt.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($(this).val().length == 0) {
                            impresoraCode = "";
                        }
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

    //Cargar impresoras por CAJA
    var cargarImpresorasxCaja = function (codigo) {
        impresoraCode = "";
        $("#divImpresoras").html('<div class="span2"><div class="control-group"><label class="control-label" for="txtImpresora">Impresora</label></div></div><div class="span8"><div class="control-group"><div class="controls"><input type="text" id="txtImpresora" class="span10" style="text-transform: uppercase" />&nbsp;&nbsp;<a href="?f=ncmimpr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a></div></div></div>');
        $("#cboFormato").change();

        v_value = "";
        var txt = $('#txtImpresora');

        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=2&CODIGO=" + codigo,
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
                                    if (datos[i].TIPO == "TICKETERA") {
                                        arrayNC.push(datos[i].IMPRESORA + " " + datos[i].SERIE);
                                        obj += '{"CODIGO" : "' + datos[i].CODIGO + '",'
                                        obj += '"IMPRESORA" : "' + datos[i].IMPRESORA + '",'
                                        obj += '"TIPO" : "' + datos[i].TIPO + '",'
                                        obj += '"ESTADO" : "' + datos[i].ESTADO + '",'
                                        obj += '"SERIE" : "' + datos[i].SERIE + '"'
                                        obj += '},';
                                    }
                                }
                                obj += '{}';
                                obj = obj.replace(',{}', '');
                                obj += ']';

                                var json = $.parseJSON(obj);
                                $.each(json, function (i, objeto) {
                                    map[objeto.IMPRESORA + " " + objeto.SERIE] = objeto;
                                });

                                process(arrayNC);
                            },
                            updater: function (item) {
                                impresoraCode = map[item].CODIGO;
                                return item;
                            }
                        });

                        txt.keyup(function () {
                            $(this).siblings("ul").css("width", $(this).css("width"))
                            if ($(this).val().length == 0) {
                                impresoraCode = "";
                            }
                        });
                    }
                    if (datos != null && $.trim(v_value).length > 0) {
                        txt.val(v_value);
                    }
                },
                error: function (msg) {
                    alertCustom("Impresoras por caja no se listaron correctamente.");
                }
            });
        }
    };

    var cargarAutorizacion = function () {
        var codigo = ObtenerQueryString('codigo');
        verificar_ind = false;
        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=L&P_CODE=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $('#txtcodigo').val(datos[0].CODIGO);
                        $('#txtEmision').val(datos[0].EMISION);
                        $('#cboEmpresa').select2('val', datos[0].CTLG_CODE).change();
                        $('#cboEstablecimiento').select2('val', datos[0].SCSL_CODE).change();
                        $('#cboTipoDocumento').select2('val', datos[0].TIPO_DOC_CODE).change();
                        if ($('#cboTipoDocumento :selected').attr('tipodoc') == 'INTERNO') $('#txtNroAutorizacion').prop('disabled', true);
                        $('#txtNroAutorizacion').val(datos[0].NRO_AUTORIZACION);
                        $('#cboCorrelativo').val(datos[0].CORRELATIVO);
                        $('#cboCorrelativo').change();
                        if (datos[0].CORRELATIVO == 'C') $('#cboEnlace').select2('val', datos[0].CAJA_CODE);
                        if (datos[0].CORRELATIVO == 'V') $('#cboEnlace').select2('val', datos[0].PIDM_VENDEDOR);
                        if (datos[0].CORRELATIVO == 'S') $('#cboEnlace').select2('val', datos[0].ALMACEN_CODE);
                        if (datos[0].TIPO_CAMPO == 'A') {
                            $('#cboTipoCampo').select2('val', '*');
                        } else {
                            $('#cboTipoCampo').select2('val', '9');
                        }

                        mascaraValores();
                        $('#cboFormato').select2('val', datos[0].FORMATO).change();

                        $('#txtNroDigitos').val(datos[0].NRO_DIGITOS);
                        $('#txtNroLineas').val(datos[0].NRO_LINEAS);
                        $('#txtSerie').val(datos[0].SERIE);

                        $('#txtIni').val(datos[0].VALOR_INICIO);
                        ini = new Number(datos[0].VALOR_INICIO);
                        if (datos[0].VALOR_FIN != "") {
                            $('.valor_fin').removeClass('hidden');
                            $('#txtFin').val(datos[0].VALOR_FIN);
                            fin = new Number(datos[0].VALOR_FIN);
                        }
                        if (datos[0].FORMATO == "F") {
                            $('.valor_fin').removeClass('hidden');
                        }

                        //CARGAR Impresora
                        $("#cboEnlace").change();
                        $("#txtImpresora").val(datos[0].IMPRESORA);
                        $("#txtImpresora").keyup().siblings("ul").children("li").click();
                        //

                        $('#cboEstado').select2('val', datos[0].ESTADO);
                        if (datos[0].ESTADO == 'V' && datos[0].FORMATO == 'E') {
                            $('#cboEstado').prop('disabled', true);
                        }
                        if (datos[0].FORMATO == 'F') {
                            $('#divImprenta').removeClass('hidden');
                            $('#hfIMPRENTA_PIDM').val(datos[0].IMPRENTA_CODE);
                            $('#txtImprenta').val(datos[0].IMPRENTA);
                        }
                        var estado = (datos[0].ESTADO_IND == 'ACTIVO');
                        $('#chkEstado').prop('checked', estado);

                        if (datos[0].FORMATO == 'E' || datos[0].FORMATO == 'P') {
                            $(".show_autorizacion").show();
                            if (datos[0].FORMATO_TICKET_IND == 'SI') {
                                $('#uniform-chkAutorizacion span').removeClass().addClass("checked");
                                $('#chkAutorizacion').attr('checked', true);
                            } else {
                                $('#uniform-chkAutorizacion span').removeClass()
                                $('#chkAutorizacion').attr('checked', false).parent().removeClass("checked");
                            }
                        } else {
                            $(".show_autorizacion").hide();
                        }

                        $('#txtEmision, #cboEmpresa, #cboEstablecimiento, #cboTipoDocumento, #cboCorrelativo, #cboEnlace, #cboTipoCampo, #cboFormato, #txtSerie, #chkAutorizacion').prop('disabled', true);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
            $('#grabar').addClass('hidden');
            //$('#actualizar').removeClass('hidden');
        }
    };

    var cargarValores = function (ctlg, scsl, tipo_dc, serie, corr) {
        if (ctlg !== null && scsl !== null && tipo_dc !== null && serie !== null && corr !== null) {
            if ($('#cboFormato').val() == 'F') {
                $.ajax({
                    type: "post",
                    url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LV&P_CTLG_CODE=" + ctlg + "&P_SCSL_CODE=" + scsl + "&P_TIPO_DOC=" + tipo_dc + "&P_SERIE=" + serie + "&P_CORRELATIVO=" + corr,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        if (datos != null) {
                            $('#txtNroDigitos').val(datos[datos.length - 1].NRO_DIGITOS);
                            $('#txtNroDigitos').attr('min', datos[datos.length - 1].NRO_DIGITOS);
                            $('#txtIni').val(datos[datos.length - 1].VALOR_NUEVO);
                            $('#txtIni').prop('disabled', true);
                            limpiarCampos(['#txtFin']);
                            $("#cboEstado").val('E').change();
                            $("#cboEstado").attr('disabled', 'disabled');
                        } else {
                            limpiarCampos(['#txtIni', '#txtFin']);
                            $('#txtIni').prop('disabled', false);
                            var digitos = $('#txtNroDigitos').val();
                            if (digitos !== '') { $('#txtNroDigitos').val(7); }
                            $("#cboEstado").val('V').change();
                            $("#cboEstado").attr('disabled', 'disabled');
                        }
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                });
            }
        }
    };

    var cargarCorrelativos = function () {
        var select = $('#cboCorrelativo');
        //var almacen = $('#cboTipoDocumento :selected').attr('almacen');
        //var compraventa = $('#cboTipoDocumento :selected').attr('compraventa');
        //var gastos = $('#cboTipoDocumento :selected').attr('gastos');
        select.empty();
        select.append('<option></option>');
        let sCodTipoDoc = $("#cboTipoDocumento").val();
        if (sCodTipoDoc !== "") {
            select.append('<option value="S">POR SUCURSAL</option>');
            select.append('<option value="C">POR CAJA</option>');
            select.append('<option value="V">POR VENDEDOR</option>');
        }
        //if (gastos == 'E') {
            //select.append('<option value="S">POR SUCURSAL</option>');
            //select.append('<option value="C">POR CAJA</option>');
            //select.append('<option value="V">POR VENDEDOR</option>');
        //} else if (compraventa == 'E' || almacen == 'E') {
        //    select.append('<option value="S">POR SUCURSAL</option>');
        //    select.append('<option value="V">POR VENDEDOR</option>');
        //}
        select.select2();
    };

    var verificarCorrelativos = function () {
        if ($('#txtcodigo').val() == "") {
            var CORRELATIVO = $('#cboCorrelativo').val();
            var array = ['cboEmpresa', 'cboEstablecimiento', 'cboTipoDocumento', 'cboCorrelativo', 'cboFormato'];
            if (vCamposO(array)) {
                var data = new FormData();
                data.append('OPCION', 'VRDOC');
                data.append('P_CTLG_CODE', $('#cboEmpresa').val());
                data.append('P_SCSL_CODE', $('#cboEstablecimiento').val());
                data.append('P_TIPO_DOC', $('#cboTipoDocumento').val());
                data.append('P_CORRELATIVO', CORRELATIVO);
                data.append('P_CAJA_CODE', (CORRELATIVO == 'C') ? $('#cboEnlace').val() : '');
                data.append('P_PIDM_VENDEDOR', (CORRELATIVO == 'V') ? $('#cboEnlace').val() : '');
                data.append('P_FORMATO', $('#cboFormato').val());
                Bloquear('ventana');
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMAUTD.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success: function (datos) {
                        if (datos != null) {
                            if (datos[0].SERIE != "" && datos[0].NUMERO != "") {
                                $('#txtSerie').val(datos[0].SERIE);
                                $('#txtSerie').prop('disabled', true);
                                $('#txtIni').val(new Number(datos[0].NUMERO) + 1);
                                $('#txtIni').prop('disabled', true);
                            }
                            else {
                                $('#txtSerie').val("");
                                $('#txtSerie').prop('disabled', false);
                                $('#txtIni').val("");
                                $('#txtIni').prop('disabled', false);
                            }
                        } else {
                            $('#txtSerie').val("");
                            $('#txtSerie').prop('disabled', false);
                            $('#txtIni').val("");
                            $('#txtIni').prop('disabled', false);
                        }
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                });
                Desbloquear("ventana");
            }
        }
    };

    var limpiarCamposSN = function () {
        $('#txtSerie').val("");
        $('#txtSerie').prop('disabled', false);
        $('#txtIni').val("");
        $('#txtIni').prop('disabled', false);
    };

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {
            cargarEstablecimientos();
            cargarTipoDC();
            //cargarCajas();
            cargarValores($(this).val(), $('#cboEstablecimiento').val(), $('#cboTipoDocumento').val(), $('#txtSerie').val(), $('#cboCorrelativo').val());
            $('#cboFormato').val('').change();
            $('#cboFormato').select2();
            limpiarCamposSN();
            autocompletarImprentas();
        });
        $('#cboEstablecimiento').on('change', function () {
            var correlativo = $('#cboCorrelativo').val();
            if (correlativo == 'S') {
                cargarSucursal();
            } else if (correlativo == 'C') {
                cargarCajas();
            } else {
                cargarVendedores();
            }
            cargarValores($('#cboEmpresa').val(), $(this).val(), $('#cboTipoDocumento').val(), $('#txtSerie').val(), $('#cboCorrelativo').val());
            $('#cboFormato').val('');
            $('#cboFormato').select2();
            limpiarCamposSN();
        });
        $('#cboTipoDocumento').on('change', function () {
            var tipodoc = $('#cboTipoDocumento :selected').attr('tipodoc');
            var fechaelec = $('#cboTipoDocumento :selected').attr('fecha-elec');
            var c = $(this).val();
            if (tipodoc == 'INTERNO') {
                $('#txtNroAutorizacion').val(null);
                $('#txtNroAutorizacion').prop('disabled', true);
            } else {
                $('#txtNroAutorizacion').prop('disabled', false);
            }

            if (fechaelec == '0000-00-00') {
                $('#optE').prop('disabled', true);
            } else {
                $('#optE').prop('disabled', false);
                //if (new Date(fechaelec) <= new Date()) {
                //    $('#optE').prop('disabled', false);
                //} else {
                //    $('#optE').prop('disabled', true);
                //}
            }
            if (c == '0012' || tipodoc == 'INTERNO') {
                $('#optP').prop('disabled', false);
                $('#optF').prop('disabled', true);
            } else {
                $('#optP').prop('disabled', true);
                $('#optF').prop('disabled', false);
            }

            //$('#cboFormato').change();

            cargarValores($('#cboEmpresa').val(), $('#cboEstablecimiento').val(), $(this).val(), $('#txtSerie').val(), $('#cboCorrelativo').val());

            cargarCorrelativos();
            $('#lblEnlace').text('');
            $('#cboEnlace').empty().select2();

            $('#cboFormato').val('');
            $('#cboFormato').select2();
            limpiarCamposSN();
            $(".show_autorizacion").hide();
            $('#uniform-chkAutorizacion span').removeClass();
            $('#chkAutorizacion').attr('checked', false).parent().removeClass("checked");
        });
        $('#cboCorrelativo').on('change', function () {
            var correlativo = $(this).val();
            $('#cboEnlace').removeClass('hidden');
            $('#lblEnlace').removeClass('hidden');
            if (correlativo == 'S') {
                cargarSucursal();
                autocompletarImpresoras();
            } else if (correlativo == 'C') {
                cargarCajas();

            } else {
                cargarVendedores();
                autocompletarImpresoras();
            }
            $('#cboFormato').val('');
            $('#cboFormato').select2();
            limpiarCamposSN();
            $(".show_autorizacion").hide();
            $('#uniform-chkAutorizacion span').removeClass();
            $('#chkAutorizacion').attr('checked', false).parent().removeClass("checked");
        });
        $('#txtSerie').on('keyup', function () {
            cargarValores($('#cboEmpresa').val(), $('#cboEstablecimiento').val(), $('#cboTipoDocumento').val(), $(this).val(), $('#cboCorrelativo').val());
        });
        $('#cboFormato').on('change', function () {
            var f = $(this).val();
            if (f == 'E') {
                $('#cboEstado').select2('val', 'V');
                $('#cboEstado').prop('disabled', true);
            } else {
                $('#cboEstado').select2('val', 'E');
                //$('#cboEstado').prop('disabled', false);
            }
            if (f == 'F') {
                $('.valor_fin').removeClass('hidden');
                $('#divImprenta').removeClass('hidden');
            } else {
                $('.valor_fin').addClass('hidden');
                $('#divImprenta').addClass('hidden');
                $('#hfIMPRENTA_PIDM').val(null);
                $('#txtImprenta').val(null);
                $('#txtFin').val(null)
            }

            if ($('#cboFormato').val() == 'P') {
                $('#divImprenta').removeClass('span6');

                $('#divImpresoras').addClass('span6');
                $('#divImpresoras').removeClass('hidden');

                $('#txtNroLineas').val('100');
                $('#txtNroLineas').attr('disabled', 'disabled');
            } else {
                $("#txtImpresora").val("");
                impresoraCode = "";
                $('#divImprenta').addClass('span6');

                $('#divImpresoras').addClass('hidden');
                $('#divImpresoras').removeClass('span6');

                $('#txtNroLineas').val('');
                $('#txtNroLineas').removeAttr('disabled');
            }
            cargarValores($('#cboEmpresa').val(), $('#cboEstablecimiento').val(), $('#cboTipoDocumento').val(), $('#txtSerie').val(), $('#cboCorrelativo').val());
            //verificarCorrelativos();
            if (f == 'E' || f == 'P') {
                $(".show_autorizacion").show();
                //$('#uniform-chkAutorizacion span').removeClass().addClass("checked");
                //$('#chkAutorizacion').attr('checked', true).parent().addClass("checked");
            } else {
                $(".show_autorizacion").hide();
                $('#uniform-chkAutorizacion span').removeClass();
                $('#chkAutorizacion').attr('checked', false).parent().removeClass("checked");
            }
        });
        $('#cboTipoCampo').on('change', function () {
            mascaraValores();
        });
        $('#txtNroDigitos').on('keypress', function () {
            mascaraValores();
        });

        ///cboCaja y cboAlmacen
        $("#cboEnlace").on("change", function () {
            if ($(this).val() != "" && $('#cboCorrelativo').val() == "C") {
                cargarImpresorasxCaja($(this).val());
            }
            else {
                autocompletarImpresoras();
            }
        });

        $(document).on("click", "#btnRecargarImprentas", function () {
            autocompletarImprentas('')
        });

        $(document).on("click", "#btnRecargarImpresoras", function () {
            autocompletarImpresoras()
        });
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            cargarEstablecimientos();
            cargarTipoDC();
            eventos();
            autocompletarImprentas('');
            //autocompletarImpresoras();
            cargarAutorizacion();
        }
    };
}();

var ini = '';
var fin = '';
var mascaraValores = function () {
    var m = $('#cboTipoCampo').val();
    var r = $('#txtNroDigitos').val();
    r = (r == '' || r == 0 || r > 15) ? 15 : r;
    $('#divTxtIni').html('<input type="text" id="txtIni" class="span9" style="text-transform: uppercase; text-align: center" onkeyup="ini = $(this).val()"/>');
    $('#divTxtFin').html('<input type="text" id="txtFin" class="span9" style="text-transform: uppercase; text-align: center" onkeyup="fin = $(this).val()"/>');
    $('#txtIni, #txtFin').inputmask({ mask: m, repeat: r, greedy: false });
    $('#txtIni').val(ini);
    $('#txtFin').val(fin);
};

var Grabar = function () {
    var continuar = true;
    var array = ['txtEmision', 'cboEmpresa', 'cboEstablecimiento', 'cboTipoDocumento', 'cboCorrelativo', 'cboEnlace', 'cboTipoCampo', 'txtNroDigitos', 'txtNroLineas', 'txtSerie', 'txtIni', 'cboFormato', 'cboEstado'];
    if ($('#cboTipoDocumento :selected').attr('tipodoc') == 'SUNAT') {
        array.push('txtNroAutorizacion');
    }
    if ($('#cboFormato').val() == 'F') {
        array.push('txtFin');
    }

    if ($('#cboTipoDocumento :selected').attr('tipodoc') == 'SUNAT' && $('#cboFormato').val() == 'F') {
        array.push('txtImprenta');
    }

    if ($('#cboFormato').val() == 'P') {
        array.push('txtImpresora');
        if (impresoraCode == "") {
            continuar = false;
            alertCustom("Ingrese una impresora válida!");
        }
    }

    var formato = 'N';

    if ($('#cboFormato').val() == 'P' || $('#cboFormato').val() == 'E') {
        if ($("#chkAutorizacion").is(":checked")) {
            formato = 'S';
        } else {
            formato = 'N';
        }        
    } 

    

    if (continuar) {
        if (vErrorsNotMessage(array)) {

            var P_NRO_DIGITOS = parseInt($('#txtNroDigitos').val());
            var P_NRO_LINEAS = parseInt($('#txtNroLineas').val());
            var P_SERIE = $('#txtSerie').val();
            var CORRELATIVO = $('#cboCorrelativo').val();

            if (P_SERIE.length >= 3 && P_SERIE.length <= 4) {
                if (P_NRO_DIGITOS <= 15 && P_NRO_LINEAS <= 300 && P_NRO_DIGITOS >= 7 && P_NRO_LINEAS >= 5) {
                    var data = new FormData();
                    data.append('OPCION', 'G');
                    data.append('P_EMISION', $('#txtEmision').val());
                    data.append('P_CTLG_CODE', $('#cboEmpresa').val());
                    data.append('P_SCSL_CODE', $('#cboEstablecimiento').val());
                    data.append('P_TIPO_DOC', $('#cboTipoDocumento').val());
                    data.append('P_AUTORIZACION', $('#txtNroAutorizacion').val());
                    data.append('P_CORRELATIVO', CORRELATIVO);
                    data.append('P_CAJA_CODE', (CORRELATIVO == 'C') ? $('#cboEnlace').val() : '');
                    data.append('P_PIDM_VENDEDOR', (CORRELATIVO == 'V') ? $('#cboEnlace').val() : '');
                    data.append('P_ALMACEN_CODE', (CORRELATIVO == 'S') ? $('#cboEnlace').val() : '');
                    data.append('P_TIPO_CAMPO', ($('#cboTipoCampo').val() == '*') ? 'A' : 'N');
                    data.append('P_NRO_DIGITOS', P_NRO_DIGITOS);
                    data.append('P_NRO_LINEAS', P_NRO_LINEAS);
                    data.append('P_SERIE', P_SERIE);
                    data.append('P_INI', $('#txtIni').val());
                    data.append('P_FIN', $('#txtFin').val());
                    data.append('P_FORMATO', $('#cboFormato').val());
                    data.append('P_ESTADO', $('#cboEstado').val());
                    data.append('P_IMPRENTA', $('#hfIMPRENTA_PIDM').val());
                    data.append('P_ESTADO_IND', $('#chkEstado').is(':checked') ? 'A' : 'I');
                    data.append('P_USUA_ID', $('#ctl00_txtus').val());
                    data.append('P_IMPR_CODE', impresoraCode);
                    data.append('P_FORMATO_TICKET_IND', formato);

                    Bloquear('ventana');

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/NC/ajax/NCMAUTD.ASHX",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (res) {
                        if (res !== null) {
                            res = res.split(',');
                            if (res[0] === 'FECHA') {
                                alertCustom('No se puede crear otra autorización del mismo tipo de documento y formato a otra con una fecha anterior.');
                            } else if (res[0] === 'SERIE') {
                                infoCustom2('Sólo se permite un único número de serie por Sucursal');
                            } else if (res[0] === 'NOIMP') {
                                infoCustom2('FORMATO PAPEL EN BLANCO O ELECTRONICO: Las series deben ser distintas para el mismo tipo de documento en una misma sucursal.');
                            } else if (res[0] === 'IMP') {
                                infoCustom2('FORMATO IMPRESO: Sólo se permite un único número de serie para el mismo tipo de documento en una misma sucursal.');
                            } else {
                                exito();
                                $('#txtcodigo').val(res[0]);
                                $('#txtIni').val(res[1]);
                                $('#txtFin').val(res[2]);
                                $('#grabar').addClass('hidden');
                                //$('#actualizar').removeClass('hidden');
                                $('#txtEmision, #cboEmpresa, #cboEstablecimiento, #cboTipoDocumento, #cboCorrelativo, #cboEnlace, #cboTipoCampo, #cboFormato, #txtSerie').prop('disabled', true);
                                window.history.pushState("Object", "Autorización de Documento Comercial", "/Default.aspx?f=NCMAUTD&codigo=" + res[0]);
                            }
                        }
                    }).fail(function () {
                        alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
                    });
                    Desbloquear('ventana');
                } else {
                    alertCustom('La cantidad de dígitos oscila entre 7 y 15 y el número de líneas entre 5 y 300.');
                }
            }
            else {
                alertCustom('Los números de serie deben ser de 3 o 4 dígitos.');
            }
        } else {
            alertCustom('Por favor, ingrese los campos que son obligatorios.');
        }
    }

};

var Actualizar = function () {
    var continuar = true;
    var array = ['txtEmision', 'cboEmpresa', 'cboEstablecimiento', 'cboTipoDocumento', 'cboCorrelativo', 'cboEnlace', 'cboTipoCampo', 'txtNroDigitos', 'txtNroLineas', 'txtSerie', 'txtIni', 'cboFormato', 'cboEstado'];
    if ($('#cboTipoDocumento :selected').attr('tipodoc') == 'SUNAT') {
        array.push('txtNroAutorizacion');
    }
    if ($('#cboFormato').val() == 'F') {
        array.push('txtFin');
    }
    if ($('#cboTipoDocumento :selected').attr('tipodoc') == 'SUNAT' && $('#cboFormato').val() == 'F') {
        array.push('txtImprenta');
    }
    if ($('#cboFormato').val() == 'P') {
        array.push('txtImpresora');
        if (impresoraCode == "") {
            continuar = false;
            alertCustom("Ingrese una impresora válida!");
        }
    }
    var formato = 'N';

    if ($('#cboFormato').val() == 'P' || $('#cboFormato').val() == 'E') {
        if ($("#chkAutorizacion").is(":checked")) {
            formato = 'S';
        } else {
            formato = 'N';
        }
    } 

    if (continuar) {

        if (vErrorsNotMessage(array)) {
            var P_NRO_DIGITOS = parseInt($('#txtNroDigitos').val());
            var P_NRO_LINEAS = parseInt($('#txtNroLineas').val());
            var P_SERIE = $('#txtSerie').val();

            if (P_SERIE.length >= 3 && P_SERIE.length <= 4) {
                if (P_NRO_DIGITOS <= 15 && P_NRO_LINEAS <= 300 && P_NRO_DIGITOS >= 7 && P_NRO_LINEAS >= 5) {
                    var data = new FormData();
                    data.append('OPCION', 'A');
                    data.append('P_CODE', $('#txtcodigo').val());
                    data.append('P_EMISION', $('#txtEmision').val());
                    data.append('P_CTLG_CODE', $('#cboEmpresa').val());
                    data.append('P_SCSL_CODE', $('#cboEstablecimiento').val());
                    data.append('P_TIPO_DOC', $('#cboTipoDocumento').val());
                    data.append('P_AUTORIZACION', $('#txtNroAutorizacion').val());
                    data.append('P_CORRELATIVO', $('#cboCorrelativo').val());
                    data.append('P_CAJA_CODE', ($('#lblEnlace').text() == 'Caja') ? $('#cboEnlace').val() : '');
                    data.append('P_PIDM_VENDEDOR', ($('#lblEnlace').text() == 'Vendedor') ? $('#cboEnlace').val() : '');
                    data.append('P_ALMACEN_CODE', ($('#lblEnlace').text() == 'Almacen') ? $('#cboEnlace').val() : '');
                    data.append('P_TIPO_CAMPO', ($('#cboTipoCampo').val() == '*') ? 'A' : 'N');
                    data.append('P_NRO_DIGITOS', P_NRO_DIGITOS);
                    data.append('P_NRO_LINEAS', P_NRO_LINEAS);
                    data.append('P_SERIE', P_SERIE);
                    data.append('P_INI', $('#txtIni').val());
                    data.append('P_FIN', $('#txtFin').val());
                    data.append('P_FORMATO', $('#cboFormato').val());
                    data.append('P_ESTADO', $('#cboEstado').val());
                    data.append('P_IMPRENTA', $('#hfIMPRENTA_PIDM').val());
                    data.append('P_ESTADO_IND', $('#chkEstado').is(':checked') ? 'A' : 'I');
                    data.append('P_USUA_ID', $('#ctl00_txtus').val());
                    data.append('P_IMPR_CODE', impresoraCode);
                    data.append('P_FORMATO_TICKET_IND', formato);

                    Bloquear('ventana');

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/NC/ajax/NCMAUTD.ASHX",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    })
                    .success(function (res) {
                        if (res != null) {
                            res = res.split(',');
                            if (res[0] == 'OK') {
                                exito();
                                $('#txtIni').val(res[1]);
                                $('#txtFin').val(res[2]);
                            } else {
                                noexito();
                            }
                        }
                    })
                    .error(function () {
                        alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
                    });
                    Desbloquear("ventana");
                } else {
                    alertCustom('La cantidad de dígitos oscila entre 7 y 15 y el número de líneas entre 5 y 300.');
                }
            }
            else {
                alertCustom('Los números de serie deben ser de 3 o 4 dígitos.');
            }
        } else {
            alertCustom('Por favor, ingrese los campos que son obligatorios.');
        }
    }

};