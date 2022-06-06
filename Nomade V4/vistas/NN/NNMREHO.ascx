<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMREHO.ascx.vb" Inherits="vistas_NN_NNMREHO" %>
<style>
    table.dataTable tbody tr.selected2 {
        background-color: #CDE1F1;
    }

    table.dataTable.order-column tbody tr.selected2 > .sorting_1,
    table.dataTable.order-column tbody tr.selected2 > .sorting_2,
    table.dataTable.order-column tbody tr.selected2 > .sorting_3, table.dataTable.display tbody tr.selected2 > .sorting_1,
    table.dataTable.display tbody tr.selected2 > .sorting_2,
    table.dataTable.display tbody tr.selected2 > .sorting_3 {
        background-color: #CDE1F1;
    }

    table.dataTable.stripe tbody tr.odd.selected2, table.dataTable.display tbody tr.odd.selected2 {
        background-color: #CDE1F1;
    }

    table.dataTable.hover tbody tr:hover.selected2,
    table.dataTable.hover tbody tr.odd:hover.selected2,
    table.dataTable.hover tbody tr.even:hover.selected2, table.dataTable.display tbody tr:hover.selected2,
    table.dataTable.display tbody tr.odd:hover.selected2,
    table.dataTable.display tbody tr.even:hover.selected2 {
        background-color: #CDE1F1;
    }



    table.dataTable.display tbody tr.odd.selected2 > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd.selected2 > .sorting_1 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr.odd.selected2 > .sorting_2, table.dataTable.order-column.stripe tbody tr.odd.selected2 > .sorting_2 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr.odd.selected2 > .sorting_3, table.dataTable.order-column.stripe tbody tr.odd.selected2 > .sorting_3 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr.even.selected2 > .sorting_1, table.dataTable.order-column.stripe tbody tr.even.selected2 > .sorting_1 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr.even.selected2 > .sorting_2, table.dataTable.order-column.stripe tbody tr.even.selected2 > .sorting_2 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr.even.selected2 > .sorting_3, table.dataTable.order-column.stripe tbody tr.even.selected2 > .sorting_3 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr:hover.selected2 > .sorting_1,
    table.dataTable.display tbody tr.odd:hover.selected2 > .sorting_1,
    table.dataTable.display tbody tr.even:hover.selected2 > .sorting_1, table.dataTable.order-column.hover tbody tr:hover.selected2 > .sorting_1,
    table.dataTable.order-column.hover tbody tr.odd:hover.selected2 > .sorting_1,
    table.dataTable.order-column.hover tbody tr.even:hover.selected2 > .sorting_1 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr:hover.selected2 > .sorting_2,
    table.dataTable.display tbody tr.odd:hover.selected2 > .sorting_2,
    table.dataTable.display tbody tr.even:hover.selected2 > .sorting_2, table.dataTable.order-column.hover tbody tr:hover.selected2 > .sorting_2,
    table.dataTable.order-column.hover tbody tr.odd:hover.selected2 > .sorting_2,
    table.dataTable.order-column.hover tbody tr.even:hover.selected2 > .sorting_2 {
        background-color: #CDE1F1;
    }

    table.dataTable.display tbody tr:hover.selected2 > .sorting_3,
    table.dataTable.display tbody tr.odd:hover.selected2 > .sorting_3,
    table.dataTable.display tbody tr.even:hover.selected2 > .sorting_3, table.dataTable.order-column.hover tbody tr:hover.selected2 > .sorting_3,
    table.dataTable.order-column.hover tbody tr.odd:hover.selected2 > .sorting_3,
    table.dataTable.order-column.hover tbody tr.even:hover.selected2 > .sorting_3 {
        background-color: #CDE1F1;
    }


    .btn.purple2:hover, .btn.purple2:focus, .btn.purple2:active, .btn.purple2.active, .btn.purple2.disabled, .btn.purple2[disabled] {
        background-color: #F5B400 !important;
        color: black !important;
    }

    .btn.purple2 {
        color: black;
        text-shadow: none;
        background-color: #F7C94B;
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REGULARIZACION HORAS EMPLEADO</h4>
                <div class="actions">
   
                    <a href="?f=NNMREHO" class="btn green" style="margin-top:-10px;"><i class="icon-plus"></i> Nuevo</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid a" style="display: none;">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">Empresa</label>
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">Establecimiento</label>
                            <div class="controls" id="Div2">
                                <select id="slcSucural" class="bloquear combo m-wrap span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">Fecha Rangos</label>
                            <div class="controls" id="Div1">
                                <input type="text" id="txt_fecha" class="m-ctrl-medium date-range span9">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <br />
                        <a class="btn purple" id="btn_filtrar" style="border-radius: 9px!important;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                </div>
               <%-- <div class="row-fluid a" style="display: none;">
                    <div class="span8"></div>

                </div>--%>
                <div class="a" style="display: none;">
                    <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 0px;"></div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="msg_warning" style="display: none">
                    </div>
                </div>
                <br />
                <div class="row-fluid a" style="display: none">
                    <div class="span12">
                        <div class="span4">
                            <fieldset class="span8">
                                <legend>LISTADO&nbsp <i class="icon-tasks"></i>
                                </legend>


                            </fieldset>
                        </div>
                        <div class="span4">

                            <fieldset class="span8">
                                <legend>REGULARIZAR&nbsp <i class="icon-time"></i>
                                </legend>


                            </fieldset>
                        </div>
                        <div class="span4">
                            <fieldset class="span8">
                                <legend>PROCESAR&nbsp <i class="icon-cogs"></i>
                                </legend>


                            </fieldset>
                        </div>



                    </div>
                </div>
                <div class="row-fluid a" style="display: none">
                    <div class="span12">
                        <div class="span4">
                            <table id="tbl_empl" class="display DTTT_selectable" style="height: 154px; font-family: serif;">
                                <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                    <tr>
                                        <th style="width: 80%;">EMPLEADO
                                        </th>
                                        <th style="width: 10%;">FECHA
                                        </th>
                                        <th style="display: none; width: 5%;">PIDM
                                        </th>
                                        <th style="display: none; width: 5%;">CODIGO HORARIO
                                        </th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                        <div class="span4">
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="alert alert-info">
                                        <strong>Info!</strong> Formato 24H por favor.
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12" id="error" style="display: none;">
                                    <div class="alert alert-block alert-error fade in" style="background-color: #FFF7F7;">
                                        <h4 class="alert-heading" style="color: #b94a48;">Error!</h4>
                                        <p id="msg_text" style="color: #C55869; font-size: initial;">
                                            (x)&nbsp;Campos no deben estar vacios.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span6">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center; background-color: #3470A0; color: white;"></th>
                                                <th style="text-align: center; background-color: #3470A0; color: white; font-family: serif;">HORARIO</th>

                                            </tr>
                                        </thead>
                                        <tbody id="body_horario">
                                            <tr>
                                                <td style="text-align: center;">----</td>
                                                <td style="text-align: center;">--:--</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="span6">
                                    <table class="table">
                                        <thead>
                                            <tr>

                                                <th style="text-align: center; background-color: #3470A0; color: white; font-family: serif;">HORA TOMADA</th>
                                                <th style="text-align: center; background-color: #3470A0; color: white; font-family: serif; display: none">ID</th>
                                            </tr>
                                        </thead>
                                        <tbody id="body_horas_re">
                                            <tr>
                                                <td style="text-align: center;">--:--</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12" id="boton" style="text-align: center; display: none;">
                                    <a class="btn purple2" id="brn_regularizar" style="border-radius: 4px!important; height: 42px;">REGULARIZAR<br />
                                        <p></p>
                                        <i class="icon-wrench"></i></a>


                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <table id="tbl_marcaciones" class="display" style="height: 54px; font-family: serif;">
                                        <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                            <tr>
                                                <th style="width: 20%;">MARCACIONES BIOMETRICO
                                                </th>
                                                <th style="width: 20%;">FECHA
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div class="span4">
                            <div class="row-fluid">
                                <div class="span12 b" style="display:none;">
                                    <div class="alert alert-block alert-info fade in">
                                        <h4 class="alert-heading">Info!</h4>
                                        <p>
                                            Para finalizar las regularizaciones, 
										debe de procesarlas haciendo <b>Click en el boton procesar</b>.
                                        </p>
                                        <p id="accion_procesar">
                                           
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</div>


<!-- FIN CUADRO PARA LA FORMA-->
<div id="MuestraModalAceptar" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #F52727; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>

            <h4 id="myModalLabel2"><i class="icon-warning-sign"></i>&nbsp;INFORMACION</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif; font-size: small;">

            <p></p>
            <div class="row-fluid">
                <div class="span12">
                    <i class="icon-user" style="font-size: -webkit-xxx-large;"></i>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span12" id="empleado_modal">
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th id="head_horario" colspan="4" style="text-align: center; background-color: #F0F6FA;"><i class="icon-time"></i>&nbsp;HORARIO</th>
                        <th id="head_hora_tomada" colspan="4" style="text-align: center; background-color: #FCF8E3;"><i class="icon-time"></i>&nbsp;HORA TOMADA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="horas_modal">
                    </tr>
                </tbody>
            </table>
            <br />
            <div class="alert alert-info" style="font-weight: 900;">
                <strong>Info!</strong> Tomese su tiempo para verificar que son las horas correctas!
            </div>
            <p style="font-weight: 900;">
                ¿Deseas realmente Regularizar ?
            </p>
            <br />

        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align: center;">


            <a id="ok" class="btn blue" href="javascript:HideAceptar();" style="border-radius: 7px !important;"><i class="icon-ok"></i>Si</a>
            <a id="no" class="btn red" data-dismiss="modal" style="border-radius: 7px !important;"><i class="icon-remove"></i>No</a>


        </div>
    </div>
    <input type="hidden" id="hf_nom_empl" />
    <input type="hidden" id="hf_pidm_empl" />
    <input type="hidden" id="hf_fecha_empl" />
    <input type="hidden" id="hf_index_e" />
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NN/js/NNMREHO.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<link href="recursos/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/date.js"></script>
<link href="recursos/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css">



<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMREHO.init();


    });


</script>
