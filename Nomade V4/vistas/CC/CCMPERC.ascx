<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMPERC.ascx.vb" Inherits="vistas_CC_CCMPERC" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DEVOLUCION PERCEPCIONES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['divPercepciones']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%--<a href="?f=ccmperc" class="btn red"><i class="icon-list"></i>Listar</a>--%>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
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
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtSeleccionado">
                                Seleccionado (S/.)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSeleccionado" type="text" class="span12" disabled="disabled" style="text-align: right;" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divPercepciones" class="span8">
                        <table id="tblPercepciones" class="display DTTT_selectable bordered dataTable no-footer" style='width: 100%;'>
                            <thead>
                                <tr>
                                    <th>DOCUMENTO</th>
                                    <th>FECHA EMISIÓN</th>
                                    <th>PROVEEDOR</th>
                                    <th>PERCEPCIÓN</th>
                                    <th>SALDO</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>                              
                            </tbody>
                        </table>

                    </div>
                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaTransaccion">
                                        Fecha Transacción</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFechaTransaccion" type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtFechaPago">
                                        Fecha Pago</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFechaPago" type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="cboModoPago">
                                        Modo de Pago</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboModoPago" class="m-wrap span12" data-placeholder="Modo Pago"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtCuentaOrigen">
                                        Cuenta origen</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCuentaOrigen" type="text" class="span12" placeholder="Cuenta Origen" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtNroCheque">
                                        Número Cheque</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNroCheque" type="text" class="span12" placeholder="NroCheque" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="cboCuentaDestino">
                                        Cuenta Destino</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboCuentaDestino" class="m-wrap span12" data-placeholder="Cuenta Destino"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtNroOperacion">
                                        Nro Operación</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNroOperacion" type="text" class="span12" placeholder="Nro Operación" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtMonto">
                                        Monto</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtMonto" onkeypress='return ValidaDecimales(event,this)'  onkeyup='calcularInteres()' class="span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label" for="txtMonto">
                                        Interés</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtInteres" value="0" disabled="disabled" class="span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid" style="margin-top: 10px;">
                            <div class="span12">
                                <div class="form-actions">
                                    <p style="font-style:italic;">*El monto excedente será registrado como interés de la última percepción seleccionada</p>
                                    <a id="grabar" class="btn blue" href="javascript:GrabarCobroPercepcion();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                    <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid" style="margin-top: 15px;">
                    <div id="divAperturasCaja">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/cc/js/CCMPERC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CCMPERC.init();
    });
</script>
