<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMCOFL.ascx.vb" Inherits="vistas_MP_MPMCOFL" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ADMINISTRACION DE FLOTAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=MPMCOFL"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=MPLCOFL"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">Código</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigo" class="span4" disabled="disabled" placeholder="Generado" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label span8" for="chkEstado">Activo</label>
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span4" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboSucursal">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Establecimiento"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtOrdenFlujo">Orden de Flujo</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigoOrdenFlujo" class="span2" disabled="disabled" style="text-align: center" />
                                    <input type="text" id="txtOrdenFlujo" class="span8" style="text-transform: uppercase" disabled="disabled" />
                                    <a id="btnBuscarOrdenFlujo" class="btn blue" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFlota">Flota</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="hidden" id="txtCodigoFlota" />
                                    <input type="text" id="txtFlota" class="span10" style="text-transform: uppercase" disabled="disabled" />
                                    <a id="btnBuscarFlota" class="btn blue" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaInicio">Fecha Inicio</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaInicio" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaFin" style="text-align: right">Fecha Fin</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaFin" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divBuscarOrden" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarOrden_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR ORDEN DE FLUJO</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarOrden_body">
                <table class="table table-hover" id="tblOrdenes">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">PRODUCTO</th>
                            <th style="text-align: center">TOTAL</th>
                            <th style="text-align: center">U.M.</th>
                            <th style="text-align: center">FASE</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en una orden de flujo para seleccionarla.</h5>
    </div>
</div>
<div id="divBuscarFlota" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarFlota_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR FLOTA</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarFlota_body">
                <table class="table table-hover" id="tblFlotas">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">BIEN</th>
                            <th style="text-align: center">SERIE</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en una flota para seleccionarla.</h5>
    </div>
</div>
<script type="text/javascript" src="../vistas/MP/js/MPMCOFL.js"></script>
<script>
    jQuery(document).ready(function () {
        MPMCOFL.init();
    });
</script>
