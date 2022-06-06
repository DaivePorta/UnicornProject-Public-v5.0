<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMZONA.ascx.vb" Inherits="vistas_NC_NCMZONA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ZONA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmzona"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclzona"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtCodigo">Código</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtCodSunat">Código Sunat</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodSunat" class="span12" type="text" maxlength="4" />
                            </div>
                        </div>
                    </div>



                    <div class="span5">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNomZona">
                                Nombre del Tipo</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNomZona" class="span12" placeholder="Nombre de la Zona"  type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>


                    <div class="span6">
                    </div>

                </div>

                <!---fin sgda linea -->

                <!---inicio tercera-->

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNomCorto">
                                Nombre Corto</label>

                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtNomCorto" class="span12" placeholder=""   type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkEstado">
                                Activo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" checked />
                            </div>
                        </div>
                    </div>

                    <div class="span5">
                    </div>

                </div>
                <!-- FIN TERCERA LINEA -->

                <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarZona();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMZONA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMZONA.init();
        
    });
</script>


