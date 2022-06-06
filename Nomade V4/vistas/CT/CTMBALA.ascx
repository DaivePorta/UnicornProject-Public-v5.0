<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMBALA.ascx.vb" Inherits="vistas_CT_CTMBALA" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }
</style>

<style>
 .bloc select { height:0px;}
</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>BALANCE CONTABLE</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a id="A4" class="btn purple enviaMail"><i class="icon-envelope"></i>&nbsp Mail</a>--%>
                </div>
            </div>

            <div class="portlet-body">

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
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento" >
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                                <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="control-group span4">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;"">
                                Hasta</label>
                        </div>
                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblAcreedorDeudor" class="control-label" for="cboAcreedorDeudor">
                                Acreedor/Deudor</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="cboAcreedorDeudor" class="span10" data-placeholder="Acreedr/Deudor" >
                                    <option value="A">ACTIVO</option>
                                    <option value="P">PASIVO Y PATRIMONIO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblRealizacion" class="control-label" for="cboRealizacion">
                                Realización</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="cboRealizacion" class="span12" data-placeholder="Realización" >
                                    <option value="">TODOS</option>
                                    <option value="C">CORRIENTE</option>
                                    <option value="NC">NO CORRIENTE</option>
                                    <option value="NB">NO BALANCE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="row-fluid" id="bloqueTotales" style="display: none; margin-bottom: 10px;">
                    <div class="span12">
                        <div class="row-fluid">
                              <div class="span2 offset1">
                                <strong>MONTO TOTAL  (<span id="lblMonedaBase0"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaBase0"></span>&nbsp;<span id="txtTotalMonedaBase0">-</span>
                            </div>
                            <div class="span2">
                                <strong>MONTO TOTAL (<span id="lblMonedaAlterna0"></span>):</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="lblSimboloMonedaAlterna0"></span>&nbsp;<span id="txtTotalMonedaAlterna0">-</span>
                            </div>
                        </div>
                    </div>                  
                </div>
                <div class="row-fluid">
                    <div id="divBandeja">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDIR" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CT/js/CTMBALA.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMBALA.init();
    });
</script>
