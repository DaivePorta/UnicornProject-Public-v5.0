<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPLFLSO.ascx.vb" Inherits="vistas_MP_MPLFLSO" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>FLUJO DE SOLICITUD DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn black printlist " href="javascript:imprimirDiv(['filtros_1','filtros_2','filtros_3','DetalleFlujoSolici','dtfabricacion']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                    <a href="?f=MPLFLSO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div id="div1" class="row-fluid">


                    
                    <div class="row-fluid" id="Div2">
                    <div class="span12">
                        <div class="portlet box green" id="Div3">
                    <div class="portlet-title">
                        <h4>

                            <i class="icon-search"></i>BUSCAR POR:</h4>
                    

                   </div>
                    <div class="portlet-body">
                          <div class="row-fluid" >
                    <div class="span12" >

                        <div class="row-fluid" id="filtros_1">
                                <div class="span2" style="height: 50px;">
                                    <div class="control-group">
                                        <div class="controls" style="height: 30px;">
                                            <label class="radio">
                                                <div class="radio disabled">
                                                    <span>
                                                        <input type="radio" name="filtro" style="opacity: 0;" id="chknumero"  />
                                                    </span>
                                                </div>
                                                Nro. Solicitud
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" style="height: 50px;">
                                <div class="control-group">
                                    <div class="controls" style="height: 30px;">
                                        <label class="radio">
                                            <div class="radio disabled">
                                                <span>
                                                    <input type="radio" name="filtro" style="opacity: 0;" id="chkProducto" />
                                                </span>
                                            </div>
                                            Producto
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span2" style="height: 50px;">
                                <div class="control-group">
                                    <div class="controls" style="height: 30px;">
                                        <label class="radio">
                                            <div class="radio disabled">
                                                <span>
                                                    <input type="radio" name="filtro" style="opacity: 0;" id="chkFecha" />
                                                </span>
                                            </div>
                                            Fecha
                                        </label>
                                    </div>
                                </div>
                            </div>

                                <div class="span4 cantidad" id="filtro">
                                  
                                </div>
                            <div class="span2" id="Div4">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnBuscar" class="btn blue pull-right"><i class="icon-search"></i>Buscar</a>
                                    </div>
                                </div>
                            </div>

                               
                            </div>



                        

                    </div>
                </div>
 
                
                    </div>
                </div>
                         </div>
                     
                </div>
                
                    
                    
                </div>
                


              



                <%--<div class="row-fluid" id="filtros_2">
                    <div class="span12">

                        <div class="span5">
                            <div class="row-fluid">

                                <div class="span4">
                                    <div class="control-group">
                                        <label class="control-label span12">Fecha Inicio</label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtFechaIni" class="span12 fecha" data-date-format="dd/mm/yyyy" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2">
                                </div>

                            </div>
                        </div>

                        <div class="span5">
                            <div class="row-fluid">

                                <div class="span4">
                                    <div class="control-group">
                                        <label class="control-label span12">Fecha Fin</label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtFechaFin" class="span12 fecha" data-date-format="dd/mm/yyyy" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div class="radio" id="Div3">
                                                <span class="checked">
                                                    <input id="chkFecha" name="filtro" type="radio" class="span12" style="opacity: 0;">
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="span2">
                            <div class="row-fluid">
                                <div class="span6">
                                    <a id="btnBuscar" class="btn blue"><i class="icon-search"></i>Buscar</a>
                                </div>
                                <div class="span6"></div>
                            </div>
                        </div>

                    </div>
                </div>--%>

                <br>

                <div class="row-fluid" id="filtros_3">
                    <div class="span12">
                        <table id="tablaSolicitud" class="table table-hover display DTTT_selectable">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr>
                                    <th>CODE</th>
                                    <th style="text-align: center">CODIGO SOLICITUD</th>
                                    <th>ITEM</th>
                                    <th style="text-align: center">PRODUCTO</th>
                                    <th style="text-align: center">UNIDAD MEDIDA</th>
                                    <th style="text-align: center">CANTIDAD APROBADA</th>
                                    <th style="text-align: center">FECHA</th>
                                    <th style="text-align: center">ESTADO</th>
                                    <th style="text-align: center">VER</th>

                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>


                <br>


                <div id="DetalleFlujoSolici" style="border: 1px solid #B4CEF8">

                    <div class="portlet-title">
                        <h4><i class="icon-reorder"></i>Requerimiento de Produccion</h4>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">


                            <table id="tblDetalleFlujoSolici" class="table table-hover display DTTT_selectable">
                                <thead style="background-color: rgb(35, 119, 155); color: white;">
                                    <tr>

                                        <th style="text-align: center">COD. REQUERIMIENTO DE PRODUCCION</th>
                                        <th style="text-align: center">COD. SOLICITUD</th>
                                        <th style="text-align: center">CANTIDAD</th>
                                        <th style="text-align: center">FASE</th>
                                        <th style="text-align: center">FECHA INICIO</th>
                                        <th style="text-align: center">FECHA FIN</th>
                                        <th style="text-align: center">VER</th>

                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                </div>


                <div id="dtfabricacion">
                    <br>

                    <div class="row-fluid">
                        <div class="span12">

                            <div class="span6" style="border: 1px solid #B4CEF8">

                                <div class="portlet-title">
                                    <h4><i class="icon-reorder"></i> Orden de Produccion</h4>
                                </div>


                                <table id="tblDetallefabricacion" class="table table-hover display DTTT_selectable">
                                    <thead style="background-color: rgb(35, 119, 155); color: white;">
                                        <tr>

                                            <th style="text-align: center">COD. DE ORD. FABRICACION</th>
                                            <th style="text-align: center">RESPONSABLE</th>
                                            <th style="text-align: center">T. DE FABRICACION</th>
                                            <th style="text-align: center">GLOSA</th>

                                        </tr>
                                    </thead>
                                </table>

                            </div>

                            <div class="span6" style="border: 1px solid #B4CEF8">

                                <div class="portlet-title">
                                    <h4><i class="icon-reorder"></i> Lote de Produccion</h4>
                                </div>



                                <table id="tblLote" class="table table-hover display DTTT_selectable">
                                    <thead style="background-color: rgb(35, 119, 155); color: white;">
                                        <tr>

                                            <th style="text-align: center">COD. DE ORD. LOTE</th>
                                            <th style="text-align: center">COD. DE FABRICACION</th>
                                            <th style="text-align: center">SECCION ALMACEN</th>
                                            <th style="text-align: center">FECHA INICIO</th>
                                            <th style="text-align: center">FECHA FIN</th>

                                        </tr>
                                    </thead>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
<div id="modal-req" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Detalle de Compra</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div7">
                <table class="table table-hover" id="tblsolicitud">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th  style="text-align: center">CATALOGO</th>
                            <th style="text-align: center">ESTABLECIMIENTO</th>
                            <th style="text-align: center">TIPO REQUERIMIENTO</th>
                            <th style="text-align: center">IND CLIENTE</th>
                            <th style="text-align: center">CLIENTE</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>
<input type="hidden" id="hdproducto" />
<script type="text/javascript" src="../vistas/MP/js/MPLFLSO.js"></script>
<script>
    jQuery(document).ready(function () {
        MPLFLSO.init();
    });
</script>

