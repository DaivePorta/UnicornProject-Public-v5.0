<%@ Control Language="VB" AutoEventWireup="false" CodeFile="BBLCOSP.ascx.vb" Inherits="vistas_NC_BBLCOSP" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA COMISIÓN SISTEMA DE PENSIONES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>                    <%--  <a href="?f=ncmrepe" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclrepe" class="btn red"><i class="icon-list"></i>Listar</a>--%>
                </div>

            </div>
            <input type="hidden" id="hfValidacion"/>
            <input type="hidden" id="hfValidacionConfiguracion"/>
            <div id="oculto" >

            </div>
            <div class="portlet-body">
                <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid" style="text-align:left;">
                     <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">Periodo</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>                      
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <a id="A1" class="btn blue" href="javascript:ListarCabecera();"><i class="icon-search"></i>Buscar</a>
                            <a id="btn_siguiente" class="btn gray" ><i class="icon-plus"></i> Asignar siguiente periodo</a>
                        </div>
                    </div>
                    
                <input type="hidden" value="0" id="hfValidacionControles" />
                    <div class="span1" id="DivFecha">
                        <asp:HiddenField ID="hfComision" runat="server" value="0"/>
                        <asp:HiddenField ID="hfPadre" runat="server" value="0"/>
                        <input type="hidden" value="0" />
                    </div>
                </div>
            </div>
                <div class="row-fluid">
                    <div class="span12" id="TablaDiv" >
                        <%--<table id="tblComision" border="0" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>ACC. 
                                    </th>
                                    <th style="display: none;">CÓDIGO 
                                    </th>
                                    <th>SISTEMA DE PENSIÓN 
                                    </th>
                                    <th>COM. FIJA
                                    </th>
                                    <th>COM. FIJA MENSUAL 
                                    </th>
                                    <th>COM. BRUTA MENSUAL 
                                    </th>
                                    <th>ANUAL SALDO
                                    </th>
                                    <th>PRIMA SEGURO
                                    </th>
                                    <th>PORC. FONDO PENSIONES&nbsp;
                                    </th>
                                    <th>REMUNERACIÓN MÁXIMA
                                    </th>
                                    <th style="display: none;">COD
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/BB/js/BBLCOSP.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        BBLCOSP.init();

    });
</script>
