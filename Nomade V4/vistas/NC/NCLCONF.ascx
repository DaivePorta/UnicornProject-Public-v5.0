<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCONF.ascx.vb" Inherits="vistas_NC_NCLCONF" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA CONFIGURACION REGIONAL</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmconf" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclconf" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div id="divModalConfirmacion">
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCRegional" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>NOMBRE
                                    </th>
                                    <th>PAIS
                                    </th>
                                    <th>IDIOMA
                                    </th>
                                    <th>MONEDA
                                    </th>
                                    <th>ZONA HORARIA
                                    </th>
                                    <th>SEPARACION DECIMAL
                                    </th>
                                    <th>UBICACION SIMBOLO MONEDA
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjCRegional" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMCONF.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCONF.init();
       
    });
</script>
