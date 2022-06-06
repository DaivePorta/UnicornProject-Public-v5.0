<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMDOCC.ascx.vb" Inherits="vistas_NO_NOMDOCC" %>
<style>
    .balanceado {
    color:green;
    font-weight:600;

    }
     .noBalanceado {
    color:red;
    font-weight:600;

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
</style>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DOCUMENTOS COMPRAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nomdocc"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=noldocc"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block; margin-bottom: 0px" id="estereotipos">

                        <!-- TITULO DE LOS TABS-->
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabDetalleComp" href="#detalle_compra" data-toggle="tab"><i class=""></i>Detalle de Compra</a></li>
                            <li><a class="advance_form_with_chosen_element" id="tabAsientos" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>
                        <div class="tab-content">
                            <!-- INICIO DEL TAB GENERALES-->
                            <div class="tab-pane active" id="datos_generales">

                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtNumDctoComp">N° Dcto Compra.</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="txtNumDctoComp" class="span12" disabled="disabled" type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="txtNumSec">Secuencia</label>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="txtNumSec" class="span12" disabled="disabled" type="text" value="1" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <label class="control-label" for="cbo_doc_registro">Dcto. Registro</label>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cbo_doc_registro" class="span12" data-placeholder="Dcto. Registro">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span3">
                                            <div class="control-group">
                                                <label class="span2 control-label" for="txt_num_ser_reg">Nro</label>
                                                <input id="txt_num_ser_reg" class="numeros span4" type="text" style="text-align: center" />
                                                <input id="txt_num_doc_reg" class="numeros span6" type="text" style="text-align: center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="span8">
                                            <div class="span12" style="margin-left: 0">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbo_Empresa">Empresa</label>
                                                    </div>
                                                </div>
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbo_Sucursal" style="text-align:right">Establecimiento</label>
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
                                            <div class="span12" style="margin-left: 0">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_id_proveedor">Proveedor</label>
                                                    </div>
                                                </div>
                                                <div class="span4">
                                                    <div class="control-group" id="divTxtProveedor">
                                                        <div class="controls">
                                                            <input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase" disabled />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <a id="btnverempl" class="btn blue"><i class="icon-eye-open" style="line-height: initial;"></i></a>
                                                            <a id="btn_add_dcto" class="btn green"><i class="icon-plus" style="line-height: initial;"></i></a>
                                                            <a id="btn_refresh" class="btn purple"><i class="icon-refresh" style="line-height: initial;"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cboTipoDoc" class="span4" data-placeholder="Tipo Dcto." disabled>
                                                                <option value="6">RUC</option>
                                                                <option value="1">DNI</option>
                                                            </select>
                                                            <input id="txt_ruc_proveedor" class="span8" type="text" placeholder="Nro. Documento" disabled="disabled" style="margin-left: 4px" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                             <div>
                                                 <div class="span2" style="margin-top: -20px;"></div>
                                                 <div class="span10" style="margin-top: -20px;">
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
                                                            <button type="button" id="btn_act_direccion" class="btn green" style="height: 27px;">
                                                                <i class="icon-refresh"></i>
                                                            </button>
                                                            <button type="button" onclick="javascript:MostrarMapa($($(this).parents('[id*=direccion]')[0]).attr('id'));" data-dismiss="modal" class="btn red" style="height: 27px;">
                                                                <i class="icon-map-marker"></i>
                                                            </button>
                                                            <button type="button" id="btnDireccion" data-dismiss="modal" class="btn green" style="height: 27px;">
                                                                        <i class="icon-plus"></i>
                                                                        Dirección de Sunat
                                                                    </button>
                                                            <button type="button" id="btnHabido" class="btn orange" style="height: 27px; padding: 0px 5px; font-size: 11px;">
                                                                ¿Habido?
                                                            </button>                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="span12" style="margin-left: 0">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_fec_emision">Emisión</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_emision" data-date-format="dd/mm/yyyy" style="text-align: center" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_fec_transaccion" style="text-align: center">
                                                            Transacción
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_transaccion" data-date-format="dd/mm/yyyy" style="text-align: center" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCodigo">
                                                            Periodo Tributario</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbo_periodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span12" style="margin-left: 0" id="documentosadd">
                                                <div class="span12" id="div_mas_dctoreg_0" style="margin-left: 0">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cbo_doc_origen">
                                                                Dcto. Origen</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cbo_doc_origen" class="span12" data-placeholder="Dcto. Origen" disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="span12 control-label" for="txt_num_ser_orig_0">
                                                                Nro</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input class="txt_cod_doc_orig" type="hidden" />
                                                                <input class="numeros txt_num_ser_orig span5" type="text" disabled style="text-align: center" />
                                                                <input class="numeros txt_num_doc_orig span7" type="text" disabled style="text-align: center" />
                                                                <input class="txt_total_origen" type="hidden" />
                                                                <input class="txt_total_origen_alterno" type="hidden" />
                                                                <input class="txt_detraccion" type="hidden" />
                                                                <input class="txt_detraccion_alterno" type="hidden" />
                                                                <input class="txt_percepcion" type="hidden" />
                                                                <input class="txt_percepcion_alterno" type="hidden" />
                                                                <input class="txt_retencion" type="hidden" />
                                                                <input class="txt_retencion_alterno" type="hidden" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <a id="btnBuscadocs" class="btn blue buscar" onclick="buscarDocumento(this)"><i class="icon-search" style="line-height: initial;"></i></a>
                                                                <a id="btn_add_dcto2" class="btn green add"><i class="icon-plus-sign" style="line-height: initial;"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span12" style="margin-left: 0">
                                                <div class="row-fluid">
                                                    <div class="span6">

                                                        <div class="row-fluid">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cbx_destino">
                                                                        Operación</label>
                                                                </div>
                                                            </div>
                                                            <div class="span10">
                                                                <div class="control-group">
                                                                    <select id="cbx_destino" class="span12" data-placeholder="Operación">
                                                                        <option value="DSTGRA">DESTINO GRAVADO</option>
                                                                        <option value="DSTMIX">DESTINO MIXTO</option>
                                                                        <option value="DSTNGR">DESTINO NO GRAVADO</option>
                                                                        <option value="ORGNGR">ORIGEN NO GRAVADO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cboTipoBien">
                                                                        Tipo Bien</label>
                                                                </div>
                                                            </div>
                                                            <div class="span10">
                                                                <div class="control-group">
                                                                    <select id="cboTipoBien" class="span12" data-placeholder="Tipo Bien">
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div class="span6">
                                                        <div class="row-fluid">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="txt_comentario">
                                                                        Glosa</label>
                                                                </div>
                                                            </div>
                                                            <div class="span10">
                                                                <div class="control-group">
                                                                    <textarea id="txt_comentario" class="span12" rows="4" maxlength="100"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span2">
                                                                <div class="control-group">
                                                                    <label class="control-label" for="cboDeclara">
                                                                        Declara</label>
                                                                </div>
                                                            </div>
                                                            <div class="span10">
                                                                <div class="control-group">
                                                                    <select id="cboDeclara" class="span12" data-placeholder="Declaración">
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>



                                            </div>
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
                                                                        <label class="control-label" for="cbo_moneda">
                                                                            Moneda</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2" id="divCboMoneda">
                                                                    <div class="control-group">
                                                                        <div class="controls" id="input_moneda">
                                                                            <select id="cbo_moneda" class="span12" data-placeholder="Moneda" disabled></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2" id="lbl_TC" style="display: none">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_valor_cambio">
                                                                            Tipo Cambio</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2" id="input_valor_cambio" style="display: none">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_valor_cambio" class="span12" disabled="disabled" type="text" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2" id="lbl_fec_vig" style="display: none">
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
                                                        </div>
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
                                                                            <input id="txt_base_imponible" class="span12" type="text" onkeypress=" return ValidaDecimales(event,this)" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_descuento">
                                                                            Descuento</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_descuento" class="span12" type="text" value="0" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_isc">
                                                                            ISC</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_isc" class="span12" type="text" value="0" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_subtotal">
                                                                            Subtotal</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_subtotal" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_impuesto">
                                                                            IGV (%)</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_impuesto" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_impuesto_calc">
                                                                            IGV (<span id="simbolo_moneda">S/.</span>)</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_impuesto_calc" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_ajuste">
                                                                            Ajuste</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_ajuste" class="span12" type="text" value="0" style="text-align:right;" onkeyup="this.value=solonumbef(this.value)"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_prec_total">
                                                                            Precio Total</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_prec_total" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_detraccion">
                                                                            Detracción</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_detraccion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_Percepcion">
                                                                            Percepción</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_Percepcion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_Retencion">
                                                                            Retención</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_Retencion" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span4"></div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_monto_total">
                                                                            Total a Pagar</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_monto_total" class="span12" type="text" disabled="disabled" style="text-align:right;"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3"></div>
                                                            </div>
                                                        </div>
                                                        <%--  <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span6"></div>
                                                                <div class="span6">
                                                                    <div class="control-group">
                                                                        <div class="controls" style="height: 30px;">
                                                                            <label class="control-label" for="chk_inc_igv" style="text-align: right">
                                                                                <input id="chk_inc_igv" type="checkbox" class="span12" style="opacity: 0;">
                                                                                Precios de ítemes incluyen IGV.
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>--%>
                                                        <div class="row-fluid">
                                                            <div class="span10"></div>
                                                            <div class="span2" style="border: 1px solid; padding: 12px;">
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <div class="control-group">
                                                                            <div class="controls">
                                                                                <label class="control-label" for="" style="text-align: left">
                                                                                    Items Incluyen
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <div class="control-group">
                                                                            <div class="controls">
                                                                                <label class="control-label" for="chk_inc_igv" style="text-align: left">
                                                                                    <input id="chk_inc_igv" type="checkbox" class="span12" style="opacity: 0;">
                                                                                    IGV
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <div class="control-group">
                                                                            <div class="controls">
                                                                                <label class="control-label" for="chk_inc_isc" style="text-align: left">
                                                                                    <input id="chk_inc_isc" type="checkbox" class="span12" style="opacity: 0;">
                                                                                    ISC
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span9"></div>
                                                                <div class="span3" style="height: 50px;">
                                                                    <a id="A2" class="span12 btn green" href="javascript:Calcular();"><i class=" icon-plus-sign"></i>&nbsp;CALCULAR</a>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="span12" id="p_DatCredito" style="margin-left: 0">
                                                <div class="portlet box red">
                                                    <div class="portlet-title">
                                                        <h4><i class="icon-money"></i>Datos Crédito</h4>
                                                    </div>
                                                    <div class="portlet-body">
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="cbo_modo_pago">Modo Pago</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span9">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <select id="cbo_modo_pago" class="span12" data-placeholder="Mod. Pag." disabled>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <%--<div class="span5">
                                                                    <div class="control-group">
                                                                        <button type="button" id="btnCuotasLibres" class="btn gray" style="font-size:12px;" disabled><i class="icon-cut"></i>&nbsp;Cuotas Libres</button>
                                                                    </div>
                                                                </div>--%>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_plazo_pago">Plazo Pago</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls" style="height: 30px;">
                                                                            <label class="control-label" for="txt_plazo_pago" style="margin-top: -3px;">
                                                                                <input id="txt_plazo_pago" class="span6" type="text" disabled="disabled" value="0" style="text-align: center" /><span>&nbsp;días</span>
                                                                                <input type="hidden" id="txt_plazo_credito" />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span5">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <button type="button" id="A5" class="btn gray span12" style="font-size:12px;" disabled><i class="icon-book"></i>&nbsp;Letras Vinculadas</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <label class="span12 control-label" for="txt_fec_vencimiento">Fecha Venc.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_vencimiento" data-date-format="dd/mm/yyyy" disabled="disabled" style="text-align: center" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <label class="span12 control-label" for="txt_estado_credito">Estado</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="span12 centro" id="txt_estado_credito" disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span12" id="Div1" style="margin-left: 0">
                                                <div class="portlet box yellow">
                                                    <div class="portlet-title">
                                                        <h4><i class="icon-money"></i>Tributaciones</h4>
                                                    </div>
                                                    <div class="portlet-body">
                                                        <div class="row-fluid">
                                                            <div class="span12" style="margin-left: 0">
                                                                <div class="span6">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="radio">
                                                                                <div class="radio disabled">
                                                                                    <span>
                                                                                        <input type="checkbox" style="opacity: 0;" id="chk_detraccion" />
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
                                                                            <span id="lblSimbolo" class="span3">S/.</span>&nbsp;<input id="txt_monto_detraccion" class="numeros span9" type="text" disabled style="text-align: center" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12" style="margin-left: 0">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_num_op_detrac">Nro. Dep.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input id="txt_num_op_detrac" class="numeros span12" type="text" disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12" style="margin-left: 0">
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_fec_comp_detrac">Emisión</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_detrac" data-date-format="dd/mm/yyyy" style="text-align: center" disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row-fluid">
                                                            <div class="span12">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <label class="control-label" for="txt_cta_detrac">Cta. Detrac.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="span9">
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
                                                                                        <input type="checkbox" style="opacity: 0;" id="chk_percepcion" />
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
                                                                            <input type="text" class="span7 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_percep" data-date-format="dd/mm/yyyy" style="text-align: center" disabled />
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
                                                                            <label class="control-label span5" for="txt_num_comp_reten">N. Comp.</label>
                                                                            <input id="txt_num_comp_reten" class="numeros span7" type="text" disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span6">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label span4" for="txt_fec_comp_reten">Fecha</label>
                                                                            <input type="text" class="span8 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_comp_reten" data-date-format="dd/mm/yyyy" style="text-align: center" disabled />
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
                                </div>

                                <div class="form-actions" id="acciones_generales" style="margin-bottom: 0px">
                                    <a id="grabar" class="btn blue" href="javascript:GrabarDctoCompra();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                            <!-- FIN DE GENERALES-->

                            <!-- INICIO DEL TAB DETALLE MOV-->
                            <div class="tab-pane" id="detalle_compra">
                                <div class="row-fluid" id="form_add_prod">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumDctoComp_Det">N° Dcto Compra.</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumDctoComp_Det" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumSec_det">Secuencia</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumSec_det" value="1" class="span12" disabled="disabled" type="text" style="text-align: center" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_empresa_desc">Empresa</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtcod_empresa" disabled="disabled" type="hidden" />
                                                        <input id="txt_empresa_desc" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_num_ord_compra_det">N° Ord. Compra.</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txt_num_ord_compra_det" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtNumSec_det_2">
                                                        Secuencia</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtNumSec_det_2" value="1" class="span12" disabled="disabled" type="text" style="text-align: center" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_sucursal_desc">Establecimiento</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtcod_sucursal" type="hidden" />
                                                        <input id="txt_sucursal_desc" class="span12" disabled="disabled" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_cod_a_producto">Producto</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls" id="input_cod_prod">
                                                        <input id="txt_cod_producto" type="hidden" />
                                                        <input id="txt_cod_a_producto" class="span12" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls" id="input_desc_prod">
                                                        <input id="txt_desc_producto" class="span12" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div id="divBotonesProd" style="display: inline-block">
                                                    <button class="btn tooltips purple" type="button" id="btnActualizarProductos" data-original-title="Actualizar lista de productos"><i class="icon-refresh" style="line-height: initial"></i></button>
                                                </div>
                                                <a class="btn tooltips green" href="?f=NMMPROD" target="_blank" data-original-title="Crear producto nuevo"><i class="icon-plus" style="line-height: initial"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_cantidad">Cantidad</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txt_cantidad" class="numeros span12" type="text" onkeypress="return ValidaDecimales(event,this)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_und_medida" style="text-align: right">U.M.</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cbo_und_medida" class="span12" data-placeholder="Und. Medida" disabled="disabled">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_descuento_det" style="text-align: right">Descuento</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txt_descuento_det" class="span12" type="text" value="0" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_importe" style="text-align: right">Importe</label>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txt_importe" class="span12" type="text" onkeypress=" return ValidaDecimales(event,this)" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_glosa">
                                                        Glosa</label>
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <textarea id="txt_glosa_det" class="span11"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span6"></div>
                                            <div class="span6">
                                                <div class="span6"></div>
                                                <div class="span6" id="div_btn_add_prods" style="display: none;">
                                                    <a id="A1" class="btn blue" href="javascript:AddProdDet();"><i class=" icon-plus-sign"></i>&nbsp;Agregar</a>
                                                    <a class="btn" href="javascript:CancelarDet();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid"></div>
                                <p></p>
                                <p></p>
                                <br />
                                <div class="row-fluid">
                                    <div class="span12" id="div_tabla_det"></div>
                                </div>
                                <br />
                                <br />
                                <p></p>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="span1"></div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <h1>
                                                    <label class="control-label" for="txt_glosa" style="font-family: monospace;">
                                                        <b>IMPORTE TOTAL : &nbsp;&nbsp;&nbsp;  </b>
                                                    </label>
                                                </h1>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <h1>
                                                    <label id="lbl_monto_total" class="control-label" for="txt_glosa" style="font-family: monospace; color: blue;">
                                                        <b>S/ . 0.00</b>
                                                    </label>
                                                </h1>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <h1>
                                                    <label class="control-label" for="txt_glosa" style="font-family: monospace;">
                                                        <b>IMPORTE ACTUAL : &nbsp;&nbsp;&nbsp;  </b>
                                                    </label>
                                                </h1>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <h1>
                                                    <label id="lbl_monto_actual" class="control-label" for="txt_glosa" style="font-family: monospace; color: blue;">
                                                        <b>S/ . 0.00</b>
                                                    </label>
                                                </h1>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <div class="control-group">
                                                <h1>
                                                    <label id="msg_balanceo" class="control-label" for="txt_glosa" style="font-family: monospace; color: red;">
                                                        <b>NO BALANCEADO</b>
                                                    </label>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p></p>
                                <p></p>
                                <br />
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="span6"></div>
                                        <div class="span6">
                                            <div class="span6"></div>
                                            <div class="span6" id="div_btn_completar" style="display: none;">
                                                <%--<a id="A3" class="btn green" href="javascript:CompletarDcto();"><i class=" icon-plus-sign"></i>&nbsp;Completar</a>--%>
                                                <a id="A3" class="btn green"><i class=" icon-plus-sign"></i>&nbsp;Completar</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- FIN DE DETALLE MOV-->

                            <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                            <div class="tab-pane" id="asientos_contables">                                          
                                
                            </div>
                            <!-- FIN DE ASUENTOS CONTABLES-->

                            <!-- FIN DE LOS TABS-->
                        </div>
                        <!-- FIN DEL CUERPO DE LA FORMA-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
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
                            <th style="text-align: center">PROVEEDOR</th>
                            <th style="text-align: center">TOTAL <span id="sMOBA"></span></th>
                            <th style="text-align: center">TOTAL <span id="sMOAL"></span></th>
                            <th style="text-align: center">DETRACCION</th>
                            <th style="text-align: center">DETRACCION_ALTERNO</th>
                            <th style="text-align: center">PERCEPCION</th>
                            <th style="text-align: center">PERCEPCION_ALTERNO</th>
                            <th style="text-align: center">RETENCION</th>
                            <th style="text-align: center">RETENCION_ALTERNO</th>
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


<div id="mapaModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 45%;" aria-hidden="true">
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

<div id="divLetras" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%;" aria-hidden="true">
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

<div id="divCouta" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 45%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #00839A; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divCouta_title"><i class="icon-book" style="line-height: initial;"></i>&nbsp;CUOTAS LIBRES POR <span id="monto"></span></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span4">
                <label for="txtnumdoc">Numero de Cuotas</label>
            </div>
            <div class="span2">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtNroCoutas" />
                    </div>
                </div>
            </div>
            <div class="span1">
                
            </div>
            <div class="span3">
                <label for="txtnumdoc">Letras Fijas</label>
            </div>

            <div class="span1">
                <div class="control-group">
                    <div class="controls">
                        <input type="checkbox" id="chkCuotasLibres" />
                    </div>
                </div>
            </div>

            <div class="span3">
                <span id="txtBalanceadoLetras2" style="text-align:center;font-weight:bold;"></span>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span4">
                <label for="txtnumdoc">Periodo Cuota</label>
            </div>
            <div class="span2">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtPeriodoCouta" />
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
        </div>

        <div class="row-fluid" style="padding-top: 1px; border-top: solid #e5e5e5 2px;">
            <div class="span12" id="divCouta_body">
                <table class="table table-hover" id="tblCoutas">
                    <thead>
                        <tr>
                            <th style="text-align: center">LETRA</th>
                            <th style="text-align: center">NRO DIAS</th>
                            <th style="text-align: center">FECHA</th>                            
                            <th style="text-align: center">MONTO</th>                            
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button data-dismiss="modal" type="button" id="divCouta_btnaceptar" class="btn blue">Aceptar</button>
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
                <label for="txtnumdoc">Fecha Giro</label>
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
                        <input type="text" class="span10" id="txtFechaRegistro" style="text-align: center" data-date-format="dd/mm/yyyy" disabled = "disabled"/>
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
            <div class="span1">
                
            </div>

            <div class="span2">
                <label for="txtnumdoc">Periodo Cuota</label>
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
                            <th style="text-align: center">LETRA</th>                            
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

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />
<input id="hfCOD_PROD" type="hidden" />
<input id="hfPROD_ALMACENABLE" type="hidden" />
<input id="hfCOD_EMPRESA" type="hidden" />
<input id="hf_DESC_EMP" type="hidden" />
<input id="hfCOD_SCSL" type="hidden" />
<input id="hfDESC_SCSL" type="hidden" />
<input id="hfMONTO_TOTAL" type="hidden" />
<input id="hfIGV_IND" type="hidden" />
<input id="hfBalanceo" type="hidden" />
<input id="hfMONTO_ACTUAL" type="hidden" value="0.00" />
<input id="hfporcentaje_detraccion" type="hidden" value="0.00" />
<input id="hfIMPUESTO" type="hidden" value="0.00" />

<input id="hfvalor_periodo_carga" type="hidden" value="" />
<%--<input id="hfind_modif" type="hidden" value="0" />--%>
<%--<input id="hfmonto_detraccion" type="hidden" value="0.00"/>--%>

<div id="muestralistap" style="width: 700px; display: none;" role="dialog" class="modal fade" tabindex="-1" aria-hidden="true" aria-labelledby="myModalLabel">
    <%--role="dialog" class="modal fade" tabindex="-1"  aria-hidden="true" aria-labelledby="myModalLabel">--%>

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

<div id="modal-confirmar" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" onclick="javascript:$('#modal-confirmar').modal('hide');$('#modalPlantilla').modal('show');" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="tituloModal">&nbsp;CONFIRMAR COMPLETAR</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p>
                    <span id="lblMensajeConfirmar">NO se tomará en cuenta a menos que modifique el documento en la pestaña "Datos Generales".</span><br />
                    <br />
                    ¿Desea Continuar?
                </p>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span11 offset1">
                <div class="span3"></div>
                <div class="span3">
                    <a class="btn blue" href="javascript:ConfirmarModificacion();"><i class="icon-pencil"></i>Modificar</a>
                </div>


                <div class="span3">
                    <a id="btnCancelar" href="javascript:$('#modal-confirmar').modal('hide');" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- VENTANAS MODALES-->
<div id="modal-habido" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4>Condición Proveedor</h4>
    </div>
    <div class="modal-body" id="divConsultaHabido">
        <div >
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
                    <button class="btn blue" type="button" id="btnActualizarDS"><i class="icon-refresh"></i>&nbsp;Cambiar datos Contribuyente</button>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script type="text/javascript" src="../vistas/NO/js/NOMDOCC.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMDOCC.init();
    });


</script>
