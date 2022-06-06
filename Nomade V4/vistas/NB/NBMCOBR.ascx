<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMCOBR.ascx.vb" Inherits="vistas_NB_NBMCOBR" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REGISTRAR COBRO CHEQUES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmCOBR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblCOBR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span6">
                     
                        <%--<div class="span2"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span8"></div>--%>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cbo_Empresa">
                                    <b>EMPRESA:</b></label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>

                     <div id="filter_cta" class="span6">
                     
                        <div class="span2"><b>CUENTA:</b></div>
                        <div id="filcta" class="span8"></div>

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
                    <a id="grabarA" class="btn blue" href="javascript:CrearCobro();"><i class="icon-save"></i> Grabar</a>
                    <a id="grabarR" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<input type="hidden" id="hddauxiliar" value="">
<input type="hidden" id="hddauxiliar2" value="0">
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMCOBR.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMCOBR.init();
     

    });
</script>