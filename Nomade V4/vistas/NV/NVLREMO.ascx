<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLREMO.ascx.vb" Inherits="vistas_NV_NVLREMO" %>
<style type="text/css">
    #divMail, #divBuscarDoc, #divLetras, #divAnticipos,#mapaModal {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divMail, #divBuscarDoc, #divLetras, #divAnticipos,#mapaModal {
            left: 5% !important;
            width: 90% !important;
        }
    }

    @media print {

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
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
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
                    <i class="icon-reorder"></i>REPORTE MONETARIO</h4>
                <div class="actions">
                    <%--<a id="btnActualizar" class="btn green" href="#"><i class="icon-refresh"></i>&nbsp;Actualizar</a>--%>
                    <a class="btn green" onclick="javascript:NuevaVenta();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a id="btnMail" class="btn purple" href="#" style="display: none;"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <%--<a class="btn black" href="javascript:$('#styleImpresion').remove();imprimirTodo(['divTotales','detalles']);"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a class="btn black btnImprimir" onclick="javascript:imprimirReporte();" style="display: none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body" id="ventanaMovimientos">
                <div class="row-fluid">
                    <div class="span1">

                        <label>Empresa</label>

                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <label>Establecimiento</label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12 estable"  data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnBuscar" class="btn blue">FILTRAR</a>
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
                    <div class="span2 offset1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="checkbox" id="chkDetGastos" />
                                Ver Detalle de Gastos
                            </div>
                        </div>
                    </div> 
                    <div class="span1">
                    </div>
                    <div class="span2" id="div_generarDPF" style="display: none;">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnGenerarLibro" class="btn orange span12" >Generar PDF</a>
                            </div>
                        </div>
                    </div>
                    <div class="span2" id="div_descargarPDF" style="display: none;">
                        <div class="control-group">
                            <div class="controls">
                                <asp:Button class="btn green" ID="btndescargaPDF" CssClass="btnLibroPDF btn green span12" runat="server" Text="Descargar PDF" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="div_1Parte" style="display: none;">
                    <div>   
                        <div id="divTotales" class="span6">

                        </div>
                        <div id="divTotalesCobroVentasCredito" class="span6">

                        </div>
                    </div>
                </div> 
                <div class="row-fluid" style="margin-top: 5px;" id="contenedorDetalles">
                    <div class="portlet box blue">
                        <div class="portlet-title" style="background-color: #4B8CC5;cursor:pointer;"  title="Ocultar/Mostrar Pendientes"">
                            <h4><i class="icon-book"></i>RESUMEN CAJAS</h4>
                        </div>
                        <div class="portlet-body" id="detalles">
                            <div id="divDetalles">

                                 <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                                    <thead class="fondoHeader">
                                        <tr>
                                            <th>CODIGO</th>
                                            <th>INFORME CAJAS</th>
                                            <%--<th>ESTABLECIMIENTO</th>--%>
                                            <th>SALDO EFECTIVO (<span class="simboloMoba">S/</span>)</th>
                                            <th>INGRESO EFECTIVO (<span class="simboloMoba">S/</span>)</th>
                                            <th>INGRESO TARJETA (<span class="simboloMoba">S/</span>)</th>
                                            <th>EGRESO EFECTIVO (<span class="simboloMoba">S/</span>)</th>
                                            <th>DIFERIDO A BANCO (<span class="simboloMoba">S/</span>)</th>
                                            <th>DIFERIDO A OTRA CAJA (<span class="simboloMoba">S/</span>)</th>
                                            <th>SALDO EFECTIVO (<span class="simboloMoal">$</span>)</th>
                                            <th>INGRESO EFECTIVO (<span class="simboloMoal">$</span>)</th>
                                            <th>INGRESO TARJETA (<span class="simboloMoal">$</span>)</th>
                                            <th>EGRESO EFECTIVO  (<span class="simboloMoal">$</span>)</th>
                                            <th>DIFERIDO A BANCO (<span class="simboloMoal">$</span>)</th>
                                            <th>DIFERIDO A OTRA CAJA (<span class="simboloMoal">$</span>)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="div_2Parte" style="display: none;">
                    <div class="span8" >
                        <div class="span6" id="divPagoGastosPorBanco">

                        </div>
                        <div class="span6" id="divVentasArea">

                        </div>
                        <div class="span12" style="margin-left: 0" id="divDetGastos">

                        </div>
                        <div class="span12" style="margin-left: 0" id="divInconsistencias">

                        </div>
                    </div>
                    <div class="span4" id="divVentasSubArea">

                    </div>
                </div> 
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<div id ="detalleImpresion" style="display:block;">          
</div>

<div id="divDctoImprimir" style="display: none;">    
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


<asp:HiddenField ID="hddDesca" runat="server" />
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVLREMO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLREMO.init();

    });
</script>
