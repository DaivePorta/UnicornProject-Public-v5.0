<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBMCMOP.ascx.vb" Inherits="vistas_CB_CBMCMOP" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>COMISIONES OPERADOR DE TARJETA</h4>
                <div class="actions">
                    <a href="?f=CBMCMOP" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CBLCMOP" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                <label class="control-label" for="cboOperador">Operador</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboOperador" class="span12" data-placeholder="Operador"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtComisionTotalDeb">Porcentaje de Comisión Total Débito</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtComisionTotalDeb" style="text-align: right" class="span6" onkeypress="return ValidaDecimales(event, this, 3)"/><span>&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11" style="padding: 4px">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtComisionTotalCre">Porcentaje de Comisión Total Crédito</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtComisionTotalCre" style="text-align: right" class="span6" onkeypress="return ValidaDecimales(event, this, 3)"/><span>&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtComisionEmisores">Porcentaje de Comisión de Emisores</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtComisionEmisores" style="text-align: right" class="span6" onkeypress="return ValidaDecimales(event, this, 3)"/><span>&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtComisionOperador">Porcentaje de Comisión de Operador</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtComisionOperador" style="text-align: right" class="span6" onkeypress="return ValidaDecimales(event, this, 3)"/><span>&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtIGV">Porcentaje de IGV</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtIGV" class="span6" style="text-align: right" onkeypress="return ValidaDecimales(event, this, 3)"/><span>&nbsp;%</span>
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
<div class="row-fluid hidden" id="datos">
    <div class="span6">
        <div class="portlet box yellow">
            <div class="portlet-title">
                <h4><i class="icon-arrow-down" contenteditable="true"></i>DEPRECIACION</h4>
                <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                    <a href="?f=nclimpr" target="_blank" class="config"></a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="scroller">
                    <div class="row-fluid">
                        <table class="table table-hovered" style="width: 100%" id="tblDepreciacion">
                            <thead></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="span6">
        <div class="portlet box green">
            <div class="portlet-title">
                <h4><i class="icon-map-marker" contenteditable="true"></i>HISTORIAL DE UBICACIONES</h4>
                <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                    <a href="?f=nclimpr" target="_blank" class="config"></a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="scroller">
                    <div class="row-fluid">
                        <table class="table table-hovered" style="width: 100%">
                            <thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CB/js/CBMCMOP.js"></script>
<script>
    jQuery(document).ready(function () {
        CBMCMOP.init();
    });
</script>
