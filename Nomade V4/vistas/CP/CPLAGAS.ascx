<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLAGAS.ascx.vb" Inherits="vistas_CP_CPLAGAS" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<style>
    .dataTables_scrollHeadInner {
        width: 100% !important;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA GASTOS APROBADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CPMAGAS" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CPLAGAS" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls" id="Div4">
                                <select id="slcSucursal" name="slcSucursal" class="bloquear combo m-wrap span12 required estable" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Situacion de Aprobación</label>
                            <div class="controls" id="Div6">
                                <select id="cbo_tipo_aprobacion" class="bloquear span12" placeholder="Selecciona tipo">
                                    <option value="SA">POR APROBAR</option>
                                    <option value="A">APROBADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Fecha Emisión</label>
                            <div class="control-group">
                                    <div class="span12">
                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Inicio" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_ini_emi" id="txt_fec_ini_emi">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Fin" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_fin_emi" id="txt_fec_fin_emi">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_filtrar" type="button" style="margin-top: 23px;" class="b btn purple span8"><i class="icon-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid" id="apro">
                    <div class="span12">
                        <table id="tbl_aprob_gastos" class="table-hover  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO APROBACIÓN
                                    </th>
                                    <th>CODIGO GASTO ORIGEN.
                                    </th>
                                    <th>GASTO
                                    </th>
                                    <th>DOCUMENTO.
                                    </th>
                                    <th style="text-align: center">MONEDA
                                    </th>
                                    <th style="text-align: right">MONTO
                                    </th>
                                    <th>NUMERO.
                                    </th>
                                    <th>FEC. APROBACION
                                    </th>
                                    <th>FEC. PAGO
                                    </th>
                                    <th>FEC. EMISION
                                    </th>
                                    <th>FEC. REG
                                    </th>
                                    <th>BENEFICIARIO
                                    </th>
                                    <th>SOLICITA
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

                <div class="row-fluid" id="noapro" style="display: none">
                    <div class="span12">

                        <table id="tbl_gastos" class="table-hover  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th style="text-align: left">CONCEPTO
                                    </th>
                                    <th style="text-align: left">BENEFICIARIO
                                    </th>
                                    <th style="text-align: center">MONEDA
                                    </th>
                                    <th style="text-align: right">MONTO
                                    </th>
                                    <th>FEC. EMISION
                                    </th>
                                    <th>FEC. REGISTRO
                                    </th>
                                    <th>DOCUMENTO
                                    </th>
                                    <th>NUMERO
                                    </th>
                                    <th>SOLICITA
                                    </th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<%--<div id="MuestraModalAceptar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #F52727; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>

            <h4 id="titulo_gasto"><i class="icon-warning-sign"></i>&nbsp;</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif;">
                    <div class="row-fluid permitir">
                <div class="span1"></div>

                <div class="span5">
                    <div class="control-group">
                        <label class="control-label" for="cbo_gasto">Concepto</label>
                        <div class="controls">
                            <label id="lbl_concepto" style="font-weight:bolder;"></label>
                        </div>
                    </div>
                </div>

                <div class="span5">
                    <div class="control-group">
                        <label class="control-label" for="cbo_subgasto">Sub-Concepto</label>
                        <div class="controls">
                            <label id="lbl_subconcepto" style="font-weight:bolder;"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid permitir">
                <div class="span1">
                    <input type="hidden" id="hfCodigo" />
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="cbo_documento_int">Documento Interno</label>
                        <div class="controls">
                            <select id="cbo_documento_int" disabled class="b limpiar span12" placeholder="Documento">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_serie_int">Serie</label>
                        <div class="controls">
                            <input id="txt_serie_int" placeholder="SERIE" disabled class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="txt_dcto_ref_int">Numero </label>
                        <div class="controls">
                            <input id="txt_dcto_ref_int" placeholder="NUMERO" disabled class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid permitir">
                <div class="span1"></div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="cbo_documento">Documento</label>
                        <div class="controls">
                            <select id="cbo_documento" class="b limpiar span12" placeholder="Documento">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_serie">Serie</label>
                        <div class="controls">
                            <input id="txt_serie" placeholder="SERIE" class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="txt_dcto_ref">Numero</label>
                        <div class="controls">
                            <input id="txt_dcto_ref" placeholder="NUMERO" class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>
            </div>

              <div class="row-fluid permitir">
                 <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls" id="div_ce_costos">
                                <input id="txt_centro_costo" class="b span12" type="text">
                            </div>
                        </div>
                    </div>
            </div>
    



            <div class="row-fluid permitir">
                <div class="span1"></div>

                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="txt_fec_vencimiento">Fecha Emision.</label>
                        <div class="controls">
                            <input type="text" style="text-align: left;" class="b fecha span12 m-wrap required" data-date-format="dd/mm/yyyy" name="txt_fec_vencimiento" id="txt_fec_vencimiento" />
                            <input type="hidden" name="txt_fec_actual" id="txt_fec_actual" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_glosa">Glosa.</label>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <div class="controls">
                            <textarea id="txt_glosa" class="b m-wrap span12" > </textarea>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row-fluid permitir">
                <div class="span1"></div>

                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="chk_compras">
                            <div class="checker" id="uniform-chk_compras">
                                <span>
                                    <input type="checkbox" id="chk_compras" name="chk_compras" class="b limpiar" style="opacity: 0;"></span>
                            </div>
                            Reg. Compras</label>
                    </div>
                </div>

                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="chk_sin_dcto">
                            <div class="checker" id="uniform-chk_sin_dcto">
                                <span>
                                    <input type="checkbox" id="chk_sin_dcto" name="chk_sin_dcto" class="b limpiar" style="opacity: 0;"></span>
                            </div>
                            Sin Documento</label>
                    </div>
                </div>

            </div>

            <div class="row-fluid permitir">
                <div class="span6">

                    <div class="span2"></div>
                    <div class="span9" id="div_per_tri" style="display: block;">
                        <div class="control-group">
                            <label class="control-label" for="cbo_periodo">Periodo Tributario</label>
                            <div class="controls">
                                <select id="cbo_periodo" class="b limpiar span12" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="span2"></div>
                    <div class="span5">
                        <div class="control-group">
                            <label class="control-label" for="txt_monto">Monto</label>
                            <div class="controls">
                                <input id="txt_monto" disabled="disabled" class="b span12" type="text" style="text-align: end; font-weight: bold;">
                            </div>
                        </div>
                    </div>
                </div>



            </div>
          
            <div class="row-fluid denegar" style="display: none;">
                <div class="alert alert-info">

                    <strong>Informacion!</strong> Usted no tiene asignado el rol de "aprobación gastos".
                </div>
            </div>
        </div>
        <div class="modal-footer permitir botones" aria-hidden="true" style="text-align: center;">


            <a id="ok" class="btn blue" href="javascript:HideAceptar1();" style=""><i class="icon-ok"></i>Si</a>
            <a id="no" class="btn red" data-dismiss="modal" style=""><i class="icon-remove"></i>No</a>


        </div>
    </div>
</div>--%>


<div id="MuestraModalAceptar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="left: 15%; width: 70%; max-width: 80% !important; display: none; margin-left: 0px;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="titulo_gasto"><i class="icon-warning-sign"></i>&nbsp;</h4>
    </div>
    <div class="modal-body" id="ventanaInfo">
        <div class="row-fluid permitir">
            <div class="span12">
             
                 <div class="span1">
                    <input type="hidden" id="hfCodigo" />
                </div>
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="cbo_documento_int">Documento Interno</label>
                        <div class="controls">
                            <select id="cbo_documento_int" disabled class="b limpiar span12" placeholder="Documento">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_serie_int">Serie</label>
                        <div class="controls">
                            <input id="txt_serie_int" placeholder="SERIE" disabled class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="txt_dcto_ref_int">Numero </label>
                        <div class="controls">
                            <input id="txt_dcto_ref_int" placeholder="NUMERO" disabled class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_fec_vencimiento" style="text-align: right;">Fecha Emision</label>
                        <div class="controls">
                            <input type="text" style="text-align: right; background-color: aliceblue; font-weight: 800;" class="b fecha span12" data-date-format="dd/mm/yyyy" name="txt_fec_vencimiento" id="txt_fec_vencimiento" />
                            <input type="hidden" name="txt_fec_actual" id="txt_fec_actual" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>

                <div class="span1"></div>
            </div>
        </div>

        <button type="button" id="btnGenerarAsiento" class="btn green" style="display:none"><i class="icon-plus"></i>&nbsp; Generar Asiento</button>

        <div class="row-fluid permitir">
            <div class="span12">
                <div class="span1"></div>
                <div class="span1">
                    <div class="control-group">
                        <label class="control-label" for="lbl_proveedor">Proveedor</label>                       
                    </div>
                </div>
                <div class="span5">
                    <div class="control-group">
                        <label id="lbl_proveedor" style="font-weight: 800;"></label>
                       <%-- <div class="controls">
                            <label id="lbl_proveedor" style="font-weight: 800;"></label>
                        </div>--%>
                    </div>
                </div>
               <%-- <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cbo_gasto">Concepto</label>
                        <div class="controls">
                            <label id="lbl_concepto" style="font-weight: 800;"></label>
                        </div>
                    </div>
                </div>--%>

               <%-- <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="cbo_subgasto">Sub-Concepto</label>
                        <div class="controls">
                            <label id="lbl_subconcepto" style="font-weight: 800;"></label>
                        </div>
                    </div>
                </div>--%>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_monto" style="text-align: right;">Importe Total</label>
                        <div class="controls">
                            <label id="txt_monto" style="font-weight: 800; color: blue; text-align: right"></label>
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_importePagar" style="text-align: right;">Importe a Pagar</label>
                        <div class="controls">
                            <label id="txt_importePagar" style="font-weight: 800; color: blue; text-align: right"></label>
                        </div>
                    </div>
                </div>
                <div class="span1"></div>
            </div>
        </div>

        <div class="row-fluid permitir">
            <div class="span12">
                <div class="span1"></div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="cbo_documento">Documento</label>
                        <div class="controls">
                            <select id="cbo_documento" class="b limpiar span12" placeholder="DOCUMENTO">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="span1">
                    <div class="control-group">
                        <label class="control-label" for="txt_serie">Serie</label>
                        <div class="controls">
                            <input id="txt_serie" placeholder="SERIE" class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="txt_dcto_ref">Número</label>
                        <div class="controls">
                            <input id="txt_dcto_ref" placeholder="NUMERO" class="b span12 " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="chk_sin_dcto" style="margin-top: 33px;">
                            <div class="checker" id="uniform-chk_sin_dcto">
                                <span>
                                    <input type="checkbox" id="chk_sin_dcto" name="chk_sin_dcto" class="b limpiar" style="opacity: 0; "></span>
                            </div>
                            Sin Documento</label>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="chk_compras" style="margin-top: 33px;">
                            <div class="checker" id="uniform-chk_compras">
                                <span>
                                    <input type="checkbox" id="chk_compras" name="chk_compras" class="b limpiar" style="opacity: 0; "></span>
                            </div>
                            Reg. Compras</label>
                    </div>
                </div>
                <div class="span2">
                    <div class="control-group">
                        <label class="control-label" for="chkDeducible" style="margin-top: 31px">
                            <div class="checker" id="uniform-chkDeducible">
                                <span class="">
                                    <input type="checkbox" id="chkDeducible" name="chkDeducible" class="b limpiar" style="opacity: 0;"></span>
                            </div>
                            Gasto Deducible</label>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="row-fluid permitir">
            <div class="span12" style="display:none;">
                <div class="span5">
                    <div class="row-fluid">
                        <div class="control-group">
                            <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                            <div class="controls">
                                <div class="span10">
                                    <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-CodCentroCostoCab="" data-CodCentroCosto="" disabled/>
                                </div>
                                <div class="span2">
                                    <button id="btnBuscarCentroCto" class="btn green centroCostos"><i class="icon-search" style="line-height: initial"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <%--<div class="span5">
                    <div class="control-group">
                        <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                        <div class="controls">
                            <input id="txt_centro_costo" class="b span12" type="text">
                        </div>
                    </div>
                </div>--%>
                
                

                <div class="span1"></div>
            </div>

              <div class="row-fluid">

                    <div class="span5 offset1 divDestinoTipo">
                         <label class="control-label" for="cboTipoBien">
                                Tipo Bien</label>
                        <div class="control-group">
                            <select id="cboTipoBien" class="span12 b" data-placeholder="Tipo Bien">
                                <option></option>
                            </select>
                        </div>
                    </div>                 
                    <div class="span3 divDestinoTipo">
                        <div class="control-group">
                               <label class="control-label" for="cbx_destino">
                                Operación</label>
                            <select id="cbx_destino" class="b limpiar span12" data-placeholder="Operación">
                                <option value="DSTGRA">DESTINO GRAVADO</option>
                                <option value="DSTMIX">DESTINO MIXTO</option>
                                <option value="DSTNGR">DESTINO NO GRAVADO</option>
                                <option value="ORGNGR">ORIGEN NO GRAVADO</option>
                            </select>
                        </div>
                    </div>
                    <div class="span9 espacio" style="display: none;">

                    </div>
                      <div class="span2" id="div_per_tri" style="display: block;">
                        <div class="control-group">
                            <label class="control-label" for="cbo_periodo" style="color:red;font-weight:bolder">Periodo Tributario</label>
                            <div class="controls">
                                <select id="cbo_periodo" class="b limpiar span12" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div class="row-fluid permitir">
            <div class="span12">

                <div class="span1"></div>
                <div class="span10">
                    <div class="control-group">
                        <label class="control-label" for="txt_dcto_ref">Glosa</label>
                        <div class="controls">
                            <textarea id="txt_glosa" class="b  span12"> </textarea>
                        </div>
                    </div>
                </div>
                <div class="span1"></div>
            </div>
        </div>

        <div class="row-fluid denegar" style="display: none;">
            <div class="alert alert-info">
                <strong>Información!</strong> Usted no tiene asignado el rol de "Aprobación Gastos".
            </div>
        </div>

         <div class="row-fluid" style="margin-top: 10px;">
            <table id="tblGastos" class="table-hover  DTTT_selectable" border="0">
                <thead>
                    <tr>                                        
                        <th>GASTO</th>
                        <th>SUB GASTO</th>
                        <th>CENTRO DE COSTO</th>
                        <th>GLOSA</th>
                        <th>CUENTA</th>
                        <th>TOTAL BRUTO</th>
                        <th>DETRACCIÓN</th>  
                        <th>TOTAL NETO</th>  
                       <%-- <th></th>--%>
                    </tr>
                </thead>
            </table>    
        </div>

    </div>
    <div class="modal-footer permitir botones" aria-hidden="true" style="text-align: center;">
        <a id="ok" class="btn blue" href="javascript:Confirmar();" style=""><i class="icon-ok"></i>Si</a>
        <a id="no" class="btn red" data-dismiss="modal" style=""><i class="icon-remove"></i>No</a>
    </div>
</div>

<!-- Modal -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title">CENTROS DE COSTO</h4>
      </div>
      <div class="modal-body">
        <div class="row-fluid">
            <div class="span2"></div>
            <div class="span8">                
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span2"></div>            
        </div>
        <div class="row-fluid">
            <div class="span1"></div>
            <div class="span10">
                <div id="treeCentroCostos" class="treeview">
                </div>
            </div>
            <div class="span1"></div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
        <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
      </div>
    </div>
  </div>
</div>

<div id="modal-confirmacion" class="modal hide">
    <div class="modal-header" style="padding: 1px 15px; background: #F52727; color: #ffffff;">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4><i class="icon-warning-sign"></i>&nbsp;Confirmación de Aprobación de Gasto</h4>
    </div>
    <div class="modal-body">
        <div >
            <div class="row-fluid">
                <div class="span12">                    
                    <h5 style="text-align: center; font-weight: bold">¿Está seguro que desea aprobar el gasto sin documento? </h5>
                </div>
            </div>
        </div>
        <div class="row-fluid" style="margin-top: 10px;">
            <div class="span12" style="text-align: center">                
                <button type="button" id="btnAceptarConfirmacion" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
                <button type="button" id="btnCancelarConfirmacion" class="btn btn-primary red" data-dismiss="modal"><i class="icon-remove"></i>&nbsp;Cancelar</button>      
            </div>
        </div>
    </div>
</div>

<input id="hf_permiso" type="hidden" />
<input id="hf_existe" type="hidden" />

<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/CP/js/CPMAGAS.js?<%=aleatorio%>"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLAGAS.init();

    });
</script>
