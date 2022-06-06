<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMESTE.ascx.vb" Inherits="vistas_NC_NCMESTE" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;ESTEREOTIPOS</h4>
                <div class="actions">
                </div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="cboEmpresa">Empresa</label>
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <select id="cboEmpresa" class="span12 ComboBox empresa" data-placeholder="EMPRESA">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="chk_estado">
                                        Estado</label>

                                </div>
                            </div>
                            <div class="span2">
                                <div class="basic-toggle-button">

                                    <input type="checkbox" id="chk_estado" class="toggle" />


                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>


            <%--    <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_descripcion">
                                Descripción</label>

                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_descripcion" class="span12" placeholder="Descripcion Estereotipo" type="text" >
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_cod_alternativo">
                                Cód Alter.</label>

                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txt_cod_alternativo" class="span12" placeholder="Cód. Alternativo (Máx 5 carácteres)" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <a id="btn_agregar" class="btn green"  style="margin-top:-3px;"><i class="icon-plus"></i>&nbsp;Agregar</a>
                    </div>
                </div>--%>



                <div class="row-fluid">
                    <div class="span12">
                    </div>
                </div>

                <div id="divEstereotipos">
                </div>

                <div class="form-actions" id="acciones" >
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    <span style="float:right"><small>*Se necesita Proveedor o Cliente como mínimo</small></span>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCESTER.js"></script>


<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCESTER.init();

    });
</script>
