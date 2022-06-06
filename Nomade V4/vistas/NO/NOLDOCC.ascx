<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLDOCC.ascx.vb" Inherits="vistas_NO_NOLDOCC" %>

<style>
    a.btn-det > img {
        max-width: 27%;
        padding-left: 14px;
        padding-bottom: 4px;
    }

    .centro {
        text-align:center;
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

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DOCUMENTOS COMPRA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nomdocc" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=noldocc" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="divCboEmpresa">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_establecimiento">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="divCboEstablecimiento">
                                    <select id="cbo_establecimiento" class="span12" data-placeholder="Establecimiento">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoDcto">
                                    Tipo de Dcto.</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="divCboTipoDcto">
                                    <select id="cboTipoDcto" class="span12" data-placeholder="Tipo Dcto.">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProducto">
                                Producto:</label>
                        </div>
                    </div>

                    <div class="span3" id="divCboProducto">
                        <div class="control-group ">
                            <div class="controls" >
                                <select id="cboProducto" class="span12" data-placeholder="Producto">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Periodo Trib</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_periodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaEmisionI" style="text-align: right">
                                    Emisión desde</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaEmisionI" placeholder="dd/mm/yyyy" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaEmisionF" style="text-align: right">
                                    Emisión hasta</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaEmisionF" placeholder="dd/mm/yyyy" class="span12" />
                                </div>
                            </div>
                        </div>                                                
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">   
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboProveedor">
                                    Proveedor</label>
                            </div>
                        </div>

                        <div class="span3" id="divCboProveedor">
                            <div class="control-group ">
                                <div class="controls" >
                                    <select id="cboProveedor" class="span12" data-placeholder="Proveedor">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboProveedor">
                                    Vigencia</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls" >
                                    <select id="cboEstado" class="span12" data-placeholder="Estado">
                                        <option value="TODOS">TODOS</option>
                                        <option value="V">VIGENTES</option>
                                        <option value="A">ANULADOS</option>
                                        <option value="I">INCOMPLETOS</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                               <input type="button" class="btn blue" value="FILTRAR" id="btnFiltrar" />
                            </div>

                            
                        </div>
                    </div>
                </div>

                <div class="row-fluid">                    
                    <div class="span1"></div>

                    <div class="span10">
                        <table id="tblTotalesRes" class="table table-bordered">
                            <thead>
                              <tr>
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color:black; text-align:center;"><i class="icon-pushpin" style="color: black"></i>&nbsp;COMPRAS</label>
                                    </strong>
                                </th>                                
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
	                                    <label style="font-weight: 600; color:red; text-align:center;"><i class="icon-pushpin" style="color: red"></i>&nbsp;ANULADAS</label>
                                    </strong>
                                </th>                                
                                <th colspan="2" width="20%" class="centro">
                                    <strong>
                                        <label style="font-weight: 600; color:purple; text-align:center;"><i class="icon-pushpin" style="color: purple"></i>&nbsp;INCOMPLETAS</label>
                                    </strong>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td id="tdComprasNormalSol" width="10%" class="derecha" style="text-align:right"></td>
                                <td id="tdComprasNormalDol" width="10%" class="derecha" style="text-align:right"></td>                                

                                <td id="tdComprasAnuladaSol" width="10%" class="derecha" style="text-align:right"></td>
                                <td id="tdComprasAnuladaDol" width="10%" class="derecha" style="text-align:right"></td>                                

                                <td id="tdComprasImcompletaSol" width="10%" class="derecha" style="text-align:right"></td>
                                <td id="tdComprasImcompletaDol" width="10%" class="derecha" style="text-align:right"></td>
                              </tr>
                              <tr border="0">
                                <td id="tdTotales" colspan="10" width="100%" class="centro"></td>
                              </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="span1"></div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th style="text-align: center"></th>
                                    <th style="text-align: center">CODIGO</th>
                                    <th style="text-align: center">ESTABLECIMIENTO</th>
                                    <th style="text-align: center">TIPO DCTO</th>
                                    <th style="text-align: center">NRO DCTO</th>
                                    <th style="text-align: center">EMISION</th>
                                    <th>PROVEEDOR</th>
                                    <th style="text-align: center">ESTADO</th>
                                    <th style="text-align: center">MONEDA</th>
                                    <th style="text-align: right">BASE IMP</th>                                  
                                    <th style="text-align: center">EMPRESA</th>
                                    <th style="text-align: center">SUCURSAL</th>
                                    <th style="text-align: center">TIPO_DCTO</th>
                                    <th style="text-align: center">ASIENTO CONTABLE</th>
                                    <th style="text-align: center">PER. TRIB.</th>
                                    
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 25px; border: solid 1px;">
                    
                    <div class="span4">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600; text-align:center"><i class="icon-pushpin" style="color: black"></i>&nbsp;COMPRAS</label></strong>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span4">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600; text-align:center"><i class="icon-pushpin" style="color: red"></i>&nbsp;ANULADAS</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600; text-align:center"><i class="icon-pushpin" style="color: purple"></i>&nbsp;INCOMPLETOS</label></strong>
                            </div>
                        </div>
                    </div>  
                                       
                </div>

                <%--<div class="row-fluid" style="margin-top: 10px;">
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
                                    <th>GLOSA</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>--%>


            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NO/js/NOMDOCC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLDOCC.init();

    });
</script>
