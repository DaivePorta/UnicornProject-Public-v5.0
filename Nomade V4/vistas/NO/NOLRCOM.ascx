<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRCOM.ascx.vb" Inherits="vistas_NO_NOLRCOM" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE REQUERIMIENTOS DE BIENES Y SERVICIOS</h4>
                <div class="actions">
                    
                    <a class="btn green" href="?f=NOMRCOM"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NOLRCOM"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    
                </div>
            </div>
            <div id="div" class="portlet-body">



                  <div id="Div1" class="row-fluid">

                     <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                       <div class="span1">
                        <div class="control-group ">
                            <label>Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="ESTADO">
                                      <option value="T">TODOS</option>
                                    <option value="P">APROBADOS</option>
                                      <option value="A">POR APROBAR</option>
                                      <option value="C">COMPLETADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                       <div class="row-fluid">
                           <div class="span10">
                            </div>
                          <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="buscar" class="btn blue">FILTRAR</a>
                                </div>
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

<script type="text/javascript" src="../vistas/NO/js/NOLRCOM.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLRCOM.init();


    });

</script>