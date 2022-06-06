<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLTIAS.ascx.vb" Inherits="vistas_CT_CTLTIAS" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TIPOS DE ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CTMTIAS" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CTLTIAS" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <table id="tblGestionMarcas" class="display DTTT_selectable" border="0" style="display: none;">
                    <thead>
                        <tr>
                            <th>CODIGO
                            </th>
                            <th>NOMBRE
                            </th>
                            <th>DESCRIPCIÓN
                            </th>
                            <th>NRO_ORDEN
                            </th>
                            <th>ESTADO
                            </th>
                            <th>CAMBIAR ESTADO
                            </th>
                        </tr>
                    </thead>
                </table>
                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CT/js/CTMTIAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLTIAS.init();
    });
</script>
