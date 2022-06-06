<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLPROP.ascx.vb" Inherits="vistas_NF_NFLPROP" %>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PROPIETARIOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                      <a href="?f=NFMPROP" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NFlPROP" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                     <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>NOMBRE
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>   
                     </table>
     
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
 <asp:HiddenField ID="hfObjJson" runat="server" />
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMPROP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLPROP.init();
       
    });
</script>


