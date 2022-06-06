<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMAPHO.ascx.vb" Inherits="vistas_NS_NSMAPHO" %>
   <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Autorización de horas extras</h4>
                <div class="actions">
                    <%--<a id="btnNuevo" class="btn green" href="?f=NSMAPHO"><i class="icon-plus"></i>Nuevo</a>--%>
                    <a class="btn red" href="?f=NSLAPHO"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">




                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcnivel">
                                Código</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <%--<input id="txtCodigo" type="text" class="span12" disabled="disabled" />--%>
                                <label id="txtCodigo"></label>
                            </div>
                        </div>
                    </div>
                </div>


               

                <div class="row-fluid" >
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblEmpresa">
                                Empresa</label>

                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="Empresa">
                                <%--<select id="Select1" class="span12">
                                </select>--%>
                                <select id="cboEmpresa" class="span12" onchange="ListarEmpleado();">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpleado">
                                Empleado</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <div class="controls" id="Empleado">
                                <select id="cboEmpleado" class="span12">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>




                       <div class="row-fluid" >
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtPlame">
                                Asingnación</label>

                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="Plame">
                                <%--<select id="Select1" class="span12">
                                </select>--%>
                                <label class="txtPlame">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>














                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaProceso" id="lblDesde">
                                Fecha Proceso</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div id="FechaUno" class="control-group span6">
                            <div class="controls span10">
                                <%--<input class="span12 date-picker" type="text" id="txtFechaProceso" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled="disabled">--%>
                                <label id="txtFechaProceso"></label>
                            </div>
                        </div>
                    </div>


                    <div class="span2" id="DivlblHasta">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaAutorizada">
                                Fecha Autorizada</label>
                        </div>
                    </div>
                    <div class="span4" id="DivtxtHasta">
                        <div id="FechaDos" class="control-group span4">
                            <div class="controls span10">
                                <%--<input class="span12 date-picker" type="text" id="txtFechaAutorizada" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">--%>
                                <label id="txtFechaAutorizada"></label>
                            </div>
                        </div>
                    </div>


                </div>





                <div class="row-fluid" id="DivHora">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtHoraInicio">
                                Hora inicio</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div id="HoraUno" class="control-group span3">
                            <div class="controls">
                                <%--<input id="txtHoraInicio" class="span12" type="text" placeholder="00:00" />--%>
                                <label id="txtHoraInicio"></label>
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtHoraFin">
                                Hora fin</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div id="HoraDos" class="control-group span3">
                            <div class="controls">
                                <%--<input id="txtHoraFin" class="span12" type="text" placeholder="00:00" />--%>
                                <label id="txtHoraFin"></label>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblPeriodo">
                                Periodo</label>

                        </div>
                    </div>
                    <div class="span3">
                        <div id="Div1" class="control-group span3">
                            <div class="controls">
                                <label id="lblPeriodo"></label>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMonto">
                                Monto</label>

                        </div>
                    </div>
                    <div class="span4">
                        <div id="Div2" class="control-group span3">
                            <div class="controls">
                                <%--<input id="txtMonto" class="span12" type="text" disabled="disabled"/>--%>
                                <label id="txtMonto"></label>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMotivo">
                                Motivo</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                 <%--<input id="txtMotivo" class="span12" type="text" maxlength="50"/>--%>
                                <label id="txtMotivo"></label>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblSolicitante">
                                Solicitante</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblSolicitante">NO RECEPCIONADO.</label>
                            </div>
                        </div>
                    </div>
                </div>
                   <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblAprobante">
                                Aprobante</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblAprobante">NO RECEPCIONADO.</label>
                            </div>
                        </div>
                    </div>
                       <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblProceso">
                                Proceso</label>

                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblProceso">No solicitada.</label>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div class="form-actions">
                    <%--<a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-circle-arrow-right"></i> Solicitar</a>--%>
                    <!--<a id="aprobar" class="btn green" href="javascript:GrabarJustificacion();"><i class="icon-check"></i> Aprobar</a>-->
                    <a id="btnSalir" class="btn" href="?f=NSLAPHO"><i class="icon-remove"></i> Salir</a>
                </div>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="../vistas/NS/js/NSLAPHO.js"></script>

    <script>

        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
            NSMAPHO.init('Z');

        });
    </script>
