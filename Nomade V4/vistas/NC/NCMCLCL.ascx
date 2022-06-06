<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCLCL.ascx.vb" Inherits="vistas_NC_NCMCLCL" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CLASES DE CLIENTES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmclcl"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclclcl"><i class="icon-list"></i> Listar</a>
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

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chx_defecto">
                                Predeterminado</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chx_defecto" type="checkbox" disabled ="true"/>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Nombre de la categoría</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre de la categoría"  type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span6">
                    </div>

                </div>

                <!---fin sgda linea -->

                <div class="row-fluid">
                                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" class="m-wrap span12" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
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


<script type="text/javascript" src="../vistas/NC/js/NCMCLCL.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMCLCL.init();
        
    });
</script>
