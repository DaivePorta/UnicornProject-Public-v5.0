<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPLEMCO.ascx.vb" Inherits="vistas_NP_NPLEMCO" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONTRATO EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a> 
                    <a href="?f=npmemco" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nplemco" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>            
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
                    
                      <div class="span1"></div>

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



                  <%--     <div class="span2">
                         <div class="control-group span12">
                            <div class="controls">
                                <a id="btnVerContrato" class="btn blue">Ver Contrato</a>
                            </div>
                        </div>
                    </div> --%>


                    <div class="span1">
                         <div class="control-group span12">
                            <div class="controls">
                                <a id="btnEmpleado" class="btn black" href = "?f=NPMEMPL" target="_blank" title="Nuevo Empleado"><i class="icon-user"></i></a>
                            </div>
                        </div>
                    </div> 

                    <%--<div class="span1">
                        <div class="control-group">
                            <label id="lblEstado" class="control-label" for="cboEstado">Estado:</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Seleccione Estado">
                                </select>
                            </div>
                        </div>
                    </div>--%>
                    
                      

                </div>
               
                <div class="row-fluid">

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="divContratos">
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
<script type="text/javascript" src="../vistas/NP/js/NPMEMCO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NPLEMCO.init();

    });
</script>