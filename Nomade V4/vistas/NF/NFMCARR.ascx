<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMCARR.ascx.vb" Inherits="vistas_NF_NFMCARR" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CARROCERIAS DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmcarr"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nflcarr"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span6">
                        <!-- primera linea --->

                        <div class="row-fluid">


                            <div class="span4">
                                <label class="control-label" for="txtcodigo">Codigo</label></div>

                            <div class="span2">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <label class="control-label" for="chkactivo">Activo</label>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkactivo" type="checkbox" checked />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <!-- FIN PRIMERA LINEA -->

                        <!-- INICIO  LINEA -->
                        <div class="row-fluid">

                            <div class="span4">
                                <label class="control-label" for="txtcodMTC">Código MTC</label></div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtcodMTC" class="span6" placeholder="Cód. MTC"  type="text" />
                                    </div>
                                </div>
                            </div>

                            <%--      ----         <div class="span2">
                        <BUTTON id="btnimgcarr" style="display:none;" class="btn purple"  disabled data-toggle="modal" data-target="#muestraimagenes"><i class="icon-picture" ></i> Ver Imágenes</BUTTON> 
                     </div>--%>
                        </div>

                        <!---fin linea -->


                        <!-- INICIO  LINEA -->
                        <div class="row-fluid">

                            <div class="span4">
                                <label class="control-label" for="txtnombre">Nombre de la Carrocería</label>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtnombre" class="span12" placeholder="Nombre de la carrocería"  type="text" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!---fin linea -->

                        <div class="row-fluid">

                            <div class="span4">
                                <label class="control-label" for="txtdefinicion">Definición</label>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <textarea id="txtdefinicion" style="height: 150px;" class="span12"></textarea>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="span6">

                        <div class="span12">
                            <img id="imgcarr" style="max-height: 300px;" class="thumbnail span12" src="../../recursos/img/500x300.gif" alt="" />
                            <div>&nbsp;</div>
                            <div class="span12">
                                <input type="file" class="btn blue" id="btnimgcarr" />
                            </div>
                        </div>
                    </div>
                </div>



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>




<script type="text/javascript" src="../vistas/NF/js/NFMCARR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMCARR.init();

       

        // end of ready();

    });
</script>
