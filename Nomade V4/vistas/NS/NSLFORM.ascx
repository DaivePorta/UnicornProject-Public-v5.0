<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLFORM.ascx.vb" Inherits="vistas_NS_NSLFORM" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>Lista Formas</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmform" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nslform" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                      
                                <table id="tblFormas" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO
                                            </th>
                                            <th>DESCRIPCIÓN
                                            </th>
                                            <th>SISTEMA
                                            </th>
                                            <th>FECHA_CREACIÓN
                                            </th>
                                             <th>TIPO
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
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NS/js/NSMFORM.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLFORM.init();
        
    });
</script> 

