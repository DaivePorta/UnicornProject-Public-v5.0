<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMPRSD.ascx.vb" Inherits="vistas_NO_NOMPRSD" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DETALLE REQUERIMIENTO DE PRODUCCION</h4>
                <div class="actions">


                  
                    <a class="btn red" href="?f=NOLPRSP"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>
            <div id="div" class="portlet-body">

                <div id="Div2" class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Codigo</label>
                        </div>
                    </div>
                    <div class="span3">
                          <div class="controls">
                            <input id="txtRequi" class="span12 desa" type="text" data-provide="typeahead" />
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Producto</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtproducto" class="span12 desa" type="text" data-provide="typeahead" />
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Unidad de Medida</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtunidad" class="span12 desa" type="text" data-provide="typeahead" />
                        </div>
                    </div>

                </div>

                <div id="Div3" class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Cantidad Total</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtTotal" class="span12 desa" type="text" data-provide="typeahead" />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Estado</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                                    <select id="cboEstado" class="span12" data-placeholder="Estado">
                                        <option value="A">ACTIVO</option>
                                        <option value="I">INACIVO</option>
                                    </select>
                         </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Fase</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtFase" class="span12" type="text" data-provide="typeahead" />
                        </div>
                    </div>

                   

                </div>

                <div id="Div4" class="row-fluid">
                     <div class="span1">
                        <div class="control-group ">
                            <label>Fecha de Registro</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtFechaRegistro" class="span12" type="text" data-provide="typeahead" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Inicio</label>
                        </div>
                    </div>
                    <div class="span3">
                          <div class="controls">
                            <input id="txtFechaIni" class="span12" type="text" data-provide="typeahead"  data-date-format="dd/mm/yyyy"/>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Fecha Fin</label>
                        </div>
                    </div>
                    <div class="span3">
                         <div class="controls">
                            <input id="txtFechaFin" class="span12" type="text" data-provide="typeahead" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>
                <div id="Div5" class="row-fluid">
                 <div class="span1">
                        <div class="control-group ">
                            <label>Glosa</label>
                        </div>
                    </div>
                    <div class="span11">
                         <div class="controls">
                             <textarea id="txtGlosa" class="span12" rows="1"></textarea>
                        </div>
                    </div>
                </div>

                <div id="Div1" class="row-fluid">
                    <div class="span12">
                        <table id="items" class="display DTTT_selectable" border="0">
                            <thead >
                                <tr>
                                    <th>CODDIGO</th>
                                    <th>CODIGO SOLICITUD</th>
                                    <th>ITEM</th>
                                    <th>CANTIDAD</th>
                                    <th>FASE</th>                                                   
                                </tr>
                            </thead>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdproducto"  />
<script type="text/javascript" src="../vistas/NO/js/NOLPRSD.js"></script>
<script>
    jQuery(document).ready(function () {
        NOLPRSD.init();
    });

</script>