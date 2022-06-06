<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMPOST.ascx.vb" Inherits="vistas_NC_NCMPOST" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>POS TARJETA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMPOST"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLPOST"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtcodigo" class="span8" disabled="disabled" type="text" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    Activo
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="span10">
                                <div class="control-group">
                                    <label class="control-label" for="txtFecha">
                                        Fecha
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFecha" class="span10" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    Predeterminado
                                    <input id="chkPredeterminado" type="checkbox" class="span12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span10">
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
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtMarca">
                                    Marca / Modelo</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtMarca" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcion">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDescripcion" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtSerie">
                                    Nro. de Serie</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtSerie" class="span8" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtSerie">
                                    Tipo de Conexión</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipo" class="span12" data-placeholder="Tipo de Conexión">
                                        <option value="W">INALAMBRICO</option>
                                        <option value="T">TELEFONICO</option>
                                        <option value="I">INTERNET</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px; display: none" id="operadores">
                    <div class="span10">
                        <fieldset>
                            <legend>Operadores de Tarjeta</legend>
                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label for="txtOperador">Nuevo Operador de Tarjeta</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtOperador" class="span9" style="text-transform: uppercase" />&nbsp;
                                            <button type="button" id="btnAgregarOperador" class="btn blue" style="margin-top: -10px"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                            &nbsp;<a href="?f=CBMOPTR" target="_blank" class="btn green" style="margin-top: -10px"><i class="icon-plus" style="line-height: initial"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <table class="table table-bordered table-hover" id="tblOperadores">
                                        <thead>
                                            <tr>
                                                 <th style="text-align: center">PRINCIPAL</th>
                                              
                                                <th>OPERADOR</th>
                                                <th style="text-align: center">NOMBRE COMERCIAL</th>
                                                <th style="text-align: center">ESTADO</th>
                                                <th style="text-align: center">Inhabilitar</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </fieldset>
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
<input type="hidden" id="hfOPERADOR_PIDM" />
<input type="hidden" id="hfOPERADOR_CODIGO" />

<script type="text/javascript" src="../vistas/NC/js/NCMPOST.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMPOST.init();
    });
</script>
