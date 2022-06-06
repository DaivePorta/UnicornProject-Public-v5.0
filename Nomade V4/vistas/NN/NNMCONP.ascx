<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMCONP.ascx.vb" Inherits="vistas_NN_NNMCONP" %>
<style>
    .toggle-button span.primary, .toggle-button span.labelLeft {
        background: #cc0024 !important;
    }

    .toggle-button span.labelRight {
        color: #fefefe !important;
        background: #0088cc !important;
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONCEPTOS PLANILLAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NNMCONP"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NNLCONP"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">



                <div class="row-fluid">
                    <div id="divSpanTablesGruposSubgrupos" class="span12">
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsGrupo" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddGrupo" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefGrupo" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditGrupo" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <table id="tbl_grupo" class="display DTTT_selectable" style="max-width: 100%">
                                        <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                            <tr>
                                                <th style="max-width: 10%;">CÓDIGO
                                                </th>
                                                <th style="max-width: 70%;">DESCRIPCION
                                                </th>
                                                <th style="max-width: 20%;">ESTADO
                                                </th>
                                                <th style="display: none;">CODIGO PLAME
                                                </th>
                                                <th style="display: none;">ABREV
                                                </th>
                                                <th style="display: none;">IND_I_E
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsSubgrupo" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddSubGrupo" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefSubGrupo" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditSubGrupo" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <table id="tbl_Subgrupo" class="display DTTT_selectable" style="height: 50px;">
                                        <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                            <tr>
                                                <th>CÓDIGO
                                                </th>
                                                <th>DESCRIPCION
                                                </th>
                                                <th>ESTADO
                                                </th>
                                                <th style="display: none;">CODIGO PLAME
                                                </th>
                                                <th style="display: none;">ABREV
                                                </th>
                                                <th style="display: none;">IND_ADICIONAL
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
</div>
<div id="MuestraModal" class="modal hide fade" tabindex="-1" role="dialog" style="width: 40%;" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal">
        <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="myModalLabel"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoModal">Código</label>
                                <div class="controls">
                                    <input id="txtCodigoModal" class="limpiar span8" disabled="disabled" type="text" style="font-weight: bold; font-size: medium;">
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txt_plame_grupo">Cód. Plame</label>
                                <div class="controls">
                                    <input id="txt_plame_grupo" class="limpiar span6" type="text" onkeypress="return ValidaNumeros(event,this)" style="color: blue; font-weight: bold; font-size: medium;" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal">Descripción</label>
                                <div class="controls">
                                    <textarea id="txtDescripcionModal" class="limpiar span12" style="text-transform: uppercase; font-weight: bold;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="txtAbreviaturaModal">Abreviatura</label>
                                <div class="controls">
                                    <textarea id="txtAbreviaturaModal" class="limpiar span12" style="text-transform: uppercase; font-weight: bold;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span1"></div>
                <div class="span3">
                    <label class="control-label" for="chkactivoModal">
                        <span id="Span3">Activo</span>
                    </label>
                    <div class="div_toggle_estado">
                        <input type="checkbox" id="chkactivoModal" class="toggle" />
                    </div>
                </div>

                <div class="span3">
                    <label class="control-label" for="chktipo_ingreso">
                        <span id="Span1">Tipo Ingreso</span>
                    </label>
                    <div class="div_toggle_tipo_ingreso">
                        <input type="checkbox" id="chktipo_ingreso" class="toggle" />
                    </div>
                </div>
            </div>


            <br />

            <div class="form-actions" style="text-align: right;" id="botones_grupo">
                <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i>Grabar</a>
                <a id="cancelarModal" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i>Cancelar</a>
            </div>



        </div>
    </div>
</div>



<div id="MuestraModalSubGrupo" class="modal hide fade" tabindex="-1" role="dialog" style="width: 40%;" aria-hidden="true" aria-labelledby="myModalLabel2">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>

            <h4 id="myModalLabel2"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <%--    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoSubGrupo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoSubGrupo" class="limpiar span6" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="chkactivoSubGru">
                                    <div class="checker" id="uniform-chkactivoSubGru">
                                        <span class="checked">
                                            <input type="checkbox" id="chkactivoSubGru" name="chkactivoSubGru" checked="" class="m-wrap" style="opacity: 0;"></span>
                                    </div>
                                    Activo</label>
                            </div>
                        </div>
                    </div>--%>
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoSubGrupo">Código</label>
                                <div class="controls">
                                    <input id="txtCodigoSubGrupo" class="limpiar span8" disabled="disabled" type="text" style="font-weight: bold; font-size: medium;" />
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtcod_plame">Cód. Plame</label>
                                <div class="controls">
                                    <input id="txtcod_plame" class="limpiar span6" type="text" onkeypress="return ValidaNumeros(event,this)" style="color: blue; font-weight: bold; font-size: medium;" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionSubGrupo">Descripción</label>
                                <div class="controls">
                                    <textarea id="txtDescripcionSubGrupo" class="limpiar span12" style="text-transform: uppercase; font-weight: bold;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span1"></div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="txtAbreviaturaSubGrupo">Abreviatura</label>
                                <div class="controls">
                                    <textarea id="txtAbreviaturaSubGrupo" class="limpiar span12" style="text-transform: uppercase; font-weight: bold;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span1"></div>
                <div class="span3">
                    <label class="control-label" for="chkactivoSubGru">
                        <span id="Span2">Activo</span>
                    </label>
                    <div class="div_toggle_estado_subgrupo">
                        <input type="checkbox" id="chkactivoSubGru" class="toggle" />
                    </div>
                </div>

                <div class="span4">
                    <label class="control-label" for="chktipo_ingreso_subgrupo">
                        <span id="Span4">Tipo Ingreso</span>
                    </label>
                    <div class="div_toggle_tipo_ingreso_subgrupo">
                        <input type="checkbox" id="chktipo_ingreso_subgrupo" class="toggle" />
                    </div>
                </div>

                  <div class="span4">
                    <label class="control-label" for="chktipo_fijo">
                        <span id="Span5">Concepto en Planilla es</span>
                    </label>
                    <div class="div_toggle_adicional">
                        <input type="checkbox" id="chktipo_fijo" class="toggle" />
                    </div>
                </div>
            </div>


            <br />
            <%-- <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="rbtipo_ingreso">
                            Indicadores</label>

                    </div>
                </div>

            </div>
            <div class="row-fluid">
                <div class="span3"></div>
                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <label class="control-label">
                                <div class="radio" id="Div5">
                                    <span class="">
                                        <div class="radio" id="uniform-rbAdicional">
                                            <span>
                                                <input type="radio" checked="checked" class="limpiar span12" id="rbAdicional" name="adicional" style="opacity: 0;"></span>
                                        </div>
                                    </span>
                                </div>
                                Adicional
                            </label>

                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <label class="control-label">
                                <div class="radio" id="Div6">
                                    <span class="">
                                        <div class="radio" id="uniform-rbnoadicional">
                                            <span>
                                                <input type="radio" class="limpiar span12" id="rbnoadicional" name="adicional" style="opacity: 0;"></span>
                                        </div>
                                    </span>
                                </div>
                                No adicional
                            </label>

                        </div>
                    </div>
                </div>
            </div>--%>
            <div class="row-fluid" id="error" style="display: none;">
                <div class="span12">
                    <div class="control-group alert alert-error">
                        <label class="control-label" id="Label1" style="text-align: -webkit-center;">
                            IMPOSIBLE MODIFICAR EL INDICADOR!!
                            <br />
                            EXISTE UNA RELACION TIPO PLANILLA CON CONCEPTO
                            <br />
                            <b>*PARA MODIFICAR ELIMINAR LA RELACION ENTRE TIPO PLANILLA Y CONCEPTO</b>&nbsp;<i class="icon-remove-sign"></i>
                        </label>
                    </div>
                </div>

            </div>
            <div class="form-actions" style="text-align: right;" id="botones_subgrupo">
                <a id="grabarModalSubGrupo" class="btn blue" href="javascript:;"><i class="icon-save"></i>Grabar</a>
                <a id="cancelarModalSubGrupo" class="btn" href="javascript:cancelarModalSubGrupo();"><i class="icon-remove"></i>Cancelar</a>
            </div>



        </div>
    </div>
</div>

<input id="hfCOD_GRUPO" type="hidden" />
<input id="hfCOD_GRUPO_PLAME" type="hidden" />
<input id="hfDESC_GRUPO" type="hidden" />
<input id="hfESTADO_GRUPO" type="hidden" />
<input id="hfCOD_SGRUPO" type="hidden" />
<input id="hfCOD_SGRUPO_PLAME" type="hidden" />
<input id="hfDESC_SGRUPO" type="hidden" />
<input id="hfESTADO_SGRUPO" type="hidden" />

<input id="hfABREV_GRUPO" type="hidden" />
<input id="hfIND_ING_GRUPO" type="hidden" />
<input id="hfIND_ADI_GRUPO" type="hidden" />

<input id="hfABREV_SGRUPO" type="hidden" />

<input id="hfIND_ING_SGRUPO" type="hidden" />
<script type="text/javascript" src="../vistas/NN/js/NNMCONP.js"></script>
<link href="../../recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script>
    jQuery(document).ready(function () {
        NNMCONP.init();

    });
</script>

