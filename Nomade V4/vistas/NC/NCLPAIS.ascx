<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLPAIS.ascx.vb" Inherits="vistas_NC_NCLPAIS" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>
                    LISTA PAIS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmpais" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclpais" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPais" border="0" class="display DTTT_selectable" style="display:none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO DE PAÍS
                                    </th>
                                    <th>CÓDIGO SUNAT
                                    </th>
                                    <th>NOMBRE DE PAÍS
                                    </th>
                                    <th>NOMBRE CORTO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>ACCIÓN
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjPais" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMPAIS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLPAIS.init();
        
    });
</script>
