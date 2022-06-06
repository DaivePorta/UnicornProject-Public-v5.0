<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GBLNBIO.ascx.vb" Inherits="vistas_GB_GBLNBIO" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista de biométricos</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=GBMNBIO" class="btn green" id="btnNuevo"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=GBLNBIO" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>


<%--            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">Periodo</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <a id="A1" class="btn blue" href="javascript:Listar();"><i class="icon-search"></i>Buscar</a>
                        </div>
                    </div>


                    <div class="span1" id="DivFecha">
                        <asp:HiddenField ID="hfComision" runat="server" Value="0" />

                        <input type="hidden" value="0" />
                    </div>
                </div>
            </div>--%>



            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBiometrico" border="0" class="display DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Código</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Serie</th>
                                    <th>Software</th>
                                    <th>Versión</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                        </table>
                        <%--<asp:HiddenField ID="hffecha" runat="server" />--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/GB/js/GBLNBIO.js"></script>
<script>
    jQuery(document).ready(function () {
        GBLNBIO.init();
    });
</script>
