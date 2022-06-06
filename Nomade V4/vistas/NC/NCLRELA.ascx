<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLRELA.ascx.vb" Inherits="vistas_NC_NCLRELA" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE REGIMENES LABORALES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMRELA" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLRELA" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLISTA" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th style="width: 15%">CODIGO</th>
                                    <th style="text-align: left; width: 35%">DENOMINACION</th>
                                    <th style="width: 20%">ACRONIMO</th>
                                    <th style="width: 15%">ESTADO</th>
                                    <th style="width: 15%">CAMBIAR ESTADO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMRELA.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLRELA.init();
    });
</script>
