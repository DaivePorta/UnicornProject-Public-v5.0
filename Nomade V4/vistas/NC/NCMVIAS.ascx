<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMVIAS.ascx.vb" Inherits="vistas_NC_NCMVIAS" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Vías</h4>

                <div class="actions">
                    <a href="?f=ncmvias" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclvias" class="btn red"><i class="icon-list"></i> Listar</a>
                        
                </div>

            </div>
        
         <div class="portlet-body">
         
                <div class="row fluid">
                <div class="span12">
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <label>Código de Vía:</label>
                    </div>
                    <div class="span2">
                        <input type="text" id="txtCodVia" class=" span12" disabled="disabled" placeholder="Código Vía">
                    </div>
                    <div class="span2">
                        <label>Código Sunat</label>
                    </div>
                    <div class="span2">
                        <input type="text" id="txtCodSunat" class="span8" placeholder="Código Sunat" maxlength="4" />
                    </div>
                    <div class="span2">
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
                    <div class="span2">
                        <label>Nombre Vía :</label>
                    </div>
                    <div class="span2">
                        <input type="text" id="txtNomVia" class=" span12" placeholder="Nombre Vía" maxlength="150" />
                    </div>
                    <div class="span2">
                        <label>Nombre Corto :</label>
                    </div>
                    <div class="span2">
                        <input type="text" id="txtNomCorto" class=" span12" placeholder="Nombre Corto" maxlength="4" />
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
                    <div class="span2">
                    </div>
                    <div class="span1">
                    </div>
                </div>
            </div>


<div class="form-actions">
    <a id="grabar" class="btn blue" href="javascript:GrabarVia();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
</div>
          </div>
    </div>
</div>  

</div>
<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<script type="text/javascript" src="../../vistas/NC/JS/NCMVIAS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMVIAS.init();
        
    });
</script>
