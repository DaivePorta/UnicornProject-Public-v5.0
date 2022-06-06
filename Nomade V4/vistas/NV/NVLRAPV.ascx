<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRAPV.ascx.vb" Inherits="vistas_NV_NVLRAPV" %>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/highcharts-3d.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE ANALITICO DE PRODUCTOS VENDIDOS</h4>
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
                                    <th style="display:none">COD_PRODUCTO</th>
                                    <th>PRODUCTO</th>
                                    <th style="text-align: center">MONTO</th>
                                    <th style="text-align: center">%</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <table id="tblReporte" class="hidden" style="margin-left: 10px">
                            <thead>
                                <tr>
                                    <th>PRODUCTO</th>
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

<!-- INICIO DE LA VENTANA MODAL PARA MOSTRAR LOS DETALLES DE REPORTE-->
<div id="ventanaD" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="left: 30%; width: 80%;" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3 id="labelReporteDetalle">Detalle de Ventas</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">            
            <div class="span12" id="divBuscarDoc_body">
                

                <table id="tbl_ventas_productos" class="display DTTT_selectable" border="0" style="font-size:12px;">
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



<!-- Modal -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title">TITULO</h4>
      </div>
      <div class="modal-body">
        <div class="row-fluid">
            <div class="span2"></div>
            <div class="span8">                
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span2"></div>            
        </div>
        <div class="row-fluid">
            <div class="span1"></div>
            <div class="span10">
                <div id="treeCentroCostos" class="treeview">
                </div>
            </div>
            <div class="span1"></div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
        <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="../vistas/NV/js/NVLRAPV.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRAPV.init();
    });
</script>
