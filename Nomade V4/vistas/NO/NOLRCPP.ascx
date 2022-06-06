<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRCPP.ascx.vb" Inherits="vistas_NO_NOLRCPP" %>
<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE DE COMPRAS DE PRODUCTOS POR PROVEEDOR</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProveedores']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls" id="div_scsl">
                               <select id="slcSucural" class="bloquear combo m-wrap span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>

                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Proveedor</label>
                            <div id="input_desc_prod" class="controls">
                                <input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" />
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row-fluid" id="filtros_2">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Sub-Grupo</label>
                            <div id="div_subgrupo" class="controls">
                                <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Desde</label>
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaInicial" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Hasta</label>
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaFinal" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue" style="margin-top: 25px;"><i class="icon-search"></i>&nbsp;FILTRAR</a>
                            </div>
                        </div>
                    </div>



                </div>
                <hr style="border-top: 3px solid #e5e5e5" />

                <div class="row-fluid">
                    <div id="tblProveedores">
                    </div>
                </div>




            </div>




        </div>


    </div>
</div>
<input id="hfPIDM" type="hidden" />

<script type="text/javascript" src="../vistas/NO/js/NOLRCPP.js"></script>



<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />


<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLRCPP.init();


    });

</script>
