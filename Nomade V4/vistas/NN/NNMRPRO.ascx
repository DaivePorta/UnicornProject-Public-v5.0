<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMRPRO.ascx.vb" Inherits="vistas_NN_NNMRPRO" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPROCESAR MARCACIONES BIOMETRICO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NNMRPRO" style="margin-top: -10px;"><i class="icon-plus"></i>&nbsp;Nuevo</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">
                    <div class="alert alert-error" id="msg" style="font-size :large ; display:none ">
								
								</div>
                </div>
                <div class="row-fluid">
                    <div class="span3"></div>
                    <div class="span3 ">
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
                    <!--/span-->

                    <!--/span-->
                </div>
                <div class="row-fluid">
                    <div class="span3"></div>
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo m-wrap span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Fecha</label>
                            <div class="controls">
                                <input type="text" id="txt_fecha" class="span8" data-date-format="dd/mm/yyyy">
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <a class="btn purple" id="btn_filtrar" style="margin-top: 25px;">REEPROCESAR&nbsp;<i class="icon-cogs"></i></a>
                    </div>
                    <!--/span-->
                </div>

                <%--<div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>--%>
            </div>

        </div>

    </div>
</div>
<script type="text/javascript" src="../vistas/NN/js/NNMRPRO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMRPRO.init();


    });


</script>
