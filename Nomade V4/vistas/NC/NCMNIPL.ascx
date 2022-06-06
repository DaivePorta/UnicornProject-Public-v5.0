<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMNIPL.ascx.vb" Inherits="vistas_NC_NCMNIPL" %>

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
                <h4><i class="icon-reorder"></i>ESTRUCTURA DE PLAN CONTABLE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmnipl"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclnipl"><i class="icon-list"></i> Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="chkEstado">
                                    Activo</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span4">
                                <div class="span10" style="text-align: center">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNiveles">
                                            Niveles
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="span12">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNiveles" class="span10" data-placeholder="Niveles">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel1">
                                            Nivel 1</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel1" class="span12" disabled="disabled" data-placeholder="Nivel 1" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel2">
                                            Nivel 2</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel2" class="span12" disabled="disabled" data-placeholder="Nivel 2" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoPlanCuenta">
                                    Tipo de Plan Cuenta</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoPlanCuenta" class="span12" data-placeholder="Tipo Plan Cuenta">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel3">
                                            Nivel 3</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel3" class="span12" disabled="disabled" data-placeholder="Nivel 3" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel4">
                                            Nivel 4</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel4" class="span12" disabled="disabled" data-placeholder="Nivel 4" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombrePlanCuentas">
                                    Nombre Plan Cuentas</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNombrePlanCuentas" class="span12" type="text" placeholder="Nombre Plan Cuentas" maxlength="120" />
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel5">
                                            Nivel 5</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel5" class="span12" disabled="disabled" data-placeholder="Nivel 5" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel6">
                                            Nivel 6</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel6" class="span12" disabled="disabled" data-placeholder="Nivel 6" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaInicio">
                                    Fecha de Inicio</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFechaInicio" data-date-format="dd/mm/yyyy" class="span12" type="text" placeholder="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaTermino">
                                        Fecha de Término</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFechaTermino" data-date-format="dd/mm/yyyy" class="span12" type="text"  disabled="disabled" placeholder="dd/mm/yyyy"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel7">
                                            Nivel 7</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel7" class="span12" disabled="disabled" data-placeholder="Nivel 7" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboNivel8">
                                            Nivel 8</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboNivel8" class="span12" disabled="disabled" data-placeholder="Nivel 8" onchange="GenerarFormatoNiveles();">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span9">
                        <div class="span7">
                        </div>
                        <div class="span5">
                            <h5 id="GeneradorHtml" align="center"></h5>
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
<script type="text/javascript" src="../vistas/NC/js/NCMNIPL.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMNIPL.init();
        
    });
</script>
