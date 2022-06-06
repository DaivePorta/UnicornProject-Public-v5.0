<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLLIQB.ascx.vb" Inherits="vistas_NN_NNLLIQB" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LIQUIDACIONES EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nnmliqb" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nnlliqb" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                 
                <div class="row-fluid">
                    <div class="span12">
                      
                                <table id="tbl_liq_empl" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th style="display:none">CÓDIGO
                                            </th>
                                            <th style="display:none">ARCHIVO
                                            </th>
                                             <th style="text-align:left ">EMPLEADO
                                            </th>
                                             <th>DNI
                                            </th>
                                             <th>FECHA LIQ.
                                            </th>
                                             <th>DESCARGAR
                                            </th>
                                        </tr>
                                    </thead>

                                </table>
                   
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hfarchivo" runat="server" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMLIQB.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLLIQB.init();

    });
</script> 