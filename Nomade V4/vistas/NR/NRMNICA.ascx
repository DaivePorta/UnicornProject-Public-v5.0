<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NRMNICA.ascx.vb" Inherits="vistas_NR_NRMNICA" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Nivel en Cadena de Abastecimiento</h4>

                <div class="actions">
                    <a href="?f=nrmnica" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nrlnica" class="btn red"><i class="icon-list"></i> Listar</a>
                        
                </div>

            </div>         
         <div class="portlet-body">         
                <div class="row fluid">                   
                <div class="span12">                  
                    <div class="span1">
                    </div>
                    <div class="span1">
                        <label>Código:</label>
                    </div>
                    <div class="span1">
                        <input type="text" id="txtCodigo" class=" span12" disabled="disabled"  >
                    </div>                    
                    <div class="span1">
                        <label>Estado</label>
                    </div>
                    <div class="span1">
                        <div style="text-align: center;">
                            <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 0;" />Activo
                        </div>
                    </div>

                </div>

            </div>

            <div class="row fluid">
                <div class="span12">
                    <div class="span1">
                    </div>
                    <div class="span1">
                        <label>Descripcion:</label>
                    </div>
                    <div class="span3">
                        <input type="text" id="txtdescripcion" class=" span12" placeholder="Descripcion" maxlength="150" />
                    </div>
                    
                    <div class="span2">
                    </div>
                    <div class="span1">
                    </div>
                </div>
            </div>
            <div class="row fluid">
                <div class="span12">
                    <div class="span1">
                    </div>
                    <div class="span2">
                    </div>
                    <div class="span2">
                    </div>
                    <div class="span2">
                    </div>
                    <div class="span2">
                    </div>
                    
                </div>
            </div>


<div class="form-actions">
    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
</div>
          </div>
    </div>
</div>  

</div>

<script type="text/javascript" src="../../vistas/NR/JS/NRMNICA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NRMNICA.init();

    });
</script>