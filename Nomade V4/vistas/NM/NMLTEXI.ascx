<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLTEXI.ascx.vb" Inherits="vistas_NM_NMLTEXI" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista Tipos de Existencias</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nmmtexi" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nmltexi" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblTipoexistencias" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>CÓDIGO SUNAT 
                                    </th>
                                    <th>DESCRIPCIÓN
                                    </th> 
                                    <th>ALMACENABLE
                                    </th>                                   
                                    <th>ESTADO 
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjTipoexistencias" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NM/js/NMMTEXI.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLTEXI.init();

    });
</script>
