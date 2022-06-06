<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMMVMT.ascx.vb" Inherits="vistas_NA_NAMMVMT" %>
<div class=" row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>METODOS VALUACION MATERIALES</h4>

                <div class="actions">
                    <a href="?f=nammvmt" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nalmvmt" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label>Codigo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtcodigo" class="span12" disabled="disabled" >
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />
                                Activo
                            </div>
                        </div>
                    </div>
                </div>

                <!------>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!----->

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="cboMetodo">
                                Metodo Valuacion</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboMetodo" class="span12" data-placeholder="Metodo Valuacion ">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear_Metodo();"><i class="icon-save"></i>Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript" src="../../vistas/NA/JS/NAMMVMT.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMMVMT.init();

    });
</script>
