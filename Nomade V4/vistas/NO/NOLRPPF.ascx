<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRPPF.ascx.vb" Inherits="vistas_NO_NOLRPPF" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE DOCUMENTOS DE PROVEEDORES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','tblDocumentos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>

            </div>

            <div class="portlet-body">
                <div id="filtros_1" class="row-fluid">
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

                    <div class="span1">
                        <div class="control-group ">
                            <label>Proveedores</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="text_prov">
                                <%--   <select id="cboProveedores" class="span12" data-placeholder="EMPRESA">
                                </select>--%>

                                <input type="text" class="span12" id="txtProv" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Inicial</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <%--<input id="txtFechaInicial" type="text" class="span12"  placeholder="Fecha Inicial" />                                --%>
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaInicial" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Final</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <%--<input id="txtFechaInicial" type="text" class="span12"  placeholder="Fecha Inicial" />                                --%>
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaFinal" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">                    
                    <div class="span2 offset10">
                        <a id="buscar" class="btn blue"><i class="icon-save"></i>Buscar</a>

                    </div>
                </div>

                <div class="row-fluid">
                    <div id="tblDocumentos" align="center">
                    </div>
                </div>
                <asp:HiddenField ID="hfObjGR" runat="server" />
                <input type="hidden" id="hfPIDM" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOLRPPF.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />
<script>

    jQuery(document).ready(function () {

        NOLRPPF.init();
    });
</script>
