<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMMOBU.ascx.vb" Inherits="vistas_NF_NFMMOBU" %>

<style>
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #329ED1;
        color: #FDFDFD;
        filter: none;
    }
</style>

<!-- VENTANA MODAL QUE SE ACTIVA SI LA MARCA NO EXISTE-->
<div id="MarcnoExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajemodal">
        <p>
            La marca ingresada no existe desea crearla?
        </p>
    </div>
    <div class="modal-footer">
        <a href="javascript:rptano();" class="btn">No</a>
        <a href="javascript:rptasi();" class="btn blue">Si</a>
    </div>
</div>
<!-- FIN VENTANA MODAL-->


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MODELOS DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmmobu"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nflmobu"><i class="icon-list"></i>&nbsp;Listar</a>
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
                    <div class="span1 offset1">
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
                        <label class="control-label" for="txtnombre">Nombre del Modelo</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre del modelo" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label" for="slccarroceria">Carrocería</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slccarroceria" class="span12" data-placeholder="CARROCERIA">
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
                        <label class="control-label" for="txtmarca">Marca</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="controlmarca">
                                <input id="txtmarca" class="span12 bloq" type="text" placeholder="MARCA"/>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label" for="txtnasientos">Número de Asientos</label>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnasientos" class="span6" placeholder="0" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNroEjes">
                                Número de Ejes</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNroEjes" class="span12" placeholder="0" maxlength="2" onkeypress='return ValidaNumeros(event,this)' />
                            </div>
                        </div>
                    </div>
                </div>            

                <!---fin linea -->
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                </div>

                <div class="row-fluid">
                    <div class="span6">
                        <fieldset class="span12">
                            <legend>Peso (Kg.)
                            </legend>

                            <div class="span2">
                                <label class="control-label" for="txtpbruto">Peso Bruto</label>
                            </div>

                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtpbruto" class="span8" placeholder="Peso Bruto" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <label class="control-label" for="txtpseco">Peso Neto</label>
                            </div>

                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtpseco" class="span8" placeholder="Peso Neto" type="text" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div class="span6">
                        <fieldset>
                            <legend>Dimensión (Mts.)
                            </legend>

                            <div class="span1">
                                <label class="control-label" for="txtlargo">Largo</label>
                            </div>
                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" value="0.00" id="txtlargo" class="span7">
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <label class="control-label" for="txtancho">Ancho</label>
                            </div>
                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" value="0.00" id="txtancho" class="span7">
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <label class="control-label" for="txtalto">Alto</label>
                            </div>
                            <div class="span2">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" value="0.00" id="txtalto" class="span10">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <!---fin linea -->
                <input type="hidden" id="hddmarcas" value="" />

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NF/js/NFMMOBU.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMMOBU.init();
    });
</script>