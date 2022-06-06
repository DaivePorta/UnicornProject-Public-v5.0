<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMUSUA.ascx.vb" Inherits="vistas_NS_NSMUSUA" %>

<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />

<style>
    div#pswd_info {
        background-color: whitesmoke;
        border-radius: 3px !important;
        position: absolute;
        z-index: 1151;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #888;
        box-shadow: 0 0 5px #298ACA;
    }

        div#pswd_info p {
            margin: 5px;
            font-weight: bold;
        }


    .jqx-grid-cell {
        background: transparent;
    }

    .nuevo {
        background-color: rgba(53, 170, 71, 0.32);
    }

    .eliminado {
        background-color: rgba(211, 113, 102, 0.55);
    }
</style>
<input type="text" id="carnadalog" style="display: none;" />
<input type="password" id="carnadapass" style="display: none;" />
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>USUARIOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nsmusua"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nslusua"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtregistro">
                                    Usuario</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtregistro" class="span12" type="text" placeholder="Usuario" autocomplete="off" />
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtClave">
                                    Clave</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtClave1" class="span12 contrasena" type="password" autocomplete="off" placeholder="Min. 8 Caracteres" maxlength="30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboPersona">
                                    Persona</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPersona" class="span12" data-placeholder="Persona">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls" id="div_email">
                                    <input type="text" placeholder="email..." class="span12" id="txtEmail">
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtClave">
                                    Confirmar Clave</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtClave2" class="span12 contrasena" type="password" placeholder="Min. 8 Caracteres" maxlength="30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <label class="control-label" for="txtFechaInicio">
                                Fecha Inicio</label>
                        </div>
                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" data-date-format="dd/mm/yyyy" class="span7" id="txtFechaInicio" placeholder="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span2">
                            <label class="control-label" for="txtFechaLimite">
                                Fecha Límite</label>
                        </div>
                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" data-date-format="dd/mm/yyyy" class="span7" id="txtFechaLimite" placeholder="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divPestaniaUsuario" class="row-fluid" style="display: none;">
                    <ul class="nav nav-tabs">
                        <li class="active"><a id="tabPermisos" href="#permisos" data-toggle="tab"><i></i>Permisos</a></li>
                        <li><a class="advance_form_with_chosen_element" id="tabCorporativo" href="#corporativo" data-toggle="tab"><i></i>Corporativo</a></li>
                        <li><a class="advance_form_with_chosen_element" id="tabHorarios" href="#horarios" data-toggle="tab"><i></i>Horarios</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="permisos">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span6">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="cboEmpresa">
                                                    Empresa</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboEmpresa" class="span12 no-bloq" data-placeholder="Empresa">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="cboCargo">
                                                    Cargo</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboCargo" class="span12" data-placeholder="Cargo">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <button id="proRol" type="button" class="btn blue disabled" onclick="javascript:;"><i class="icon-chevron-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <button id="addRol" type="button" class="btn green disabled" onclick="javascript:;"><i class="icon-plus"></i></button>
                                            <button id="delRol" type="button" class="btn red disabled" onclick="javascript:;"><i class="icon-minus"></i></button>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div id="jqxgridRol" class="span12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div id="jqxgridRolCargo" class="span12">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- FIN DE PERMISOS-->

                        <!-- INICIO DEL TAB CORPORATIVO-->
                        <div class="tab-pane" id="corporativo">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div id="jqxgridEmpresa" class="span12">
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <button id="addEstablecimiento" type="button" class="btn green disabled" onclick="javascript:;"><i class="icon-plus"></i></button>
                                        <button id="delEstablecimiento" type="button" class="btn red disabled" onclick="javascript:;"><i class="icon-minus"></i></button>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div id="jqxgridEstablecimiento" class="span12">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- FIN DE CORPORATIVO-->
                        <!-- INICIO DEL TAB HORARIOS-->
                        <div class="tab-pane" id="horarios">
                            <div class="row-fluid">

                                <div class="span12">
                                    <div class="span3">
                                        <div class="span6">
                                            <div class="control-group">
                                                <label class="control-label" for="txtHorarioemple">
                                                    Horario de Empleado</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="Checkbox2" type="checkbox" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="span8">
                                            <div class="control-group">
                                                <label class="control-label" for="txtIncluirferia">
                                                    Incluir Feriados</label>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="Checkbox1" type="checkbox" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="cboZonaHoraria">
                                                    Zona Horaria</label>
                                            </div>
                                        </div>
                                        <div class="span10">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="cboZonaHoraria" class="span12" data-placeholder="Zona Horaria">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div id="divHorarioDetalle" class="row-fluid" style="/*display: none; */">
                                <div class="span12">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txtHoraInicio">
                                                Hora Inicio</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtHoraInicio" class="span12" type="text" placeholder="00:00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txtHoraFin">
                                                Hora Fin</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtHoraFin" class="span12" type="text" placeholder="00:00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkLunes" type="checkbox" />
                                                    <span>L</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkMartes" type="checkbox" />
                                                    <span>M</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkMiercoles" type="checkbox" />
                                                    <span>M</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkJueves" type="checkbox" />
                                                    <span>J</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkViernes" type="checkbox" />
                                                    <span>V</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkSabado" type="checkbox" />
                                                    <span>S</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="chkDomingo" type="checkbox" />
                                                    <span>D</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <a id="A4" class="btn green" href="javascript:agregarDetalleHorario();"><i class="icon-plus"></i></a>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <a id="A1" class="btn red" href="javascript:eliminarDetalleHorario();"><i class="icon-minus"></i></a>
                                </div>
                            </div>
                            <div id="divJqxGridDetalle" class="row-fluid" style="/*display: none; */">
                                <div class="span12">
                                    <div id="jqxgrid" class="span12">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-save"></i>Grabar</a>
                    <button class="btn" type="button" onclick="?f=nsmusua"><i class="icon-remove"></i>Cancelar</button>
                </div>
                <input id="hfUsuaID" type="hidden" />
                <input id="hfTabActivo" type="hidden" />
            </div>
        </div>
    </div>
</div>
<div id="ModalRol" style="width: 500px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel">Agregar Rol</h3>
        </div>
        <div id="divRol" class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboRolModal">
                                    Rol</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboRolModal" class="span12" data-placeholder="Rol">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="form-actions">
                            <button id="grabarModalRol" type="button" class="btn blue" onclick="javascript:grabarRol(1);"><i class="icon-save"></i>Grabar</button>
                            <button class="btn" type="button" onclick="javascript:cerrarModalRol();"><i class="icon-remove"></i>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="ModalEstablecimiento" style="width: 500px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="H1">Agregar Establecimiento</h3>
        </div>
        <div id="divEstablecimiento" class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimientoModal">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimientoModal" class="span12" data-placeholder="Establecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="form-actions">
                            <button id="grabarModalEstablecimiento" type="button" class="btn blue" onclick="javascript:grabarEstablecimiento();"><i class="icon-save"></i>Grabar</button>
                            <button class="btn" type="button" onclick="javascript:cerrarModalEstablecimiento();"><i class="icon-remove"></i>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modalconfirmacion" style="width: 500px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="H2">Confirmación</h3>
        </div>
        <div class="modal-body" id="mensajemodal">
            <p>
                Está seguro de reemplazar el horario del usuario <span id="mdlusuario"></span>con el del empleado <span id="mdlempleado"></span>?
            </p>
        </div>
        <div class="modal-footer">
            <a href="javascript:rptano();" class="btn">No</a>
            <a href="javascript:rptasi();" class="btn blue">Si</a>
        </div>

    </div>

</div>



<asp:HiddenField ID="hfUsuario" runat="server" />
<script type="text/javascript" src="../vistas/NS/js/NSMUSUA.js"></script>
<script>
    jQuery(document).ready(function () {
        NSMUSUA.init();

    });

</script>


<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxexpander.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxvalidator.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.pager.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.selection.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxnumberinput.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxwindow.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxinput.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdatatable.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxtree.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxprogressbar.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.sort.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.filter.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxgrid.edit.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="../../recursos/plugins/jqwidgets/jqxpanel.js"></script>
