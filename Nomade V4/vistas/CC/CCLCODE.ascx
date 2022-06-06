<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLCODE.ascx.vb" Inherits="vistas_CC_CCLCODE" %>
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
                <h4><i class="icon-reorder"></i>REPORTE DETALLADO DE CUENTAS POR COBRAR A UNA FECHA DETERMINADA</h4>
                <div class="actions">
                    <%--<a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a class="btn red" href="?f=CCLCODE"><i class="icon-plus"></i>&nbsp;Listar</a>
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
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
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

                <div class="row-fluid" style="margin-bottom: 10px;">               
                    <div class="span2 offset1">
                        <strong>POR COBRAR  (<span id="lblMonedaBase"></span>):</strong>
                    </div>
                    <div class="span2" style="font-size: 16px;">
                        <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase" >-</span>
                    </div>            
                    <div class="span2">
                        <strong>POR COBRAR (<span id="lblMonedaAlterna"></span>):</strong>
                    </div>
                    <div class="span2" style="font-size: 16px;">
                        <span id="lblSimboloMonedaAlterna"></span>&nbsp;<span id="txtTotalMonedaAlterna" >-</span>
                    </div>
                    <div class="span2" style="">
                        <strong>TIPO DE CAMBIO: </strong><span id="valorTipoCambio" style="font-size: 16px;"> </span>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divCuentasPorCobrar">
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

<script type="text/javascript" src="../vistas/CC/js/CCLCODE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCLCODE.init();
    });
</script>