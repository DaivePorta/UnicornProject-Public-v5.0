<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMFIRM.ascx.vb" Inherits="vistas_NB_NBMFIRM" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>CHEQUES POR APROBAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmfirm" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblfirm" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <%--<div id="filter_emp" class="span6">
                     
                        <div class="span2"><b>EMPRESA:</b></div>
                        <%--<div id="filemp" class="span8"></div>
                        <select id="slcfilempr" class="span8 empresa" style="margin-bottom: 0px;"></select>

                    </div>

                     <div id="filter_cta" class="span6">
                     
                        <div class="span2"><b>CUENTA:</b></div>
                        <%--<div id="filcta" class="span8"></div>
                         <select id="slcfilcta" class="span8" style="margin-bottom: 0px;"></select>

                    </div>--%>

                     <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                EMPRESA</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                CUENTA</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcCuenta" class="limpiar combo m-wrap span12 required" name="slcCuenta" data-placeholder="Seleccionar Cuenta" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_cuenta" runat="server" />
                            </div>
                        </div>
                    </div>

                      <div class="span2" style="text-align: right;">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btn_Filtrar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1" style="display: none;">
                            <thead>
                                <tr>
                                    <th>&nbsp;
                                    </th>
                                    <th>NRO DE CHEQUE
                                    </th>
                                    <th>CUENTA
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>TIPO</th>
                                    <th>GIRADO A
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>FECHA EMISION
                                    </th>                      
                                  
                                    
                                </tr>
                            </thead>
                        </table>                        
                       
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabarA" class="btn blue" href="javascript:CrearAprobacion('A');"><i class="icon-ok"></i> Aprobar</a>
                    <a id="grabarR" class="btn black" href="javascript:CrearAprobacion('R');"><i class="icon-remove"></i> Rechazar</a>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<input type="hidden" id="hddauxiliar" value="">
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMFIRM.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMFIRM.init();
     

    });
</script>