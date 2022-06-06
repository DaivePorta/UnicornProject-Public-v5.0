<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLCORP.ascx.vb" Inherits="vistas_NV_NVLCORP" %>
<style>
    .center {
        text-align:center;
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>COMPROBANTES DE RETENCION PENDIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NVLCORP" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
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


                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" >
                                    Periodo Declaración</label>
                            </div>
                        </div>


                        <div class="span3">
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input class="span12 center" data-date-format="yyyy" type="text" id="txtanio" name="txtanio" placeholder="Año">
                                    </div>
                                </div>
                            </div>

                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input class="span12 center" type="text" id="cboMes" data-date-format="MM" aria-disabled="true" name="cboMes" placeholder="Mes">
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="span1">
                            <a id="btnBuscarDctoOrigen" class="btn blue" ><i class="icon-search"></i>&nbsp</a>
                        </div>
                      
                    </div>
                </div>

                <%--<div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Comprobante Retención</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigoAutorizacion" type="hidden" />
                                <input class="numeros span4 center" id="txtSerie" type="text" placeholder="Serie" maxlength="5" />
                                <input class="numeros span8 center" id="txtNro" type="text" style="text-align: center;" placeholder="Nro." maxlength="15" />

                            </div>
                        </div>
                    </div>

                    <div class="span2 offset1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmision">
                                Fec. Emisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker center" placeholder="dd/mm/yyyy" id="txtFechaEmision" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>


                </div>


                <div class="row-fluid">
                    <div class="span12" id="div_mas_dctoreg_0" style="margin-left: 0">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboDctoOrigen">
                                    Doc. Origen</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodAut" type="hidden" />
                                    <input id="txtCodDctoOrigen_1" class="txtCodDctoOrigen inputOrigen" type="hidden" />
                                    <input id="txtSerieDctoOrigen_1" class="txtSerieDctoOrigen inputOrigen numeros span4 center" type="text" disabled placeholder="Serie"/>
                                    <input id="txtNroDctoOrigen_1" class="txtNroDctoOrigen inputOrigen numeros span8 center" type="text" disabled style="margin-left: -2px;" placeholder="Nro." />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnBuscarDctoOrigen" class="btn blue buscar"><i class="icon-search" style="line-height: initial;"></i></a>
                                </div>
                            </div>
                        </div>
                          <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMonto">
                                Monto Retención <span class="simboloMoneda"></span></label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMontoRetencion" class="span12" type="text" disabled style="text-align: right;" />
                            </div>
                        </div>
                    </div>

                    </div>
                </div>--%>


                <div class="row-fluid">                  
                    <div class="span12" id="divTblBuscarDcto"></div>
                </div>


                <%--<div class="form-actions">
                    <a id="grabar" class="btn blue"><i class=" icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" onclick="javascript:Cancelar();"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>--%>
            </div>
        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVMCOMR.js"></script>
<script>
    jQuery(document).ready(function () {
        NVMCOMR.init();
        $("#btnBuscarDctoOrigen").click();
    });
</script>
