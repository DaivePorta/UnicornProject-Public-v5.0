<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLPASS.ascx.vb" Inherits="vistas_NS_NSLPASS" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA USUARIOS(CONTRASEÑA)</h4>
                <div class="actions">
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                                     <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display:none;">
                                    <thead>
                                        <tr>
                                            <th>ID
                                            </th>
                                            <th>NOMBRE
                                            </th>
                                            <th>FECHA ACTIVACION
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
<script type="text/javascript" src="../vistas/NS/js/NSMPASS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLPASS.init();
        
    });
</script>
