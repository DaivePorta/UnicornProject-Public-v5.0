<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCEPE.ascx.vb" Inherits="vistas_NC_NCLCEPE" %>
<style>
    .fondoHeader {
        background-color: white;
        text-align: center;
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
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA PERIODO TRIBUTARIO</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMCEPE" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
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


                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEstado">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstado" class="span12" data-placeholder="Estado">
                                        <option value="">TODOS</option>
                                        <option value="I">CERRADO</option>
                                        <option value="A">ABIERTO</option>
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
                                <th>CODIGO</th>
                                <th>PERIODO</th>
                                <th>COEFICIENTE (%)</th>
                                <th>ESTADO</th>
                                <th>FECHA CIERRE</th>
                                <th>USUARIO CIERRE</th>
                                <th>#</th>
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

<div id="modalModificar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h4 id="myModalLabel">Modificar Periodo Tributario</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">

            <div class="span8 offset2">
                <div class="control-group">
                    <label class="control-label">Periodo</label>
                    <div class="controls">
                        <input id="hfCtlg" type="hidden" />
                        <input id="hfCod" type="hidden" />
                        <input class="span12" id="txtPëriodo" type="text" disabled="disabled" style="text-align:center" />

                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span8 offset2">
                <div class="control-group">
                    <label class="control-label">Coeficiente/Porcentaje</label>
                    <div class="controls">
                        <input class="span6 offset3" id="txtCoeficiente" type="text" maxlength="6" onkeypress='return ValidaDecimales(event,this,2)' style="text-align:center" placeholder="(%)"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer">
        <button type="button" id="btnModificar" class="btn black">
            Modificar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCEPE.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLCEPE.init();
    });
</script>
