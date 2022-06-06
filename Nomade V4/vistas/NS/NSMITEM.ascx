<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMITEM.ascx.vb" Inherits="vistas_NS_NSMITEM" %>

    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />

<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ITEMS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nsmitem"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nslitem"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
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
                <!-- FIN PRIMERA LINEA -->
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span5" for="slcsistema">
                                Sistema</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcsistema" class="span12" data-placeholder="Sistema">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span5" for="slcmodulo">
                                Módulo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcmodulo" class="span12" data-placeholder="Módulo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Nombre</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre" type="text" />
                            </div>
                        </div>
                    </div>
                    <%--<div class="span2">
                        <div class="control-group">
                            <label class="control-label span5" for="slcforma">
                                Forma</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlforma">
                                <select id="slcforma" class="span12" data-placeholder="FORMA">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>--%>
                </div>
                <!---fin linea -->
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtareadescripcion">
                                Descripcion</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtareadescripcion" style="height: 100px;" class="span12"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span5" for="slcforma">
                                Forma</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlforma">
                                <select id="slcforma" class="span12 bloq" data-placeholder="Forma">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <button id="btnAgregaForma" type="button" class="btn blue no-display" title="Agregar Forma"><i class="icon-plus"></i></button>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span7">
                        <div id="jqxgrid">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span1">
                        <button type="button" id="btnEliminarForma" class="btn red no-display" title="Eliminar Registro"><i class="icon-minus"></i></button>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar </a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NS/js/NSMITEM.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMITEM.init();
        
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