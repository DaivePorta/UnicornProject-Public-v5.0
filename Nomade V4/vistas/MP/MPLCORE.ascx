<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPLCORE.ascx.vb" Inherits="vistas_MP_MPLCORE" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PLANIFICACIONES DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMCORE" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLCORE" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12">
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
                                <label class="control-label span12" for="cboEmpresa">ESTABLECIMIENTO:</label>
                            </div>
                        </div>
                        <div class="span4">
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
                        <table id="tblLISTA" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>CODIGO</th>
                                    <th>ORFAB_CODE</th>
                                    <th>NRO O.F.</th>
                                    <th>ORDEN DE FABRICACION</th>
                                    <th>FECHA INCIAL</th>
                                    <th>FECHA LIMITE</th>
                                    <th>ESTADO</th>
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

<script type="text/javascript" src="../vistas/MP/js/MPMCORE.js"></script>
<script>
    jQuery(document).ready(function () {
        MPLCORE.init();
    });
</script>
