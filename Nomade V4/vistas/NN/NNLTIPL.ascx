<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLTIPL.ascx.vb" Inherits="vistas_NN_NNLTIPL" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA TIPO PLANILLA</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a> 
                    <a href="?f=nnmtipl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nnltipl" class="btn red"><i class="icon-list"></i>Listar</a>            
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                     

                </div>
                
               
               
                <div class="row-fluid">

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="divTipoPlanilla">
                        </div>
                    </div>

                </div>




            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCTLG_CODE" />
        <input type="hidden" id="hfESTADO_CONT" />
    </div>


</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMTIPL.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLTIPL.init();

    });
</script>