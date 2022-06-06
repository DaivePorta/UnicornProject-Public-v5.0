<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPLFORP.ascx.vb" Inherits="vistas_MP_MPLFORP" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE FORMULACIONES DE PRODUCTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMFORP" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLFORP" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLISTA" class="table table-hover DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="text-align: center">CODIGO</th>
                                    <th>PRODUCTO</th>
                                    <th>PROCESO</th>
                                    <th style="text-align: center">PATENTE</th>
                                    <th style="text-align: center">CANTIDAD</th>
                                    <th style="text-align: center">UNIDAD</th>
                                    <th style="text-align: center">ESTADO</th>
                                    <th style="text-align: center">Cambiar Estado</th>
                                    <th>CTLG_CODE</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/MP/js/MPMFORP.js"></script>
<script>
    jQuery(document).ready(function () {
        MPLFORP.init();
    });
</script>
