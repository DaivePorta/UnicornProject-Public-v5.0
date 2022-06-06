<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLVANU.ascx.vb" Inherits="vistas_NF_NFLVANU" %>
<style>
    /*table {
    border : 2px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 10px;
    margin:  15px;
}

table#tblbmodal th	{
    background-color: black;
    color: white;
    font-size:large;   
}

table#tblbmodal2 th	{
    background-color: black;
    color: white;
    font-size:large;   
}*/
</style>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Cálculo del IGV y Anticipo Renta 3ra</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>
                    <a id="btnImprimir" href="javascript:imprimirDiv('tblProductos');" class="btn black"><i class="icon-print"></i>&nbsp Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <label class="control-label" for="slcEmpresa">Empresa</label>
                    </div>
                    <div class="span4">
                        <div class="controls">
                            <select id="slcEmpresa" class="span12" data-placeholder="EMPRESA">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label" for="cboSucursal">Establecimiento</label>
                    </div>
                    <div class="span4">
                        <div class="controls">
                            <select id="slcscsl" class="span12" data-placeholder="ESTABLECIMIENTO">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <label class="control-label" for="slcAnio">Año</label>
                    </div>

                    <div class="span4">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="slcAnio">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <label class="control-label" for="slcMes">Mes</label>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12" id="slcMes" data-date-format="MM" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <a id="buscar" class="btn blue"><i class="icon-find"></i>FILTRAR</a>
                    </div>

                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <label id="NombreEmpresa" class="control-label"></label>
                    </div>
                </div>

                <div class="row-fluid" align="center" id="txtTitulo">
                </div>
                <div class="row-fluid" align="center" id="txtFecha">
                </div>

                <div class="row-fluid">
                    <%--<div class="span3" >&nbsp;</div> --%>
                    <div id="tblProductos" class="span12">
                        <%--<div class="span3" >&nbsp;</div>--%>
                    </div>
                </div>
                <%--<td colspan="3" style="color:white;background-color:#b0b0b0;font:bold,xx-large;width:5%;">--%>
                <%--<table id="tblBandeja" border="0">  <%--class="display  DTTT_selectable"
                     <thead>
                          <tr align="center">
                              <th></th>
                              <th>BASE IMPONIBLE</th>
                              <th>TRIBUTO</th>
                          </tr>
                     </thead>
                </table>--%>
                <%--<asp:HiddenField ID="hfObjJson" runat="server" />--%>
            </div>

            <%--MODAL PARA ENVIAR CORREO--%>
            <div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
                <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
                    <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                        <i class="icon-remove"></i>
                    </button>
                    <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
                </div>
                <div class="modal-body" style="max-height: 82%; height: 100%;">
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
                                        <h2 id="lblEmpresa"></h2>
                                        <h2 id="lblSucursal"></h2>
                                        <h1 id="lblAsunto"></h1>
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
        </div>
    </div>
</div>
<input type="hidden" id="hftabla" />
<input type="hidden" id="hfctlg" />
<input type="hidden" id="hfscsl" />
<input type="hidden" id="hf_anio" />
<input type="hidden" id="hf_mes" />
<script type="text/javascript" src="../vistas/NF/js/NFLVANU.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLVANU.init();

    });
</script>
