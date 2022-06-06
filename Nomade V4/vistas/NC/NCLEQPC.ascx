<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLEQPC.ascx.vb" Inherits="vistas_NC_NCLEQPC" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA EQUIVALENCIA DEL PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmeqpc" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncleqpc" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblEPCuentas" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>PLAN BASE
                                    </th>
                                    <th>DESCRIPCION BASE
                                    </th>
                                    <th>PLAN EQUIVALENTE
                                    </th>
                                    <th>DESCRIPCION EQUIVALENTE
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjEPCuentas" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMEQPC.js"></script>

<script>

    jQuery(document).ready(function () {

        // Se Inicializa el modulo de javascript para esta forma.
        NCLEQPC.init();
        
    });
</script>
