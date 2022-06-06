<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMCFAL.ascx.vb" Inherits="vistas_NA_NAMCFAL" %>




<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>ALMACENES</h4>
                <div class="actions" style="margin-top: 10px;">
                   <%-- <a href="?f=namcfal" class="btn green"><i class="icon-plus"></i>Nuevo</a>--%>
                    <a href="?f=nalcfal" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Código</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="span1"></div>
                        <div class="span1">
                            <label>Estado</label>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">

                                    <input id="chkactivo" type="checkbox" checked />
                                    Activo
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12" data-placeholder="EMPRESA">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                        
                    </div>
                </div>
                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboSucursal">
                        <%--SUCURSAL --%>Establecimiento</label>      
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcscsl" class="span12" data-placeholder="ESTABLECIMIENTO" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                     
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label">Almacen</label>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">

                                <input id="txtalmacen" class="span12" type="text" placeholder="ALMACEN" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-------->

                <div class="row-fluid">        
                       <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Tipos de Almacen</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <div class="span11">
                          <select id="slctipoalmacen" data-placeholder="TIPO DE ALMACEN" class="span12" >
                                   <option></option>
                               </select> 
                              </div>
                                      <div class="span1">
                             <span id="tipo_info"><i style="color:#888; cursor:help;" class="icon-info-sign"></i>
                                </span>   
                            </div>
                        </div>
                            
                        </div>
                    </div>   
                
                                                  
                     <div class="span1">
                        <div class="control-group ">
                            <label class="control-label">Encargado Almacen</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                               <select id="slcencargado" class="span12" disabled="disabled" data-placeholder="EMPLEADO...">
                                   <option></option>
                               </select> 
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                               <a style="display:none;" id="BuscaDetalle" class="btn black" data-toggle="modal"
                                data-target="#muestradetalle"><i class="icon-search"></i>&nbsp;</a>
                            </div>
                        </div>
                    </div>                 
                </div>
                <!-------->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group ">
                            <label>Dirección</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtdireccion" class="span10" placeholder="DIRECCION" type="text" maxlength="250" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcpais">
                                País</label>  
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcpais" class="span12 combo" data-placeholder="PAIS">
                                   
                                </select>
                            </div>
                        </div>
                    </div>
                   </div>
                <!-------->               
                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Ubigeo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtubigeo" class="span12 " disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                           <div class="controls" id="departamento">
                                <select id="slcdepa" class="span12  combo" data-placeholder="DEPARTAMENTO" disabled>
                                  <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls" id="provincia">
                                <select id="slcprov" class="span12  combo" data-placeholder="PROVINCIA" disabled>
                                   <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls" id="distrito">
                                <select id="slcdist" class="span12  combo" data-placeholder="DISTRITO" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span3"></div>
                </div>
                <!-------->
                 <div class="row-fluid">
                     <div class="span2">
                        <div class="control-group ">
                            <label>Urbanizacion</label>
                        </div>
                    </div>

                     <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtUrba" placeholder="Urbanizacion" class="span12" type="text" />
                            </div>
                        </div>
                    </div>

                 </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Teléfono</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txttelefono" placeholder="TELEFONO" class="span12" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Anexo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <input id="txtanexo" class="span12" placeholder="ANEXO" type="text" />
                        </div>
                    </div>                   
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechai">Fecha Inicio</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechai" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <%--<div class="span1"></div>--%>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Término</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechat" placeholder="dd/mm/yyyy" disabled />
                            </div>
                        </div>
                    </div>
                     <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcimpr">
                                Impresora</label>  
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcimpr" class="span12" data-placeholder="IMPRESORA">
                                     <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------->
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:actualizar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<script type="text/javascript" src="../vistas/NA/js/NAMCFAL.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMCFAL.init();


    });



</script>
