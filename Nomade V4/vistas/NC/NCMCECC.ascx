<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCECC.ascx.vb" Inherits="vistas_NC_NCMCECC" %>

<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CENTRO DE COSTOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmcecc"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclcecc"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div id="Div" class="span9">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboEmpresa">
                                                        Empresa</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboPlanCostos">
                                                        Plan de Costos</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboPlanCostos" class="span12" data-placeholder="Plan de Costos">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="row-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

             
                <div class="row-fluid" style="display:none;">
                    <div id="divSpanTablesNivel" class="span12">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsNivel1" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddNivel1" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefNivel1" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditNivel1" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                                <a id="aDelNivel1" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <%--<div class="control-group">
                                        <div class="controls">--%>
                                    <div id="divNivel1" class="span12">
                                    </div>
                                    <%--</div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsNivel2" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddNivel2" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefNivel2" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditNivel2" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                                <a id="aDelNivel2" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <%--<div class="control-group">
                                        <div class="controls">--%>
                                    <div id="divNivel2" class="span12">
                                    </div>
                                    <%--    </div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsNivel3" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddNivel3" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefNivel3" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditNivel3" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                                <a id="aDelNivel3" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div id="divNivel3" class="span12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsNivel4" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddNivel4" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefNivel4" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditNivel4" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                                <a id="aDelNivel4" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div id="divNivel4" class="span12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <%-- ARBOL --%>

                <div class="row-fluid">
                    <div class="span2" id="dvArbol">
                    </div>
                    <div class="span8">
                        <div class="portlet box grey">
                            <div class="portlet-title">
                                <h4><i class="icon-sitemap"></i>Arbol Centro de Costos</h4>
                                <div class="actions">
                                    <a id="btnAgregarNodo" disabled="disabled" class="btn blue"><i class="icon-plus"></i>&nbsp;Agregar</a>
                                    <a id="btnEditarNodo" disabled="disabled" class="btn blue"><i class="icon-pencil"></i>&nbsp;Editar</a>
                                    <a id="btnActualizarArbol" disabled="disabled" class="btn blue"><i class="icon-refresh"></i>&nbsp;Actualizar</a>
                                </div>
                            </div>
                            <div class="portlet-body">
                                  <div id="btnsaciones" class="actions" style="text-align:left; margin-left:25px; display:none;">
                                    <a id="btn-expand-all" class="btn black"><i class="icon-resize-full"></i>&nbsp;Expandir todo</a>
                                    <a id="btn-collapse-all" class="btn btn-danger black"><i class="icon-resize-small"></i>&nbsp;Contraer Todo</a>

                                </div>
                                <div id="treeCentroCostos" class="treeview">
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <asp:HiddenField ID="hfUsuario" runat="server" />
                <input id="hfCodigoEmpresa" type="hidden" />
                <input id="hfCodigoCentroCostos" type="hidden" />
                <input id="hfCodigoNiveles" type="hidden" />
                <input id="hfNivel1" type="hidden" />

                <input id="hfNivel2" type="hidden" />

                <input id="hfNivel3" type="hidden" />

                <input id="hfNivel4" type="hidden" />

                <input id="hfEmpresaSeleccionado" type="hidden" />
                <input id="hfArrayPlanCosto" type="hidden" />

                <input id="hfCodigoNodo" type="hidden" />
                <input id="hfDescNodo" type="hidden" />
                <input id="hfNivelNodo" type="hidden" />
                <input id="hfNombreNodo" type="hidden" />
                <input id="hfAbreviaturaNodo" type="hidden" />
                <input id="hfNombreCentro" type="hidden" />
            </div>
</div>
    </div>
</div>
<div id="MuestraModal" style="width: 820px;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-keyboard="false" data-backdrop="static">
    <div class="modal-content" id="modal">
        <div class="modal-header">
            <%--<button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>--%>
            <h3 id="myModalLabel"></h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span5">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="control-group" id="niveles">
                               
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="span7">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoModal">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoModal" class="span5" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtAbreviaturaModal">
                                    Abreviatura</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtAbreviaturaModal" class="span5" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal" id="lblDescripcion">
                                    </label>
                            </div>
                        </div>
                        <div class="">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea class="form-control span11" rows="3" id="txtDescripcionModal"></textarea>                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>            
            <div class="form-actions">
                <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i>&nbsp;Grabar</a>
                <a id="nuevoModal" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>                
                <a id="cancelarModal" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
            </div>
            <input id="hfCODE_Nivel1" type="hidden" />
            <input id="hfDESC_Nivel1" type="hidden" />
            <input id="hfDEPEND_CODE_Nivel1" type="hidden" />
            <input id="hfESTADO_IND_Nivel1" type="hidden" />

            <input id="hfCODE_Nivel2" type="hidden" />
            <input id="hfDESC_Nivel2" type="hidden" />
            <input id="hfDEPEND_CODE_Nivel2" type="hidden" />
            <input id="hfESTADO_IND_Nivel2" type="hidden" />

            <input id="hfCODE_Nivel3" type="hidden" />
            <input id="hfDESC_Nivel3" type="hidden" />
            <input id="hfDEPEND_CODE_Nivel3" type="hidden" />
            <input id="hfESTADO_IND_Nivel3" type="hidden" />

            <input id="hfCODE_Nivel4" type="hidden" />
            <input id="hfDESC_Nivel4" type="hidden" />
            <input id="hfDEPEND_CODE_Nivel4" type="hidden" />
            <input id="hfESTADO_IND_Nivel4" type="hidden" />
        </div>
    </div>
</div>



    <script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>


<script type="text/javascript" src="../vistas/NC/js/NCMCECC.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMCECC.init();

    });
</script>
