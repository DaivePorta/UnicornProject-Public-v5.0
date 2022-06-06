<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMDOID.ascx.vb" Inherits="vistas_NC_NCMDOID" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPOS DOCUMENTOS IDENTIDAD</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmdoid"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=ncldoid"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigo">
                                Código
                            </label>
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
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />Activo
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcosu">
                                Código Sunat</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcosu" class="span12" placeholder="Código Sunat" type="text" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Nombre Documento</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre Documento" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
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
                                <input id="txtnombrecorto" class="span12" placeholder="Nombre Corto" type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtorden">
                                Orden</label>

                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtorden" type="text" class="span12" placeholder="Orden" />
                            </div>
                        </div>
                    </div>

                    <div class="span1"></div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="chksemuestra">
                                Se Muestra</label>

                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chksemuestra" type="checkbox" checked />
                            </div>
                        </div>
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


<script type="text/javascript" src="../vistas/NC/js/NCDOID.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCDOID.init();
        
    });
</script>
