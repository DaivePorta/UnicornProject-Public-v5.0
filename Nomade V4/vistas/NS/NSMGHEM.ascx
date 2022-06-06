<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMGHEM.ascx.vb" Inherits="vistas_NS_NSMGHEM" %>

<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GESTION HORARIO EMPLEADO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nsmghem"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nslghem"><i class="icon-list"></i>&nbsp;Listar</a>
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
                    <div class="span6">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slcEmpresa" class="span12" data-placeholder="Empresa">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
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
                </div>
                <div class="row-fluid">
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
                </div>
                <div class="row-fluid">
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
                <div id="divSeparador" class="row-fluid" style="display: none;">
                    <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                </div>
                <div id="divHorarioDetalle" class="row-fluid" style="display: none;">
                    <div class="row-fluid">
                        <div class="span12" style="text-align: center;">
                            <h3><b>HORARIO&nbsp;&nbsp;<i class="icon-time"></i></b></h3>
                            <p></p>
                        </div>
                    </div>
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
                                    <input id="txtHoraInicio" class="tooltips span12" type="text" placeholder="00:00" data-placement="bottom" data-original-title="Formato 24h." />
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
                                    <input id="txtHoraFin" class="tooltips span12" type="text" placeholder="00:00" data-placement="bottom" data-original-title="Formato 24h." />
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
                    <div class="row-fluid">
                        <div class="span6">
                        </div>
                        <div class="span6">
                            <%--  <a id="btnPlantilla" class="btn blue"><i class="icon-search" data-toggle="modal"
                                data-target="#muestralistap"></i>&nbsp;Buscar plantilla</a>--%>

                            <button id="btnPlantilla" type="button" data-toggle="modal"
                                data-target="#muestralistap" class="btn blue">
                                <i class="icon-search"></i>&nbsp;Buscar plantilla
                            </button>
                        </div>

                    </div>

                </div>

                <div id="divJqxGridDetalle" class="row-fluid" style="display: none;">
                    <div class="row-fluid">
                        <div class="span12">
                            <a id="A1" class="btn red" href="javascript:eliminarDetalle();"><i class="icon-minus"></i></a>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div id="jqxgrid" class="span12">
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <div id="divSeparador_2" class="row-fluid" style="display: none;">
                    <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                </div>
                <div id="divBreakDetalle" class="row-fluid" style="display: none;">
                    <div class="row-fluid">
                        <div class="span12" style="text-align: center;">
                            <h3><b>REFRIGERIO&nbsp;&nbsp;<i class="icon-time"></i></b></h3>
                            <p></p>
                        </div>
                    </div>
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtHoraInicio_break">
                                    Hora Inicio</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtHoraInicio_break" class="tooltips span12" type="text" placeholder="00:00" data-placement="bottom" data-original-title="Formato 24h." />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtHoraFin_break">
                                    Hora Fin</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtHoraFin_break" class="tooltips span12" type="text" placeholder="00:00" data-placement="bottom" data-original-title="Formato 24h." />
                                </div>
                            </div>
                        </div>
                        <div class="span8">
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_lunes" type="checkbox" />
                                        <span>L</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_martes" type="checkbox" />
                                        <span>M</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_miercoles" type="checkbox" />
                                        <span>M</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_jueves" type="checkbox" />
                                        <span>J</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_viernes" type="checkbox" />
                                        <span>V</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_sabado" type="checkbox" />
                                        <span>S</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chk_domingo" type="checkbox" />
                                        <span>D</span>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <a id="A3" class="btn green" href="javascript:agregarDetalle_Break();"><i class="icon-plus"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid" id="GridDetalleBreak">
                        <div class="row-fluid">
                            <div class="span12">
                                <a id="A5" class="btn red" href="javascript:eliminarDetalle_Break();"><i class="icon-minus"></i></a>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <table id="tblbreak" class='display DTTT_selectable table-bordered'>
                                    <thead>
                                        <tr>
                                            <td style='display: none;'>Código</td>
                                            <td style='text-align: center;'>HORA INICIO</td>
                                            <td style='text-align: center;'>HORA FIN</td>
                                            <td style='text-align: center;'>L</td>
                                            <td style='text-align: center;'>M</td>
                                            <td style='text-align: center;'>M</td>
                                            <td style='text-align: center;'>J</td>
                                            <td style='text-align: center;'>V</td>
                                            <td style='text-align: center;'>S</td>
                                            <td style='text-align: center;'>D</td>
                                            <td style='text-align: center;'>ZONA HORARIA</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="?f=nsmghem"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>




            <div id="muestralistap" style="width: 1100px; display: none; margin-left: -484px;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

                <div class="modal-content" id="ContenedorPersonas">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>

                        <div class="row-fluid">
                            <div class="span8">
                                <h3 id="myModalLabel">Listado de plantilla horario.</h3>
                            </div>
                            <div class="span3">
                                <%--<a class="btn green" style="padding: 2px 8px;" href="javascript:editareps();"><i class="icon-pencil"></i>Nuevo</a>
                                <a class="btn red" style="padding: 2px 8px;" href="javascript:listareps();"><i class="icon-plus"></i>Listar</a>--%>
                            </div>
                        </div>
                    </div>
                    <div id="divmodal" class="modal-body" aria-hidden="true">
                        <!--aki se carga el contenido por jquery-->

                    </div>
                    <div id="DivTabla" class="modal-body" aria-hidden="true">
                    </div>
                    <div class="form-actions">
                        <div class="span12">
                            <div class="span1">
                                <p><i class="icon-ok-sign"></i>Sí</p>
                            </div>
                            <div class="span1">
                                <p><i class="icon-ban-circle"></i>No</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <a id="A2" class="btn blue" href="javascript:CrearPlantillaHorario();"><i class="icon-save"></i>&nbsp;Agregar plantilla</a>

                        <%-- onclick="javascript:CrearPlantillaHorario();"<a href="?f=ncmrepe" class="btn"><i class="icon-remove"></i>Cancelar</a>--%>
                    </div>
                </div>
            </div>







        </div>
    </div>
</div>





<input type="hidden" id="hf_hoec_code" />
<script type="text/javascript" src="../vistas/NS/js/NSMGHEM.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMGHEM.init();

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
