<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMRTEP.ascx.vb" Inherits="vistas_NC_NCMRTEP" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGISTRO DE TARJETAS EMPRESARIALES PROPIAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmrtep"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclrtep"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">

                    <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Empresa</label>

                        </div>
                    </div>

                       <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcEmpresa" class="span12 obligatorio empresa" data-placeholder="EMPRESA">
                                     <option></option>
                                 </select>
                            </div>
                        </div></div>
                
                    <div class="span1">
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


                </div>
                        </div>
                <!-- FIN PRIMERA LINEA -->

                    <div class="row-fluid">
                        
                         <div class="span2">
                            <label> Número Cuenta</label></div>
                         <div class="span6">
                             <div class="control-group">
                                   <div class="controls">
                                       <select class="span7 obligatorio" id="slcctaban" data-placeholder="CUENTA BANCARIA">
                                           <option></option>
                                        </select>
                                       &nbsp;
                                       <span id="moneda"></span>
                                   </div></div>
                         </div>

                    </div>


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdesc">
                                Descripción de Tarjeta</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdesc" class="span9 obligatorio" placeholder="DESCRIPCION PERSONAL DE TARJETA"  type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                       <label>Fecha Inicio</label> </div>
                    <div class="span2">
                        <div class="control-group">
                              <div class="controls">
                                  <input name="txt_fecha_inicio" type="text" id="txt_fecha_inicio"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                              </div>
                        </div>
                    </div>


                </div>

                <!---fin linea -->


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnro">
                                Número de Tarjeta</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnro" class="span9 obligatorio" placeholder="NUMERO DE TARJETA"  type="text" />
                            </div>
                        </div>
                    </div>


                     <div class="span1">
                       <label>Fecha Fin</label> </div>
                    <div class="span2">
                        <div class="control-group">
                              <div class="controls">
                                  <input name="txt_fecha_fin" type="text" id="txt_fecha_fin"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                              </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpere">
                                Persona Responsable</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpere" class="span12 obligatorio personasEmpleado" placeholder="PERSONA RESPONSABLE"  type="text" />
                            </div>
                        </div>
                    </div>


                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slctipo">
                                Tipo</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slctipo" data-placeholder="TIPO TARJETA" class="span10 obligatorio">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                </div>

                <!---fin linea -->



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:crearTarjetaEmpresa();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <input type="hidden" id="hddauxiliar" value="" />

            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="../vistas/NC/js/NCMRTEP.js"></script>

<script>

    jQuery(document).ready(function () {
       
        NCMRTEP.init();

    });
</script>
