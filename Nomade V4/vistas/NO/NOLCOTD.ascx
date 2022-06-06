<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLCOTD.ascx.vb" Inherits="vistas_NO_NOLCOTD" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA SOLICITUD DE COTIZACION DIRECTA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nomcotd" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nolcotd" class="btn red"><i class="icon-list"></i>Listar</a>
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
                        <div class="span3">
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

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcSucural" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Tipo de Solictud.</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div2">
                                    <select id="cbo_tipo_solic" name="slcSolicitud" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option  value="">TODOS</option>
                                        <option  value="B">BIENES</option>
                                         <option value="S">SERVICIOS</option>
                                    </select>
                                   
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span12">

                        <table id="tbl_cot" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th style="display: none;"></th>
                                    <th>NRO SOLICITUD
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>ESTABLECIMIENTO
                                    </th>
                                    <th>FECHA TRAN
                                    </th>
                                    <th>ESTADO
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
<script src="../vistas/NO/js/NOMCOTD.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLCOTD.init();

    });
</script>
