<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMORDC.ascx.vb" Inherits="vistas_NO_NOMORDC" %>
<style>
    .center {
        text-align: center;
    }

    .right {
        text-align: right;
    }
</style>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ORDEN PARA ADQUISICION DE BIENES/SERVICIOS</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn green" href="?f=nomordc"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nolordc"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span8">
                                <div class="span12" style="margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label span12" for="txtNumDctoComp">
                                                N° Dcto</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtNumDctoComp" class="span12" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label span12" for="cbo_doc_registro">
                                                Doc. Registro</label>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_doc_registro" class="span12" data-placeholder="Doc. Reg.">
                                                    <option value="C">ORDEN DE COMPRA</option>
                                                    <option value="S">ORDEN DE SERVICIO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="span12" id="Div4" style="margin-left: 0">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="span2 control-label" for="txt_num_ser_reg">
                                                Nro</label>
                                            <input id="txt_num_ser_reg" class="numeros span10" type="text" style="text-align: center" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span8">
                                <div class="span12" style="margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_Empresa">
                                                Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span5">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_Sucursal">
                                                Establecimiento</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_Sucursal" class="span12" data-placeholder="Establecimiento">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span12" style="margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_id_proveedor">Proveedor</label>
                                        </div>
                                    </div>

                                    <div class="span5">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_proveedor" class="span12" autocomplete="off" type="text" placeholder="Proveedor" style="text-transform: uppercase" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="btnverempl" class="btn blue"><i class="icon-eye-open" style="line-height: initial;"></i></a>
                                                <a id="btn_add_dcto" class="btn green" href="?f=nrmgepr" target="_blank"><i class="icon-plus" style="line-height: initial;"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboTipoDoc" class="span4" data-placeholder="Tipo Dcto." disabled>
                                                    <option value="6">RUC</option>
                                                    <option value="1">DNI</option>
                                                </select>
                                                <input id="txt_ruc_proveedor" class="span8" type="text" placeholder="Nro. Documento" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span12" style="margin-left: 0">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_transaccion">
                                                Fecha Transacción
                                            </label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker center" placeholder="dd/mm/yyyy" id="txt_fec_transaccion" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_emision">
                                                Fecha de Entrega</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker center" placeholder="dd/mm/yyyy" id="txt_fec_emision" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ocultaC">
                                    <div class="span12" style="margin-left: 0" id="documentosadd">
                                        <div class="span12" id="div_mas_dctoreg_0" style="margin-left: 0">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_doc_origen">
                                                        Doc. Origen</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cbo_doc_origen" class="span12" data-placeholder="Doc. Origen">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="span12 control-label" for="txt_num_ser_orig_0">
                                                        Nro</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="txt_cod_doc_orig" type="hidden" />
                                                        <%--<input class="numeros txt_num_ser_orig span4" type="text" disabled style="text-align: center"/>--%>
                                                        <input class="numeros txt_num_doc_orig span12" type="text" id="txt_num_doc_orig" disabled style="text-align: center" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnBuscadocs" class="btn blue buscar" onclick="buscarDocumento(this)"><i class="icon-search" style="line-height: initial;"></i></a>
                                                        <a id="btn_add_dcto2" class="btn green add"><i class="icon-plus" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="ocultaDespacho">
                                    <div class="span12" style="margin-left: 0">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label span12" for="cbx_destino">
                                                    Despacho</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <select id="cbx_destino" class="span12" data-placeholder="Operación">
                                                    <option value="DSTGRA">RECOJO EN PROVEEDOR </option>
                                                    <option value="DSTMIX">DESPACHO A DOMICILIO</option>
                                                    <option value="DSTNGR">DESPACHO EN OFICINA AGENCIA</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txt_comentario">
                                                    Entregar a
                                                </label>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="control-group">
                                                <textarea id="txt_comentario" class="span12" rows="1" style="resize: vertical; max-height: 250px;"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="span12" style="margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_id_proveedor">Contacto</label>
                                        </div>
                                    </div>

                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtContacto" class="span12" autocomplete="off" type="text" placeholder="Contacto" style="text-transform: uppercase" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txtpersona">
                                                Responsable
                                            </label>
                                        </div>
                                    </div>
                                    <div class="span5">
                                        <input id="txtpersona" autocomplete="off" placeholder="Ingrese Apellidos y Nombres" class="span12 personas" type="text" />
                                    </div>

                                </div>

                                <div class="span12" style="margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label">Glosa </label>
                                        </div>
                                    </div>

                                    <div class="span11">
                                        <div class="control-group">
                                            <div class="controls">
                                                <textarea id="txtGlosa_general" class="span12" style="resize: vertical; max-height: 250px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="Cotizac" class="span12" style="display: none; margin-left: 0">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label">Nro. Cotización </label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtCotizacion1" class="span12" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span9">
                                    </div>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="span12" id="estado">
                                    <div class="control-group alert alert-info span12" style="width: 100%">
                                        <label class="control-label" id="lbl_estado" style="text-align: -webkit-center; font-size: large; font-family: sans-serif; font-weight: bold;"><i class="icon-asterisk"></i>&nbsp;&nbsp;ESTADO&nbsp;:&nbsp;-</label>
                                    </div>
                                </div>
                                <div class="span12" id="p_DatCredito" style="margin-left: 0">
                                    <div class="portlet box red">
                                        <div class="portlet-title">
                                            <h4><i class="icon-money"></i>Datos Crédito</h4>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cbo_modo_pago">
                                                                Modo Pago</label>
                                                        </div>
                                                    </div>
                                                    <div class="span9">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cbo_modo_pago" class="span12" data-placeholder="Mod. Pag." disabled>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_plazo_pago">
                                                                Plz. de Pago</label>
                                                        </div>
                                                    </div>
                                                    <div class="span9" style="height: 50px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 30px;">
                                                                <label class="control-label" for="txt_plazo_pago" style="margin-top: -3px;">
                                                                    <input id="txt_plazo_pago" class="span4" type="text" disabled="disabled" value="0" style="text-align: center" onkeypress="return ValidaNumeros(event,this)" maxlength="6" />
                                                                    días
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <label class="span12 control-label" for="txt_fec_vencimiento">
                                                                Fec. Venc.</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="span12 control-label" for="txt_estado_credito">
                                                                Estado</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input type="text" class="span12" id="txt_estado_credito" disabled="disabled" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="span12" id="OcCorreo" style="display: none;">
                                    <div class="alert alert-error" id="correo">
                                        <strong></strong>.
                                    </div>
                                </div>
                                <div class="span12" id="OcCorreoProveedor" style="display: none;">
                                    <div class="alert alert-error" id="correoPro">
                                        <strong></strong>.
                                    </div>
                                </div>
                                <div class="span12" id="divMsgCorreo" style="display: none;">
                                    <div class="alert alert-info">
                                        <strong id="msgCorreo">Se envió correo</strong>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row-fluid" id="fieldsetTransporte" style="display: block;">
                        <div class="span12">
                            <fieldset class="scheduler-border ">
                                <legend class="scheduler-border ">Transporte</legend>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <label class="radio">
                                                    <div class="radio" id="Div5">
                                                        <span>
                                                            <input type="radio" name="trans" style="opacity: 0;" id="rdPublico" checked />
                                                        </span>
                                                    </div>
                                                    Público
                                                </label>
                                            </div>
                                            <div class="span2">
                                                <label class="radio">
                                                    <div class="radio" id="Div6">
                                                        <span>
                                                            <input type="radio" name="trans" style="opacity: 0;" id="rdPrivado" />
                                                        </span>
                                                    </div>
                                                    Interno
                                                </label>
                                            </div>
                                            <div class="span2">
                                                <label class="radio">
                                                    <div class="radio" id="Div3">
                                                        <span>
                                                            <input type="radio" name="trans" style="opacity: 0;" id="rdProveedor" />
                                                        </span>
                                                    </div>
                                                    Proveedor
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <hr />
                                            </div>
                                        </div>

                                        <div id="ocultaTrans">
                                            <div class="row-fluid">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtemptransporte">
                                                            Transportista</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="divTxtTransporte">
                                                            <input id="txtemptransporte" autocomplete="off" class="span12" type="text" style="text-transform: uppercase" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls" id="divBtnTrans">
                                                            <a id="btnemptrans" class="btn blue"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                                            <a id="btn_new_transportista" class="btn green" href="?f=nrmgetr" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbotipoDoctrans">
                                                            Documento
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbotipoDoctrans" class="span12" data-placeholder="Tipo Documento">
                                                                <option></option>
                                                                <option value="6">RUC</option>
                                                                <option value="1">DNI</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtnumdocemptrans" class="span9" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid"  id="datosVehiculo">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtorigen">
                                                            Vehículo, Marca y Placa</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtvehiculo" class="span12" type="text" style="text-transform: uppercase" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCertificadoInscripcion">
                                                            Certificado Inscripción N°</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtCertificadoInscripcion" class="span12" type="text" style="text-transform: uppercase" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid" id="datosChofer">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtchofer">
                                                            Chofer</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="divTxtChofer">
                                                            <input id="txtchofer" autocomplete="off" class="span12" type="text" style="text-transform: uppercase" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtLicConducir">
                                                            Licencia Conducir N°</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtLicConducir" class="span12" type="text" style="text-transform: uppercase" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                    <div id="detalleMo">
                        <div class="row-fluid" id="Div2" style="display: block;">
                            <div class="span12">
                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border " id="legend">Detalle de Bienes/Servicios</legend>

                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group ">
                                                    <label class="span12">
                                                        Nro. Cotización
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">

                                                        <input id="txtCodigoCotizacion" class="span12" type="text" style="text-transform: uppercase" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2 quitar">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <button type="button"  id="btnBuscar" class="btn blue tooltips" data-original-title="Buscar Cotizaciones"><i class="icon-search"></i></button>
                                                        <a id="btnDetalle" class="btn green tooltips" data-original-title="Seleccionar Detalles"><i class="icon-reorder"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls" style="height: 30px;">
                                                        <label class="control-label" for="chk_inc_igv">
                                                            <input id="chk_inc_igv" type="checkbox" class="span12" style="opacity: 0;">
                                                            Precios Items inc IGV.
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="row-fluid">
                                        <div class="span12">

                                            <hr>
                                        </div>
                                    </div>


                                    <div class="row-fluid quitar">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group ">
                                                    <label class="span12">
                                                        Código
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtcodprod" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group ">
                                                    <label class="span12">
                                                        Desc Producto
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="span6" id="detallemov_datos">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <div id="input_desc_prod" class="controls">
                                                            <input id="txtdescprod" class="span12" type="text" data-provide="typeahead" disabled="disabled" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <%--<div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnRefrescarProductos" class="btn tooltips purple"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                        <a id="btn_new_prod" class="btn tooltips green" data-original-title="Crear Producto" data-trigger="hover" href="?f=nmmprod" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                    </div>
                                                </div>
                                            </div>--%>
                                        </div>

                                    </div>

                                    <div class="row-fluid quitar">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group ">
                                                    <label class="span12">
                                                        Cantidad
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtcant" class="span12" type="text" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label span12" for="cboUniMedida">
                                                        Unid. Medida</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtUnidad" class="span12" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label span12" for="cboUniMedida">
                                                        PREC. UNITARIO</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txt_importe" class="span12" onkeypress="return ValidaDecimales(event,this)" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <input id="hdcodUNI" class="span12" type="hidden" />

                                        </div>
                                    </div>

                                    <div class="row-fluid quitar">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group ">
                                                    <label class="span12">
                                                        Glosa
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="span10">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <textarea id="txt_glosa_dt" class="span12" rows="2" style="resize: vertical; max-height: 250px;"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid quitar">
                                        <div class="span2 offset9">
                                            <a id="btnAgregarDetalle" class="btn blue pull-right" style="margin-right: 5px;" href="javascript:AgregarDetalle();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>
                                        </div>
                                    </div>
                                    <br />
                                </fieldset>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div id="tabla1">
                                <br />
                                <table id="detalle" class="display DTTT_selectable" border="0">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO</th>
                                            <th>DESC. PRODUCTO</th>
                                            <th>UNIDAD  MEDIDA</th>
                                            <th>COD. UNID.  MEDIDA</th>
                                            <th>CANTIDAD</th>
                                            <th>PREC. UNITARIO</th>
                                            <th>IMPORTE</th>
                                            <th>GLOSA</th>
                                            <th style="display: none">DETRACCIÓN</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>

                                </table>
                                <asp:HiddenField ID="hfObjJson" runat="server" />
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <br />

                        <input id="txtInclIgv" class="span5" style="display: none" />
                        <div id="tabla2">
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span8">
                                <div class="span12" id="p_monetarios" style="margin-left: 0">
                                    <div class="portlet box green">
                                        <div class="portlet-title">
                                            <h4><i class="icon-money"></i>Datos Monetarios</h4>
                                            <div class="actions">
                                                <a class="btn black  " href="javascript:Calcular();"><i class="icon-plus-sign"></i>&nbsp;CALCULAR</a>

                                            </div>

                                        </div>
                                        <div class="portlet-body">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cbo_moneda">
                                                                Moneda</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls" id="input_moneda">
                                                                <select id="cbo_moneda" class="span12" data-placeholder="Moneda">
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1" id="lbl_TC">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_valor_cambio">
                                                                T/C</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2" id="input_valor_cambio">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" style="text-align:right;" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1" id="lbl_fec_vig">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_fec_vig">
                                                                Fec. Vig</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2" id="input_fec_vig">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig" data-date-format="dd/mm/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_base_imponible">
                                                                Base Imponible</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_base_imponible" class="span12" type="text" onkeypress=" return ValidaDecimales(event,this)" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_descuento">
                                                                Descuento</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_descuento" class="span12" type="text" value="0" style="text-align:right;" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_isc">
                                                                ISC</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_isc" class="span12" type="text" value="0" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_subtotal">
                                                                Subtotal</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_subtotal" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_impuesto">
                                                                IGV (%)</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_impuesto" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_impuesto">
                                                                IGV (<span id="simbolo_moneda">S/.</span>)</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_impuesto_calc" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_ajuste">
                                                                Ajuste</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_ajuste" class="span12" type="text" value="0" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_prec_total">
                                                                Prec. Tot.</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_prec_total" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_detraccion">
                                                                Detracción</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_detraccion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_Percepcion">
                                                                Percepción</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_Percepcion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_Retencion">
                                                                Retención</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_Retencion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2"></div>
                                                    <div class="span2"></div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_monto_total">
                                                                A Pagar</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_monto_total" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1"></div>
                                                    <div class="span2"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="span12" id="Div1" style="margin-left: 0">
                                    <div class="portlet box yellow">
                                        <div class="portlet-title">
                                            <h4><i class="icon-money"></i>Tributaciones</h4>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row-fluid">
                                                <div class="span12" style="margin-left: 0">
                                                    <div class="span6">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <label class="radio">
                                                                    <div class="radio disabled">
                                                                        <span>
                                                                            <input type="checkbox" style="opacity: 0;" id="chk_detraccion" />
                                                                        </span>
                                                                    </div>
                                                                    Sujeto a Detracción
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span4">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                S/.&nbsp;&nbsp;<input id="txt_monto_detraccion" class="numeros span10" type="text" disabled style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12" style="margin-left: 0">

                                                    <div class="ocultaC">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_num_op_detrac">
                                                                    Nro.Dep.</label>
                                                            </div>
                                                        </div>
                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_num_op_detrac" class="numeros span12" type="text" disabled />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_fec_comp_detrac">
                                                                    Emisión</label>
                                                            </div>
                                                        </div>
                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_detrac" data-date-format="dd/mm/yyyy" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_cta_detrac">
                                                                Cta. Detrac.</label>
                                                        </div>
                                                    </div>
                                                    <div class="span10">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_cta_detrac" class="numeros span12" type="text" disabled />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span11" style="height: 50px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 30px;">
                                                                <label class="radio">
                                                                    <div class="radio disabled">
                                                                        <span>
                                                                            <input type="checkbox" style="opacity: 0;" id="chk_percepcion" />
                                                                        </span>
                                                                    </div>
                                                                    Sujeto a Percepción
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ocultaC">
                                                <div class="row-fluid">

                                                    <div class="span12">
                                                        <div class="span5">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label class="control-label">
                                                                        <input type="radio" class="m-wrap span12" id="rbsinserie" name="tipoSeria" checked="checked" disabled />
                                                                        Impreso en Fact.
                                                                    </label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span7">
                                                            <div class="control-group">
                                                                <label class="control-label" for="rbseriada">
                                                                    <input type="radio" class="m-wrap span12" id="rbseriada" name="tipoSeria" disabled />
                                                                    Con Comp. Percep.
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span5">
                                                        </div>
                                                        <div class="span7">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label class="control-label span5" for="txt_num_comp_percep">
                                                                        N. Comp.</label>
                                                                    <input id="txt_num_comp_percep" class="span7" type="text" disabled />
                                                                </div>
                                                            </div>
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label class="control-label span5" for="txt_fec_comp_percep">
                                                                        Fecha</label>
                                                                    <input type="text" class="span7 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_percep" data-date-format="dd/mm/yyyy" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <hr />
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span11" style="height: 50px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 30px;">
                                                                <label class="radio">
                                                                    <div class="radio disabled">
                                                                        <span>
                                                                            <input type="checkbox" style="opacity: 0;" id="chk_retencion" disabled />
                                                                        </span>
                                                                    </div>
                                                                    Sujeto a Retención
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ocultaC">

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span6">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label class="control-label span5" for="txt_num_comp_reten">
                                                                        N. Comp.</label>
                                                                    <input id="txt_num_comp_reten" class="numeros span7" type="text" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span6">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label class="control-label span4" for="txt_fec_comp_reten">
                                                                        Fecha</label>
                                                                    <input type="text" class="span8 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_reten" data-date-format="dd/mm/yyyy" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="alert alert-info" id="mensaje" style="display:none;">
                      <strong>Espere un momento!</strong> La orden de Adquisición se esta enviando al proveedor.
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="form-actions" id="acciones_generales" style="display: block;">
                                <a id="idModificar" class="btn blue"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                                <a id="idRegis" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                                <a id="idCompletar" class="btn green"><i class="icon-save"></i>&nbsp;Completar</a>
                                <asp:Button ID="btnPFD" class="btn green" runat="server" Text="Descargar" />
                                   <a id="btn_cancel_orden" class="btn red" style="display:none"><i class="icon-remove-sign"></i>&nbsp;Cancelar Orden</a>
                            </div>
                        </div>
                    </div>

                    <!-- FIN DE LOS TABS-->

                    <!-- FIN DEL CUERPO DE LA FORMA-->
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modal-cotiza" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;LISTA DE COTIZACIONES</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div7">
                <table id="tblLISTA" border="0" class="display DTTT_selectable">
                    <thead>
                        <tr>
                            <th style="text-align: center">NÚMERO</th>
                            <th style="text-align: center">CÓDIGO</th>
                            <th style="text-align: center">FECHA</th>
                            <th style="text-align: center">DESCRIPCIÓN</th>
                            <th style="text-align: center">USUARIO</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>

<div id="modal-detalle-cotiz" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H2"><i class="icon-reorder" style="line-height: initial;"></i>&nbsp;SELECCIONAR DETALLES DE COTIZACIÓN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div9">
                <table id="tblDetalleCotiza" border="0" class="display DTTT_selectable">
                    <thead>
                        <tr>
                            <th style="text-align: center">CÓDIGO COTIZACIÓN</th>
                            <th style="text-align: center">CÓDIGO PRODUCTO</th>
                            <th style="text-align: center">PRODUCTO</th>
                            <th style="text-align: center">CODE UNIDAD</th>
                            <th style="text-align: center">UNID. MEDIDA </th>
                            <th style="text-align: center">CANTIDAD</th>
                            <th style="text-align: center">DETRACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>


<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divMail_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">De:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboCorreos"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Asunto:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtAsunto" class="span12">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>


<div id="Confirmar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 54% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">CANCELAR ORDEN</h3>
    </div>
    <div class="modal-body">
        <p>
            ¿Esta realmente seguro de cancelar la orden?
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_aceptar" data-dismiss="modal" class="btn black">
            Aceptar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<asp:HiddenField ID="hfDescarga" runat="server" />

<input id="hfPlzo" type="hidden" />
<input id="hfDetraccion" type="hidden" />
<input id="hfContactopidm" type="hidden" />
<input id="hfDNI_EMPTRANS" type="hidden" />
<input id="hfRUC_EMPTRANS" type="hidden" />
<input id="hfPIDM_EMPTRANS" type="hidden" />
<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfCOD_PROD" type="hidden" />
<input id="hfPROD_ALMACENABLE" type="hidden" />
<input id="hfCOD_EMPRESA" type="hidden" />
<input id="hf_DESC_EMP" type="hidden" />
<input id="hfCOD_SCSL" type="hidden" />
<input id="hfDESC_SCSL" type="hidden" />
<input id="hfMONTO_TOTAL" type="hidden" />
<input id="hfIGV_IND" type="hidden" />
<input id="hfBalanceo" type="hidden" />
<input id="hfMONTO_ACTUAL" type="hidden" value="0.00" />
<input id="hfporcentaje_detraccion" type="hidden" value="0.00" />
<input id="hfIMPUESTO" type="hidden" value="0.00" />
<script type="text/javascript" src="../vistas/NO/js/NOMORDC.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMORDC.init();
    });
</script>
