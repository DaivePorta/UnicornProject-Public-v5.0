<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMPGAS.ascx.vb" Inherits="vistas_CP_CPMPGAS" %>
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
                <h4><i class="icon-reorder"></i>REGISTRO PROVISION DE GASTOS</h4>
                <div class="actions">
                    <a href="?f=cpmpgas" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=cplpgas" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                        <ul class="nav nav-tabs">
                            <li class="active"><a id="tabDatosGenerales" href="#datos_generales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>                            
                            <li><a class="advance_form_with_chosen_element" id="tabAsiento" href="#asientos_contables" data-toggle="tab"><i class=""></i>Asiento Contable</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="datos_generales">
                                



                                <div class="row-fluid">
                                    <div class="row-fluid">
                                        <div class="span12">

                                            <div class="row-fluid">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCodigo">
                                                            Código</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input id="txtCodigo" class="limpiar span12 m-wrap" disabled="disabled" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="chkactivo">
                                                            <div class="checker" id="uniform-chkactivo">
                                                                <span class="checked">
                                                                    <input type="checkbox" id="chkactivo" name="chkactivo" checked="" class="limpiar" style="opacity: 0;"></span>
                                                            </div>
                                                            Activo</label>
                                                    </div>
                                                </div>

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
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <label class="span2 control-label" for="txtSerieRegistroInterno">
                                                            Nro</label>
                                                        <input id="txtSerieRegistroInterno" placeholder="SERIE" class="span4 m-wrap" type="text" disabled style="text-align: right" />
                                                        <input id="txtNroRegistroInterno" placeholder="NUMERO" class="span6 m-wrap" type="text" disabled />
                                                        <input type="hidden" id="txtLineasRegistroInterno" />
                                                    </div>
                                                </div>

                                            </div>

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
                                                        <div class="controls">
                                                            <select id="cbo_moneda" name="cbo_moneda" class="limpiar combo m-wrap span12 required" data-placeholder="Selecciona" tabindex="1">
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                            
                                            <div class="row-fluid">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_beneficiario">
                                                            Pagar a</label>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group ">
                                                        <div class="controls" id="input">
                                                            <input id="txt_beneficiario" class="limpiar span12 " type="text" />
                                                        </div>
                                                    </div>                                                    
                                                </div>

                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <a id="btn_origen_destino" class="btn green" target="_blank" href="?f=nrmgepr"><i class="icon-plus" style="line-height: initial"></i></a>
                                                            <a id="btn_refresh" class="btn blue"><i class="icon-refresh" style="line-height: initial;"></i></a>
                                                            <button type="button" id="btnHabido" class="btn orange" style="height: 27px; padding: 0px 5px; font-size: 11px;">¿Habido?</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="div_fec_unica_0" style="display: none;" class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_fec_unica">
                                                            F. Emisión</label>
                                                    </div>
                                                </div>
                                                <div class="span1" id="div_fec_unica_1" style="display: none;">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <div class="input-append date date-picker fecha" data-date-format="dd/mm/yyyy">
                                                                <input disabled class=" date-picker fecha span10 limpiar required" data-date-format="dd/mm/yyyy" type="text" id="txt_fec_unica" /><span class="add-on" style="height: 20px"><i class="icon-calendar"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txt_fec_reg">
                                                            F. Registro</label>
                                                    </div>
                                                </div>


                                                <div class="span1">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input type="text" disabled="disabled" id="txt_fec_reg" class="span10 date-picker" placeholder="dd/mm/yyyy" id=">" data-date-format="dd/mm/yyyy" style="text-align: left">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label id="Label3" class="control-label" for="txtFechaVenc" style="text-align: center;">F. Venci</label>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input type="text" class="span10 date-picker" placeholder="dd/mm/yyyy" id="txtFechaVenc" data-date-format="dd/mm/yyyy" maxlength="10" />
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

                                    <div class="row-fluid"> 
                        
                                        <div class="span2 div_documentos">
                                            <div class="row-fluid">
                                                <div class="control-group">
                                                    <label class="control-label" for="">
                                                        Provisionado Por</label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" id="txt_usua" class="limpiar span12 " disabled="disabled" />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="span2 div_documentos">
                                            <div class="row-fluid">
                                                <div class="control-group">
                                                    <label class="control-label" for="cbo_documento">
                                                        Documento</label>
                                                    <div class="controls">
                                                        <div class="span12" id="Div6">
                                                            <select id="cbo_documento" class="b limpiar span12 m-wrap" placeholder="Documento">
                                                                <option></option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1 div_documentos">
                                            <div class="row-fluid">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_serie">
                                                        Serie</label>
                                                    <div class="controls">
                                                        <div class="span12" id="Div7">
                                                            <input id="txt_serie" placeholder="SERIE" class="b span10  limpiar" disabled="disabled" type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2 div_documentos">
                                            <div class="row-fluid">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_dcto_ref">
                                                        Numero</label>
                                                    <div class="controls">
                                                        <div class="span12" id="Div9">
                                                            <input id="txt_dcto_ref" placeholder="NUMERO" class="b span12  limpiar" disabled="disabled" type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: end; font-weight: bold;">
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2 div_documentos">
                                            <div class="control-group">
                                                <label class="control-label" for="chk_sindcto" style="margin-top: 31px">
                                                    <div class="checker" id="uniform-chk_sindcto">
                                                        <span class="">
                                                            <input type="checkbox" id="chk_sindcto" name="chk_sindcto" class="b limpiar" style="opacity: 0;"></span>
                                                    </div>
                                                    Sin documento</label>
                                            </div>
                                        </div>

                                       <div class="span2 div_documentos">
                                            <div class="control-group">
                                                <label class="control-label" for="chkDeducible" style="margin-top: 31px">
                                                    <div class="checker" id="uniform-chkDeducible">
                                                        <span class="">
                                                            <input type="checkbox" id="chkDeducible" name="chkDeducible" class="b limpiar" style="opacity: 0;"></span>
                                                    </div>
                                                    Gasto Contable</label>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="row-fluid">
                                        <div class="span7">
                                            <div class="row-fluid">
                                                <div class="control-group">
                                                    <label class="control-label" for="txt_descripcion">
                                                        Descripción</label>
                                                    <div class="controls">
                                                        <div class="span12" id="Div10">
                                                            <textarea id="txt_descripcion" class="limpiar span12 m-wrap" > </textarea>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="span4">
                                            <div class="control-group">
                                                <label class="control-label" for="chk_compras" style="margin-top: 31px">
                                                    <div class="checker" id="uniform-chk_compras">
                                                        <span class="checked">
                                                            <input type="checkbox" id="chk_compras" checked="" name="chk_compras" class="limpiar" style="opacity: 0;"></span>
                                                    </div>
                                                    Registro de Compras</label>
                                            </div>
                                            <div class="row-fluid" style="display: block;" id="div_per_tri">
                                                <div class="span4">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtCodigo">
                                                            Periodo Tributario</label>
                                                    </div>
                                                </div>
                                                <div class="span8">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbo_periodo" class="b limpiar span12 m-wrap" placeholder="Selecciona Periodo">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-fluid " >
                                        <div class="span7">
                                            <div class="row-fluid divDestinoTipo" style="display: none;">
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cboTipoBien">
                                                            Tipo Bien</label>
                                                    </div>
                                                </div>
                                                <div class="span8">
                                                    <div class="control-group">
                                                        <select id="cboTipoBien" class="span12 limpiar" data-placeholder="Tipo Bien">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="row-fluid" style="display: block;" id="div_declara">
                                                <div class="span3">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cboDeclara">
                                                            Declara</label>
                                                    </div>
                                                </div>
                                                <div class="span8">
                                                    <div class="control-group">
                                                        <select id="cboDeclara" class="span12 limpiar" data-placeholder="Declaración">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                    
                                    </div>

                                </div>
                                <br/><br/>
                                
                                <div class="portlet box" style="border: 1px solid #ccc;">
                                    <div class="portlet-title" style="background-color: black;">
                                        <h4><i class="icon-tag"></i>DETALLES DE GASTOS</h4>
                                    </div>
                                    <div class="portlet-body">                        
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

                                        <div class="row-fluid">

                                           <div class="span3 div_documentos">
                                                <div class="row-fluid">
                                                    <div class="control-group">
                                                        <label class="control-label" for="txtcuenta">
                                                            Cuenta</label>
                                                        <div class="controls">
                                                            <div class="span12" id="Div4">
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
                                                            <div class="span12" id="Div4">
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
                                                        <div class="span12">
                                                            <div class="control-group">
                                                                <select id="cbx_destino" class="span12 limpiar" data-placeholder="Operación">
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
                                                        <label class="control-label" for="txtSubTotal">
                                                            Monto</span></span></label>
                                                        <div class="controls">
                                                            <div class="span6">
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
                                                        <th>GASTO</th>
                                                        <th>SUB GASTO</th>
                                                        <th>CENTRO DE COSTO</th>
                                                        <th>GLOSA O DESTINO</th>
                                                        <th>CUENTA</th>
                                                        <th>OPERACIÓN</th>
                                                        <th>TOTAL BRUTO</th>  
                                                        <th>DETRACCIÓN</th> 
                                                        <th>TOTAL NETO</th> 
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                            </table>
                                        </div>

                                        <div class="row-fluid" style="margin-top: 10px;">
                                            <div class="span8"></div>
                                            <div id="div_monto" style="display: none;">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label id="lbl_monto" class="control-label" for="txt_monto">
                                                            <b>IMPORTE TOTAL (<span id="simbMoneda"></span>)</b></label>

                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input id="txt_monto" class="limpiar span11" type="text" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>                          
                                            </div>                            
                                        </div>
                                        <div class="row-fluid" style="margin-top: 10px;">
                                            <div class="span8"></div>
                                            <div id="div_detraccion" style="display: none;">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label id="lbl_detraccion" class="control-label" for="txt_monto">
                                                            <b>DETRACCIÓN (<span id="simbMoneda2"></span>)</b></label>

                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input id="txt_detraccion" class="limpiar span11" type="text" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>                          
                                            </div>                            
                                        </div>
                                        <div class="row-fluid" style="margin-top: 10px;">
                                            <div class="span8"></div>
                                            <div id="div_importePagar" style="display: none;">
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <label id="lbl_importePagar" class="control-label" for="txt_monto">
                                                            <b>IMPORTE A PAGAR (<span id="simbMoneda3"></span>)</b></label>

                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <input id="txt_importePagar" class="limpiar span11" type="text" onkeypress="return ValidaDecimales(event,this)" style="text-align: end; font-weight: bold;" disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>                          
                                            </div>                            
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span3"></div>
                                    <div class="span6" id="estado" style="display: none;">
                                        <div class="control-group alert alert-info span12" style="width: 100%">
                                            <label class="control-label" id="Label5" style="text-align: -webkit-center; font-size: large; font-family: sans-serif; font-weight: bold;">&nbsp;&nbsp;-</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span6"></div>
                                    <div class="span6" id="e" style="display: none;">
                                        <div class="control-group alert alert-error span12" style="width: 100%">
                                            <label class="control-label" id="Label4" style="text-align: -webkit-center; font-size: large; font-family: sans-serif; font-weight: bold;">&nbsp;&nbsp;ERROR : EL GASTO YA FUE APROBADO</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-actions" id="acciones_generales" style="display: block;">
                                    <a id="btn_aprobar" class="btn green div_documentos" href="javascript:Aprobar();"><i class="icon-ok-circle"></i>&nbsp;Guardar y Aprobar</a>
                                    <a id="guardar" class="btn blue" href="javascript:Guardar();"><i class="icon-save"></i>&nbsp;Guardar</a>
                                    <a id="cancelar" class="btn" href="?f=CPMPGAS"><i class="icon-remove"></i>&nbsp;Cancelar</a>
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

<input id="hfParamDetraccion" type="hidden" value="0" />
<input id="hfMontoDetraccion" type="hidden" value="0" />
<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfmonto" />

<input type="hidden" id="hf_permiso" />
<%--<input type="hidden" id="hf_existe" />--%>

<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script src="../vistas/CP/js/CPMPGAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPMPGAS.init();

    });
</script>

