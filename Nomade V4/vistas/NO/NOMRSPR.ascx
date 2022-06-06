<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMRSPR.ascx.vb" Inherits="vistas_NO_NOMRSPR" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>SOLICITUD DE ORDEN DE PRODUCCIÓN</h4>
                <div class="actions">

                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn green" href="?f=NOMRSPR"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NOLRSPR"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv2(['filtros_1','filtros_2','filtros_3','filtros_5','filtros_6','filtros_7','filtros_8','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div id="div" class="portlet-body">
                <div id="filtros_1" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                 <%-- <Se cambió el id de del combobox cboEmpresas a slcEmpresa>--%>
                                <select id="slcEmpresa" class="span12 empresa" data-placeholder="EMPRESA">
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
                                <select id="cboEstablecimiento" class="span12" data-placeholder="ESTABLECIMIENTO">
                                </select>
                            </div>
                        </div>
                    </div>


                </div>

                <div id="filtros_2" class="row-fluid">

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

                <div id="filtros_3" class="row-fluid">
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

                <div id="filtros_5" class="row-fluid">
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
                    <div id="cliente" class="span4">
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
                    <div class="span1">
                        <div class="control-group ">
                            <label>
                                Centro de Costos
                            </label>
                        </div>
                    </div>

                             <div class="span3">
                                <input type="text" id="txt_centro_costo" class="m-wrap span12 centroCostos" disabled="disabled" />
                            </div>
                            <div class="span1">                                 
                               <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                             
                            </div>
                </div>

                <div id="filtros_6" class="row-fluid">

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

                <div id="filtros_7" class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label id="lblAprobado">
                                Aprobado por
                            </label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="controls">
                            <%-- <txtArea id="txtGlosa" class="span12" type="text" data-provide="typeahead" />--%>
                            <input id="txtAprobado" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>

                    <div class="span8">
                        <div class="controls">
                        </div>
                    </div>

                </div>

                
                <div id="deTalleGeneral">
                    <fieldset class="scheduler-border ">
                        <legend class="scheduler-border " id="legend">Detalle</legend>
                        <div id="oculta">
                            <div class="row-fluid">

                                <div class="span1">
                                    <div class="control-group ">
                                        <label>
                                            Codigo
                                        </label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="controls">
                                        <input id="txtcodprod" class="span12 " type="text" next="#txtdescprod" style="text-transform: uppercase" />
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group ">
                                        <label>
                                            Producto
                                        </label>
                                    </div>
                                </div>
                                <div class="span7">
                                    <div class="control-group">
                                        <div id="input_desc_prod" class="controls">
                                            <input id="txtdescprod" class="span12 dt" type="text" data-provide="typeahead" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group ">
                                        <label>
                                            Cantidad
                                        </label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="controls">
                                        <input id="txtcant" onkeypress="return ValidaDecimales(event,this)" class="span12 dt" type="text" />
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="cboUniMedida">
                                            Unid. Medida</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtUnidad" class="span12" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <input id="hdcodUNI" class="span12" type="hidden" />
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <a id="btn_new_cc" class="btn blue" href="javascript:GrabarDet()"><i class="icon-plus-sign" style="line-height: initial"></i>&nbsp;Agregar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid" id="filtros_8">
                            <table id="detalle" class="display DTTT_selectable" border="0">
                                <thead>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th style="text-align: left">PRODUCTO</th>
                                        <th>UNIDAD  MEDIDA</th>
                                        <th>COD. UNID.  MEDIDA</th>
                                        <th>CANTIDAD</th>
                                        <th>FECHA REQ.</th>
                                        <th>ELIMINAR</th>
                                    </tr>
                                </thead>
                            </table>
                            <asp:HiddenField ID="hfObjJson" runat="server" />
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="controls">
                                    <div class="form-actions" id="acciones_generales" style="display: block;">
                                        <a id="idRegis" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                                        <a id="cancelar" class="btn" href="?f=NOMRCOM"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div id="tblProductos">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row-fluid">
                    <div class="span6">
                        <table id="Table1" border="0">
                            <tr>
                                <td>APROBADO</td>
                                <td style='background-color: #CCFFFF'>&nbsp;&nbsp;&nbsp;</td>
                                <td>ANULADO</td>
                                <td style='background-color: #FFCC99'>&nbsp; &nbsp;</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divMail" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 55%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divMail_body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">De:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtRemitente" class="span12" disabled><input id="txtNRemitente" type="hidden">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Para:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <div>
                                    <select multiple class="span12" id="cboCorreos"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Asunto:</label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtAsunto" class="span12">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 10px; border: thin inset">
                        <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                        <h4 id="lblEmpresa"></h4>
                        <h5 id="lblAsunto"></h5>
                        <h6><strong>EMISION:</strong>&nbsp;<span id="lblEmision"></span></h6>
                        <h6><strong>SOLICITANTE:</strong>&nbsp;<span id="lblSolicitante"></span></h6>
                        <h6><strong>GLOSA:</strong>&nbsp;<span id="lblGlosa"></span></h6>
                        <div class="row-fluid">
                            <div class="span12" id="lblTablaHtml"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
    </div>
</div>
<script type="text/javascript" src="../vistas/NO/js/NOMRSPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMRSPR.init();


    });

</script>

