<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLPOST.ascx.vb" Inherits="vistas_NC_NCLPOST" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE POS TARJETA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMPOST" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLPOST" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12" data-column="5">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">EMPRESA</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboEmpresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">ESTABLECIMIENTO</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLISTA" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>EMPRESA</th>
                                    <th>ESTABLECIMIENTO</th>
                                    <th>DESCRIPCION</th>
                                    <th>MARCA / MODELO</th>
                                    <th>NRO SERIE</th>
                                    <th>TIPO</th>
                                    <th>PREDETERMINADO</th>
                                    <th>ESTADO</th>
                                    <th>Cambiar Estado</th>
                                    <th>CTLG_CODE</th>
                                    <th>SCSL_CODE</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                        <asp:HiddenField ID="hfLISTA" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMPOST.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLPOST.init();
    });
</script>
