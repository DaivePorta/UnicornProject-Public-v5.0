<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPLMAIL.ascx.vb" Inherits="vistas_NP_NPLMAIL" %>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CORREOS PRODUCCION</h4>
                <div class="actions">                   
                    <a href="?f=npmmail" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nplmail" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>TIPO
                                    </th>
                                    <th>NOMBRE 
                                    </th>
                                    <th>ETAPA
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
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NP/js/NPMMAIL.js"></script>
<script>
    jQuery(document).ready(function () {
        NPLMAIL.init();
    });
</script>