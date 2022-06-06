<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTCBA.ascx.vb" Inherits="vistas_NC_NCLTCBA" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista Tipos de Cuentas Bancarias</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=ncmtcba" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncltcba" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblTCBancarias" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO </th>
                                    <th style="text-align: left">DESCRIPCION</th>
                                    <th>MONEDA</th>
                                    <th>ESTADO </th>
                                    <th>CAMBIAR ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjTCBancarias" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/JS/NCMTCBA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTCBA.init();

    });
</script>
