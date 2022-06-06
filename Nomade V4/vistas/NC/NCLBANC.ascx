<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLBANC.ascx.vb" Inherits="vistas_NC_NCLBANC" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE BANCOS SEGUN SUNAT</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMBANC" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLBANC" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBancos" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>COD SUNAT</th>
                                    <th>DESCRIPCION SUNAT</th>
                                    <th>NOMBRE COMERCIAL</th>
                                    <th>RUC</th>
                                    <th>FECHA TERMINO</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfBancos" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMBANC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLBANC.init();
    });
</script>