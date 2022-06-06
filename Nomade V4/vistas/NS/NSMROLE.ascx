<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMROLE.ascx.vb" Inherits="vistas_NS_NSMROLE" %>

<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />



<style>
    .informacionOpciones {
        float: right;
        font-size: 12px;
        letter-spacing: -0.2px;
        color: #008C0C;
    }

    div#menuPermisos ul li {
        line-height: 30px;
    }

    div#menuPermisos ul {
        margin: 0 0 0 0;
    }

    div#menuPermisos .nav > li > a:hover {
        background-color: #808080;
        color: white;
    }

    div#menuPermisos {
        width: 100px;
        margin-left: 5px;
        background-color: whitesmoke;
        position: absolute;
        z-index: 1151;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #888;
        box-shadow: 0 0 5px #298ACA;
    }

    legend {
        font-size: 17px;
    }

    div.item {
        padding-bottom: 0px;
        padding-top: 8px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 1px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(64, 128, 187, 0.17);
        margin-left: 0px !important;
    }

    p.item {
        padding-bottom: 8px;
        padding-top: 8px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 1px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(64, 128, 187, 0.17);
    }

    .container {
        overflow-y: scroll;
        max-height: 180px;
    }

    p.item:hover, div.item:hover {
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);
        border-color: rgba(82,168,236,0.8);
    }

    p.selected {
        background: rgb(52, 150, 228);
        color: white;
    }

    .conItems {
        background: #DAE9F5;
         
    }

</style>



<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ROLES</h4>
                <div class="actions">
                    <a href="javascript:imprimirRolCompleto();" class="btn black"><i class="icon-print"></i> Imprimir</a>
                    <a class="btn green" href="?f=nsmrole"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nslrole"><i class="icon-list"></i>Listar</a>
                    
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">

                        <!-- primera linea --->
                        <div id="div1" class="row-fluid">


                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label" for="txtcodigo">Codigo</label>

                                </div>
                            </div>

                            <div class="span2">
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

                            <div class="span2">
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
                                    <label class="control-label" for="txtdescripcion">
                                        Descripción</label>

                                </div>
                            </div>

                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtdescripcion" class="span12" placeholder="Descripción del Rol" type="text" />
                                    </div>
                                </div>
                            </div>


                        </div>

                        <!---fin linea -->

                        <!-- INICIO  LINEA -->
                        <div class="row-fluid" id="div2">

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtareacomentario">
                                        Comentario</label>

                                </div>
                            </div>

                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <textarea id="txtareacomentario" style="height: 100px;" class="span12"></textarea>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="span6">
                                                                     
                            <div id='jqxTree' class="span12"></div>
                        
                          
                    </div>
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>


                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcclase">
                                Clase</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcclase" class="span12" data-placeholder="CLASE">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btnagregaclase" type="button" class="btn blue span6" title="Agregar clase"><i class="icon-plus"></i></button>

                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span12" id="jqxgrid">
                    </div>

                </div>
                &nbsp;

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>


                <div class="row-fluid">
                    <div class="span4" id="divsistemas">

                        <fieldset>
                            <legend>SISTEMAS <span class="informacionOpciones">*Click derecho para ver opciones</span>
                            </legend>

                            <div class="container span12" id="sistlist">

                                <p class="item">example </p>


                            </div>

                        </fieldset>

                    </div>


                    <div class="span4" id="divmodulos">
                        <fieldset>
                            <legend>MODULOS
                                <span class="informacionOpciones">*Click derecho para ver opciones</span>
                            </legend>

                            <div class="container span12" id="modulist">

                                <p class="item">
                                    SELECCIONE SISTEMA...

                                </p>


                            </div>


                        </fieldset>

                    </div>
                    <div class="span4" id="divitems">

                        <fieldset>
                            <legend>

                                <div class="row-fluid">
                                    <div class="span8">ITEMS DE MENU</div>
                                    <div class="span1" align="center">
                                        <i id="colVer" class="icon-search" style="color: rgb(100, 100, 100); line-height: inherit; cursor: pointer;" title="Marcar Todos"></i>

                                    </div>
                                    <div class="span3" align="center">
                                        <i id="colEditar" class="icon-pencil" style="color: rgb(100, 100, 100); line-height: inherit; cursor: pointer;" title="Marcar Todos"></i>

                                    </div>

                                </div>

                            </legend>

                            <div class="container span12" id="itemlist">

                                <div class="row-fluid span12 item">
                                    <div class="span8">SELECCIONE MODULO...</div>
                                    <%-- <div class="span2" align="center"><input type="checkbox"/></div>
                                        <div class="span2" align="center"><input type="checkbox"/></div>--%>
                                </div>



                            </div>




                        </fieldset>
                    </div>

                </div>


                <!---fin linea -->

                <input id="itemscch" type="hidden" value="" />

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>




<script type="text/javascript" src="../vistas/NS/js/NSMROLE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.

        $("#menuPermisos").hide();

        var html_menu = '<div id="menuPermisos" style="display:none">' +
                        '<ul  class="nav" role="menu" aria-labelledby="dropdownMenu">' +
                        '<li class="dropdown" align="center"><a tabindex="-1" id="cambiar" href="javascript:leerTodos();"><i class="icon-search"></i> Leer Todo</a></li>' +
                        '<li class="dropdown" align="center"><a tabindex="-1" id="A1" href="javascript:editarTodos();"><i class="icon-pencil"></i> Editar Todo</a></li>' +
                        '<li class="dropdown" align="center"><a tabindex="-1" id="A1" href="javascript:quitarTodos();"><i class="icon-remove"></i> Quitar Todo</a></li>' +
                        '</ul>' + '</div>';

        $("body").append(html_menu);

        window.onscroll = function () {
            $("#menuPermisos").css("display", "none");
        };
        $(".container").scroll(function () {
            $("#menuPermisos").css("display", "none");
        });

        $(document).click(function (e) { if (e.button == 0) { $("#menuPermisos").css("display", "none"); } });
        $(document).keydown(function (e) { if (e.keyCode == 27) { $("#menuPermisos").css("display", "none"); } });




        NSMROLE.init();

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
