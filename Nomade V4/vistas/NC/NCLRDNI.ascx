<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLRDNI.ascx.vb" Inherits="vistas_NC_NCLRDNI" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE DOCUMENTOS DE IDENTIDAD REGISTRADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMRDNI" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLRDNI" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" style="display:none;">
                            <thead>
                                <tr>                                   
                                    <th>DOCUMENTO DE IDENTIDAD</th>
                                    <th>NOMBRE</th>
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

<script type="text/javascript" src="../vistas/NC/js/NCMRDNI.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLRDNI.init();
    });
</script>