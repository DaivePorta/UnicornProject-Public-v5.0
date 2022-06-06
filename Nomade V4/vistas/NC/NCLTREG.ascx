<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTREG.ascx.vb" Inherits="vistas_NC_NCLTREG" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TIPO DE REGIMEN RENTA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmtreg" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=ncltreg" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                      
                                <table id="tbltipo_regimen" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO
                                            </th>
                                            <th>CÓDIGO SUNAT
                                            </th>
                                            <th>DESCRIPCIÓN
                                            </th>
                                            <th>EXONERADO I.G.V
                                            </th>
                                            <th>ESTADO
                                            </th>
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
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMTREG.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTREG.init();

    });
</script> 