<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMPLOT.ascx.vb" Inherits="vistas_NO_NOMPLOT" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-credit-card"></i>REGISTRO DE COMPRAS RAPIDAS</h4>
                <div class="actions">
                    <%--<a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Mail</a>--%>
                    <%--<a class="btn black" id="btnImprimir"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=nomplot" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nolplot" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="alert alert-error hide">
                    <button class="close" data-dismiss="alert"></button>
                    Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                </div>
                <div class="alert alert-success hide">
                    <button class="close" data-dismiss="alert"></button>
                    Datos ingresados correctamente.
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hfempresa" runat="server" />
                                    <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcSucural" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="wow-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txtCodProveedor">
                                        Proveedor
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 m-wrap required" id="txtCodProveedor" name="txtCodProveedor" placeholder="RUC" disabled />
                                    <input type="hidden" id="hfPIDM" class="required" />
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 m-wrap required" id="txtDesProveedor" name="txtDesProveedor" placeholder="Ingrese Razón Social" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txtFecTransaccion" data-date-format="dd/mm/yyyy">
                                        Fecha Transacción
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="fecha span12 m-wrap required" name="txtFecTransaccion" id="txtFecTransaccion" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txtCenCostos">
                                        Centro Costo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 m-wrap required" id="txtCenCostos" name="txtCenCostos" />
                                    <input type="hidden" id="idCostos" class="required" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="cboconceptos">
                                        Seleccionar Concepto
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="required m-wrap span12 combo" data-placeholder="Seleccionar Concepto" tabindex="1" id="cboconceptos" name="cboconceptos">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="required m-wrap span12 combo" data-placeholder="Seleccionar SubConcepto" tabindex="1" id="cbosubconcepto" name="cbosubconcepto">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="sclMoneda">Moneda</label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="con_moneda">
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="sclDocumento">
                                        Tipo Documento
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="sclDocumento" name="sclDocumento" class="combo m-wrap span12 required" data-placeholder="Seleccionar Documento" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="sclMopa">
                                        Modo de Pago
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="sclMopa" name="sclMopa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Tipo" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label">
                                        T. C.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" value="0.00" id="txt_tcambio" name="txt_tcambio" class="span12 m-wrap" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoBien">
                                Tipo Bien</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <select id="cboTipoBien" class="span12 limpiar required" data-placeholder="Tipo Bien">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="clearfix">
                        <div class="btn-group">
                            <button id="agregar" class="btn green">
                                Agregar Nueva Línea <i class="icon-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12" style="overflow-x: scroll;">
                        <table id="tblDocumentos" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Fecha</th>
                                    <th>Serie</th>
                                    <th>Número</th>
                                    <th>Gravada</th>
                                    <th>Base Imponible</th>
                                    <th>Impuesto</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="form-actions" id="acciones_generales" style="display: block;">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>

            </div>
        </div>
    </div>

    <div id="divMail" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn close_mail red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="divMail_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
        </div>
        <div class="modal-body">
            <div class="row-fluid">
                <div class="span12" id="divMail_body">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">De:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Para:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <select multiple class="span12" id="cboCorreos"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Asunto:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtAsunto" class="span12">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12" style="padding: 10px; border: thin inset">
                            <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                            <div id="datos_correo">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
        </div>
    </div>
</div>

<div id="divDctoImprimir" style="display: none;"></div>


<script src="../vistas/NO/js/NOMPLOT.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMPLOT.init();

    });
</script>
