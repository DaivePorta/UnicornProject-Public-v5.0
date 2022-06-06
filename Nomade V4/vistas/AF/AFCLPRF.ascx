<%@ Control Language="VB" AutoEventWireup="false" CodeFile="AFCLPRF.ascx.vb" Inherits="vistas_AF_AFCLPRF" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PRODUCTO FABRICADO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=AFCIPFR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=AFCLPRF" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <label>Sucursal</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnBuscar" class="btn blue"><i class=""></i>FILTRAR</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div id="listaProd" class="span12">
                         <%-- <table id="detalle" class="table display DTTT_selectable" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="7px">--%>                      
                            <table id="detalle" class="display DTTT_selectable" border="0">
                                <thead>
                                    <tr>
                                        <th style="max-width:50px; width:50px !important;">CÓDIGO</th>
                                        <th>COD. PROD</th>
                                        <th>PRODUCTO</th>
                                        <th>TOTAL SIN IGV</th>
                                        <th>TOTAL CON IGV</th>
                                        <th>SERIE</th>
                                        <th style="max-width:95px; width:95px !important;">ENSAMBLAJE</th>
                                        <th style="max-width:95px; width:95px !important;">MOV. ALMACÉN</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input id="hfIMPUESTO" type="hidden" />
<input id="hfCOD_PROD" type="hidden" />
<input id="emplPidm" type="hidden" />
<input id="emplNombres" type="hidden" />
<input id="emplSueldo" type="hidden" />

<script type="text/javascript" src="../vistas/AF/js/AFCLPRF.js"></script>
<script>
    jQuery(document).ready(function () {
        AFCLPRF.init();
    });
</script>