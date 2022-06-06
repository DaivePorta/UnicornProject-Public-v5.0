<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPLCOEN.ascx.vb" Inherits="vistas_MP_MPLCOEN" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CONCEPTOS ENERGETICOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMCOEN" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLCOEN" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEmpresa">EMPRESA:</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboEmpresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboSucursal">ESTABLECIMIENTO:</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboSucursal"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLISTA" class="table table-hover display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="text-align: center">CODIGO</th>
                                    <th>DESCRIPCION</th>
                                    <th style="text-align: center">UNIDAD</th>
                                    <th style="text-align: center">VALOR</th>
                                    <th style="text-align: center">MONTO MN</th>
                                    <th style="text-align: center">ESTADO</th>
                                    <th style="text-align: center">Cambiar Estado</th>
                                    <th>CTLG_CODE</th>
                                    <th>SCSL_CODE</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/MP/js/MPMCOEN.js"></script>
<script>
    jQuery(document).ready(function () {
        MPLCOEN.init();
    });
</script>