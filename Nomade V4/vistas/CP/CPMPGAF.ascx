<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMPGAF.ascx.vb" Inherits="vistas_CP_CPMPGAF" %>

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
    .sTotal {
        color:green;
        font-weight:600;    
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PAGO AFP</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=CPMPGAF" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CPLPGAF" class="btn red"><i class="icon-list"></i>Listar</a>

                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">

                        <label>Empresa</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1" align="right">

                        <label>AFP</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="sclAfp" class="limpiar combo m-wrap span12 required" name="sclAfp" data-placeholder="Seleccionar Afp" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <label>Fecha de Pago</label>

                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaPago" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

             <%--       <div class="span1">

                        <label>Tipo de Cambio</label>

                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtTC" type="text" class="span12" data-placeholder="TC" disabled="disabled" style="text-align: right;" />
                            </div>
                        </div>
                    </div>--%>


                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button type="button" class="btn blue span6 refreshData"><i class="icon-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1">
                            <thead>
                                <tr>
                                    <th>MODULO</th>
                                    <th>FECHA</th>
                                    <th>NRO DE PLANILLA</th>
                                    <th>PERIODO</th>
                                    <th>DESCRIPCION</th>
                                    <th>MONTO(S/.)</th>                         
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
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;    cursor: -webkit-grab;">
        <button type="button" class="btnexit btn red" data-dismiss="modal" aria-hidden="true" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="myModalLabel"><i class="icon-money"></i>&nbsp;Pagar <span id="PgDvDesc"></span></h4>
    </div>
    <div class="modal-body" id="mensajemodal" style="max-height: 600px;">

        <div class="span12">
            <div class="row-fluid">

                <div class="span3">
                    <div class="control-group">
                        <div class="controls">
                            <label><b>Monto a Pagar</b></label>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on" style="background-color: #9A0101; color: white;">S/.</span><input class="m-wrap span10" id="txtMontoAPagarMOBA" type="text">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-prepend">
                                <span class="add-on" style="background-color: #2822BF; color: white;">US$</span><input class="m-wrap span10" id="txtMontoAPagarMOAL" type="text">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
            <div class="row-fluid">
                <div class="span3">

                    <label>Origen de Pago</label>

                </div>
                <div class="span9">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE PAGO">
                                <option></option>
                                <option value="Caja">CAJA</option>
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
                <div class="span9">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbDestino" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled">
                                <option></option>
                            </select>
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
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cbo_moneda" class="span12 obligatorio" data-placeholder="MONEDA" disabled="disabled">
                                <option></option>
                            </select>
                        </div>
                    </div>
                
                </div>
                <div class="span5">
                    <div class="control-group ">
                        <input type="checkbox" class="span12" id="chkInteres"/>&nbsp;Interés Moratorio
                    </div>
                </div>
            </div>

            <div class="row-fluid" style="display: none;" id="divMontoInteres">
                <div class="span3">
                    <div class="control-group ">
                        <label id="lblMontoInteres">Monto Interés</label>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" id="txtMontoInteres" style="text-align: right" class="span12"/>
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
                            <input type="text" id="txtMonto" style="text-align: right" class="span12" disabled="disabled" />
                        </div>
                    </div>
                </div>
            </div>



        </div>

    </div>
    <div class="modal-footer">
        <button id="btnGrabar" type="button" class="btn blue"><i class="icon-legal"></i>Pagar</button>
        <button type="button" data-dismiss="modal" class="btn btnexit">Cancelar</button>
    </div>
</div>



<script type="text/javascript" src="../vistas/CP/js/CPMPGAF.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPMPGAF.init();
    });
</script>
