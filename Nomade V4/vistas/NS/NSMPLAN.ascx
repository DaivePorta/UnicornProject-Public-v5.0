<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMPLAN.ascx.vb" Inherits="vistas_NS_NSMPLAN" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Gestión plantilla horarios de empleado</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NSMPLAN"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NSLPLAN"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkActivo" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="chkActivo">
                                    Activo</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNombre">
                                    Nombre</label>
                            </div>
                        </div>
                        <div class="span11">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNombre" class="span8" placeholder="Nombre de la plantilla." type="text" maxlength="50" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--    <div class="span6">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkIncluirFeriados" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="chkIncluirFeriados">
                                    Incluir Feriados</label>
                            </div>
                        </div>
                    </div>--%>
                </div>
                <%-- <div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpleado">
                                    Empleado</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpleado" class="span12" data-placeholder="Empleado">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkIncluirFeriados" type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div class="span11">
                            <div class="control-group">
                                <label class="control-label" for="chkIncluirFeriados">
                                    Incluir Feriados</label>
                            </div>
                        </div>
                    </div>
                </div>--%>
                <%--<div class="row-fluid">
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaInicio">
                                    Fecha Inicio</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input class="span12 date-picker" type="text" id="txtFechaInicio" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaLimite">
                                    Fecha Límite</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtFechaLimite" class="span12 date-picker" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--%>
                <div id="divSeparador" class="row-fluid" style="display: block;">
                    <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                </div>
                <div id="divHorarioDetalle" class="row-fluid" style="display: none;">
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
                                <a id="A4" class="btn green" href="javascript:agregarDetalle();"><i class="icon-plus"></i></a>
                            </div>
                        </div>
                    </div>
        

                </div>
                 <div id="divSeparador2" class="row-fluid" style="display: block;">
                    <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                </div>
                <div id="divTabla" class="row-fluid" style="display: none;">
                    <table id="tblHorario" border="0" class="display DTTT_selectable" style="display: block;">
                        <thead>
                            <tr>
                                <td style="display:none;">Código</td>
                                <td>Hora Inicio</td>
                                <td>Hora Fin</td>
                                <td>Lun.</td>
                                <td>Mar.</td>
                                <td>Miér.</td>
                                <td>Juev.</td>
                                <td>Vier.</td>
                                <td>Sáb.</td>
                                <td>Dom.</td>
                                <td style="width:5%;"></td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <%--  <div class="row-fluid">
                     <div class="span12">
                               <a id="A1" class="btn red" href="javascript:eliminarDetalle();"><i class="icon-minus"></i></a>
                      </div>

                </div>--%>
                <div id="divJqxGridDetalle" class="row-fluid" style="display: none;">
                    <div class="span12">
                        <div id="jqxgrid" class="span12">
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="?f=nsmghem"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSLPLAN.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMPLAN.init();

    });
</script>


