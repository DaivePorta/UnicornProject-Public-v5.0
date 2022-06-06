<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLTDVE.ascx.vb" Inherits="vistas_NV_NVLTDVE" %>
<style>
    .modal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        .modal {
            left: 5% !important;
            width: 90% !important;
        }
    }

    .footer {
        z-index:2;
    }

    .fondoHeader {
        background-color: white;
        text-align: center;
        color: black;
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
</style>
<style>
    .node {
        cursor: pointer;
    }

        .node rect {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 2px;
        }

        .node text {
            font: 13px sans-serif;
        }

    .link {
        fill: none;
        stroke: #aaa;
        stroke-width: 1.5px;
    }
</style>
<style>
    #chart, #header, #footer {
        position: absolute;
        top: 0;
    }

    #header, #footer {
        z-index: 1;
        display: block;
        font-size: 36px;
        font-weight: 300;
        text-shadow: 0 1px 0 #fff;
    }

        #header.inverted, #footer.inverted {
            color: #fff;
            text-shadow: 0 1px 4px #000;
        }

    #header {
        top: 80px;
        left: 140px;
        width: 1000px;
    }

    #footer {
        top: 680px;
        right: 140px;
        text-align: right;
    }

    rect {
        fill: none;
        pointer-events: all;
    }

    pre {
        font-size: 18px;
    }

    line {
        stroke: #000;
        stroke-width: 1.5px;
    }

    .string, .regexp {
        color: #f39;
    }

    .keyword {
        color: #00c;
    }

    .comment {
        color: #777;
        font-style: oblique;
    }

    .number {
        color: #369;
    }

    .class, .special {
        color: #1181B8;
    }

    a:link, a:visited {
        color: #000;
        text-decoration: none;
    }

    a:hover {
        color: #666;
    }

    .hint {
        position: absolute;
        right: 0;
        width: 1280px;
        font-size: 12px;
        color: #999;
    }

    .node circle {
        cursor: pointer;
        fill: #fff;
        stroke: steelblue;
        stroke-width: 1.5px;
    }

    .node text {
        font-size: 11px;
    }

    path.link {
        fill: none;
        stroke: #ccc;
        stroke-width: 1.5px;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TRACKING DOCUMENTOS DE VENTAS</h4>
                <div class="actions">
                    <a class="btn black dn" href="javascript:ImprimirDcto();" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div class="portlet-body dn">
                <div id="divBuscarDcto">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span11" id="cboEmpresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label span12" for="cboTipoDcto">Tipo Dcto</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoDcto" class="span12"></select>
                                </div>
                            </div>
                        </div>

                        <div style="display: none;">
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
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEstablecimiento">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span11"></select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label span12" for="txtDocumento">Dcto</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="hidden" id="txtCodigoDoc" />
                                    <input type="text" class="span8" id="txtDocumento" style="margin-left: 0px !important; text-align: center" disabled="disabled" />
                                    <button type="button" class="btn blue" id="btnFiltrar" style="margin-top: -10px"><i class="icon-search" style="line-height: initial"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboCliente">Cliente</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCliente" class="span11" data-placeholder="Cliente">
                                        <option></option>
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
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                            <div class="control-group span3">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">
                                Hasta</label>
                            </div>

                            <div class="control-group span3">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkCodigo">
                                <input type="checkbox" id="chkCodigo" name="chkCodigo" />
                                Buscar por Código</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span6 buscarCodigo" style="display: none">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoVenta">
                                    Código</label>
                                <small style="color:#cbcbcb;">Venta/Cotización/Orden de Compra/Salida Almacén</small>
                            </div>
                        </div>
                        <div class="span6 buscarCodigo" style="display: none">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigoVenta" class="span12" placeholder="Ejm. V02000400" maxlength="9" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2" style="text-align: left">
                        <button class="btn blue" type="button" id="btnVerFlujo">VER FLUJO</button>
                    </div>
                </div>

                <style>
                    #bloqueFlujo {
                        overflow-x: auto;
                        overflow-y: hidden;
                        width: 100%;
                        background-color: #ECEDF1;
                        min-height: 210px;
                        height: 220px;
                    }
                    
                    .divDctoDestinoExtra, .divDctoOrigenExtra {
                        margin: 0px !important;
                    }

                    .flujo {
                        width: 150px;
                        height: auto;
                        margin: 5px;
                        padding: 5px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                        .flujo > p {
                            margin-top: 10px;
                            text-align: center;
                            color: black;
                            font-style: italic;
                        }

                    .bloqueDcto {
                        margin-top: -40px;
                    }

                        .bloqueDcto > p {
                            margin-top: 10px;
                            text-align: center;
                            font-size: 1.2em;
                            font-style: italic;
                        }

                    .divNumero {
                        width: 50px;
                        height: 50px;
                        border-radius: 100px !important;
                        /*background-color: #002B74;*/
                        display: inline-block;
                        position: relative;
                        text-align: center;
                        z-index: 1;
                        font-weight: bolder;
                        color: white;
                        margin-top: -8px;
                    }

                    .divAdicional_1 {
                        width: 30px;
                        height: 30px;
                        border-radius: 100px !important;
                        display: inline-block;
                        position: relative;
                        text-align: center;
                        z-index: 1;
                        font-weight: bolder;
                        color: white;
                        margin-top: -80px;
                        float: right;
                    }

                    .divAdicional_2 {
                        width: 30px;
                        height: 30px;
                        border-radius: 100px !important;
                        display: inline-block;
                        position: relative;
                        text-align: center;
                        z-index: 1;
                        font-weight: bolder;
                        color: white;
                        margin-top: -80px;
                        margin-right: 35px;
                        float: right;
                    }

                    .divAdicional_3 {
                        width: 30px;
                        height: 30px;
                        border-radius: 100px !important;
                        display: inline-block;
                        position: relative;
                        text-align: center;
                        z-index: 1;
                        font-weight: bolder;
                        color: white;
                        margin-top: -80px;
                        margin-right: 70px;
                        float: right;
                    }

                        .divAdicional_1:hover, .divAdicional_2:hover, .divAdicional_3:hover {
                            width: 33px;
                            height: 33px;
                            cursor: pointer;
                            transition: all 0.1s ease-in;
                        }

                    .imgSelected {
                        background-image: url(../../recursos/img/imgDiagrama/fondo-2.svg) !important;
                        background-size: cover;
                    }

                    .imgFondoFlujo {
                        margin-top: 10px !important;
                        min-width: 100px;
                        max-width: 100%;
                        display: inline-block;
                        position: relative;
                        padding: 0px !important;
                        left: 0;
                        top: 0;
                        background-image: url(../../recursos/img/imgDiagrama/fondo-1.svg);
                        background-size: cover;
                        -webkit-transition: all 0.5s ease-out;
                        -moz-transition: all 0.5s ease-out;
                        -o-transition: all 0.5s ease-out;
                        -ms-transition: all 0.5s ease-out;
                        transition: all 0.5s ease-out;
                    }

                        .imgFondoFlujo:hover {
                            transition: all 0.5s ease-in-out;
                            cursor: pointer;
                            max-width: 105% !important;
                            width: 105% !important;
                            background-image: url(../../recursos/img/imgDiagrama/fondo-2.svg);
                        }

                    .completo {
                        background-image: url(../../recursos/img/imgDiagrama/icono-01.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-01.svg);
                    }

                    .incompleto {
                        background-image: url(../../recursos/img/imgDiagrama/icono-02.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-02.svg);
                    }

                    .anulado {
                        background-image: url(../../recursos/img/imgDiagrama/icono-03.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-03.svg);
                    }

                    .ventaRapida {
                        background-image: url(../../recursos/img/imgDiagrama/icono-20.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-20.svg);
                    }

                    .ventaNormal {
                        background-image: url(../../recursos/img/imgDiagrama/icono-21.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-21.svg);
                    }

                    .despachoNaminsa { /*Pendiente*/
                        background-image: url(../../recursos/img/imgDiagrama/icono-12.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-13.svg);
                    }

                    .despachoRapido {
                        background-image: url(../../recursos/img/imgDiagrama/icono-13.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-12.svg);
                    }

                    .despachado {
                        background-image: url(../../recursos/img/imgDiagrama/icono-13.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-22.svg);
                    }

                    .notaGen {
                        background-image: url(../../recursos/img/imgDiagrama/icono-17.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-17.svg);
                    }

                    .notaDev {
                        background-image: url(../../recursos/img/imgDiagrama/icono-18.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-18.svg);
                    }

                    .info {
                        background-image: url(../../recursos/img/imgDiagrama/icono-19.svg);
                        background-size: cover;
                        content: url(../../recursos/img/imgDiagrama/icono-19.svg);
                    }

                    .dsn {
                        display: none;
                    }

                    @media print {
                        * {
                            background:none !important;
                            background-color:white !important;
                        }                      
                        .portlet-title {
                            border:none;
                        }
                        #ventana {
                            border:none;
                        }
                        input, textarea {
                            border: none !important;
                            outline: none !important;
                            color: black !important;
                            font-size: 11px;
                        }
                        textarea {
                            font-size: 11px;
                        }

                        #divConsultado {
                            background-color: #88879D !important;
                        }
                        .bloqueFlujo {
                            border: 1px solid #ECEDF1;
                            background-color:#ECECEC !important;                           
                        }
                        .bloqueFlujo div,.bloqueDcto,.imgFondoFlujo,p{
                            background:none !important;
                        }

                        .imgFondoFlujo {
                           background-image: url(../../recursos/img/imgDiagrama/fondo-1.svg) !important;
                           background-size: cover !important;
                        }                   
                                                                            
                        .nombreDcto {
                            font-size: 1em;
                            line-height: 1.2em;
                            background:none !important;
                        }

                        label {
                            font-weight: bold;
                        }

                        .control-group {
                            margin-bottom: 0px;
                        }
                    }
                </style>
                <div id="divConsultado" style="height: 25px; background-color: #88879D; color: white; text-align: center; margin-top: 5px; font-weight: bold; padding-top: 5px;">
                    <p id="lblDctoConsultado"></p>
                </div>
                <div id="bloqueFlujo" >
                    <div class="bloqueFlujo" style="display: flex; padding: 10px;">

                        <div class="flujo dsn">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnCotizacion" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-04.svg" />
                                <p class="nombreDcto">Cotización</p>
                            </div>
                        </div>
                        <div class="flujo dsn">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnOrdenCompra" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-05.svg" />
                                <p class="nombreDcto">Orden de Compra</p>
                            </div>
                        </div>
                        <div class="flujo">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnVenta" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-07.svg" />
                                <p class="nombreDcto">Venta Grabada</p>
                            </div>
                        </div>

                        <div class="flujo">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnVentaLista" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-06.svg" />
                                <p class="nombreDcto">Venta Facturada</p>
                            </div>
                            <div class="divAdicional_1">
                            </div>
                            <div class="divAdicional_2">
                            </div>
                        </div>

                        <div class="flujo">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnVentaCobrada" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-08.svg" />
                                <p class="nombreDcto">Venta Cobrada</p>
                            </div>

                        </div>

                        <div class="flujo">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnVentaDespachada" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-09.svg" />
                                <p class="nombreDcto">Venta Despachada</p>
                            </div>
                        </div>

                        <div class="flujo dsn">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnNotaCredito" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-10.svg" />
                                <p class="nombreDcto">Nota de Crédito</p>
                            </div>
                            <div class="divAdicional_1">
                            </div>
                            <div class="divAdicional_2">
                            </div>
                            <div class="divAdicional_3">
                            </div>
                            <div style="clear: right;"></div>
                        </div>

                        <div class="flujo dsn">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnDevolucionNotaCredito" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-16.svg" />
                                <p class="nombreDcto">Devolución por N.C.</p>
                            </div>
                            <div class="divAdicional_1">
                            </div>
                        </div>
                        <div class="flujo dsn">
                            <div class="divNumero incompleto">
                            </div>
                            <div class="bloqueDcto">
                                <img id="btnNotaDebito" class="imgFondoFlujo" src="../../recursos/img/imgDiagrama/icono-11.svg" />
                                <p class="nombreDcto">Nota de Débito</p>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- INFORMACION DOCUMENTOS -->
                <div id="panelDocumento" class="row-fluid" style="display: none;">
                    <div class="span12">
                        <div class="portlet box blue bn" style="border: 1px solid #ECEDF1 !important;">
                            <div class="portlet-body" style="min-height: 250px;">
                                <fieldset>
                                    <legend id="tituloDcto">Datos Documento Venta
                                    </legend>
                                </fieldset>
                                <div id="bloqueCotizacion" style="display: none;">
                                </div>
                                <div id="bloqueOrdenCompra" style="display: none;">
                                </div>
                                <div id="bloqueVenta">
                                    <div id="divBase">
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCodigo">
                                                        Código</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigo" class="span12" disabled="disabled" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnAbrirDcto0" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                        <a id="btnAbrirDcto1" class="btn red buscar" style="display: none"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2 offset1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtUsuario">
                                                        Usuario</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtUsuario" class="span12" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Datos Documento/Comprobante, Emisión-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documento</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <input id="txtTipoDcto" class="span12" type="text" disabled="disabled" />
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="span4" id="txtSerieDcto" type="text" disabled="disabled" />
                                                        <input class="span8" id="txtNroDcto" type="text" disabled="disabled" style="margin-left: -2px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaEmision">
                                                        Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtFechaEmision" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Cliente -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCliente">Cliente</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCliente" class="span12" type="text" style="text-transform: uppercase" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtDctoCliente" class="span4" type="text" disabled="disabled" />
                                                        <input id="txtNroDctoCliente" class="span8" type="text" disabled="disabled" style="text-align: center; margin-left: 0px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Vendedor,Moneda -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboVendedor">
                                                        Vendedor</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtVendedor" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtMoneda">
                                                        Moneda</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMoneda" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Datos monetarios ,Modo Pago-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteTotal">
                                                        <b>Importe Total</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtImporteTotal" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteCobrar">
                                                        <b>Importe Cobrar</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtImporteCobrar" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtModoPago">
                                                        Modo Pago</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtModoPago" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtGlosa">
                                                         Glosa</label>
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <textarea id="txtGlosa" class="span12" rows="2" style="resize:vertical;" disabled="disabled"></textarea>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid divBorrableOrgn">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documentos Origen</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid divBorrableOrgn">
                                            <div class="span6 offset2">
                                                <%--<div class="span12">
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <small id="lblDctoOrigen_1" class="control-label"></small>
                                                    </div>
                                                </div>
                                                <div class="span6">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtCodDctoOrigen_1" class="txtCodDctoOrigen inputOrigen" type="hidden" />
                                                            <input id="txtSerieDctoOrigen_1" class="txtSerieDctoOrigen inputOrigen numeros span4" type="text" disabled style="text-align: center" />
                                                            <input id="txtNroDctoOrigen_1" class="txtNroDctoOrigen inputOrigen numeros span8" type="text" disabled style="text-align: center; margin-left: -2px;" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <a id="btnAbrirDcto1" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>--%>
                                                <div id="divDctosOrigen">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid divBorrableDest">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documentos Destino</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid divBorrableDest">
                                            <div class="span6 offset2">
                                                <div id="divDctosDestino">
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div id="bloqueCobro" style="display: none;">
                                    <div class="row-fluid">
                                        <div class="span12 ">
                                            <div class="control-group alert alert-info">
                                                <label id="lblMensajeCobro" class="control-label">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div id="divCobros" class="span12"></div>
                                    </div>
                                </div>
                                <div id="bloqueNaminsa" style="display: none;">
                                    <div class="row-fluid">
                                        <div class="span12 ">
                                            <div class="control-group alert alert-info">
                                                <label id="lblMensajeDespacho" class="control-label">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div id="divSalidas" class="span12"></div>
                                    </div>
                                    <div id="divBase2">
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCodigo">
                                                        Código</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigo" class="span12" disabled="disabled" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnAbrirDcto0" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <%-- <div class="span2 offset1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtUsuario">
                                                        Usuario</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtUsuario" class="span12" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>--%>
                                        </div>
                                        <!-- Datos Documento Registro, Emisión-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Dcto. Registro</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <input id="txtTipoDctoReg" class="span12" type="text" disabled="disabled" />
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="span4" id="txtSerieDctoReg" type="text" disabled="disabled" />
                                                        <input class="span8" id="txtNroDctoReg" type="text" disabled="disabled" style="margin-left: -2px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaEmision">
                                                        Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtFechaEmision" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Datos Documento Interno, fecha Movimiento-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Dcto. Interno</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <input id="txtTipoDctoInt" class="span12" type="text" disabled="disabled" />
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="span4" id="txtSerieDctoInt" type="text" disabled="disabled" />
                                                        <input class="span8" id="txtNroDctoInt" type="text" disabled="disabled" style="margin-left: -2px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaMovimiento">
                                                        Movimiento</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtFechaMovimiento" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Cliente Destino, Dirección -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtDestino">Destino</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtDestino" class="span12" type="text" style="text-transform: uppercase" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtDireccionDestino" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Despachador,Moneda -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboVendedor">
                                                        Despachado por</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtDespachador" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtMoneda">
                                                        Moneda</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMoneda" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Transporte -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtTransporte">
                                                        Transporte</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtTransporte" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                             
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtGlosa">
                                                         Glosa</label>
                                                </div>
                                            </div>
                                            <div class="span6">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <textarea id="txtGlosa" class="span12" rows="1" style="resize:vertical;" disabled="disabled"></textarea>                                                        
                                                    </div>
                                                </div>
                                            </div>                                      

                                        </div>
                                        <!-- Dctos Origen -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documentos Origen</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span6 offset2">
                                                <div id="divDctosOrigen">
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div id="bloqueNotaCredito" style="display: none;">
                                    <div id="divBase3">
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCodigo">
                                                        Código</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigo" class="span12" disabled="disabled" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnAbrirDcto0" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                        <a id="btnAbrirDcto1" class="btn red buscar" style="display: none"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2 offset1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtUsuario">
                                                        Usuario</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtUsuario" class="span12" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Datos Documento/Comprobante, Emisión-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documento</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <input id="txtTipoDcto" class="span12" type="text" disabled="disabled" />
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="span4" id="txtSerieDcto" type="text" disabled="disabled" />
                                                        <input class="span8" id="txtNroDcto" type="text" disabled="disabled" style="margin-left: -2px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaEmision">
                                                        Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtFechaEmision" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Vendedor,Moneda -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCliente">
                                                        Cliente</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtCliente" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtMoneda">
                                                        Moneda</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMoneda" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Datos montos -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteTotal">
                                                        <b>Monto Total</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMontoTotal" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteCobrar">
                                                        <b>Monto Usable</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMontoUsable" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Destino de nota de crédito-->
                                        <div class="row-fluid divBorrableDest">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Destino</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row-fluid divBorrableDest">
                                            <div class="span6 offset2">
                                                <div id="divDctosDestino">
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <div id="bloqueNotaDebito" style="display: none;">
                                    <div id="divBase4">
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCodigo">
                                                        Código</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtCodigo" class="span12" disabled="disabled" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnAbrirDcto0" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2 offset1">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtUsuario">
                                                        Usuario</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" id="txtUsuario" class="span12" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Datos Documento/Comprobante, Emisión-->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label">
                                                        Documento</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <input id="txtTipoDcto" class="span12" type="text" disabled="disabled" />
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input class="span4" id="txtSerieDcto" type="text" disabled="disabled" />
                                                        <input class="span8" id="txtNroDcto" type="text" disabled="disabled" style="margin-left: -2px !important;" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtFechaEmision">
                                                        Emisión</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtFechaEmision" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Vendedor,Moneda -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtCliente">
                                                        Cliente</label>
                                                </div>
                                            </div>
                                            <div class="span5">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtCliente" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtMoneda">
                                                        Moneda</label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMoneda" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Datos montos -->
                                        <div class="row-fluid">
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteTotal">
                                                        <b>Monto Total</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtMontoTotal" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="txtImporteTotal">
                                                        <b>Pagado</b></label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input id="txtPagado" class="span12" type="text" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>

                                </div>
                                <div id="bloqueDevolucion" style="display: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" id="divImprimir" style="overflow-x: auto;">
                </div>
                <div class="row-fluid">
                    <p style="text-align: right; margin-top: 8px;" id="txtInfo"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="divBuscarDoc" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20% ;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarDoc_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <table class="table table-hover" id="tblDocumentos">
                    <thead>
                        <tr>
                            <th style="text-align: center">CODIGO</th>
                            <th style="text-align: center">NRO DOC</th>
                            <th style="text-align: center">FECHA EMISION</th>
                            <th>CLIENTE</th>
                        </tr>
                    </thead>
                    <tbody style="cursor: pointer"></tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <p class="text-right" style="color: blue;">*Haga clic en un documento para seleccionarlo y ver su flujo</p>
    </div>
</div>

<div id="modalMensaje" class="modal hide" style="width:50%;left:25%;">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4 id="tituloModal"></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
             <div class="span10 offset1" >
                <p><span id="msgModal"></span></p>               
            </div>
        </div>
        <div class="row-fluid" id="cuerpoModal">         
           
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">               
            </div>
        </div>
    </div>
</div>


<div id="divDctoImprimir" style="padding:0px; margin:0px;">
</div>

<script src="../../recursos/plugins/d3-master/d3.js"></script>
<script src="../../recursos/plugins/d3-master/d3.min.js"></script>
<script src="../../recursos/plugins/d3-master/d3.layout.js"></script>

<script type="text/javascript" src="../vistas/NV/js/NVLTDVE.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLTDVE.init();
    });
</script>
