<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMNGPR.ascx.vb" Inherits="vistas_CA_CAMNGPR" %>
<style>
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
                    <i class="icon-reorder"></i>NOTA DE CRÉDITO GENÉRICA PROVEEDOR</h4>
                <div class="actions">
                    <a href="javascript: ImprimirDcto();" class="btn black" id="btnImprimirDcto" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMNGPR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CALNGPR" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                        Proveeedor</label>
                                </div>
                            </div>
                            <div class="span4" id="divTxtRazonSocial">
                                <div class="control-group">
                                    <div class="controls" id="inputRazsocial">
                                        <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Proveeedor" />
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
                                        <input id="txtSerieNota"  maxlength="5" class="span12" type="text" placeholder="Serie" />
                                    </div>
                                </div>
                            </div>
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
                                        <input id="txtNroNota" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro"  />
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
                           

                        <div class="row-fluid">
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


                            <div class="span1 offset3">
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
                            </div>
                        </div>
                    
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
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                    
<%--                            <div class="span1 offset3">
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
                            </div>--%>

                            <div class="span1 offset1">
                                <div class="control-group">
                                    <label class="control-label subMotivo" for="cboSubMotivo" style="display:none">
                                        Submotivo</label>
                                    <label class="control-label motivo" for="txtMotivoAdicional" style="display:none">
                                        Motivo</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSubMotivo" class="span12" data-placeholder="Submotivo" style="display:none" disabled="disabled">
                                            <option></option>
                                        </select>
                                        <textarea class="span12 motivo" placeholder="Motivo" maxlength="100" id="txtMotivoAdicional" rows="1" style="resize: vertical; max-height: 250px;display:none;" disabled="disabled"></textarea>                      
                                    </div>
                                </div>
                            </div>
                        </div> 
                        
                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label modalidad" for="cboBancoCaja" style="display:none">
                                        Modalidad</label>
                                </div>
                            </div>
                            <div class="span4" id="divCboBancoCaja">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboBancoCaja" class="span12" data-placeholder="Modalidad" style="display:none" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span1 offset1">
                                <div class="control-group">
                                    <label id="lblCaja" class="control-label caja" for="cboCuentaBanc_Caja" style="display:none">
                                        Caja</label>
                                    <label id="lblCtaBanc" class="control-label cuentaBancaria" for="cboCuentaBanc_Caja" style="display:none"> 
                                        Cuenta Bancaria</label>
                                </div>
                            </div>

                            <div class="span4" id="divcboCuentaBanc_Caja">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboCuentaBanc_Caja" class="span12" data-placeholder="Seleccionar" style="display:none" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span1 offset6">
                                <div class="control-group">
                                    <label id="lblNroOperacion" class="control-label nroOp" for="txtNroOpe" style="display:none">
                                        Nro.<br />
                                        Operación</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNroOpe"class="span12" type="text" placeholder="Nro. Operación" style="display:none" disabled="disabled"/>
                                    </div>
                                </div>
                            </div>
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
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFechaEmisionRef" type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <!-- SE AGREGÓ EL CAMPO MONTO EN EL FORMULARIO -->
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtMonto">
                                        Monto</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtMonto" type="text" class="span12 date-picker" placeholder="Monto" disabled="disabled" />
                                    </div>
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
                                            <input type="text" id="txtSubtotalItem" class="span12 right" placeholder="Subtotal" onkeyup="ValidarTotales()" onkeypress="return ValidaDecimales(event,this,3)" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <label id="lblIndIgv" class="control-label" style="color: gray">
                                            <small>*Montos para detalle incluyen IGV</small></label>
                                    </div>
                                </div>

                                   <div class="span2">
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

                        </div>


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

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<input id="hfCodigoNotaCredito" type="hidden" />
<input id="hfCodigoCorrelativo" type="hidden" />
<input id="hfIMPUESTO" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMNGPR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMNGPR.init();
    });
</script>
