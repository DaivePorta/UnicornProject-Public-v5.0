<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMNOPR.ascx.vb" Inherits="vistas_CA_CAMNOPR" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }

    .inputDevolucion {
        max-width: 100px;
    }
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>NOTA DE CRÉDITO DEVOLUCIÓN PROVEEDOR</h4>
                <div class="actions">
                    <a href="javascript: ImprimirDcto();" class="btn black" id="btnImprimirDcto" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=camnopr" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=calnopr" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>

            <div class="portlet-body">

                <!-- TITULO DE LOS TABS-->
                <ul class="nav nav-tabs">
                    <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                    <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                </ul>

                
                <div class="tab-content">
                    <!-- INICIO DEL TAB GENERALES-->
                    <div class="tab-pane active" id="datos_generales">
                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="cboEmpresa">Empresa</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span1 offset1">
                                <div class="control-group">
                                    <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">Establecimiento</label>
                                </div>
                            </div>

                            <div class="span4">
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
                                    <label id="lblrazsocial" class="control-label" for="txtrazsocial">Proveedor</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="inputRazsocial">
                                        <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Proveedor" />
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
                                        <input id="txtSerieNotaCredito" class="span12" type="text" placeholder="Serie" />
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
                                        <input id="txtNroNotaCredito" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtFechaEmision">
                                        Fecha Emisión</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmision" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1 offset3 ">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtFechaTransaccion">Fecha Transacción</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaTransaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodigo">Periodo Tributario</label>
                                </div>
                            </div>
                            <div class="span2" id="divCboPeriodo">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboPeriodo" class="span12" data-placeholder="Selecciona Periodo">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- DOCUMENTO AL QUE MODIFICA -->

                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="cboTipoDocumento">Tipo Documento</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboTipoDocumento" class="span12" data-placeholder="Tipo de documento">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <%-- <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnBuscarDocumento" class="btn" style="background-color: white;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="button" class="btn blue" id="btnBuscarDocumento"><i class="icon-search" style="line-height: initial"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="span1 offset1">
                                <div class="control-group">
                                    <label id="Label1" class="control-label" for="txtSerie">Serie</label>
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
                                    <label id="Label2" class="control-label" for="txtNro">Nro.</label>
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

                        <div class="row-fluid" style="margin-bottom: 20px;">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="devolucion">Devolución</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="controls">
                                    <label class="radio">
                                        <div class="radio" id="Div3">
                                            <span>
                                                <input type="radio" name="devolucion" value="T" checked="checked" style="opacity: 0;" id="rbTotal" />
                                            </span>
                                        </div>
                                        Total
                                    </label>
                                    <label class="radio">
                                        <div class="radio" id="Div4">
                                            <span>
                                                <input type="radio" name="devolucion" value="P" style="opacity: 0;" id="rbParcial" />
                                            </span>
                                        </div>
                                        Parcial
                                    </label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboMotivo">Motivo</label>
                                        </div>
                                    </div>
                                    <div class="span10">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboMotivo" class="span12 combobox" data-placeholder="Motivo" disabled>
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="checkbox" id="chkAlmacen" />
                                                Entrega / Despacho  por Almacén
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6" id="divchkAmortizar" style="display: none">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="checkbox" id="chkAmortizar" />
                                                Amortizar misma Factura
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <div class="row-fluid" id="divDctoSeleccionado" style="display: none;">
                                    <h5 style="font-style: italic;">Documento:&nbsp;<span id="lblDctoSeleccionado"></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Moneda:<span class="lblMoneda"></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Precios Inc. IGV:<span class="lblIncIgv"></span>
                                    </h5>

                                </div>
                                <div class="row-fluid" id="divTblDetallesCompraVenta">
                                    <table id="tblDetallesCompraVenta" class="display DTTT_selectable bordered dataTable no-footer" style='width: 100%;'>
                                        <thead style="color: white; background-color: rgb(75, 135, 184);">
                                            <tr>
                                                <th>CÓDIGO<br />
                                                    PRODUCTO</th>
                                                <th>PRODUCTO</th>
                                                <th>UNIDAD<br />
                                                    MEDIDA</th>
                                                <th>CANTIDAD</th>
                                                <th style="max-width: 60px; width: 90px;">CANTIDAD<br />
                                                    DEVOLUCIÓN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div id="divTotales" style="display: none;">

                                    <div class="row-fluid">
                                        <div id="divMensajes">
                                            <!-- MENSAJES -->
                                            <div class="span8 ">
                                                <div class="row-fluid">
                                                    <div class="span10 alert alert-info">
                                                        <p id="lblMsgDeuda">* Documento Referenciado tiene una deuda de: <strong id="lblDeuda">...</strong></p>
                                                        <p>* Documento Referenciado tiene un monto de: <strong id="lblNotacredi">...</strong> en <strong id="lblTotalNotas">...</strong> Nota(s) de crédito.<a id="aVerDetalles" style="display: none; cursor: pointer; font-weight: 600;">Ver Detalles..</a></p>
                                                        <p id="lblMsgUsable">* La Nota de Crédito&nbsp;<strong class="no"></strong>&nbsp;amortizar el Documento Referenciado.</p>
                                                        <p id="lblMsgDespacho">* Nota de Crédito&nbsp;<strong class="no"></strong>&nbsp;realizará movimientos de Inventario y Kárdex.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- TOTALES -->
                                            <div class="span4">
                                                <div class='row-fluid' style='margin-top: 20px;'>
                                                    <div class='span6'>
                                                        <strong>IGV <span class='lblPctjIgv'></span>:</strong>
                                                    </div>
                                                    <div class='span6'>
                                                        <input id='txtMontoIgv' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" disabled />
                                                    </div>
                                                </div>

                                                <div class='row-fluid'>
                                                    <div class='span6'>
                                                        <strong>MONTO<span class='lblMoneda'></span>:</strong>
                                                    </div>
                                                    <div class='span6'>
                                                        <input id='txtMonto' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" disabled />
                                                    </div>
                                                </div>


                                                <div class='row-fluid'>
                                                    <div class='span6'>
                                                        <strong>AJUSTE <span class='lblMoneda'></span>:</strong>
                                                    </div>
                                                    <div class='span6'>
                                                        <input id='txtAjuste' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2,true)" value="0" />
                                                    </div>
                                                </div>

                                                <div class='row-fluid'>
                                                    <div class='span6'>
                                                        <strong>MONTO TOTAL <span class='lblMoneda'></span>:</strong>
                                                    </div>
                                                    <div class='span6'>
                                                        <input id='txtTotalDevolucion' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" disabled />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>
                        <div class="row-fluid">
                        </div>
                        <div class="row-fluid"><span style="float: right; font-size: smaller"><i class="icon-circle" style="color: rgb(255, 255, 124);"></i>&nbsp;Productos incluidos en otra(s) nota(s) de crédito.</span></div>
                        <div class="form-actions" style="margin-top: 20px;">
                            <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                    <!-- FIN DE GENERALES-->

                    <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                    <div class="tab-pane" id="asientos_contables">                                          
                        <h1></h1>
                    </div>
                    <!-- FIN DE ASIENTOS CONTABLES-->
                </div>

            </div>

        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->
<div id="divDctoImprimir" style="display: none;">
</div>

<div id="muestralistaNotasCred" style="width: 900px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;<span id="tituloModal">LISTA DE NOTAS DE CREDITO</span> </h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divmodal">
                <table id="tblLNotaCred" class="display DTTT_selectable">
                    <thead>
                        <tr>
                            <th>DOCUMENTO</th>
                            <th>FECHA EMISION</th>
                            <th>MONTO</th>
                            <th>FECHA DE REGISTRO</th>
                        </tr>
                    </thead>

                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer"><span style="float: right; font-size: smaller">*Click en item de la lista para ir a su detalle.</span></div>
</div>

<!-- MODAL DE CONFIRMACION PARA LA NOTA DE CREDITO  -->
<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Confirmar</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p style="text-align: center; font-size: 1.2em;" class="span12" id="mensajeConfirmacion1">¿Desea pagar con la Nota de Crédito el Documento</p>
                <p style="text-align: center; font-size: 1.2em;" class="span12" id="mensajeConfirmacion2">Seleccionado?</p>

            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="span1 offset1">
                </div>
                <div class="span3 offset1">
                    <a id="btnAceptarConfir" class="btn green"><i class="icon-check"></i>&nbsp;SI</a>
                </div>
                <div class="span3">
                    <a id="btnCancelarConfir" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;NO</a>
                </div>
            </div>
        </div>
    </div>
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<input id="hfCodDocSeleccionado" type="hidden" />
<input id="hfNroDocSeleccionado" type="hidden" />
<input id="hfSerieDocSeleccionado" type="hidden" />
<input id="hfSecuenciaDocSeleccionado" type="hidden" />

<input id="hfTipoDocSeleccionado" type="hidden" />
<input id="hfImporteOrigen" type="hidden" />
<input id="hfCodigoNotaCredito" type="hidden" />
<input id="hfSecuenciaNotaCredito" type="hidden" />

<input id="hfMoneda" type="hidden" />
<input id="hfSimboloMoneda" type="hidden" />

<input id="hfIMPUESTO" type="hidden" />
<input id="hfIncIgvInd" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMNOPR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMNOPR.init();
    });
</script>
