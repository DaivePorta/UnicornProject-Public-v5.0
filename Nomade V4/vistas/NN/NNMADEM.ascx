<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMADEM.ascx.vb" Inherits="vistas_NN_NNMADEM" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;ADELANTO DE SUELDOS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nnmadem" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nnladem" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label7" class="control-label" for="txtNroDoc">
                                Nro. Documento:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNroDoc" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span1 offset2">
                        <label>Fecha Registro:</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker obligatorio" placeholder="dd/mm/yyyy" id="txtFechaReg" data-date-format="dd/mm/yyyy" style="font-size: small" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                     <div class="span1 offset1">
                        <label>ESTADO:</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblEstado" style="font-weight:bold;font-size:medium;">-</label>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label2" class="control-label" for="cboEmpresa">
                                Empresa:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Seleccione Empresa">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label4" class="control-label" for="cboSucursal">
                                Sucursal:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12" data-placeholder="Seleccione Sucursal">
                                </select>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEmpleado" class="control-label" for="cboEmpleado">
                                Empleado:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="lblRemBasica">
                                Rem.Básica Actual:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                              <label class="span6" id="lblSimb" style="font-size: large; font-weight: bold; text-align: right;">
                                .</label>
                            <label id="lblRemBasica" style="font-size: large; font-weight: bold; text-align: right;">
                                0.00</label>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">


                    <div class="span1">
                        <div class="control-group">
                            <label id="Label6" class="control-label" for="txtMonto">
                                Monto:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span3">
                            <div class="controls">
                                <input type="text" id="txtMonto" class="span12" onkeypress="return ValidaDecimales(event,this)" style="text-align:right" />
                            </div>
                            
                        </div>  
                               
                            
                            
                        <div class="span1"><label id="Label9" style="text-align:left;font-size:small;color:green;">Máx.</label></div>
                            <div class="span1">                                
                                <label id="lblTope" style="text-align:left;font-size:small;color:green;">0</label>
                            </div>                                                  
                       

                      <div class="span3">
                            <label id="Label3" style="font-size:small; text-align:left;color:green;margin-left:-6px;">% del Sueldo : </label></div>  
                        <div class="span3">
                            <label id="lblMontoTope" style="font-size:small; text-align:left;color:green;margin-left:-6px; font-weight:bold">0.00</label></div>                  
                    </div>

                                           
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label5" class="control-label" for="cboMoneda">
                                Moneda:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Seleccione Moneda" disabled="disabled">
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label8" class="control-label" for="txtMotivo">
                                Motivo:</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtMotivo" class="span12"  style="text-align: left" />
                            </div>

                        </div>
                    </div>

                </div>



                <div class="row-fluid">
                    <div class="form-actions">                      
                         <a id="grabar" class="btn blue" href="javascript:CrearAdelanto();"><i class="icon-save"></i>&nbsp;Grabar</a>
                         <a class="btn" href="?f=nnmadem"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    </div>
                </div>


            </div>
        </div>
        <!-- FIN CUADRO PARA LA FORMA-->
        <div>
            <input type="hidden" id="hfMOBA_CODE" />
            <%--<input type="hidden" id="hfTOPE_ADEL" />--%>
        </div>


    </div>
 </div>
    <!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMADEM.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMADEM.init();

    });
</script>
