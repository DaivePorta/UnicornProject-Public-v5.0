<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLCOMR.ascx.vb" Inherits="vistas_NV_NVLCOMR" %>
<style>
    @media print {
        .dn {
            display: none !important;
        }
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA COMPROBANTE RETENCION</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NVMCOMR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="span1">
                            <div class="control-group">
                                <label class="control-label" >
                                    Periodo</label>
                            </div>
                        </div>
                     <div class="span3">
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input class="span12" data-date-format="yyyy" type="text" id="txtanio" name="txtanio" placeholder="Año">
                                    </div>
                                </div>
                            </div>

                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input class="span12" type="text" id="cboMes" data-date-format="MM" aria-disabled="true" name="cboMes" placeholder="Mes">
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>

                <div class="row-fluid dn">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Emisor</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls" id="inputRazsocial">
                                <input id="txtRuc" class="span3" type="text" disabled="disabled" />
                                <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>

                    <div class="span4 ">
                        <div class="control-group span3">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="control-group span3">
                            <label id="Label3" class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>

                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid dn">
                    <div class="span4 offset1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr align="center">
                                    <th></th>
                                    <%--<th>RUC</th>--%>
                                    <th>NOMBRE O RAZON SOCIAL</th>
                                    <th>PERIODO DECLARADO</th>
                                    <th>FECHA COMPROBANTE</th>
                                    <th>NRO COMPROBANTE</th>                                    
                                    <th>MONTO TOTAL</th> 
                                    <th>CODIGO</th> 
                                </tr>
                            </thead>

                        </table>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<input id="hfPIDM" type="hidden" />
<input id="hfDNI" type="hidden" />
<input id="hfRUC" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVMCOMR.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLCOMR.init();
    });
</script>
