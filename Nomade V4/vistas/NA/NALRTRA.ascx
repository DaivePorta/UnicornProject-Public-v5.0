<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALRTRA.ascx.vb" Inherits="vistas_NA_NALRTRA" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TRANSFERENCIA ENTRE ALMACENES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div id="div" class="portlet-body">
                <div id="filtros_1" class="row-fluid">
                  
                     <div class="span1">
                        <div class="control-group ">
                            <label>
                            Empresa
                            </label>
                        </div>
                    </div>
                      
                    <div class="span4">
                        <div class="controls">
                             <select id="cboEmpresas" class="span12" data-placeholder="Almacen"></select>
                         </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label>
                            Origen
                            </label>
                        </div>
                    </div>
                      
                    <div class="span3">
                        <div class="controls">
                             <select id="cboAlmacen" class="span12" data-placeholder="Almacen"></select>
                         </div>
                    </div>
                </div>

                  <%--<div class="row-fluid">
                   <div class="span1">
                        <div class="control-group ">
                            <label>
                           
                            </label>
                        </div>
                    </div>
                      
                    <div class="span3">
                        <div class="controls">
                           
                         </div>
                    </div>

                     <div class="span6">
                        <div class="controls">
                          
                         </div>
                    </div>
                     <div class="span2">
                        
                          <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        
                    </div>

               </div>--%>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                                <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    
                        <div class="span4">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                            Destino
                            </label>
                        </div>
                    </div>
                      
                    <div class="span3">
                        <div class="controls">
                             <select id="cboALmc_tranf" class="span12" data-placeholder="Almacen"></select>
                         </div>
                    </div>
                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row-fluid">
                    <div id="tblProductos">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NA/js/NALRTRA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALRTRA.init();


    });

</script>