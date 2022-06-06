<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMJUST.ascx.vb" Inherits="vistas_NS_NSMJUST" %>
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
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO DE PERMISOS</h4>
                <div class="actions">
                    <a id="btnNuevo" class="btn green" href="?f=NSMJUST"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=NSLJUST"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">



                <br />
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span9">
                        <div class="control-group">
                            <label class="control-label">Código</label>
                            <div class="controls">
                                <input id="txt_codigo" type="text" class="span2" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Estado</label>
                            <div class="controls">
                                <div class="checker" id="uniform-chkEstado">
                                    <span class="checked">
                                        <input id="chkEstado" class="bloquear" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 0;"></span>
                                </div>
                                ACTIVO
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span3 ">
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
                    <div class="span3 ">
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
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Empleado</label>
                            <div class="controls" id="input_empl">
                                <input type="text" class="span12" id="txt_empleado">
                            </div>
                        </div>

                    </div>
                    <!--/span-->
                </div>

                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Tipo Motivo</label>
                            <div class="controls" id="Div6">
                                <select id="cbo_tipo_motivo" class="bloquear span10" placeholder="Selecciona tipo">
                                   
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Tipo de Justificación</label>
                            <div class="controls">
                                <select id="cbo_tipo_justificacion" class="bloquear span10" placeholder="Selecciona tipo">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Motivo</label>
                            <div class="controls" id="Div7">
                                <textarea id="txt_motivo" class="bloquear span12" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Por</label>
                            <div class="controls">
                                <label class="radio">
                                    <div class="radio" id="uniform-undefined">
                                        <span class="checked">
                                            <input id="rb_dias" class="bloquear" type="radio" name="optionsRadios1" value="option1" checked="" style="opacity: 0;"></span>
                                    </div>
                                    Dias.
                                </label>
                                <label class="radio">
                                    <div class="radio" id="Div1">
                                        <span class="">
                                            <input id="rb_horas" class="bloquear" type="radio" name="optionsRadios1" value="option2" style="opacity: 0;"></span>
                                    </div>
                                    Horas.
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row-fluid" id="msg" style="display: none;">
                    <div class="span1"></div>
                    <div class="span10">
                        <div class="alert alert-error" id="body_msg" style="font-size :large;">
                            
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4">
                      
                        <div class="row-fluid">
                            <div class="span4"></div>
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" id="lbl_fec_inicio">Desde</label>
                                    <div class="controls">
                                        <input type="text" class="bloquear span10 date-picker" id="txt_fec_inicio" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                                    </div>
                                </div>

                            </div>
                            <div class="span4" id="div_fec_fin">
                                <div class="control-group">
                                    <label class="control-label">Hasta</label>
                                    <div class="controls">
                                        <input type="text" class="bloquear span10 date-picker" id="txt_fec_fin" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row-fluid" style="display: none;" id="div_rang_horas">
                            <div class="span12">
                                <div class="span4"></div>
                                <div class="span4">
                                    <div class="control-group">
                                        <label class="control-label">Desde</label>
                                        <div class="controls">
                                            <input type="text" class="bloquear tooltips span7" placeholder="00:00" id="txt_hora_inicio" data-placement="bottom" data-original-title="Formato 24h.">
                                        </div>
                                    </div>

                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <label class="control-label">Hasta</label>
                                        <div class="controls">
                                            <input type="text" class="bloquear tooltips span7" placeholder="00:00" id="txt_hora_fin" data-placement="bottom" data-original-title="Formato 24h.">
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="span5">
                         <div class="span6">
                            
                      
                   
                        <div id="div_horario" style="display: none;">
                              <div class="span12" style="text-align: center;">
                            <h3><b>HORARIO&nbsp;&nbsp;<i class="icon-time"></i></b></h3>
                            <p></p>
                        </div>
                            <table id="tbl_horario" class="display table-bordered" style="height: 154px; border-collapse: collapse;">
                                <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                    <tr>
                                        <th style="width: 5%;">HORA INICIO (HORARIO)
                                        </th>
                                        <th style="width: 5%;">HORA FIN (HORARIO)
                                        </th>
                                        <th style="display: none; width: 90%;">SEQ
                                        </th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                    </div>
                        <div class="span2"></div>
                    <div class="span4">
                        
                        <div id="div_marcacion" style="display: none;">
                             <div class="span12" style="text-align: center;">
                            <h3><b>MARC.&nbsp;&nbsp;<i class="icon-time"></i></b></h3>
                            <p></p>
                        </div>
                            <table id="tbl_marcaciones" class="display table-bordered" style="height: 154px; font-family: serif;">
                                <thead style="background-color: rgb(52, 112, 160); color: aliceblue;">
                                    <tr>
                                        <th style="width: 5%;">MARCACION BIOMETRICO
                                        </th>
                                        <th style="width: 95%; display: none;">PIDM
                                        </th>

                                    </tr>
                                </thead>

                            </table>
                            <div>
                               
                                <div class="span12" id="boton" style="text-align:center;display:block;">
                                    <a class="btn purple2" id="brn_get_Marcaciones" style="border-radius: 4px!important; height: 62px;">OBTENER<BR />MARCACIONES<br>
                                        <p></p>
                                        <i class="icon-download"></i></a>


                                </div>
                            </div>
                            
                        </div>
                    </div>
                    </div>

                </div>
              

        <%--        <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                          
                        </div>
                    </div>
                    <div class="control-group span3">
                       
                        <div class="controls">
                            <label class="radio">
                                <div class="radio" id="med1">
                                    <span>
                                        <input type="radio" name="tipo" value="M" checked="checked" style="opacity: 0;" id="rbDia" />
                                    </span>
                                </div>
                                Día.
                            </label>
                           

                            <label class="radio">
                                <div class="radio" id="med2">
                                    <span>
                                        <input type="radio" name="tipo" value="D" style="opacity: 0;" id="tbHora" />
                                    </span>
                                </div>
                                Horas.
                            </label>
                   
                        </div>
                    </div>
                </div>--%>








<%--                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDesde" id="lblDesde">
                                Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div id="FechaUno" class="control-group span4">
                            <div class="controls span10">
                                <input class="span12 date-picker" type="text" id="txtDesde" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                            </div>
                        </div>
                    </div>


                    <div class="span2" id="DivlblHasta">
                        <div class="control-group">
                            <label class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>
                    </div>
                    <div class="span4" id="DivtxtHasta">
                        <div id="FechaDos" class="control-group span4">
                            <div class="controls span10">
                                <input class="span12 date-picker" type="text" id="txtHasta" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                            </div>
                        </div>
                    </div>


                </div>--%>




<%--
                <div class="row-fluid" id="DivHora">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtHoraInicio">
                                Desde</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div id="HoraUno" class="control-group span3">
                            <div class="controls">
                                <input id="txtHoraInicio" class="span12" type="text" placeholder="00:00" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtHoraFin">
                                Hasta</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div id="HoraDos" class="control-group span3">
                            <div class="controls">
                                <input id="txtHoraFin" class="span12" type="text" placeholder="00:00" />
                            </div>
                        </div>
                    </div>


                </div>--%>



<%--                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboTipo">
                                Tpo de Motivo</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipo" class="span8">
                                    <option value="S">Salud</option>
                                    <option value="C">Capacitación</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span2">

                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="2" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                            </div>
                        </div>
                    </div>


                </div>--%>





<%--
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtMotivo">
                                Motivo</label>

                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMotivo" class="span11" placeholder="Descripción del motivo." type="text" />
                            </div>
                        </div>
                    </div>


           
                </div>--%>
                <div class="form-actions" id="acciones" style="display:none;">
                    
                  
                   
                </div>





                <%--                     <div class="row-fluid">
                  
                            <ul class="thumbnails">
                             <li class="span6">
                                  <h4>Escaneo</h4>
                                     <img id="imganverso" style="max-height: 300px;" class="thumbnail span12" src="../../recursos/img/500x300.gif" alt=""  />
  
                                  
                                 <div class="span12">
                                        <input type="file" class="btn blue" id="anverso"/> 
                                 </div>

                             </li>
                          
                           </ul>

                     </div>--%>






                <%-- <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Cargo</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion" class="span11" placeholder="Descripción del Cargo" type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcnivel">
                                Nivel</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcnivel" class="span12">
                                    <option value="G">GERENCIA</option>
                                    <option value="J">JEFATURA</option>
                                    <option value="O">OPERACIONAL</option>
                                </select>
                            </div>
                        </div>
                    </div>


                </div>--%>




















                <!---fin linea -->

                <!-- INICIO  LINEA -->

                <div id="DivSeparador" style="display:none; border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>

                <div id="DivDetalle" style="display:none;">


                    <div class="row-fluid">
                        <div class="span12" style="text-align: left;">
                            <div class="span1"></div>
                            <div class="span3"><h3><b>DOCUMENTOS&nbsp;&nbsp;<i class="icon-folder-open"></i></b></h3></div>
                            
                            <p></p>
                        </div>
                    </div><br />
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="fuArchivo">
                                        Archivo</label>

                                </div>
                            </div>

                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls span6">
                                        <input type="file" id="fuArchivo" accept="image/*" />
                                    </div>
                                    <div class="controls span6">
                                    </div>

                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="row-fluid span12" style="margin-left: 0px;">
                        <div class="span12">
                            <div class="span1"></div>
                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtDescripcion">
                                        Descripción</label>

                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <input id="txtDescripcion" class="span11" placeholder="Descripción de la imágen." type="text" maxlength="50" />
                                </div>
                            </div>
                            <div class="control-group span4">
                                <button id="btnAgregar" type="button" class="btn blue span2" title="Agregar Imagen" onclick="javascript:AgregarImagen();"><i class="icon-plus"></i></button>
                            </div>
                        </div>

                    </div>




                    <!---fin linea -->

                    <!-- INICIO  LINEA -->




                    <br />
                    <br />
                    <br />
                    <div class="controls span12" id="DivTabla">

                        <div class="controls span6" id="DivTablaTabla" style="height: 230px;">
                             <div class="span2"></div>
                            <div class="span10">
                                <table id="tblImagenes" border="0" class="display DTTT_selectable" style="width: 100%; vertical-align: top;">
                                <thead>
                                    <tr>
                                        <th style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px; display: none;">Código</th>
                                        <th style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;">Descripción</th>
                                        <th style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;">Borrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <input type="hidden" id="FilaImagen" value="" />
                            </div>
                            
                        </div>
                        <div class="controls span6" id="DivImagen">
                            <img id="pic" style="width: 90%; height: 300px; border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;" />
                        </div>
                    </div>


                </div>











                <%--<div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcrol">
                                Rol</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcrol" class="span12" data-placeholder="ROL">
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btnagregarol" type="button" class="btn blue span12" title="Agregar clase"><i class="icon-plus"></i></button>

                            </div>
                        </div>
                    </div>


                </div>--%>















                <div class="row-fluid" style="display:none" id="div_jqx">
                    <div class="span2">
                    </div>
                    <div class="span5">
                        <div id="jqxgrid"></div>
                    </div>

                </div>
                <div class="row-fluid" style="display:none" id="div_jqx2">
                    <div class="span2">
                    </div>
                    <div class="span1">
                    </div>
                </div>
                &nbsp;
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="hfpidm" />

<input type="hidden" id="hftipo_justif" />
<script type="text/javascript" src="../vistas/NS/js/NSLJUST.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMJUST.init();

    });
</script>
