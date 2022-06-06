<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLEVSG.ascx.vb" Inherits="vistas_NO_NOLEVSG" %>

<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>EVOLUCION DE SEGMENTACION MENSUAL</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['tblReporteMostrar', 'chart']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12 empresa" id="cboEmpresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label span12" for="cboSucursal">Establecimiento</label>
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
                            <label class="control-label span12" for="slcSgmt">Nivel segmentacion</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcSgmt" class="span12" data-placeholder="NIVEL">
                                    <option></option>
                                    <option value="C">CANAL</option>
                                    <option value="SC">SUBCANAL</option>
                                    <option value="TN">TIPO NEGOCIO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtFecha">
                                Año</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div style="padding-left: 7px;" class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="yyyy" id="txtFecha" data-date-format="yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda ">
                                Moneda</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1" style="text-align: center">
                        <button class="btn blue" type="button" id="btnFiltrar">FILTRAR</button>
                    </div>


                </div>


                <div class="row-fluid" style="margin-top: 40px;">
                    <div>
                      
                        <table id="tblReporteMostrar" class="table table-bordered table-hover DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="text-align: center">&nbsp;</th>
                                    <th style="text-align: center">Enero</th>
                                    <th style="text-align: center">Febrero</th>
                                    <th style="text-align: center">Marzo</th>
                                    <th style="text-align: center">Abril</th>
                                    <th style="text-align: center">Mayo</th>
                                    <th style="text-align: center">Junio</th>
                                    <th style="text-align: center">Julio</th>
                                    <th style="text-align: center">Agosto</th>
                                    <th style="text-align: center">Setiembre</th>
                                    <th style="text-align: center">Octubre</th>
                                    <th style="text-align: center">Noviembre</th>
                                    <th style="text-align: center">Diciembre</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                    </div>
                                     
                </div>
                  <br />
                <div class="row-fluid">               
                        <div class="span12">
                            <div id="chart" style="min-height: 500px"></div>
                        </div>                 


                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOLEVSG.js"></script>
<script>
    jQuery(document).ready(function () {
        NOLEVSG.init();
    });
</script>
