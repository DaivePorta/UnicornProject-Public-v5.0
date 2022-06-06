<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMADAP.ascx.vb" Inherits="vistas_NN_NNMADAP" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;APROBACIÓN ADELANTO DE SUELDOS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nnladap" class="btn red"><i class="icon-list"></i>&nbsp;Bandeja</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label7" class="control-label" for="txtNroDoc">
                                Nro. Documento:</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">                              
                                 <label id="lblNroDoc" style="font-weight:bold"></label>
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset1">
                        <label>Fecha solicitud:</label>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">                                
                                <label id="lblFechaReg" style="font-weight:bold"></label>
                            </div>
                        </div>
                    </div>

                      <div class="span1 offset1">
                        <label>Empresa:</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">                                
                                <label id="lblEmpresa" style="font-weight:bold"></label>
                            </div>
                        </div>
                    </div>

                      <div class="span1">
                        <label>Sucursal:</label>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">                                
                                <label id="lblSucursal" style="font-weight:bold"></label>
                            </div>
                        </div>
                    </div>
           

                </div>
                
                <div class="row-fluid" style="margin-top:5px;">
                    

                     <div class="span1">
                        <label>Empleado:</label>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">                                
                                <label id="lblEmpleado" style="font-weight:bold"></label>
                            </div>
                        </div>
                    </div>

                     <div class="span1">
                        <label>Monto Solicitado:</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">  
                                <label class="span1" id="lblSimb" style="font-size: medium; font-weight: bold; text-align: right;">
                                .</label>                              
                                <label id="lblMonto" style="font-weight:bold;color:black;background-color:antiquewhite;text-align: center;"></label>
                            </div>
                        </div>
                    </div>

                 

                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label5" class="control-label" for="cboMoneda">
                                Moneda:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Seleccione Moneda" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

               
        

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label8" class="control-label" for="txtMotivo">
                                Motivo:</label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtMotivo" class="span12"  style="text-align: left;font-size:12px" />
                            </div>

                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="margin-top: 5px;">

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label6" class="control-label" for="txtMonto">
                                Monto a Aprobar:</label>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <div class="span1">
                                <label id="lblSimb2" style="font-weight: bold; font-size: medium"></label>
                            </div>
                            <div class="controls span11">
                                <input type="text" id="txtMonto" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right; background-color: lavender; font-size: medium; font-weight: bold; color: black; margin-left: 10px;" />
                            </div>

                        </div>
                    </div>

                    <div class="span1">
                          <a id="btnConfirmar" class="btn purple"><i class=""></i>&nbsp;Confirmar</a>
                    </div>
                    <div class="span1">&nbsp</div>
                    <div class="span1">
                         <label  class="control-label"  style="font-weight:bold;">Contrato Actual:</label>
                    </div>
                        
                    <div class="span2 control-group alert alert-info">
                        <div class="row-fluid">
                            <div class="span2">
                                <label class="control-label" for="lblFechaIni">
                                    <span id="FechaIni">Inicio:</span>
                                </label>
                                <label id="lblFechaIni" for="FechaIni" style="font-weight: normal; margin-top: 2px;">00/00/0000</label>
                            </div>
                        </div>
                    </div>

                    <div class="span2 control-group alert alert-info">
                        <div class="row-fluid">
                            <div class="span2">
                                <label class="control-label" for="lblFechaFin">
                                    <span id="FechaFin">Fin:</span>
                                </label>
                                <label id="lblFechaFin" for="FechaFin" style="font-weight: normal">00/00/0000</label>
                            </div>
                        </div>
                    </div>

                    <div class="span2 control-group alert alert-info">
                        <div class="row-fluid">
                            <div class="span2">
                                <label class="control-label" for="lblEstaddoCont">
                                    <span id="EstadoCont">Estado:</span>
                                </label>
                                <label id="lblEstaddoCont" for="EstadoCont" style="font-weight: normal">ACTIVO</label>
                            </div>
                        </div>
                    </div>

                </div>



                <div class="row-fluid" id="DivPlanillas" style="margin-top:20px;">
                  
                    <div class="row-fluid">                            
                        <div class="span6">
                            <h4>Descuento en Planillas</h4>
                        </div>
                        
                    </div>
                  <hr />
                  
                    <div class="row-fluid" id="DivPla1">
                        <div class="span1">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="cboTipoPlanilla">
                                    Tipo Planilla:</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoPlanilla" class="span12" data-placeholder="Tipo Planilla">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label id="Label1" class="control-label" for="txt_Mes">
                                    Periodo:</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input class="span12" type="text" id="txt_Mes" data-date-format="MM" aria-disabled="true" name="txt_Mes" placeholder="MES">
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input class="span9" data-date-format="yyyy" type="text" id="txt_Anio" name="txt_Anio" placeholder="AÑO" >
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label id="Label2" class="control-label" for="txtMontoDet">
                                    Monto:</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtMontoDet" class="span11" onkeypress="return ValidaDecimales(event,this)" style="text-align: right; background-color: white; font-size: medium; color: black;"/>
                                </div>

                            </div>
                        </div>



                        <div class="span1">
                            <a id="btnAgregaDetalle" class="btn green"><i class="icon-plus"></i></a>
                        </div>
                     

                    </div>

                    <%--<div class="row-fluid">--%>
                       
                        <div class="row-fluid" style="margin-top: 20px;">
                            <div id="divDetalleAdelanto">
                                <table id="tblDetalleAdelanto" class="table display table-bordered DTTT_selectable" role="grid">
                                    <thead style="background-color:rgb(39, 83, 142);color:white;">
                                        <tr>
                                            <th>CODE</th>
                                            <th >MES</th>
                                            <th style="display:none">ANIO</th>
                                            <th style="display:none">MESANIO</th>
                                            <th>PERIODO</th>
                                            <th style="display:none">CODE_PLANILLA</th>
                                            <th>PLANILLA</th>
                                            <th>MONTO</th>
                                            <th style="display:none">ESTADO_IND</th>
                                            <th>ESTADO</th>
                                            <th>ELIMINAR</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>



                    <%--</div>--%>

                    <div class="row-fluid">
                        <div class="span9">&nbsp</div>
                        <div class="form-actions span3">
                            <a id="grabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a class="btn" id="cancelar"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                     
                    </div>



                </div>

             


            </div>
        </div>
        <!-- FIN CUADRO PARA LA FORMA-->
        <div>
            <input type="hidden" id="hfMOBA_CODE" />
            <input type="hidden" id="hfRHADEMP_CODE" />
            <input type="hidden" id="hfCTLG_CODE" />
            <input type="hidden" id="hfSCSL_CODE" />
            <input type="hidden" id="hfPIDM" />
            <input type="hidden" id="hfCodeAdel" />
            <input type="hidden" id="hfEstadoAdel" />


        </div>


    </div>
 </div>




<div id="MuestraModalAceptar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #F5B400; color: #ffffff;">
    
            <h4 id="myModalLabel2"><i class="icon-warning-sign"></i>&nbsp;CONFIRMACIÓN</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif; font-size: small;">

            <div class="row-fluid">
                <div class="span12">
                    <p id="lblMensaje">Desea aprobar lalalaalallalalalalal</p>
                </div>
            </div>

     <%--       <p style="font-weight: 900;">
                ¿Deseas realmente Regularizar ?
            </p>--%>
            <br />

        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align: center;">


            <a id="btnAceptarModal" class="btn blue" style="border-radius: 7px !important;"><i class="icon-ok"></i>Si</a>
            <a id="btnCancelarModal" class="btn red" data-dismiss="modal" style="border-radius: 7px !important;"><i class="icon-remove"></i>No</a>


        </div>
    </div>
    <input type="hidden" id="hf_nom_empl" />
    <input type="hidden" id="hf_pidm_empl" />
    <input type="hidden" id="hf_fecha_empl" />
    <input type="hidden" id="hf_index_e" />
</div>













<script type="text/javascript" src="../vistas/NN/js/NNMADAP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMADAP.init();
    });
</script>