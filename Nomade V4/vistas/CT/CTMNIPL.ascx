<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMNIPL.ascx.vb" Inherits="vistas_CT_CTMNIPL" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />

<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ESTRUCTURA DE PLAN CONTABLE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ctmnipl"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=ctlnipl"><i class="icon-list"></i> Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodPlanContable">Código</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtCodPlanContable" class="span12 centro" disabled/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <label class="control-label" for="chboEstado">
                                    <input id="chboEstado" type="checkbox" checked/>Activo
                                </label>
                            </div>
                        </div>
                    </div>
                                     
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <label class="control-label" for="chboPredeterminado">
                                    <input id="chboPredeterminado" type="checkbox"/>Predeterminado
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaIni">F. Inicio</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtFechaIni" class="span12 centro" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled/>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaFin">F. Fin</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtFechaFin" class="span12 centro" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled/>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoPlanCuenta">Tipo</label>
                        </div>
                    </div>
                    
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoPlanCuenta" class="span12 combobox" data-placeholder="Tipo Plan Contable">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNombrePlanContable">Nombre</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNombrePlanContable" class="span12" type="text" placeholder="Nombre Plan Contable" maxlength="120" />
                            </div>
                        </div>
                    </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNroNiveles">Niveles</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNroNiveles" class="span12 derecha" onkeypress="return ValidaNumeros(event,this)" value="0"/>
                                </div>
                            </div>
                        </div>
                    <div class="span6">       
                    </div>
                </div>

                <div class="row-fluid">
                    <div id="divNiveles" class="span12">

                    </div>
                </div>

                
                <div class="row-fluid CtaDestino" style="visibility:hidden">
                    <div class="span12">
                        <h4>Replicación de Cuentas por el Tercer Dígito</h4>
                    </div>
                </div>

                <div class="row-fluid" style="visibility:hidden">
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <label class="control-label" for="chboReplicaCrea">
                                        <input id="chboReplicaCrea" type="checkbox"/>Replicar Creación
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="span1"></div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboReplicaCrea" class="span12 m-wrap comboboxmulti" multiple>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtReplicaCrea" class="span12 derecha" placeholder="DIGITOS" disabled/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div class="span6">
                        <div class="span3">
                            <div class="control-group ">
                                <div class="controls">
                                    <label class="control-label" for="chboReplicaEdita">
                                        <input id="chboReplicaEdita" type="checkbox"/>Replicar Edición
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="span1"></div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboReplicaEdita" class="span12 m-wrap comboboxmulti" multiple >
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtReplicaEdita" class="span12 derecha" placeholder="DIGITOS" disabled/>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i> Grabar</a>
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
    </div>
    </div>
</div>
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMNIPL.js"></script>
<script>
    jQuery(document).ready(function () {
        CTMNIPL.init();
        
    });
</script>