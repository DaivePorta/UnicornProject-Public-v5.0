<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMMARC.ascx.vb" Inherits="vistas_NF_NFMMARC" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MARCAS DE UNIDADES DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmmarc"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nflmarc"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtcodigo">Código</label>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset1">
                        <label class="control-label" for="chkactivo">
                            Activo</label>
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
                        <label class="control-label" for="txtnombre">
                           Marca</label>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre de la marca" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <!---fin linea -->

              <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>
                        </div>
                    </div>
                    <div class="span9">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtDescripcion" class="span12" placeholder="Descripción" style="resize: vertical;" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NF/js/NFMMARC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMMARC.init();
    });
</script>
