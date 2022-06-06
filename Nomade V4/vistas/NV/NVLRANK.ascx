<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLRANK.ascx.vb" Inherits="vistas_NV_NVLRANK" %>
<style>

    .modal {
        margin-left:0px !important;
    }

    @media (max-width:900px){      

        #modal-detalles {
            left:5% !important; 
            width:90% !important;
        }
    }

     .fondoHeader {
        /*background-color: #3A5567;*/
        background-color: white;
        text-align: center;
        /*color: #FFFFFF;*/
        color: black;
    }      

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
                <h4><i class="icon-reorder"></i>&nbsp;RANKING DE CLIENTES</h4>
                <div class="actions dn">
                    <a <%--id="btnMail"--%>  class="btn purple enviaMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black" href="javascript:imprimirDiv2('divTblDatos');"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body" style="min-height: 500px;">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label span12" for="cboMoneda">Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12"></select>
                            </div>
                        </div>
                    </div>
                

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboVendedor">
                        Vendedor</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboVendedor" class="span12" data-placeholder="Vendedor">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEstablecimiento">
                        Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                </select>
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

                        <div class="span2 dn" style="text-align: left;">
                        <button class="btn blue" type="button" id="buscar">FILTRAR</button>
                    </div>

                </div>
          
                 <div class="row-fluid" id="divTblDatos" style="margin-top: 2%; overflow-x: auto;">
                    <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                        <thead class="fondoHeader">
                            <tr>
                                <th>RANKING</th>
                                <th>CLIENTE</th>
                                <th>MONTO</th>
                                <th>UTILIDAD</th>
                                <th>NRO. VENTAS</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
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


<div id="divMail" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;left:25%;" aria-hidden="true">
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
<script type="text/javascript" src="../vistas/NV/js/NVLRANK.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLRANK.init();
    });
</script>