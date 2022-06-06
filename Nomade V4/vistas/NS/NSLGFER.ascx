<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLGFER.ascx.vb" Inherits="vistas_NS_NSLGFER" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA GESTION DE FERIADOS NO LABORABLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmgfer" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nslgfer" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
       <div class="row-fluid">
                    <div class="span12">
                        <table id="tblFeriados" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr align="center">

                                    <th>CODIGO
                                    </th> 

                                    <th>DESCRIPCION
                                    </th>
                                    <th>DIA
                                    </th>

                                    <th>TIEMPO</th>


                                    <th>ESTADO</th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>

                            </thead>
                    </table>
                         <asp:HiddenField ID="hfObjJson" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSMGFER.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLGFER.init();
        
    });
</script>
