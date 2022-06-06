<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTCAM.ascx.vb" Inherits="vistas_NC_NCLTCAM" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA TIPO DE CAMBIO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=NCMTCAM" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLTCAM" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div style="padding-left: 7px;" class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscar" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>                                                 
               
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbltc" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>FECHA VIGENCIA 
                                    </th>
                                    <th>CODIGO MONEDA
                                    </th>
                                    <th>DESCRIPCION MONEDA
                                    </th>
                                    <th>VALOR DE COMPRA
                                    </th>
                                    <th>VALOR DE VENTA
                                    </th>
                                    <th>TIPO DE CAMBIO
                                    </th>
                                    <th>ÚLTIMO CAMBIO DEL DÍA
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjTC" runat="server" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCTCAM.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTCAM.init();

    });
</script>
