<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLTRLA.ascx.vb" Inherits="vistas_NN_NNLTRLA" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA GRUPOS/SUBGRUPOS  TRIBUTO LABORALES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nnmtrla" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nnltrla" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12" id="table">
                        <table id="tblgru_subgru" class="display " style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>DESCRIPCIÓN</th>
                                    <th>ESTADO</th>
                                    <th>TIPO</th>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NN/js/NNMTRLA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLTRLA.init();

    });
</script>
