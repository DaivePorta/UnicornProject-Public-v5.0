<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLDETR.ascx.vb" Inherits="vistas_NC_NCLDETR" %>


<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA TIPO DETRACCION</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmdetr" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncldetr" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            
        </div>
        <div class="portlet-body">
            <div class="row-fluid">
                <div class="span12">
                    <table id="tblDetr" border="0" class="display DTTT_selectable" style="display:none;">
                        <thead>
                            <tr>
                                <th>CÓDIGO
                                </th>
                                <th>DEFINICIÓN
                                </th>
                                <th>TIPO DE EXISTENCIA
                                </th>
                                <th>PORCENTAJE (%)
                                </th>
                                <th>ESTADO
                                </th>
                                <th>ACCIÓN
                                </th>
                            </tr>
                        </thead>
                    </table>                                 
                    <asp:HiddenField ID="hfObjJSON" runat="server" />
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
<script type="text/javascript" src="../vistas/NC/js/NCMDETR.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLDETR.init();

    });
</script>
