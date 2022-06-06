<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLPASU.ascx.vb" Inherits="vistas_CP_CPLPASU" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA EJECUCION DE PLANILLA BANCARIA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=CPMPASU" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=CPLPASU" class="btn red"><i class="icon-list"></i> Listar</a>
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
                </div>                                          
                <div class="row-fluid">

                    <div class="row-fluid" style="margin-top: 20px;">
                        <div id="divAdelanto">
                        </div>
                    </div>

                </div>

                 <div class="row-fluid">
                    <table id="tblBandeja" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>                                        
                                    <th>EMPRESA</th>
                                    <th>CUENTA</th> 
                                    <th>PLANILLA</th>   
                                    <th>F. PROCESO</th>
                                    <th>Nº OPE</th>                                    
                                    <th>TOTAL IMPORTE</th>
                                </tr>
                            </thead>
                        <tbody>

                        </tbody>
                  </table>
                         

            </div>

            </div>
           
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPMPASU.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLPASU.init();
    });

</script>