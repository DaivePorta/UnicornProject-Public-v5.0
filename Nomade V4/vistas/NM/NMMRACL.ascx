<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMRACL.ascx.vb" Inherits="vistas_NM_NMMRACL" %>
    
    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />
 
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;LISTA CLASE DE CLIENTES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NMMRACL"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NMLRACL"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Código</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                            <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="chkactivo">
                                Activo</label>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="chkactivo" type="checkbox" checked />
                                </div>
                            </div>
                        </div>
                         </div>
                        <div class="row-fluid">
                         <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span9" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        </div>
                         <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtLista">
                                        Lista</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtLista" class="span9" type="text" placeholder="Lista" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            
                        </div>

                    </div>
                    <div class="row-fluid">
                    <div class="span12" style="padding: 5px 20px">
                        <div class="tabbable tabbable-custom boxless" style="margin-bottom: 0px">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#ClaseCliente" data-toggle="tab"><i class=""></i>Clases de Cliente</a></li>
                            </ul>
                            <div class="tab-content" style="padding-bottom: 5px">
                                <div class="tab-pane active" id="tarjetas" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtClaseCliente">
                                                    Clase Cliente</label>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboClaseCliente" class="span9" data-placeholder="Clase Cliente">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <button id="btnAgregaClase" type="button" class="btn blue no-display" title="Agregar Clase"><i class="icon-plus"></i></button>
                                                <!--<button id="btnagregarClase" type="button" class="btn blue" title="Agregar Clase" data-tooltip="Agregar Clase" onclick="agregarClaseClientes();"><i class="icon-plus-sign" style="line-height: initial"></i></button>-->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span1"></div>
                                        <div class="span5">
                                            <div id="jqxgrid">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span1">
                                        </div>
                                        <div class="span1">
                                            <button type="button" id="btnEliminarClase" class="btn red no-display" title="Eliminar Registro"><i class="icon-minus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <!--<a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>-->
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar </a>
                    <a id="btnActualizar" class="btn blue" onclick="Actualizar();" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <input type="hidden" id="hfOPTR_CODE" />
        <input type="hidden" id="hfPIDM" />
    </div>
</div>
       
</div>


<!-- FIN DE LA VENTANA MODAL-->
<input id="codigoEliminar" type="hidden" />

<script type="text/javascript" src="../vistas/NM/js/NMMRACL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMRACL.init();
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