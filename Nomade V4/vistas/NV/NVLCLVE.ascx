<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLCLVE.ascx.vb" Inherits="vistas_NV_NVLCLVE" %>
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
                <h4><i class="icon-reorder"></i>&nbsp;RANKING CLIENTES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['divDatos','divGrafico','divGrafico2']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>

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
                                <select class="span12" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1 ">
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
                            <label class="control-label span12" for="cboMoneda">Moneda</label>
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
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAnio" multiple="multiple" class="span10" data-placeholder="Años" style="display: none;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Meses</label>
                        </div>
                    </div>
                    <div class="span2">
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
                    <div class="span2">
                        <button class="btn blue" type="button" id="buscar">FILTRAR</button>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="overflow-x: auto">
                                <table id="tblReporteMostrar" class="display">
                                    <thead>
                                        <tr>
                                            <th>ORDEN</th>
                                            <%--<th>CODIGO</th>--%>
                                            <th>CLIENTE</th>
                                            <th>NRO. DE VENTAS</th>
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
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NV/js/NVLCLVE.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLCLVE.init();
    });
</script>
