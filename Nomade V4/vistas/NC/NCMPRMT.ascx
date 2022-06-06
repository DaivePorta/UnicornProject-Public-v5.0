<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMPRMT.ascx.vb" Inherits="vistas_NC_NCMPRMT" %>

<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PARÁMETROS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmprmt"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclprmt"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">


                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group ">
                                    <label class="control-label" for="txtcodigo">Código</label>
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input id="txtcodigo" class="span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtdescripcion">
                                        Descripción</label>

                                </div>
                            </div>

                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtdescripcion" class="span12" placeholder="Descripcion"  type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtvalor">
                                        Valor</label>

                                </div>
                            </div>

                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtvalor" placeholder="Valor" class="span12" type="text"></input>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group ">
                                    <label class="control-label" for="txtdescripciondetallada">Descripción Detallada</label>
                                </div>
                            </div>
                            <div class="span9">
                                <div class="controls">
                                    <textarea id="txtdescripciondetallada" style="height: 100px; resize:none;" class="span12"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                             <div class="span3">
                                <div class="control-group ">
                                    <label class="control-label" for="cboSistema">Sistema</label>
                                </div>
                            </div>
                            <div class="span9">
                                <div class="control-group ">
                                    <div class="controls">
                                        <select id="cboSistema" class="span12" data-placeholder="Seleccione Sistema">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <!-- INICIO  LINEA -->
                <%--  <div class="row-fluid">
              
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpantalla">
                            Pantalla</label>
                         
                        </div>
                    </div>
         
                    <div class="span4">
                        <div class="control-group">
                               <div class="controls">
                                <input id="txtpantalla" class="span12" placeholder="Pantalla" required="" type="text" />
                            </div>
                        </div>
                    </div>

      
                     <div class="span6">
  
                    </div>
   
                </div>--%>

                <!---fin linea -->

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCPRMT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCPRMT.init();
        
    });
</script>
