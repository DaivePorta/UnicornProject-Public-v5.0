<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLCRBA.ascx.vb" Inherits="vistas_NB_NBLCRBA" %>

<style>
    .datoCredito{
        font-size:15px;
        font-weight:bold;
    }

</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTADO CREDITO BANCARIO</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nbmcrba" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nblcrba" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>

                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="slcEstablec" class="span12 estable" data-placeholder="Seleccionar Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                   <div class="span2">
                        <div class="control-group">
                            <label class="control-label datoCredito">
                               Deuda Actual:</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblMoneBase"  class="datoCredito" style="font-weight:bold;">
                                -</label>
                        </div>
                    </div>

                                      <div class="span1">
                        <div class="control-group">
                            <label id="lblMoneAlter"  class="datoCredito" style="font-weight:bold;">
                                -</label>
                        </div>
                    </div>



                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcCuenta">
                                Cuenta</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcCuenta" class="span12" data-placeholder="TODAS" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcMoneda" class="span12" data-placeholder="Moneda" tabindex="1" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnFiltrar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div id="divTabla">
                        <table id="tblBandeja" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th rowspan="2">CUENTA</th>
                                    <th rowspan="2">BANCO</th>
                                    <th rowspan="2">F. INGRESO</th>
                                    <th rowspan="2">MONEDA</th>
                                    <th rowspan="2">N° CUOTAS</th>
                                    <th rowspan="2">TEA(%)</th>
                                    <th rowspan="2">MONTO PESTADO</th>
                                    <th rowspan="2">INTERES TOTAL</th>
                                    <th rowspan="2">MONTO TOTAL</th>                                    
                                    <th rowspan="2">TIPO </th>
                                    <th colspan="2">AMORTIZADO</th>
                                </tr>
                                <tr>
                                    <th>CUOTAS</th>
                                    <th>MONTO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<script type="text/javascript" src="../vistas/NB/js/NBMCRBA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLCRBA.init();
    });
</script>
