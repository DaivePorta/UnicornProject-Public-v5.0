<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBLMTAR.ascx.vb" Inherits="vistas_CB_CBLMTAR" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE MARCAS DE TARJETA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=CBMMTAR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CBLMTAR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCajas" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>MARCA</th>
                                    <th>TIPO DE MARCA</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfMarcasTarjeta" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CB/js/CBMMTAR.js"></script>
<script>
    jQuery(document).ready(function () {
        CBLMTAR.init();
    });
</script>
