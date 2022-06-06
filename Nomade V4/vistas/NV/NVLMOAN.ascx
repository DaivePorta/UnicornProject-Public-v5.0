<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLMOAN.ascx.vb" Inherits="vistas_NV_NVLMOAN" %>

<style>
    .fondoHeader {
        /*background-color: #3A5567;*/
        background-color: white;
        text-align: center;
        /*color: #FFFFFF;*/
        color: black;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA MOTIVOS ANULACIÓN VENTA</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NVMMOAN" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="buscar" class="btn blue">FILTRAR</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" id="divTblDatos" style="margin-top: 2%; overflow-x: auto;">

                    <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                        <thead class="fondoHeader">
                            <tr>
                                <th>CÓDIGO</th>
                                <th>MOTIVO</th>
                                <th>DESCRIPCIÓN</th>
                                <th>TIPO</th>
                                <th>ESTADO</th>
                                <th>USUARIO</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVMMOAN.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLMOAN.init();
    });
</script>
