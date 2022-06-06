<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMCOMB.ascx.vb" Inherits="vistas_NF_NFMCOMB" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>COMBUSTIBLE DE  VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmcomb"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nflcomb"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <label class="control-label" for="txtcodigo">Codigo</label>
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
                        <label class="control-label" for="chkactivo">Activo</label>
                    </div>

                    <div class="span1">
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

                    <div class="span2">
                        <label class="control-label" for="txtcodMTC">Código MTC</label>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodMTC" class="span6" placeholder="Código"  type="text" />
                            </div>
                        </div>
                    </div>
                </div>

                <!---fin linea -->


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="txtnombre">Nombre del Combustible</label>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre del combustible"  type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="txtdefinicion">Definición</label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtdefinicion" style="height: 100px;" class="span12"></textarea>

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



<script type="text/javascript" src="../vistas/NF/js/NFMCOMB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMCOMB.init();

       

        // end of ready();

    });
</script>
