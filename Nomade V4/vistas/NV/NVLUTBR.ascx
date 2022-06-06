<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLUTBR.ascx.vb" Inherits="vistas_NV_NVLUTBR" %>
<style>
    .fondoHeader {
        background-color: white;
        text-align: center;
        color: black;
    }


    a.btn-det > img {
        max-width: 27%;
        padding-left: 14px;
        padding-bottom: 4px;
    }

    a.btn-det {
        font-size: 30px;
        border: solid 2px;
    }

    a.azul {
        background-color: #2678E6;
        border-color: #2878EB;
    }

    a.naranja {
        background-color: #D14624;
        border-color: #D14624;
    }

    a.morado {
        background-color: #A000A7;
        border-color: #A000A7;
    }

    a.verde {
        background-color: #01A300;
        border-color: #01A300;
    }

    tbody {
        /*font-family: calibri;*/
        font-size: 11px;
    }

    p.totales {
        left: 45%;
        position: absolute;
        font-weight: 600;
        transform: translateX(-50%);
    }

    #lblPctjBajaUtilidad {
        position: relative;
        float: left;
        left: 50%;
        margin-top: 26px;
    }

   #lblPctjMedio {
        position: relative;
        float: left;
        left: 60%;
        margin-top: 26px;
    }

    #lblPctjAltaUtilidad {
        position: relative;
        float: left;
        left: 70%;
        margin-top: 26px;
    }

    .modal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {

        #modal-detalles {
            left: 5% !important;
            width: 90% !important;
        }
    }

    @media (max-width:767px) {
        p.totales {
            left: 0%;
            transform: translateX(0%);
            position: inherit;           
            display: block;
            clear: both;
        }

        #lblPctjBajaUtilidad, #lblPctjAltaUtilidad {
            display: none;
        }

        .ColVis_Button, .TableTools_Button.ColVis_MasterButton {
            display: none;
        }
    }


    @media print {
        .chat-window {
            display: none;
        }

        #modal_info {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            /* display: block !important;*/
            width: 100% !important;
            font-size: 10px!important;
            line-height: 12px !important;
            font-family: Arial !important;
        }

        #tblDctoImprimir {
            font-size: 12px !important;
        }

        #tblDocumento, .arial {
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />


<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>UTILIDADES BRUTAS POR DOCUMENTO</h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=nvmdocv"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
                <div style="clear: both"></div>
            </div>

            <div class="portlet-body">

                <div style="display: none">
                    <div class="control-group">
                        <div class="controls">
                            <select id="cboMoneda" class="span12"></select>
                        </div>
                    </div>
                </div>

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
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoDoc">
                                Tipo Doc.</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboTipoDoc" class="span12" data-placeholder="Tipo Documento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtSerie">
                                Serie</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtSerie" class="span12" maxlength="5" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNumero">
                                Número</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtNumero" class="span12" maxlength="25" />
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboVendedor">
                                Vendedor</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboVendedor" class="span12" data-placeholder="Vendedor">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProducto">
                                Producto</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divCboProducto">
                                <select id="cboProducto" class="span12" data-placeholder="Producto">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCliente">
                                Cliente</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divCboCliente">
                                <select id="cboCliente" class="span12" data-placeholder="Cliente">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <%--<div class="span4">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtRuc" class="span3" type="text" disabled="disabled" />
                                <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div> --%>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboAnulado">
                                Estado</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Estado">
                                    <option value="TODOS">TODOS</option>
                                    <option value="N">VIGENTES</option>
                                    <option value="S">ANULADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboGrupoProductos">
                                Grupo de Productos</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divGrupProd">
                                <select id="cboGrupoProductos" class="span12" data-placeholder="Grupo de Productos" multiple="multiple">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div style="padding-left: 7px;" class="control-group span3">
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
                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th style='max-width: 52px;'></th>
                                    <th style='max-width: 52px;'>CÓDIGO</th>
                                    <th style='max-width: 70px;'>DOCUMENTO</th>
                                    <th style='max-width: 52px;'>FECHA<br />
                                        EMISIÓN</th>
                                    <th style='max-width: 90px;'>NRO. DOC.</th>
                                    <th style='max-width: 300px; width: 202px;'>CLIENTE</th>
                                    <th style='max-width: 52px;'>MONEDA ORIGINAL</th>
                                    <th style='max-width: 90px;'>MONTO<br />
                                        UTILIDAD</th>
                                    <th style='max-width: 90px;'>PORCENTAJE<br />
                                        UTILIDAD</th>
                                    <th style='max-width: 52px;'>MODO<br />
                                        PAGO</th>
                                    <th style='max-width: 52px; width: 92px;'>FORMA<br />
                                        PAGO</th>
                                    <th style='max-width: 90px; display: none;'>NOMBRE VENDEDOR</th>
                                    <th style='max-width: 90px;'>VENDEDOR</th>
                                    <th style='max-width: 90px;'>USUA REG.</th>
                                    <th style='min-width: 90px; max-width: 110px; font-size: 11.5px;'>ESTADO</th>
                                    <th style='max-width: 90px;'>VIGENCIA</th>
                                    <th style='max-width: 90px;'>GLOSA</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
    </div>

</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>

<div id="modal-detalles" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 15%; width: 70%;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalTitulo">Utilidad por Detalles</h4>
    </div>
    <div class="modal-body" id="ventanaInfo" style="overflow-y: initial !important; overflow-x: auto; max-height: 520px">
        <div class="row-fluid">
            <table id="tblDetalles" class="display DTTT_selectable" border="0">
                <thead class="fondoHeader">
                    <tr>
                        <th>ITEM</th>
                        <th>PRODUCTO</th>
                        <th>PRECIO UNIDAD</th>
                        <th>COSTO UNIDAD</th>
                        <th>CANTIDAD</th>
                        <th>TOTAL</th>
                        <th>UTILIDAD POR UNIDAD</th>
                        <th>UTILIDAD POR ITEM</th>
                        <th>PORCENTAJE UTILIDAD</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row-fluid">
        </div>
    </div>
</div>


<%--<div id="modal-detalles" class="modal hide">
    <div class="modal-header" style="background: #3a87ad; color: #ffffff;">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4>Utilidad por Detalles</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <table id="tblDetalles" class="display DTTT_selectable" border="0">
                <thead>
                    <tr>
                        <th >ITEM</th>
                        <th >PRODUCTO</th>
                        <th >VALOR VENTA</th>
                        <th >VALOR COSTO</th>
                        <th >CANTIDAD</th>
                        <th >TOTAL</th>
                        <th >UTILIDAD POR ITEM</th>
                        <th >UTILIDAD POR UNIDAD</th>
                        <th >PORCENTAJE UTILIDAD</th>                 
                    </tr>
                </thead>
            </table>
        </div>        
    </div>
</div>--%>
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type='text/javascript' src='../vistas/NV/js/NVLUTBR.js?<%=aleatorio%>'></script>
<%--<script type="text/javascript" src="../vistas/NV/js/NVLUTBR.js"></script>--%>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLUTBR.init();
    });
</script>
