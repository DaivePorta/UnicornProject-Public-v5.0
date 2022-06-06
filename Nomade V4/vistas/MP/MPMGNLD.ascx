<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMGNLD.ascx.vb" Inherits="vistas_MP_MPMGNLD" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DETALLE  ORDEN DE PROUDCCION</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=MPMGNLO" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=MPLGNLO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border ">Datos de Orden de Fabricacion</legend>
                    <div class="row-fluid">
                        <div class="span12">

                            <div class="span2">
                                <div class="control-group">
                                    <label>Nro Orden </label>
                                </div>

                            </div>


                            <div class="span8">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span6" id="txtOrden" />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="span2">
                                        <div class="control-group ">
                                            <label>Fecha Registro</label>
                                        </div>
                                    </div>
                                    <div class="span2">
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
                                    <label>Producto</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 " id="txtProducto" />
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
                                        <input type="text" class="span12 " id="txtFabricacion" />
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
                                        <input type="text" class="span8 " id="txtCantidad" style="text-align: center" />
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
                                            <div class="checker" id="uniform-chkEstado">
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
                                            <input type="text" class="span8" id="txtResponsable" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblDetallefabricacion" class="table table-bordered">
                                <thead style="background-color: rgb(35, 119, 155); color: white;">
                                    <tr>
                                        <th style="text-align: center">COD. DE ORDEN DE FABRICACION</th>
                                        <th style="text-align: center">COD. DE REQUERIMIENTO DE PRODUCCION</th>
                                        <th style="text-align: center">CANTIDAD</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border ">Datos de Lote de Produccion</legend>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span2">
                                <div class="control-group ">
                                    <label>Nro de lote</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span8 " id="txtnrolote" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group ">
                                    <label>Seccion</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 " id="txtArea" />
                                    </div>
                                </div>
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
                                        <input type="text" class="span8 fecha" id="txtLoteFechaini" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group ">
                                    <label>Fecha Fin</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span8 fecha" id="txtLoteFechaFin" data-date-format="dd/mm/yyyy" />
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
                                        <input type="text" class="span8" id="txtCantidadLote" />
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
                                        <div class="checker" id="Div6">
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
                </fieldset>
                <div>
                    <div class="form-actions" style="margin-bottom: 0px">
                        <button type="button" id="btnAnular" class="btn red"><i class="icon-remove-sign"></i>&nbsp;Anular</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divAnular" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-search"></i>&nbsp;BUSCAR DOCUMENTO DE ORIGEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span3">
                <label for="txtFechaAnulacion">Fecha Anulación</label>
            </div>
            <div class="span2">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12" id="txtFechaAnulacion" data-date-format="dd/mm/yyyy" style="text-align: center" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span3">
                <label for="txtRazonAnulacion">Razón Anulación</label>
            </div>
            <div class="span9">
                <div class="control-group">
                    <div class="control">
                        <textarea class="span12" rows="6" id="txtRazon"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn red" id="btnCompletarAnulacion"><i class="icon-chevron-right"></i>&nbsp;Registrar Anulación</button>
    </div>
</div>

<script type="text/javascript" src="../vistas/MP/js/MPMGNLD.js"></script>
<script>
    jQuery(document).ready(function () {
        MPMGNLD.init();
    });
</script>
