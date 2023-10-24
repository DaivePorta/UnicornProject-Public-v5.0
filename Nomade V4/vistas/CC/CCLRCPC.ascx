<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLRCPC.ascx.vb" Inherits="vistas_CC_CCLRCPC" %>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE DE CUENTAS POR COBRAR</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a href="?f=cclrcpc" class="btn red"><i class="icon-list"></i>Listar</a>--%>
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

              <%--  <div class="row-fluid" style="margin-bottom:25px;">
                    <div class="span1"></div>
                     <div class="span3">
                        <strong>TOTAL EN CUENTAS POR COBRAR:</strong>
                    </div>
                    <div class="span3">
                        <span>S/. </span><span id="txtTotal">-</span>
                    </div>
                </div>--%>


                 <div class="row-fluid" style="margin-bottom: 10px;">               
                    <div class="span2 offset1">
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
                    <div id="divCuentasPorCobrar">
                      <%--  <table id="tblCuentasPorCobrar" class="display DTTT_selectable" border="0" style='width: 100%;'>
                            <thead>
                                <tr>
                                    <th>CLIENTE</th>
                                    <th>DIRECCIÓN</th>
                                    <th>TELEFONO</th>
                                    <th>DÍAS</th>
                                    <th>DEUDA(S/.)</th>
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
                        </table>--%>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<script type="text/javascript" src="../vistas/CC/js/CCLRCPC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCLRCPC.init();
    });
</script>
