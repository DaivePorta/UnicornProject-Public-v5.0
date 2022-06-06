<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPMMAIL.ascx.vb" Inherits="vistas_NP_NPMMAIL" %>

<div class="row-fluid">
      <div class="span12">
           <div class="portlet box blue" id="ventana">
               <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>CONFIGURACION CORREOS PRODUCCION</h4>
              <div class="actions">                   
                    <a href="?f=npmmail" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nplmail" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

             </div>
          

          <div class="portlet-body">
              <div class="row-fluid" id="Div2">
                  <div class="span6">
                      <div class="portlet box green" id="Div1">
                           <div class="portlet-title" style="padding-top: 1px;padding-bottom: 1px;padding-left: 1px;">
                               <h6 style="line-height: normal;margin: 8px;"><i class="icon-search"></i> CONDICIONES:</h6>                    
                          </div>
                          <div class="portlet-body">
                               <div class="row-fluid" id="filtro01">
                                   <div class="span12">
                                       <div class="span12">
                                           <div class="row-fluid">
                                               <div class="span4" style="height: 50px;">
                                                   <div class="control-group">
                                                       <div class="controls" style="height: 30px;">
                                                           <label class="radio">
                                                               <div class="radio disabled">
                                                                   <span>
                                                                       <input type="radio" name="filtro" style="opacity: 0;" id="chkRangos" checked="checked" />
                                                                   </span>
                                                               </div>
                                                               Cargos
                                                           </label>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div class="span7 contenido" id="filtro"></div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div class="row-fluid" id="filtro02">
                                   <div class="span12">
                                       <div class="row-fluid">
                                           <div class="span4" style="height: 50px;">
                                               <div class="control-group">
                                                   <div class="controls" style="height: 30px;">
                                                       <label class="radio">
                                                           <div class="radio disabled">
                                                               <span>
                                                                   <input type="radio" name="filtro" style="opacity: 0;" id="chkempleado"  />
                                                               </span>
                                                           </div>
                                                           Empleados
                                                       </label>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                          </div>
                      </div>
                       </div>
                  <div class="span6">
                      <div class="row-fluid">
                          <div class="span12">
                              <div class="span2">
                                  <label class="control-label" for="cboetapa">Etapa:</label>
                              </div>
                              <div class="span8">
                                  <div class="control-group">
                                      <div class="controls">
                                          <select id="cboetapa" class="span12 obligatorio"></select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row-fluid">
                          <div class="span12">
                              <div class="span2">
                                  <label class="control-label" for="txtglosa">Glosa</label>
                              </div>
                              <div class="span10">
                                  <div class="control-group">
                                      <div class="controls">
                                          <textarea class="form-control" id ="txtglosa" rows="4" style="width:80%"></textarea>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                             </div>
              </div>    

              <input type="hidden" id="txtcodigo" value=""/>
                      <div class="form-actions">
                       <button type="button" id="grabar" class="btn blue" onclick="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</button>
                      <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>

                      </div>

                  
              </div>
          </div>
      </div>
</div>
<input type="hidden" id="hdproducto" />
<script type="text/javascript" src="../vistas/NP/js/NPMMAIL.js"></script>
<script>
    jQuery(document).ready(function () {
        NPMMAIL.init();
    });
</script>