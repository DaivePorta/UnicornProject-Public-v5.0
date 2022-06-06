<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMRELA.ascx.vb" Inherits="vistas_NC_NCMRELA" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGIMEN LABORAL</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMRELA"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLRELA"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">Código</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigo" class="span4" disabled="disabled" placeholder="Generado" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label span8" for="chkEstado">Activo</label>
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span4" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDenominacion">Denominación</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDenominacion" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtAcronimo">Acrónimo</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtAcronimo" class="span12" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtTiempoServicios">Tope máximo Indemnización por tiempo de servicios</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtTiempoServicios" class="span6" style="text-align: center" /><span>&nbsp;días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtAnioServicios">Indemnización por año de servicios</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtAnioServicios" class="span6" style="text-align: center" /><span>&nbsp;días / año</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtJornada">Jornada de trabajo máximo semanal</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtJornada" class="span6" style="text-align: center" /><span>&nbsp;horas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtDespido">Tiempo mínimo sin despido arbitrario</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDespido" class="span6" style="text-align: center" /><span>&nbsp;días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txtVacaciones">Periodo de vacaciones al año</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtVacaciones" class="span6" style="text-align: center" /><span>&nbsp;días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="row-fluid">
                    <div class="span11">
                        <div class="span4">
                            <div class="control-group">
                                <label class="control-label" for="txt_porc_cts">Porcentaje C.T.S</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txt_porc_cts" class="span3" onkeypress="return ValidaNumeros(event,this)" style="text-align: center" /><span>&nbsp;%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboBeneficio">Beneficios</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboBeneficio" class="span12"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <button type="button" id="btnAgregar" class="btn blue"><i class="icon-plus" style="line-height: initial"></i></button>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span11">
                        <div class="span8">
                            <table id="tblBeneficios" class="table hover">
                                <thead>
                                    <tr>
                                        <th style="width: 15%; text-align: center">COD</th>
                                        <th>BENEFICIO</th>
                                        <th style="width: 10%"></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMRELA.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMRELA.init();
    });
</script>
