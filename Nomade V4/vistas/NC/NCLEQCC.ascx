<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLEQCC.ascx.vb" Inherits="vistas_NC_NCLEQCC" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA EQUIVALENCIA DE CENTRO DE COSTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmeqcc" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncleqcc" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCentroCostos" border="0" class="display DTTT_selectable" style="display:none;">
                            <thead>
                                <tr>
                                    <th>EMPRESA
                                    </th>
                                    <th>PLAN DE COSTOS BASE
                                    </th>
                                    <th>CODIGO
                                    </th>
                                    <th>COSTO BASE
                                    </th>
                                    <th>PLAN COSTO EQUIVALENTE
                                    </th>
                                    <th>CODIGO
                                    </th>
                                    <th>COSTO EQUIVALENTE
                                    </th>
                                    <th>FECHA INICIO
                                    </th>
                                    <th>FECHA TERMINO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjCentroCostos" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMEQCC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLEQCC.init();
       
    });
</script>
