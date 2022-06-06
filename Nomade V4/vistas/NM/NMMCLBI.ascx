<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMCLBI.ascx.vb" Inherits="vistas_NM_NMMCLBI" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CLASIFICACIÓN DE BIENES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmclbi"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlclbi"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                <input id="chkactivo" type="checkbox" checked />&nbsp;Activo
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Descripción</label>
                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion" class="span12" placeholder="Descripción" type="text" />
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
                            <label class="control-label" for="txtnombrecorto">
                                Descripción Corta</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombrecorto" class="span12" placeholder="Descripción Corto" type="text" />
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


<script type="text/javascript" src="../vistas/NM/js/NMMCLBI.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMCLBI.init();

    });
</script>
