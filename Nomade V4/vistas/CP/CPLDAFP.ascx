<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLDAFP.ascx.vb" Inherits="vistas_CP_CPLDAFP" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE DE DEUDAS POR PAGAR AFP</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>     
                    <a class="btn purple enviaMail"><i class="icon-envelope"></i>&nbsp Mail</a>
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
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Afp</label>
                            <div class="controls" id="Div3">
                                <select id="cbo_afp" class="bloquear combo span12 " data-placeholder="Seleccionar Afp" tabindex="1">
                                    <option></option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo Desde</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="txtanio_ini" name="txtanio_ini">
                                <input class="span8" type="text" id="txtmes_ini" data-date-format="MM" aria-disabled="true" name="txtmes_ini">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo Hasta</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="txtanio_fin" name="txtanio_fin">
                                <input class="span8" type="text" id="txtmes_fin" data-date-format="MM" aria-disabled="true" name="txtmes_fin">
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
                    <div class="span12" id="table">
                        <table id="tbl_deuda_afp" class="table   table-bordered  table-hover">
                            <thead style="background-color: #23779B; color: white;">
                                <tr>

                                    <th>EMPRESA 
                                    </th>
                                    <th>PERIODO DEVENGUE
                                    </th>
                                    <th>AFP
                                    </th>
                                    <th>NRO PLANILLA
                                    </th>
                                    <th>NRO EMPLEADOS
                                    </th>
                                    <th>TOTAL FONDO(S/.)
                                    </th>
                                    <th>TOTAL RETENCIONES(S/.)
                                    </th>
                                    <th>TOTAL DEUDA(S/.)
                                    </th>
                                    <th>FEC. PRESENTACION
                                    </th>

                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<div id="hiddens">
</div>

<script type="text/javascript" src="../vistas/CP/js/CPLDAFP.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLDAFP.init();
    });
</script>
