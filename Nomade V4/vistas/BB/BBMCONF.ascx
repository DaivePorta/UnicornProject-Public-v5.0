<%@ Control Language="VB" AutoEventWireup="false" CodeFile="BBMCONF.ascx.vb" Inherits="vistas_BB_BBMCONF" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACÍON DE SISTEMA PENSIONES</h4>

                <div class="actions">
                    <a href="javascript:Nuevo();" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=BBLCONF" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">CÓDIGO</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" type="text" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipo">TIPO DE DATO</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipo" style="width: 75%;">
                                    <option value="0">PORCENTAJE</option>
                                    <option value="1">MONETARIO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>


                    <%--  <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigoSunat">Código de Sunat</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigoSunat" type="text" class="span12" maxlength="6" />
                            </div>
                        </div>
                    </div>--%>

                    <%-- <div class="span2">
                        <div style="text-align: center;">
                            <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />Activo
                        </div>
                    </div>
                    <div class="span3">
                    </div>--%>
                </div>
                <!-- FIN PRIMERA LINEA -->
                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtPadre">GRUPO</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboParemetro" style="width: 65%;" onchange="javascript:Listar_Concepto();">
                                </select>
                                <h6 style="color: green">*Recuerde para tener un grupo de dos columnas o más deben estar juntas,además ambas deben contener el mismo nombre en el campo grupo.</h6>
                                <h6 style="color: green">*Recuerde que cada vez que genere o actualice configuración, se volvera a generar las comisiones del periodo modificado.</h6>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">PERIODO</label>
                        </div>
                    </div>

                   <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span10" style="width: 75%;" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span10" style="width: 75%;" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                                
                            </div>
                        </div>                      
                    </div>

                </div>

                <div class="row-fluid">
                    <!-- INICIO NOMBRE -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                DESCRIPCIÓN</label>

                        </div>
                    </div>
                    <!-- FIN NOMBRE -->
                    <!-- INICIO FECHA -->
                    <%--disabled="disabled"--%>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input id="hfColumna" type="hidden" />
                                <input id="hfEstado" type="hidden" />
                                <input id="hfPeriodo" type="hidden" />
                                <input id="hfEmpresa" type="hidden" />
                                <select id="cboConcepto" style="width: 65%;">
                                </select>
                                <br />
                                <h6 style="color: green">*Recuerde que la descripción son los conceptos registrados con el código inicial 0600 del grupo.</h6>

                            </div>
                        </div>
                    </div>

                    <!-- FIN FECHA -->
                </div>
                <%--<div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Desde</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span8" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Hasta</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="Text1" name="optanho">
                                <input class="span8" type="text" id="Text2" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                </div>--%>
                <!-- FIN SEGUNDA LINEA -->

                <!-- INICIO TERCERA LINEA -->

                <div class="row-fluid">

                       <div class="span2"></div>
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cbAFP">AFP</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="checkbox" class="span12" id="cbAFP" checked="checked" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cbONP">ONP</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="checkbox" class="span12" id="cbONP" checked="checked" />
                                <%--name="activo" checked="checked" value="A"--%>
                            </div>
                        </div>
                    </div>


               
                </div>

                <div class="row-fluid">

                       <div class="span2"></div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboEstado">ACTIVO</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="checkbox" class="span12" id="cboEstado" checked="checked" />
                               
                            </div>
                        </div>
                    </div>
                </div>



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a href="javascript:Nuevo();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>

            </div>

        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/BB/js/BBLCONF.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        BBMCONF.init();

    });
</script>
