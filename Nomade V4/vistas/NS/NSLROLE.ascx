<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLROLE.ascx.vb" Inherits="vistas_NS_NSLROLE" %>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ROLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmrole" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nslrole" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

                    <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>

                                    <th>DESCRIPCION
                                    </th>
                                    <th>COMENTARIO
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
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NS/js/NSMROLE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLROLE.init();
        
    });
</script>
