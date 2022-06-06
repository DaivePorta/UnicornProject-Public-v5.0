﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMCERD.ascx.vb" Inherits="vistas_CA_CAMCERD" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>CERRAR CAJA DIRECTA</h4>
                <div class="actions">
                   <%-- <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>--%>
                   <%-- <a href="?f=camnocr" class="btn green"><i class="icon-plus"></i>Nuevo</a>--%>
                   <%-- <a href="?f=calnocr" class="btn red"><i class="icon-list"></i>Listar</a>--%>
                </div>

            </div>

            <div class="portlet-body" id="caja">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="Div5">
                                    <select id="slcSucural" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_caja">
                                    Caja</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="Div6">
                                    <select id="cbo_caja" class="combo m-wrap span12 required" name="cbo_caja" data-placeholder="Caja" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="form" style="display:none;">
                <div class="row-fluid">
                    <div class="span8">
                <div class="row-fluid">
                    <div class="span4"></div>
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="">
                                Soles</label>
                        </div>
                    </div>
                     <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="">
                                Dolares</label>
                        </div>
                    </div>
     
                </div>

                 <div class="row-fluid">
                      <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="">
                                Debe Haber</label>
                        </div>
                    </div>
                      <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_soles"  class="control span12"   type="text"  style="text-align: right; font-weight:800;"/>
                               
                            </div>
                        </div>
                    </div>
                      <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_dolares"  class="control span12"   type="text" style="text-align: right; font-weight:800;"/>
                               
                            </div>
                        </div>
                    </div>

                 </div>

                <div class="row-fluid" id="rb_sobra_falta" style="display:none;">
                    <div class="span4"></div>
                     <div class="span4">
                        <div class="controls">
                            <label class="radio">
                                <div class="radio" id="Div2">
                                    <span>
                                        <input type="radio"  name="rb_soles" value="FS" checked="checked" style="opacity: 0;" id="rbFalta_S" />
                                    </span>
                                </div>
                                Falta
                            </label>
                            <label class="radio">
                                <div class="radio" id="Div1">
                                    <span>
                                        <input type="radio"  name="rb_soles" value="SS" style="opacity: 0;" id="rbSobra_S" />
                                    </span>
                                </div>
                                Sobra
                            </label>
                        </div>
                    </div>
                     <div class="span4">
                        <div class="controls">
                            <label class="radio">
                                <div class="radio" id="Div3">
                                    <span>
                                        <input type="radio"  name="rb_dolares" value="FD"  style="opacity: 0;"  id="rbFalta_D" />
                                    </span>
                                </div>
                                Falta
                            </label>
                            <label class="radio">
                                <div class="radio" id="Div4">
                                    <span>
                                        <input type="radio"  name="rb_dolares" value="SD" style="opacity: 0;"  id="rbSobra_D" />
                                    </span>
                                </div>
                                Sobra
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                 <a id="btn_inconsistencia"  style="border-radius: 6px !important;" class="btn black" href="javascript:Inconsistencia();"><i class="icon-warning-sign"></i> Inconsistencia</a>
                               <br />
                               <span style="color:red;">Presiona si hubiera alguna inconsistencia</span>
                            </div>
                        </div>
                    </div>

                             <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_monto_soles"  onkeypress="return ValidaDecimales(event,this)" class="control span12"   type="text" style="text-align: right; font-weight:800;" />
                               
                            </div>
                        </div>
                    </div>
                      <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_monto_dolares"  onkeypress="return ValidaDecimales(event,this)" class="control span12"   type="text"  style="text-align: right; font-weight:800;" />
                               
                            </div>
                        </div>
                    </div>
                </div>

                

                        <div class="row-fluid">
                      <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="">
                                Cierre Caja</label>
                        </div>
                    </div>
                      <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_cer_caj_soles"  class="control span12 m-wrap required"   type="text" style="text-align: right; font-weight:800;" />
                               
                            </div>
                        </div>
                    </div>
                      <div class="span4">
                         <div class="control-group">
                            <div class="controls">
                                <input id="txt_cer_caj_dolares"  class="control span12 m-wrap required"   type="text"  style="text-align: right; font-weight:800;"/>
                               
                            </div>
                        </div>
                    </div>

                 </div>
                        </div>
                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="">
                                        Observaciones</label>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txt_obvservacion" class="control span12" rows="9" cols="9"></textarea>

                                </div>
                            </div>
                        </div>
                    </div>

                    
                    </div>
  
                        <div class="form-actions" style="margin-top: 20px;">
                            <a id="cerrar" class="btn red" href="javascript:CerrarCaja();"><i class="icon-lock"></i> Cerrar Caja</a>
                            <a id="cancelar" class="btn" href="javascript:Back();"><i class="icon-remove"></i> Cancelar</a>
                           
                        </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<input id="hfcerrar_caja_soles" type="hidden" />
<input id="hfcerrar_caja_dolares" type="hidden" />
<input id="hfcod_ctlg" type="hidden" />
<input id="hfcod_estable" type="hidden" />
<input id="hfcod_caja" type="hidden" />
<input id="hfcod_ult_mov" type="hidden" />
<input id="hfcod_monto_sol" type="hidden" />
<input id="hfcod_monto_dol" type="hidden" />



<%--<script src="../../recursos/plugins/tabletojson/jquery.tabletojson.js"></script>--%>
<script type="text/javascript" src="../vistas/CA/js/CAMCERD.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMCERD.init();
    });
</script>