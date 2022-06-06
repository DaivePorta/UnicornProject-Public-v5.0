<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLGPRO.ascx.vb" Inherits="vistas_NC_NCLGPRO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA GRUPO DE PROVEEDORES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmgpro" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclgpro" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                      
                                <table id="tbl_gru_prov" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO
                                            </th>
                                            <th>NOMBRE
                                            </th>
                                            <th>DESCRIPCIÓN
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
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMGPRO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLGPRO.init();

    });
</script> 