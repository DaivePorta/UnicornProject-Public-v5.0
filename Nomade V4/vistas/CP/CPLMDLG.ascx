<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLMDLG.ascx.vb" Inherits="vistas_CP_CPLMDLG" %>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA GRUPOS PAGOS DIVERSOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=cpmmdlg" style="margin-top: -10px;"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div id="divTabla">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<input type="hidden" id="hfCode" />
<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPMMDLG.js"></script>

<script>
    jQuery(document).ready(function () {
        CPLMDLG.init();
    });
</script>
