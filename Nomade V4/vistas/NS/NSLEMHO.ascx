<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLEMHO.ascx.vb" Inherits="vistas_NS_NSLEMHO" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista Mis horas extras</h4>
                <div class="actions">
                     <a class="btn black printlist "><i class="icon-print"></i>&nbsp Imprimir</a>
                    <a href="?f=NSMEMHO" class="btn green" id="btnNuevo"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NSLEMHO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>


            <div class="portlet-body">




                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="optmes">
                                Periodo:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span12" data-date-format="yyyy" type="text" id="optanho" name="optanho" placeholder="AÑO">
                                <input class="span12" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes" placeholder="MES">
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <a id="A1" class="btn blue"><i class="icon-search"></i>Buscar</a>
                        </div>
                    </div>

                </div>



                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                <div class="row-fluid">
                    <div class="span12" style="text-align: center;">
                        <i class="icon-user white" style="font-size: xx-large;"></i>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="nombre_empl" style="text-align: center;">-</div>
                </div>

                <div class="portlet-body">
                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblHoraExtra" border="0" class="display DTTT_selectable" style="display: block;">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Empleado</th>
                                        <th>Fec. Proc.</th>
                                        <th>Fec. Aut.</th>
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>Solicita</th>
                                        <th>Autoriza</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                            </table>
                            <asp:HiddenField ID="hffecha" runat="server" />
                            <asp:HiddenField ID="opcion" runat="server" />
                        </div>
                    </div>
                </div>
            </div>
</div>
</div>
</div>

<script type="text/javascript" src="../vistas/NS/js/NSMEMHO.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">

<script>

    jQuery(document).ready(function () {
        NSLEMHO.init();
    });
</script>