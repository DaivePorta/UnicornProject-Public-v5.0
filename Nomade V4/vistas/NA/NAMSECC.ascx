<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMSECC.ascx.vb" Inherits="vistas_NA_NAMSECC" %>



<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ZONIFICACIÓN DE ALMACÉN</h4>
                <div class="actions">
                    <a class="btn green" href="?f=namsecc"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nalsecc"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span8"  type="text" />
                            </div>
                        </div>
                    </div>

                   

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkactivo">
                                Activo</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />
                            </div>
                        </div>
                    </div>

                      <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkpaletizado">
                                Paletizado</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkpaletizado" type="checkbox"  />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtnropalets">
                                Número Palets</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtnropalets" type="text" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>


                </div>
                <!-- FIN PRIMERA LINEA -->

                 <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12" data-placeholder="EMPRESA" required>
                                    <option></option>
                                   
                                </select>
                            </div>
                        </div>
                    </div>

                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcalmacen">
                                Almacén</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcalmacen" class="span12" data-placeholder="ALMACEN" disabled="disabled" required>
                                    <option></option>
                                  
                                </select>
                            </div>
                        </div>
                    </div>
                   

                </div>

                <!---fin linea -->



                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Zona</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion" class="span12" placeholder="Nombre de la zona"  type="text" />
                            </div>
                        </div>
                    </div>


                   <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slctipoalmacen">
                               Tipo Almacén</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slctipoalmacen" class="span12" data-placeholder="TIPO ALMACEN"  required>
                                    <option></option>
                                  
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                   <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slctipoalmacenaje">
                                Tipo Almacenaje</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slctipoalmacenaje" class="span12" data-placeholder="TIPO ALMACENAJE" required>
                                    <option></option>
                                    <option value="0001">GRANEL</option>
                                     <option value="0002">PISO</option>
                                     <option value="0003">ESTANTERIA O RACK</option>
                                     <option value="0004">CAJONES</option>
                                     <option value="0005">ARMARIOS Y ANAQUELES</option>
                                     <option value="0006">SILO</option>
                                    <option value="0007">SILO ROBOTIZADO</option>
                                   
                                </select>
                            </div>
                        </div>
                    </div>

                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcsistemaalmacenaje">
                                Sistema Almacenaje</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcsistemaalmacenaje" class="span12" data-placeholder="SISTEMA ALMACENAJE" disabled="disabled" required>
                                    <option></option>
                                    <option value="0000">SIN SISTEMA DE ALMACENAJE</option>
                                     <option value="0001">ESTANTERIA METALICA</option>
                                     <option value="0002">RACK SELECTIVO</option>
                                     <option value="0003">MENORACK</option>
                                     <option value="0004">RACK PUSH BACK</option>
                                     <option value="0005">RACKS DRIVE IN-THRU</option>
                                     <option value="0006">DINAMICO</option>
                                    <option value="0007">CANTILEVER</option>
                                    <option value="0008">ALMACENAJE ENTREPISO</option>
                                    <option value="0009">DOUBLE DEEP</option>
                                    <option value="0010">CARTOO-FLOW</option>
                                  
                                </select>
                            </div>
                        </div>
                    </div>
                   

                </div>

                <!---fin linea -->
          <div class="row-fluid">

                         <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slctipoalmacen">
                               Costo</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCosto" type="text" class="span6" onkeypress="return ValidaDecimales(event,this,2)" placeholder="0.00" />
                               
                            </div>
                        </div>
                    </div>


          </div>
               



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NA/js/NAMSECC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMSECC.init();

    });
</script>
