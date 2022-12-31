<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLPLAN.ascx.vb" Inherits="vistas_NN_NNPLANI" %>
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
                <h4><i class="icon-reorder" ></i>GENERACION PLANILLA</h4>
                <div class="actions">
                 <%--   <a class="btn black" href="javascript:imprimirDiv2(['divRegistroCompras']);" style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
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
                    <div class="row-fluid" id="Div1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>TIPO PLANILLA</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_tipo_planilla" class="span12" data-placeholder="Tipo Planilla">
                                  <%--<option></option>
                                  <option value="1">QUINCENAL</option>
                                  <option value="2">MENSUAL</option>--%>
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
                            
                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                              <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddMes" runat="server" />
  <%--                  <asp:HiddenField ID="hddRuc" runat="server" />
                    <asp:HiddenField ID="hfind_vacio" runat="server" />--%>
                    <asp:HiddenField ID="hddTabla" runat="server" />
                    <div class="span12">
                        <div class="span6">

                        </div>
                        <div class="span6">
                             <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnGenerarLibro" style="display:none;" class="btn orange">Generar Planilla</a>
                            </div>
                        </div>
                    </div>


                            <div class="span1">
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
                    <div id="divPlanillas" style="overflow: scroll; margin-bottom:20px;resize:vertical;">
                    </div>
                </div>
        </div>
    </div>
</div>
    </div>

<script type="text/javascript" src="../vistas/NN/js/NNLPLAN.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLPLAN.init();
    });

</script>
