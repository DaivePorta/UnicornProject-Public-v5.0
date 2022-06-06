<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLASCO.ascx.vb" Inherits="vistas_CT_CTLASCO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <%--<a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=CTMASCO" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CTLASCO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div3">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls" id="Div4">
                                <select id="slcSucural" name="slcSucural" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Desde</label>
                            <div class="control-group">
                                  <div class="controls">
                                        <input type="text" style="text-align: left;" placeholder="Fecha Inicio" class="b fecha span8 required" data-date-format="dd/mm/yyyy" name="txt_fec_ini_emi" id="txt_fec_ini_emi">
                                   </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Hasta</label>
                            <div class="control-group">
                                  <div class="controls">
                                     <input type="text" style="text-align: left;" placeholder="Fecha Fin" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_fin_emi" id="txt_fec_fin_emi">
                                   </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_filtrar" type="button" style="margin-top: 22px" class="b btn black span6"><i class="icon-search"></i>&nbsp;Buscar</button>

                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <br />
                <br />
                <div class="row-fluid">
                    <div class="span12">
                        <%-- class="display DTTT_selectable" border="0" style="display: none;width:100%;" --%>
                        <table id="tbl_gastos" class="table-hover  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th style="text-align: left">NRO. MOVIMIENTO
                                    </th>
                                    <th style="text-align: left">DOCUMENTO
                                    </th>
                                    <th style="text-align: left">SERIE-NÚMERO
                                    </th>
                                    <th style="text-align: left">CLIENTE
                                    </th>
                                    <th>DESCRIPCIÓN
                                    </th>
                                    <th>TIPO ASIENTO
                                    </th>
                                    <th>ESTABLECIMIENTO
                                    </th>
                                    <th>FECH. EMISIÓN
                                    </th>
                                    <th>MONEDA
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>VALOR CAMBIO
                                    </th>
                                    <th>USUARIO
                                    </th>
                                </tr>
                            </thead>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CT/js/CTMASCO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLASCO.init();

    });
</script>
