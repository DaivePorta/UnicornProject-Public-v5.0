<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMCCUE.ascx.vb" Inherits="vistas_NB_NBMCCUE" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>MANTENIMIENTO CUENTA BANCARIA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nbmccue" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nblccue" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <!-- DATOS GENERALES -->
                    <div class="span7">
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="control-label" for="cboEmpresas">Empresa</label>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group ">
                                    <input id="chkEstado" type="checkbox" checked="checked" />
                                    Activo
                                </div>
                            </div>
                        </div>

                          <div id="divResponsables">
                            <div class="row-fluid" style="padding: 4px">
                                <div class="span2">
                                    <div class="control-group ">
                                        <label class="control-label">Responsable 1:</label>
                                    </div>
                                </div>
                                <div class="span8">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtResponsable1" style="text-align: center" type="text" class="span3" data-placeholder="Responsable" disabled="disabled" />
                                            <input id="txtResponsable1Desc" type="text" class="span9" data-placeholder="Responsable" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2" style="margin-left: 5px">
                                    <div class="control-group">
                                        <div class="controls" style="padding-top: 4px">
                                            <a onclick="CargarPersonasRes('1')" class="btn blue"><i class="icon-user"></i></a>
                                            <a id="btnAgregarDivResponsable" class="btn blue add"><i class="icon-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label" for="txtNroCuenta">Nro Cuenta</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtNroCuenta" class="span6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label" for="txtBanco">Banco</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtBanco" type="text" class="span12" data-placeholder="Banco" style="text-transform: uppercase" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label" for="cboTpoCuenta">Tipo Cuenta</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboTpoCuenta" class="span12" data-placeholder="Tipo de Cuenta"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group ">
                                    <label class="control-label" for="cboMoneda">Moneda</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboMoneda" class="span12" data-placeholder="Moneda" disabled="disabled"></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Cta Interbancaria</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtICS" type="text" class="span12" data-placeholder="Cta Interbancaria" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="divSectoristas">
                            <div class="row-fluid" style="padding: 4px">
                                <div class="span2">
                                    <div class="control-group ">
                                        <label class="control-label">Sectorista 1:</label>
                                    </div>
                                </div>
                                <div class="span8">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtSectorista1" style="text-align: center" type="text" class="span3" data-placeholder="Sectorista" disabled="disabled" />
                                            <input id="txtSectorista1Desc" type="text" class="span9" data-placeholder="Sectorista" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2" style="margin-left: 5px">
                                    <div class="control-group">
                                        <div class="controls" style="padding-top: 4px">
                                            <a onclick="CargarPersonasSec('1')" class="btn blue"><i class="icon-user"></i></a>
                                            <a id="btnAgregarDivSectorista" class="btn blue add"><i class="icon-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Fecha Apertura</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaInicial" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Fecha Cierre</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaFinal" data-date-format="dd/mm/yyyy" style="margin-left: -7px;" disabled="disabled" />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Cuenta Contable</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboctaContable" class="span12" data-placeholder="Cuenta Contable"></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Medio de Pago</label>
                                </div>
                            </div>


                            <div class="span3">
                                <div class="control-group ">
                                    <input id="chkChequera" type="checkbox" />
                                    Chequera
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group ">
                                    <input id="chkTTrabajo" type="checkbox" />
                                    Tarjeta Trabajo
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group ">
                                    <input id="chkBilleteraDigital" type="checkbox" />
                                    Billetera Digital
                                </div>
                            </div>
                        </div>

                        <!-- TIPOS DE FIRMAS -->
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Firma</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <div class="radio" id="Div1">
                                                <span>
                                                    <input type="radio" name="firma" value="M" style="opacity: 0;" id="rndMacomunada" checked="checked" disabled="disabled" />
                                                </span>
                                            </div>
                                            Mancomunada
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <div class="radio">
                                                <span>
                                                    <input type="radio" name="firma" value="S" style="opacity: 0;" id="rndSolidaria" disabled="disabled" />
                                                </span>
                                            </div>
                                            Solidaria
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <div class="radio" id="Div2">
                                                <span>
                                                    <input type="radio" name="firma" value="X" style="opacity: 0;" id="rndMixta" disabled="disabled" />
                                                </span>
                                            </div>
                                            Mixta
                                        </label>
                                        <%--<input id="rndMacomunada" type="radio" /><span>Mancomunada</span>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divMixta">
                            <div class="row-fluid">
                                <div class="span5 offset2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label span5" for="txtSolidariaDesde">Solidaria Desde <span class="simboloMoneda"></span>:</label>
                                            <input type="text" id="txtSolidariaDesde" onkeypress="return ValidaDecimales(event,this)" class="span7" style="text-align: center" value="0" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label span5" for="txtSolidariaHasta">Hasta:</label>
                                            <input type="text" id="txtSolidariaHasta" onkeypress="return ValidaDecimales(event,this)" class="span7" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- FIRMANTES -->
                        <div id="divFirmantes">
                            <div class="row-fluid" style="padding: 4px">
                                <div class="span2">
                                    <div class="control-group ">
                                        <label class="control-label">Autorizado 1:</label>
                                    </div>
                                </div>
                                <div class="span8">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtAutorizado1" style="text-align: center" type="text" class="span3" data-placeholder="Autorizado 1" disabled="disabled" />
                                            <input id="txtAutorizado1Desc" type="text" class="span9" data-placeholder="Autorizado 1" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2" style="margin-left: 5px">
                                    <div class="control-group">
                                        <div class="controls" style="padding-top: 4px">
                                            <a id="btnAgregarDivFirmante" class="btn blue add" style="display: none;"><i class="icon-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span2">
                                <div class="control-group ">
                                    <label class="control-label">Cuenta Cobranza</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group ">
                                    <input id="chkCuentaCobranza" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <a id="btnAgregarAutorizados" class="btn green pull-right" style="display: none;"><i class="icon-plus"></i>&nbsp;Agregar Autorizados</a>
                            </div>
                        </div>
                        <!-- FIN FIRMANTES -->

                        <div class="form-actions">
                            <a id="btnGrabar" class="btn blue" onclick="Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a id="btnActualizar" class="btn blue hidden" onclick="Actualizar();"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                            <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                    <!-- DATOS DETALLES -->
                    <div class="span5">
                        <div id="divTblDetalles" style="display: none; overflow-x: auto;">
                            <table id="tblDetalles" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead style="background-color: #4D90FE; text-align: center; color: #ffffff;">
                                    <tr>                                     
                                        <th>DESDE <span class="simboloMoneda"></span></th>
                                        <th>HASTA <span class="simboloMoneda"></span></th>
                                        <th></th>
                                        <th>AUTORIZADOS FIRMA MIXTA</th>
                                        <th>OBLIG.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    </div>
</div>

<div id="muestralistap" style="width: 900px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;LISTA DE PERSONAS</h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">            
            <div class="span12" id="divBuscarDoc_body">
                <table class="table table-hover" id="tblPersonas">
                    <thead>
                        <tr>                            
                            <th style="text-align: center">TIPO DOCUMENTO</th>
                            <th style="text-align: center">DOCUMENTO</th>
                            <th style="text-align: center">PERSONA</th>                            
                            <th style="text-align: center">FECHA</th>                            
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer"></div>
</div>


<input id="hfPIDM" type="hidden" />
<input id="hfBANC_CODE" type="hidden" />

<script type="text/javascript" src="../vistas/NB/js/NBMCCUE.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<script src="../../recursos/plugins/jquery.numeric.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />


<script>
    jQuery(document).ready(function () {
        NBMCCUE.init();
    });
</script>
