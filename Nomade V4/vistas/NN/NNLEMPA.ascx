<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLEMPA.ascx.vb" Inherits="vistas_NN_NNLEMPA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MIS ASISTENCIAS</h4>
                <div class="actions">
                   <a id="btnMail" class="btn purple" style="margin-top: -10px;"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
           
                <div class="row-fluid">
                    <div class="span8"></div>
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
                    <div class="span12" style="text-align :center;">
                        <i class="icon-user" style="font-size: -webkit-xxx-large;"></i>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="nombre_empl" style="text-align:center;">-</div>
                </div>
                <div class="row-fluid">
                 <%--   <div class="span1"></div>--%>
                    <div class="span12">
                    <table id="tbl_mis_marcaciones" class="display table-bordered" >
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
                 <th    style="text-align:right">TOTAL:</th>
                 <th  style="text-align:center"></th>
                 <th  style="text-align:center"></th>
                 <th  style="text-align:center"></th>
                <th  style="text-align:center"></th>
                  <th  style="text-align:center"></th>
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


<script type="text/javascript" src="../vistas/NN/js/NNLEMPA.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLEMPA.init();


    });


</script>
