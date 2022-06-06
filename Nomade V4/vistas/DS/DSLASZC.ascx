<%@ Control Language="VB" AutoEventWireup="false" CodeFile="DSLASZC.ascx.vb" Inherits="vistas_DS_DSLASZC" %>

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
                <h4><i class="icon-reorder"></i>LISTA ASIGNACIÓN ZONAS DISTRIBUCIÓN</h4>
                <div class="actions">
                    <!-- a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a-->
                    <a href="?f=DSMASZC" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=DSLASZC"><i class="icon-list"></i>&nbsp;Listar</a>

                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
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
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboZona">
                                Zona</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboZona" class="span12" data-placeholder="Zona">
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
                                <th>PIDM</th>
                                <th>SECUENCIA</th>
                                <th>EMPRESA</th>
                                <th>ESTABLECIMIENTO</th>
                                <th>CLIENTE</th>
                                <th>DIRECCIÓN</th>
                                <th>ZONA</th>
                                <th>VENDEDOR</th>
                                <th>DESASIGNAR</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue"><i class=" icon-save"></i>&nbsp;Desasignar</a>
                    <a class="btn" onclick="javascript:Cancelar();"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/DS/js/DSMASZC.js"></script>
<script>
    jQuery(document).ready(function () {
        DSLASZC.init();
    });
</script>
