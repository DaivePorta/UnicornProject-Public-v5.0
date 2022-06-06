<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLRCPR.ascx.vb" Inherits="vistas_NO_NOLRCPR" %>



<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REPORTES DE COMPRAS POR PROVEEDOR RESUMEN</h4>
                <div class="actions">
                   <a class="btn black" href="javascript:imprimirDiv(['filtros_1','tblProveedores']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">


                   <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    

                      
                    <div class="span1">
                        <div class="control-group ">
                            <label>Proveedor</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div id ="input_desc_prod" class="controls">
                                 <input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor"/>
                            </div>
                        </div>
                    </div>
                                                 

                </div>


                <div class ="row-fluid">
                    

                     <div class="span1">
                        <div class="control-group ">
                            <label>Desde</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">

                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaInicial" data-date-format="dd/mm/yyyy" />
                             </div>

                        </div>
                    </div>

                 
                     <div class="span1">
                        <div class="control-group ">
                            <label>Hasta</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                            <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaFinal" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                  <a id="buscar" class="btn blue" >FILTRAR</a>
                            </div>
                        </div>
                    </div>
                  
                </div>
             
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblProveedores" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>DOCUMENTO</th>
                                    <th>EMISION</th>
                                    <th>VENCIMIENTO</th>
                                    <th>BASE IMPONIBLE</th>
                                    <th>PRECIO_TOTAL</th>
                                    <th>DETRACCION</th>
                                    <th>PERCEPION</th>
                                    <th>RETENCION</th>
                                    <th>MONTO TOTAL</th>
                                    <th>PAGADO</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td style="text-align: right; font-weight: bold">TOTAL</td>
                                    <td style="text-align: right; font-size: small; font-weight: bold; padding-left: 10%">
                                        <label id="lblBaseTot">0.00</label></td>
                                    <td style="text-align: right; font-size: small; font-weight: bold; padding-left: 4%">
                                        <label id="lblPrecioTot">0.00</label></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style="text-align: right; font-size: small; font-weight: bold;padding-left: 5%">
                                        <label id="lblMontoTot">0.00</label></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>




            </div>




    </div>


</div>
</div>
<input id="hfPIDM" type="hidden" />

<script type="text/javascript" src="../vistas/NO/js/NOLRCPR.js"></script>
<%--<script type="text/javascript" src="../vistas/NA/js/NALMERC.js"></script>--%>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />


<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLRCPR.init();


    });

</script>