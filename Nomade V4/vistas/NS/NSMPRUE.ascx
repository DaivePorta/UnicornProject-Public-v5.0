<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMPRUE.ascx.vb" Inherits="vistas_NS_NSMPRUE" %>
<link href="../../recursos/plugins/combogrid-1.6.3/css/smoothness/jquery-ui-1.10.1.custom.css" rel="stylesheet" />
<link href="../../recursos/plugins/combogrid-1.6.3/css/smoothness/jquery.ui.combogrid.css" rel="stylesheet" />
<%--<script src="../../recursos/plugins/combogrid-1.6.3/jquery/jquery-1.9.1.min.js"></script>--%>
<script src="../../recursos/plugins/combogrid-1.6.3/jquery/jquery-ui-1.10.1.custom.min.js"></script>
<script src="../../recursos/plugins/combogrid-1.6.3/plugin/jquery.ui.combogrid-1.6.3.js"></script>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PRUEBAS
                </h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nsmcarg" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nslcarg" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <table id="tblBandeja" class="display DTTT_selectable" border="0">
                    <thead>
                        <tr>

                            <th>CODIGO
                            </th>

                            <th>DESCRIPCION
                            </th>
                            <th>NIVEL
                            </th>

                            <th>ESTADO
                            </th>
                            <th>CAMBIAR ESTADO
                            </th>
                        </tr>
                    </thead>

                </table>

                <input type="text" id="txt" />
                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NS/js/NSMPRUE.js"></script>
<script>
    jQuery(document).ready(function () {
        $("#txt").combogrid({
            debug: true,
            minLength: 3,
            colModel: [{ 'columnName': 'id', 'width': '10', 'label': 'id' }, { 'columnName': 'name', 'width': '60', 'label': 'title' }, { 'columnName': 'author', 'width': '30', 'label': 'author' }],
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=COMBOGRID',
            //"select item" event handler to set input fields
            select: function (event, ui) {
                $("#txt").val(ui.item.name);
                //$("#project-id").val(ui.item.id);
                alert(ui.item.name);
                return false;
            }
        });
        NSMPRUE.init();
    });
</script>
