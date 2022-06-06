<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMPGDT.ascx.vb" Inherits="vistas_CP_CPMPGDT" %>


<style type="text/css">
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

<div id="divConfirmacion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H2">CONFIRMAR DATOS DE PAGO</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span3">

                <label>Fecha de Pago</label>

            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" id ="MtxtFecha" placeholder="dd/mm/yyyy" class="span12" data-date-format="dd/mm/yyyy"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span3">

                <label>Origen de Pago</label>

            </div>
            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select id="Mcbo_OrigenPago" disabled="disabled" aria-disabled="true" class="span6" data-placeholder="ORIGEN DE PAGO" disabled="disabled">
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

                <label id="Mlbl_detalle1">-</label>

            </div>
            <div class="span8 div_origenM">
                <div class="control-group">
                    <div class="controls">
                        <select id="Mcbo_Det_Origen" class="span12" data-placeholder="-" disabled="disabled">
                            <option></option>
                        </select>
                        <i id="MiconDetSaldo" title="Click Para Mostrar/Ocultar Saldo Disponible" class="icon-circle-arrow-down" style="padding: 3px; position: absolute; cursor: pointer; color: #23779B; font-size: large;"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span3">

                <label id="Label1">N° Operación</label>

            </div>
            <div class="span8">
                <div class="control-group" id="div1">
                    <div class="controls">
                        <input type="text" id="MtxtNroOpe" class="span6"/>

                    </div>                    
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer">

        <button type="button" id="btn_completar" onclick="javascript:completar();" class="btn blue"><i class="icon-ok"></i>&nbsp;
            Completar 
        </button>
        <button class="btn  " type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>



<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PAGO DE DETRACCIONES</h4>
                <div class="actions">

                    <a href="?f=CPMPGDT" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <%--  <a href="?f=CPLPGPR" class="btn red"><i class="icon-list"></i> Listar</a>  --%>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid master">
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


                    <div class="span2">
                        <input type="radio" name="pago" class="pago span12" value="S" />Detracciones Pagadas
                    </div>
                    <div class="span2">
                        <input type="radio" name="pago" class="pago span12" value="N" checked="checked" />Detracciones por Pagar
                    </div>
                    <div class="span2">
                        <input type="radio" name="pago" class="pago span12" value="P" />Pagos por Completar
                    </div>



                </div>
                <div class="row-fluid pPagar">

                    <div class="span1">

                        <label>Monto a Pagar</label>

                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" monto="0.00" value="S/. 0.00" class="span10 monto_sele obligatorio" placeholder="Monto" id="txt_monto_base" disabled="disabled" />
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
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px; margin-top: 10px;"></div>


                <div class="row-fluid">

                    <div class="span7" id="div_body">
                        <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr align="center">

                                    <th>Tipo Doc.</th>
                                    <th>Documento</th>
                                    <th>Tipo Bien/Servicio</th>
                                    <th>Fecha</th>
                                    <th>Fecha Pago</th>
                                    <th>Deuda</th>
                                    <th>Proveedor</th>
                                    <th>Lote</th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>

                    </div>
                    <div class="span7" id="div_body2" style="display: none; margin-left: 0px!important;">
                        <table id="tblBandeja2" cellspacing="0" class="display DTTT_selectable" border="0">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr align="center">
                                    <th></th>
                                    <th>Número de Lote</th>
                                    <th>Medio de Pago</th>
                                    <th>Origen</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>
                    </div>

                    <div class="span5" id="form_medioPago">
                        <div class="row-fluid">
                            <div class="span3">

                                <label>Origen de Pago</label>

                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE PAGO" disabled="disabled">
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
                            <div class="span8 div_origen">
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
                            <div class="span8">
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
                            <div class="span8">
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
                                <div class="control-group" id="div_nope">
                                    <div class="controls">
                                        <input type="text" id="txtNroOpe" class="obligatorio span12" disabled="disabled" />

                                    </div>
                                    <p class='infopm' style='color: #23779B; display: none;'>Escribir los numeros de operación separados por coma.</p>
                                </div>
                            </div>
                            <div class="span1 mPersona" style="display: none;">
                                <i class="icon-plus" style="position: absolute; cursor: pointer; color: black;" onclick="javascript: nuevapersona();"></i>
                                <br>
                                <i class="icon-search buscaPersona" id="buscaPersona" style="cursor: pointer; color: black;"></i>
                            </div>
                        </div>

                        <div class="row-fluid" id="divMoneda">
                            <div class="span3">
                                <div class="control-group ">
                                    <label>Moneda</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cbo_moneda" class="span12 obligatorio moneda activo" data-placeholder="MONEDA" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group ">
                                    <label id="lblmonto">Monto</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtMonto" style="text-align: right" class="span12 obligatorio" disabled="disabled" monto="0" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="form-actions">

                            <%-- <input type="checkbox" id="chkArchSunat"  />&nbsp;Con Archivo Depósitos Masivos *--%>


                            <button id="btnGrabar" type="button" class="btn blue pull-right"><i class="icon-legal"></i>Pagar</button>

                        </div>
                    </div>

                </div>

            </div>

            <div class="portlet-footer" style="text-align: right; padding-right: 5px;"><small style="color: white;">* Para generar archivo de Pago Múltiple con medio de pago que <b>NO</b> sea transferencia (por Internet) realizar <b>10</b> pagos a la vez como mínimo.</small></div>
        </div>
    </div>
</div>




<input type="hidden" id="moneda_principal" value="" />
<input type="hidden" id="moneda_secundaria" value="" />
<input type="hidden" id="auxiliar" value="" />
<script type="text/javascript" src="../vistas/CP/js/CPMPGDT.js"></script>


<script>

    jQuery(document).ready(function () {
        CPMPGDT.init();
    });
</script>

