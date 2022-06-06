<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMOETC.ascx.vb" Inherits="vistas_CA_CAMOETC" %>

<link rel="stylesheet" type="text/css" href="../recursos/plugins/bootstrap-timepicker/compiled/timepicker.css" />
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>OPERACIONES ESPECIALES DE TIPO DE CAMBIO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CAMOETC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=CALOETC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="caja">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresas">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="cboEmpresas" class="m-wrap span12 required" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimiento" style="text-align: center">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="m-wrap span12 required" tabindex="1"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboCaja">
                                    Caja</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboCaja" class="m-wrap span12 required" tabindex="1"></select>
                                </div>
                            </div>
                        </div> 
                        <div class="span1" ></div>
                        <div class="span4" ><b><br />FECHA/HORA DE OPERACIÓN</b></div>
                    </div>                    
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCasadeCambio">
                                    Casa de Cambio</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span9" id="txtCasadeCambio" style="text-transform: uppercase" />
                                    <a class="btn green" href="?f=NRMGEPR" target="_blank" style="margin-top: -10px"><i class="icon-plus" style="line-height: initial"></i></a>
                                </div>
                            </div>
                        </div>                        
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="input-append date date-picker fecha" data-date-format="dd/mm/yyyy">
                                        <input class="m-wrap date-picker fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfecharecepcion" />
                                        <span class="add-on"><i class="icon-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="input-append bootstrap-timepicker-component">
                                        <input class="m-wrap m-ctrl-small timepicker-default span10" type="text" id="txthorarecepcion" />
                                        <span class="add-on"><i class="icon-time"></i></span>
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
                                <label class="control-label" for="cboTipo">
                                    Modo</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipo" class="m-wrap span12 required" tabindex="1">
                                        <option value="D">DIRECTO</option>
                                        <option value="A">ASIGNACION TEMPORAL</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1 asignacion" style="display: none">
                            <div class="control-group">
                                <label class="control-label" for="txtTelefono">
                                    Asignación</label>
                            </div>
                        </div>
                        <div class="span4 asignacion" style="display: none">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="hidden" id="txtAsignacion" />
                                    <input type="text" class="span10" id="txtAsignacion_RS" />
                                    <button id="btnAsignacion" type="button" class="btn blue" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <hr />
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1" style="height: 25px">
                            <div class="control-group">
                                <label class="control-label" for="cboMoneda">
                                    Base</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="base">
                                    <select id="cboMoneda" class="m-wrap span7 required" tabindex="1"></select>
                                    <input type="text" id="txtMonto" class="span5" style="margin-left: 5px; text-align: center" onkeypress="return ValidaDecimales(event,this)" />
                                    <h5 style="margin-top: 0px">DISPONIBLE EN CAJA<span class="badge badge-success pull-right" id="lblMonto"></span></h5>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtTipodeCambio" style="text-align: center">T.C.</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtTipodeCambio" class="span8" onkeypress="return ValidaDecimales(event,this)" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboCambio">
                                    Cambio</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCambio" class="m-wrap span7 required" tabindex="1" disabled></select>
                                    <input type="text" id="txtCambio" class="span5" disabled style="margin-left: 5px; text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Realizar Operación</a>
                    <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div>
    <input type="hidden" id="hfCASA_CAMBIO_PIDM" />
</div>
<div id="divOK" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4>REALIZAR OPERACION</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <h4 style="text-align: center">La operación actual realizará movimientos en la Caja seleccionada.<br />¿Desea continuar?</h4>
        </div>
    </div>
    <div class="modal-footer">
        <a  id="rsptsi" class="btn blue" onclick="Grabar();">SI</a><a class="btn" onclick="$('#divOK').modal('hide')">NO</a>
    </div>
</div>
<div id="modalAsignacion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalAsignacion_title"><i class="icon-reorder"></i>ASIGNACION DE ESTA OPERACION</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="modalAsignacion_body">
                <table id="tAsignacion" class="display DTTT_selectable bordered dataTable no-footer" style="width: 100%;">
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                        </tr>
                    </thead>
                    <tbody id="tbAsignacion"></tbody>
                </table>
            </div>
        </div>

    </div>
    <div class="modal-footer">
        <h5>Click en toda la fila para seleccionarla</h5>
    </div>
</div>
<script type="text/javascript" src="../recursos/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
<script type="text/javascript" src="../vistas/NF/js/NFMRECE.js"></script>
<script type="text/javascript" src="../vistas/CA/js/CAMOETC.js"></script>

<script>
    jQuery(document).ready(function () {
        CAMOETC.init();              
    });
</script>
