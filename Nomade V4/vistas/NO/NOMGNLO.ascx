<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMGNLO.ascx.vb" Inherits="vistas_NO_NOMGNLO" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ORDEN DE PRODUCCION</h4>
                <div class="actions">



                    <a class="btn red" href="?f=MPLGNLO"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div id="div" class="portlet-body">

                <div id="Div2" class="row-fluid">

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

                <div id="Div3" class="row-fluid">
                    <div class="span6">
                        <div id="Div4" class="row-fluid">
                            <div class="span2">
                                Fecha Inicio
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 fecha" id="txtFechaInicio" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                Fecha Fin
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 fecha" id="txtFechaFin" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span4">
                            <a id="btnBuscar" class="btn blue"><i class="icon-search"></i>&nbsp;Buscar</a>
                        </div>
                        <div class="span10">
                        </div>
                    </div>
                </div>

                <div id="Div1" class="row-fluid">

                    <div class="span12">
                        <table id="detalleLotes" class="display DTTT_selectable" border="0">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr>
                                    <th></th>
                                    <th>CODIGO</th>
                                    <th>FECHA INICIO</th>
                                    <th>FECHA FIN</th>
                                    <th>CODE PRODUCTO</th>
                                    <th>PRODUCTO</th>
                                    <th>UNID. MEDIDAD</th>
                                    <th>TOTAL</th>
                                    <th>GLOSA</th>
                                    <th>ATENDER</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div id="Div5" class="row-fluid">
                    <div class="span12">
                        <div class="form-actions" id="acciones_generales" style="display: block;">
                            <a id="generar" class="btn green"><i class="icon-cogs"></i>&nbsp;Generar</a>
                            <a id="cancelar" class="btn" href="?f=nomgnlo"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divFabri" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <h4 id="divBuscarDoc_title"><i class="icon-reader" style="line-height: initial;"></i>&nbsp;Generar Lote</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarDoc_body">
                <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                    <ul class="nav nav-tabs">
                        <li id="liFabri" class="active"><a id="tabDatosGenerales" href="#fabricacion" data-toggle="tab"><i class=""></i>Orden fabricacion</a></li>
                        <li id="liLote"><a id="tabDetalleMov" href="#lote" data-toggle="tab"><i class=""></i>Lote de produccion</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="fabricacion">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group">
                                            <label>Nro Orden </label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="row-fluid">
                                            <div class="span6">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12" id="txtOrden" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <div class="control-group ">
                                                    <label>Fecha Registro</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 fecha" id="txtfechaRegistro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Descripcion</label>
                                        </div>

                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 " id="txtDescripcion" />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Tipo fabricacion</label>
                                        </div>

                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboTipofabri" class="span12" data-placeholder="FABRICACION">
                                                    <option value="1">Automatico</option>
                                                    <option value="2">Manual</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <label>Cantidad</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 " id="txtCantidad" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group ">
                                            <label>Activo</label>
                                        </div>

                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <div class="controls">
                                                    <div class="checkbox" id="uniform-chkEstado">
                                                        <span class="checked">
                                                            <input id="chkFabri" type="checkbox" checked="checked" class="span12" style="opacity: 0;">
                                                        </span>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Responsable</label>
                                        </div>

                                    </div>
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="controls">
                                                <div id="input_empl">
                                                    <input type="text" class="span12 " id="txtResponsable" autocomplete="off" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="tab-pane " id="lote">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Nro de lote</label>
                                        </div>

                                    </div>
                                    <div class="span8">
                                        <div class="row-fluid">
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="span12 " id="txtnrolote" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="span2">
                                                <div class="control-group ">
                                                    <label>Secciones</label>
                                                </div>

                                            </div>
                                            <div class="span6">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboArea" class="span12" data-placeholder="AREA">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div class="span2">
                                    </div>
                                </div>
                            </div>


                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Fecha Inicio</label>
                                        </div>

                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 fecha" id="txtLoteFechaini" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Fecha Fin</label>
                                        </div>

                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 fecha" id="txtLoteFechaFin" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span4">
                                    </div>
                                </div>

                            </div>

                            <div class="row-fluid">
                                <div class="span12">


                                    <div class="span2">
                                        <div class="control-group">
                                            <label>Cantidad</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12" id="txtCantidadLote" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group ">
                                            <label>Activo</label>
                                        </div>

                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <div class="checkbox" id="Div6">
                                                    <span class="checked">
                                                        <input id="chkLote" type="checkbox" checked="checked" class="span12" style="opacity: 0;">
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span4">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row-fluid">
        <div class="span12">
            <div class="form-actions" id="Div7" style="display: block;">
                <a id="btnGuardar" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                <button data-dismiss="modal" type="button" id="Button1" class="btn graen">&nbsp;Cancelar</button>
                <button type="button" id="btnSalir" class="btn"><i class="icon-remove"></i>&nbsp;Salir</button>
            </div>
        </div>
    </div>
</div>


<input type="hidden" id="hdproducto" />
<input type="hidden" id="emplPidm" />

<script type="text/javascript" src="../vistas/NO/js/NOMGNLO.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMGNLO.init();


    });

</script>
.