<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NRLNICA.ascx.vb" Inherits="vistas_NR_NRLNICA" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista Nivel en Cadena de Abastecimiento</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nrmnica" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nrlnica" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblNivelCadenaAbastecimiento" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>                                   
                                    <th>DESCRIPCION
                                    </th>                                    
                                    <th>ESTADO 
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjNivelCadenaAbastecimiento" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NR/js/NRMNICA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NRLNICA.init();

    });
</script>
