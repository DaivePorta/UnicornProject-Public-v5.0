<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMDIFE.ascx.vb" Inherits="vistas_CA_CAMDIFE" %>
<style>
    input[type="radio"] {
        margin-left:0px !important;
    }   
    .tCaja:hover {     
        transition: all 0.2s ease-in-out;  
        cursor:pointer;
        font-size:1.1em;
       color:#0066AA !important;
    }
    .tCuenta:hover {          
        transition: all 0.2s ease-in-out;  
        cursor:pointer;       
        font-size:1.1em;
        color:#00AA66 !important;
    }
   
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DIFERIR EFECTIVO DE CAJA</h4>
                <div class="actions">
                    <a class="btn red" href="?f=caldife" style="margin-top:-10px;"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                  
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                      <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCaja">
                                Caja</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboCaja" class="m-wrap span12" data-placeholder="Caja"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue pull-left">REFRESCAR</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divDiferirEfectivo" style="display:none;">

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="row-fluid">
                                <div class="span2 offset1">
                                    <h5><span id="lblCajaSeleccionada"></span><br /><small id="lblCajaSeleccionadaTipo" style="font-style:italic;"></small></h5>
                                </div>
                                <div class="span2">
                                    <h4>Total Caja</h4>
                                </div>
                                <div class="span2">
                                    <h4>Monto</h4>
                                </div>
                                <div class="span2">
                                    <h4>Tipo Destino</h4>
                                </div>
                                <div class="span2">
                                    <h4>Destino</h4>
                                </div>
                            </div>
                            <hr />
                            <div class="row-fluid">
                                <div class="span2 offset1">
                                    <div class="control-group">
                                        <label class="control-label" for="chkMoba">
                                            <input type="checkbox" id="chkMoba" name="chkMoba" />
                                            Efectivo&nbsp;<span class="descMoba"></span></label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <span class="simboloMoba"></span>&nbsp;
                                    <span id="txtTotalCajaMoba"></span>
                                    <p class="tCaja" style="color:#cbcbcb;margin-top:0px;margin-bottom:0px;" title="Monto en transferencias a Caja">
                                        <small>T. Caja: </small><small  id="txtTransferenciaMobaCaja">-</small></p>
                                    <p class="tCuenta" style="color:#cbcbcb;margin-top:0px;margin-bottom:0px;" title="Monto en transferencias a Cuenta">
                                        <small>T. Cuenta: </small><small id="txtTransferenciaMobaCuenta">-</small></p>
                                    
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtMontoMoba" onkeypress="return ValidaDecimales(event,this,2)" onkeyup="ValidaMontoMoba(this.value)" value="0" class="numeros span12" type="text" disabled="disabled"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="controls">
                                                <label class="radio">
                                                    <div class="radio">
                                                        <span>
                                                            <input type="radio" name="rbTipoDestinoMoba" value="C" checked="checked" style="opacity: 0;" id="rbCajaMoba"  disabled="disabled" />
                                                        </span>
                                                    </div>
                                                    Caja
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="controls">
                                                <label class="radio">
                                                    <div class="radio">
                                                        <span>
                                                            <input type="radio" name="rbTipoDestinoMoba" value="U" style="opacity: 0;" id="rbCuentaMoba"  disabled="disabled"/>
                                                        </span>
                                                    </div>
                                                    Cuenta Bancaria
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span3" id="divDestinoMoba">
                                    <div class="control-group ">
                                        <div class="controls">
                                            <select id="cboDestinoMoba" class="m-wrap span12" data-placeholder="Caja"  disabled="disabled"></select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr />
                            <div class="row-fluid">
                                <div class="span2 offset1">
                                    <div class="control-group">
                                        <label class="control-label" for="chkMoal">
                                            <input type="checkbox" id="chkMoal" name="chkMoal" />
                                            Efectivo&nbsp;<span class="descMoal"></span></label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <span class="simboloMoal"></span>&nbsp;
                                    <span id="txtTotalCajaMoal"></span>
                                    <p class="tCaja" style="color:#cbcbcb;margin-top:0px;margin-bottom:0px;" title="Monto en transferencias a Caja">
                                        <small>T. Caja: </small><small  id="txtTransferenciaMoalCaja">-</small></p>
                                    <p class="tCuenta" style="color:#cbcbcb;margin-top:0px;margin-bottom:0px;" title="Monto en transferencias a Cuenta">
                                        <small>T. Cuenta: </small><small id="txtTransferenciaMoalCuenta">-</small></p>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtMontoMoal" onkeypress="return ValidaDecimales(event,this,2)" onkeyup="ValidaMontoMoal(this.value)" value="0" class="numeros span12" type="text" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="controls">
                                                <label class="radio">
                                                    <div class="radio">
                                                        <span>
                                                            <input type="radio" name="rbTipoDestinoMoal" value="C" checked="checked" style="opacity: 0;" id="rbCajaMoal" disabled="disabled" />
                                                        </span>
                                                    </div>
                                                    Caja
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="controls">
                                                <label class="radio">
                                                    <div class="radio">
                                                        <span>
                                                            <input type="radio" name="rbTipoDestinoMoal" value="U" style="opacity: 0;" id="rbCuentaMoal"  disabled="disabled" />
                                                        </span>
                                                    </div>
                                                    Cuenta Bancaria
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span3" id="divDestinoMoal">
                                    <div class="control-group ">
                                        <div class="controls">
                                            <select id="cboDestinoMoal" class="m-wrap span12" data-placeholder="Caja"  disabled="disabled"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid" style="margin-top: 15px;">
                                <!-- BUTTONS -->
                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <a id="btnCancelar" href="?f=CAMDIFE" class="btn pull-right" style="margin-left: 10px;"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                    <a id="btnGenerar" class="btn blue pull-right" style="margin-left: 10px;"><i class="icon-save"></i>&nbsp;Generar Transferencia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divAperturasCaja">
                    </div>
                     <div id="divMontosCaja">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMDIFE.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMDIFE.init();
    });
</script>
