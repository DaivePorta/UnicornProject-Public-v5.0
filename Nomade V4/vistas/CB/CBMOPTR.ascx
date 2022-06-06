<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBMOPTR.ascx.vb" Inherits="vistas_CB_CBMOPTR" %>
<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO OPERADOR DE TARJETA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CBMOPTR"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=CBLOPTR"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="operador">
                <div class="row-fluid" style="padding: 5px 10px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtPersona">
                                Persona Jurídica</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtPersona" class="span12" style="text-transform: uppercase" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a class="btn green" href="?f=NCMPERS" target="_blank" title="Nueva Persona Jurídica"><i class="icon-plus" style="line-height: initial"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 5px 10px">
                    <div class="span2" style="margin-left: 0">
                        <div class="control-group">
                            <label class="control-label" for="txtNombreComercial">
                                Nombre Comercial</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNombreComercial" class="span12" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 5px 20px">
                        <div class="tabbable tabbable-custom boxless" style="margin-bottom: 0px">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#tarjetas" data-toggle="tab"><i class=""></i>Marcas de Tarjeta</a></li>
                                <li class="hidden" id="liCuentaMN"><a href="#cuentaMN" data-toggle="tab"><i class=""></i>Cuenta a depositar en Moneda Nacional</a></li>
                                <li class="hidden" id="liCuentaME"><a href="#cuentaME" data-toggle="tab"><i class=""></i>Cuenta a depositar en Moneda Extranjera</a></li>
                                <li class="hidden" id="liComisiones"><a href="#Comisiones" data-toggle="tab"><i class=""></i>Comisiones</a></li>
                            </ul>
                            <div class="tab-content" style="padding-bottom: 5px">
                                <div class="tab-pane active" id="tarjetas" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span3">
                                            <div class="control-group">
                                                <label class="control-label" for="cboMarca">Agregar Nueva Marca de Tarjeta</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <select id="cboMarca" class="span12"></select>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <button id="btnagregarMarca" type="button" class="btn blue" title="Agregar Marca" data-tooltip="Agregar Marca" onclick="agregarNuevaMarca();"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="tblMarcas">
                                        <table id="tblMarcasOperador" class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>CODIGO</th>
                                                    <th style="width: 35%">MARCA</th>
                                                    <th style="width: 25%; text-align: center">ESTADO</th>
                                                    <th style="width: 20%; text-align: center">Cambiar Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody id="listaMarcaTarjetas"></tbody>
                                        </table>
                                    </div>
                                    <div class="alert alert-info" style="margin-top: 20px; margin-bottom: 0px; display: none" id="info">
                                        <strong>Info!</strong> Pulsa modificar para agregar las nuevas marcas añadidas a la tabla!
                                    </div>
                                </div>
                                <div class="tab-pane" id="cuentaMN" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboEmpresaMN">Empresa:</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group" id="controlEmpMN">
                                                <select id="cboEmpresaMN" class="span12"></select>
                                            </div>
                                        </div>
                                        <div class="span7">
                                            <button type="button" class="btn blue pull-right" id="btnNuevaCuentaMN"><i class="icon-circle-arrow-right"></i>&nbsp;Establecer Nueva Cuenta</button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <table class="table table-bordered table-hover" id="tblCuentasMN">
                                                <thead>
                                                    <tr>
                                                        <th>CUENTA</th>
                                                        <th style="text-align: center">VIGENCIA</th>
                                                        <th style="text-align: center">EMPRESA</th>
                                                        <th style="text-align: center">CTLG_CODE</th>
                                                        <th style="text-align: center">ESTADO</th>
                                                        <th style="text-align: center">Cambiar</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="cuentaME" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboEmpresaME">Empresa</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group" id="controlEmpME">
                                                <select id="cboEmpresaME" class="span12"></select>
                                            </div>
                                        </div>
                                        <div class="span7">
                                            <button type="button" class="btn blue pull-right" id="btnNuevaCuentaME"><i class="icon-circle-arrow-right"></i>&nbsp;Establecer Nueva Cuenta</button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <table class="table table-bordered table-hover" style="width: 100%" id="tblCuentasME">
                                                <thead>
                                                    <tr>
                                                        <th>CUENTA</th>
                                                        <th style="text-align: center">VIGENCIA</th>
                                                        <th style="text-align: center">EMPRESA</th>
                                                        <th style="text-align: center">CTLG_CODE</th>
                                                        <th style="text-align: center">ESTADO</th>
                                                        <th style="text-align: center">Cambiar</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="Comisiones" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtcdebito">DEBITO</label>
                                            </div>
                                        </div>
                                        <div class="span2">

                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <span class="add-on">%</span>
                                                    <input type="text" class="m-wrap span8" disabled="disabled" id="txtcdebito" />
                                                </div>

                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtccredito">CREDITO</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <span class="add-on">%</span>
                                                    <input type="text" class="m-wrap span8" disabled="disabled" id="txtccredito" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtcigv">IGV</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <span class="add-on">%</span>
                                                    <input type="text" class="m-wrap span8" disabled="disabled" id="txtcigv" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboEmpresaME">EMISORES</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <span class="add-on">%</span>
                                                    <input type="text" class="m-wrap span8" disabled="disabled" id="txtcemisores" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cboEmpresaME">OPERADOR</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <span class="add-on">%</span>
                                                    <input type="text" class="m-wrap span8" disabled="disabled" id="txtxoperadores" />
                                                </div>
                                            </div>
                                        </div>
                                          <div class="span3">
                                            <button type="button" class="btn blue pull-right" id="editarComisiones"><i class="icon-circle-arrow-right"></i>&nbsp;Editar Comisiones</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue" onclick="Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnActualizar" class="btn blue" onclick="Actualizar();" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <input type="hidden" id="hfOPTR_CODE" />
        <input type="hidden" id="hfPIDM" />
    </div>
</div>
<div id="divCuentaMN" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 35%; left: 53%" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-credit-card" style="line-height: initial;"></i>&nbsp;NUEVA CUENTA MONEDA NACIONAL</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="cboEmpresaNuevaCuentaMN">Empresa</label>
                    </div>
                </div>
            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select class="span12" id="cboEmpresaNuevaCuentaMN"></select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="cboNuevaCuentaMN">Cuenta</label>
                    </div>
                </div>
            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select class="span12" id="cboNuevaCuentaMN"></select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="txtFechaNuevaCuentaMN">Vigencia</label>
                    </div>
                </div>
            </div>
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" id="txtFechaNuevaCuentaMN">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn blue" onclick="establecerMN()">Establecer esta Cuenta</button>
    </div>
</div>
<div id="divCuentaME" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 35%; left: 53%" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-credit-card" style="line-height: initial;"></i>&nbsp;NUEVA CUENTA MONEDA EXTRANJERA</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="cboEmpresaNuevaCuentaME">Empresa</label>
                    </div>
                </div>
            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select class="span12" id="cboEmpresaNuevaCuentaME"></select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="cboNuevaCuentaME">Cuenta</label>
                    </div>
                </div>
            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select class="span12" id="cboNuevaCuentaME"></select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <label for="txtFechaNuevaCuentaME">Vigencia</label>
                    </div>
                </div>
            </div>
            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" id="txtFechaNuevaCuentaME">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn blue" onclick="establecerME()">Establecer esta Cuenta</button>
    </div>
</div>
<script type="text/javascript" src="../vistas/CB/js/CBMOPTR.js"></script>
<script>
    jQuery(document).ready(function () {
        CBMOPTR.init();
    });
</script>
