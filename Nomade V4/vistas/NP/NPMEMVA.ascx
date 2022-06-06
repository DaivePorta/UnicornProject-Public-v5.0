<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPMEMVA.ascx.vb" Inherits="vistas_NP_NPMEMVA" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>VACACIONES EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a> 
                    <a href="?f=npmemva" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <%--<a href="?f=nplemco" class="btn red"><i class="icon-list"></i>Listar</a>--%>            
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                     <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="cboEmpresa">
                                Empresa:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Seleccione Empresa">
                                </select>
                            </div>
                        </div>
                    </div>

                      <div class="span1">
                        <div class="control-group">
                            <label id="Label2" class="control-label" for="cboSucursal">
                                Sucursal:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12" data-placeholder="Seleccione Sucursal">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEmpleado" class="control-label" for="cboEmpleado">
                                Empleado:</label>
                        </div>
                    </div>
                    <div class="span3">
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
                                <a id="btnAsignar" class="btn blue">&nbsp;Visualizar</a>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="btnCancelar" class="btn" disabled="disabled">&nbsp;Cancelar</a>
                            </div>
                        </div>
                    </div>

                </div>
               
                <div class="row-fluid">

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="DatosEmp">

                            <div class="row-fluid" style="margin-top: 10px; border-top: 1px solid black">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblNroContrato">
                                            Nro. Contrato:</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label" id="lblNroContrato" style="font-weight: 600">
                                                NRO</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblFechaFin">
                                            Fecha Inicio:</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label" id="lblFechaInicio" style="font-weight: 600">
                                                00/00/00</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblFechaFin">
                                            Fecha Fin:</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label" id="lblFechaFin" style="font-weight: 600">
                                                00/00/00</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblEstadoCont">
                                            Contrato:</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label" id="lblEstadoCont" style="font-weight: 600">
                                                ESTADO</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblFechaIngreso">
                                            Fecha Ingreso:</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label class="control-label" id="lblFechaIngreso" style="font-weight: 600">
                                                00/00/00</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="lblRegLaboral">
                                            Reg. Laboral:</label>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <label id="lblRegLaboral" class="control-label" style="font-weight: 600">
                                                -</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid" style="margin-top: 5px; border-top: 1px solid black">                                                       
                            </div>

                            <div class="row-fluid" style="margin-top: 10px">                                                                  
                                <h4 class="span3" style="text-align: center">PERIODO VACACIONAL</h4>
                                <button id="btnAddPeriodo" type="button" class="btn green" style="margin-top: 6px"><i class="icon-plus-sign"></i></button>
                            </div>

                            <div class="row-fluid" style="margin-top: 0px">
                                <div id="divPeriodoVac" class="span8" style="overflow: auto; margin-top: -30px"></div>

                                <div class="span3" id="agregaFechas" style="margin-top: -10px">
                                    
                                    <div class="row-fluid" style="margin-top: 10px">
                                        <div class="span5"><b>Periodo Nro. :</b></div>
                                        <div class="span1"><b>
                                            <label id="lblNroPeriodo" style="font-size: x-large; background-color: lightcyan"></label>
                                        </b></div>
                                    </div>

                                    <div class="row-fluid" style="margin-top: 10px">
                                        <h5>Programar Vacaciones:</h5>
                                    </div>

                                    <div class="row-fluid" style="margin-top: 15px">
                                        <div class="span4">
                                            <label>Fecha Inicio:</label>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaInicio" data-date-format="dd/mm/yyyy" style="font-size: small" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <input id="chkAdelanto" type="checkbox" disabled="disabled" />                                                       
                                        </div>
                                        <div class="span1">
                                            <label>Adelanto</label>
                                        </div>
                                    </div>

                                    <div class="row-fluid">
                                        <div class="span4">
                                            <label>Fecha Fin:</label>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaFin" data-date-format="dd/mm/yyyy" style="font-size: small" />
                                                </div>
                                            </div>
                                        </div>
                                         <div class="span2">
                                            <input type="text" class="span12" id="txtDias" disabled="disabled" />
                                        </div>

                                         <div class="span2">
                                            <button id="btnAgregarVac" type="button" class="btn blue"><i>&nbsp;Agregar</i></button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfREGLAB_CODE" />
        <input type="hidden" id="hfREGLAB_DIAS" />
        <input type="hidden" id="hfESTADO_CONT" />
        <input type="hidden" id="hfSERIE_CONT" />
        <input type="hidden" id="hfSECUENCIA_VAC" />
        <input type="hidden" id="hfPOSICION" />
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NP/js/NPMEMVA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NPMEMVA.init();
    });
</script>