<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMAFON.ascx.vb" Inherits="vistas_CA_CAMAFON" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-money"></i>ASIGNACIÓN DE FONDO FIJO A CAJAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=camafon"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=calafon"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="1" />
                <input type="hidden" id="hf_codigo" value="" />
                <div class="alert alert-error hide">
                    <button class="close" data-dismiss="alert"></button>
                    Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                </div>
                <div class="alert alert-success hide">
                    <button class="close" data-dismiss="alert"></button>
                    Datos ingresados correctamente.
                </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cbocajas">
                            Caja&nbsp;</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="con_cajas">
                                <select id="cbo_dcaja" name="cbo_dcaja" class="combo m-wrap span12 required" data-placeholder="Seleccionar Caja" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cbo_origen">
                                Tipo Origen&nbsp;</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div2">
                                <select id="cbo_origen" name="cbo_origen" class="combo m-wrap span12 required" data-placeholder="Seleccionar Caja" tabindex="1">
                                    <option value="T">TERMINAL PUNTO DE VENTA</option>
                                    <option value="C">CAJA CENTRAL</option>
                                    <option value="R">RECAUDADORA</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cbo_central">
                                Caja Central&nbsp;</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="con_caja1">
                                <select id="cbo_central" name="cbo_central" class="combo m-wrap span12 required" data-placeholder="Seleccionar Caja" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Descripción&nbsp;</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="required m-wrap span12" id="txtdescripcion" />
                            </div>
                        </div>
                    </div>

                </div>


                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label for="cbomoneda" class="control-label">
                                    Moneda
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="con_moneda">
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtmonto">
                                Monto</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtmonto" name="txtmonto" value="0.00" class="m-wrap span12 number required" onkeypress="return ValidaDecimales(event,this)"/>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/CA/js/CAMAFON.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMAFON.init();
    });
</script>
