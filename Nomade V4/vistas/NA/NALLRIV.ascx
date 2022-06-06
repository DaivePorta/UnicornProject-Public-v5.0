<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALLRIV.ascx.vb" Inherits="vistas_NA_NALLRIV" %>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGISTRO DE INVENTARIO  PERMANENTE VALORIZADO </h4>
                <div class="actions">
                    <%--<a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                      <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','filtros_3','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid"  id="filtros_1">

                    <div class="span1">
                        <div class="control-group ">
                            <label>PERIODO</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                               <%-- <select id="cboAnio" class="span12" data-placeholder="AÑO">
                                </select>--%>
                                 <input id="txtanio"   class="span12" type="text" data-provide="typeahead" />
                                
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMes" class="span12" data-placeholder="MES">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid"  id="filtros_2">
                    <div class="span1">
                        <div class="control-group ">
                            <label>EMPRESA</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>





                    <div class="span1">
                        <div class="control-group ">
                            <label>RUC</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtRuc" class="span12" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label>ALMACEN</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">

                            <div class="controls">

                                <select id="hf10" class="span12" data-placeholder="ALMACEN">
                                    <option></option>
                                </select>

                            </div>

                        </div>
                    </div>





                    <div class="span1">
                        <div class="control-group ">
                            <label>DIRECCION</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDireccion" class="span12" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>

                </div>




                <div class="row-fluid"  id="filtros_3">



                    <div class="span1">
                        <div class="control-group ">
                            <label>DESCRIPCION</label>
                            <br />
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div id="input_desc_prod" class="controls">
                                <input id="txtDescr" class="span12" type="text" data-provide="typeahead" />

                            </div>
                        </div>
                    </div>



                    <div class="span1">
                        <div class="control-group ">
                            <label>CODIGO DE LA EXSISENCIA</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtExist" class="span12" type="text" data-provide="typeahead" />
                                <input id="hddUnidad" class="span12" type="hidden" />
                                <input id="hdcodProd2" class="span12" type="hidden" />
                            </div>
                        </div>
                    </div>




                    <div class="span1">
                        <div class="control-group ">
                            <label>TIPO(TABLA5)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtTipo" class="span12" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>


                    <%--                    <input id="hddMes" runat="server"  class="span12" type="hidden"   /> 
                      <input id="hddAnio"  runat="server"   class="span12" type="hidden"   /> --%>



                    <asp:HiddenField ID="hddAnio" runat="server" />
                    <asp:HiddenField ID="hddMes" runat="server" />
                    <asp:HiddenField ID="hddRuc" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />
                    <input id="hdcodProd1" class="span12" type="hidden" />



                    <div class="span1">
                        <div class="control-group ">
                            <label>CODIGO DE LA UNIDAD DE MEDIDAD(TABLA6)</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodUni" class="span12" type="text" data-provide="typeahead" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">

                    <div class="span7">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">

                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">

                                <a id="exportar" class="btn orange">Generar Libro</a>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">

                                <%--<a id="descargar" class="btn green" >DESCARGAR</a>--%>
                                <asp:Button class="btn green" ID="Button1" runat="server" Text="Libro PDF" />

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">

                                <%--<a id="descargar" class="btn green" >DESCARGAR</a>--%>
                                <asp:Button class="btn green" ID="Button2" runat="server" Text="Libro TXT" />

                            </div>
                        </div>
                    </div>

                </div>



                <div class="row-fluid">
                    <div id="tblProductos">
                    </div>
                </div>



            </div>




        </div>


    </div>
</div>

<script type="text/javascript" src="../vistas/NA/js/NALLRIV.js"></script>
<%--<script type="text/javascript" src="../vistas/NA/js/NALMERC.js"></script>--%>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />





<script>


    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALLRIV.init();


    });

</script>


