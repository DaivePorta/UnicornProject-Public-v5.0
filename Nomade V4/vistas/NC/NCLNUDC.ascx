<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLNUDC.ascx.vb" Inherits="vistas_NC_NCLNUDC" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA NUMERACION DE TIPOS DE DOCUMENTO COMERCIAL</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=ncmautd" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclnudc" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Tipo Doc</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoDoc" class="span12" data-placeholder="TIPO DOC">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblNTDComercial" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>TIPO DOC
                                    </th>
                                    <th>TIPO IMPRESION
                                    </th>
                                    <th>CAJA/ALMACEN
                                    </th>
                                    <th>IMPRENTA
                                    </th>
                                    <th>CORRELATIVO
                                    </th>
                                    <th>NRO DIGITOS
                                    </th>
                                    <th>SERIE
                                    </th>
                                    <th>VALOR INICIO
                                    </th>
                                    <th>VALOR FIN
                                    </th>
                                    <th>CODIGO
                                    </th>
                                    <th>CODE_EMPRESA
                                    </th>
                                    <th>TIPO_DOC
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfObjNTDComercial" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCNUDC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLNUDC.init();

    });
</script>
