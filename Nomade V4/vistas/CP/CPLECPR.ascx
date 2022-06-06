<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLECPR.ascx.vb" Inherits="vistas_CP_CPLECPR" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }
</style>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>ESTADO DE CUENTA CON PROVEEDORES</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple" style="margin-top: -10px;"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12 estable" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Proveedor</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtRuc" class="span3" type="text" disabled="disabled" />
                                <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_moneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="input_moneda">
                                <select id="cbo_moneda" class="span12" data-placeholder="Moneda">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid" id="bloqueTotales" style="display: none; margin-bottom: 10px;">
                        <div class="span6">
                            <div class="row-fluid">
                                <div class="span3 offset1">
                                    <strong>SALDO ACTUAL:</strong>
                                </div>
                                <div class="span3" style="font-size: 16px;">
                                    <span id="lblSimboloMoneda"></span>&nbsp;<span id="txtTotalMoneda">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div id="divBandeja">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>FECHA</th>
                                    <th>DESCRIPCIÓN</th>
                                    <th>DOCUMENTO/ACCIÓN</th>
                                    <th>NÚMERO DOC/ACCIÓN</th>
                                    <th>CARGO</th>
                                    <th>ABONO</th>
                                    <th>SALDO</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<%--MODAL PARA ENVIAR CORREO--%>
<div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
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
                                <input type="text" id="txtNRemitente" class="span12" disabled><input id="txtRemitente" type="hidden">
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
                                <select multiple="multiple" class="span12" id="cboCorreos"></select>
                                <%--<a href="?f=nclpers" target="_blank" title="Agregue correos en la pantalla Persona">Nuevo Correo</a>--%>
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
                        <textarea class="m-wrap" style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                        <div id="datos_correo">
                            <h4 id="lblEmpresa"></h4>
                            <h5 id="lblSucursal"></h5>
                            <h5 id="lblAsunto"></h5>

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


<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hftabla" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPLECPR.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLECPR.init();
    });
</script>