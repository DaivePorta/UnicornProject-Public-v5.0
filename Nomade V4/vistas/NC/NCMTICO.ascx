<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTICO.ascx.vb" Inherits="vistas_NC_NCMTICO" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO CONTRATO TRABAJO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmtico"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=ncltico"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">


                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">
                                Código</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkEstado">
                                ACTIVO</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" />
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtCodSunat">
                                Código Sunat</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodSunat" class="span6" type="text" maxlength="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span8"></div>
                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>
                        </div>
                    </div>


                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtDescripcion" class="span12" placeholder="Descripción"  type="text" maxlength="150" />
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>

                </div>
                <div class="row-fluid">

                    <div class="span6">
                    </div>

                </div>


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarTico();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <asp:HiddenField runat="server" ID="hfCodigoUsuario" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMTICO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTICO.init();
        

    });
</script>
