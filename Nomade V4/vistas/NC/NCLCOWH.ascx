<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCOWH.ascx.vb" Inherits="vistas_NC_NCLCOWH" %>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CONFIGURACION DE WHATSAPP</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmcowh" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nclcowh" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblWhatsapp" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>NRO TELEFONO
                                    </th>
                                    <th>WABA ID
                                    </th>
                                    <th>ESTADO
                                    </th>
                                   <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjWhatsapp" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCCOWH.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCOWH.init();

    });
</script>
