<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLAFTR.ascx.vb" Inherits="vistas_NN_NNLAFTR" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA AFECTACION TRIBUTARIA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NNMAFTR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLAFTR" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12" id="table">
                        <table id="tblAfec_tr" class="display " style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>CONCEPTO PLANILLA</th>
                                    <th>TRIBUTO LABORALth>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NN/js/NNMAFTR.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLAFTR.init();
    });
</script>
