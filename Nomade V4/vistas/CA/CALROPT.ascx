<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALROPT.ascx.vb" Inherits="vistas_CA_CALROPT" %>

<style>
.portlet-title .actions > .btn {
  padding: 4px 10px;
  margin-top: -10px;
}
</style>

    <div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajemodal">
        
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano"  class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE ESTADO DE CUENTA POR OPERADOR</h4>
                <div class="actions">

                    <button id="btnAjuste" type="button" class="btn green"><i class="icon-wrench"></i> Nuevo Ajuste</button>
                  
                </div>

            </div>
            <div class="portlet-body">


                <div class="row-fluid head" >

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcEmpr">Empresa</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select class="empresa obligatorio span9" id="slcEmpr" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="slcOpe">Operador</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select class="obligatorio span9" data-placeholder="OPERADOR DE TARJETA" id="slcOpe">
                                    <option></option>

                                </select>
                            </div>
                        </div>
                    </div>


                </div>


                <div class="row-fluid head">


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaIni">
                                Fecha Inicio
                            </label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaIni" class="span10 obligatorio" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaFin">
                                Fecha fin
                            </label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaFin" class="span10 obligatorio" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcMoneda">
                                Moneda
                            </label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcMoneda" data-placeholder="MONEDA" class="span10 obligatorio" disabled="disabled">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <button type="button" id="btnFiltrar" class="btn blue">Filtrar</button>

                    </div>
                </div>

                <div class="row-fluid body_1 activo">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" cellspacing="0" border="1">
                            <thead style="background-color: #E0E0E0;">
                                <tr>
                                    <th rowspan="2">FECHA
                                    </th>
                                    <th rowspan="2">TIPO TRANSACCION
                                    </th>
                                    <th rowspan="2">
                                    NRO. DE LOTE RESUMEN/TARJETA
                                    <th colspan="2">DEPOSITOS
                                    </th>
                                    <th rowspan="2">TOTALES COMISIONES
                                    </th>
                                    <th rowspan="2">COMISION EMISORES
                                    </th>
                                    <th rowspan="2">COMISION OPERADOR
                                    </th>
                                    <th rowspan="2">OTROS CARGOS ABONOS
                                    </th>
                                    <th rowspan="2">IGV
                                    </th>
                                    <th rowspan="2">IMPORTE ABONADO
                                    </th>
                                </tr>
                                <tr>
                                    <th>Cantidad Ordenes de Pago</th>
                                    <th>Importe Procesado</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th colspan="3" style="text-align: right">Totales:</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>


            </div>

        </div>
    </div>
</div>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box green" id="ventanaAjuste" style="display: none;">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>Nuevo Ajuste</h4>
                <div class="actions">

                    <button type="button" class="btn red span12 cerrar" onclick="$('#ventanaAjuste').hide(); "><i class="icon-remove"></i></button>

                </div>
            </div>
            <div class="portlet-body">


                <div class="row-fluid body_2">
                    <div class="row-fluid">

                        <div class="span2" style="margin-top: 15px; padding-left: 25px; margin-top: 15px;border-right: solid 1px gainsboro;">
                            <div class="control-group">
                                <%-- <div class="controls">--%>
                                    <input type="radio" id="RdAbono" symbol="+" name="CargoAbono" checked="checked" class="span10" /> Abono
                              <br />
                                    <input type="radio" id="RdCargo" symbol="-" name="CargoAbono" class="span10" /> Cargo
                               <%-- </div>--%>

                            </div>
                        </div>

                         <div class="span2">
                            <div class="control-group">
                               <label class="control-label" for="txtmonto">
                                    Importe abonado
                                </label>
                                <div class="controls">
                                    <input id="txtImpAbon" style="text-align: right;" class="span10 obligatorio2" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        
                        <div class="span1" id="CargAbonSym" style="font-size: 24px;margin-top: 30px;">+</div>

                           <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtmonto">
                                    Cargo/Abono
                                </label>
                                <div class="controls">
                                    <input id="txtmonto" style="text-align: right;"  class="span10 obligatorio2" onkeypress="return ValidaDecimales(event,this,2)" placeholder="0.00" type="text" />
                                </div>
                            </div>
                        </div>
                       

                         <div class="span1" style="font-size: 24px;margin-top: 30px;">=</div>

                        <div class="span2" >
                            <div class="control-group">
                               <label class="control-label" for="txtmonto">
                                    Importe ajustado
                                </label>
                                <div class="controls">
                                    <input id="txtimpAjus" style="text-align: right;" class="span10" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div class="form-actions">
                            <a id="grabar" class="btn blue" onclick="javascript:Confirmacion();" ><i class="icon-save"></i>Grabar</a>
                            <a class="btn cerrar" onclick="$('#ventanaAjuste').hide();" ><i class="icon-remove"></i>Cancelar</a>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CA/js/CAMROPT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALROPT.init();

    });
</script>
