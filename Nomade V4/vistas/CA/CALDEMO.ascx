<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALDEMO.ascx.vb" Inherits="vistas_CA_CALDEMO" %>
<style type="text/css">
    #divWhatsapp{
        margin-left: 0px !important;
    }
    @media (max-width:900px) {
        #divWhatsapp{
            left: 5% !important;
            width: 90% !important;
        }
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DETALLE DE MOVIMIENTOS</h4>
                <div class="actions">
                    <a id="btnActualizar" class="btn green" href="#"><i class="icon-refresh"></i>&nbsp;Actualizar</a>
                    <a id="btnCerrarCaja" class="btn red" href="#"><i class="icon-lock"></i>&nbsp;Cerrar Caja</a>
                    <a id="btnDiferirEfectivo" class="btn orange" href="#"><i class="icon-money"></i>&nbsp;Diferir Efec.</a>
                    <a class="btn green" id="btnWhatsapp" href="#"><i class="icon-phone"></i>&nbsp;Whatsapp</a>
                    <a id="btnMail" class="btn purple" href="#"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black" href="javascript:$('#styleImpresion').remove();imprimirTodo(['divTotales','detalles']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a id="btnRegresar" class="btn black"><i class="icon-circle-arrow-left"></i>&nbsp;Regresar</a>
                </div>
            </div>

            <div class="portlet-body" id="ventanaMovimientos">
                <div class="row-fluid">
                    <div class="span5 ">
                        <button id="btnDetallesCaja" type="button" class="btn blue span6"><i class="icon-chevron-down"></i><span>&nbsp;Ver Totales</span></button>
                        <button id="btnVerPendientes" type="button" class="btn blue span6"><i class="icon-time"></i><span>&nbsp;Ver Movimientos Pendientes</span></button>
                    </div>
                    <div class="span4">
                        <small><strong>EMPRESA: </strong><span id="lblEmpresa"></span></small><br />
                       <small><strong>CAJA: </strong><span id="lblCaja"></span></small>
                    </div>
                    <div class="span3">
                        <button id="btnReporteDetallado" type="button" class="btn green span6">&nbsp;Reporte Detallado</button>
                        <button id="btnReporteResumen" type="button" class="btn green span6">&nbsp;Reporte Resumen</button>
                        <%--<button id="btnReporteResumen" type="button" class="btn green span6">&nbsp;Reporte Resumen</button>--%>
                      <%--  <asp:Button class="btn green" ID="btnLibroPDF" CssClass="btnLibroPDF btn green" runat="server" Text="Reporte PDF" />--%>
                        <asp:Button class="btn green" ID="btndescarga" CssClass="btnLibroPDF btn green"   runat="server" Text="Descraga PDF" Style="display:none;" />
                        <asp:Button class="btn green" ID="btndescarga_re" CssClass="btnLibroPDF btn green"   runat="server" Text="Descraga PDF" Style="display:none;" />
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divTotales" style="display:none;">

                    </div>
                </div> 

                <div class="row-fluid" style="margin-top: 5px;" id="contenedorDetalles">
                    <div class="portlet box blue">
                        <div class="portlet-title" style="background-color: #4B8CC5;cursor:pointer;"  title="Ocultar/Mostrar Pendientes"">
                            <h4><i class="icon-book"></i>MOVIMIENTOS</h4>
                        </div>
                        <div class="portlet-body" id="detalles">
                            <div id="divDetalles">

                                 <table id="tblDatos" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                                    <thead class="fondoHeader">
                                        <tr>
                                            <th>CODIGO</th>
                                            <th>FECHA / HORA DE PAGO</th>
                                            <th>ORIGEN/DESTINO</th>
                                            <th>CONCEPTO</th>
                                            <th>DETALLE</th>
                                            <th>TIPO</th>
                                            <th>NRO DOC</th>
                                            <th>INGRESO (<span class="simboloMoba">S/</span>)</th>
                                            <th>INGRESO (<span class="simboloMoal">S/</span>)</th>
                                            <th>EGRESO (<span class="simboloMoba">$</span>)</th>
                                            <th>EGRESO (<span class="simboloMoal">$</span>)</th>
                                            <th>CAJERO</th>
                                            <th></th>
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
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<div id ="detalleImpresion" style="display:block;">          
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

<div id="divWhatsapp" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 60%; left: 20%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divWhatsapp_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar Whatsapp</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divWhatsapp_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboClienteWhatsapp"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtContenidoWhatsapp"></textarea><hr style="margin: 8px 0px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarWhatsapp()" id="btnEnviarWhatsapp"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>


<asp:HiddenField ID="hddDesca" runat="server" />
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CALDEMO.js"></script>


<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALDEMO.init();

    });
</script>
