<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMANUL.ascx.vb" Inherits="vistas_NV_NVMANUL" %>
<style>
    .date-picker {
        text-align: center;
    }

    @media print {

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
        }

        #tblDocumento, .arial {
            font-family: 'Arial' !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ANULAR DOCUMENTO DE VENTA</h4>
                <div class="actions">
                    <a class="btn red" href="?f=nvlanul" style="margin-top: -10px;"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <fieldset>
                    <legend>Datos Documento Venta
                    </legend>
                </fieldset>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNumDctoComp">N° Dcto Venta.</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNumDctoComp" class="span12" disabled="disabled" type="text">
                                </div>
                            </div>
                        </div>

                        <div class="span1"></div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNumSec">Secuencia</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNumSec" class="span12" disabled="disabled" type="text" value="" style="text-align: center">
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group span4">
                                <label class="control-label" for="chkCompleto">
                                    <input type="checkbox" id="chkCompleto" name="chkCompleto" disabled="disabled" />Completo</label>
                            </div>
                            <div class="control-group span4">
                                <label class="control-label" for="chkAnulado">
                                    <input type="checkbox" id="chkAnulado" name="chkAnulado" disabled="disabled" />Anulado</label>
                            </div>
                            <div class="control-group span4">
                                <label class="control-label" for="chkContable">
                                    <input type="checkbox" id="chkContable" name="chkContable" disabled="disabled" />Provisionado</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">Establecimiento</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Cliente -->
                <div class="span12" style="margin-left: 0">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_id_proveedor">Cliente</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDctoCliente" class="span4" type="text" disabled="disabled" />
                                <input id="txtNroDctoCliente" class="span8" type="text" disabled="disabled" style="text-align: center; margin-left: 2px;" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tipo Dcto / Impuesto / Tasa-->
                <div class="span12" style="margin-left: 0">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboDocumentoVenta">
                                Tipo Dcto</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <select id="cboDocumentoVenta" class="span12" data-placeholder="Doc. Venta" disabled="disabled">
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNroDocVenta">Nro</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSerieDocVenta" class="span4" data-placeholder="Serie" disabled="disabled">
                                            <option></option>
                                        </select>
                                        <input class="numeros span8" id="txtNroDocVenta" type="text" disabled="disabled" style="margin-left: 4px;" />
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <button type='button' id="btnVerDoc" class="btn red" title='Ver Documento de Venta'><i class='icon-search'></i></button>
                            </div>
                        </div>
                    </div>
                                  
                    <%--  <div class="span2" >
                        <div class="control-group">
                            <label class="control-label">
                                Tasa (%)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtTasa" class="span12" type="text"  disabled="disabled" style="text-align: center; margin-left: 2px;" />
                            </div>
                        </div>
                    </div>--%>
                </div>
                <!-- Emision serie nro -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_emision">
                                Emisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_emision" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset1">
                        <div class="control-group">
                            <label class="control-label">
                                Impuesto</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <%--<input id="txtImpuesto1" class="span4" type="text" disabled="disabled" />--%>
                                <input id="txtImpuesto2" class="span12" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="span12 control-label" for="txt_fec_vencimiento">
                                F. Vencimiento</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Moneda -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_moneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="input_moneda">
                                <select id="cbo_moneda" class="span12" data-placeholder="Moneda" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1" id="lbl_TC">
                        <div class="control-group">
                            <label class="control-label" for="txt_valor_cambio">
                                T/C</label>
                        </div>
                    </div>
                    <div class="span2" id="input_valor_cambio">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <%-- <div class="span2 offset1" id="lbl_fec_vig">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_vig">
                                F. Vigencia</label>
                        </div>
                    </div>
                    <div class="span2" id="input_fec_vig">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>--%>
                </div>
                <!-- Glosa / F.Transacc -->
                <div class="span12" style="margin-left: 0">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_comentario">
                                Glosa</label>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <textarea id="txt_comentario" class="span12" rows="1" style="resize: vertical;" maxlength="90" readonly="readonly"></textarea>
                        </div>
                    </div>

                    <div class="span2 offset1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_transaccion">
                                Fec. Transacción
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_transaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Vendedor / Modo pago -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboVendedor">
                                Vendedor</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboVendedor" class="span12" data-placeholder="Vendedor" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_modo_pago">
                                Modo Pago</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_modo_pago" class="span12" data-placeholder="Mod. Pag." disabled>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Datos monetarios -->
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
                                    <input id="txt_base_imponible" class="span12" type="text" value="0" disabled="disabled" />
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
                                    <input id="txt_descuento" class="span12" type="text" value="0" disabled="disabled" />
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
                                    <input id="txt_isc" class="span12" type="text" value="0" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtOpExonerada">
                                    Op Exonerada</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtOpExonerada" class="span12" type="text" value="0" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtOpGravada">
                                    Op Gravada</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtOpGravada" class="span12" type="text" value="0" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtOpInafecta">
                                    Op Inafecta</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtOpInafecta" class="span12" type="text" value="0" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1 offset4">
                            <div class="control-group">
                                <label class="control-label" for="txt_impuesto">
                                    IGV (%)</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_impuesto" class="span12" type="text" disabled="disabled" />
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
                                    <input id="txt_impuesto_calc" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1 offset4">
                            <div class="control-group">
                                <label class="control-label" for="txt_subtotal">
                                    Subtotal</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_subtotal" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txt_detraccion">
                                    Detracción</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_detraccion" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1 offset4">
                            <div class="control-group">
                                <div class="controls">
                                    <label>
                                        Redondeo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtRedondeo2" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txt_Percepcion">
                                    Percepción</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_Percepcion" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1 offset4">
                            <div class="control-group">
                                <div class="controls">
                                    <label>
                                        Donación
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDonacion2" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txt_Retencion">
                                    Retención</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_Retencion" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1 offset4">
                            <div class="control-group">
                                <label class="control-label" for="txt_monto_total">
                                    <b>Importe Cobrar</b></label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txt_monto_total" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <fieldset>
                    <legend>Datos Anulación
                    </legend>
                </fieldset>
                <div class="row-fluid" id="divDevoluciones">
                    <div class="span6 offset2">
                        <div class="control-group span5 " id="divEfectivo">
                            <label class="control-label" for="chkDevEfectivo">
                                <input type="checkbox" id="chkDevEfectivo" name="chkDevEfectivo" />Devolver Dinero</label>
                        </div>
                        <div class="control-group span5" id="divDespacho">
                            <label class="control-label" for="chkDevDespacho">
                                <input type="checkbox" id="chkDevDespacho" name="chkDevDespacho" />Devolver Producto</label>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="cboMotivo">
                            Motivo</label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="divCboMotivo">
                                <select id="cboMotivo" class="span12" data-placeholder="Motivo">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <a><span id="info_btnf"><i style="color: #888; cursor: help; font-size: 18px; vertical-align: middle;" class="icon-info-sign"></i></span></a>
                    </div>
                </div>

                <div class="row-fluid" id="bloqueInfo" style="margin-top: 5px; display: none;">
                    <div class="span9 offset2">
                        <div class="form-actions">
                            <p style="margin-bottom: 0px;">                                
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtAnulacionCom">
                            Comentario</label>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <textarea id="txtAnulacionCom" class="span12" rows="2" style="resize: vertical;" maxlength="95" placeholder="Ingrese un comentario"></textarea>
                        </div>
                    </div>
                    <div class="span2">
                        <a id="btnAnular" class="btn blue" style="display: inline-block;"><i class="icon-save"></i>&nbsp;Anular Documento</a>
                    </div>
                </div>
                <div id="divDatosAnulacion" style="display: none;">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="span12 control-label" for="txt_fec_vencimiento">
                                    Fecha Anulación</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaAnulacion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="span12 control-label" for="txt_fec_vencimiento">
                                    Usuario Anulación</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12" id="txtUsuarioAnulacion" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->

<!-- VENTANAS MODALES-->
<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Anular Documento de Venta</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p><span id="msgDespacho"></span></p>
                <p>
                    Se anulará el documento de venta &nbsp;¿Desea continuar la operación?
                </p>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span4 offset2">
                    <a id="btnAceptar" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
                <div class="span4">
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div>
    <input type="hidden" id="hfEstadoDespacho" value="N" />
    <input type="hidden" id="hfPIDM" />
    <input type="hidden" id="hfCOD_NRESP" />
    <input type="hidden" id="hfCOD_RESP" />
    <input type="hidden" id="hfRESP" />
    <input type="hidden" id="hfSerieDoc" />
    <input type="hidden" id="hfEstadoPago" />
</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<script type="text/javascript" src="../vistas/NV/js/NVMANUL.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVMANUL.init();

    });
</script>
