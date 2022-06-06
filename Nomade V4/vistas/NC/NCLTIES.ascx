<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTIES.ascx.vb" Inherits="vistas_NC_NCLTIES" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TIPOS DE ESTABLECIMIENTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmties" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclties" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblTEstablecimientos" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>
                                    <th>CODIGO SUNAT
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjTEstablecimientos" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCTIES.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTIES.init();
        
    });
</script>
