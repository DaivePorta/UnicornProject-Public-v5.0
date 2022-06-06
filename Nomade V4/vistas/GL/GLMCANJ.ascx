<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMCANJ.ascx.vb" Inherits="vistas_GL_GLMCANJ" %>

<style>
    .balanceado {
    color:green;
    font-weight:600;

    }
     .noBalanceado {
    color:red;
    font-weight:600;

    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CANJE DE LETRAS Y FACTURAS POR COBRAR</h4>
                <div class="actions">
                     
                    <a class="btn green" href="?f=glmcanj"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=gllcanj"><i class="icon-list"></i> Listar</a>
                  
                </div>

            </div>
            <div class="portlet-body" id="div_letra">

              <div class="row-fluid">
                    <div class="span1">
                        <label for="slcEmpresa">Empresa:</label>
                    </div>
                    <div class="span3">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcEmpresa" class="span12 obligatorio empresa" data-placeholder="EMPRESA">
                                     <option></option>
                                 </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCliente">
                                Cliente</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls" id="divCboCliente">
                                <select id="cboCliente" class="span12" data-placeholder="Seleccione Cliente">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>                
                </div>

          <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                <div class="row-fluid"> 
                    <div class="span6" id="divFechaGiro">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Fecha Canje</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaCanje" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row-fluid" id="divDocumentoVenta">                    
                     <div class="span6" id="prueba">
                        <div id="div_doc_origen">   
                            
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtNroDctoOrigen">
                                        Doc. Venta</label>
                                </div>
                            </div>
                                <div class="span8">
                                    <div class="control-group">
                                        <div class="controls">                                            
                                            <input id="txtSerieNroDctoOrigen_0" class="fila_0 txtSerieNroDctoOrigen span6" type="text" disabled style="text-align: left" />
                                            <input id="txtMontoDctoOrigenSoles_0" class="fila_0 txtMontoDctoOrigenSoles span3" data-montosol='' type="text" disabled style="text-align: center" />
                                            <input id="txtMontoDctoOrigenCambio_0" class="fila_0 txtMontoDctoOrigenCambio span3" data-montocambio='' type="text" disabled style="text-align: center" />
                                            <input id="txtCodigoDctoOrigen_0" class="fila_0 txtCodigoDctoOrigen"  data-codventa='' type="hidden" />
                                            <input id="txtCodMonto_0" class="fila_0 txtCodMonto"  data-codmonto='' type="hidden" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls" id="btnOrigen">
                                            <button type="button" id="btnBuscarDctoOrigen" class="fila_0 btn blue search" onclick="buscarDocumento(this)"><i class="icon-search" style="line-height: initial;"></i></button>
                                            <button type="button" id="btnAgregarDctoOrigen" class="fila_0 btn green add"><i class="icon-plus" style="line-height: initial;"></i></button>
                                            <%--<a id="btnRecargarDctoOrigen" class="btn green" title="Recargar"><i class="icon-refresh" style="line-height: initial"></i></a>--%>
                                        </div>
                                    </div>
                                </div>                          
                        </div>
                    </div>
                     <div class ="span6">
                         <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbo_moneda">
                                        Moneda Letra</label>
                                </div>
                            </div>
                            <div class="span3" id="divCboMoneda">
                                <div class="control-group">
                                    <div class="controls" id="input_moneda">
                                        <select id="cbo_moneda" class="span12" data-placeholder="Moneda">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="span1" id="lbl_TC">
                                <div class="control-group">
                                    <label class="control-label" for="txt_valor_cambio">
                                        T/C Interno</label>
                                </div>
                            </div>
                            <div class="span1" id="input_valor_cambio">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" />
                                    </div>
                                </div>
                            </div>--%>
                            <%--<div class="span1" id="lbl_fec_vig">
                                <div class="control-group">
                                    <label class="control-label" for="txt_fec_vig">
                                        Fec. Vig</label>
                                </div>
                            </div>--%>
                            <%--<div class="span1" id="input_fec_vig">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>--%>

                             <div class="span2" id="lbl_TC_Oficial">
                                <div class="control-group">
                                    <label class="control-label" for="txt_valor_cambio_Oficial">
                                        T/C Oficial</label>
                                </div>
                            </div>
                            <div class="span2" id="input_valor_cambio_Oficial">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txt_valor_cambio_Oficial" class="span12" disabled="disabled" type="text" />
                                    </div>
                                </div>
                            </div>                            
                        </div>
                         <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbo_moneda">
                                        <strong>Monto (<span id="simbolo_moneda"></span>):</strong></label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" id="monto_total"></label>
                                </div>
                            </div> 
                             <div class="span1">
                                
                            </div> 
                             <div class="span3">
                                <div class="control-group">
                                    <button type="button" id="btnGenerar" class="btn blue" disabled="disabled">Generar Letras</button>
                                </div>
                            </div> 
                            
                        </div>
                     </div>                     
                </div>  
                
                <div class="row-fluid" id="divDetalleCanje" style="display: none;">                       
                   <%-- <div class="span1">                        
                    </div>--%>
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Fecha Canje</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaCanjeView" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            
                        </div>
                        <div class="span2">
                            <label for="txtnumdoc">Cod. Canje</label>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtCodCanje" style="text-align: center"/>
                                </div>
                            </div>
                        </div>    
                    </div>

                    <div class="span6">
                         <div class="span2">
                            <label for="txtnumdoc">Moneda:</label>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" id="lblMonDescripcion"></label>                                  
                                </div>
                            </div>
                        </div>  
                        <div class="span2">
                            <label class="control-label">
                                            <strong>Monto (<span id="lblMoneda"></span>):</strong></label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" id="txtMonto"></label>                                                                
                                </div>
                            </div>
                        </div> 
                    </div>

                    
                   
                    <div class="row-fluid">
                        
                        <div class="span12">
                            <h4 id="title" style="padding-bottom: 1px; display:none"></h4>
                            <table id="tblDetalleDocumento" border="1" class="display DTTT_selectable" style="display: none;">
                                <thead>
                                    <tr>
                                        <th>COD DOCUMENTO
                                        </th>
                                        <th>DOCUMENTO
                                        </th>
                                        <th>NRO DOCUMENTO
                                        </th>
                                        <th>FECHA EMISION
                                        </th>
                                        <th>MONEDA
                                        </th>
                                        <th>MONTO (<span id="spnMonedaDocumento">S/.</span>)
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    

                </div> 

   
                <div id="divSimuLetras" style="padding-top: 10px; border-top: solid #e5e5e5 2px;">                                    
                    <div id ="">
                        <h4 id="titleLetras" style="padding-bottom: 10px;"></h4>
                        <div class="row-fluid">
                            <div class="span1">                                
                            </div>
                            <div class="span1">
                                <label for="txtnumdoc">Fecha Giro</label>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span10" id="txtFechaGiro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <label for="txtnumdoc">Fecha Registro</label>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span10" id="txtFechaRegistro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <label for="txtnumdoc">Lugar Giro</label>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12" id="txtLugarGiro" />
                                    </div>
                                </div>
                            </div>                       
                        </div>

                        <div class="row-fluid" id="divCabeceraSimulacion">
                            <div class="span1">                                
                            </div>
                             <div class="span1">
                                <label for="txtnumdoc">Letras Fijas</label>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="checkbox" id="chkLetrasFijas" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <label for="txtnumdoc">Numero de Letras</label>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12" id="txtNroLetras" onkeypress='return ValidaNumeros(event,this)'/>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <label for="txtnumdoc">Periodo de Letras</label>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtPeriodoLetras" class="span5" disabled="disabled" onkeypress='return ValidaNumeros(event,this)'/>
                                        <label style="display: inline-block;">&nbsp;&nbsp;días</label>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <button type="button" id="btnSimular" class="btn blue"><i class="icon-eye-open"></i>&nbsp;Simular</button>
                            </div>
                            <div class="span2 offset2">
                                <span id="txtBalanceadoStatus" class="noBalanceado">NO BALANCEADO
                                </span>
                            </div>
                        </div>
                    </div>
                    

                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblDetalle" border="1" class="display DTTT_selectable" style="display: none;">
                                <thead>
                                    <tr>
                                        <th>LETRA
                                        </th>
                                        <th>NRO DIAS
                                        </th>
                                        <th>FECHA
                                        </th>
                                        <th>MONTO (<span id="spnMoneda">S/.</span>)
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>                    

                </div>

                  <div class="form-actions" id="divControles">
                    <button type="button" id="grabar" class="btn blue" onclick="CrearCanje();"><i class="icon-save"></i> Canjear</button>
                    <button type="button" id="cancelar" class="btn " onclick="Cancelar();"><i class="icon-remove"></i> Cancelar</button>                    
                </div>
              
                 <input type="hidden" id="hddpagado" value=""/>                   
          </div>  
         </div>
    </div>
</div>

<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%; left: 40%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="documentosModal_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <table class="table table-hover" id="tblDocumentos">
                    <thead>
                        <tr>
                            <th style="text-align: center">NRO DOCUMENTO</th>                            
                            <th style="text-align: center">REFERENTE</th>
                            <th style="text-align: center">FECHA EMISION</th>
                            <th style="text-align: center">FECHA VENC.</th>
                            <th style="text-align: center">MONEDA</th>
                            <th style="text-align: center">MONTO</th>
                            <%--<th style="text-align: center;">DOCUMENTO</th>--%>
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



<script type="text/javascript" src="../vistas/GL/js/GLMCANJ.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLMCANJ.init();

    });
</script>