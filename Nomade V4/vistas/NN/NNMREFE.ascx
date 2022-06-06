<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMREFE.ascx.vb" Inherits="vistas_NN_NNMREFE" %>
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
                <h4><i class="icon-reorder"></i>REGULARIZACION FECHAS PROCESADAS BIOMETRICO</h4>
                <div class="actions">
                    <a class="btn red" href="?f=NNMREFE" style="margin-top: -10px;"><i class="icon-list"></i>&nbsp;Listar</a>

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->

                <div class="row-fluid">
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="txt_Anio" name="optanho">
                                <input class="span8" type="text" id="txt_Mes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                      <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <button id="btn_filtrar" type="button" class="btn purple" style="margin-top: 25px;"><i class="icon-search"></i>&nbsp;Buscar</button>
                    </div>

                    <!--/span-->
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 20px;"></div>
                <div class="row-fluid">
                       <div class="span4"></div>
                    <div class="span3">
                         <div class="alert" id="leyenda" style=""><span><img src="../../recursos/img/ok2.png"></span>&nbsp;&nbsp;&nbsp;<strong style="color:green">Procesada</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><img src="../../recursos/img/error2.png"></span>&nbsp;<strong style="color:red">Sin Procesar</strong></div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4"></div>
                    <div class="span3">
                         <select id="cbo_fechas" class="span12" placeholder="Elegir una fecha">  </select>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span4"></div>
                    <div class="span3" id="div_boton">
                        
                    </div>
                </div>
            </div>

        </div>

    </div>
    <input type="hidden" id="hf_fecha" />
    <input type="hidden" id="hf_fec_selec" />

     <input type="hidden" id="hf_mes" />
     <input type="hidden" id="hf_anho" />
     <input type="hidden" id="hf_ctlg_code" />
     <input type="hidden" id="hf_scsl_code" />
</div>
<script type="text/javascript" src="../vistas/NN/js/NNMREFE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMREFE.init();


    });


</script>
