<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMDIAG.ascx.vb" Inherits="vistas_NF_NFMDIAG" %>
<style type="text/css">
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

<link rel="stylesheet" type="text/css" href="../recursos/plugins/bootstrap-timepicker/compiled/timepicker.css" />
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-cogs"></i>DIAGNÓSTICO DE PRODUCTO SOPORTE</h4>
                <div class="actions">
                    <a class="btn black btnImprimir" href="javascript:ImprimirDcto();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a id="btnMail" class="btn purple disabled" disabled="disabled"><i class="icon-envelope"></i>&nbsp Mail</a>
                    <a class="btn green" href="?f=nfmrece"><i class="icon-plus"></i>&nbsp Nuevo</a>
                    <a class="btn red" href="?f=nflrece"><i class="icon-list"></i>&nbsp Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div id="controlempresa" class="controls">
                                <select id="slcEmpresa" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" name="slcEmpresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div id="Div1" class="controls">
                                <select id="slcSucural" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" name="slcSucural" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcAlmacen">
                                Almacén</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcAlmacen" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Almacén" name="slcAlmacen" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnroatencion">
                                N° Atención
                            </label>
                            <div class="controls">
                                <input id="txtnroatencion" class="span12 m-wrap" disabled type="text"  style="font-weight:800;text-align: center;"/>
                                <input type="hidden" id="hfCodeDiag" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharegistro">
                                Registro
                            </label>
                            <div class="controls">
                                <input disabled class="m-wrap fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfecharegistro" />
                            </div>
                        </div>
                    </div>

                    <%--<div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txthoraregistro">
                                Hora
                            </label>
                            <div class="controls">
                                <div class="input-append bootstrap-timepicker-component">
                                    <input class="m-wrap m-ctrl-small timepicker-default span10" disabled type="text" id="txthoraregistro" />
                                    <span class="add-on"><i class="icon-time"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>--%>

                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharecepcion">
                                Recepción
                            </label>
                        </div>
                    </div>--%>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharecepcion">
                                Fecha Recepción
                            </label>
                            <div class="controls">
                                <div class="input-append date date-picker fecha" data-date-format="dd/mm/yyyy">
                                    <input disabled class="m-wrap date-picker fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfecharecepcion" /><span class="add-on"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txthorarecepcion">
                                Hora Recepción
                            </label>
                            <div class="controls">
                                <div class="input-append bootstrap-timepicker-component">
                                    <input class="m-wrap m-ctrl-small timepicker-default span10" disabled type="text" id="txthorarecepcion" />
                                    <span class="add-on"><i class="icon-time"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfechaentrega">
                                Entrega
                            </label>
                        </div>
                    </div>--%>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtfechaentrega">
                                Fecha Entrega
                            </label>
                            <div class="controls">
                                <div class="input-append date date-picker fecha" data-date-format="dd/mm/yyyy">
                                    <input disabled class="m-wrap date-picker fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfechaentrega" /><span class="add-on"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txthoraentrega">
                                Hora Entrega
                            </label>
                            <div class="controls">
                                <div class="input-append bootstrap-timepicker-component">
                                    <input class="m-wrap m-ctrl-small timepicker-default span10" disabled type="text" id="txthoraentrega" />
                                    <span class="add-on"><i class="icon-time"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcliente">
                                Cliente
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcliente" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." type="text" disabled />
                                <input type="hidden" id="hfPidmCliente" />
                                <input type="hidden" id="hfCateCliente" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtruc" id="lblruc">
                                RUC
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtruc" class="span12 m-wrap" disabled type="text" />
                                <input type="hidden" id="hfDctoCliente" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcotizacion">
                                Cotización
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls input-append">
                                <input id="txtcodcotizacion" name="txtcodcuenta" class="span9 m-wrap required" type="text" disabled="">
                                <a id="BuscaPJ" class="btn purple" data-toggle="modal" data-target="#muestralistap"><i class="icon-search"></i>&nbsp;</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtautorizado">
                                Autorizado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtautorizado" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdni">
                                DNI
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdni" class="span12 m-wrap" disabled type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcotizacion">
                                Monto Cotización
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcotizacion" class="span12 m-wrap" disabled type="text" value="0.00" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtproducto">
                                Producto
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtproducto" disabled class="span12 m-wrap" placeholder="Digite nombre de producto para seleccionar." type="text" />
                                <input id="hfProducto" type="hidden" />
                                <input id="hfPrecioInd" type="hidden" />
                                <input id="hfProdSeriado" type="hidden" />
                                <input id="hfAlmacenableInd" type="hidden" />
                                <input id="hfCosto" type="hidden" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtserie">
                                Serie
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtserie" class="m-wrap span12" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdiagnostico">
                                Diagnóstico
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtdiagnostico" class="span12 m-wrap" cols="20" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtrecomendacion">
                                Recomendación
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtrecomendacion" class="span12 m-wrap" cols="20" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdiagnostica">
                                Técnico Diagnostica
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdiagnostica" class="span12 m-wrap personasEmpleado" placeholder="Digite apellidos o nombres para seleccionar." type="text" />
                                <input id="hfDiagnostica" type="hidden" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtestado">
                                Estado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <input type="text" class="m-wrap span12" id="txtestado" />
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtconcepto">
                                Concepto Diagnóstico
                            </label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="hfConcepto" type="hidden" />
                                <input id="txtconcepto" disabled="disabled" class="span12 m-wrap" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtmonto">
                                Monto Diagnóstico
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtmonto" disabled="disabled" class="m-wrap span12" />
                            </div>
                        </div>
                    </div>
                    <div class="span2" style="display: none;">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fec_dia" data-date-format="dd/mm/yyyy" disabled="disabled"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="btnDiag" class="btn blue popovers" data-trigger="hover" data-placement="top" data-content="Se cierra la atención y se genera una venta por el concepto. (Recuerde que si ciera la atencion no podrá pasar a reparación)!!!" data-original-title="Cerrar Diagnóstico" href="javascript:CerrarDiagnostico('D'); "><i class="icon-cog"></i>&nbsp Cierre como Diagnóstico</a>
                    &nbsp;
                    <a id="btnRepa" class="btn yellow popovers" data-trigger="hover" data-placement="top" data-content="Se cierra el diagnóstico y se redirecciona a la pantalla de reparación!!!" data-original-title="Pase a Reparación" href="javascript:CerrarDiagnostico('R');"><i class="icon-certificate"></i>&nbsp Pase a Reparación</a>
                    &nbsp;
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp Cancelar</a>
                </div>
            </div>
        </div>
        <!-- FIN CUADRO PARA LA FORMA-->
    </div>
</div>


    <div id="muestralistap" style="width: 900px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4><i class="icon-reorder"></i>&nbsp;<span id="tituloModal">LISTA DE COTIZACIONES</span> </h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12" id="divmodal">
                    <!--aki se carga el contenido por jquery-->
                </div>
            </div>
        </div>
        <div class="modal-footer"></div>
    </div>

<%--MODAL PARA ENVIAR CORREO--%>
<div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none ;">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
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
                                    <input type="text" id="txtNRemitente" class="span12" disabled><input id="txtRemitente" type="hidden">
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
                                    <select multiple="multiple" class="span12" id="cboCorreos"></select>
                                    <%--<a href="?f=nclpers" target="_blank" title="Agregue correos en la pantalla Persona">Nuevo Correo</a>--%>
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
                            <h4 id="lblEmpresa"></h4>
                            <h5 id="lblAsunto"></h5>
                            <h6><strong>RECEPCIÓN:</strong>&nbsp;<span id="lblRecepcion"></span></h6>
                            <h6><strong>ENTREGA APROX.:</strong>&nbsp;<span id="lblEntrega"></span></h6>
                            <h6><strong>CLIENTE:</strong>&nbsp;<span id="lblCliente"></span></h6>
                            <h6> <strong>AUTORIZADO:</strong>&nbsp;<span id="lblAutorizado"></span></h6>
                            <h6><strong>PRODUCTO:</strong>&nbsp;<span id="lblProducto"></span></h6>
                            <h6><strong>DIAGNÓSTICO:</strong>&nbsp;<span id="lblDiagnostico"></span></h6>
                            <h6><strong>RECOMENDACIÓN:</strong>&nbsp;<span id="lblRecomendacion"></span></h6>
                            <h6><strong>TÉCNICO:</strong>&nbsp;<span id="lblTecnico"></span></h6>
                            <h6><strong>ESTADO:</strong>&nbsp;<span id="lblEstado"></span></h6>
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
<div id="divDctoImprimir" style="display: none;">
</div> 

<script type="text/javascript" src="../recursos/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
<script type="text/javascript" src="../vistas/NF/js/NFMDIAG.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMDIAG.init();
        $('.timepicker-default').timepicker({
            defaultTime: 'current',
            minuteStep: 1
        });
    });
</script>
