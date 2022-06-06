var flag = 'normal';
var flagG = 'normal';
var v_ok = 'S';
var v_total = 0.00;
var v_asignado = 0.00;
var v_devolver = 0.00;
var v_devuelto = 0.00;
var comprobanteHTML, documentosHTML, conceptosHTML, cboTipoBienHTML = "", cboPeriodo = "";


function notificar() {

    opcion = 'N';
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    usua_id = $('#ctl00_lblusuario').text();

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('usua_id', usua_id);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    alertCustom(res);
})
.error(function () {
    Desbloquear("ventana");
})
}

function BloquearRendicionCuenta() {
    $("#slcEmpresa").attr('disabled', 'disabled');
    $("#slcSucural").attr('disabled', 'disabled');
    $("#btnListarA").hide();
    $("#txtempleado").attr('disabled', 'disabled');
    $(".div_botones").hide();
    oTable.fnSetColumnVis(0, false);
    oTable.fnSetColumnVis(1, false);
    oTable.fnSetColumnVis(12, false);
    $("#txt_dmonto").attr('disabled', 'disabled');
    $("#cbo_dcaja").attr('disabled', 'disabled');
}

function VerificaExiste(p_pidm, p_dcto, p_serie, p_numero) {
    var existe = 'N';
    if (p_dcto != '' && (p_serie != '' || p_numero != '')) {
        var data = new FormData();

        data.append("OPCION", "VERIFICA");

        data.append("p_PIDM_BENEFICIARIO", p_pidm);
        data.append("p_TIPO_DCTO", p_dcto);
        data.append("p_SERIE", p_serie);
        data.append("p_NUMERO", p_numero);

        $.ajax({
            url: "vistas/CP/ajax/CPMPGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            async: false,
            processData: false,
            cache: false,
            success: function (datos) {
                //$("#hf_existe").val(datos);
                if (datos == 0) {
                    existe = 'N';
                } else {
                    existe = 'S';
                }
            },
            error: function (msg) {
                noexitoCustom("Error al Verificar Documento!");
            }
        });
    }

    return existe;
}

function SoloGrabar() {

    if (vErrors(["txtcodcuenta", "cbomoneda", "slcEmpresa", "slcSucural", "cbo_dcaja"])) {


        var detalle = $("#tblDocumentos").DataTable().data();

        if (detalle.length == 0) {
            infoCustom("Por favor ingrese el detalle de comprobantes.");
            return;
        }

        var opcion, ctlg_code, scsl_code, asig_code, mone_code, mone_caja, mont_caja, caja_code, caja_aper_code, usua_id, tipo_camb, pidm_empl,
            monto, text_comp, devolver;

        opcion = $("#hf_opcion").val();
        ctlg_code = $("#slcEmpresa").val();
        scsl_code = $("#slcSucural").val();
        asig_code = $("#txtcodcuenta").val();
        mone_code = $("#cbomoneda").val();
        mont_caja = $("#txt_dmonto").val();
        caja_code = $("#cbo_dcaja").val();
        usua_id = $('#ctl00_lblusuario').text();
        tipo_camb = $("#txt_tcambio").val();
        pidm_empl = $("#hf_pidm").val();
        monto = $("#txtmonto").val();
        devolver = $("#txt_dmonto").val();
        if (devolver == "") {
            devolver = "0";
        }
        text_comp = datosTabla();

        var data = new FormData();
        data.append('opcion', '14');
        data.append('ctlg_code', ctlg_code);
        data.append('scsl_code', scsl_code);
        data.append('asig_code', asig_code);
        data.append('mone_code', mone_code);
        data.append('mone_caja', mone_caja);
        data.append('mont_caja', mont_caja);
        data.append('monto_asig', monto);
        data.append('devolver', devolver);
        data.append('caja_code', caja_code);
        data.append('codigo_apertura', caja_aper_code);
        data.append('usua_id', usua_id);
        data.append('text_comp', text_comp);
        data.append('tipo_camb', tipo_camb);
        data.append('pidm_empl', pidm_empl);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CAMASCR.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            Desbloquear("ventana");
            if (res == "EXITO") {
                $('#txt_dmovimiento').val(res);
                exito();
            }
            else {
                alertCustom(res);
            }
        }).error(function () {
            Desbloquear("ventana");
        })
    }
}

$('#txt_dmonto').on('blur focus', function () {
    $("#txt_ddevuelto").val($(this).val());
    validarBalanceo();
});

function datosTabla() {
    var datos_tabla;
    var datos_fila = '';
    var mone_code = $("#cbomoneda").val();
    var devolver_caja = parseFloat($("#txt_dmonto").val());

    var sub_total, igv, fecha,
        comprobante, serie, numero,
        tipo_doc, nro_doc, pidm,
        persona, compras_ind, total,
        cuenta, concepto, subconcepto,
        glosa, tipo, caja, moneda,
        glosa, tipo_bien, periodo;

    let oTableDocumentos = $("#tblDocumentos").dataTable();
   
    $.each(oTableDocumentos.fnGetData(), function (key, xData) {
            fecha = xData.FECHA_EMISION;
            comprobante = xData.DCTO_CODE;
            serie = xData.SERIE;
            numero = xData.NUMERO;
            persona = xData.PERSONA;
            compras_ind = xData.COMPRAS_IND;
            total = xData.TOTAL;
            concepto = xData.CONCEPTO;
            subconcepto = xData.SUBCONCEPTO;
            glosa = ValidaCaracter(xData.GLOSA);
            tipo_bien = xData.TIPO_BIEN;
            periodo = xData.PERIODO;
            pidm = xData.PIDM;
            datos_fila += fecha + ',' + comprobante + ',' + serie + ',' + numero + ',' + pidm + ',' + persona + ',' + compras_ind + ',' + total + ',' + concepto + ',' + subconcepto + ',' + glosa + ',' + tipo_bien + ',' + periodo;
            datos_fila += '|';

        });
    
    datos_tabla = datos_fila.replace('||', '');
    return datos_tabla;
}

//Valida que el texto no contenga "," o "|" en los detalles de venta
function ValidaCaracter(texto) {
    while (texto.toString().indexOf(",") != -1) {
        texto = texto.replace(",", ";");
    }
    while (texto.toString().indexOf("|") != -1) {
        texto = texto.replace("|", " ");
    }
    while (texto.toString().indexOf('"') != -1) {
        texto = texto.replace('"', " ");
    }
    return texto.toUpperCase();
}

function validarBalanceo() {

    $("#dev_moneda").text($("#cbomoneda :selected").text());

    var moneda = $("#cbomoneda").val();
    var tcambio = $("#txt_tcambio").val();
    var monto_mn;

    if (moneda == '0003') {
        monto_mn = parseFloat($('#txt_dmonto').val() * tcambio);
    } else {
        monto_mn = $('#txt_dmonto').val();
    }

    $("#txt_dmsoles").val(monto_mn);


    $('#txt_rasignado').val($('#txtmonto').val());
    v_devuelto = parseFloat($('#txt_dmonto').val());

    var num_3 = parseFloat($("#txt_dmonto").val());

    var num_1 = Math.round($('#txt_rasignado').val() * 100) / 100;
    var num_2 = Math.round($('#txt_rmonto').val() * 100) / 100;
    v_devolver = Math.round(parseFloat(num_1 - num_2) * 100) / 100;

    var porcent = parseInt(((num_2 + num_3) * 100) / num_1);

    if (porcent > 100) {
        infoCustom2('Se ha excedido el monto asignado.');
        $("#porcentaje").text("100%");
        $("#porcentaje").attr("style", "width:100%;");
    } else {
        $("#porcentaje").text(porcent + "%");
        $("#porcentaje").attr("style", "width:" + porcent + "%;");
    }

    $('#txt_ddevolver').val(v_devolver);
    $('#txt_rdevolver').val(v_devolver);

    if (v_devolver == v_devuelto) {
        $('#msg_alerta').removeClass('alert-error');
        $('#msg_alerta').addClass('alert-success');
        $('#msg_alerta').html('<i class="icon-adjust"></i><strong> DOCUMENTO BALANCEADO !!!</srong>')
    } else {
        $('#msg_alerta').addClass('alert-error');
        $('#msg_alerta').removeClass('alert-success');
        $('#msg_alerta').html('<i class="icon-ban-circle"></i><strong> DOCUMENTO NO BALANCEADO !!!</srong>')
    }

}

function MostrarDatos() {
    BuscarEmpleado($("#hf_pidm").val());
}

function Grabar() {
    $('#aspnetForm').submit();
}

function GrabarAsignacion() {
    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, pidm, activo, glosa, moneda, monto, fecha_asignacion, fecha_limite, centro_costos, centro_cecc, estado;

    opcion = $("#hf_opcion").val();
    codigo = $("#hf_codigo").val();
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    pidm = $("#hf_pidm").val();
    activo = $("#chkactivo").is(':checked') ? 'S' : 'N';
    glosa = $("#txtglosa").val();
    moneda = $("#cbomoneda").val();
    monto = $("#txtmonto").val();
    fecha_asignacion = $("#txtfecasignacion").val();
    fecha_limite = $("#txtfecha").val();
    centro_cecc =  $("#txtcentrocosto").data("CodCentroCostoCab");
    centro_costos = $("#txtcentrocosto").data("CodCentroCosto");
    estado = $("#cboestado").val();
    usua_id = $('#ctl00_lblusuario').text();

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('codigo', codigo);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('pidm', pidm);
    data.append('activo', activo);
    data.append('glosa', glosa);
    data.append('moneda', moneda);
    data.append('monto', monto);
    data.append('fecha_asignacion', fecha_asignacion);
    data.append('fecha_limite', fecha_limite);
    data.append('centro_costos', centro_costos);
    data.append('centro_cecc', centro_cecc);
    data.append('estado', estado);
    data.append('usua_id', usua_id);


    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res != null) {
        if (res.length == 9) {
            $('#hf_codigo').val(res);
            $('#hf_opcion').val("2");
            exito();
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#slcEmpresa").attr("disabled", "disabled");
            $("#slcSucural").attr("disabled", "disabled");
        } else {
            noexito();
        }
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

function GrabarRendicion() {
    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, asig_code, mone_code, mone_caja, mont_caja, caja_code, caja_aper_code, usua_id, tipo_camb, pidm_empl,
        monto, text_comp, devolver;

    opcion = $("#hf_opcion").val();
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    asig_code = $("#txtcodcuenta").val();
    mone_code = $("#cbomoneda").val();
    mont_caja = $("#txt_dmonto").val();
    caja_code = $("#cbo_dcaja").val();
    caja_aper_code = $("#cbo_dcaja :selected").attr("codigo");
    usua_id = $('#ctl00_lblusuario').text();
    tipo_camb = $("#txt_tcambio").val();
    pidm_empl = $("#hf_pidm").val();
    monto = $("#txtmonto").val();
    devolver = $("#txt_dmonto").val();
    if (devolver == "") {
        devolver = "0";
    }
    text_comp = datosTabla();

    monto_dolares = parseFloat(mont_caja * tipo_camb);

    var data = new FormData();

    data.append('opcion', '13');
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('asig_code', asig_code);
    data.append('mone_code', mone_code);
    data.append('mone_caja', mone_caja);
    data.append('mont_caja', mont_caja);
    data.append('monto', monto);
    data.append('devolver', devolver);
    data.append('caja_code', caja_code);
    data.append('codigo_apertura', caja_aper_code);
    data.append('usua_id', usua_id);
    data.append('text_comp', text_comp);
    data.append('tipo_camb', tipo_camb);
    data.append('pidm_empl', pidm_empl);
    
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res == "EXITO") {
        $('#txt_dmovimiento').val(res);
        BloquearRendicionCuenta();
        exito();
        $("#btnMail").removeClass("hidden");
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

function ActualizarAsignacion() {
    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, pidm, activo, glosa, moneda, monto, fecha_asignacion, fecha_limite, centro_costos, centro_cecc, estado;

    opcion = $("#hf_opcion").val();
    codigo = $("#hf_codigo").val();
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    pidm = $("#hf_pidm").val();
    activo = $("#chkactivo").is(':checked') ? 'S' : 'N';
    glosa = $("#txtglosa").val();
    moneda = $("#cbomoneda").val();
    monto = $("#txtmonto").val();
    fecha_asignacion = $("#txtfecasignacion").val();
    fecha_limite = $("#txtfecha").val();
    centro_costos = $("#txtcentrocosto").data("CodCentroCosto");
    centro_cecc = $("#txtcentrocosto").data("CodCentroCostoCab");
    estado = $("#cboestado").val();
    usua_id = $('#ctl00_lblusuario').text();

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('codigo', codigo);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('pidm', pidm);
    data.append('activo', activo);
    data.append('glosa', glosa);
    data.append('moneda', moneda);
    data.append('monto', monto);
    data.append('fecha_asignacion', fecha_asignacion);
    data.append('fecha_limite', fecha_limite);
    data.append('centro_costos', centro_costos);
    data.append('centro_cecc', centro_cecc);
    data.append('estado', estado);
    data.append('usua_id', usua_id);


    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res != null) {
        if (res == "OK") {
            exito();
        } else {
            noexito();
        }
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

function Aprobar() {

    var asignados = [];
    var usuarios = [];

    $('input:checkbox:checked').each(function () {
        asignados.push($(this).attr('id'));
        usuarios.push($(this).attr('data-user'));
    });
    $('#hf_asignados').val(asignados);
    $('#hf_usuarios').val(usuarios);

    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, caja_code, seleccionados, usuarios, usua_id, tipo;

    opcion = '6';
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    caja_code = $("#cbocaja").val();
    seleccionados = $('#hf_asignados').val();
    usuarios = $('#hf_usuarios').val();
    usua_id = $('#ctl00_lblusuario').text();
    pidm = "0";
    tipo = '0002';

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('usua_id', usua_id);
    data.append('tipo', tipo);
    data.append('caja_code', '');
    data.append('pidm', pidm);
    data.append('seleccionados', seleccionados);
    data.append('usuarios', usuarios);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res != null) {
        if (res == "OK") {
            exito();
            $('input:checkbox:checked').remove();
            $('#aprobar,#rechazar').addClass('disabled');
            $('#aprobar,#rechazar').removeAttr('href');
        } else {
            noexito();
        }
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

function Rechazar() {
    var asignados = [];
    $('input:checkbox:checked').each(function () {
        asignados.push($(this).attr('id'));
    });
    $('#hf_asignados').val(asignados);

    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, seleccionados, usua_id, tipo;

    opcion = '6';
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    seleccionados = $('#hf_asignados').val();
    usua_id = $('#ctl00_lblusuario').text();
    tipo = '0006';

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('usua_id', usua_id);
    data.append('tipo', tipo);
    data.append('seleccionados', seleccionados);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMASCR.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res != null) {
        if (res == "OK") {
            exito();
            $('input:checkbox:checked').remove();
            $('#aprobar,#rechazar').addClass('disabled');
            $('#aprobar,#rechazar').removeAttr('href');
        } else {
            noexito();
        }
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

//EDICION TABLA RENDICION DE CUENTAS - COMPROBANTES DE PAGO
//---------------------------------------------------------

function restoreRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);

    oTable.fnUpdate(aData.LINK_QUITAR, nRow, 0, false);
    oTable.fnUpdate(aData.LINK_EDITAR, nRow, 1, false);
    oTable.fnUpdate(aData.FECHA_EMISION, nRow, 2, false);
    oTable.fnUpdate(aData.DCTO_CODE, nRow, 3, false);
    oTable.fnUpdate(aData.SERIE, nRow, 4, false);
    oTable.fnUpdate(aData.NUMERO, nRow, 5, false);
    oTable.fnUpdate(aData.PERSONA, nRow, 6, false);
    oTable.fnUpdate(aData.COMPRAS_IND, nRow, 7, false);
    oTable.fnUpdate(aData.TOTAL, nRow, 8, false);
    oTable.fnUpdate(aData.CONCEPTO, nRow, 9, false);
    oTable.fnUpdate(aData.SUBCONCEPTO, nRow, 10, false);
    oTable.fnUpdate(aData.GLOSA, nRow, 11, false);
    oTable.fnUpdate(aData.PIDM, nRow, 12, false);
    oTable.fnUpdate(aData.TIPO_BIEN, nRow, 13, false);
    oTable.fnUpdate(aData.PERIODO, nRow, 14, false);
    oTable.fnUpdate(aData.RUC, nRow, 15, false);

    //aData.DESC_DCTO = "";
    //aData.DESC_CONCEPTO = "";
    //aData.DESC_SUBCONCEPTO = "";
    //aData.DESC_TIPO_BIEN = "";
    //aData.DESC_COMPRAS_IND = "";

    oTable.fnSetColumnVis(12, false);
   // oTable.fnSetColumnVis(15, false);

    oTable.fnDraw();
    var d = JSON.stringify(oTable.fnGetData());
    oTable.fnClearTable()
    oTable.fnAddData(JSON.parse(d));

    validarBalanceo();
}

function editRow(oTable, nRow, strNew) {

    oTable.fnSetColumnVis(12, true);
    //oTable.fnSetColumnVis(15, true);

    var aData = oTable.fnGetData(nRow);
    // console.log(aData);
    var jqTds = $('>td', nRow);
    if (strNew != undefined) {
        jqTds[0].innerHTML = "<a data-mode='new' class='cancel btn red' href='javascript:;' style='max-height:11px'><i class='icon-remove-sign'></i>&nbsp;</a>";
    } else {
        jqTds[0].innerHTML = "<a data-mode='' class='cancel btn red' href='javascript:;' style='max-height:11px'><i class='icon-remove-sign'></i>&nbsp;</a>";
    }
    jqTds[1].innerHTML = "<a class='edit btn blue' href='javascript:;' style='max-height:11px'><i class='icon-ok-sign'></i>&nbsp;</a>";
    jqTds[2].innerHTML = '<div class="control-group"><div class="controls"><input type="text" id="txt_tfecha" name="txt_tfecha" class="fecha m-wrap required" data-date-format="dd/mm/yyyy" style="width:37px;" value="' + aData.FECHA_EMISION + '"></div></div>';
    jqTds[3].innerHTML = '<div class="control-group"><div class="controls">' + comprobanteHTML + '</div></div>';
    jqTds[4].innerHTML = '<div class="control-group"><div class="controls"><input id="txt_tserie" name="txt_tserie" type="text" class="m-wrap required" maxlength="4" style="width:33px;" value="' + aData.SERIE + '"></div></div>';
    jqTds[5].innerHTML = '<div class="control-group"><div class="controls"><input id="txt_tnumero" name="txt_tnumero" type="text" class="m-wrap small required number" onkeypress=" return ValidaDecimales(event,this)" value="' + aData.NUMERO + '"></div></div>';
    jqTds[6].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_trazon" id="txt_trazon" type="text" class="m-wrap small required" value="' + aData.PERSONA + '"></div></div>';
    //jqTds[7].innerHTML = '<div class="control-group"><div class="controls"><select class="required" id="cbograbada" name="cbograbada" style="width:57px;"><option value="S">SI</option><option value="N">NO</option></select></div></div>';
    jqTds[7].innerHTML = '<div class="control-group"><div class="controls"><select class="required" id="cbograbada" name="cbograbada" style="width:57px;"><option value="N">No Registro</option><option value="S">Gravado</option><option value="G">No Gravado</option></select></div></div>';
    jqTds[8].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_ttotal" id="txt_ttotal" type="text" class="m-wrap small number required" onkeypress=" return ValidaDecimales(event,this)" value="' + aData.TOTAL + '"></div></div>';
    jqTds[9].innerHTML = '<div class="control-group"><div class="controls">' + conceptosHTML + '</div></div>';
    jqTds[10].innerHTML = '<div class="control-group"><div class="controls"><select class="required" id="cbosubconceptos" name="cbosubconceptos" style="width:100px;"></select></div></div>';
    jqTds[11].innerHTML = '<div class="control-group"><div class="controls"><textarea id="txt_glosa" name="txt_glosa" class="m-wrap">' + aData.GLOSA + '</textarea></div></div>';
    jqTds[12].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_tpidm" id="txt_tpidm" type="text" class="m-wrap required number" disabled style="width:0px;border:0px;" value="' + aData.PIDM + '"></div></div>';

    jqTds[13].innerHTML = '<div class="control-group"><div class="controls">' + cboTipoBienHTML + '</div></div>';
    jqTds[14].innerHTML = '<div class="control-group"><div class="controls">' + cboPeriodo + '</div></div>';
    jqTds[15].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_truc" id="txt_truc" type="text" class="m-wrap required" disabled  value="' + aData.RUC + '"></div></div>';

    $('.fecha').datepicker();
    $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
    $('.fecha').datepicker("setDate", "now");

    //EVENTOS ELEMENTOS DE FILA EDITABLE
    $("#txt_trazon").typeahead({
        source: function (query, process) {

            array = [];
            map = {};
            datos = arrPersona;
            var obj = "[";
            for (var i = 0; i < datos.length; i++) {
                array.push(datos[i].PERSONA);
                obj += '{';
                obj += '"PERSONA":"' + datos[i].PERSONA + '","PIDM":"' + datos[i].PIDM  + '","RUC":"' + datos[i].RUC + '"';
                obj += '},';
            }
            obj += "{}";
            obj = obj.replace(",{}", "");
            obj += "]";
            var json = $.parseJSON(obj);

            $.each(json, function (i, objeto) {
                map[objeto.PERSONA] = objeto;
            });
            process(array);
        },
        updater: function (item) {
            $("#txt_tpidm").val(map[item].PIDM);
            $("#txt_truc").val(map[item].RUC);
            return item;
        },
    });

    $("#txt_trazon").keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });

    $("#cboconceptos").change(function () {
        var selectEst = $('#cbosubconceptos');
        selectEst.empty();
        $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_CODE=" + $("#cboconceptos").val(),
            async: false,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option cta="' + datos[i].CONTABLE + '" tipo-bien="' + datos[i].TIPO_BIEN + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    });

    $("#cbocomprobante").change(function () {
        var comprobante = $("#cbocomprobante").val();
        if (comprobante == '0000') {
            $("#txt_tserie").attr("disabled", "disabled");
            $("#txt_tnumero").attr("disabled", "disabled");

            $("#cbograbada").val('N');
            $("#cbograbada").attr("disabled", "disabled");
            $("#cboPeriodo").val('').change();
            $("#cboPeriodo").attr('disabled', 'disabled');
        } else {
            $("#txt_tserie").removeAttr("disabled");
            $("#txt_tnumero").removeAttr("disabled");
            $("#cbograbada").removeAttr("disabled");

           
            
            let ind_compras = $('#cbocomprobante option:selected').attr('compras'); //N o S
            let ind_exonerado = $('#slcSucural option:selected').attr('exonerado');

            if (ind_compras == 'N'|| ind_compras == undefined) {
                $("#cbograbada").val('N');
                $("#cbograbada").attr("disabled", "disabled");
                $("#cboPeriodo").val('').change();
                $("#cboPeriodo").attr('disabled', 'disabled');
            }
            else {
                $("#cbograbada").removeAttr("disabled");
                if (ind_exonerado == 'SI') {
                    $("#cbograbada").val('G').change();
                } else {
                    $("#cbograbada").val('S').change();
                }

                $("#cboPeriodo").removeAttr('disabled');
            }


        }
        $("#cbograbada").change();
    });

    $("#cbograbada").on("change", function () {
        if ($("#cbocomprobante").val() == '0000') {
            $("#cboTipoBien").attr("disabled", "disabled");
            $("#cboTipoBien").val("");
        } else {
            $("#cboTipoBien").removeAttr("disabled");
            if ($("#cbograbada").val() == "S" || $("#cbograbada").val() == "G") {
                $("#cboTipoBien").val("0001");
                $("#cboTipoBien").removeAttr("disabled");
            } else {
                $("#cboTipoBien").attr("disabled", "disabled");
                $("#cboTipoBien").val("");
            }
        }
        $("#cbosubconceptos").change();
    });
    //----------------------------------

    $("#cbocomprobante").val(aData.DCTO_CODE);
    $("#cbograbada").val(aData.COMPRAS_IND).change();
    $("#cboconceptos").val(aData.CONCEPTO);
    $("#cboconceptos").change();
    $("#cbosubconceptos").val(aData.SUBCONCEPTO);
    $("#cboTipoBien").val(aData.TIPO_BIEN);
    $("#cboPeriodo").val(aData.PERIODO);
    flag = 'edit';
    $("#agregar").attr("disabled", "disabled");
    $("#cboTipoBien").attr("disabled", "disabled");
    $("#cbograbada").change();


}

function saveRow(oTable, nRow, total) {

    var arr_validar = [];

    if ($("#cbocomprobante").val() == '0000') {
        arr_validar.push("cbocomprobante");
        arr_validar.push("txt_trazon");
        arr_validar.push("txt_ttotal");
        arr_validar.push("cboconceptos");
        arr_validar.push("cbosubconceptos");
        arr_validar.push("txt_glosa");
    } else {
        arr_validar.push("cbocomprobante");
        arr_validar.push("txt_tserie");
        arr_validar.push("txt_tnumero");
        arr_validar.push("txt_trazon");
        arr_validar.push("txt_ttotal");
        arr_validar.push("cboconceptos");
        arr_validar.push("cbosubconceptos");
        arr_validar.push("txt_glosa");       
        if ($("#cbograbada").val() != "N") {
            arr_validar.push("cboTipoBien");
        }
    }



    let ind_compras = $('#cbocomprobante option:selected').attr('compras'); //N o S
    let ind_exonerado = $('#slcSucural option:selected').attr('exonerado');
    let ind_tipoDoc = $('#cbocomprobante option:selected').attr('tipoDoc'); 


    if (ind_tipoDoc == 'SUNAT' && $('#txt_truc').val() == '' ) {
        infoCustom('El documento es tipo Sunat. Por favor seleccione Persona con RUC');
        v_ok = 'N';
        return false;
    }


    if (ind_compras == 'S' && $("#cbograbada").val() == 'N') {
        infoCustom('El documento ingresado debe ir a Reg. de Compras.');
        v_ok = 'N';
        return false;
    }

    if (ind_compras == 'S' && $('#cboPeriodo').val() == '') {
        infoCustom('Ingrese el Periodo de Declaración.');
        v_ok = 'N';
        return false;
    }
    

    if (ind_compras == 'N' && $('#cboPeriodo').val() !== '') {
        infoCustom('El documento no va  a registro de compras, por favor no seleccione periodo.');
        v_ok = 'N';
        return false;
    }

 
    if (vErrors(arr_validar)) {


        if (ind_compras == 'S') {

            var continuar = false;
            var mesEmision = $("#txt_tfecha").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
            var anioEmision = $("#txt_tfecha").val().split("/")[2];
            var mesPeriodo = $("#cboPeriodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
            var anioPeriodo = $("#cboPeriodo").val().split("-")[1];
            if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
                if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
                    continuar = true;
                }
            } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
                continuar = true;
            }

            if (!continuar) {
                infoCustom('La Fecha de Emisión NO debe exceder al Periodo seleccionado.');
                v_ok = 'N';
                return false;
            }


        }

        if ($("#cbosubconceptos :selected").attr("cta") != '') {
            if ($("#txt_tpidm").val() != "") {

                //alert($('#cbocomprobante option:selected').attr('compras'));
             
                if (VerificaExiste($("#txt_tpidm").val(), $("#cbocomprobante").val(), $("#txt_tserie").val(), $("#txt_tnumero").val()) == 'N') {

                    v_ok = 'S';
                    var arr_links = [];
                    arr_links.push("<a class='delete btn red' href='javascript:;' style='max-height:11px'><i class='icon-remove-sign'></i>&nbsp;</a>");
                    arr_links.push("<a class='edit btn yellow' href='javascript:;' style='max-height:11px'><i class='icon-pencil'></i>&nbsp;</a>");
                    var jqTextareas = $('textarea', nRow);//GLOSA
                    var jqInputs = $('input', nRow);//0:txt_rfecha,1:txt_tserie,2:txt_tnumero,3:txt_trazon,4:txt_ttotal,5:txt_tpidm, 6:txt_ruc
                    var jqSelect = $('select', nRow);//0:cbocomprobante,1:cbograbada,2:cboconceptos,3:cbosubconceptos,4:cboTipoBien, 5:cboPeriodo


                    console.log(jqSelect);

                    oTable.fnUpdate(arr_links[0], nRow, 0, false);
                    oTable.fnUpdate(arr_links[1], nRow, 1, false);
                    oTable.fnUpdate(jqInputs[0].value, nRow, 2, false);
                    oTable.fnUpdate(jqSelect[0].value, nRow, 3, false); 
                    oTable.fnUpdate(jqInputs[1].value, nRow, 4, false);
                    oTable.fnUpdate(jqInputs[2].value, nRow, 5, false);
                    oTable.fnUpdate(jqInputs[3].value, nRow, 6, false);
                    oTable.fnUpdate(jqSelect[1].value, nRow, 7, false); 
                    oTable.fnUpdate(jqInputs[4].value, nRow, 8, false); 
                    oTable.fnUpdate(jqSelect[2].value, nRow, 9, false); 

                    $("#cboconceptos").change(function () {
                        var selectEst = $('#cbosubconceptos');
                        selectEst.empty();
                        $.ajax({
                            type: "POST",
                            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_CODE=" + $("#cboconceptos").val(),
                            async: false,
                            success: function (datos) {
                                if (datos != null) {
                                    for (var i = 0; i < datos.length; i++) {
                                        //TO DO: LISTAR Y USAR DESCRIPCION CORTA
                                        selectEst.append('<option cta="' + datos[i].CONTABLE + '" value="' + datos[i].CODIGO + '" desc-corta="' + datos[i].DESCRIPCION + '"  >' + datos[i].DESCRIPCION + '</option>');
                                    }
                                }
                            },
                            error: function (msg) {
                                alertCustom(msg.reponseText);
                            }
                        });
                    });

                    oTable.fnUpdate(jqSelect[3].value, nRow, 10, false); 
                    oTable.fnUpdate(jqTextareas[0].value, nRow, 11, false);
                    oTable.fnUpdate(jqInputs[5].value, nRow, 12, false);
                    oTable.fnUpdate(jqSelect[4].value, nRow, 13, false); 
                    oTable.fnUpdate(jqSelect[5].value, nRow, 14, false); 
                    oTable.fnUpdate(jqInputs[6].value, nRow, 15, false);
                    //DESCRIPCIONES A PARTIR DE LA  COLUMNA 14
                    oTable.fnGetData(nRow).DESC_DCTO = $(jqSelect[0].selectedOptions[0]).html();
                    oTable.fnGetData(nRow).DESC_CONCEPTO = $(jqSelect[2].selectedOptions[0]).html();
                    oTable.fnGetData(nRow).DESC_SUBCONCEPTO = $(jqSelect[3].selectedOptions[0]).html();
                    oTable.fnGetData(nRow).DESC_TIPO_BIEN = $(jqSelect[4].selectedOptions[0]).html();
                    oTable.fnGetData(nRow).DESC_COMPRAS_IND = $(jqSelect[1].selectedOptions[0]).html();
                    oTable.fnGetData(nRow).DESC_PERIODO = $(jqSelect[5].selectedOptions[0]).html();
                    //
                    oTable.fnDraw();
                    var d = JSON.stringify(oTable.fnGetData());
                    oTable.fnClearTable()
                    oTable.fnAddData(JSON.parse(d));

                    oTable.fnSetColumnVis(12, false);

                    $("#txt_trazon").typeahead({
                        source: function (query, process) {

                            array = [];
                            map = {};
                            datos = arrPersona;
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].PERSONA);
                                obj += '{';
                                obj += '"PERSONA":"' + datos[i].PERSONA + '","PIDM":"' + datos[i].PIDM  + '","RUC":"' + datos[i].RUC + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.PERSONA] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            $("#txt_tpidm").val(map[item].PIDM);
                            $("#txt_truc").val(map[item].RUC);
                            return item;
                        },
                    });
                    $("#txt_trazon").keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });

                    v_devolver = v_asignado - v_total;
                    $("#txt_rmonto").val(v_total);
                    $("#txt_rdevolver").val(v_devolver);
                    validarBalanceo();
                    $("#agregar").removeAttr("disabled");

                } else {
                    v_ok = 'N';
                    alertCustom('El documento ya ha sido registrado y aprobado como gasto!!!');
                    return false;
                }
            } else {
                v_ok = 'N';
                alertCustom('Debe seleccionar una Razón Social válida!!!');
                return false;
            }
        } else {
            v_ok = 'N';
            alertCustom('El subconcepto seleccionado no tiene asignado una cuenta contable!!!');
            return false;
        }

    } else {
        v_ok = 'N';
        return false;
    }
}

function cancelEditRow(oTable, nRow) {
    var jqTextareas = $('textarea', nRow);
    var jqInputs = $('input', nRow);
    var jqSelect = $('select', nRow);

    oTable.fnUpdate("<a class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>", nRow, 0, false);
    oTable.fnUpdate("<a class='edit btn yellow' href='javascript:;'><i class='icon-pencil'></i></a>", nRow, 1, false);

    oTable.fnUpdate(jqInputs[0].value, nRow, 2, false);
    oTable.fnUpdate(jqSelect[0].value, nRow, 3, false);
    oTable.fnUpdate(jqInputs[1].value, nRow, 4, false);
    oTable.fnUpdate(jqInputs[2].value, nRow, 5, false);
    oTable.fnUpdate(jqInputs[4].value, nRow, 6, false);
    oTable.fnUpdate(jqSelect[1].value, nRow, 7, false);
    oTable.fnUpdate(jqInputs[5].value, nRow, 8, false);
    oTable.fnUpdate(jqSelect[2].value, nRow, 9, false);
    oTable.fnUpdate(jqSelect[3].value, nRow, 10, false);
    oTable.fnUpdate(jqTextareas[0].value, nRow, 11, false);
    oTable.fnUpdate(jqSelect[4].value, nRow, 13, false);
    oTable.fnUpdate(jqSelect[5].value, nRow, 14, false);
    oTable.fnUpdate(jqInputs[6].value, nRow, 15, false);

    oTable.fnGetData(nRow).DESC_DCTO =$(jqSelect[0].selectedOptions[0]).html();
    oTable.fnGetData(nRow).DESC_CONCEPTO =$(jqSelect[2].selectedOptions[0]).html();
    oTable.fnGetData(nRow).DESC_SUBCONCEPTO =$(jqSelect[3].selectedOptions[0]).html();
    oTable.fnGetData(nRow).DESC_TIPO_BIEN =$(jqSelect[4].selectedOptions[0]).html();
    oTable.fnGetData(nRow).DESC_COMPRAS_IND = $(jqSelect[1].selectedOptions[0]).html();
    oTable.fnGetData(nRow).DESC_PERIODO = $(jqSelect[5].selectedOptions[0]).html();

    oTable.fnDraw();
    var d = JSON.stringify(oTable.fnGetData());
    oTable.fnClearTable()
    oTable.fnAddData(JSON.parse(d));

    var tot = jqInputs[5].value;
    validarBalanceo();
    $("#agregar").removeAttr("disabled");

  
}

//---------------------------------------------------------
function fillTxtSolicitante(v_ID, v_value) {
    var selectinput = $(v_ID);
    selectinput.typeahead({
        minLength: 3,
        source: function (query, process) {
            arrayTrabj = [];
            map = {};
            if (ajaxEmpleados) {
                ajaxEmpleados.abort();
            }         
            $("#imgCargaEmpleado").css("display", "inline-block");
            ajaxEmpleados = $.ajax({
                type: "post",
                url: "vistas/na/ajax/naminsa.ashx?OPCION=3&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
                data: { type: 'keyword', q: query },
                cache: false,
                datatype: "json",
                async: true,
                success: function (datos) {
                    if (datos !== null && datos !== '') {
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayTrabj.push(datos[i].NOMBRE_EMPLEADO);
                            obj += '{';
                            obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","PIDM":"' + datos[i].PIDM + '","DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","DIRECCION":"' + datos[i].DIRECCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_EMPLEADO] = objeto;
                        });
                        return process(arrayTrabj);
                    }
                    if (datos !== null && $.trim(v_value).length > 0) {
                        selectinput.val(v_value);
                    }
                },
                error: function (msg) {
                    if (msg.statusText != "abort") {
                        alertCustom(msg.reponseText);
                    }
                },
                complete: function (msg) {
                    $("#imgCargaEmpleado").css("display", "none");
                }
            });
        },
        updater: function (item) {
            $("#hf_pidm").val(map[item].PIDM);            
            return item;
        },
    });
    selectinput.keyup(function () {
        $(this).siblings("ul").css("width", $(this).css("width"))
    });
}

function filltxtBeneficiario(v_ID, v_value, estado_ind) {
    var selectBeneficiario = $(v_ID);
    Bloquear('ventana');
    $.ajax({
        type: "post",
        url: "vistas/cp/ajax/CPMPGAS.ashx?OPCION=PER",
        cache: false,
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null && datos !== '') {
                arrPersona = datos;
                Desbloquear("ventana");
            }
        },
        error: function (msg) {
            alertCustom('Error al intentar consultar proveedores.');
            Desbloquear("ventana");
        }
    });
}

var estadoAsignacionConsultada = "";

var CAMASCR = function () {

    var validacion = function () {

        var frmPersonaNatural = $("#aspnetForm"); //aspnetForm es el formulario por defecto del ASP
        var errorNatural = $('.alert-error', frmPersonaNatural);
        var successNatural = $('.alert-success', frmPersonaNatural);

        frmPersonaNatural.validate({
            errorElement: 'span', //el input tien por defecto el span para mostrar el error
            errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
            focusInvalid: false, // no se muestra el foco en el elemento invalido
            ignore: "",
            invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                successNatural.hide();
                errorNatural.show();
                App.scrollTo(errorNatural, -200);
            },

            highlight: function (element) { // error para cada input
                $(element)
                    .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
            },

            unhighlight: function (element) { // revierte el error a success
                $(element)
                    .closest('.control-group').removeClass('error');
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde
                //Grabar()
            },

            submitHandler: function (form) {
                successNatural.show();
                errorNatural.hide();
                if ($('#hf_opcion').val() == "1") {
                    GrabarAsignacion();
                } else if ($('#hf_opcion').val() == "2") {
                    ActualizarAsignacion()
                } else if ($('#hf_opcion').val() == "3") {//Listado CALASCR
                    dibujarTabla('0000');
                } else if ($('#hf_opcion').val() == "5") {
                    dibujarTabla('0001');
                } else if ($('#hf_opcion').val() == "6") {
                    Aprobar();
                } else if ($('#hf_opcion').val() == "7") {
                    listarAprobados();
                } else if ($('#hf_opcion').val() == "8") {
                    SoloGrabar();
                } else {
                    GrabarRendicion();
                }

            }
        });
    }

    function fillBandejaexistencias() {
        var oTableExistencias = $('#tblAsignacion').dataTable(
            {                
                "scrollX": true,
                "order":[6,'desc']
            });    

        $('#tblAsignacion').removeAttr('style');
        $('#tblAsignacion tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableExistencias.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var code = $(this).attr("id");
                window.location.href = '?f=camascr&codigo=' + code;
            }
        });

        oTableExistencias.fnAdjustColumnSizing();

    }

    function fillBandejaexistencias1() {
        var oTableExistencias = $('#tblAsignacion').dataTable();
        $('#tblAsignacion').removeAttr('style');

    }

    function validarChecks() {
        $('.check').on('click', function () {
            var x = 0;
            $('input:checkbox:checked').each(function () {
                x = 1;
            })

            if (x == 0) {
                $('#aprobar,#rechazar').addClass('disabled');
                $('#aprobar,#rechazar').removeAttr('href');
            } else {
                $('#aprobar,#rechazar').removeClass('disabled');
                $('#aprobar').attr('href', 'javascript:Aprobar();');
                $('#rechazar').attr('href', 'javascript:Rechazar();');
            }
        });


    }

    function listarAprobados() {
        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        var pidm = $("#hf_pidm").val();
        var finicio = $("#txtfinicio").val();
        var ffin = $("#txtffin").val();

        var estado = '0002';

        var opcion = $("#hf_opcion").val();

        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camascr.ashx?opcion=" + opcion + "&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&estado=" + estado + "&pidm=" + pidm + "&finicio=" + finicio + "&ffin=" + ffin,
            async: false,
            success: function (datos) {
                $('#tblDatos').html(datos);
                fillBandejaexistencias1();
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    function dibujarTabla(estado) {
        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        var aux = estado;;
        if (estado == '0000') {
            aux = $("#cboestado").val();
        }

        var opcion = $("#hf_opcion").val();

        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camascr.ashx?opcion=" + opcion + "&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&estado=" + aux,
            async: false,
            success: function (datos) {
                $('#tblDatos').html(datos);

                if (estado == '0000') {//LISTADO CALASCR opcion 3
                    fillBandejaexistencias();
                } else {
                    fillBandejaexistencias1();
                    $('#aprobar,#rechazar').addClass('disabled');
                    $('#aprobar,#rechazar').removeAttr('href');
                }

                validarChecks();
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    function ListarSucursales(ctlg) {
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
                    }
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    function ListarCajasDisponibles(ctlg, scsl) {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camascr.ashx?OPCION=15&CTLG_CODE=" + ctlg + "&scsl_code=" + scsl + "&caja_code=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbocaja').empty();
                $('#cbocaja').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbocaja').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }


    var plugings = function () {
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
    }

    var cargarComprobantes = function () {
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?ctlg_code=" + $("#slcEmpresa").val() + "&opcion=9",
            success: function (datos) {
                comprobanteHTML = datos;
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    var cargarDocumentos = function () {
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=10",
            success: function (datos) {
                documentosHTML = datos;
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {
            Bloquear('ventana');
            $.ajax({
                type: "POST",
                url: "vistas/ca/ajax/camascr.ASHX?OPCION=4&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#hf_opcion").val('2');
                    $("#hf_codigo").val(datos[0].CODIGO);
                    $("#slcEmpresa").val(datos[0].CTLG_CODE);
                    $("#slcEmpresa").change();
                    $("#slcSucural").val(datos[0].SCSL_CODE);
                    $("#slcSucural").change();
                    $("#slcEmpresa").attr("disabled", "disabled");
                    $("#slcSucural").attr("disabled", "disabled");
                    $("#hf_pidm").val(datos[0].PIDM);
                    $("#txtempleado").val(datos[0].EMPLEADO);

                    if (datos[0].ACTIVO == 'S') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    $("#txtglosa").val(datos[0].GLOSA);
                    $("#cbomoneda").val(datos[0].MONE_CODE);
                    $("#cbomoneda").change();
                    $("#txtmonto").val(datos[0].MONTO);
                    $("#txtfecasignacion").val(datos[0].FECHA_REGISTRO);
                    $("#txtfecha").val(datos[0].FECHA_LIMITE);
                    $("#txtcentrocosto").data("CodCentroCostoCab", datos[0].CECD_CODE); 
                    $("#txtcentrocosto").data("CodCentroCosto", datos[0].CECC_CODE);
                    $("#txtcentrocosto").val(datos[0].CENTRO_COSTO);
                    $("#cboestado").val(datos[0].ESTADO);

                    if (datos[0].ESTADO == '0001') {
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $(".detalles").hide();

                    } else {
                        $("#grabar").hide();
                        $(".detalles").show();
                        $("#txt_usuario_aprobacion").val(datos[0].USUA_APROBACION);
                        $("#txt_fecha_aprobacion").val(datos[0].FECHA_APROBACION);

                        $("#txt_caja_pago").val(datos[0].CAJA_PAGO);
                        $("#txt_fecha_pago").val(datos[0].FECHA_PAGO);

                        $("#txt_caja_rendicion").val(datos[0].CAJA_RENDICION);
                        $("#txt_fecha_rendicion").val(datos[0].FECHA_RENDICION);
                        $("#porcentaje").attr("style", "width:" + datos[0].PROGRESO + "%");
                        $("#porcentaje").text(datos[0].PROGRESO + '%');
                    }

                    $("#cboestado").change();

                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom(msg.reponseText);
                    Desbloquear('ventana');
                }
            });

            fillTxtSolicitante("#txtempleado", "");

        }


        var oTable = $('#tblDocumentos').dataTable({
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ registros por pagina",
                "oPaginate": {
                    "sPrevious": "Anterior",
                    "sNext": "Siguiente"
                }
            },
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }
            ]
        });

        oTable.fnSetColumnVis(11, false);

        jQuery('#tblDocumentos .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
        jQuery('#tblDocumentos .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

        var nEditing = null;

        $('#agregar').click(function (e) {
            if ($("#txtcodcuenta").val().length == 0) {
                alertCustom("Debe seleccionar una asignación para continuar!!!");
            }
            else {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '', '', '', '', '', '', '','',''
                   ]);//FALTA: descComprobante, descDcto,descCompra,descConcepto,descSubconcepto,descTipoBien

                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow,"new");
                nEditing = nRow;
            }
        });

        $('#tblDocumentos a.delete').live('click', function (e) {
            e.preventDefault();

            if (confirm("Esta Seguro de Quitar esta fila?") == false) {
                validarBalanceo();
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
        });

        $('#tblDocumentos a.cancel').live('click', function (e) {
            e.preventDefault();
            if ($(this).attr("data-mode") == "new") {
                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
            $("#agregar").removeAttr("disabled");
        });

        $('#tblDocumentos a.edit').live('click', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && flag == "edit") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing, f_total);

                if (v_ok == 'S') {
                    nEditing = null;
                    flag = 'normal';
                } else {
                    return false;
                }

            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
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
                alertCustom(msg.reponseText);
            }
        });
    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
            ListarCajasDisponibles($('#slcEmpresa').val(), $('#slcSucural').val());
            fillTxtSolicitante("#txtempleado", '');
          
        });

        $("#slcSucural").on("change", function () {
            $("#txtempleado").val("");
            $("#hf_pidm").val("");
        });


        $("#cbocaja").on('change', function () {
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camascr.ashx?OPCION=15&CTLG_CODE=" + $('#slcEmpresa').val() + "&scsl_code=" + $('#slcSucural').val() + "&caja_code=" + $('#cbocaja').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {

                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $("#caja_responsable").text('RESPONSABLE: ' + datos[i].RESPONSABLE);
                            $("#caja_saldo").text('SALDO: S/. ' + datos[i].SALDO);
                            $("#caja_tipo").text('TIPO: ' + datos[i].TIPO);
                        }
                    }
                },
                error: function (msg) {
                    alertCustom(msg.reponseText);
                }
            });

        });


    }

    var fillcboMoneda = function () {
        CrearControl('N', '1', 'cbomoneda', 'con_moneda');
    }

    var cargamodal = function () {

        $("#btnListarA").click(function () {

            var opcion = $("#hf_opcion").val();
            var ctlg_code = $("#slcEmpresa").val();
            var scsl_code = $("#slcSucural").val();
            var pidm = $("#hf_pidm").val();
            var estado = "0002";

            $.post("vistas/CA/ajax/CAMASCR.ASHX", { opcion: opcion, ctlg_code: ctlg_code, scsl_code: scsl_code, estado: estado, pidm: pidm },
                   function (res) {
                       $("#divmodal").html("");
                       $("#divmodal").html(res);

                       var tablemod = $('#tblbmodal').DataTable({
                           "scrollCollapse": true,
                           "paging": false,
                           "info": false
                       });

                       $('#tblbmodal tbody').on('click', 'tr', function () {
                           if ($(this).hasClass('selected')) {
                               $(this).removeClass('selected');
                           }
                           else {
                               tablemod.$('tr.selected').removeClass('selected');
                               $(this).addClass('selected');
                           }

                           $('#muestralistap').modal('hide');
                           var IDPER2 = $(this).attr("id");

                           $('#hf_codigo').val(IDPER2);
                           $('#txtcodcuenta').val(IDPER2);
                           $('#txtcentrocosto').val($('#cc' + IDPER2).html());
                           $('#txtglosa').val($('#gl' + IDPER2).html());
                           $('#cbomoneda').val($('#mn' + IDPER2).attr("name"));
                           $('#cbomoneda').change();
                           $('#txtmonto').val($('#mo' + IDPER2).html());
                           $('#txt_rasignado').val($('#mo' + IDPER2).html());
                           //TO DO: USAR ESTADO PARA GRABAR COMO EXTEMPORANEO SU ES VENCIDO
                           estadoAsignacionConsultada = $('#es' + IDPER2).html();

                           var asig = $('#txt_rasignado').val();
                           if (asig.length == 0) {
                               v_asignado = 0;
                           } else {
                               v_asignado = parseFloat(asig);
                           }

                       });
                   });
        });
    }
    return {
        init: function () {
            cargaInicial();
            plugings();
            fillCboEmpresa();
            eventoControles();
            fillcboMoneda();
            validacion();
            cargamodal();
            cargarDocumentos();
            $("#slcEmpresa").change();
            cargarComprobantes();
        }
    };

}();

var ajaxEmpleados = null;

//RENDICION DE CUENTAS

var CAMRENC = function () {

    var cargamodal = function () {

        $("#btnListarA").click(function () {

            var opcion = $("#hf_opcion").val();
            var ctlg_code = $("#slcEmpresa").val();
            var scsl_code = $("#slcSucural").val();
            var pidm = $("#hf_pidm").val();
            var estado = "0003";

            Bloquear("muestralistap");
            $.post("vistas/CA/ajax/CAMASCR.ASHX", { opcion: opcion, ctlg_code: ctlg_code, scsl_code: scsl_code, estado: estado, pidm: pidm },
                   function (res) {
                       Desbloquear("muestralistap");
                       $("#divmodal").html("");
                       $("#divmodal").html(res);

                       var tablemod = $('#tblbmodal').DataTable({
                           "scrollCollapse": true,
                           "paging": false,
                           "info": false
                       });

                       $('#tblbmodal tbody').on('click', 'tr', function () {
                           if ($(this).hasClass('selected')) {
                               $(this).removeClass('selected');
                           }
                           else {
                               tablemod.$('tr.selected').removeClass('selected');
                               $(this).addClass('selected');
                           }

                           $('#muestralistap').modal('hide');
                           var IDPER2 = $(this).attr("id");

                           $('#hf_codigo').val(IDPER2);
                           $('#txtcodcuenta').val(IDPER2);
                           $('#txtcentrocosto').val($('#cc' + IDPER2).html());
                           $('#txtglosa').val($('#gl' + IDPER2).html());
                           $('#cbomoneda').val($('#mn' + IDPER2).attr("name"));
                           $('#cbomoneda').change();
                           $('#txtmonto').val($('#mo' + IDPER2).html());
                           $('#txt_rasignado').val($('#mo' + IDPER2).html());
                           var asig = $('#txt_rasignado').val();
                           if (asig.length == 0) {
                               v_asignado = 0;
                           } else {
                               v_asignado = parseFloat(asig);
                           }

                       });
                   });
        });
    }

    var validacion = function () {

        var frmPersonaNatural = $("#aspnetForm"); //aspnetForm es el formulario por defecto del ASP
        var errorNatural = $('.alert-error', frmPersonaNatural);
        var successNatural = $('.alert-success', frmPersonaNatural);

        frmPersonaNatural.validate({
            errorElement: 'span', //el input tien por defecto el span para mostrar el error
            errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
            focusInvalid: false, // no se muestra el foco en el elemento invalido
            ignore: "",
            invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                successNatural.hide();
                errorNatural.show();
                App.scrollTo(errorNatural, -200);
            },

            highlight: function (element) { // error para cada input
                $(element)
                    .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
            },

            unhighlight: function (element) { // revierte el error a success
                $(element)
                    .closest('.control-group').removeClass('error');
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde
                //Grabar()
            },

            submitHandler: function (form) {
                successNatural.show();
                errorNatural.hide();
                if ($('#hf_opcion').val() == "1") {
                    GrabarAsignacion();
                } else if ($('#hf_opcion').val() == "2") {
                    ActualizarAsignacion()
                } else if ($('#hf_opcion').val() == "3") {
                    dibujarTabla('0000');
                } else if ($('#hf_opcion').val() == "5") {
                    dibujarTabla('0001');
                } else if ($('#hf_opcion').val() == "6") {
                    Aprobar();
                } else if ($('#hf_opcion').val() == "7") {
                    listarAprobados();
                } else if ($('#hf_opcion').val() == "8") {
                    GrabarRendicion();
                }

            }
        });
    }

    function ListarSucursales(ctlg) {
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

                        $('#slcSucural').append('<option exonerado="' + datos[i].EXONERADO + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();
                cargarCajas();
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    function fillTxtSolicitante(v_ID, v_value) {

        var selectinput = $(v_ID);
        selectinput.typeahead({
            minLength: 3,
            source: function (query, process) {
                arrayTrabj = [];
                map = {};
                if (ajaxEmpleados) {
                    ajaxEmpleados.abort();
                }
                $("#imgCargaEmpleado").css("display", "inline-block");
                ajaxEmpleados = $.ajax({
                    type: "post",
                    url: "vistas/na/ajax/naminsa.ashx?OPCION=3&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
                    data: { type: 'keyword', q: query },
                    cache: false,
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        if (datos !== null && datos !== '') {
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayTrabj.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","PIDM":"' + datos[i].PIDM + '","DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","DIRECCION":"' + datos[i].DIRECCION + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            return process(arrayTrabj);
                        }
                        if (datos !== null && $.trim(v_value).length > 0) {
                            selectinput.val(v_value);
                        }
                    },
                    error: function (msg) {
                        if (msg.statusText != "abort") {
                            alertCustom(msg);
                        }
                    },
                    complete: function (msg) {
                        $("#imgCargaEmpleado").css("display", "none");
                    }
                });
            },
            updater: function (item) {
                $("#hf_pidm").val(map[item].PIDM);
                return item;
            },
        });
        selectinput.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
        });
    }

    var plugings = function () {
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $("#devmoneda").attr("disabled", "disabled");
        $("#cbomoneda").attr("disabled", "disabled");
        $("#devmoneda").select2();
        $("#cbomoneda").select2();
    }

    var cargarComprobantes = function () {
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=9&ctlg_code=" + $("#slcEmpresa").val(),
            success: function (datos) {
                comprobanteHTML = datos;
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    var cargarDocumentos = function () {
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=10",
            success: function (datos) {
                documentosHTML = datos;
            },
            error: function (msg) {
                alertCustom(msg.reponseText);

            }
        });
    }

    var cargaConceptos = function () {
        conceptosHTML = '';
        $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=3&p_TIPO=3&p_ESTADO_IND=A&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            async: false,
            success: function (datos) {
                conceptosHTML += "<select class='required' id='cboconceptos' name='cboconceptos' style='width:100px;'>"
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        conceptosHTML += '<option cta="' + datos[i].CONTABLE + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>';
                    }
                }
                conceptosHTML += "</select>";
            },
            error: function (msg) {
                alertCustom(msg.reponseText);

            }
        });
    }

    function cargarCajas() {
        var ctlg_code = $("#slcEmpresa").val();

        $.ajax({
            type: "POST",
            url: "vistas/cp/ajax/CPMPGDI.ASHX?flag=7&empresa=" + ctlg_code + "&usuario=" + $("#ctl00_txtus").val(),
            async: false,
            success: function (datos) {
                $("#cbo_dcaja").html(datos).select2();
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    var cargaInicial = function () {

        fillTxtSolicitante("#txtempleado", "");

        oTable = $('#tblDocumentos').dataTable({
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 20,
            "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ registros por pagina",
                "oPaginate": {
                    "sPrevious": "Anterior",
                    "sNext": "Siguiente"
                }
            },
            data: null,
            columns: [
                {
                    data: "LINK_QUITAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "LINK_EDITAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DCTO_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        //if (rowData.COMPLETO_IND == "S") {
                            $(td).html(rowData.DESC_DCTO);
                        //}
                    }
                },
                 {
                     data: "SERIE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'right')
                     }
                 },
                 {
                     data: "NUMERO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 },
                 {
                     data: "PERSONA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 },
                 {
                     data: "COMPRAS_IND",
                     createdCell: function (td, cellData, rowData, row, col) {
                         //if (rowData.COMPLETO_IND == "S") {
                             $(td).attr('align', 'center');
                             if (rowData.COMPRAS_IND == "S") {
                                 $(td).html("Gravado")
                             } else if (rowData.COMPRAS_IND == "N") {
                                 $(td).html("No Registro")
                             } else { //G
                                 $(td).html("No Gravado")
                             }
                         //}
                     }
                 },
                 {
                     data: "TOTAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "CONCEPTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         //if (rowData.COMPLETO_IND == "S") {
                             $(td).html(rowData.DESC_CONCEPTO);
                         //}
                     }
                 },
                 {
                     data: "SUBCONCEPTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         //if (rowData.COMPLETO_IND == "S") {
                             $(td).html(rowData.DESC_SUBCONCEPTO);
                         //}
                     }
                 },
                 {
                     data: "GLOSA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "PIDM",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     visible: false
                 },
                 {
                     data: "TIPO_BIEN",
                     createdCell: function (td, cellData, rowData, row, col) {
                         //if (rowData.COMPLETO_IND == "S") {
                             $(td).html(rowData.DESC_TIPO_BIEN);
                         //}
                     }
                 },
                 {
                     data: "PERIODO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         //if (rowData.COMPLETO_IND == "S") {
                             $(td).html(rowData.DESC_PERIODO);
                         //}
                     }
                 },
                 {
                     data: "RUC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                api.data().filter(function (e) {
                    y.push(isNaN(parseFloat(e.TOTAL)) ? 0 : parseFloat(e.TOTAL));

                });
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                    $("#txt_rmonto").val(v_total);
                }
            }
        });


        var CODE = ObtenerQueryString("asig_code");

        if (typeof (CODE) !== "undefined") {

            Bloquear("ventana");

            $.ajax({
                type: "post",
                url: "vistas/CA/ajax/CAMASCR.ashx?OPCION=15&asig_code=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {

                        $("#slcEmpresa").val(datos[0].CTLG_CODE).change();
                        $("#slcSucural").val(datos[0].SCSL_CODE).change();
                        $("#txtempleado").val(datos[0].EMPLEADO);
                        $("#hf_pidm").val(datos[0].PIDM_EMPL);
                        $("#txtcodcuenta").val(datos[0].ASIG_CODE);
                        $("#txtcentrocosto").val(datos[0].CENTRO_COSTO);
                        $("#txtglosa").val(datos[0].GLOSA_ASIG);
                        $("#cbomoneda").val(datos[0].MONE_ASIG).change();
                        $("#txtmonto").val(datos[0].MONTO_ASIG);
                        $("#txt_dmonto").val(datos[0].DEVOLVER);
                        $("#cbo_dcaja").val(datos[0].CAJA_CODE).change();
                        $("#dev_moneda").text($("#cbomoneda :selected").text());

                        oTable.fnClearTable();
                        oTable.fnAddData(datos);

                        if (datos[0].COMPLETO_IND == 'S') {
                            BloquearRendicionCuenta();
                        }
                        validarBalanceo();
                    }

                    Desbloquear("ventana");

                },
                error: function (msg) {
                    noexitoCustom("Error Listado")
                    Desbloquear("ventana");
                }
            });
            $("#btnMail").removeClass("hidden");
        }


        jQuery('#tblDocumentos .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
        jQuery('#tblDocumentos .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

        var nEditing = null;

        $('#agregar').click(function (e) {
            e.preventDefault();
            if ($("#txtcodcuenta").val().length == 0) {
                alertCustom("Debe seleccionar una asignación para continuar!!!");
            } else {
                var arr_vacio = new Object();
                arr_vacio.LINK_QUITAR = '';
                arr_vacio.LINK_EDITAR = '';
                arr_vacio.FECHA_EMISION = '';
                arr_vacio.DCTO_CODE = '';
                arr_vacio.SERIE = '';
                arr_vacio.NUMERO = '';
                arr_vacio.PERSONA = '';
                arr_vacio.COMPRAS_IND = '';
                arr_vacio.TOTAL = '';
                arr_vacio.CONCEPTO = '';
                arr_vacio.SUBCONCEPTO = '';
                arr_vacio.GLOSA = '';
                arr_vacio.PIDM = '';
                arr_vacio.TIPO_BIEN = '';
                arr_vacio.PERIODO = '';
                arr_vacio.RUC = '';

                arr_vacio.DESC_DCTO = '';
                arr_vacio.DESC_CONCEPTO = '';
                arr_vacio.DESC_SUBCONCEPTO = '';         
                arr_vacio.DESC_TIPO_BIEN = '';
                arr_vacio.DESC_COMPRAS_IND = '';
                arr_vacio.DESC_PERIODO = '';

                var aiNew = oTable.fnAddData(arr_vacio);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow,'new');
                nEditing = nRow;
            }
        });

        $('#tblDocumentos a.delete').live('click', function (e) {
            e.preventDefault();

            if (confirm("Esta Seguro de Quitar esta fila?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];

            oTable.fnDeleteRow(nRow);

            var api = $("#tblDocumentos").dataTable().api();
            var y = new Array();
            api.data().filter(function (e) {
                y.push(isNaN(parseFloat(e.TOTAL)) ? 0 : parseFloat(e.TOTAL));
            });
            var total = 0;
            for (var i = 0; i < y.length; i++) {
                total += y[i];
            }
            v_total = total;

            v_devolver = v_asignado - v_total;
            $("#txt_rmonto").val(v_total);
            $("#txt_rdevolver").val(v_devolver);
           
            validarBalanceo();
        });

        $('#tblDocumentos a.cancel').live('click', function (e) {
            e.preventDefault();
            if ($(this).attr("data-mode") == "new") {
                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
            $("#agregar").removeAttr("disabled");
        });

        $('#tblDocumentos a.edit').live('click', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && flag == "edit") {
                /* Editing this row and want to save it */

                saveRow(oTable, nEditing, '0');
                if (v_ok == 'S') {
                    nEditing = null;
                    flag = 'normal';
                } else {
                    return false;
                }

            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
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
                alertCustom(msg.reponseText);
            }
        });
    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
            fillTxtSolicitante("#txtempleado", '');
        });

        $('#slcSucural').on('change', function () {
            $("#txtempleado").val("");
            $("#hf_pidm").val("");

            cargarCajas();
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("RENDICIÓN DE CUENTAS - " + $("#slcEmpresa :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#slcEmpresa :selected").html() + "</p><p><small>ESTABLECIMIENTO: " + $("#slcSucural :selected").html() + "</small></p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
            GenerarDctoImprimir();
        });

        $(document).on("change","#cbosubconceptos", function () {
            if ($("#cboTipoBien").val()!=undefined && ObtenerQueryString("asig_code") == undefined ) {
                if ($("#cboTipoBien").attr("disabled") != "disabled") {
                    if ($('#cbosubconceptos option:selected').attr("tipo-bien") != "") {
                        $("#cboTipoBien").val($('#cbosubconceptos option:selected').attr("tipo-bien"));
                    } else {
                        $('#cboTipoBien').val("0001");
                    }
                }               
            }
        });
    }

    var fillcboMoneda = function () {

        CrearControl('N', '1', 'cbomoneda', 'con_moneda');
        $("#cbonomeda").attr("disabled", "disabled");

    }

    var fillCboTipoBien = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
                + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                cboTipoBienHTML = '<select id="cboTipoBien">'
                cboTipoBienHTML += '<option value="">Ninguno</option>';
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            cboTipoBienHTML += ('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
                cboTipoBienHTML += '</select>'
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            }
        });
    }


    var fillCbo_Periodo = function () {

        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=98&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                cboPeriodo = '<select id="cboPeriodo">'
                cboPeriodo += '<option value="">Ninguno</option>';
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        cboPeriodo += ('<option value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }                    
                } 
                cboPeriodo += '</select>';
            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    }

    var peticionTipoCambio = function () {

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=1",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {

                if (datos[0].VENTA != '0') {
                    $("#txt_tcambio").val(datos[0].VENTA);
                    //$("#txtCompraOficial").val(datos[0].COMPRA);
                } else {
                    alertCustom('No existe tipo de cambio.');
                    $("#txt_tcambio").val('0.00');
                }

            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
    }

    return {
        init: function () {
            fillCboEmpresa();
            fillCboTipoBien();
            fillCbo_Periodo();
            ListarSucursales($('#slcEmpresa').val());
            fillTxtSolicitante("#txtempleado", "");
            filltxtBeneficiario("", "", "");
            eventoControles();
            cargarCajas();
            fillcboMoneda();
            validacion();
            cargamodal();
            cargarDocumentos();
            cargarComprobantes();
            cargaConceptos();
            peticionTipoCambio();
            plugings();
            cargaInicial();
        }
    };

}();

var CALREPR = function () {
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
            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });
        $("#slcEmpresa").val($("#ctl00_hddctlg").val()).select2().change();
    }

    function ListarSucursales(ctlg) {
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
                    }
                }

            },
            error: function (msg) {
                alertCustom(msg.reponseText);
            }
        });

        $("#slcSucural").val($("#ctl00_hddestablecimiento").val()).select2().change();

    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
        });

        $("#slcSucural").on('change', function () {
            ListaRendiciones();
        });

        $("#btn_filtrar").click(function () {
            ListaRendiciones();
        })
    }

    var fillBandeja = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                //{
                //    data: "FECHA_REGISTRO",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', '')
                //    }
                //},
                 {
                     data: "FECHA_LIMITE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     type:"fecha"
                 }
                 ,
                 {
                     data: "EMPLEADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 },

                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "MONEDA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "MONTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "RENDIDO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
                 ,
                 {
                     data: "PORCENTAJE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         var color;
                         if (parseInt(rowData.PORCENTAJE) <= 25) {
                             color = 'danger';
                         } else if (parseInt(rowData.PORCENTAJE) > 25 && parseInt(rowData.PORCENTAJE) <= 50) {
                             color = 'warning';
                         } else if (parseInt(rowData.PORCENTAJE) > 50 && parseInt(rowData.PORCENTAJE) <= 75) {
                             color = 'striped';
                         } else {
                             color = 'success';
                         }
                         var html_barra = '<div class="progress progress-' + color + ' active"><div id="porcentaje" style="width:' + (parseInt(rowData.PORCENTAJE) > 100 ? 100 : rowData.PORCENTAJE) + '%;" class="bar">' + (parseInt(rowData.PORCENTAJE) > 100 ? 100 : rowData.PORCENTAJE) + '%</div></div>';
                         $(td).html(html_barra)
                     }
                 },
                 {
                     data: "USUARIO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "COMPLETO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }

            ]
        }

        oTableGST = iniciaTabla('tbl_bandeja', parms);

        $('#tbl_bandeja').removeAttr('style');

        $('#tbl_bandeja').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $("#tbl_bandeja tr.selected").removeClass('selected');
                $(this).addClass('selected');
                var row = $("#tbl_bandeja").DataTable().row(this).data();
                var code = row.CODIGO;
                window.open("?f=camrenc&asig_code=" + code, '_blank');
            }
        });

    }

    var ListaRendiciones = function () {

        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        var completo_ind = $("#slcEstado").val();

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CA/ajax/CAMASCR.ashx?OPCION=16&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&estado=" + completo_ind,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    oTableGST.fnClearTable();
                    oTableGST.fnAddData(datos);
                } else {
                    oTableGST.fnClearTable();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
    }

    return {
        init: function () {
            eventoControles();
            fillCboEmpresa();
            fillBandeja();
        }
    };

}();

$("#btnListarA").click(function (e) {
    e.preventDefault();
    var opcion = $("#hf_opcion").val();
    var ctlg_code = $("#slcEmpresa").val();
    var scsl_code = $("#slcSucural").val();
    var pidm = $("#hf_pidm").val();
    var estado = "0003";

    if (pidm.length == 0) {
        alertCustom('Debe Seleccionar un empleado para poder continuar!!!');
        $('#txtempleado').focus();
        return false;
    }

    $.post("vistas/CA/ajax/CAMASCR.ASHX", { opcion: opcion, ctlg_code: ctlg_code, scsl_code: scsl_code, estado: estado, pidm: pidm },
           function (res) {
               $("#divmodal").html("");
               $("#divmodal").html(res);

               var tablemod = $('#tblbmodal').DataTable({
                   "scrollCollapse": true,
                   "paging": false,
                   "info": false
               });

               $('#tblbmodal tbody').on('click', 'tr', function () {
                   if ($(this).hasClass('selected')) {
                       $(this).removeClass('selected');
                   }
                   else {
                       tablemod.$('tr.selected').removeClass('selected');
                       $(this).addClass('selected');
                   }

                   $("#agregar").removeAttr("disabled");

                   $('#muestralistap').modal('hide');
                   var IDPER2 = $(this).attr("id");

                   $('#hf_codigo').val(IDPER2);
                   $('#txtcodcuenta').val(IDPER2);
                   $('#txtcentrocosto').val($('#cc' + IDPER2).html());
                   $('#txtglosa').val($('#gl' + IDPER2).html());
                   $('#cbomoneda').val($('#mn' + IDPER2).attr("name")).change();
                   $('#txtmonto').val($('#mo' + IDPER2).html());
                   validarBalanceo();
               });
           });
});

$("#btnImprimir").on("click", function () {
    GenerarDctoImprimir();
    ImprimirDcto();
});

function ImprimirDcto() {
    Bloquear($($('#btnImprimir').parents("div")[0]));
    setTimeout(function () {
        Desbloquear($($('#btnImprimir').parents("div")[0]));
        window.print();
    }, 200)
}

function GenerarDctoImprimir() {
    if ($("#styleImpresion").val() == undefined) {
        var estilos = '<style id="styleImpresion">@media print{.navbar-inner{display:none!important}.page-sidebar{display:none!important}.footer{display:none!important}.page-content{margin-left:0!important}#gritter-notice-wrapper{display:none!important}#contenedor{display:none!important}#contenedorBreadcrumb{display:none!important}.page-container{margin-top:0!important}#divDctoImprimir{display:block!important;width:100%!important;line-height:11px!important;font-family:Arial!important}.container-fluid{padding:0!important}.dn{display:none !important;}}</style>';
        $("#ventana").append(estilos);
    }
    var cod = ObtenerQueryString("codigo");    
    //Generar datos para dcto Imprimir
    var tabla = '<div class="portlet-title"><h4><i class="icon-reorder"></i>RENDICION DE CUENTAS</h4></div>';
    tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody>';
    tabla += '<tr style="vertical-align: top;">';
    tabla += '<td><strong>EMPRESA:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#slcEmpresa :selected").html() + '</strong></td>';
    tabla += '<td><strong>ESTABLECIMIENTO:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#slcSucural :selected").html() + '</td>';
    tabla += '</tr>';
    tabla += '<tr style="vertical-align: top;">';
    tabla += '<td><strong>EMPLEADO:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#txtempleado").val() + '</strong></td>';
    tabla += '<td><strong>ASIGNACIÓN:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#txtcodcuenta").val() + '</strong></td>';
    tabla += '</tr>';
    tabla += '<tr style="vertical-align: top;">';
    tabla += '<td><strong>CENTRO DE COSTO:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#txtcentrocosto").val() + '</td>';
    tabla += '<td><strong>GLOSA:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#txtglosa").val() + '</td>';
    tabla += '</tr>';
    tabla += '<tr style="vertical-align: top;">';
    tabla += '<td><strong>MONEDA:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#cbomoneda option:selected").html() + '</td>';
    tabla += '<td><strong>MONTO:</strong></td>';
    tabla += '<td style="line-height: 19px;">' + $("#txtmonto").val() + '</td>';
    tabla += '</tr>';
    tabla += '</tbody></table><br/>';
    //DETALLES
    tabla += '<fieldset class="scheduler-border "><legend class="scheduler-border " id="legend">Detalles</legend>';
    tabla += '<table class="table display DTTT_selectable" border="1">';
    tabla += '<thead><tr align="center">';
    tabla += '<th>Fecha</th><th>Comprobante</</th><th>Serie</th><th>Número</th><th>Razón Social</th><th>Compras</th><th>Total</th><th>Concepto</th><th>Sub-concepto</th><th>Glosa</th><th>TipoBien</th>';
    tabla += '</tr></thead><tbody>';
    var detalles = $("#tblDocumentos").DataTable().data();
    if (cod != undefined) {//LA DATA YA VIENE CON SUS DESCRIPCIONES
        for (var i = 0; i < detalles.length ; i++) {
            var compras = "";
            if (detalles[i].COMPRAS_IND == "S") {
                compras = ("Gravado")
            } else if (detalles[i].COMPRAS_IND == "N") {
                compras = ("No Registro")
            } else { //G
                compras = ("No Gravado")
            }
            tabla += '<tr>';
            tabla += '<td align="center">' + detalles[i].FECHA_EMISION + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_DCTO + '</td>';
            tabla += '<td align="center">' + detalles[i].SERIE + '</td>';
            tabla += '<td align="center">' + detalles[i].NUMERO + '</td>';
            tabla += '<td align="center">' + detalles[i].PERSONA + '</td>';
            tabla += '<td align="center">' + compras + '</td>';
            tabla += '<td align="center">' + detalles[i].TOTAL + '</td>';
            tabla += '<td align="center" style="word-break:break-all;">' + detalles[i].DESC_CONCEPTO + '</td>';
            tabla += '<td align="center" style="word-break:break-all;">' + detalles[i].DESC_SUBCONCEPTO + '</td>';
            tabla += '<td align="center">' + detalles[i].GLOSA + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_TIPO_BIEN + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_PERIODO + '</td>';
            tabla += '</tr>';
        }
    } else {//LA DATA NO TIENE DESCRIPCIONES SOLO CODIGOS
        for (var i = 0; i < detalles.length ; i++) {
            var compras = "";
            if (detalles[i].COMPRAS_IND == "S") {
                compras = ("Gravado")
            } else if (detalles[i].COMPRAS_IND == "N") {
                compras = ("No Registro")
            } else { //G
                compras = ("No Gravado")
            }
            tabla += '<tr>';
            tabla += '<td align="center">' + detalles[i].FECHA_EMISION + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_DCTO + '</td>';
            tabla += '<td align="center">' + detalles[i].SERIE + '</td>';
            tabla += '<td align="center">' + detalles[i].NUMERO + '</td>';
            tabla += '<td align="center">' + detalles[i].PERSONA + '</td>';
            tabla += '<td align="center">' + compras + '</td>';
            tabla += '<td align="center">' + detalles[i].TOTAL + '</td>';
            tabla += '<td align="center" style="word-break:break-all;">' + detalles[i].DESC_CONCEPTO + '</td>';
            tabla += '<td align="center" style="word-break:break-all;">' + detalles[i].DESC_SUBCONCEPTO + '</td>';
            tabla += '<td align="center">' + detalles[i].GLOSA + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_TIPO_BIEN + '</td>';
            tabla += '<td align="center">' + detalles[i].DESC_PERIODO + '</td>';
            tabla += '</tr>';
        }
    }
    tabla += '</tbody></table></fieldset><br/>';
    tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody><tr>';
    tabla += '<td><strong>MONTO:</strong></td><td>' + formatoMiles($("#txt_rmonto").val()) + '</strong></td>';
    tabla += '<td><strong>ASIGNADO:</strong></td><td>' + formatoMiles($("#txt_rasignado").val()) + '</td>';
    tabla += '<td><strong>A DEVOLVER:</strong></td><td>' + formatoMiles($("#txt_rdevolver").val()) + '</td>';
    tabla += '<td><strong>T.C.:</strong></td><td>' + formatoMiles($("#txt_tcambio").val()) + '</td>';
    tabla += '</tr></tbody></table><br/>';
    //TOTALES
    tabla += '<br/>';
    tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody><tr>';
    tabla += '<td><strong>Destino:</strong></td><td>' + $("#scl_destino option:selected").html() + '</strong></td>';
    tabla += '<td><strong>Moneda:</strong></td><td>' + $("#dev_moneda").text() + '</td>';
    tabla += '<td><strong>Monto Devolver:</strong></td><td>' + formatoMiles($("#txt_dmonto").val()) + '</td>';
    tabla += '</tr>';
    tabla += '<tr>';
    tabla += '<td><strong>Caja:</strong></td><td>' + $("#cbo_dcaja option:selected").html() + '</td>';
    tabla += '<td><strong>Equivalente MN:</strong></td><td>' + formatoMiles($("#txt_dmsoles").val()) + '</td>';
    tabla += '<td><strong>Sobrante:</strong></td><td>' + formatoMiles($("#txt_ddevolver").val()) + '</td>';
    tabla += '</tr></tbody></table>';

    $("#divDctoImprimir").html(tabla);
  
}


//EMAIL
function cargarCorreos() {
    ObtenerCorreoUsuario();
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
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
};

var ObtenerCorreoUsuario = function () {
    var email = "";
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ashx?OPCION=RU&ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                email = datos[0].EMAIL;
            } else {
                alertInfo("No se encontro ningun email para remitente!");
            }
        },
        complete: function () {
            $("#txtRemitente").val(email);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $("#divDctoImprimir").html());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            exito();
            $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            setTimeout(function () { $('#divMail').modal('hide'); }, 25);
        })
        .error(function () {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
        });

    }
};

$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});

$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});

//-----------