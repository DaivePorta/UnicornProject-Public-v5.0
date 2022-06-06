<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPLFPRO.ascx.vb" Inherits="vistas_NP_NPLFPRO" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>SIMULACION DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn black printlist " href="javascript:imprimirDiv(['filtros_1','filtros_2','filtros_3','DetalleFlujoSolici','dtfabricacion']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                    <a href="?f=MPLFLSO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                 <div id="filtros_1" class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <label>Almacen</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="hf10" multiple="multiple"  data-placeholder="ALMACEN">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                 <div class="row-fluid">
                      <div class="span1">
                           <label class="control-label" for="slcAnio">¨Producto</label>
                      </div>

                      <div class="span3">
                         <div class="control-group">
                             <div class="controls" id="input_desc_prod">
                                  <input type="text" class="span12" id="txtProducto" autocomplete="off"/>
                             </div>
                         </div>
                     </div>

                      <div class="span2">
                         <div class="control-group">
                             <div class="controls" >
                                  <input type="text" class="span12" id="txtUni" disabled/>
                             </div>
                         </div>
                     </div>

                      <div class="span2">
                         <label class="control-label">¨Cantidad</label>
                     </div>


                      <div class="span2">
                         <div class="control-group">
                             <div class="controls">
                                  <input type="text" class="span12" id="txtCantidad" style="text-align:right" onkeypress=" return ValidaDecimales(event,this,2);"/>
                             </div>
                         </div>
                     </div>

                      <div class="span2">
                         <div class="control-group">
                                    <div class="controls">
                                        <a id="btnBuscar" class="btn blue pull-right"><i class="icon-search"></i> Buscar</a>
                                    </div>
                                </div>
                     </div>
                 </div>

                <table id="tblBandeja" class="display  DTTT_selectable" border="0">

                    <thead  style="background-color: rgb(35, 119, 155); color: white;">

                         <tr align="center">
                              <th>CODIGO</th>
                              <th>PRODUCTO</th>
                              <th>CANTIDAD ESTIMADA</th>
                              <th>TOTAL DE ALMACENES</th>                          
                         </tr>

                    </thead>

                </table>

                <div style="display:none" >
                      <table id="tbldetalle">
                          <thead>
                              <tr>
                                  <th>Almacen</th>
                                  <th>Cantidad</th>
                                  <th>Condicion</th>
                              </tr>
                          </thead>
                      </table>
                </div>

                <br>

                <div class="row-fluid" id="recetaDetalle" style="display:none;">
                    <div class="span12">
                            <div class="portlet box green" id="Div3">
                                <div class="portlet-title">
                                    <h5><label id="titulo"></label></h5>


                                </div>
                                <div class="portlet-body">
                                    <div class="row-fluid">
                                        <div class="span12">
                                             <div >
                <table id="tblBandejaD" class="display  DTTT_selectable" border="0">

                    <thead>

                         <tr align="center">
                              <th>CODIGO</th>
                              <th>PRODUCTO</th>
                              <th>CANTIDAD ESTIMADA</th>
                              <th>TOTAL DE ALMACENES</th>                          
                         </tr>

                    </thead>

                </table>
                  <div style="display:none" >
                      <table id="tbldetalleD">
                          <thead >
                              <tr>
                                  <th>Almacen</th>
                                  <th>Cantidad</th>
                                  <th>Condicion</th>
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

                

                
            </div>

        </div>

    </div>

</div>
<input type="hidden" id="hdproducto" />

<script type="text/javascript" src="../vistas/NP/js/NPLFPRO.js"></script>
<script>
    jQuery(document).ready(function () {
        NPLFPRO.init();
    });
</script>

