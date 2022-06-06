<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCNGA.ascx.vb" Inherits="vistas_NC_NCMCNGA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONCEPTOS GASTOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMCNGA"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLCNGA"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slc_Empresa" name="slc_Empresa" class="limpiar combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                <a id="aDelGrupo" class="span1 btn transparent" href="javascript:;" title="Eliminar"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <table id="tbl_grupo" class="display DTTT_selectable" style="width: 100%; font-size: 10px;">
                                        <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                            <tr>
                                                <th style="width: 3%;">CÓDIGO</th>
                                                <th style="width: 30%;">NOMBRE</th>
                                                <th style="width: 55%;">DESCRIPCIÓN</th>
                                                <th style="width: 12%;">ESTADO</th>
                                                <th style="display: none">COD_CTA</th>
                                                <th style="display: none">CTLG_CODE</th>
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
                                                <a id="aDelSubGrupo" class="span1 btn transparent" href="javascript:;" title="Eliminar"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <table id="tbl_Subgrupo" class="display DTTT_selectable" style="height: 50px;">
                                        <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                            <tr>
                                                <th style="width: 5%;">CÓDIGO</th>
                                                <th style="width: 30%;">NOMBRE</th>
                                                <th style="width: 55%;">DESCRIPCION</th>
                                                <th style="width: 10%;">ESTADO</th>
                                                <th style="display: none">COD_CTA</th>
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
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="myModalLabel"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoModal">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoModal" class="limpiar span6" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="chkactivoModal">
                                    <div class="checker" id="uniform-chkactivoModal">
                                        <span class="checked">
                                            <input type="checkbox" id="chkactivoModal" name="chkactivoModal" checked="" class="m-wrap" style="opacity: 0;"></span>
                                    </div>
                                    Activo</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <%--<div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="slcEmpresa">
                            Empresa</label>
                    </div>
                </div>
                <div class="span10">
                    <div class="control-group">
                        <div class="controls" id="controlempresa">
                            <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span8 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                <option></option>
                            </select>
                            <asp:HiddenField ID="hfempresa" runat="server" />
                            <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                        </div>
                    </div>
                </div>
            </div>--%>
            <div class="row-fluid" style="display: none;">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cboCuentas">
                            Cuentas</label>
                    </div>
                </div>
                <div class="span10">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cboCuentas" class="span12" data-placeholder="Seleccionar Cuenta">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="error" style="display: none;">
                <div class="span2"></div>
                <div class="span10">
                    <div class="control-group alert alert-error span8">
                        <label class="control-label" id="Label1" style="text-align: -webkit-center;">No hay cuentas contables&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                    </div>
                </div>

            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal">
                                    Nombre</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcionModal" class="limpiar m-wrap span12" type="text" style="text-transform: uppercase;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txtDescAdicionalG" class="limpiar m-wrap span12" style="text-transform: uppercase; border: none; width: 99%; height: 80px"></textarea><hr style="margin: 8px 0px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            

            <div class="form-actions" style="text-align: right;" id="botones_grupo">
                <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i>Grabar</a>
                <a id="cancelarModal" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i>Cancelar</a>
            </div>
            
        </div>
    </div>
</div>

<div id="MuestraModalSubGrupo" class="modal hide fade" tabindex="-1" role="dialog" style="width: 40%;" aria-hidden="true" aria-labelledby="myModalLabel2">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>

            <h4 id="myModalLabel2"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
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
                    </div>

                </div>
            </div>
            <%-- <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cbo_empresa">
                            Empresa</label>
                    </div>
                </div>
                <div class="span10">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_empresa" name="cbo_empresa" class="combo m-wrap span8 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                <option></option>
                            </select>

                        </div>
                    </div>
                </div>
            </div>--%>
            <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cbo_cuenta_SGrupo">
                            Cuentas</label>
                    </div>
                </div>
                <div class="span10">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_cuenta_SGrupo" class="span12" data-placeholder="Seleccionar Cuenta">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="error_2" style="display: none;">
                <div class="span2"></div>
                <div class="span10">
                    <div class="control-group alert alert-error span8">
                        <label class="control-label" id="Label2" style="text-align: -webkit-center;">No hay cuentas contables&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                    </div>
                </div>

            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionSubGrupo">
                                    Nombre</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcionSubGrupo" class="limpiar m-wrap span12" type="text" style="text-transform: uppercase;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txtDescAdicionalSG" class="limpiar m-wrap span12" style="text-transform: uppercase; border: none; width: 99%; height: 80px"></textarea><hr style="margin: 8px 0px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <div class="controls">
                            <label for="chkDetraccion" class="control-label">
                                Sujeto a Detracción
                            </label>
                        </div>
                    </div>
                </div>
                <div class="span1">
                    <div class="control-group">
                        <input type="checkbox" id="chkDetraccion" name="chkDetraccion" />
                    </div>
                </div>
                <div class="span7">
                    <div class="control-group span12">
                        <select id="cboDetraccion" name="cboDetraccion" class="m-wrap span12" data-placeholder="Seleccionar Tipo Detracción" tabindex="15" disabled="disabled">
                            <option></option>
                        </select>
                    </div>
                    <%--<div class="span1">
                        <span id="info_btnf"><i style="color: #888; cursor: help;" class="icon-info-sign"></i></span>
                    </div>--%>
                </div>
                <div class="span2">
                    <div class="control-group span11">
                        <input type="text" id="txtDetraccion" name="txtDetraccion" class="m-wrap span12" disabled="disabled" />
                    </div>
                    <div class="span1">
                        <p style="margin-top: 8px;">%</p>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cboTipoBien">
                            Tipo Bien</label>
                    </div>
                </div>
                <div class="span8">
                    <div class="control-group">
                        <select id="cboTipoBien" class="span12 limpiar" data-placeholder="Tipo Bien">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-actions" style="text-align: right;" id="botones_subgrupo">
                <a id="grabarModalSubGrupo" class="btn blue" href="javascript:;"><i class="icon-save"></i>&nbsp;Grabar</a>
                <a id="cancelarModalSubGrupo" class="btn" href="javascript:cancelarModalSubGrupo();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
            </div>



        </div>
    </div>
</div>

<input id="hfCOD_GRUPO" type="hidden" />
<input id="hfCTLG_CODE" type="hidden" />
<input id="hfDESC_GRUPO" type="hidden" />
<input id="hfESTADO_GRUPO" type="hidden" />
<input id="hfCOD_CTA" type="hidden" />
<input id="hfCOD_SGRUPO" type="hidden" />
<input id="hfCOD_SCTA" type="hidden" />
<input id="hfDESC_SGRUPO" type="hidden" />
<input id="hfESTADO_SGRUPO" type="hidden" />
<input id="hfDESC_ADC_GRUPO" type="hidden" />
<input id="hfDESC_ADC_SGRUPO" type="hidden" />
<input id="hfTIPO_BIEN" type="hidden" />
<input id="hfCODIGO_DETRA" type="hidden" />
<input id="hfPORCENTAJE_DETRA" type="hidden" />
<script type="text/javascript" src="../vistas/NC/js/NCMCNGA.js"></script>

<script>
    jQuery(document).ready(function () {
        NCMCNGA.init();

    });
</script>
