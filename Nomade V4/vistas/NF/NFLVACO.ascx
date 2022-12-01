<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLVACO.ascx.vb" Inherits="vistas_NF_NFLVACO" %>
<style>
    #tblRegistroVentas {
        max-width: 3000px;
        width: 2570px;
    }

        #tblRegistroVentas thead tr {
            font-size: 0.9em !important;
            color: white;
        }

        #tblRegistroVentas thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 0.9em !important;
            border: 1px solid black;
            color: white;
        }

        #tblRegistroVentas thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 0.9em;
        }

        #tblRegistroVentas thead {
            background-color: #cbcbcb;
        }

        #tblRegistroVentas tbody td {
            font-size: 1.3em !important;
        }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONSULTA VALIDEZ COMPROBANTES</h4>
                <div class="actions">
                    <a class="btn red hidden" id="btnDescargarPDF"><i class="icon-download" ></i>&nbsp;Descargar PDF</a>
                    <%--<a class="btn black hidden" id="btnDescargarTXT"><i class="icon-download"></i>&nbsp;Descargar TXT</a>--%>
                    <a class="btn purple hidden" id="btnDescargarXLS"><i class="icon-download"></i>&nbsp;Descargar XLS</a>
                    <a class="btn green" href="?f=NFLVACO"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5" id="divCboEmpresa">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span11" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>

                <div class="row-fluid" id="filtros_2">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10">
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>                                            
                        <div class="span3">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCliente">
                                Cliente</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls" id="divCboCliente">
                                <select id="cboCliente" class="span12" data-placeholder="Cliente">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue span9">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <asp:HiddenField ID="hddCtlg" runat="server" />
                    <asp:HiddenField ID="hddScsl" runat="server" />
                    <asp:HiddenField ID="hddDesde" runat="server" />
                    <asp:HiddenField ID="hddHasta" runat="server" />
                    <asp:HiddenField ID="hddNombreArchivo" runat="server" />
                    <asp:HiddenField ID="hddPIDM" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />

                    <div class="span2"></div>
                    <div class="span7"> 
                        <div class="span8">
                            <div class="span4" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroPDF" CssClass="btnLibroPDF btn green span12 " runat="server" Text="Libro PDF"  />
                                    </div>
                                </div>
                            </div>
                            <div class="span4" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroTXT" CssClass="btnLibroTXT btn green span12" runat="server" Text="Libro TXT" />
                                    </div>
                                </div>
                            </div>
                            <%--<div class="span4" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroTXT2" CssClass="btnLibroTXT2 btn green span12" runat="server" Text="Libro TXT" />
                                    </div>
                                </div>
                            </div>--%>
                            <div class="span4" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroXls" CssClass="btnLibroXls btn green span12" runat="server" Text="Libro XLS" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div id="divRegistroVentas" style="overflow: scroll; height: 500px; margin-bottom: 20px; resize: vertical;">
                    </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <!-- Cargar Tabla -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NF/js/NFLVACO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLVACO.init();
    });

</script>