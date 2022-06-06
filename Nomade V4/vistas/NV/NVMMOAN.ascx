<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMMOAN.ascx.vb" Inherits="vistas_NV_NVMMOAN" %>


<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;MANTENIMIENTO MOTIVO ANULACIÓN VENTA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NVMMOAN"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NVLMOAN"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodigo">
                                        Código</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCodigo" class="span12" type="text" placeholder="Código" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" >
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMotivo">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtMotivo" class="span12" placeholder="Motivo" />
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoMotivo">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoMotivo" class="span12" data-placeholder="Motivo">
                                    <option value="RC">RECHAZO DEL CLIENTE</option>
                                    <option value="AP">ANULACION DE PEDIDO</option>
                                    <option value="RS">RECHAZO SUNAT</option>
                                    <option value="OM">OTROS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>
                        </div>
                    </div>
                    <div class="span9">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtDescripcion" class="span12" placeholder="Descripción" style="resize: vertical;" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="form-actions">
                            <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input id="codigoEliminar" type="hidden" />

<script type="text/javascript" src="../vistas/NV/js/NVMMOAN.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVMMOAN.init();
    });
</script>
