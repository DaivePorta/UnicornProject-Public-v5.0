<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBLOPTR.ascx.vb" Inherits="vistas_CB_CBLOPTR" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE OPERADORES DE TARJETA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=CBMOPTR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CBLOPTR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLista" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th style="text-align: left">EMPRESA</th>
                                    <th>NOMBRE COMERCIAL</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfOperadores" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CB/js/CBMOPTR.js"></script>
<script>
    jQuery(document).ready(function () {
        CBLOPTR.init();
    });
</script>
