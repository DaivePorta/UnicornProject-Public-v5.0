<%@ Control Language="VB" AutoEventWireup="false" CodeFile="OPMTIOP.ascx.vb" Inherits="vistas_OP_OPMTIOP" %>



<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO TIPO DE OPERACIONES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=OPMTIOP"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=OPLTIOP"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc1">
                                    CODIGO</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" disabled="disabled" class="span12" id="txtcodeTP" placeholder="CODIGO" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>

                         <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc2">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkEstado" checked /><span> Activo</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc1">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12" id="txtdesc" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnActualizar" class="btn blue" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <div>


        <input type="hidden" id="hfCOD_TIOP" />
    </div>

</div>


<script type="text/javascript" src="../vistas/OP/js/OPMTIOP.js"></script>
<script>
    jQuery(document).ready(function () {
        OPMTIOP.init();
    });
</script>
