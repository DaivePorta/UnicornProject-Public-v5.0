<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRTCA.ascx.vb" Inherits="vistas_NO_NOLRTCA" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE SEGMENTACION PARTICIPACION POR TIPO DE CANAL</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['tblReporteMostrar', 'pie']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                                <select class="span12 empresa" id="cboEmpresa"><option></option></select>
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
                                <select id="slcSgmt" class="span12" data-placeholder="NIVEL"><option></option><option value="C">CANAL</option><option value="SC">SUBCANAL</option><option value="TN">TIPO NEGOCIO</option></select>
                            </div>
                        </div>
                    </div>                

                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div style="padding-left: 7px;" class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">
                                Hasta</label>
                        </div>

                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                   
                     

                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupoProductos">
                                Subgrupo de Productos</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divGrupProd">
                                <select id="cboGrupoProductos" class="span12" data-placeholder="TODOS LOS SUBGRUPOS" multiple="multiple">
                                </select>
                            </div>
                        </div>
                    </div>

                     <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMarcas">
                                Marca</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboMarcas" class="span12" data-placeholder="Marcas">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                     <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProducto">
                                Producto</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="div1">
                                <select id="cboProducto" class="span12" data-placeholder="Producto">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda ">
                                MONEDA</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                     <div class="span2" style="text-align: center">
                        <button class="btn blue" type="button" id="btnFiltrar">FILTRAR</button>
                    </div>

                </div>


                <div class="row-fluid" style="margin-top: 40px;">
                    <div class="span4">
                        <br />
                        <table id="tblReporteMostrar" class="table table-bordered table-hover DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="text-align: center">N</th>
                                    <th>&nbsp;</th>
                                    <th style="text-align: center">MONTO</th>
                                    <th style="text-align: center">%</th>
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

<script type="text/javascript" src="../vistas/NO/js/NOLRTCA.js"></script>
<script>
    jQuery(document).ready(function () {
        NOLRTCA.init();
    });
</script>
