<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTCBA.ascx.vb" Inherits="vistas_NC_NCMTCBA" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Tipos de Cuentas Bancarias</h4>

                <div class="actions">
                    <a href="?f=ncmtcba" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ncltcba" class="btn red"><i class="icon-list"></i>Listar</a>

                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid" style="padding: 4px 0px">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span1">
                            <label>Código:</label>
                        </div>
                        <div class="span1">
                            <input type="text" id="txtCodigo" class=" span12" disabled="disabled">
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

                <div class="row-fluid" style="padding: 4px 0px">
                    <div class="span12">
                        <div class="span1">
                        </div>
                        <div class="span1">
                            <label>Descripcion:</label>
                        </div>
                        <div class="span3">
                            <input type="text" id="txtdescripcion" class=" span12" placeholder="Descripcion" maxlength="150" />
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="padding: 4px 0px">
                    <div class="span12">
                        <div class="span1"></div>
                        <div class="span1">
                            <label>Moneda:</label>
                        </div>
                        <div class="span3">
                            <select id="cboMoneda" class="span12"></select>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="padding: 4px 0px">
                    <div class="span12">
                        <div class="span1"></div>
                        <div class="span1">
                            <label>Chequera:</label>
                        </div>
                        <div class="span3">
                            <input type="checkbox" id="chkChequera" />
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript" src="../../vistas/NC/JS/NCMTCBA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMTCBA.init();
    });
</script>
