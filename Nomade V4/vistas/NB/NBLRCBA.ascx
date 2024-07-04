<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLRCBA.ascx.vb" Inherits="vistas_NB_NBLRCBA" %>

<style>
    a.btn-det > img {
        max-width: 27%;
        padding-left: 14px;
        padding-bottom: 4px;
    }

    a.btn-det {
        font-size: 30px;
        border: solid 2px;
    }

    a.azul {
        background-color: #2678E6;
        border-color: #2878EB;
    }

    a.naranja {
        background-color: #D14624;
        border-color: #D14624;
    }

    a.morado {
        background-color: #A000A7;
        border-color: #A000A7;
    }

    a.verde {
        background-color: #01A300;
        border-color: #01A300;
    }

    tbody {
        /*font-family: calibri;*/
        font-size: 11px;
    }

    p.totales {
        left: 47%;
        position: absolute;
        font-weight: 600;
        transform: translateX(-50%);
    }

    @media print {
        .modal, .modal-backdrop {
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
            margin: 0px !important;
        }
    }
</style>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />


<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE CUENTAS BANCARIAS</h4>
                <div class="actions">
                    <a class="btn green" onclick="javascript:NuevaVenta();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
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
                                <select id="cboEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
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
                                <select id="cboEstablecimiento" class="span12 estable"  data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
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
                        <div class="control-group">
                            <label id="ctaBancaria" class="control-label" for="cboCtaBancaria">
                                Cta. Bancaria</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboCtaBancaria" class="span12 cuenta"  data-placeholder="CUENTA BANCARIA"><option></option></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid"> 
                     <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCajero">
                                Cajero</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboCajero" class="span12 cajero" data-placeholder="TODOS"><option></option></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="moneda" class="control-label" for="cboMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboMoneda" class="span12 moneda"  data-placeholder="MONEDA" disabled="disabled"><option></option></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label id="detallado" class="control-label" for="txtDetallado" style="text-align: center;">Detallado</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <input type="checkbox" id="chkDespachoVenta" name="chkDespachoVenta" />
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group span1">
                                <div class="controls">
                                    <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <%--<th></th>--%>
                                   <%-- <th>CODIGO</th>--%>
                                    <th>ESTABLECIMIENTO</th>
                                    <th>CUENTA BANCARIA</th>
                                    <th>FECHA<br />
                                        OPERACIÓN</th>
                                    <%--<th>TIPO<br />
                                        OPERACIÓN</th>
                                    <th>CUENTA</th>--%>
                                    <th>CENTRO DE COSTO</th>
                                    <th>COMPROBANTE<br />
                                        DE PAGO</th>
                                    <th>ORDEN DE <br />
                                        SERVICIO</th>
                                    <th>GLOSA</th>
                                    <th>CAJERO</th>
                                    <th>NRO. DE<br />
                                        OPERACIÓN</th>
                                    <%--<th>CHEQUE</th>--%>
                                    <th>INGRESOS</th>
                                    <th>EGRESOS</th>
                                    <th>SALDO</th>
                                    <th>TIPO DE CAMBIO</th>
                                    <th>RAZÓN SOCIAL</th>
                                    <%--<th>ESTADO</th>--%>
                                   <%-- <th>#</th>--%>
                                </tr>
                            </thead>
                        </table>
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
        <input type="hidden" id="hfUltimo" />
        <input type="hidden" id="hfPrimero" />
    </div>

</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBLRCBA.js?<%=aleatorio%>"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLRCBA.init();
    });
</script>
