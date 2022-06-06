<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMIMPR.ascx.vb" Inherits="vistas_NC_NCMIMPR" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>IMPRESORAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmimpr"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nclimpr"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtCodigo">Codigo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span4" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="chkActivo">
                                Activo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkActivo" type="checkbox" checked />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
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
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboSucursal">Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboSucursal" class="span12"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMarca">Marca</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMarca" class="span12" placeholder="Marca de impresora" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtModelo">
                                Modelo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtModelo" class="span12" placeholder="Modelo de impresora" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtSerie">Serie</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtSerie" class="span12" placeholder="Serie de impresora" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboTipo">
                                Tipo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipo" class="span12" required>
                                    <option value="R">REPORTES</option>
                                    <option value="V">DOC VENTA POS</option>
                                    <option value="A">ALMACEN POS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMaquina">Máquina</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMaquina" class="span12" placeholder="Máquina" type="text" />
                            </div>
                        </div>
                    </div>                   
                </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue"><i class="icon-save"></i>&nbsp Grabar</a>
                    <a id="actualizar" class="btn blue" style="display:none;"><i class="icon-save"></i>&nbsp Modificar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCIMPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCIMPR.init();

    });
</script>
