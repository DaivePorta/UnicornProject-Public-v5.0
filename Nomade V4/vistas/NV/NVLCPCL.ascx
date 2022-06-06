<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLCPCL.ascx.vb" Inherits="vistas_NV_NVLCPCL" %>

<style>
    .multiselect-container.dropdown-menu label {
        white-space: normal !important;
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTE CATÁLAGO TIPO CLIENTE</h4>
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
                    <div class="span2">
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
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAlmacen" class="span12 estable" data-placeholder="ALMACEN">
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Grupos</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slsGrupos" multiple class="span8" data-placeholder="GRUPOS" required style="display: none;">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Lista de Clientes</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboListaClientes" multiple class="span6" data-placeholder="LISTAS" required style="display: none;">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!--termina primera fila -->
                <div class="row-fluid">
                    <div class="span8">
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                 <div style="float: right;" id="divExportBtns">
                    <button class="btn red btnpdf" id="btnLibroPdf" type="button"><i class="fa fa-file-pdf-o"></i>&nbsp;Exportar a Pdf</button>
                    <button class="btn green" id="btnLibroXls" type="button" style="margin-left: 5px;"><i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>
                </div>                              
                
                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divTblProductos">
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="scr"></div>
<script type="text/javascript" src="../vistas/NV/js/NVLCPCL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NVLCPCL.init();
    });
</script>
