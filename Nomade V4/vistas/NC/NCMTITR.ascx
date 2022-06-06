<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTITR.ascx.vb" Inherits="vistas_NC_NCMTITR" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO TRABAJADOR</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmtitr"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=ncltitr"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Código</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" maxlength="4" />
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
                                <input id="txtCodSunat" class="span12" type="text" maxlength="6" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div style="text-align: center;">
                            <input id="Checkbox1" type="checkbox" name="activo" checked="checked" value="A" />Activo
                        </div>
                    </div>

                    <div class="span3">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtTipTra">
                                Nombre del Tipo</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtTipTra" class="span12" placeholder="descripción del tipo de trabajador"  type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>


                    <div class="span6">
                    </div>

                </div>

                <!---fin sgda linea -->

                <!---inicio tercera-->

                <div class="row-fluid">
                    <div class="span1">
                    </div>
                    <div class="span5">
                    </div>

                </div>
                <!-- FIN TERCERA LINEA -->


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarTipT();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>

                </div>
                <asp:HiddenField ID="hfCodigoUsuario" runat="server" />

            </div>
        </div>
    </div>

    <script type="text/javascript" src="../../vistas/NC/JS/NCMTITR.js"></script>
    <script>

        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
            NCMTITR.init();
            
        });
    </script>
