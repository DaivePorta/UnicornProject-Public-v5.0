<%@ Control Language="VB" AutoEventWireup="false" CodeFile="DSLALCL.ascx.vb" Inherits="vistas_DS_DSLALCL" %>
<style>
    .fondoHeader {
        /* background-color: #3A5567;*/
        background-color: white;
        text-align: center;
        color: black;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .td_wrap {
        word-break: break-all;
    }
</style>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ALTAS DE CLIENTES</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black" onclick="javascript:imprimirDiv('divDocumento');"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
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
                </div>

                <div class="row-fluid">
                    <div class="span2 offset2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" id="divTblDatos" style="margin-top: 2%; overflow-x: auto;">
                    <div id="divDocumento">
                        <table id="tblDatos" class="display DTTT_selectable" style="border: 1px solid #cbcbcb;">
                            <thead class="fondoHeader">
                                <tr>
                                    <th>COD UBIC.</th>
                                    <th>TRATAMIENTO</th>
                                    <th>APELLIDO PATERNO</th>
                                    <th>APELLIDO MATERNO</th>
                                    <th>NOMBRES</th>
                                    <th>RAZON SOCIAL</th>
                                    <th>NOMBRE COMERCIAL</th>
                                    <th>TIPO VIA</th>
                                    <th>NOMBRE VIA</th>
                                    <th>NUMERO VIA </th>
                                    <th>INTERIOR/DEPARTAMENTO</th>
                                    <th>MANZANA</th>
                                    <th>LOTE</th>
                                    <th>LOCALIDAD (URBANIZACION, ASENTAMIENTO HUMANO, etc.)</th>
                                    <th>CODIGO SAP DEL DA</th>
                                    <th>UBIGEO DISTRITO</th>
                                    <th>NIF</th>
                                    <th>TIPO NIF</th>
                                    <th>TIPO NEGOCIO</th>
                                    <th>SUB CANAL</th>
                                    <th>LATITUD</th>
                                    <th>LONGITUD</th>
                                    <th>TELEFONO</th>
                                    <th>EMPRESA</th>
                                    <th>ESTABLECIMIENTO</th>
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

<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
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

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/DS/js/DSLALCL.js"></script>
<script>
    jQuery(document).ready(function () {
        DSLALCL.init();
    });
</script>
