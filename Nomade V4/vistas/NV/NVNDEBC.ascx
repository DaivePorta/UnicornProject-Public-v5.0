<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVNDEBC.ascx.vb" Inherits="vistas_NV_NVNDEBC" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
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
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>NOTA DE DÉBITO A CLIENTE</h4>
                <div class="actions">
                    <%--<a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>--%>
                    <%--<a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=nvndebc" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NVLNDAC" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12 combobox" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1 offset1">
                            <div class="control-group">
                                <label class="control-label pull-right" for="cboEstablecimiento">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span12 combobox" data-placeholder="Establecimiento">
                                    </select>
                                </div>
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
                                <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Cliente" />
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1">
                        <div class="control-group">
                            <label id="lblSerieNota" class="control-label" for="cboSerieND">Serie</label>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSerieND" class="span12 combobox" data-placeholder="Serie">
                                    <option></option>
                                </select>    
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblNroNota" class="control-label" for="txtNroND">
                                Nro.</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNroND" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro" disabled="disabled" title="Número Nota de Débito" />
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
                            <label class="control-label" for="cboMotivo">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMotivo" class="span12 combobox" data-placeholder="Motivo o Sustento">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Periodo Tributario</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_periodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span10 offset1">
                        <div class="control-group">
                            <div class="controls">
                                <textarea class="span12" placeholder="Información Adicional Motivo" maxlength="500" id="txtMotivoAdicional" rows="3" style="resize: vertical; max-height: 250px;"></textarea>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoDocumento" class="span12 combobox" data-placeholder="Tipo de documento">
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


                    <div class="span1 offset3">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2 ">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12 combobox" data-placeholder="Moneda" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <fieldset>
                        <legend>Detalles Nóta de Débito</legend>
                    </fieldset>
                </div>

                <div id="divAgregarDetalles">
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtDesc">Descripción</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea class="span12" placeholder="Descripción detallada del bien vendido o cedido en uso, descripción o tipo de servicio prestado por ítem" maxlength="400" id="txtDesc" rows="2" style="resize: vertical; max-height: 200px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCantidad">Cantidad</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCantidad" class="span12 right" placeholder="Cantidad" onkeypress="return ValidaDecimales(event,this,3)" />
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboUnidadMedida">U. Medida</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="divUnidadMedida">
                                    <select id="cboUnidadMedida" class="span12 combobox" data-placeholder="U. Medida">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboAfectacionIgv">Afectación al IGV</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboAfectacionIgv" class="span12 combobox" data-placeholder="Afectación al IGV">
                                        <option value="GRA">GRAVADO</option>
                                        <option value="EXO">EXONERADO</option>
                                        <option value="INA">INAFECTO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtPrecioUnitario">Precio Venta</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtPrecioUnitario" class="span12 right" placeholder="P.U." onkeypress="return ValidaDecimales(event,this,3)" />
                                </div>
                            </div>
                        </div>

                        <%--    <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtIsc">ISC</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtIsc" class="span12 right" placeholder="ISC" onkeypress="return ValidaDecimales(event,this,3)" />
                                </div>
                            </div>
                        </div>--%>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtSubtotalItem">Valor Venta</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtSubtotalItem" class="span12 right" placeholder="Subtotal" onkeypress="return ValidaDecimales(event,this,3)" />
                                </div>
                            </div>
                        </div>


                        <div class="span4">
                            <div class="control-group">
                                <label id="lblIndIgv" class="control-label" style="color:gray">
                                    <small>*Montos para detalle incluyen IGV</small></label>
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
                        <div class="row-fluid" id="divTblDetalles" style="margin-top:2%;overflow-x:auto;">
                            <table id="tblDetalles" class="table display DTTT_selectable" style="border: 1px solid #cbcbcb;">
                                <thead class="fondoHeader">
                                    <tr>
                                        <th class="center">ITEM</th>
                                        <th class="center">DESCRIPCIÓN</th>
                                        <th class="center">CANTIDAD</th>
                                        <th class="center">U.M.</th>
                                        <th class="center" title="Precio Unitario">VALOR UNITARIO</th>
                                        <th class="center" title="Subtotal sin IGV">PRECIO VENTA UNITARIO</th>
                                        <th class="center">AFECTACIÓN AL IGV</th>
                                        <th class="center">IGV</th>
                                        <%--<th class="center">ISC</th>--%>
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
                                    <strong>IGV <span class='lblPctjIgv'></span>:</strong><br/>
                                    <small id="lblExonerado" style="color:gray;"></small>
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

                <div class="form-actions">
                    <a class="btn black hidden" id="btnEFac" style="display:none;"><i class="icon-file"></i>&nbsp;Fac. Electronica</a>
                    <a id="grabar" class="btn blue"><i class=" icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" onclick="javascript:Cancelar();"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<input id="hfCodigoNota" type="hidden" />
<input id="hfCodigoCorrelativo" type="hidden" />
<input id="hfIMPUESTO" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVNDEBC.js"></script>
<script>
    jQuery(document).ready(function () {
        NVNDEBC.init();
    });
</script>
