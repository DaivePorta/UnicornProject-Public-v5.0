<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEIMG.ascx.vb" Inherits="vistas_NC_NCMEIMG" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MEMBRETADO POR EMPRESA</h4>
                <div class="actions">
                    <!--a href="?f=NCMEIMG" class="btn green"><i class="icon-plus"></i>Nuevo</a-->
                </div>

            </div>
            <div class="portlet-body">
            
                <div class="row-fluid">
                    <div class="span12" style="margin-left: 0">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_Empresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <ul class="thumbnails">
                        <li class="span6">
                            <h4>Imagen Superior</h4>
                            <img id="imgSuperior" style="max-height: 200px;" class="thumbnail" src="../../recursos/img/SIN_IMAGEN.png" alt="" />
                            <div class="span12" style="margin-top: 5px;">
                                    <input type="file" class="btn blue" id="superior" />
                            </div>
                        </li>

                        <li class="span6">
                            <h4>Imagen Inferior</h4>
                            <img id="imgInferior" style="max-height: 200px;" class="thumbnail" src="../../recursos/img/SIN_IMAGEN.png" alt="" />
                            <div class="span12" style="margin-top: 5px;">
                                    <input type="file" class="btn blue" id="inferior" />
                            </div>
                        </li>

                    </ul>
                </div>

                <div class="form-actions">
                    <button type="button" id="grabar" class="btn blue" onclick="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMEIMG.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMEIMG.init();
    });
</script>


