<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLCHEQ.ascx.vb" Inherits="vistas_NB_NBLCHEQ" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CHEQUES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmcheq" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblcheq" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">
                                 EMPRESA</label>
                         </div>
                     </div>

                     <div id="filter_emp" class="span2" data-column="2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="combo m-wrap span12 required" data-placeholder="EMPRESA" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                    </div>

                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">
                                 CUENTA</label>
                         </div>
                     </div>

                     <div id="filter_cta" class="span3" data-column="2">
                         <div class="control-group">
                             <div class="controls">
                                 <select id="cbocta" class="combo m-wrap span12 required" data-placeholder="CUENTA" tabindex="1">
                                     <option></option>
                                 </select>
                             </div>
                         </div>
                     </div>

                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEstado">
                                 Estado</label>
                         </div>
                     </div>

                     <div id="filter_estado" class="span2" data-column="2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="combo m-wrap span12 required" data-placeholder="ESTADO" tabindex="1">
                                    <%--POR FIRMA, EMITIDO, PAGADO, COBRADO, ANULADO--%>
                                    <option value="">TODOS</option>
                                    <option value="A">ANULADO</option>
                                    <option value="C">COBRADO</option>                                    
                                    <option value="P">PAGADO</option>
                                    <option value="E">EMITIDO</option>                                        
                                    <option value="F">POR FIRMA</option>
                                    <option value="R">RECHAZADO</option>     
                                    
                                </select>
                            </div>
                        </div>
                    </div>

                     <div class="span1">
                         <div class="control-group">
                             <button type="button" class="btn blue" id="btnFiltrar">FILTRAR</button>
                         </div>
                     </div>


                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>NRO DE CHEQUE
                                    </th>
                                    <th>CUENTA
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>TIPO</th>
                                    <th>FECHA EMISION
                                    </th>
                                    <th>FECHA REGISTRO
                                    </th>
                                     <th>FECHA VENCE
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>GIRADO A
                                    </th>
                                    <th>FIRMANTE
                                    </th>
                                    <th>ESTADO
                                    </th>
                                   
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjJSON" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMCHEQ.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLCHEQ.init();
       
    });
</script>