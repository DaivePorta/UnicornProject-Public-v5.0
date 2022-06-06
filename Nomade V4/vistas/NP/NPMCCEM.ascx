<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPMCCEM.ascx.vb" Inherits="vistas_NP_NPMCCEM" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>EMPLEADOS CENTRO COSTO</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa:
                            </label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Seleccione Empleado">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEmpleado" class="control-label" for="cboEmpleado">
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
                                <a id="btnAsignar" class="btn blue">&nbsp;Asignar</a>
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
                                <label class="control-label" for="lblFechaInicio">
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



                    <div class="row-fluid" >
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="lblEmpresa">
                                    Empresa:</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" id="lblEmpresa" style="font-weight: 600">
                                        EMPRESA</label>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimiento">
                                    Sucursal:</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <label id="lblEstablecimiento" class="control-label" style="font-weight: 600">
                                        ESTABLECIMIENTO</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row-fluid" style="margin-top: 5px; border-top: 1px solid black">
                        <!--
                        <div id="DatosAgregar" style="margin-top: 13px">
                            <div class="span1">
                                <div class="control-group ">
                                    <label>
                                        Area:
                                    </label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span12">
                                            <select id="cboArea" class="span12" data-placeholder="Area">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span1">
                                <div class="control-group ">
                                    <label>
                                        Seccion:
                                    </label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span12">
                                            <select id="cboSeccion" class="span12" data-placeholder="Seccion">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span1">
                                <div class="control-group ">
                                    <label>
                                        Proceso:
                                    </label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span12">
                                            <select id="cboProceso" class="span12" data-placeholder="Proceso">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span1">
                                <div class="control-group ">
                                    <label>
                                        Actividad:
                                    </label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span12">
                                            <select id="cboActividad" class="span12" data-placeholder="Actividad">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->
                        <div class="row-fluid" id="dvCombos" style="display:none;"></div>
                        <div id="DatosAgregar"></div>
                        <div class="row-fluid">
                            <%-- <div class="span1">
                            <div class="control-group ">
                                <label>
                                    Fecha Inicio:
                                </label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="controls">
                                  <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtFechaIni" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>--%>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span2">Centro Costo</div>
                                    <div class="span9">
                                        <input type="text" id="txt_centro_costo" class="m-wrap span12 centroCostos" disabled="disabled" />
                                    </div>
                                    <div class="span1">
                                         <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                        <%--<input type="button" class="btn green" value="..." id="btnAddCeCo" />--%>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group ">
                                    <label>
                                        Porcentaje:
                                    </label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div class="span12">
                                                <input type="text" id="txtPorcentaje" class="span12" onkeypress="return ValidaDecimales(event,this)" maxlength="5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div class="span1">
                                    <b>%</b>
                                </div>

                                <div class="controls span2">
                                    <div class="controls">
                                        <a id="AgregaCC" class="btn green">+</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="divCentroCostos">
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCTLG_CODE" />
        <input type="hidden" id="hfESTADO_CONT" />
    </div>


</div>
<!-- Modal Centro de Costo -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title">CENTROS DE COSTO</h4>
      </div>
      <div class="modal-body">
        <div class="row-fluid">
            <div class="span2"></div>
            <div class="span8">                
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span2"></div>            
        </div>
        <div class="row-fluid">
            <div class="span1"></div>
            <div class="span10">
                <div id="treeCentroCostos" class="treeview">
                </div>
            </div>
            <div class="span1"></div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
        <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
      </div>
    </div>
  </div>
</div>
<!-- FIN DE LA VENTANA MODAL-->

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="../vistas/NP/js/NPMCCEM.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NPMCCEM.init();

    });
</script>
