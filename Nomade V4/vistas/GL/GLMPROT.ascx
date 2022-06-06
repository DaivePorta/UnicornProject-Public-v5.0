<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMPROT.ascx.vb" Inherits="vistas_GL_GLMPROT" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LETRAS VENCIDAS POR PROTESTO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=glmprot" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=gllprot" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">
                                 Empresa</label>
                         </div>
                     </div>
                     <div class="span3">
                         <div class="control-group">
                             <div class="controls">
                                 <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresas">
                                 </select>
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
                                    <th>GIRADOR
                                    </th>
                                    <th>NRO LETRA
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>FECHA EMISION
                                    </th>
                                    <th>FECHA VENCIMIENTO
                                    </th>                                    
                                    <th>DESTINO
                                    </th>
                                  
                                    
                                </tr>
                            </thead>
                        </table>                        
                       
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabarA" class="btn blue" href="javascript:CrearProto();"><i class="icon-save"></i> Grabar</a>
                    <a id="grabarR" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<input type="hidden" id="hddauxiliar" value="">
<input type="hidden" id="hddauxiliar2" value="0">
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/GL/js/GLMPROT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLMPROT.init();
     

    });
</script>