<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLUPGS.ascx.vb" Inherits="vistas_NS_NSLUPGS" %>

<div class="row-fluid">
    <div class="span12 ">

        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>USUARIOS X GASTOS </h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>
                    <a id="btnImprimir" class="btn black"><i class="icon-print"></i>&nbsp Imprimir</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="limpiar combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" class="limpiar combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_filtro">
                                Filtro</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls" id="Div2">
                                    Del
                                    <input id="txt_fdel" data-date-format="dd/mm/yyyy" type="text" class="span10" />
                                </div>
                            </div>
                        </div>

                        <div class="span6">
                            <div class="control-group">
                                <div class="controls" id="Div3">
                                    Al
                                    <input id="txt_fal" data-date-format="dd/mm/yyyy" type="text" class="span10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span6" style="text-align: right;">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btn_imprimir" class="btn blue" href="javascript:rep_gastos_user();">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="row-fluid">
                    <div class="span12" id="tbUsrgastos">

                        <table id="tbl_gastos_usuario" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th style="text-align: center">GASTO
                                    </th>
                                    <th style="text-align: center">BENEFICIARIO
                                    </th>
                                    <th style="text-align: center">MONTO
                                    </th>
                                    <th style="text-align: center">SOLICITA
                                    </th>
                                    <th style="text-align: center">F.SOLICITA
                                    </th>
                                    <th style="text-align: center">APRUEBA
                                    </th>
                                    <th style="text-align: center">F.APRUEBA
                                    </th>
                                    <th style="text-align: center">PAGA
                                    </th>
                                    <th style="text-align: center">F.PAGO
                                    </th>
                                </tr>
                            </thead>

                        </table>

                    </div>
                </div>

            </div>

            <%--MODAL PARA ENVIAR CORREO--%>
            <div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
                <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
                    <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                        <i class="icon-remove"></i>
                    </button>
                    <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
                </div>
                <div class="modal-body" style="max-height :82%; height:100%;">
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

        </div>
    </div>
</div>
     <input  type="hidden"  id="hftabla"/>
     <input  type="hidden"  id="hfctlg"/>
     <input  type="hidden"  id="hfscsl"/>
     <input  type="hidden"  id="hf_anio"/>
     <input  type="hidden"  id="hf_mes"/>
<script src="../vistas/NS/js/NSLUPGS.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLUPGS.init();
    });
</script>
