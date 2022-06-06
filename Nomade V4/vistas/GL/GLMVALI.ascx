<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMVALI.ascx.vb" Inherits="vistas_GL_GLMVALI" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LETRAS COBRO POR VALIDAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=glmvali" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=gllvali" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span6">
                     
                        <div class="span2"><b>EMPRESA:</b></div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cbo_Empresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1" style="display: none;">
                            <thead>
                                <tr>
                                    <th>&nbsp;
                                    </th>
                                    <th>GIRADO A
                                    </th>
                                    <th>FIRMANTE
                                    </th>
                                    <th>AVAL
                                    </th>
                                    <th>NRO LETRA
                                    </th>
                                    <th>MONEDA
                                    </th>
                                    <th>MONTO
                                    </th>                                    
                                    <th>FECHA EMISION
                                    </th>
                                    <th>FECHA VENC.
                                    </th>                              
                                    <th>DESTINO
                                    </th>
                                  <th>CANJE
                                    </th>
                                    
                                </tr>
                            </thead>
                        </table>                        
                       
                    </div>
                </div>
                <div class="form-actions">
                    <button id="grabarA" class="btn blue" type="button"><i class="icon-ok"></i> Aprobar</button>
                    <button id="grabarR" class="btn black" type="button"><i class="icon-remove"></i> Rechazar</button>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/GL/js/GLMVALI.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLMVALI.init();
     

    });
</script>