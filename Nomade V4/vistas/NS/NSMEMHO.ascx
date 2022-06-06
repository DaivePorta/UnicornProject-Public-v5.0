<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMEMHO.ascx.vb" Inherits="vistas_NS_NSMEMHO" %>

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

        .btn.purple2:hover, .btn.purple2:focus, .btn.purple2:active, .btn.purple2.active, .btn.purple2.disabled, .btn.purple2[disabled] {
        background-color: #5535B0  !important;
        color: white !important;
    }

    .btn.purple2 {
        color: white;
        text-shadow: none;
        background-color: #7664AB;
    }
</style>

<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Mi Solicitud de horas extras</h4>
                <div class="actions">
                    <a id="btnMail" class="btn purple" href="javascript:MostrarPopUp();"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>
                    <a id="btnNuevo" class="btn green" href="?f=NSMEMHO"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NSLEMHO"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">



                <div class="row-fluid">


                    <div class="span8">

                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="slcnivel">
                                    Código</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" type="text" class="span10" disabled="disabled" />
                                </div>
                            </div>
                        </div>


                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaProceso" id="lblDesde">
                                    Fecha Proceso</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div id="FechaUno" class="control-group span12">
                                <div class="controls span10" id="Proceso">
                                    <input class="span12 date-picker" type="text" id="txtFechaProceso" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled="disabled">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span8">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="lblEmpresa">
                                    Empresa</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls" id="Empresa">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Seleccione Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div class="row-fluid">

                    <div class="span8">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="lblEmpresa">
                                    Establecimiento</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12" data-placeholder="Seleccione Establecimiento">
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div class="row-fluid">

                    <div class="span8">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpleado">
                                    Empleado</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls" id="Empleado">
                                    <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado" disabled>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="row-fluid">

                    <div class="span8">

                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="lblEmpresa">
                                    Asingnación</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls" id="Plame">
                                    <select id="cboPlame" class="span12">
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>




                <div class="row-fluid">
               
                    <div class="span12">
                            <div class="span5">

                                <div class="row-fluid">
                                    <div class="span5" id="DivlblHasta">
                                        <div class="control-group">
                                            <label class="control-label" for="txtFechaAutorizada">
                                                Fecha Hora Extra</label>
                                        </div>
                                    </div>
                                    <div class="span7" id="DivtxtHasta">
                                        <div id="FechaDos" class="control-group span8">
                                            <div class="controls span12">
                                                <input class="span12 date-picker" type="text" id="txtFechaAutorizada" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" style="margin-left:9px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-fluid">
                                    <div class="span5">
                                        <div class="control-group">
                                            <label class="control-label" for="txtHoraInicio">
                                                Hora inicio</label>

                                        </div>
                                    </div>

                                    <div class="span3">
                                        <div id="HoraUno" class="control-group span10">
                                            <div class="controls">
                                                <input id="txtHoraInicio" class="span10" type="text" placeholder="00:00" style="margin-left:9px;" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div class="control-group">
                                            <label class="control-label" for="txtHoraFin">
                                                Hora fin</label>

                                        </div>
                                    </div>

                                    <div class="span2">
                                        <div id="HoraDos" class="control-group span12">
                                            <div class="controls">
                                                <input id="txtHoraFin" class="span12" type="text" placeholder="00:00" style="margin-left:9px;" />
                                            </div>
                                        </div>
                                    </div>




                                </div>


                                <div class="row-fluid">

                                    

                                </div>




                            </div>

                            <div class="span3">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtHoraInicio">
                                        Horario</label>
                                </div>
                            </div>


                            <div id="divTabHorario" style="overflow: auto" class="span9">
                                <table id="tbl_Horario" class="table display DTTT_selectable">
                                    <thead style="background-color: rgb(9, 76, 180); color: white;">
                                        <tr>
                                            <th style="text-align: center; display: none;">Item</th>
                                            <th style="text-align: center;">H. Inicio</th>
                                            <th style="text-align: center;">H. Fin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr class="odd">
                                                    <td align="top" colspan="3" class="dataTables_empty">No hay información disponible</td>
                                                </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>


                        <div class="span2">

                            <div id="div_marcacion" style="overflow: auto">                         
                                        <table id="tbl_marcaciones" class="table display table-bordered DTTT_selectable" role="grid">
                                            <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                                <tr role="row">
                                                    <th style="width: 5px; text-align:center" class="sorting_disabled" rowspan="1" colspan="1">Marcaciones Biométrico
                                                    </th>
                                                  <%--  <th style="width: 95%; display: none;" rowspan="1" colspan="1">PIDM</th>--%>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr class="odd">
                                                    <td style="text-align:center" align="top" colspan="1" class="dataTables_empty">No hay información disponible</td>
                                                </tr>
                                            </tbody>
                                        </table>                                                           
                                <div>
                                </div>

                            </div>
                        </div>



                        <div class="span2" id="boton" style="text-align: left; display: block;margin-left:3px">
                            <a class="btn purple2" id="brn_get_Marcaciones" style="border-radius: 4px!important; height: 40px;">Obtener<br>
                                <p></p>
                                <i class="icon-download"></i></a>
                        </div>

                    </div>

                </div>

                <br />
     <%--           <div class="row-fluid" id="DivHora">
                                    
                </div>--%>


                <div class="row-fluid">
                    <div class="span8">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtMotivo">
                                    Motivo</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txtMotivo" style="height: 80px;resize:both" maxlength="200" class="span12" ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span8">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="cboSolicitante">
                                    Solicitante</label>

                            </div>
                        </div>
                        <div class="span9">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSolicitante" class="span12" data-placeholder="Seleccione Solicitante">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblAprobante">
                                Aprobante</label>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblAprobante">PENDIENTE.</label>
                            </div>
                        </div>
                    </div>



                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblUsuarioReg">
                                Usuario Registro</label>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblUsuarioReg">No Registrado.</label>
                            </div>
                        </div>
                    </div>


                 
                </div>


                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="lblProceso">
                                Proceso</label>

                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <label id="lblProceso">No solicitada</label>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                            </div>
                        </div>
                    </div>

                </div>


          









      <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabar();"><i class="icon-circle-arrow-right"></i>&nbsp;Solicitar</a>
                    <a id="btncancelar" class="btn" href="?f=nsmsoho"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>






      <div id="divMail" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none ;">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="divMail_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;Redactar correo electrónico</h4>
        </div>
        <div class="modal-body">
            <div class="row-fluid">
                <div class="span12" id="divMail_body">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">De:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNRemitente" class="span12" disabled><input id="txtRemitente" type="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Para:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <select multiple="multiple" class="span12" id="cboCorreos"></select>
                                    <%--<a href="?f=nclpers" target="_blank" title="Agregue correos en la pantalla Persona">Nuevo Correo</a>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label">Asunto:</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtAsunto" class="span12">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12" style="padding: 10px; border: thin inset">
                            <textarea style="border: none; width: 99%; height: 80px" placeholder="Escriba aquí su mensaje" id="txtcontenido"></textarea><hr style="margin: 8px 0px;">
                            <h4 id="lblEmpresa"></h4>
                            <h5 id="lblAsunto"></h5><br />
                            <h6><strong>Tipo:</strong>&nbsp;<span id="lblTipoHoraExtra"></span></h6>
                            <h6> <strong>Empleado:</strong>&nbsp;<span id="lblEmpleado"></span></h6>
                            <h6><strong>Fecha Proceso:</strong>&nbsp;<span id="lblFechaProceso"></span></h6>
                            <h6><strong>Fecha Permiso:</strong>&nbsp;<span id="lblFechaPermiso"></span></h6>
                            <h6><strong>Hora Inicio:</strong>&nbsp;<span id="lblHoraIni"></span>&nbsp;&nbsp;&nbsp;<strong>Hora Fin:</strong>&nbsp;<span id="lblHoraFin"></span></h6><br />
                            <%--<h6></h6><br />--%>
                            <h6><strong>Periodo:</strong>&nbsp;<span id="lblPeriodo"></span></h6>
                            <h6><strong>Motivo:</strong>&nbsp;<span id="lblMotivo"></span></h6>
                            <h6><strong>Solicitante:</strong>&nbsp;<span id="lblSolicitanteM"></span></h6>
                             <h6><strong><span id="lblApro">Aprobante:</span></strong>&nbsp;<span id="lblAprobanteM"></span></h6><br />
                            <h6><strong>Estado:</strong>&nbsp;<span id="lblEstadoM"></span></h6>
                           <%-- <div class="row-fluid">
                                <div class="span12" id="lblTablaHtml"></div>
                            </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn green" type="button" onclick="enviarCorreo()" id="btnEnviarCorreo"><i class="icon-plane"></i>&nbsp;Enviar</button>
        </div>
    </div>





            </div>




            </div>
        </div>
    </div>


    <script type="text/javascript" src="../vistas/NS/js/NSMEMHO.js"></script>

    <script>
        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
            NSMEMHO.init();
        });
    </script>
