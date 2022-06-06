<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLCHOF.ascx.vb" Inherits="vistas_NF_NFLCHOF" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CHOFERES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nfmCHOF" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nflCHOF" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                
                <div class="row-fluid">

                    <div id="filter_emp" class="span12" data-column="2">
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span3"></div>

                    </div>


                </div>
             
                        <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                            <thead>
                                <tr align="center">

                                    <th>CODIGO
                                    </th>
                                    <th>NOMBRE
                                    </th>
                                    <th>NRO LICENCIA
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                     <th>EMPRESACODE
                                    </th>
                                    <th>FECHA RENOVACION
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
<script type="text/javascript" src="../vistas/NF/js/NFMCHOF.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLCHOF.init();
        
    });
</script>


