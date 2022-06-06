<%@ Control Language="VB" AutoEventWireup="false" CodeFile="COLDEPT.ascx.vb" Inherits="vistas_CO_COLDEPT" %>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<style>
    .btnpdf {
        background: #bf0000!important;

    }
    .editable {
        cursor:pointer;
    }
</style>

<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>COMPRAS A DECLARAR POR PERIODO TRIBUTARIO</h4>

            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3" id="divCboEmpresa">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Emision</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaEmisionD" style="text-align: center" class="span5 fecha" type="text" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" />
                   -
                                <input id="txtFechaEmisionH" style="text-align: center" class="span5 fecha" type="text" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Periodo</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtPeriodo" style="text-align: center;text-transform:uppercase" class="span12" type="text" placeholder="MM-YYYY" data-date-format="MM - yyyy" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" id="filtros_2">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3" id="divCboEstablecimiento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="ESTABLECIMIENTO">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Registro</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFechaRegistroD" style="text-align: center" class="span5 fecha" type="text" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" /> -
                                <input id="txtFechaRegistroH" style="text-align: center" class="span5 fecha" type="text" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue span12">FILTRAR</a>
                            </div>
                        </div>
                    </div>


                </div>


                <div class="row-fluid">

                    <div class="span7">

                        <div class="span8">
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <button class="btn red btnpdf" id="btnLibroPdf" type="button"><i class="fa fa-file-pdf-o"></i>&nbsp;Exportar a Pdf</button>
                                    </div>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <button class="btn green" id="btnLibroXls" type="button"><i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div id="divTabla">
                        <table id="tblCompras" class="table-bordered display">
                            <thead>
                                <tr style="background-color:#e8e8e8">
                                    <th>Periodo Tributario</th>
                                    <th>Tipo Doc.</th>
                                    <th>Nro Documento</th>
                                    <th>Proveedor</th>
                                    <th>Doc. Identidad</th>
                                    <th>F. Emisión</th>
                                    <th>F. Registro</th>
                                    <th>Glosa</th>
                                    <th>Mon.</th>
                                    <th>Base Imponible</th>
                                    <th>IGV</th>
                                    <th>Total</th>
                                    <th>Declara</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CO/js/COLDEPT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        COLDEPT.init();
    });

</script>


<div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajeModal">
        <p id="P1">
         
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano" data-dismiss="modal" class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>
