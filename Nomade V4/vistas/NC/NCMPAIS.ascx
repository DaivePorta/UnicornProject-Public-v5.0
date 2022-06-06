<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMPAIS.ascx.vb" Inherits="vistas_NC_NCMPAIS" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>PAISES
                </h4>
                <div class="actions">
                    <a href="?f=ncmpais" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclpais" class="btn red"><i class="icon-list"></i> Listar</a>
                        
                </div>

            </div>
  
    <div class="portlet-body" id="ventana">
        <div class="row-fluid">
            <div class="span12">
                <div class="span2">
                    <label class="control-label">Código de País</label>
                </div>
                <div class="span2">
                    <input type="text" id="txtCodigoPais" class=" span12" disabled="disabled" placeholder="Código" />
                </div>
                <div class="span2">
                    <label class="control-label">Código Sunat</label>
                </div>
                <div class="span2">
                    <input type="text" id="txtCodSunat" class=" span12" placeholder="Ingrese Código" maxlength="4" />
                </div>
                <div class="span4">
                    <div style="text-align: center;">
                        <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />Activo
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="span2">
                    <label class="control-label">Nombre de País</label>
                </div>
                <div class="span4">
                    <input type="text" id="txtNomPais" class=" span12" placeholder="Ingrese Nombre País" maxlength="150" />
                </div>
                <div class="span2">
                </div>
                <div class="span2">
                </div>
                <div class="span4">
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="span2">
                    <label class="control-label">Nombre Corto de País</label>
                </div>
                <div class="span4">
                    <input type="text" id="txtNomCor" class="span12" placeholder="Ingrese Nombre Corto"  />
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
        <a id="grabar" class="btn blue" href="javascript:GrabarPais();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
    </div>
    <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
        </div>
</div>
      </div>
    </div>
<script type="text/javascript" src="../../vistas/NC/JS/NCMPAIS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMPAIS.init();
        
    });
</script>


