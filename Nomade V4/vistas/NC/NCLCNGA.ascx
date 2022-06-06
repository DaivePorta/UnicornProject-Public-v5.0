<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCNGA.ascx.vb" Inherits="vistas_NC_NCLCNGA" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA GRUPOS/SUBGRUPOS CONCEPTOS GASTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMCNGA" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NCLCNGA" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="limpiar combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12" id="table">
                        <table id="tblgru_subgru" class="display " style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>CTA. CONTABLE
                                    </th>
                                     <th>CONCEPTO
                                    </th>
                                    <th>TIPO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                     <%-- <th style="display:none;">DESC_CUENTA
                                    </th>--%>
                                    
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMCNGA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCNGA.init();

    });
</script>
