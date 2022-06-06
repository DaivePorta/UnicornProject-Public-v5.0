<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMCOFA.ascx.vb" Inherits="vistas_MP_MPMCOFA" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CIERRE DE ORDEN DE PRODUCCIÓN</h4>
                <div class="actions">



                    <a class="btn red" href="?f=mpmcofa"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>

            <div id="id" class="portlet-body">

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

                <div class="row-fluid" id="filtros_2">
                    <div class="span12">
                        <div class="portlet box green">
                            <div class="portlet-title">
                                <h4><i class="icon-reorder"></i>BANDEJA DE ORDEN DE PRODUCCION</h4>
                             </div>
                             <div  class="portlet-body" >
                                   <table id="tblBandeja" class="display  DTTT_selectable" border="1">
                                       <thead>
                                            <tr align="center">
                                                <th rowspan="2">Orden Fabricacion</th>
                                                <th rowspan="2">Producto</th>
                                                <th rowspan="2">Cantidad</th>
                                                <th rowspan="2">Lote</th>                                               
                                                <th colspan="2">Programacion</th>                                                    
                                                <th rowspan="2">Glosa</th>
                                                <th rowspan="2">Cerrar</th>
                                            </tr>
                                           <tr>
                                               <th>Fecha Inicio</th>                                                    
                                               <th>Fecha Fin</th>                                                    
                                           </tr>
                                       </thead>
                                   </table>
                             </div>
                         </div>
                    </div>

                </div>

                <div id="modal-confirmar" class="modal hide">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button"></button>
                        <h3>Confirmar  Cierre  de la Orden de Fabricacion </h3>
                    </div>
                    <div class="modal-body">
                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <p>
                                    Desea Confirmar Cierre  de la Orden de Fabricacion            
                                                  ¿Desea continuar?
                                </p>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <div class="span4 offset2">
                                    <a id="btnAceptar" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                                </div>
                                <div class="span4">
                                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
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
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;ORDEN DE PRODUCCION</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div7">
                <table class="table table-hover" id="tblLISTA">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th  style="text-align: center">PROUCTO</th>
                            <th style="text-align: center">UNIDAD MEDIDA</th>
                            <th style="text-align: center">CANTIDAD TOTAL</th>
                            <th style="text-align: center">RESPONSABLE</th>
                            <th style="text-align: center">GLOSA</th>
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

            </div>

        </div>
    </div>
</div>



<input type="hidden" id="hdproducto" />

<script type="text/javascript" src="../vistas/MP/js/MPMCOFA.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        MPMCOFA.init();

    });
</script>
