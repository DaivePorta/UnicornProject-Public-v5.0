<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLCRSU.ascx.vb" Inherits="vistas_NF_NFLCRSU" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Cronograma de Pagos SUNAT</h4>
                <div class="actions">
                    <a class="btn black " id="btnImprimir"><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nflcrsu" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo Inicio</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="cbAnioIni" name="cbAnioIni">
                                <input class="span8" type="text" id="cboMesIni" data-date-format="MM" aria-disabled="true" name="cboMesIni">
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo Fin</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="cboAnioFin" name="cboAnioFin">
                                <input class="span8" type="text" id="cboMesFin" data-date-format="MM" aria-disabled="true" name="cboMesFin">
                            </div>
                        </div>
                    </div>

               

      

                    <div class="span2">
                        <a id="buscar"  style="margin-top:24px;" class="btn blue"><i class="icon-find"></i>Buscar</a>

                    </div>

                </div>

                <div class="portlet-body">
                    <div class="row-fluid">
                        <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th rowspan="3">PERIODO TRIBUTARIO</th>
                                    <th colspan="11">FECHA DE VENCIMIENTO SEGUN EL ULTIMO DIGITO DEL RUC</th>
                                </tr>
                                <tr>
                                    <th rowspan="2">0</th>
                                    <th rowspan="2">1</th>
                                    <th rowspan="2">2</th>
                                    <th rowspan="2">3</th>
                                    <th rowspan="2">4</th>
                                    <th rowspan="2">5</th>
                                    <th rowspan="2">6</th>
                                    <th rowspan="2">7</th>
                                    <th rowspan="2">8</th>
                                    <th rowspan="2">9</th>

                                    <th>BUENOS CONTRIBUYENTES y UESP</th>
                                </tr>
                                <tr>
                                    <th>0,1,2,3,4,5,6,7,8 y 9</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnCompletarC" class="btn red"><i class="icon-save"></i>&nbsp;Completar</a>
                    <a id="btnAsignarC" class="btn green"><i class="icon-signout"></i>&nbsp;Asignar Cronograma</a>
                    <a id="btnVerC" class="btn green"><i class="icon-eye-open"></i>&nbsp;Ver Cronograma</a>
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>

                </div>
            </div>


            <div class="portlet-body" id="divAsignaciones" style="display: none;">

                <div class="portlet-body">
                    <div class="row-fluid" style="overflow-x: scroll;">
                        <table id="tbAsignaciones" class="display  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th style="display: none;">CATALOGO</th>
                                    <th>EMPRESA</th>
                                    <th>AÑO</th>
                                    <th>ENERO</th>
                                    <th>FEBRERO</th>
                                    <th>MARZO</th>
                                    <th>ABRIL</th>
                                    <th>MAYO</th>
                                    <th>JUNIO</th>
                                    <th>JULIO</th>
                                    <th>AGOSTO</th>
                                    <th>SETIEMBRE</th>
                                    <th>OCTUBRE</th>
                                    <th>NOVIEMBRE</th>
                                    <th>DICIEMBRE</th>
                                    <th>RENTA ANUAL</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

                <div class="form-actions" style="text-align: right;">
                    <a id="btnCompletarAC" class="btn red"><i class="icon-save"></i>&nbsp;Completar Asignacion</a>
                </div>
            </div>

        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NF/js/NFLCRSU.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLCRSU.init();

    });
</script>
