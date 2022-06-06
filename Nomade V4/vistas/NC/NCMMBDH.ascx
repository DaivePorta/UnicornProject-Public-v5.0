<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMMBDH.ascx.vb" Inherits="vistas_NC_NCMMBDH" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MOTIVO DE BAJA DE DERECHO HABIENTE</h4>

                <div class="actions">
                    <a href="?f=ncmmbdh" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclmbdh" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body" id="ventana">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2"></div>
                        <div class="span2">
                            <label>Código</label>
                        </div>
                        <div class="span2">
                            <input id="txtCodigo" type="text" class="span12" disabled="disabled" placeholder="Código" />
                        </div>
                        <div class="span2">
                            <div style="text-align: center;">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />Activo
                            </div>
                        </div>
                        <div class="span2"></div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">

                        <div class="span2"></div>
                        <div class="span2">
                            <label>Código Sunat</label>
                        </div>
                        <div class="span2">
                            <input id="txtCodSunat" type="text" class="span12" placeholder="Código Sunat" maxlength="150" />
                        </div>
                        <div class="span2"></div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2"></div>
                        <div class="span2">
                            <label>Descripción</label>
                        </div>
                        <div class="span4">
                            <input id="txtDescripcion" type="text" class="span12" placeholder="descripción" maxlength="20" />
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2"></div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboVincFam">Vinculo DH.</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboVincFam" class="span12" data-placeholder=" Seleccione Vínculo">
                                    </select>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarMotBaj();"><i class="icon-save"></i>Grabar</a>
                    <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<script type="text/javascript" src="../vistas/NC/js/NCMMBDH.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMMBDH.init();

    });
</script>
