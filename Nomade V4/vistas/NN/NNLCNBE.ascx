<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLCNBE.ascx.vb" Inherits="vistas_NN_NNLCNBE" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA CONCEPTOS COMPUTABLES PARA BENEFICIOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NNMCNBE" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NNLCNBE" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                
                     <div class="row-fluid">
                <div class="span12" id="table">
                    <table id="tblCnp_benef" class="display "   style="display: none;">
                        <thead>
                            <tr>
                                <th>CÓDIGO 
                                </th>
                                <th>CONCEPTO PLANILLA
                                </th>
                                 <th>BENEFICIO SOCIAL
                                </th>
                                 <th>ESTADO
                                </th>
                            </tr>
                        </thead>
                    </table>
                   
                </div>
                         </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NN/js/NNMCNBE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLCNBE.init();

    });
</script>