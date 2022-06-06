<%@ Control Language="VB" AutoEventWireup="false" CodeFile="AFMACFI.ascx.vb" Inherits="vistas_AF_AFMACFI" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ACTIVOS FIJOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=AFMACFI"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=AFLACFI"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">Código</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigo" class="span4" disabled="disabled" placeholder="Generado" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoActivoFijo">
                                    Código de Activo Fijo</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoActivoFijo" class="span9" disabled="disabled" type="text" style="text-align: center" placeholder="Generado" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label span8" for="chkEstado">Activo</label>
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboSucursal">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Establecimiento"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtBien">Bien</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="hidden" id="txtIMPR_CODE" />
                                    <input type="hidden" id="txtPROD_CODE" />
                                    <input type="hidden" id="txtMCDR_CODE" />
                                    <input type="hidden" id="txtUNID_CODE" />
                                    <input type="text" id="txtBien" class="span10" style="text-transform: uppercase" disabled="disabled" />
                                    <input type="hidden" id="txtBienSeriado" />
                                    <a id="btnBuscarBien" class="btn blue" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboSerie">
                                    Serie</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span8" id="cboSerie" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Centro Costo:</label>
                            </div>
                        </div>                      
                        <div class="span4">
                            <div class="row-fluid">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span10">
                                            <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-codcentrocostocab="" data-codcentrocosto="" disabled />
                                        </div>
                                        <div class="span1">
                                            <button id="btnBuscarCentroCto" class="btn blue centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboMetodoDepreciacion">Método Depreciación</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12" id="cboMetodoDepreciacion">
                                        <option value=""></option>
                                        <option value="LR">LINEA RECTA</option>
                                        <option value="UP">UNIDADES PRODUCIDAS</option>
                                        <option value="SD">SUMA DE DÍGITOS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               

                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">                       
                        <div class="span6">
                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group">
                                        <label class="control-label" for="txtFechaInicial">Fecha Inicial</label>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtFechaInicial" data-date-format="dd/mm/yyyy" class="span8 pull-right" type="text" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span3 productividad hidden">
                                    <div class="control-group">
                                        <label class="control-label pull-right" for="txtProduccion">Productividad total</label>
                                    </div>
                                </div>
                                <div class="span3 productividad hidden">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtProduccion" class="span8 pull-right" type="text" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtVidaUtil">Vida útil en años</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtVidaUtil" class="span8" type="text" style="text-align: center" />
                                </div>
                            </div>
                        </div> 
                        
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtValorDesecho">Valor desecho</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtValorDesecho" class="span8" type="text" style="text-align: center" />
                                </div>
                            </div>
                        </div>                        

                    </div>
                </div>


                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">                        
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtValorInicial">Valor Inicial</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtValorInicial" class="span8" type="text" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtValorActual">Valor Actual</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtValorActual" class="span8" type="text" style="text-align: center" disabled="disabled" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>                 

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row-fluid hidden" id="datos">
    <div class="span6">
        <div class="portlet box yellow">
            <div class="portlet-title">
                <h4><i class="icon-arrow-down" contenteditable="true"></i>DEPRECIACION</h4>
                <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                    <a href="?f=nclimpr" target="_blank" class="config"></a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="scroller">
                    <div class="row-fluid">
                        <table class="table table-hovered display" style="width: 100%" id="tblDepreciacion">
                            <thead>
                                <tr>
                                    <th></th>
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
    <%--<div class="span6"> -- COMENTADO :V
        <div class="portlet box green">
            <div class="portlet-title">
                <h4><i class="icon-map-marker" contenteditable="true"></i>HISTORIAL DE UBICACIONES</h4>
                <div class="tools">
                    <a href="javascript:;" class="collapse"></a>
                    <a href="?f=nclimpr" target="_blank" class="config"></a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="scroller">
                    <div class="row-fluid">
                        <table class="table table-hovered" style="width: 100%">
                            <thead></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
</div>
<div id="divBuscarBien" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 45%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarBien_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR BIEN MATERIAL</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarBien_body">
                <div class="tabbable tabbable-custom boxless" style="display: block;" id="bienes">
                    <ul class="nav nav-tabs">
                        <li id="liImpresoras" class="active"><a id="tabImpresoras" href="#impresoras" data-toggle="tab"><i class=""></i>Impresoras</a></li>
                        <li id="liVehiculos"><a class="advance_form_with_chosen_element" id="tabVehiculos" href="#vehiculos" data-toggle="tab"><i class=""></i>Vehículos</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="impresoras">
                            <table id="tblImpresoras" class="table bordered hover">
                                <thead>
                                    <tr>
                                        <th style="text-align: center">CODIGO</th>
                                        <th style="text-align: center">MARCA</th>
                                        <th style="text-align: center">MODELO</th>
                                        <th style="text-align: center">SERIE</th>
                                        <th style="text-align: center">TIPO</th>
                                    </tr>
                                </thead>
                                <tbody style="cursor: pointer"></tbody>
                            </table>
                        </div>
                        <div class="tab-pane" id="vehiculos">
                            <table id="tblVehiculos" class="table bordered hover">
                                <thead>
                                    <tr>
                                        <th style="text-align: center">CODIGO</th>
                                        <th style="text-align: center">MARCA</th>
                                        <th style="text-align: center">CARROCERIA</th>
                                        <th style="text-align: center">SERIE</th>
                                        <th style="text-align: center">PLACA</th>
                                    </tr>
                                </thead>
                                <tbody style="cursor: pointer"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un bien para seleccionarlo</h5>
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
<input type="hidden" id="hfALMC_CODE" />

<script type="text/javascript" src="../vistas/AF/js/AFMACFI.js"></script>
<script>
    jQuery(document).ready(function () {
        AFMACFI.init();
    });
</script>
