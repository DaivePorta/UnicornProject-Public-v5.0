<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRAVC.ascx.vb" Inherits="vistas_NV_NVLRAVC" %>
<style>
    #tblDatos, #tblDatosMostrar {
        width: 100%;
        border: 1px solid #cbcbcb;
    }
    @media print {
        .highcharts-contextmenu {
            display: none;
        }
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;REPORTE ANALÍTICO VENTAS CLIENTES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['divDatos','divGrafico','divGrafico2']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
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
                    <div class="span2 offset1">
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
                    <div class="span1">
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
                    <div class="span1">
                        <div class="control-group ">
                            <label>Años</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAnio" multiple="multiple" class="span12" data-placeholder="Años" style="display: none;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Meses</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMeses" multiple="multiple" class="span12" data-placeholder="Meses" style="display: none;">
                                    <option value="01">ENERO</option>
                                    <option value="02">FEBRERO</option>
                                    <option value="03">MARZO</option>
                                    <option value="04">ABRIL</option>
                                    <option value="05">MAYO</option>
                                    <option value="06">JUNIO</option>
                                    <option value="07">JULIO</option>
                                    <option value="08">AGOSTO</option>
                                    <option value="09">SEPTIEMBRE</option>
                                    <option value="10">OCTUBRE</option>
                                    <option value="11">NOVIEMBRE</option>
                                    <option value="12">DICIEMBRE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid" style="margin-top: 5px;">
                    <div class="span2 offset1" style="text-align: left;">
                        <button class="btn blue" type="button" id="buscar">FILTRAR</button>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 5px;">
                    <div class="span4">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="overflow-x: auto; margin-top: 5px;">
                                <table id="tblReporteMostrar" class="display">
                                    <thead>
                                        <tr>
                                            <th>ORD</th>
                                            <th>CODIGO</th>
                                            <th>CLIENTE</th>
                                            <th>MONTO(<span id="txtMoneSimb"></span>)</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>                                          
                                            <th colspan="2">TOTAL:</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="row-fluid">
                            <div class="span12">
                                <div id="divGrafico" class="span12">
                                    <div id="contenedor" style="min-width: 310px; min-height: 450px; margin: 0 auto;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top:50px">
                    <div class="span12">
                        <div id="divGrafico2" class="span12">
                            <div id="contenedor2" style="min-width: 310px; min-height: 450px; margin: 0 auto;">
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
                

                <table id="tbl_ventas_cliente" class="display DTTT_selectable" border="0" style="font-size:12px;">
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
<script type="text/javascript" src="../vistas/NV/js/NVLRAVC.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRAVC.init();
    });
</script>
