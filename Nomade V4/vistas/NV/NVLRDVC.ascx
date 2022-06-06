<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRDVC.ascx.vb" Inherits="vistas_NV_NVLRDVC" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/date.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.js"></script> 

<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.css" />
<style>
    .multiselect-container.dropdown-menu label {
            white-space: normal !important;
        }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DISPERSIÓN DE VENTAS CRONOLOGICAMENTE</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['tblReporteMostrar','chart', 'pie']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear:both"></div>
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
                                <select id="cboSucursal" class="span12" data-placeholder="ESTABLECIMIENTO"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="txtrango">RANGO:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                 <div id="form-date-range" class="btn">
                                    <i class="icon-calendar"></i>
                                    &nbsp;<span></span> 
                                    <b class="caret"></b>
                                 </div>
                              </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" style="" for="cboGrupos">GRUPOS:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboGrupos" multiple></select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="txtrango">DÍAS:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                                <select class="span12" id="cboDias" multiple>
                                    <option value="0">LUNES</option>
                                    <option value="1">MARTES</option>
                                    <option value="2">MIERCOLES</option>
                                    <option value="3">JUEVES</option>
                                    <option value="4">VIERNES</option>
                                    <option value="5">SABADO</option>
                                    <option value="6">DOMINGO</option>
                                </select>
                            </div>
                    </div>
                    <div class="span1">
                        <button class="btn blue" type="button" id="btnFiltrar">FILTRAR</button>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboRangoHora">RANGO HORARIO:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboRangoHora" class="span12" data-placeholder="RANGO HORARIO">
                                    <option value="HE">POR HORAS ENTERAS</option>
                                    <option value="MH">POR MEDIAS HORAS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span3"></div>
                    <div class="span6">
                        <br />
                        <table id="tblReporteMostrar" class="table table-bordered table-hover" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N° Hora</th>
                                    <th style="text-align: center">Rango Horas</th>
                                    <th style="text-align: center">N° Ventas</th>
                                    <th style="text-align: center">Monto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                        <table id="tblReporte" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N° Hora</th>
                                    <th style="text-align: center">Rango Horas</th>
                                    <th style="text-align: center">Monto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <table id="tblReporte1" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N° Hora</th>
                                    <th style="text-align: center">Rango Horas</th>
                                    <th style="text-align: center">N° Ventas</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span12">
                            <div id="chart" style="min-height: 550px"></div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span12">
                        <div id="pie" style="min-height: 450px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NV/js/NVLRDVC.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRDVC.init();
    });
</script>
