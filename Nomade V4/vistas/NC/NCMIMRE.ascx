<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMIMRE.ascx.vb" Inherits="vistas_NC_NCMIMRE" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }

    fieldset.scheduler-border {
        border: 1px groove #ddd !important;
        padding: 0 1.4em 1.4em 1.4em !important;
        margin: 0 0 1.5em 0 !important;
        -webkit-box-shadow: 0px 0px 0px 0px #000;
        box-shadow: 0px 0px 0px 0px #000;
    }

    legend.scheduler-border {
        font-size: 18px;
        width: inherit;
        padding: 0 10px;
        border-bottom: none;
    }

    .input1 {
        min-width: 25px;
        max-width: 40px;
    }

    .inputNombre {
        resize: vertical;
        max-width: 150px;
        overflow: hidden;
        height: auto;
    }

    @media print {

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
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

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            font-family: 'Lucida Console' !important;
        }

        .container-fluid {
            padding: 0px !important;
        }
    }
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO IMPUESTO A LA RENTA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmimre"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclimre"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span6 ">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtFechaTransaccion">
                                        Fecha Transacción</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaTransaccion" data-date-format="dd/mm/yyyy" disabled="disabled" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtImpuestoRenta">
                                        IR Anual Año Anterior(A)</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtImpuestoRenta" onkeypress="return ValidaDecimales(event,this,4)" class="numeros span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtIngreso">
                                        Ingresos Totales Año Anterior(B)</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtIngreso" onkeypress="return ValidaDecimales(event,this,4)" class="numeros span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtDiferencia">
                                        Ingresos Diferencia Cambio(C)</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtDiferencia" onkeypress="return ValidaDecimales(event,this,4)" class="numeros span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtCoeficiente">
                                        Coeficiente(D)</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCoeficiente" onkeypress="return ValidaDecimales(event,this,4)" class="numeros span12" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtFechaAplicacion">
                                        Fecha Aplicación</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFechaAplicacion" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span5">
                                <div class="control-group">
                                    <label class="control-label pull-right" for="txtFactor">
                                        Factor(F)</label>
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtFactor" class="numeros span12" type="text" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid"><div class="span12"></div></div>
                        <div class="row-fluid"><div class="span12"></div></div>

                        <div class="row-fluid">
                            <div class="span10 offset1">
                                <p style="text-align: center; font-size: 1.5em; font-style: italic;color:#CBCBCB;">F = ( A / ( B - C ) ) * D </p>
                            </div>
                        </div>
                            <div class="row-fluid">
                            <div class="span10 offset1">
                                <p style="text-align: center; font-size: 1em; font-style: italic;color:#808080;"><span id="F">F</span> = ( <span id="A">A</span> / ( <span id="B">B</span> - <span id="C">C</span> ) ) * <span id="D">D</span> </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="form-actions" id="acciones_generales" style="display: block;">
                        <div class="span6" id="divBtnsMantenimiento">
                            <a id="grabar" class="btn blue" href="javascript:GrabarImpuestoRenta();"><i class="icon-save"></i>&nbsp;Grabar</a>
                            <a class="btn" href="?f=ncmimre"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </div>
</div>

<input type="hidden" id="hfCodeImpuestoRenta" />
<div id="divDctoImprimir" style="display: none;">
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMIMRE.js"></script>

<script>
    jQuery(document).ready(function () {
        NCMIMRE.init();
    });
</script>
