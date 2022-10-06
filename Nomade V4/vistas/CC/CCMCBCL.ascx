<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMCBCL.ascx.vb" Inherits="vistas_CC_CCMCBCL" %>
<style>
    .supidc {  
    vertical-align:super;            /*superindice*/  
    font-size:7pt; 
}  

    .select2-container {
        height: 30px !important;
    }

    .is-agente {
        color: #AD193E;
        font-family: 'Segoe UI';
        font-size: 11px;
        font-weight: 900;
    }
</style>


<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CUENTAS POR COBRAR CLIENTES</h4>
                <div class="actions">
                    <a href="?f=CCMCBCL" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CCLCBCL" class="btn red"><i class="icon-list"></i>Listar</a>
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
                                <select id="slcEmpresa" class="span12 empresa obligatorio" data-placeholder="EMPRESA"></select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">

                        <label>Cliente</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboClientes" class="span12 obligatorio" data-placeholder="CLIENTE">
                                    <option></option>
                                </select>                                
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
                                <select id="slcEstablec" class="span12 estable"  data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span5">


                        <div class="span2">

                            <label>Fecha Inicio</label>

                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFeIn" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">

                            <label>Fecha Fin</label>

                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFeFi" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="span1">

                        <button type="button" class="btn blue" id="btnConsultar"><i class="icon-search"></i>&nbsp;Buscar</button>

                    </div>

                </div>

                <div class="row-fluid master">


                    <div class="span1">

                        <label>Tipo de Cambio</label>

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

                        <label>Monto a Cobrar</label>

                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" monto="0.00" value="S/. 0.00" class="span10 monto_sele obligatorio" placeholder="Moneda Base" id="txt_monto_base" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" monto="0.00" value="US$ 0.00" class="span10 monto_sele obligatorio" placeholder="Moneda Alt." id="txt_monto_alt" disabled="disabled" />
                            </div>
                        </div>
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

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px; margin-top: 10px;"></div>


                <div class="row-fluid">
                    <div class="span7" id="div_body">
                        <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0" width="100%">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr align="center">
                                    <th></th>
                                    <th>Documento</th>
                                    <th>Fecha Emisión</th>
                                    <th>Monto S/.</th>
                                    <th>Monto US$.</th>
                                    <th>Deuda S/.</th>
                                    <th>Deuda US$.</th>
                                    <th>Retención</th>
                                    <th>
                                        <input type="checkbox" id="chkAll" >
                                    </th>
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

                                    <label>Origen de Cobro</label>

                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbo_OrigenPago" class="span12 obligatorio" data-placeholder="ORIGEN DE COBRO" disabled="disabled">
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
                                <div class="span7">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cbo_Det_Origen" class="span12 obligatorio" data-placeholder="-" disabled="disabled">
                                                <option></option>
                                            </select>
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
                                            <%--<select id="cbDestino" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled"><option></option></select>--%>
                                            <input id="txtDestino" type="text" class="span12 obligatorio" data-placeholder="DESTINO" disabled="disabled" />
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

                            <div id="p_DatVuelto">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group ">
                                            <label id="lblefectivo">Efectivo recibido</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtEfectivo" style="text-align: right; margin-bottom: 0px" class="span12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group ">
                                            <label id="lbvluelto">Vuelto</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtVuelto" style="text-align: right" class="span12" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                        <div class="row-fluid" >
                           
                            <div class="span10">
                                    <input type="file" class="btn lightblue" id="fileSustento" name="fileProtesto" value="../../recursos/img/no_disponible.jpg" />
                                    <div style="display: inline-block;"><img id="imgSustento" style="width: 30px;height: 30px;" src="../../recursos/img/no_disponible.jpg" /></div>
                            </div>
                            



                        </div>
                        <div class="row-fluid incluye_nota" style="display: none;">
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="checkbox" id="chkSoloNota" class="span12" />
                                    </div>
                                </div>
                            </div>                            
                            <div class="span5">
                                <div class="control-group ">
                                    <label for="chkSoloNota">Sólo Notas de Crédito</label>
                                </div>
                            </div>



                        </div>

                        <%--<div class="row-fluid">
                            
                             <div class="span12">--%>
                        <div class="form-actions">
                            <button id="btnGrabar" type="button" class="btn blue pull-right"><i class="icon-legal"></i>Cobrar</button>
                            <button style="display: none;" id="btnNotaCredito" type="button" class="btn purple NotaCredito"><i class="icon-plus"></i>Agregar Nota de Crédito</button>
                        </div>
                        <%--   </div>
                         </div>--%>
                    </div>
                </div>
            </div>


          <div class="portlet-footer" style="color: white;" align="right">
                 <i class="icon-circle" style="color: #FFF9B3;"></i>&nbsp;<small style="margin-right: 5px;">Monto original con el que se realizo la venta.</small>(<span class="supidc">c</span>)<small> Documento pendiente de canje</small>;(<span class="supidc">a</span>)<small> Documento con Anticipo(s). Los anticipos están deducidos de sus documentos</small>
            </div>


        </div>
    </div>
</div>


<input type="hidden" id="moneda_principal" value="" />
<input type="hidden" id="moneda_secundaria" value="" />
<input type="hidden" id="auxiliar" value="" />
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type='text/javascript' src='../vistas/CC/js/CCMCBCL.js?<%=aleatorio%>'></script>
<%--<script type="text/javascript" src="../vistas/CC/js/CCMCBCL.js"></script>--%>


<div id="muestralistap" style="display: block; width: 850px; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
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
                            <th>SUCURSAL ORIGEN</th>
                            <th>MOTIVO</th>
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

<div id="ModalRetencion" style="width: 650px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
                <h3>¡ADVERTENCIA!</h3>
            </div>
            <div class="modal-body" aria-hidden="true">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" for="">
                                        El cliente esta sujeto a retención. ¿Desea aplicar retención a estos documentos?</label>
                                    <label class="control-label" for="" style="text-align:center; color:red; font-weight:bold; font-size:15px;">
                                        <span id="montoRetencion"></span></label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row-fluid" style="text-align:center;">
                            <div class="">                                   
                                <button id="regPagoRetencion" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;SI</button> 
                                <button id="cancelarPagoRetencion" type="button" class="btn red"><i class="icon-remove"></i>&nbsp;NO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


<script>

    jQuery(document).ready(function () {
        CCMCBCL.init();
    });
</script>
