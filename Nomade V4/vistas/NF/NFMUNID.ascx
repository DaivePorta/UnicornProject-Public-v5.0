<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMUNID.ascx.vb" Inherits="vistas_NF_NFMUNID" %>

<style>
    .modal {
        margin-left: 0px !important;
    }
    @media (max-width:900px) {
        #muestraimagenes,#muestralistach,#muestraimagenes {
            left: 5% !important;
            width: 90% !important;
        }
    }

    .datepicker {
        z-index: 1151;
    }

    div#menuimg ul li {
        line-height: 30px;
    }

    div#menuimg .nav > li > a:hover {
        background-color: #808080;
        color: white;
    }

    div#menuimg {
        /*width:130px;
       height:30px;*/
        /*background-color:whitesmoke;*/
        position: absolute;
        z-index: 3000;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #8888;
        box-shadow: 0 0 5px #298ACA;
    }

    .bloquear {
        overflow: hidden;
    }

    .fancybox-lock .fancybox-overlay {
        overflow: auto;
        overflow-y: hidden;
    }

    .thumbnailCustom a {
        text-align: center;
        text-decoration: none;
    }

    .modal-backdrop.fade.in {
        z-index: 900;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>UNIDADES DE VEHÍCULOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmunid"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nflunid"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">

                <!---->
                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="cboEmpresa">Empresa</label>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="cboEmpresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->

                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="txtcodigo">ID Vehículo</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span6" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">

                        <div class="span4">
                            <label class="control-label" for="chkactivo">Activo</label>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkactivo" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="span4">
                            <label class="control-label" for="chkmtc">MTC</label>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkmtc" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="divConstancia" style="display: none;">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNroConstancia">
                                    N° Constancia</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNroConstancia" class="span12" maxlength="15" placeholder="N° Constancia" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!---->

                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtpartida">Partida Registral</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" class="span12" id="txtpartida" placeholder="Partida registral" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="txtfechai">Fecha Inicio</label>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechai" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <label class="control-label" for="txtfechat">Fecha Término</label>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechat" placeholder="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---->
                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="slcMarca">Marca</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcMarca" class="span12" data-placeholder="MARCA">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="slcModelo">Modelo</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcModelo" class="span12" data-placeholder="MODELO">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label" for="txtcolor">Color</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcolor" class="span12" type="text" placeholder="Color" />
                            </div>
                        </div>
                    </div>
                </div>

                <!---->

                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtmotor">Número de Motor</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtmotor" class="span12" type="text" placeholder="Número de motor" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="txtplaca">Placa</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtplaca" class="span6" type="text" placeholder="Placa" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <label class="control-label" for="txtanho">Año de Fabricación</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtanho" class="span6" type="text" placeholder="Año" />
                            </div>
                        </div>
                    </div>

                </div>
                <!---->
                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="slcTipo">Tipo de Unidad</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcTipo" class="span12" data-placeholder="TIPO DE UNIDAD">
                                    <option></option>
                                    <option value="T">TRANSP. CARGA</option>
                                    <option value="P">MOV. PERSONAL</option>
                                    <option value="M">MAQ. PESADA</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="txtsech">Serie/Chasis</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtsech" class="span12" type="text" placeholder="Serie / Chasis" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="txtasientos">Número de Asientos</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtasientos" class="span6" type="text" placeholder="Nro." disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>

                <!---->
                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtcompa">Compañía de SOAT</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcompa" class="span12" type="text" placeholder="Compañía de SOAT" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <label class="control-label" for="txtpoliza">Poliza SOAT</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtpoliza" class="span12" type="text" placeholder="Poliza SOAT" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label" for="txtcompra">Fecha de Compra SOAT</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcompra" class="span12" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                </div>

                <!---->

                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="txtpropietario">Propietario</label>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <div class="span8">
                                    <input id="txtpropietario" type="text" class="span12" placeholder="Propietario" disabled="disabled" />
                                </div>
                                <div class="span4">
                                    <div class="control-group span12">
                                        <div class="controls pull-right">
                                            <a id="BuscaP" class="btn blue" data-toggle="modal" data-target="#muestralistap" style="margin-bottom: 2px;"><i class="icon-user" style="line-height: initial;"></i></a>
                                            <a href="?f=NFMPROP" target="_blank" class="btn green" title="Nuevo Propietario" style="margin-bottom: 2px;"><i class="icon-plus" style="line-height: initial;"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <label class="control-label" for="slcGPS">GPS</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcGPS" class="span12" data-placeholder="GPS">
                                    <option></option>
                                    <option value="A">ACTIVO</option>
                                    <option value="E">EN MANTENIMIENTO</option>
                                    <option value="N">NO TIENE</option>
                                    <option value="M">MALOGRADO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtfechaGPS" class="span7" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtfechai">F. Ult. Rev. Tec.</label>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtFechaRev" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNroRev">
                                N° Revisión</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtNroRev" class="span12" maxlength="15" placeholder="N° Revisión" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <label class="control-label" for="txtNroEjes">Número de Ejes</label>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtNroEjes" class="span6" type="text" placeholder="Nro." disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboCombustible">
                                Combustible</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboCombustible" class="span12" data-placeholder="Combustible">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="row-fluid">

                    <div class="span2 offset4">
                        <button class="btn lightblue no-bloq" id="btnimagenes" data-toggle="modal" data-target="#muestraimagenes" disabled="disabled" style="display: none;">
                            <i class="icon-picture"></i>&nbsp;Imágenes</button>
                    </div>
                    <div class="span2">
                        <button class="btn purple no-bloq" id="btnchoferes" data-toggle="modal" data-target="#muestralistach" disabled="disabled" style="display: none;">
                            <i class="icon-group"></i>&nbsp;Choferes</button>
                    </div>
                </div>

                <!-------->
                <div class="row-fluid">
                    <div class="span6">
                        <fieldset class="span12">
                            <legend>Capacidad Carga
                            </legend>

                            <div class="row-fluid">
                                <div class="span1">
                                    <label class="control-label" for="txtpbruto">Peso Bruto</label>
                                </div>
                                <div class="span3">
                                    <div class="control-group ">
                                        <div class="controls">
                                            <input id="txtpbruto" class="span12" type="text" placeholder="P. bruto" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <label class="control-label" for="txtpseco">Peso Neto</label>
                                </div>
                                <div class="span3">
                                    <div class="control-group ">
                                        <div class="controls">
                                            <input id="txtpseco" class="span12" type="text" placeholder="P. Neto" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtCargaMaxima">
                                            Carga Máxima</label>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtCargaMaxima" class="span11" placeholder="Carga Máxima" onkeypress='return ValidaDecimales(event,this,3)' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div class="span6">
                        <fieldset>
                            <legend>Dimensión del Vehículo
                            </legend>

                            <div class="span1">
                                <label class="control-label" for="txtlargo">Largo</label>
                            </div>
                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" placeholder="0.00" id="txtlargo" disabled="disabled" class="span7">
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <label class="control-label" for="txtancho">Ancho</label>
                            </div>
                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" placeholder="0.00" id="txtancho" disabled="disabled" class="span7">
                                    </div>
                                </div>
                            </div>

                            <div class="span1">
                                <label class="control-label" for="txtalto">Alto</label>
                            </div>
                            <div class="span2">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="text" placeholder="0.00" id="txtalto" class="span10" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <!------->
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="muestralistap" style="left: 20%; width: 60%; display:none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <div class="row-fluid">
                <div class="span9">
                    <h4 id="myModalLabelprop">LISTA DE PROPIETARIOS</h4>
                    <h5 id="subtitleemp"></h5>
                </div>
                <div class="span3">
                    <a class="btn blue" style="padding: 2px 8px;" id="btnlistarop" href="javascript:listartodosprop();"><i class="icon-plus"></i>Listar Todos</a>
                </div>
            </div>

        </div>
        <div id="divmodal" class="modal-body" aria-hidden="true">
            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>

<div id="muestralistach" style="left: 20%; width: 60%;display:none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" >

    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h4 id="titlechof"></h4>
            <div class="row-fluid">
                <div class="span9" id="titpro"></div>
                <div class="span3 no-display">
                    <a class="btn green " style="padding: 2px 8px;" href="javascript:editarchofer();"><i class="icon-pencil"></i>&nbsp;Nuevo</a>
                    <a class="btn red" style="padding: 2px 8px;" href="javascript:listarchofer();"><i class="icon-plus"></i>&nbsp;Listar</a>
                </div>
            </div>
        </div>
        <div id="divmodalch" class="modal-body" aria-hidden="true">

            <!--aki se carga el contenido por jquery-->
        </div>
    </div>
</div>

<div id="muestraimagenes" style="left: 20%; width: 60%;display:none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h4 id="myModalLabelmi"></h4>
        </div>
        <div id="divmodalimg" class="modal-body" aria-hidden="true">

            <div class="span12" id="contgal" style="margin-left: 0px;">

                <div id="galeria" class="span12">

                    <div class="row-fluid">
                        <div class="span4 ">
                            <a class="fancybox" rel="group" href="../../recursos/img/500x300.gif" title="Vista Frontal">
                                <img id="VF" class="img-responsive" src="../../recursos/img/500x300.gif">
                                <div>
                                    <span>Vista Frontal</span>

                                </div>
                            </a>
                        </div>

                        <div class="span4">
                            <a class="fancybox" rel="group" href="../../recursos/img/500x300.gif" title="Vista Lateral">
                                <img id="VL" class="img-responsive" alt="" src="../../recursos/img/500x300.gif">
                                <div class="text-right">
                                    <span>Vista Lateral</span>
                                </div>
                            </a>
                        </div>
                        <div class="span4">
                            <a class="fancybox" rel="group" href="../../recursos/img/500x300.gif" title="Tarj. Propiedad">
                                <img id="TP" class="img-responsive" alt="" src="../../recursos/img/500x300.gif">
                                <div class="text-right">
                                    <span>Tarj. Propiedad</span>
                                </div>
                            </a>
                        </div>

                    </div>

                    <div>&nbsp;</div>

                    <div class="row-fluid">
                        <div class="span4">
                            <a class="fancybox" rel="group" href="../../recursos/img/500x300.gif" title="Soat">
                                <img id="SO" class="img-responsive" alt="" src="../../recursos/img/500x300.gif">
                                <div class="text-right">
                                    <span>Soat</span>
                                </div>
                            </a>
                        </div>
                        <div class="span4">
                            <a class="fancybox" rel="group" href="../../recursos/img/500x300.gif" title="DNI Propietario">
                                <img id="DP" class="img-responsive" alt="" src="../../recursos/img/500x300.gif">
                                <div class="text-right">
                                    <span>DNI Propietario</span>
                                </div>
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <div align="right"><small>*Click derecho para cambiar las imágenes</small></div>

        </div>
        <div id="menuimg">
            <%--    <ul  class="nav" role="menu" aria-labelledby="dropdownMenu">
         <li class="dropdown" align="center"><a tabindex="-1" id="cambiar" href="javascript:cargarimagenes();"><i class="icon-pencil"></i> Cambiar imagen</a></li>
    </ul>
            --%>
            <input type="file" class="btn lightblue" id="btnimgs" multiple="multiple" />
        </div>

    </div>
</div>

<!--formulario de modal -->
<div id="contenteditchof" style="display: none;">

    <!-- primera linea --->
    <div class="row-fluid">


        <div class="span2">
            <label class="control-label" for="txtcodchofer">Código</label>

        </div>

        <div class="span2">
            <div class="control-group">
                <div class="controls">
                    <input id="txtcodchofer" class="span12" disabled="disabled" type="text" />
                </div>
            </div>
        </div>


        <div class="span1">
            <label class="control-label" for="chkactchofer">
                Activo</label>
        </div>

        <div class="span1">
            <div class="control-group">
                <div class="controls">
                    <input id="chkactchofer" type="checkbox" checked="checked" />
                </div>
            </div>
        </div>

    </div>
    <!-- FIN PRIMERA LINEA -->

    <!-- INICIO  LINEA -->
    <div class="row-fluid">

        <div class="span2">
            <label class="control-label" for="slcchofer">
                Chofer</label>

        </div>

        <div class="span7">
            <div class="control-group">
                <div class="controls">
                    <select id="slcchofer" class="span12">
                        <option></option>
                    </select>
                </div>
            </div>
        </div>
        <div class="span2">
            <div class="control-group">
                <div class="controls">
                    <a id="btnRecargarChoferes" class="btn purple" style="padding: 10px"><i class="icon-refresh"></i></a>
                </div>
            </div>
        </div>
    </div>

    <!---fin linea -->


    <!-- INICIO  LINEA -->
    <div class="row-fluid">

        <div class="span2">
            <label class="control-label" for="slcturno">
                Turno</label>

        </div>

        <div class="span3">
            <div class="control-group">
                <div class="controls">
                    <select id="slcturno" class="span12" data-placeholder="TURNO">
                        <option></option>
                        <option value="D">DIA</option>
                        <option value="T">TARDE</option>
                        <option value="N">NOCHE</option>
                        <option value="C">COMPLETO</option>
                    </select>
                </div>
            </div>
        </div>


    </div>

    <!---fin linea -->

    <!-- INICIO  LINEA -->
    <div class="row-fluid">

        <div class="span2">

            <label class="control-label" for="txtfechainchof">
                Fecha Inicio</label>

        </div>

        <div class="span3">
            <div class="control-group">
                <div class="controls">
                    <input id="txtfechainchof" class="span12" type="text" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" />
                </div>
            </div>
        </div>


    </div>

    <!---fin linea -->




    <div class="form-actions">
        <a id="btngrch" class="btn blue" href="javascript:crearchofer();"><i class="icon-save"></i>&nbsp;Grabar</a>
        <a class="btn" href="javascript:listarchofer();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
    </div>
</div>

<script type="text/javascript" src="../vistas/NF/js/NFMUNID.js"></script>

<script>

    jQuery(document).ready(function () {
        //contorl del menu btn izq
        $("#menuimg").hide();

        $(document).click(function (e) { if (e.button == 0) { $("#menuimg").css("display", "none"); } });
        $(document).keydown(function (e) { if (e.keyCode == 27) { $("#menuimg").css("display", "none"); } });

        // Se Inicializa el modulo de javascript para esta forma.
        NFMUNID.init();

        $('#uniform-chkactivo span').removeClass().addClass("checked");
        $('#chkactivo').attr('checked', true);
    });
</script>
