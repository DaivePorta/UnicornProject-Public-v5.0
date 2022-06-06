<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTIPA.ascx.vb" Inherits="vistas_NC_NCMTIPA" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" >
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO MEDIO PAGO </h4>

                <div class="actions">
                    <a href="?f=ncmtipa" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncltipa" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body" id="ventana">
                <div class="row fluid">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span2">
                            <label>Código</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodigo" class=" span12" disabled="disabled" placeholder="Código ">
                        </div>
                        <%--<div class="span2">
                            <label>Código Sunat</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodSunat" class="span12" placeholder="Código Sunat" maxlength="2" />
                        </div>--%>
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
                            <label>Código Sunat</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtCodSunat" class="span12" placeholder="Código Sunat"  />
                        </div>
                        <div class="span1">
                            <label>Descripción :</label>
                        </div>
                        <div class="span5">
                            <input type="text" id="txtDescripcion" class=" span12" placeholder="Descripción" maxlength="150" />
                        </div>
                        
                        
                        
                        
                    </div>
                </div>
                <div class="row fluid">
                     <div class="span1">
                        </div>
                   <div class="span2">
                            <label>Nombre Corto</label>
                        </div>
                        <div class="span2">
                            <input type="text" id="txtnomcorto" class="span12" placeholder="Nom Corto" />
                        </div>
                </div>


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabarTiPago();"><i class="icon-save"></i>Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>



<asp:HiddenField ID="hfCodigoUsuario" runat="server" />


<script type="text/javascript" src="../../vistas/NC/JS/NCMTIPA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTIPA.init();

    });
</script>
