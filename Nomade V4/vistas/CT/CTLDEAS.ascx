<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLDEAS.ascx.vb" Inherits="vistas_CT_CTLDEAS" %>
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
                <h4><i class="icon-reorder"></i>DETALLE DE ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <%--<a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                                <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    
                        <div class="span4">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>
                    
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

<script type="text/javascript" src="../vistas/CT/js/CTLDEAS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLDEAS.init();
    });
</script>
