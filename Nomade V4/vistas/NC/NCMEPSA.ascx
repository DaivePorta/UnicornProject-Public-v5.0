<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEPSA.ascx.vb" Inherits="vistas_NC_NCMEPSA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>EPS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmepsa"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nclepsa"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- PRIMERA LINEA -->
                <div class="row-fluid">

                    <!-- INICIO ACTIVO -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Código</label>

                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <!-- FIN ACTIVO -->


                    <!-- TIPO -->

                    <!-- FIN TIPO -->
                    <div class="span1">
                    </div>
                    <!-- INICIO ACTIVO -->
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="chkEstado">
                                Activo</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <!-- FIN ACTIVO -->
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFechIni">
                                Fecha Inicio</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" required data-date-format="dd/mm/yyyy" class="span12" id="txtFechIni" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFechFin">
                                Fecha Fin</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" required data-date-format="dd/mm/yyyy" class="span12" disabled="disabled" id="txtFechFin" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">
                    <!-- INICIO NOMBRE -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                EPS</label>

                        </div>
                    </div>
                    <!-- FIN NOMBRE -->
                    <!-- INICIO FECHA -->
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" disabled="disabled" class="span12" placeholder="Eps de la empresa"  type="text" />
                            </div>
                        </div>
                    </div>

                    <!-- -->
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">

                                <a id="BuscaPJ" class="btn blue" data-toggle="modal"
                                    data-target="#muestralistap"><i class="icon-search"></i>&nbsp;</a>
                            </div>

                        </div>
                    </div>
                    <!-- FIN FECHA -->
                </div>
                <!-- FIN SEGUNDA LINEA -->

                <!-- INICIO TERCERA LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Código de Sunat :</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodSunat" class="span12" placeholder="Código de Sunat"  type="text" maxlength="6" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtruc">
                                RUC</label>

                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtruc" disabled="disabled" class="span12"  placeholder="RUC" type="text" />
                            </div>
                        </div>
                    </div>

                </div>


                <!-- FIN TERCERA LINEA -->

                <!-- INICIO CUARTA LINEA -->
                <div class="row-fluid">
                    <!-- INICIO CODIGO -->
                    <%--  <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtruc">
                                RUC</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtruc" disabled="disabled" class="span12" required="" placeholder="RUC" required="" type="text" />
                            </div>
                        </div>
                    </div>--%>
                    <!-- FIN CODIGO -->
                    <!-- INICIO CODIGO -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpidm">
                                PIDM</label>

                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpidm" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <!-- FIN CODIGO -->



                </div>
                <!-- FIN CUARTA LINEA -->

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> sGrabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->


<div id="muestralistap" style="width: 700px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>

            <div class="row-fluid">
                <div class="span8">
                    <h3 id="myModalLabel">LISTA DE PERSONAS JURIDICAS</h3>
                </div>
                <div class="span3">
                    <a class="btn green" style="padding: 2px 8px;" href="javascript:editareps();"><i class="icon-pencil"></i>Nuevo</a>
                    <a class="btn red" style="padding: 2px 8px;" href="javascript:listareps();"><i class="icon-plus"></i>Listar</a>
                </div>
            </div>
        </div>
        <div id="divmodal" class="modal-body" aria-hidden="true">
            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->

<div id="MuestraModal" style="display: none;">

    <div class="row-fluid">
        <div class="span2">
            <div class="control-group">
                <label class="control-label" for="txtDESCRIPCIONmodal">
                    DESCRIPCION</label>

            </div>
        </div>
        <div class="span2">
            <div class="control-group ">
                <div class="controls">
                    <input id="txtDESCRIPCIONmodal" class="span12" disabled="disabled" type="text" />
                </div>
            </div>
        </div>

    </div>

    <div class="row-fluid">
        <div class="span2">
            <label class="control-label" for="txtrazonsocial">
                Razón Social</label>
        </div>
        <div class="span6">
            <div class="control-group">

                <div class="controls">
                    <input type="text" class="span12" id="txtrazonsocial" placeholder="Razón Social" />
                </div>
            </div>
        </div>

    </div>

    <div class="row-fluid">

        <div class="span2">
            <label class="control-label" for="txtrucmodal">
                RUC</label>
        </div>

        <div class="span6">
            <div class="control-group">

                <div class="controls">
                    <input class="span12" type="text" id="txtrucmodal" placeholder="RUC" />
                </div>
            </div>
        </div>
    </div>




    <div class="form-actions">
        <a id="grabarModalEPS" class="btn blue" href="javascript:creareps();"><i class="icon-save"></i>&nbsp;Grabar</a>
        <button id="cerrarModalEPS" data-dismiss="modal" class="btn" type="button" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Cerrar</button>

    </div>
</div>




<script type="text/javascript" src="../vistas/NC/js/NCMEPSA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMEPSA.init();
        $('#uniform-chkEstado span').removeClass().addClass("checked");
        $('#chkEstado').attr('checked', true);
        
    });
</script>
