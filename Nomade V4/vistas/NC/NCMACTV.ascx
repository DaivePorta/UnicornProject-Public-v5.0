<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMACTV.ascx.vb" Inherits="vistas_NC_NCMACTV" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ACTIVIDADES ECONOMICAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmactv"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclactv"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Código</label>
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

                    <%--<div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkactivo">
                                Activo</label>
                        </div>
                    </div>--%>

                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />Activo
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigosunat">
                                CIIU</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodigosunat" class="span12" placeholder="CIIU" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>

                <!---fin linea -->


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Nombre</label>

                        </div>
                    </div>

                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre" type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span4">
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombrepropio">
                                Nombre Corto</label>

                        </div>
                    </div>

                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombrepropio" class="span12" placeholder="Nombre Corto" type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span4">
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtareadescripcion">
                                Descripción</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtareadescripcion" style="height: 100px;" class="span12"></textarea>

                            </div>
                        </div>
                    </div>


                    <div class="span9">
                    </div>

                </div>

                <!---fin linea -->



                <div class="form-actions">
                    <button type="button" id="grabar" class="btn blue" onclick="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCACTV.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCACTV.init();
        
    });
</script>
