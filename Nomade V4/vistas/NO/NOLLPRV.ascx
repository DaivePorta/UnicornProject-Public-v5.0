<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLLPRV.ascx.vb" Inherits="vistas_NO_NOLLPRV" %>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE PRECIOS DE PROVEEDORES</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','tblProveedores']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    
                </div>
            </div>

            <div class="portlet-body">
                
                <div class="row-fluid"  id="filtros_1">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
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
                            <label>Proveedor</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div id ="input_desc_prod" class="controls">
                                 <input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor"/>
                            </div>
                        </div>
                    </div>

                     <div class="span1">
                        <div class="control-group ">
                            <label>Producto</label>
                            <br />
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div  id="input_desc" class="controls">
                                <input id="txtDescr" class="span12" type="text"  placeholder="Producto"data-provide="typeahead" />
                                
                            </div>
                        </div>
                    </div>

                   <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                  <a id="buscar" class="btn blue" >FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="row-fluid">
                    <p style="font-style: italic; color: blue; text-align: right">
                        <medium id="smIncIGV">* El costo <b> NO </b> incluye IGV - Los precios <b> SI </b> incluyen IGV *</medium>
                    </p>
                </div>
   
              <div class="row-fluid">
                    <div id="tblProveedores">
                        <table id="tblbmodal" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CODIGO</th>
                                    <th>PROVEEDOR</th>
                                    <th>FECHA EMISIÓN</th>
                                    <th>DESCRIPCIÓN PRODUCTO</th>
                                    <th>UNIDAD</th>
                                    <th>MONEDA</th>
                                    <th>COSTO ÚLTIMO</th>
                                    <th>PRECIO ÚLTIMO</th>
                                    <th>PRECIO MEDIO</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

    </div>


</div>
</div>
<input id="hfPIDM" type="hidden" />
<input id="hdcodProd2"  class="span12" type="hidden"   /> 
<script type="text/javascript" src="../vistas/NO/js/NOLLPROV.js"></script>
<%--<script type="text/javascript" src="../vistas/NA/js/NALMERC.js"></script>--%>


<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />


<script>


    function exporExcel(tblbmodal)
    {
        var htmltable = document.getElementById('tblbmodal');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,'+ encodeURIComponent(html));
    }

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLLPROV.init();


    });

</script>