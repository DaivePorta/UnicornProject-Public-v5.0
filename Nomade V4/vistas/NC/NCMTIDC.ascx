<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTIDC.ascx.vb" Inherits="vistas_NC_NCMTIDC" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO DOCUMENTO COMERCIAL</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmtidc"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=ncltidc"><i class="icon-list"></i>Listar</a>
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

<%--                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="chkcompra">
                                Reg. Compras</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkcompra" type="checkbox" />
                            </div>
                        </div>
                    </div>--%>

<%--                    <div class="span6">
                    </div>--%>

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
                                <input id="txtcodigosunat" class="span12" placeholder="" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="chkDocInterno">
                                Doc. Interno</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkDocInterno" type="checkbox" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdesc">
                                Descripción</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdesc" class="span12" placeholder="Descripcion del Tipo de Documento" type="text" />
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
                            <label class="control-label" for="txtdeco">
                                Descripcion Corta</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdeco" class="span10" placeholder="" type="text" onkeypress="return descripcionCorta(this)" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtAcronimo">Acrónimo</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtAcronimo" class="span3" type="text" maxlength="3" />
                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="row-fluid">
                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Registro Compras:</label>
                        </div>
                    </div>

                    <div class="span2" id="divchkRegistro">
                        <div class="control-group">
                            <div class="controls">
                                <div class="danger-toggle-button-custom">
                                    <input id="chkcompra" type="checkbox" class="toggle" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                

                <!---fin linea -->



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NC/js/NCTIDC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCTIDC.init();

    });
</script>
