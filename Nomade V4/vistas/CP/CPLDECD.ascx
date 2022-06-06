<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLDECD.ascx.vb" Inherits="vistas_CP_CPLDECD" %>
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
                <h4><i class="icon-reorder"></i>DEUDAS ACTUALES DIVERSAS</h4>
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
                            <label class="control-label">
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

                    <div class="span2 ">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
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

<script type="text/javascript" src="../vistas/CP/js/CPLDECD.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLDECD.init();
    });
</script>