<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMBANC.ascx.vb" Inherits="vistas_NC_NCMBANC" %>

<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue" id="p_banco">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO BANCOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMBANC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLBANC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <style>
                #caja div.span12 {padding: 8px}
            </style>
            <div class="portlet-body" id="caja">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <input id="txtCodigo" class="span3" style="text-align: center" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="chkEstado">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="checkbox" id="chkEstado" checked="checked" /><span>Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCodSunat">
                                    Código SUNAT</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div2">
                                    <input type="text" id="txtCodSunat" class="span3" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtDescSunat">
                                    Descripción SUNAT</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <input type="text" class="span12" id="txtDescSunat" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtPersona">
                                    Persona Jurídica</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtPersona" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNombreComercial">
                                    Nombre Comercial</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombreComercial" disabled="disabled" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label span4" for="txtNombreComercial">
                                        RUC</label>
                                    <input type="text" id="txtRuc" class="span8" style="text-align: center" disabled />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <a class="btn green" href="?f=ncmpers" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                <a class="btn blue" id="btnver" target="_blank"><i class="icon-eye-open" style="line-height: initial"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaVigente">
                                    Fecha Vigente</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" class="span4" id="txtFechaVigente" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaTermino">
                                    Fecha Término</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" class="span4" id="txtFechaTermino" disabled="disabled" />
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
            <div class="span12"></div>
        </div>
    </div>
    <div>
        <input type="hidden" id="hfPIDM" />
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMBANC.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMBANC.init();
    });
</script>
