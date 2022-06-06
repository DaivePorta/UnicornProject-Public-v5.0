<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMNIED.ascx.vb" Inherits="vistas_NC_NCMNIED" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>NIVELES EDUCATIVOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmnied"><i class="icon-plus"></i> Nuevo</a> 
                    <a class="btn red" href="?f=nclnied"><i class="icon-list"></i> Listar</a>
                </div>
                
            </div>
            <div class="portlet-body">
                
                <!-- primera linea --->
                <div class="row-fluid">

       
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>
                    
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
    
                    <div class="span1">

                    </div>

                     <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkactivo">
                            Activo</label>
                         </div>
                    </div>

                     <div class="span1" >
                       <div class="control-group ">
                           <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />
                            </div>
                        </div>
                    </div>
                    

                  <div class="span6">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
              
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigosunat">
                            Codigo Sunat</label>
                         
                        </div>
                    </div>
         
                    <div class="span1">
                        <div class="control-group">
                               <div class="controls">
                                <input id="txtcodigosunat" class="span12" placeholder=""  type="text" />
                            </div>
                        </div>
                    </div>

      
                     <div class="span9">
  
                    </div>
   
                </div>

                <!---fin linea -->

         
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
              
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                            Nombre</label>
                         
                        </div>
                    </div>
         
                    <div class="span5">
                        <div class="control-group">
                               <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre del nivel" type="text" />
                            </div>
                        </div>
                    </div>

      
                     <div class="span5">
  
                    </div>
   
                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
              
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombrecorto">
                            Nombre Corto</label>
                         
                        </div>
                    </div>
         
                    <div class="span2">
                        <div class="control-group">
                               <div class="controls">
                                <input id="txtnombrecorto" class="span12" placeholder="Nombre Corto" type="text" />
                            </div>
                        </div>
                    </div>

      
                     <div class="span8">
  
                    </div>
   
                </div>

                <!---fin linea -->


               

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a> 
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    </div>


<script type="text/javascript" src="../vistas/NC/js/NCNIED.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCNIED.init();
        
    });
</script>