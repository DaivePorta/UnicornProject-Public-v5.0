<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEMPR.ascx.vb" Inherits="vistas_NC_NCMEMPR" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;EMPRESA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmempr"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclempr"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">

                    <!-- INICIO ACTIVO -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigo">
                                Codigo</label>

                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
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
                            <label class="control-label" for="chkactivo">
                                Activo</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <!-- FIN ACTIVO -->

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpart">
                                Partida Electrónica</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpart" class="span12" placeholder="Partida electrónica" type="text" />
                            </div>
                        </div>
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->


                <div class="row-fluid">
                    <div class="span6">


                        <!-- INICIO SEGUNDA LINEA -->
                        <div class="row-fluid">
                            <!-- INICIO NOMBRE -->
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtnombre">
                                        Razon Social</label>

                                </div>
                            </div>
                            <!-- FIN NOMBRE -->
                            <!-- INICIO FECHA -->
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtnombre" disabled="disabled" class="span12" placeholder="Razon Social" type="text" />
                                    </div>
                                </div>
                            </div>

                            <!-- -->
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">

                                        <a id="BuscaPJ" class="btn blue" data-toggle="modal"
                                            data-target="#muestralistap"><i class="icon-search" style="line-height: initial;"></i></a>
                                    </div>

                                </div>
                            </div>

                            <!-- FIN FECHA -->
                        </div>
                        <!-- FIN SEGUNDA LINEA -->

                        <!-- INICIO TERCERA LINEA -->
                        <div class="row-fluid">
                            <!-- INICIO CODIGO -->
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtdir">
                                        Dirección</label>

                                </div>
                            </div>
                            <!-- FIN CODIGO -->

                            <div class="span7">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input id="txtdir" class="span12" placeholder="Dirección" type="text" />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <!-- FIN TERCERA LINEA -->

                        <!-- INICIO CUARTA LINEA -->
                        <div class="row-fluid">
                            <!-- INICIO CODIGO -->
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtruc">
                                        RUC</label>

                                </div>
                            </div>


                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtruc" disabled="disabled" class="span12" required="" placeholder="RUC" type="text" />
                                    </div>
                                </div>
                            </div>
                            <!-- FIN CODIGO -->
                            <!-- INICIO CODIGO -->
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtpidm">
                                        PIDM</label>

                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtpidm" class="span12" disabled="disabled" type="text" />
                                    </div>
                                </div>
                            </div>

                            <!-- FIN CODIGO -->


                        </div>
                    </div>
                    <div class="span6">


                        <div class="row-fluid">

                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtcapi">
                                        Descripción Corta</label>

                                </div>
                            </div>


                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtDescCorta" class="span12" placeholder="Descripción Corta" type="text" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!------->
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtcapi">
                                        Capital Social</label>

                                </div>
                            </div>


                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtcapi" class="span12" placeholder="Capital" type="text" />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <!------->
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="control-group">
                                    <label class="control-label" for="txtnume">
                                        Participaciones</label>

                                </div>
                            </div>


                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtnume" class="span12" placeholder="Nº de Participaciones" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtvalor" class="span12" disabled="disabled" placeholder="Valor de Participaciones" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span4">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoRegimen">
                                    Tipo Regimen Renta</label>

                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoRegimen" class="span12" data-placeholder="Tipo Regimen Renta">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <div class="row-fluid">
                    <div class="span4">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoRegimenLab">
                                    Tipo Regimen Laboral</label>

                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboTipoRegimenLab" class="span12" data-placeholder="Tipo Regimen Laboral"></select>
                                </div>
                            </div>
                        </div>
                    </div>


                   

                </div>



                <div id="RRHH" class="span6" style="border:0px solid black; margin-left:0px;margin-top:5px;">
                    <div class="row-fluid">

                   
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label" for="" style="font-weight: bold; font-size: medium;margin-left:2px">
                                        DATOS RRHH:</label>
                                </div>
                            </div>



                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtDiaCorte" style="text-align:right;">
                                        Corte Planilla:</label>

                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls span9">
                                        <input id="txtDiaCorte" class="span12" placeholder="" type="text" style="text-align:right;" />
                                    </div>
                                </div>
                            </div>

                             <div class="span6">
                                <div class="control-group">
                                    <label class="control-label" for="" style="margin-left:0px; font-size:smaller;color:green;">
                                        * Máximo 10 días antes de fin de Mes</label>

                                </div>
                            </div>

                        </div>


                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtTope" style="text-align:right;">
                                        Tope Adelanto:</label>

                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls span9">
                                        <input id="txtTope" class="span12" placeholder="" type="text" style="text-align:right;" />                                       
                                    </div>
                                    <div class="span1">%</div>
                                </div>
                                
                            </div>
                      
                          
                              <div class="span6">
                                <div class="control-group">
                                    <label class="control-label" for="" style="margin-left:0px; font-size:smaller;color:green;text-align:left;">
                                        *En base al Sueldo del Empleado</label>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                    <label class="control-label" for="chkBiometrico" style="text-align: right;">
                                        Biométrico:</label>                                    
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <div class="control-group">
                                    <input id="chkBiometrico" type="checkbox" />
                                </div>
                            </div>
                            

                            <div class="span9">
                                <div class="control-group">
                                    <select id="cboBiometrico" class="m-wrap span12" data-placeholder="Seleccionar Biométrico" name="D1">
                                        <option></option>
                                    </select>
                                </div>                
                            </div>                           

                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtTope" style="text-align:right;">
                                        Cod. CTS:</label>

                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls span9">
                                        <input id="txtCts" class="span12" placeholder="" type="text" style="text-align:right;" />                                       
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>






                <div class="row-fluid">

                    <div class="span2"></div>
                    <div class="span8" id="tabladeaccionistas"></div>
                    <div class="span2"></div>
                </div>



                <div id="bloqueFirmantes" style="margin-top: 10px; display: none;">
                    <div class="row-fluid">                        
                        <fieldset><legend>Firmantes</legend></fieldset>
                    </div>
                    <div class="row-fluid">
                        <div id="bloque1" class="span6">

                            <!-- FIRMANTES -->
                            <div id="divFirmantes">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group ">
                                            <label class="control-label">Firmantes Obligatorios</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txtNroFirmantesOblig" onkeypress="return ValidaNumeros(event,this)" class="span2" style="text-align: center" data-placeholder="Nro." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- TIPOS DE FIRMAS -->
                                <div class="row-fluid">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label class="control-label">Firma</label>
                                        </div>
                                    </div>
                                    <div class="span10">
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="radio">
                                                        <div class="radio" id="Div1">
                                                            <span>
                                                                <input type="radio" name="firma" value="M" style="opacity: 0;" id="rndMacomunada" checked="checked" />
                                                            </span>
                                                        </div>
                                                        Mancomunada
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="radio">
                                                        <div class="radio">
                                                            <span>
                                                                <input type="radio" name="firma" value="S" style="opacity: 0;" id="rndSolidaria" />
                                                            </span>
                                                        </div>
                                                        Solidaria
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="span4">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="radio">
                                                        <div class="radio" id="Div2">
                                                            <span>
                                                                <input type="radio" name="firma" value="X" style="opacity: 0;" id="rndMixta" />
                                                            </span>
                                                        </div>
                                                        Mixta
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div id="divMixta" style="display: none">
                                    <div class="row-fluid">
                                        <div class="span5 offset2">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="control-label span5" for="txtSolidariaDesde">Solidaria Desde<span class="simboloMoneda"></span>:</label>
                                                    <input type="text" id="txtSolidariaDesde" onkeypress="return ValidaDecimales(event,this,2)" class="span7" style="text-align: center" value="0" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span5">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <label class="control-label span5" for="txtSolidariaHasta">Hasta:</label>
                                                    <input type="text" id="txtSolidariaHasta" onkeypress="return ValidaDecimales(event,this,2)" class="span7" style="text-align: center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid" style="padding: 4px">
                                    <div class="span2">
                                        <div class="control-group ">
                                            <label class="control-label">Autorizado 1:</label>
                </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input id="txtAutorizado1" style="text-align: center" type="text" class="span2" data-placeholder="Autorizado 1" disabled="disabled" />
                                                <input id="txtAutorizado1Desc" type="text" class="span7" data-placeholder="Autorizado 1" disabled="disabled" />
                                                <div class="span3 pull-right">
                                                    <label class="control-label" title="Obligatorio">
                                                        <input type="checkbox" id="chkObligatorio1" name="chkObligatorio1" />
                                                        Oblig.</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span2" style="margin-left: 5px">
                                        <div class="control-group">
                                            <div class="controls" style="padding-top: 4px">
                                                <a class="btn blue" onclick="CargarPersonas('1')" data-toggle="modal" data-target="#muestralistap"><i class="icon-user"></i></a>
                                                <a id="btnAgregarDivFirmante" class="btn blue add"><i class="icon-plus"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row-fluid">
                                <div class="span12">
                                    <a id="btnAgregarAutorizados" class="btn green pull-right" style="display: none;"><i class="icon-plus"></i>&nbsp;Agregar Autorizados</a>
                                </div>
                            </div>
                        </div>
                        <div id="bloque2" class="span6">
                            <!-- FIN FIRMANTES -->
                            <div id="divFirmantesMixtos">
                                <!-- DATOS DETALLES -->
                                <div id="divTblDetalles" style="display: none; overflow-x: auto;">
                                    <table id="tblDetalles" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                        <thead style="background-color: #4D90FE; text-align: center; color: #ffffff;">
                                            <tr>
                                                <th style="max-width: 62px;">#</th>
                                                <th>DESDE <span class="simboloMoneda"></span></th>
                                                <th>HASTA <span class="simboloMoneda"></span></th>
                                                <th></th>
                                                <th>AUTORIZADOS FIRMA MIXTA</th>
                                                <th>OBLIG.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FIN CUARTA LINEA -->

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->

<div class="control-group" style="display: none;">
    <div class="controls">
        <select id="cboMoneda" data-placeholder="Moneda" disabled="disabled"></select>
    </div>
</div>

<input type="hidden" id="hfPPBIDEN_PIDM" value="" />

<div id="crearAccionista" style="width: 700px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <div class="row-fluid">
                <h3 id="H1">CREACIÓN DE ACCIONISTA
                    <button type="button" class="btn green" style="margin-left: 25%;" id="masAccionistas"><i class="icon-plus"></i>Agregar Otro</button></h3>

            </div>
        </div>
        <div id="Accionista_body" class="modal-body" aria-hidden="true">
            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>



<%--<div id="muestralistap" style="width: 700px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel">LISTA DE PERSONAS JURIDICAS</h3>
        </div>
        <div id="divmodal" class="modal-body" aria-hidden="true">
            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>--%>

<div id="muestralistap" style="width: 900px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>&nbsp;<span id="tituloModal">LISTA DE PERSONAS JURÍDICAS</span> </h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divmodal">
                <!--aki se carga el contenido por jquery-->
        </div>
    </div>
    </div>
    <div class="modal-footer"></div>
</div>

<div id="MuestraModalAceptar"  class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: red; color:#ffffff;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button>            
            <h4 id="myModalLabel2"><i class="icon-warning-sign"></i>&nbsp;ADVERTENCIA</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center;font-family: sans-serif;font-size: large;"> 
            ¿Desea desactivar el biometrico de la empresa y sus establecimientos ?         
        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align:center;">
                    <a id="ok" class="btn blue" href="javascript:Actualizar();" style="border-radius:7px !important;" ><i class="icon-ok"></i> Si</a>
                    <a id="no" class="btn red"  data-dismiss="modal"  style="border-radius:7px !important;"><i class="icon-remove"></i> No</a>
            </div>
    </div>
</div>
<br />
<div id="MuestraModalRegulariza" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal3">
        <div class="modal-header" style="padding: 1px 15px; background: BLUE; color:#FDFDFE;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button>            
            <h4 id="H2"><i class="icon-warning-sign"></i>&nbsp;INFORMACIÓN</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center;font-family: sans-serif;font-size: large;">
            El Control Biométrico no se puede desactivar por que existen asistencias por regularizar
        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align:center;">
                    <a id="ok2" class="btn blue" href="javascript:cerrarventana('MuestraModalRegulariza');" style="border-radius:7px !important;" ><i class="icon-ok"></i>Aceptar</a>
            </div>
    </div>
</div>
<br />
<div id="MuestraModalProcesa"  class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">
    <div class="modal-content" id="modal4">
        <div class="modal-header" style="padding: 1px 15px; background: YELLOW; color:#111419;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button>            
            <h4 id="H3"><i class="icon-warning-sign"></i>&nbsp;INFORMACIÓN</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center;font-family: sans-serif;font-size: large;">
            El Control Biométrico no se puede desactivar por que existen asistencias regularizadas sin procesar
        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align:center;">
                    <a id="ok3" class="btn blue" href="javascript:cerrarventana('MuestraModalProcesa');" style="border-radius:7px !important;" ><i class="icon-ok"></i>Aceptar</a>
            </div>
    </div>
</div>







<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NC/js/NCEMPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCEMPR.init();
        $('#uniform-chkactivo span').removeClass().addClass("checked");
        $('#chkactivo').attr('checked', true);

    });


</script>
