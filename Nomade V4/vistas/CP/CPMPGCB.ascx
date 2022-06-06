<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMPGCB.ascx.vb" Inherits="vistas_CP_CPMPGCB" %>

<style type="text/css">
    .Azul {
        background-color: #2822BF!important;
        border-color: #2822BF!important;
        color: white!important;
    }

    .Rojo {
        background-color: #9A0101!important;
        border-color: #9A0101!important;
        color: white!important;
    }      

</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;PAGO CREDITO BANCARIO</h4>
                <div class="actions">
                    <a href="?f=CPMPGCB" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                 <%--   <a href="?f=cplPGCB" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>  --%>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid master">
                    <div class="span1">

                        <label>Empresa</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"><option></option></select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">

                        <label>Credito</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcCredBanc" class="span12 obligatorio" data-placeholder="Seleccionar Credito"><option></option></select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <label>Fecha de Pago</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaPago" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid master">
                    <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEstablec" class="span12 estable"  data-placeholder="TODOS LOS ESTABLECIMIENTOS"><option></option></select>
                            </div>
                        </div>
                    </div>                    

                    <div class="span4">

                        <label style="display:inline-block">Monto del Crédito: <span id="spnMonto"></span></label><label style="display:inline-block;margin-left: 100px;">Monto Total: <span id="spnMontoTotal"></span></label>
                       

                    </div>
                    
                    <div class="span1">

                        <label>Fecha de Transacción</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaTransaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>



                <div class="row-fluid master">


                    <div class="span1">

                        <label>Tipo de Cambio Banco</label>

                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12" placeholder="TC" id="txt_TC" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">

                        <button type="button" id="btnCtc" class="btn blue span6"><i class="icon-chevron-right"></i></button>

                    </div>

                    <div class="span1">

                        <label>Monto a Pagar</label>

                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" monto="0.00" value="S/. 0.00" class="span10 monto_sele obligatorio" placeholder="Moneda Base" id="txt_monto_base" tipo="MOBA" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" monto="0.00" value="US$ 0.00" class="span10 monto_sele obligatorio" placeholder="Moneda Alt." id="txt_monto_alt" tipo="MOAL"  disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px; margin-top: 10px;"></div>


                <div class="row-fluid">
                    <div class="span7" id="div_body">
                        <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr align="center">
                                    <th>N° Cuota</th>                                  
                                    <th>Fecha Venc.</th>
                                    <th>Monto S/.</th>
                                    <th>Monto US$.</th>
                                    <th>Deuda S/.</th>
                                    <th>Deuda US$.</th>
                                    <th>#</th>
                                </tr>
                            </thead>

                        </table>
                    </div>

                    <div class="span5">

                        <div class="row-fluid NotaCreditoAgregados" style="display: none;">

                            <ul class="feeds NotaCreditoAgregados" id="listaAgregados">
                            </ul>

                        </div>

                        <div id="form_medioPago">
                            <div class="row-fluid">
                                <div class="span3">

                                    <label>Origen de Pago</label>

                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE PAGO" disabled="disabled">
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
                                            <select id="cbo_Det_Origen" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                                <option></option>
                                            </select>
                                            <i id="iconDetSaldo" title="Click Para Mostrar/Ocultar Saldo Disponible" class="icon-circle-arrow-down" style="padding: 3px; position: absolute; cursor: pointer; color: #23779B; font-size: large;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span3">

                                    <label id="lbl_detalle2">Medio de Pago</label>

                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboMedioPago" disabled="disabled" class="span12 obligatorio" data-placeholder="MEDIO DE PAGO">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span3">

                                    <label id="lbl_detalle3">Destino</label>

                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbDestino" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span3">

                                    <label id="lbl_detalle4">-</label>

                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtNroOpe" class="obligatorio span12" disabled="disabled" />

                                        </div>
                                    </div>
                                </div>
                                <div class="span1 mPersona" style="display: none;">
                                    <i class="icon-plus" style="position: absolute; cursor: pointer; color: black;" onclick="javascript: nuevapersona();"></i>
                                    <br>
                                    <i class="icon-search buscaPersona" id="buscaPersona" style="cursor: pointer; color: black;"></i>
                                </div>
                            </div>

                            <div class="row-fluid" id="divMoneda">
                                <div class="span3">
                                    <div class="control-group ">
                                        <label>Moneda</label>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbo_moneda" class="span12 obligatorio moneda activo" data-placeholder="MONEDA" disabled="disabled">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group ">
                                        <label id="Label1">Comisiones</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtComisiones" placeholder="0" style="text-align: right" class="span12" monto="0" />
                                        </div>
                                    </div>
                                </div>                   
                            </div>


                            <div class="row-fluid">
                                <div class="span3">
                                    <div class="control-group ">
                                        <label id="lblmonto">Monto</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtMonto" style="text-align: right" class="span12 obligatorio" disabled="disabled" monto="0" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span3" id="divMontoAgregado" style="display: none;">
                                    <div class="control-group ">
                                        <label id="lblMontoAgregado">&nbsp;+&nbsp;<span id="montoNotaAgregado" style="color: green;"></span>&nbsp;=&nbsp;<span id="montoTotalAgregado" style="font-weight: bold;"></span></label>
                                    </div>
                                </div>
                            </div>

                        </div>

   


                        <div class="form-actions">
                            <button id="btnGrabar" type="button" class="btn blue pull-right"><i class="icon-legal"></i>Pagar</button>
                            <button style="display: none;" id="btnNotaCredito" type="button" class="btn purple NotaCredito"><i class="icon-plus"></i>Agregar Nota de Crédito</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="portlet-footer" align="right" style="color: white;">
                <i class="icon-circle" style="color: #FFF9B3;"></i>&nbsp;<small style="margin-right: 5px;">Monto original con el que se realizo la compra.</small>
            </div>
        </div>
    </div>
</div>


<input type="hidden" id="moneda_principal" value="" />
<input type="hidden" id="moneda_secundaria" value="" />
<input type="hidden" id="auxiliar" value="" />
<script type="text/javascript" src="../vistas/CP/js/CPMPGCB.js"></script>

<div id="muestralistap" style="display: block; width: 700px; left: 50%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">

        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>

        <h4><i class="icon-reorder"></i>&nbsp;<span id="tituloModal">NOTAS DE CREDITO</span> </h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divmodal">
                <!--aki se carga el contenido por jquery-->

                <table id="tblNotaCredito" cellspacing="0" class="display DTTT_selectable" border="0">
                    <thead style="background-color: rgb(35, 119, 155); color: white;">
                        <tr align="center">
                            <th>DOCUMENTO</th>
                            <th>MONTO TOTAL</th>
                            <th>MONTO USABLE</th>
                            <th>MONEDA</th>
                            <th>TIPO DOC. ORIGEN</th>
                            <th>N° DOC. ORIGEN</th>
                        </tr>
                    </thead>

                </table>

            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row-fluid" align="rigth">
            <small>Haga click en la nota de crédito que desea agregar.</small>
        </div>

    </div>
</div>

<div id="modElijeDocu" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">

        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>

        <h4><i class="icon-reorder"></i>&nbsp;<span id="Span1">ASIGNACION DOCUMENTO VENTA - NOTA DE CREDITO</span> </h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divbody">
                <!--aki se carga el contenido por jquery-->
                <div class="row-fluid">
                    <div class="span6">
                        <div class="control-group ">
                            <h4>Nota Crédito</h4>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group ">
                            <h4>Documento</h4>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <div class="modal-footer">


        <button id="btnAceptarNotCre" onclick="javascript: verificaNotaDcto();" type="button" class="btn blue"><i class="icon-check"></i>Aceptar</button>
        <button id="btnCancelar" type="button" class="btn" data-dismiss="modal"><i class="icon-cancel"></i>Cancelar</button>

    </div>
</div>

<script>

    jQuery(document).ready(function () {
        CPMPGCB.init();
    });
</script>
