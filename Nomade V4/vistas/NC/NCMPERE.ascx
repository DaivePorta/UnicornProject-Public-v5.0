<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMPERE.ascx.vb" Inherits="vistas_NC_NCMPERE" %>

<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>PERIODICIDAD DE LA REMUNERACION
                </h4>
                <div class="actions">
                    <a href="?f=ncmpere" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclpere" class="btn red"><i class="icon-list"></i>Listar</a>

                </div>
            </div>
            <div class="portlet-body" id="ventana">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <label class="control-label">Código de  Periodicidad </label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodigo" class=" span12" disabled="disabled" placeholder="Código" />
                        </div>
                        <div class="span2">
                            <label class="control-label"> Sunat</label>
                        </div>Código
                        <div class="span2">
                            <input type="text" id="txtCodSunat" class=" span12" placeholder="Ingrese Código" maxlength="6" />
                        </div>
                        <div class="span4">
                            <div style="text-align: center;">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span2">
                            <label class="control-label">Periodicidad</label>
                        </div>
                        <div class="span4">
                            <input type="text" id="txtPeriodicidad" class=" span12" placeholder="Ingrese Periodicidad" maxlength="150" />
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
                        </div>
                        <div class="span4">
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
                <a id="grabar" class="btn blue" href="javascript:GrabarPeriodicidad();"><i class="icon-save"></i>Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
            </div>
       </div>
    </div>
    </div>
    <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
</div>




<script type="text/javascript" src="../../vistas/NC/JS/NCMPERE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMPERE.init();

    });
</script>

