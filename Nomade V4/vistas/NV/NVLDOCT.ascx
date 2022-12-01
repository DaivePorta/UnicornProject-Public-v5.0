<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLDOCT.ascx.vb" Inherits="vistas_NV_NVLDOCT" %>
<style>
    #divMail {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divMail {
            left: 5% !important;
            width: 90% !important;
        }
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
        left: 47%;
        position: absolute;
        font-weight: 600;
        transform: translateX(-50%);
    }

    @media print {
        .modal, .modal-backdrop {
            display: none !important;
        }

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }
        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console'  !important;*/
            font-family: Arial !important;
        }

        #tblDocumento, .arial {
            font-family: 'Arial' !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .chat-window {
            display: none;
            margin: 0px !important;
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
                <h4><i class="icon-reorder"></i>BÚSQUEDA DE DOCUMENTO DE VENTA</h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=nvmdocv"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nvldoct"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span4">
                            <div style="padding-left: 7px;" class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    
                        <div class="span4">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>

                    

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <button type="button" id="btnBusquedaAvanz" class="btn btn-link" data-ver="false"><i id="iconAvanz" class="icon-chevron-down"></i>  Busqueda Avanzada....</button>
                            </div>
                        </div>
                    </div>                                
               
                </div>

                <div class="row-fluid bavanzado">

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
                                <input type="text" id="txtSerie" class="span12" maxlength="5" onkeyup="this.value=solonumbef(this.value)"/>
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

                <div class="row-fluid bavanzado">
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

                <div class="row-fluid bavanzado">
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

                <div class="row-fluid bavanzado">
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
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoVenta">Tipo Venta</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboTipoVenta" class="span12" data-placeholder="Estado">
                                    <option value="TODOS">TODOS</option>
                                    <option value="N">REGULAR</option>
                                    <option value="R">RAPIDA</option>
                                    <option value="A">ANTICIPO</option>
                                    <option value="P">POS</option>
                                    <option value="T">TOMA PEDIDO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">          
                   
                    <div class="span12">
                        <table id="tblTotalesRes" class="table table-bordered">
                            <thead>
                              <tr>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color:black;"><i class="icon-pushpin" style="color: black"></i>&nbsp;VENTA REGULAR</label>
                                    </strong>
                                </th>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
	                                    <label style="font-weight: 600; color:#094CB4;"><i class="icon-pushpin" style="color: #094CB4"></i>&nbsp;VENTA RAPIDA</label>
                                    </strong>
                                </th>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
	                                    <label style="font-weight: 600; color:#AD193E;"><i class="icon-pushpin" style="color: #AD193E"></i>&nbsp;ANULADA</label>
                                    </strong>
                                </th>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color:#5535B0;"><i class="icon-pushpin" style="color: #5535B0"></i>&nbsp;ANTICIPOS</label>
                                    </strong>
                                </th>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color:#00A300;"><i class="icon-pushpin" style="color: #00A300"></i>&nbsp;ORDEN DE SERVICIO</label>
                                    </strong>
                                </th>
                                 <%--<th colspan="2" width="17%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color: #00839A;"><i class="icon-pushpin" style="color: #00839A"></i>&nbsp;TOMA PEDIDO</label>
                                    </strong>
                                </th>--%>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td id="tdVtaNormalSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaNormalDol" width="8.5%" class="derecha"></td>

                                <td id="tdVtaRapidaSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaRapidaDol" width="8.5%" class="derecha"></td>

                                <td id="tdVtaAnuladaSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaAnuladaDol" width="8.5%" class="derecha"></td>

                                <td id="tdVtaAnticipoSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaAnticipoDol" width="8.5%" class="derecha"></td>

                                <td id="tdVtaPosSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaPosDol" width="8.5%" class="derecha"></td>

                                <%--<td id="tdVtaTomPedSol" width="8.5%" class="derecha"></td>
                                <td id="tdVtaTomPedDol" width="8.5%" class="derecha"></td>--%>
                              </tr>
                              <tr border="0">
                                <td id="tdTotales" colspan="12" width="100%" class="centro"></td>
                              </tr>
                            </tbody>
                        </table>
                    </div>

                    
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>CÓDIGO</th>
                                    <th>DOCUMENTO</th>
                                    <th>FECHA<br />
                                        EMISIÓN</th>
                                    <th>NRO. DOC.</th>
                                    <th>CLIENTE</th>
                                    <th>MONEDA</th>
                                    <th>BASE IMPONIBLE</th>
                                    <th>DETRACCIÓN</th>
                                    <th>TOTAL</th>
                                    <th>MODO<br />
                                        PAGO</th>
                                    <th>FORMA<br />
                                        PAGO</th>
                                    <th>NOMBRE VENDEDOR</th>
                                    <th>VENDEDOR</th>
                                    <th>USUA REG.</th>
                                    <th>ESTADO</th>
                                    <th>VIGENCIA</th>
                                    <th>ASIENTO CONTABLE</th>
                                    <th>GLOSA</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                
                <div class="row-fluid" style="margin-top: 25px; border: solid 1px;">
                    
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: black"></i>&nbsp;VENTA REGULAR</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #094CB4"></i>&nbsp;VENTA RAPIDA</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #AD193E"></i>&nbsp;ANULADA</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #5535B0"></i>&nbsp;ANTICIPOS</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #00A300"></i>&nbsp;ORDEN DE SERVICIO</label></strong>
                            </div>
                        </div>
                    </div>
                    <%--<div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #00839A"></i>&nbsp;TOMA PEDIDO</label></strong>
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
        <input type="hidden" id="hfUltimo" />
        <input type="hidden" id="hfPrimero" />
    </div>

</div>

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>


<div id="modal_info" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 34%; width: 70%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalTitulo">Información de la venta</h4>
    </div>
    <div class="modal-body" id="ventanaInfo" style="overflow-y: auto !important; max-height: 420px">
        <div id="divDetVenta">
            <div class="row-fluid">
            <div class="span2" style="text-align: center">
                <%--<a id="corrAnterior" href="#" class="btn green tooltips" data-placement="bottom" data-original-title="Correlativo Anterior"><i class="icon-chevron-left"></i>&nbsp;</a>
                <br />
                <br />
                <a id="docAnterior" href="#" class="btn purple tooltips" data-placement="top" data-original-title="Documento Anterior"><i class="icon-arrow-left"></i>&nbsp;</a>
                <br />
                <br />
                <a id="priDocumento" href="#" class="btn black tooltips" data-placement="top" data-original-title="Primer Documento"><i class="icon-circle-arrow-left"></i>&nbsp;</a>--%>
                <a id="corrAnterior" href="#" data-placement="bottom" data-original-title="Correlativo Anterior" class="btn-det verde" style="text-decoration: none">
                    <img src="../../recursos/img/Siguiente Izquierda.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="clieAnterior" href="#" data-placement="bottom" data-original-title="Anterior mismo Cliente" class="btn-det naranja" style="text-decoration: none">
                    <img src="../../recursos/img/Anterior Cliente.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="docAnterior" href="#" data-placement="top" data-original-title="Documento Anterior" class="btn-det azul" style="text-decoration: none">
                    <img src="../../recursos/img/Anterior Doc.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="priDocumento" href="#" data-placement="top" data-original-title="Primer Documento" class="btn-det morado" style="text-decoration: none">
                    <img src="../../recursos/img/Ultimo.jpg" />&nbsp;</a>
            </div>
            <div class="span8" id="divInfo">
                <table id="tblInfo" class="table table-condensed" style="width: 100%;">
                    <tbody>
                        <tr>
                            <th>DOCUMENTO</th>
                            <td id="tblDoc"></td>
                            <th>FECHA</th>
                            <td id="tblFecha"></td>
                            <th>MONEDA</th>
                            <td id="tblMoneda"></td>
                        </tr>
                        <tr>
                            <th>CLIENTE</th>
                            <td colspan="5" id="tblCliente"></td>
                        </tr>
                        <tr>
                            <th>MODO PAGO</th>
                            <td id="tblMopa" colspan="2"></td>
                            <th>FORMA PAGO</th>
                            <td id="tblFopa" colspan="2"></td>
                        </tr>
                        <tr>
                            <th>PAGADO EN</th>
                            <td id="tblCaja" colspan="2"></td>
                            <th>ESTADO</th>
                            <td id="tblEstado" colspan="2"></td>
                        </tr>
                        <tr>
                            <th>VENDEDOR</th>
                            <td colspan="5" id="tblVendedor"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="span2" style="text-align: center">
                <%--<a id="corrSiguiente" href="#" class="btn green tooltips" data-placement="bottom" data-original-title="Siguiente Correlativo"><i class="icon-chevron-right"></i>&nbsp;</a>
                <br />
                <br />
                <a id="docSiguiente" href="#" class="btn purple tooltips" data-placement="top" data-original-title="Siguiente Documento"><i class="icon-arrow-right"></i>&nbsp;</a>
                <br />
                <br />
                <a id="ultDocumento" href="#" class="btn black tooltips" data-placement="top" data-original-title="Último Documento"><i class="icon-circle-arrow-right"></i>&nbsp;</a>--%>
                <a id="corrSiguiente" href="#" data-placement="bottom" class="btn-det verde" data-original-title="Siguiente Correlativo" style="text-decoration: none">
                    <img src="../../recursos/img/Siguiente Derecha.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="clieSiguiente" href="#" data-placement="bottom" class="btn-det naranja" data-original-title="Siguiente mismo Cliente" style="text-decoration: none">
                    <img src="../../recursos/img/Siguiente Cliente.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="docSiguiente" href="#" data-placement="top" class="btn-det azul" data-original-title="Siguiente Documento" style="text-decoration: none">
                    <img src="../../recursos/img/Siguiente Doc.jpg" />&nbsp;</a>
                <br />
                <br />
                <a id="ultDocumento" href="#" data-placement="top" class="btn-det morado" data-original-title="Último Documento" style="text-decoration: none">
                    <img src="../../recursos/img/Ultimo.fw.png" />&nbsp;</a>
            </div>
        </div>
        <br />
        <div id="divDetVta" class="row-fluid">
            <div id="DivtblDetalleVentas"class="span12" style="max-height: 200px; overflow-y: auto;">
                <table id="tblDetalleVenta" class="table table-bordered table-condensed" style="width: 100%;">
                    <thead>
                        <tr style="background-color: gainsboro;">
                            <th style="text-align: center">ITEM</th>
                            <th style="text-align: center">DESCRIPCION</th>
                            <th style="text-align: center">TIPO</th>
                            <th style="text-align: center">ALMACÉN</th>
                            <th style="text-align: center">CANT.</th>
                            <th style="text-align: center">UNID.</th>
                            <th style="text-align: center">PU</th>
                            <th style="text-align: center">BRUTO</th>
                            <th style="text-align: center">DESC.</th>
                            <th style="text-align: center">NETO</th>
                            <th style="text-align: center">ISC</th>
                            <th style="text-align: center">DETR.</th>
                            <th style="text-align: center">ESTADO DESP.</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div id="DivtblDetalleVentas2" class="span12" style="max-height: 200px; overflow-y: auto;" >
                <table id="tblDetalleVenta2" class="table table-bordered table-condensed" style="width: 100%;">
                    <thead>
                        <tr style="background-color: gainsboro;">
                            <th style="text-align: center">ITEM</th>
                            <th style="text-align: center">DESCRIPCION</th>
                            <th style="text-align: center">TIPO</th>
                            <th style="text-align: center">CANT.</th>
                            <th style="text-align: center">UNID.</th>
                            <th style="text-align: center">PU</th>
                            <th style="text-align: center">BRUTO</th>
                            <th style="text-align: center">DESC.</th>
                            <th style="text-align: center">NETO</th>
                            <th style="text-align: center">ISC</th>
                            <th style="text-align: center">DETR.</th>
                            <th style="text-align: center">ESTADO DESP.</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="divDetAnticipo" class="row-fluid">
            <div class="span2"></div>

            <div class="span8" style="max-height: 200px; overflow-y: auto;">
                <table id="tblGlosaAnticipo" class="table table-bordered table-condensed" style="width: 100%;">
                    <thead>
                        <tr style="background-color: gainsboro;">
                            <th>GLOSA</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="span2"></div>
        </div>
        <br />
        <div class="row-fluid">
            <%--<div class="span2" style="text-align:center">
                <a href="#" class="btn green tooltips" data-placement="top" data-original-title="Documento Anterior"><i class="icon-chevron-left"></i>&nbsp;</a>
                <br />
                <br />
                <a href="#" class="btn purple tooltips" data-placement="top" data-original-title="Ticket Anterior"><i class="icon-arrow-left"></i>&nbsp;</a>
                <br />
                <br />
                <a href="#" class="btn black tooltips" data-placement="top" data-original-title="Primer Documento"><i class="icon-circle-arrow-left"></i>&nbsp;</a>
            </div>--%>
            <div class="span2"></div>
            <div class="span8">
                <table id="tblMontos" class="table table-condensed" style="width: 100%;">
                    <tbody>
                        <tr>
                            <th>BASE IMPONIBLE</th>
                            <td id="tblBase" style="text-align: center;"></td>
                            <th>DESCUENTO</th>
                            <td id="tblDescuento" style="text-align: center;"></td>
                            <th>ISC</th>
                            <td id="tblisc" style="text-align: center;"></td>
                        </tr>
                        <tr>
                            <th>OP. EXONERADA</th>
                            <td id="tblExonerada" style="text-align: center;"></td>
                            <th>OP. GRAVADA</th>
                            <td id="tblGravada" style="text-align: center;"></td>
                            <th>OP INAFECTA</th>
                            <td id="tblInafecta" style="text-align: center;"></td>
                        </tr>
                        <tr>
                            <th>IMPORTE TOTAL</th>
                            <td id="tblImporte" style="text-align: center;"></td>
                            <th>REDONDEO</th>
                            <td id="tblRedondeo" style="text-align: center;"></td>
                            <th>DONACION</th>
                            <td id="tblDonacion" style="text-align: center;"></td>
                        </tr>
                        <tr>
                            <th>DETRACCIÓN</th>
                            <td id="tblDetraccion" style="text-align: center;"></td>
                            <th>PERCEPCIÓN</th>
                            <td id="tblPercepcion" style="text-align: center;"></td>
                            <th>RETENCIÓN</th>
                            <td id="tblRetencion" style="text-align: center;"></td>
                        </tr>
                        <tr>
                            <th>IGV(%)</th>
                            <td id="tblPctjigv" style="text-align: center;"></td>
                            <th>MONTO IGV</th>
                            <td id="tblMontoigv" style="text-align: center;"></td>
                            <th>IMPORTE COBRAR</th>
                            <td id="tblCobrar" style="text-align: center;"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        
        </div>
        
            <div class="tab-pane" id="asientos_contables">
                    <div id="divGenAsiento" class="row-fluid">
                         <div class="span2">
                             <button type="button" id="btnGenerarAsiento" class="btn green"><i class="icon-plus"></i>&nbsp Generar Asiento</button>
                         </div>
                     </div>
                                
                                <br />

                     <div class="row-fluid" >
                         <table id="tblLista" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CUO
                                    </th>
                                    <th>NroMov
                                    </th>
                                    <th>Año
                                    </th>
                                    <th>Mes
                                    </th>
                                    <th>Descripción
                                    </th>
                                    <th>Tipo Asiento
                                    </th>
                                    <th>Fecha Emisión
                                    </th>
                                    <th>Fecha Transacción
                                    </th>
                                    <th>Declarado
                                    </th>
                                    <th>Moneda
                                    </th>
                                    <th>Tipo Cambio
                                    </th>
                                    <th>Ver Detalle
                                    </th>
                                 </tr>
                            </thead>
                         </table>
                     </div>
            </div>
        <br />

    </div>
    <div class="modal-footer">
        <div class="row-fluid">
            <%--<div class="span1"></div>--%>
            <div class="span8" id="divBotones1">
                <a class="btn purple" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                <a id="btnImprimirDetalle" class="btn black"><i class="icon-print"></i>&nbsp; Imprimir</a>
                <a class="btn blue" id="btnVerAsiento"><i class="icon-book"></i>&nbsp; Ver Asiento</a>
                <a class="btn blue" id="btnVerDetVenta" style="display:none"><i class="icon-book"></i>&nbsp; Ver Detalle Venta</a>
                <a class="btn red" id="btnGenerarPDF"><i class="icon-download"></i>&nbsp; Descargar PDF</a>
            </div>
            <div class="span7" id="divBotones2" style="display: none;">
                <%--<a class="btn purple" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                <a id="btnImprimirDetalle" class="btn black"><i class="icon-print"></i>&nbsp; Imprimir</a>
                <a class="btn blue" id="btnVerAsiento"><i class="icon-book"></i>&nbsp; Ver Asiento</a>
                <a class="btn blue" id="btnVerDetVenta" style="display:none"><i class="icon-book"></i>&nbsp; Ver Detalle Venta</a>
                <a class="btn red" id="btnGenerarPDF" style="display:none"><i class="icon-book"></i>&nbsp; Generar PDF</a>--%>
                <asp:Button class="btn red" ID="btnLibroPDF" runat="server" Text="Descargar PDF" OnClick="btnPdf_Click"/>
            </div>
            <%--<div class="span3"></div>--%>
        </div>
    </div>
</div>
<div class="row-fluid">
    <asp:HiddenField ID="hddCodDoc" runat="server" />
    <asp:HiddenField ID="hddDesca" runat="server" />
</div>

<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
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
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<input id="hfPIDM" type="hidden" />
<input id="hfTipoModulo" type="hidden" />
<script type="text/javascript" src="../vistas/NV/js/NVLDOCT.js?<%=aleatorio%>"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLDOCT.init();
    });
</script>
