<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLRDAT.ascx.vb" Inherits="vistas_CP_CPLRDAT" %>
<style>

    .bloc {}
 .bloc select { height:0px;}

</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE DE CUENTAS ATRASADAS POR PAGAR</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>                
                    <%--<a href="?f=cplrdat" class="btn red"><i class="icon-list"></i>Listar</a>--%>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>   
                      
                      <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="slcEstablec" class="span12" data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
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
                
               <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span1"></div>
                    <div class="span2">
                        <strong>TOTAL  (<span id="lblMonedaBase"></span>):</strong>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase" >-</span>
                    </div>            
                    <div class="span2">
                        <strong>TOTAL (<span id="lblMonedaAlterna"></span>):</strong>
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
                    <div id="divDeudasAtrasadas">
                      
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPLRDAT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLRDAT.init();

    });
</script>
