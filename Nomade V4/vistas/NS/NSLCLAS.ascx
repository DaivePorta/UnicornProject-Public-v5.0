<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLCLAS.ascx.vb" Inherits="vistas_NS_NSLCLAS" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>Lista Clases</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmclas" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nslclas" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        
                                <table id="tblClases" class="display DTTT_selectable" style="display:none;" border="0">
                                    <thead>
                                        <tr>
                                            <th>CÓDIGO
                                            </th>
                                            <th>DESCRIPCIÓN
                                            </th>
                                            <%--<th>SISTEMA
                                            </th>--%> 
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
<script type="text/javascript" src="../vistas/NS/js/NSMCLAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLCLAS.init();
        
    });
</script>
