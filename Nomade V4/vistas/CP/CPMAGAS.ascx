<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMAGAS.ascx.vb" Inherits="vistas_CP_CPMAGAS" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
               <h4><i class="icon-reorder"></i>APROBACION DE GASTO</h4>
                <div class="actions">
                    <a href="?f=cpmagas" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=cplagas" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>            
            <div class="portlet-body">
                <div class="row-fluid denegar" style="display: none;">
                    <div class="alert alert-info">
                        <strong>Información!</strong> Usted no tiene asignado el rol de "Aprobación Gastos".
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>                            
                            <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="datos_generales">                                
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="btn_ver">Seleccionar Gasto</label>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_gasto" class="limpiar m-wrap span9" disabled="disabled" type="text" placeholder="Selecciona el gasto ..." />
                                                <div class="span3 pull-right">
                                                    <button style="height: 33px;" type="button" data-original-title="Seleccionar Provisión" id="btn_ver" class="b btn purple tooltips"><i class="icon-search"></i></button>
                                                    <button style="height: 33px;" type="button" data-original-title="Crear Nueva Provisión" id="btn_agregar" class="b btn green tooltips"><i class="icon-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span4 " id="estado">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="Label5" style="text-align: -webkit-center; font-size: large; font-family: sans-serif; font-weight: bold;">&nbsp;&nbsp;-</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txtCodigo">Código de Gasto</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtCodigo" class="limpiar span12" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_usuario">Autorizado por</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_usuario" class="limpiar span12 m-wrap" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_usuario">Solicitado por</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_solicita" class="limpiar span12 m-wrap" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_aprobacion">Fecha Aprob.</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" style="text-align: left;" class="fecha m-wrap required span8" data-date-format="dd/mm/yyyy" name="txt_fec_aprobacion" id="txt_fec_aprobacion" />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_pago">Fecha Pago</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" style="text-align: left;" class="b fecha m-wrap span12 required" data-date-format="dd/mm/yyyy" name="txt_fec_pago" id="txt_fec_pago" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fec_vencimiento">Fecha Emision</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" style="text-align: left;" class="b fecha span12 m-wrap required" data-date-format="dd/mm/yyyy" name="txt_fec_vencimiento" id="txt_fec_vencimiento" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label">Pagar a</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_proveedor" class="limpiar m-wrap span12" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                        <div class="span5" style="margin-top: -20px;">
                                            <small id="lblRucSeleccionado" style="color: gray"></small>
                                        </div>
                                        <div class="span5" style="margin-top: -20px;">
                                            <small id="lblHabido" style="color: gray"></small>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" id="lbl_documentos">Documentos</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_ruc" class="limpiar span12 m-wrap" placeholder="RUC" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_dni" class="limpiar span12 m-wrap" placeholder="DNI" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_documento">Documento</label>

                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_documento" class="b limpiar span12" placeholder="Documento">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_serie">Serie</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_serie" placeholder="SERIE" class="b span12 m-wrap" type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_dcto_ref">Número</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">

                                            <div class="controls">
                                                <input id="txt_dcto_ref" placeholder="NUMERO" class="b span12 m-wrap" type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="chk_compras">
                                                <div class="checker" id="uniform-chk_compras">
                                                    <span>
                                                        <input type="checkbox" id="chk_compras" name="chk_compras" class="b limpiar" style="opacity: 0;"></span>
                                                </div>
                                                Registro Compras</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="chk_sin_dcto">
                                                <div class="checker" id="uniform-chk_sin_dcto">
                                                    <span>
                                                        <input type="checkbox" id="chk_sin_dcto" name="chk_sin_dcto" class="b limpiar" style="opacity: 0;"></span>
                                                </div>
                                                Sin Documento</label>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="chkDeducible">
                                                <div class="checker" id="uniform-chkDeducible">
                                                    <span>
                                                        <input type="checkbox" id="chkDeducible" name="chkDeducible" class="b limpiar" style="opacity: 0;"></span>
                                                </div>
                                                Gasto Deducible</label>
                                        </div>
                                    </div>

                                </div>

                                <div class="row-fluid divDestinoTipo" style="display: none;">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboTipoBien">
                                                Tipo Bien</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <select id="cboTipoBien" class="span12 b" data-placeholder="Tipo Bien">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <%--<div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="cbx_opcion">
                                                Opción</label>
                                        </div>
                                    </div>
                                    <div class="span5">
                                        <div class="control-group">
                                            <select id="cbx_opcion" class="span12 b" data-placeholder="Opción">
                                                <option value="S">SIMPLE</option>
                                                <option value="M">MIXTO</option>
                                            </select>
                                        </div>
                                    </div>--%>                                  
                                </div>

                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cboRegistroInterno">
                                                Dcto. Interno de Registro</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboRegistroInterno" class="span12" data-placeholder="Doc. Registro Interno" disabled></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txtSerieRegistroInterno">Serie</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <input id="txtSerieRegistroInterno" placeholder="SERIE" class="span12 m-wrap b" type="text" disabled style="text-align: right; font-weight: bold" />

                                            <input type="hidden" id="txtLineasRegistroInterno" />
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txtSerieRegistroInterno">Número</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtNroRegistroInterno" placeholder="NUMERO" class="b span12 m-wrap" type="text" disabled style="text-align: end; font-weight: bold;" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1" id="div_lbl_per" style="display: none">
                                        <div class="control-group">
                                            <label class="control-label" for="txtCodigo">
                                                Periodo Tributario</label>
                                        </div>
                                    </div>
                                    <div class="span2" id="div_cbo_per" style="display: none">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_periodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_moneda">Moneda</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_moneda" class="span12" disabled="disabled">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" id="lbl_monto" for="txt_monto">Importe Total</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">

                                            <div class="controls">
                                                <input id="txt_monto" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" class="b limpiar span12 m-wrap" type="text" disabled="disabled"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" id="lbl_importePagar" for="txt_importePagar">Importe a Pagar</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">

                                            <div class="controls">
                                                <input id="txt_importePagar" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" class="b limpiar span12 m-wrap" type="text" disabled="disabled"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_glosa">
                                                Glosa</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <textarea id="txt_glosa" class="b m-wrap span12"> </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid" id="error" style="display: none;">
                                    <div class="span1"></div>
                                    <div class="span2"></div>
                                    <div class="span6">
                                        <div class="control-group alert alert-error" style="width: 100%;">
                                            <label class="control-label" id="Label1" style="text-align: -webkit-center;">EL GASTO YA FUE CANCELADO O AMORTIZADO&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-fluid" id="anul" style="display: none;">
                                    <div class="span3"></div>
                                    <div class="span6">
                                        <div class="control-group alert alert-success" style="width: 100%">
                                            <label class="control-label" id="Label2" style="text-align: -webkit-center;">EL GASTO HA SIDO ANULADO CON EXITO&nbsp;&nbsp;<i class="icon-ok"></i> </label>
                                        </div>
                                    </div>
                                    <div class="span1"></div>
                                </div>
                
                                <div class="row-fluid" id="rech" style="display: none;">
                                    <div class="span3"></div>
                                    <div class="span6">
                                        <div class="control-group alert alert-success" style="width: 100%">
                                            <label class="control-label" id="Label4" style="text-align: -webkit-center;">EL GASTO HA SIDO RECHAZADO CON EXITO&nbsp;&nbsp;<i class="icon-ok"></i> </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="portlet box" style="border: 1px solid #ccc;">
                                        <div class="portlet-title" style="background-color: black;">
                                            <h4><i class="icon-tag"></i>DETALLES DE GASTOS</h4>
                                        </div>
                                        <div class="portlet-body">                            
                                            <div id="cabecera">
                                                <div class="row-fluid">
                                                    <div class="span4">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="cbo_gasto">Gasto</label>
                                                                <div class="controls">
                                                                    <div class="span9">
                                                                        <select id="cbo_gasto" name="cbo_gasto" class="limpiar combo m-wrap span12 required" data-placeholder="Seleccionar Gasto" tabindex="1">
                                                                            <option></option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="span2">
                                                                        <a id="A1" class="btn" target="_blank" href="?f=NCLCNGA"><i class="icon-question-sign" style="line-height: initial"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span4">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="cbo_subgasto">Sub-Gasto</label>
                                                                <div class="controls">
                                                                    <div class="span10">
                                                                        <select id="cbo_subgasto" class="limpiar combo m-wrap span12 required" name="cbo_subgasto" data-placeholder="Seleccionar Sub-Gasto" tabindex="1">
                                                                            <option></option>
                                                                        </select>
                                                                    </div>                                            
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                         
                                                    <div class="span4">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                                                                <div class="controls">
                                                                    <div class="span9">
                                                                        <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-CodCentroCostoCab="" data-CodCentroCosto="" disabled/>
                                                                    </div>
                                                                    <div class="span2">
                                                                        <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row-fluid ">
                                                    <div class="span3 div_documentos">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtcuenta">
                                                                    Cuenta</label>
                                                                <div class="controls">
                                                                    <div class="span11" id="Div4">
                                                                        <input type="text" id="txtcuenta" class="limpiar span12" disabled="disabled">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div class="span3 div_documentos">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtcuenta">
                                                                    Glosa o Destino</label>
                                                                <div class="controls">
                                                                    <div class="span11" id="Div4">
                                                                        <textarea id="txt_glosa_detalle" class="limpiar span11 m-wrap" style="text-transform: uppercase;"> </textarea>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    <div class="span2 div_documentos">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="cbx_destino">Operación</label>
                                                                <div class="controls">
                                                                    <div class="span12">
                                                                        <select id="cbx_destino" class="limpiar combo m-wrap span12 required" name="cbo_subgasto" data-placeholder="Operación" tabindex="1">
                                                                            <option value="DSTGRA">DESTINO GRAVADO</option>
                                                                            <option value="DGRAES">DEST. GRAVADO ESPECIAL</option>
                                                                            <%--<option value="DSTMIX">DESTINO MIXTO</option>
                                                                            <option value="DSTNGR">DESTINO NO GRAVADO</option>--%>
                                                                            <option value="ORGNGR">ORIGEN NO GRAVADO</option>
                                                                            <option value="OTRTRI">OTROS TRIBUTOS</option>
                                                                        </select>
                                                                    </div>                                            
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div class="span2 div_documentos">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" id="labelMonto" for="txtSubTotal">Monto</label>

                                            
                                                                <div class="controls">
                                                                    <div class="span8">
                                                                        <input type="text" id="txtSubTotal" class="limpiar span12" onkeypress="return ValidaDecimales(event,this)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                
                                                    </div>                          
                                                    <div class="span2 div_documentos">
                                                        <div class="row-fluid">
                                                            <div class="control-group">
                                                                <label class="control-label" for="txtcuenta">&nbsp;&nbsp;
                                                                    </label>
                                                                <div class="controls">
                                                                    <div class="span3">
                                                                        <button type="button" id="add_detalle" class="btn blue pull-right" style="margin-right: 5px;"><i class=" icon-plus-sign"></i>&nbsp;Agregar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                   
                                                    </div>                            
                                                </div>

                                                 <div class="row-fluid" id="error" style="display: none;">
                                                    <div class="span2"></div>
                                                    <div class="span10">
                                                        <div class="control-group alert alert-error span8">
                                                            <label class="control-label" id="Label1" style="text-align: -webkit-center;">No existe sub-gasto&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row-fluid" style="margin-top: 10px;">
                                                <table id="tblGastos" class="table-hover  DTTT_selectable" border="0">
                                                    <thead>
                                                        <tr>                                        
                                                            <th>GASTO</th>
                                                            <th>SUB GASTO</th>
                                                            <th>CENTRO DE COSTO</th>
                                                            <th>GLOSA O DESTINO</th>
                                                            <th>CUENTA</th>
                                                            <th>OPERACIÓN</th>
                                                            <th>TOTAL BRUTO</th>
                                                            <th>DETRACIÓN</th>  
                                                            <th>TOTAL NETO</th>                                         
                                                            <th></th>
                                                        </tr>
                                                    </thead>

                                                </table>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid" id="aprob" style="display: none;">
                                    <div class="span3"></div>
                                    <div class="span6">
                                        <div class="control-group alert alert-success" style="width: 100%">
                                            <label class="control-label" id="Label3" style="text-align: -webkit-center;">EL GASTO HA SIDO APROBADO CON EXITO&nbsp;&nbsp;<i class="icon-ok"></i> </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <a id="aprobar" class="btn green" href="javascript:MuestraModal();"><i class="icon-ok"></i>&nbsp;Aprobar</a>&nbsp;&nbsp;
                                      <a id="rechazar" class="btn red" href="javascript:Rechazar();"><i class="icon-remove-sign"></i>&nbsp;Rechazar</a>&nbsp;&nbsp;
                                    <a id="cancelar" class="btn" href="?f=cpmagas"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>       
                            </div>
                            <!-- FIN DE GENERALES-->                           
                            
                            <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                            <div class="tab-pane" id="asientos_contables">
                                           
                                <div id="divGenAsiento" class="row-fluid">
                                    <div class="span2">
                                        <button type="button" id="btnGenerarAsiento" class="btn green"><i class="icon-plus"></i>&nbsp Generar Asiento</button>
                                    </div>
                                </div>
                                
                                <br />

                                <div class="row-fluid" >
                                    <table id="tblLista" class="display DTTT_selectable" border="0">
                                        <thead>
                                            <tr>
                                                <th>CUO
                                                </th>
                                                <th>NroMov
                                                </th>
                                                <th>Año
                                                </th>
                                                <th>Mes
                                                </th>
                                                <th>Descripción
                                                </th>
                                                <th>Tipo Asiento
                                                </th>
                                                <th>Fecha Emisión
                                                </th>
                                                <th>Fecha Transacción
                                                </th>
                                                <th>Declarado
                                                </th>
                                                <th>Moneda
                                                </th>
                                                <th>Tipo Cambio
                                                </th>
                                                <th>Ver Detalle
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <!-- FIN DE ASUENTOS CONTABLES-->

                        </div>
                        <!-- FIN DEL CUERPO DE LA FORMA-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




<div id="MuestraModalAceptar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #F52727; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>

            <h4 id="myModalLabel2"><i class="icon-warning-sign"></i>&nbsp;INFORMACION</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif; font-size: large;">
            ¿Deseas realmente Aprobar el Gasto ?                            
        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align: center;">
            <a id="ok" class="btn blue" href="javascript:HideAceptar();" style=""><i class="icon-ok"></i>&nbsp;Si</a>
            <a id="no" class="btn red" data-dismiss="modal" style=""><i class="icon-remove"></i>&nbsp;No</a>
        </div>
    </div>
</div>
<div id="MuestraModal" class="modal hide fade" tabindex="-1" role="dialog" style="width: 60%;" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="myModalLabel">LISTADO DE PROVISION DE GASTOS</h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">

                <a id="btn_refresh" class="btn green" href="javascript:RecargarGastos();" style="border-radius: 4px!important;"><i class="icon-refresh"></i>&nbsp;Actualizar</a>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <table id="tbl_gastos" class="display DTTT_selectable table table-bordered">
                        <thead style="background-color: rgba(19, 31, 28, 0.67); color: white;">
                            <tr>
                                <th>CODIGO</th>
                                <th>DESCRIPCION DEL GASTO</th>
                                <th>FECHA REGISTRO</th>
                                <th>MONTO</th>
                                <th>CTA CONTABLE</th>
                                <th>GASTO ORGN</th>
                                <th>FECHA UNICA</th>
                                <th>PIDM</th>
                                <th>CTLG</th>
                                <th>SCSL</th>
                                <th>MONEDA</th>
                                <th>SIMBOLO_MONEDA</th>
                                <th>DCTO_DESC</th>
                                <th>CONC_CODE</th>
                                <th>DESC_MONEDA</th>
                                <th>RAZON_SOCIAL</th>
                                <th>DOCUMENTO</th>
                                <th>SERIE</th>
                                <th>NUMERO</th>
                                <th>RUC</th>
                                <th>CENTRO_COSTO</th>
                                <th>COD_CENTRO_COSTO</th>
                                <th>COD_CENTRO_COSTO_CABECERA</th>
                                <th>HABIDO_IND</th>
                                <th>TIPO_BIEN</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
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

<input type="hidden" id="hf_permiso"/>
<%--<input type="hidden" id="hf_existe" />--%>
<input id="hfParamDetraccion" type="hidden" value="0" />
<input id="hfMontoDetraccion" type="hidden" value="0" />
<input type="hidden" id="hfcodgasto" />
<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfctlg_code" class="empresa"/>
<input type="hidden" id="hfscsl_code" />
<input type="hidden" id="hfmone_code" />
<input type="hidden" id="hfsimb_code" />
<input type="hidden" id="hfdesc_dcto" />
<input type="hidden" id="hf_conc_code" />

<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>

<script src="../vistas/CP/js/CPMAGAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPMAGAS.init();
    });
</script>
