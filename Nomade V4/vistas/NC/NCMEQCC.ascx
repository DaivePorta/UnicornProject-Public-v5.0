<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEQCC.ascx.vb" Inherits="vistas_NC_NCMEQCC" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Equivalencia de Centro de Costos</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmeqcc"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=ncleqcc"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
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
                                    <div class="span1">
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
                                                <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                                <span>Activo</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboEmpresa">
                                                Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboPlanCostoBase">
                                                Plan Costo Base</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboPlanCostoBase" class="span12" data-placeholder="Plan Costo Base">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <%--<label class="control-label" for="txtCentroCostoBase">--%>
                                            <label class="control-label" for="cboCentroCostoBase">
                                                Centro Costo Base</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input id="txtCentroCostoBase" class="span12" type="text" placeholder="Código" />--%>
                                                <select id="cboCentroCostoBase" class="span12" data-placeholder="Centro Costo Base">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtDescripcionBase" class="span12" type="text" disabled="disabled" />

                                            </div>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboPlanCostoEquivalente">
                                                Plan Costo Equivalente</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboPlanCostoEquivalente" class="span12" data-placeholder="Plan Costo Equivalente">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtCentroCostoEquivalente">
                                                Centro Costo Equivalente</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input id="txtCentroCostoEquivalente" class="span12" type="text" placeholder="Código" />--%>
                                                <select id="cboCentroCostoEquivalente" class="span12" data-placeholder="Centro Costo Equivalente">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtDescripcionEquivalente" class="span12" type="text" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaInicio">
                                                Fecha Inicio</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtFechaInicio" class="span12" data-date-format="dd/mm/yyyy" type="text" placeholder="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaTermino">
                                                Fecha Término</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtFechaTermino" class="span12" data-date-format="dd/mm/yyyy" type="text" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>Grabar</a>
                            <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                        </div>
                        <asp:HiddenField ID="hfUsuario" runat="server" />
                        <input id="hfCentroCostoBase" type="hidden" />
                        <input id="hfCentroCostoEquivalente" type="hidden" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMEQCC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMEQCC.init();
        
    });
</script>
