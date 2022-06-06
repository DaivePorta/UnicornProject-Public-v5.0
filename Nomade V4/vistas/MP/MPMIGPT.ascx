<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPMIGPT.ascx.vb" Inherits="vistas_MP_MPMIGPT" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>SALIDA DE ORDEN DE PRODUCCION</h4>
                <div class="actions">



                   <%-- <a class="btn red" href="?f=MPMIGPT"><i class="icon-list"></i>Listar</a>--%>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblingreso']);"><i class="icon-print"></i>&nbsp;Imprimir</a>

                </div>
            </div>

            <div id="id" class="portlet-body">

                <div id="filtros_1" class="row-fluid">

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


                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid" id="filtros_2">
                    <div class="span12">

                        <table id="tblingreso" class="table table-hover display DTTT_selectable">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr>
                                    <th style="display: none">Code</th>
                                    <th style="text-align: center">Orden de Fabricacion</th>
                                    <th style="display: none">core</th>
                                    <th style="text-align: center">Fecha de Cierre</th>
                                    <th style="display: none">code_producto</th>
                                    <th style="text-align: center">Producto</th>
                                    <th style="text-align: center">Cantidad</th>

                                    <th style="text-align: center">Lote</th>
                                    <th style="text-align: center">Empresa</th>
                                    <th style="display: none">Code_Empresa</th>
                                    <th style="text-align: center">Registrar Resultados</th>
                                    <th style="text-align: center">Enviar Alm.</th>
                                </tr>
                            </thead>
                        </table>

                    </div>

                </div>





            </div>




        </div>
    </div>
</div>

<div id="modal-receta" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H1"><i class="icon-search" style="line-height: initial;"></i>&nbsp;DERIVADO DE PRODUCTO</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span1">
                <div class="control-group ">
                    <label>
                        Producto
                    </label>
                </div>
            </div>

            <div class="span3">
                <div class="controls">
                    <input id="txtProducto" class="span12" type="text" data-provide="typeahead" disabled="disabled" />
                </div>
            </div>
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Cant. Ordenada
                    </label>
                </div>
            </div>

            <div class="span2">
                <div class="control-group">
                    <div class="controls">
                        <input id="txtCantidad" class="span12" type="text" data-provide="typeahead" disabled="disabled" onkeypress="return ValidaDecimales(event,this)" />
                    </div>
                </div>
            </div>

            <div class="span2">
                <div class="control-group ">
                    <label>
                        Cant. Producidad
                    </label>
                </div>
            </div>

            <div class="span2">
                <div class="controls">
                    <input id="txtCantidadPro" onkeypress="return ValidaDecimales(event,this)" class="span12" type="text" data-provide="typeahead" />
                </div>
            </div>

        </div>
        <div class="row-fluid">
            <div class="span12" id="div7">
                <table class="table table-hover" id="tblDerivadoProducto">
                    <thead style="background-color: rgb(35, 119, 155); color: white;">
                        <tr>
                            <th style="display: none">CODIGO_PRODUCTO</th>
                            <th style="text-align: center">PROUCTO DERIVADO</th>
                            <th style="text-align: center">CANTIDAD ESTIMADA</th>
                            <th style="text-align: center">UNIDAD MEDIDA</th>

                            <th style="text-align: center">CANTIDAD PRODUCIDA</th>

                        </tr>
                    </thead>

                </table>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="form-actions" id="Div1" style="display: block;">
                    <a id="btnGuardar" class="btn blue"><i class="icon-save"></i>Guardar</a>
                    <button data-dismiss="modal" type="button" id="Button1" class="btn graen">Cancelar</button>
                    <%--<a id="btnSalir" class="btn" href="?f=nomgnlo"><i class="icon-remove"></i>Salir</a>--%>
                </div>
            </div>
        </div>
    </div>

</div>


<div id="naminsa" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="H3"><i class="icon-search" style="line-height: initial;"></i>&nbsp;ENTRADA &nbsp; ALMACEN</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Almacen
                    </label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <select id="cboAlmacen" class="span12" data-placeholder="Almacén">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Operacion
                    </label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input id="txtOperacion" class="span12"  type="text" disabled="disabled" />
                        <input id="hdtipoPor" value="0019" class="span5" type="hidden" disabled />
                    </div>
                </div>
            </div>



        </div>
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Solicitante
                    </label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input id="txtsolicitante" class="span12" type="text" style="text-transform: uppercase" />
                        <input type="hidden" id="txtUsuaSolicitante" />
                       
                    </div>
                </div>
            </div>
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Receptor
                    </label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input id="txtentregar" class="span12" type="text" style="text-transform: uppercase" />
                        
                    </div>
                </div>
            </div>



        </div>
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group ">
                    <label>
                        Emisión
                    </label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="span12 date-picker fecha" placeholder="dd/mm/yyyy" id="txtfechaemision" data-date-format="dd/mm/yyyy" />
                    </div>
                </div>
            </div>
            <div class="span2">
                <div class="control-group">
                    <label class="control-label" for="cboOperacion">Transacción</label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" class="span12 date-picker fecha"  placeholder="dd/mm/yyyy" id="txtfechatransaccion" data-date-format="dd/mm/yyyy" />
                        </div>
                    </div>
                </div>
            </div>



        </div>
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group ">
                    <label class="control-label" for="cboOrigen">
                        Dcto. Origen</label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <select id="cboOrigen" class="span12" data-placeholder="Documento Origen" disabled="disabled">
                            <option value="000" >OTROS</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="span2">
                <label class="span2 control-label" for="txtnumdocOrigen">
                    Nro</label>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">

                        <input id="txtnumdocOrigenserie_0" class="txtnumdocOrigenserie span5" type="text"  value="NTS" disabled="disabled" />
                        <input id="txtnumdocOrigen_0" class="txtnumdocOrigen span7" type="text" disabled />
                        <input id="txtCodigoDoc_0" class="txtCodigoDoc" type="hidden" />
                    </div>
                </div>
            </div>



        </div>
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group ">
                    <label class="control-label" for="cboOrigen">
                       Dcto. Interno de Registro</label>
                </div>
            </div>

            <div class="span4">
              <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboRegistroInterno" class="span12" data-placeholder="Doc. Registro Interno" disabled>
                                                            <option value="0051" >
                                                                GUIA INTERNAMIENTO
                                                            </option>

                                                        </select>
                                                    </div>
                                                </div>
            </div>
            <div class="span2">
                <label class="span2 control-label" for="txtnumdocOrigen">
                    Nro</label>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">

                        <input id="txtSerieRegistroInterno" class="span5" type="text" disabled />
                                                    <input id="txtNroRegistroInterno" class="span7" type="text" disabled />
                    </div>
                </div>
            </div>



        </div>
        
        <div class="row-fluid">
             <div class="span12" id="div2">
                <table class="table table-hover" id="tblDetalle">
                    <thead style="background-color: rgb(35, 119, 155); color: white;">
                        <tr>
                            <th style="display:none">CODIGO_PRODUCTO</th>
                            <th style="display:none">CODIGO_PRODUCTO_ANTIGUO</th>
                            <th style="display:none">UNIDAD_MEDIDAD</th>
                            <th style="text-align: center">PROUCTO</th>
                            <th style="text-align: center">CANTIDAD ESTIMADA</th>
                            <th style="text-align: center">CANTIDAD PRODUCIDAD</th>
                            <th style="text-align: center">COSTO PRODUCTO</th>
                            <th style="text-align: center">TIPO PRODUCTO</th>
                            <th style="display:none">DETRACCION</th>

                        </tr>
                    </thead>

                </table>
            </div>
         </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="form-actions" id="Div6" style="display: block;">
                    <a id="A2" class="btn blue"><i class="icon-save"></i>Guardar</a>
                    <button data-dismiss="modal" type="button" id="Button3" class="btn graen">Cancelar</button>
                    <%--<a id="btnSalir" class="btn" href="?f=nomgnlo"><i class="icon-remove"></i>Salir</a>--%>
                </div>
            </div>
        </div>
    </div>

</div>

<input type="hidden" id="Hidden1" />
<input type="hidden" id="hdproducto" />
<input type="hidden" id="hfPIDM_EMPL2" />
<input type="hidden" id ="hfCOD_AUT_INTERNO"/>
<input type="hidden" id="hfMoneda" />
<input type="hidden" id="hfPIDM_EMPL1" />


<script type="text/javascript" src="../vistas/MP/js/MPMIGPT.js"></script>

<script>
    jQuery(document).ready(function () {
        //Se Inicializa el modulo de javascript para esta forma.
        MPMIGPT.init();

    });
</script>

