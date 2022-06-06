<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMIDIO.ascx.vb" Inherits="vistas_NC_NCMIDIO" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>IDIOMAS</h4>

                <div class="actions">
                    <a href="?f=ncmidio" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclidio" class="btn red"><i class="icon-list"></i> Listar</a>
                        
                </div>

            </div>
        
        <div class="portlet-body">
            <div class="row-fluid">
                <div class="span12">
                    <div class="span2"></div>
                    <div class="span2">
                        <label>Código de Idioma</label>
                    </div>
                    <div class="span2">
                        <input id="txtCodigo" type="text" class="span12" disabled="disabled" placeholder="Código Idioma" />
                    </div>
                    <div class="span2">
                        <div style="text-align: center;">
                            <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />Activo
                        </div>
                    </div>
                    <div class="span2"></div>
                </div>
                <div>
                    <div class="row-fluid">
                        <div class="span12">

                            <div class="span2"></div>
                            <div class="span2">
                                <label>Nombre de Idioma</label>
                            </div>
                            <div class="span2">
                                <input id="txtIdioma" type="text" class="span12" placeholder="Nombre Idioma" maxlength="150" />
                            </div>
                            <div class="span2"></div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2"></div>
                        <div class="span2">
                            <label>Nombre Corto</label>
                        </div>
                        <div class="span2">
                            <input id="txtNombreCorto" type="text" class="span12" placeholder="Nombre Corto" maxlength="20" />
                        </div>
                        <div class="span2"></div>
                        <div class="span2"></div>
                        <div class="span2"></div>
                    </div>
                </div>
            </div>

<div class="form-actions">
    <a id="grabar" class="btn blue" href="javascript:GrabarIdioma();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
</div>       
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<script type="text/javascript" src="../vistas/NC/js/NCMIDIO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMIDIO.init();
        
    });
</script>
