<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLCARR.ascx.vb" Inherits="vistas_NF_NFLCARR" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CARROCERIAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nfmcarr" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nflcarr" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                        <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                            <thead>
                                <tr align="center">

                                    <th>CODIGO
                                    </th>
                                    <th>CARROCERIA
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                  
                        <tr id='<%# Eval("CODIGO")%>'>
                            <td align="center" id='cod<%# Eval("CODIGO")%>'><%# Eval("CODIGO")%></td>
                            <td id='des<%# Eval("CODIGO")%>'><%# Eval("CARROCERIA")%></td>
                            <td align="center" id='est<%# Eval("CODIGO")%>'><%# Eval("ESTADO")%></td>
                            <td align="center"><a id='_<%# Eval("CODIGO")%>' class="btn green cambiarbt"><i class="icon-refresh"></i></a></td>
                        </tr>
                   
                        </tbody> </table>
                   <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMCARR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLCARR.init();
       
    });
</script>


