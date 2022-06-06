<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCLCL.ascx.vb" Inherits="vistas_NC_NCLCLCL" %>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CLASES DE CLIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmclcl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclclcl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span12" data-column="2">
                     
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span3"></div>

                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCCliente" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>
                                    <th>CATEGORIA
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CONFIGURACION
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjCCliente" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCLCL.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCLCL.init();
       
    });
</script>
