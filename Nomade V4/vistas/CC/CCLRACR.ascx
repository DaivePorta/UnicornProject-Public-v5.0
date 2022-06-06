<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCLRACR.ascx.vb" Inherits="vistas_CC_CCLRACR" %>
<style>
    #tblDatos {
        width: 100%;
        border: 1px solid #cbcbcb;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE ANALÍTICO CRÉDITOS CLIENTES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divDatos','divGrafico']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a href="?f=ccmperc" class="btn red"><i class="icon-list"></i>Listar</a>--%>
                </div>

            </div>

            <div class="portlet-body" id="ventana">
                <div class="row-fluid">
                    <div class="span3">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" for="cboEmpresa">
                                        EMPRESA:</label>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group ">
                                    <label>PERIODO:</label>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">

                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtanio" class="span12" placeholder="AÑO" type="text" data-provide="typeahead" />
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboMes" class="span12" data-placeholder="MES">
                                            <option></option>
                                            <option value="01">ENERO</option>
                                            <option value="02">FEBRERO</option>
                                            <option value="03">MARZO</option>
                                            <option value="04">ABRIL</option>
                                            <option value="05">MAYO</option>
                                            <option value="06">JUNIO</option>
                                            <option value="07">JULIO</option>
                                            <option value="08">AGOSTO</option>
                                            <option value="09">SETIEMBRE</option>
                                            <option value="10">OCTUBRE</option>
                                            <option value="11">NOVIEMBRE</option>
                                            <option value="12">DICIEMBRE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group span12">
                                    <div class="controls">
                                        <a id="buscar" class="btn blue">FILTRAR</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div id="divDatos" class="span12" style="max-height: 400px; overflow-y: auto;">
                            </div>
                        </div>
                    </div>
                    <div class="span9">
                        <div id="divGrafico">
                            <div id="contenedor" style="min-width: 310px; min-height: 600px; margin: 0 auto;"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/cc/js/CCLRACR.js"></script>
<script type="text/javascript">
    
</script>
<script src="../recursos/plugins/highcharts-4.0.4/js/highcharts.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/data.js"></script>
<script src="../recursos/plugins/highcharts-4.0.4/js/modules/exporting.js"></script>



<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCLRACR.init();
    });
</script>


