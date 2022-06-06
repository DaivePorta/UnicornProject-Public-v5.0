<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLACTV.ascx.vb" Inherits="vistas_NC_NCLACTV" %>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ACTIVIDADES ECONOMICAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmactv" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nclactv" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblActividad" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>CIIU
                                    </th>
                                    <th>NOMBRE
                                    </th>
                                    <th>NOMBRE CORTO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                   <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjActividad" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCACTV.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLACTV.init();
        
    });
</script>
