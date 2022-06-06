<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMCOTI.ascx.vb" Inherits="vistas_NO_NOMCOTI" %>
<style>
    table.dataTable tbody tr.selected {
        background-color: #e5e5e5!important;
    }
</style>
<style>
    @media print {

        .body {
            display: none !important;
        }


          .modal {
            display: none !important;
        }

        .chat-window {
            display: none !important;
        }

        .navbar-inner {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        .page-sidebar {
            display: none !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #imprime {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>
<div class="portlet box blue body" id="ventana" >
    <div class="portlet-title">
        <h4><i class="icon-reorder"></i>REGISTRO SOLICITUD DE COTIZACION</h4>
        <div class="actions">
            <a id="btnMail" class="btn purple" style="display:none;"><i class="icon-envelope"></i>&nbsp; Reenviar Mail</a>
            <a class="btn black " id="btn_imprime" style="display:none"><i class="icon-print"></i>&nbsp;Imprimir</a>
            <a href="?f=nomcoti" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
            <a href="?f=nolcoti" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
        </div>

    </div>
    <div class="portlet-body">
        <div class="row-fluid" id="div_filtro">
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

            <div class="span3">
                <div class="control-group">
                    <label class="control-label">Grupo Proveedores</label>
                    <div class="controls">
                        <select id="cbo_tipo_prov" name="cbo_tipo_prov" class="bloquear  span12 required" data-placeholder="Seleccionar Grupo" tabindex="1">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="span2" style="margin-top: 2%">
                <div class="control-group">
                    <div class="controls" id="btnOrigen">
                        <a id="btn_ver_proveedores" class="btn blue"><i class="icon-search" style="line-height: initial;"></i></a>
                        <a id="btn_agregar_proveedores" class="btn green"><i class="icon-plus" style="line-height: initial;"></i></a>
                        <a id="btn_ver_prov" class="btn black"><i class="icon-user" style="line-height: initial;"></i></a>
                        <a id="btn_actualizar" class="btn purple"><i class="icon-refresh" style="line-height: initial;"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group">
                    <label class="control-label">Nro Cotización</label>
                    <div class="controls">
                        <input type="text" id="txt_num_sol_coti" class=" bloquear span12" disabled="disabled" placeholder="Generado"/>
                    </div>
                </div>
            </div>
            <div class="span6">
                <div class="control-group">
                    <label class="control-label">Descripción</label>
                    <div class="controls">
                        <input type="text" id="txt_descripcion" class="bloquear span12" />
                    </div>
                </div>
            </div>
            <div class="span2">
                <div class="control-group">
                    <label class="control-label">Fecha Transacción</label>
                    <div class="controls">
                        <input type="text" class="bloquear fecha span12" data-date-format="dd/mm/yyyy" name="txtFecTransaccion" id="txtFecTransaccion">
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div class="row-fluid a">
            <div class="span12">
                <div class="span5">
                    <fieldset class="span8">
                        <legend>REQUERIMIENTOS&nbsp; 
                                    <a id="btn_ver_req" class="btn black" style="margin-top: -1%;"><i class="icon-search"></i></a>
                        </legend>


                    </fieldset>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <table border="0" style="width: 100%">
                <tr>
                    <td style="text-align: left; font-weight: bold; width: 6%">NRO REQ :</td>
                    <td id="td_codreq" style="text-align: left; width: 8%">-</td>
                    <td style="text-align: left; font-weight: bold; width: 7%">DESC REQ :</td>
                    <td id="td_desreq" style="text-align: left; width: 68%; text-transform: uppercase;">-</td>
                    <td style="text-align: left; font-weight: bold; width: 5%">FECHA :</td>
                    <td id="td_fecha" style="text-align: left; width: 6%">-</td>
                </tr>
            </table>
        </div>
        <br />
        <div class="row-fluid">

            <div class="span12">
                <table id="tbl_detalle_req" class="table table-bordered table-condensed">
                    <thead style="background-color: #eee">
                        <tr>
                            <th style="width: 10%; text-align: center">CANTIDAD</th>
                            <th style="width: 70%; text-align: left;">PRODUCTO</th>
                            <th style="width: 10%; text-align: left;">COSTO REF.</th>
                            <th style="width: 10%; text-align: left;">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
        <br />
        <div class="row-fluid" style="display:none" id="div_informacion">
            <div class="span12">
                <div class="span6">
                   <table  class="table table-bordered" style="width:100%;text-transform:uppercase;">
                       <tr>
                           <td colspan ="2" style="text-align:left;font-weight:bolder;background-color :#eee; ">
                               CONDICIONES :
                           </td>
                       </tr>
                             <tr>
                                 <td style="width:15%;font-weight:bolder">FORMA DE PAGO :</td>
                                 <td style="width:50%" id="td_fopa">EFECTIVO</td>
                             </tr>
                               <tr>
                                 <td style="font-weight:bolder">PLAZO ENTREGA :</td>
                                 <td id="td_plazo">31</td>
                             </tr>
                        <tr>
                                 <td style="font-weight:bolder">LUGAR ENTREGA :</td>
                                 <td id="td_lugar">SADSAD</td>
                             </tr>
                         </table>
                </div>
                 <div class="span6">
                      <table style="width:100%;text-transform:uppercase;"  class="table table-bordered" id="tabla_prov_envio_mail" >
                       <tr>
                           <td colspan ="2" style="text-align:left;font-weight:bolder;background-color :#eee; ">
                               PROVEEDORES ENVIÓ COTIZACION :
                           </td>
                       </tr>
                            
                         </table>
                </div>
            </div>
        </div>

        <div class="form-actions" id="acciones_generales" style="display: block;">
            <a id="guardar" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
            <a id="completar" class="btn green" href="javascript:ShowModal();" style="display: none"><i class="icon-ok-sign"></i>&nbsp;Completar</a>
            <a id="cancelar" class="btn" href="?f=nomcoti"><i class="icon-remove"></i>&nbsp;Cancelar</a>
        </div>
    </div>
</div>
<div id="modal_info" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 44%; width: 50%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalTitulo">LISTA DE REQUERIMIENTOS</h4>
    </div>
    <div class="modal-body" id="ventanaInfo">
        <div class="row-fluid">

            <div class="span12">
                <table id="tbl_requerimiento" class="table DTTT_selectable">
                    <thead>
                        <tr>
                            <th style="width: 15%; text-align: center">N° REQ</th>
                            <th style="width: 75%; text-align: left;">DESCRIPCIÓN</th>
                            <th style="width: 10%; text-align: center">FECHA</th>

                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
<div id="modal_proveedores" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 44%; width: 50%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="H1">INFORMACIÓN</h4>
    </div>
    <div class="modal-body" id="Div2">
        <div class="row-fluid">

            <div class="span12">
                <table style="width: 100%" border="0">
                    <tr>
                        <td style="width: 10%;">GRUPO : </td>
                        <td style="width: 90%; text-align: left; font-weight: bold; padding: 3px;" id="lbl_grupo_prov">HARWARE</td>

                    </tr>

                </table>
            </div>

        </div>

        <div class="row-fluid">

            <div class="span12">
                <table id="tbl_grup_prov" class="table DTTT_selectable" >
                    <thead>
                        <tr>
                            <th style="width: 10%; text-align: center">TIPO DCTO</th>
                            <th style="width: 10%; text-align: left;">NRO DCTO</th>
                            <th style="width: 60%; text-align: center">RAZON SOCIAL</th>
                            <th style="width: 20%; text-align: left">CORREO</th>

                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>


<div id="modal_condiciones" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 50%; width: 36%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="H2">CONDICIONES</h4>
    </div>
    <div class="modal-body" id="Div3">
        <div class="row-fluid">

            <div class="span12">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label">Forma de Pago</label>
                        <div class="controls">
                            <input type="text" class="bloquear span12" id="txt_forma_pago" name="txt_forma_pago" placeholder="Forma Pago">
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label">Plazo Entrega (días Calendarios*)</label>
                        <div class="controls">
                            <input type="text" class="bloquear span12 " id="txt_plazo_entrega" onkeypress="return ValidaNumeros(event,this)" name="txt_plazo_entrega" placeholder="Plazo Entrega">
                        </div>
                    </div>
                </div>
               
            </div>

        </div>
        <div class="row-fluid">
            <div class="span12">
                 <div class="span12">
                    <div class="control-group">
                        <label class="control-label">Lugar Entrega</label>
                        <div class="controls">
                            <input type="text" class="bloquear span12 " id="txt_lugar_entrega" name="txt_lugar_entrega" placeholder="Lugar Entrega">
                        </div>
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

<div id="EnviaCorreo" class="modal hide fade" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="width: 26%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="H3">AVISO</h4>
    </div>
    <div class="modal-body">
        <p>
            <b>Se enviará un correo electrónico a los proveedores con el requerimiento a cotizar.....</b>
        </p>
    </div>
    <div class="modal-footer">
        <button type="button"  data-dismiss="modal" class="btn black"
            id="btn_aceptar">
            Aceptar 
        </button>

    </div>
</div>

<div id="EnviaCorreo2" class="modal hide fade" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="width: 26%; left: 60%!important;"
    aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="H4">AVISO</h4>
    </div>
    <div class="modal-body">
        <p>
            <b>Se enviará un correo electrónico a los proveedores con el requerimiento a cotizar.....</b>
        </p>
    </div>
    <div class="modal-footer">
        <button type="button"  data-dismiss="modal" class="btn black"
            id="btn_aceptar2">
            Aceptar 
        </button>

    </div>
</div>

<div id="imprime" style="display:none;">
 
    
   
</div>
<input type="hidden" id="hfreq"/>
<input type="hidden" id="hfcorreos"/>
<asp:HiddenField ID="hfObjJson" runat="server" />
<input type="hidden" id="hfCod_coti" />
<script src="../vistas/NO/js/NOMCOTI.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMCOTI.init();

    });
</script>
