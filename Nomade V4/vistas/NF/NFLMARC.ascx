<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLMARC.ascx.vb" Inherits="vistas_NF_NFLMARC" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA MARCAS DE UNIDADES DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nfmmarc" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nflmarc" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                    <thead>
                        <tr align="center">
                            <th>CODIGO</th>
                            <th>MARCA</th>
                            <th>ESTADO</th>
                            <th>CAMBIAR ESTADO</th>
                        </tr>
                    </thead>
                </table>
                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMMARC.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLMARC.init();
    });
</script>


