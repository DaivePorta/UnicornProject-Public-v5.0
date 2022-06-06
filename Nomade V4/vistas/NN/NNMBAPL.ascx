<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMBAPL.ascx.vb" Inherits="vistas_NN_NNMBAPL" %>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Mantenimiento Planillas Bancarias</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple" disabled="disabled"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <%--<a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=NNMBAPL" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLBAPL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Moneda</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboMoneda" class="span12" data-placeholder="Moneda" disabled="disabled">
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
                                <label class="control-label" for="cboBanco">
                                    Banco Origen</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboBanco" class="span12" data-placeholder="Banco">
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Cuenta Origen</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCtaOrigen" class="span12" data-placeholder="Cta. Origen">
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
                                <label class="control-label" for="cboEmpresa">
                                    Cod. Planilla</label>
                            </div>
                        </div>

                        <div class="span5">

                            <div class="span3">

                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtCodPlanilla" class="span12" placeholder="Cod. Planilla" maxlength="10"/>
                                     
                                    </div>
                                </div>
                            </div>


                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span> Activo</span>
                                    </div>
                                </div>
                            </div>


                        </div>

                       

                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txNomPlanilla">
                                    Nombre Planilla</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txNomPlanilla" class="span12" placeholder="Nombre Planilla" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtDiaPAgo">
                                    Día de Pago</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDiaPAgo" class="span12" placeholder="Día" onkeypress="return ValidaNumeros(event,this)" maxlength="2" />
                                       <%--<select id="cboDiaPago" class="span12" data-placeholder="Día"></select>--%>
                                </div>
                            </div>
                        </div>

                         <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoPla">
                                    Tipo Planilla</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoPla" class="span12" data-placeholder="Tipo Planilla">
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <hr />

                <div id="divEmpleados">
                    <div class="row-fluid">

                        <div class="span12" style="margin-top: 5px;">
                            <div class="span1" style="margin-top: 5px;">
                                <div class="control-group">
                                    <label class="control-label" for="cboEmpleado">
                                        Empleado</label>
                                </div>
                            </div>
                            <div class="span5" style="margin-top: 5px;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboEmpleado" class="span12" data-placeholder="Empleado">
                                        </select>
                                    </div>
                                </div>
                            </div>
                         
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <%--  <div class="span1" style="margin-top: 5px;">
                                <div class="control-group">
                                    <label class="control-label" for="cboBancoEmp">
                                        Banco Emp.</label>
                                </div>
                            </div>
                            <div class="span5" style="margin-top: 5px;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboBancoEmp" class="span12" data-placeholder="Banco">
                                        </select>
                                    </div>
                                </div>
                            </div>--%>

                            <div class="span1" style="margin-top: 5px;">
                                <div class="control-group">
                                    <label class="control-label" for="cboBancoEmp" id="lblCuentaEmp">
                                        Cuenta Emp.</label>
                                </div>
                            </div>
                            <div class="span5" style="margin-top: 5px;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboCuentaEmp" class="span12" data-placeholder="Cuenta">
                                        </select>
                                    </div>
                                </div>
                            </div>
                             <div class="span2" style="margin-left: 5px; margin-top: 5px;">
                                <div class="control-group">
                                    <div class="controls" style="padding-top: 4px">
                                        <a id="btnAdd" class="btn green" onclick=""><i class="icon-plus"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row-fluid">

                        <div class="row-fluid" style="margin-top: 20px;">
                            <div id="divDetPla"  style="overflow: auto" class="span10">
                                <table id="tbl_DetPla" class="table display DTTT_selectable">
                                    <thead style="background-color: rgb(9, 76, 180); color: white;">
                                        <tr>
                                            <th style="display: none;">ITEM</th>
                                            <th style="text-align: center;">Nro.</th>
                                            <th style="text-align: center;">Cuenta</th>
                                            <th style="text-align: center;">Banco</th>
                                            <th style="text-align: center;">Titular</th>
                                            <th style="text-align: center;">Doc. Identidad</th>
                                             <th style="text-align: center;"> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>





                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript: grabaPlanillaBancaria();"><i class=" icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" onclick="javascript:Cancelar();"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>


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
                            <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                            <h4 id="lblEmpresa"></h4>
                            <h5 id="lblAsunto"></h5>
                            <h6><strong>BANCO:</strong>&nbsp;<span id="lblBanco"></span></h6>
                            <h6> <strong>NRO. CUENTA::</strong>&nbsp;<span id="lblCuenta"></span></h6>
                            <h6><strong>TIPO PLANILLA:</strong>&nbsp;<span id="lblTipoPlanilla"></span></h6>
                            <h6><strong>DIA DE PAGO:</strong>&nbsp;<span id="lblDiaPago"></span></h6>
                            <div class="row-fluid">
                                <div class="span12" id="lblTablaHtml"></div>
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


    <div>
        <input type="hidden" id="hfCODE" />
    </div>

</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->

<script type="text/javascript" src="../vistas/NN/js/NNMBAPL.js"></script>
<script>
                jQuery(document).ready(function () {        
                    NNMBAPL.init();
                });
</script>
