<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLBOLE.ascx.vb" Inherits="vistas_NN_NNLBOLE" %>
<style>
    #tblplanilla {
        max-width:3000px ;
        width:2570px ;
    }
     #tblplanilla thead tr{     
         font-size:0.9em !important;
         color:white;

     }
    #tblplanilla thead  th{
         text-align:center;
         vertical-align:middle;
         word-wrap:break-word;
         font-size:0.9em !important;
         border: 1px solid black;
         color:white;
    }
     #tblplanilla thead th{
         text-align:center;
         vertical-align:middle;
         word-wrap:break-word;
         font-size:0.9em;
    }
    #tblplanilla thead {
       background-color:#cbcbcb;
    }
    #tblplanilla tbody td {
        font-size:1.3em !important;
    }


</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder" ></i>GENERACION BOLETA</h4>
                <%--<div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv3(['divBoletas']);" style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>--%>
            </div>

            <div class="portlet-body">

                <div class="row-fluid" id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>EMPRESA</label>
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
                            <label>PLANILLA</label>
                        </div>
                    </div>
                    <div class="span4">
                                        <div class="control-group">
                                         
                                            <div class="controls">
                                                <select id="cbo_planilla" name="cbo_planilla" class="span12 " data-placeholder="Seleccionar Planilla" tabindex="1">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                </div>
        


                <div class="row-fluid">
                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddMes" runat="server" />
                    <asp:HiddenField ID="hddRuc" runat="server" />
                    <asp:HiddenField ID="hfind_vacio" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />
                    <div class="span6">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" >
                                <%--<a id="btnGenerarLibro" class="btn orange">Generar Boleta</a>--%>
                                <button id="btnGenerarLibro" type="button" class="bloquear btn orange span12" disabled="disabled" >GENERAR BOLETA</button>
                            </div>
                        </div>
                    </div>

                    <div class="span1" id="div_btn_descargar" style="display:none;">
                        <div class="control-group">
                            <div class="controls">                        
                                <asp:Button class="btn green" ID="btnLibroPDF" CssClass="btnLibroPDF btn green" runat="server" Text="DESCARGAR"  />
                            </div>
                        </div>
                    </div>

                </div>
            
                <div class="row-fluid">
                    <div id="divBoletas" style="overflow: scroll;height:450px; margin-bottom:20px;resize:vertical;">
                    </div>
                </div>
                

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NN/js/NNLBOLE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLBOLE.init();
    });

</script>
