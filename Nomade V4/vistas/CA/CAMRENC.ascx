<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMRENC.ascx.vb" Inherits="vistas_CA_CAMRENC" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<style>    
    @media (max-width:900px){ 
        #muestralistap {
            left:5% !important; 
            width:90% !important;
        }
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-calendar"></i>RENDICIÓN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Mail</a>
                    <a class="btn black" id="btnImprimir"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=camrenc"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=calrepr"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="8" />
                <input type="hidden" id="hf_codigo" value="" />
                <div class="alert alert-error hide">
                    <button class="close" data-dismiss="alert"></button>
                    Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                </div>
                <div class="alert alert-success hide">
                    <button class="close" data-dismiss="alert"></button>
                    Datos ingresados correctamente.
                </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtempleado">
                                Empleado</label>
                            <img id="imgCargaEmpleado" style="max-height:15px;float:right;display:none;" src="recursos/img/loading.svg">
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtempleado" name="txtempleado" class="span12 m-wrap required" placeholder="Digite Apellidos y Nombres" type="text" />
                                <input type="hidden" id="hf_pidm" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcodduenta">
                                Asignación</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls input-append">
                                <input id="txtcodcuenta" name="txtcodcuenta" class="span9 m-wrap required" type="text" disabled />
                                <a id="btnListarA" class="btn purple" data-toggle="modal"
                                    data-target="#muestralistap"><i class="icon-search"></i>&nbsp;</a>
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcentrocosto">
                                Centro Costo</label>

                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcentrocosto" name="txtcentrocosto" class="span12 m-wrap required" type="text" disabled />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtglosa">
                                Glosa</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtglosa" name="txtglosa" class="span12 m-wrap required" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <label for="cbomoneda" class="control-label">
                                    Moneda
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls" id="con_moneda">
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtmonto">
                                Monto</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtmonto" name="txtmonto" value="0.00" class="m-wrap span12 number required" onkeypress="return ValidaDecimales(event,this)" disabled />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid div_botones">
                    <div class="span4">
                        <div class="clearfix">
                            <div class="btn-group">
                                <button id="agregar" class="btn green">
                                    Agregar Comprobante <i class="icon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="clearfix">
                            <div class="btn-group">
                                <a href="?f=nrmgepr" target="_blank" class="btn red">Crear Nuevo Proveedor <i class="icon-user-md"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="clearfix">
                            <div class="btn-group">
                                <a href="javascript:filltxtBeneficiario('','');" class="btn yellow">Actualizar Lista Personas <i class="icon-refresh"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!---fin linea -->
                <div class="row-fluid">
                    <div id="progreso" class="span12" style="position: relative; z-index: 1;">
                        <div class="progress progress-striped active">
                            <div id="porcentaje" style="" class="bar"></div>
                        </div>
                    </div>
                </div>
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span12" style="overflow-x: scroll;">
                        <table id="tblDocumentos" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Fecha</th>
                                    <th>Comprobante</th>
                                    <th>Serie</th>
                                    <th>Número</th>
                                    <th>Razón Social</th>
                                    <th>Compras</th>
                                    <th>Total</th>
                                    <th>Conceptos</th>
                                    <th>Sub-Conceptos</th>
                                    <th>Glosa</th>
                                    <th></th>
                                    <th>Tipo Bien</th>
                                    <th>Periodo</th>
                                    <th>RUC</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!---fin linea -->
                
                <!-- INICIO  LINEA -->
                <div class="row-fluid alert-info">
                    <div class="span7"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_rmonto">
                                Monto
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <input type="text" value="0.00" id="txt_rmonto" name="txt_rmonto" class="span12 m-wrap" disabled style="font-weight: 600;" />
                        </div>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid alert-info">
                    <div class="span1"></div>
                    <div class="span5">
                        <div id="msg_alerta" class="alert alert-error" style="text-align: center;">
                            <i class="icon-check"></i>&nbsp;<strong>DOCUMENTO NO BALANCEADO!</strong>.
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_rasignado">
                                Asignado
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <input type="text" value="0.00" id="txt_rasignado" name="txt_rasignado" class="span12 m-wrap" style="font-weight: 600;" disabled />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="controls">
                            <input type="text" value="0.00" id="txt_tcambio" name="txt_tcambio" class="span12 m-wrap" disabled="disabled" />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-label">
                            <label class="control-label" for="txt_rasignado">
                                <b>T.C.</b>
                            </label>
                        </div>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid alert-info">
                    <div class="span7"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_rdevolver">
                                A Devolver
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <input type="text" value="0.00" id="txt_rdevolver" name="txt_rdevolver" style="font-weight: 600;" class="span12 m-wrap" disabled />
                        </div>
                    </div>
                </div>
                <!---fin linea -->
                <br />
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_ddestino">
                                Destino
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="scl_destino" name="slc_destino" class="m-wrap span12 combo" disabled="disabled">
                                    <option id="0001">CAJA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="devmoneda">
                                Moneda
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="dev_moneda">
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_dmonto">
                                Monto Devolver
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_dmonto" name="txt_dmonto" value="0.00" class="span12 m-wrap required number" onkeypress='return ValidaDecimales(event,this,3)' />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_dcaja">
                                Caja
                            </label>
                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls" id="con_cajas">
                                <select id="cbo_dcaja" name="cbo_dcaja" class="combo m-wrap span12 required" data-placeholder="Seleccionar Caja" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_dmovimiento">
                                Movimiento
                            </label>
                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_dmovimiento" name="txt_dmovimiento" placeholder="GENERADO" class="span12 m-wrap" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_dmsoles">
                                Equivalente MN
                            </label>
                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_dmsoles" name="txt_dmsoles" class="span12 m-wrap" value="0.00" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_dmsoles">
                                Sobrante
                            </label>
                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_ddevolver" name="txt_ddevolver" class="span12 m-wrap" value="0.00" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_ddevuelto">
                                Devuelto
                            </label>
                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txt_ddevuelto" name="txt_ddevuelto" class="span12 m-wrap" value="0.00" disabled="disabled" />
                            </div>
                        </div>
                    </div>--%>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="form-actions div_botones">
                    <a id="grabar" class="btn blue" href="javascript:SoloGrabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="completar" class="btn green" href="javascript:Grabar('9');"><i class="icon-ok"></i>&nbsp;Completar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                <!---fin linea -->

            </div>
        </div>
    </div>
    <div id="muestralistap" style="width: 700px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
                <h4 id="myModalLabel">LISTA DE ASIGNACIONES</h4>
            </div>
            <div id="divmodal" class="modal-body" aria-hidden="true">
                <!--aki se carga el contenido por jquery-->
            </div>
        </div>
    </div>


    <div id="divMail" class="modal hide fade dn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
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
                            <div id="datos_correo">
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
</div>

<!-- VENTANA MODAL QUE SE ACTIVA SI EL CLIENTE NO EXISTE-->
<div id="PerNoExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 26%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H1">Usuario no registrado</h3>
    </div>
    <div class="modal-body">
        <p>
            EL <b><span id="spanNroDoc" style="font-size: 15px;"></span></b>&nbsp; no existe.<br />
            ¿Desea registrar esta persona?
            <%--El documento Ingresado <b><span id="spanNroDoc" style="font-size: 15px;"></span></b>&nbsp;no está asociado a ninguna persona. Qué desea ejecutar?--%>
        </p>
    </div>
    <div class="modal-footer">
        <a class="btn blue" id="CrearPersona" target="_blank">Crear </a>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<!-- FIN VENTANA MODAL-->
<div id="divDctoImprimir" style="display: none;"></div>

<input type="hidden" id="monto_dol" />
<script type="text/javascript" src="../vistas/CA/js/CAMASCR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        $(".combo").select2();
        CAMRENC.init();
    });
</script>
