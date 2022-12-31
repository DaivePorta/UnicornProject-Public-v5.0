<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMDOCS.ascx.vb" Inherits="vistas_NV_NVMDOCS" %>
<style type="text/css">
    #divMail, #divBuscarDoc, #divWhatsapp, #divBuscarDocOS, #_buscarDocumento, #divLetras, #divAnticipos,#mapaModal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divMail, #divBuscarDoc, #divWhatsapp, #divBuscarDocOS, #_buscarDocumento, #divLetras, #divAnticipos,#mapaModal {
            left: 5% !important;
            width: 90% !important;
        }
    }

    #txtPrecioUnitario, #txt_cantidad, #txtStockReal {
        text-align: right;
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

    .input1 {
        min-width: 25px;
        max-width: 40px;
    }

    .input2 {
        min-width: 25px;
        max-width: 70px;
        text-align: center;
    }

    .inputNombre {
        resize: vertical;
        max-width: 150px;
        overflow: hidden;
        height: auto;
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
<div class="row-fluid">
    <asp:HiddenField ID="CodDoc" runat="server" />
    <asp:HiddenField ID="Desca" runat="server" />
</div>

<div class="row-fluid" id="contenedor">
    <%--<asp:HiddenField ID="hdfMontoMuestra" runat="server" />--%>
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DOCUMENTO VENTA SERVICIOS</h4>
                <div class="actions">
                    <a class="btn red hidden" id="btnPdfAlt"><i class="icon-book" ></i>&nbsp;Descargar PDF</a>
                    <a class="btn green hidden" id="btnWhatsapp"><i class="icon-phone"></i>&nbsp;Whatsapp</a>
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black btnImprimir" href="javascript:ImprimirDctoVenta();"; style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" onclick="javascript:NuevaVenta();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nvldocs"><i class="icon-list"></i>&nbsp;Listar</a>
                    <asp:Button class="btn red hidden" ID="btnDescPDF" runat="server" OnClick="btnPdf_Click" UseSubmitBehavior="False"/>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">

                        <!-- TITULO DE LOS TABS-->
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabDetalleComp" href="#detalle_compra" data-toggle="tab"><i class=""></i>Totales</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>

                        <div class="tab-content">
                            <!-- INICIO DEL TAB GENERALES-->
                            <div class="tab-pane active" id="datos_generales">
                                <div class="row-fluid">
                                    <!--GENERALES Y DETALLE DE VENTA -->
                                    <div class="span8">
                                        <!-- Generales -->
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumDctoComp">
                                                        N°
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumDctoComp" class="span12" disabled="disabled" type="text" placeholder="Generado" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumSec">
                                                        Secuencia</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumSec" class="span12" disabled="disabled" type="text" value="1" style="text-align: center" />
                                                    </div>
                                                </div>
                                            </div>
                                            <%--<div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumSec">
                                                        Nro. Atención</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumAt" class="span12" disabled="disabled" placeholder="Nro. Atención" type="text" style="text-align: center" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group span12">
                                                    <div class="controls pull-right">
                                                        <%--<a id="btnNroAtencion"  onclick="AtencionesPendientes();" title="Atenciones Pendientes" class="btn black" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>--%>
                                                        <%--<button type="button" class="btn blue"  title="Atenciones Pendientes" id="btnNroAtencion"><i class="icon-search" style="margin-bottom: 2px;"></i></button>--%>
                                                        <%--<a id="btnRecargar" title="Recargar" class="btn green" style="margin-bottom: 2px;"><i class="icon-refresh"></i></a>--%>
                                                   <%-- </div>
                                                </div>
                                            </div>--%>
                                            <div class="span6 offset1" id="divIndicadores" style="display: none;">
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <label class="control-label" for="chkCompleto">
                                                            <input type="checkbox" id="chkCompleto" name="chkCompleto" disabled="disabled" />
                                                            Completo</label>
                                                    </div>
                                                </div>
                                                <div class="span4 ">
                                                    <div class="control-group">
                                                        <label class="control-label" for="chkAnulado">
                                                            <input type="checkbox" id="chkAnulado" name="chkAnulado" disabled="disabled" />
                                                            Anulado</label>
                                                    </div>
                                                </div>
                                                <div class="span4 ">
                                                    <div class="control-group">
                                                        <label class="control-label" for="chkProvisionado">
                                                            <input type="checkbox" id="chkProvisionado" name="chkProvisionado" disabled="disabled" />
                                                            Provisionado</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span12" style="margin-left: 0">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_Empresa">
                                                        Empresa</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_Sucursal">
                                                        Establecimiento</label>
                                                </div>
                                                <div class="span12" style="margin-top: -15px;">
                                                    <small id="lblExonerado" style="color: gray"></small>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cbo_Sucursal" class="span12" data-placeholder="Establecimiento">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span12" style="margin-left: 0" id="divFilaCliente2">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtClientes">Cliente Ref.</label>
                                                </div>
                                            </div>
                                            <div class="span11">
                                                <div class="control-group span12">
                                                    <div class="controls" id="divTxtClienteSisnot">
                                                        <input id="txtClienteReferencial" class="span12" type="text" disabled="disabled" placeholder="Cliente Referencial" style="text-transform: uppercase" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span12" style="margin-left: 0" id="divFilaCliente">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtClientes">Cliente</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls" id="divCboTipoDoc">
                                                        <select id="cboTipoDoc" class="span4" data-placeholder="Tipo Dcto.">
                                                            <option value="6">RUC</option>
                                                        </select>
                                                        <input id="txtNroDctoCliente" class="span8" type="text" placeholder="Nro. " style="text-align: center; margin-left: 2px;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group span12">
                                                    <div class="controls" id="divTxtClientes">
                                                        <input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group span12">
                                                    <div class="controls pull-right">
                                                        <a id="btnverempl" class="btn blue" onclick="" style="margin-bottom: 2px;"><i class="icon-eye-open" style="margin-left: -2px;"></i></a>
                                                   <!-- <a id="btnNuevaPersona"  onclick="NuevoCliente();" href="?f=NKMGECL" target="_blank" class="btn green" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>-->
                                                        <a id="btnNuevaPersona" onclick="NuevoCliente();" title="Nuevo Cliente" class="btn black" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>
                                                        <a id="btnRecargarPersona" class="btn green" style="margin-bottom: 2px;"><i class="icon-refresh"></i></a>
                                                        <a id="btnNuevoClienteRapido" onclick="NuevoClienteRapido();" title="Nuevo Cliente Rápido" class="btn red" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                         <div>
                                            <div class="span1" style="margin-top: -20px;"></div>
                                             <div class="span8" style="margin-top: -20px;">
                                                    <small id="lblHabido" style="color: gray"></small>
                                                    <small style="color: gray">&nbsp;&nbsp;&nbsp;&nbsp;</small>
                                                    <small id="lblEstado" style="color: gray"></small>
                                             </div>
                                        </div>

                                        <div class="span12" style="margin-left: 0" id="div_direccion">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_direccion">
                                                        Dirección</label>
                                                </div>
                                            </div>
                                            <div class="span7">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cbo_direccion" class="span12" data-placeholder="Direccion">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <button type="button" id="btn_act_direccion" class="btn green" title="Recargar Direcciones" style="height: 27px;">
                                                            <i class="icon-refresh"></i>
                                                        </button>
                                                        <button type="button" onclick="javascript:MostrarMapa($($(this).parents('[id*=direccion]')[0]).attr('id'));" data-dismiss="modal" class="btn red" style="height: 27px;">
                                                            <i class="icon-map-marker"></i>
                                                        </button>
                                                        <button type="button" id="btnHabido" class="btn orange" style="height: 27px; padding: 0px 5px; font-size: 11px; display:none;">
                                                            ¿Habido?
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span12" style="margin-left: 0">

                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboVendedor">
                                                        Abogado</label>
                                                </div>
                                            </div>
                                            <div class="span7">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboVendedor" class="span12" data-placeholder="Abogado">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_fec_emision">
                                                        Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_emision" data-date-format="dd/mm/yyyy" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="span12" style="margin-left: 0">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboDocumentoVenta">
                                                        Documento</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <select id="cboDocumentoVenta" class="span12" data-placeholder="Doc. Venta" disabled="disabled">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="span4 ">
                                                <div class="span12">
                                                    <div class="control-group span12">
                                                        <div class="controls">
                                                            <select id="cboSerieDocVenta" class="span4" data-placeholder="Serie" disabled="disabled">
                                                                <option></option>
                                                            </select>
                                                            <input class="numeros span8" id="txtNroDocVenta" type="text" disabled="disabled" style="text-align: center; margin-left: 2px;" placeholder="Nro." />
                                                        </div>
                                                    </div>
                                                    <div class="span12" style="margin-top: -20px;">
                                                        <small id="lblTipoCorrelativo" style="color: gray"></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_fec_transaccion">
                                                        Transacción
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_transaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span12" style="margin-left: 0" id="documentosadd">
                                            <div class="span12" id="div_mas_dctoreg_0" style="margin-left: 0">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cboDctoOrigen">
                                                            Doc. Origen</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cboDctoOrigen" class="span12" data-placeholder="Doc. Origen">
                                                                <option value="XXXX">ATENCIONES</option>
                                                                <option value="">NINGUNO</option>
                                                                <option value="0027">O/C CLIENTE</option>
                                                                <option value="0053">COTIZACIÓN CLIENTE</option>
                                                                <%--<option value="0050">GUIA SALIDA</option>
                                                                <option value="0009">REMISION REMITENTE</option>--%>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1" id="NroDocs">
                                                    <div class="control-group">
                                                        <label class="span12 control-label" for="txt_num_ser_orig_0">
                                                            Nro</label>
                                                    </div>
                                                </div>
                                                <div class="span3" id="txtDocs">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtCodDctoOrigen_1" class="txtCodDctoOrigen inputOrigen" type="hidden" />
                                                            <input id="txtSerieDctoOrigen_1" class="txtSerieDctoOrigen inputOrigen numeros span4" type="text" disabled style="text-align: center" />
                                                            <input id="txtNroDctoOrigen_1" class="txtNroDctoOrigen inputOrigen numeros span8" type="text" disabled style="text-align: center; margin-left: -2px;" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span3" id="btnsDocs">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <a id="btnBuscarDctoOrigen" onclick='BuscarDocumentoOrigen(this)' class="btn blue buscar"><i class="icon-search" style="line-height: initial;"></i></a>
                                                            <a id="btnAgregarDivOrigen" class="btn blue add"><i class="icon-plus" style="line-height: initial;"></i></a>
                                                            <a id="btnRemoverDivOrigen" class="btn red remove" onclick="EliminarDatosDocumentoOrigen('','first')"><i class='icon-minus' style='line-height: initial;'></i></a>
                                                            <%--<a><span id="info_btnf"><i style="color: #888; cursor: help; font-size: 18px; vertical-align: middle; margin: 5px;" class="icon-info-sign"></i></span></a>--%>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span12" style="margin-left: 0">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_comentario">
                                                        Glosa</label>
                                                </div>
                                            </div>
                                            <div class="span11">
                                                <div class="control-group">
                                                    <textarea id="txt_comentario" class="span12" rows="1" style="resize: vertical; max-height: 110px;" maxlength="200"></textarea>
                                                </div>
                                            </div>


                                        </div>

                                        <!-- Detalle de Venta -->
                                        <div class="portlet box" style="border: 1px solid #ccc;">
                                            <div class="portlet-title" style="background-color: black;">
                                                <h4><i class="icon-tag"></i>DETALLES DE VENTA</h4>
                                            </div>
                                            <div class="portlet-body">

                                                <div class="row-fluid" id="form_add_prod">

                                                    <div class="row-fluid">

                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="cbo_moneda">
                                                                    Moneda</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3" id="divCboMoneda">
                                                            <div class="control-group">
                                                                <div class="controls" id="input_moneda">
                                                                    <select id="cbo_moneda" class="span12" data-placeholder="Moneda">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2" id="lbl_TC">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_valor_cambio">
                                                                    T/C Interno</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2" id="input_valor_cambio">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1" id="lbl_fec_vig">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_fec_vig">
                                                                    Fec. Vig</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2" id="input_fec_vig">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig" data-date-format="dd/mm/yyyy" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span2 offset4" id="lbl_TC_Oficial">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_valor_cambio_Oficial">
                                                                    T/C Oficial</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2" id="input_valor_cambio_Oficial">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_valor_cambio_Oficial" class="span12" disabled="disabled" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1" id="lbl_fec_vig_Oficial">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_fec_vig_Oficial">
                                                                    Fec. Vig</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2" id="input_fec_vig_Oficial">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker" disabled="disabled" placeholder="dd/mm/yyyy" id="txt_fec_vig_Oficial" data-date-format="dd/mm/yyyy" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid" style="display: none;">
                                                        <div class="span6 offset1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="chkDespachoVenta">
                                                                    <input type="checkbox" id="chkDespachoVenta" name="chkDespachoVenta" />
                                                                    Despacho en Venta</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="divAgregarProducto">
                                                        <%--<div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="cboAlmacen">
                                                                    Almacén</label>
                                                            </div>
                                                        </div>
                                                        <div class="span3" id="divCboAlmacen">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cboAlmacen" class="span12" data-placeholder="Almacén">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>--%>
                                                        <input id="txtUbigeoOrigen" class="span2" type="hidden" style="text-align: center" disabled="disabled" />
                                                        <input id="txtDirecOrigen" class="span4" type="hidden" style="text-align: center" disabled="disabled" />
                                                        <input id="txtUrbOrigen" class="span4" type="hidden" style="text-align: center" disabled="disabled" />
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span1">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_cod_a_producto">
                                                                            Servicio</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls" id="input_cod_prod">
                                                                            <input id="txt_cod_producto" disabled="disabled" class="span6" type="text" />
                                                                            <input id="txt_cod_a_producto" class="span6" type="text" style="margin-left: -2px;" placeholder="Código" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span7">
                                                                    <div class="control-group">
                                                                        <div class="controls" id="input_desc_prod">
                                                                            <input id="txt_desc_producto" class="span12" type="text" placeholder="Descripción de Servicio" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span1">
                                                                    <div class="control-group">
                                                                        <div class="controls" style="/*margin-top: -8px; */">
                                                                            <a id="btnActualizarProductos" class="btn green" style="max-width: 12px; margin-bottom: 2px;" title="Recargar Servicios"><i class="icon-refresh"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span1">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_cantidad">
                                                                        Cantidad</label>
                                                                </div>
                                                            </div>
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txt_cantidad" onkeyup="ValidaPrecioCantidad();" onkeypress="return ValidaDecimales(event,this,2)" class="numeros span12" type="text" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span1" style="display: none;">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cbo_und_medida" style="text-align: right">
                                                                        Und. Medida</label>
                                                                </div>
                                                            </div>
                                                            <div class="span2" style="display: none;">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <select id="cbo_und_medida" class="span12" data-placeholder="Und. Medida">
                                                                            <option value ="0007">UNIDADES</option>
                                                                            <option value ="0738">HORAS</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span1" style="display: none;">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_descuento_det" style="text-align: right">Descuento</label>
                                                                </div>
                                                            </div>
                                                            <div class="span2" style="display: none;">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txt_descuento_det" value="0.00" class="span12" type="text" style="text-align: right" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span1" style="display: none;">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txtPrecioUnitario" style="text-align: right">
                                                                        Stock Disponible</label>
                                                                </div>
                                                            </div>
                                                            <div class="span2" style="display: none;">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtStockReal" class="span12" type="text" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                                <input type="hidden" id="hfCostoProducto" name="hfCostoProducto" value="0" />
                                                            </div>
                                                            <div class="span1">
                                                                <label class="control-label" for="txtStockReal">
                                                                    P.U.</label>
                                                            </div>
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <div class="controls" id="divPrecioUnitario">
                                                                        <input id="txtPrecioUnitario" class="span12" type="text" onkeypress=" return ValidaDecimales(event,this,5)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span1">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_glosa">
                                                                        Glosa</label>
                                                                </div>
                                                            </div>
                                                            <div class="span5">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <textarea id="txt_glosa_det" class="span12" maxlength="500" style="resize: vertical; max-height: 120px;"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <!-- QUITAR LUEGO  -->
                                                        <div class="row-fluid" style="display: none;">

                                                            <div class="span6"></div>
                                                            <div class="span3" id="lbl_chk_muestra">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="chkMuestra" style="text-align: right;">
                                                                        <input type="checkbox" id="chkMuestra" name="chkMuestra" />
                                                                        Muestra</label>
                                                                </div>
                                                            </div>
                                                            <div class="span3" id="lbl_chk_boni">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="chkBonificacion">
                                                                        <input type="checkbox" id="chkBonificacion" name="chkBonificacion" />
                                                                        Producto Bonificación</label>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <!-- QUITAR LUEGO  -->
                                                    </div>
                                                    <input id="txtPrecioUnitInicio" class="span12" type="hidden" onkeypress=" return ValidaDecimales(event,this,2)" />
                                                    <!-- Campos para Productos seriados-->
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
                                                        <div class="span12">
                                                            <div class="control-group">
                                                                <div class="controls" id="div_txt_serie_sec" style="display: none;">
                                                                    <input id="txt_serie" data-role="tagsinput" class="span12" type="hidden" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <!-- btn Agregar Detalle -->

                                                    <div class="row-fluid">
                                                        <div class="span12" id="div_btn_add_prods">
                                                            <a id="btnagregarAnticipoDetalle" class="btn black pull-right" style="margin-right: 5px;"><i class=" icon-plus-sign"></i>&nbsp;Agregar Anticipo(s)</a>
                                                            <a id="A2" class="btn pull-right" href="javascript:LimpiarCamposDetalle();" style="margin-right: 5px;"><i class=" icon-file"></i>&nbsp;Limpiar</a>
                                                            <a id="A1" class="btn blue pull-right" style="margin-right: 5px;" href="javascript:AgregarDetalleVenta();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />

                                                <!-- Lista Detalle -->
                                                <div class="row-fluid">
                                                    <div class="span12" id="div_tabla_det">
                                                        <!--Aquí se carga el contenido por jquery-->
                                                    </div>
                                                </div>

                                                <div class="row-fluid" style="margin-top: 15px;">
                                                    <div class="span4">
                                                        <div class="row-fluid">
                                                            <div class="span5 offset1">
                                                                <div class="control-group">
                                                                    <h1>
                                                                        <label class="control-label" for="txt_glosa" style="font-family: monospace;">
                                                                            <b>IMPORTE TOTAL: &nbsp;&nbsp;  </b>
                                                                        </label>
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <h1>
                                                                        <label id="lbl_monto_totalito" class="control-label" for="txt_glosa" style="font-family: monospace; color: blue;">
                                                                            <b><span class="simboloMoneda"></span>&nbsp;<span id="lblImporteTotal">0.00</span></b>
                                                                        </label>
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span5 offset1">
                                                                <div class="control-group">
                                                                    <h1>
                                                                        <label class="control-label" for="txt_glosa" style="font-family: monospace;">
                                                                            <b>IMPORTE A COBRAR: &nbsp;&nbsp;  </b>
                                                                        </label>
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <h1>
                                                                        <label id="lbl_monto_total" class="control-label" for="txt_glosa" style="font-family: monospace; color: blue;">
                                                                            <b><span class="simboloMoneda"></span>&nbsp;<span id="lblImporteCobrar">0.00</span></b>
                                                                        </label>
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                        </div>                                                            
                                                    </div>
                                                    <%--<div  class="span1"></div>--%>
                                                    <div class="span7">

                                                        <!-- DESCUENTO -->
                                                        <div class="span6" id="div_chk_descuento" >
                                                            <div class="span8">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio pull-right">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" name="rbDescuento" id="rbDescuento" disabled="disabled"/>
                                                                                </span>
                                                                            </div>
                                                                            Descuento
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtDescuento" class="span12" type="text" disabled="disabled" onkeypress=" return ValidaDecimales(event,this,5)"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span6">
                                                            <div class="span8 ">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio pull-right">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" name="redondeoDonacion" id="rbRedondeo" disabled="disabled" />
                                                                                </span>
                                                                            </div>
                                                                            Redondeo
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtRedondeo" class="span12" type="text" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- DONACION -->
                                                        <%--<div class="span6" id="div_chk_donacion" >
                                                            <div class="span8 ">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio pull-right">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" name="redondeoDonacion" id="rbDonacion" disabled="disabled" />
                                                                                </span>
                                                                            </div>
                                                                            Donación
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span4 ">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txtDonacion" class="span12" type="text" disabled="disabled" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>--%>
                                                        <%--<div class="span6" id="div_chk_AplicaDescuento" >
                                                            <div class="span12">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio pull-right">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" name="rbDescuento" id="rbAplicaDescuento" disabled="disabled"/>
                                                                                </span>
                                                                            </div>
                                                                            Aplicar Descuento
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>--%>
                                                        <div class="span3"></div>
                                                        <div class="span6" id="div_chk_AplicaDescuento" >
                                                            <%--<div class="span12">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio pull-right">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" name="rbDescuento" id="rbAplicaDescuento" disabled="disabled"/>
                                                                                </span>
                                                                            </div>
                                                                            Aplicar Descuento
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>--%>
                                                            <div class="span1">
                                                                <div class="control-group">
                                                                    <input type="checkbox" id="rbAplicaDescuento" name="rbAplicaDescuento" disabled="disabled"/>
                                                                </div>
                                                            </div>
                                                            <div class="span3">
                                                                <div class="control-group">
                                                                    <label class="control-label" style="display: inline-block;">Aplicar Descuento</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <!-- DETALLE DE BONIFICACION -->
                                        <div class="portlet box purple" style="display: none" id="porlet_boni">
                                            <div class="portlet-title">
                                                <h4><i class="icon-tag"></i>DETALLES DE BONIFICACIÓN</h4>
                                            </div>
                                            <div class="portlet-body">

                                                <br>

                                                <!-- Lista Detalle Bonificacion-->
                                                <div class="row-fluid">
                                                    <div class="span12" id="div_tabla_det_boni">
                                                        <!--Aquí se carga el contenido por jquery-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- DETALLE DE MUESTRA -->
                                        <div class="portlet box green" style="display: none" id="porlet_muestra">
                                            <div class="portlet-title">
                                                <h4><i class="icon-tag"></i>DETALLES DE LA MUESTRA</h4>
                                            </div>
                                            <div class="portlet-body">

                                                <br>

                                                <!-- Lista Detalle Muestra-->
                                                <div class="row-fluid">
                                                    <div class="span12" id="div_tabla_det_muestra">
                                                        <!--Aquí se carga el contenido por jquery-->
                                                    </div>
                                                </div>



                                            </div>
                                        </div>

                                    </div>

                                    <!--DATOS DE CREDITO Y TRIBUTACIONES -->
                                    <div class="span4">
                                        <!-- Datos de Crédito-->
                                        <div class="span12" id="p_DatCredito" style="margin-left: 0">
                                            <div class="portlet box red">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-down"></i>Datos Crédito</h4>
                                                </div>
                                                <div class="portlet-body" style="display: none;">
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="control-group">
                                                                <label class="control-label" for="chkResponsablePago">
                                                                    <input type="checkbox" id="chkResponsablePago" name="chkResponsablePago" />
                                                                    Responsable Pago</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="control-group">
                                                                <div class="controls" id="divResponsablePago">
                                                                    <input id="txtResponsablePago" class="span12" type="text" placeholder="Responsable Pago" style="text-transform: uppercase" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cbo_modo_pago">Modo</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <select id="cbo_modo_pago" class="span12" data-placeholder="Mod. Pag.">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_plazo_pago">Plazo</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label" for="txt_plazo_pago">
                                                                            <input id="txt_plazo_pago" class="span8" onkeypress="return ValidaNumeros(event,this)" type="text" value="0" style="text-align: center" disabled/>
                                                                            días
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div id="divAlCredito">
                                                        
                                                        <div class="row-fluid">
                                                            <div class="span12">    
                                                                <div class="span12">
                                                                    <div class="control-group span4">
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:left; color:red" id ="linea"></label>                                                                        
                                                                    </div>

                                                                    <div class="control-group span4">                                                                        
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:center; color:red" id ="disponible"></label>                                                                        
                                                                    </div>

                                                                    <div class="control-group span4">                                                                        
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:right; color:red" id ="vencido"></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                            
                                                                <div class="span1">
                                                                </div>
                                                            
                                                                <div class="span1">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="radio" class="m-wrap span12" id="rbLibres" name="tipoSeria"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">                                                                  
                                                                            <button type="button" id="AL" class="btn gray span12"><i class="icon-book" style="line-height: initial;"></i>&nbsp;Cuotas&nbsp;&nbsp;</button>                                                                        
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="span1">
                                                                </div>

                                                                <div class="span1">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="radio" class="m-wrap span12" id="rbVinculadas" name="tipoSeria"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <button type="button" id="A5" class="btn gray span12"><i class="icon-book" style="line-height: initial;"></i>&nbsp;Letras</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    

                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="span12 control-label" for="txt_fec_vencimiento">F. Vcto.</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" style="text-align:center;" disabled/>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="span12 control-label" for="txt_estado_credito">Estado</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input type="text" class="span12" id="txt_estado_credito" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tributaciones-->
                                        <div class="span12" id="p_DatTributaciones" style="margin-left: 0">
                                            <div class="portlet box yellow">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-down"></i>Tributaciones</h4>
                                                </div>
                                                <div class="portlet-body" style="display: none;">
                                                    <div class="row-fluid">
                                                        <div class="span12" style="margin-left: 0">
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="radio">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" id="chk_detraccion" disabled="disabled" />
                                                                                </span>
                                                                            </div>
                                                                            Sujeto a Detracción
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <span class="simboloMoneda"></span>
                                                                        <input id="txt_monto_detraccion" class="numeros span10" type="text" disabled style="text-align: center" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12" style="margin-left: 0">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_num_op_detrac">
                                                                        Nro.Dep.</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txt_num_op_detrac" class="numeros span12" type="text" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_fec_comp_detrac">
                                                                        Emisión</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_detrac" data-date-format="dd/mm/yyyy" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_cta_detrac">
                                                                        Cta. Detrac.</label>
                                                                </div>
                                                            </div>
                                                            <div class="span10">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <input id="txt_cta_detrac" class="numeros span12" type="text" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span11" style="height: 50px;">
                                                                <div class="control-group">
                                                                    <div class="controls" style="height: 30px;">
                                                                        <label class="radio">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" id="chk_percepcion" disabled="disabled" />
                                                                                </span>
                                                                            </div>
                                                                            Sujeto a Percepción
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span5">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label">
                                                                            <input type="radio" class="m-wrap span12" id="rbsinserie" name="tipoSeria" checked="checked" disabled />
                                                                            Impreso en Fact.
                                                                        </label>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span7">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="rbseriada">
                                                                        <input type="radio" class="m-wrap span12" id="rbseriada" name="tipoSeria" disabled />
                                                                        Con Comp. Percep.
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span5">
                                                            </div>
                                                            <div class="span7">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label span5" for="txt_num_comp_percep">
                                                                            N. Comp.</label>
                                                                        <input id="txt_num_comp_percep" class="span7" type="text" disabled />
                                                                    </div>
                                                                </div>
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label span5" for="txt_fec_comp_percep">
                                                                            Fecha</label>
                                                                        <input type="text" class="span7 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_percep" data-date-format="dd/mm/yyyy" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span11" style="height: 50px;">
                                                                <div class="control-group">
                                                                    <div class="controls" style="height: 30px;">
                                                                        <label class="radio">
                                                                            <div class="radio disabled">
                                                                                <span>
                                                                                    <input type="checkbox" style="opacity: 0;" id="chk_retencion" disabled />
                                                                                </span>
                                                                            </div>
                                                                            Sujeto a Retención
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid">
                                                        <div class="span12">
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label span5" for="txt_num_comp_reten">
                                                                            N. Comp.</label>
                                                                        <input id="txt_num_comp_reten" class="numeros span7" type="text" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="span6">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <label class="control-label span4" for="txt_fec_comp_reten">
                                                                            Fecha</label>
                                                                        <input type="text" class="span8 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_reten" data-date-format="dd/mm/yyyy" disabled />
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

                                <!-- CAMPOS PARA CREAR QR -->
                                <div id="codigoQR" style="display: none"></div>                                                                

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls" style="height: 30px;">
                                                <label class="control-label" for="chk_inc_igv">
                                                    <input id="chk_inc_igv" type="checkbox" class="span12" style="opacity: 0;" checked="checked">
                                                    Precios inc IGV en impresión
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6" id="divBtnsMantenimiento">
                                        <a id="grabar" class="btn blue" href="javascript:GrabarDctoVenta();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                        
                                        <div id="div_btn_completar" style="display: none;">
                                            <a id="A3" class="btn green" href="javascript:GrabarCompletarDctoVenta();"><i class=" icon-plus-sign"></i>&nbsp;Completar</a>
                                            
                                            </div>

                                        <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>

                                    </div>
                                    <div class="span2">
                                        <a id="btnImprimir" class="btn black" href="javascript:ImprimirDctoVenta();" style="display: none; margin-top: 5px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                                        <label id="lblCopia" class="control-label" for="chkCopia" style="display: none; margin-right: 15px; margin-bottom: 0px;">
                                            <input type="checkbox" id="chkCopia" name="chkCopia" style="display: inline-block;" />
                                            Copia</label>
                                    </div>
                                     <div class="span2">                                        
                                        <a class="btn blue hidden" id="btnEFac" style="display:none;"><i class="icon-file"></i>&nbsp;Fac. Electronica</a>
                                    </div>
                                    <!-- Btn Completar Documento-->

                                </div>
                            </div>
                            <!-- FIN DE GENERALES-->

                            <!-- INICIO DEL TAB TOTALES-->
                            <div class="tab-pane" id="detalle_compra">
                                <!-- DATOS MONETARIOS -->
                                <div class="row-fluid">
                                    <div class="span12" id="p_monetarios" style="margin-left: 0">
                                        <div class="portlet box green">
                                            <div class="portlet-title">
                                                <h4><i class="icon-money"></i>Datos Monetarios</h4>
                                            </div>
                                            <div class="portlet-body">

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_base_imponible">
                                                                    Base Imponible</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_base_imponible" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_descuento">
                                                                    Descuento</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_descuento" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_isc">
                                                                    ISC</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_isc" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtOpExonerada">
                                                                    Op Exonerada</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtOpExonerada" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtOpGravada">
                                                                    Op Gravada</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtOpGravada" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtOpInafecta">
                                                                    Op Inafecta</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtOpInafecta" class="span12" type="text" value="0" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span1 offset4">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_impuesto">
                                                                    IGV (%)</label>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_impuesto" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_impuesto">
                                                                    IGV (<span id="simbolo_moneda">S/.</span>)</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_impuesto_calc" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span1 offset4">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_subtotal">
                                                                    Importe Total</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_subtotal" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_detraccion">
                                                                    Detracción</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_detraccion" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span1 offset4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label>
                                                                        Redondeo
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtRedondeo2" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_Percepcion">
                                                                    Percepción</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_Percepcion" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span1 offset4">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <label>
                                                                        Donación
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDonacion2" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="span1">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_Retencion">
                                                                    Retención</label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_Retencion" class="span12" type="text" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row-fluid">
                                                    <div class="span12">
                                                        <div class="span1 offset4">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_monto_total">
                                                                    <b>Importe Cobrar</b></label>
                                                            </div>
                                                        </div>
                                                        <div class="span2">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txt_monto_total" class="span12" type="text" disabled="disabled" />
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
                            <!-- FIN DE LOS TABS-->

                            <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                            <div class="tab-pane" id="asientos_contables">                                          
                               <h1></h1>
                            </div>
                            <!-- FIN DE ASUENTOS CONTABLES-->
                        </div>
                        <!-- FIN DEL CUERPO DE LA FORMA-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="divBuscarDocOS" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="display: block; width: 60%; left: 20%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarDocOS_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDocOS_body">
                <table class="display DTTT_selectable" id="tblDocumentosOS" style="width: 100%;">
                    <thead>
                        <tr>
                            <%--<th>NRO. ATENCION</th>    --%>                        
                            <th>NRO. ATENCIÓN</th>
                            <th>CLIENTE</th>
                            <th>MONTO</th>
                            <th>ABOGADO</th>
                            <th>FECHA EMISIÓN</th>                            
                            <th>PIDM ABOGADO</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Click en un documento para seleccionarlo</h5>
    </div>
</div>
<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="display: block; width: 90%; left: 5%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarDoc_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <table class="display DTTT_selectable" id="tblDocumentos" style="width: 100%;">
                    <thead>
                        <tr>
                            <th>CODIGO</th>                            
                            <th>NRO. DOCUMENTO</th>
                            <th>CLIENTE</th>
                            <th>FECHA EMISIÓN</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Click en un documento para seleccionarlo</h5>
    </div>
</div>


<div id="divLetras" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%; left: 25%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divLetras_title"><i class="icon-book" style="line-height: initial;"></i>&nbsp;LETRAS VINCULADAS</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divLetras_body">
                <table class="table table-hover" id="tblLetras">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">NRO DCTO</th>
                            <th style="text-align: center">NRO LETRA</th>
                            <th style="text-align: center">MONTO</th>
                            <th style="text-align: center">FECHA</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button data-dismiss="modal" type="button" id="divLetras_btnaceptar" class="btn blue">Aceptar</button>
    </div>
</div>

<div id="divCouta" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%; left: 45%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #00839A; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divCouta_title"><i class="icon-book" style="line-height: initial;"></i>&nbsp;CUOTAS LIBRES POR <span id="monto"></span></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span2">
                <label for="txtCodCuotaLibre" style="font-weight:bold;">Código</label>
            </div>

            <div class="span3">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtCodCuotaLibre" style="text-align:center;font-weight:bold;" disabled/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span2">
                <label for="txtnumdoc">Nro Cuotas</label>
            </div>
            <div class="span3">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtNroCoutas" style="text-align:right;"/>
                    </div>
                </div>
            </div>
            <div class="span1">
                
            </div>
            <div class="span2">
                <label for="chkCuotasLibres">C. Fijas</label>
            </div>
            <div class="span1">
                <div class="control-group">
                    <div class="controls">
                        <input type="checkbox" id="chkCuotasLibres" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span2">
                <label for="txtnumdoc">Periodo</label>
            </div>
            <div class="span2">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtPeriodoCouta" style="text-align:right;"/>
                    </div>
                </div>
            </div>            
                          
            <div class="span1">
                <label for="txtnumdoc">días</label>
            </div>
            <div class="span1">                
            </div> 
            <div class="span3">
                <button type="button" id="btnSimular" class="btn blue"><i class="icon-eye-open"></i>&nbsp;Simular</button>
            </div>
                        
            <div class="span3">
                <span id="txtBalanceadoStatus" style="text-align:center;font-weight:bold;"></span>
            </div>
        </div>

        <div class="row-fluid" style="padding-top: 1px; border-top: solid #e5e5e5 2px;">
            <div class="span12" id="divCouta_body">
                <table class="table table-hover" id="tblCoutas">
                    <thead>
                        <tr>
                            <th style="text-align: center"></th>
                            <th style="text-align: center">NRO DIAS</th>
                            <th style="text-align: center">FECHA</th>
                            <th style="text-align: center">MONEDA</th>
                            <th style="text-align: center">MONTO</th>                            
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th colspan="4" style="text-align: right">TOTAL:</th>
                            <th style="text-align:right">0.00</th>
                        </tr>
                    </tfoot>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" id="divCouta_btnaceptar" class="btn blue">Aceptar</button>
        <button data-dismiss="modal" type="button" id="divCouta_Salir" class="btn" style="display:none;">Salir</button>
    </div>
</div>

<div id="divLetraVin" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 45%; left: 45%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #094CB4; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divLetra_title"><i class="icon-book" style="line-height: initial;"></i>&nbsp;LETRAS DE CAMBIO POR <span id="montoLetra"></span></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid cab_letra">
            <div class="span2">
                <label for="txtFechaGiro">Fecha Giro</label>
            </div>
            <div class="span3">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span10" id="txtFechaGiro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                    </div>
                </div>
            </div>
            <div class="span1">                
            </div>

            <div class="span2">
                <label for="txtnumdoc">Fecha Registro</label>
            </div>
            <div class="span3">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span10" id="txtFechaRegistro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid cab_letra">
            <div class="span2">
                <label for="txtLugarGiro">Lugar de Giro</label>
            </div>
            <div class="span3">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtLugarGiro" />
                    </div>
                </div>
            </div>
            <div class="span1">
                
            </div>
            <div class="span2">
                <label for="txtnumdoc">Letras Fijas</label>
            </div>
            <div class="span1">
                <div class="control-group">
                    <div class="controls">
                        <input type="checkbox" id="chkLetrasFijas" />
                    </div>
                </div>
            </div>

            <div class="span3">
                <span id="txtBalanceadoLetras" style="text-align:center;font-weight:bold;"></span>
            </div>
        </div>
        
        <div class="row-fluid cab_letra">
            <div class="span2">
                <label for="txtLugarGiro">Nro de Letras</label>
            </div>

            <div class="span1">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtNroLetras" />
                    </div>
                </div>
            </div>

            <div class="span1"></div>

            <div class="span2">
                <label for="txtnumdoc">Periodo Couta</label>
            </div>

            <div class="span1">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtPeriodoLetra" />
                    </div>
                </div>
            </div>            
                          
            <div class="span1">
                <label for="txtnumdoc">días</label>
            </div>

            <div class="span1">                
            </div>

            <div class="span3">
                <button type="button" id="btnSimular2" class="btn blue"><i class="icon-eye-open"></i>&nbsp;Simular</button>
            </div>                        
        </div>       

        <div class="row-fluid" style="padding-top: 1px; border-top: solid #e5e5e5 2px;">
            <div class="span12" id="divLetra_body">
                <table class="table table-hover" id="tblLetrasVin">
                    <thead>
                        <tr>
                            <th style="text-align: center"></th>                            
                            <th style="text-align: center">NRO DIAS</th>
                            <th style="text-align: center">FECHA</th>
                            <th style="text-align: center">MONEDA</th>
                            <th style="text-align: center">MONTO</th>                            
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th colspan="4" style="text-align: right">TOTAL:</th>
                            <th style="text-align:right">0.00</th>
                        </tr>
                    </tfoot>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" id="divLetra_btnaceptar" class="btn blue">Aceptar</button>
        <button data-dismiss="modal" type="button" id="divLetra_Salir" class="btn" style="display:none;">Salir</button>
    </div>
</div>

<input id="hfResponsablePagoPIDM" type="hidden" />
<input id="hfPIDM" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfCodigoTipoDocumento" type="hidden" />
<input id="hfTipoDocumento" type="hidden" />
<!-- Otro documento que no sea RUC-->
<input id="hfNroDocumento" type="hidden" />
<input id="hfCodUnd_Producto" type="hidden" />
<input id="hfTIPO_INSERT" type="hidden" /><!-- Tipo de insert para Prod. Seriados -->
<input id="hfCOD_PROD" type="hidden" /><!-- Producto seleccionado para agregar a detalles-->
<input id="hfProdSeriado" type="hidden" /><!-- S=si; N=no-->
<input id="hfIMPUESTO" type="hidden" value="0.00" /><!--IGV-->
<input id="hfCodigoCategoriaCliente" type="hidden" value="" />
<input id="hfAgenteRetencionCliente" type="hidden" value="" />

<input id="hfImprimirPreciosIGV" type="hidden" value="N" />
<input id="hfCompletoInd" type="hidden" value="N" />
<input id="hfCreditoDispMoba" type="hidden" value="0" />
<input id="hfCreditoDispMoal" type="hidden" value="0" />


<input id="hfParamDetraccion" type="hidden" value="0" />
<input id="hfParamRetencion" type="hidden" value="0" />
<input id="hfParamMontoRetencion" type="hidden" value="0" />
<input id="hfParamRedondeo" type="hidden" value="EST" />
<input id="hfFactorImpuestoRentaVenta" type="hidden" value="1.5" /><!-- Factor de Impuesto a la Renta Para la Venta-->
<input id="hfFactorImpuestoRenta" type="hidden" value="1.5" /><!-- Factor de Impuesto a la Renta Mínimo-->

<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />

<input id="hfporcentaje_detraccion" type="hidden" value="0.00" />
<input type="hidden" id="hfParamStock" value="-1" />
<input id="hfcod_cate" type="hidden" />
<input id="hfdes_cate" type="hidden" />

<input id="hfcod_cate2" type="hidden" />
<input id="hfdes_cate2" type="hidden" />

<div id="muestralistap" style="width: 700px; display: none;" role="dialog" class="modal fade" tabindex="-1" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel"></h3>
        </div>
        <div id="divmodal" class="modal-body" aria-hidden="true">
            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>


<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
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
                                <select multiple class="span12" id="cboCorreos"></select>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>

<div id="divWhatsapp" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divWhatsapp_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar Whatsapp</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divWhatsapp_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboClienteWhatsapp"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtContenidoWhatsapp"></textarea><hr style="margin: 8px 0px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarWhatsapp()" id="btnEnviarWhatsapp"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>

<div id="divAnticipos" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Elegir Anticipo(s) </h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="div2">
                <div class="row-fluid">
                    <table id="tabla_det_anticipo" class="table" border="0">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="chkTodos"></th>
                                <th style="text-align: left">CODIGO</th>
                                <th style="text-align: left">NUMERO DOCUMENTO</th>
                                <th style="text-align: center">MONTO SOLES</th>
                                <th style="text-align: center">MONTO DOLARES</th>
                                <th style="text-align: left">MONEDA</th>
                                <th style="text-align: right">TIPO DE CAMBIO</th>
                                <th style="text-align: left">GLOSA</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <label  class="control-label" style="font-style: italic; color: blue; text-align: left">*** ¡IMPORTANTE! - La venta y el anticipo deben ser del mismo tipo de documento ***</label>
        <button class="btn green" type="button" onclick="AgregarAnticipo()" id="btnAgregarAnticipo">&nbsp;Agregar Seleccionado(s)</button>
    </div>
</div>

<div id="modal-habido" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4>Condición Cliente</h4>
    </div>
    <div class="modal-body">
        <div id="divConsultaHabido">
            <div class="row-fluid">
                <div class="span2 offset1">
                    <p>
                        ESTADO:                    
                    </p>
                </div>
                <div class="span3">
                    <b>
                        <p id="lblEstadoSunat">
                            Verificando...                    
                        </p>
                    </b>

                </div>

                <div class="span2">
                    <p>
                        CONDICIÓN:                    
                    </p>
                </div>
                <div class="span4 ">
                    <b>
                        <p id="spanVerificando">
                            Verificando...                    
                        </p>
                    </b>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span10 offset1" id="no_existe" style="display: none; text-align: center;">
                    <p>El número de RUC <span id="mnro"></span> consultado no es válido.</p>
                </div>
            </div>
        </div>

        <div class="row-fluid" style="margin-top: 10px;">
            <%--<div class="span10 offset1">
                <div class="span4 offset4">
                    <a href="javascript:$('#modal-habido').modal('hide');" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
            </div>--%>
            <div class="span3">
            </div>
            <div class="span6">
                <div class="span12">
                    <a class="btn blue" id="btnActualizarDS"><i class="icon-refresh"></i>&nbsp;Cambiar datos Contribuyente</a>
                </div>
            </div>

        </div>
    </div>
</div>

<div id="mapaModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;left:25%;" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H2">Localización</h3>
    </div>
    <div class="modal-body" style="text-align: center">

        <div id="map" style="height: 300px"></div>

    </div>
    <div class="modal-footer">
    </div>
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVMDOCS.js"></script>
<%--<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>--%>

<script>
    jQuery(document).ready(function () {
        NVMDOCS.init();
    });
</script>