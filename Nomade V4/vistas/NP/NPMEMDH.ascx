<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPMEMDH.ascx.vb" Inherits="vistas_NP_NPMEMDH" %>
<style type="text/css">
    @media print {

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        #ModalCertificado {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #resultIMPR {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DERECHOHABIENTES DE EMPLEADOS</h4>
                <div class="actions">                
                    <%--<a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                    <a href="?f=NPMEMDH" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12" id="div_empl">                        
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" style="font-weight:bold">
                                    Empleado:</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtDniEmpleado" class="span12" placeholder="00000000" disabled="disabled" />
                                </div>
                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombreEmpleado" class="span12" disabled="disabled"/>
                                </div>
                            </div>
                        </div>

                        <div class="span2" style="margin-left: 5px">
                            <div class="control-group">
                                <div class="controls" style="padding-top: 4px">
                                    <a id="btnBuscar" class="tooltips btn black" href="javascript:showModalEmpleado();" data-placement="bottom" data-original-title="Buscar Empleado"><i class="icon-search"></i></a>
                                    <a id="btnEditar" class="tooltips btn green" data-placement="bottom" data-original-title="Editar Empleado" href="javascript:EnviaEditarEmpleado();"><i class="icon-edit"></i></a>
                                </div>
                            </div>
                        </div>                      
                    </div>
                </div>

                <div id="divListaBenef" style="margin-top:5px">
                    <div class="row-fluid">
                        <div class="span12" style="margin-top:5px">
                            <div class="control-group" style="text-align: center;">
                                <label class="control-label" style="font-weight: bold;text-decoration:underline;font-size:large">
                                    DERECHOHABIENTES</label>
                            </div>
                        </div>                                           
                    </div>       
                    <div class="row-fluid">
                        <div class="span12" id="divTablaTasas">
                            <table id="tbl_Benef" class="display DTTT_selectable" border="0">
                                <thead>
                                    <tr>
                                        <th style="display:none">IdDerechoHab</th>
                                        <th style="display:none">IdPersona</th>
                                        <th>DNI</th>
                                        <th>DerechoHabiente</th>
                                        <th>Vínculo Fam.</th>
                                        <th style="display:none">CodMotivo</th>
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>M. Baja</th>
                                        <th style="display:none">Ind_Estado</th>
                                        <th>Estado</th>
                                        <th>Desactivar</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="divInfo">                 
                </div>
                <div id ="divBeneficiario">
                    <div class="row-fluid" id="div_pers">
                        <div class="span12">
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label">
                                        Derecho Habiente</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtBeneficiario" class="span12" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2" style="margin-left: 5px">
                                <div class="control-group">
                                    <div class="controls" style="padding-top: 4px">
                                        <a id="btnBuscaPersona" class="tooltips btn black" href="javascript:showModalPersona();" data-placement="bottom" data-original-title="Buscar Persona"><i class="icon-search"></i></a>
                                        <a id="btnAgregarPersona" class="tooltips btn green" data-placement="bottom" data-original-title="Agregar Persona" href="?f=NCMPERS" target="_blank"><i class="icon-plus-sign"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="basic-toggle-button toggle-button">                                    
                            <input type="checkbox" class="toggle" checked="checked">            
                        </div>                                
                    </div>
                    <div class="row-fluid" >
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboVincFam">Vinculo DH.</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboVincFam" class="span12" data-placeholder=" Seleccione Vínculo" disabled="disabled">
                                    </select>
                                </div>
                            </div>
                        </div>
                         <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaIni">
                                    Fecha Inicio</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" data-date-format="dd/mm/yyyy" class="span12 date" id="txtFechaIni" placeholder="dd/mm/yyyy" style="text-align: center;" />
                                </div>
                            </div>
                        </div>
                        <div class="span5" style="margin-left: 5px">
                            <a id="btnAgregarBenef" class="btn blue" href="javascript: CrearDerechoHabiente();"><i class="icon-save"></i>&nbsp;Guardar</a>
                            <a id="btnCancelarBenef" class="btn gray"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="ModalEmpleado" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="width:50%">
    <div class="modal-content" id="Div2">
        <div class="modal-header" style="padding: 1px 15px; background: #4B8DF8; color: white;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="H3"><i class="icon-user"></i>&nbsp;Seleccionar Empleado</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif; font-size: small;">
            
            <div class="row-fluid">
  
                    <div id="div_empleado" class="span12">
                        <table id="tbl_empleado" class="table display table-bordered DTTT_selectable" role="grid">
                            <thead style="background-color:#0D6BA2; color: white;">
                                <tr>
                                    <th>DNI</th>
                                    <th>EMPLEADO</th>
                                    <th>SUCURSAL</th>
                                    <th>CARGO</th>
                                    <th>ESTADO</th>
                                    <th style="display:none">ID_PERS</th>
                                     <th style="display:none">ESTADO_IND</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
            </div>
        <input id="hfPOSICION" type="hidden" />
        <input id="hfIDPEREMP" type="hidden" />
        <input id="hfDOCEMP" type="hidden" />
        <input id="hfCODESTADO" type="hidden" />
        </div>        
        <div class="modal-footer" aria-hidden="true" style="text-align: center;">
            <a id="btnSelecEmpleado" class="btn blue" href="javascript:seleccionaEmpleado();" "><i class="icon-ok"></i>&nbsp Seleccionar</a>
            <a id="btnCancelar" class="btn" data-dismiss="modal" ><i class="icon-remove"></i>&nbsp Cancelar</a>
        </div>
    </div>
</div>


<div id="ModalPersona" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;width:auto;">
    <div class="modal-content" id="Div3">
        <div class="modal-header" style="padding: 1px 15px; background: #4B8DF8; color: white;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="H1"><i class="icon-user"></i>&nbsp;Seleccionar Beneficiario</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center; font-family: sans-serif; font-size: small;">
            
            <div class="row-fluid">
               
                    <div id="div_Persona"class="span12" >
                        <table id="tbl_Persona" class="table display table-bordered DTTT_selectable" role="grid">
                            <thead style="background-color:#0D6BA2;  color: white;">
                                <tr>
                                    <th style="display:none">ID</th>
                                    <th>TIPO DOC.</th>
                                    <th>NRO DOC.</th>
                                    <th>NOMBRE</th>
                                    <th style="display:none">SEXO</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
              
            </div>

        </div>
        <input id="hfPOSICIONPER" type="hidden" />
        <input id="fhIDPERSONA" type="hidden" />
        <input id="hfSEXOPER" type="hidden" />
        <div class="modal-footer" aria-hidden="true" style="text-align: center;">
            <a id="btnSelecPersona" class="btn blue" href="javascript:seleccionaPersona();" "><i class="icon-ok"></i>&nbsp Seleccionar</a>
            <a id="btnCancelarPers" class="btn" data-dismiss="modal" ><i class="icon-remove"></i>&nbsp Cancelar</a>
        </div>
    </div>
</div>

<div id="modal-confirmar" class="modal hide">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button"></button>
        <h3>Desactivar Derechohabiente</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span2">
                <div class="control-group">
                    <label class="control-label">
                        Derecho Habiente:</label>
                </div>
            </div>
            <div class="span9">
                <div class="control-group">
                    <label class="control-label" style="font-weight: bold" id="lblDerechoHab">
                        Derecho-Habiente</label>
                </div>
            </div>

        </div>


  <%--      <div class="row-fluid">
            <div class="span12 alert alert-info">
                <p id="mensaje" style="font-weight: bold">
                    Si tiene un ceritifcado activo para este beneficio  también se desactivará.
                    Está seguro de desactivar beneficiario?
                </p>
            </div>
        </div>--%>
        <input id="hfIdBenef" type="hidden" />
         <input id="hfFechaIni" type="hidden" />

        <div class="row-fluid">            
            <div class="span2">
                <div class="control-group">
                    <label class="control-label" for="cboMotivoBaja">Motivo Baja</label>
                </div>
            </div>

            <div class="span8">
                <div class="control-group">
                    <div class="controls">
                        <select id="cboMotivoBaja" class="span12" data-placeholder="Motivo Baja">
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">

              <div class="span2">
                <div class="control-group">
                    <label class="control-label" for="txtFechaFin">
                        Fecha Fin</label>
                </div>
            </div>

            <div class="span4">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" data-date-format="dd/mm/yyyy" class="span12 date" id="txtFechaFin" placeholder="dd/mm/yyyy" style="text-align: center;" />
                    </div>
                </div>
            </div>


        </div>


        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="span4 offset2">
                    <a id="btnAceptarConfir" class="btn blue"><i class="icon-check"></i>&nbsp;Confirmar</a>
                </div>
                <div class="span4">
                    <a id="btnCancelarConfir" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

   <link href="../../recursos/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="../../recursos/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NP/js/NPMEMDH.js"></script>
<script>
    jQuery(document).ready(function () {
        NPMEMDH.init();
    });
</script>
