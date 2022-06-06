<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLAGEN.ascx.vb" Inherits="vistas_NC_NCLAGEN" %>

<div class="row-fluid" >
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DATOS TIPO DE AGENTE PERSONA</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMAGEN" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLAGEN" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">

                    <div class="span4">
                        <div class="control-group">
                            <select id="cboTipoAgente" class="span12" placeholder="Seleccione">
                                <%--<option value=""></option>--%>
                                <option value="R">Agentes de Retención</option>
                                <option value="P">Agentes de Percepción</option>
                                <option value="B">Buenos Contribuyentes</option>
                                <option value="I">Renunciantes a Exoneración de IGV</option>
                            </select>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12" id="divTblDatos">
                        <table id="tblDatos" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>PIDM</th>
                                    <th style="text-align: center">RUC</th>
                                    <th style="text-align: left">RAZON SOCIAL</th>
                                    <th style="text-align: center">A PARTIR DE</th>
                                    <th style="text-align: center">NRO RESOLUCION</th>
                                </tr>
                            </thead>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMAGEN.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLAGEN.init();
    });
</script>
