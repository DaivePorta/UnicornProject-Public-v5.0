<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMVINC.ascx.vb" Inherits="vistas_NC_NCMVINC" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>VINCULOS FAMILIARES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmvinc"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclvinc"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">


                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">
                                Código</label>

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

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkEstado">
                                Activo</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodSunat">
                                Código Sunat</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodSunat" class="span12" placeholder="Código de Sunat"  type="text" maxlength="2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>
                        </div>
                    </div>


                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtDescripcion" class="span12" placeholder="Descripción"  type="text"  />
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>

                </div>
                 <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cbo_sexo">
                                Género</label>
                        </div>
                    </div>


                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                              <select id="cbo_sexo" class="span5">
                                
                                  <option value="A">MASCULINO Y FEMENINO</option>
                                    <option value="M">MASCULINO</option>
                                  <option value="F">FEMENINO</option>
                              </select>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>

                </div>
                <div class="row-fluid">

                    <div class="span6">
                    </div>

                </div>


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarVinculacion();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <asp:HiddenField runat="server" ID="hfCodigoUsuario" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMVINC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMVINC.init();
        
    });
</script>
