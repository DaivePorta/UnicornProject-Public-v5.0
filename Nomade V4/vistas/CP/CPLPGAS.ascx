<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLPGAS.ascx.vb" Inherits="vistas_CP_CPLPGAS" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PROVISION GASTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CPMPGAS" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CPLPGAS" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span2">
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
                    <div class="span2">
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
                            <label class="control-label">Fecha Emisión</label>
                            <div class="control-group">
                                <div class="span12">
                                    <div class="span6">
                                        <div class="control-group ">
                                            <div class="controls">
                                                <input type="text" style="text-align: right;" placeholder="Fecha Inicio" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_ini_emi" id="txt_fec_ini_emi">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span6">
                                        <div class="control-group ">
                                            <div class="controls">
                                                <input type="text" style="text-align: right;" placeholder="Fecha Fin" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_fin_emi" id="txt_fec_fin_emi">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Tipo Egreso</label>
                            <div class="controls" id="Div1">
                                <select id="cbo_tipo_egreso" class="bloquear span12" placeholder="Selecciona tipo">
                                    <option value="T">TODOS</option>
                                    <option value="N">GASTOS</option>
                                    <option value="S">COMPRAS VARIAS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo</label>
                            <div class="controls" id="Div2">
                                <select id="cbo_periodo" class="bloquear span12" placeholder="Selecciona Periodo">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">


                                <button id="btn_filtrar" type="button" style="margin-top: 22px" class="b btn purple span6"><i class="icon-search"></i>&nbsp;Buscar</button>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span10"></div>
                    <div class="span2">
                        <label class="control-label" for="chk_avanzada">
                            <div class="checker" id="uniform-chk_avanzada">
                                <span class="">
                                    <input type="checkbox" id="chk_avanzada" name="chk_avanzada" checked="" style="opacity: 0;"></span>
                            </div>
                            Filtros Avanzados</label>
                    </div>
                </div>
                <div class="row-fluid" id="busq_avanz" style="display: none;">
                    <div class="span12 alert-info">
                        <div class="row-fluid">
                            <%--<div class="span2">
                                <label class="control-label" for="chkemp">
                                    <div class="checker" id="uniform-chkemp">
                                        <span class="checked">
                                            <input type="checkbox" id="chkemp" name="chkemp" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Empresa</label>

                                <div class="control-group" id="empresa" style="display: none;">
                                    <div class="controls" id="controlempresa">
                                    </div>

                                </div>
                            </div>--%>
                            <%--      <div class="span2">
                                <label class="control-label" for="chkscsl">
                                    <div class="checker" id="uniform-chkscsl">
                                        <span class="checked">
                                            <input type="checkbox" id="chkscsl" name="chkscsl" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Establecimiento</label>

                                <div class="control-group" id="sucursal" style="display: none;">
                                    <div class="controls">
                                     
                                    </div>

                                </div>
                            </div>--%>

                            <div class="span2">
                                <label class="control-label" for="chkprovision">
                                    <div class="checker" id="uniform-chkprovision">
                                        <span class="checked">
                                            <input type="checkbox" id="chkprovision" name="chkprovision" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Tipo Provision</label>
                                <div class="control-group">
                                    <div class="controls" id="provision" style="display: none;">
                                        <select id="cbo_tipo_provision" class="bloquear span12" placeholder="Selecciona tipo">
                                            <option value="PRO">PAGOS PROGRAMADOS</option>
                                            <option value="NPRO">PAGOS NO PROGRAMADOS</option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkgast">
                                        <div class="checker" id="uniform-chkgast">
                                            <span class="checked">
                                                <input type="checkbox" id="chkgast" name="chkgast" checked="" style="opacity: 0;"></span>
                                        </div>
                                        Concepto</label>
                                    <div class="controls" id="gasto" style="display: none;">
                                        <select id="cbo_gasto" name="cbo_gasto" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Gasto" tabindex="1">
                                            <option></option>
                                        </select>

                                    </div>


                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkSgast">
                                        <div class="checker" id="uniform-chkSgast">
                                            <span class="checked">
                                                <input type="checkbox" id="chkSgast" name="chkSgast" checked="" style="opacity: 0;"></span>
                                        </div>
                                        SubConceptos</label>

                                    <div class="controls" id="subgasto" style="display: none;">
                                        <select id="cbo_subgasto" name="cbo_subgasto" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Sub-Gasto" tabindex="1">
                                            <option></option>
                                        </select>

                                    </div>

                                </div>
                            </div>
                            <div class="span2">
                                <label class="control-label" for="chkestado">
                                    <div class="checker" id="uniform-chkestado">
                                        <span class="checked">
                                            <input type="checkbox" id="chkestado" name="chkestado" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Estado</label>
                                <div class="control-group">
                                    <div class="controls" id="estado" style="display: none;">
                                        <select id="cbo_estado" name="cbo_estado" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Estado" tabindex="1">
                                            <option></option>
                                        </select>

                                    </div>

                                </div>
                            </div>
                            <div class="span2">
                                <label class="control-label" for="chkfec">
                                    <div class="checker" id="uniform-chkfec">
                                        <span class="checked">
                                            <input type="checkbox" id="chkfec" name="chkfec" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Fecha Registro</label>
                                <div class="control-group">
                                    <div id="fecha" class="span12" style="display: none;">
                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Inicio" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_ini" id="txt_fec_ini">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Fin" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_fin" id="txt_fec_fin">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="span2">
                                <label class="control-label" for="chkfec_emision">
                                    <div class="checker" id="uniform-chkfec_emision">
                                        <span class="checked">
                                            <input type="checkbox" id="chkfec_emision" name="chkfec_emision" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Fecha Emisión</label>
                                <div class="control-group">
                                    <div id="fecha_emi" class="span12" style="display: none;">
                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Inicio" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_ini_emi" id="txt_fec_ini_emi">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span6">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <input type="text" style="text-align: right;" placeholder="Fecha Fin" class="b fecha span8  required" data-date-format="dd/mm/yyyy" name="txt_fec_fin_emi" id="txt_fec_fin_emi">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkCentroCostos">
                                        <input type="checkbox" id="chkCentroCostos" name="chkCentroCostos" />
                                        Centro de Costos</label>
                                </div>

                                <div class="control-group">
                                    <div id="divCentroCostos" class="span12" style="display: none;">
                                        <div class="span12">
                                            <div class="control-group ">
                                                <div class="controls">
                                                    <div class="span7">
                                                        <input type="text" id="txt_centro_costo" class="m-wrap span12 centroCostos" disabled="disabled" />
                                                    </div>
                                                    <div class="span1">
                                                        <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>

                                                    </div>
                                                    <%-- <select id="cboCentroCostos" name="cboCentroCostos" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Centro de Costos" tabindex="1">
                                                        <option></option>
                                                    </select>--%>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <br />
                <div class="row-fluid" style="text-align: center; font-weight: bold">
                    <div class="span6"></div>
                    <div class="span6">
                        <div class="span6">
                        </div>
                        <div class="span6">
                            <div class="span6">
                                <div class="span12 alert-success">
                                    EGRESO TOTAL<br />
                                    <label id="lbl_egreso_sol">-</label>

                                </div>
                            </div>
                            <div class="span6">
                                <div class="span12 alert-success">
                                    EGRESO TOTAL<br />
                                    <label id="lbl_egreso_dol">-</label>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
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
                                    <th style="text-align: left">CONCEPTO
                                    </th>
                                    <th style="text-align: left">BENEFICIARIO
                                    </th>
                                    <th style="text-align: center">MONEDA
                                    </th>
                                    <th style="text-align: right">MONTO
                                    </th>
                                    <th>DOCUMENTO
                                    </th>
                                    <th>NUMERO
                                    </th>
                                    <th>FEC. EMISION
                                    </th>
                                    <th>FEC. REGISTRO
                                    </th>
                                    <th>PROVISIONADO POR
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>ASIENTO CONTABLE
                                    </th>
                                    <th>CENTRO DE COSTOS
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
<script type="text/javascript" src="../vistas/CP/js/CPMPGAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLPGAS.init();

    });
</script>
