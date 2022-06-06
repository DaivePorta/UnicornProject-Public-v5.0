<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GBMNBIO.ascx.vb" Inherits="vistas_GB_GBMNBIO" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Mantenimiento de biométrico</h4>
                <div class="actions">
                    <a id="btnNuevo" class="btn green" href="?f=GBMNBIO"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=GBLNBIO"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcnivel">
                                Código</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" type="text" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMarca">
                                Marca</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMarca" class="span11" placeholder="Marca del biométrico." type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtModelo">
                                Modelo</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtModelo" class="span11" placeholder="Modelo del biométrico." type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtSerie">
                                Serie</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerie" class="span11" placeholder="Serie del biométrico." type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtSoftware">
                                Software</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSoftware" class="span11" placeholder="Software (Sistema) del biométrico." type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtVersion">
                                Versión</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtVersion" class="span11" placeholder="Versión del biométrico." type="text" maxlength="20" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpleado">
                                Biométrico compatible</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboBiometrico" class="span12">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                 <%--   <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnCompa" class="btn blue" href="javascript:Compatible();"><i class="icon-plus"></i> Compatible</a>
                            </div>
                        </div>
                    </div>--%>
                </div>
                <div class="portlet box blue" id="Div1">
                    <div class="portlet-body">
                        <div class="row-fluid">
                            <div class="span12">
                                <table id="tblBiometrico" border="0" class="display DTTT_selectable" style="display: block;">
                                    <thead>
                                        <tr>
                                            <th style="display: none;">Código</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                        </tr>
                                    </thead>
                                </table>
                                <%--<asp:HiddenField ID="hffecha" runat="server" />--%>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="?f=GBMNBIO"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/GB/js/GBLNBIO.js"></script>
<script>
    jQuery(document).ready(function () {
        GBMNBIO.init();
    });
</script>
