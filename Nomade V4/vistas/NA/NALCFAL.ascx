<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALCFAL.ascx.vb" Inherits="vistas_NA_NALCFAL" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ALMACENES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <%--<a href="?f=namcfal" class="btn green"><i class="icon-plus"></i>Nuevo</a>--%>
                    <a href="?f=nalcfal" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">

                    <div id="filter_emp" class="span12" data-column="2">
                        <div class="span1"><b>CODIGO:</b> </div>
                        <div class="span1">
                            <input style="margin-bottom: 0px;" type="text" class="column_filter span12" id="filcod">
                        </div>

                        <div class="span1"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span3"></div>

                    </div>


                </div>

                <table id="tblAlmacen" cellspacing="0" class="display DTTT_selectable" border="0">
                    <thead>
                        <tr align="center">

                            <th>CODIGO
                            </th>
                            <th>ALMACEN
                            </th>
                            <th>SUCURSAL
                            </th>
                            <th>EMPRESA
                            </th>
                            <th>TIPO ALMACEN
                            </th>
                            <th>DIRECCION
                            </th>
                            <th>TELEFONO
                            </th>
                            <th>ESTADO
                            </th>
                            <th>CAMBIAR ESTADO
                            </th>
                        </tr>
                    </thead>
                </table>
                <asp:HiddenField ID="hfObjAlmacenes" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NA/js/NAMCFAL.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.


        NALCFAL.init();

    });
</script>

