<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLRFVA.ascx.vb" Inherits="vistas_CC_CCLRFVA" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE FACTURAS DE VENTAS C/AMORTIZACIONES</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                     <a id="A4" class="btn purple enviaMail"><i class="icon-envelope"></i>&nbsp Mail</a>
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
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
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
                            <label class="control-label" for="inputRazsocial">
                                Cliente</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtRuc" class="span3" type="text" disabled="disabled" />
                                <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                   
                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />                                
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>

                        <div class="control-group span3">
                            <div class="controls">
                               <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />      
                            </div>
                        </div>
                    </div>
                     <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
              
              <div class="row-fluid" id="bloqueTotales" style="display: none; margin-bottom: 10px;">
                    <div class="span12">
                        <div class="row-fluid">
                              <div class="span2 offset1">
                                <strong>MONTO TOTAL  (<span id="lblMonedaBase0"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaBase0"></span>&nbsp;<span id="txtTotalMonedaBase0">-</span>
                            </div>
                            <div class="span2">
                                <strong>MONTO TOTAL (<span id="lblMonedaAlterna0"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaAlterna0"></span>&nbsp;<span id="txtTotalMonedaAlterna0">-</span>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2 offset1">
                                <strong>DEUDA  (<span id="lblMonedaBase"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase">-</span>
                            </div>
                            <div class="span2">
                                <strong>DEUDA (<span id="lblMonedaAlterna"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaAlterna"></span>&nbsp;<span id="txtTotalMonedaAlterna">-</span>
                            </div>
                        </div>
                    </div>                  
                </div>

                <div class="row-fluid" id="bloqueTipoCambio" style="display: none;">
                    <div class="span4 offset1">
                        <strong>TIPO DE CAMBIO: </strong><span>OFICIAL - VENTA</span>
                    </div>
                    <div class="span3" style="">
                        <strong>AL: </strong><span id="fechaTipoCambio"></span>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <strong>CAMBIO: </strong><span id="valorTipoCambio"></span>
                    </div>
                </div>

                <div class="row-fluid">
                    <div id="divBandeja">
                    </div>
                </div>
            </div>
              <div class="portlet-footer" style="color: white;" align="right">
                (ª)<small> Documento con Anticipo(s). Los anticipos están deducidos de sus documentos.</small>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CC/js/CCLRFVA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCLRFVA.init();
    });
</script>





