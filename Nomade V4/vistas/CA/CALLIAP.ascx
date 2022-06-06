<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALLIAP.ascx.vb" Inherits="vistas_CA_CALLIAP" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-ok-sign"></i>LISTA DE ASIGNACIONES APROBADAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=calapcr"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=calliap"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="7" />
                <input type="hidden" id="hf_asignados"/>
                <div class="alert alert-error hide">
                              <button class="close" data-dismiss="alert"></button>
                              Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                           </div>
                <div class="alert alert-success hide">
                              <button class="close" data-dismiss="alert"></button>
                              Datos ingresados correctamente.
                           </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                 </div>
                <!-- FIN PRIMERA LINEA -->
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtempleado">
                                Empleado</label>

                        </div>
                    </div>
                    
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtempleado" name="txtempleado" class="span12 m-wrap required" placeholder="Digite Apellidos y Nombres"  type="text" />
                                <input type="hidden" id="hf_pidm" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfinicio">
                                F-Inicio</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtfinicio" name="txtfinicio" class="m-wrap span12 fecha required"  data-date-format="dd/mm/yyyy"  type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtffin">
                                F-Fin</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtffin" name="txtffin" class="m-wrap span12 fecha required"  data-date-format="dd/mm/yyyy"  type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <a href="javascript:Grabar();" class="btn purple"><i class="icon-search"></i> Ver</a>
                    </div>
                </div>
                <!---fin linea -->
                <div class="row-fluid">
                    <div class="spa12" id="tblDatos">

                    </div>
                </div>

            </div>
        </div>
   </div>
    </div>
<script type="text/javascript" src="../vistas/CA/js/CAMASCR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        $(".combo").select2();
        CAMASCR.init();
    });
</script>
