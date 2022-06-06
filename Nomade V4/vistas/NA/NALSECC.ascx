<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALSECC.ascx.vb" Inherits="vistas_NA_NALSECC" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ZONIFICACION DE ALMACEN</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=namsecc" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nalsecc" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span5" data-column="3">
                     
                        <div class="span2"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span7"></div>

                    </div>
                     
                   <div id="filter_alm" class="span5" data-column="2">
                     
                        <div class="span2"><b>ALMACEN:</b></div>
                        <div id="filalm" class="span6"></div>

                    </div>


                </div>

     
                <table id="tblSeccAlmacen" cellspacing="0" class="display DTTT_selectable" border="0">
                    <thead>
                        <tr align="center">

                            <th>CODIGO
                            </th>
                            <th>ZONA
                            </th>
                            <th>ALMACEN
                            </th>
                            <th>EMPRESA
                            </th>
                            <th>ESTADO
                            </th>
                            <%--<th>CAMBIAR ESTADO
                            </th>--%>
                        </tr>
                    </thead>
                </table>
                <asp:HiddenField ID="hfObjSeccAlmacenes" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NA/js/NAMSECC.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.


        NALSECC.init();

    });
</script>