﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLCLBI.ascx.vb" Inherits="vistas_NM_NMLCLBI" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE CLASIFICACIONES DE BIENES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nmmclbi" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nmlclbi" class="btn red"><i class="icon-list"></i> Listar</a>  
                </div>
            </div>
            <div class="portlet-body">
                <table id="tblBandeja" class="display  DTTT_selectable" border="0" style="display: none;">
                    <thead>
                        <tr align="center">
                            <th>CODIGO
                            </th>
                            <th>DESCRIPCION
                            </th>
                            <th>DESC. CORTA
                            </th>
                            <th>ORDEN
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
<script type="text/javascript" src="../vistas/NM/js/NMMCLBI.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLCLBI.init();

    });
</script>

