<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMTIAS.ascx.vb" Inherits="vistas_CT_CTMTIAS" %>


    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />


<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPOS DE ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CTMTIAS"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=CTLTIAS"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNombre">
                                    Nombre</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNombre" class="span12" type="text"/> <%--autocomplete="off" onkeyup="this.value=solonumbef(this.value)" type="text"--%>
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtMarca">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtMarca" class="span12" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtOrden">
                                    Orden</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtOrden" class="span12" type="text" onkeypress="return ValidaNumeros(event,this)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                <div id="divSubGrupos" class="row-fluid">
                    <fieldset class="span12">
                        <legend>MNEMÓNICO
                        </legend>

                        <div class="row-fluid">
                            <div class="span5">
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboEmpresa">
                                                Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span8">
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
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                                <label class="control-label" for="txtMnemonico">
                                                Mnemónico</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                 <input id="txtMnemonico" class="span12" type="text" autocomplete="off" onkeyup="this.value=sololetras(this.value)"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <button id="addSubGrupo" type="button" class="btn green" onclick="javascript:;"><i class="icon-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div id="jqxgrid" class="span12">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/CT/js/CTMTIAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMTIAS.init();
    });
</script>


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