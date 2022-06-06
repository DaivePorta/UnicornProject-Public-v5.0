<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLESCC.ascx.vb" Inherits="vistas_NC_NCLESCC" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ESTRUCTURA DE CENTRO DE COSTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=ncmescc" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclescc" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="divEstructura">
                            <table id="tblECentroCostos" border="0" class="display DTTT_selectable">
                                <thead>
                                    <!-- style="background-color: rgba(3, 121, 56, 0.7); color:#eeeeee;" -->
                                    <tr>
                                        <th style="display: none;">CODIGO
                                        </th>
                                     <%--   <th style="display: none;">CODIGO_EMPRESA
                                        </th>
                                        <th style="display: none;">EMPRESA
                                        </th>--%>
                                        <th>DESCRIPCION ESTRUCTURA
                                        </th>
                                        <th>NIVELES
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
                            <asp:HiddenField ID="hfObjECentroCostos" runat="server" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMESCC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLESCC.init();

    });
</script>
