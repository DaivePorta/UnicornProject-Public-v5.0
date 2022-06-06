<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLLCCL.ascx.vb" Inherits="vistas_CC_CCLLCCL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LINEA DE CREDITO CLIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=ccmlccl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ccllccl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12 empresa" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>
                </div>              
                <div class="row-fluid" style="margin-bottom: 25px;">
                    <div class="span1"></div>
                    <div class="span2">
                        <strong>TOTAL  (<span id="lblMonedaBase"></span>):</strong>
                    </div>
                    <div class="span3">
                        <span id="lblSimboloMonedaBase"></span>&nbsp;<span id="txtTotalMonedaBase">-</span>
                    </div>                   
                    <div class="span2">
                        <strong>TOTAL (<span id="lblMonedaAlterna"></span>):</strong>
                    </div>
                    <div class="span3">
                        <span id="lblSimboloMonedaAlterna"></span>&nbsp;<span id="txtTotalMonedaAlterna">-</span>
                    </div>
                </div>

                <div class="row-fluid">
                    <table id="tblBandeja" class="display  DTTT_selectable" border="0" style="overflow-x: scroll;">
                        <thead>
                            <tr align="center">
                                <th>EMPRESA</th>
                                <th>TIPO DOC</th>
                                <th>DOC</th>
                                <th>RAZON SOCIAL / NOMBRE CLIENTE</th>
                                  <th>TIPO CLIENTE</th>
                                <th>MONTO</th>
                                <th>MONEDA</th>
                                <th>PLAZO (DIAS)</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CC/js/CCLLCCL.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />
<script>
    jQuery(document).ready(function () {
        CCLLCCL.init();
    });
</script>


