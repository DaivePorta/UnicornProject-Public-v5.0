<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMCNBE.ascx.vb" Inherits="vistas_NN_NNMCNBE" %>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;MANTENIMIENTO CONCEPTOS COMPUTABLES PARA BENEFICIOS</h4>
                <div class="actions">
                     <a class="btn green" href="?f=NNMCNBE"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NNLCNBE"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="control-group">
                        <div class="controls" style="text-align:center ;">
                           <a id="btn_refrescar"  class="btn green" title="Refrescar" style="border-radius :4px!important"><i class="icon-refresh"></i> Actualizar</a>
                         

                        </div>
                    </div>

                </div>

                <div class="row-fluid" id="divTblConp_Beneficios">
                </div>

            </div>
        </div>
    </div>
</div>



<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMCNBE.js"></script>

<script>
    jQuery(document).ready(function () {
        NNMCNBE.init();
    });
</script>