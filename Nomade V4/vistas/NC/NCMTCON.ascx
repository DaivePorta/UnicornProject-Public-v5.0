<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTCON.ascx.vb" Inherits="vistas_NC_NCMTCON" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO DE CONTRIBUYENTE</h4>

                <div class="actions">
                    <a href="?f=ncmtcon" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncltcon" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="span5">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="span5">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoSunat">
                                    Código de Sunat</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoSunat" class="span12" type="text"  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkActivo" type="checkbox" checked="checked" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="chkActivo" >
                                    Activo</label>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span5">
                            <div class="control-group">
                                <label class="control-label" for="txtacronimo">
                                    Acrónimo de la Sociedad</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtacronimo" class="span12" type="text"  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span5">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombre">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNombre" class="span12" type="text" placeholder="Descripción" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="slctipopersona">
                                    Tipo de Persona</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slctipopersona" class="span12" required>
                                    <option value="N">Persona Natural</option>
                                    <option value="J">Persona Juridica</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="?f=ncmtcon"><i class="icon-remove"></i>Cancelar</a>
                </div>
                <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
            </div>
        </div>
       
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMTCON.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTCON.init();
        
    });
</script>
