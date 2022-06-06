<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMLETC.ascx.vb" Inherits="vistas_GL_GLMLETC" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LETRAS POR COBRAR</h4>
                <div class="actions">
                     <a class="btn black" id="btnimprimir"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=glmletc"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=gllletc"><i class="icon-list"></i> Listar</a>
                  
                </div>

            </div>
            <div class="portlet-body" id="div_letra">

              <div class="row-fluid">                    
                  <div class="span1">
                        <label for="slcEmpresa">Empresa:</label>
                    </div>
                    <div class="span3">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcEmpresa" class="span12 obligatorio" data-placeholder="EMPRESA">
                                     <option></option>
                                 </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>



                </div>
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
              <div class="row-fluid" id="ctrlRadio" style="display:none;">
              
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                <input id="rb_pagar" name="rb_tipo" type="radio" value="P" class="span12" checked="checked">
                                &nbsp; Por Pagar
                              
                             </div>

                       </div>
                  </div>

                    <div class="span2">
                      <div class="control-group" >
                            <div class="controls">
                            
                                  <input id="rb_cobrar" name="rb_tipo" type="radio" value="C" class="span12">
                                 &nbsp; Por Cobrar
                             </div>

                       </div>
                  </div>
              
              </div>
               
                <div class="row-fluid">
                   <div class="span1">
                       <label>Nro Letra</label></div>
                   <div class="span2">
                       <div class="control-group">
                            <div class="controls">
                                <input class="span12" type="text" id="txt_nro_letra" disabled >
                             </div>
                        </div>
                   </div>
                   <div class="span1">
                      <label>Ref Girador</label> </div>
                   <div class="span2">
                       <div class="control-group">
                            <div class="controls">
                                  <input type="text" class="span12" id="txt_ref_girador">
                             </div>
                        </div>
                   </div>
      
                   <div class="span1">
                       <label>Lugar de Giro</label></div>
                   <div class="span3">
                       <div class="control-group">
                            <div class="controls">
                                  <input type="text" class="span12 obligatorio" id="txt_lugar">
                              </div>
                        </div>
                   </div>


              </div>
              
                 <div class="row-fluid">
                            <div class="span1">
                                <label>Fecha Giro</label></div>
                            <div class="span2">
                                <div class="control-group">
                                      <div class="controls">
                                           <input name="txt_fecha_giro" type="text" id="txt_fecha_giro"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                                       </div>
                                </div>
                            </div>
                            <div class="span1">
                               <label>Fecha V.</label> </div>
                            <div class="span2">
                                <div class="control-group">
                                      <div class="controls">
                                          <input name="txt_fecha_vcmto" type="text" id="txt_fecha_vcmto"  class="span10"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                                      </div>
                                </div>
                            </div>


                              <div class="span1">
                               <label>Moneda</label></div>
                            <div class="span2">
                                <div class="control-group">
                                      <div class="controls">
                                            <select id="slcMoneda" data-placeholder="MONEDA" class="span12 obligatorio">
                                                  <option></option>
                                            </select>
                                </div></div>
                            </div>

                     
                  <div class="span1">
                      <label>Monto</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                               <input name="txt_monto" type="text" id="txt_monto" class="span12 obligatorio">
                            </div>
                      </div>
                  </div>

    
                  </div>

                              
                 
                   
                           
                   
                            <div class="row-fluid">
                            <div class="span1">
                               <label>Girador</label> </div>
                            <div class="span5">
                                <div class="control-group">
                                      <div class="controls">
                                           <input type="text" id="txt_girador" class="personas span10 obligatorio" placeholder="Digite Nombres o Razon Social">
                                          <a class="btn buscaPersona" style="background-color: white;padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                                      </div>
                                </div>
                                
                            </div>      
                             
                            <div class="span1">
                                 <label>Glosa</label> </div>
                             <div class="span5">
                                 <div class="control-group">
                                       <div class="controls">
                                            <textarea name="txt_glosa" type="text" rows="1" id="txt_glosa" class="span12"></textarea>
                                 </div></div>
                             </div>

                           </div>


                

                  
                      
                                                     
                
                     

          


                                       
                   

              

              


              <div class="row-fluid">

                  <div class="span1">
                     <label>Girado a</label> </div>
                  <div class="span5">
                      <div class="control-group">
                            <div class="controls">
                                 <input name="txt_giradoa" type="text" id="txt_giradoa" placeholder="Digite Nombres o Razon Social" class="autoPIDM span10 obligatorio" disabled="disabled">   
                                <a class="btn buscaPersona" style="background-color: white;padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                      </div></div>
                     
                   
                  </div>
                  
                  <div class="span1">
                     <label>Banco</label> </div>
                  <div class="span3">
                      <div class="control-group">
                            <div class="controls">
                                 <select id="slcbanco"  class="span12 datosBanco" data-placeholder="BANCO">
	                                  <option></option>
	           
                                  </select>
                                </div>
                          </div>
                  </div>

                 <div class="span1" align="right">
                      <label>DC</label> </div>
                  <div class="span1">
                      <div class="control-group">
                            <div class="controls">
                                 <input name="txt_dc" type="text" id="txt_dc" class="span12 datosBanco">
                      </div></div>
                  </div>

              </div>

              <div class="row-fluid">

                  <div class="span1">
                     <label>Firmante</label> </div>
                  <div class="span5">
                      <div class="control-group">
                            <div class="controls">
                               <input name="txt_firmante" type="text" id="txt_firmante" placeholder="Digite Nombres"   class="personasEmpleado span10 obligatorio">
                                <a class="btn buscaPersona" style="background-color: white;padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                           </div>
                          
                      </div>
                   </div>

                  <div class="span1">
                     <label>Oficina</label></div>
                  <div class="span1">
                      <div class="control-group">
                            <div class="controls">
                                  <input name="txt_oficina" type="text" id="txt_oficina" class="span12 datosBanco">
                      </div></div>
                  </div>

                 <div class="span1" >
                      <label>Nro Único</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                 <input name="txt_dc" type="text" id="txt_numero_unico" class="span8 datosBanco">
                      </div></div>
                  </div>
            
                  
             
              </div>

              <div class="row-fluid">
        
                  <div class="span1">
                     <label>Avalista</label> </div>
                  <div class="span5">
                      <div class="control-group">
                            <div class="controls">
                               <input name="txt_avalista" type="text" id="txt_avalista" placeholder="Digite Nombres"   class="personasNatural span10">
                                <a class="btn buscaPersona" style="background-color: white;padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                           </div>
                          
                      </div>
                      
                  </div>

                 <div class="span1">
                     <label> Nro Cuenta</label></div>
                  <div class="span3">
                      <div class="control-group">
                            <div class="controls">
                                <select class="span12 datosBanco" id="txt_nro_cuenta" data-placeholder="CUENTA BANCARIA">
                                    <option></option>
                                 </select>
                             <%--    <input name="txt_nro_cuenta" type="text" id="txt_nro_cuenta" class="span12 datosBanco">--%>
                      </div></div>
                  </div>

               

              </div>

                <div class="row-fluid">



                       <div class="span1">
                     <label>Estado</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                  <select name="slcestado" id="slcestado"  class="span12" data-placeholder="ESTADO" disabled="disabled">                                                                   
                                   <option value="F">POR FIRMAR</option>
                                   <option value="E">EMITIDO</option>
                                   <option value="A">ANULADO</option>
                                   <option value="P">PAGADO</option>
                                   <option value="R">RECHAZADO</option>

                                  </select>
                             </div>
                       </div>

                  </div>

                  <div class="span1">
                     <label>Destino</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                  <select name="slcdestino" id="slcdestino"  class="span12 obligatorio" data-placeholder="DESTINO">
                                   <option></option>
                                   <option value="C">EN CARTERA</option>
                                   <option value="L">COBRANZA LIBRE</option>
                                   <option value="D">EN DESCUENTO</option>
                                   <option value="G">GARANTIA</option>
                                  </select>
                             </div>
                       </div>

                  </div>

                  <div class="span2">
                  <label>Importe Debitar en Cta</label> </div>
                   <div class="span2">
                       <div class="control-group">
                            <div class="controls">
                      
                      <input class="span12 datosBanco" name="txt_importe_debitar" type="text" value="0.00" id="txt_importe_debitar">
                                </div></div>
                  </div>

                </div>

                <input type="hidden" id="hddauxiliar" value=""/>
                <input type="hidden" id="hddauxiliar2" value=""/>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/GL/js/GLMLETR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLMLETR.init();

    });
</script>