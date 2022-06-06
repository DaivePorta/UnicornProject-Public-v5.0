<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLZONA.ascx.vb" Inherits="vistas_NC_NCLZONA" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA ZONA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmzona" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nclzona" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblZonas" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO ZONA
                                    </th>
                                    <th>CODIGO SUNAT
                                    </th>
                                    <th>NOMBRE DE ZONA 
                                    </th>
                                    <th>NOMBRE CORTO 
                                    </th>
                                    <th>ESTADO 
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <asp:HiddenField ID="hfObjZonas" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMZONA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLZONA.init();
        
    });
</script>
