<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALDIFE.ascx.vb" Inherits="vistas_CA_CALDIFE" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;LISTA DIFERIR EFECTIVO DE CAJA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=camdife" style="margin-top:-10px;"><i class="icon-plus"></i>&nbsp;Nuevo</a>
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
                            <label class="control-label" for="cboCaja">
                                Caja Origen</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboCaja" class="m-wrap span12" data-placeholder="Caja"></select>
                            </div>
                        </div>
                    </div>
                     <div class="span1 offset1">
                        <div class="control-group">
                            <label class="control-label" for="cboEstado">
                                Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEstado" class="m-wrap span912" data-placeholder="Estado">
                                    <option value="">TODOS</option>
                                    <option value="P" selected="selected">PENDIENTE</option>
                                    <option value="A">APROBADOS</option>
                                    <option value="R">RECHAZADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue pull-left">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
              
                <div class="row-fluid" style="margin-top: 10px;">
                    <div class="span12" id="divTabla">
                      
                    </div>                    
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMDIFE.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALDIFE.init();
    });
</script>
