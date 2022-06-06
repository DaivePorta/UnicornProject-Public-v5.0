<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLEPSS.ascx.vb" Inherits="vistas_NC_NCLEPSS" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA SITUACION EPS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmepss" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclepss" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblEPSS" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>CÓDIGO SUNAT 
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>OPCIÓN
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>ACCIÓN
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                        </table>
                        <asp:HiddenField ID="hfObjEPSS" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMEPSS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLEPSS.init();
        
    });

</script>
