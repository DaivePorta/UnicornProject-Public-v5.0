<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALRSPH.ascx.vb" Inherits="vistas_NA_NALRSPH" %>
<style>
    @media print {

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

        #gritter-notice-wrapper {
            display: none !important;
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
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console'  !important;*/
            font-family: Arial !important;
        }

        #tblDocumento, .arial {
            font-family: 'Arial' !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .chat-window {
            display: none;
            margin:0px !important;
        }

    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE STOCK DE PRODUCTOS HISTÓRICO</h4>
                <div class="actions">
                    <%--<a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a class="btn red" href="?f=NALMOVK"><i class="icon-plus"></i>&nbsp;Listar</a>
                    <%--<a id="A4" class="btn purple enviaMail"><i class="icon-envelope"></i>&nbsp Mail</a>--%>
                </div>
            </div>

            <div class="portlet-body">
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
                                <select id="cboEmpresa" class="span10" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblAlmacen" class="control-label" for="cboAlmacen">
                                Almacén</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAlmacen" class="span10" data-placeholder="Almacén">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtDesde">
                                Fecha</label>
                        </div>
                    </div>
                    <div class="span4">

                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                            </div>
                        </div>
                        <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group" style="display:none">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <%--Cargar Tabla--%>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
    </div>

</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<script type="text/javascript" src="../vistas/NA/js/NALRSPH.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALRSPH.init();
    });
</script>
