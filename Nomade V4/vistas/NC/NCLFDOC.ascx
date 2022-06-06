<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLFDOC.ascx.vb" Inherits="vistas_NC_NCLFDOC" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION DE FORMATOS IMPRESOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMFDOC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLFDOC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px">
                    <div class="span11">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2" style="text-align: right;">
                            <div class="control-group">
                                <label class="control-label hide" for="cboEstablecimiento">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEstablecimiento" class="span12 hide" data-placeholder="Establecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12" >
                        <table id="tabla_formatos" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th style="text-align: left">EMPRESA</th>
                                    <th style="text-align: left">ESTABLECIMIENTO</th>
                                    <th style="text-align: left">DOCUMENTO</th>
                                    <th style="text-align: center">DCTO CODE</th>
                                    <th style="text-align: center">NRO ITEMS</th>
                                    <th style="text-align: center">ESTADO</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMFDOC.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLFDOC.init();
    });
</script>
