<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLPLRQ.ascx.vb" Inherits="vistas_NN_NNLPLRQ" %>
<style>
    #tblRenta {
        max-width:3000px ;
        width:2570px ;
    }
     #tblRenta thead tr{     
         font-size:0.9em !important;
         color:white;

     }
    #tblRenta thead  th{
         text-align:center;
         vertical-align:middle;
         word-wrap:break-word;
         font-size:0.9em !important;
         border: 1px solid black;
         color:white;
    }

    #tblRenta thead {
       background-color:#cbcbcb;
    }
    #tblRenta tbody td {
        font-size:1.3em !important;
    }

</style>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder" ></i>DECLARA PLAME RENTAS DE 4TA CATEGORIA</h4>
                <div class="actions">
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid" id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>EMPRESA</label>
                        </div>
                    </div>
                    <div class="span4">
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
                                <input class="span12" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                              <input class="span12" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="Div1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>TIPO</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_tipo_planilla" disabled="disabled" class="span12" data-placeholder="Tipo Planilla">
                                    <option value="1">PLAME RENTA DE 4TA CATEGORIA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddMes" runat="server" />
                    <asp:HiddenField ID="hddRUC" runat="server" />
                    <asp:HiddenField ID="hddCadenaPS4" runat="server" />
                    <asp:HiddenField ID="hddCadena4TA" runat="server" />
                    <asp:HiddenField ID="hddTabla" runat="server" />
                    <div class="span12">
                        <div class="span5">
                        </div>
                        <div class="span7">
                             <div class="span2">
                                 <div class="control-group">
                                     <div class="controls">
                                         <a id="buscar" class="btn blue">FILTRAR</a>
                                     </div>
                                 </div>
                             </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn orange" ID="btnExportarPS4" style="display:none;" CssClass="btnExportarPS4 btn orange" runat="server" Text="Exportar .ps4" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn orange" ID="btnExportar4TA" style="display:none;" CssClass="btnExportar4TA btn orange" runat="server" Text="Exportar .4ta" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <asp:Button class="btn green" ID="btn_xls" style="display:none;" CssClass="btn_xls btn green" runat="server" Text="Descargar XLS" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                <div class="row-fluid">
                    <div id="divRenta" style="overflow: scroll; margin-bottom:20px;resize:vertical;">
                    </div>
                </div>
        </div>
    </div>
</div>
    </div>

<script type="text/javascript" src="../vistas/NN/js/NNLPLRQ.js"></script>

<script>
    jQuery(document).ready(function () {
        NNLPLRQ.init();
    });
</script>
