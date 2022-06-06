<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMFORP.ascx.vb" Inherits="vistas_MP_MPMFORP" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>FORMULACION DE PRODUCTOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=MPMFORP"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=MPLFORP"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span4" />
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
                                    <input type="hidden" id="txtALMC_CODE" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtPatente" style="text-align: center">Código Patente</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 tooltips" id="txtPatente" data-original-title="Código de la patente de la fórmula" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtProducto">Producto</label>
                            </div>
                        </div>
                        <div class="span7">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="hidden" id="txtCodigoProducto" />
                                    <input type="text" id="txtProducto" class="span10" disabled="disabled" />
                                    <a id="btnBuscar" class="btn tooltips blue" data-original-title="Buscar Producto" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboProceso">Proceso Productivo</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span8" id="cboProceso"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtHoras">Tiempo de fabricación</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtHoras" class="span5" />
                                    <select class="span7 pull-right" id="cboTiempo">
                                        <option value="H">horas</option>
                                        <option value="D">días</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCant">Cantidad</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCant" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: right" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboUMP" style="text-align: center">U.M.</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboUMP" class="span10" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#insumos" data-toggle="tab"><i class=""></i>Insumos</a></li>
                            <li><a href="#maquinarias" data-toggle="tab"><i class=""></i>Activos de Explotación</a></li>
                            <li><a href="#derivados" data-toggle="tab"><i class=""></i>Derivados</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="insumos" style="padding: 5px">
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtInsumo">Nuevo Insumo</label>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="hidden" id="txtCodigoInsumo" />
                                                    <input type="hidden" id="txtCodigoAntiguo" />
                                                    <input type="text" id="txtInsumo" class="span12" style="text-transform: uppercase" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtCantidad">Cantidad</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtCantidad" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboUM" style="text-align: right">U.M.</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboUM" class="span12" disabled="disabled"></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtMerma" style="text-align: right">Merma</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtMerma" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" id="btnAgregar" class="btn blue pull-right"><i class="icon-plus-sign"></i>&nbsp;Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-bordered " id="tblInsumos">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODE</th>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>INSUMO</th>
                                                    <th>INSUMO</th>
                                                    <th style="text-align: center">CANT</th>
                                                    <th style="text-align: center">MERMA</th>
                                                    <th style="text-align: center">UNID_CODE</th>
                                                    <th style="text-align: center">UNID MED</th>
                                                    <th style="text-align: center">QUITAR</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <label class="checkbox">
                                            <input type="checkbox" id="chkNombreComercial" /><span id="lblNombreComercial">Mostrar sólo el Nombre Comercial de los insumos</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="derivados" style="padding: 5px">
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtDerivado">Nuevo Derivado</label>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="hidden" id="txtCodigoDerivado" />
                                                    <input type="hidden" id="txtCodigoAntiguoDerivado" />
                                                    <input type="text" id="txtDerivado" class="span12" style="text-transform: uppercase" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtCantDerivado">Cantidad</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtCantDerivado" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboUMDerivado" style="text-align: right">U.M.</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboUMDerivado" class="span12" disabled="disabled"></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtCantDerivado" style="text-align: right">% de Costo</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtPorcentajeCosto" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" id="btnAgregarDerivado" class="btn blue pull-right"><i class="icon-plus-sign"></i>&nbsp;Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-bordered " id="tblDerivados">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODE</th>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>DERIVADO</th>
                                                    <th style="text-align: center">CANT</th>
                                                    <th style="text-align: center">UNID_CODE</th>
                                                    <th style="text-align: center">UNID MED</th>
                                                    <th style="text-align: center">% COSTO</th>
                                                    <th style="text-align: center">QUITAR</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="maquinarias" style="padding: 5px">
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="cboMaquinaria">Maquinaria / Equipo</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboMaquinaria" class="span12"></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtCantMAEQ" style="text-align: right">Cantidad</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtCantMAEQ" class="span12" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" id="btnAgregarMAEQ" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-bordered " id="tblMaquinarias">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>MAQUINARIA</th>
                                                    <th style="text-align: center">CANT</th>
                                                    <th style="text-align: center">QUITAR</th>
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
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divBuscarProducto" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 45%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarBien_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR PRODUCTO</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12">
                <table id="tblProductos" class="table ">
                    <thead>
                        <tr>
                            <th>CODE</th>
                            <th style="text-align: center">CODIGO</th>
                            <th>PRODUCTO</th>
                            <th>UNID_CODE</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un bien para seleccionarlo</h5>
    </div>
</div>
<input type="hidden" id="txtTipoCambio" />

<script type="text/javascript" src="../vistas/MP/js/MPMFORP.js"></script>
<script>
    jQuery(document).ready(function () {
        MPMFORP.init();
    });
</script>
