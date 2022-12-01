<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMDOVS.ascx.vb" Inherits="vistas_NV_NVMDOVS" %>
<style type="text/css">
    #divMail, #divWhatsapp, #_buscarDocumento, #divAnticipos, #mapaModal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divMail, #divWhatsapp #_buscarDocumento, #divAnticipos, #mapaModal {
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
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>VENTA RÁPIDA SERVICIOS</h4>
                <div class="actions">
                    <a class="btn red hidden" id="btnPdfAlt"><i class="icon-book" ></i>&nbsp;Descargar PDF</a>
                    <a class="btn green hidden" id="btnWhatsapp"><i class="icon-phone"></i>&nbsp;Whatsapp</a>
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>                    
                    <a class="btn black btnImprimir" href="javascript:ImprimirDctoVenta();" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" onclick="javascript:NuevaVenta();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nvldovs"><i class="icon-list"></i>&nbsp;Listar</a>
                    <asp:Button class="btn red hidden" ID="btnDescPDF" runat="server" OnClick="btnPdf_Click"/>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabDetalleComp" href="#detalle_compra" data-toggle="tab"><i class=""></i>Totales</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="datos_generales">
                                <div class="row-fluid">
                                    <!--GENERALES Y DETALLE DE VENTA -->
                                    <div class="span8">
                                        <!-- Generales -->
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumDctoComp">
                                                        N°</label>
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
                                            <div class="span2">
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
                                                        <button type="button" class="btn blue"  title="Atenciones Pendientes" id="btnNroAtencion"><i class="icon-search" style="margin-bottom: 2px;"></i></button>
                                                        <%--<a id="btnRecargar" title="Recargar" class="btn green" style="margin-bottom: 2px;"><i class="icon-refresh"></i></a>--%>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span12 " id="divIndicadores" style="display: none;">
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
                                                        <a id="btnverempl" title="Ver Datos" class="btn blue" onclick="" style="margin-bottom: 2px;"><i class="icon-eye-open" style="margin-left: -2px;"></i></a>
                                                    <!--<a id="btnNuevaPersona"  onclick="NuevoCliente();" href="?f=NCMCLIR" target="_blank" class="btn green" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>-->
                                                        <a id="btnNuevaPersona"  onclick="NuevoCliente();" title="Nuevo" class="btn black" style="margin-bottom: 2px;"><i class="icon-plus"></i></a>
                                                        <a id="btnRecargarPersona" title="Recargar" class="btn green" style="margin-bottom: 2px;"><i class="icon-refresh"></i></a>
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
                                                        <button type="button" id="btnHabido" class="btn orange" style="height: 27px; padding: 0px 5px; font-size: 11px; display:none">
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
                                            <div class="span4">
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
                                        <div class="portlet box blue" id ="divDetalleVenta1">
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
                                                        <div class="span3">
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
                                                    <div id="divAgregarProducto">
                                                        <div class="row-fluid">
                                                            <%--<div class="span1" style="display: none;">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cboAlmacen">Almacén</label>
                                                                </div>
                                                            </div>
                                                            <div class="span4" id="divCboAlmacen" style="display: none;">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <select id="cboAlmacen" class="span12" data-placeholder="Almacén">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>--%>
                                                            <div class="span1" style="display: none;">
                                                                <div class="control-group">
                                                                    <label class="control-label" style="display: inline-block;">Despacho en Venta</label>
                                                                </div>
                                                            </div>
                                                            <div class="span3"style="display: none;">
                                                                <div class="control-group">
                                                                    <input type="checkbox" id="chkDespachoVenta" name="chkDespachoVenta" checked="checked" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                       
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
                                                            <div class="span3" style="display: none;">
                                                                <div class="control-group">
                                                                    <div class="controls">
                                                                        <select id="cbo_und_medida" class="span12" data-placeholder="Und. Medida" disabled="disabled">
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
                                                            <div class="span1" style="display: none;">
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
                                                                        <input id="txtPrecioUnitario" class="span12" type="text"  onkeypress=" return ValidaDecimales(event,this,5)"/>
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
                                                    <div class="span8 ">

                                                        <!-- REDONDEO -->
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
                                                        <div class="span6" id="div_chk_donacion">
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
                                                                        <select id="cbo_modo_pago" class="span12" data-placeholder="Mod. Pag." disabled>
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
                                                                    <div class="control-group">
                                                                        <div class="control-group span4">
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:left; color:red;" id ="linea"></label>                                                                        
                                                                    </div>

                                                                    <div class="control-group span4">                                                                        
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:center; color:red;" id ="disponible"></label>                                                                        
                                                                    </div>

                                                                    <div class="control-group span4">                                                                        
                                                                        <label class="control-label" for="txt_plazo_pago" style="text-align:right; color:red;" id ="vencido"></label>
                                                                    </div>
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
                                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" disabled />
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
                                        <div class="span12" id="p_DatTributaciones" style="margin-left: 0;">
                                            <div class="portlet box yellow">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-down"></i>Tributaciones</h4>
                                                </div>
                                                <div class="portlet-body" style="display: none;">
                                                    <div class="row-fluid">
                                                        <div class="span12">
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
                                        
                                        <!-- Pago de Venta -->
                                        <div class="span12" id="p_DatCobro" style="margin-left: 0">
                                            <div class="portlet box blue" style="margin-bottom: 10px">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-up"></i>Cobro de Venta 1<small id="msgCobro" style="font-style: italic; color: white;">*Obligatorio</small></h4>
                                                </div>
                                                <div class="portlet-body">

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label>Fecha de Pago</label>
                                                        </div>
                                                        <div class="span6">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaPago" data-date-format="dd/mm/yyyy" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label>Origen de Cobro</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE COBRO">
                                                                        <option></option>
                                                                        <option value="Caja">CAJA</option>
                                                                        <option value="Banco">BANCO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid"> 
                                                        <div class="span4">
                                                            <label id="lbl_detalle1">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_Det_Origen" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle2">Medio de Pago</label>
                                                        </div>
                                                        <div class="span8" style="margin-bottom: 5px;">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cboMedioPago" disabled="disabled" class="span12 obligatorio" data-placeholder="MEDIO DE PAGO">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle3">Destino</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDestino" type="text" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle4">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtNroOpe" class="obligatorio span12" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid"> <%--20/02--%>
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lblefectivo">Monto recibido</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtEfectivo" onkeyup="ValidarTotales()" style="text-align: right" class="span12" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>
                                        </div>

                                        <div class="span12" id="p_DatCobro2" style="margin-left: 0"> <%--20/02--%>
                                            <div class="portlet box blue" style="margin-bottom: 10px">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-down"></i>Cobro de Venta 2</h4>
                                                </div>
                                                <div class="portlet-body" style="display: none;">

                                                    <%--<div class="row-fluid">
                                                        <div class="span4">
                                                            <label>Fecha de Pago</label>
                                                        </div>
                                                        <div class="span6">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaPago2" data-date-format="dd/mm/yyyy" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>--%>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label>Origen de Cobro</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_OrigenPago2" class="span12 obligatorio" data-placeholder="ORIGEN DE COBRO">
                                                                        <option></option>
                                                                        <option value="Caja">CAJA</option>
                                                                        <option value="Banco">BANCO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid"> 
                                                        <div class="span4">
                                                            <label id="lbl_detalle1_2">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_Det_Origen2" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle2_2">Medio de Pago</label>
                                                        </div>
                                                        <div class="span8" style="margin-bottom: 5px;">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cboMedioPago2" disabled="disabled" class="span12 obligatorio" data-placeholder="MEDIO DE PAGO">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle3_2">Destino</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDestino2" type="text" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle4_2">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtNroOpe2" class="obligatorio span12" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lblefectivo2">Monto recibido</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtEfectivo2" onkeyup="ValidarTotales2()" style="text-align: right" class="span12" /> <%--21/02--%>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>

                                        <div class="span12" id="p_DatCobro3" style="margin-left: 0"> <%--20/02--%>
                                            <div class="portlet box blue" style="margin-bottom: 10px">
                                                <div class="portlet-title" style="cursor: pointer;">
                                                    <h4><i class="icon-chevron-down"></i>Cobro de Venta 3</h4>
                                                </div>
                                                <div class="portlet-body" style="display: none;">

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label>Origen de Cobro</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_OrigenPago3" class="span12 obligatorio" data-placeholder="ORIGEN DE COBRO">
                                                                        <option></option>
                                                                        <option value="Caja">CAJA</option>
                                                                        <option value="Banco">BANCO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid"> 
                                                        <div class="span4">
                                                            <label id="lbl_detalle1_3">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cbo_Det_Origen3" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle2_3">Medio de Pago</label>
                                                        </div>
                                                        <div class="span8" style="margin-bottom: 5px;">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <select id="cboMedioPago3" disabled="disabled" class="span12 obligatorio" data-placeholder="MEDIO DE PAGO">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle3_3">Destino</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input id="txtDestino3" type="text" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <label id="lbl_detalle4_3">-</label>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtNroOpe3" class="obligatorio span12" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row-fluid">
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lblefectivo3">Monto recibido</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtEfectivo3" onkeyup="ValidarTotales3()" style="text-align: right" class="span12" /> <%--21/02--%>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>     
                                            </div>
                                        </div>

                                        <!-- CAMPOS PARA CREAR QR -->
                                       <div id="codigoQR"></div>  

                                         <!-- Adicional de Venta -->
                                        <div class="span12" id="p_DatVuelto" style="margin-left: 0">
                                            <div class="portlet box blue" style="border-top: 1px solid #b4cef8 !important ">
                                                <div class="portlet-body">
                                                    <div class="row-fluid"><%--27/02--%>
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lblAcumulado">Monto Acumulado</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtAcumulado" style="text-align: right" class="span12 obligatorio" disabled="disabled" value="0.00"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid"><%--20/02--%>
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lblmonto">Monto a Cobrar</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtMonto" style="text-align: right" class="span12 obligatorio" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row-fluid" id="id_Vuelto" style="display: none;">
                                                        <div class="span4">
                                                            <div class="control-group ">
                                                                <label id="lbvluelto">Vuelto</label>
                                                            </div>
                                                        </div>
                                                        <div class="span8">
                                                            <div class="control-group">
                                                                <div class="controls">
                                                                    <input type="text" id="txtVuelto" style="text-align: right" class="span12" disabled="disabled" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls" style="height: 30px;">
                                                <label class="control-label" for="chk_inc_igv">
                                                    <input id="chk_inc_igv" type="checkbox" class="span6" style="opacity: 0;" checked="checked">
                                                    Precios inc IGV en impresión
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls" style="height: 30px;">
                                                <label class="control-label" for="chk_Autodetraccion">
                                                    <input id="chk_Autodetraccion" type="checkbox" class="span6" disabled="disabled" style="opacity: 0;">
                                                    Autodetracción
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6" id="divBtnsMantenimiento">
                                        <%--<a id="grabar" class="btn blue" href="javascript:GrabarDctoVenta();"><i class="icon-save"></i>&nbsp;Grabar</a>--%>
                                        <div id="div_btn_completar" style="display: none;">
                                            <%--<a id="A3" class="btn green" href="javascript:GrabarCompletarDctoVenta();"><i class=" icon-plus-sign"></i>&nbsp;Completar</a>--%>
                                            <a id="modificar" class="btn blue" href="javascript:ActualizarDctoVenta();"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                                            <a id="A4" class="btn green" href="javascript:CompletaryPagar();"><i class=" icon-plus-sign"></i>&nbsp;Completar</a>
                                        </div>
                                        <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                        <a class="btn" id="btnLimpiarCobro"><i class="icon-file"></i>&nbsp;Limpiar Datos Cobro</a>
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
                                           
                                <div id="divGenAsiento" class="row-fluid">
                                    <div class="span2">
                                        <button type="button" id="btnGenerarAsiento" class="btn green"><i class="icon-plus"></i>&nbsp Generar Asiento</button>
                                    </div>
                                </div>
                                
                                <br />

                                <div class="row-fluid" >
                                    <table id="tblLista" class="display DTTT_selectable" border="0">
                                        <thead>
                                            <tr>
                                                <th>CUO
                                                </th>
                                                <th>NroMov
                                                </th>
                                                <th>Año
                                                </th>
                                                <th>Mes
                                                </th>
                                                <th>Descripción
                                                </th>
                                                <th>Tipo Asiento
                                                </th>
                                                <th>Fecha Emisión
                                                </th>
                                                <th>Fecha Transacción
                                                </th>
                                                <th>Declarado
                                                </th>
                                                <th>Moneda
                                                </th>
                                                <th>Tipo Cambio
                                                </th>
                                                <th>Ver Detalle
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

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
<input id="txtStockVenta" type="hidden" disabled="disabled"/><%--DPORTA--%>
<input id="hfPermisoModificarVenta" type="hidden" value="" /><%--DPORTA 21/05/2020--%>
<input id="hfResponsablePagoPIDM" type="hidden" />
<input id="hfPIDM" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfCodigoTipoDocumento" type="hidden" />
<input id="hfTipoDocumento" type="hidden" />
<!-- Otro documento que no sea RUC-->
<input id="hfNroDocumento" type="hidden" />
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

<input id="hfCodUnd_Producto" type="hidden" />

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



<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
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
    <input id="txtPrecioUnitInicio" class="span12" type="hidden" onkeypress=" return ValidaDecimales(event,this,2)" />
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
                    <p>El número de RUC <span id="mnro"></span>consultado no es válido.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="mapaModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%; left: 25%;" aria-hidden="true">
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
<script type="text/javascript" src="../vistas/NV/js/NVMDOVS.js"></script>
<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>

<script>
    jQuery(document).ready(function () {
        NVMDOVS.init();
    });
</script>


