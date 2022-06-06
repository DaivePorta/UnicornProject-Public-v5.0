<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLGHIS.ascx.vb" Inherits="vistas_CP_CPLGHIS" %>
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
                    <i class="icon-reorder"></i>&nbsp;REPORTE HISTÓRICO DE CUENTAS DIVERSAS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Persona</label>
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
                         <div class="control-group span2">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>               
                  
                </div>

                <div class="row-fluid">
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
                    <div class="span2 offset1">
                        <div class="control-group span8">
                            <label id="Label2" class="control-label" for="txtDiasRetraso">
                                Días Retraso Promedio</label>
                        </div>
                        <div class="control-group span2">
                            <div class="controls">
                                <input type="text"  id="txtDiasRetraso"  disabled="disabled"/>
                            </div>
                        </div>                   
                    </div>               
                </div>

                 <div class="row-fluid" id="bloqueTotales" style="display:none;margin-bottom: 10px;">                    
                    <div class="span2 offset1">
                        <strong>MONTO TOTAL  (<span id="lblMonedaBase"></span>):</strong>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase" >-</span>
                    </div>            
                    <div class="span2">
                        <strong>MONTO TOTAL (<span id="lblMonedaAlterna"></span>):</strong>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <span id="lblSimboloMonedaAlterna"></span>&nbsp;<span id="txtTotalMonedaAlterna" >-</span>
                    </div>
                </div>

                <div class="rwo-fluid" id="bloqueTipoCambio" style="display:none;" >
                    <div class="span4 offset1">
                        <strong>TIPO DE CAMBIO: </strong><span>OFICIAL - VENTA</span>
                    </div>
                    <div class="span3" style="">
                         <strong>AL: </strong><span id="fechaTipoCambio"></span> 
                     </div>                   
                    <div class="span3" style="">
                        <strong>CAMBIO: </strong><span id="valorTipoCambio" style="font-size: 16px;"> </span>
                    </div>
                </div>                         

                <div class="row-fluid">
                    <div id="divCuentasPorPagar">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />


<script type="text/javascript" src="../vistas/CP/js/CPLGHIS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLGHIS.init();
    });
</script>
