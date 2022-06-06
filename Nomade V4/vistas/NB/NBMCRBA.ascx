<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMCRBA.ascx.vb" Inherits="vistas_NB_NBMCRBA" %>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<style>
    .add-on {
        height: 20px !important;
        line-height: 20px !important;
    }


    .select2-results .select2-disabled, .select2-results__option[aria-disabled=true] {
        display: none;
    }

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
                    <i class="icon-reorder"></i>&nbsp;CREDITO BANCARIO</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp Mail</a>
                    <a class="btn black" href="javascript:imprimirDiv(['d1','d2','d3','divTabla']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nbmcrba" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nblcrba" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid" id="d1">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEstablec" class="span12 estable obligatorio" data-placeholder="Seleccionar Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <label>Fecha Ingreso</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls bloc">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFecha" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>


                </div>


                <div class="row-fluid" id="d2">


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcBco">
                                Banco</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcBco" class="span12 obligatorio" data-placeholder="Seleccionar Banco" tabindex="1">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcCuenta">
                                Cuenta</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcCuenta" class="span12" data-placeholder="Seleccionar Cuenta" tabindex="1">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNroCredito">
                                N° Credito</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 obligatorio" id="txtNroCredito" />

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcMoneda">
                                Moneda</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcMoneda" class="span12 obligatorio" data-placeholder="Moneda" tabindex="1">
                                    <option></option>

                                </select>

                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" id="d3">


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcTipoPr">
                                Tipo</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcTipoPr" class="span12 obligatorio" data-placeholder="Tipo de Prestamos" tabindex="1">
                                    <option></option>
                                    <option value="LC">LINEA DE CREDITO</option>
                                    <option value="LE">LEASING</option>
                                    <option value="HI">HIPOTECARIO</option>
                                    <option value="CT">CAPITAL DE TRABAJO</option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span9">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtMonto">
                                    Monto</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="input-prepend">
                                        <span class="add-on" id="sMoneda"></span>
                                        <input type="text" class="span10 obligatorio" id="txtMonto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="span1 dpago">
                            <div class="control-group">
                                <label class="control-label" for="txtDPago">
                                    D. Pago</label>
                            </div>
                        </div>
                        <div class="span1 dpago">
                            <div class="control-group">
                                <div class="controls">                                                                   
                                        <input type="number" max="30" class="span12 obligatorio" id="txtDPago" />                                   
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtCuotas">
                                    N° Cuotas</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 obligatorio" id="txtCuotas" />

                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtTea">
                                    TEA</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="input-prepend">
                                        <span class="add-on">%</span>
                                        <input type="text" class="span12 obligatorio" id="txtTea" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="span2" style="text-align: center;">
                            <div class="control-group">
                                <div class="controls">
                                    <button type="button" id="btn_Generar" class="btn blue"><i class="icon-chevron-right"></i>&nbsp;Generar Tabla</button>
                                </div>
                            </div>
                        </div>

                    </div>




                </div>


                <div id="infoPagoCredito">
                    <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label datoCredito">
                                Capital Amortizado:</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblCapAmortizado"  class="datoCredito" style="font-weight:bold;">
                                -</label>
                        </div>
                    </div>

                    <div class="span2 offset1">
                        <div class="control-group">
                            <label class="control-label datoCredito" style="font-weight: bold;">
                                Intereses y Comisiones:</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblIntereses" class="datoCredito" style="font-weight: bold;">
                                -</label>
                        </div>
                    </div>

                    <div class="span2 offset1">
                        <div class="control-group">
                            <label class="control-label datoCredito" style="font-weight: bold;">
                                Por pagar:</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblSaldo"  class="datoCredito" style="font-weight: bold;">
                                -</label>
                        </div>
                    </div>


                </div>


                </div>
                


                <div class="row-fluid">
                    <div class="span12" id="divTabla">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1" style="display: none;">
                            <thead>
                                <tr>
                                    <th>N° CUOTA
                                    </th>
                                    <th>F. VCTO
                                    </th>
                                    <th>DIAS
                                    </th>
                                    <th>SALDO ADEUDADO
                                    </th>
                                    <th>CAP. AMORTIZA
                                    </th>
                                    <th>INTERES
                                    </th>
                                    <th>COMISIONES
                                    </th>
                                    <th>IMP. CUOTA
                                    </th>
                                    <th>F. PAGO
                                    </th>


                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th colspan="4" style="text-align: right">TOTALES:</th>
                                    <th style="text-align: right"></th>
                                    <th style="text-align: right"></th>
                                    <th style="text-align: right"></th>
                                    <th style="text-align: right"></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
                <div class="form-actions" style="display: none;">
                    <button id="grabarA" type="button" class="btn blue" onclick="javascript:grabar();"><i class="icon-save"></i>&nbsp;Guardar</button>
                    <button style="display: none;" id="grabarR" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;Completar</button>

                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<input type="hidden" id="hddauxiliar" value="">
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NB/js/NBMCRBA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMCRBA.init();


    });
</script>

<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn close_mail red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divMail_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">De:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <select multiple class="span12" id="cboCorreos"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Asunto:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtAsunto" class="span12">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                        <div id="datos_correo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>

<div id="divModalCajaBanco" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn close red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-pencil" style="line-height: initial;"></i>&nbsp;Destino del Credito</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span3">

                <label>Destino</label>

            </div>
            <div class="span7">
                <div class="control-group">
                    <div class="controls">
                        <select id="cbo_OrigenPago" class="span12" data-placeholder="DESTINO">
                            <option></option>
                            <option value="Caja">CAJA</option>
                            <option value="Banco">BANCO</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span3">

                <label id="lbl_detalle1">-</label>

            </div>
            <div class="span7 div_origen">
                <div class="control-group">
                    <div class="controls">
                        <select id="cbo_Det_Origen" class="span12" data-placeholder="-" disabled="disabled">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid hide" id="divNro">
            <div class="span3">

                <label id="Label1">Nro Operación</label>

            </div>
            <div class="span5 div_origen">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" id="txtNroOpe" class="span12" />
                    </div>
                </div>
            </div>

        </div>


    </div>
    <div class="modal-footer">
        <button type="button" class="btn green" id="btnAceptar">Aceptar</button>
        <button type="button" class="btn red" id="btnCancelar" data-dismiss="modal">Cancelar</button>
    </div>

</div>
