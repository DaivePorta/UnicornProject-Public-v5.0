<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMANCL.ascx.vb" Inherits="vistas_CA_CAMANCL" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ANULACIÓN NOTA DE CRÉDITO CLIENTE</h4>
                <div class="actions">
                    <a href="?f=CALANCL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">

                <fieldset>
                    <legend>Datos Nota de Crédito
                    </legend>
                </fieldset>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" disabled="disabled" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                        </div>
                        <div class="span6">
                            <div class="control-group span4">
                                <label class="control-label" for="chkAnulado">
                                    <input type="checkbox" id="chkAnulado" name="chkAnulado" disabled="disabled" />
                                    Anulado</label>
                            </div>

                            <div class="control-group span8">
                                <div class="controls">
                                    <input type="checkbox" id="chkAlmacen" disabled="disabled" />
                                    Entrega / Despacho  por Almacén
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

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
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4" id="divCboEstablecimiento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento" disabled="disabled">
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Cliente" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="lblSerieNotaCredito" class="control-label" for="txtSerieNotaCredito">
                                Serie<br />
                                N.Crédito</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerieNotaCredito" onkeypress='return ValidaNumeros(event,this)' maxlength="4" class="span12" type="text" placeholder="Serie" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblNroNotaCredito" class="control-label" for="txtNroNotaCredito">
                                Nro.<br />
                                N.Crédito</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNroNotaCredito" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span1">
                        IGV <span class='lblPctjIgv'></span>
                    </div>

                    <div class="span2">
                        <input id='txtMontoIgv' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" disabled="disabled" />
                    </div>

                    <div class="span1 offset3">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmision">
                                Emisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmision" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>


                <div class="row-fluid">

                    <div class="span1">
                        Monto <span class='lblMoneda'></span>
                    </div>

                    <div class="span2">
                        <input id='txtTotalDevolucion' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" disabled="disabled" />
                    </div>

                    <div class="span1 offset3 ">
                        <div class="control-group">
                            <label class="control-label pull-right" for="txtFechaTransaccion">
                                Transacción</label>
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

                <!-- DOCUMENTO AL QUE MODIFICA -->

                <fieldset>
                    <legend>Datos Dcto. Referencia
                    </legend>
                </fieldset>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoDocumento">
                                Dcto Ref.</label>
                        </div>
                    </div>
                    <div class="span2" id="divCboTipoDocumento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoDocumento" class="span12" data-placeholder="Tipo de documento" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset3">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtSerie">
                                Serie</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerie" class="span12" type="text" disabled="disabled" />
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
                                <input id="txtNro" class="span12" type="text" disabled="disabled" />
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
                        <div class="control-group span4 ">
                            <label class="control-label" for="chkDevEfectivo">
                                <input type="checkbox" id="chkDevEfectivo" name="chkDevEfectivo" />
                                Devolución Efectivo</label>
                        </div>
                        <div class="control-group span4">
                            <label class="control-label" for="chkDevDespacho">
                                <input type="checkbox" id="chkDevDespacho" name="chkDevDespacho" />
                                Devolución Despacho</label>
                        </div>
                    </div>
                </div>


                <div class="row-fluid" id="divMensajes">
                    <!-- MENSAJES -->
                    <div class="span10 offset1">
                        <div class="row-fluid">
                            <div class="span12 alert alert-info">
                                <p id="P2">* Se removerán las amortizaciones, con esta nota de crédito, a otras ventas.</p>
                                <p id="P3">* Se actualizará kardex e inventario para los productos en la nota de crédito.</p>
                                <p id="P1">* Los productos seriados se marcarán como vendidos.</p>                              
                            </div>
                        </div>
                    </div>
                </div>

                 <div class="row-fluid" id="divMensajes2" style="display:none;">
                    <!-- MENSAJES -->
                    <div class="span10 offset1">
                        <div class="row-fluid">
                            <div class="span12 alert alert-info">
                                <p id="P4">* Se removerán las amortizaciones que coincidan con el monto total de esta esta nota de crédito, a otras ventas.</p>
                            </div>
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


<!-- VENTANAS MODALES-->
<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Anular Nota de Crédito</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p><span id="msgDespacho"></span></p>
                <p>
                    Se anulará la nota de crédito &nbsp;¿Desea continuar la operación?
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


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMANCL.js"></script>
<script>
    jQuery(document).ready(function () {
        CAMANCL.init();
    });
</script>
