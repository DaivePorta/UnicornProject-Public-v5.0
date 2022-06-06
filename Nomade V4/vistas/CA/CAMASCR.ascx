<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMASCR.ascx.vb" Inherits="vistas_CA_CAMASCR" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-calendar"></i>ASIGNACIÓN CUENTA A RENDIR</h4>
                <div class="actions">
                    <a class="btn green" href="?f=camascr"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=calascr"><i class="icon-list"></i>&nbsp;Listar</a>
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
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
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
                            <label class="control-label" for="txtempleado">
                                Datos de Empleado
                                <img id="imgCargaEmpleado" style="max-height: 15px; float: right; display: none;" src="recursos/img/loading.svg">
                            </label>

                        </div>
                    </div>

                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtempleado" name="txtempleado" class="span12 m-wrap required" placeholder="Digite Apellidos y Nombres" type="text" />
                                <input type="hidden" id="hf_pidm" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <a href="javascript:MostrarDatos();" class="btn purple"><i class="icon-question-sign"></i>&nbsp</a>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="chkactivo">
                                <input type="checkbox" id="chkactivo" name="chkactivo" checked class="m-wrap" />
                                Activo</label>
                        </div>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtglosa">
                                Glosa</label>

                        </div>
                    </div>

                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtglosa" name="txtglosa" class="span12 m-wrap required" placeholder="Ingrese Glosa" type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label for="cbomoneda" class="control-label">
                                    Moneda Precios
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="con_moneda">
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtmonto">
                                Monto</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtmonto" name="txtmonto" class="m-wrap span12 number required" onkeypress="return ValidaDecimales(event,this)" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfecasignacion">
                                Fecha Asignación</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtfecasignacion" name="txtfecasignacion" class="m-wrap span12 fecha required" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label for="txtfecha" class="control-label">
                                    Fecha Límite
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <input type="text" name="txtfecha" id="txtfecha" class="m-wrap span12 fecha required" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcentrocosto">
                                Centro de Costo</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <div class="span10">
                                    <input type="text" id="txtcentrocosto" name="txtcentrocosto" class="m-wrap span12 required centroCostos" disabled="disabled"/>
                                </div>
                                <div class="span2">
                                    <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboestado">
                                Estado</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboestado" name="cboestado" class="m-wrap span12 combo required" disabled>
                                    <option value="0001" selected>Solicitado</option>
                                    <option value="0002">Aprobado</option>
                                    <option value="0003">Pagado</option>
                                    <option value="0004">Vencido</option>
                                    <option value="0005">Rendido</option>
                                    <option value="0006">Rechazado</option>
                                    <option value="0007">Rendido Extemporáneo</option>
                                    <option value="0008">No Pagado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid detalles" style="display: none;">
                    <div class="span4">
                        <div class="portlet box green">
                            <div class="portlet-title">
                                <h4><i class="icon-legal"></i>Datos Aprobación</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Fecha</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_fecha_aprobacion" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Usuario</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_usuario_aprobacion" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="portlet box red">
                            <div class="portlet-title">
                                <h4><i class="icon-money"></i>Datos de Pago</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Fecha</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_fecha_pago" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Caja</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_caja_pago" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="portlet box grey">
                            <div class="portlet-title">
                                <h4><i class="icon-tasks"></i>Rendición</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Fecha</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_fecha_rendicion" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Caja</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_caja_rendicion" disabled class="m-wrap span12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label">
                                                Progreso</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <div class="progress progress-success active">
                                                    <div id="porcentaje" style="width: 76%;" class="bar">76%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
<script type="text/javascript" src="../vistas/CA/js/CAMASCR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        $(".combo").select2();
        CAMASCR.init();
    });
</script>
