<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMASCO.ascx.vb" Inherits="vistas_CT_CTMASCO" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
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
                <h4><i class="icon-reorder"></i>ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <a href="?f=CTMASCO" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CTLASCO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>                            
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="datos_generales">
                                



                                <div class="row-fluid">
                                    <div class="row-fluid">
                                        <div class="span16">
                                            
                                            <div class="row-fluid">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="slcEmpresa">
                                                            Empresa</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="controlempresa">
                                                            <select id="slcEmpresa" name="slcEmpresa" class="limpiar combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                                                <option></option>
                                                            </select>
                                                            <asp:HiddenField ID="hfempresa" runat="server" />
                                                            <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                                        </div>
                                                    </div>
                                                </div>
                                
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="slcSucural">
                                                            Establecimiento</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div1">
                                                            <select id="slcSucural" class="limpiar combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                                                <option></option>
                                                            </select>
                                                            <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                                        </div>
                                                    </div>
                                                </div>

                                                 <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbo_moneda">
                                                            Moneda</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls" id="Div_Moneda">
                                                            <select id="cbo_moneda" name="cbo_moneda" class="limpiar combo m-wrap span12 required" data-placeholder="Selecciona" tabindex="1">
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                            
                                            <div class="row-fluid">
                                                <div class="span1">
                                                    <div class="control-group ">
                                                        <label>Periodo</label>
                                                        <label>Tributario</label>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div_Anio">
                                                            <input id="txtanio" class="span10" placeholder="AÑO" type="text" onkeypress="return ValidaNumeros(event,this)" data-provide="typeahead" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div_Mes">
                                                            <select id="cboMes" class="span12" data-placeholder="MES" tabindex="-1" title="" style="display: inline;">
                                                                <option></option>
                                                                <option value="1">ENERO</option>
                                                                <option value="2">FEBRERO</option>
                                                                <option value="3">MARZO</option>
                                                                <option value="4">ABRIL</option>
                                                                <option value="5">MAYO</option>
                                                                <option value="6">JUNIO</option>
                                                                <option value="7">JULIO</option>
                                                                <option value="8">AGOSTO</option>
                                                                <option value="9">SETIEMBRE</option>
                                                                <option value="10">OCTUBRE</option>
                                                                <option value="11">NOVIEMBRE</option>
                                                                <option value="12">DICIEMBRE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_Descripcion">
                                                            Descripción</label>
                                                    </div>
                                                </div>
                                                <div class="span6">
                                                    <div class="control-group ">
                                                        <div class="controls" id="Div_Desc">
                                                            <input id="txt_Descripcion" class="span24 " placeholder="DESCRIPCIÓN" type="text" />
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                
                                               </div>

                                              <div class="row-fluid">
                                                <div class="span1">
                                                    <div class="control-group ">
                                                        <label>Operación</label>
                                                        <label>Asiento</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div_OperaAsiento">
                                                            <select id="cboOperacionAsiento" class="span12"  data-placeholder="OPERACIÓN" tabindex="-1" title="" style="display: inline;">
                                                                <%--<option></option>--%>
                                                                <option value="M">MOVIMIENTO</option>
                                                                <option value="A">APERTURA</option>
                                                                <option value="C">CIERRRE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                  <div class="span1">
                                                    <div class="control-group ">
                                                        <label>Tipo</label>
                                                        <label>Asiento</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div_Asiento">
                                                            <select id="cboTipoAsiento" class="span14" data-placeholder="TIPO" tabindex="-1" title="" disabled="disabled" style="display: inline;" >
                                                                <option value="M">MANUAL</option>
                                                                <option value="A">AUTOMÁTICO</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                  
                                                <div class="span1">
                                                    <div class="control-group ">
                                                        <label>Declarado</label>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <div class="controls" id="Div_Declarado">
                                                            <select id="cboDeclarado" class="span12"  data-placeholder="OPC." tabindex="-1" title="" style="display: inline;">
                                                                <option value="N">NO</option>
                                                                <option value="S">SI</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                  <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_TCambio">
                                                            Tipo Cambio</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls" id="Div_TC">
                                                            <input id="txt_TCambio" class="span10" placeholder="VALOR" onkeypress="return ValidaDecimales(event,this)"  type="text" />
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                </div>

                                             <div class="row-fluid">
                                                <div class="span14" style="margin-left: 0" id="divFilaCliente">
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtClientes">Cliente</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls" id="divCboTipoDoc">
                                                                <select id="cboTipoDoc" class="span4" data-placeholder="Tipo Dcto." disabled="disabled">
                                                                    <option value="6">RUC</option>
                                                                    <option value="1">DNI</option>
                                                                    <option value="0">OTROS</option>
                                                                    <option value="4">CARNÉ EXTRANJERIA</option>
                                                                    <option value="7">PASAPORTE</option>
                                                                </select>
                                                                <input id="txtNroDctoCliente" class="span8" type="text" placeholder="NRO. " style="text-align: center; margin-left: 2px;"  disabled="disabled"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span4">
                                                        <div class="control-group span12">
                                                            <div class="controls" id="divTxtClientes">
                                                                <input id="txt_beneficiario" class="span12" type="text" placeholder="PERSONA" style="text-transform: uppercase" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cboOperacion">Movimiento</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                                <div class="controls" id="Div_Operacion">
                                                                            <select id="cboOperacion" class="span11 ComboBox" data-placeholder="OPERACIÓN">
                                                                             <option></option>
                                                                            </select>
                                                                </div>
                                                         </div>
                                                    </div> 
                                                   </div>
                                                </div>
                                             <div class="row-fluid">
                                                 <div class="span2 div_documentos" >
                                                    <div class="row-fluid">
                                                        <div class="control-group" id="Div_Doc">
                                                            <label class="control-label" for="cbo_documento">
                                                                Documento</label>
                                                            <div class="controls">
                                                                <div class="span12" id="Div6">
                                                                    <select id="cbo_documento" class="b limpiar span12 m-wrap" placeholder="DOCUMENTO">
                                                                        <option></option>
                                                                    </select>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1 div_documentos" >
                                                    <div class="row-fluid">
                                                        <div class="control-group" id="Div_serie">
                                                            <label class="control-label" for="txt_serie">
                                                                Serie</label>
                                                            <div class="controls">
                                                                <div class="span12" id="Div7">
                                                                    <input id="txt_serie" placeholder="SERIE" class=" span10  "  type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: left;">
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2 div_documentos" >
                                                    <div class="row-fluid">
                                                        <div class="control-group" id="Div_DocReferencia">
                                                            <label class="control-label" for="txt_dcto_ref">
                                                                Número</label>
                                                            <div class="controls">
                                                                <div class="span12" id="Div9">
                                                                    <input id="txt_dcto_ref" placeholder="NÚMERO" class="span12  " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: left; ">
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="span2" id="div_fec_unica_1" style="display: none;">
                                                    <div class="row-fluid">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_fec_unica">
                                                            F. Emisión</label>
                                                            <div class="controls">
                                                               <div class="input-append date date-picker fecha" data-date-format="yyyy/mm/dd">
                                                                <input disabled class=" date-picker fecha span10 limpiar required" data-date-format="yyyy/mm/dd" type="text" id="txt_fec_unica" /><span class="add-on" style="height: 20px"><i class="icon-calendar"></i></span>
                                                            </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="span2"  style="display: inline;">
                                                    <div class="row-fluid">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txt_fec_reg">
                                                            F. Transacción</label>
                                                            <div class="controls">
                                                               <div class="controls">
                                                                    <input type="text" disabled="disabled" id="txt_fec_reg" class="span10 date-picker" placeholder="yyyy/mm/dd"  data-date-format="yyyy/mm/dd" style="text-align: left">
                                                               </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="span3"  style="display: inline;" >
                                                    <div class="row-fluid">
                                                        <div class="control-group" id="Div_oportunidad">
                                                            <label class="control-label" for="cboOportunidad">Oportunidad Anotación</label>
                                                            <div class="controls">
                                                               <div class="controls">
                                                                   <select id="cboOportunidad" class="span11 ComboBox" data-placeholder="OPORTUNIDAD ANOTACION">
                                                                    <%-- <option></option>--%>
                                                                    <option value="1">MISMO PERIODO</option>
                                                                    <option value="8">PERIODO ANTERIOR Y NO ANOTADA</option>
                                                                    <option value="9">PERIODO ANTERIOR Y SI ANOTADA</option>
                                                                    </select>
                                                               </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                
                                            </div>
                                            <div class="span6" style="margin-top: -15px; margin-left: 9%;">
                                                <small id="lblRucSeleccionado" style="color: gray"></small>
                                                <small style="color: gray">&nbsp;&nbsp;&nbsp;&nbsp;</small>
                                                <small id="lblHabido" style="color: gray"></small>
                                                <small style="color: gray">&nbsp;&nbsp;&nbsp;&nbsp;</small>
                                                <small id="lblEstado" style="color: gray"></small>
                                            </div>
                                                        
                                            <div class="row-fluid" style="display:none;">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class=" control-label" for="rbtipo_fijo">
                                                            Tipo</label>
                                                    </div>
                                                </div>

                                                <div class="span1">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <label class="control-label">
                                                                <div class="radio" id="uniform-rbtipo_fijo">
                                                                    <span class="">
                                                                        <input type="radio" class="limpiar span12" name="tipo" id="rbtipo_fijo" style="opacity: 0;"></span>
                                                                </div>
                                                                Fijo
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <label class="control-label">
                                                                <div class="radio">
                                                                    <span class="">
                                                                        <input type="radio" class="limpiar span12" name="tipo" id="rbtipo_variable" style="opacity: 0;"></span>
                                                                </div>
                                                                Variable
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>                            

                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="">
                                                            Periodicidad</label>
                                                    </div>
                                                </div>

                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <label class="control-label">
                                                                <div class="radio" id="Div5">
                                                                    <span class="">
                                                                        <input type="radio" class="limpiar span12" id="rbProgramado" name="periodicidad" style="opacity: 0;"></span>
                                                                </div>
                                                                Programado
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <label class="control-label">
                                                                <div class="radio" id="Div8">
                                                                    <span class="">
                                                                        <input type="radio" class="limpiar span12" id="rbUnico" name="periodicidad" style="opacity: 0;"></span>
                                                                </div>
                                                                Unico
                                                            </label>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                       
                                    <div class="span2" id="div_frecuencia_0" style="display: none;">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_monto">
                                                Frecuencia</label>

                                        </div>
                                    </div>

                                    <div class="span2" id="div_frecuencia_1" style="display: none;">
                                        <select id="cbo_frecuencia" class="m-wrap span12" placeholder="Seleccionar...">
                                            <option value="D">DIARIO</option>
                                            <option value="S">SEMANAL</option>
                                            <option value="M">MENSUAL</option>
                                        </select>
                                    </div>
                                    <div class="span2" id="div_cbo_mensual" style="display: none;">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_mes" name="cbo_mes" class="limpiar combo m-wrap span8 required" data-placeholder="Dia" tabindex="1">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Dia
                                    </div>

                                    <div class="span2" id="div_cbo_semanal" style="display: none;">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_semana" name="cbo_semana" class="limpiar combo m-wrap span12 required" data-placeholder="Dia de la Semana" tabindex="1">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>     
                                    
                                    <br />

                                </div>
                                <br/><br/>
                                
                                <div class="portlet box" style="border: 1px solid #ccc;">
                                    <div class="portlet-title" style="background-color: black;">
                                        <h4><i class="icon-tag"></i>DETALLES DE ASIENTOS</h4>
                                    </div>
                                    <div class="portlet-body">                        
                                        <div class="row-fluid">
                                            <div class="span4">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCuenta">Cuenta</label>
                                                        <div class="controls">
                                                            <div class="span9">
                                                                <input type="text" id="txtCuenta" class="span12 " placeholder="CUENTA" onkeypress="return ValidaNumeros(event,this)"/>
                                                            </div>
                                                            <div class="span2">
                                                                <a id="linkModalCuentas" class="btn black AgregaCuenta" data-toggle="modal" ><i class="icon-search" style="line-height: initial;"></i></a>
                                                                <%--<button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>--%>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  

                                            <div class="span4">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCuentaDescrip">Descripción</label>
                                                        <div class="controls">
                                                            <div class="span10">
                                                                <div class="controls">
                                                                <input id="txtCuentaDescrip" class="span12" type="text" placeholder="DESCRIPCIÓN" disabled/>
                                                            </div>
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
                                                                <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-CodCentroCostoCab="" data-CodCentroCosto=""   placeholder="CENTRO DE COSTOS" disabled/>
                                                            </div>
                                                            <div class="span2">
                                                                <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row-fluid">
                                             
                                            <div class="span2 div_documentos">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cbx_destino">Tipo Novimiento</label>
                                                        <div class="span12">
                                                            <div class="control-group">
                                                                <select id="cbx_destino" class="span12 " data-placeholder="MOVIMIENTO">
                                                                    <option></option>
                                                                    <option value="D">DEBE </option>
                                                                    <option value="H">HABER </option>
                                                                </select>
                                                            </div>
                                                         </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2 div_documentos">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtSubTotal">
                                                            Monto</span></span></label>
                                                        <div class="controls">
                                                            <div class="span6">
                                                                <input type="text" id="txtSubTotal" class="limpiar span12" placeholder="MONTO" onkeyup="this.value=solonumbef(this.value)"/>
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
                                                            <div class="span3 ">
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

                                        <div class="row-fluid" style="margin-top: 10px;">

                                            <table id="tblDocumento" class="table-hover  DTTT_selectable" border="0">
                                                <thead>
                                                    <tr>                                        
                                                        <th>CUENTA</th>
                                                        <th>DESCRIPCIÓN</th>
                                                        <th>CENTRO DE COSTO</th>
                                                        <th>DEBE MN</th>
                                                        <th>HABER MN</th>
                                                        <th>DEBE ME</th>
                                                        <th>HABER ME</th>                                        
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                            </table>

                                        </div>

                                        
                                        <div class="row-fluid" style="margin-top: 20px;">
                                            <div id="div_monto" style="display: none;">
                                                <div class="span1"></div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                       <label id="lbl_monto" class="control-label" for="txt_monto" style="color: darkblue">
                                                           <strong> DEBE (<span id="simbMoneda"></span>)</strong></label>  

                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input id="txt_monto" class="limpiar span12" type="text" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>                          
                                            </div>
                                            
                                            
                                            <div id="div_monto2" style="display: none;">
                                                <div class="span1"></div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label id="lbl_monto2" class="control-label" for="txt_monto2" style="color: darkblue">
                                                           <strong> HABER (<span id="simbMoneda2"></span>)</strong> </label>

                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input id="txt_monto2" class="limpiar span12" type="text" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>                          
                                            </div> 

                                            <div class="span2">
                                                <div class="control-group">
                                                    <h1>
                                                        <label id="msg_balanceo" class="control-label" for="txt_glosa" style="font-family: monospace; color: red; font-size:12px;">
                                                            <b>NO BALANCEADO</b>
                                                     </label>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                   <%-- <a id="btn_aprobar" class="btn green div_documentos" href="javascript:Aprobar();"><i class="icon-ok-circle"></i>&nbsp;Guardar</a>--%>
                                    <a id="guardar" class="btn blue" href="javascript:Guardar();"><i class="icon-save"></i>&nbsp;Guardar</a>
                                    <a id="cancelar" class="btn" href="?f=CTMASCO"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                            <!-- FIN DE GENERALES-->                           
                            
                            <!-- INICIO DEL TAB ASIENTOS CONTABLES-->
                           
                            <!-- FIN DE ASUENTOS CONTABLES-->

                        </div>
                        <!-- FIN DEL CUERPO DE LA FORMA-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- VENTANAS MODALES-->
<div id="modal-habido" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4>Condición Proveedor</h4>
    </div>
    <div class="modal-body" id="divConsultaHabido">
        <div >
            <div class="row-fluid">
                <div class="span2 offset1">
                    <p>
                        ESTADO:                    
                    </p>
                </div>
                <div class="span3">
                    <b>
                        <p id="lblEstadoSunat">
                            Verificando...                    
                        </p>
                    </b>

                </div>

                <div class="span2">
                    <p>
                        CONDICIÓN:                    
                    </p>
                </div>
                <div class="span4 ">
                    <b>
                        <p id="spanVerificando">
                            Verificando...                    
                        </p>
                    </b>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span10 offset1" id="no_existe" style="display: none; text-align: center;">
                    <p>El número de RUC <span id="mnro"></span>consultado no es válido.</p>
                </div>
            </div>
        </div>

        <div class="row-fluid" style="margin-top: 10px;">
            <%--<div class="span10 offset1">
                <div class="span4 offset4">
                    <a href="javascript:$('#modal-habido').modal('hide');" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
            </div>--%>

            <div class="span3">
            </div>
            <div class="span6">
                <div class="span12">
                    <button class="btn blue" type="button" id="btnActualizarDS"><i class="icon-refresh"></i>&nbsp;Cambiar datos Contribuyente</button>
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
        <button type="button" id="btnCancelarCentroCosto" class="btn" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
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

<div id="divModal" class="modal hide">
    <div class="modal-header" style="padding: 1px 15px;"> <!--background: #7EB620; color: #ffffff;-->
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4 id="tituloModal">Titulo</h4>
    </div>
    <div id="divModalContenido" class="modal-body">
    </div>
    <div id="divModalPie" class="modal-footer">

    </div>
</div>

<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfmonto" />

<input type="hidden" id="hf_permiso" />
<input type="hidden" id="hf_existe" />

<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script src="../vistas/CT/js/CTMASCO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMASCO.init();

    });
</script>
