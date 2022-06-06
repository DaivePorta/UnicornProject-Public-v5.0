<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMAUTD.ascx.vb" Inherits="vistas_NC_NCMAUTD" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>AUTORIZACION DE COMPROBANTE DE PAGO O DOCUMENTOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMAUTD"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLAUTD"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear:both;"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtcodigo" class="span10" disabled="disabled" type="text" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="chkEstado">
                                    Activo</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="span11">
                                <div class="control-group">
                                    <label class="control-label" for="txtEmision">
                                        Emisión
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtEmision" class="span10" style="text-align: center" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span11 empresa" data-placeholder="Empresa">
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
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span11" data-placeholder="Establecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoDocumento">
                                    Tipo Documento (Req Formato)</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoDocumento" class="span10" data-placeholder="Tipo de Documento">
                                        <option></option>
                                    </select>&nbsp;&nbsp;
                                    <a href="?f=NCLDOEM" target="_blank" class="btn green"><i class="icon-plus" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNroAutorizacion">
                                    Nro Autorización</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNroAutorizacion" class="span11" maxlength="35" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboCorrelativo">
                                    Correlativo (Req Tipo Documento)</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCorrelativo" class="span11" data-placeholder="Correlativo"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label hidden" id="lblEnlace" for="cboEnlace"></label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEnlace" class="span11 hidden">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoCampo">
                                    Tipo Campo</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoCampo" class="span10" data-placeholder="Tipo Campo">
                                        <option value="*">ALFANUMERICO</option>
                                        <option value="9">NUMERICO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label span7" for="txtNroDigitos" style="text-align: left">Nro Dígitos</label>
                                    <input type="text" id="txtNroDigitos" class="span4" style="text-align: left" />
                                </div>
                            </div>
                            <%--<div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtNroDigitos" class="span6" style="text-align: center" />
                                    </div>
                                </div>
                            </div>--%>
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label span7" for="txtNroLineas" style="text-align: left">Nro Líneas</label>
                                    <input type="text" id="txtNroLineas" class="span4" style="text-align: left" />
                                </div>
                            </div>
                            <%--<div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtNroLineas" class="span6" style="text-align: center" />
                                    </div>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboFormato">
                                    Formato</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboFormato" class="span11" data-placeholder="Formato">
                                        <option value=""></option>
                                        <option value="F" id="optF">FORMATO IMPRESO</option>
                                        <option value="P" id="optP" disabled>PAPEL EN BLANCO</option>
                                        <option value="E" id="optE" disabled>ELECTRONICO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="hidden" id="divImprenta">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtImprenta">
                                        Imprenta</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtImprenta" class="span8" style="text-transform: uppercase" />&nbsp;&nbsp;
                                        <a href="?f=nrmgepr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a>
                                        <a id="btnRecargarImprentas" class="btn green" style="margin-top: -9px"><i class="icon-refresh" style="line-height: initial"></i></a>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                        <div class="hidden" id="divImpresoras">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtImpresora">
                                        Impresora</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtImpresora" class="span8" style="text-transform: uppercase" placeholder="Impresoras Tiketeras" />&nbsp;&nbsp;
                                         <a href="?f=ncmimpr" target="_blank" class="btn green" style="margin-top: -9px"><i class="icon-plus" style="line-height: initial"></i></a>
                                        <a id="btnRecargarImpresoras" class="btn green" style="margin-top: -9px"><i class="icon-refresh"  style="line-height: initial"></i></a>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtSerie">
                                    Serie</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12" id="txtSerie" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label span6" for="txtIni">Valor Inicio</label>
                                    <input type="text" id="txtIni" class="span6" style="text-transform: uppercase; text-align: center" onkeyup="ini = $(this).val()" />
                                </div>
                            </div>
                            <%--<div class="span3">
                                <div class="control-group">
                                    <div class="controls" id="divTxtIni">
                                        <input type="text" id="txtIni" class="span11" style="text-transform: uppercase; text-align: center" onkeyup="ini = $(this).val()" />
                                    </div>
                                </div>
                            </div>--%>                            

                            <div class="span5 valor_fin hidden">
                                <div class="control-group">
                                    <label class="control-label span6" for="txtFin">Valor Fin</label>
                                    <input type="text" id="txtFin" class="span6" style="text-transform: uppercase; text-align: center" onkeyup="fin = $(this).val()" />
                                </div>
                            </div>
                            <%--<div class="span3 valor_fin hidden">
                                <div class="control-group">
                                    <div class="controls" id="divTxtFin">
                                        <input type="text" id="txtFin" class="span11" style="text-transform: uppercase; text-align: center" onkeyup="fin = $(this).val()" />
                                    </div>
                                </div>
                            </div>--%>
                            
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEstado">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstado" class="span8" disabled="disabled">
                                        <option value="E">EMITIDO</option>
                                        <option value="V">VIGENTE</option>
                                        <option value="T">TERMINADO</option>
                                        <option value="A">ANULADO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid show_autorizacion" style="display: none; padding: 4px">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkAutorizacion">
                                Formato Ticket</label>
                        </div>
                    </div>
                    <div class="span2" style="margin-left: 18px;">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkAutorizacion" type="checkbox" checked="checked" class="span12" />
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
        </div>
    </div>
</div>
<div>
    <input type="hidden" id="hfIMPRENTA_PIDM" />
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMAUTD.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMAUTD.init();
    });
</script>
