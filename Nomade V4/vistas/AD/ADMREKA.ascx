<%@ Control Language="VB" AutoEventWireup="false" CodeFile="ADMREKA.ascx.vb" Inherits="vistas_AD_ADMREKA" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>RECALCULAR KARDEX</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=ADMREKA" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group ">
                                <label>Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12 select obligatorio" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <label>Almacén</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboAlmacen" class="span12 select obligatorio" data-placeholder="Almacen">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <label>Moneda</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_moneda" class="span12 select obligatorio" data-placeholder="Moneda"><option></option></select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group ">
                                <label>Producto</label>
                            </div>
                            <input id="hdcodProd" class="span12" type="hidden" />
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtdescprod" class="span12 obligatorio" type="text" data-provide="typeahead" placeholder="Nombre Producto" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <label>Fecha</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" style="text-align: center" data-date-format="dd/mm/yyyy" class="span12 obligatorio" id="txtFecha" placeholder="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <button type="button" id="btnVerKardex" class="btn blue"><i class="icon-eye-open"></i>&nbsp;Ver</button>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div id="divTblKardex">
                        <table id="tblListaKardex" class="table-bordered" border="1">
                            <thead>
                                <tr align="center">
                                    <th colspan="5"></th>
                                    <th colspan="3" style='text-align: center'>ENTRADA</th>
                                    <th colspan="3" style='text-align: center'>SALIDA</th>
                                    <th colspan="3" style='text-align: center'>SALDOS</th>
                                    <th colspan="2"></th>
                                </tr>
                                <tr>
                                    <th>ITEM</th>
                                    <th>FECHA</th>
                                    <th>PRODUCTO</th>
                                    <th style="text-align: left">DETALLE</th>
                                    <th>MONEDA</th>
                                    <th>CANT</th>
                                    <th>COSTO<br />
                                        UNITARIO</th>
                                    <th>COSTO<br />
                                        TOTAL</th>
                                    <th>CANT</th>
                                    <th>COSTO<br />
                                        UNITARIO</th>
                                    <th>COSTO<br />
                                        TOTAL</th>
                                    <th>CANT</th>
                                    <th>COSTO<br />
                                        UNITARIO</th>
                                    <th>COSTO<br />
                                        TOTAL</th>
                                    <th>TIPO CAMBIO</th>
                                    <th style='text-align: center'>#</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th colspan="4" align='center'><b>TOTALES</b></th>
                                    <th align='center'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center'></th>
                                    <th align='center'></th>
                                    <th align='center'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' colspan='2'></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="btnRecalcular" class="btn blue"><i class="icon-save"></i>&nbsp;Recalcular</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/AD/js/ADMREKA.js"></script>
<script>
    jQuery(document).ready(function () {
        ADMREKA.init();
    });
</script>

