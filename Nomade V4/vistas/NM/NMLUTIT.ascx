<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLUTIT.ascx.vb" Inherits="vistas_NM_NMLUTIT" %>

<style>
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
                <h4><i class="icon-reorder"></i>UTILIDADES BRUTAS POR ITEMS</h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" style="display: inline-block;">Incluir Servicios</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <input type="checkbox" id="chkInServicios" name="chkInServicios"/>
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
                            <div class="control-group">
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
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblMoneda" class="control-label" for="cboEstablecimiento">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_moneda" class="span8" data-placeholder="Moneda">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group span1">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div> 
                    
                </div>

                <div class="row-fluid" >          
                        <div id="divValorizadoTotal" style="display: inline;" >
                            <div class="span2 offset1">
                                <div class="control-group">
                                     <div class="controls">
                                        <label class="left" style="font-size: 1.3em; font-weight: 600; "><strong>TOTAL UTILIDADES:</strong></label>
                                     </div>
                                </div>
                            </div>


                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="left" id="lblValorizadoTotal" style="font-size: 1.8em; font-weight: 600; color:red; "></label>
                                        
                                    </div>
                                </div>
                           </div>

                            <div class="span2 " id="SinIGV">
                             <p style="font-style: italic; color: blue; text-align: justify" class="span">
                                 <%--<label class="left" style="font-size: 1.1em; font-weight: 500;" id="msjSinIGV">*Los valores no incluyen IGV</label>--%>
                                 <medium id="smIncIGV">* Los valores <b> NO </b> incluyen IGV *</medium>
                             </p>
                        </div>

                        </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <%--<th></th>--%>
                                    <th>CÓDIGO</th>
                                    <th>DOCUMENTO</th>
                                    <th>FECHA<br />
                                        EMISIÓN</th>
                                    <th>TIPO DOC.</th>
                                    <th>NRO. DOC.</th>
                                    <th>CLIENTE</th>
                                    <th>CATEGORÍA CLIENTE</th>
                                    <%--<th>NOMBRE VENDEDOR</th>--%>
                                    <th>USUARIO</th>
                                    <th>CÓDIGO<br />
                                        PRODUCTO/SERVICIO</th>
                                    <th>PRODUCTO/SERVICIO</th>
                                    <th>CENTRO COSTO</th>
                                   <%-- <th>GRUPO</th>
                                    <th>SUB-GRUPO</th>
                                    <th>MARCA</th>--%>
                                    <th>ALMACÉN</th>
                                    <th>UNIDAD</th>
                                    <th>CANTIDAD</th>
                                    <%--<th>CANTIDAD DESPACHADA</th>
                                    <th>CANTIDAD NO DESPACHADA</th>
                                    <th>ESTADO DESPACHO</th>--%>
                                    <th>MONEDA</th>
                                    <th>PRECIO<br />
                                        UNITARIO</th>
                                    <th>PRECIO<br />
                                        TOTAL</th>
                                    <th>COSTO<br />
                                        UNITARIO</th>
                                    <th>COSTO<br />
                                        TOTAL</th>
                                    <th>UTILIDAD<br />
                                        UNIDAD</th>
                                    <th>UTILIDAD<br />
                                        ITEM</th>
                                   <%-- <th>#</th>--%>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                
                <%--<div class="row-fluid" style="margin-top: 30px; border: solid 1px;">
                    
                    <div class="span3">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: black"></i>&nbsp;VENTA REGULAR</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #094CB4"></i>&nbsp;VENTA RAPIDA</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #AD193E"></i>&nbsp;ANTICIPOS</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: #00A300"></i>&nbsp;VENTA POS</label></strong>
                            </div>
                        </div>
                    </div>
                </div>--%>
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

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NM/js/NMLUTIT.js?<%=aleatorio%>"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLUTIT.init();
    });
</script>

