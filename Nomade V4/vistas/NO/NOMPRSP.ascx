<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOMPRSP.ascx.vb" Inherits="vistas_NO_ajax_NOMPRSP" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PROGRAMACION DE SOLICITUDES DE PRODUCCION</h4>
                <div class="actions">
                    <a class="btn red" href="?f=NOLPRSP"><i class="icon-list"></i>Listar</a>
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <div id="div" class="portlet-body">
                <div id="Div2" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Div3" class="row-fluid">
                    <div class="span6">
                        <div id="Div4" class="row-fluid">
                            <div class="span2">
                                Fecha Inicio
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 fecha" id="txtFechaInicio" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                Fecha Fin
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="span12 fecha" id="txtFechaFin" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="span2">
                            Glosa
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 " id="txtGlosa" style="text-align: center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Div1" class="row-fluid">
                    <div class="span12">
                        <table id="detalle" class="display DTTT_selectable" border="0">
                            <thead style="background-color: rgb(35, 119, 155); color: white;">
                                <tr>
                                    <th></th>
                                    <th>CODIGO SOLICITUD</th>
                                    <th>REQUERIMIENTO</th>
                                    <th>CLIENTE</th>
                                    <th>TIPO REQUERIMIENTO</th>
                                    <th>PRIORIDAD</th>
                                    <th>GLOSA</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div id="Div5" class="row-fluid">
                    <div class="span12">
                        <div class="form-actions" id="acciones_generales" style="display: block;">
                            <a id="guardar" class="btn green"><i class="icon-time"></i>&nbsp;Programar</a>
                            <a id="cancelar" class="btn" href="?f=AFCIPFR"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hdproducto" />
<script type="text/javascript" src="../vistas/NO/js/NOMPRSP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOMPRSP.init();


    });

</script>
