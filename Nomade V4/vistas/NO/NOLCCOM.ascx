<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLCCOM.ascx.vb" Inherits="vistas_NO_NOLCCOM" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE APROBACION DE REQUERIMIENTOS DE BIENES Y SERVICIOS</h4>
                <div class="actions">                    
                   <%-- <a class="btn green" href="?f=NOMRCOM"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NOLRCOM"><i class="icon-list"></i>Listar</a>--%>
                    <a class="btn black printlist"<%-- href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"--%> style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>                    
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                      <div class="span2">
                        <div class="control-group">
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

<script type="text/javascript" src="../vistas/NO/js/NOLCCOM.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLCCOM.init();
    });

</script>
