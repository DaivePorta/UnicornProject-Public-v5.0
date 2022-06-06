<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMUBIG.ascx.vb" Inherits="vistas_NC_NCMUBIG" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>UBIGEO</h4>
                <div class="actions">
                    <a href="?f=ncmubig" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclubig" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div id="Filtro" class="span8">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Código Sunat
                                </label>
                                <div class="controls">
                                    <input type="text" class="span12" disabled="disabled" id="txtcode" />
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label">
                                    País
                                </label>
                                <div class="controls">
                                    <select id="cboMPais" class="span12" data-placeholder="País">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label">
                                    &nbsp;
                                </label>
                                <div class="controls">
                                    <a id="aListar" class="span5 btn blue" href="javascript:Listar();"><i class="icon-search"></i>&nbsp;&nbsp;Listar</a>
                                    <a id="aLimpiar" class="span5 btn red" href="javascript:Limpiar();"><i></i>&nbsp;&nbsp;Limpiar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <a id="aAddDpt" class="span1 btn transparent" href="javascript;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                <a id="aRefDpt" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                <a id="aEditDpt" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                <a id="aDelDpt" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <a id="aAddPrv" class="span1 btn transparent" href="javascript;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                <a id="aRefPrv" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                <a id="aEditPrv" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                <a id="aDelPrv" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <a id="aAddDis" class="span1 btn transparent" href="javascript;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                <a id="aRefDis" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                <a id="aEditDis" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                <a id="aDelDis" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <div id="divDpt" class="span12">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <div id="divPrv">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <div id="divDis">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <asp:HiddenField ID="hfUsuario" runat="server" />
                <input id="hfJsonPais" type="hidden" />
            </div>
        </div>
    </div>
</div>

<div id="MuestraModal" style="width: 720px;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel">DEPARTAMENTO</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtCodigoModal">
                            Código
                        </label>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12" id="txtCodigoModal" disabled="disabled" />
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group ">
                        <label class="control-label">
                            &nbsp;
                        </label>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <div class="controls">
                            &nbsp;
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <%--<label class="control-label" for="chkEstadoDpt">
                            Estado
                        </label>--%>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <%-- <div class="controls">
                            <input id="chkEstadoDpt" type="checkbox" checked="checked" />
                        </div>--%>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtCodigoSunatModal">
                            Código Sunat
                        </label>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12" id="txtCodigoSunatModal" placeholder="Código Sunat" />
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txtDescripcionModal">
                            Descripción
                        </label>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12" id="txtDescripcionModal" placeholder="Descripción" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i>Grabar</a>
                <a id="cancelarModal" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
            </div>
            <input id="hdCodigoDpt" type="hidden" />
            <input id="hdUbigeoDpt" type="hidden" />
            <input id="hdDescripcionDpt" type="hidden" />
            <input id="hdEstadoDpt" type="hidden" />

            <input id="hdCodigoPrv" type="hidden" />
            <input id="hdUbigeoPrv" type="hidden" />
            <input id="hdUbigeoAnteriorPrv" type="hidden" />
            <input id="hdDescripcionPrv" type="hidden" />
            <input id="hdEstadoPrv" type="hidden" />

            <input id="hdCodigoDis" type="hidden" />
            <input id="hdUbigeoDis" type="hidden" />
            <input id="hdUbigeoAnteriorDis" type="hidden" />
            <input id="hdDescripcionDis" type="hidden" />
            <input id="hdEstadoDis" type="hidden" />
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMUBIG.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMUBIG.init();
        
    });
</script>
