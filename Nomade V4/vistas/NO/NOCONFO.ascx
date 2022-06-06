<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOCONFO.ascx.vb" Inherits="vistas_NO_NOCONFO" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION DE CORRELATIVO</h4>
                <div class="actions">
                </div>
            </div>
            <div id="div" class="portlet-body">


                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border ">Orden de Compra</legend>
                    <div id="Div1" class="row-fluid">

                        <div class="span12">

                            <div class="span2">
                                <div class="control-group ">
                                    <label>Correlativo por:</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <input type='radio' id="rbAno" class='radio' name='rdContac1' />
                                            Año
                                        </label>

                                    </div>
                                </div>
                            </div>


                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <input type='radio' id="rbMes" class='radio' name='rdContac1' />
                                            <%--<label>Mes</label>--%>Mes
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group ">
                                    <label>Nemonico</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12" id="txtNemonico" />
                                    </div>
                                </div>
                            </div>

                            <div class="span2">


                                <a id="idRegis" class="btn blue">Modificar</a>




                            </div>

                            <div class="span2">
                            </div>
                        </div>

                    </div>

                </fieldset>
                 </br>
                 </br>

                <fieldset class="scheduler-border ">
                    <legend class="scheduler-border ">Orden de Servicio</legend>
                    <div id="Div2" class="row-fluid">

                        <div class="span12">

                            <div class="span2">
                                <div class="control-group ">
                                    <label>Correlativo por:</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <input type='radio' id="rbSano" class='radio1' name='rdContac2' />
                                            Año
                                        </label>

                                    </div>
                                </div>
                            </div>


                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <input type='radio' id="rbSMes" class='radio1' name='rdContac2' />
                                           Mes
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group ">
                                    <label>Nemonico</label>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12" id="txtServicio" />
                                    </div>
                                </div>
                            </div>

                            <div class="span2">


                                <a id="btnServicio" class="btn blue">Modificar</a>




                            </div>

                            <div class="span2">
                            </div>
                        </div>

                    </div>

                </fieldset>




            </div>
        </div>
    </div>
</div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOCONFO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOCONFO.init();


    });

</script>
