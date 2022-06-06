<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMCORE.ascx.vb" Inherits="vistas_MP_MPMCORE" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PLANIFICACION DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn green" href="?f=MPMCORE"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=MPLCORE"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
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
                                <div class="controls">
                                    <label class="control-label span8" for="chkEstado">Activo</label>
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span4" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa"></select>
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
                <div class="row-fluid" style="padding-top: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtOrdenFabricacion">Orden de Fabricación</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="hidden" id="txtCodigoOrdenFabricacion" />
                                    <input type="text" id="txtNroOrdenFabricacion" class="span2" disabled="disabled" style="text-align: center" />
                                    <input type="text" id="txtOrdenFabricacion" class="span7" style="text-transform: uppercase" disabled="disabled" />
                                    <a id="btnBuscarOrdenFabricacion" class="btn blue" style="margin-top: -11px"><i class="icon-search" style="line-height: initial"></i></a>
                                    <input type="hidden" id="txtCodigoProducto" />
                                    <input type="hidden" id="txtCantidadOrden" />
                                    <input type="hidden" id="txtFechaInicioOrden" />
                                    <input type="hidden" id="txtFechaLimiteOrden" />
                                    <input type="hidden" id="txtCodigoFormulacion" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtHoras">Tiempo estimado</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtHoras" class="span12" disabled="disabled" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtProceso">Proceso productivo</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtProceso" class="span12" disabled="disabled" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCostoTotalMN">Costo estimado (S/.)</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCostoTotalMN" class="span12" disabled="disabled" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCostoTotalME" style="text-align: right">Costo estimado ($)</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCostoTotalME" class="span12" disabled="disabled" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#insumos" data-toggle="tab"><i class=""></i>Insumos</a></li>
                            <li><a href="#recursoHumano" data-toggle="tab"><i class=""></i>Recurso Humano</a></li>
                            <li><a href="#seccionesAlmacen" data-toggle="tab"><i class=""></i>Secciones de Almacén</a></li>
                            <li><a href="#activosFijos" data-toggle="tab"><i class=""></i>Maquinarias y Equipos</a></li>
                            <li><a href="#conceptosEnergeticos" data-toggle="tab"><i class=""></i>Conceptos Energéticos</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="insumos" style="padding: 5px">
                                <div id="agregarInsumo">
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtInsumo">Insumo</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="hidden" id="txtPROD_CODE" />
                                                        <input type="hidden" id="txtPROD_CODE_ANTIGUO" />
                                                        <input type="hidden" id="txtPROD_STOCK" />
                                                        <input type="text" id="txtInsumo" style="text-transform: uppercase" class="span12" />
                                                        <input type="hidden" id="txtNombreComercial" />
                                                        <input type="hidden" id="txtCostoMNPROD" />
                                                        <input type="hidden" id="txtCostoMEPROD" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCantPROD">Cantidad</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtCantPROD" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: right" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboUMPROD" style="text-align: right">U.M.</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboUMPROD" class="span12" disabled></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtMermaPROD" style="text-align: right">Merma</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtMermaPROD" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: right" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <button type="button" id="btnAgregarPROD" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-hover table-bordered" id="tblInsumos">
                                            <thead>
                                                <tr>
                                                    <th>MANC_CODE</th>
                                                    <th>PROD_CODE</th>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>INSUMO</th>
                                                    <th>INSUMO</th>
                                                    <th style="text-align: center">CANTIDAD</th>
                                                    <th style="text-align: center">UNME_CODE</th>
                                                    <th style="text-align: center">U.M.</th>
                                                    <th style="text-align: center">MERMA</th>
                                                    <th style="text-align: center">S/.</th>
                                                    <th style="text-align: center">$</th>
                                                    <th style="text-align: center">EN STOCK</th>
                                                    <th style="text-align: center"></th>
                                                    <th style="text-align: center"></th>
                                                    <th>DETALLE_RECETA</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row-fluid" id="acciones" style="padding-top: 15px">
                                    <div class="span11" style="text-align: right">
                                        <button id="btnRequerimiento" type="button" class="btn blue hidden"><i class="icon-shopping-cart"></i>&nbsp;Nuevo Requerimiento de Bienes</button>
                                        <button id="btnSalidaProduccion" type="button" class="btn green hidden"><i class="icon-share-alt"></i>&nbsp;Nueva Salida a Producción</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="recursoHumano" style="padding: 5px">
                                <div id="agregarRecursoHumano">
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtEmpleado">Empleado</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="hidden" id="txtEMPL_CODE" />
                                                        <input type="text" id="txtEmpleado" class="span12" style="text-transform: uppercase" />
                                                        <input type="hidden" id="txtCostoMNEMPL" />
                                                        <input type="hidden" id="txtCostoMEEMPL" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtHorasEMPL">Trabajo diario (horas)</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtHorasEMPL" class="span12" onkeypress="return ValidaHoras(event, this)" style="text-align: right" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtActividadEMPL" style="text-align: right">Actividad</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtActividadEMPL" class="span12" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaInicioEMPL">Inicio</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaInicioEMPL" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaLimiteEMPL" style="text-align: right">Límite</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaLimiteEMPL" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <button type="button" id="btnAgregarEMPL" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-hover table-bordered" id="tblEmpleados">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>EMPLEADO</th>
                                                    <th>ACTIVIDAD</th>
                                                    <th style="text-align: center">HORAS DIA</th>
                                                    <th style="text-align: center">INICIO</th>
                                                    <th style="text-align: center">LIMITE</th>
                                                    <th style="text-align: center">S/.</th>
                                                    <th style="text-align: center">$</th>
                                                    <th style="text-align: center"></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="seccionesAlmacen" style="padding: 5px">
                                <div id="agregarSeccion">
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtSeccion">Sección de Almacén</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboSeccion" class="span12"></select>
                                                        <%--<input type="hidden" id="txtSECC_CODE" />
                                                        <input type="text" id="txtSeccion" class="span12" style="text-transform: uppercase" />
                                                        <input type="hidden" id="txtCostoMNSECC" />
                                                        <input type="hidden" id="txtCostoMESECC" />--%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaInicioSECC" style="text-align: right">Inicio</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaInicioSECC" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaLimiteSECC" style="text-align: right">Límite</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaLimiteSECC" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <button type="button" id="btnAgregarSECC" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-hover table-bordered" id="tblSecciones">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>SECCION DE ALMACEN</th>
                                                    <th style="text-align: center">INICIO</th>
                                                    <th style="text-align: center">LIMITE</th>
                                                    <th style="text-align: center">S/.</th>
                                                    <th style="text-align: center">$</th>
                                                    <th style="text-align: center"></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="activosFijos" style="padding: 5px">
                                <div id="formulacionMAEQ" style="display: none;">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <p>Se requiere:</p>
                                            <ul id="listaMAEQ"></ul>
                                        </div>
                                    </div>
                                    <div class="row-fluid" style="height: 10px">
                                        <hr class="span11" style="min-height: 5px; height: 5px; margin-top: 0px" />
                                    </div>
                                </div>
                                <div id="agregarActivoFijo">
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtActivoFijo">Maquinaria / Equipo</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="hidden" id="txtACFI_CODE" />
                                                        <input type="text" id="txtActivoFijo" class="span12" style="text-transform: uppercase" />
                                                        <input type="hidden" id="txtCostoMNACFI" />
                                                        <input type="hidden" id="txtCostoMEACFI" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtActividadACFI">Actividad implicada</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtActividadACFI" class="span12" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaInicioACFI" style="text-align: right">Inicio</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaInicioACFI" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaLimiteACFI" style="text-align: right">Límite</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtFechaLimiteACFI" class="span10" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <button type="button" id="btnAgregarACFI" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-hover table-bordered" id="tblActivos">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>MAQUINARIA / EQUIPO</th>
                                                    <th>ACTIVIDAD</th>
                                                    <th style="text-align: center">INICIO</th>
                                                    <th style="text-align: center">LIMITE</th>
                                                    <th style="text-align: center">S/.</th>
                                                    <th style="text-align: center">$</th>
                                                    <th style="text-align: center"></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="conceptosEnergeticos" style="padding: 5px">
                                <div id="agregarConcepto">
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtConcepto">Concepto Energético</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboConcepto" class="span12"></select>
                                                        <%--<input type="hidden" id="txtCOEN_CODE" />
                                                        <input type="text" id="txtConcepto" class="span12" style="text-transform: uppercase" />
                                                        <input type="hidden" id="txtCostoMNCOEN" />
                                                        <input type="hidden" id="txtCostoMECOEN" />--%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span11">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCantCOEN">Cantidad</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtCantCOEN" class="span12" onkeypress="return ValidaDecimales(event, this, 2)" style="text-align: right" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboUMCOEN" style="text-align: right">U.M.</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboUMCOEN" class="span12" disabled></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <button type="button" id="btnAgregarCOEN" class="btn blue pull-right"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span11">
                                        <table class="table table-hover table-bordered" id="tblConceptos">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center">CODIGO</th>
                                                    <th>CONCEPTO ENERGETICO</th>
                                                    <th style="text-align: center">CANTIDAD</th>
                                                    <th style="text-align: center">UNME_CODE</th>
                                                    <th style="text-align: center">U.M.</th>
                                                    <th style="text-align: center">S/.</th>
                                                    <th style="text-align: center">$</th>
                                                    <th style="text-align: center"></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button id="btnCompletar" type="button" class="btn green hidden"><i class="icon-ok-sign"></i>&nbsp;Completar</button>
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divBuscarOrden" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarOrden_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR ORDEN DE FABRICACION</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarOrden_body">
                <table class="table table-hover" id="tblOrdenes">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODE</th>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">PROD_CODE</th>
                            <th style="text-align: center">PRODUCTO</th>
                            <th style="text-align: center">CANTIDAD</th>
                            <th style="text-align: center">U.M.</th>
                            <th>RESPONSABLE</th>
                            <th>FECHA INICIO</th>
                            <th>FECHA LIMITE</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en una orden de flujo para seleccionarla.</h5>
    </div>
</div>
<div id="divRequerimiento" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 65%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-search" style="line-height: initial;"></i>&nbsp;REQUERIMIENTO DE BIENES</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divRequerimiento_body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresaReq" class="span12" data-placeholder="EMPRESA" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursalReq" class="span12" data-placeholder="SUCURSAL" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Nro. Requisicion </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <input id="txtRequisicion" class="span12" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label>Fecha</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaReq" class="span12" type="text" disabled="disabled" style="text-align: center" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Solicitante</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSolicitanteReq" class="span12" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="controls">
                            <label>Prioridad</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <select id="cbPrioridadReq" class="span12" data-placeholder="EMPRESA">
                                <option value="1">Normal</option>
                                <option value="2">Urgente</option>
                            </select>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls" style="text-align: right">
                            <label>Tipo de Requerimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <select id="cboTipoReq" class="span12" disabled="disabled">
                                <option value="3">Materia Prima, Stock Bajo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <label id="lblNivel1"></label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNivel1" class="span12" data-nivel="1" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label id="lblNivel2"></label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNivel2" class="span12" data-nivel="2" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <label id="lblNivel3"></label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNivel3" class="span12" data-nivel="3" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label id="lblNivel4"></label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNivel4" class="span12" data-nivel="4" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Glosa:</label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="controls">
                            <p id="lblGlosa">Requerimiento de Bienes generado para la Orden de Fabricación nro. <span id="lblNroOrdenFabricacion"></span></p>
                        </div>
                    </div>
                </div>
                <hr style="margin: 5px 0px" />
                <table class="table table-hover" id="tblRequerimiento">
                    <thead>
                        <tr>
                            <th style="text-align: center">PROD_CODE</th>
                            <th style="text-align: center">CODIGO</th>
                            <th>PRODUCTO</th>
                            <th style="text-align: center">CANTIDAD</th>
                            <th style="text-align: center">UNME_CODE</th>
                            <th style="text-align: center">U.M.</th>
                            <th style="text-align: center">FECHA</th>
                            <th>DETALLE_RECETA</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn blue" id="btnNuevoRequerimiento"><i class="icon-shopping-cart"></i>&nbsp;Generar Nuevo Requerimiento</button>
    </div>
</div>
<div id="divSalidaProduccion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 65%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-share-alt" style="line-height: initial;"></i>&nbsp;SALIDA A PRODUCCION</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div2">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>N°.</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtISAC_CODE" class="span12" disabled="disabled" style="text-align: center" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresaSalida" class="span12" data-placeholder="EMPRESA" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Almacén</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAlmacen" class="span12" data-placeholder="ALMACEN" disabled="disabled"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label>Operación</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboOperacion" class="span12" data-placeholder="OPERACION" disabled="disabled">
                                    <option value="0010">SALIDA A PRODUCCION</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label>Solicitante</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="hidden" id="txtPIDM_S" />
                                <input type="text" id="txtSolicitante" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group">
                                <label>Emisión</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtEmision" class="span12" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label style="text-align: right">Transacción</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtTransaccion" class="span12" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label>Despachado por</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtDespacho" class="span12" placeholder="A especificar" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label>Origen</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboOrigen" class="span12" disabled="disabled">
                                    <option value="0000">ORDEN DE FABRICACION</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNroOrigen" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label>Registro</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboRegistro" class="span12" disabled="disabled">
                                    <option value="0050">GUIA DE SALIDA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="hidden" id="txtCOD_AUT" />
                                <input type="text" id="txtSerieSalida" class="span4" disabled="disabled" />
                                <input type="text" id="txtNroSalida" class="span8" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label>Glosa:</label>
                        </div>
                    </div>
                    <div class="span11">
                        <p id="lblGlosaSalida">Salida a Producción generada para la Orden de Fabricación Nro. <span id="lblNroOrdenFabricacion2"></span></p>
                    </div>
                </div>
                <hr style="margin: 5px 0px" />
                <table class="table table-hover" id="tblSalida">
                    <thead>
                        <tr>
                            <th>PROD_CODE</th>
                            <th style="text-align: center">ITEM</th>
                            <th style="text-align: center">CODIGO</th>
                            <th>PRODUCTO</th>
                            <th style="text-align: center">CANTIDAD</th>
                            <th style="text-align: center">UNME_CODE</th>
                            <th style="text-align: center">U.M.</th>
                            <th style="text-align: center">MONTO S/.</th>
                            <th style="text-align: center">MONTO $</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="btnNuevaSalidaProduccion" type="button" class="btn green"><i class="icon-share-alt"></i>&nbsp;Generar Nueva Salida a Producción</button>
    </div>
</div>
<input type="hidden" id="txtTipoCambio" />
<script type="text/javascript" src="../vistas/MP/js/MPMCORE.js"></script>
<script>
    jQuery(document).ready(function () {
        MPMCORE.init();
    });
</script>
