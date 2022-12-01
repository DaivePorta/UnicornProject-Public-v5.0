<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMNOCL.ascx.vb" Inherits="vistas_CA_CAMNOCL" %>
<style>
    #divMail, #divBuscarDoc, #divWhatsapp, #mapaModal {
        margin-left: 0px !important;
    }

    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }

    .inputDevolucion {
        max-width: 100px;
    }

    @media (max-width:900px) {
        #divWhatsapp{
            left: 5% !important;
            width: 90% !important;
        }
    }

</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>NOTA DE CRÉDITO</h4>
                <div class="actions">
                    <a class="btn green hidden" id="btnWhatsapp"><i class="icon-phone"></i>&nbsp;Whatsapp</a>
                      <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a href="javascript: ImprimirDcto();" class="btn black" id="btnImprimirDcto" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMNOCL" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CALNOCL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboEmpresa" class="span12 combobox" data-placeholder="Empresa"></select>
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
                                        <select id="cboEstablecimiento" class="span12 combobox" data-placeholder="Establecimiento">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label id="lblrazsocial" class="control-label" for="txtrazsocial">Cliente</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="inputRazsocial">
                                        <input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Cliente" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label id="lblSerieNotaCredito" class="control-label" for="cboSerieNC">Serie</label>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSerieNC" class="span12 combobox" data-placeholder="Serie">
                                            <option></option>
                                        </select>    
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <label id="lblNroNotaCredito" class="control-label" for="txtNroNC">Nro</label>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNroNC" onkeypress='return ValidaNumeros(event,this);' maxlength="9" class="span12" type="text" placeholder="Nro" disabled="disabled" />
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
                                    <label class="control-label" for="txtFechaEmision">Fecha Emisión N. de Crédito</label>
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
                                    <label class="control-label" for="txtFechaTransaccion">Fecha Transacción</label>
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
                                        <select id="cboMotivo" class="span12 combobox"  data-placeholder="Motivo">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>                         
                            </div>

                            <div class="span1"></div>

                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="checkbox" id="chkAplicar" />
                                        Aplicar a Doc. que Modifica
                                    </div>
                                </div>
                            </div> 

                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="checkbox" id="chkAlmacen" />
                                        Recibir Productos de Cliente con esta Nota Crédito
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <br />
                        <div class="row-fluid">
                            <div class="span1">
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
                        </div>

                        <!-- DOCUMENTO AL QUE MODIFICA -->
                        <div class="span12" style="margin-left: 0">
                            <div class="portlet box yellow">
                                <div class="portlet-title" style="cursor: pointer;">
                                    <h4><i class="icon-chevron-down"></i>Documento al que Modifica</h4>
                                </div>
                                <div class="portlet-body">
                                    <div class="row-fluid">                    
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboTipoDocumento">Tipo Documento</label>
                                            </div>
                                        </div>
                                        <div class="span3">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboTipoDocumento" class="span12 combobox" data-placeholder="Tipo de documento">
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
                            
                                    <div class="row-fluid">
                                
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtFechaDocModif">Fecha Emisón Doc.</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaDocModif" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span1 offset3">
                                            <div class="control-group">
                                                <label class="control-label">Estado Pago:</label>
                                            </div>
                                        </div>

                                        <div class="span1">
                                            <div class="control-group">
                                                <label style="font-weight:bold"  class ="control-label" id="lblPagoInd">-</label>
                                            </div>
                                        </div>

                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label">Estado Despacho:</label>
                                            </div>
                                        </div>

                                        <div class="span1">
                                            <div class="control-group">
                                                <label style="font-weight:bold"  class ="control-label" id="lblDespachadoInd">-</label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>



                         <div class="row-fluid" style="margin-bottom: 20px;">
                           <%-- <div class="span1">
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
                            </div>--%>

                    
                     
                        </div>         
  

                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <div class="row-fluid" id="divDctoSeleccionado" style="display: none;">
                                    <h5 style="font-style: italic;">Documento:&nbsp;<span id="lblDctoSeleccionado"></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Moneda:<span class="lblMoneda"></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Precios Inc. IGV:<span class="lblIncIgv">Para Productos Gravados / No para Establecimiento Exonerado</span>
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

                                <br />

                                <div id="divTotales" style="display: none;">

                                    <div class="row-fluid">
                                        <!-- TOTALES -->
                                        <div class="span2 offset8">
                                            <div class="control-group">
                                                <label id="lblMontogravado" class="control-label lblGravado"  style="font-weight:bold;">-</label>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id='txtMontoGravado' disabled='disabled' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" />
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>

                                    <div class="row-fluid">
                                        <!-- TOTALES -->
                                        <div class="span2 offset8">
                                            <div class="control-group">
                                                <label id="lblMontoInafecta" class="control-label lblInafecta"  style="font-weight:bold;">-</label>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id='txtMontoInafecta' disabled='disabled' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" />
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>

                                    <div class="row-fluid">
                                        <!-- TOTALES -->
                                        <div class="span2 offset8">
                                            <div class="control-group">
                                                <label id="lblMontoExonerado" class="control-label lblExonerado"  style="font-weight:bold;">-</label>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id='txtMontoExonerado' disabled='disabled' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" />
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>





                                    <div class="row-fluid">
                                        <!-- TOTALES -->
                                        <div class="span2 offset8">
                                            <div class="control-group">
                                                <label id="lblMontoIgv" class="control-label lblPctjIgv"  style="font-weight:bold;">-</label>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id='txtMontoIgv' disabled='disabled' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" />
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>

                            
                                    <div class="row-fluid">
                                        <!-- TOTALES -->                                
                                        <div class="span2 offset8">
                                            <div class="control-group">
                                                <label id="lblTotalDevolucion" class="control-label lblMoneda span6" style="font-weight:bold;">-</label>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id='txtTotalDevolucion' disabled='disabled' class="span12" style='text-align: right;' type='text' onkeypress="return ValidaDecimales(event,this,2)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <input id='txtMontoISC' disabled='disabled' class="span12" style='text-align: right;' type='hidden' onkeypress="return ValidaDecimales(event,this,2)" />

                                    <div class="row-fluid">
                                        <div id="divMensajes">
                                            <!-- MENSAJES -->
                                            <div class="span8 ">
                                                 <div class="row-fluid">
                                                    <div class="span10 alert alert-info" id="divInfo">
                                                        <%--<p id="lblMsgDeuda">* Documento Referenciado tiene una deuda de: <strong id="lblDeuda">...</strong></p>--%>
                                                        <p id="lblMsgUsable">* La Nota de Crédito<strong class="no">&nbsp;NO</strong>&nbsp;se utilizará en el mismo Documento Referenciado.</p>
                                                        <p id="lblMsgDespacho">* La Nota de Crédito<strong class="si">&nbsp;NO</strong>&nbsp;realizará movimientos de Inventario y Kárdex.</p>
                                                        <%--<p id="lblMsgDevolverDinero">* La Nota de Crédito<strong class="si">&nbsp;NO</strong>&nbsp;devolverá el dinero pagado por Caja: &nbsp;<strong class="caja"></strong></p>--%>
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

                        <div class="row-fluid">
                        </div>

                        <div class="form-actions" style="margin-top: 20px;">
                            <a class="btn hidden black" id="btnEFac" style="display:none;"><i class="icon-file"></i>&nbsp;Fac. Electronica</a>
                            <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                            <a id="imprimir" class="btn black" href="javascript:ImprimirDcto();" style="display:none"><i class="icon-print"></i>&nbsp;Imprimir</a>
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

<div id="divWhatsapp" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divWhatsapp_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar Whatsapp</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divWhatsapp_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboClienteWhatsapp"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtContenidoWhatsapp"></textarea><hr style="margin: 8px 0px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarWhatsapp()" id="btnEnviarWhatsapp"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>


<!-- FIN CUADRO PARA LA FORMA-->
<div id="divDctoImprimir" style="display: none;">
</div>
 <!-- CAMPOS PARA CREAR QR -->
<div id="codigoQR" style="display: none"></div>  
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
<input id="hfCodAsiento" type="hidden" />
<input id="hfSecuenciaNotaCredito" type="hidden" />

<input id="hfCodigoCorrelativo" type="hidden" />
<input id="hfMoneda" type="hidden" />
<input id="hfSimboloMoneda" type="hidden" />

<input id="hfIMPUESTO" type="hidden" />
<input id="hfScslExoneradaInd" type="hidden" />

<input id="hfDespachadoInd" type="hidden" />
<input id="hfCobradoInd" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMNOCL.js"></script>
<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMNOCL.init();
    });
</script>
