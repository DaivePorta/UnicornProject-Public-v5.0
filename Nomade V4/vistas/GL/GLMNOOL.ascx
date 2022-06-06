<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMNOOL.ascx.vb" Inherits="vistas_GL_ajax_GLMNOOL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;NOMENCLATURA LETRAS</h4>
                <div class="actions" style="margin-top: 10px">
      
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding-top: 25px; padding-bottom: 10px">
                    <div class="span12">
                        <div class="span3"></div>
                        <div class="span6">
                            <h1 style="text-align: center" id="lblPad"></h1>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span3"></div>
                    <div class="span6">
                        <hr />
                    </div>
                </div>
                <div class="row-fluid" style="padding-top: 10px; padding-bottom: 10px">
                    <div class="span12">
                        <div class="span3"></div>
                        <div class="span6">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtMnemonico" style="text-align: center">MNEMONICO</label>
                                    <div class="controls">
                                        <input type="text" id="txtMnemonico" class="m-wrap huge popovers" data-content="Primeras letras que llevará el código de cada nueva orden de lote." data-original-title="Mnemónico" data-placement="bottom" data-trigger="hover" style="background-color: rgb(251, 251, 182); width: 95%!important; text-align: center">
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtContenido" style="text-align: center">DIGITOS NUMERICOS</label>
                                    <div class="controls">
                                        <input type="text" id="txtContenido" class="m-wrap huge popovers" data-content="Incluya la cantidad de dígitos numéricos que tendrá cada código." data-original-title="Contenido numérico" data-placement="bottom" data-trigger="hover" style="width: 100%!important; text-align: center" onkeypress="return validaNumeros(event, this)">
                                    </div>
                                </div>
                            </div>
                            <div class="span1"></div>
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtInicio" style="text-align: center">VALOR DE INICIO</label>
                                    <div class="controls">
                                        <input type="text" id="txtInicio" class="m-wrap huge popovers" data-original-title="Valor de Inicio" data-placement="bottom" data-trigger="hover" style="width: 95%!important; text-align: center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" onclick="Cancelar()" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/GL/js/GLMNOOL.js"></script>
<script>
    jQuery(document).ready(function () {
        GLMNOOL.init();
    });
</script>