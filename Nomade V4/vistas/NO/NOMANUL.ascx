<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMANUL.ascx.vb" Inherits="vistas_NO_NOMANUL" %>

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
                <h4><i class="icon-reorder"></i>ANULAR DOCUMENTO DE COMPRA</h4>
                <div class="actions">
                    <a class="btn red" href="?f=nolanul" style="margin-top: -10px;"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <fieldset>
                    <legend>Datos Documento Compra
                    </legend>
                </fieldset>
                <div class="row-fluid">                                        
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNumDctoComp">N° Dcto Compra.</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNumDctoComp" class="span12" style="text-align:center;font-weight:bold;" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNumSec">Secuencia</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNumSec" class="span12" value="" style="text-align:center;" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group span4">
                            <label class="control-label" for="chkCompleto">
                                <input type="checkbox" id="chkCompleto" name="chkCompleto" disabled/>Completo</label>
                        </div>
                        <div class="control-group span4">
                            <label class="control-label" for="chkAnulado">
                                <input type="checkbox" id="chkAnulado" name="chkAnulado" disabled/>Anulado</label>
                        </div>
                        <div class="control-group span4">
                            <label class="control-label" for="chkContable">
                                <input type="checkbox" id="chkContable" name="chkContable" disabled/>Provisionado</label>
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
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa" disabled>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">Establec.</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Cliente -->
                <div class="row-fluid">
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_id_proveedor">Proveedor</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtProveedor" class="span12" placeholder="Proveedor" style="text-transform: uppercase" disabled/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_id_proveedor">Doc Ident.</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNroDctoProveedor" class="span12" style="text-align: center; margin-left: 2px;" disabled/>
                            </div>
                        </div>
                    </div>

                </div>
                <%--<div class="span12" style="margin-left: 0">
                </div>--%>


                <!-- Tipo Dcto / Impuesto / Tasa-->
                <div class="row-fluid">
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboDocumentoCompra">Documento</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <select id="cboDocumentoCompra" class="span12" data-placeholder="Doc. Compra" disabled>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="span3">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboDocumentoCompra">Nro Doc.</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSerieDocCompra" class="span12" data-placeholder="Serie" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="numeros span12" id="txtNroDocCompra" type="text" style="text-align:center;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <%--<div class="span12" style="margin-left: 0">
                </div>--%>
                <!-- Emision serie nro -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_emision">F. Emisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_emision" data-date-format="dd/mm/yyyy" disabled />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="span12 control-label" for="txt_fec_vencimiento">F. Vcmto</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" disabled/>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label">Operación</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtImpuesto2" class="span12" type="text" style="text-align:center;" disabled/>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Moneda -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_moneda">Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="input_moneda">
                                <select id="cbo_moneda" class="span12" data-placeholder="Moneda" disabled>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1" id="lbl_TC">
                        <div class="control-group">
                            <label class="control-label" for="txt_valor_cambio">T/C</label>
                        </div>
                    </div>
                    <div class="span2" id="input_valor_cambio">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_valor_cambio" class="span12" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Glosa / F.Transacc -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_comentario">Glosa</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <textarea id="txt_comentario" class="span12" rows="1" style="resize: vertical;" maxlength="90" readonly="readonly"></textarea>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_transaccion">Transac.</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_transaccion" data-date-format="dd/mm/yyyy" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Datos monetarios -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_base_imponible">Imponible</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_base_imponible" class="span12" type="text" value="0" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_descuento">Descuento</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_descuento" class="span12" type="text" value="0" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_isc">ISC</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_isc" class="span12" value="0" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row-fluid">
                    <div class="span3">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_impuesto">IGV (%)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_impuesto" class="span12" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_impuesto">IGV (<span id="simbolo_moneda">S/.</span>)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_impuesto_calc" class="span12" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span3">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_subtotal">Subtotal</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_subtotal" class="span12" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_detraccion">Detracción</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_detraccion" class="span12" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span3">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_monto_total"><b>Importe Pagar</b></label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_monto_total" class="span12" type="text" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_Percepcion">Percepción</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_Percepcion" class="span12" type="text" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span6"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_Retencion">Retención</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_Retencion" class="span12" type="text" style="text-align:right;" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <fieldset>
                    <legend>Datos Anulación
                    </legend>
                </fieldset>

                <div class="row-fluid" id="divDevoluciones" style="display:none;">
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
                        <label class="control-label" for="txtAnulacionCom">Comentario</label>
                    </div>
                    <div class="span7">
                        <div class="controls">
                            <div class="control-group">
                                <textarea id="txtAnulacionCom" class="span12" rows="2" style="resize: vertical;" maxlength="95" placeholder="Ingrese un comentario"></textarea>
                            </div>
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
                                <label class="span12 control-label" for="txt_fec_vencimiento">Fecha Anulación</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaAnulacion" data-date-format="dd/mm/yyyy" disabled/>
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
                                    <input type="text" class="span12" id="txtUsuarioAnulacion" disabled/>
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
        <h3>Anular Documento de Compra</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p><span id="msgDespacho"></span></p>
                <p>
                    Se anulará el documento de compra &nbsp;¿Desea continuar la operación?
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
    <input type="hidden" id="hfOperacion" />
    <input type="hidden" id="hfPor_igv" />
    <input type="hidden" id="hfAjuste" />
</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<script type="text/javascript" src="../vistas/NO/js/NOMANUL.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMANUL.init();

    });
</script>
