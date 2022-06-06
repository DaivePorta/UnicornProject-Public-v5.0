<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLPREC.ascx.vb" Inherits="vistas_NV_NVLPREC" %>
 <link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />

<style>
    .util, .prec {
        max-width: 50px;
        min-width: 20px;
    }

    td, th {
        padding-left: 1px !important;
        padding-right: 1px !important;
    }

    .colorColumna {
        background-color: #f2eded !important;
        text-align: center !important;
    }

    .noColorColumna {
        text-align: center !important;
    }

    @media print {

        .util, .prec {
            border: none !important;
            outline: none !important;
            border-color: white;
            outline-color: white;
            max-width: 60px;
            width: 100%;
            font-size: 12px !important;
            line-height: 12px !important;
        }

        tbody > td {
            border: 1px solid gray;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 11px !important;
            line-height: 11px !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .dn, .btn, #bloqueInfo {
            display: none !important;
        }
    }
</style>
<style>
    .fondoHeader {
        background-color: white;
        text-align: center;
        color: black;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }

    .hover {
        cursor: pointer;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;LISTADO DE PRECIOS CANTIDAD</h4>
                <div class="actions">
                    <a class="btn black" style="margin-top: -10px" onclick="javascript:ImprimirPrecios();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=nvmprec"><i class="icon-list"></i>&nbsp;Configurar Precios</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12" style="margin-left: 0">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboSucursal">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Establecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupo">Grupo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboGrupo" name="cboGrupo" class="m-wrap span12 required" data-placeholder="Seleccionar Grupo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbosubgrupo">SubGrupo</label>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="row-fluid">                            
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls" id="divCboSubgrupo">
                                        <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                   
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbomarca">Marca</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="divCboMarca">
                                <select id="cbomarca" name="cbomarca" class="m-wrap span12 required" data-placeholder="Seleccionar Marca" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                </div>

                
         

                <div class="row-fluid" id="divPrecios">                    
                    <div class="row-fluid" id="divTblPrecios">

                    </div>

                    <%--<div class="row-fluid">
                        <div class="span6 offset6">
                            <div class="control-group span12">
                                <div class="controls">
                                    <a class="btn black" onclick="javascript:ImprimirListaPrecios();">&nbsp;Imprimir Lista Precios</a>
                                    <a id="btnCalcularTodo" class="btn green" title="Calcular todos los precios basado en Costo Promedio">Calcular Precios(C)</a>
                                    <a id="btnCalcularTodo2" class="btn red" title="Calcular todos los precios basado en Precio Última Compra">Calcular Precios(P)</a>
                                    <span id="msgCalcular" style="font-style: italic;"></span>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                </div>                



            </div>
        </div>
    </div>
</div>



<input id="hfNeto" type="hidden" value="0" />
<input id="hfValorizado" type="hidden" value="0" />
<input id="hfUltimaCompra" type="hidden" value="0" />

<div id="divDctoImprimir" style="display: none;">
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NV/js/NVMPREC.js"></script>

<script>
    jQuery(document).ready(function () {
        NVLPREC.init();
    });
</script>
