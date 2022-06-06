<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMCRCO.ascx.vb" Inherits="vistas_NO_NOMCRCO" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>APROBACION DE REQUERIMIENTOS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn red" href="?f=NOLCCOM"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div id="div" class="portlet-body">
                <div id="Div1" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="filtros_1" class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Nro. Requisición 
                            </label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="controls">
                            <input id="txtRequi" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>
                                Fecha
                            </label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="controls">
                            <input id="txtFecha" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Solicitante
                            </label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="controls">
                            <input id="txtSolici" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="controls">
                            Prioridad
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <select id="cbPrioridad" class="span12" data-placeholder="EMPRESA">
                                <option value="1">NORMAL</option>
                                <option value="2">URGENTE</option>
                            </select>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            Tipo de Requerimiento
                        </div>
                    </div>
                    <div class="span3">

                        <div class="controls">
                            <select id="cboRque" class="span12" data-placeholder="EMPRESA">


                                 <option value="1">MATERIALES ADMINISTRATIVOS</option>
                                <option value="2">ACTIVOS FIJOS</option>
                                <option value="3">MATERIA PRIMA, STOCK BAJO</option>

                                <option value="6">MERCADERIA , STOCK BAJO</option>
                                <option value="8">INSUMOS , PRODUCCION</option>
                                <option value="5">SERVICIO</option>
                            </select>
                        </div>
                    </div>
                </div>

                
                <br />
                 <div class="row-fluid" id="div_cc">
                     <div class="span1">
                         <div class="controls">
                             C. Costos
                         </div>
                     </div>
                     <div class="span6">
                         <label id="lblCentroCostos">-</label>
                     </div>                                         
                </div>
                <br />

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Glosa
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="controls">                          
                            <textarea id="txtGlosa" class="span12"></textarea>
                        </div>
                    </div>

                </div>
                
                <div class="row-fluid">     
                    <table id="detalle" class="display DTTT_selectable" border="0">
                        <thead>
                            <tr>
                                <th>CODIGO</th>
                                <th>DESC. PRODUCTO</th>
                                <th>CANT. APROBADA</th>
                                <th>CANT. SOLICITADA</th>
                                <th>CANT. POR ATENDER</th>
                                <th>UNID. MEDIDAD</th>
                                <th>ANULAR</th>
                            </tr>
                        </thead>
                    </table>

                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="controls">
                            <div class="form-actions" id="acciones_generales" style="display: block;">                             
                                <a id="idRegis" class="btn green"><i class="icon-save"></i>&nbsp;Completar</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- VENTANAS MODALES-->
                <div id="modal-confirmar" class="modal hide">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button"></button>
                        <h3>Confirmar el requerimiento de compra  </h3>
                    </div>
                    <div class="modal-body">
                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <p>
                                    Desea confirmar el requerimiento de compra              
                    ¿Desea continuar?
                                </p>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <div class="span4 offset2">
                                    <a id="btnAceptar" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                                </div>
                                <div class="span4">
                                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN DE LA VENTANA MODAL-->

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOMCRCO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMCRCO.init();
    });
</script>