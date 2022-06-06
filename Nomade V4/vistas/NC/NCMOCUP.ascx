<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMOCUP.ascx.vb" Inherits="vistas_NC_NCMOCUP" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>OCUPACIONES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmocup"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclocup"><i class="icon-list"></i> Listar</a>
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


                    <div class="span6">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigosunat">
                                Codigo Sunat</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodigosunat" class="span12" placeholder=""  type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span9">
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

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre de la ocupacion"  type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span5">
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombrecorto">
                                Nombre Corto</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombrecorto" class="span12" placeholder="Nombre Corto"  type="text" />
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
                            <label class="control-label" for="slcnivel">
                                Nivel</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcnivel" class="span12" >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span9">
                    </div>

                </div>

                <!---fin linea -->



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCOCUP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCOCUP.init();
        
    });
</script>
