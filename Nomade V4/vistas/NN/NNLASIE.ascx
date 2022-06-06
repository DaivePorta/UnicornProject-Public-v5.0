<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLASIE.ascx.vb" Inherits="vistas_NN_NNLASIE" %>
<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE ASISTENCIAS DE  LOS EMPLEADOS</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple" style="margin-top: -10px;"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">
                      <div class="span3"></div>
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo m-wrap span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span3"></div>
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Empleado</label>
                            <div class="controls" id="input_empl">
                                <input type="text" class="span12" id="txt_empleado">
                            </div>
                        </div>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span8" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                <div class="row-fluid">
                    <div class="span12" style="text-align: center;">
                        <i class="icon-user" style="font-size: -webkit-xxx-large;"></i>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="nombre_empl" style="text-align: center;">-</div>
                </div>
                <div class="row-fluid">
                    <%--   <div class="span1"></div>--%>
                    <div class="span12">
                        <table id="tbl_mis_marcaciones" class="display table-bordered">
                            <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                <tr>
                                    <th style="width: 10%;">FECHA
                                    </th>
                                    <th style="width: 10%;">ENTRADA
                                    </th>
                                    <th style="width: 10%;">SALIDA
                                    </th>
                                    <th style="width: 10%;">ENTRADA
                                    </th>
                                    <th style="width: 10%;">SALIDA
                                    </th>
                                    <th style="width: 10%;">TARDANZA(min)
                                    </th>
                                    <th style="width: 5%;">FALTA
                                    </th>
                                    <th style="width: 10%;">EXTRA(min)
                                    </th>
                                    <th style="width: 10%;">PERMISOS NO SUBSANADOS(min)
                                    </th>
                                    <th style="width: 15%;">PERMISOS SUBSANADOS(min)
                                    </th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th style="text-align: right">TOTAL:</th>
                                    <th style="text-align: center"></th>
                                    <th style="text-align: center"></th>
                                    <th style="text-align: center"></th>
                                    <th style="text-align: center"></th>
                                    <th style="text-align: center"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <%-- <div class="span1"></div>--%>
                </div>
            </div>

        </div>

    </div>
    <input type="hidden" id="hfpidm" />

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
<input type="hidden" id="hftabla" />

<input type="hidden" id="hfnombre_emp" />
<script type="text/javascript" src="../vistas/NN/js/NNLASIE.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLASIE.init();


    });


</script>
