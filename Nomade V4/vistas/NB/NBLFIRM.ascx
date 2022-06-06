<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLFIRM.ascx.vb" Inherits="vistas_NB_NBLFIRM" %>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CHEQUES FIRMADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmfirm" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblfirm" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

                <div class="row-fluid" style="margin-bottom: 10px;">
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
               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <%--<div id="filter_emp" class="span6" data-column="3">
                     
                        <div class="span2"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span8"></div>

                    </div>--%>

                     <div class="span6">
                     
                        <div class="span2"><b>FEC. INICIO:</b></div>
                        <div class="span3"><input class="span10" type="text" id="minfecha" name="minfecha" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"></div>
                        <div class="span2"><b>FEC. FIN:</b></div>
                        <div class="span3"><input class="span10" type="text" id="maxfecha" name="maxfecha" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"></div>
                    </div>

                </div>

                  <%--<div class="row-fluid" style="margin-bottom: 10px;">

                   <div id="filter_cta" class="span6" data-column="2">
                     
                        <div class="span2"><b>CUENTA:</b></div>
                        <div id="filcta" class="span8"></div>

                    </div>

                  </div>--%>

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
                                    <th>FECHA FIRMA
                                    </th>
                                    <th>USUARIO
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
<script type="text/javascript" src="../vistas/NB/js/NBLFIRM.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLFIRM.init();

    });
</script>