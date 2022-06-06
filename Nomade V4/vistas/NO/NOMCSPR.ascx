<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMCSPR.ascx.vb" Inherits="vistas_NO_NOMCSPR" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>APROBACION DE SOLICITUD DE ORDEN DE PRODUCCIÓN</h4>
                <div class="actions">



                    <a class="btn red" href="?f=NOLCSPR"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

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
                                Nro. Requisicion 
                            </label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="controls">
                            <input id="txtRequi" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>




                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Fecha
                            </label>
                        </div>
                    </div>

                    <div class="span5">
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
                                <option value="1">Normal</option>
                                <option value="2">Urgente</option>
                            </select>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            Tipo de Requerimiento.
                        </div>
                    </div>
                    <div class="span3">

                        <div class="controls">
                            <select id="cboRque" class="span12" data-placeholder="EMPRESA">
                                <option value="1">PRODUCCION, STOCK BAJO</option>
                                <option value="2">PRODUCCION, REQUERIMIENTO VENTA</option>
                            </select>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Area
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            <select id="cboArea" class="span12" data-placeholder="AREA">
                            </select>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Seccion
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            <select id="cboSeccion" class="span12" data-placeholder="SECCION">
                            </select>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Proceso
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            <select id="cboProceso" class="span12" data-placeholder="PROCESO">
                            </select>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Actividad
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="controls">
                            <select id="cboActividad" class="span12" data-placeholder="ACTIVIDAD">
                            </select>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Requerimiento
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <select id="slsRequeIn" class="span12" data-placeholder="REQUERIMIENTO">
                                <option value="I">INTERNO</option>
                                <option value="E">EXTERNO</option>
                            </select>
                        </div>
                    </div>
                    <div id="cliente" class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group ">
                                    <label>
                                        Cliente
                                    </label>
                                </div>
                            </div>

                            <div class="span10">
                                <div class="control-group ">
                                    <input id="txtCliente" class="span12" type="text" data-provide="typeahead" />
                                    <input id="hfPIDMCLIENTE" class="span12" type="hidden" />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                    </div>
                </div>


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
                            <%-- <txtArea id="txtGlosa" class="span12" type="text" data-provide="typeahead" />--%>
                            <textarea id="txtGlosa" class="span12"></textarea>
                        </div>
                    </div>

                </div>




                <div class="row-fluid">
                    <%--<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
                    --%>

                    <table id="detalle" class="display DTTT_selectable" border="0">
                        <thead>
                            <tr>
                                <th>CODIGO</th>
                                <th style="text-align: left">DES. PRODUCTO</th>
                                <th>CANT. APROBADA</th>
                                <th>CANT. SOLICITADA</th>
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
                                <a id="idRegis" class="btn blue"><i class="icon-save"></i>&nbsp;Completar</a>
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

<script type="text/javascript" src="../vistas/NO/js/NOMCSPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMCSPR.init();


    });

</script>
