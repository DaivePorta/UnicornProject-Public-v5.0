<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMNGCL.ascx.vb" Inherits="vistas_CA_CAMNGCL" %>
<style>
    #divMail, #divBuscarDoc, #mapaModal {
        margin-left: 0px !important;
    }

    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }

    .inputDevolucion {
        max-width: 100px;
    }

    .fondoHeader {
        /*background-color: #3A5567;*/
        background-color: white;
        text-align: center;
        /*color: #FFFFFF;*/
        color: black;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>NOTA DE CRÉDITO GENÉRICA CLIENTE</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a href="javascript: ImprimirDcto();" class="btn black" id="btnImprimirDcto" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMNGCL" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CALNGCL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4" id="divCboEmpresa">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>

                    <div class="span4" id="divCboEstablecimiento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblrazsocial" class="control-label" for="txtrazsocial">
                                Cliente</label>
                        </div>
                    </div>
                    <div class="span4" id="divTxtRazonSocial">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Cliente" />
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="lblSerieNotaCredito" class="control-label" for="txtSerieNota">
                                Serie<br />
                                N.Crédito</label>
                        </div>
                    </div>
                     <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="txtSerieNota" class="span12 combobox" data-placeholder="Serie">
                                    <option></option>
                                </select>    
                            </div>
                        </div>
                    </div>

                    <%--<div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerieNota"  maxlength="4" class="span12" type="text" placeholder="Serie" disabled="disabled" />
                            </div>
                        </div>
                    </div>--%>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblNroNotaCredito" class="control-label" for="txtNroNota">
                                Nro.<br />
                                N.Crédito</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNroNota" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtrazsocial">Documento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span5">
                            <div class="control-group">
                                <%--                            <label class="control-label span6" for="cboTipoDcto">Tipo Dcto.</label>--%>
                                <select id="cboTipoDcto" class="span12 combobox" disabled="disabled">
                                </select>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNroDcto" style="text-align: right">
                                    N° Dcto.
                                </label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNroDcto" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="lblcli" class="control-label" for="txtrazsocial">Dirección</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDireccionOrigen" class="span12" type="text" style="text-transform: uppercase" readonly/>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmision">
                                Fecha Emisión N. de Crédito</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmision" data-date-format="dd/mm/yyyy" disabled="disabled"/>
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset3 ">
                        <div class="control-group">
                            <label class="control-label pull-right" for="txtFechaTransaccion">
                                Fecha Transacción</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaTransaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMotivo">Motivo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMotivo" class="span12" data-placeholder="Motivo">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2 offset1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="checkbox" id="chkAplicar" />
                                Aplicar a Doc. que Modifica
                            </div>
                        </div>
                    </div> 
                     <div class="span4" id="Div_chkDinero" style="display:none;"> <%--style="display:none;"--%>
                        <div class="control-group">
                          <input id="chkDevDinero" type="checkbox" disabled='disabled'  class="span12"/><span>Devolver dinero</span> <%--checked="checked"--%>
                        </div>
                    </div>

                    <div class="span1 offset3">
                        <div class="control-group">
                            <label class="control-label motivo" for="txtMotivoAdicional" style="display:none">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea class="span12 motivo" placeholder="Motivo" maxlength="100" id="txtMotivoAdicional" rows="1" style="resize: vertical; max-height: 250px;display:none;" disabled="disabled"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtGlosa">Glosa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtGlosa" class="span12" type="text" maxlength="100" placeholder="Descripción detallada del motivo"/>
                            </div>
                        </div>
                    </div>
                     <div class="span1"></div>--%>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2" id="divCboMoneda">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <%--<div class="span1 offset3">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Periodo Tributario</label>
                        </div>
                    </div>
                    <div class="span2" id="divCboPeriodo">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboPeriodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>--%>
                </div>
                <!-- DOCUMENTO AL QUE MODIFICA -->

                <div class="row-fluid">
                    <fieldset>
                        <legend>Documento de Referencia</legend>
                    </fieldset>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoDocumento">
                                Tipo Documento</label>
                        </div>
                    </div>
                    <div class="span3" id="divCboTipoDocumento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoDocumento" class="span12" data-placeholder="Tipo de documento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button type="button" class="btn blue" id="btnBuscarDocumento"><i class="icon-search" style="line-height: initial"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtSerie">
                                Serie</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerie" class="span12" type="text" disabled="disabled" placeholder="Serie" onkeypress='return ValidaNumeros(event,this)' maxlength="4" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label2" class="control-label" for="txtNro">
                                Nro.</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNro" class="span12" type="text" disabled="disabled" placeholder="Nro" onkeypress='return ValidaNumeros(event,this)' maxlength="4" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmisionRef">
                                Fecha Emisión</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtFechaEmisionRef" type="text" class="span10 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <!-- SE AGREGÓ EL CAMPO MONTO EN EL FORMULARIO -->
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtMonto">
                                    Importe</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtMonto" type="text" class="span10 right" placeholder="Importe Total" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span1" id="divLblEstadoPago">
                        <div class="control-group">
                            <label class="control-label">Estado Pago:</label>
                        </div>
                    </div>
                    <div class="span1" id="divEstadoPago">
                        <div class="control-group">
                            <label style="font-weight:bold"  class ="control-label" id="lblPagoInd">-</label>
                        </div>
                    </div>
                    <div class="span1" id="divLblMontoPagar" style="display: none">
                        <div class="control-group">
                            <label class="control-label" for="txtMontoPagar">
                                Monto Pendiente</label>
                        </div>
                    </div>
                    <div class="span2" id="divMontoPagar" style="display: none">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMontoPagar" type="text" class="span12 " placeholder="Monto por pagar" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <!-- SE AGREGÓ EL CAMPO CODIGO MONEDA EN EL FORMULARIO, PERO ESTÁ OCULTO-->
                    <div class="span1">
                         <div class='control-groupt'>
                             <input id="txtCodMoneda" type="hidden" class="span12 date-picker" placeholder="CodMon" disabled="disabled" />
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <fieldset>
                        <legend>Detalles Nota de Crédito</legend>
                    </fieldset>
                </div>

                <div id="divAgregarDetalles">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDesc">Descripción</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea class="span12" placeholder="Descripción del detalle de la nota de crédito" maxlength="400" id="txtDesc" rows="2" style="resize: vertical; max-height: 200px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row-fluid">

                     
                    </div>

                    <div class="row-fluid">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtSubtotalItem">Monto</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtSubtotalItem" class="span12 right" placeholder="Subtotal" onkeyup="ValidarTotales()" onkeypress="return ValidaDecimales(event,this,3)"/>
                                </div>
                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group">
                                <label id="lblIndIgv" class="control-label" style="color: gray">
                                    <small>*Montos para detalle incluyen IGV</small></label>
                            </div>
                        </div>

                           <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboAfectacionIgv">Afectación al IGV</label>
                            </div>
                        </div>
                        <div class="span2" id="divCboAfectacionIgv">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboAfectacionIgv" class="span12" data-placeholder="Afectación al IGV">
                                        <option value="GRA">GRAVADO</option>
                                        <option value="EXO">EXONERADO</option>
                                        <option value="INA">INAFECTO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row-fluid">
                        <div class="span11" id="divBtnAgregar">
                            <a class="btn pull-right" href="javascript:LimpiarCamposDetalle();"><i class=" icon-file"></i>&nbsp;Limpiar</a>
                            <a id="btnAgregarDetalle" class="btn blue pull-right" style="margin-right: 5px;" href="javascript: AgregarDetalle();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid" id="divTblDetalles" style="margin-top: 2%; overflow-x: auto;">
                            <table id="tblDetalles" class="table display DTTT_selectable" style="border: 1px solid #cbcbcb;">
                                <thead class="fondoHeader">
                                    <tr>
                                        <th class="center">ITEM</th>
                                        <th class="center">DESCRIPCIÓN</th>
                                        <th class="center">AFECTACIÓN AL IGV</th>
                                        <th class="center">IGV</th>
                                        <th class="center" title="Subtotal con IGV">VALOR VENTA</th>
                                        <th class="center"></th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                        <div id="divTotales">

                            <div class='row-fluid' style='margin-top: 20px;'>
                                <div class='span2 offset7'>
                                    <strong>Op Gravada <span class='lblMoneda'></span>:</strong>
                                </div>
                                <div class='span2'>
                                    <input id='txtGravada' class="span12 right" type='text' disabled='disabled' />
                                </div>
                            </div>
                            <div class='row-fluid'>
                                <div class='span2 offset7'>
                                    <strong>Op Inafecta <span class='lblMoneda'></span>:</strong>
                                </div>
                                <div class='span2'>
                                    <input id='txtInafecta' class="span12 right" type='text' disabled='disabled' />
                                </div>
                            </div>
                            <div class='row-fluid'>
                                <div class='span2 offset7'>
                                    <strong>Op Exonerada <span class='lblMoneda'></span>:</strong>
                                </div>
                                <div class='span2'>
                                    <input id='txtExonerada' class="span12 right" type='text' disabled='disabled' />
                                </div>
                            </div>


                            <div class='row-fluid'>
                                <div class='span2 offset7'>
                                    <strong>IGV <span class='lblPctjIgv'></span>:</strong><br />
                                    <small id="lblExonerado" style="color: gray;"></small>
                                </div>
                                <div class='span2'>
                                    <input id='txtMontoIgv' class="span12 right" type='text' disabled='disabled' />
                                </div>
                            </div>

                            <div class='row-fluid'>
                                <div class='span2 offset7'>
                                    <strong>Importe Total <span class='lblMoneda'></span>:</strong>
                                </div>
                                <div class='span2'>
                                    <input id='txtImporteTotal' class="span12 right" type='text' disabled='disabled' />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div id="divMensajes">
                            <!-- MENSAJES -->
                            <div class="span6 ">
                                    <div class="row-fluid">
                                    <div class="span10 alert alert-info" id="divInfo">
                                        <p id="lblMsgUsable">* La Nota de Crédito<strong class="no">&nbsp;NO</strong>&nbsp;se utilizará en el mismo Documento Referenciado.</p>                                        
                                    </div>
                                </div>
                            </div>   

                        </div>
                    </div>  
                </div>
                 <!-- CAMPOS PARA CREAR QR -->
                 <div id="codigoQR" style="display: none"></div>  

                <div class="form-actions" style="margin-top: 20px;">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    <a id="imprimir" class="btn black" href="javascript:ImprimirDcto();" style="display:none"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>

            </div>

        </div>
    </div>
</div>
<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%" aria-hidden="true">
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
<!-- FIN CUADRO PARA LA FORMA-->
<div id="divDctoImprimir" style="display: none;">
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfPagadoInd" type="hidden" />
<input id="hfCodigoNotaCredito" type="hidden" />
<input id="hfCodigoCorrelativo" type="hidden" />
<input id="hfIMPUESTO" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMNGCL.js"></script>
<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMNGCL.init();
    });
</script>
