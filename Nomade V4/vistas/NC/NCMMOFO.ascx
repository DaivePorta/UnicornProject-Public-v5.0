<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMMOFO.ascx.vb" Inherits="vistas_NC_NCMMOFO" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MODALIDADES FORMATIVAS</h4>

                <div class="actions">
                    <a href="?f=ncmmofo" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclmofo" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body" id="ventana">
                <div class="row fluid">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span2">
                            <label>Código:</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodigo" class=" span12" disabled="disabled" placeholder="Código">
                        </div>
                        <div class="span2">
                            <label>Código Sunat</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodSunat" class="span12" placeholder="Código Sunat" maxlength="4" />
                        </div>
                        <div class="span2">
                            <div style="text-align: center;">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 0;" />Activo
                            </div>
                        </div>

                    </div>

                </div>

                <div class="row fluid">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span2">
                            <label>Modalidades Formativas:</label>
                        </div>
                        <div class="span4">
                            <input type="text" id="txtDescripcion" class=" span12" placeholder="Descripción" />
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span1">
                        </div>
                    </div>
                </div>
                <div class="row fluid">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span1">
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarMofo();"><i class="icon-save"></i>Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<script type="text/javascript" src="../../vistas/NC/JS/NCMMOFO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMMOFO.init();

    });
</script>
