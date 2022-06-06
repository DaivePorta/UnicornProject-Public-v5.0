<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLREQC.ascx.vb" Inherits="vistas_NO_NOLREQC" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA REQUERIMIENTO DE COMPRA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nomreqc" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nolreqc" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" id="div_filtro">
                    <div class="span12">
 
                           <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
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
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                          <div class="span2">
                        <label class="control-label"></label>
                       <div class="control-group">
                            <div class="controls">
                                <a id="btn_listar" style="margin-top:17px;" class="btn blue"><i class="icon-search"></i>&nbsp;Flitrar</a>
                            </div>
                        </div>
                    </div>

                    </div>

                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">

                        <table id="tblreqs_compra" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO
                                    </th>
                                    <th style="text-align:left; ">DESCRIPCIÓN
                                    </th>
                                    <th>FECHA TRAN
                                    </th>
                                </tr>
                            </thead>

                        </table>
                        <asp:HiddenField ID="hfObjJson" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script src="../vistas/NO/js/NOMREQC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLREQC.init();

    });
</script>
