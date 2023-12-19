<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLRENQ.ascx.vb" Inherits="vistas_NN_NNLRENQ" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>RETENCIONES DE RENTA 4TA CATEGORIA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NNLDREQ" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLRENQ" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span4">
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
                                <select id="slcSucursal" name="slcSucural" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Año</label>
                            <div class="controls">
                                <input type="text" class="span8" id="txtAnio" style="text-align: center" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_filtrar" type="button" style="margin-top: 22px; text-align: left" class="b btn purple span6"><i class="icon-search"></i>&nbsp;Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbl_honorarios" class="table-hover  DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th style="text-align: center">
                                    </th>
                                    <th style="text-align: center">MONTO RETENIDO
                                    </th>
                                    <th style="text-align: center">R.H. RETENIDOS NETO
                                    </th>
                                    <th style="text-align: center">REC. HONORARIOS RETENIDOS
                                    </th>
                                    <th style="text-align: center">TOTAL REC. HONORARIOS
                                    </th>
                                    <th style="text-align: center">NRO REC. HONORARIOS
                                    </th>
                                    <th style="text-align: center">NRO REC. HONORARIOS CON RETENCION
                                    </th>
                                    <th style="text-align: center">NRO REC. HONORARIOS CON SUSPENSION
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
<script type="text/javascript" src="../vistas/NN/js/NNLDREQ.js"></script>
<script>
    jQuery(document).ready(function () {
        NNLRENQ.init();
    });
</script>
