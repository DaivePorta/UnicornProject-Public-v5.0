<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRAMC.ascx.vb" Inherits="vistas_NO_NOLRAMC" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE ANALITICO DE MARCAS COMPRADAS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['tblReporteMostrar', 'pie']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                    <div class="span4">
                        <br />
                        <table id="tblReporteMostrar" class="table table-bordered table-hover" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N</th>
                                    <th>MARCA</th>
                                    <th style="text-align: center">MONTO</th>
                                    <th style="text-align: center">%</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <table id="tblReporte" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th>MARCA</th>
                                    <th style="text-align: center">MONTO</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="span8">
                        <div class="span12">
                            <div id="pie" style="min-height: 500px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOLRAMC.js"></script>
<script>
    jQuery(document).ready(function () {
        NOLRAMC.init();
    });
</script>