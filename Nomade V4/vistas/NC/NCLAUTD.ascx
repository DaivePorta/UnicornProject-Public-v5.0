<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLAUTD.ascx.vb" Inherits="vistas_NC_NCLAUTD" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>NUMERACION DE TIPOS DE DOCUMENTO COMERCIAL</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMAUTD" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLAUTD" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12" data-column="5">
                        <div class="span1">
                            <label>Empresa</label>
                        </div>
                        <div class="span3">
                            <select id="cboEmpresa" class="span12 empresa">
                                <option></option>
                            </select>
                        </div>


                        <div class="span1">
                            <div class="control-group">
                                <label id="Label2" class="control-label" for="cboSucursal">
                                    Sucursal:</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Seleccione Sucursal">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <label>Tipo Doc</label>
                        </div>
                        <div class="span3">
                            <select id="cboTipoDocumento" class="span12"></select>
                        </div>
      
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tAUTD" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <%--<th>EMPRESA</th>--%>
                                    <th>TIPO DCTO</th>
                                    <th>ESTABLECIMIENTO</th>
                                    <th>CORRELATIVO</th>
                                    <th>EMISION</th>
                                    <th>NRO AUT</th>
                                    <th>FORMATO</th>
                                    <th>SERIE</th>
                                    <th>INICIO</th>
                                    <th>FIN</th>
                                    <th>TICKET</th>
                                    <th>ESTADO</th>
                                    <th>Cambio Ticket</th>
                                    <th>Cambio Estado</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMAUTD.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLAUTD.init();
    });
</script>
