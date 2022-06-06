<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLADAP.ascx.vb" Inherits="vistas_NN_NNLADAP" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>BANDEJA APROBACIÓN ADELANTO DE SUELDOS</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a> 
                    <a href="?f=nnladap" class="btn red"><i class="icon-list"></i>Bandeja</a>            
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                     <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="cboEmpresa">
                                Empresa:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Seleccione Empresa">
                                </select>
                            </div>
                        </div>
                    </div>

                      <div class="span1">
                        <div class="control-group">
                            <label id="Label2" class="control-label" for="cboSucursal">
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

                     <div class="span1">
                        <div class="control-group">
                            <label id="Label4" class="control-label" for="cboSucursal">
                                Estado:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Estado">
                                    <option value="G">GENERADO</option>
                                     <option value="A">APROBADO</option>
                                     <option value="R">RECHAZADO</option>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="cboEmpleado">
                                 Periodo:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                               <input class="span12" type="text" id="txt_Mes" data-date-format="MM" aria-disabled="true" name="txt_Mes" placeholder="MES">                             
                            </div>
                        </div>
                    </div>
                      
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                               <input class="span12" data-date-format="yyyy" type="text" id="txt_Anio" name="txt_Anio" placeholder="AÑO">                              
                            </div>
                        </div>
                    </div>
                     <div class="span2">      
                        <input id="chkTodos" type="checkbox"/> Todos                                                    
                    </div>
                   
                                        
                </div>
               
                <div class="row-fluid">

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="divAdelanto">
                            <table id="tblAdelanto" class="table display table-bordered DTTT_selectable" role="grid">
                                <thead style="background-color: rgb(85, 85, 85); color: white;">
                                    <tr>
                                        <th>NRO. DOC.</th>
                                        <th>EMPLEADO</th>
                                        <th>FECHA REG.</th>
                                        <th>SOLICITADO</th>
                                        <th>APROBADO</th>
                                        <th>MONEDA</th>
                                        <th>MOTIVO</th>
                                        <th>ESTADO</th>
                                        <th style="min-width: 100px; width: 100px">ACCIONES</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                </div>




            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCTLG_CODE" />
        <input type="hidden" id="hfESTADO_CONT" />
    </div>


</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMADAP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLADAP.init();

    });
</script>