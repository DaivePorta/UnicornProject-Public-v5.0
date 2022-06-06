<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALAFON.ascx.vb" Inherits="vistas_CA_CALAFON" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE ASIGNACIONES DE FONDO A CAJA FIJA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=camafon"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=calafon"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="2" />
                <div class="alert alert-error hide">
                              <button class="close" data-dismiss="alert"></button>
                              Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                           </div>
                <div class="alert alert-success hide">
                              <button class="close" data-dismiss="alert"></button>
                              Datos ingresados correctamente.
                           </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbocajas">
                                Caja</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="con_cajas">
                                <select id="cbo_dcaja" name="cbo_dcaja" class="combo m-wrap span12 required" data-placeholder="Seleccionar Caja" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <a class="btn purple" href="javascript:Grabar();"><i class="icon-search"></i> Buscar</a>
                    </div>

                    </div>
                <!-- FIN PRIMERA LINEA -->
                <div class="row-fluid">
                    <div class="spa12" id="tblDatos">

                    </div>
                </div>
            </div>
        </div>
</div>
</div>
<script type="text/javascript" src="../vistas/CA/js/CAMAFON.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CAMAFON.init();
    });
</script>
