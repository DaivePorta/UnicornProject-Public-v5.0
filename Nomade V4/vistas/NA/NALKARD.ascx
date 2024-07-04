<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALKARD.ascx.vb" Inherits="vistas_NA_NALKARD" %>
<style>
    .fondoHeader {
        background-color: white;
        text-align: center;
        color: black;
    }

    .colorColumna {
        background-color: rgba(242, 237, 237, 0.47) !important;
        text-align: center !important;
    }
</style>

<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE KARDEX VALORIZADO</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body" id="div">

                <div class="row-fluid" id="filtros_1">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span3" style="display: none";>
                        <div class="control-group">
                            <div id="Div1" class="controls">
                                <input type="hidden" id="hfAlmacen" />
                                <select id="slcSucural" disabled class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" name="slcSucural" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Almacen</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="hf10" class="span12" data-placeholder="Seleccionar Almacen">
                                    <option></option>
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
                                <div id="moneda">
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--3--%>
                </div>
                <%--termina primera fila--%>


                <div class="row-fluid" id="filtros_2">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Producto</label>
                        </div>
                        <input id="hdcodProd" class="span12" type="hidden" />
                    </div>
                    <div class="span5">
                        <div class="control-group">

                            <div id="input_desc_prod" class="controls">
                                <input id="txtdescprod" class="span12" type="text" data-provide="typeahead" placeholder="Nombre Producto" />
                            </div>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>U.DET</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="hddUnidad" class="span12" type="hidden" />
                                <input id="txtUnidad" class="span12" type="text" data-provide="typeahead" readonly="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <%--termina segunda fila--%>
                <div class="row-fluid">
                    
                        <div class="control-group span1">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span2">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                        <div class="control-group span1">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">
                                Hasta</label>
                        </div>

                        <div class="control-group span2">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div id="tblProductos">
                        <table id="tblProd" class='table display table-bordered' style='width: 100%; border: 1px solid #cbcbcb;' cellpadding='6px'>
                            <thead>
                                <tr align="center">
                                    <th colspan="6"></th>
                                    <th colspan="3" style='text-align: center'>ENTRADA</th>
                                    <th colspan="3" style='text-align: center'>SALIDA</th>
                                    <th colspan="3" style='text-align: center'>SALDOS</th>
                                    <th colspan="2"></th>                                    
                                </tr>
                                <tr>
                                    <th>ITEM</th>
                                    <th>FECHA</th>
                                    <th>ORG/DEST</th>
                                    <th>PRODUCTO</th>
                                    <th style="text-align: left">DETALLE</th>
                                    <th>MONEDA</th>
                                    <th>CANT</th>
                                    <th>COSTO<br /> UNITARIO</th>
                                    <th>COSTO<br /> TOTAL</th>
                                    <th>CANT</th>
                                    <th>COSTO<br /> UNITARIO</th>
                                    <th>COSTO<br /> TOTAL</th>
                                    <th>CANT</th>
                                    <th>COSTO<br /> UNITARIO</th>
                                    <th>COSTO<br /> TOTAL</th>
                                    <th>NRO. DOC. REGISTRO</th>
                                    <th>TIPO CAMBIO</th>
                                    <th style='text-align: center'>#</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th colspan="6" align='center'><b>TOTALES</b></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center'></th>
                                    <th align='center'></th>
                                    <th align='center'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center' class='colorColumna'></th>
                                    <th align='center'></th>
                                    <th align='center' colspan='2'></th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NA/js/NALKARD.js"></script>
<%--<script type="text/javascript" src="../vistas/NA/js/NALMERC.js"></script>--%>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />


<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALKARD.init();


    });

</script>
