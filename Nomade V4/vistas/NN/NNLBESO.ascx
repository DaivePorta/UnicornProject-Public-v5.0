<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLBESO.ascx.vb" Inherits="vistas_NN_NNLBESO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA BENEFICIOS SOCIALES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nnmbeso" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nnlbeso" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                 
                <div class="row-fluid">
                    <div class="span12">
                      
                                <table id="tbl_bene_sociales" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO
                                            </th>
                                            <th>DESCRIPCION
                                            </th>
                                            <th>ESTADO
                                            </th>
                                             <th>CAMBIAR ESTADO
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
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMBESO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLBESO.init();

    });
</script> 