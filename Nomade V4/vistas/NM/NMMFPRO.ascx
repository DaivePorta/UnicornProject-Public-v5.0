<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMFPRO.ascx.vb" Inherits="vistas_NM_NMMFPRO" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<style>
    fieldset.scheduler-border {
        border: 1px groove #ddd !important;
        padding: 0 1.4em 1.4em 1.4em !important;
        margin: 0 0 1.5em 0 !important;
        -webkit-box-shadow: 0px 0px 0px 0px #000;
        box-shadow: 0px 0px 0px 0px #000;
    }

    legend.scheduler-border {
        font-size: 18px;
        width: inherit;
        padding: 0 10px;
        border-bottom: none;
    }

    .nomostrar {
        z-index: -1 !important;
    }

    .modal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {

        #MuestraModalSubGrupo {
            left: 5% !important;
            width: 90% !important;
        }
    }
</style>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>FAMILIA DE PRODUCTOS (GRUPOS/SUBGRUPOS)</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmfpro"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlfpro"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span9">
                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboEmpresa">
                                                        Empresa</label>
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <%--Cambio de id del combobox Empresa de "cboEmpresas" a "slcEmpresa"--%>
                                                        <select id="slcEmpresa" class="span12" data-placeholder="Empresa">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                <a id="aDelGrupo" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div id="divGrupos" class="span12">
                                    </div>

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
                                                <a id="aDelSubGrupo" class="span1 btn transparent" href="javascript:;" title="Cambiar Estado"><i class="icon-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div id="divSubGrupo" class="span12">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <asp:HiddenField ID="hfUsuario" runat="server" />
                <input id="hfCodigoEmpresa" type="hidden" />
                <input id="hfCodigoCentroCostos" type="hidden" />
                <input id="hfCodigoNiveles" type="hidden" />
                <input id="hfCODE_EMPRESA" type="hidden" />
                <input id="hfDESC_EMPRESA" type="hidden" />

            </div>
        </div>
    </div>
</div>

<div id="MuestraModal" style="width: 720px; margin-top: 50%;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button data-dismiss="modal" class="btn red" type="button" style="margin-top: 6px; float: right;" aria-hidden="true">
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
                                    <input id="txtCodigoModal" class="span6" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresaModal">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresaModal" class="span12" data-placeholder="Empresa">
                                    </select>
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
                                    <input id="txtDescripcionModal" class="span12" type="text" placeholder="Descripcion Grupo" />
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
                                <label class="control-label" for="cboExistenciasModal">
                                    Tipo Existencia</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboExistenciasModal" class="span12" data-placeholder="Existencias">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="chkactivoModal">
                                    Estado</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkactivoModal" type="checkbox" checked="" style="opacity: 0;">Activo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="btns_grupo" class="form-actions">
                <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i>&nbsp;Grabar</a>
                <a id="cancelarModal" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i>&nbsp;Cancelar</a>

                <%-- <a id="nuevoGrupo" class="btn green" href="javascript:NuevoGrupo();" ><i class="icon-plus"></i>&nbsp;Nuevo</a>--%>
            </div>
            <input id="hfCODE_GRUPO" type="hidden" />
            <input id="hfDESC_GRUPO" type="hidden" />
            <input id="hfTIPO_EXIS" type="hidden" />
            <input id="hfDESC_EXIS" type="hidden" />
            <input id="hfESTADO_IND_GRUPO" type="hidden" />


        </div>
    </div>
</div>

<div id="MuestraModalSubGrupo" style="width: 86%; left: 7%; height: 70%" aria-hidden="true" class="modal fade modal-sm" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel2">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button data-dismiss="modal" class="btn red" type="button" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="tituloModal"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">

                <div class="span8">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEmpresaModalSubg">
                                            Empresa</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEmpresaModalSubg" class="span12 empresa" data-placeholder="Empresa">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="txtCodigoSgModal">
                                            Código</label>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtCodigoSgModal" class="span6" disabled="disabled" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="cboGrupoModal">
                                            Grupo</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboGrupoModal" class="span12" data-placeholder="Grupos">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="txtDescSubGrupoModal">
                                            Descripción</label>
                                    </div>
                                </div>
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtDescSubGrupoModal" class="span12" type="text" placeholder="Descripcion SubGrupo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="cboExistenciasSgModal">
                                        Tipo Existencia</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboExistenciasSgModal" class="span12" data-placeholder="Existencias">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkactivoSgModal">
                                        Estado</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkactivoSgModal" type="checkbox" checked="" style="opacity: 0;">Activo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">                           
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="cboTipoSistema">
                                        Afecto al ISC</label>
                                </div>
                            </div>
                             <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkIscSgModal" type="checkbox" checked="" style="opacity: 0;">
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls" id="divCboTipoSistema">
                                        <select id="cboTipoSistema" name="cboTipoSistema" class="m-wrap span12" data-placeholder="Tipo de Sistema del ISC" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="cbomarca">
                                        Marcas</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls" id="divCboMarca">
                                        <select id="cboMarca" name="cboMarca" class="m-wrap span12" data-placeholder="Seleccionar Marca" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <a id="btnAgregarMarca" class="btn blue pull-left" style="margin-right: 5px;" href="javascript:AgregarMarca();"><i class=" icon-plus-sign"></i>&nbsp;Agregar Marca</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row-fluid">
                        <div class="control-group">
                            <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                            <div class="controls">
                                <div class="span10">
                                    <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-CodCentroCostoCab="" data-CodCentroCosto="" disabled/>
                                </div>
                                <div class="span2">
                                    <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>

                <div class="span4">
                    <div class="row-fluid">
                        <div class="control-group">
                            <label class="control-label" for="cbomarca">
                                Marcas Asignadas</label>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div id="divTblDetalles" style="overflow: auto; max-height: 188px;">
                                <table class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                    <thead style="background-color: #8C9CB7; text-align: center; color: #ffffff;">
                                        <tr>
                                            <th style="text-align: center">CÓDIGO</th>
                                            <th style="text-align: center">MARCA</th>
                                            <th style="text-align: center">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="3">
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span10">
                            <div class="control-group">
                                <br />
                                <h3><%--<label class="control-label" for="btn_agregar_cuentas">--%>
                                    Configuración de Cuentas Contables Contables</h3>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <br />
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">

                        <!-- TITULO DE LOS TABS-->
                        <ul class="nav nav-tabs">
                            <li id="liCompras" class="active"><a id="tabCompras" href="#Compras" data-toggle="tab"><i class=""></i>COMPRAS</a></li>
                            <li id="liVentas"><a class="advance_form_with_chosen_element" id="tabVentas" href="#Ventas" data-toggle="tab"><i class=""></i>VENTAS</a></li>
                        </ul>
                        <div class="tab-content">
                            <!-- PANEL DE DÍNAMICA DE COMPRAS-->
                            <div class="tab-pane active" id="Compras">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <table id="tbldinamicaCompras" class="table table-bordered" style="display: none;">
                                            <thead>
                                                <tr>
                                                    <td style="text-align: center"></td>
                                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                                    <td style="text-align: center">Debe</td>
                                                    <td style="text-align: center">Haber</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>COMPRA</td>
                                                    <td>
                                                        <span id="cbo_cuentaCompra_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaCompra" class="cuentas span12" data-placeholder="Cuentas compra"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe1" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber1" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <!-- Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                                                <tr>
                                                    <td>IGV</td>
                                                    <td>
                                                        <span id="cbo_cuentaIgv_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaIgv" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe2" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber2" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Compra MN</td>
                                                    <td>
                                                        <span id="cbo_cuentaCompraMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaCompraMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe3" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber3" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Compra ME</td>
                                                    <td>
                                                        <span id="cbo_cuentaCompraME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaCompraME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe4" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber4" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Compra Relac. MN</td>
                                                    <td>
                                                        <span id="cbo_cuentaCompraRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaCompraRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe5" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber5" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Compra Relac. ME</td>
                                                    <td>
                                                        <span id="cbo_cuentaCompraRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaCompraRelME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebe6" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaber6" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- PANEL DE DÍNAMICA DE VENTAS-->
                            <div class="tab-pane" id="Ventas">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <table id="tbldinamicaVentas" class="table table-bordered" style="display: none;">
                                            <thead>
                                                <tr>
                                                    <td style="text-align: center"></td>
                                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                                    <td style="text-align: center">Debe</td>
                                                    <td style="text-align: center">Haber</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>VENTA</td>
                                                    <td>
                                                        <span id="cbo_cuentaVenta_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaVenta" class="cuentas span12" data-placeholder="Cuentas venta"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev1" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv1" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <!-- Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                                                <tr>
                                                    <td>IGV</td>
                                                    <td>
                                                        <span id="cbo_cuentaIgv_venta_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaIgv_venta" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev2" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv2" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Venta MN</td>
                                                    <td>
                                                        <span id="cbo_cuentaVentaMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaVentaMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev3" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv3" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Venta ME</td>
                                                    <td>
                                                        <span id="cbo_cuentaVentaME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaVentaME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev4" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv4" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Venta Relac. MN</td>
                                                    <td>
                                                        <span id="cbo_cuentaVentaRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaVentaRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev5" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv5" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Doc. Venta Relac. ME</td>
                                                    <td>
                                                        <span id="cbo_cuentaVentaRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                    </td>
                                                    <td>
                                                        <select id="cbo_cuentaVentaRelME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxDebev6" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                    <td style="text-align: center">
                                                        <input id="chxHaberv6" type="checkbox" style="opacity: 0;">
                                                    </td>
                                                </tr>
                                                -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions" id="btns_subgrupo">
                <a id="grabarModalSubGrupo" class="btn blue" href="javascript:;"><i class="icon-save"></i>&nbsp;Grabar</a>
                <a id="cancelarModalSubGrupo" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
            </div>
            <input id="hfCODE_SUBGRUPO" type="hidden" />
            <input id="hfDESC_SUBGRUPO" type="hidden" />
            <input id="hfESTADO_IND_SUBGRUPO" type="hidden" />
            <input id="hfCTA_COMPRA_HABER" type="hidden" />
            <input id="hfCTA_COMPRA_DEBE" type="hidden" />
            <input id="hfCTA_VENTA_HABER" type="hidden" />
            <input id="hfCTA_VENTA_DEBE" type="hidden" />
            <input id="hfCTA_CONSUMO_HABER" type="hidden" />
            <input id="hfCTA_CONSUMO_DEBE" type="hidden" />
            <input id="hfCTA_COSTVENTA_HABER" type="hidden" />
            <input id="hfCTA_COSTVENTA_DEBE" type="hidden" />

            <input id="hfCTA_COMPRA_HABER_REL" type="hidden" />
            <input id="hfCTA_COMPRA_DEBE_REL" type="hidden" />
            <input id="hfCTA_VENTA_HABER_REL" type="hidden" />
            <input id="hfCTA_VENTA_DEBE_REL" type="hidden" />
            <input id="hfCTA_CONSUMO_HABER_REL" type="hidden" />
            <input id="hfCTA_CONSUMO_DEBE_REL" type="hidden" />
            <input id="hfCTA_COSTVENTA_HABER_REL" type="hidden" />
            <input id="hfCTA_COSTVENTA_DEBE_REL" type="hidden" />

             <input id="hfCODE_SUBGRUPO_CECO" type="hidden" />
            <input id="hfCECC" type="hidden" />
            <input id="hfCECD" type="hidden" />
            <input id="hfISC_CODE" type="hidden" />
            <input id="hfISC_IND" type="hidden" />
        </div>
    </div>
</div>

<!-- Modal Centro de Costo -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title">CENTROS DE COSTO</h4>
      </div>
      <div class="modal-body">
        <div class="row-fluid">
            <div class="span2"></div>
            <div class="span8">                
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span2"></div>            
        </div>
        <div class="row-fluid">
            <div class="span1"></div>
            <div class="span10">
                <div id="treeCentroCostos" class="treeview">
                </div>
            </div>
            <div class="span1"></div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
        <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>

<script type="text/javascript" src="../vistas/NM/js/NMMFPRO.js"></script>

<script>
    jQuery(document).ready(function () {
        NMMFPRO.init();
    });
</script>
