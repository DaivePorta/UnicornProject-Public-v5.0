<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLPRES.ascx.vb" Inherits="vistas_NM_NMLPRES" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PRESENTACION DE PRODUCTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nmmpres" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nmlpres" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <table id="tblPresentacion" class="display DTTT_selectable" border="0" style="display: none;">
                    <thead>
                        <tr>
                            <th>CODIGO
                            </th>
                            <th>PRESENTACION
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
<script type="text/javascript" src="../vistas/NM/js/NMMPRES.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLPRES.init();
    });
</script>