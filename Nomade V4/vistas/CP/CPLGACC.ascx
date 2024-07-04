<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLGACC.ascx.vb" Inherits="vistas_CP_CPLGACC" %>
<style>
    #tblRegistroGastos {
        max-width: 3000px;
        width: 2570px;
    }

        #tblRegistroGastos thead tr {
            font-size: 1.3em !important;
            color: white;
        }

        #tblRegistroGastos thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 0.9em !important;
            border: 1px solid black;
            color: white;
        }

        #tblRegistroGastos thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 1.2em;
        }

        #tblRegistroGastos thead {
            background-color: #cbcbcb;
        }

        #tblRegistroGastos tbody td {
            font-size: 1.3em !important;
        }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>DESTINO DE GASTOS POR CENTRO DE COSTOS</h4>
                <div class="actions">
                    <a class="btn green" onclick="javascript:NuevaCarga();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
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
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboNivel">
                                Nivel</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNivel" class="span12" data-placeholder="Niveles">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCCostos">
                                Centro de costos</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboCCostos" class="span12" data-placeholder="CentroCostos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="row-fluid">                    
                    <div class="span1">
                        <div class="control-group ">
                            <label>Periodo</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span12" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                            </div>
                        </div>
                    </div>                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue span12">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                    <a id="btnDescargarLibroPDF" class="btn red span12">Descargar PDF</a>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <asp:Button class="btn green" ID="btnLibroXls" CssClass="btnLibroXls btn green span12" runat="server" Text="Descargar XLS" />
                            </div>
                        </div>
                    </div>
                    <div class="span1" style="display: none;">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <asp:Button class="btn green" ID="btnLibroPDF" CssClass="btnLibroPDF btn green span12 " runat="server" Text="Descargar PDF"  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddDescEmpresa" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />
                    <asp:HiddenField ID="hddCtlg" runat="server" />
                    <asp:HiddenField ID="hddScsl" runat="server" />
                    <asp:HiddenField ID="hddNivel" runat="server" />
                    <asp:HiddenField ID="hddCCostos" runat="server" />
                    <asp:HiddenField ID="hddDesCCostos" runat="server" />
                </div>
                <br>
                <br>
                <div class="row-fluid">
                    <div id="divRegistroGastos" style="overflow: scroll; height: 550px; margin-bottom: 20px; resize: vertical;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPLGACC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLGACC.init();

    });
</script>