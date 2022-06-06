<%@ Control Language="VB" AutoEventWireup="false" CodeFile="BBLCONF.ascx.vb" Inherits="vistas_BB_BBLCONF" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
     
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA CONFIGURACÍON DE SISTEMA PENSIONES</h4>
                <div class="actions">
              
                    <a href="javascript:NuevoListado();" class="btn green" id="btnNuevo"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=BBLCONF" class="btn red"><i class="icon-list"></i>Listar</a>
                          <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                </div>
            </div>
                   <div class="portlet-body">
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
                            <a id="btn_filtrar" class="btn blue" ><i class="icon-search"></i>Buscar</a>
                        </div>
                    </div>


                    <div class="span1" id="DivFecha">
                        <asp:HiddenField ID="hfComision" runat="server" Value="0" />

                        <input type="hidden" value="0" />
                    </div>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblConfiguracion" border="0" class="display DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th style="display: none;">CÓDIGO</th>
                                    <th style="display: none;">COLUMNA</th>
                                    <th style="text-align:left;">DESCRIPCIÓN</th>
                                    <th>GRUPO</th>
                                    <th>AFP</th>
                                    <th>ONP</th>
                                    <th style="display: none;">OTROS</th>
                                     <th>ESTADO</th>
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

<script type="text/javascript" src="../vistas/BB/js/BBLCONF.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        BBLCONF.init();

    });
</script>
<p>
    &nbsp;</p>

