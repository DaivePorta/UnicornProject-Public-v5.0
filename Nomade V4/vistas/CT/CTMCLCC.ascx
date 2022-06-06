<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMCLCC.ascx.vb" Inherits="vistas_CT_CTMCLCC" %>
 <link rel="stylesheet" href="recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />

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
                <h4><i class="icon-reorder"></i>CLASES CUENTAS CONTABLES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CTMCLCC"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=CTLCLCC"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigoClaseCuenta">
                                    Código Clase Cuenta</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtcodigoClaseCuenta" class="span12" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div>
                        
                        <div class="span2 offset1">
                            <div class="control-group">
                                <label class="control-label">
                                    Activo:</label>
                            </div>
                        </div>

                        <div class="span2" id="divchkEstado">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="danger-toggle-button-custom">
                                        <input id="chkEstado" type="checkbox" class="toggle" />
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <label class="control-label" for="txtClaseCuenta">
                                Descripción</label>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtClaseCuenta" class="span12" placeholder="Clase Cuenta" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <label class="control-label" for="txtCodigoSunat">
                                Código Sunat</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtCodigoSunat" class="span12" placeholder="Código Sunat" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Usa Centro Costo:</label>
                            </div>
                        </div>

                        <div class="span1" id="divchkCentroCosto">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="danger-toggle-button-custom">
                                        <input id="chkCentroCosto" type="checkbox" class="toggle" />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>



                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombreCorto">
                                    Nombre Corto</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombreCorto" class="span12" placeholder="Nombre Corto" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                        </div>

                        <div class="span2">
                            <label class="control-label" for="txtNumeracion">Numeración</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNumeracion" class="span12" onkeypress="return ValidaNumeros(event,this)" 
                                        maxlength="1" placeholder="Numeración" style="text-align:right"/>
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">
                                    Genera Destino en Gastos:</label>
                            </div>
                        </div>

                        <div class="span1" id="divchkGeneraDest">
                            <div class="control-group">
                                <div class="controls">
                                    <div class="danger-toggle-button-custom">
                                        <input id="chkGeneraDest" type="checkbox" class="toggle" />
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
                <asp:HiddenField ID="hfUsuario" runat="server" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMCLCC.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMCLCC.init();
        
    });
</script>