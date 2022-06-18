<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMINSA.ascx.vb" Inherits="vistas_NA_NAMINSA" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<style>
    #divBuscarDoc, #divMail, #modalDetallesOrigen {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divBuscarDoc, #divMail, #modalDetallesOrigen {
            left: 5% !important;
            width: 90% !important;
        }
    }

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
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;ENTRADA / SALIDA  ALMACENES</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <%--<a class="btn black hidden" id="btnImprimir" href="javascript:imprimirDiv2(['divContenido']);"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <%--<a class="btn black hidden" id="btnImprimir"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a class="btn green" href="?f=naminsa"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nalinsa"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">

                        <!-- TITULO DE LOS TABS-->
                        <ul class="nav nav-tabs">
                            <li id="liCabecera" class="active"><a id="tabDatosGenerales" href="#generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                            <li id="liDetalles"><a class="advance_form_with_chosen_element" id="tabDetalleMov" href="#detallemov" data-toggle="tab"><i class=""></i>Detalle Movimiento</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>
                        <div class="tab-content">
                            <!-- INICIO DEL TAB GENERALES-->
                            <div class="tab-pane active" id="generales">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumDctoAlmc">N°</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumDctoAlmc" class="span6" disabled="disabled" type="text" style="text-align: center" />
                                                        <input type="hidden" id="txtAPROBADO_IND" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span8" style="text-align: right">
                                                <div class="span12">
                                                    <div class="controls">
                                                        <label class="radio">
                                                            <div class="radio">
                                                                <span>
                                                                    <input type="radio" name="movAlmacen" value="I" checked="checked" style="opacity: 0;" id="rbEntrada" />
                                                                </span>
                                                            </div>
                                                            Entrada
                                                        </label>
                                                        <label class="radio">
                                                            <div class="radio">
                                                                <span>
                                                                    <input type="radio" name="movAlmacen" value="S" style="opacity: 0;" id="rbSalida" />
                                                                </span>
                                                            </div>
                                                            Salida
                                                        </label>

                                                        <label class="radio">
                                                            <div class="radio">
                                                                <span>
                                                                    <input type="radio" name="movAlmacen" value="TI" style="opacity: 0;" id="rbTEntrada" />
                                                                </span>
                                                            </div>
                                                            Transferencia Entrada
                                                        </label>
                                                        <label class="radio">
                                                            <div class="radio">
                                                                <span>
                                                                    <input type="radio" name="movAlmacen" value="TS" style="opacity: 0;" id="rbTSalida" />
                                                                </span>
                                                            </div>
                                                            Transferencia Salida
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="slcEmpresa">
                                                        Empresa</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="slcEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label id="lblalmacen" class="control-label" for="cboAlmacen">
                                                        Almacén</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboAlmacen" class="span12" data-placeholder="Almacén"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <input id="txtUbigeoOrigen" class="span2" type="hidden" style="text-align: center" disabled="disabled" />
                                            <input id="txtDirecOrigen" class="span4" type="hidden" style="text-align: center" disabled="disabled" />
                                            <input id="txtUrbOrigen" class="span4" type="hidden" style="text-align: center" disabled="disabled" />
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="span6 control-label" for="txtsecuencia">
                                                        Secuencia</label>
                                                    <input id="txtsecuencia" value="1" class="span4" type="text" style="text-align: center" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboOperacion">
                                                        Operación</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboOperacion" class="span12" data-placeholder="Operación"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="span12 control-label" for="txtSolicitante">
                                                        Solicitante</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtPIDM_Solicitante" type="hidden" />
                                                        <input id="txtSolicitante" class="span12" type="text" style="text-transform: uppercase" />
                                                        <input type="hidden" id="txtUsuaSolicitante" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <a id="btnVerEmpleado" class="btn tooltips blue" data-original-title="Ver información del empleado" onclick="if (vErrors('txtSolicitante')) {BuscarEmpleado($('#txtPIDM_Solicitante').val());}"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div class="span5">
                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtEmision">Emisión</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtEmision" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtTransaccion" style="text-align: right">Movimiento</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtTransaccion" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span3" style="display: none">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtTransaccion2" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="span12 control-label" id="lblrecepcionado" for="txtEntregar">
                                                        Receptor</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtPIDM_Entregar" type="hidden" />
                                                        <input id="txtEntregar" class="span12" type="text" style="text-transform: uppercase" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <a id="btnVerEmpleado2" class="btn tooltips blue" data-original-title="Ver información del empleado" data-toggle="hover" onclick="if (vErrorsNotIcon('txtEntregar')) { BuscarEmpleado($('#txtPIDM_Entregar').val()); }"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="cboMoneda">Moneda</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <select id="cboMoneda" class="span6" data-placeholder="Moneda"></select>
                                        </div>
                                    </div>
                                    <div class="span1 tipoventa hidden">
                                        <div class="control-group">
                                            <label class="control-label" for="cboTipoEnvio">Tipo de envío</label>
                                        </div>
                                    </div>
                                    <div class="span4 tipoventa hidden">
                                        <div class="control-group">
                                            <select id="cboTipoEnvio" class="span8" data-placeholder="Tipo de envío"></select>
                                        </div>
                                    </div>
                                </div>
                                 <div class="row-fluid">
                                    <div class="span1" id="lbl_TC" style="display: none">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_valor_cambio">
                                                Tipo Cambio</label>
                                        </div>
                                    </div>
                                    <div class="span1" id="input_valor_cambio" style="display: none">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" style="text-align:right;"/>
                                            </div>
                                        </div>
                                    </div>
                                     <div class="span1" id="lbl_fec_vig" style="display: none">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_vig">
                                                Fecha Vigencia</label>
                                        </div>
                                    </div>
                                    <div class="span2" id="input_fec_vig" style="display: none">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <style>
                                    #txtRazonSocial {
                                        text-transform: uppercase;
                                    }
                                </style>
                                <div class="row-fluid" id="fieldsetOrigen" style="display: block;">
                                    <div class="span12">
                                        <fieldset class="scheduler-border ">
                                            <legend class="scheduler-border " id="legend">Origen</legend>
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="row-fluid">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtRazonSocial">
                                                                    Nombre / Razón Social</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group" id="divTxtProveedor">
                                                                <div class="controls">
                                                                    <input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <a id="btn_ver_origen_destino" class="btn blue"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                                                    <a id="btnEditar" class="btn red" title="Editar"><i class="icon-pencil" style="line-height: initial"></i></a>
                                                                    <a id="btn_origen_destino" class="btn green" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                                    <a id="btnRecargarDestino" class="btn green" title="Recargar"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        

                                                       

                                                       <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtNroDcto" style="text-align: right">
                                                                    Documento
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <%--<label class="control-label span6" for="cboTipoDcto">Tipo Dcto.</label>--%>
                                                                <select id="cboTipoDcto" class="span12" disabled="disabled">
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtNroDcto" class="span9" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   







                                                    <div class="row-fluid" id="divES">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" id="lbldir" for="txtDireccionOrigen">
                                                                    Dirección Origen</label>

                                                            </div>
                                                        </div>
                                                        <div class="span5">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDireccionOrigen" class="span12" type="text" style="text-transform: uppercase" />

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <button type="button" id="btnDireccion" data-dismiss="modal" class="btn green">
                                                                        <i class="icon-plus"></i>
                                                                        Dirección de Sunat
                                                                    </button>
                                                                    <a id="btnRecargarDireccion" class="btn tooltips purple" data-original-title="Actualizar lista de Direcciones" data-trigger="hover" href="#"><i class="icon-refresh" style="line-height: initial"></i>&nbsp;</a>

                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    <div class="row-fluid" id="divEST">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" id="lblUrba" for="txtUrbanizacionDestino">
                                                                    Urbanización Origen</label>
                                                            </div>
                                                        </div>
                                                        <div class="span10" id="nodireccion">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtUrbanizacionDestino" class="span6" type="text" style="text-transform: uppercase" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="row-fluid hidden" id="divUbigeo">
                                                        <div class="span1">
                                                            <div class="control-group ">
                                                                <label style="text-align: right">País</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group ">
                                                                <div class="controls" id="pais">
                                                                    <select id="slcpais" class="span12 poner" data-placeholder="PAIS" disabled>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="span1">
                                                            <div class="control-group ">
                                                                <label style="text-align: right">Ubigeo</label>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group ">
                                                                <div class="controls">
                                                                    <input type="text" id="txtubigeo" class="span12" disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group ">
                                                                <div class="controls" id="departamento">
                                                                    <select id="slcdepa" class="span12 poner" data-placeholder="DEPARTAMENTO" disabled>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group ">
                                                                <div class="controls" id="provincia">
                                                                    <select id="slcprov" class="span12 poner" data-placeholder="PROVINCIA" disabled>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group ">
                                                                <div class="controls" id="distrito">
                                                                    <select id="slcdist" class="span12 poner" data-placeholder="DISTRITO" disabled>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <input type="hidden" id="txtCodubigeo" class="span1" disabled />
                                                    </div>

                                                    <div class="row-fluid hidden" id="divT">
                                                        <div class="span2" id="div_lblalmc_transf" style="display: block">
                                                            <div class="control-group">
                                                                <label id="lblalmc_transf" class="control-label" for="cboAlmacenTransferencia">Almacen Origen</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3" id="div_cboALmc_tranf" style="display: block">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cboAlmacenTransferencia" class="span12" data-placeholder="Almacen"></select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" id="Label1" for="txtDireccionTransferencia">Dirección Origen</label>
                                                            </div>
                                                        </div>
                                                        <div class="span4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDireccionTransferencia" class="span12" type="text">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="row-fluid" style="padding: 6px 0px"></div>
                                <div class="row-fluid">
                                    <div class="span7" id="prueba">
                                        <div class="row-fluid" id="div_doc_origen">
                                            <div class="span12">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cboOrigen">
                                                            Dcto. Origen<i onclick="fnVerDctoOrigen()" class="icon-external-link" title="ver Documento" style="font-size: 19px;float: right;line-height: 23px;"></i></label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cboOrigen" class="span12" data-placeholder="Documento Origen"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <label class="span2 control-label" for="txtNroDctoOrigen">
                                                                Nro</label>
                                                            <input id="txtSerieDctoOrigen_0" class="txtSerieDctoOrigen span4" type="text" disabled style="text-align: right" />
                                                            <input id="txtNroDctoOrigen_0" class="txtNroDctoOrigen span6" type="text" disabled />
                                                            <input id="txtCodigoDctoOrigen_0" class="txtCodigoDctoOrigen" type="hidden" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="btnOrigen">
                                                            <a id="btnBuscarDctoOrigen" class="btn blue" onclick="buscarDocumento(this)"><i class="icon-search" style="line-height: initial;"></i></a>
                                                            <a id="btnAgregarDctoOrigen" class="btn green"><i class="icon-plus" style="line-height: initial;"></i></a>
                                                            <a id="btnRecargarDctoOrigen" class="btn green" title="Recargar"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span5">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtGlosa">
                                                    Glosa</label>
                                            </div>
                                        </div>
                                        <div class="span9">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <textarea id="txtGlosa" class="span12"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid" id="div_doc_registro">
                                    <div class="span7">
                                        <div class="row-fluid" id="divRegistro">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboRegistro">
                                                        Dcto. Registro</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboRegistro" class="span12" data-placeholder="Documento Registro"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="txtdoc_ser" class="span4">
                                                <div class="control-group">
                                                    <label class="span2 control-label" for="txtNroDctoRegistro">Nro</label>
                                                    <input id="txtSerieDctoRegistro" class="span4" type="text" disabled style="text-align: right" />
                                                    <input id="txtNroDctoRegistro" class="span6" type="text" disabled />
                                                    <input type="hidden" id="txtLineasRegistro" />
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnVerificarSN" class="btn tooltips blue" data-original-title="Verificar Numero Serie de documento"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2 hidden" id="divElec">
                                                <div class="control-group">
                                                    <div class="controls" style="height: 30px;">
                                                        <label class="control-label" for="chkElectronico">
                                                            <input id="chkElectronico" type="checkbox" class="span12" style="opacity: 0;">
                                                            G. Electrónica
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid" id="divNuestraGuia" style="display: none;">
                                            <div class="span2"></div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls" style="height: 20px;">
                                                        <label class="control-label" for="chkNuestraGuia">
                                                            <input id="chkNuestraGuia" type="checkbox" class="span12" style="opacity: 0;">
                                                            Nuestra Guía
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboRegistroInterno">
                                                        Dcto. Interno de Registro</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboRegistroInterno" class="span12" data-placeholder="Doc. Registro Interno" disabled></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <label class="span2 control-label" for="txtSerieRegistroInterno">
                                                        Nro</label>
                                                    <input id="txtSerieRegistroInterno" class="span4" type="text" disabled style="text-align: right" />
                                                    <input id="txtNroRegistroInterno" class="span6" type="text" disabled />
                                                    <input type="hidden" id="txtLineasRegistroInterno" />
                                                </div>
                                            </div>
                                            <div class="span2 hidden" id="divElecInterno">
                                                <div class="control-group">
                                                    <div class="controls" style="height: 30px;">
                                                        <label class="control-label" for="chkElectronicoInterno">
                                                            <input id="chkElectronicoInterno" type="checkbox" class="span12" style="opacity: 0;">
                                                            F. Electrónico
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span5" id="advs">
                                        <p style="font-style: italic; color: blue; text-align: justify" class="span11">
                                            <span id="divAdvertencia" class="hidden">* La Numeración del Documento de Registro puede variar de acuerdo a los movimientos en simultáneo que se realicen en este almacén</span><br />
                                            ** La Numeración del Documento de Registro Interno puede variar de acuerdo a los movimientos en simultáneo que se realicen en este almacén
                                        </p>
                                    </div>
                                </div>
                                <div class="row-fluid" id="fieldsetTransporte" style="display: block;">
                                    <div class="span12">
                                        <fieldset class="scheduler-border ">
                                            <legend class="scheduler-border ">Transporte</legend>
                                            <div class="row-fluid">
                                                <div class="span16">
                                                    <div class="row-fluid">
                                                        <div class="span2">
                                                            <label class="radio">
                                                                <div class="radio" id="Div5">
                                                                    <span>
                                                                        <input type="radio" name="trans" style="opacity: 0;" id="rdPublico" value="PUB" checked />
                                                                    </span>
                                                                </div>
                                                                Transportista
                                                            </label>
                                                        </div>
                                                        <div class="span2" id="divRdPrivado">
                                                            <label class="radio">
                                                                <div class="radio">
                                                                    <span>
                                                                        <input type="radio" name="trans" style="opacity: 0;" value="PRI" id="rdPrivado" />
                                                                    </span>
                                                                </div>
                                                                Flota
                                                            </label>
                                                        </div>
                                                        <div class="span2">
                                                            <label class="radio">
                                                                <div class="radio" id="Div1">
                                                                    <span>
                                                                        <input type="radio" name="trans" style="opacity: 0;" value="OTR" id="rdOtro" />
                                                                    </span>
                                                                </div>
                                                                Otro
                                                            </label>
                                                        </div>
                                                        <div class="span1" id ="lblCosto">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtCostoTransporte">
                                                                    Costo Transporte (S/)</label>
                                                            </div>
                                                        </div>
                                                        <div class="span1" id="txtCostoTrans">
                                                            <div class="control-group">
                                                                <div class="controls" id="divTxtCostoTransporte">
                                                                        <input id="txtCostoTransporte" class="span12" type="text" style="text-transform: uppercase" placeholder="Flete" value="0.00"/>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div class="span4" id="ComIGV">
                                                            <p style="font-style: italic; color: blue; text-align: justify" class="span4">
                                                                <span id="divComunicado">*Valor incluye IGV y en soles</span>
                                                             </p>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <hr />
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtEmpresaTransporte">
                                                                    Transportista</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls" id="divTxtTransporte">
                                                                    <input id="txtPIDM_EmpresaTransporte" type="hidden" />
                                                                    <input id="txtEmpresaTransporte" class="span12" type="text" style="text-transform: uppercase" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls" id="divBtnTrans">
                                                                    <a id="btnVerEmpresaTransporte" class="btn blue"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                                                    <a id="btnNuevaEmpresaTransporte" class="btn green" href="?f=nrmgetr" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                                    <a id="btnRefrescaEmpresaTransporte" class="btn purple"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label span6" for="cbotipoDoctrans">Tipo Dcto.</label>
                                                                <select id="cbotipoDoctrans" class="span6" disabled="disabled">
                                                                    <option></option>
                                                                    <option value="6">RUC</option>
                                                                    <option value="1">DNI</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtNroDcto" style="text-align: right">N° Dcto.</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtnumdocemptrans" class="span9" type="text" disabled="disabled" onkeypress="return ValidaNumeros(event,this)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid" id="divDireccionTransportista" style="display: none; padding-bottom: 8px">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtDireccionTransportista">Dirección del Transportista</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="txtDireccionTransportista" class="span12" disabled="disabled"></select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div id="divVehiculoFlota">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txtDireccionOrigen">Vehículo, Marca y Placa</label>
                                                                </div>
                                                            </div>
                                                            <div class="span3">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtvehiculo" class="span12" type="text" style="text-transform: uppercase" />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="divDatosFact">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txtDireccionOrigen">Vehículo, Marca y Placa</label>
                                                                </div>
                                                            </div>
                                                            <div class="span3">
                                                                <div class="control-group">
                                                                    <div class="controls" id="divTxtVehiculo">
                                                                        <input id="txtVehiculoFact" class="span12" type="text" style="text-transform: uppercase" placeholder="Desc. Vehiculo" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtMarca" class="span12" type="text" style="text-transform: uppercase" placeholder="Marca" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtPlaca" class="span12" type="text" style="text-transform: uppercase" placeholder="Placa" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtCertificadoInscripcion">
                                                                    Certificado Inscripción N°</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtCertificadoInscripcion" class="span12" type="text" style="text-transform: uppercase" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1 nrovuel">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtNroVueltas">
                                                                    N° Vueltas</label>
                                                            </div>
                                                        </div>
                                                        <div class="span1 nrovuel">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtNroVueltas" value="1" class="span12" type="number" max="4" min="1" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtchofer">Chofer</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls" id="divTxtChofer">
                                                                    <input id="txtchofer" class="span12" type="text" style="text-transform: uppercase" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtLicConducir">
                                                                    Licencia Conducir N°</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtLicConducir" class="span12" type="text" style="text-transform: uppercase" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </div>
                                </div>

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                            <!-- FIN DE GENERALES-->

                            <!-- INICIO DEL TAB DETALLE MOV-->
                            <div class="tab-pane" id="detallemov">
                                <div id="detallemov_datos">
                                    <div class="row-fluid" id="fila_2" style="display: block;">
                                        <div class="span12">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtPROD_CODE">
                                                                Código</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls" id="input_cod_prod">
                                                                <input id="hfDCTO_ORGN" type="hidden" />
                                                                <input id="txtPROD_CODE" class="span11" type="text" style="text-transform: uppercase" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtPROD_DESC">
                                                                Descripción Producto</label>
                                                        </div>
                                                    </div>
                                                    <div class="span5">
                                                        <div class="control-group">
                                                            <div class="controls" id="input_prod">
                                                                <input id="txtPROD_DESC" class="span12" type="text" data-provide="typeahead" style="text-transform: uppercase" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <a id="btnVerProducto" class="btn tooltips blue" data-original-title="Ver información del Producto" data-trigger="hover"><i class="icon-eye-open" style="line-height: initial"></i></a>
                                                                <a id="btnRefrescarProductos" class="btn tooltips purple" data-original-title="Actualizar lista de Productos" data-trigger="hover" href="#"><i class="icon-refresh" style="line-height: initial"></i></a>
                                                                <a id="btn_new_prod" class="btn tooltips green" data-original-title="Crear Producto" data-trigger="hover" href="?f=nmmprod" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                                <input id="txtcant" class="span12" type="text" onkeypress="return ValidaDecimales(event,this,2)" />
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
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <label class="control-label span4" for="txtPU" style="text-align: right">Costo Unit.</label>
                                                                <input id="txtPU" class="span7 pull-right" type="text" placeholder="0.00" onkeyup="this.value=solonumbef(this.value)" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input type="hidden" id="hfMONTO" />
                                                                <label class="control-label span4" for="txtPU" style="text-align: right">Monto</label>
                                                                <input id="txtmonto" class="span7 pull-right" type="text" placeholder="0.00" onkeypress="return ValidaDecimales(event,this)" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2" style="height: 50px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 30px;">
                                                                <label class="control-label" for="chkincluyeIGV" style="text-align: center">
                                                                    <input id="chkincluyeIGV" type="checkbox" class="span12" style="opacity: 0;">
                                                                    Incluye IGV
                                                                </label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input id="txtPrecioUnitInicio" class="span12" type="hidden" onkeypress=" return ValidaDecimales(event,this,2)" />
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <label class="control-label span4" for="txtStock">Stock</label>
                                                                <input id="txtStock" class="span6" type="text" disabled />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid" id="fila_4" style="display: block;">
                                        <div class="sapn12">
                                            <div class="row-fluid">
                                                <div class="span12">

                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtgarantia">
                                                                Garantía</label>
                                                        </div>
                                                    </div>
                                                    <div class="span1" style="height: 50px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 30px;">
                                                                <label class="control-label" for="txtgarantia">
                                                                    <input id="txt_garantia" class="span5" type="text" value="0" />
                                                                     meses
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <label class="control-label span4" for="txtKU" style="text-align: left">Peso U.(Kg)</label>
                                                                <input id="txtKU" class="span8 pull-right" type="text" placeholder="0.00"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="span2" style="height: 100px;">
                                                        <div class="control-group">
                                                            <div class="controls" style="height: 50px;">
                                                                <label class="control-label" for="chk_desde_compra">
                                                                    <input id="chk_desde_compra" type="checkbox" class="span6" style="opacity: 0;">
                                                                    Desde Compra
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtCentroCostos" >Centro de Costos</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls" id="input_centro_costo">
                                                                <input id="txtCentroCostos" class="span12 centroCostos" type="text" style="text-transform: uppercase" disabled="disabled" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                              <!--<button id="btnRefrescarCC" type="button" class="btn purple"><i class="icon-refresh" style="line-height: initial"></i></button>
                                                                <a id="btn_new_cc" class="btn green" href="?f=ncmcecc" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                                                <a id="btnBuscarCentroCto" class="btn green"><i class="icon-plus" style="line-height: initial"></i></a>-->
                                                                <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                                                <%--<input type="button" id="btnBuscarCentroCto" class="btn green" value="..."/>--%>
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
                                                                    <option></option>
                                                                    <option value="C" class="optLND">CORRELATIVO</option>
                                                                    <option value="S" class="optLND">NO SECUENCIAL</option>
                                                                    <option value="L" id="optLD" disabled="disabled">LISTA DETALLADA</option>
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
                                </div>
                                <div class="row-fluid" id="fila_6" style="display: block;">
                                    <div class="span12">
                                        <div class="span6">
                                            <a class="btn blue hidden" id="btnVerDetallesOrigen"><i class="icon-list" style="line-height: initial;"></i>&nbsp;Obtener detalles de Documento de Origen</a>
                                            <a class="btn blue hidden" id="btnVerDetallesOrigen_2" href="javascript:MostrarDetallesOrigen()" title="Mostrar Detalles de Documentos de Origen"><i class="icon-book" style="line-height: initial;"></i>&nbsp;</a>
                                        </div>
                                        <div class="span6" id="div_aceptar">
                                            <a class="btn pull-right" href="javascript: $('#txtPROD_CODE').val('').keyup(); $('#txtcant, #txtPU, #txtmonto').val(''); $('#div_txt_serie_sec').css('display', 'none')" style="margin-left: 5px"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                            <a id="btnAgregarProducto" class="btn blue pull-right" href="javascript:grabarDetalle();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid" id="fila_7">
                                    <div class="span12">
                                        <hr class="span12" style="min-height: 10px; margin: 20px 0px 5px 0px" />
                                    </div>
                                </div>
                                <div class="row-fluid" id="fila_8">
                                    <div class="span12">
                                            <button type="button" id="btnRecargarTabla" class="btn blue pull-right"><i class="icon-update"></i>&nbsp;Actualizar tabla</button>
                                            <button type="button" id="btnEliminarDetalles" class="btn red pull-right" disabled=""><i class="icon-trash"></i>&nbsp;Eliminar</button><br>
                                            <br>
                                            <br>
                                        </div>
                                    
                                </div>
                                <div class="row-fluid hidden" style="margin-bottom: 5px;">
                                    <div class="span2">
                                        <a class="btn blue " id="btnVerDetallesOrigen_3" href="javascript:MostrarDetallesOrigen()" title="Mostrar Detalles de Documentos de Origen"><i class="icon-book" style="line-height: initial;"></i>&nbsp;</a>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12" id="div_tabla_det">
                                        <table id="tabla_det" class="table" border="0">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input type="checkbox" id="chkTodos"></th>
                                                    <th>ITEM</th>
                                                    <th>CODIGO</th>
                                                    <th style="text-align: left">PRODUCTOS</th>
                                                    <th style="text-align: center">SERIE</th>
                                                    <th>CENTRO COSTOS</th>
                                                    <th>GARNT</th>
                                                    <th style="text-align: right">CANT</th>
                                                    <th>UNIDAD MEDIDA</th>
                                                    <th style="text-align: right">PESO U. (Kg.)</th>
                                                    <th style="text-align: right">PESO TOTAL (Kg.)</th>
                                                    <th style="text-align: right">COSTO U. (S/.)</th>
                                                    <th style="text-align: right">COSTO U. C/FLETE (S/.)</th>
                                                    <th style="text-align: right">TOTAL (S/.)</th>
                                                    <th style="text-align: right">COSTO U. (US$)</th>
                                                    <th style="text-align: right">TOTAL (US$)</th>                                                    
                                                    <th>INC IGV</th> 
                                                    <th>TIPO</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                                <div id="btnCompletar" class="form-actions">
                                    <a class="btn green" href="javascript:CompletarDcto();" style="display: none"><i class="icon-ok-sign"></i>&nbsp;Completar</a>
                                    <a id="btnImprimirGuia" class="btn black" style="display: none"><i class="icon-print"></i>&nbsp;Imprimir Guia</a>
                                    <%--<a id="btnImprimirGuia" class="btn black" href="javascript:ImprimirGuiaRemisionElectonica();" style="display: none"><i class="icon-print"></i>&nbsp;Imprimir Guia</a>--%>
                                    <p style="font-style: italic; color: blue; float: right" id="p_info">* Doble clic para modificar serie, centro de costos o cantidad.</p><br><br>
                                    <p style="font-style: italic; color: blue; float: right; display:none" id="p_info2">* Los valores que se muestran son los costos de KARDEX.</p>
                                </div>

                                <div class="row-fluid" >          
                                    <div id="divValorizadoTotal" style="display: none;" >
                                        <div class="span2 offset1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="left" style="font-size: 1.2em; font-weight: 600; "><strong>COSTO TOTAL (S/):</strong></label>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="left" id="lblValorizadoTotal" style="font-size: 1.5em; font-weight: 600; color:blue; "></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span2 offset1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="left" style="font-size: 1.2em; font-weight: 600; "><strong> PESO TOTAL (Kg):</strong></label>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="left" id="lblPesoTotal" style="font-size: 1.5em; font-weight: 600; color:blue; "></label>
                                                </div>
                                            </div>
                                        </div>

                                        <%--<div class="span2 " id="SinIGV">
                                            <p style="font-style: italic; color: blue; text-align: justify" class="span">
                                                <label class="left" style="font-size: 1.1em; font-weight: 500;">*Los valores no incluyen IGV</label>
                                            </p>
                                        </div>--%>
                                    </div>
                                </div>
                            </div>
                            <!-- FIN DE TAB DETALLE MOV-->

                            <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                            <div class="tab-pane" id="asientos_contables">
                                                                                                  
                            </div>
                            <!-- FIN DE ASUENTOS CONTABLES-->




                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div style="display: none" id="divContenido">
    <div class="row-fluid">
        <div class="span12">
            <h5 id="desc_operacion"></h5>
        </div>
    </div>
    <div class="row-fluid">
        <div class="span8">
            <h6><strong>EMISION:&nbsp;</strong><span id="fecha_emision"></span>&nbsp;&nbsp;&nbsp;<strong>TRANSACCION:&nbsp;</strong><span id="fecha_transaccion"></span></h6>
            <h6><strong>SOLICITANTE:&nbsp;</strong><span id="solicitante"></span></h6>
            <h6><strong>RECEPTOR:&nbsp;</strong><span id="receptor"></span></h6>
            <h6><strong id="origen_destino_label"></strong><span id="origen_destino_nombre"></span><strong id="tipo_dcto"></strong><span id="nro_dcto"></span></h6>
            <h6><strong>DOC. REGISTRO:&nbsp;</strong><span id="dcto_registro"></span></h6>
            <h6><strong>GLOSA:&nbsp;</strong><span id="glosa"></span></h6>
        </div>
        <div class="span4">
            <table class="table table-bordered">
                <tr>
                    <td>
                        <h4 style="text-align: center" id="nombre_dcto_reg_interno"></h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 style="text-align: center" id="nro_dcto_reg_interno"></h5>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="row-fluid">
        <div class="span12">
            <table class="table table-bordered" id="tblImpresion">
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>CODIGO</th>
                        <th style="text-align: left">PRODUCTO</th>
                        <th style="text-align: center">SERIE</th>
                        <th>CENTRO COSTOS</th>
                        <th>GARNT</th>
                        <th style="text-align: right">CANT</th>
                        <th>UNIDAD MEDIDA</th>
                        <th>P.U Kg.</th>
                        <th>P.U TOTAL Kg.</th>
                        <th style="text-align: right">C.U. S/.</th>
                        <th style="text-align: right">C.U. C/FLETE S/.</th>
                        <th style="text-align: right">TOTAL S/.</th>
                        <th style="text-align: right">C.U. US$</th>
                        <th style="text-align: right">TOTAL US$</th>
                        <th>INC IGV</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="left: 15%; width: 70%;" aria-hidden="true">
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
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">NRO DOCUMENTO</th>
                            <th style="text-align: center">A NOMBRE DE</th>
                            <th style="text-align: center">MONEDA</th>
                            <th style="text-align: center">MONTO TOTAL</th>
                            <th style="text-align: center">F. EMISIÓN</th>
                            <th style="text-align: center">COMPLETADO</th>
                            <th style="text-align: center">ORIGEN</th>
                            <th style="text-align: center">DESTINO</th>
                            <th style="text-align: center">ALMACÉN ORIGEN</th>
                            <th style="text-align: center">ALMACÉN DESTINO</th>
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
<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 80%; left: 10%" aria-hidden="true">
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
                                <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
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
                        <h4 id="lblEmpresa"></h4>
                        <h5 id="lblAsunto"></h5>
                        <h6><strong>EMISION:</strong>&nbsp;<span id="lblEmision"></span>&nbsp;&nbsp;&nbsp;<strong>MOVIMIENTO:</strong>&nbsp;<span id="lblTransaccion"></span></h6>
                        <h6><strong>SOLICITANTE:</strong>&nbsp;<span id="lblSolicitante"></span>&nbsp;&nbsp;&nbsp;<strong>RECEPTOR:</strong>&nbsp;<span id="lblReceptor"></span></h6>
                        <h6><strong id="lblAux"></strong><span id="lblRazSocial"></span>&nbsp;&nbsp;&nbsp;<strong id="lblTipoDoc"></strong>&nbsp;<span id="lblNumDoc"></span></h6>
                        <h6><strong>DOC. REGISTRO:</strong>&nbsp;<span id="lblDocRegistro"></span></h6>
                        <h6><strong>GLOSA:</strong>&nbsp;<span id="lblGlosa"></span></h6>
                        <div class="row-fluid">
                            <div class="span12" id="lblTablaHtml"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>
<!-- MODAL PARA DEMORA DE CONSULTA SUNAT-->
<div id="modal-confirmar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-search" style="line-height: initial;"></i>&nbsp;Consulta de Datos a SUNAT</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p>La consulta está siendo procesada...</p>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span4 offset2">
                    <a id="btnEsperar" class="btn blue"><i class="icon-check"></i>&nbsp;Esperar</a>
                </div>
                <div class="span4">
                    <a id="btnNoEsperar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal para detalles de origen-->
<div id="modalDetallesOrigen" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 80%; left: 10%" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-search" style="line-height: initial;"></i>&nbsp;Detalles de Documentos de Origen</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divTblDetallesOrigen">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <%--<button class="btn green" type="button" onclick="enviarCorreo()" id="Button1"><i class="icon-plane"></i>&nbsp;Enviar</button>--%>
    </div>
</div>

<div id="impr_guias" data-backdrop="static" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-search" style="line-height: initial;"></i>&nbsp;Imprimir guias de remision</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <%-- <div class="span10 offset1">
                <p>Numero de Guias de Remision por Imprimir</p>
            </div>--%>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span12" id="dvimprguias">
                    <table id="tblImprGuias" class="table" border="0">
                        <thead>
                            <tr style="background-color: #D2DEF5;">
                                <th>GUIA</th>
                                <th>NRO ITEMS</th>
                                <th style="display: none;">INDICE INICIO</th>
                                <th style="display: none;">INDICE INICIO</th>
                                <th style="text-align: left;">ACCION</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL PARA DOCS ORIGEN GARANTIAS -->
<div id="divDocGar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" id="lbl_titulo" style="font-weight: bold;">Documento</label>
                        <div class="controls">
                            <input class="span4" type="text" id="t_serie" placeholder="Serie" style="text-align: right;" onkeypress="return ValidaDecimales(event,this,2)">
                            <input class="span8" type="text" id="t_numero" placeholder="Número" style="text-align: right;" onkeypress="return ValidaDecimales(event,this,2)">
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">BUSCAR&nbsp;<i class="icon-search"></i></a>
                </div>
            </div>

        </div>
        <div class="row-fluid">
            <div class="span12" id="div2">

                <table id="Tbl_Docs_Gar" class="display table">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">NRO DOCUMENTO</th>
                            <th style="text-align: center">A NOMBRE DE</th>
                            <th style="text-align: center">MONTO TOTAL</th>
                        </tr>
                    </thead>

                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>
<!-- CAMPOS PARA CREAR QR -->
<div id="codigoQR" style="display: none"></div>  
<div id="divDctoImprimir" style="display: none;"></div>

<input id="hfCOSTO_CON_FLETE" type="hidden" value="0.00" />
<input id="hfPESO_TOTAL" type="hidden" value="0.00" />

<input id="hfSIN_DESTINO" type="hidden" value="NO" />
<input id="hfSIN_TRANSPORTE" type="hidden" value="NO" />

<input id="hfPIDM" type="hidden" />
<input id="txtDIRECCION" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfOTROS" type="hidden" />

<input id="hfDETRACCION" type="hidden" />
<input id="hfDNI_EMPTRANS" type="hidden" />
<input id="hfRUC_EMPTRANS" type="hidden" />
<input id="hfLIC_CONDUC" type="hidden" />
<input id="hfCOD_DCTO_ALMC" type="hidden" />
<input id="hfCOD_PROD" type="hidden" />
<input id="hfCOSTO_PROD" type="hidden" />
<input id="hfDESC_PROD" type="hidden" />
<input id="hfSERIE_PROD" type="hidden" />
<input id="hfNumDocOrigen" type="hidden" />
<input id="hfTIPO_INSERT" type="hidden" />
<input id="hfCENTRO_COSTOS" type="hidden" />
<input id="hfCECC_CODE" type="hidden" />
<input id="hfTIPO_APLI_VALORES" type="hidden" />
<input id="hfCOD_AUT" type="hidden" />
<input id="hfCOD_AUT_INTERNO" type="hidden" />
<input id="hfCodigoNaminsa" type="hidden" />
<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="../vistas/NA/js/NAMINSA.js"></script>
<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMINSA.init();
    });
</script>
