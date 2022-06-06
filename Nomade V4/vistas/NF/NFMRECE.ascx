<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMRECE.ascx.vb" Inherits="vistas_NF_NFMRECE" %>
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
        <div class="portlet box blue" id="ventana"> 
            <div class="portlet-title">
                <h4>
                    <i class="icon-cogs"></i>RECEPCIÓN DE PRODUCTO A SOPORTE</h4>
                <div class="actions">
                    <a class="btn black btnImprimir" href="javascript:ImprimirDcto();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a id="btnMail" class="btn purple disabled" disabled="disabled"><i class="icon-envelope"></i>&nbsp Mail</a>
                    <a href="?f=nfmrece" class="btn green"><i class="icon-plus"></i>&nbsp Nuevo</a>
                    <a href="?f=nflrece" class="btn red"><i class="icon-list"></i>&nbsp Listar</a>
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
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtnroatencion">
                                N° Atención
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 m-wrap" disabled id="txtnroatencion"  style="font-weight:800;text-align: center;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
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
                                    <input disabled class="m-wrap date-picker fecha span10" data-date-format="dd/mm/yyyy" type="text"  id="txtfechaentrega" /><span class="add-on"><i class="icon-calendar"></i></span>
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
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharegistro">
                                Registro
                            </label>
                        </div>
                    </div>--%>
                    <div class="span2" style="display: none ;">
                        <div class="control-group">
                            <label class="control-label" for="txtfecharegistro">
                                Registro
                            </label>
                            <div class="controls">
                                <div class="input-append date fecha" data-date-format="dd/mm/yyyy">
                                    <input disabled class="m-wrap fecha span10" data-date-format="dd/mm/yyyy" type="text" id="txtfecharegistro" /><span class="add-on"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2" style="display: none ;">
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
                            <div class="controls" id="divTxtClientes">
                                <input type="text" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." id="txtcliente" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtruc">
                                Documento
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select name="txtruc" id="txtruc" class="combo m-wrap span12 required" data-placeholder="Seleccionar Documento" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <div class="btn-group" id="down1">
                            <a class="btn" href="#" data-toggle="dropdown">
                                <i class="icon-user"></i>&nbsp
										<i class="icon-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:limpiarCliente();"><i class="icon-remove"></i>Limpiar</a></li>
                                <li><a href="?f=ncmclir" target="_blank"><i class="icon-plus"></i>Crear Nuevo</a></li>
                                <li><a href="javascript:guardarTelef();"><i class="icon-save"></i>Guardar Telef.</a></li>
                                <li><a href="javascript:cargarClientes();"><i class="icon-refresh"></i>Actualizar Clientes</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" placeholder="Nro. Telefónico" id="txtTelefono" class="m-wrap span12" onkeyup="this.value=solonumbef(this.value)"/>
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
                                <input type="text" class="span12 m-wrap" placeholder="Digite apellidos o nombres para seleccionar." id="txtautorizado" />
                                <input type="hidden" id="hfAutorizado" />
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
                                <input type="text" class="span12 m-wrap" id="txtdni" disabled />
                            </div>
                        </div>
                    </div>

                    <div class="span2">

                        <div class="btn-group" id="down2">
                            <a class="btn" href="#" data-toggle="dropdown">
                                <i class="icon-user"></i>&nbsp
										<i class="icon-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:limpiarAutorizado();"><i class="icon-remove"></i>Limpiar</a></li>
                                <li><a href="?f=ncmclir" target="_blank"><i class="icon-plus"></i>Crear Nuevo</a></li>
                                <li><a href="javascript:filltxtrazsocial_autorizado('#txtautorizado', '');" target="_blank"><i class="icon-refresh"></i>Actualizar</a></li>
                            </ul>
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
                            <div class="controls" id="input_desc_prod">
                                <input type="text" class="span12 m-wrap" placeholder="Digite nombre de producto para seleccionar." id="txtproducto" />
                                
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbobuscar">
                                Serie
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select class="combo m-wrap span12 required" id="cboBuscar" placeholder="Series">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="btn-group" id="down3">
                            <a class="btn" href="#" data-toggle="dropdown">
                                <i class="icon-cog"></i>&nbsp
										<i class="icon-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:limpiarProducto();"><i class="icon-remove"></i>Limpiar</a></li>
                                <li><a href="?f=nmmpror" target="_blank"><i class="icon-plus"></i>Crear Nuevo</a></li>
                                <li><a href="javascript:ingresarSerie();"><i class="icon-barcode"></i>Registrar Serie</a></li>
                                <li><a href="javascript:cargarProductos();"><i class="icon-refresh"></i>Actualizar Productos</a></li>
                            </ul>
                        </div>

                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" placeholder="Fecha Garantia" id="txtgarantia" class="m-wrap span12" disabled />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtaccesorios">
                                Accesorios
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtaccesorios" class="span12 m-wrap"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtmotivos">
                                Motivo(s)
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtmotivos" class="span12 m-wrap"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtrecepcionado">
                                Recepcionado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtrecepcionado" class="span12 m-wrap personasEmpleado" placeholder="Digite apellidos o nombres para seleccionar." />
                                <input type="hidden" id="hfRecepcionado" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtasignado">
                                Asignado
                            </label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtasignado" class="span12 m-wrap personasEmpleado" placeholder="Digite apellidos o nombres para seleccionar." />
                                <input type="hidden" id="hfAsignado" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue popovers" data-trigger="hover" data-placement="top" data-content="Se ingresa el producto a soporte y se genera un codigo de recepción para realizar seguimiento!" data-original-title="Grabar Recepción" href="javascript:Crear();"><i class="icon-save"></i>&nbsp Grabar</a>
                    &nbsp;
                    <a id="btnDiag" class="btn yellow disabled popovers" data-trigger="hover" data-placement="top" data-content="Se ingresa el producto a soporte, se registra la recepcion y redirecciona a la pantalla de diagnóstico!!!" data-original-title="Pase a Diagnóstico"  href="#"><i class="icon-certificate"></i>&nbsp Pase a diagnóstico</a>
                    &nbsp;
                    <a class="btn"  href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<div id="divseries" style="width: 600px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-barcode"></i>&nbsp;<span id="tituloModal">INGRESAR SERIE DE PRODUCTO</span> </h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divmodal">
                <!--aki se carga el contenido por jquery-->
                <div class="row-fluid">
                    <div class="alert alert-info">
						<strong>PRODUCTO:</strong> <span id="descProducto"></span>
					</div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcAlmacen">
                                Almacén</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcAlmacen" name="slcAlmacen" class="combo m-wrap span12 required" data-placeholder="Seleccionar Almacén" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNserie">
                                N° Serie</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNserie" name="txtNserie" class="m-wrap span12 required" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
            <a class="btn blue" href="javascript:crearSerie();"><i class="icon-save"></i> &nbsp Grabar</a>
        </div>
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
                            <h6><strong>REGISTRO:</strong>&nbsp;<span id="lblRegistro"></span></h6>
                            <h6><strong>RECEPCIÓN:</strong>&nbsp;<span id="lblRecepcion"></span></h6>
                            <h6><strong>ENTREGA APROX.:</strong>&nbsp;<span id="lblEntrega"></span></h6>
                            <h6><strong>CLIENTE:</strong>&nbsp;<span id="lblCliente"></span></h6>
                            <h6> <strong>AUTORIZADO:</strong>&nbsp;<span id="lblAutorizado"></span></h6>
                            <h6><strong>PRODUCTO:</strong>&nbsp;<span id="lblProducto"></span></h6>
                            <h6><strong>ACCESORIOS:</strong>&nbsp;<span id="lblAccesorios"></span></h6>
                            <h6><strong>MOTIVOS:</strong>&nbsp;<span id="lblMotivos"></span></h6>
                            <h6><strong>RECEPCIONADO:</strong>&nbsp;<span id="lblRecepcionado"></span></h6>
                            <h6><strong>ASIGNADO:</strong>&nbsp;<span id="lblAsignado"></span></h6>
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
<input type="hidden" id="hfProducto" />
<input type="hidden" id="hfProdSeriado" />
<input type="hidden" id="hfCliente" />

<script type="text/javascript" src="../recursos/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
<script type="text/javascript" src="../vistas/NF/js/NFMRECE.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMRECE.init();
        $('.timepicker-default').timepicker({
            defaultTime: 'current',
            minuteStep: 1
        });

    });
</script>
