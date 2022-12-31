<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCOAC.ascx.vb" Inherits="vistas_NC_NCMCOAC" %>

<div class="row-fluid">
    <%--<asp:HiddenField ID="hdfMontoMuestra" runat="server" />--%>
    <div class="span12">
        <div id="ventana" class="portlet box blue">
           <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CORRECCIÓN DE ACTIVIDADES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmcoac"><i class="icon-plus"></i>Nuevo</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEstablecimiento">Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboActividad">Actividad</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboActividad" class="span12"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="portlet box blue" style="border: 1px solid #ccc;">
                    <div class="portlet-title">
                        <h4><i class="icon-tag"></i> DOCUMENTO DE <span id="title_actividad"></span> </h4>
                    </div>

                    <div id="info_compras" class="portlet-body" style="display: none;">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboTipoDocumentoC">Tipo de Documento</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboTipoDocumentoC" class="span12" placeholder="Tipo Documento">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span1"></div>
                             <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtDocumentoC">Documento</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtSerieC" class="span12" type="text" placeholder="Nro" />                                        
                                    </div>
                                </div>
                            </div>
                             <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                       <input id="txtDocumentoC" class="span10" type="text" placeholder="Documento" />                                    
                                    </div>
                                </div>
                            </div>                            
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="button" id="btnBuscarDocumentoC" class="btn blue" title="Buscar documento">
                                            <i class="icon-search" style="line-height: initial;"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2">
                                <%--<div class="control-group">
                                    <label class="control-label" for="cboVendedorC">Vendedor</label>
                                </div>--%>
                            </div>
                            <div class="span3">
                                <%--<div class="control-group">
                                    <div class="controls">
                                        <select id="cboVendedorC" class="span12" placeholder="Vendedor">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>--%>
                            </div>           
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaEmisionC">Fecha Emisión</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmisionC" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaVencimientoC">Fecha Vencimiento</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaVencimientoC" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="info_ventas" class="portlet-body" style="display: none;">
                        <div class="row-fluid">      
                             <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtDocumentoV">Documento</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtSerieV" class="span12" type="text" placeholder="Nro" />                                        
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">                                        
                                        <input id="txtDocumentoV" class="span12" type="text" placeholder="Documento" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="button" id="btnBuscarDocumentoV" class="btn blue" title="Buscar documento">
                                            <i class="icon-search" style="line-height: initial;"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtClienteV">Cliente</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group"> 
                                    <div class="controls">
                                        <input id="txtClienteV" class="span12" type="text" placeholder="Cliente" />                                    
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboVendedor">Vendedor</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboVendedorV" class="span12" placeholder="Vendedor">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>           
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaEmisionV">Fecha Emisión</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmisionV" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaVencimientoV">Fecha Vencimiento</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaVencimientoV" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="info_gastos" class="portlet-body" style="display: none;">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboTipoDocumentoG">Tipo de Documento</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboTipoDocumentoG" class="span12" placeholder="Tipo Documento">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span1"></div>
                             <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtDocumentoG">Documento</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtSerieG" class="span12" type="text" placeholder="Nro" />                                        
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">                                        
                                        <input id="txtDocumentoG" class="span10" type="text" placeholder="Documento" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="button" id="btnBuscarDocumentoG" class="btn blue" title="Buscar documento">
                                            <i class="icon-search" style="line-height: initial;"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaEmisionG">Fecha Emisión</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                       <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaEmisionG" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>           
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtBeneficiarioG">Beneficiario</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group"> 
                                    <div class="controls">
                                        <input id="txtBeneficiarioG" class="span12" type="text" placeholder="Beneficiario" />                                    
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaVencimientoG">Fecha Vencimiento</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaVencimientoG" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaDetraG">Fecha Depósito Detracción</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaDetraG" data-date-format="dd/mm/yyyy" maxlength="10" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtNumeroDetraG">Nro. Depósito Detracción</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNumeroDetraG" class="span12" type="text" placeholder="Número Detracción" onkeypress="return ValidaNumeros(event,this)"/>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid" id="content_compra_periodo">
                            <div class="span2">
                                 <div class="control-group">
                                    <label class="control-label" for="chk_compras" >
                                        <div class="checker" id="uniform-chkComprasG">
                                            <span class="checked">
                                                <input type="checkbox" id="chkComprasG" checked="" name="chkComprasG" class="b limpiar" style="opacity: 0;"></span>
                                        </div>
                                        Registro de Compras</label>
                                </div>
                            </div>                          
                            <div class="span1 lb_periodo">
                                <div class="control-group">
                                    <label class="control-label" for="txtPeriodo">
                                        Periodo Tributario</label>
                                </div>
                            </div>
                            <div class="span3 slt_periodo">
                                <div class="control-group">
                                    <div class="controls ">
                                        <select id="cboPeriodoG" class="b limpiar span6 m-wrap" data-placeholder="Selecciona Periodo">
                                        </select>
                                    </div>
                                </div>
                            </div> 
                            <%--<div class="span1"></div>--%>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtEstado">Estado: </label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="span3">
                                    <div class="control-group">
                                        <label id="lbl_EstadoGasto" class="control-label" for="txt_glosa" style="color: blue;">
                                            <strong><span class="simboloMoneda"></span>&nbsp;<span id="lblEstadoGasto">-</span></strong>
                                        </label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="controls ">
                                        <button type="button" id="btnAnularGasto" class="btn red" style="display: none;">Anular</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="data_transaction"></div>

                </div>
                <div class="form-actions">
                    <button type="button" id="btnActualizarDocCompras" class="btn blue" style="display: none;" >
                        <i class="icon-pencil"></i>&nbsp; Modificar
                    </button>
                    <button type="button" id="btnActualizarDocVentas" class="btn blue" style="display: none;">
                        <i class="icon-pencil"></i>&nbsp; Modificar
                    </button>
                    <button type="button" id="btnActualizarDocGastos" class="btn blue" style="display: none;">
                        <i class="icon-pencil"></i>&nbsp; Modificar
                    </button>
                    <button type="button" id="btnCancelarOperacion" class="btn" style="display: inline;">
                        <i class="icon-remove"></i>&nbsp; Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL LISTA DOCUMENTOS DE COMPRAS -->
<div id="modalDocumentoCompra" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 80%; left: 10%; margin-left: 0px !important;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;<span class="tituloModal"></span> </h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">            
            <div class="span12">
                <table class="table table-hover" id="tblDocumentosCompra">
                    <thead>
                        <tr>
                            <th style="text-align: center">CÓDIGO</th>
                            <th style="text-align: center">NRO DCTO</th>
                            <th style="text-align: center">EMISIÓN</th>
                            <th style="text-align: center">VENCIMIENTO</th>
                            <th>PROVEEDOR</th>
                            <%--<th>VENDEDOR</th>--%>
                            <th style="text-align: center">COMPLETO</th>           
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

<!-- MODAL LISTA DOCUMENTOS DE VENTAS -->
<div id="modalDocumentoVenta" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 80%; left: 10%; margin-left: 0px !important;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;<span class="tituloModal"></span> </h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">            
            <div class="span12">
                <table class="table table-hover" id="tblDocumentosVenta">
                    <thead>
                        <tr>
                            <th style="text-align: center">CÓDIGO</th>
                            <th style="text-align: center">NRO DCTO</th>
                            <th style="text-align: center">EMISIÓN</th>
                            <th style="text-align: center">VENCIMIENTO</th>
                            <th>CLIENTE</th>
                            <th>VENDEDOR</th>
                            <th style="text-align: center">COMPLETO</th>           
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

<!-- MODAL LISTA DOCUMENTOS DE GASTOS -->
<div id="modalDocumentoGasto" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 80%; left: 10%; margin-left: 0px !important;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;<span class="tituloModal"></span> </h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">            
            <div class="span12">
                <table class="table table-hover" id="tblDocumentosGasto">
                    <thead>
                        <tr>
                            <th style="text-align: center">CÓDIGO</th>
                            <th style="text-align: center">TIPO DCTO</th>
                            <th style="text-align: center">NRO DCTO</th>
                            <th>CONCEPTO</th>
                            <th>GASTO</th>
                            <th style="text-align: center">EMISIÓN</th>
                            <th style="text-align: center">BENEFICIARIO</th>   
                            <th>IND_COMPRAS</th>
                            <th>ANIO_TRIB</th>
                            <th>MES_TRIB</th>
                            <th>CODE_APROB</th>
                            <th>ESTADO_GASTO</th>
                            <th>ESTADO_GASTO_DESCRIPCION</th>
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

<!-- VENTANAS MODALES-->
<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Anular Documento de Gasto</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p><span id="msgDespacho"></span></p>
                <p>
                    Se anulará el documento de gasto &nbsp;¿Desea continuar la operación?
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

<input id="hfcod_gasto" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NC/js/NCMCOAC.js?<%=aleatorio%>"></script>

<script>
    jQuery(document).ready(function () {
        NCMCOAC.init();
    });
</script>