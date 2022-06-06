<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLIMRE.ascx.vb" Inherits="vistas_NC_NCLIMRE" %>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA IMPUESTO A LA RENTA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmimre"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12" id="divTblImpuesto">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>FECHA APLICACIÓN</th>
                                    <th>FACTOR</th>
                                    <th>IR ANUAL AÑO ANTERIOR</th>
                                    <th>INGRESOS TOTALES AÑO ANTERIOR</th>
                                    <th>INGRESOS DIFERENCIA CAMBIO</th>
                                    <th>COEFICIENTE</th>
                                    <th>FECHA TRANSACCIÓN</th>
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
<script type="text/javascript" src="../vistas/NC/js/NCMIMRE.js"></script>

<script>
    jQuery(document).ready(function () {
        NCLIMRE.init();
    });
</script>
