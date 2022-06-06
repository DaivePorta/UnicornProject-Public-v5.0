<%@ Control Language="VB" AutoEventWireup="false" CodeFile="AFCIPFR.ascx.vb" Inherits="vistas_AF_AFCIPFR" %>
<style>
    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }

    .cantidad {
        padding: 2px 10px;
        max-width: 100px;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PRODUCTO FABRICADO</h4>
                <div class="actions">
                    <a class="btn black" onclick="ImprimirDctoSinCosto();"><i class="icon-print"></i>&nbsp;Imprimir Sin Costo</a>
                    <a class="btn black" onclick="ImprimirDcto();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=AFCIPFR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=AFCLPRF" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label for="txtCodigoFabricacion">N°</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtCodigoFabricacion" class="span12" placeholder="Generado" disabled="disabled" />
                                <input type="hidden" id="hfMcdrCode" value="" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group ">
                                <label>Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresas" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <label>Establecimiento</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group ">
                                <label>Producto</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls" id="divCodigoProd">
                                        <input id="txt_cod_a_producto" class="span12" type="text" style="margin-left: -2px;" placeholder="Código" />
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls" id="divDescProd">
                                        <input id="txt_desc_producto" class="span12" type="text" placeholder="Nombre" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <a id="btnRecargarProdFab" style="margin-left: -5px;" class="btn purple" title="Recargar Lista de Productos" data-trigger="hover" href="#"><i class="icon-refresh" style="line-height: initial"></i></a>

                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNroSerie">Nro Serie</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="row-fluid">
                                <div class="span9">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtNroSerie" maxlength="50" class="span12" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span3">
                                    <a id="btnCodigo" class="btn purple span12 tooltips" data-original-title="Ver Código de Barras"><i class="icon-barcode" style="line-height: initial;"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="margin-left: 0">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaEnsamblaje">
                                    Ensamblaje
                                </label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 center date-picker" placeholder="dd/mm/yyyy" id="txtFechaEnsamblaje" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaMovimiento">
                                    Movimiento Almacén</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 center date-picker" placeholder="dd/mm/yyyy" id="txtFechaMovimiento" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtAlmacenero">Almacenero</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="divTxtAlmacenero">
                                    <input id="txtAlmacenero" class="span12" type="text" style="text-transform: uppercase" />
                                </div>
                            </div>
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
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls" id="input_centro_costo">
                                            <input id="txtCentroCostos" class="span12" type="text" next="#btnAgregarProducto" style="text-transform: uppercase" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <a id="btn_new_cc" class="btn green tooltips" href="?f=ncmcecc" data-original-title="Crear Centro de Costos" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <hr class="span12" style="min-height: 10px; margin: 0px 0px 5px 0px" />
                </div>

                <!-- AGREGAR PRODUCTOS DETALLE -->

                <div class="tabbable tabbable-custom boxless" style="display: block;" id="platillaOpciones">
                    <ul class="nav nav-tabs">
                        <li class="active"><a id="tabProducto" href="#tab2" data-toggle="tab"><i class=""></i>Por Producto</a></li>
                        <li><a id="tabDctoCompra" href="#tab1" data-toggle="tab"><i class=""></i>Por Documento de Compra</a></li>
                    </ul>
                    <div class="tab-content">
                        <!-- AGREGAR DETALLES BUSCANDO POR PRODUCTO -->
                        <div class="tab-pane active" id="tab2" style="padding: 5px">
                            <div class="row-fluid">
                                <div id="detallemov_datos">

                                    <div class="row-fluid" id="fila_2" style="display: block;">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtPROD_CODE">
                                                    Código</label>
                                            </div>
                                        </div>
                                        <div class="span3">
                                            <div class="control-group">
                                                <div class="controls" id="input_cod_prod">
                                                    <input id="hfDCTO_ORGN" type="hidden" />
                                                    <input id="txtPROD_CODE" class="span12" type="text" next="#txtPROD_DESC" style="text-transform: uppercase" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtPROD_DESC">
                                                    Descripción Producto</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls" id="input_prod">
                                                    <input id="txtPROD_DESC" class="span12" type="text" data-provide="typeahead" style="text-transform: uppercase" next="#txtcant" value="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <%--<a id="btnVerProducto" class="btn tooltips blue" data-original-title="Ver información del Producto" data-trigger="hover"><i class="icon-eye-open" style="line-height: initial"></i></a>--%>
                                                    <a id="btnRefrescarProductos" class="btn purple" title="Recargar Lista de Productos" data-trigger="hover" href="#"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                    <a id="btn_new_prod" class="btn green" title="Crear Producto" data-trigger="hover" href="?f=nmmprod" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="fila_3" style="display: block;">
                                        <div class="span12">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtcant">
                                                                Cantidad</label>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtcant" onkeypress="return ValidaDecimales(event,this,2)" class="span12" type="text" />
                                                                <input id="txtcantorigen" class="span12" type="hidden" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <label class="control-label span4" for="cboUniMedida">U.M.</label>
                                                                <select id="cboUniMedida" class="span8" data-placeholder="Unidad Medida" disabled="disabled"></select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="span1 offset1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtPU">C.U.</label>
                                                        </div>
                                                    </div>

                                                    <div class="span4">
                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtPU" class="span12 center" placeholder="Costo" onkeypress="return ValidaDecimales(event,this)" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <label class="control-label pull-right" for="txtStock">Stock</label>
                                                            </div>
                                                        </div>
                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtStock" class="span12 center" placeholder="Stock" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="div_vie_camp_seriados" style="display: none;">
                                        <div class="span12">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cboCorrelativo">
                                                                Nros. de Serie
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cboCorrelativo" class="span12" data-placeholder="Correlativo">
                                                                    <%--<option value="C" class="optLND">CORRELATIVO</option>--%>
                                                                    <%--<option value="S" class="optLND">NO SECUENCIAL</option>--%>
                                                                    <option></option>
                                                                    <option value="L" id="optLD">LISTA DETALLADA</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span6" id="div_correlativos">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="fila_5" style="display: block;">
                                        <div class="span12">
                                            <div class="control-group">
                                                <div class="controls" id="div_txt_serie_sec" style="display: none;">
                                                    <input id="txtSerie" data-role="tagsinput" class="span12" type="hidden" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="row-fluid">
                                        <div class="span5 offset5" id="fila_6">
                                            <a class="btn pull-right" href="javascript:LimpiarCamposDetalle();" style="margin-left: 5px"><i class="icon-file"></i>&nbsp;Limpiar</a>
                                            <a id="btnAgregarProducto" class="btn blue pull-right" href="javascript:AgregarProducto();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- AGREGAR DETALLES POR DOCUMENTOS DE COMPRA -->
                        <div class="tab-pane" id="tab1" style="padding: 5px">
                            <div id="prueba">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="span1">
                                            <div class="control-group ">
                                                <label>Documento</label>
                                            </div>
                                        </div>
                                        <div class="span6">
                                            <div class="row-fluid">
                                                <div class="span6">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <div id="Div1" class="controls">
                                                                <input id="txtnumdocOrigenserie_0" class="txtnumdocOrigenserie span4" disabled="disabled" type="text" placeholder="Serie" />
                                                                <input id="txtnumdocOrigen_0" class="span8 txtnumdocOrigen" style="margin-left: -2px;" disabled="disabled" type="text" placeholder="Nro" />
                                                                <input id="txtCodigoDoc_0" class="txtCodigoDoc" type="hidden" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="span6">
                                                    <div class="control-group">
                                                        <div class="controls" style="padding-top: 1px">

                                                            <a id="btnBuscadocs" class="btn tooltips blue buscar1" data-original-title="Buscar Documento" onclick="buscarDocumento1(this)"><i class="icon-search" style="line-height: initial;"></i></a>
                                                            <a id="btn_busca_deta" class="btn tooltips blue" data-original-title="Listar Detalles de Documento" onclick='ListaProdDetalle1(this)'><i class="icon-reorder" style="line-height: initial;"></i></a>
                                                            <a id="btn_add_dcto" class="btn tooltips blue" data-original-title="Agregar Otro Documento"><i class="icon-plus" style="line-height: initial;"></i></a>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span5" style="display: none">
                                            <div class="span1 offset3">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboMoneda">
                                                        Moneda</label>
                                                </div>
                                            </div>
                                            <div class="span2 ">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboMoneda" class="span12" data-placeholder="Moneda" disabled="disabled">
                                                            <option></option>
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
                <div class="row-fluid" id="detalleProd">
                    <div class="span12">
                        <table id="detalleGeneral" class="table display DTTT_selectable" style="border: 1px solid #cbcbcb;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO DOC.</th>
                                    <th>FACTURA</th>
                                    <th>GUÍA</th>
                                    <th>ITEM</th>
                                    <th>CÓDIGO PRODUCTO</th>
                                    <th>SERIE PRODUCTO</th>
                                    <th>DESCRIPCIÓN PRODUCTO</th>
                                    <th>CANTIDAD</th>
                                    <th>COSTO</th>
                                    <th>CANTIDAD USADA</th>
                                    <th>TOTAL<br />
                                        SIN IGV</th>
                                    <th>TOTAL<br />
                                        CON IGV</th>
                                    <%--<th style="display: none">CENTRO<br />
                                        COSTOS</th>--%>
                                    <th>#</th>
                                    <%--<th style="display: none">CODE_HIJO</th>
                                    <th style="display: none">UNME_CODE</th>
                                    <th style="display: none">CECC_CODE</th>
                                    <th style="display: none">CECD_CODE</th>--%>
                                </tr>
                            </thead>

                        </table>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="nuevoDetalle">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span4 offset8">
                            <div class="control-group">
                                <div class="controls">
                                    <div id="Div2" class="controls">
                                        <label>Total Sin IGV</label>
                                        <input id="totalSinIGV" class="right span9" disabled="disabled" type="text" />

                                        <label>Total Con IGV</label>
                                        <input id="totalConIGV" class="right span9" disabled="disabled" type="text" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border " id="legend">Mano de Obra</legend>

                    <div class="row-fluid" id="divMno">

                        <div class="span1">
                            <div class="control-group ">
                                <label>Empleado</label>
                            </div>
                        </div>

                        <div class="span4">
                            <div class="row-fluid">
                                <div class="span10">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div id="input_empl">
                                                <input id="txtEmpleado" class="span12" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <a id="btn_add_emp" class="btn green span12 pull-right "><i class="icon-plus" style="line-height: initial;"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <%-- <div class="span2">

                            <div class="control-group">
                                <div class="controls">
                                </div>
                            </div>
                        </div>

                        <div class="span7">
                        </div>--%>
                    </div>

                    <div class="row-fluid">
                        <div class="span8">
                            <div id="mano">
                                <table id="detalleEmpleado" class="display DTTT_selectable" border="0">
                                    <thead>
                                        <tr>
                                            <th>PIDM</th>
                                            <th>EMPLEADOS</th>
                                            <th>SUELDO x HORA</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div id="nuevoMano">
                            </div>
                        </div>

                        <div class="span3">

                            <div class="span12">
                                <div class="control-group ">
                                    <label>Total de Sueldo x Horas </label>
                                </div>
                            </div>
                            <div class="span12">

                                <div class="control-group">

                                    <div class="controls">
                                        <div id="Div4" class="controls">
                                            <input id="txtHoraSueldo" disabled="disabled" class="span12 right" type="text" />

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="span12">
                                <div class="control-group ">
                                    <label>Horas Trabajadas</label>
                                </div>
                            </div>

                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <div id="Div5" class="controls">
                                            <input id="txthorasTrabaja" class="span12 right" type="text" />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span12">
                                <div class="control-group ">
                                    <label>Total de Mano de Obra</label>
                                </div>
                            </div>

                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <div id="Div6" class="controls">
                                            <input id="txttotalEmpleados" disabled="disabled" class="span12 right" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="span1">
                        </div>
                    </div>

                </fieldset>
                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border " id="legend1">Total de Producto Fabricado</legend>

                    <div class="row-fluid">
                        <div class="span4 offset8">
                            <div class="control-group">
                                <div class="controls">
                                    <div id="Div7" class="controls">
                                        <label>Total de Producto Facricado Sin IGV</label>
                                        <input id="txttotalProFaS" class="right span9" disabled="disabled" type="text" />

                                        <label>Total de Producto Facricado Con IGV</label>
                                        <input id="txttotalProFac" class="right span9" disabled="disabled" type="text" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </fieldset>

                <div class="form-actions" id="acciones_generales" style="display: block;">
                    <a id="guardar" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                    <a id="cancelar" class="btn" href="?f=AFCIPFR"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>

</div>
<div id="divBuscarDoc" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarDoc_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <table class="table table-hover" id="tblDocumentos">
                    <thead>
                        <tr>
                            <th class="center">CODIGO</th>
                            <th class="center">NRO DOCUMENTO</th>
                            <th class="center">A NOMBRE DE</th>
                            <th class="center">MONTO TOTAL</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>

<div id="MDETALLE" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Detalle de Compra</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div3" style="overflow-x: auto;">
                <table class="table table-hover" id="detalle">
                    <thead>
                        <tr>
                            <th class="center">CODIGO</th>
                            <th style="display: none">CODIGO_HIJO</th>
                            <th class="center">FACTURA</th>
                            <th class="center">CODIGO GUIA</th>
                            <th class="center">NRO ITEM</th>
                            <th class="center">CODE PRODUCTO</th>
                            <th class="center">PRODUCTO</th>
                            <th class="center">CANTIDAD</th>
                            <th class="center">PRECIO </th>
                            <th class="center">SERIE </th>

                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>

<div id="barras" class="modal hide fade in dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H2"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Codigo de Barras</h4>
    </div>

    <div class="portlet-body">
        <div class="row-fluid">
            <div class="span12">
                <div class="row-fluid">
                    <div class="span12" id="divCodBarras">
                        <canvas id="codBarras" width="400" height="120" style="margin: auto; display: block; margin: 10px;"></canvas>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 10px;">
                    <div class="span11">
                        <a id="btnImprimir" class="btn green" style="margin-left: 5px;"><i class=" icon-download"></i>&nbsp;Descargar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divImprimirCodBarras"></div>

<input id="hfIMPUESTO" type="hidden" />
<input id="emplPidm" type="hidden" />
<input id="emplNombres" type="hidden" />
<input id="emplSueldo" type="hidden" />
<!-- -->
<input id="hfCOD_PROD" type="hidden" />
<input id="hfDESC_PROD" type="hidden" />
<input id="hfCECC_CODE" value="" type="hidden" /><!-- CECC-->
<input id="hfCENTRO_COSTOS" value="" type="hidden" /><!-- CECD-->
<input id="hfProdCodeDetalle" value="" type="hidden" />
<input id="hfPidmAlmacenero" value="" type="hidden" />



<div id="divDctoImprimir" style="display:none;"></div>
<script type="text/javascript" src="../../recursos/plugins/CodBarras/jquery-barcode.min.js"></script>
<script type="text/javascript" src="../vistas/AF/js/AFCIPFR.js"></script>
<script>
    jQuery(document).ready(function () {
        AFCIPFR.init();
    });
</script>
