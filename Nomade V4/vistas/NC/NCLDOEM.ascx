<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLDOEM.ascx.vb" Inherits="vistas_NC_NCLDOEM" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DOCUMENTOS EMITE</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMDOEM" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLDOEM" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 7px;">
                    <div class="span12">
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div class="span4">
                            <select id="cboEmpresa" class="span12"></select>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tDOEM" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>CODIGO SUNAT</th>
                                    <th>DESCRIPCION</th>
                                    <th>TIPO DOC</th>
                                    <th>GASTOS</th>
                                    <th>ALMACEN</th>
                                    <th>COMPRA/VENTA</th>
                                    <th>CASOS ESP.</th>
                                    <th>E. ELEC. DESDE</th>
                                    <th>ESTADO</th>
                                    <th>Cambiar Estado</th>
                                    <th>CTLG_CODE</th>
                                    <th>CODE</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfLISTA" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMDOEM.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLDOEM.init();
    });
</script>
