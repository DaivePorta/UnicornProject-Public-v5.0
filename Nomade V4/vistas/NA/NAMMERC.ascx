<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMMERC.ascx.vb" Inherits="vistas_NA_NAMMERC" %>
<style>
    .multiselect-container.dropdown-menu label {
        white-space: normal !important;
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE STOCK DE PRODUCTOS POR CANTIDADES</h4>
                <div class="actions">
                    <a class="btn black printlist " style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear: both"></div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12 empresa" data-placeholder="EMPRESA">
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
                                <%--<select id="cboAlmacen" multiple="multiple" class="span12 estable" data-placeholder="ALMACEN" style="display: none;">
                                    <option></option>
                                </select>--%>
                                <select id="cboAlmacen" multiple class="span12" data-placeholder="ALMACEN" required style="display: none;">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Grupos</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slsGrupos" multiple class="span12" data-placeholder="GRUPOS" required style="display: none;">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Estad">
                                    <option value="">TODOS</option>
                                    <option value="A">ACTIVOS</option>   
                                    <option value="I">DESCONTINUADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                 <div style="float: right;" id="divExportBtns">
                    <%--<button class="btn red btnpdf" id="btnLibroPdf" type="button"><i class="fa fa-file-pdf-o"></i>&nbsp;Exportar a Pdf</button>--%>
                    <button class="btn green" id="btnLibroXls" type="button" style="margin-left: 5px;"><i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>
                </div>

                <div><label style="color:blue; font-size:13px">*Doble click en el nombre del producto para ver su kardex.</label></div>
                
                <div class="row-fluid">
                    <div id="tblProductos">
                        <table id="tblStock" class="display DTTT_selectable table-bordered" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>DESCRIPCION</th>
                                    <th>ESTADO</th>
                                    <th>ALMACÉN</th>
                                    <th>U.M</th>
                                    <th>STOCK ACTUAL</th>
                                    <th>SEPARADO</th>
                                    <th>DISPONIBLE</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="scr"></div>
<script type="text/javascript" src="../vistas/NA/js/NALMERC.js"></script>

<%--<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />--%>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALMERC.init();
    });
</script>
