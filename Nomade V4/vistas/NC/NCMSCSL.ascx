<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMSCSL.ascx.vb" Inherits="vistas_NC_NCMSCSL" %>
<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ESTABLECIMIENTO</h4>
                <div class="actions">
                    <a href="?f=ncmscsl" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nclscsl" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Código</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span9">
                        <div class="span3 offset1">
                            <div class="control-group ">
                                <label class="control-label">Código Establecimiento Sunat</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="txtcodsunat" class="span12" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="span1 offset1">
                            <label>Estado</label>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="chkactivo" type="checkbox" checked />
                                    Activo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="controlempresa">
                            </div>
                        </div>
                    </div>
                    <div class="span1 offset1" align="right" id="EXO_control">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkExo" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="span2" id="EXO_lbl">
                        <label>Establecimiento Exonerado de Impuesto</label>
                    </div>
                </div>
                <!-------->

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Establecimiento </label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtsucursal" placeholder="SUCURSAL" class="span12" type="text" />
                            </div>
                        </div>
                    </div>

                </div>
                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Dirección</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtdireccion" class="span12" placeholder="DIRECCION" type="text" maxlength="250" />
                            </div>
                        </div>
                    </div>
                    <div class="span2 offset1">
                        <div class="control-group ">
                            <label>Tipo Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls" id="controlestablecimiento">
                            </div>
                        </div>
                    </div>
                </div>

                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Teléfono</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txttelefono" class="span12" placeholder="TELEFONO" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2 offset1">
                        <div class="control-group ">
                            <label>País</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls" id="controlpais">
                                <select id="slcpais" class="span12 combo" data-placeholder="PAIS">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Ubigeo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtubigeo" class="span12" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls" id="controldepartamento">
                                 <select id="slcdepa" class="span12  combo" data-placeholder="DEPARTAMENTO" disabled>
                                  <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls" id="controlprovincia">
                                 <select id="slcprov" class="span12  combo" data-placeholder="PROVINCIA" disabled>
                                   <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls" id="controldistrito">
                                <select id="slcdist" class="span12  combo" data-placeholder="DISTRITO" disabled>
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="span3"></div>
                </div>
                <!-------->
                <div class="row-fluid">
                     <div class="span2">
                        <div class="control-group ">
                            <label>Urbanizacion</label>
                        </div>
                    </div>

                     <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtUrba" placeholder="Urbanizacion" class="span12" type="text" />
                            </div>
                        </div>
                    </div>
                <div class="span5">
                    <div class="control-group ">
                        <div class="controls">
                            <input id="chkPiePagina" type="checkbox"/>
                            Pie de Pagina en Recibos
                        </div>
                    </div>
                </div>

                 </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechai">Fecha Inicio</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechai" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span1"></div>

                    <div class="span2">
                        <div class="control-group ">
                            <label>Fecha Término</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechat" placeholder="dd/mm/yyyy" disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="RRHH">
                    <div class="row-fluid">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="" style="font-weight: bold; font-size: medium; margin-left: 0px">
                                    DATOS RRHH:</label>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="chkBiometrico" style="text-align: right;">
                                        Biométrico:</label>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chkBiometrico" type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-------->
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>

                <input id="_estados" type="hidden" value="" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<script type="text/javascript" src="../vistas/NC/js/NCSCSL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCSCSL.init();
    });
</script>
