<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMREQC.ascx.vb" Inherits="vistas_NO_NOMREQC" %>
<style>
    table.dataTable tbody tr.selected {
        background-color: #e5e5e5!important;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Requerimiento de Compra</h4>
                <div class="actions">

                    <a href="?f=nomreqc" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <%--<a href="?f=nolreqc" class="btn red"><i class="icon-list"></i>Listar</a>--%>
                </div>

            </div>
            <div class="portlet-body">
                        
                <div class="row-fluid" id="div_filtro">
                   

                 
                       <div class="span1"> </div>
                       <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                 <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    
              
                     
                          <div class="span2">
                        <label class="control-label"></label>
                       <div class="control-group">
                            <div class="controls">
                                <a id="btn_listar" style="margin-top:17px;" class="btn blue"><i class="icon-search"></i>&nbsp;Flitrar</a>
                            </div>
                        </div>
                    </div>

                 
                </div>
          
                <div class="row-fluid a">
                    <div class="span12">
                        <div class="span4">
                            <fieldset class="span8">
                                <legend>REQUERIMIENTOS&nbsp; <i class="icon-list-alt"></i>
                                </legend>


                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span10">
                        <i class="icon-stop" style="font-size: large; color: darkseagreen;"></i>&nbsp;&nbsp;<span style="font-size: larger;">REQUERIMIENTO 100% COMPLETADO</span>
                        <table id="tbl_req_aprobados" class="table table-bordered table-condensed">
                            <thead style="background-color: #eee">
                                <tr>  
                                    <th style="width: 1% ; display:none">FECHA</th>
                                    <th style="width: 13%">COD PROD</th>
                                    <th style="width: 80%">PRODUCTO</th>
                                    <th style="width: 13%">U.MED</th>
                                    <th style="width: 5%; text-align: center;">CANT. REQ.</th>
                                    <th style="width: 5%">STOCK</th>
                                     <th style="display: none;">COD_UNME</th>
                                    <th style="display: none;">IND</th>
                                    <th style="width: 5%">#</th>                                                                     
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
  
                    </div>
                    <div class="span1"></div>

                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span6">
                            <fieldset class="span8">
                                <legend>PEDIDOS A PROVEEDORES&nbsp; <i class="icon-truck"></i>
                                </legend>


                            </fieldset>
                        </div>
                        <div class="span6">
                            <fieldset class="span8">
                                <legend>DESPACHO DEL REQUERIMIENTO&nbsp; <i class="icon-chevron-down"></i>
                                </legend>


                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span6">
                            <table id="tbl_pedidos" class="table table-bordered table-condensed">
                                <thead style="background-color: #eee">
                                    <tr>
                                        <th style="width: 13%">COD PROD</th>
                                        <th style="width: 80%">PRODUCTO</th>
                                        <th style="width: 10%; text-align: center;">CANT PEDIDA</th>
                                        <th style="width: 5%; text-align: center;">#</th>


                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="span6">

                            <table id="tbl_despachos" class="table table-bordered table-condensed">
                                <thead style="background-color: #eee">
                                    <tr>
                                        <th style="width: 13%">COD PROD</th>
                                        <th style="width: 80%">PRODUCTO</th>
                                        <th style="width: 10%; text-align: center;">CANT DESPACHAR</th>
                                        <th style="width: 5%; text-align: center;">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>


                <br />



                <div class="form-actions" id="acciones_generales" style="display: block;">
                    <a id="grabar" class="btn green" href="javascript:EnviaLogistica();"><i class="icon-hand-right"></i>Enviar Logistica</a>
                    <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>


<div id="modal_info" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 44%; width: 50%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalTitulo">INFORMACIÓN DEL REQUERIMIENTO</h4>
    </div>
    <div class="modal-body" id="ventanaInfo">
        <%--style="overflow-y: initial !important; max-height: 520px"--%>
      
        <div class="row-fluid">

            <div class="span12">
                <table style="width: 100%" border="0">
                    <tr>
                        <td style="width: 15%;">PRODUCTO : </td>
                        <td style="width: 35%; text-align: left; font-weight: bold;padding:3px;" id="lbl_producto">-</td>
                        <td style="width: 25%; text-align: left;">STOCK Disp.: </td>
                        <td style="width: 25%; text-align: left; font-weight: bold;" id="lbl_stock">000</td>
                    </tr>
                    <tr>
                        <td style="">PEDIDO : </td>
                        <td style="text-align: left; font-weight: bold;" id="td_cant_pedida">-</td>
                        <td style="text-align: left;">DESPACHADO : </td>
                        <td style="text-align: left; font-weight: bold;" id="td_cant_despachada">-</td>
                    </tr>
                </table>
            </div>

        </div>
        <br />
             <div class="row-fluid">

            <div class="span12">
                   

                <table style="width: 100%" border="0">
                    <tr>
                        <td style="width: 15%;">CENTRO COSTOS : </td>
                        <td style="width: 35%; text-align: left; font-weight: bold;padding:3px;" id="td_cc_costo">-</td>
                        <td style="width: 25%; text-align: left;">PRIORIDAD : </td>
                        <td style="width: 25%; text-align: left; font-weight: bold;" id="td_prioridad">0</td>
                         
                    </tr>
                </table>
            </div>

        </div>
        <br />
        <div class="row-fluid">

            <div class="span12">
                <table id="tbl_detalle_req" class="table  DTTT_selectable">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="width: 15%; text-align: center">N° REQ</th>
                            <th style="width: 15%; text-align: center;">GLOSA</th>
                            <th style="width: 10%; text-align: center">REQUERIDO</th>
                            <th style="width: 20%; text-align: center">PEDIR</th>
                            <th style="width: 10%; text-align: center">DESPACHAR</th>
                            <th style="width: 5%; text-align: center">#</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
         
        </div>
        <div class="row-fluid">
            <div class="span3"></div>
            <div class="span6" id="msg" style="display: none;text-align-last:center;">
                <span class="label label-important">ALERTA!</span>
                <span style="color: #D84A38; font-weight: bold;" id="msg_error">
                </span>

            </div>
            <div class="span3"></div>
        </div>
 

    </div>

    </div>

<div id="modal_reg" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="display:none;left:50%;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel" style="text-align:center;">Ingrese Nombre del Requerimiento</h3>
    </div>
    <div class="modal-body">
        
        <div class="row-fluid" style="text-align:center;">
            <div class="span12">
                        <div class="control-group">
                            <div class="controls">
                               <input id="txt_nom_req" class="span9" type="text"/>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    <div class="modal-footer" style="text-align:center;">
        <button type="button" id="btn_continuar"  class="btn black">
            Continuar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>

 <div id="modal_progress"  data-keyboard="false" data-backdrop="static" class="modal hide fade" tabindex="-2" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true" style="display: none;left:50%;top:40%;height:109px">
                    <div class="modal-header">
										
										<h3 id="msg_cargando"> Creando Requerimiento y despachos  . . .</h3>
									</div>
                    <div class="modal-body">
                        <div class="progress">
									<div id="barra_progreso" style="width: 0%;" class="bar"></div>
								</div>
                    </div>

                </div>
    <asp:HiddenField ID="hfObjJson" runat="server" />
    <input type="hidden" id="hfjson_req_compra" />
 
    <script src="../vistas/NO/js/NOMREQC.js"></script>
    <script>
        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
            NOMREQC.init();

        });
    </script>
