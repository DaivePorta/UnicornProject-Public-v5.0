<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CBLCMOP.ascx.vb" Inherits="vistas_CB_CBLCMOP" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA COMISIONES OPERADOR TARJETA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CBMCMOP" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CBLCMOP" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblComisiones" class=" table table-hover table-bordered display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="text-align: center" rowspan="2">CODIGO</th>
                                    <th style="text-align: center" rowspan="2">OPERADOR</th>
                                    <th style="text-align: center" colspan="4">COMISIONES</th>
                                    <th style="text-align: center" rowspan="2">IGV</th>
                                    <th style="text-align: center" rowspan="2">ESTADO</th>
                                    <th style="text-align: center" rowspan="2">Cambiar Estado</th>
                                </tr>
                                <tr>
                                    <th style="text-align: center">DEBITO</th>
                                    <th style="text-align: center">CREDITO</th>
                                    <th style="text-align: center">EMISORES</th>
                                    <th style="text-align: center">OPERADOR</th>
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

<script type="text/javascript" src="../vistas/CB/js/CBMCMOP.js"></script>
<script>
    jQuery(document).ready(function () {
        CBLCMOP.init();
    });
</script>
