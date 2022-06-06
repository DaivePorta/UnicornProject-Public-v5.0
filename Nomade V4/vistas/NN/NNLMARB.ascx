<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLMARB.ascx.vb" Inherits="vistas_NN_NNLMARB" %>
<style type="text/css">
    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTADO MARCACIONES DEL BIOMETRICO EN BRUTO</h4>
                <div class="actions">
                    <a class="btn red" href="?f=nnllima" style="margin-top: -10px;"><i class="icon-list"></i>&nbsp;Listar</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo m-wrap span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Empleado</label>
                            <div class="controls" id="input_empl">
                                <input type="text" class="span12" id="txt_empleado">
                            </div>
                        </div>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Opcion</label>
                            <div class="controls">
                                <label class="checkbox">
                                    <div class="checker" id="uniform-undefined">
                                        <span class="">
                                            <input type="checkbox" value="" style="opacity: 0;" id="chk_todos"></span>
                                    </div>
                                    Todos Empleados
                                </label>
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="controls">
                                <label class="radio">
                                    <div class="radio"  id="uniform-rbactivo">
                                        <span class="">
                                            <input id="rb_activo" type="radio" name="optionsRadios2" value="option1" style="opacity: 0;"></span>
                                    </div>
                                    Activo
                                </label>
                                <label class="radio">
                                    <div class="radio"  id="uniform-rbinactivo">
                                        <span class="">
                                            <input id="rb_inactivo" type="radio" name="optionsRadios2" value="option1" style="opacity: 0;"></span>
                                    </div>
                                    Inactivo
                                </label>
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                </div>
                <div class="row-fluid">
                    <div class="span3"></div>
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Fecha</label>
                            <div class="controls">
                                <input type="text" id="txt_fecha" class="m-wrap m-ctrl-medium date-range span9">
                            </div>
                        </div>
                    </div>
                    <div class="span3 ">
                        <a class="btn purple" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                    <!--/span-->
                </div>
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                <div class="row-fluid">
                    <table id="tbl_marcaciones" class="display" style="height: 54px; font-family: serif;">
                        <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                            <tr>
                                <th style="width: 20%;">FECHA
                                </th>
                                <th style="width: 20%;">NOMBRES
                                </th>
                                <th style="width: 20%;">MARCACION
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        </div>

    </div>
    <input type="hidden" id="hfpidm" />
</div>
<script type="text/javascript" src="../vistas/NN/js/NNLMARB.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-daterangepicker/date.js"></script>
<link href="recursos/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css">
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLMARB.init();


    });


</script>
