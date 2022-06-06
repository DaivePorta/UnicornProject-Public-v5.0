<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTRIB.ascx.vb" Inherits="vistas_NC_NCMTRIB" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO DE TRIBUTOS</h4>
                <div class="actions">
                    <a id="btnNuevo" class="btn green" href="?f=NCMTRIB"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLTRIB"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <br />
                <div class="row-fluid" id="msg" style="display: none;">
                    <div class="span1"></div>
                    <div class="span10">
                        <div class="alert alert-error" id="body_msg" style="font-size: large;">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Código</label>
                            <div class="controls">
                                <input id="txt_codigo" type="text" class="span8" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Estado</label>
                            <div class="controls">
                                <div class="checker" id="uniform-chkEstado">
                                    <span class="checked">
                                        <input id="chkEstado" class="bloquear" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 0;"></span>
                                </div>
                                ACTIVO
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Tipo Tributo</label>
                            <div class="controls" id="Div6">
                                <select id="cbo_tipo_tributo" class="bloquear span10" placeholder="Selecciona tipo">
                                    <option value="1">IGV</option>
                                    <option value="2">ISC</option>
                                    <option value="3">IMPUESTO A LA RENTA</option>
                                    <option value="4">MULTAS</option>
                                    <option value="5">ESSALUD</option>
                                    <option value="6">ONP</option>
                                    <option value="7">FRACCIONAMIENTO</option>
                                    <option value="8">IES</option>
                                    <option value="9">COSTAS Y GASTOS</option>
                                    <option value="10">OTROS TRIBUTOS</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Código Tributo</label>
                            <div class="controls">
                                <input id="txt_cod_trib" type="text" class="span8" style="text-align: end;" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Código Tributo Asoc.</label>
                            <div class="controls">
                                <input id="txt_cod_trib_asoc" type="text" class="span8" style="text-align: end;" />
                            </div>
                        </div>
                    </div>

                      <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Abreviatura</label>
                            <div class="controls">
                                <input id="txtAbreviatura" type="text" maxlength="7" class="span8" style="text-align: end;" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span1"></div>


                    <div class="span7">
                        <div class="control-group">
                            <label class="control-label">Descripción</label>
                            <div class="controls" id="Div7">
                                <input id="txt_descripcion" type="text" class="span11" />
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Día Venc.</label>
                            <div class="controls">
                                <input id="txtDiaVenc" type="text" maxlength="2" class="span8" style="text-align: end;" onkeypress='return ValidaNumeros(event,this,2)' />
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Porcentaje</label>
                            <div class="controls">
                                <input id="txtPorcentaje" type="text" class="span8" maxlength="6"  style="text-align: end;" onkeypress='return ValidaDecimales(event,this,2)' />
                                %
                            </div>
                        </div>
                    </div>                                     
                         

                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMTRIB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTRIB.init();

    });
</script>
