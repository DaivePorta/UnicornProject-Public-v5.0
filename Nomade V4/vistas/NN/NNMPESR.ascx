<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMPESR.ascx.vb" Inherits="vistas_NN_NNMPESR" %>
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
                <h4><i class="icon-reorder"></i>PERIODO SIN REMUNERACION</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NNMPESR"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NNLPESR"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">


                <!-- primera linea --->
                <br />
                 <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_codigo">
                                Codigo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txt_codigo" class="span3" type="text" disabled ="disabled" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"></div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hfempresa" runat="server" />
                                    <asp:HiddenField ID="HiddenField1" runat="server" Value="2" />
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
               
                <div class="row-fluid">
                    <div class="span7"></div>
                   <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkestado">
                                                <div class="checker" id="uniform-chkestado">
                                                    <span class="checked">
                                                        <input type="checkbox" id="chkestado" name="chkestado" class="bloquear" style="opacity: 0;" checked="checked"></span>
                                                </div>
                                                Activo</label>
                                        </div>
                                    </div>
                </div>
                <br />
                <!-- FIN PRIMERA LINEA -->

                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_empleado">
                                Empleado</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="input_empl">
                                <input id="txt_empleado" class="bloquear span12" type="text" placeholder="Buscar Empleado ...">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="error_p" style="display:none;">
                            <div class="span2"></div>
                            <div class="span4">
                                <div class="control-group alert alert-error span12">
                                    <label class="control-label" id="Label2" style="text-align: -webkit-center;">Sin resultados&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                                </div>
                            </div>

                        </div>
                <br />

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"></div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Periodos</label>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fecha_ini">
                                Desde</label>
                        </div>
                    </div>
                   <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span9  required" data-date-format="dd/mm/yyyy" name="txt_fecha_ini" id="txt_fecha_ini">
                                </div>
                            </div>
                        </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fecha_fin">
                                Hasta</label>
                        </div>
                    </div>
                 <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="bloquear span9  required" data-date-format="dd/mm/yyyy" name="txt_fecha_fin" id="txt_fecha_fin">
                                </div>
                            </div>
                        </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"></div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_motivo">
                                    Motivos</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" >
                                    <select id="cbo_motivo" name="cbo_motivo" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Motivo" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2"></div>

                     <div class="span4" id="div_glosa" style="display:none ;">
                            <div class="control-group">
                                <div class="controls">
                                 <textarea id="txt_glosa" class="bloquear span12" style=" height:100px;"></textarea>
                                </div>
                            </div>
                        </div>
                </div>


                <div class="row-fluid" id="div_e" style="display:none;">
                    <div class="span1"></div>
                            <div class="span10">
                                <div class="control-group alert alert-info span12">
                                    <label class="control-label" id="lbl_msg" style="text-align: -webkit-center;">Ya existe periodo para el empleado &nbsp;&nbsp; <i class="icon-remove-sign"></i> </label>
                                </div>
                            </div>

                        </div>


                <div id="acciones">

                </div>
                 

            </div>
        </div>

    </div>
</div>




<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfctlg_code" />




<script type="text/javascript" src="../vistas/NN/js/NNMPESR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMPESR.init();
    });
</script>
