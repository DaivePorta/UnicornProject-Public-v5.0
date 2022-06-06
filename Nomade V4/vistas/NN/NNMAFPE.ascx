<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMAFPE.ascx.vb" Inherits="vistas_NN_NNMAFPE" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GENERAR EXCEL AFPNET</h4>
                <div class="actions">
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid" style="display: none;" id="msg_exito">
                    <div class="alert alert-success" style="font-size: large;">

                        <strong>Exito!</strong> La planilla se cerro correctamente.
                    </div>
                </div>
                <div class="row-fluid" style="display: none;" id="msg_error">
                    <div class="alert alert-error" style="font-size: large;">

                        <strong>Alerta!</strong> La planilla que intenta cerrar no ha culminado, imposible de ser cerrada.
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4"></div>
                    <div class="span4">
                        <div class="portlet box grey" id="ventana2">
                            <div class="portlet-title" style="text-align: center;">
                                <h4><i class="icon-cogs" style="font-size: larger;"></i>&nbsp;GENERAR EXCEL</h4>

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
                                            <label class="control-label">Planilla Afp</label>
                                            <div class="controls">
                                                <select id="cbo_planilla" name="cbo_planilla" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Planilla" tabindex="1">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div class="row-fluid">
                                    <div class="span4"></div>
                                    <div class="span4">

                                        <button id="btn_generar" type="button" class="bloquear btn blue span12" disabled="disabled" style="margin-top: 25px;"><i class="icon-cog"></i>&nbsp;&nbsp;GENERAR</button>
                                       

                                    </div>
                                    <div class="span4">
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span3"></div>
                                    <div class="span6">
                                       <button id="btn_descarga" type="button" class="bloquear btn green span12" style="margin-top: 25px; display:none">&nbsp;&nbsp;DESCARGAR XLS</button>
                                    </div>
                                    <div class="span2">
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="span4"></div>


                </div>
                <!-- FIN PRIMERA LINEA -->

                <div class="row-fluid">
                    <div class="span12" id="tabla" style="display: none;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->


<asp:HiddenField ID="hddTabla" runat="server" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NN/js/NNMAFPE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMAFPE.init();


    });


</script>
