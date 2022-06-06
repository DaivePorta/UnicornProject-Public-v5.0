<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLPAFP.ascx.vb" Inherits="vistas_NN_NNLPAFP" %>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA GENERACION PLANILLA  AFP</h4>
                <div class="actions">
                    <a class="btn green"  href="?f=NNMPAFP" ><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLPAFP" class="btn red"><i class="icon-list"></i>Listar</a>
                    <%--<a class="btn black" href="javascript:imprimirDiv3(['divBoletas']);" style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                       <div class="span3 ">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                    <div class="span4"></div>
                    <div class="span2" style="margin-top:25px;">
                       <a target="_blank" href="?f=NNLAFPP" class="btn mini green"><i class="icon-share"></i> Ir a planillas afp</a>
                    </div>
                </div>

                <br />
         <div class="row-fluid">
                <div class="span12" id="table">
                    <table id="tbl_afp" class="table table-bordered table-striped DTTT_selectable table-hover">
                        <thead style="background-color:#23779B;color:white;">
                            <tr>
                                
                                <th>EMPRESA 
                                </th>
                                <th>PLANILLA RRHH
                                </th>
                                 <th>NRO AFP
                                </th>
                                 <th>NRO EMPL
                                </th>
                                 <th>FECHA
                                </th>
                                <th>USUARIO
                                </th>
                            </tr>
                        </thead>
                    </table>
                   
                </div>
                         </div>
            
                </div>



            </div>
        </div>
    </div>





<script type="text/javascript" src="../vistas/NN/js/NNMPAFP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLPAFP.init();
    });

</script>