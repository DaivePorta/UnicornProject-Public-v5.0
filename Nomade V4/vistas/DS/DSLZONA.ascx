<%@ Control Language="VB" AutoEventWireup="false" CodeFile="DSLZONA.ascx.vb" Inherits="vistas_DS_DSLZONA" %>

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
                <h4><i class="icon-reorder"></i>LISTAR DE ZONAS DISTRIBUCIÓN</h4>
                <div class="actions">
                    <a id="btnImprimir" href="javascript:imprimirDiv('divTblDatos');" class="btn black"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=DSMZONA" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
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
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimiento">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" >
                                    <select id="cboEstablecimiento" class="span12 estable" data-placeholder="Establecimiento">
                                    </select>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimiento">
                                    Estado de Zona</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" >
                                    <select id="cboEstado" class="span12" data-placeholder="Estado Zona">
                                        <option value="">TODOS</option>
                                        <option value="A">ACTIVO</option>
                                        <option value="I">INACTIVO</option>
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
                <div class="row-fluid" id="divTblDatos" style="margin-top: 2%; overflow-x: auto;">

                    <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                        <thead class="fondoHeader">
                            <tr>
                                <th>CODIGO</th>
                                <th>ZONA</th>
                                <th>DESCRIPCIÓN</th>
                                <th>VENDEDOR</th>
                                <th>ESTABLECIMIENTO</th>
                                <th>ESTADO</th>
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
<script type="text/javascript" src="../vistas/DS/js/DSMZONA.js"></script>
<script>
    jQuery(document).ready(function () {
        DSLZONA.init();
    });
</script>
