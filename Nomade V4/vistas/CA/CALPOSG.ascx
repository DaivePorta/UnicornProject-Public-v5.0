<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALPOSG.ascx.vb" Inherits="vistas_CA_CALPOSG" %>
<style>
    .center {
        text-align: center;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    #tblDatos, #tblDatosMostrar {
        width: 100%;
        border: 1px solid #cbcbcb;
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    }

    .divTblCustom {
        max-height: 500px;
        overflow: auto;
    }

    .tblCustom {
        border: 1px solid #ddd;
        border-collapse: collapse;
        width: 100%;
    }

        .tblCustom th, .tblCustom td {
            border: 1px solid #ddd;
            padding: 8px;
            word-break: break-all;
        }

        .tblCustom tr:nth-child(even) {
            background-color: #f4f4f4;
        }

        .tblCustom th {
            background-color: #23779B;
            color: white;
        }

        .tblCustom tr:hover {
            background-color: #ddd;
            cursor: pointer;
        }

    caption {
        padding: 8px;
        background-color: #206b8c;
        color: white;
        font-weight: bold;
    }

    .tblCustom2 {
        border: 1px solid #ddd;
        border-collapse: collapse;
        width: 100%;
    }

        .tblCustom2 td {
            border: 1px solid #ddd;
            padding: 8px;
            word-break: break-all;
        }

    @media print {
        .highcharts-contextmenu {
            display: none;
        }
    }
</style>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue bn" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;POSICIÓN GLOBAL</h4>
                <div class="actions dn">
                    <a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black" href="javascript:ImprimirDcto();"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div class="portlet-body" style="min-height: 500px;">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">EMPRESA:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboMoneda">MONEDA:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2 dn" style="text-align: left;">
                        <button class="btn blue" type="button" id="buscar">FILTRAR</button>
                    </div>
                </div>

                <div class="row-fluid dn">
                    <div class="span12">
                        <div class="span10 offset1">
                            <div class="control-group">
                                <div class="controls" style="padding-top: 4px">
                                    <a id="btnInicio" class="btn green pull-left" onclick=""><i class="icon-home"></i>&nbsp;Inicio</a>
                                    <a id="btnRegresar" class="btn green pull-right" style="display: none;"><i class="icon-chevron-left"></i>&nbsp;Regresar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 5px;">
                    <div class="span10 offset1">
                        <table id="tblTotalPosGlobal" class="tblCustom2">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-size: 14px; background-color: #23779B; color: white; width: 40%; font-weight: bold;">POS GLOBAL</td>
                                    <td class="center" style="font-size: 16px; font-weight: bold;"><span id="lblMontoPosGlobal"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row-fluid" id="divDatosMostrar" style="margin-top: 5px;">
                    <div class="span10 offset1">
                        <!-- INICIO - RESUMEN -->
                        <div class="divTblCustom" style="display: block">
                            <table id="tblInicio" class="tblCustom">
                                <caption>RESUMEN</caption>
                                <thead>
                                    <tr>
                                        <th class="center">&nbsp;</th>
                                        <th class="center">HABER</th>
                                        <th class="center">DEBE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="trCaja">
                                        <td>CAJAS</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trAlmacen">
                                        <td>ALMACÉN VALORIZADO</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trBanco">
                                        <td>CUENTAS EN BANCOS</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trCliente">
                                        <td>POR COBRAR A CLIENTES</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trActivo">
                                        <td>ACTIVOS FIJOS</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trProveedor">
                                        <td>DEUDA A PROVEEDORES</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trAfp">
                                        <td>DEUDAS CON AFP</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trPrestamo">
                                        <td>PRÉSTAMOS BANCOS</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                    <tr id="trEmpleado">
                                        <td>POR PAGAR EMPLEADOS</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr id="trTotales">
                                        <td>&nbsp;</td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <!-- CAJA -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblCaja_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoCaja_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblCaja_2" class="tblCustom">
                                <caption>MIS CAJAS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">CAJA</th>
                                        <th class="center">RESPONSABLE</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoCaja_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- ALMACEN VALORIZADO -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblAlmacen_1" class="tblCustom">
                                <caption>MIS ALMACENES</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ALMACEN</th>
                                        <th class="center">RESPONSABLE</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoAlmacen_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>

                        </div>
                        <!-- CUENTAS EN BANCOS-->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblBanco_1" class="tblCustom">
                                <caption>MIS CUENTAS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">CUENTA</th>
                                        <th class="center">MONTO MONEDA ORIGINAL</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoBanco_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- POR COBRAR CLIENTES -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblCliente_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoCliente_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblCliente_2" class="tblCustom">
                                <caption>MIS CLIENTES</caption>
                                <thead>
                                    <tr>
                                        <th class="center" style="width: 40%;">CLIENTE</th>
                                        <th class="center" style="width: 20%;">TELEFONO</th>
                                        <th class="center" style="width: 20%;">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoCliente_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- ACTIVOS FIJOS -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblActivo_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoActivo_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblActivo_2" class="tblCustom">
                                <caption>MIS ACTIVOS FIJOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ACTIVO FIJO</th>
                                        <th class="center">SERIE</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoActivo_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- DEUDA A PROVEEDORES -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblProveedor_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoProveedor_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblProveedor_2" class="tblCustom">
                                <caption>MIS PROVEEDORES</caption>
                                <thead>
                                    <tr>
                                        <th class="center" style="width: 40%;">PROVEEDOR</th>
                                        <th class="center" style="width: 20%;">TELEFONO</th>
                                        <th class="center" style="width: 20%;">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoProveedor_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- DEUDA A AFP -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblAfp_1" class="tblCustom">
                                <caption>MIS AFP</caption>
                                <thead>
                                    <tr>
                                        <th class="center">AFP</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoAfp_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- PRESTAMOS PRESTAMOS -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblPrestamo_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoPrestamo_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblPrestamo_2" class="tblCustom">
                                <caption>MIS CRÉDITOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">BANCO</th>
                                        <th class="center">NRO CRÉDITO</th>
                                        <th class="center">SALDO MONEDA ORIGINAL</th>
                                        <th class="center">SALDO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoPrestamo_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <!-- POR PAGAR EMPLEADOS -->
                        <div class="divTblCustom" style="display: none">
                            <table id="tblEmpleado_1" class="tblCustom">
                                <caption>MIS ESTABLECIMIENTOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">ESTABLECIMIENTO</th>
                                        <th class="center">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoEmpleado_1" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                        <div class="divTblCustom" style="display: none">
                            <table id="tblEmpleado_2" class="tblCustom">
                                <caption>MIS EMPLEADOS</caption>
                                <thead>
                                    <tr>
                                        <th class="center">EMPLEADO</th>
                                        <th class="center">CARGO</th>
                                        <th class="center">POR PAGAR</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="row-fluid">
                                <div id="graficoEmpleado_2" style="min-width: 310px; min-height: 350px; margin: 0 auto;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div id="divGrafico" style="display: none;">
                            <div id="contenedor" style="min-width: 310px; min-height: 350px; margin: 0 auto;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="divGrafico2" style="display: none;">
                            <div id="contenedor2" style="min-width: 300px; min-height: 300px; margin: 0 auto;">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="divGrafico3" style="display: none;">
                            <div id="contenedor3" style="min-width: 300px; min-height: 300px; margin: 0 auto;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 5px;">
                    <div class="span10 offset1">
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="max-height: 545px; overflow-x: auto; margin-top: 5px; display: none;">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


<div id="divMail" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn close_mail red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divMail_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">De:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboCorreos"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Asunto:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtAsunto" class="span12">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                        <div id="datos_correo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>




<script src="../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>
<script type="text/javascript" src="../vistas/CA/js/CALPOSG.js"></script>
<script>
    jQuery(document).ready(function () {
        CALPOSG.init();
    });
</script>
