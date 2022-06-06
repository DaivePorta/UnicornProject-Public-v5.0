<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMTIAL.ascx.vb" Inherits="vistas_NA_NAMTIAL" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPOS DE ALMACEN</h4>
                <div class="actions">
                    <a class="btn green" href="?f=namtial"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=naltial"><i class="icon-list"></i> Listar</a>
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

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

  
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />&nbsp;Activo
                            </div>
                        </div>
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                   <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                              Nombre</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre"  type="text" />
                            </div>
                        </div>
                    </div>


                 <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcventa">
                               Venta</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcventa" class="span12" data-placeholder="" >
                                  
                                     <option value="S">SI</option>
                                    <option value="N">NO</option>
                                </select>
                                    
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin sgda linea -->

                  <!-- INICIO SEGUNDA LINEAb -->
                <div class="row-fluid">
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                               Descripción</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtdescripcion" class="span12" placeholder="Descripción"  style="height: 150px;"></textarea>
                            </div>
                        </div>
                    </div>
                 



                </div>

                <!---fin sgda lineab -->

         


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NA/js/NAMTIAL.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMTIAL.init();

    });
</script>
