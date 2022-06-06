<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLUNME.ascx.vb" Inherits="vistas_NM_NMLUNME" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE UNIDADES DE MEDIDA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nmmunme" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nmlunme" class="btn red"><i class="icon-list"></i> Listar</a>  
                </div>
            </div>
            <div class="portlet-body">
                <div class="control-group">
                            <div class="controls">
                                <input id="chkActivos" type="checkbox" checked="" style="opacity: 0;"> Mostrar sólo activos
                            </div>
                        </div>

                        <table id="tblBandeja" class="display  DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr align="center">
                                   
                                    <th>CODIGO
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>DESC. INTERNACIONAL
                                    </th>
                                     <th>TIPO U.M.
                                    </th>
                                    <th>U.M.
                                    </th>
                                    <th>CODIGO SUNAT
                                    </th>
                                    <th>UNIDAD BASE
                                    </th>
                                    <th>ESTADO_IND
                                    </th>
                                    <th>ESTADO
                                    </th>
                                </tr>
                            </thead>
                       </table>

            <asp:HiddenField ID="hfObjJson" runat="server" />

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NM/js/NMMUNME.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
       NMLUNME.init();

    });
</script>

