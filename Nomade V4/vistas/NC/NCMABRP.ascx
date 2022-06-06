<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMABRP.ascx.vb" Inherits="vistas_NC_NCMABRP" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ABRIR PERIODO TRIBUTARIO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMABRP"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                 
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid" style="display:none;" id="msg">
                  <div class="alert alert-success" style="font-size:larger ;" id="msg_body">
								
									
								</div>
                </div>
        
                <div class="row-fluid">
                    <div class="span4"></div>
                    <div class="span4">
                        <div class="portlet box grey" id="ventana2">
                            <div class="portlet-title" style="text-align: center;">
                                <h4><i class="icon-unlock" style="font-size: larger;"></i>&nbsp;ABRIR PERIODO</h4>

                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span2"></div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <label class="control-label">Empresa</label>
                                            <div class="controls">
                                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                                    <option></option>
                                                </select>
                                                <asp:HiddenField ID="hfempresa" runat="server" />
                                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">
                                    <div class="span2"></div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <label class="control-label">Periodo</label>                                            
                                                <div class="controls">
                                                    <select id="cboAnio"class="combo m-wrap span4" data-placeholder="Año" tabindex="1">
                                                        <option></option>
                                                    </select> 
                                                      <select id="cboMes"  class="combo m-wrap span8" data-placeholder="Mes" tabindex="1">
                                                        <option></option>
                                                    </select>
                                                </div>                                         

                                        </div>
                                    </div>

                                </div>
                                
                                
                                <div class="row-fluid">
                                    <div class="span4"></div>
                                    <div class="span4">
                                     
                                        <button id="btn_abrir" type="button" class="bloquear btn green span12" disabled="disabled" style="margin-top: 25px;"><i class="icon-unlock"></i>&nbsp;&nbsp;ABRIR</button>
                                    </div>
                                    <div class="span4"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span4"></div>


                </div>
                <!-- FIN PRIMERA LINEA -->


            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->

<div id="ConfirmCierre" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Abrir Periodo Tributario</h3>
    </div>
    <div class="modal-body">
        <p id="modal_pregunta">
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_aceptar" data-dismiss="modal" class="btn black">
            Aceptar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NC/js/NCMABRP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMABRP.init();


    });


</script>
