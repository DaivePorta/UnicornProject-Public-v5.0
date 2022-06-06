<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMPROG.ascx.vb" Inherits="vistas_CC_CCMPROG" %>
<style>
    #calendar {
        max-width: 80%;
        margin: 5px auto;
        padding: 0 5px;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PROGRAMACIÓN DE COBRANZAS</h4>
                <div class="actions">
                    <%--<a class="btn black" href="javascript:imprimirDiv2(['calendar']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                EMPRESA:</label>
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
                    <div class="span1">
                        <div class="control-group ">
                            <label>PERIODO:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtanio" class="span12" placeholder="AÑO" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMes" class="span12" data-placeholder="MES" tabindex="-1" title="" style="display: none;">
                                    <option></option>
                                    <option value="01">ENERO</option>                                   
                                    <option value="02">FEBRERO</option>
                                    <option value="03">MARZO</option>
                                    <option value="04">ABRIL</option>
                                    <option value="05">MAYO</option>
                                    <option value="06">JUNIO</option>
                                    <option value="07">JULIO</option>
                                    <option value="08">AGOSTO</option>
                                    <option value="09">SEPTIEMBRE</option>
                                    <option value="10">OCTUBRE</option>
                                    <option value="11">NOVIEMBRE</option>
                                    <option value="12">DICIEMBRE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group span12">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="calendar" class="fc fc-ltr fc-unthemed">
                </div>      
                 <div id="mensaje" class="offset1" style="font-style:italic">
                     
                </div>           
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/cc/js/CCMPROG.js"></script>

<script src="../recursos/plugins/fullcalendar-2.2.6/lib/moment.min.js"></script>
<script src="../recursos/plugins/fullcalendar-2.2.6/fullcalendar.min.js"></script>
<script src="../recursos/plugins/fullcalendar-2.2.6/lang/es.js"></script>
<link rel="stylesheet" href="../recursos/plugins/fullcalendar-2.2.6/lib/cupertino/jquery-ui.min.css">
<link href="../recursos/plugins/fullcalendar-2.2.6/fullcalendar.css" rel="stylesheet">
<link href="../recursos/plugins/fullcalendar-2.2.6/fullcalendar.print.css" rel="stylesheet" media="print">

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCMPROG.init();
    });
</script>






