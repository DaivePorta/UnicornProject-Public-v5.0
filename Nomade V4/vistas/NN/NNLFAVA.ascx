<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLFAVA.ascx.vb" Inherits="vistas_NN_NNLFAVA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>FALTAS Y TARDANZAS VALORIZADAS</h4>
                <div class="actions">
                   
                    <a id="btnMail" class="btn purple" style="margin-top: -10px;"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>
                     <a class="btn green" href="?f=NNLFAVA" style="margin-top: -10px;"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
              
                <div class="row-fluid">
                  <div class="span2"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label">Año</label>
                            <div class="controls">
                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label">Mes</label>
                            <div class="controls">
                                <input class="span12" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label">.</label>
                            <div class="controls">
                             <a id="btn_listar"  class="btn blue"><i class="icon-search"></i>&nbsp;Filtrar</a>
                                <%-- <a id="A1"  class="btn green"><i class="icon-cogs"></i>&nbsp;Generar</a>--%>
                                 <button class="btn green" type="button" onclick="ArmaCadena()" ><i class="icon-cogs"></i>&nbsp;Generar</button>
                            </div>
                        </div>
                    </div>



                </div>

              
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                    <div class="alert alert-error" id="msg" style="font-size: large; display: none;"></div>
                <div class="row-fluid">



                    <table id="tbl_ft_valorizado" class="display table-bordered" style="height: 54px; font-family: serif;">
                        <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                            <tr>
                                <th style="width: 10%; background-color: #00839A;">Empleado
                                </th>
                                <th style="width: 10%; background-color: #00839A;">Doct.Ident.
                                </th>
                                <th style="width: 10%; background-color: #00839A;">Cargo
                                </th>
                                <th style="width: 10%; background-color: #00839A;">Sueldo<br />(Basico)
                                </th>
                                <th style="width: 10%; background-color: #d84a38;">Faltas injustificadas(dias)
                                </th>
                                <th style="width: 10%; background-color: #d84a38;">Dscto Falta injustificadas
                                </th>
                                <th style="width: 10%; background-color: #F5B400;">Tardanzas totales(minutos)
                                </th>
                                <th style="width: 10%; background-color: #F5B400;">Dscto por Tardanzas
                                </th>
                                <th style="width: 10%; background-color: #00A300;">Horas Extras(minutos)
                                </th>
                                <th style="width: 10%; background-color: #00A300;">Abono por Horas Extras
                                </th>
                                <th style="width: 10%; background-color: #4b8df8;">Saldo Monetario
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        </div>

    </div>
</div>
<%--MODAL PARA ENVIAR CORREO--%>
<div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none ;">
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
     <input  type="hidden"  id="hftabla"/>
     <input  type="hidden"  id="hfctlg"/>
     <input  type="hidden"  id="hfscsl"/>
     <input  type="hidden"  id="hf_anio"/>
     <input  type="hidden"  id="hf_mes"/>
<script type="text/javascript" src="../vistas/NN/js/NNLFAVA.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLFAVA.init();


    });


</script>
