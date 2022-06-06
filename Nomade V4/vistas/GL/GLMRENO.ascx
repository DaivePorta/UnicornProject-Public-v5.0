<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLMRENO.ascx.vb" Inherits="vistas_GL_GLMRENO" %>

<style>
    .balanceado {
    color:green;
    font-weight:600;

    }
     .noBalanceado {
    color:red;
    font-weight:600;

    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>RENOVACION DE LETRAS POR COBRAR</h4>
                <div class="actions">

                    <a class="btn green" href="?f=glmreno"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=gllreno"><i class="icon-list"></i>Listar</a>

                </div>

            </div>
            <div class="portlet-body" id="div_letra">

                <div class="row-fluid">
                    <div class="span1">
                        <label for="slcEmpresa">Empresa:</label>
                    </div>
                    <div class="span3">
                         <div class="control-group">
                            <div class="controls">
                                 <select id="slcEmpresa" class="span12 obligatorio">
                                     <option></option>
                                 </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>

                <div class="row-fluid">

                    <div class="span2">
                        <label for="txtnumdoc">Número de letra:</label>

                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnumdoc" type="text" disabled="disabled" class="span12 obligatorio" />
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btnBuscaDoc" type="button" class="span8 btn blue"><i class="icon-search"></i></button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span4">

                        <label id="lblref" class="span4 bold">Cliente:</label>

                        <label id="lblref_cont" class="span8 cont"></label>

                    </div>

                    <div class="span4">

                        <label id="lbldoc" class="span4 bold">RUC:</label>

                        <label id="lbldoc_cont" class="span8 cont"></label>

                    </div>

                    <div class="span4">

                        <label id="lblmonto" class="span4 bold">Monto:</label>

                        <label id="lblmonto_cont" class="span8 cont"></label>

                    </div>

                </div>

                <div id="divSimuLetras" style="display: none; padding-top: 30px; border-top: solid #e5e5e5 2px;">

                    <div class="row-fluid">
                        <div class="span1">
                            <label for="txtnumdoc">Fecha Giro</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaGiro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <label for="txtnumdoc">Fecha Registro</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span10" id="txtFechaRegistro" style="text-align: center" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <label for="txtnumdoc">Lugar Giro</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12" id="txtLugarGiro" />
                                </div>
                            </div>
                        </div>                       
                    </div>

                    <div class="row-fluid" id="divPrmtsSimulacion">
                         <div class="span1">
                            <label for="txtnumdoc">Letras Fijas</label>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="checkbox" id="chkLetrasFijas" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <label for="txtnumdoc">Numero de Letras</label>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 number" maxlength= "3" onkeypress=" return ValidaNumeros(event,this)"  id="txtNroLetras" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <label for="txtnumdoc">Periodo de Letras</label>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="number" id="txtPeriodoLetras" class="span5" disabled="disabled" />
                                    <label style="display: inline-block;">&nbsp;&nbsp;días</label>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <button type="button" id="btnSimular" class="btn blue"><i class="icon-eye-open"></i>&nbsp;Simular</button>
                        </div>
                        <div class="span2 offset2">
                            <span id="txtBalanceadoStatus" class="noBalanceado">NO BALANCEADO
                            </span>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblDetalle" border="1" class="display DTTT_selectable" style="display: none;">
                                <thead>
                                    <tr>
                                        <th>NRO LETRA
                                        </th>
                                        <th>NRO DIAS
                                        </th>
                                        <th>FECHA
                                        </th>
                                        <th>MONTO (<span id="spnMoneda">S/.</span>)
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div class="form-actions">
                        <a id="grabarA" class="btn blue"><i class="icon-save"></i>&nbsp;Guardar</a>
                    </div>

                </div>

            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/GL/js/GLMRENO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLMRENO.init("C");

    });
</script>
