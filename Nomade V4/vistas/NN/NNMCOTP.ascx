<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMCOTP.ascx.vb" Inherits="vistas_NN_NNMCOTP" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ESTRUCTURAR MI PLANILLA</h4>
                <div class="actions">
                    <a class="btn black printlist" style="margin-top: -10px"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>
            <%--  --%>
            <div class="portlet-body">
                <div class="row-fluid">


                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoPlanilla">Tipo de Planilla</label>
                            <div class="controls">
                                <select id="cboTipoPlanilla" class="span12" data-placeholder="Seleccione Planilla">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="span12" style="margin-top: 22px">
                            <div class="control-group span12">
                                <div class="controls">
                                    <a id="btnSelecc" class="btn green" href="javascript:SeleccionaTipla()" style=""><i class="icon-ok"></i>&nbsp;Seleccionar</a>&nbsp;&nbsp;
                                     <a id="btnCancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <hr />
                <div id="tablas" style="margin-top: 10px;">
                    <div class="row-fluid">
                        <div class="control">
                            <div class="controls">
                                <a class="btn purple" href="?f=nnmconp" target ="_blank"><i class="icon-reorder"></i>&nbsp;Conceptos Planilla</a>&nbsp;&nbsp;
                                    <a class="btn red" href="?f=nnmaftr" target ="_blank" ><i class="icon-table"></i>&nbsp;Afectacion Trib.</a>&nbsp;&nbsp;
                                    <a id="btnAddConcep" class="btn blue"><i class="icon-plus"></i>&nbsp;Agregar Concepto Adicional</a>&nbsp;&nbsp;
                                <a id="btnActualizar" class="btn green"><i class="icon-refresh"></i>&nbsp;Actualizar</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="row-fluid">
                        <label style="text-align:center;font-size:x-large;color:#034667;"><b><u><i class="icon-table"></i>&nbsp;ESTRUCTURA DE MI PLANILLA</u></b></label>
                        <div id="divPlanillas" style="overflow: scroll; margin-bottom: 20px; resize: vertical; height: 240px">
                        </div>

                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span4"></div>
                            <div class="span8">
                                <i class="icon-stop" style="font-size: large; color: #fdafaf;"></i>&nbsp;&nbsp;
                                  <span style="font-size: larger;">CONCEPTO  PLANILLA  <b>FIJO  AFECTO  ESSALUD</b></span><br />
                                <i class="icon-stop" style="font-size: large; color: #afdafd;"></i>&nbsp;&nbsp;
                                  <span style="font-size: larger;">CONCEPTO  PLANILLA  <b>FIJO  NO AFECTO  ESSALUD</b></span>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="span4"></div>
                            <div class="span8">
                                <i class="icon-stop" style="font-size: large; color: #fde1af;"></i>&nbsp;&nbsp;
                                  <span style="font-size: larger;">CONCEPTO  PLANILLA  <b>ADICIONAL  AFECTO  ESSALUD</b></span><br />
                                <i class="icon-stop" style="font-size: large; color: #52ca70;"></i>&nbsp;&nbsp;
                                  <span style="font-size: larger;">CONCEPTO  PLANILLA  <b>ADICIONAL  NO AFECTO  ESSALUD</b></span>
                            </div>
                        </div>
                    </div>
                     <div class="row-fluid">
                        <div class="span12">
                            <div class="span4"></div>
                            <div class="span8">
                                <i class="icon-stop" style="font-size: large; color: #fdafed;"></i>&nbsp;&nbsp;
                                  <span style="font-size: larger;">CONCEPTO  PLANILLA  <b>DESCUENTOS</b></span><br />
                              
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>




    <div id="modal_add" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 35%; width: 70%; max-width: 80% !important; display: none;">
        <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
            <button type="button" id="btnClose" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
            <h4 id="modalTitulo">AGREGAR CONCEPTO ADICIONAL A MI PLANILLA</h4>
        </div>
        <div class="modal-body" id="ventanaInfo" style="overflow-x:hidden;overflow-y :hidden;">
            <div class="row-fluid">

                <div class="span12" style="display: block; margin-bottom: 20px;" id="div_grupo_concepto">


                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Grupo Conceptos Adicionales:</label>
                            <div class="controls" id="Div3">
                                <select id="cboGrupoConcepto" class="span12" data-placeholder="Seleccione Grupo">
                                    <option value="AF">AFECTOS</option>
                                    <option value="NA">NO AFECTOS</option>
                                    <option value="DE">DESCUENTOS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="span6">
                        <div class="row-fluid">
                            <div id="divConceptosAsig" style="overflow: auto">

                                <table id="tbl_Conceptos" class="table table-bordered table-condensed">
                                    <thead style="background-color: #eee">
                                        <tr>
                                            <th class="todosC">#</th>
                                            <th style="display: none;">CODE</th>
                                            <th style="text-align: center;">Cod.</th>
                                            <th style="text-align: center;">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>



                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div id="divConceptPla" style="overflow: auto;">

                                <table id="tbl_ConceptPla" class="table table-bordered table-condensed">
                                    <thead style="background-color: #eee">
                                        <tr>
                                            <th class="todosCxT">#</th>
                                            <th style="display: none;">CODE</th>
                                            <th style="text-align: center;">Nro</th>
                                            <th style="text-align: center;">Cod.</th>
                                            <th style="text-align: center;">Descripción</th>
                                           <%-- <th style="text-align: center;">Estado</th>--%>

                                            <th style="text-align: center;"></th>
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

           


        </div>

    </div>














    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCTLG_CODE" />

    </div>


</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMCOTP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMCOTP.init();

    });
</script>
