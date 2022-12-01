<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMCOWH.ascx.vb" Inherits="vistas_NC_NCMCOWH" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION DE WHATSAPP</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMCOWH"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLCOWH"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <!-- CODIGO Y CHECK ACTIVO/INACTIVO -->
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Código</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />Activo
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- EMPRESA -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- ID EMPRESA -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="idEmpresa">ID de Empresa</label> <!-- Proviene de Meta -->
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="idEmpresa" maxlength="16" class="span12" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- NRO TELEFONO -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="nroTelefono">Nro. Telefono</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="nroTelefono" maxlength="15" class="span12" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- PHONE ID -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="idTelefono">ID de Telefono</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="idTelefono" maxlength="15" class="span12" type="text" /> <!-- Proviene de Meta -->
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- TOKEN -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtareatoken">Token</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtareatoken" style="height: 100px;" class="span12"></textarea> <!-- Proviene de Meta -->
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- WABA ID -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="idWaba">WABA ID</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="idWaba" maxlength="15" class="span12" type="text" /> <!-- Proviene de Meta -->
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>

                <div class="row-fluid">
                    <!-- VERSION -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboVersion">Version</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="cboVersion" class="span12" type="text" /> <!-- Proviene de Meta -->
                            </div>
                        </div>
                    </div>
                    <div class="span8">
                    </div>
                </div>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" id="grabar" class="btn blue" onclick="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</button>
            <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCCOWH.js"></script>

<script>
    jQuery(document).ready(function () {
        NCCOWH.init();
    });
</script>
