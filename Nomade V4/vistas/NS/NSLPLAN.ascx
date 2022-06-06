<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLPLAN.ascx.vb" Inherits="vistas_NS_NSLPLAN" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
     <%--          <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
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
                            <a id="A1" class="btn blue" href="javascript:Listar();"><i class="icon-search"></i>Buscar</a>
                        </div>
                    </div>


                    <div class="span1" id="DivFecha">
                        <asp:HiddenField ID="hfComision" runat="server" Value="0" />

                        <input type="hidden" value="0" />
                    </div>
                </div>
            </div>--%>
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Listado de plantilla horario empleado</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a class="btn green" href="?f=NSMPLAN"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=NSLPLAN"><i class="icon-list"></i> Listar</a> 
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPlantilla" border="0" class="display DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Código</th>
                                    <th style="width:80%; text-align:left;">Nombre</th>
                                    <th style="width:20%;">Estado</th>        
                                    <%--<th style="width:5%;"></th>--%>                        
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hffecha" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NS/js/NSLPLAN.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLPLAN.init();

    });
</script>