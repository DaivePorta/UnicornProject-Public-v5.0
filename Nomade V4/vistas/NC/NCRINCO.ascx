<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCRINCO.ascx.vb" Inherits="vistas_NC_NCRINCO" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE DE INCONSISTENCIAS DE CAJA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">
               <div class="row-fluid">
                    <div class="span12">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                        <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    </div>

                </div>

                
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboCaja">Caja</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCaja" class="span12" data-placeholder="CAJA"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cbo_cajeros">Cajero</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_cajeros" class="span12" data-placeholder="CAJEROS"></select>
                                </div>
                            </div>
                        </div>         
                    </div>
                </div>

                <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaDesde">Desde</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaDesde" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label style="text-align: right">Hasta</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaHasta" class="span12" />
                                </div>
                            </div>
                        </div>
                   
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipo">Tipo</label>
                            </div>
                        </div>
                        <div class="span1"></div>
                       <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipo" class="span12" data-placeholder="TIPO DE INCONSISTENCIA">
                                        <option value="">Todos</option>
                                        <option value="F">FALTANTE</option>
                                        <option value="S">SOBRANTE</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                      <div class="span2">
                            <a class="btn blue" href="javascript:cargarReporte();">Ver Reporte</a>
                        </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <hr />
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" style="padding: 0px 15px 0px 15px">
                        <table id="tblReporte" class="table hovered display  DTTT_selectable" border="0">
                            <thead>
                                <tr id="thReporte"></tr>
                            </thead>
                            <tbody id="tbReporte"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="vistas/NC/js/NCRINCO.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        NCRINCO.init();
    });
</script>
