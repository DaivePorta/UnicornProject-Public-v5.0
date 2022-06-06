<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALGREM.ascx.vb" Inherits="vistas_NA_NALGREM" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE GUIAS DE REMISION</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
               </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>



                    <div class="span1">
                        <div class="control-group ">
                            <label>Almacen</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">

                            <div class="controls">

                                <select id="hf10" multiple="multiple" class="span12" data-placeholder="ALMACEN">
                                    <option></option>
                                </select>

                            </div>

                        </div>
                    </div>


                    <div class="span2">
                        <div class="controls">
                            <a id="buscar" class="btn blue"><i class="icon-search"></i>&nbsp;Buscar</a>
                        </div>
                    </div>
                  


                </div>



                <div class="row-fluid">


                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Inicial</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">

                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaInicial" data-date-format="dd/mm/yyyy" />
                            </div>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Final</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">

                            <div class="controls">          
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaFinal" data-date-format="dd/mm/yyyy" />
                            </div>

                        </div>
                    </div>                
                </div>



                <div class="row-fluid">
                    <div id="tblProductos">
                    </div>
                </div>



                <asp:HiddenField ID="hfObjGR" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NA/js/NALGR.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.


        NALGR.init();

    });
</script>
