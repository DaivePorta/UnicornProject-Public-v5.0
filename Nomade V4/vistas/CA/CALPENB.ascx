<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALPENB.ascx.vb" Inherits="vistas_CA_CALPENB" %>
<style>
    .modal {
        margin-left:0px !important;
 }

    @media (max-width:900px){
        #modal-confirmar {
            left:5% !important; 
            width:90% !important;
        }
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MOVIMIENTOS PENDIENTES A CUENTA BANCARIA</h4>
                <div class="actions">
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCuenta">
                                Cuenta Bancaria</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboCuenta" class="m-wrap span12" data-placeholder="Cuenta Bancaria"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue pull-left">FILTRAR/REFRESCAR</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" style="margin-top: 5px;" id="contenedorPendientes">
                    <div class="portlet box blue">
                        <div class="portlet-title" style="background-color: #4B8CC5;">
                            <h4><i class="icon-time"></i>PENDIENTES</h4>
                        </div>
                        <div class="portlet-body" id="pendientes">
                            <div id="divPendientes">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divAperturasCaja">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- VENTANAS MODALES-->

<div id="modal-confirmar" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;left:25%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" onclick="javascript:$('#modal-confirmar').modal('hide');$('#modalPlantilla').modal('show');" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="tituloModal">&nbsp;CONFIRMAR TRANSFERENCIA</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="contenidoModal">
                     
                <div class="row-fluid">
                    <div class="span3">
                        <label><strong>CAJA ORIGEN:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblCajaOrigen"></label>
                    </div>
                    <div class="span3">
                        <label><strong>FECHA:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblFecha"></label>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span3">
                        <label><strong>USUARIO:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblUsuario"></label>
                    </div>
                    <div class="span3">
                        <label><strong>MOVIMIENTO:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblMovimiento"></label>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span3">
                        <label><strong><span class="descMoba"></span>:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblMontoMoba"></label>
                    </div>
                    <div class="span3">
                        <label><strong><span class="descMoal"></span>:</strong></label>
                    </div>
                    <div class="span3">
                        <label id="lblMontoMoal"></label>
                    </div>
                </div>
                  <div class="row-fluid">
                    <div class="span3">
                        <label><strong>DESTINO:</strong></label>
                    </div>
                    <div class="span9">
                        <label id="lblDestino"></label>
                    </div>
                   
                </div>
                <hr  style="margin:7px 0 !important;"/>
                 <div class="row-fluid">
                   <div class="span3"></div>
                     <div class="span6">
                        <div class="control-group">
                            <label class="control-label" style="text-align:center;"><strong>NÚMERO DE OPERACIÓN</strong></label>
                            <div class="controls">
                                <input type="text" class="span12" id="txt_num_mov" style="text-align:center;color:blue;font-size:large;font-weight:bold;">
                            </div>
                        </div>

                    </div>
                    <div class="span3"></div>
                </div>
                <div class="form-actions">
                    <p style="text-align: center; font-size: 1.1em;" class="span12" id="mensajeConfirmacion">¿Está seguro de <span style="color: blue;">ACEPTAR</span> la transferencia?</p>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span4 offset2">
                    <a id="btnAceptar" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
                <div class="span4">
                    <a id="btnCancelar" href="javascript:$('#modal-confirmar').modal('hide');" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CALPENB.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALPENB.init();
    });
</script>
