<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMCACO.ascx.vb" Inherits="vistas_CC_CCMCACO" %>

<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/date.js"></script>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<style>
    .editable {
        background:bisque;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>EMITIR CARTA DE COBRANZA</h4>
                <div class="actions">
                    <button id="btnMail" class="btn purple disabled" disabled="disabled"><i class="icon-envelope"></i>&nbsp Mail</button>
                    <a href="?f=ccmcaco" class="btn green"><i class="icon-plus"></i>&nbsp Nuevo</a>
                    <a href="?f=cclcaco" class="btn red"><i class="icon-list"></i>&nbsp Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid master">
                    <div class="span1">
                        <label>Empresa</label>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <label>Cliente</label>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboClientes" class="span12 obligatorio" data-placeholder="CLIENTE">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <label>Moneda</label>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12 obligatorio" data-placeholder="MONEDA">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid master">
                    <div class="span1">
                        <label>PostData</label>
                    </div>

                    <div class="span9">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" value="Si ya canceló su deuda, haga caso omiso de la presente y disculpe las molestias" class="span12 m-wrap" placeholder="POSDATA" id="txt_PD" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <button type="button" id="btnGenerar" class="btn green span12"><i class="icon-file"></i>&nbsp GENERAR</button>
                    </div>
                </div>
                <div class="row-fluid" id="previewCarta" style="display:none">
                <div class="span2"></div>
                <div class="well span8" id="preview">
                    
                    <div class="row-fluid invoice-logo">
						<div class="span6 invoice-logo-space"><img class="imgCorreo" style="height:50px;min-height:50px;max-height:50px" id="cabeceraCarta" src="recursos/img/logo-orbitum.png" alt=""> </div>
					</div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:center">
                            <strong>CARTA DE COBRANZA N°</strong> <span id="nroCArta">GENERADO</span>
						</div>
					</div>

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span id="distritoCarta">TRUJILLO</span>&nbsp; <span id="fechaCarta">12 de Noviembre del 2015</span>
						</div>
					</div>

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span class="editable tooltips" data-original-title="Contenido Editable" contenteditable="true">Señores</span>
						</div>
					</div>

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span id="clienteCarta">CARLOS JHOEL MEDINA SILVESTRE</span><br /> 
                            <span id="direccionCarta">Av. Los Cipreses Mz.18 Lt.04</span>
						</div>
					</div>

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span class="editable tooltips" data-original-title="Contenido Editable" contenteditable="true">De nuestra especial consideración:</span>
						</div>
					</div>

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span class="editable tooltips" data-original-title="Contenido Editable"" contenteditable="true">Por medio de esta carta nos dirigimos a usted para recordarle que adeudan a nuestra empresa un total de </span> &nbsp <span id="montoCarta">86952.00</span> &nbsp <span id="monedaCarta"> NUEVOS SOLES</span> &nbsp<span class="editable tooltips" data-original-title="Contenido Editable" contenteditable="true"> correspondientes a los
siguientes documentos:</span>
						</div>
					</div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:center">
                            <table id="tblDeudas" style="border-collapse:collapse;border-color:aliceblue;width:100%">
									<thead style="background-color:#4b8df8;color:aliceblue;border-color:black;">
										<tr>
											<th style="padding:10px">Documento Comercial</th>
                                            <th style="padding:10px">Fecha Emisión</th>
                                            <th style="padding:10px">Fecha Vencimiento</th>
                                            <th style="padding:10px">Días Vencidos</th>
                                            <th style="padding:10px">Monto Facturado</th>
                                            <th style="padding:10px">Pendiente Soles</th>
                                            <th style="padding:10px">Pendiente Dolares</th>
										</tr>
									</thead>
									<tbody style="border-color:black">
										
									</tbody>
								</table>
						</div>
					</div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span class="editable tooltips" data-original-title="Contenido Editable" contenteditable="true">Esperamos luego de esta comunicación usted tenga a bien comunicarse con nuestros representantes, caso contrario. Puede hacer los pagos a nuestras cuentas:</span>
						</div>
					</div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:center">
                            <table id="tblCuentas" style="border-collapse:collapse;border-color:aliceblue;width:100%">
									<thead style="background-color:#4b8df8;color:aliceblue;border-color:black;">
										<tr>
											<th style="padding:10px">Tipo</th>
                                            <th style="padding:10px">Banco</th>
                                            <th style="padding:10px">Cuenta Bancaria</th>
                                            <th style="padding:10px">Cuenta Interbancaria</th>
										</tr>
									</thead>
									<tbody style="border-color:black">
										
									</tbody>
								</table>
						</div>
					</div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span class="editable tooltips" data-original-title="Contenido Editable" contenteditable="true">Atentamente</span>
						</div>
					</div>

                    <div class="row-fluid invoice-logo">
						<div class="span6 invoice-logo-space"><img class="imgCorreo" style="height:50px;min-height:50px;max-height:50px" id="firmaCarta" src="recursos/img/logo.png" alt=""> </div>
					</div>

                    <div class="row-fluid">
                        <div class="span12" style="text-align:left">
                        <span id="usuarioCarta">REINER GUERRA SALAS</span></br> 
                        <span id="cargoCarta">GERENTE GENERAL</span></br>
                        <span id="empresaCarta">ORBITUM NET SRL</span>
					</div>
                    </div>

                    <br />

                    <div class="row-fluid">
						<div class="span12" style="text-align:left">
                            <span>P.D.:</span><span class="editable tooltips" data-original-title="Contenido Editable" id="pdCarta" contenteditable="true">Si ya canceló su deuda, haga caso omiso de la presente y disculpe las molestias.</span>
						</div>
					</div>
                                        
                    <br />
                    
                    <div class="row-fluid invoice-logo">
						<div class="span6 invoice-logo-space"><img class="imgCorreo" style="height:20px;min-height:20px;max-height:50px" width:100%; id="pieCarta" src="recursos/img/logo-orbitum.png" alt=""> </div>
					</div>

                </div>
                </div>


                <div class="form-actions">
                    <button disabled="disabled" id="grabar" class="btn blue"><i class="icon-save"></i> Grabar</button>
                    <button disabled="disabled" id="imprimir" class="btn purple"><i class="icon-print"></i> Imprimir</button>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>


<input type="hidden" id="moneda_principal" value="" />
<input type="hidden" id="hfPdimCliente" value="" />
<input type="hidden" id="hfPublico" value="" />
<script type="text/javascript" src="../vistas/CC/js/CCMCACO.js"></script>


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
                                    <select multiple="multiple" class="span12 m-wrap" id="cboCorreos" placeholder="Seleccione o ingrese correos separados por coma (,)"></select>
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
                                    <input type="text" id="txtAsunto" value="CARTA DE COBRANZA" class="span12 m-wrap">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12" style="padding: 10px; border: thin inset">
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

<script>

    jQuery(document).ready(function () {
        CCMCACO.init();
    });
</script>
