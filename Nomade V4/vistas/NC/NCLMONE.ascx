<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLMONE.ascx.vb" Inherits="vistas_NC_NCLMONE" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA MONEDA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmmone" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclmone" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>


            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblMoneda" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO
                                    </th>
                                    <th>NOMBRE DE MONEDA
                                    </th>
                                    <th>NOMBRE CORTO 
                                    </th>
                                    <th>SÍMBOLO DE MONEDA 
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>ACCIÓN
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjMoneda" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMMONE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLMONE.init();
        
    });
</script>
