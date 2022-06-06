<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMPREE.ascx.vb" Inherits="vistas_NV_NVMPREE" %>
 <link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
<style>
    .util, .prec {
        max-width: 100px;
        min-width: 20px;
    }

    @media print {

        #nomProd {
            min-width: 350px;
        }

        .util, .prec {
            border: none !important;
            outline: none !important;
            border-color: white;
            outline-color: white;
            text-align: right;
            font-size: 12px !important;
            line-height: 12px !important;
        }

        th {
            font-size: 11px !important;
        }

        tbody > td {
            border-bottom: 1px solid gray;
            padding: 0px 2px 0px 2px !important;
        }

        #gritter-notice-wrapper,
        .navbar-inner ,
        .page-sidebar ,
        .footer {
            /*display: none !important;*/
        }

        .page-content {
            margin-left: 0px !important;
        }

        /*#ventana parent {*/
        #contenedor,
        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            /*display: none !important;*/
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 11px !important;
            line-height: 11px !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .dn, .btn, #bloqueInfo {
            display: none !important;
        }
    }
</style>
<style>
    .fondoHeader {
        background-color: white;
        text-align: center;
        color: black;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }

    .hover {
        cursor: pointer;
    }

    .colorColumna {
        background-color: #f2eded !important;
        text-align: center !important;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;MANTENIMIENTO PRECIOS ESTANDAR</h4>
                <div class="actions">
                    <a class="btn black" style="margin-top: -10px" onclick="javascript:ImprimirPrecios();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12" style="margin-left: 0">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
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
                            <div class="span12" style="margin-top: -15px;">
                               <small id="lblExonerado" style="color: gray"></small>
                             </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Establecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupo">Grupo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboGrupo" name="cboGrupo" class="m-wrap span12 required" data-placeholder="Seleccionar Grupo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>                                       
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbosubgrupo">SubGrupo</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="row-fluid">
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls" id="divCboSubgrupo">
                                        <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboMarca">Marca</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="divCboMarca">
                                <select id="cbomarca" name="cbomarca" class="m-wrap span12 required" data-placeholder="Seleccionar Marca" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>



                </div>
                                
                <div class="row-fluid">
                    <div class="span8">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chboAvanzado">AVANZADO</label>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="danger-toggle-button-custom">
                                            <input id="chboAvanzado" type="checkbox" class="toggle" data-valactual=false />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span1"></div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chboUtilxRango">UTILIDADES POR RANGOS</label>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="danger-toggle-button-custom">
                                            <input id="chboUtilxRango" type="checkbox" class="toggle" data-valactual=false />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span1"></div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chboUtilDirec">UTILIDADES DIRECTAS</label>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="danger-toggle-button-custom">
                                            <input id="chboUtilDirec" type="checkbox" class="toggle" data-valactual=false />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="span4">
                        <p style="font-style: oblique;font-weight: 800;font-size: 12px;color:#C3C3C3;margin: 0px !important;line-height: 3;">*Costeado por Última Compra y Moneda de Producto</p>
                    </div>
                </div>
                
                <div class="row-fluid divAvanzado">
                    <hr />
                </div>
                
                <div class="row-fluid divAvanzado">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtTipoCambio">T/C Interno</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtTipoCambio" class="span12 center" placeholder="Tipo Cambio" onkeypress="javascript:return ValidaDecimales(event,this,4)" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="chkCostos">
                                <input type="checkbox" id="chkCostos" name="chkCostos" />Incluir Productos sin Costo</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupo">Moneda Costeo</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span3">
                                <label class="control-label" for="rbnMoba">
                                    <input type="radio" class="m-wrap span12" id="rbnMoba" value="MOBA" name="rbnValorizado" checked="checked" />
                                    Soles
                                </label>
                            </div>
                            <div class="span4">
                                <label class="control-label" for="rbnMoal">
                                    <input type="radio" class="m-wrap span12" id="rbnMoal" value="MOAL" name="rbnValorizado" />
                                    Dólares
                                </label>
                            </div>
                            <div class="span5">
                                <label class="control-label" for="rbnProd">
                                    <input type="radio" class="m-wrap span12" id="rbnProd" value="PROD" name="rbnValorizado" />
                                    Moneda Producto
                                </label>
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <div class="row-fluid divAvanzado">                
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaVigencia">Fecha Vigencia</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtFechaVigencia" class="span12 center date-picker" placeholder="Fecha Vigencia" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="chkPrecioSinStock">
                                <input type="checkbox" id="chkPrecioSinStock" name="chkPrecioSinStock" />Incluir Productos sin Stock</label>
                        </div>
                    </div>
                    
                    <%--<div class="span3">
                        <span id="info_btnf" class="pull-right" style="display:none;"><i style="color: #888; cursor: help; font-size: 18px; vertical-align: middle;" class="icon-info-sign"></i></span>
                    </div>--%>
                            
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Tipo Precio</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span3">
                                <label class="control-label" for="rbtnEstandar">
                                    <input type="radio" class="m-wrap span12" id="rbtnEstandar" value="E" name="rbtnTipoPrecio" checked="checked" />
                                    Estandar
                                </label>
                            </div>
                            <div class="span4">
                                <label class="control-label" for="rbtnCantidad">
                                    <input type="radio" class="m-wrap span12" id="rbtnCantidad" value="C" name="rbtnTipoPrecio" />
                                    Por Cant.
                                </label>
                            </div>
                            <div class="span5">
                                <label class="control-label" for="rbtnTodos">
                                    <input type="radio" class="m-wrap span12" id="rbtnTodos" value="" name="rbtnTipoPrecio" />
                                    Ambos
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row-fluid divUtilxRangos">
                    <hr />
                </div>
                
                <div class="row-fluid divUtilxRangos">
                    <div class="span5" id="platillaOpciones">
                        <table class="table display table-hover table-bordered" id="tblRangosUtilidad" style="width: 100%">
                            <thead>
                                <tr>
                                    <th class="center" style="width: 97px">FECHA</th>
                                    <th class="center">DESCRIPCIÓN</th>
                                    <th class="center" style="width: 97px">#</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div class="span3">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" for="txtNombre" style="font-weight:bold">RANGO DE UTILIDADES</label>
                                </div>
                            </div>                           
                        </div>
                        <div class="row-fluid">
                            <%--<div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtNombre" style="font-weight:bold">RANGO</label>
                                </div>
                            </div>--%>
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtNombre" maxlength="20" class="span12" placeholder="Nombre" style="text-align:center;"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                           <%-- <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtNombre" style="font-weight:bold">MONEDA</label>
                                </div>
                            </div>--%>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboMoneda2" class="span12" data-placeholder="Moneda">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <%--<div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtFin">Rango</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtRangoInicio" class="center span12" type="text" placeholder="Rango Inicio" onkeypress="return ValidaDecimales(event,this,2)" disabled="disabled" />
                                        <p style="font-style: italic; color: gray;"><span id="mensaje">*Inicio incluído en el rango.</span> </p>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtFin">Ut.</label>
                                </div>
                            </div>
                        </div>--%>

                       <%-- <div class="row-fluid">
                            <div class="span3"></div>

                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtUtilidad2" class="span12 center utilidad" type="text" placeholder="Utilidad (%)" onkeypress="return ValidaDecimales(event,this)" value="" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <a id="btnAgregarRango" href="javascript:AgregarRango();" class="btn blue" title="Agregar"><i class="icon-plus"></i></a>
                            </div>
                        </div>--%>

                       <%-- <div class="row-fluid" id="acciones" style="padding-top: 15px">
                            <div class="span3"></div>
                            <div class="span9">
                                <a id="btnNuevoRango" href="javascript:NuevoRangoUtilidad();" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                                <a id="btnGrabarRango" href="javascript:RegistrarRangoUtilidad();" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                            </div>
                        </div>

                        <hr />--%>
                                                
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" style="font-weight:bold;font-size: inherit;">Asigna Rangos de Utilidades en base a:</label>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <label class="control-label" for="rbtnCostoProm">
                                    <input type="radio" class="m-wrap span12" id="rbtnCostoProm" value="um" name="rbtnRangos" checked="checked" />
                                    <span style="font-weight:bold;font-size: small;">Costo Promedio</span>
                                </label>
                            </div>
                            <div class="span6">
                                <label class="control-label" for="rbtnUltCompra">
                                    <input type="radio" class="m-wrap span12" id="rbtnUltCompra" value="C" name="rbtnRangos" />
                                    <span style="font-weight:bold;font-size: small;">Última Compra</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnUtilidadMinimaxRango" class="btn green" >Utilidad Mínima</a>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnUtilidadNormalxRango" class="btn red" >Utilidad Normal</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="span5">
                                    <div class="control-group">
                                        <label class="control-label" style="font-weight:bold">ASIGNAR NUEVO PORCENTAJE</label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="control-group">
                                         <button type="button" id="btnMostrarPorcentaje" style="width:30px; height:20px; background:#F0EDEC; border:none; color:black" title="Agregar"><i class="fa fa-caret-down"></i></button>
                                        <button type="button" id="btnOcultarPorcentaje" style="width:30px; height:20px; background:#F0EDEC; border:none; color:black; display:none;" title="Agregar"><i class="fa fa-caret-up"></i></button>
                                    </div>
                                </div> 
                               
                            </div>
                        </div>
                        <div id="divRangos">                             
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span5">
                                        <div class="control-group">
                                            <input id="txtRangoInicio" class="center span12" type="text" placeholder="Rango Inicio" onkeypress="return ValidaDecimales(event,this,2)" disabled="disabled" />
                                             <p style="font-style: italic; color: gray;"><span id="mensaje">*Inicio incluído en el rango.</span> </p>
                                        </div>
                                    </div>
                                    <div class="span5">
                                        <div class="control-group">
                                             <input id="txtUtilidad2" class="span12 center utilidad" type="text" placeholder="Utilidad (%)" onkeypress="return ValidaDecimales(event,this)" value="" />
                                        </div>
                                    </div> 
                                    <div class="span1">
                                        <a id="btnAgregarRango" href="javascript:AgregarRango();" class="btn blue" title="Agregar"><i class="icon-plus"></i></a>
                                    </div>
                               
                                </div>
                            </div>
                            <div class="row-fluid" id="acciones" style="padding-top: 15px">
                                <div class="span3"></div>
                                <div class="span9">
                                    <a id="btnNuevoRango" href="javascript:NuevoRangoUtilidad();" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                                    <a id="btnGrabarRango" href="javascript:RegistrarRangoUtilidad();" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                                </div>
                            </div>
                            <hr />
                        </div>         

                        <div class="row-fluid">
                            <div class="span12" id="divTblRangos">
                                <table id="tblRangos" class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th class='center'>DESDE <span class="lblMonedaRango"></span></th>
                                            <th class='center'>HASTA <span class="lblMonedaRango"></span></th>
                                            <th class='center'>Ut. %</th>
                                            <th class='center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                                
                
                <div class="row-fluid divUtilDirectas">
                    <hr />
                </div>

                <div class="row-fluid divUtilDirectas">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtUtilidad">UTILIDAD:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group span11">
                            <div class="controls">
                                <input type="text" id="txtUtilidad" class="span12 center utilidad" placeholder="Utilidad" />
                            </div>
                        </div>
                        <div class="span1">
                            <p style="margin-top: 8px;">%</p>
                        </div>
                    </div>

                    
                    <div class="span3">
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnUtilidadMinimaxUtilidad" class="btn green" >Utilidad Mínima</a>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnUtilidadNormalxUtilidad" class="btn red" >Utilidad Normal</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                
                <div class="row-fluid">
                    <div class="span2" style="display: none">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Moneda">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                

                
                <%--<div id="divAsignarUtilidad" class="alert-info" padding: 10px;">

                    <div class="row-fluid">

                        <div class="span5 offset1">
                            <div class="control-group">
                                <label class="control-label" for="chkRangosCosto">
                                    <input type="checkbox" id="chkRangosCosto" name="chkRangosCosto" />
                                    Aplicar Rango % a COSTO PROMEDIO</label>
                            </div>
                        </div>
                        <div class="span5 ">
                            <div class="control-group">
                                <label class="control-label" for="chkRangosCompra">
                                    <input type="checkbox" id="chkRangosCompra" name="chkRangosCompra" />
                                    Aplicar Rango % a ULTIMA COMPRA</label>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span2 offset1">
                            <div class="control-group">
                                <label class="control-label" for="cboRango">Tipo de Precio:</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboRango" multiple="multiple" class="span12" data-placeholder="Precio">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span4">
                            <a id="btnExplorar" class="btn blue utilRango" style="margin-left: 5px;"><i class=" icon-search"></i>&nbsp;Rangos</a>
                            <a id="btnAsignarUtilidad" class="btn blue" style="margin-left: 5px;"><i class=" icon-pencil"></i>&nbsp;Asignar</a>
                            <span id="lblRangoSelec" style="font-style: italic; color: gray;"></span>
                        </div>
                    </div>
                </div> --%>

                <div class="row-fluid" id="bloqueInfo" style="margin-top: 5px; display: none;">
                    <div class="span12">
                        <div class="form-actions">
                            <p style="font-style: italic; margin-bottom: 0px;">*Los datos se guardarán al deseleccionar cada casilla de <strong>Precio Normal</strong> luego de ingresar un valor</p>
                            <p style="font-style: italic; margin-bottom: 0px;">*El borde <span style="color: green">VERDE</span> indica que la operación se realizó correctamente</p>
                            <p style="font-style: italic; margin-bottom: 0px;">*El borde <span style="color: blue">AZUL</span> indica que la operación se está procesando</p>
                        </div>
                    </div>
                </div>

                <div class="row-fluid hide" id="divTblPrecios">

                    <div class="span12">
                        <table id="tblPrecios" class="display DTTT_selectable" style="border: 1px solid rgb(203, 203, 203); margin-left: 0px;" border="0">
                            <thead class='fondoHeader'>
                                <tr>
                                    <th class='center' rowspan='2'>CODIGO</th>
                                    <th class='center' rowspan='2' id='nomProd'>PRODUCTO</th>
                                    <th class='center' rowspan='2'>MONEDA PRECIO</th>
                                    <th class='center' rowspan='2'>COSTO PROMEDIO</th>
                                    <th class='center' rowspan='2'>ULTIMA COMPRA</th>
                                    <th class='center dn' rowspan='2'>TIPO<br />
                                        PRECIO</th>
                                    <th class='center' colspan='2'>Mínimo</th>
                                    <th class='center' colspan='2'>Normal</th>
                                    <th class='dn center' rowspan='2'>#</th>
                                </tr>
                                <tr>
                                    <th class='center'>Ut. %</th>
                                    <th class='center'>Precio</th>
                                    <th class='center'>Ut. %</th>
                                    <th class='center'>Precio </th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <%--<div class="row-fluid">--%>
                    <div class="span6 offset6">
                        <div class="control-group span12">
                            <div class="controls">
                                <a class="btn black" onclick="javascript:ImprimirListaPrecios();">&nbsp;Imprimir Lista Precios</a>
                                <a id="btnCalcularTodo" class="btn green" title="Calcular todos los precios basado en Costo Promedio" >&nbsp;Calcular Precios(C)</a>
                                <a id="btnCalcularTodo2" class="btn red" title="Calcular todos los precios basado en Última Compra " >&nbsp;Calcular Precios(P)</a>
                                <span id="msgCalcular" style="font-style: italic;"></span>
                            </div>
                        </div>
                    </div>
                <%--</div>--%>

                </div>

            </div>
        </div>
    </div>
</div>

<!-- MODALES-->
<%--class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;"--%>
<div id="modalPlantilla" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalPlantilla_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;TABLA UTILIDAD POR RANGOS</h4>
    </div>
    <div class="modal-body" id="modalPlantilla_body">

        
    </div>
    <div class="modal-footer">
        <%--<h6 class="text-right">Clic en el <span style="color: blue">botón de carga</span> para seleccionar</h6>--%>
    </div>
</div>

<input id="hfNeto" type="hidden" value="0" />
<input id="hfValorizado" type="hidden" value="0" />
<input id="hfUltimaCompra" type="hidden" value="0" />

<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NV/js/NVMPREE.js"></script>

<script>
    jQuery(document).ready(function () {
        NVMPREE.init();
    });
</script>
