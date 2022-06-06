<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMRQCP.ascx.vb" Inherits="vistas_NO_NOMRQCP" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REQUERIMIENTO DE COMPRA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nolreqc" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" >
                    <div class="span12">
           
                           <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" disabled="disabled"  class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
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
                            <div class="controls">
                                <select id="slcSucural"  disabled="disabled"  class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
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
                            <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Nro Requerimiento</label>
                            <div class="controls">
                              <input type="text" class="span12" id="txt_num_req" name="txt_num_req"  disabled="disabled" >
                            </div>
                        </div>
                    </div>
                          <div class="span5">
                        <div class="control-group">
                            <label class="control-label">Desc. Requerimiento</label>
                            <div class="controls">
                             <input type="text" class="span12" id="txt_nom_req" name="txt_nom_req"  disabled="disabled" style="text-transform:uppercase;">
                            </div>
                        </div>
                    </div>

                          <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Fec. Transaccion</label>
                            <div class="controls">
                             <input type="text" class="span12"  name="txtFecTransaccion" id="txtFecTransaccion" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <br />
                           <div class="row-fluid a">
                    <div class="span12">
                        <div class="span8">
                            <fieldset class="span8">
                                <legend>DETALLE DEL REQUERIMIENTO&nbsp; <i class="icon-list-alt"></i>
                                </legend>


                            </fieldset>
                        </div>
                    </div>
                </div>
               
                <div class="row-fluid">
                    <div class="span12">

                        <table id="tblreqs_compra" class="table table-bordered table-condensed"  style="width:100%">
                            <thead style="background-color: #eee">
                                <tr>
                                    <th style="width:10%">COD PROD
                                    </th>
                                    <th style="text-align:left;width:70% ">PRODUCTO
                                    </th>
                                    <th style="width:10%">CANTIDAD
                                    </th>
                                    <th style="width:10%;text-align:center;">#
                                    </th>
                                </tr>
                            </thead>

                        </table>
                      
                    </div>
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
      
        <div class="row-fluid">

            <div class="span12">
                <table style="width: 100%" border="0">
                    <tr>
                        <td style="width: 10%;">PRODUCTO : </td>
                        <td style="width: 80%; text-align: left; font-weight: bold;padding:3px;" id="lbl_producto">-</td>
                    
                    </tr>
                
                </table>
            </div>

        </div>
      
        <br />
        <div class="row-fluid">

            <div class="span12">
                <table id="tbl_detalle_req" class="table">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="width: 15%; text-align: center">N° REQ</th>
                            <th style="width: 15%; text-align: center;">ITEM</th>
                            <th style="width: 10%; text-align: left ">PRODUCTO</th>
                            <th style="width: 20%; text-align: center">PEDIDO</th>
                           
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
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script src="../vistas/NO/js/NOMRQCP.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMRQCP.init();

    });
</script>
