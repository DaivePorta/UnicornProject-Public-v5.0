<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMBESO.ascx.vb" Inherits="vistas_NN_NNMBESO" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>BENEFICIOS SOCIALES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nnmbeso"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nnlbeso"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">

                    <!-- INICIO ACTIVO -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigo">
                                Codigo</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span6" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkactivo">
                                <div class="checker" id="uniform-chkactivo"><span class="checked">
                                    <input type="checkbox" id="chkactivo" name="chkactivo" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                Activo</label>
                        </div>
                    </div>
                    <!-- FIN ACTIVO -->


                    <!-- TIPO -->

                    <!-- FIN TIPO -->
                    <div class="span1">
                    </div>




                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- SEGUNDA LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_descripcion">
                                Descripcion</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txt_descripcion" class="m-wrap span12" type="text"   style="text-transform:uppercase ;"/>
                            </div>
                        </div>
                    </div>


                </div>
                <!-- FIN SEGUNDA LINEA -->

                <!--  TERCERA LINEA -->
         
                <!-- FIN TERCERA LINEA -->


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>   Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>   Cancelar</a>
                </div>
            </div>
</div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->




<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NN/js/NNMBESO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMBESO.init();


    });


</script>

