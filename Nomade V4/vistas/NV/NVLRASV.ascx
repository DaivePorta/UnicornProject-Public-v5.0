<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRASV.ascx.vb" Inherits="vistas_NV_NVLRASV" %>
<style>
    #tblDatos, #tblDatosMostrar {
        width: 100%;
        border: 1px solid #cbcbcb;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;REPORTE ANALÍTICO SUBGRUPOS VENDIDOS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divDatosMostrar','divGrafico']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">EMPRESA:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboSucursal">ESTABLECIMIENTO:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboMoneda">MONEDA:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12"></select>
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
                    <div class="span4" style="text-align: center">
                        <button class="btn blue" type="button" id="buscar">FILTRAR</button>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 5px;">
                    <div class="span4">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="max-height: 545px; overflow-x: auto; margin-top: 5px;">
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="span12">
                            <div id="divGrafico">
                                <div id="contenedor" style="min-width: 310px; min-height: 450px; margin: 0 auto;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- INICIO DE LA VENTANA MODAL PARA MOSTRAR LOS DETALLES DE REPORTE-->
<div id="ventanaD" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="left: 30%; width: 80%;" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3 id="labelReporteDetalle">Detalle de Ventas</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">            
            <div class="span12" id="divBuscarDoc_body">
                

                <table id="tbl_ventas_subgrupos" class="display DTTT_selectable" border="0" style="font-size:12px;">
                <thead>
                    <tr>                        
                        <th>CODIGO
                        </th>                        
                        <th>DOCUMENTO
                        </th>
                        <th>FECHA EMISION
                        </th>
                        <th>NRO DOC
                        </th>
                        <th>CLIENTE
                        </th>
                        <th>TOTAL
                        </th>
                        <th>MODO PAGO
                        </th>
                        <th>VENDEDOR
                        </th>
                        <th>ESTADO
                        </th>
                        <th>GLOSA
                        </th>
                    </tr>
                </thead>

            </table>
            </div>
        </div>
    </div>
   
</div>


<script src="../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<script type="text/javascript" src="../vistas/NV/js/NVLRASV.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRASV.init();
    });
</script>
