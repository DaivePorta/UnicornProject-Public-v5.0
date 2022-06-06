<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALMVMT.ascx.vb" Inherits="vistas_NA_NALMVMT" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA METODOS VALUACION MATERIALES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nammvmt" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nalmvmt" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblMVMateriales" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>EMPRESA 
                                    </th>
                                    <th>METODO
                                    </th>                                    
                                    <th>ESTADO 
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjMVMateriales" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NA/js/NAMMVMT.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALMVMT.init();

    });
</script>
