<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMTMVO.ascx.vb" Inherits="vistas_NA_NAMTMVO" %>
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPOS DE MOVIMIENTO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=namtmvo"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=naltmvo"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />&nbsp;Activo
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkimprime" type="checkbox" checked />&nbsp;Imprime Guía Remisión
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkLogistico" type="checkbox" checked />&nbsp;Movimiento Interno Logístico
                            </div>
                        </div>
                    </div>


                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Descripción Logística</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion" class="span12" placeholder="Descripción logística" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtdescCorta">
                                Desc. Corta
                            </label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtdescCorta" type="text" placeholder="Max. 3 letras" class="span12" />

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodsunat">
                                Cod. Sunat</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodsunat" type="text" class="span12" />
                            </div>
                        </div>
                    </div>


                </div>

                <!---fin sgda linea -->

                <!-- INICIO SEGUNDA LINEAb -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion_sunat">
                                Descripción SUNAT</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion_sunat" class="span12" placeholder="Descripción SUNAT" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoAsiento">
                                Tipo Asiento</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoAsiento" class="span12" data-placeholder="T. ASIENTO">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                </div>

                <!---fin sgda lineab -->

                <!-- INICIO TERCERA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcmovlog">
                                Mov. Logístico</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcmovlog" class="span8" data-placeholder="M. LOGISTICO">
                                    <option></option>
                                    <option value="I">INGRESO</option>
                                    <option value="S">SALIDA</option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcmovcon">
                                Mov. Contable</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcmovcon" class="span12" data-placeholder="M. CONTABLE">
                                    <option></option>
                                    <option value="I">INGRESO</option>
                                    <option value="IN">INGRESO NEGATIVO</option>
                                    <option value="S">SALIDA</option>
                                    <option value="SN">SALIDA NEGATIVA</option>
                                </select>

                            </div>
                        </div>
                    </div>


                </div>

                <!---fin tra linea -->
                <div id="divCentroCosto">
                <br />
                <div class="row-fluid">
                    <h4 style="text-decoration: underline">CENTRO COSTOS</h4>
                </div>
                <br />
                <!-- INICIO DE CUARTA LINEA-->
                
                    <div class="row-fluid">
                        <div class="span1 offset1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa:</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Centro Costo:</label>
                            </div>
                        </div>

                        <div class="span5">
                            <div class="row-fluid">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span10">
                                            <input type="text" id="txt_centro_costo" class="span12 centroCostos" data-codcentrocostocab="" data-codcentrocosto="" disabled />
                                        </div>
                                        <div class="span1">
                                            <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                        </div>
                                        <div class="span1">
                                            <button id="btnAddCentroCosto" class="btn purple" type="button"><i class="icon-plus" style="line-height: initial"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>


                    <div class="row-fluid">
                        <div class="span10 offset1">
                            <table id="tblCentroCosto" class="display DTTT_selectable" border="0" style="display: none;">
                                <thead>
                                    <tr>
                                        <th>EMPRESA
                                        </th>
                                        <th>CENTRO COSTOS
                                        </th>
                                        <th>#
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <asp:HiddenField ID="hfObjJSON" runat="server" />
                        </div>
                    </div>

                </div>



                <!--  fin de crta linea-->
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
 
<!-- Modal Centro de Costo -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title">CENTROS DE COSTO</h4>
            </div>
            <div class="modal-body">
                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span8">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2"></div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span10">
                        <div id="treeCentroCostos" class="treeview">
                        </div>
                    </div>
                    <div class="span1"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
                <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="../vistas/NA/js/NAMTMVO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMTMVO.init();

    });
</script>
