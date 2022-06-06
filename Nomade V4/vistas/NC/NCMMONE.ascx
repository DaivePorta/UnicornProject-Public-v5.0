<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMMONE.ascx.vb" Inherits="vistas_NC_NCMMONE" %>


<div class="row-fluid">
  <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>MONEDA</h4>
                <div class="actions">
                    <a href="?f=ncmmone" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclmone" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>
            </div>
        
        <div class="portlet-body">
            <div class="row-fluid">
      
                    <div class="span2">
                        <label>Código de moneda :</label>
                    </div>
                    <div class="span1">
                      <div class="control-group">
                           <div class="controls">
                                 <input id="txtCodMoneda" type="text" class="span12" disabled="disabled" maxlength="4"  >
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkEstado">
                            Activo</label>
                         </div>
                    </div>

                     <div class="span1" >
                       <div class="control-group">
                           <div class="controls">
                                <input id="chkEstado" type="checkbox" checked />
                            </div>
                        </div>
                    </div>
  
              
            </div>
<!----->
            <div class="row-fluid">
      
                    <div class="span2">
                        <label>Nombre de moneda :</label>
                    </div>
                    <div class="span3">
                          <div class="control-group">
                           <div class="controls">
                        <input type="text" id="txtNomMone" class="span12"  maxlength="50"/>
                               </div>
                        </div>
                    </div>
  
            </div>

<!----->

                <div class="row-fluid">
                   

                        <div class="span2">
                            <label>Nombre corto :</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                              <div class="controls">
                                     <input type="text" id="txtNomCorto" class="span12" maxlength="20" />
                               </div>
                            </div>
                        </div>
     
                
                </div>

<!----->

                <div class="row-fluid">
        
                  
                        <div class="span2">
                            <label>Símbolo de moneda :</label>
                        </div>
                        <div class="span1">
                             <div class="control-group">
                              <div class="controls">
                                         <input type="text" id="txtSimbolo" class="span12" maxlength="5" />
                                  </div>
                            </div>
                        </div>
  
            
                </div>

<!----->
            <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarMoneda();"><i class="icon-save"></i> Grabar</a>
                    <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
                    <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
            </div>
          
        </div>
      </div>
    </div>
</div>


<script type="text/javascript" src="../../vistas/NC/JS/NCMMONE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMMONE.init();
        
    });
</script>
