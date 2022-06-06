<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLRFIR.ascx.vb" Inherits="vistas_NC_NCLRFIR" %>
  <%--'hola--%>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE FIRMAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMRFIR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLRFIR" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable">
                            <thead>
                                <tr>                                   
                                    <th>CODIGO</th>
                                    <th>NOMBRE</th>
                                     <th style="display:none">pidm</th>
                               </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjJSON" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMRFIR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLRFIR.init();
    });
</script>
