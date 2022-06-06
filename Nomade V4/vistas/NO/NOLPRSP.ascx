<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLPRSP.ascx.vb" Inherits="vistas_NO_NOLPRSP" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA REQUERIMIENTO DE PRODUCCION</h4>
                <div class="actions">


                    <a href="?f=NOMPRSP" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a class="btn red" href="?f=NOLPRSP"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div id="div" class="portlet-body">

                <div id="Div2" class="row-fluid">

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

                </div>

                

                <div id="Div1" class="row-fluid">

                    <div class="span12">
                        <table id="detalle" class="display DTTT_selectable" border="0">
                            <thead >
                                <tr>
                                    
                                    <th>CODIGO</th>
                                    <th>PRODUCTO</th>
                                    <th>TOTAL</th>
                                    <th>FECHA INICIO</th>
                                    <th>FECHA FIN</th>
                                    <th>GLOSA</th>
                                    

                                </tr>
                            </thead>

                        </table>
                    </div>



                </div>

                 
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdproducto"  />
<script type="text/javascript" src="../vistas/NO/js/NOLPRSP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLPRSP.init();


    });

</script>
