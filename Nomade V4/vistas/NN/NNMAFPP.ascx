<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMAFPP.ascx.vb" Inherits="vistas_NN_NNMAFPP" %>
<style>
    @media print {

        .body {
            display: none !important;
        }

        .chat-window {
            display: none !important;
        }

        .navbar-inner {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        .page-sidebar {
            display: none !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #imprime {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>
<div class="body row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA PLANILLAS  AFP</h4>
                <div class="actions">
                      <a id="btnMail" class="btn purple" style="display:none;"><i class="icon-envelope"></i>&nbsp; Enviar Mail</a>
                      <a class="btn black"  id= "btn_imprime"  style="display:none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=NNMAFPP"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLAFPP" class="btn red"><i class="icon-list"></i>Listar</a>
                 
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span2">
                           <div class="control-group">
                            <label class="control-label" for="txt_usua">
                                Presentado Por</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_usua" class="b span12 " style="text-align:right;" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="txt_empresa">
                                Empresa</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_empresa" class="b span12 " />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="txt_planilla">
                                Planilla RRHH</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_planilla" class="b span12 " />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1"></div>
                    
                     
                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_codigo">
                                Codigo</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_codigo" class="b span12 " style="text-align:right;" />
                                </div>

                            </div>
                        </div>
                    </div>
                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_periodo">
                                Periodo devengue</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_periodo" class="b span12 " style="text-align:center;" />
                                </div>

                            </div>
                        </div>
                    </div>
                     <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="txt_afp">
                                Afp</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_afp" class="b span12 " />
                                </div>

                            </div>
                        </div>
                    </div>
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_estado">
                                Estado</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_estado" class="b span12 " style="text-align:center;"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_num_planilla">
                                N° Planilla</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" onkeypress="return ValidaNumeros(event,this)" id="txt_num_planilla" class=" span12 "  style="text-align:right;color:blue;font-weight:900;"/>
                                </div>

                            </div>
                        </div>
                    </div>
                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_fondo">
                                Total Fondo</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_fondo" class="b span12 " style="text-align:center;" />
                                </div>

                            </div>
                        </div>
                    </div>
                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_retenciones">
                                Total Retenciones</label>
                            <div class="controls">
                                <div class="span12" >
                                    <input type="text" id="txt_retenciones" class="b span12 "  style="text-align:center;"/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_retenciones">
                                Fec. Generacion</label>
                            <div class="controls">
                                <div class="span12" >
                                  <input type="text" disabled="disabled" id="txt_fec_generacion" class="b span10 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" style="text-align: right ">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_retenciones">
                                Fec. Presentacion</label>
                            <div class="controls">
                                <div class="span12" >
                                   <input type="text"  id="txt_fec_presentacion" class="span10 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" style="text-align: right ">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span7"></div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_detalle" style="display:none" type="button" class=" btn black span5"><i class="icon-arrow-down"></i>&nbsp;&nbsp;Ver Detalle</button>
                                  <button id="btn_presentar" style="display:none" type="button" class=" btn green span5"><i class="icon-legal"></i>&nbsp;&nbsp;Presentar</button>
                            </div>
                        </div>
                    </div>
         
                </div>
                <br /><br />
               
                 <div class="row-fluid" style="display:none" id="div_table">
                   <div class="span1"></div>
                     <div class="span10">
                         <div class="row-fluid">
                             <div class="span6">
                                  <h4 style="text-align:left ">DETALLE EMPLEADOS</h4>
                             </div>
                             <div class="span6">
                                 <h4 style="text-align:right;margin-right :5px;  ">TOTAL A PAGAR&nbsp;&nbsp;<span id="span_total" style="border: solid 1px;border-color: #1EB71E;background-color: yellowgreen;padding :4px;">S/. 12345</span> </h4>
                             </div>
                         </div>
                        
                          
                        
                                 <table class="table table-bordered table-striped">
									<thead style="background-color: #23779B;color: white;">
										<tr>
											<th style="width:4%;">N°</th>
											<th>CUSSP</th>
											<th>Nombre</th>
                                            <th style="width:10%;">Remuneracion Asegurable</th>
                                            <th style="width:10%;">Aporte Obligatorio</th>
                                            <th style="width:10%;">Prima de Seguro</th>
                                            <th style="width:10%;">Comision AFP</th>
                                             <th style="width:10%;">Total Aportes</th>
										</tr>
									</thead>
									<tbody id="body_table">
										

									</tbody>
								</table>
                     </div>
                      <div class="span1"></div>
                    </div>
            
            </div>



        </div>
    </div>
</div>




<input  type="hidden" id="hf_codigo"/>

<input  type="hidden" id="hf_descafp"/>
<input  type="hidden" id="hf_peri"/>
<input  type="hidden" id="hf_desc_emp"/>

<input  type="hidden" id="hf_img64"/>

<div id="ConfirmPresentar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Presentar Planilla AFP</h3>
    </div>
    <div class="modal-body">
        <p>
            ¿Esta realmente seguro de presentar la planilla AFP?
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_aceptar" data-dismiss="modal" class="btn black">
            Aceptar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>


<div id="imprime" style="display:none;">
    <table style="width: 100%" border="0">
        <tr>
            <td style="width: 25%; text-align: center;" rowspan="2">
                <img id="img"  style="max-height:50px;width:150px;height:50px;min-height:50px;" src="cid:pic">
            </td>
            <td style="width: 75%; text-align: center; font-size: 15px"><b>PLANILLA DE DECLARACION Y PAGO DE APORTES PROVISIONALES</b></td>
        </tr>
        <tr>

            <td style="width: 75%; text-align: center; font-size: 15px">Número de Planilla&nbsp;<span  id="span_num_planilla" style="border: solid 1px;padding:2px">123456789</span>&nbsp;&nbsp; Periodo Devengue&nbsp;<span id="span_periodo" style="border: solid 1px;padding:2px">2015-15</span></td>
        </tr>
    </table>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <table style="width: 100%">
        <tr>
            <td style="width: 3.5%"></td>
            <td style="width: 93%">
                <table style="width: 100%">
                    <tr>
                        <td style="width: 50%; text-align: left; font-size: 12px"><b>DATOS GENERALES</b></td>
                        <td style="width: 50%; text-align: left; font-size: 12px"><b>RESUMEN DE RETENCIONES Y RETRIBUCIONES</b></td>
                    </tr>
                </table>
            </td>
            <td style="width: 3.5%"></td>
        </tr>
    </table>
    <table style="width: 100%">
        <tr>
            <td style="width: 3.5%"></td>
            <td style="width: 93%">
                <table style="width: 100%">
                    <tr>
                        <td>
                            <table border="0" style="width: 100%;">
                                <tr>
                                    <td style="width: 49.8%">
                                        <table border="1" style="width: 80%;border-collapse:collapse;">
                                            <tr>
                                                <td style="width: 50%">Nombre o Razón Social:</td>
                                                <td style="width: 30%"><span id="span_emp">ORBITUM NET</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50%">AFP:</td>
                                                <td style="width: 30%"><span id="span_afp">ORBITUM NET</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50%">Tipo de trabajador:</td>
                                                <td style="width: 30%"><span>DEPENDIENTE</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50%">Nro. de Afiliados Declarados:</td>
                                                <td style="width: 30%"><span id="span_nafiliados">ORBITUM NET</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50%">Estado de la Planilla:</td>
                                                <td style="width: 30%"><span id="span_estado">ORBITUM NET</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50%">Fecha de Presentación:</td>
                                                <td style="width: 30%"><span id="span_fec_presentacion">ORBITUM NET</span></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 0.4%"></td>
                                    <td style="width: 49.8%">
                                        <table border="1" style="width: 100%;border-collapse:collapse;">
                                            <tr>
                                                <td style="width: 70%"><span style="text-align:left">Prima de Seguro Previsional:</span><span style="text-align:right;">S/.</span></td>
                                                <td style="width: 30%; text-align: right"><span id="span_prima">120,30</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 70%">Comision AFP:</td>
                                                <td style="width: 30%; text-align: right"><span id="span_comision">120,30</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 70%">Sub-total Retenciones y Retribuciones:</td>
                                                <td style="width: 30%; text-align: right"><span id="span_subtotal">120,30</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 70%">Intereses Moratorios:</td>
                                                <td style="width: 30%; text-align: right"><span id="span_intereses">120,30</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 70%"><b>Total Retenciones y Retribuciones:</b></td>
                                                <td style="width: 30%; text-align: right; font-weight: bold"><span id="span_total_retenciones">120,30</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 70%"><b>Total Fondo de Pensiones:</b></td>
                                                <td style="width: 30%; text-align: right; font-weight: bold"><span id="span_total_fondo">120,30</span></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
            <td style="width: 3.5%"></td>
        </tr>
    </table>
    <br /><br />
     <table style="width: 100%">
        <tr>
            <td style="width: 3.5%"></td>
            <td style="width: 93%">
                <table style="width: 100%">
                    <tr>
                        <td style="width: 50%; text-align: left; font-size: 12px">DETALLE DE EMPLEADOS</td>
                        <td style="width: 50%; text-align: right; font-size: 12px">TOTAL A PAGAR&nbsp;&nbsp;&nbsp;<span id="span_npagar" style="border:solid 1px;padding:3px;">S/.743.25</span></td>
                    </tr>
                </table>
            </td>
            <td style="width: 3.5%"></td>
        </tr>
    </table>
    <br />
    <table style="width: 100%">
        <tr>
            <td style="width: 3.5%"></td>
            <td style="width: 93%">
                <table style="width: 100%">
                    <tr>
                      <td>
                          <table style="width:100%;border-collapse:collapse;" border="1">
									<thead>
										<tr>
											<th style="width:4%;">N°</th>
											<th style="width:10%;">CUSSP</th>
											<th style="width:30%;">Nombre</th>
                                            <th style="width:10%;">Remuneracion Asegurable</th>
                                            <th style="width:10%;">Aporte Obligatorio</th>
                                            <th style="width:10%;">Prima de Seguro</th>
                                            <th style="width:10%;">Comision AFP</th>
                                             <th style="width:10%;">Total Aportes</th>
										</tr>
									</thead>
									<tbody id="Tbody1">
										<tr>
                                            <td>1</td>
                                             <td>	621591CCQRL3</td>
                                             <td>CABRERA QUILCATE CESAR AUGUSTO</td>
                                             <td>1700</td>
                                             <td>100</td>
                                             <td>125.32</td>
                                             <td>70.52</td>
                                             <td>156.3</td>
										</tr>

									</tbody>
								</table>
                      </td>
                    </tr>
                </table>
            </td>
            <td style="width: 3.5%"></td>
        </tr>
    </table>
    

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


<script type="text/javascript" src="../vistas/NN/js/NNMAFPP.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMAFPP.init();
    });

</script>
