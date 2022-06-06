<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMRCOM.ascx.vb" Inherits="vistas_NO_NOMRCOM" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REQUERIMIENTO DE BIENES Y SERVICIOS</h4>
                <div class="actions">
                    <a class="btn purple hidden" id="btnMail"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=NOMRCOM"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NOLRCOM"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div id="div" class="portlet-body">

                <div id="Div1" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="cboEmpresas">Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12 empresa" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboEstablecimiento">Establecimiento</label>
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
                            <label class="control-label" for="txtRequi">Nro. Requisición</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtRequi" class="span12" type="text" data-provide="typeahead" placeholder="Generado"/>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtFecha">Fecha</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFecha" class="span12" type="text" data-provide="typeahead" data-date-format="dd/mm/yyyy" style="text-align:center;"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtSolici">
                                Solicitante
                            </label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                </select>
                            </div>
                        </div>
                    </div>

             
                    <div class="span2">
                        <div class="controls">
                            Prioridad
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbPrioridad" class="span12" data-placeholder="EMPRESA">
                                    <option value="1">NORMAL</option>
                                    <option value="2">URGENTE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span1">
                        <div class="controls">
                            Tipo Requerimiento.
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
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
                    
                    <div class="span2">
                        <div class="controls">
                            <label class="control-label" for="txt_centro_costo">Centro Costo</label>
                        </div>
                    </div>
                    
                    <div class="span4">
                        <div class="controls">
                            <div class="span10">
                                <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-CodCentroCostoCab="" data-CodCentroCosto="" disabled/>
                            </div>
                            <div class="span2">
                                <button type="button" id="btnBuscarCentroCto" class="btn green centroCostos"><i class="icon-search" style="line-height: initial"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                      
                
                <br />

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtGlosa">
                                Glosa
                            </label>
                        </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtGlosa" class="span12" style="resize: vertical; max-height: 250px;height:104px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">

                    <div id="oculta">
                        <fieldset class="scheduler-border ">
                            <legend class="scheduler-border " id="legend">Detalle</legend>

                            <div class="row-fluid">

                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtcodprod">
                                            Codigo
                                        </label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtcodprod" class="span12" type="text" style="text-transform: uppercase" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtdescprod">Desc Producto</label>
                                    </div>
                                </div>

                                <div class="span8">
                                    <div class="controls">                                        
                                        <div class="span10">
                                            <div class="control-group">
                                                <div id="input_desc_prod" class="controls">
                                                    <input id="txtdescprod" class="span12" type="text" data-provide="typeahead" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span2">
                                            <a id="btnAgregarProd" class="btn green span6" href="?f=NMMPROD" target="_blank"><i class="icon-plus" style="line-height: initial"></i></a>
                                            <button type="button" id="btnRefrescarProd" class="btn blue span6"><i class="icon-refresh" style="line-height: initial"></i></button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div class="row-fluid">
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtcant">
                                            Cantidad
                                        </label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtcant" class="span12" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span1">
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
                                            <a id="btn_new_cc" class="btn green"><i class="icon-plus" style="line-height: initial"></i>&nbsp;Agregar Detalle</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row-fluid">
                                <table id="detalle" class="display DTTT_selectable" border="0">
                                    <thead>
                                        <tr>
                                            <th>CODIGO</th>
                                            <th>DESC. PRODUCTO</th>
                                            <th>UNIDAD  MEDIDA</th>
                                            <th>COD. UNID.  MEDIDA</th>
                                            <th>CANTIDAD</th>
                                            <th>FECHA REQ.</th>
                                            <th>#</th>
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div id="tblProductos">
                        </div>
                    </div>
                </div>
                <br />

                <div class="row-fluid">
                    <div class="span6">
                        <table id="Table1" border="0">
                            <tr>
                                <td>APROBADO</td>
                                <td style='background-color: #CCFFFF'>&nbsp;&nbsp;&nbsp;</td>
                                <td>RECHAZADO</td>
                                <td style='background-color: #FFCC99'>&nbsp; &nbsp;</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>




<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>

<script type="text/javascript" src="../vistas/NO/js/NOMRCOM.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMRCOM.init();
    });

</script>
