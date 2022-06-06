<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPMEMCO.ascx.vb" Inherits="vistas_NP_NPMEMCO" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONTRATO EMPLEADO</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=npmemco" class="btn green" id="btnNuevo"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nplemco" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>

            <div class="portlet-body">

                <!-- SE INICIAN LOS TABS-->
                <div class="tabbable tabbable-custom boxless">
                    <!-- TITULO DE LOS TABS-->
                    <ul class="nav nav-tabs">
                        <li class="active"><a id="tabGeneral" href="#general" data-toggle="tab"><i class="icon-file"></i>&nbsp; General</a></li>
                        <li><a class="advance_form_with_chosen_element" id="tabConfigAlertas" href="#config-alertas" data-toggle="tab"><i class="icon-cog"></i>&nbsp; Configuración de Alertas</a></li>
                    </ul>

                    <div class="tab-content">
                        <!-- INICIO DEL TAB GENERAL-->
                        <div class="tab-pane active" id="general">

                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="cbo_Empresa">
                                            Empresa</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label">
                                            Reingresante:</label>
                                    </div>
                                </div>

                                <div class="span2" id="divchkIngreso">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div class="danger-toggle-button-custom">
                                                <input id="chkReingreso" type="checkbox" class="toggle" />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label id="lblEmpleado" class="control-label" for="cboEmpleado" data-placeholder="Empleado">
                                            Empleado:</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                            </select>
                                        </div>
                                    </div>
                                </div>



                                <div class="span1">
                                    <div class="control-group span12">
                                        <div class="controls">
                                            <a id="btnContrato" class="btn blue">Contrato</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group span12">
                                        <div class="controls">
                                            <a id="btnCancelar" class="btn" disabled="disabled">Cancelar</a>
                                        </div>
                                    </div>
                                </div>


                                <div class="span1">
                                    <div class="control-group span12">
                                        <div class="controls">
                                            <a id="btnEmpleado" class="btn black" href="?f=NPMEMPL" target="_blank" title="Nuevo Empleado"><i class="icon-user"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <hr />
                            <div id="DatosEmp" style="margin-top: 10px;">

                                <div class="row-fluid">

                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="txtNroContrato">
                                                Nro. Contrato
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtNroContrato" placeholder="NRO. CONTRATO" class="span12" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>


                                    <div class="span1 offset1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboEstado">
                                                Estado
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">

                                                <select id="cboEstado" class="span12" data-placeholder="Seleccione Estado" disabled="disabled">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboRegLab">
                                                Regimen Laboral
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">

                                                <select id="cboRegLab" class="span12" data-placeholder="Regimen Laboral">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">
                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboEmpresa">
                                                Empresa
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa" disabled="disabled">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboSucursal">
                                                Sucursal
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboSucursal" class="span12 establecimiento" data-placeholder="Sucursal">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">

                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboTipoContrato">
                                                Tipo Contrato
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">

                                                <input type="text" id="txtCodigoTipoContrato" class="span12" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>


                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">

                                                <select id="cboTipoContrato" class="span12" data-placeholder="Tipo de Contrato">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="txtFechaIniCont">
                                                Fecha Inicio
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtFechaIniCont" placeholder="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>


                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="txtFechaFinCont">
                                                Fecha Fin
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtFechaFinCont" placeholder="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">




                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboCargo">
                                                Cargo
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboCargo" class="span12" data-placeholder="Cargo">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label">
                                                Mod. Formativa
                                            </label>
                                        </div>
                                    </div>


                                    <div class="span3" id="divChkModForm">

                                        <div class="span7">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <div class="danger-toggle-button-custom">
                                                        <input id="chkModFormativa" type="checkbox" class="toggle" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtCodigoModFormativa" class="span12" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboModFormativa" class="span12" data-placeholder="Mod. Formativa" disabled="disabled">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">
                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="cboTipoTrabajador">
                                                Tipo Trabajador
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">

                                                <input type="text" id="txtCodigoTipoTrabajador" class="span12" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">

                                                <select id="cboTipoTrabajador" class="span12" data-placeholder="Tipo Trabajador">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid">
                                    <div class="span10 offset1 portlet box grey" id="DivPagos" style="margin-top: 15px; border-top: 10px;">
                                        <div class="portlet-title">
                                            <h4><i class="icon-money"></i>Info. Remunerativa</h4>
                                        </div>
                                        <div class="portlet-body">

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtRemBasica">
                                                            0121-Rem. Básica</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtRemBasica" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtMovilidad">
                                                            0909-Movilidad</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtMovilidad" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2" style="display: none">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtViaticos">
                                                            0905-Gast. Rep.</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtViaticos" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtBonoProductividad">
                                                            0902-Bono de Productividad</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtBonoProductividad" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtBonificRiesgoCaja">
                                                            0304-Bonif. riesgo de caja</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtBonificRiesgoCaja" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtRefrigerio">
                                                            0914-Refrigerio</label>
                                                        <div class="controls">
                                                            <div class="span12">
                                                                <input type="text" id="txtRefrigerio" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align: right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="lblRemTotal" style="text-align: center">
                                                            <strong>REM. TOTAL</strong>
                                                        </label>
                                                        <div class="controls">
                                                            <label class="control-label" id="lblRemTotal" style="text-align: center">
                                                                <strong>0.00</strong>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>



                                <div class="row-fluid" style="margin-top: 10px">


                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label">
                                                Cese
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span3" id="divChkCese">

                                        <div class="span7">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <div class="danger-toggle-button-custom">
                                                        <input id="chkCese" type="checkbox" class="toggle" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" id="txtCodigoMotivoCese" class="span12" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboMotivoCese" class="span12" data-placeholder="Motivo Cese">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-label">
                                            <label class="control-label" for="txtFechaCese">
                                                Fecha Cese
                                            </label>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtFechaCese" placeholder="dd/mm/yyyy" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <div id="divBtnCese" class="span12"><a id="btnCese" class="btn red"><i class="icon-thumbs-down"></i>&nbsp;Cesar</a></div>
                                            </div>
                                        </div>
                                    </div>


                                </div>







                                <div class="form-actions">
                                    <div id="divGrabar" class="span1"><a id="grabarEmpleado" class="btn blue" href="javascript:crearContrato();"><i class="icon-ok"></i>&nbsp;Guardar</a>  </div>
                                    <div id="divRenovar" class="span1"><a id="btnRenovar" class="btn green"><i class="icon-thumbs-up"></i>&nbsp;Renovar</a></div>
                                    <div id="divFirmar" class="span1"><a id="btnFirmar" class="btn purple"><i class="icon-edit"></i>&nbsp;Firmar</a></div>
                                </div>

                            </div>
                            <%--FIN DATOS EMP--%>
                        </div>
                        <!-- FIN DE GENERAL-->

                        <!-- INICIO DEL TAB CONFIGURACION DE ALERTAS-->
                        <div class="tab-pane" id="config-alertas">

                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEmpresaAlerta">Empresa</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEmpresaAlerta" class="span12" data-placeholder="Empresa">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <br />

                            <div class="row-fluid">
                                <div class="span2">
                                    <div class="control-group">
                                        <label for="txtNuevoUsuario">Añadir Nuevo Usuario</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtNuevoUsuario" placeholder="NUEVO USUARIO" class="span12" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span2">
                                    <button type="button" class="btn blue" onclick="agregarUsuario()"><i class="icon-plus-sign" style="line-height: initial"></i></button>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span1"></div>
                                <div class="span10">
                                    <table class="table table-bordered table-hover" id="tblUsuarios">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center;">USUARIO</th>
                                                <th>NOMBRE</th>
                                                <th style="text-align: center;">ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="span1"></div>
                            </div>
                            
                            <br />
                            <br />
                            <br />

                            <div class="row-fluid">
                                <div class="span2">
                                    <div class="control-group">
                                        <label id="lblNroDiasPorVencer" class="control-label" for="txtNroDiasPorVencer" data-placeholder="Nro días por vencer">Nro días por vencer:</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtNroDiasPorVencer" class="span12" onkeypress="return ValidaNumeros(event,this)" style="text-align: right" />
                                            <small class="form-text text-muted">Valor que indica con cuántos días de anticipacion a vencer el contrato se enviarán las alertas.</small>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="form-actions">
                                <a id="btnGrabarAlerta" class="btn blue" onclick="GrabarConfiguracionAlerta();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- FIN DE LOS TABS-->

            </div>




        </div>
    </div>


    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfBIO" />
        <input type="hidden" id="hfESTADO_CONT" />
        <input type="hidden" id="hfSueldoBasico" />
        <input type="hidden" id="hfNumeroCont" />
        <input type="hidden" id="hfRenovacion" />
        <input type="hidden" id="hfUSUA_ID_NC" />
    </div>


</div>



<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Confirmar</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p id="mensaje" style="font-size: medium">
                    Seguro que desea cesar el contrato?
                </p>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="span3 offset1">
                    <a id="btnAceptarConfir" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
                <div class="span3">
                    <a id="btnCancelarConfir" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/NP/js/NPMEMCO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NPMEMCO.init();

    });
</script>
