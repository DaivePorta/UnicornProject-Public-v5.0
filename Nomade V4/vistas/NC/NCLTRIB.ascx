<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLTRIB.ascx.vb" Inherits="vistas_NC_NCLTRIB" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE TRIBUTOS</h4>
                <div class="actions">
                    <a class="btn black" id="btn_imprime"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NCMTRIB" class="btn green" id="btnNuevo"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NCLTRIB" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>


            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Tipo Tributo</label>
                            <div class="controls" id="Div6">
                                <select id="cbo_tipo_tributo" class="bloquear span10" placeholder="Selecciona tipo">
                                    <option value="T">TODOS</option>
                                    <option value="1">IGV</option>
                                    <option value="2">ISC</option>
                                    <option value="3">IMPUESTO A LA RENTA</option>
                                    <option value="4">MULTAS</option>
                                    <option value="5">ESSALUD</option>
                                    <option value="6">ONP</option>
                                    <option value="7">FRACCIONAMIENTO</option>
                                    <option value="8">IES</option>
                                    <option value="9">COSTAS Y GASTOS</option>
                                    <option value="10">OTROS TRIBUTOS</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Estado</label>
                            <div class="controls" id="Div1">
                                <select id="cbo_estado" class="bloquear span10" placeholder="Selecciona tipo">
                                    <option value="T">TODOS</option>
                                    <option value="A">ACTIVO</option>
                                    <option value="I">INACTIVO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                </div>
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 10px;"></div>
                <div class="row-fluid">
                    <div class="span12" id="Div_imprime">
                        <table id="tblTributos" border="0" class="display DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>COD. TRIBUTO</th>
                                    <th>DESCRIPCION</th>
                                    <th>COD. TRIBUTO ASOC</th>
                                    <th>ABREVIATURA</th>
                                    <th>DIA VENC.</th>
                                    <th>%</th>
                                    <th>TIPO TRIBUTO</th>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMTRIB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLTRIB.init();

    });
</script>
