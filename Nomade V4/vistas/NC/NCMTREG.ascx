<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTREG.ascx.vb" Inherits="vistas_NC_NCMTREG" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO DE REGIMEN RENTA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmtreg"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=ncltreg"><i class="icon-list"></i>Listar</a>
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
                                <input id="txtcodigo" class="m-wrap span12" disabled="disabled" type="text" />
                            </div>
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
                            <label class="control-label" for="txt_cod_sunat">
                                Codigo Sunat</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txt_cod_sunat" class="m-wrap span12"  type="text" placeholder="Codigo Sunat" />
                            </div>
                        </div>
                    </div>
                       <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtnombre">
                                        Descripcion</label>

                                </div>
                            </div>
                    <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtnombre" class="m-wrap span12" placeholder="Descripcion" type="text"  style="text-transform :uppercase ;"/>
                                    </div>
                                </div>
                            </div>
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkactivo">
                                <div class="checker" id="uniform-chkactivo"><span class="checked"><input type="checkbox" id="chkactivo" name="chkactivo" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                Activo</label>
                        </div>
                    </div>
                </div>
                <!-- FIN SEGUNDA LINEA -->

                 <!--  TERCERA LINEA -->
                 <div class="row-fluid">
                     <div class="span10"></div>
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkexoigv">
                                <div class="checker" id="uniform-chkexoigv"><span><input type="checkbox" id="chkexoigv" name="chkexoigv" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                Exonerado I.G.V</label>
                        </div>
                    </div>
                 </div>
           <!-- FIN TERCERA LINEA -->


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->




<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NC/js/NCMTREG.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTREG.init();
        $('#uniform-chkactivo span').removeClass().addClass("checked");
        $('#chkactivo').attr('checked', true);
        $('#uniform-chkexoigv span').removeClass();
        $('#chkexoigv').attr('checked', false);

    });


</script>
