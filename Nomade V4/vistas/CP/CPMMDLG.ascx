<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMMDLG.ascx.vb" Inherits="vistas_CP_CPMMDLG" %>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GRUPOS PAGOS DIVERSOS</h4>
                <div class="actions">
                    <a class="btn green" href="javascript:Nuevo();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=cplmdlg"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label pull-right" for="txtDescCorta">
                                    Descripción Corta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescCorta" class="span12" type="text" maxlength="18" placeholder="Descripción Corta"  tabindex="1"/>
                                </div>
                            </div>
                        </div>

                        <div class="span2 offset1">
                            <div class="control-group">
                                <label class="control-label" for="chkEstado">
                                    <input type="checkbox" id="chkEstado" name="chkEstado" checked="checked" tabindex="3"/>
                                    Activo</label>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label pull-right" for="txtDescripcion">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txtDesc" class="span12" placeholder="Descripción" style="resize:vertical;max-height:200px;" rows="3" maxlength="198" tabindex="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="form-actions" id="acciones_generales" style="display: block;">
                        <div class="span6" id="divBtnsMantenimiento">
                            <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a class="btn" href="?f=cpmmdlg"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </div>
</div>

<input type="hidden" id="hfCode" />
<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPMMDLG.js"></script>

<script>
    jQuery(document).ready(function () {
        CPMMDLG.init();
    });
</script>