<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMZONH.ascx.vb" Inherits="vistas_NC_NCMZONH" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ZONA HORARIA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmzonh"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclzonh"><i class="icon-list"></i> Listar</a>
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
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtIndex">Index</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtIndex" class="span12" type="text"  />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
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
                                <input id="chkEstado" type="checkbox" value="A" checked />
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
                            <label class="control-label" for="txtNomZonaH">
                                Zona Horaria</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNomZonaH" class="span12" placeholder="Zona Horaria" type="text" />
                               
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtTiempo">
                                Tiempo</label>

                        </div>
                    </div>


                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtTiempo" class="span12" placeholder="Tiempo" maxlength="11"  type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin sgda linea -->

                <!---inicio tercera-->

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                descripción</label>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtDescripcion" class="span12" placeholder="Descripción"  type="text" maxlength="150" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Hora</label>

                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtHora" class="span12" placeholder="00:00" maxlength="5"  type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span5">
                    </div>

                </div>

                <!-- FIN TERCERA LINEA -->

                <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarZonaH();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMZONH.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMZONH.init();
        
    });
</script>
