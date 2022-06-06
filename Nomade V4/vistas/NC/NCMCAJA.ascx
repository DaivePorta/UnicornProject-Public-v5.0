<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCAJA.ascx.vb" Inherits="vistas_NC_NCMCAJA" %>
<script type="text/javascript" src="../../recursos/plugins/select2/select2.min.js"></script>

<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO CAJA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmcaja"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclcaja"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="caja">
                <div class="row-fluid">
                    <div class="alert alert-error hide">
                        <button class="close" data-dismiss="alert"></button>
                        Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                    </div>
                    <div class="alert alert-success hide">
                        <button class="close" data-dismiss="alert"></button>
                        Datos ingresados correctamente.
                    </div>
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresas">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="cboEmpresas" class="m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
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
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc1">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <input type="text" class="span12" id="txtdesc1" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboResp">
                                    Responsable</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtResp" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc2">
                                    Tipo de Caja</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipo" class="m-wrap span12 required" data-placeholder="Seleccionar Tipo de Caja" tabindex="1">
                                        <option value="T">TERMINAL PUNTO DE VENTA</option>
                                        <option value="C">CAJA CENTRAL</option>
                                        <option value="R">RECAUDADORA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtTelefono">
                                    Teléfono</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" class="span12" id="txtTelefono" maxlength="20"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="span12">
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Cuenta Contable</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboctaContable" class="span12" data-placeholder="Cuenta Contable"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span12" id="p_estado" style="display: none">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc2">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkEstado" checked /><span> Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="adicionales" style="display: none">
                    <div class="span12" style="padding: 5px 20px">
                        <div class="tabbable tabbable-custom boxless">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#cajeros" data-toggle="tab"><i class=""></i>Cajeros</a></li>
                                <li><a href="#impresoras" data-toggle="tab"><i class=""></i>Impresoras</a></li>
                                <li><a href="#pos" data-toggle="tab"><i class=""></i>POS Tarjeta</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="cajeros" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label for="txtNuevoCajero">Añadir Nuevo Cajero</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtNuevoCajero" placeholder="NUEVO CAJERO" class="span12" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" class="btn blue" onclick="agregarCajero()"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <table class="table table-bordered table-hover" id="tblCajeros" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center; width: 15%">USUARIO</th>
                                                    <th>CAJERO</th>
                                                    <th style="text-align: center; width: 15%">RESPONSABLE</th>
                                                    <th style="text-align: center; width: 10%">ESTADO</th>
                                                    <th style="text-align: center; width: 10%">CAMBIAR ESTADO</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane" id="impresoras" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label for="txtNuevasImp">Añadir Nueva Impresora</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtNuevasImp" placeholder="NUEVA IMPRESORA" class="span12" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" class="btn blue" onclick="agregarImpresora()"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <table class="table table-bordered table-hover" id="tblImpresoras" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>IMPRESORA</th>
                                                    <th style="text-align: left; width: 30%">N SERIE</th>
                                                    <th style="text-align: center; width: 10%">TIPO</th>
                                                    <th style="text-align: center; width: 10%">ESTADO</th>
                                                    <th style="text-align: center; width: 10%">Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane" id="pos" style="padding: 5px">
                                    <div class="row-fluid">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label for="txtPOS">Añadir Nuevo POS</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtPOS" placeholder="NUEVO POS" class="span12" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button type="button" class="btn blue" onclick="agregarPOS()"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <table class="table table-bordered table-hover" id="tblPOS" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>POS</th>
                                                    <th style="text-align: left; width: 20%">N SERIE</th>
                                                    <th style="text-align: center; width: 8%">TIPO</th>
                                                    <th style="text-align: center; width: 6%">ESTADO</th>
                                                    <th style="text-align: center; width: 5%">Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
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
        <input type="hidden" id="hfCOD_CAJA" />
        <input type="hidden" id="hfUSUA_ID_NC" />
        <input type="hidden" id="hfCOD_NIMP" />
        <input type="hidden" id="hfCOD_NPOST" />
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
    </div>

</div>
<script type="text/javascript" src="../vistas/NC/js/NCMCAJA.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMCAJA.init();
    });
</script>
