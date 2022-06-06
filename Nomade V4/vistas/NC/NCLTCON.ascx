<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTCON.ascx.vb" Inherits="vistas_NC_NCLTCON" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE TIPO DE CONTRIBUYENTE</h4>

                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmtcon" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncltcon" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblcontribuyente" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>CÓDIGO DE SUNAT</th>
                                    <th>DESCRIPCIÓN</th>
                                    <th>ESTADO</th>
                                    <th>CAMBIAR ESTADO</th>
                                </tr>
                            </thead>
                        </table>                        
                         <asp:HiddenField ID="hfObjcontribuyente" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMTCON.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTCON.init();
        
    });
</script>
