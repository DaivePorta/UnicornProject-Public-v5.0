<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NELREGG.ascx.vb" Inherits="vistas_NE_NELREGG" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/date.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>

<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.css" />
<style>
    #tbl_aprob_gastos {
        font-size: 11px;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE EGRESOS GENERALES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['tblReporteMostrar','chart', 'pie']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                                <select class="span12 empresa" id="cboEmpresa"></select>
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
                            <label class="control-label" for="txt_centro_costo">
                                CENTRO DE COSTO</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="span7">
                                <input type="text" id="txt_centro_costo" class=" limpiar m-wrap span12 centroCostos" disabled="disabled" />
                            </div>
                            <div class="span1">
                                <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>

                            </div>

                            <%--                                    <div class="controls" id="input_2">
                                        <input type="text" id="txt_centro_costo" class="limpiar span12 m-wrap">
                                        <input type="hidden" id="hfCECC_CODE" />
                                        <input type="hidden" id="hfCENTRO_COSTOS" />
                                     </div>--%>
                        </div>
                    </div>


                </div>
                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span4">
                        <button class="btn blue" type="button" id="btnFiltrar">FILTRAR</button>
                    </div>
                </div>


                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span5">
                        <br />
                        <div class="alert alert-info">
                            <button class="close" data-dismiss="alert"></button>
                            <strong>Info!</strong> Click sobre un Concepto de la para ver detalle.
                        </div>
                        <table id="tblReporteMostrar" class="table table-bordered table-hover" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N°</th>
                                    <th style="text-align: center">Concepto</th>
                                    <th style="text-align: center">Monto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                        <table id="tblReporte" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N°</th>
                                    <th style="text-align: center">Concepto</th>
                                    <th style="text-align: center">Monto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                        <table id="tblReporte1" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th style="text-align: center">Concepto</th>
                                    <th style="text-align: center">Monto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                    </div>
                    <div class="span7">
                        <div class="span12">
                            <div id="pie" style="min-height: 550px"></div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span12">
                            <div id="chart" style="min-height: 550px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- INICIO DE LA VENTANA MODAL PARA MOSTRAR LOS DETALLES DE REPORTE-->
<div id="ventanaD" style="width: 950px; left: 40%" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3 id="labelReporteDetalle">Detalle de Egresos</h3>
    </div>
    <div class="modal-body">
        <div class="span12">
            <div class="alert alert-info">
                <button class="close" data-dismiss="alert"></button>
                <strong>Info!</strong> Doble Click en un gasto de la tabla para ver datos.
            </div>

            <table id="tbl_aprob_gastos" class="display DTTT_selectable" border="0" style="display: none;">
                <thead>
                    <tr>
                        <%--<th style="display: none;">CODIGO
                        </th>--%>
                        <th>CODIGO
                        </th>
                        <th>GASTO
                        </th>
                        <th>BENEFICIARIO
                        </th>
                        <th>MONEDA
                        </th>
                        <th>MONTO
                        </th>
                        <th>EMISION
                        </th>
                        <th>COMPROBANTE
                        </th>
                        <th>NUMERO
                        </th>
                        <th>SOLICITA
                        </th>
                    </tr>
                </thead>

            </table>

        </div>
    </div>

</div>
<!-- FIN DE LA VENTANA MODAL DE DETALLE-->

<script type="text/javascript" src="../vistas/NE/js/NELREGG.js"></script>
<script>
    jQuery(document).ready(function () {
        NELREGG.init();
    });
</script>
