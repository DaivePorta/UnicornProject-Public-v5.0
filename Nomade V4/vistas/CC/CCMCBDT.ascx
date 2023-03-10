<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMCBDT.ascx.vb" Inherits="vistas_CC_CCMCBDT" %>

<style>
    .modal-backdrop, .modal-backdrop.fade.in {
        opacity: .5;
        filter: alpha(opacity=80);
    }

    .Azul {
        background-color: #2822BF!important;
        border-color: #2822BF!important;
        color: white!important;
    }

    .Rojo {
        background-color: #9A0101!important;
        border-color: #9A0101!important;
        color: white!important;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DETRACCIONES A COBRAR</h4>
                <div class="actions">
                    <a style="margin-top: -10px;" class="btn black printlist "><i class="icon-print"></i>Imprimir</a>

                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">

                        <label>Empresa</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <label>Estado</label>

                    </div>
                    <div class="span2"> <%--DPORTA 25/02/2021--%>
                        <div class="control-group">
                            <div class="controls" id="div_Estado">
                                <select id="cboAutoDetra" class="span12"  data-placeholder="OPC." tabindex="-1" title="" style="display: inline;">
                                    <option value="">TODOS</option>
                                    <option value="S">AUTODETRACCIÓN</option>
                                    <option value="N">POR COBRAR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <label>Fecha de Pago</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaPago" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_filtrar" type="button" class="b btn blue span6"><i class="icon-search"></i>&nbsp;Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtRuc">Cliente</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtrazsocial" class="span11" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4" align="center">
                        <span>Importe Detracciones</span>
                        <span id="TotalDetra" style="font-weight:bold;"></span>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1">
                            <thead>
                                <tr>

                                    <th>CODIGO</th>
                                    <th>TIPO DOC</th>
                                    <th>NUMERO DOC</th>
                                    <th>MONTO</th>
                                    <th>FECHA EMISION</th>
                                    <th>ESTADO</th>
                                    <th>RUC</th>
                                    <th>CLIENTE</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="objJSON" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modalPagar" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btnexit btn red" data-dismiss="modal" aria-hidden="true" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="myModalLabel"><i class="icon-money"></i>Cobrar Detracción <span id="PgDvDesc"></span></h4>
    </div>
    <div class="modal-body" id="mensajemodal">

        <div class="span12">
            <div class="row-fluid">

                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <label><b>Monto a Cobrar</b></label>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on" style="background-color: #9A0101; color: white;" id="simbMone"></span>
                                <input class="m-wrap span10" id="txtMontoAPagar" type="text">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
            <div class="row-fluid">
                <div class="span3">

                    <label>Origen de Cobro</label>

                </div>
                <div class="span9">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE PAGO">
                                <option></option>

                                <option value="Banco">BANCO</option>

                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span3">

                    <label id="lbl_detalle1">-</label>

                </div>
                <div class="span7 div_origen">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_Det_Origen" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                <option></option>
                            </select>
                            <i id="iconDetSaldo" title="Click Para Mostrar/Ocultar Saldo Disponible" class="icon-circle-arrow-down" style="padding: 3px; position: absolute; cursor: pointer; color: #23779B; font-size: large;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span3">

                    <label id="lbl_detalle2">Medio de Pago</label>

                </div>
                <div class="span9">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cboMedioPago" disabled="disabled" class="span12 obligatorio" data-placeholder="MEDIO DE PAGO">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span3">

                    <label id="lbl_detalle3">Destino</label>

                </div>
                <div class="span9 div_destino">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbDestino" class="span10 obligatorio" data-placeholder="ORIGEN" disabled="disabled">
                                <option></option>
                            </select>
                            <i id="iconDetSaldo2" title="Click Para Mostrar/Ocultar Saldo Disponible" class="icon-circle-arrow-down" style="padding: 3px; position: absolute; cursor: pointer; color: #23779B; font-size: large;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span3">

                    <label id="lbl_detalle4">-</label>

                </div>
                <div class="span8">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" id="txtNroOpe" class="obligatorio span12" disabled="disabled" />

                        </div>
                    </div>
                </div>
                <div class="span1 mPersona" style="display: none;">
                    <i class="icon-plus" style="position: absolute; cursor: pointer; color: black;" onclick="javascript: nuevapersona();"></i>
                    <br>
                    <i class="icon-search buscaPersona" id="buscaPersona" style="cursor: pointer; color: black;"></i>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span3">
                    <div class="control-group ">
                        <label>Moneda</label>
                    </div>
                </div>
                <div class="span5">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_moneda" class="span12 obligatorio" data-placeholder="MONEDA" disabled="disabled">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid" style="display: none;">
                <div class="span3">
                    <div class="control-group ">
                        <label id="lblmonto">Monto</label>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" id="txtMonto" style="text-align: right" class="span12 obligatorio" disabled="disabled" />
                        </div>
                    </div>
                </div>
            </div>



        </div>

    </div>
    <div class="modal-footer">
        <button id="btnGrabar" type="button" class="btn blue"><i class="icon-legal"></i>&nbsp;Cobrar</button>
        <button type="button" data-dismiss="modal" class="btn btnexit">Cancelar</button>
    </div>
</div>



<script type="text/javascript" src="../vistas/CC/js/CCMCBDT.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCMCBDT.init();
    });
</script>
<input id="hfPIDM" type="hidden" />
