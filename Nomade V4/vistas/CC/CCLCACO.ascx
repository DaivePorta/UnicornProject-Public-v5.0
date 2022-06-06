<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLCACO.ascx.vb" Inherits="vistas_CC_CCLCACO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE CARTAS DE COBRANZA GENERADAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=CCMCACO" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CCLCACO" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span2">
                        <label>Empresa</label>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <button id="btnListar" class="btn blue"><i class="icon-search"></i> Buscar</button>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbl_gastos" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="display:none">CODIGO</th>
                                    <th>NUMERO</th>
                                    <th>CLIENTE</th>
                                    <th>FECHA</th>
                                    <th>MONEDA</th>
                                    <th>MONTO</th>
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

<script type="text/javascript" src="../vistas/CC/js/CCMCACO.js"></script>
<script>
    jQuery(document).ready(function () {
        CCLCACO.init();
    });
</script>
