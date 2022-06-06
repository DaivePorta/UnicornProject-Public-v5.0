<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLZONH.ascx.vb" Inherits="vistas_NC_NCLZONH" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA ZONA HORARIA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmzonh" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclzonh" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblZonaH" border="0" class="display DTTT_selectable" style="display:none;">
                            <thead>
                                <tr>
                                    <th>CODIGO 
                                    </th>
                                    <th>INDEX 
                                    </th>
                                    <th>ZONA HORARIA 
                                    </th>
                                    <th>TIEMPO 
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>HORA
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjZonaH" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMZONH.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLZONH.init();
        
    });
</script>
