<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALPEDE.ascx.vb" Inherits="vistas_NA_NALPEDE" %>

<style>
    tbody td {
        padding: 5px 4px !important;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PRODUCTOS VENDIDOS PENDIENTES DE DESPACHO</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a href="?f=naminsa" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>--%>
                    <a href="?f=NALPEDE" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_empresa_l">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_empresa_l" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_Almc">
                                    Almacén</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_Almc" class="span12" data-placeholder="Almacén">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboProducto">
                                    Producto</label>
                            </div>
                        </div>
                        <div class="span6" id="divProducto">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoProducto" type="text" class="span2" placeholder="Código"  />
                                    <input id="txtCodigoAntiguoProducto" type="hidden"/>
                                    <input id="txtNombreProducto" type="text" class="span10" placeholder="Descripción Producto" />
                                    <%--<select id="cboCodigoProducto" class="span4" data-placeholder="Codigo"></select>
                                    <select id="cboProducto" class="span8" data-placeholder="Producto"></select>--%>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" style="display: inline-block;">Mostrar Despachados</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <input type="checkbox" id="chkDespachados" name="chkDespachados"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div style="padding-left: 7px;" class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">
                                Hasta</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                        
                    </div>
                    <div class="span2">

                        <input type="button" class="btn blue" value="FILTRAR" id="btnFiltrar" />

                    </div>
                </div>
                <div class="row-fluid" style="padding-top: 15px">
                    <div class="span12" id="div_tabla_dctos">
                        <table id="tabla_det" class="table-hover" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO VENTA</th>
                                    <th>DOCUMENTO</th>
                                    <th>CLIENTE</th>
                                    <th>SUCURSAL VENTA</th>
                                    <th>FECHA EMISIÓN</th>
                                    <%--<th>ITEM</th>--%>
                                    <th>COD. PRODUCTO</th>
                                    <th>DESC. PRODUCTO</th>
                                    <th>CANTIDAD VENDIDA</th>
                                    <th>UNIDAD DE MEDIDA</th>
                                    <th>CANTIDAD DESPACHADA</th>
                                    <th>CANTIDAD NO DESPACHADA</th>
                                    <th>ALMACEN DESPACHO</th>
                                    <th>TIPO</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <asp:HiddenField ID="hfObjJson" runat="server" />
        </div>
    </div>
</div>
<%--</div>--%>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NA/js/NALPEDE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALPEDE.init();

    });
</script>