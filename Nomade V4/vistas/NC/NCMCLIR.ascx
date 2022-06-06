<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCLIR.ascx.vb" Inherits="vistas_NC_NCMCLIR" %>
<style type="text/css">

</style>

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
                    <button type="button" onclick="javascript:CargarDatosSunat();" data-dismiss="modal" class="btn blue" id="MostrarSunat">
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
                    <button type="button" onclick="javascript:CargarDatosSunat();" data-dismiss="modal" class="btn blue" id="MostrarSunat">
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

<div id="PerNoExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Persona no registrada</h3>
    </div>
    <div class="modal-body">
        <p>
            <span id="spanNroDoc" style="font-size: 15px;"></span>Cliente no registrado en el ERP.<br />
            ¿Desea registrar esta persona?
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
        <button type="button" data-dismiss="modal" class="btn blue"
            id="CrearPersona">
            Crear en Blanco
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CLIENTE RÁPIDO</h4>
                <div class="actions">
                    <a href="?f=NCMCLIR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NKLGECL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
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
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- VERIFICAR PERSONA-->
                <div class="row-fluid " id="divVerificar">

                    <div class="span7">
                        <div class="span3 offset2">
                            <div class="control-group">
                                <label class="control-label">
                                    Tipo de Documento
                                </label>
                                <div class="controls">
                                    <select id="cboTipoDoc" class="span12" data-ajax--cache="true" data-placeholder="Tipo de Documento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label">
                                    Nro. de Documento
                                </label>
                                <div class="controls">
                                    <input id="txtNroDctoCliente" class="span12" type="text" placeholder="Nro. de Documento" autocomplete="off" />
                                </div>
                            </div>
                        </div>
                        <input id="txtUbigeo" class="span2" type="hidden" />
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label">
                                    &nbsp;
                                </label>
                                <div class="controls">
                                    <button type="button" id="btnVerificar" onclick="javascript:BuscarClientexDocumento();" class="span9 btn green">&nbsp;Verificar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="span10 offset1 alert-info" id="mensaje" style="display:none;">
                            <p style="padding:10px;">Persona Natural con RUC <span id="msgNro"></span>, por su complejidad, necesita registrarse en el formulario de <a href="?f=NKMGECL">CLIENTES</a>. </p>
                        </div>
                    </div>
                </div>
                <!-- PERSONA JURÍDICA-->
                <div class="row-fluid">
                    <fieldset id="divPersonaJuridica" style="display: none;">
                        <legend>Datos</legend>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtRazonSocial">Razón Social <span class="oblig"><span class="oblig">*</span></span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtRazonSocial" class="span12" placeholder="Razón Social" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtNombreComercial">Nombre Comercial</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtNombreComercial" class="span12" placeholder="Nombre Comercial" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtDireccionJ">Dirección <span class="oblig">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtDireccionJ" class="span12" placeholder="Dirección" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtNombreComercial">Actividad</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls" id="divTxtActividad">
                                                <input type="text" class="span12" id="txtActividad" placeholder="Actividad" data-provide="typeahead" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="txtTelefonoJ">Teléfono</label>
                                        </div>
                                    </div>
                                    <div class="span6" id="divTxtClaseClienteJ">
                                        <div class="control-group">
                                            <label class="control-label" for="txtClaseClienteJ">Clase Cliente</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtTelefonoJ" class="span12" placeholder="Telefono" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span6" id="divCboClaseClienteJ">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboClaseClienteJ" class="span12" data-placeholder="Clase Cliente"></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaActividad">Inicio Actividad</label>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <label class="control-label" for="txtEmailJ">Email</label>
                                        </div>
                                    </div>
                                    <div class="span2" style="display: none;" id="chkActivoJ">
                                        <div class="control-group">
                                            <label class="control-label" for="txtActivoJ">Activo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaActividad" data-date-format="dd/mm/yyyy" /> <%--disabled="disabled"--%>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtEmailJ" class="span12" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2" style="display: none;" id="chkActivoJR">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="checkbox">
                                                    <input type="checkbox" style="width: 15px; height: 15px;" id="chkrActivoJ" />
                                                    SI
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkretencion">
                                                Agente Retención</label>
                                            <div class="controls" align="center">
                                                <label class="checkbox">
                                                    <input type="checkbox" style="width: 15px; height: 15px;" id="chkretencion" value="N" />
                                                    SI
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtfecharetencion">
                                                Desde</label>
                                            <div class="controls">
                                                <%--<input type="text" class="span12 date-picker" id="txtfecharetencion" data-date-format="dd/mm/yyyy" disabled="disabled" />--%>
                                                <input type="text" class="span12 date-picker" id="txtfecharetencion" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkpercepcion">
                                                Agente Percepción</label>
                                            <div class="controls" align="center">
                                                <label class="checkbox">
                                                    <input type="checkbox" style="width: 15px; height: 15px;" id="chkpercepcion" value="N" />
                                                    SI
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtfechapercepcion">
                                                Desde</label>
                                            <div class="controls">
                                                <%--<input type="text" class="span12" id="txtfechapercepcion" data-date-format="dd/mm/yyyy" disabled="disabled" />--%>
                                                <input type="text" class="span12" id="txtfechapercepcion" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="rbrelano">
                                                Es Relacionada
                                            </label>
                                            <div class="controls">
                                                <div class="span6">
                                                    <label>
                                                        <%--<input style="width: 15px; height: 15px; margin-top: 0px;" type="radio" name="rela" value="S" id="rbrelasi" disabled="disabled" />--%>
                                                        <input style="width: 15px; height: 15px; margin-top: 0px;" type="radio" name="rela" value="S" id="rbrelasi" />
                                                        SI
                                                    </label>
                                                </div>
                                                <div class="span6">
                                                    <label>
                                                        <%--<input style="width: 15px; height: 15px; margin-top: 0px;" type="radio" name="rela" value="N" checked="checked" id="rbrelano" disabled="disabled" />--%>
                                                        <input style="width: 15px; height: 15px; margin-top: 0px;" type="radio" name="rela" value="N" checked="checked" id="rbrelano"/>
                                                        NO
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </fieldset>
                </div>

                <!-- PERSONA NATURAL-->
                <div class="row-fluid">
                    <fieldset id="divPersonaNatural" style="display: none;">
                        <legend>Datos</legend>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtApePaterno">Apellido Paterno <span class="oblig">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtApePaterno" class="span12" placeholder="Apellido Paterno" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtApeMaterno">Apellido Materno</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtApeMaterno" class="span12" placeholder="Apellido Materno" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtDireccionJ">Nombres <span class="oblig">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtNombres" class="span12" placeholder="Nombres" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="txtNombreComercial"><span id="lblTipoDocumento">DNI</span></label>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="rbSexo">Sexo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtNroDocumento" class="span12" placeholder="Nro Documento" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span6">
                                        <div class="span6">
                                            <div class="control-group">
                                                <label class="control-label" for="rbnMasculino">
                                                    <input type="radio" class="m-wrap span12" id="rbnMasculino" name="rbnSexo" checked="checked" />
                                                    Masculino
                                                </label>
                                            </div>
                                        </div>
                                        <div class="span6">
                                            <div class="control-group">
                                                <label class="control-label" for="rbnFemenino">
                                                    <input type="radio" class="m-wrap span12" id="rbnFemenino" name="rbnSexo" />
                                                    Femenino
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="txtDireccionN">Dirección <span class="oblig">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtDireccionN" class="span12" placeholder="Dirección" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaNacimiento">Fecha Nacimiento</label>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <label class="control-label" for="txtEmailN">Email</label>
                                        </div>
                                    </div>
                                    <div class="span2" style="display: none;" id="chkActivoN">
                                        <div class="control-group">
                                            <label class="control-label" for="txtActivoN">Activo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaNacimiento" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtEmailN" class="span12" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2" style="display: none;" id="chkActivoNA">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="checkbox">
                                                    <input type="checkbox" style="width: 15px; height: 15px;" id="chkrActivoN" />
                                                    SI
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="txtTelefonoN">Teléfono</label>
                                        </div>
                                    </div>
                                    <div class="span6" id="divTxtClaseCliente">
                                        <div class="control-group">
                                            <label class="control-label" for="txtClaseCliente">Clase Cliente</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtTelefonoN" class="span12" placeholder="Telefono" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span6" id="divCboClaseCliente">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboClaseCliente" class="span12" data-placeholder="Clase Cliente"></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form-actions" id="divBotones" style="display:none;">
                    <a id="grabar" class="btn blue"><i class=" icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="?f=NCMCLIR"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                <div class="form-actions" id="divBotones2" style="display:none;">
                    <a id="modificar" class="btn black"><i class=" icon-pencil"></i>&nbsp;Modificar</a>
                    <a class="btn" href="?f=NCMCLIR"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                 <div class="form-actions" id="divGrabarCliente" style="display:none;">
                    <a id="btnGrabarCliente" class="btn blue"><i class=" icon-save"></i>&nbsp;Grabar como Cliente</a>
                    <a class="btn" href="?f=NCMCLIR"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCLIR.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMCLIR.init();
    });
</script>


