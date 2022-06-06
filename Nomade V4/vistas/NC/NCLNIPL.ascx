<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLNIPL.ascx.vb" Inherits="vistas_NC_NCLNIPL" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ESTRUCTURA DE PLAN CONTABLE</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmnipl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclnipl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div class="span3" id="controlEmp"></div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblEPlanContable" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>TIPO PLAN CUENTA
                                    </th>
                                    <th>NOMBRE PLAN CUENTAS
                                    </th>
                                    <th>NIVELES
                                    </th>
                                    <th>FECHA INICIO
                                    </th>
                                    <th>FECHA FIN
                                    </th>
                                    <th>ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjEPlanContable" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMNIPL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLNIPL.init();
        
    });
</script>
