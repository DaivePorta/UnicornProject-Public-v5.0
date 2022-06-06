<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMESCC.ascx.vb" Inherits="vistas_NC_NCMESCC" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Estructura de Centro de Costos</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmescc"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nclescc"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" >
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Código</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkEstado">
                                &nbsp;</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaInicio">
                                Fecha Inicio</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaInicio" class="span12" type="text" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaTermino">
                                Fecha Término</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaTermino" class="span12" type="text" data-date-format="dd/mm/yyyy" disabled="disabled" /> <%--data-date-format="dd/mm/yyyy"--%>
                            </div>
                        </div>
                    </div>
                </div>

             
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNombrePlan">
                                Nombre Plan</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNombrePlan" class="span12" placeholder="Nombre Plan" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNombrePlan">
                                Niveles</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                              
                                <input id="txtNroNiveles" class="span12" placeholder="Numero Niveles" type="text" maxlength="1"/>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <button type="button" id="btnGenerar" class="btn tooltips blue" data-toggle="modal" data-original-title="Generar Digitos por Nivel"><i class="icon-ok-sign" style="line-height: initial"></i></button>
                    </div>
                </div>
                <div class="row-fluid">

                 
                   
                    <div id="dvDigNiv"  class="span12">
                    </div>
                </div>
             
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabacion();"><i class="icon-save"></i>&nbsp Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>

                <asp:HiddenField ID="hfUsuario" runat="server" />
                <asp:HiddenField ID="hfCtlgSeleccionado" runat="server" />
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMESCC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMESCC.init();

    });
</script>
