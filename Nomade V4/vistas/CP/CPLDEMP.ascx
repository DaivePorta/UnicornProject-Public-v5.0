<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLDEMP.ascx.vb" Inherits="vistas_CP_CPLDEMP" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE DE DEUDA DE EMPLEADO</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo  span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
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

                </div>
                <br />

                <div class="row-fluid" id="bloqueTipoCambio" style="display: none; font-size:larger; text-align:center ">
                   
                  
                      <div style="padding:11px;">
                            <span><b>TIPO CAMBIO : </b></span>OFICIAL - VENTA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span><b>AL : </b></span><span id="fechaTipoCambio">22/227/22</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <span><b>CAMBIO : </b></span><span id="valorTipoCambio">3.54</span>
                       
                   </div>
                 

                </div >
                <div class="row-fluid" style="display: block; text-align:center; font-size:larger;">
                    
                   
                    <b>TOTAL (<span id="desc_mone_base">PEN</span>) : </b><span id="simb_mone_base">S/.</span><span id="total_deuda_soles">-</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <b>TOTAL (<span id="desc_mone_alt">USD</span>) : </b><span id="simb_mone_alt">$</span> <span id="total_deuda_dolares">-</span> 

                </div>


                <br />


                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span8" id="table">
                        <table id="tbl_deuda_emp" class="table   table-bordered ">
                            <thead style="background-color: #23779B; color: white;">
                                <tr>

                                    <th style="width:20%!important">EMPLEADO 
                                    </th>
                                    <th style="width:10%!important">CARGO
                                    </th>
                                    <th style="width:3%!important;text-align:right;">DEUDA (PEN)
                                    </th>
                                    <th style="width:3%!important;text-align:right;">DEUDA (USD)
                                    </th>
                                  

                                </tr>
                            </thead>
                        </table>

                    </div>
                     <div class="span2"></div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<div id="hiddens">
</div>

<script type="text/javascript" src="../vistas/CP/js/CPLDEMP.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLDEMP.init();
    });
</script>
