<%@ Control Language="VB" AutoEventWireup="false" CodeFile="OPMOPER.ascx.vb" Inherits="vistas_OP_OPMOPER" %>

<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />

<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO DE OPERACIONES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=OPMOPER"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=OPLOPER"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="caja">
                <div class="row-fluid">
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtcodeOP">
                                    CODIGO</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" disabled="disabled" class="span12 m-wrap" id="txtcodeOP" placeholder="CODIGO" style="text-transform: uppercase" />
                                </div>
                            </div>
                        </div>

                        <%--<div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc2">
                                    Indicadores</label>
                            </div>
                        </div>--%>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkEstadoOperacion" checked /><span> Activo</span>
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkMostrar" checked /><span> Mostrar</span>
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkProcesosInt" /><span> Proceso Int.</span>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkGenAsiento" checked /><span> Gen Asiento.</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtdesc">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 m-wrap" id="txtdesc" placeholder="Nombre de Operación" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtTipoOp">
                                    Tipo de Operación</label>
                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12 m-wrap combo" id="cboTipoOp" data-placeholder="Tipo de Operación">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnNuevo" class="btn tooltips purple" data-original-title="Crear Nuevo Tipo Operación"><i class="icon-plus-sign" style="line-height: initial;"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtValorMin">
                                    Tipo de Persona</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboTipoPersona" class="m-wrap combo span12" placeholder="Tipo de Persona">
                                        <option value=""></option>
                                        <option value="A">Ambos Tipos</option>
                                        <option value="N">Persona Natural</option>
                                        <option value="J">Persona Jurídica</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="chkDocumento">
                                    Asignar Documento</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <div class="danger-toggle-button-custom">
                                        <input type="checkbox" id="chkDocumento" class="toggle" checked />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="span4" id="divDocumento">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboDocumentoItem" class="m-wrap combo span12" placeholder="Seleccionar">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>

                    <hr />

                    <div class="row-fluid">
                        <div class="span4">
                            <h4>Generación Automática de Deuda:</h4>
                        </div>

                        <div class="span2" id="">
                            <div class="control-group ">
                                <div class="controls">
                                    <div class="danger-toggle-button-custom">
                                        <input type="checkbox" id="chkAutomatica" class="toggle" checked />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div class="row-fluid" id="divAutomatica">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboPeriodicidad">
                                    Periodicidad</label>

                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPeriodicidad" class="span12 m-wrap combo" data-placeholder="Seleccionar Periodicidad">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1"></div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtPlazo">
                                    Plazo Máx</label>

                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <input type="text" onkeypress="return ValidaNumeros(event,this);" id="txtPlazo" value="0" class="m-wrap span12" />
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPlazo" class="span12 m-wrap combo" data-placeholder="Seleccionar Plazo">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr />

                    <div class="row-fluid">
                        <div class="span4">
                            <h4>Configuración de Montos por Moneda</h4>
                        </div>
                    </div>

                    <br />

                    <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboMoneda">
                                    Moneda
                                </label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboMoneda" class="span12 m-wrap combo" placeholder="Seleccionar Moneda">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtValorMin">
                                    Valor Minimo</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtValorMin" style="text-align:center;" value="0" class="span12 m-wrap" placeholder="0.00" onkeypress="return ValidaDecimales(event,this,2);" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtValorMax">
                                    Valor Maximo</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtValorMax" style="text-align:center;" value="0" class="span12 m-wrap" placeholder="0.00" onkeypress="return ValidaDecimales(event,this,2);" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <button type="button" id="btnAgregarMoneda" class="btn green"><i class="icon-plus"></i> &nbsp Agregar</button>    
                        </div>

                    </div>

                    <div class="row-fluid">
                        <div class="span9" style="background-color:cornsilk;">
                            <table id="tblMontosMoneda" class="table table-bordered">
                            <thead>
                                
                                <tr>
                                    <th style="text-align:center">Tipo de Moneda</th>
                                    <th style="text-align:center">Valor Mínimo</th>
                                    <th style="text-align:center">Valor Máximo</th>
                                    <th style="text-align:center">Quitar</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                    <br />

                    <hr />

                    <div class="row-fluid">
                        <div class="span4">
                            <h4>Configuración de Estados de Socio</h4>
                        </div>
                    </div>

                    <br />

                    <div class="row-fluid">

                        <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboEstado">Seleccionar Estado</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select class="span10 m-wrap combo" id="cboEstado" data-placeholder="Seleccionar Estado">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                      
                        <div class="span2">
                            <button type="button" id="btnAgregarEstado" class="btn green"><i class="icon-plus"></i> &nbsp Agregar</button>    
                        </div>

                    </div>

                    <div class="row-fluid">
                        <div class="span9" style="background-color:cornsilk;">
                            <table id="tblEstados" class="table table-bordered">
                            <thead>
                                
                                <tr>
                                    <th style="text-align:center">Estado de Socio</th>
                                    <th style="text-align:center">Quitar</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        </div>
                    </div>

                    <div class="form-actions">
                        <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                        <a id="btnActualizar" class="btn blue" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                        <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
        <div>

            <a href="javascrip:"></a>
            <input type="hidden" id="hfCOD_TIOP" />
            <input type="hidden" id="hfCOD_OP" />
            <input type="hidden" id="hfCOD_OP_DP" />


            <input type="hidden" id="hfCOD_CAJA" />
            <input type="hidden" id="hfPIDMRESP" />
            <input type="hidden" id="hfID_CAJERO" />
        </div>

    </div>

    </div>
    <script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
    <script type="text/javascript" src="../vistas/OP/js/OPMOPER.js"></script>
    <script>
        jQuery(document).ready(function () {
            OPMOPER.init();
        });
    </script>
