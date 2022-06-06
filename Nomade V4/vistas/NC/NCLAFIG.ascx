<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLAFIG.ascx.vb" Inherits="vistas_NC_NCLAFIG" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE AFECTACION DE IGV</h4>
                <div class="actions">
                    <a href="?f=NCMAFIG" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLAFIG" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="margin-bottom: 10px;">
                    
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tableafectaciones" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <%--<th>EMPRESA</th>--%>
                                    <th>CODIGO SUNAT</th>
                                    <th>DESCRIPCION</th>
                                    <th>TIPO DE BIEN</th>
                                    <th>ESTADO</th>
                                    <th>Cambiar Estado</th>
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

<script type="text/javascript" src="../vistas/NC/js/NCLAFIG.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLAFIG.init();
    });
</script>