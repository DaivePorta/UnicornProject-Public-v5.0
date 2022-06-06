<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMCDCO.ascx.vb" Inherits="vistas_CT_CTMCDCO" %>

<div class="row-fluid" id="contenedor">
    <%--<asp:HiddenField ID="hdfMontoMuestra" runat="server" />--%>
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION DE CUENTAS CONTABLES</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black btnImprimir" href="javascript:ImprimirDctoVenta();" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a class="btn green" onclick="javascript:NuevaVenta();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=CTMLDCO"><i class="icon-list"></i>&nbsp;Listar</a>--%>
                </div>
                <div style="clear: both"></div>
            </div>

        </div>
    </div>
     <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
        <!-- TITULO DE LOS TABS-->
        <ul class="nav nav-tabs">
            <li id="liCompras" class="active"><a id="tabCompras" href="#Compras" data-toggle="tab"><i class=""></i>COMPRAS</a></li>
            <li id="liVentas"><a class="advance_form_with_chosen_element" id="tabVentas" href="#Ventas" data-toggle="tab"><i class=""></i>VENTAS</a></li>
            <li id="liAnticipos"><a class="advance_form_with_chosen_element" id="tabAnticipos" href="#Anticipos" data-toggle="tab"><i class=""></i>ANTICIPOS</a></li>
            <li id="liCobro"><a class="advance_form_with_chosen_element" id="tabCobro" href="#Cobro" data-toggle="tab" style="display: none"><i class=""></i>COBRO</a></li>
            <li id="liPago"><a class="advance_form_with_chosen_element" id="tabPago" href="#Pago" data-toggle="tab" style="display: none"><i class=""></i>PAGO</a></li>
            <li id="liPagoDiverso"><a class="advance_form_with_chosen_element" id="tabPagoDiverso" href="#PagoDiverso" data-toggle="tab" style="display: none"><i class=""></i>PAGO DIVERSO</a></li>
            <li id="liPagoAsignaciones"><a class="advance_form_with_chosen_element" id="tabPagoAsignaciones" href="#PagoAsignaciones" data-toggle="tab" style="display: none"><i class=""></i>PAGO ASIGNACIONES</a></li>


        </ul>
        <div class="tab-content">
            <!-- PANEL DE DÍNAMICA DE COMPRAS-->
            <div class="tab-pane active" id="Compras">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaCompras" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebe2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaber2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Compra MN</td>
                                    <td>
                                        <span id="cbo_cuentaCompraMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCompraMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebe3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaber3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Compra ME</td>
                                    <td>
                                        <span id="cbo_cuentaCompraME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCompraME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebe4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaber4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Compra Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaCompraRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCompraRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebe5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaber5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Compra Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaCompraRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCompraRelME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebe6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaber6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- PANEL DE DÍNAMICA DE VENTAS-->
            <div class="tab-pane" id="Ventas">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaVentas" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_venta_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv_venta" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebev2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberv2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Venta MN</td>
                                    <td>
                                        <span id="cbo_cuentaVentaMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaVentaMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebev3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberv3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Venta ME</td>
                                    <td>
                                        <span id="cbo_cuentaVentaME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaVentaME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebev4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberv4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Venta Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaVentaRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaVentaRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebev5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberv5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Venta Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaVentaRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaVentaRelME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebev6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberv6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <!-- PANEL DE DÍNAMICA DE VENTAS-->
            <div class="tab-pane" id="Anticipos">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaAnticipos" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>Recepción de Anticipos</td>
                                    <td>
                                        <span id="cbo_cuentaAnticipo_recepcion_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaAnticipo_recepcion" class="cuentas span12" data-placeholder="Cuentas recepción de anticipos"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebea2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHabera2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Aplicación de Anticipos</td>
                                    <td>
                                        <span id="cbo_cuentaAnticipo_aplicacion_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaAnticipo_aplicacion" class="cuentas span12" data-placeholder="Cuentas apliación de anticipos"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebea3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHabera3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- PANEL DE DÍNAMICA DE COBRO-->
            <div class="tab-pane" id="Cobro" style="display: none">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaCobro" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_Cobro_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv_Cobro" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeC2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberC2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Cobro MN</td>
                                    <td>
                                        <span id="cbo_cuentaCobroMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCobroMN" class="cuentas span12" data-placeholder="Cuentas Documento Cobro MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeC3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberC3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Cobro ME</td>
                                    <td>
                                        <span id="cbo_cuentaCobroME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCobroME" class="cuentas span12" data-placeholder="Cuentas Documento Cobro MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeC4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberC4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Cobro Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaCobroRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCobroRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Cobro MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeC5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberC5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Cobro Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaCobroRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaCobroRelME" class="cuentas span12" data-placeholder="Cuentas Documento Cobro MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeC6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberC6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- PANEL DE DÍNAMICA DE PAGO-->
            <div class="tab-pane" id="Pago" style="display: none">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaPago" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_Pago_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv_Pago" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeP2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberP2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeP3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberP3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoME" class="cuentas span12" data-placeholder="Cuentas Documento Pago MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeP4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberP4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeP5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberP5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoRelME" class="cuentas span12" data-placeholder="Cuentas Documento Pago MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebeP6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberP6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- PANEL DE DÍNAMICA DE PAGO DIVERSO-->
            <div class="tab-pane" id="PagoDiverso" style="display: none">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaPagoDiverso" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_PagoDiverso_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv_PagoDiverso" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePD2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPD2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Diverso MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoDiversoMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoDiversoMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago Diverso MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePD3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPD3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Diverso ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoDiversoME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoDiversoME" class="cuentas span12" data-placeholder="Cuentas Documento Pago Diverso MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePD4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPD4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Diverso Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoDiversoRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoDiversoRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago Diverso MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePD5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPD5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Diverso Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoDiversoRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoDiversoRelME" class="cuentas span12" data-placeholder="Cuentas Documento Pago Diverso MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePD6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPD6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- PANEL DE DÍNAMICA DE PAGO ASIGNACIONES-->
            <div class="tab-pane" id="PagoAsignaciones" style="display: none">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbldinamicaPagoAsignaciones" class="table table-bordered">
                            <thead>
                                <tr>
                                    <td style="text-align: center"></td>
                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                    <td style="text-align: center">Debe</td>
                                    <td style="text-align: center">Haber</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>IGV</td>
                                    <td>
                                        <span id="cbo_cuentaIgv_PagoAsignaciones_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaIgv_PagoAsignaciones" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePA2" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPA2" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Asignaciones MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoAsignacionesMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoAsignacionesMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago Asignaciones MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePA3" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPA3" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Asignaciones ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoAsignacionesME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoAsignacionesME" class="cuentas span12" data-placeholder="Cuentas Documento Pago Asignaciones MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePA4" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPA4" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Asignaciones Relac. MN</td>
                                    <td>
                                        <span id="cbo_cuentaPagoAsignacionesRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoAsignacionesRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Pago Asignaciones MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePA5" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPA5" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Doc. Pago Asignaciones Relac. ME</td>
                                    <td>
                                        <span id="cbo_cuentaPagoAsignacionesRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                    </td>
                                    <td>
                                        <select id="cbo_cuentaPagoAsignacionesRelME" class="cuentas span12" data-placeholder="Cuentas Documento Pago Asignaciones MN"></select>
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxDebePA6" type="checkbox" style="opacity: 0;">
                                    </td>
                                    <td style="text-align: center">
                                        <input id="chxHaberPA6" type="checkbox" style="opacity: 0;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <input type="button" id="btn_grabar" class="btn green" onclick="GrabarDatos();" value="Guardar" />

</div>







<script src="vistas/CT/js/CTMCDCO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMCDCO.init();
    });
</script>
