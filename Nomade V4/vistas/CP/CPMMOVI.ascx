<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMMOVI.ascx.vb" Inherits="vistas_CP_CPMMOV" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
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
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PLANILLA DE MOVILIDADES DE TRABAJADORES</h4>
                <div class="actions">
                    <a href="?f=cpmmovi" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=cplmovi" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">

                        <div class="tab-content">
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
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboEstablecimiento">
                                                Establecimiento</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Fecha y Trabajadores-->
                            <div class="row-fluid">
                                <div class="span1">Desde</div>
                                <div class="span2">
                                    <input type="text" style="text-align: left;" class="b fecha m-wrap span12 required" data-date-format="dd/mm/yyyy" id="txtFechaDesde" />
                                </div>
                                <div class="span1">Hasta</div>
                                <div class="span2">
                                    <input type="text" style="text-align: left;" class="b fecha m-wrap span12 required" data-date-format="dd/mm/yyyy" id="txtFechaHasta" />
                                </div>
                                <div class="span2">Trabajador</div>
                                <div class="span4">
                                    <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Trabajador movilizado">
                                    </select>
                                </div>
                            </div>
                            
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtPeriodo">Periodo</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <%--<input type="text" style="text-align: left;" class="span12" disabled="disabled" id="txtPeriodo" />--%>
                                            <select id="cboPeriodo" class="span12" data-placeholder="Seleccione Periodo">
                                    </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txaGlosa">Glosa</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <textarea id="txaGlosa" class="span12"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtPeriodo">Nro. Planilla</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" style="text-align: left;" class="span12" id="txtPlanilla" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <input type="button" id="btnFiltro" class="btn blue" value="Filtrar" />
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span2">Total de Movilidades</div>
                                <div class="span1"><span id="spTotal"></span></div>
                                <div class="span2">Movilidades Válidas</div>
                                <div class="span1"><span id="spTotalValido"></span></div>
                                <div class="span2">Movilidades Inválidas</div>
                                <div class="span1"><span id="spTotalInvalido"></span></div>
                            </div>
                            <div id="dvLista"></div>
                            <div class="form-actions" id="acciones_generales" style="display: block;">
                                <a id="aprobar" class="btn green" href="javascript:fnGuardarPlanillaMovilidad();"><i class="icon-ok"></i>&nbsp;Aprobar</a>&nbsp;&nbsp;                                      
                                    <a id="cancelar" class="btn" href="?f=CPLMOVI"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                            </div>
                            
                            <!-- FIN DE GENERALES-->
                        </div>
                        <!-- FIN DEL CUERPO DE LA FORMA-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdfIdPeriodo"/>
<script src="../vistas/CP/js/CPMMOVI.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPMMOVI.init();
    });
</script>
