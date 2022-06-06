<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVMCOMR.ascx.vb" Inherits="vistas_NV_NVMCOMR" %>
<style>
    .center {
        text-align: center;
    }
</style>
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
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>COMPROBANTE RETENCION</h4>
                <div class="actions">

                    <a href="?f=NVMCOMR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NVLCOMR" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="b span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Periodo Declaración</label>
                            </div>
                        </div>

                          <div class="span3" id="div_periodo">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <select id="cbo_periodo" class="b  span12 m-wrap" placeholder="Selecciona Periodo">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                     <%--   <div class="span3">
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
                        </div>--%>

                    </div>
                </div>



                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Emisor</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="inputEmisor">

                                <input class="b span12" id="txt_emisor" type="text" placeholder="Emisor" />

                            </div>
                        </div>
                    </div>
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
                                <input class="b numeros span4 center" id="txtSerie" type="text" placeholder="Serie" maxlength="5" />
                                <input class="b numeros span8 center" id="txtNro" type="text" style="text-align: center;" placeholder="Nro." maxlength="15" />

                            </div>
                        </div>
                    </div>




                </div>
                 <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmision">
                                Fec. Emisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="b span12 date-picker center" placeholder="dd/mm/yyyy" id="txtFechaEmision" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaEmision" style="text-align:right;">
                                T/C Oficial</label>
                        </div>
                    </div>
                    <div class="span2" id="div_tc_o">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lbl_TC_Oficial" style="font-size: large; color: blue">-</label>
                            </div>
                        </div>
                    </div>

                </div>


              <%--  <div class="row-fluid">
                   
                </div>--%>


                <div class="row-fluid" id="div_generador">
                     <div class="span12" id="div_1" style="margin-left: 0">
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
                                    <input id="txtSerieDctoOrigen_1" class="txtSerieDctoOrigen inputOrigen numeros span4 center" type="text" disabled placeholder="Serie" />
                                    <input id="txtNroDctoOrigen_1" class="txtNroDctoOrigen inputOrigen numeros span8 center" type="text" disabled style="margin-left: -2px;" placeholder="Nro." />
                                </div>
                            </div>
                        </div>
                        <div class="span2" id="div_botones">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnBuscarDctoOrigen" class="btn blue buscar"><i class="icon-search" style="line-height: initial;"></i></a>
                                    <a id="btn_add" class="btn green add"><i class="icon-plus" style="line-height: initial;"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtMontoRetencion" class="txtMontoRetencion span8" type="text" disabled style="text-align: right;" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span5"></div>
                    <div class="span2">
                        <label style="text-align: right; font-size: large; margin-top: 6px;">TOTAL (S/.)</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMontoTotal" value="0.00" class="txtMontoTotal span8" type="text" disabled="" style="text-align: right; background-color: aliceblue;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                       <div class="span5"></div>
                      <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="chk_ajuste"  style="text-align:right;">
                                    <div class="checker" id="uniform-chk_ajuste">
                                        <span class="">
                                            <input type="checkbox" id="chk_ajuste" name="chk_ajuste" class="b " style="opacity: 0;" ></span>
                                    </div>
                                    AJUSTE</label>
                            </div>
                        </div>
                     <div class="span2 ajuste" style="display:none">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_ajuste"  class="b span8 ajuste" type="text"  style="text-align: right;" onkeypress="return ValidaDecimales(event,this,3,true)" >  
                             
                            </div>
                        </div>
                    </div>
                </div>

                     <div class="row-fluid ajuste" style="display:none">
                    <div class="span5"></div>
                    <div class="span2">
                        <label style="text-align: right; font-size: large; margin-top: 6px;">=</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_total_ajuste" value="0.00" class="span8" type="text" disabled="" style="text-align: right; background-color: aliceblue;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue"><i class=" icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" onclick="javascript:Cancelar();"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="modalBuscarDcto" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 40%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalBuscarDcto_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divTblBuscarDcto">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <h5 class="text-right">Clic en un documento para seleccionarlo</h5>
    </div>
</div>

<input  type="hidden" id="hfTCO"/>
<input  type="hidden" id="hfPIDM"/>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVMCOMR.js"></script>
<script>
    jQuery(document).ready(function () {
        NVMCOMR.init();
    });
</script>
