<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMRANG.ascx.vb" Inherits="vistas_NM_NMMRANG" %>


<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;RANGOS PRECIOS POR CANTIDAD</h4>
                <div class="actions">
                    <%--<a class="btn green" href="?f=nsmform"><i class="icon-plus"></i>&nbsp;Nuevo</a>--%>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtNombre">
                                        Nombre Rango</label>
                                </div>
                            </div>
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtNombre" maxlength="20" class="span12" type="text" placeholder="Nombre Rango" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtFin">
                                        Rango</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtRangoInicio" class="span12" type="text" placeholder="Rango Inicio" onkeypress="return ValidaDecimales(event,this)" value="0" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div class="span5">
                                <p style="font-style:italic;color:gray;"><span id="mensaje">*Incluído dentro del rango.</span> </p>
                            </div>
                        </div>


                        <div class="form-actions">
                            <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>

                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span12" id="divTblRangos">
                                <table id="tblRangos">
                                    <thead>
                                        <tr>
                                            <th>CODIGO</th>
                                            <th>NOMBRE</th>
                                            <th>RANGO INICIO</th>
                                            <th>RANGO FIN</th>
                                            <th>ELIMINAR</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- VENTANAS MODALES-->
<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Eliminar Rango</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span10 offset1">
                <p>
                    Se eliminarán todos los registros existente de precios por cantidad para este rango.              
                    ¿Desea continuar?
                </p>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span4 offset2">
                    <a id="btnAceptar" class="btn blue"><i class="icon-check"></i>&nbsp;Aceptar</a>
                </div>
                <div class="span4">
                    <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN DE LA VENTANA MODAL-->
<input id="codigoEliminar" type="hidden" />

<script type="text/javascript" src="../vistas/NM/js/NMMRANG.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMRANG.init();
    });
</script>
