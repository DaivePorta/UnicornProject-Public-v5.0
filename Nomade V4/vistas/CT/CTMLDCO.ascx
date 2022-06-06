<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMLDCO.ascx.vb" Inherits="vistas_CT_CTMLDCO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE MARCAS DE TARJETA</h4>
                <div class="actions">

                    <a href="?f=CBMMTAR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CBLMTAR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>


            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid" id="divTblCtasContables">
                            <table id="tblCtasContables" class="display DTTT_selectable" border="0">
                                <thead>
                                    <th style='max-width: 52px;'>OPERACION</th>
                                    <th style='max-width: 70px;'>IMPUESTO</th>
                                    <th style='max-width: 52px;'>CTA IMPUESTO<br />
                                        EMISIÓN</th>
                                    <th style='max-width: 90px;'>CUENTA</th>
                                    <th style='max-width: 300px;'>CTA OPE MN</th>
                                    <th style='max-width: 52px;'>CUENTA MN</th>
                                    <th style='max-width: 90px;'>CTA OPE ME</th>
                                    <th style='max-width: 52px;'>CUENTA ME<br />
                                        PAGO</th>
                                    <th style='max-width: 52px;'>CTA RELA MN<br />
                                        PAGO</th>
                                    <th style='max-width: 90px;'>CUENTA RELA MN</th>
                                    <th style='max-width: 110px;'>CTA RELA ME</th>
                                    <th style='max-width: 90px;'>CUENTA RELA ME</th>
                                    <th style='max-width: 25px;'>DEBE HABER</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="13" style="text-align: center;">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CT/js/CTMCDCO.js"></script>
<script>
    jQuery(document).ready(function () {
        CTMLDCO.init();
    });
</script>



