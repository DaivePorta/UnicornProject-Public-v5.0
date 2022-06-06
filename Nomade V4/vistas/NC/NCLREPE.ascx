<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLREPE.ascx.vb" Inherits="vistas_NC_NCLREPE" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA AFP Y REGIMEN PENSIONARIO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmrepe" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclrepe" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblRegimen" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                    <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>CÓDIGO DE SUNAT
                                    </th>
                                    <th>TIPO
                                    </th>
                                    <th>DESCRIPCIÓN 
                                    </th>
                                    <th>FECHA DE INICIO
                                    </th>
                                    <th>FECHA DE FIN
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>ACCIÓN
                                    </th>
                                </tr>
                            </thead>
                            
                        </table>                        
                        <asp:HiddenField ID="hfObjRegimen" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMREPE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLREPE.init();
        
    });
</script>
