<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLCCUO.ascx.vb" Inherits="vistas_CC_CCLCCUO" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>CUENTAS POR COBRAR CON CUOTAS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>                 
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablec" class="span12 estable"  data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtRuc">
                                Cliente</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtRuc" class="span3" type="text" disabled="disabled" />
                                <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>

                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
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

              <div class="row-fluid" id="bloqueTotales" style="display:none;margin-bottom: 10px;">
                    <div class="span1"></div>
                    <div class="span2">
                        <strong>DEUDA TOTAL  (<span id="lblMonedaBase"></span>):</strong>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase" >-</span>
                    </div>            
                    <div class="span2">
                        <strong>DEUDA TOTAL (<span id="lblMonedaAlterna"></span>):</strong>
                    </div>
                    <div class="span3" style="font-size: 16px;">
                        <span id="lblSimboloMonedaAlterna"></span>&nbsp;<span id="txtTotalMonedaAlterna" >-</span>
                    </div>
                </div>

                <div class="rwo-fluid" id="bloqueTipoCambio" style="display:none;" >
                    <div class="span4 offset1">
                        <strong>TIPO DE CAMBIO: </strong><span>OFICIAL - VENTA</span>
                    </div>
                    <div class="span3" style="">
                         <strong>AL: </strong><span id="fechaTipoCambio"></span> 
                     </div>                   
                    <div class="span3" style="">
                        <strong>CAMBIO: </strong><span id="valorTipoCambio" style="font-size: 16px;"> </span>
                    </div>
                </div>

                <div style="float: right;" id="divExportBtns">
                    <button class="btn red btnpdf" id="btnLibroPdf" type="button"><i class="fa fa-file-pdf-o"></i>&nbsp;Exportar a Pdf</button>
                    <button class="btn green" id="btnLibroXls" type="button" style="margin-left: 5px;"><i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>
                </div>

                <div class="row-fluid">
                    <div id="divCuentasPorCobrar">
                        <table id="tblCuentasPorCobrar" class="table-bordered display">                         
                                <thead>
                                    <tr>
                                        <th>Documentos</th>
                                        <th>Cuotas</th>
                                        <th>Fecha Emisión</th>
                                        <th>Fecha Vencimiento</th>
                                        <th>Monto Original PEN</th>
                                        <th>Monto Original USD</th>
                                        <th>Monto Pendiente PEN</th>
                                        <th>Monto Pendiente USD</th>
                                        <th>Glosa</th>
                                    </tr>
                                </thead>                            
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />


<script type="text/javascript" src="../vistas/CC/js/CCLCCUO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCLCCUO.init();
    });
</script>
