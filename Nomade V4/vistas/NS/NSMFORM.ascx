<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMFORM.ascx.vb" Inherits="vistas_NS_NSMFORM"%>

<link rel="stylesheet" href="../../recursos/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css" />

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Formas</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nsmform"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nslform"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodigo">
                                        Código</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCodigo" class="span12" type="text" placeholder="Código" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtDescripcion">
                                        Descripción</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtDescripcion" class="span12" type="text" placeholder="Descripción" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboSistema">
                                        Sistema</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSistema" class="span12" data-placeholder="Sistema">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                                    <label class="control-label" for="txtayuda">
                                        Ayuda</label>
                            </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtayuda" class="m-wrap wysihtml5 span12" cols="6" rows="6" placeholder="Ingrese texto que sea de ayuda para el usuario..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>



<asp:HiddenField ID="hfUsuario" runat="server" />

<script src="../../recursos/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js" type="text/javascript"></script>
<script src="../../recursos/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js" type="text/javascript"></script>
<script type="text/javascript" src="../vistas/NS/js/NSMFORM.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMFORM.init();
        $('.wysihtml5').wysihtml5({
            "stylesheets":false
        });
    });
</script>
