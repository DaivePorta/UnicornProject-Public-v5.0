<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCAUS.ascx.vb" Inherits="vistas_NC_NCLCAUS" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE CAJAS POR USUARIO</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>             
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblRol" class="control-label" for="cboRol">
                                Rol:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboRol" class="span12" data-placeholder="Rol Usuario">
                                    <option value="">TODOS</option>
                                    <option value="C">CAJERO</option>
                                    <option value="R">RESPONSABLE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Cajas Inactivas:</label>
                        </div>
                    </div>

                    <div class="span2" id="divchkRegistro">
                        <div class="control-group">
                            <div class="controls">
                                <div class="danger-toggle-button-custom">
                                    <input id="chkInactivas" type="checkbox" class="toggle" />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
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
                            <label class="control-label" for="cboResp" id="lblCajero" >
                                Cajero</label>
                        </div>
                  
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="input">
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
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NC/js/NCLCAUS.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCAUS.init();

    });
</script>
