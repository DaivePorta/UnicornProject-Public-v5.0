<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLMOCB.ascx.vb" Inherits="vistas_NB_NBLMOCB" %>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>MOVIMIENTOS CUENTAS BANCARIAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                   <a id="nvoMov" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblmocb" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">
                               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span9">
                     
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div class="span6">
                             <div class="control-group">
                                      <div class="controls">
                                             <select class="span6 empresa obligatorio" id="slcEmpr"></select>
                                        </div>
                             </div>
                        </div>
                         <div class="span1"><b>RUC:</b></div>
                          <div class="span3"><input type="text" class="span12" id="nroRUC" disabled="disabled"/></div>
                    </div>

                     <div class="span3">
                     
                        <div class="span2"><b>MES:</b></div>
                        <div class="span4">
                            <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                        </div>
                        <div class="span2"><b>AÑO:</b></div>
                        <div class="span4"><input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho"></div>
                    </div>

                </div>

                  <div class="row-fluid" style="margin-bottom: 10px;">

                   <div id="filter_cta" class="span9">
                     
                        <div class="span1"><b>CUENTA:</b></div>
                        <div class="span6">
                            <div class="control-group">
                                      <div class="controls">

                                         <select data-placeholder="CUENTA BANCARIA" class="span12 obligatorio" id="slcCta"><option></option></select>

                                          </div></div>
                        </div>
                       <div class="span1"><b>MONEDA:</b></div>
                          <div class="span3"><select class="span10" id="slcMoneda" disabled="disabled"></select></div>
                    </div>

                     <div class="span1">

                         <button type="button" id="btnfiltrar" class="btn blue span12"><i class="icon-eye-open"></i> VER</button>

                     </div>

                  </div>

                <div id="divDetalle">


                   <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-top:10px; margin-bottom: 20px;"></div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" >
                            <thead>
                                <tr>

                                    <th>FECHA OPER.
                                    </th>
                                    <th>FECHA VALOR
                                    </th>
                                    <th>DESCRIPCIÓN
                                    </th>
                                    <th>OFICINA</th>
                                    <th>CAN.
                                    </th>
                                    <th>N° OPER.
                                    </th>                                                               
                                    <th>CARGO/ABONO
                                    </th>
                                    <th>ITF
                                    </th>
                                    <th>SALDO CONTABLE
                                    </th>
                                </tr>
                            </thead>       
         
                        </table>                        
                       
                    </div>
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-top:10px; margin-bottom: 20px;"></div>

                 <div class="row-fluid">
                     <div class="span6">
                          <div class="row-fluid">
                                    <div class="span12"><b>TOTALES POR ITF</b></div>
                           </div>
                          <div class="row-fluid">

                                <div class="span3"><b>CARGOS</b></div>
                                <div class="span1"><label id="lblcargos">0.00</label></div>
                              </div>
                          <div class="row-fluid">
                                <div class="span3"><b>ABONOS</b></div>
                                <div class="span1"><label id="lblabonos">0.00</label></div>
                              </div>
                          

                    </div>

                 <div class="span3">
                
                         <div class="row-fluid">
                                    <div class="span12"><b>SALDO DISPONIBLE</b></div>
                          </div>

                         <div class="row-fluid">
                             <div class="span12"><label id="lblSaldoDisponible">0.00</label></div>
                         </div>
                </div>
                 <div class="span3">
                
                     <div class="row-fluid">
                                    <div class="span12"><b>SALDO CONTABLE</b></div>
                      </div>

                        <div class="row-fluid">
                             <div class="span12"><label id="lblSaldoContable">0.00</label></div>
                         </div>
                </div>
            </div>
                <div class="row-fluid" align="right">
                     
                    <i class="icon-stop" style="color: #FCF7D7;"></i><small> Movimientos Ingresados Manualmente</small>
                    <i class="icon-stop" style="color:#F2BCC7;"></i><small> Movimientos No Cobrados</small>
                </div>

     </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
    </div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NB/js/NBMMOCB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLMOCB.init();

    });
</script>