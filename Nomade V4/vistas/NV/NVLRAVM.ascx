<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRAVM.ascx.vb" Inherits="vistas_NV_NVLRAVM" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE ANALÍTICO DE VENTAS MENSUALES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['tblReporteMostrar','chart', 'pie']);" ><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                            <label class="control-label span12" for="cboMon">MONEDA:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMon" class="span12"></select>
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
                        <button class="btn blue" type="button" id="btnFiltrar">FILTRAR</button>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span4" id="divDatos">
                        <table id="tblReporteMostrar" class="table table-bordered table-hover" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N</th>
                                    <th>MES</th>
                                    <th style="text-align: center">TOTAL</th>
                                    
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <table id="tblReporte" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">MES</th>
                                    <th style="text-align: center">TOTAL</th>                                    
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="span8">
                        <div class="span12">
                            <div id="chart" style="min-height: 500px"></div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span12">
                        <div id="pie" style="min-height: 500px"></div>
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
                <table id="tbl_ventas_mes" class="display DTTT_selectable" border="0" style="font-size:12px;">
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



<script type="text/javascript" src="../vistas/NV/js/NVLRAVM.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRAVM.init();
    });
</script>
