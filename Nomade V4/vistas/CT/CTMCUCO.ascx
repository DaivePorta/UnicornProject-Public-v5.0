<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMCUCO.ascx.vb" Inherits="vistas_CT_CTMCUCO" %>
<link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
<style type="text/css">
    .select2-container {
        height: 40px;
    }
    ul.list-group{
        margin-left:0px;
    }

</style>

   <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
   <link rel="stylesheet" href="../../recursos/plugins/jqwidgets/styles/jqx.bootstrap.css" type="text/css" />
   <link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CTMCUCO"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=CTLCUCO"><i class="icon-list"></i> Listar</a>
                </div>
            </div>

            <div class="portlet-body">     
                
                <%-- Inicio Fila2 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboPlanContable">Plan Cont.</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboPlanContable" class="span12 ComboBox" data-placeholder="Plan Contable">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtTipoPlan">Tipo Plan</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtTipoPlan" class="span12" disabled="disabled" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%-- Fin Fila2 --%>     
                           
                <%-- Inicio Fila4 --%>
                <div class="portlet box grey" id="planCont">
                    <div class="portlet-title">
                        <h4>
                            <i class="icon-sitemap"></i>
                            Plan Contable
                        </h4>
                        <div class="actions">
                            <button id="btnNuevo" class="btn green"> <i class="icon-plus"></i> Crear Nuevo</button>
                            <button id="btnEditar" class="btn yellow"> <i class="icon-pencil"></i> Editar</button>
                            <button id="btnCancelar2" class="btn cancelar"> <i class="icon-remove"></i> Cancelar</button>
                        </div>
                    </div>
                    <div class="portlet-body">
                        
                        <div class="row-fluid">
                            
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">

                                            <div class="span2">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboPlanContable">Estado</label>
                                                </div>
                                            </div>
                                            <div class="span3">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboEstado" class="span12 ComboBox" data-placeholder="Plan Contable">
                                                            <option value="">TODOS</option>
                                                            <option value="A" selected>ACTIVO</option>
                                                            <option value="I">INACTIVO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span1">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <a id="btnlistarpc" class="btn black"><i class="icon-search" style="line-height: initial;"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                                                                                                                  
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFiltraCtas">Buscar</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group ">
                                            <div class="controls">
                                                <input id="txtFiltraCtas" class="span12 " type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="PlanContab" class="row-fluid" >                                       
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <div id="treeCuentas" class="treeview">
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row-fluid" >
                                    <div class="span12">
                                        <div class="control-group">
                                            <label id="lblNroCtas" class="control-label" style="font-weight:bold;text-align:right;"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="DetCuenta" class="span6">

                                <div id="DatosDetCuenta" class="row-fluid">
                                    <div class="span12">                    
                                        
                                        <%-- Inicio Fila10 --%>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <h4>Detalle de la Cuenta</h4>
                                            </div>
                                        </div>
                                        <%-- Fin Fila10 --%>

                                        <%-- Inicio Fila9 --%>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="row-fluid">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cboClaseCuenta">Clase Cuenta</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtNumeracion" class="span12" disabled="disabled" type="text" style="text-align:right"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                    
                                                    <div class="span6">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cboClaseCuenta" class="span10 ComboBox" data-placeholder="Clase Cuenta" disabled="disabled">
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila9 --%>

                                        <%-- Inicio Fila3-1 --%>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="row-fluid">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtCuentaPadre">Cod Padre</label>
                                                        </div>
                                                    </div>

                                                    <div class="span6">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtCuentaPadre" class="span12" type="text" placeholder="Código" maxlength="50"  disabled="disabled"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="span4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila3-1 --%>

                                        <%-- Inicio Fila3-1 --%>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="row-fluid">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtCuenta">Código</label>
                                                        </div>
                                                    </div>

                                                    <div class="span6">
                                                        <div class="control-group">
                                                            <div id="divcuenta" class="controls">
                                                                <input id="txtCuenta" class="span12" type="text" placeholder="Código" maxlength="50" onkeypress="return ValidaNumeros(event,this)"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <%--<div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls input-append">
                                                                <span class="add-on">$</span>
                                                                <input type="text" id="txtHaberMN" class="span12 m-wrap moneda-nacional" onkeypress="return ValidaDecimales(event,this,2);" 
                                                                    placeholder="MONTO-ME" style="text-align:right" value="0" disabled/>
                                                            </div>
                                                        </div>
                                                    </div>--%>

                                                    <div class="span1"></div>

                                                    <%--<div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtNivel">Nivel</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input type="text" id="txtNivel" class="span12" disabled="disabled" />
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila3-1 --%>

                                        <%-- Inicio Fila3-2 --%>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <div class="row-fluid">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtDescripcion">Descripción</label>
                                                        </div>
                                                    </div>
                                                    <div class="span10">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtDescripcion" class="span12" type="text" placeholder="Descripción" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila3-2 --%>

                                        <%-- Inicio Fila3-2 --%>
                                        <div class="row-fluid Bloquear">
                                            <div class="span12">
                                                <div class="row-fluid">                                                                                                       
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtFechaIni">Fecha Inicio</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtFechaIni" class="span12 centro" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="span3" style="text-align:right;">
                                                        <div class="control-group">
                                                            <label class="control-label" for="cboClasificacionCuenta">Clasificación Cuenta</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cboClasificacionCuenta" class="span12 ComboBox" data-placeholder="Clasificación Cuenta">
                                                                    <option value=""></option>
                                                                    <option value="C">CORRIENTE</option>
                                                                    <option value="NC">NO CORRIENTE</option>
                                                                    <option value="NB">NO BALANCE</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila3-2 --%>
                
                                        <%-- Inicio Fila6 --%>
                                        <div class="row-fluid Bloquear">
                                            <div class="span12">
                                                <div class="row-fluid">

                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label" for="chboTipoCambio">Tipo Cambio</label>
                                                        </div>
                                                    </div>

                                                    <div class="span2">
                                                        <div class="control-group ">
                                                            <div class="controls">
                                                                <div class="danger-toggle-button-custom">
                                                                    <input id="chboTipoCambio" type="checkbox" class="toggle" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                   <%-- <div class="span1">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="chboTipoCambio" type="checkbox" />
                                                            </div>
                                                        </div>
                                                    </div>--%>

                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <select id="cboTipoCambio" class="span12 ComboBox" data-placeholder="Tipo Cambio" disabled>
                                                                    <option value=""></option>
                                                                    <option value="C">COMPRA</option>
                                                                    <option value="V">VENTA</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                        
                                                    <div class="span2" style="text-align:right">
                                                        <div class="control-group">
                                                            <label class="control-label" for="txtFechaFin">Fecha Fin</label>
                                                        </div>
                                                    </div>
                                                    <div class="span3">
                                                        <div class="control-group">
                                                            <div class="controls">
                                                                <input id="txtFechaFin" class="span12 centro" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"  disabled="disabled"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila6 --%>
                
                                        <%-- Inicio Fila7 --%>
                                        <div class="row-fluid Bloquear">
                                            <div class="span12">
                                                <div class="row-fluid">
                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label">
                                                                Usa Centro Costo</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group ">
                                                            <div class="controls">

                                                                <div class="danger-toggle-button-custom">
                                                                    <input id="chboCentroCosto" type="checkbox" class="toggle" />
                                                                </div>


                                                                <%--<label class="control-label" for="chboCentroCosto">
                                                                    <input id="chboCentroCosto" type="checkbox" checked/>Usa Centro Costo
                                                                </label>--%>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="span1">
                                                        <div class="control-group">
                                                            <label class="control-label">
                                                                Estado</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group ">
                                                            <div class="controls">

                                                                <div class="danger-toggle-button-custom">
                                                                    <input id="chboEstado" type="checkbox" class="toggle" />
                                                                </div>

                                                                <%--<label class="control-label" for="chboEstado">
                                                                    <input id="chboEstado" type="checkbox" checked/>Estado
                                                                </label>--%>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="span2">
                                                        <div class="control-group">
                                                            <label class="control-label">
                                                                Genera Destino</label>
                                                        </div>
                                                    </div>
                                                    <div class="span2">
                                                        <div class="control-group ">
                                                            <div class="controls">

                                                                <div class="danger-toggle-button-custom">
                                                                    <input id="chboDestino" type="checkbox" class="toggle" />
                                                                </div>

                                                                <%--<label class="control-label" for="chboEstado">
                                                                    <input id="chboEstado" type="checkbox" checked/>Estado
                                                                </label>--%>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <%-- Fin Fila7 --%> 
                                        <br />
                                        <div id="ctaDestino" style="display:none">
                                            <div class="row-fluid">
                                                <div class="span12">
                                                    <h4>Asientos Contables Destino</h4>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="span2">
                                                    <span id="addrowprop" class="btn green no-display"><i class="icon-plus"></i></span>
                                                    <span id="delrowprop" class="btn red no-display"><i class="icon-minus"></i></span>
                                                </div>

                                               <%-- <div class="span2">
                                                    <div class="control-group">
                                                        <label class="control-label" for="chboTipoCambio">Tipo Cambio</label>
                                                    </div>
                                                </div>--%>
                                                <div class="span4">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <select id="cboCtaContable" class="span12 combobox" data-placeholder="Seleccionar Cuenta">
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span1">
                                                    <div class="control-group">
                                                        <label class="control-label" for="cboPorcentaje">Porcentaje</label>
                                                    </div>
                                                </div>
                                                <div class="span2">
                                                    <div class="control-group">
                                                        <div class="controls">
                                                            <input type="text" class="span12" id="txtPorcentaje" value="0" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="span3">
                                                    <div class="control-group ">
                                                        <div class="controls">
                                                            <div class="danger-toggle-button-custom-2">
                                                                <input id="chboDebeHaber" type="checkbox" class="toggle" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div  class="span12">
                                                    <table id="tblCtasDestino" class="display DTTT_selectable" border="0">
                                                        <thead>
                                                            <tr>
                                                                <th>DEBE
                                                                </th>
                                                                <th>HABER
                                                                </th>
                                                                <th>PORCENTAJE
                                                                </th>                                                            
                                                            </tr>
                                                        </thead>
                                                    </table>   
                                                </div>
                                                  
                                                <%--<asp:HiddenField ID="hfObjPlanCuentas" runat="server" />--%>                                                       
                                            </div>
                                        </div>
                                     
                                        <div class="form-actions">
                                            <a id="btnGrabar" class="btn blue"><i class="icon-save"></i> Grabar</a>
                                            <a id="btnCancelar" class="btn cancelar"><i class="icon-remove"></i> Cancelar</a>
                                        </div>
                                   </div>
                                </div>
                       
                            </div>

                        </div>

                    </div>
                </div>   

                <%-- Fin Fila3 --%>   
            </div>
        </div>
    </div>
</div>

<div id="divModal" class="modal hide">
    <div class="modal-header" style="padding: 1px 15px; background: black; color: #ffffff;">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4 id="tituloModal">Titulo</h4>
    </div>
    <div id="divModalContenido" class="modal-body">
    </div>
    <div id="divModalPie" class="modal-footer">

    </div>
</div>

<div id="divModalBusqueda" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="background: black; color: #ffffff;">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel">Titulo</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                </div>
            </div>
        </div>
        <div class="modal-footer" aria-hidden="true">

        </div>
    </div>
</div>



<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMCUCO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMCUCO.init();
    });
</script>
