<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRCAC.ascx.vb" Inherits="vistas_NO_NOLRCAC" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>&nbsp;ANALÍTICO COMPARATIVO COMPRAS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divDatosMostrar','divGrafico']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body" id="ventana">
                <!-- BLOQUE FILTROS-->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboSucursal">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Años</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAnio" multiple="multiple" class="span12" data-placeholder="Años" style="display: none;">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupo">
                                Grupo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboGrupo" name="cboGrupo" class="m-wrap span12 required" data-placeholder="Grupo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbosubgrupo">
                                Sub-Grupo</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="SubGrupo" tabindex="1" disabled="disabled">
                                    <option value="" selected>TODOS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="input_moneda">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProducto">
                                Producto</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboProducto" class="span12" data-placeholder="Producto">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboVendedor">
                                Proveedor</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <%--<select id="cboVendedor" class="span12" data-placeholder="Proveedor">
                                    <option></option>
                                </select>--%>
                                <input type="text" class="span12" id="txtProveedor" placeholder="Ingrese el nombre del Proveedor" style="text-transform: uppercase"/>
                                <input type="hidden" id="txtPIDM" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- BLOQUE DATOS - GRAFICO-->
                <br />
                <div class="row-fluid">
                    <div class="span3">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="overflow-x: auto; margin-top: 5px;">
                            </div>
                        </div>
                    </div>
                    <div class="span9">
                        <div id="divGrafico">
                            <div id="contenedor" style="min-width: 310px; min-height: 500px; margin: 0 auto;"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NO/js/NOLRCAC.js"></script>

<script src="../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>


<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLRCAC.init();
    });
</script>
