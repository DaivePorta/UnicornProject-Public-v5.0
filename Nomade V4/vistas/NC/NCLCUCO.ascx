<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCUCO.ascx.vb" Inherits="vistas_NC_NCLCUCO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CLASES CUENTAS CONTABLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmcuco" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclcuco" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCCContable" border="0" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>CÓDIGO
                                    </th>
                                    <th>CÓDIGO SUNAT
                                    </th>
                                    <th>TIPO PLAN
                                    </th>
                                    <th>CLASE CUENTA
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
                        <asp:HiddenField ID="hfObjCCContable" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCUCO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCUCO.init();
        
    });
</script>
