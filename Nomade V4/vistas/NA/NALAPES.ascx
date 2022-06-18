<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALAPES.ascx.vb" Inherits="vistas_NA_NALAPES" %>
<style>
   .modal {
        margin-left:0px !important;
   }
    @media (max-width:900px){      

        #divDetalles {
            left:5% !important; 
            width:90% !important;
        }
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>APROBACION DE MOVIMIENTOS DE ALMACEN</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nalapes" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
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
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboAlmacen">
                                    Almacén</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboAlmacen" class="span12" data-placeholder="Almacén"></select>
                                </div>
                            </div>
                        </div>
                        
                </div>

                <div class="row-fluid">
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>                                   
               
                </div>

                <div class="row-fluid" style="padding-top: 30px">
                    <div class="span12" id="div_tabla_dctos">
                        <table id="tblLISTA" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style="text-align: center">CODIGO</th>
                                    <th style="text-align: center">FLUJO</th>
                                    <th>OPERACION</th>
                                    <%--<th style="text-align: center">ALMACEN</th>--%>
                                    <%--<th>ORIGEN/DESTINO</th>--%>
                                    <th>EMISION</th>
                                    <th style="text-align: center">DCTO REG</th>
                                    <th style="text-align: center">NRO DCTO</th>
                                    <th>SOLICITANTE</th>
                                    <th>PESO TOTAL Kg.</th>
                                    <th>COSTO TOTAL S/.</th>
                                    <th>ANULADO</th>
                                    <th>CTLG_CODE</th>
                                    <th>ALMC_CODE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>
                <div class="form-actions">
                    <p style="font-style: italic; color: blue; float: right">* Click en un movimiento para acceder a su información y opciones.</p>
                </div>
            </div>
        </div>
    </div>

    <div id="divDetalles" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 70%; left: 15%" aria-hidden="true">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4><i class="icon-info-sign" style="line-height: initial;"></i>&nbsp;INFORMACION MOVIMIENTO ALMACEN</h4>
        </div>
        <div class="modal-body" id="divCuerpo">


            <div class="row-fluid">
                <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">

                    <!-- TITULO DE LOS TABS-->
                    <ul class="nav nav-tabs">
                        <li id="liCabecera" class="active"><a id="tabDatosGenerales" href="#generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                        <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                    </ul>
                    <div class="tab-content">
                        <!-- INICIO DEL TAB GENERALES-->
                        <div class="tab-pane active" id="generales">
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtNumDctoAlmc">N°</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtNumDctoAlmc" class="span6" disabled="disabled" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtRetorno">Flujo</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtRetorno" class="span8" disabled="disabled" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtCostoTransporte">Costo Transporte</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtCostoTransporte" class="span8" disabled="disabled" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEmpresa2">Empresa</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select class="span11" id="cboEmpresa2" disabled></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="cboAlmacen2">Almacén</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select class="span11" id="cboAlmacen2" disabled></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtOperacion">
                                            Operación</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span11" id="txtOperacion" disabled="disabled" style="text-transform: uppercase" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="span12 control-label" for="txtSolicitante">
                                            Solicitante</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtSolicitante" class="span11" disabled="disabled" type="text" style="text-transform: uppercase" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtEmision">Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtEmision" data-date-format="dd/mm/yyyy" style="text-align: center" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtTransaccion" style="text-align: right">Transacción</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtTransaccion" data-date-format="dd/mm/yyyy" style="text-align: center" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="span12 control-label" id="lblrecepcionado" for="txtEntregar">
                                            Receptor</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtEntregar" class="span11" type="text" style="text-transform: uppercase" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12" id="divBuscarDoc_body">
                                    <table class="table table-hover table-bordered" id="tblDetalles">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center"></th>
                                                <th style="text-align: center">PROD_CODE</th>
                                                <th style="text-align: center">PRODUCTO</th>
                                                <th>DESCRIPCION</th>
                                                <th style="text-align: center">SERIE</th>
                                                <th style="text-align: center">CC</th>
                                                <th style="text-align: center">CANT</th>
                                                <th style="text-align: center">UM</th>
                                                <th style="text-align: center">S/.</th>
                                                <th style="text-align: center">US$</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- FIN DE GENERALES-->
                        <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                        <div class="tab-pane" id="asientos_contables" style="overflow-x: scroll">
                        </div>
                        <!-- FIN DE ASUENTOS CONTABLES-->
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" id="btnAprobar" class="btn green right"><i class="icon-ok-sign"></i>&nbsp;Aprobar y Completar</button>
        </div>
    </div>
</div>
<!-- CAMPOS PARA CREAR QR -->
<div id="codigoQR" style="display: none"></div>  
<input id="hfElectronicoInd" type="hidden"/>
<input id="hfCOSTO_TOTAL" type="hidden" value="0.00" />
<input id="hfPESO_TOTAL" type="hidden" value="0.00" />
<input id="hfCodigoNaminsa" type="hidden" />
<script type="text/javascript" src="../vistas/NA/js/NALAPES.js"></script>
<script type="text/javascript" src="../../recursos/plugins/qrcode/qrcode.js"></script>
<script>
    jQuery(document).ready(function () {
        NALAPES.init();
    });
</script>
