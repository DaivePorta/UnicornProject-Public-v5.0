<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NKMGECL.ascx.vb" Inherits="vistas_NK_NKMGECL" %>

<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }

    .datepicker {
        z-index: 1151;
    }
</style>

<style type="text/css">
    .contenedor {
        width: 160px;
        float: left;
        margin-top: 10px;
    }

    .contenedor2 {
        width: 320px;
        float: left;
        margin-right: 10px;
    }

    .titulo {
        font-size: 12pt;
        font-weight: bold;
    }

    #foto {
        width: 150px;
        min-height: 180px;
        border: 2px solid #1e93e8;
    }

    #camara {
        width: 320px;
        height: 240px;
        border: 2px solid #1e93e8;
    }
</style>

<%-- Ventana Modal que se activa si la persona no existe--%>
<div id="captchaModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 25%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H2">Captcha</h3>
    </div>
    <div class="modal-body" style="text-align: center">
        <p>
            <img id="img_captcha" src=""/>
        </p>
        <p id="msgcaptcha" style="display:none;color: red;">

        </p>
        <p>
            Ingrese Los carcateres de la figura anterior...
       </p>
        <p><input type="text" id="txtcaptcha"/></p>

    </div>
    <div class="modal-footer">

         <button type="button" onclick="javascript:CargaReniec();" class="btn blue" >
            Crear 
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
    </div>
<!-- VENTANA MODAL QUE SE ACTIVA SI EL CLIENTE NO EXISTE-->
<div id="PerNoExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Persona no registrada</h3>
    </div>
    <div class="modal-body">
        <p>
            <b><span id="spanNroDoc" style="font-size: 15px;"></span></b>&nbsp; no se encuentra registrado en el ERP.<br />
            ¿Desea registrar esta persona?
            <%--El documento Ingresado <b><span id="spanNroDoc" style="font-size: 15px;"></span></b>&nbsp;no está asociado a ninguna persona. Qué desea ejecutar?--%>
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" onclick="javascript:MuestraSunat();" data-dismiss="modal" class="btn black"
            id="DatosSunat">
             Crear con Datos Sunat
        </button>
           <button type="button" onclick="javascript:MuestraReniec();" data-dismiss="modal" class="btn black" style="display:none;"
            id="DatosReniec">
            Consultar a Reniec
        </button>
        <button type="button" onclick="javascript:MuestraFormulario(false, '');" data-dismiss="modal" class="btn blue"
            id="CrearPersona">
            Crear en Blanco 
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<!-- FIN VENTANA MODAL-->

<!-- VENTANA MODAL QUE SE ACTIVA SI EL RUC EXISTE-->
<div id="PerRUCExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="H1">Información</h3>
    </div>
    <div class="modal-body">
        <p>
            El documento Ingresado(RUC) está asociado a una persona.
        </p>
    </div>
    <div class="modal-footer">
        <button class="btn" type="button" data-dismiss="modal" aria-hidden="true">
            Cerrar</button>
    </div>
</div>
<!-- FIN VENTANA MODAL-->

<!-- INICIA EL CUERPO DE LA FORMA-->
<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CLIENTE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NKMGECL"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NKLGECL"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
             <div class="portlet-body">
                <h3 class="form-section verificar">Identidad de Persona</h3>

                <!--DIVISION PARA VERIFICAR LA PERSONA-->
                <div class="row-fluid verificar" id="verificar">
                   

                    <div class="span3">

                        <div class="control-group">
                            <label class="control-label">
                                Tipo de Documento
                            </label>
                            <div class="controls">
                                <select id="cboTipoDocumento" class="span12" data-placeholder="Tipo de Documento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">

                        <div class="control-group">
                            <label class="control-label">
                                Nro. de Documento
                            </label>
                            <div class="controls">
                                <input id="txtdocumento" class="span12" type="text" placeholder="Nro. de Documento" autocomplete="off" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">

                        <div class="control-group">
                            <label class="control-label">
                                &nbsp;
                            </label>
                            <div class="controls">
                                <button type="button" id="btnverificar" onclick="javascript:VerificarPersona();" class="span8 btn green">&nbsp;Verificar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN VERIFICAR-->

                <!-- DIVISION PARA DATOS DE PERSONA NATURAL-->
                <div id="DatosPersona" style="display: none;">
 
                </div>
                <!-- FIN PERSONA NATURAL-->

                <br />

                <!-- SE INICIAN LOS TABS PARA LOS ESTEREOTIPOS DE LA PERSONAS-->
                <div class="tabbable tabbable-custom boxless" style="display: none;" id="estereotipos">

                    <!-- TITULO DE LOS TABS-->
                    <ul class="nav nav-tabs">
                        <li class="active"><a id="tabAdicionales" href="#adicionales" data-toggle="tab"><i class="icon-check"></i>Adicionales</a></li>
                      <li><a class="advance_form_with_chosen_element" id="tabCliente" href="#cliente" data-toggle="tab"><i class="icon-check"></i>Cliente</a></li>
                      </ul>
                    <div class="tab-content">
                        <!-- INICIO DEL TAB ADICIONALES-->
                        <div class="tab-pane active" id="adicionales">
                        </div>
                        <!-- FIN DE ADICIONALES-->

                        <!-- INICIO DEL TAB CLIENTE-->
                        <div class="tab-pane" id="cliente">
                            <h1></h1>
                        </div>
                        <!-- FIN DE CLIENTE-->
   
                        <!-- FIN DE LOS TABS-->
                    </div>
                    <!-- FIN DEL CUERPO DE LA FORMA-->
                </div>
                <asp:HiddenField ID="hfUsuario" runat="server" />

                <asp:HiddenField ID="hfCodigoTipoDocumentoDNI" runat="server" />
                <asp:HiddenField ID="hfCodigoTipoDocumentoRUC" runat="server" />

                <asp:HiddenField ID="hfCodigoTipoTelefonoCelular" runat="server" />

                <input id="hfPPBIDEN_PIDM" type="hidden" />
                <input id="hfPPBIDEN_ID" type="hidden" />
                <input id="hfPPRTELE_NUM_SEQ" type="hidden" />
                <input id="hfPPRCORR_NUM_SEQ" type="hidden" />
                <input id="hfPPBIMAG_CODE" type="hidden" />

                <input id="hfPPBIDEN_PIDM_REPRESENTANTE" type="hidden" />
                <input id="hfPPBIDEN_PIDM_CONTACTO" type="hidden" />

                <input id="hfJsonDirecciones" type="hidden" />

                <asp:HiddenField ID="hfCodigoDireccionPrincipal" runat="server" />
                <asp:HiddenField ID="hfCodigoDireccionSecundario" runat="server" />

                <input id="hfEstereotipoActivo" type="hidden" />
                <input id="hfDireccionPersonaJuridica" type="hidden" />

                <asp:HiddenField ID="hfCodigoTipoContribuyenteSinNegocio" runat="server" />
                <asp:HiddenField ID="hfCodigoTipoContribuyenteConNegocio" runat="server" />
            </div>
            <!-- FIN DEL CUERPO DE LA FORMA-->
        </div>
    </div>
</div>

<%--<div id="ModalSunat" style="width: 700px;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="H3">Datos Sunat</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="span12" id="existe">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Numero Ruc</b></label>
                                    <div class="controls">
                                        <label id="lblModalNumeroRuc">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Razon Social</b></label>
                                    <div class="controls">
                                        <label id="lblrazonsocial">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Estado</b></label>
                                    <div class="controls">
                                        <label id="lblModalEstado">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Direccion</b></label>
                                    <div class="controls">
                                        <label id="lblModalDireccion">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                             <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Fecha Inicio</b></label>
                                    <div class="controls">
                                        <label id="lblModalFechaIni">
                                        </label>
                                    </div>
                                </div>
                            </div>

                             <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Nombre Comercial</b></label>
                                    <div class="controls">
                                        <label id="lblModalNombreComercial">
                                        </label>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Condición</b></label>
                                    <div class="controls">
                                        <label id="lblModalSituacion">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Actividad</b></label>
                                    <div class="controls">
                                        <label id="lblModalActividad">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Telefono</b></label>
                                    <div class="controls">
                                        <label id="lblModalTelefono">
                                        </label>
                                    </div>
                                </div>
                            </div>
                           

                        </div>
      
                    </div>

                </div>
                <div>
                    <button type="button" onclick="javascript:MuestraFormulario(false, 'C');" data-dismiss="modal" class="btn blue" id="MostrarSunat">
                        Crear</button>
                    <button type="button" onclick="javascript:CancelarSunat();" data-dismiss="modal" class="btn red" id="Cerrar">
                        Cerrar 
                    </button>
                </div>
            </div>
            <div class="span11" id="no_existe" style="display:none;">
                <p>El número de RUC <span id="mnro"></span> consultado no es válido.</p>
            </div>
        </div>
    </div>
</div>--%>

<div id="ModalSunat" style="width: 700px;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="H3">Datos Sunat</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="span12" id="existe">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Numero Ruc</b></label>
                                    <div class="controls">
                                        <label id="lblModalNumeroRuc">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Razon Social</b></label>
                                    <div class="controls">
                                        <label id="lblrazonsocial">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Estado</b></label>
                                    <div class="controls">
                                        <label id="lblModalEstado">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Direccion</b></label>
                                    <div class="controls">
                                        <label id="lblModalDireccion">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                             <%--<div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Fecha Inicio</b></label>
                                    <div class="controls">
                                        <label id="lblModalFechaIni">
                                        </label>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Condición</b></label>
                                    <div class="controls">
                                        <label id="lblModalSituacion">
                                        </label>
                                    </div>
                                </div>
                            </div>
                             <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Nombre Comercial</b></label>
                                    <div class="controls">
                                        <label id="lblModalNombreComercial">
                                        </label>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <%--<div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Condición</b></label>
                                    <div class="controls">
                                        <label id="lblModalSituacion">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Actividad</b></label>
                                    <div class="controls">
                                        <label id="lblModalActividad">
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>--%>
                        <%--<div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label">
                                        <b>Telefono</b></label>
                                    <div class="controls">
                                        <label id="lblModalTelefono">
                                        </label>
                                    </div>
                                </div>
                            </div>
                           

                        </div>--%>
      
                    </div>

                </div>
                <div>
                    <button type="button" onclick="javascript:MuestraFormulario(false, 'C');" data-dismiss="modal" class="btn blue" id="MostrarSunat">
                        Crear</button>
                    <button type="button" onclick="javascript:CancelarSunat();" data-dismiss="modal" class="btn red" id="Cerrar">
                        Cerrar 
                    </button>
                </div>
            </div>
            <div class="span11" id="no_existe" style="display:none;">
                <p>El número de RUC <span id="mnro"></span> consultado no es válido.</p>
            </div>
        </div>
    </div>
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../vistas/NK/JS/NKMGECL.js"></script>
<script type="text/javascript" src="../../vistas/NC/estereotipos/js/Adicionales.js"></script>

<script type="text/javascript" src="../../vistas/NC/estereotipos/js/Cliente.js"></script>


<script>

    jQuery(document).ready(function () {
        NKMGECL.init();

    });

</script>

