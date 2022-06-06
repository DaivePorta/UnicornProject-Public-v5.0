<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCTAS.ascx.vb" Inherits="vistas_NC_NCMCTAS" %>
<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>


   <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
   <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmctas"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclctas"><i class="icon-list"></i> Listar</a>
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
                                            <label class="control-label" for="chkEstado">
                                                Estado</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtPlanContable">
                                                Plan Contable</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtPlanContable" class="span12" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtCodigo">
                                                Código</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="row-fluid">
                                            <div class="span8">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigo" class="span12" type="text" placeholder="Código" maxlength="50" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNivel">
                                                        Nivel</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNivel" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtDescripcion">
                                                Descripción</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtDescripcion" class="span12" type="text" placeholder="Descripción" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaInicio">
                                                Fecha Inicio</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtFechaInicio" class="span12" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="chkCentroCosto">
                                                        Centro Costo</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="chkCentroCosto" type="checkbox" class="span12" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaTermino">
                                                Fecha Termino</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtFechaTermino" class="span12" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <%--<label class="control-label" for="chkDestino">
                                                        Destino</label>--%>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <%--<div class="controls">
                                                        <input id="chkDestino" type="checkbox" class="span12" />
                                                    </div>--%>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkEntradaDatos">
                                                Entrada de Datos</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="chkEntradaDatos" type="checkbox" class="span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboDiferenciaCambio">
                                                Diferencia de Cambio</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboDiferenciaCambio" class="span8" data-placeholder="Diferencia Cambio">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkMonetario">
                                                Monetario</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="chkMonetario" type="checkbox" class="span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid hidden" id="divAFE">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboActividadFlujoEfectivo">
                                                Actividad Flujo de Efectivo</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboActividadFlujoEfectivo" class="span8" data-placeholder="Actividad Flujo Efectivo">
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
                                            <label class="control-label">
                                            </label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label">
                                            </label>
                                        </div>
                                    </div>
                                    <div class="span9" style="min-height: 50px;">
                                        <div class="control-group">
                                            <div class="controls">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtTipoPlan">
                                                Tipo Plan</label>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtTipoPlan" class="span12" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cboClaseCuenta">
                                                Clase Cuenta</label>
                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigoSunat" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span8">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboClaseCuenta" class="span10" data-placeholder="Clase Cuenta">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <span id="addrowprop" class="btn green no-display"><i class="icon-plus"></i></span>
                                        <span id="delrowprop" class="btn red no-display"><i class="icon-minus"></i></span>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div id="jqxgrid" class="span12">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
                <asp:HiddenField ID="hfUsuario" runat="server" />
                <input id="hfCodigo_Plan_Contable" type="hidden" />
                <input id="hfCodigo_Tipo_Plan" type="hidden" />
                <input id="hfNiveles" type="hidden" />
                <input id="hfNivel1" type="hidden" />
                <input id="hfNivel2" type="hidden" />
                <input id="hfNivel3" type="hidden" />
                <input id="hfNivel4" type="hidden" />
                <input id="hfNivel5" type="hidden" />
                <input id="hfNivel6" type="hidden" />
                <input id="hfNivel7" type="hidden" />
                <input id="hfNivel8" type="hidden" />

                <input id="hfNivelActual" type="hidden" />
                <input id="hfCodigo_ClaseCuenta" type="hidden" />

                <input id="hfJsonJqxGrid" type="hidden" />
            </div>
        </div>
    </div>
</div>




 <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxexpander.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxvalidator.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.pager.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.selection.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxnumberinput.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxwindow.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxinput.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdatatable.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcheckbox.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxpanel.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxtree.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxprogressbar.js"></script> 
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.sort.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.filter.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.columnsresize.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.edit.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/globalization/globalize.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcombobox.js"></script>
    <script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxpanel.js"></script>


<script type="text/javascript" src="../vistas/NC/js/NCMCTAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMCTAS.init();
        
    });
</script>
