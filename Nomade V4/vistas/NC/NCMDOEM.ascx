<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMDOEM.ascx.vb" Inherits="vistas_NC_NCMDOEM" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO DOCUMENTOS EMITE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmdoem"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=ncldoem"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12" style="padding: 4px">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa2">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 4px">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboDocumento">
                                    Documento</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboDocumento" class="span12" data-placeholder="Tipo de Documento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodSunat">
                                        COD SUNAT</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCodSunat" class="span12" disabled="disabled" style="text-align: center" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Emisión electrónica</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="chkElec" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label">
                                    Desde</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtFechaElec" class="span8" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row-fluid" style="padding: 5px">
                    <div class="span2"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" style="text-align: center">
                                Emite</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="control-group">
                                <label class="control-label" style="text-align: center">
                                    Usa</label>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="padding: 5px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Gastos</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkGastosE" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkGastosU" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="padding: 5px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Almacén</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkAlmacenE" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkAlmacenU" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="padding: 5px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Compra/Venta</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkCVE" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkCVU" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                 <div class="row-fluid" style="padding: 5px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Casos Especiales</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkEEM" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls" style="text-align: center">
                                <input id="chkEUS" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="actualizar" class="btn blue hidden" href="javascript:Actualizar();"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>

            <input type="hidden" id="hf_codigo" />
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCMDOEM.js"></script>

<script>

    jQuery(document).ready(function () {
        NCMDOEM.init();
    });
</script>
