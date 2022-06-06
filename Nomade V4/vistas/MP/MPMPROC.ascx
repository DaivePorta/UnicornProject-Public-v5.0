<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMPROC.ascx.vb" Inherits="vistas_MP_MPMPROC" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PROCESO PRODUCTIVO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMPROC" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLPROC" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="txtCodigo" >Código</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtCodigo" class="span12" disabled placeholder="Generado" style="text-align: center" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label span8" for="chkEstado" style="text-align: center">Activo</label>
                                <input id="chkEstado" type="checkbox" checked="checked" class="span4" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="txtProceso">Proceso</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtProceso" class="span12" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="txtDescripcion">Descripción</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <textarea class="span12" id="txtDescripcion" rows="5"></textarea>
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

<script type="text/javascript" src="../vistas/MP/js/MPLPROC.js"></script>
<script>
    jQuery(document).ready(function () {
        MPMPROC.init();
    });
</script>
