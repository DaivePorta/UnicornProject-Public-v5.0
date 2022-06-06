<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLUNID.ascx.vb" Inherits="vistas_NF_NFLUNID" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA UNIDADES DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nfmunid" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nflunid" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!---->
                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="cboEmpresa">Empresa</label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="row-fluid" id="divTblDatos" style="margin-top: 2%; overflow-x: auto;">

                    <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                        <thead class="fondoHeader">
                            <tr>
                                <th>CÓDIGO</th>
                                <th>PLACA</th>
                                <th>PROPIETARIO</th>
                                <th>EMPRESA</th>
                                <th>MARCA</th>
                                <th>CARROCERIA</th>
                                <th>ESTADO</th>
                                <th>CAMBIAR ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </div>

                <%--   <div class="row-fluid">
                    <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                        <thead>
                            <tr align="center">

                                <th>CODIGO
                                </th>
                                <th>PLACA
                                </th>
                                <th>PROPIETARIO
                                </th>
                                <th>EMPRESA
                                </th>
                                <th>MARCA
                                </th>
                                <th>CARROCERIA
                                </th>
                                <th>ESTADO
                                </th>
                                <th>CAMBIAR ESTADO
                                </th>

                            </tr>
                        </thead>
                    </table>
                </div>--%>

                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMUNID.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLUNID.init();

    });
</script>



