<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEPSS.ascx.vb" Inherits="vistas_NC_NCMEPSS" %>
<div class="row-fluid">
    <div id="ventana" class="portlet box blue">
        <div class="portlet-title">
            <h4><i class="icon-reorder"></i>SITUACION EPS</h4>
            <div class="actions">
                <a class="btn green" href="?f=ncmepss"><i class="icon-plus"></i> Nuevo</a>
                <a class="btn red" href="?f=nclepss"><i class="icon-list"></i> Listar</a>
            </div>

        </div>
        <div class="portlet-body">

            <div class="row-fluid">


                <div class="span2">
                    <label>Código </label>
                </div>

                <div class="span1">
                    <div class="control-group ">
                        <div class="controls">
                            <input id="txtCodigo" type="text" class="span12" disabled="disabled" placeholder="Código" />
                        </div>
                    </div>
                </div>


                <div class="span3">
                    <div style="text-align: center;">
                        <input id="chkEstado" type="checkbox" name="Activo" checked="checked" value="A" />Activo
                    </div>
                </div>
            </div>


            <div class="row-fluid">
                <div class="span12">


                    <div class="span2">
                        <label>Código de Sunat</label>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodSunat" type="text" class="span12" placeholder="Código de Sunat" maxlength="2" />
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div style="text-align: center;">
                            <input id="ckOpcion" type="checkbox" name="Opcion" checked="checked" value="A" />Afiliado
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-fluid">

                <div class="span2">
                    <label>Descripción</label>
                </div>
                <div class="span5">
                    <div class="control-group ">
                        <div class="controls">
                            <input id="txtDescripcion" type="text" class="span12" placeholder=" Descripción" maxlength="150" />
                        </div>
                    </div>
                </div>


            </div>


            <div class="form-actions">
                <a id="grabar" class="btn blue" href="javascript:GrabarEPSS();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
            </div>

        </div>
    </div>
</div>


<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<script type="text/javascript" src="../vistas/NC/js/NCMEPSS.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMEPSS.init();
        
    });
</script>
