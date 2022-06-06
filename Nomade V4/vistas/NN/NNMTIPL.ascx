<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMTIPL.ascx.vb" Inherits="vistas_NN_NNMTIPL" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO TIPO PLANILLA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nnmtipl"><i class="icon-list"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nnltipl"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigo" class="span12" type="text" disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked="checked" class="span12" /><span>Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span10">

                        <div class="span2">
                            <div class="control-group">
                                <label id="Label5" class="control-label" for="cboPago">
                                    Tipo Pago</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPago" class="span12" data-placeholder="Seleccione Tipo Pago">
                                        <option value="R">REMUNERACION</option>
                                        <option value="B">BENEFICIOS</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label id="Label1" class="control-label" for="cboPago">
                                    Periodicidad</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboPeriodo" class="span12" data-placeholder="Seleccione Periodicidad">
                                    </select>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtPresentacion">
                                    Descripción:</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcion" class="span12" type="text" autocomplete="off" maxlength="50" />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <span>Boleta </span><input id="chkBoleta" type="checkbox" checked="checked" class="span12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid" id="divMes" >

                <div class="row-fluid" style="margin-top:10px;">
                    <div class="span10">
                        <div class="span2">
                            <div class="control-group">
                                <label id="Label2" class="control-label" for="txt_Mes">
                                    Seleccione Mes:</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input class="span12" type="text" id="txt_Mes" data-date-format="MM" aria-disabled="true" name="txt_Mes" placeholder="MES">
                                </div>
                            </div>
                        </div>


                        <div class="span1">
                            <a id="btnAgregaMesDetalle" class="btn green" href="javascript:AgregarMes()"><i class="icon-plus"></i></a>
                        </div>

                    </div>
                </div>



                    <div class="row-fluid">
                        <div class="span10">
                            <div class="span6 offset2">
                                <div id="divMeses" style="overflow: auto">
                                    <table id="tblMeses" class="display DTTT_selectable" border="0">
                                        <thead style="background-color: rgb(39, 83, 142); color: white;">
                                            <tr>
                                                <th style="display: none">NUM_MES</th>
                                                <th>MES   </th>
                                                <th>ELIMINAR</th>

                                            </tr>
                                        </thead>

                                    </table>
                                    <asp:HiddenField ID="hfObjJson" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>





                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:grabaTipoPlanilla();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a class="btn" href="?f=nnltipl"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
                
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NN/js/NNMTIPL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMTIPL.init();
    });
 </script>