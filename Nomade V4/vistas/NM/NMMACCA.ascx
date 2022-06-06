<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMACCA.ascx.vb" Inherits="vistas_NM_NMMACCA" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Estructura de Centro de Costos</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NMMACCA"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NMLACCA"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtTipoAcredita">
                                Código</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" type="text" style="width: 30%" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtTipoAcredita">
                                Tipo</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <!--<input id="txtTipoAcredita" class="span12" type="text" />-->
                                <select id="cboTipoAcredita" class="span12">
                                    <option value="0">Seleccione</option>
                                    <option value="0001">Certificado </option>
                                    <option value="0002">Control </option>
                                    <option value="0003">Permiso </option>
                                    <option value="0004">Otros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Descripción</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDescripcion" class="span12" type="text" maxlength="100" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="chkEstado">
                                Detalle</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <!--<input id="txtDetalle" class="span12" type="text" />-->
                                <textarea id="txtDetalle" class="span12" maxlength="150" style="resize: vertical; max-height: 120px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtFechaInicio">
                                Procedencia</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <!--<input id="txtProcedencia" class="span12" type="text" />-->
                                <select id="cboProcedencia" class="span12">
                                    <option value="0">Seleccione</option>
                                    <option value="0001">Nacional</option>
                                    <option value="0002">Internacional</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue" href="#"><i class="icon-save"></i><span id="sNombrebtn">&nbsp Grabar</span></a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>

                <asp:HiddenField ID="hfUsuario" runat="server" />
                <asp:HiddenField ID="hfCtlgSeleccionado" runat="server" />
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NM/js/NMMACCA.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMACCA.init();

    });
</script>
