<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMAGEN.ascx.vb" Inherits="vistas_NC_NCMAGEN" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CARGA DATOS TIPO DE AGENTE</h4>
                <div class="actions">
                    <a href="?f=NCMAGEN" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLAGEN" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span3 offset3">
                        <div class="control-group">
                            <select id="cboTipoAgente" class="span12" placeholder="Seleccione">
                                <%--<option value=""></option>--%>
                                <option value="R">Agente de Retención</option>
                                <option value="P">Agente de Percepción</option>
                                <option value="B">Buen Contribuyente</option>
                                <option value="I">Renunciantes a Exoneración de IGV</option>
                            </select>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="span12">
                                <input type="file" class="btn blue" id="archivoTexto" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span5 offset3" style="text-align: center; margin-top: 15px;">
                        <a id="btnCargar" class="btn green" style="margin-left: 5px;"><i class=" icon-upload"></i>&nbsp;Cargar</a>

                        <a id="btnActualizar" class="btn blue" style="margin-left: 5px; display: none;">Procesar y Actualizar</a>

                    </div>
                </div>
                <div class="row-fluid" id="divBarraProgreso" style="display: none; margin-top: 15px;">
                    <div class="span10 offset1">
                        <div id="progreso" class="span12" style="margin: 5px; z-index: 1;">
                            <div class="progress progress-striped active">
                                <div id="porcentaje" style="width: 0%;" class="bar">0 %</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid " id="divInfoActualizar" style="display: none;">
                        <div class="span10 offset1 alert-info" id="div1">
                   
                      <table id="Table1" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead>
                                    <tr>                               
                                         <th style="text-align: center; max-width: 300px !important; width: 300px !important;vertical-align: middle;">Actualizados</th>
                                        <th style="text-align: center;vertical-align: middle;" id="lblRegistrosActualizados">0</th>
                                        <th style="text-align: center" >
                                            <%--<a id="btnVerActualizados" class="btn black" style="margin-left: 5px;">Ver</a>--%>
                                        </th>
                                         <th style="text-align: center; max-width: 300px !important; width: 300px !important;vertical-align: middle;">Sin Actualizar</th>
                                        <th style="text-align: center;vertical-align: middle;" id="lblRegistrosSinActualizar">0</th>
                                        <th style="text-align: center" >
                                            <a id="btnVerNoActualizados" class="btn black" style="margin-left: 5px;">Ver</a>
                                    </tr>                                 
                                </thead>
                            </table>
                            </div>
                </div>
                <div id="divInfo" style="display: none;">

                    <div class="row-fluid" style="margin-top: 15px;">
                        <div class="span10 offset1" id="divResumen">

                            <table id="Table2" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead>
                                    <tr>
                                        <th style="text-align: left; max-width: 300px !important; width: 300px !important;">Coincidencias Encontradas</th>
                                        <th style="text-align: right" id="lblCoincidencias">0</th>
                                    </tr>
                                    <tr>
                                        <th style="text-align: left; max-width: 300px !important; width: 300px !important;">Total de Registros en Archivo</th>
                                        <th style="text-align: right" id="lblTotalRegistros">0</th>
                                    </tr>
                                    <tr>
                                    <tr>
                                        <th style="text-align: left; max-width: 300px !important; width: 300px !important;">Registros Sin Mostrar</th>
                                        <th style="text-align: right" id="lblSinMostrar">0</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div class="row-fluid" style="margin-top: 15px;">
                        <div class="span12" id="divDatos" style="overflow: auto; max-height: 500px;">
                            <table id="tblDatos" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead style="background-color: #3D3D3D; text-align: center; color: #ffffff;">
                                    <tr>
                                        <th style="text-align: center" colspan="5">DATOS EJEMPLO - N° MÁXIMO MOSTRADO : 200</th>
                                    </tr>
                                    <tr>
                                        <th style="text-align: center">#</th>
                                        <th style="text-align: center">RUC</th>
                                        <th style="text-align: center">RAZÓN SOCIAL</th>
                                        <th style="text-align: center">A PARTIR DEL</th>
                                        <th style="text-align: center">RESOLUCIÓN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5">
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
           
            </div>
        </div>
    </div>
</div>

<div id="modalActualizados" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalActualizados_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;REGISTROS ACTUALIZADOS</h4>
    </div>
    <div class="modal-body" id="modalActualizados_body">
                        <table id="Table3" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead style="text-align: center;">                                   
                                    <tr>
                                        <th style="text-align: center">#</th>
                                        <th style="text-align: center">RUC</th>
                                        <th style="text-align: left">RAZÓN SOCIAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="3">
                                    </tr>
                                </tbody>
                            </table>    

    </div>
    <div class="modal-footer">
        <%--<h6 class="text-right">Clic en el <span style="color: blue">botón de carga</span> para seleccionar</h6>--%>
    </div>
</div>

<div id="modalNoActualizados" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalNoActualizados_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;REGISTROS NO ACTUALIZADOS</h4>
    </div>
    <div class="modal-body" id="modalNoActualizados_body">
                    <table id="tblNoActualizados" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead style="text-align: center;">                                
                                    <tr>
                                        <th style="text-align: center">#</th>
                                        <th style="text-align: center">RUC</th>
                                        <th style="text-align: left">RAZÓN SOCIAL</th>
                                        <th style="text-align: left">INCONVENIENTE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="4">
                                    </tr>
                                </tbody>
                            </table>    

    </div>
    <div class="modal-footer">
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMAGEN.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMAGEN.init();
    });
</script>
