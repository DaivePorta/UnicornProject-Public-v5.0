<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLACCE.ascx.vb" Inherits="vistas_NS_NSLACCE" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-ok-sign"></i>LISTA DE ACCESOS</h4>
             </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="7" />
                <input type="hidden" id="hf_asignados"/>
                <div class="alert alert-error hide">
                              <button class="close" data-dismiss="alert"></button>
                              Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                           </div>
                <div class="alert alert-success hide">
                              <button class="close" data-dismiss="alert"></button>
                              Datos ingresados correctamente.
                           </div>
                <!-- primera linea --->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtempleado">
                                USUARIO</label>

                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <asp:TextBox ID="txtempleado" CssClass="span12 m-wrap required" runat="server"></asp:TextBox>
                                <asp:HiddenField ID="hfObjJson" runat="server" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtfinicio">
                                F-Inicio</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <asp:TextBox ID="txtfinicio" CssClass="m-wrap span12 fecha required" runat="server" data-date-format="dd/mm/yyyy"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtffin">
                                F-Fin</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <asp:TextBox ID="txtffin" CssClass="m-wrap span12 fecha required" runat="server" data-date-format="dd/mm/yyyy"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <asp:Button ID="Button1" runat="server" Text="Filtrar" CssClass="btn blue" />
                    </div>
                </div>
                <!---fin linea -->
                <div class="row-fluid">
                    <table id="tblBandeja" class="display  DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr align="center">
                                   <%-- <th>AUTH
                                    </th>--%>
                                    <th>USUARIO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>SUCURSAL
                                    </th>
                                    <th>IP
                                    </th>
                                    <th>NAVEGADOR
                                    </th>
                                    <th>FECHA
                                    </th>
                                </tr>
                            </thead>
                           </table>
                </div>

            </div>
        </div>
   </div>
    </div>
<script type="text/javascript" src="../vistas/NC/js/NSMACCE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLACCE.init();
    });
</script>
