<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCAJA.ascx.vb" Inherits="vistas_NC_NCLCAJA" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE CAJAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMCAJA" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLCAJA" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12" data-column="5">
                        <div class="span1"><b>EMPRESA</b></div>
                        <div class="span3">
                            <select id="cboEmpresas" class="span12"></select>
                        </div>
                        <div class="span2" style="text-align: center"><b>ESTABLECIMIENTO</b></div>
                        <div class="span3" id="controlest">
                            <select id="cboEstablecimiento" class="span12"></select>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblCajas" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>EMPRESA</th>
                                    <th>ESTABLECIMIENTO</th>
                                    <th>NOMBRE CAJA</th>
                                    <th>TIPO CAJA</th>
                                    <th>RESPONSABLE</th>
                                    <th>TELEFONO</th>
                                    <th>ESTADO</th>
                                    <th>Cambiar Estado</th>
                                    <th>CTLG</th>
                                    <th>SCSL</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                        <asp:HiddenField ID="hfCajas" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMCAJA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCAJA.init();
    });
</script>