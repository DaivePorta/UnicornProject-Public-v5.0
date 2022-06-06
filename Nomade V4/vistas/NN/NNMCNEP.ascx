<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMCNEP.ascx.vb" Inherits="vistas_NN_NNMCNEP" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ASIGNACION CONCEPTO EMPLEADO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NNMCNEP"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nnlcnep"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">
                </div>
                <!-- FIN PRIMERA LINEA -->



                <div class="row-fluid">

                    <div class="span5" id="div_concepto">
                        <div class="portlet box red">
                            <div class="portlet-title">
                                <h4>Paso 1 : Selecciona Concepto</h4>
                            </div>
                            <div class="portlet-body">

                                <div class="row-fluid" id="div_empleado_carg_inicial">
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_tipo_planilla">
                                                Tipo Planilla</label>

                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_tipo_planilla" class="span12" data-placeholder="Tipo Planilla">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_concepto">
                                                Concepto</label>

                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_concepto" class="span12" data-placeholder="Concepto">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span9"></div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkestado">
                                                <div class="checker" id="uniform-chkestado">
                                                    <span class="checked">
                                                        <input type="checkbox" id="chkestado" name="chkestado" checked="" class="m-wrap" style="opacity: 0;"></span>
                                                </div>
                                                Activo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_monto">
                                                Monto(S/.)</label>

                                        </div>
                                    </div>
                                    <div class="span5">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txt_monto" class="m-wrap span12" type="text" placeholder="Monto" onkeypress="return ValidaDecimales(event,this)">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_inicio">
                                                Temporalidad</label>

                                        </div>
                                    </div>

                                </div>
                                <div class="row-fluid">
                                    <div class="span3"></div>

                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label">
                                                    <div class="radio" id="uniform-rbtipo_mes">
                                                        <span class="">
                                                            <div class="radio" id="Div2">
                                                                <span>
                                                                    <div class="radio" id="Div3">
                                                                        <span class="checked">
                                                                            <input type="radio" checked="checked" class="radio span12" name="tipo" id="rbtipo_mes" style="opacity: 0;" value=""></span>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    Eventual
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label">
                                                    <div class="radio" id="uniform-rbtipo_indefinido">
                                                        <span class="">
                                                            <div class="radio" id="Div14">
                                                                <span>
                                                                    <div class="radio" id="Div15">
                                                                        <span class="checked">
                                                                            <input type="radio" checked="" class="radio span12" name="tipo" id="rbtipo_indefinido" style="opacity: 0;" value=""></span>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    Mensual
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label class="control-label">
                                                    <div class="radio" id="uniform-rbtipo_rango">
                                                        <span class="">
                                                            <div class="radio" id="Div11">
                                                                <span>
                                                                    <div class="radio" id="Div12">
                                                                        <span class="checked">
                                                                            <input type="radio" checked="" class="radio span12" name="tipo" id="rbtipo_rango" style="opacity: 0;" value=""></span>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    Rango
                                                </label>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <br />
                                <div class="row-fluid">
                                    <div class="span3"></div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="optmes">
                                                Inicio</label>

                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes" placeholder="MES">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">

                                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho" placeholder="AÑO">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <a class="btn red" id="btn_limpia_fecini" style="border-radius: 4px !important;"><i class="icon-remove"></i></a>
                                    </div>

                                </div>
                                <div class="row-fluid" id="div_fin_fecha" style="display:none;">
                                    <div class="span3"></div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_mes">
                                                Fin</label>

                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input class="span10" type="text" id="txt_mes" data-date-format="MM" aria-disabled="true" name="optmes" placeholder="MES">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">

                                                <input class="span10" data-date-format="yyyy" type="text" id="txt_anho" name="optanho" placeholder="AÑO">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <a class="btn red" id="btn_limpia_fecfin" style="border-radius: 4px !important;"><i class="icon-remove"></i></a>
                                    </div>


                                </div>
                                <div class="row-fluid" style="text-align: right;">

                                    <button id="btn_sgt_paso" type="button" class="btn red"><i class="icon-chevron-right"></i>&nbsp;SIGUIENTE PASO</button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="span7" id="divadd_empl">
                        <div class="portlet box green">
                            <div class="portlet-title">
                                <h4>Paso 2 : Asignar Empleados</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="slcEmpresa">
                                                Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls" id="controlempresa">
                                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                                    <option></option>
                                                </select>
                                                <asp:HiddenField ID="hfempresa" runat="server" />
                                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="slcSucural">
                                                Establecimiento</label>
                                        </div>
                                    </div>
                                    <div class="span7">
                                        <div class="control-group">
                                            <div class="controls" id="Div1">
                                                <select id="slcSucural" class="bloquear combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                                    <option></option>
                                                </select>
                                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span8"></div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label" for="chkactivo">
                                                <div class="checker" id="uniform-chkactivo">
                                                    <span>
                                                        <input type="checkbox" id="chkactivo" name="chkactivo" checked="" class="m-wrap" style="opacity: 0;"></span>
                                                </div>
                                                TODOS EMPLEADOS</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_empleado">
                                                Empleado</label>

                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group ">
                                            <div class="controls" id="input_empl">
                                                <input id="txt_empleado" class="span12" type="text" placeholder="Empleado" disabled="disabled"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <a id="add" class="btn green" style="border-radius: 5px!important; margin-left: -11px;">V</a>

                                    </div>

                                </div>

                                <div class="row-fluid" id="tabla">
                                    <div class="span12">
                                        <table id="tblconp_planilla" class="table table-bordered" style="height: 50px;">
                                            <thead style="background-color: rgb(53, 170, 71); color: aliceblue;">
                                                <tr>
                                                    <th>EMPLEADO
                                                    </th>
                                                    <th style="display: none;">PIDM
                                                    </th>
                                                    <th style="display: none;">CTLG
                                                    </th>
                                                    <th style="display: none;">SCSL
                                                    </th>
                                                    <th>#
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br />
                                <div class="row-fluid" style="text-align: right;">

                                    <button id="btn_regresar" type="button" class="btn green"><i class="icon-chevron-left"></i>&nbsp;PASO ANTERIOR</button>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>

                <!--  TERCERA LINEA -->






                <!-- FIN TERCERA LINEA -->


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->
<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfnombre" />
<input type="hidden" id="hfctlg_code" />
<input type="hidden" id="hfscsl_code" />
<input type="hidden" id="hfcn_planilla" />
<input type="hidden" id="hfcodigo_asig" />
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NN/js/NNMCNEP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMCNEP.init();
        $('#uniform-chkactivo span').removeClass();
        $('#chkactivo').attr('checked', false);

    });


</script>

