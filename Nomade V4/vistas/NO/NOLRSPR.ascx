<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRSPR.ascx.vb" Inherits="vistas_NO_NOLRSPR" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE SOLICITUD DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NOMRSPR"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NOLRSPR"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div id="div" class="portlet-body">
                <div id="Div1" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="ESTADO">
                                    <option value="">TODOS</option>
                                    <option value="APROBADO">APROBADOS</option>
                                    <option value="POR APROBAR">POR APROBAR</option>
                                    <option value="PROGRAMADO">PROGRAMADO</option>
                                    <option value="TERMINADO">TERMINADOS</option>
                                    <option value="EJECUCION">EJECUCION</option>
                                    <option value="ANULADO">ANULADO</option>


                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <table  id="tblProductos" class="table table-hover">
                        <thead>
                            <tr>
                                <th style="text-align: center">CODIGO</th>
                                <th style="text-align: center">USUARIO</th>
                                <th style="text-align: left">GLOSA</th>
                                <th style="text-align: center">EMPRESA</th>
                                <th style="text-align: center">ESTABLECIMIENTO</th>
                                <th style="text-align: center">FECHA</th>
                                <th style="text-align: center">ESTADO</th>
                                <th style="text-align: left">APROBADO POR</th>
                            </tr>
                        </thead>
                        <tbody style="cursor: pointer"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NO/js/NOLRSPR.js"></script>
<script>

    jQuery(document).ready(function () {
        NOLRSPR.init();
    });

</script>
