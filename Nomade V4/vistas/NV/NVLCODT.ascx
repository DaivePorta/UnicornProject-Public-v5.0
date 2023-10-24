<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLCODT.ascx.vb" Inherits="vistas_NV_NVLCODT" %>
<style>
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

        #gritter-notice-wrapper {
            display: none !important;
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
            /*font-family: 'Lucida Console'  !important;*/
            font-family: Arial !important;
        }

        #tblDocumento, .arial {
            font-family: 'Arial' !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .chat-window {
            display: none;
            margin:0px !important;
        }

    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONTROL DE DINERO EN TRÁNSITO</h4>
                <div class="actions">
                    <%--<a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=nvmdocv"><i class="icon-plus"></i>&nbsp;Nuevo</a>--%>
                    <a class="btn red" href="?f=nvlcodt"><i class="icon-list"></i>&nbsp;Listar</a>
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                  <div class="span1">
                        <div class="control-group ">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                    </div>
                    <div class="span4">                        
                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy"  maxlength="10"/>
                            </div>
                        </div>
                        <div class="control-group span4">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align:center;">
                                Hasta</label>
                        </div>

                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboAnulado">
                                Estado</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Estado">
                                    <option value="TODOS">TODOS</option>
                                    <option value="A">APLICADO</option>
                                    <option value="P">POR APLICAR/CANJEAR</option>
                                    <option value="C">CANJEADO</option>
                                    <option value="X">ANULADO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div> 
                </div>
                
               <%-- <div class="row-fluid">
                </div>--%>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <%--Cargar Tabla--%>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
    </div>

</div>

<div id="modalPagar" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <%--<button type="button" class="btnexit btn red" data-dismiss="modal" aria-hidden="true" style="margin-top: 6px; float: right;">
            <i class="icon-remove"></i>
        </button>--%>
        <h4 id="myModalLabel"><i class="icon-money"></i>  APLICAR / CANJEAR <span id="PgDvDesc"></span></h4>
    </div>
    <div class="modal-body" id="mensajemodal">
        <div class="span12">
            <div id="divCabecera" style="padding: 15px; background:#E6E6E6">
                <div class="row-fluid">                
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblDocCliente"><b></b></label>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblGlosa" align="right"><b></b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">                
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblCliente"><b></b></label>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblMonto" align="right"><b></b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">                
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblSerieNro"><b></b></label>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblFecha" align="right"><b></b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="display:none">                
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblCodVenta"><b></b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="display:none">                
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblTipoDctoCliente"><b></b></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="border-color: #E6E6E6; border-style: solid; border-width: 1px; margin-bottom: 15px;"></div>
            <div class="row-fluid">                
                <div class="span12">
                    <div class="control-group">
                        <div class="controls">
                            <label id="lbltxt"><b>Tipo de Aplicación:</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">                
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <label class="control-label">
                                <input type="radio" class="m-wrap span12" id="rbAplicarDoc" name="rbAplicarDoc" checked="checked" />
                                Aplicar a Entidad
                            </label>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <label class="control-label" for="rbseriada">
                                <input type="radio" class="m-wrap span12" id="rbCanjearDoc" name="rbCanjearDoc" />
                                Canjear Tipo Doc.
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 20px;"></div>
            <div class="row-fluid" id="divAplicar"> 
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtFechaAplica">
                            <b>Fecha de Aplicación</b></label>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaAplica" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtFechaAplica">
                            <b>Documento Nuevo</b></label>
                    </div>
                </div>
                <div class="span5">
                    <div class="control-group">
                        <div class="controls">
                            <input id="txtDocumentoNuevoAplica" class="span12" type="text" style="text-transform: uppercase" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="divAplicar2"> 
                <div class="span5"></div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtMontoAplicado">
                            <b>Monto a Canjear</b></label>
                    </div>
                </div>
                <div class="span5">
                    <div class="control-group">
                        <div class="controls">
                            <input id="txtMontoAplicado" onkeyup="ValidarTotales()" class="span12" type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="divCanjear" style="display:none"> 
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtFechaCanjea">
                            <b>Fecha de Canje</b></label>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaCanjea" data-date-format="dd/mm/yyyy" disabled="disabled"/>
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtFechaCanjea">
                            <b>Documento Nuevo</b></label>
                    </div>
                </div>
                <div class="span5">
                    <div class="control-group">
                        <select id="cboDocumentoVenta" class="span12" data-placeholder="Doc. Venta">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="divCanjear2" style="display:none"> 
                <div class="span5"></div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtFechaCanjea">
                            <b>Serie - Correlativo</b></label>
                    </div>
                </div>
                <div class="span5">
                    <div class="span12">
                        <div class="control-group span12" id="divSerieCorr">
                            <div class="controls">
                                <select id="cboSerieDocVenta" class="span5" data-placeholder="Serie" disabled="disabled">
                                    <option></option>
                                </select>
                                <input class="numeros span7" id="txtNroDocVenta" type="text" disabled="disabled" style="text-align: center; margin-left: 2px;" placeholder="Nro."/>
                            </div>
                        </div>
                        <div class="span12" style="margin-top: -20px;">
                            <small id="lblTipoCorrelativo" style="color: gray"></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="btnAplicarCanjear" type="button" class="btn green">Aplicar</button>
        <button id="btnSalir" type="button" class="btn red">Rechazar</button>
    </div>
</div>

<div id="modalConfirmar" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <%--<button type="button" class="btnexit btn red" data-dismiss="modal" aria-hidden="true" style="margin-top: 6px; float: right;">
            <i class="icon-remove"></i>
        </button>--%>
        <h4><i class="icon-question-sign" style="line-height: initial;"></i>&nbsp ¡ADVERTENCIA!<span id="div_title"></span></h4>
    </div>
    <div class="modal-body" id="mensajemodalConfirmar">
        <div class="row-fluid">
                    <div class="span12">
                        <div class="control-group">
                            <label class="control-label" style="text-align:center; color:red; font-size:16px;"><strong>MENSAJE DE CONFIRMACIÓN</strong></label>
                        </div>
                        <div class="control-group">
                            <label id="txtMensajeConfirmar" class="control-label" style="text-align:center; font-size:12px;"><strong>¿Estás seguro de aplicar el documento?</strong></label>
                        </div>
                    </div>    
                    
                </div>
    </div>
    <div class="modal-footer">
        <button id="btnAplicarCanjearConfirmar" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;SÍ</button>
        <button id="btnSalirConfirmar" type="button" class="btn red"><i class="icon-remove"></i>&nbsp;NO</button>
    </div>
</div>
<input id="hfMontoPagado" type="hidden" />
<script type="text/javascript" src="../vistas/NV/js/NVLCODT.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLCODT.init();
    });
</script>