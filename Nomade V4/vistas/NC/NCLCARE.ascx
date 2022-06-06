<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCARE.ascx.vb" Inherits="vistas_NC_NCLCARE" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>RESPONSABLES DE CAJA</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>             
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
                    <div class="span3">
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
                        <div class="control-group">
                            <label class="control-label" for="cboResp">
                                Responsable</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtResp" class="span12" />
                            </div>
                        </div>
                    </div>

                     <div class="span4">
                         <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarCaja" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>   

                </div>

                 <div class="row-fluid" style="margin-top: 10px;">
                     <div class="span4">
                         <div class="control-group span6">
                            <div class="controls">
                                <a href="#" class="VerCaj">VER CAJEROS</a>
                            </div>
                        </div>
                    </div>      
                </div>


                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divCajerosCaja">
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


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCLCAUS.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCARE.init();

    });
</script>