﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="COLRECO.ascx.vb" Inherits="vistas_CO_COLRECO" %>
<style>
    #tblRegistroCompras {
        max-width: 3000px;
        width: 2570px;
    }

        #tblRegistroCompras thead tr {
            font-size: 0.9em !important;
            color: white;
        }

        #tblRegistroCompras thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 0.9em !important;
            border: 1px solid black;
            color: white;
        }

        #tblRegistroCompras thead th {
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
            font-size: 0.9em;
        }

        #tblRegistroCompras thead {
            background-color: #cbcbcb;
        }

        #tblRegistroCompras tbody td {
            font-size: 1.3em !important;
        }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LIBRO 8 SUNAT: REGISTRO DE COMPRAS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv2(['divRegistroCompras']);" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>EMPRESA</label>
                        </div>
                    </div>
                    <div class="span4" id="divCboEmpresa">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" id="filtros_2">
                    <div class="span1">
                        <div class="control-group ">
                            <label>PERIODO</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <%-- <select  id="cboAnio" class="span12" data-placeholder="AÑO">
                                </select>--%>
                                <input id="txtanio" class="span12" placeholder="AÑO" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMes" class="span12" data-placeholder="MES" tabindex="-1" title="" style="display: none;">
                                    <option></option>
                                    <option value="01">ENERO</option>
                                    <option value="02">FEBRERO</option>
                                    <option value="03">MARZO</option>
                                    <option value="04">ABRIL</option>
                                    <option value="05">MAYO</option>
                                    <option value="06">JUNIO</option>
                                    <option value="07">JULIO</option>
                                    <option value="08">AGOSTO</option>
                                    <option value="09">SETIEMBRE</option>
                                    <option value="10">OCTUBRE</option>
                                    <option value="11">NOVIEMBRE</option>
                                    <option value="12">DICIEMBRE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <asp:HiddenField ID="hddCtlg" runat="server" />
                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddMes" runat="server" />
                    <asp:HiddenField ID="hddDescMes" runat="server" />

                    <asp:HiddenField ID="hddRuc" runat="server" />
                    <asp:HiddenField ID="hfind_vacio" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />

                    <div id="filtros_3">
                        <div class="span1">
                            <div class="control-group ">
                                <label>TIPO</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipo" class="span12" data-placeholder="REGISTRO" disabled="disabled">
                                        <option value="080100" selected="selected">Registro de Compras</option>
                                        <option value="080200">Registro de Compras - Información de operaciones con sujetos no domiciliados</option>
                                        <option value="080300">Registro de Compras Simplificado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span7">
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="buscar" class="btn blue span12">FILTRAR</a>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnGenerarLibro" class="btn orange span12">Generar Libro</a>
                                </div>
                            </div>
                        </div>

                        <div class="span8">
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroPDF" CssClass="btnLibroPDF btn green span12" runat="server" Text="Libro PDF" />
                                    </div>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btnLibroTXT" CssClass="btnLibroTXT btn green span12" runat="server" Text="Libro TXT" />
                                    </div>
                                </div>
                            </div>

                            <div class="span4">
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
                    <div id="divRegistroCompras" style="overflow: scroll; height: 450px; margin-bottom: 20px; resize: vertical;">
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CO/js/COLRECO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        COLRECO.init();
    });

</script>

