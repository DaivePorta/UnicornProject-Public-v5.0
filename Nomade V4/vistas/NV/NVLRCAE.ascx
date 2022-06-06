<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRCAE.ascx.vb" Inherits="vistas_NV_NVLRCAE" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
<style>
    #tblDatos, #tblDatosMostrar {
        width: 100%;
        border: 1px solid #cbcbcb;
    }

    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }

    .multiselect-container.dropdown-menu {
        width: auto;
        padding-right: 9px;
        max-height: 350px;
        overflow-y: auto;
    }

     @media (max-width:767px){ 
         .multiselect-container.dropdown-menu {
            width:98%;
        }
        .multiselect-container.dropdown-menu label {
            white-space: normal !important;
        }
    }
</style>
<style>
    .util, .prec {
        max-width: 100px;
        min-width: 20px;
    }

    @media print {

        #nomProd {
            min-width: 350px;
        }

        .util, .prec {
            border: none !important;
            outline: none !important;
            border-color: white;
            outline-color: white;
            text-align: right;
            font-size: 12px !important;
            line-height: 12px !important;
        }

        th {
            font-size: 11px !important;
        }

        tbody > td {
            border-bottom: 1px solid gray;
            padding: 0px 2px 0px 2px !important;
        }

        #gritter-notice-wrapper,
        .navbar-inner ,
        .page-sidebar ,
        .footer {
            /*display: none !important;*/
        }

        .page-content {
            margin-left: 0px !important;
        }

        /*#ventana parent {*/
        #contenedor,
        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            /*display: none !important;*/
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

    .colorColumna {
        background-color: #f2eded !important;
        text-align: center !important;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>&nbsp;ANALÍTICO COMPARATIVO VENDEDORES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divDatosMostrar','divGrafico']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear:both"></div>
            </div>

            <div class="portlet-body" id="ventana">
                <!-- BLOQUE FILTROS-->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboSucursal">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" style="text-align: right" for="txtAnio">AÑO:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span8" id="txtAnio" style="text-align: center" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Vendedores</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboVendedor" multiple="multiple" class="span12" data-placeholder="Vendedores" style="display: none;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="input_moneda">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="chboAvanzado">Incluye IGV</label>
                                </div>
                            </div>

                     <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="danger-toggle-button-custom">
                                            <input id="chboAvanzado" type="checkbox" class="toggle" data-valactual=false />
                                        </div>
                                    </div>
                                </div>
                     </div>
                    <div class="span2">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- BLOQUE DATOS - GRAFICO-->
                <div class="row-fluid">
                    <div class="span3">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="overflow-x: auto; margin-top: 5px;">
                            </div>
                        </div>
                    </div>
                    <div class="span9">
                        <div id="divGrafico">
                            <div id="contenedor" style="min-width: 310px; min-height: 500px; margin: 0 auto;"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->

<script src="../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NV/js/NVLRCAE.js"></script>


<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLRCAE.init();
    });
</script>
