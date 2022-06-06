<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLMOVI.ascx.vb" Inherits="vistas_CP_CPLMOVI" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA PLANILLA DE MOVILIDADES DE TRABAJADORES</h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:fnImprimir();"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEmpresa">
                                            Empresa</label>
                                    </div>
                                </div>
                                <div class="span4">
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
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtPeriodo">Periodo</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <%--<input id="txtPeriodo" class="span12" type="text" placeholder="Periodo" style="text-align: center; margin-left: 2px;" />--%>
                                        <select id="cboPeriodo" class="span12" data-placeholder="Seleccione Periodo"></select>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtTrabajador">Trabajador</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <input id="txtTrabajador" class="span12" type="text" placeholder="Trabajador" style="text-align: center; margin-left: 2px;" />
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span11"></div>
                                <div class="span1">
                                    <a id="btnFiltrar" class="btn blue">Filtrar</a>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span2">Total de Movilidades</div>
                                <div class="span1"><span id="spTotal"></span></div>
                            </div>

                            <div id="dvLista"></div>
                            <div id="dvTablaL" style="display:none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfnombre_emp" />
<input type="hidden" id="hfdpIdPeriodo" />
<input type="hidden" id="hdfNombrePeriodo" />
<script src="../vistas/CP/js/CPMMOVI.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLMOVI.init();
    });
</script>



