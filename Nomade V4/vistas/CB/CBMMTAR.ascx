<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBMMTAR.ascx.vb" Inherits="vistas_CB_CBMMTAR" %>
<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO MARCAS DE TARJETAS BANCARIAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CBMMTAR"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=CBLMTAR"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="marca">
                <div class="row-fluid">
                    <div class="span12"></div>
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span6" style="text-align: center" disabled />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label pull-right" for="chkEstado">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkEstado" /><span> Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span12"></div>
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtMarca">
                                    Marca</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <input type="text" class="span12" id="txtMarca" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span12"></div>
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoMarca">
                                    Tipo de Marca</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoMarca" class="m-wrap span12 required" data-placeholder="Seleccionar Tipo de Caja" tabindex="1">
                                        <option value="EM">EMISOR MUNDIAL</option>
                                        <option value="MC">MARCA COMPARTIDA</option>
                                        <option value="MP">MARCA PRIVADA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span12"></div>
                </div>
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue" onclick="Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnActualizar" class="btn blue" onclick="Actualizar();" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
            <div class="span12"></div>
        </div>
    </div>
    <div>
    </div>

</div>
<script type="text/javascript" src="../vistas/CB/js/CBMMTAR.js"></script>
<script>
    jQuery(document).ready(function () {
        CBMMTAR.init();
    });
</script>
