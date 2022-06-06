<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLSISC.ascx.vb" Inherits="vistas_NM_NMLSISC" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TIPOS DE SISTEMA DE CALCULO DEL ISC</h4>
                <div class="actions">
                    <a href="?f=NMMSISC" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NMLSISC" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <table id="tblTipoSistemas" class="display DTTT_selectable" border="0" style="display: none;">
                    <thead>
                        <tr>
                            <th>CODIGO
                            </th>
                            <th>DESCRIPCION
                            </th>
                            <th>CODIGO SUNAT
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
<script type="text/javascript" src="../vistas/NM/js/NMMSISC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLSISC.init();
    });
</script>
