<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMCHQA.ascx.vb" Inherits="vistas_NB_NBMCHQA" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGISTRO DE CHEQUERAS</h4>
                <div class="actions">
                     
                    <a class="btn green" href="?f=nbmchqa"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nblchqa"><i class="icon-list"></i> Listar</a>
                  
                </div>

            </div>
            <div class="portlet-body" id="div_letra">

              <div class="row-fluid">
                  <div class="span2">
                      <label for="slcEmpresa">Empresa:</label>

                      </div>
                    <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcEmpresa" class="span12 obligatorio empresa" data-placeholder="EMPRESA">
                                     <option></option>
                                 </select>
                            </div>
                        </div>
                    </div>

                </div>

          <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                
               <div class="row-fluid">
                  <div class="span2">
                      <label>Fecha Inicio</label></div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                 <input name="txt_fecha_inicio" type="text" id="txt_fecha_inicio"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                             </div>
                      </div>
                  </div>
                  <div class="span2">
                     <label>Fecha Registro</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                <input name="txt_fecha_rgto" type="text" id="txt_fecha_rgto"  class="span10"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled="disabled">
                            </div>
                      </div>
                  </div>
                
                <div class="span1" style="width:7%!important;">
                     <label id="lblmonto">Monto</label> </div>
                  <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                <input name="txt_monto" type="text" id="txt_monto"  class="span8" />
                            </div>
                      </div>
                  </div>
                      
                </div>


                 <div class="row-fluid">

                     <div class="span2">
                      <label for="slcctaban">Cuenta Bancaria</label>

                      </div>
                    <div class="span5">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcctaban" data-placeholder="CUENTA BANCARIA" class="span10 obligatorio">
                                     <option></option>
                                 </select>
                            </div>
                        </div>
                    </div>


                              <div class="span2">
                      <div class="control-group">
                            <div class="controls">
                                <input id="rb_comun" name="rb_tipo" type="radio" value="C" class="span12" checked="checked"> 
                                &nbsp; Comerciales
                              
                             </div>

                       </div>
                  </div>

                  <div class="span2">
                      <div class="control-group" >
                            <div class="controls">
                            
                                  <input id="rb_difer" name="rb_tipo" type="radio" value="D" class="span12">
                                 &nbsp; Pago Diferido
                             </div>

                       </div>
                  </div>

                </div>

                <div class="row-fluid">

                     <div class="span2">
                      <label for="txtChqInicial">Cheque Inicial</label>

                      </div>
                    <div class="span2">
                         <div class="control-group">
                            <div class="controls">
                                 <input id="txtChqInicial" type="text"  class="span8 obligatorio"/>
                                                                    
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                      <label for="txtNroChq">Nro de Cheques</label>

                      </div>
                    <div class="span2">
                         <div class="control-group">
                            <div class="controls">
                                 <input id="txtNroChq" type="text" class="span8 obligatorio"/>
                                                                    
                            </div>
                        </div>
                    </div>

                    
                     <div class="span2">
                      <label for="txtChqFinal">Cheque Final</label>

                      </div>
                    <div class="span2">
                         <div class="control-group">
                            <div class="controls">
                                 <input id="txtChqFinal" disabled="disabled" type="text" class="span8 obligatorio"/>
                                                                    
                            </div>
                        </div>
                    </div>

                </div>

                
  

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>


                <input type="hidden" id="hddauxiliar" value=""/>
                <input type="hidden" id="hddauxiliar2" value=""/>
                <input type="hidden" id="hddauxiliar3" value=""/>
                <input type="hidden" id="hddauxiliar4" value=""/>
                <input type="hidden" id="hddauxiliar5" value=""/>

            
             
          </div>  
         </div>
    </div>
</div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMCHQA.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMCHQA.init();

    });
</script>