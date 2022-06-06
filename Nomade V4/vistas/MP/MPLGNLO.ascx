<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPLGNLO.ascx.vb" Inherits="vistas_MP_MPLGNLO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ORDEN DE PRODUCCION </h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMGNLO" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLGNLO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboEmpresas"></select>
                                </div>
                            </div>
                        </div>
                         <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEstablecimiento">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboEstablecimiento"></select>
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
                                    <th style="text-align: center">CODIGO</th>
                                    <th style="text-align: left">PRODUCTO</th>
                                    <th style="text-align: center">UNIDAD</th>
                                    <th style="text-align: right">CANTIDAD</th>                              
                                    <th style="text-align: left">RESPONSABLE</th>
                                    <th style="text-align: left">GLOSA</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/MP/js/MPLGNLO.js"></script>
<script>
    jQuery(document).ready(function () {
        MPLGNLO.init();
    });
</script>