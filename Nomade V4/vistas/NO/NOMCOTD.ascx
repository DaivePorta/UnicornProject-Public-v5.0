<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMCOTD.ascx.vb" Inherits="vistas_NO_NOMCOTD" %>
<div id="EnviaCorreo" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 26%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Aviso!</h3>
    </div>
    <div class="modal-body">
        <p>
            <b>Se enviara un correo electronico a los proveedores con los productos a cotizar.....</b>
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" onclick="javascript:Completar();" data-dismiss="modal" class="btn blue"
            id="CrearPersona">
            Aceptar 
        </button>
        <%--<button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>--%>
    </div>
</div>
<div class="row-fluid">
    <div class="span12 ">

        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGISTRO SOLICITUD DE COTIZACION DIRECTA</h4>
                <div class="actions">

                    <a href="?f=nomcotd" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nolcotd" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hfempresa" runat="server" />
                                    <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcSucural" class="bloquear combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txt_num_sol_coti">
                                        Nro Solicitud 
                                        <br />
                                        Cotizacion
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span12 m-wrap required" id="txt_num_sol_coti" name="txt_num_sol_coti" placeholder="Numero" disabled />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txtFecTransaccion" data-date-format="dd/mm/yyyy">
                                        Fecha Transaccion
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear fecha span12 m-wrap required" data-date-format="dd/mm/yyyy" name="txtFecTransaccion" id="txtFecTransaccion" />
                                </div>
                            </div>
                        </div>


                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_tipo_solic">
                                    Tipo de Solicitud</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div2">
                                    <select id="cbo_tipo_solic" name="cbo_tipo_solic" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Tipo Solicitud" tabindex="1">
                                        
                                            <option value="B">BIENES</option>
                                            <option value="S">SERVICIOS</option>
                                        
                                    </select>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_tipo_prov">
                                    Grupo Proveedores</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="grupo">
                                    <select id="cbo_tipo_prov" name="cbo_tipo_prov" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Tipo" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="btnOrigen">
                                    <a id="btn_actualizar_prov" class="btn purple" style="border-radius:10px!important "><i class="icon-refresh" style="line-height: initial;"></i></a>
                                    <a id="btn_ver_proveedores" class="btn blue" style="border-radius:10px!important "><i class="icon-search" style="line-height: initial;"></i></a>
                                    <a id="btn_agregar_proveedores" class="btn green"  style="border-radius:10px!important "><i class="icon-plus" style="line-height: initial;"></i></a>
                                    <a id="btn_ver_prov" class="btn black"  style="border-radius:10px!important "><i class="icon-user" style="line-height: initial;"></i></a>

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
                            <div class="control-group">
                                <div class="controls" id="moneda">
                                    <select id="cbo_moneda" name="cbo_moneda" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Moneda" tabindex="1">                                       
                                                                                   
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txt_descripcion">
                                        Glosa
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span12 m-wrap required" id="txt_descripcion" name="txt_descripcion" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="eliminar row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtcodprod">
                                            Producto</label>
                                    </div>
                                </div>
                                <div class="span10">
                                    <div class="control-group">
                                        <div class="controls" id="input_cod_prod">
                                            <input id="txtcodprod1" disabled="disabled" class="span2 limpiar" type="text" />                                                                                       
                                            <input id="txtcodprod" class="span2 limpiar" type="text" placeholder="Código" />
                                            <input id="txtdescprod" class="span6 limpiar" type="text" data-provide="typeahead"  placeholder="Nombre" style="text-transform: uppercase" next="#txtcant" />
                                        </div>
                                    </div>
                                </div>                                                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="eliminar row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtcant">
                                            Cantidad</label>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtcant" onkeypress="return ValidaNumeros(event,this)"  class="span12 limpiar m-wrap" type="text" />
                                        </div>
                                    </div>
                                </div>
                              
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txt_prec_ref">
                                            Precio Ref.</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txt_prec_ref" class="span12 limpiar m-wrap" type="text" onkeypress="return ValidaDecimales(event,this)" />
                                        </div>
                                    </div>
                                </div>
                                  <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                             <a id="agregar" class="btn green" href="javascript:Agregar();" style="border-radius :4px!important; margin-top:7px;"><i class="icon-download-alt"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbl_cotizados" class="table table-bordered" style="height: 50px;">
                            <thead style="background-color: steelblue; color: aliceblue;">
                                <tr>

                                    <th style="text-align: center;">CANT.</th>
                                    <th>COD_PROD</th>
                                    <th>PRODUCTO</th>
                                    <th>VALOR REF.</th>
                                   <%-- <th style="display: none;">VALOR REF.</th>--%>
                                    <th>TOTAL REF</th>                                    
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                   <br />
                <div class="row-fluid">
                   
                    <div class="span4" id="divsistemas">

                        <fieldset>
                            <legend>CONDICIONES
                            </legend>


                        </fieldset>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txt_forma_pago">
                                    Forma de Pago
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span12 m-wrap required" id="txt_forma_pago" name="txt_forma_pago" placeholder="Forma Pago"  />
                                </div>
                            </div>
                        </div>
                </div>
                <div class="row-fluid">
                    <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txt_plazo_entrega">
                                   Plazo Entrega  (días Calendarios*)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span12 m-wrap required" id="txt_plazo_entrega" onkeypress="return ValidaNumeros(event,this)"  name="txt_plazo_entrega" placeholder="Plazo Entrega"  />
                                  
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div class="row-fluid">
                    <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <label class="control-label" for="txt_lugar_entrega">
                                   Lugar Entrega  
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span12 m-wrap required" id="txt_lugar_entrega" name="txt_lugar_entrega" placeholder="Lugar Entrega"  />
                                  
                                </div>
                                
                            </div>
                        </div>
                </div>
               

                <div class="form-actions" id="acciones_generales" style="display: block;">
                    <a id="guardar" class="btn blue" href="javascript:Guardar();"><i class="icon-save"></i>  Guardar</a>
                    <a id="completar" class="btn green" href="javascript:ShowModal();" style="display: inline;"><i class="icon-ok-sign"></i>  Completar</a>
                    <a id="cancelar" class="btn" href="?f=nomcotd"><i class="icon-remove"></i>  Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hfObjJson" runat="server" />
<input type="hidden" id="hfcod_prod"/>
<script src="../vistas/NO/js/NOMCOTD.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMCOTD.init();

    });
</script>
