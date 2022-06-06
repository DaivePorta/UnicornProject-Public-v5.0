<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCUCO.ascx.vb" Inherits="vistas_NC_NCMCUCO" %>
<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CLASES CUENTAS CONTABLES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmcuco"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclcuco"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigoClaseCuenta">
                                    Código Clase Cuenta</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtcodigoClaseCuenta" class="span12" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <label class="control-label" for="cboTipoPlan">
                                Tipo Plan</label>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoPlan" class="span12" data-placeholder="Tipo Plan">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <label class="control-label" for="txtClaseCuenta">
                                Clase Cuenta</label>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtClaseCuenta" class="span12" placeholder="Clase Cuenta" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <label class="control-label" for="txtCodigoSunat">
                                Código Sunat</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigoSunat" class="span12" placeholder="Código Sunat" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombreCorto">
                                    Nombre Corto</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombreCorto" class="span12" placeholder="Nombre Corto" />
                                </div>
                            </div>
                        </div>
                        <div class="span8">
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
                <asp:HiddenField ID="hfUsuario" runat="server" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMCUCO.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMCUCO.init();
        
    });
</script>
