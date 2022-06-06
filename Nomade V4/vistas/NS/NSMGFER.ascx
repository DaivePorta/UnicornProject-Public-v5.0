<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMGFER.ascx.vb" Inherits="vistas_NS_NSMGFER" %>

<style>
    .container {
        overflow-y: scroll;
        max-height: 180px;
        border-color: #e5e5e5;
        border-style: solid;
        border-width: 1px;
    }

    p.item {
        padding-bottom: 8px;
        padding-top: 8px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 1px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(64, 128, 187, 0.17);
    }

        p.item:hover {
            box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);
            border-color: rgba(82,168,236,0.8);
        }

    p.selected {
        background: rgb(52, 150, 228);
        color: white;
    }
    #TablaListado {
    cursor:pointer;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Gestion de Feriados No Laborables</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nsmgfer"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nslgfer"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Codigo</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" disabled="disabled" type="text" placeholder="Codigo" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtActivo">
                                    Activo</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkActivo" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcion">
                                    Descripcion</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcion" class="span12" type="text" placeholder="Descripcion" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span6">

                        <div class="span5">
                            <div class="control-group">
                                <label class="control-label" for="txtRepetir">
                                    Repetir todos los años en adelante</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkRepetir" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDia">
                                    Dia</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input class="span12 date-picker" type="text" id="txtDia" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="controls">
                        <label class="radio">
                            <div class="radio" id="med1">
                                <span>
                                    <input type="radio" name="tipo" value="M" checked="checked" style="opacity: 0;" id="rbMediodia" />
                                </span>
                            </div>
                            Medio dia
                        </label>
                        <label class="radio">
                            <div class="radio" id="med2">
                                <span>
                                    <input type="radio" name="tipo" value="D" style="opacity: 0;" id="rbDiacompleto" />
                                </span>
                            </div>
                            Dia completo
                        </label>
                        <label class="radio">
                            <div class="radio" id="med3">
                                <span>
                                    <input type="radio" name="tipo" value="H" style="opacity: 0;" id="rbSuspensionHoras" />
                                </span>

                            </div>
                            Suspension Horas
                        </label>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txthorainicio">
                                    Hora Inicio</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txthorainicio" class="span12" type="text" placeholder="00:00" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span6">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txthorafin">
                                    Hora Fin</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txthorafin" class="span12" type="text" placeholder="00:00" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>

                <div class="row-fluid" id="detalle_feriado" style="display: none;">
                    <div class="span2">
                        </div>
                    <div class="span8">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboEmpresa">
                                        Empresa</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls" id="controlcboEmpresa">
                                        <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboEstablecimiento">
                                        Establecimiento</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls" id="controlcboEstablecimiento">
                                        <select id="cboEstablecimiento" class="span12" disabled="disabled" data-placeholder="ESTABLECIMIENTO">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <button id="estarowprop" class="btn blue" type="button"><i class="icon-plus"></i></button>
                            </div>

                        </div>
                    </div>
                    <br />
                    <br />
                    <%--Establecimiento--%>
                     <table id="TablaListado">
                    <thead>
                        <tr>
                            <th style="display: none;">Código</th>
                            <th>Empresa</th>
                            <th>Establecimiento</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
                </div>
                 <div id="Tabla_">
               
            </div>
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="?f=nsmgfer"><i class="icon-remove"></i>Cancelar</a>
                </div>

                 
            </div>
          
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSMGFER.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMGFER.init();

    });
</script>
