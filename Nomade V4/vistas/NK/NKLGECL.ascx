<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NKLGECL.ascx.vb" Inherits="vistas_NK_NKLGECL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CLIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nkmgecl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nklgecl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span12" data-column="5">

                        <div class="span1"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span3">
                            <select id="cboEmpresas" class="span12 empresa" data-placeholder="Empresa">
                            </select>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" style="display: inline-block;">Mostrar Clientes Inactivos</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <input type="checkbox" id="chkInactivos" name="chkInactivos"/>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPersonas" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                     <th>CODIGO
                                    </th>
                                    <th>RAZON SOCIAL
                                    </th>
                                    <th>TIPO DOCUMENTO
                                    </th>
                                    <th>NRO. DOCUMENTO
                                    </th>
                                    <th>CATEGORIA
                                    </th>
                                    <th>FEC. INICIO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>DIRECCION
                                    </th>
                                    <th>TELEFONO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <%--DPORTA--%>
                                    <th>ESTADO 
                                    </th>
                                    <th>Cambio Estado
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjPersona" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NK/JS/NKMGECL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NKLGECL.init();

    });
</script>
