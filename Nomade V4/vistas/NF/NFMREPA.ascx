<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMREPA.ascx.vb" Inherits="vistas_NF_NFMREPA" %>
<style type="text/css">
    @media print {

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .chat-window {
            display: none;
            margin: 0px !important;
        }
    }
</style>

<link rel="stylesheet" type="text/css" href="../recursos/plugins/bootstrap-timepicker/compiled/timepicker.css" />
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-cogs"></i>REPARACIÓN DE PRODUCTO SOPORTE</h4>
                <div class="actions">
                    <a class="btn black btnImprimir" href="javascript:ImprimirDcto();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a id="btnMail" class="btn purple disabled" disabled="disabled"><i class="icon-envelope"></i>&nbsp Mail</a>
                    <a class="btn green" href="?f=nfmrece"><i class="icon-plus"></i>&nbsp Nuevo</a>
                    <a class="btn red" href="?f=nflrece"><i class="icon-list"></i>&nbsp Listar</a>
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
                    <div class="span3">
                        <div class="control-group">
                            <div id="controlempresa" class="controls">
                                <select id="slcEmpresa" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" name="slcEmpresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div id="Div1" class="controls">
                                <input type="hidden" id="hfAlmacen" />
                                <select id="slcSucural" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" name="slcSucural" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcAlmacen">
                                Almacén</label> 
                        </div>
                    </div>--%>
                    <div class="span2" style="display: none";>
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcAlmacen" class="combo m-wrap span12 required" data-placeholder="Seleccionar Almacén" name="slcAlmacen" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" for="txtnroatencion">
                                    Número Atención
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnroatencion" class="span12 m-wrap" disabled type="text" style="font-weight: 800; text-align: center;" />
                                <input type="hidden" id="hfCodeRepa" />
                                <input type="hidden" id="hfCompletoInd" value="N" />
                                <input type="hidden" id="hfSituacion" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharegistro">
                                Fecha Recepción
                            </label>
                            <div class="controls">
                                <input disabled class="m-wrap span12" type="text" id="txtfecharecepcion" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharecepcion">
                                Fecha Diagnóstico
                            </label>
                            <div class="controls">
                                <div class="controls">
                                    <input disabled class="m-wrap span12" type="text" id="txtfechadiagnostico" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfechaentrega">
                                Fecha Entrega
                            </label>
                            <div class="controls">
                                <div class="input-append date date-picker fecha" data-date-format="dd/mm/yyyy">
                                    <input disabled class="m-wrap date-picker fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfechaentrega" /><span class="add-on"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txthoraentrega">
                                Hora Entrega
                            </label>
                            <div class="controls">
                                <div class="input-append bootstrap-timepicker-component">
                                    <input class="m-wrap m-ctrl-small timepicker-default span10" disabled type="text" id="txthoraentrega" />
                                    <span class="add-on"><i class="icon-time"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="label-control" for="cboentrega">Lugar de Entrega</label>
                            <div class="controls">
                                <select id="cboentrega" class="combo m-wrap span12 required" data-placeholder="Seleccionar Lugar" tabindex="1">
                                    <option></option>
                                    <option value="DOMICILIO">DOMICILIO</option>
                                    <option value="LOCAL">EN LOCAL</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="label-control" for="txtnrodiagnostico">Número Diagnóstico</label>
                            <div class="controls">
                                <input type="text" class="m-wrap span12" disabled id="txtnrodiagnostico" style="font-weight: 800; text-align: center;" />
                            </div>
                        </div>
                    </div>


                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcliente">
                                Cliente
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcliente" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." type="text" disabled />
                                <input type="hidden" id="hfPidmCliente" />
                                <input type="hidden" id="hfCateCode" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtruc" id="lblruc">
                                RUC
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtruc" class="span12 m-wrap" disabled type="text" />
                                <input type="hidden" id="hfDctoCliente" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtnroreparacion">
                                Número Reparación
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnroreparacion" class="span12 m-wrap" disabled type="text" placeholder="GENERADO" style="font-weight: 800; text-align: center;" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtautorizado">
                                Autorizado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtautorizado" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdni">
                                DNI
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdni" class="span12 m-wrap" disabled type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcotizacion">
                                Cotización
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodcotizacion" name="txtcodcuenta" class="span12 m-wrap required" type="text" disabled="">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtproducto">
                                Producto
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtproducto" disabled class="span12 m-wrap" placeholder="Digite nombre de producto para seleccionar." type="text" />
                                <input id="hfProducto" type="hidden" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtserie">
                                Serie
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtserie" class="m-wrap span12" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcotizacion">
                                Monto Cotización
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcotizacion" class="span12 m-wrap" disabled type="text" value="0.00" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdiagnostico">
                                Diagnóstico
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtdiagnostico" class="span12 m-wrap" cols="20" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtrecomendacion">
                                Recomendación
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtrecomendacion" class="span12 m-wrap" cols="20" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdiagnostica">
                                Técnico
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdiagnostica" class="span12 m-wrap personasEmpleado" placeholder="Digite apellidos o nombres para seleccionar." type="text" />
                                <input id="hfDiagnostica" type="hidden" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtestado">
                                Estado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <input type="text" class="m-wrap span12" id="txtestado" />
                        </div>
                    </div>
                </div>

                <!-- CENTRO DE COSTOS Y BOTONES PARA DETALLES POR PRODUCTO -->
                <div class="row-fluid" id="fila_4" style="display: block;">
                    <div class="sapn12">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtCentroCostos">Centro de Costos</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls" id="input_centro_costo">
                                            <input id="txtCentroCostos" class="span12 m-wrap" type="text" placeholder="Seleccionar Centro de Costos" />
                                            <input type="hidden" id="hfCENTRO_COSTOS" />
                                            <input type="hidden" id="hfCECC_CODE" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <a id="btnActualizarCentroCostos" class="btn black tooltips" data-original-title="Recargar Centro de Costos" ><i class="icon-refresh" style="line-height: initial"></i></a>
                                            <a id="btn_new_cc" class="btn green tooltips" href="?f=ncmcecc" data-original-title="Crear Centro de Costos" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span2" style="display: none;">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_dia" data-date-format="dd/mm/yyyy" disabled="disabled"/>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div class="row-fluid">
                    <!-- INICIA CUADRO PARA LA FORMA -->
                    <div class="span12">
                        <div id="detalle" class="portlet box blue">
                            <div class="portlet-title">
                                <h4><i class="icon-list"></i>PRODUCTOS Y SERVICIOS</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid det_prod">

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtcodProducto">Código </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 m-wrap" id="txtcodProducto" style="text-align: right;" />
                                            </div>

                                        </div>
                                    </div>

                                    <%--<div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtdesProducto">Descripción Producto</label>
                                            </div>
                                        </div>
                                    </div>--%>

                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls" id="input_desc_prod">
                                                <input type="text" class="span12 m-wrap" id="txtdesProducto" placeholder="Ingrese descripción de Producto" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="span2" id="btns_Productos">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="btnActualizarProductos" class="btn black tooltips" data-original-title="Recargar Productos" ><i class="icon-refresh" style="line-height: initial"></i></a>
                                                <a id="btn_new_prod" class="btn green tooltips" href="?f=nmmpror" data-original-title="Crear Nuevo Producto" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid det_prod">
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtcanProducto">Cantidad </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" onkeyup="ValidaPrecioCantidad();" style="text-align: right;" class="span12 m-wrap" id="txtcanProducto" onkeypress="return ValidaDecimales(event,this,2)" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtunmProducto">U.M.</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_und_medida" class="combo m-wrap span12" data-placeholder="Und. Medida" disabled>
                                                    <option></option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtpreProducto" onkeyup="CalcularTotal();">Precio</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input type="text" disabled class="span12 m-wrap" id="txtpreProducto" value="0.00" />--%>
                                                <div class="controls" id="divPrecioUnitario">
                                                    <input id="txtPrecioUnitario" class="span12 m-wrap" type="text" onkeypress=" return ValidaDecimales(event,this,5)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label" for="txtstkProducto">Stock</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" disabled class="span12 m-wrap" id="txtstkProducto" value="0" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <%--<div class="row-fluid det_prod" id="div_vie_camp_seriados" style="display: none;">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtserieProducto">
                                                            Nro. Serie
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input type="text" id="txtserieProducto" class="span12 m-wrap" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>--%>
                                <div class="row-fluid" id="div_vie_camp_seriados" style="display: none;">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbo_correlativo">
                                                            Nro. Serie
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbo_correlativo" class="span12" data-placeholder="Correlativo" disabled="disabled">
                                                                <%--<option value="C">CORRELATIVO</option>--%>
                                                                <%--<option value="S">NO SECUENCIAL</option>--%>
                                                                <option value="L" id="optLD" selected="selected">LISTA DETALLADA</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span6" id="div_correlativos">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_num_inicio">
                                                                Inicio
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="span5">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_num_inicio" class="span12" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_num_fin">
                                                                Fin
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="span5">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txt_num_fin" class="span12" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid" id="fila_5" style="display: block;">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls" id="div_txt_serie_sec" style="display: none;">
                                                <input type="text" id="txtserieProducto" class="span6 m-wrap" />
                                                <%--<input id="txt_serie" data-role="tagsinput" class="span12" type="hidden" />--%>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row-fluid det_prod" id="botones_accion">
                                    <div class="span8"></div>
                                    <div class="span2" style="text-align: right;">
                                        <a class="btn blue tooltips" data-original-title="Agregar Producto/Servicio al detalle" href="javascript:AgregarDetalleVenta()">Agregar &nbsp<i class="icon-plus-sign"></i></a>
                                    </div>
                                    <div class="span2">
                                        <a class="btn red tooltips" data-original-title="Limpia los datos de los campos">Limpiar &nbsp<i class="icon-remove-sign"></i></a>
                                    </div>
                                </div>
                                <br />
                                <div class="row-fluid">
                                    <div id="div_tabla_det"></div>
                                    <%--<table id="tabla_det" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Código</th>
                                                <th>Descripcion</th>
                                                <th>UM.</th>
                                                <th>Serie</th>
                                                <th>Cant.</th>
                                                <th>Prec. Unit.</th>
                                                <th>Total.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <%--<tr>
                                                <td>1</td>
                                                <td>000SD12</td>
                                                <td>SERVICIO DE REPARACION DE IMPRESORAS</td>
                                                <td>UNIDAD</td>
                                                <td>SIN SERIE</td>
                                                <td style="text-align:center;">1</td>
                                                <td style="text-align:right;">S/. 75.00</td>
                                                <td style="text-align:right;">S/. 75.00</td>
                                            </tr>
                                        </tbody>
                                    </table>--%>
                                </div>
                                <br />
                                <div class="row-fluid">
                                    <div class="span10"></div>
                                    <div class="span2">
                                        <input type="text" class="m-wrap span12" id="txtTotal" style="text-align: right; font-weight: 700; font-size: 30px;" disabled value="S/. 0.00" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span8">
                        <div class="alert alert-block alert-info fade in">
                            <h4 class="alert-heading" id="titulo_info"></h4>
                            <p id="cuerpo_info"></p>


                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a class="btn blue disabled popovers" data-trigger="hover" data-placement="top" data-content="Se separa los productos de almacén que serán usados en el proceso de reparación!!!" data-original-title="Inicio Reparación" id="btnInicioR"><i class="icon-unlock"></i>&nbsp Inicio Reparación</a>
                    &nbsp;
                    <a class="btn purple disabled popovers" data-trigger="hover" data-placement="top" data-content="Cambia el estado de la reparación a reparada y se genera la venta con el detalle de productos y servicios que se usó en la reparación del producto!!!" data-original-title="Cierre Reparación" id="btnCierreR"><i class="icon-lock"></i>&nbsp Cierre Reparación</a>
                    &nbsp;
                    <%--<a class="btn green disabled popovers" data-trigger="hover" data-placement="top" data-content="Se genera la venta con el detalle de productos y servicios que se usó en la reparación del producto!!!" data-original-title="Pase a Pago" id="btnPaseP"><i class="icon-credit-card"></i>&nbsp Pase a Pago</a>
                    &nbsp;--%>
                    <%--<a class="btn orange disabled popovers" data-trigger="hover" data-placement="top" data-content="Verifica el pago del cliente, se entrega el equipo y la atención es cerrada!!!" data-original-title="Entrega Equipo" id="btnEntregaE"><i class="icon-inbox"></i>&nbsp Entrega Equipo</a>
                    &nbsp;--%>
                    <%--<a class="btn black disabled popovers" data-trigger="hover" data-placement="top" data-content="It's Coming!!!" data-original-title="Autoriración Extra" id="btnAutorizacionE"><i class="icon-asterisk"></i>&nbsp Autorización Extra</a>
                    &nbsp;--%>
                    <a class="btn" id="btnCancelar" href="javascript:BotonCancelar();"><i class="icon-remove"></i>&nbsp Salir</a>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<%--MODAL PARA ENVIAR CORREO--%>
<div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none ;">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
        </div>
        <div class="modal-body">
            <div class="row-fluid">
                <div class="span12" id="divMail_body">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">De:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNRemitente" class="span12" disabled><input id="txtRemitente" type="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Para:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <select multiple="multiple" class="span12" id="cboCorreos"></select>
                                    <%--<a href="?f=nclpers" target="_blank" title="Agregue correos en la pantalla Persona">Nuevo Correo</a>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Asunto:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtAsunto" class="span12">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12" style="padding: 10px; border: thin inset">
                            <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                            <div id="datos_correo">
                            <h4 id="lblEmpresa"></h4>
                            <h5 id="lblAsunto"></h5>
                            <h6><strong><b>RECEPCIÓN:</b></strong>&nbsp;<span id="lblFRecepcion"></span></h6>
                            <h6><strong><b>DIAGNÓSTICO:</b></strong>&nbsp;<span id="lblFDiagnostico"></span></h6>
                            <h6><strong><b>ENTREGA APROX.:</b></strong>&nbsp;<span id="lblFEntrega"></span></h6>
                            <h6><strong><b>CLIENTE:</b></strong>&nbsp;<span id="lblCliente"></span></h6>
                            <h6><strong><b>AUTORIZADO:</b></strong>&nbsp;<span id="lblAutorizado"></span></h6>
                            <h6><strong><b>PRODUCTO:</b></strong>&nbsp;<span id="lblProducto"></span></h6>
                            <h6><strong><b>DIAGNÓSTICO:</b></strong>&nbsp;<span id="lblDiagnostico"></span></h6>
                            <h6><strong><b>RECOMENDACIÓN:</b></strong>&nbsp;<span id="lblRecomendacion"></span></h6>
                            <h6><strong><b>TÉCNICO:</b></strong>&nbsp;<span id="lblTecnico"></span></h6>
                            <h6><strong><b>ESTADO:</b></strong>&nbsp;<span id="lblEstado"></span></h6>
                            <h6><strong><b>SITUACIÓN:</b></strong>&nbsp;<span id="lblSituacion"></span></h6>
                            </div>
                            <div id="datos_tabla"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
        </div>
    </div>

<div id="divDctoImprimir" style="display: none;">
</div> 
<input type="hidden" id="hfValorCambio" />
<input type="hidden" id="hfCOD_PROD" />
<input type="hidden" id="hfProdSeriado" />
<script type="text/javascript" src="../recursos/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
<script type="text/javascript" src="../vistas/NF/js/NFMREPA.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMREPA.init();
        $('.timepicker-default').timepicker({
            defaultTime: 'current',
            minuteStep: 1
        });
    });
</script>
