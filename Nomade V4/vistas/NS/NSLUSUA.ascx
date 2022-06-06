<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLUSUA.ascx.vb" Inherits="vistas_NS_NSLUSUA" %>
<div class="row-fluid">
    <div class="span12 ">

        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA USUARIOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmusua" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nslusua" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body"> 
              
                        <table id="divBandejaUsuarios" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>
                                    <th>USUARIO
                                    </th>
                                    <th>PERSONA
                                    </th>
                                    <th>FECHA INICIO
                                    </th>
                                    <th>FECHA LIMITE
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

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NS/js/NSMUSUA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLUSUA.init();
        
    });
</script>
