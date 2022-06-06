<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMGMAR.ascx.vb" Inherits="vistas_NM_NMMGMAR" %>


    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />


<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GESTION DE MARCAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmgmar"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlgmar"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
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
                        <div class="span8">
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
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtMarca">
                                    Marca</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtMarca" class="span12" type="text" autocomplete="off" onkeyup="this.value=solonumbef(this.value)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabarMarca();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                <div id="divSubGrupos" class="row-fluid">
                    <fieldset class="span12">
                        <legend>Sub Grupos
                        </legend>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboEmpresa">
                                                Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span10">
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
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboGrupo">
                                                Grupo</label>
                                        </div>
                                    </div>
                                    <div class="span10">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboGrupo" class="span12" data-placeholder="Grupo">
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
                                            <label class="control-label">
                                                &nbsp;</label>
                                        </div>
                                    </div>
                                    <div class="span10" style="height: 50px;">
                                        <div class="control-group">
                                            <div class="controls" style="height: 30px;">
                                                <input id="chkTodosSubGrupos" type="checkbox" class="span12" /><span>Todos los Sub Grupos</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboSubGrupo">
                                                Sub Grupo</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboSubGrupo" class="span12" data-placeholder="Sub Grupo">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <button id="addSubGrupo" type="button" class="btn green disabled" onclick="javascript:;"><i class="icon-plus"></i></button>
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
<script type="text/javascript" src="../vistas/NM/js/NMMGMAR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMGMAR.init();
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