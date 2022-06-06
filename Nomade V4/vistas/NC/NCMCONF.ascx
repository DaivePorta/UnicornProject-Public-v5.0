<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCONF.ascx.vb" Inherits="vistas_NC_NCMCONF" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION REGIONAL</h4>
                <div class="actions">
                    <a href="?f=ncmconf" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclconf" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodConfig" disabled="disabled" class="span12">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 2;" />Activo
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>Nombre</label>
                            </div>
                        </div>
                        <div class="span8">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDescripcion" class="span12" placeholder="Nombre" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>Idioma</label>
                            </div>
                        </div>
                        <div class="span8">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboIdioma" class="span12" data-placeholder="Idioma">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>
                                    País</label>
                            </div>
                        </div>
                        <div class="span8">

                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPais" class="span12" data-placeholder="País">
                                        <option></option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>Moneda</label>
                            </div>
                        </div>
                        <div class="span8">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span6">
                            <div class="span3">
                                <div class="control-group">
                                    <label>
                                        Meridiano GMT</label>
                                </div>
                            </div>
                            <div class="span8">

                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboZonaHoraria" class="span12" data-placeholder="Meridiano GMT">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="span3">
                                <div class="control-group">
                                    <label>
                                        Ubicación Símbolo Moneda</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSimb" class="span12" data-placeholder="Ubicación Símbolo Moneda">
                                            <option></option>
                                            <option value="1">ATRAS</option>
                                            <option value="2">ADELANTE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span6">
                            <div class="span3">
                                <div class="control-group">
                                    <label>Separación decimal</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboDec" class="span8">
                                            <option></option>
                                            <option value="1">,</option>
                                            <option value="2">.</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <a id="grabar" class="btn blue" href="javascript:GrabarConfig();"><i class="icon-ok"></i>Grabar</a>
                        <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<asp:HiddenField ID="hfCodigoUsuario" runat="server" />

<script type="text/javascript" src="../vistas/NC/js/NCMCONF.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMCONF.init();
        
    });
</script>
