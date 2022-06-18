<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALINSA.ascx.vb" Inherits="vistas_NA_NALINSA" %>

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

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA  ENTRADA / SALIDA  ALMACEN</h4>
                <div class="actions">
                    <%--<a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=naminsa" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nalinsa" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_empresa_l">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_empresa_l" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_Almc">
                                    Almacén</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_Almc" class="span12" data-placeholder="Almacén">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboProducto">
                                    Producto</label>
                            </div>
                        </div>
                        <div class="span7" id="divProducto">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoProducto" type="hidden" />
                                    <input id="txtCodigoAntiguoProducto" type="text" class="span4" placeholder="Código" />
                                    <input id="txtNombreProducto" type="text" class="span8" placeholder="Descripción Producto" />
                                    <%--<select id="cboCodigoProducto" class="span4" data-placeholder="Codigo"></select>
                                    <select id="cboProducto" class="span8" data-placeholder="Producto"></select>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
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
                    <div class="span2">

                        <input type="button" class="btn blue" value="FILTRAR" id="btnFiltrar" />

                    </div>
                </div>
                <div class="row-fluid" style="padding-top: 15px">
                    <div class="span12" id="div_tabla_dctos">
                        <table id="tabla_det" class="table-hover" border="0">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>CODIGO</th>
                                    <th style="text-align: left">FLUJO</th>
                                    <th style="text-align: left">OPERACIÓN</th>
                                    <th style="text-align: center">MONEDA</th>
                                    <th>ORIGEN</th>
                                    <th style="text-align: left">DESTINO</th>
                                    <th>DIRECCIÓN DESTINO</th>
                                    <th>EMISIÓN</th>
                                    <th>DCTO REGISTRO</th>
                                    <th>SERIE</th>
                                    <th>NRO</th>
                                    <th>TRANSPORTISTA</th>
                                    <th>REALIZADO POR</th>
                                    <th>ASIENTO CONTABLE</th>
                                    <th>GLOSA</th>
                                    <th>PESO TOTAL (Kg)</th>
                                    <th>COSTO TOTAL (S/)</th>
                                    <th>ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <asp:HiddenField ID="hfObjJson" runat="server" />
        </div>
    </div>
</div>
<%--</div>--%>



<div id="mapaModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 45%;" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H2">Localización</h3>
    </div>
    <div class="modal-body" style="text-align: center">

        <div id="map" style="height: 300px"></div>

    </div>
    <div class="modal-footer">
    </div>
</div>

<div id="modalGConfirmacion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" style="top: 20%; left: 58%;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalGConfirmacion_title">Confirmación</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="modalGConfirmacion_body">¿Desea cambiar la localización actual?</div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn blue" type="button" id="modGSi"><i class="icon-ok"></i>&nbsp;Si</button>
        <button class="btn red" type="button" id="modGNo"><i class="icon-remove"></i>&nbsp;No</button>
    </div>
</div>
<div id="divDctoImprimir" style="display: none;"></div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NA/js/NAMINSA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALINSA.init();

    });
</script>
