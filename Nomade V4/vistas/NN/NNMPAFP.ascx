<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMPAFP.ascx.vb" Inherits="vistas_NN_NNMPAFP" %>
<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 80000;
        background-color: rgb(0, 0, 0);
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GENERACION PLANILLA AFP</h4>
                <div class="actions">
                    <a class="btn green"  href="?f=NNMPAFP" ><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLPAFP" class="btn red"><i class="icon-list"></i>Listar</a>
                    <%--<a class="btn black" href="javascript:imprimirDiv3(['divBoletas']);" style="margin-top:-10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>--%>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid" id="msg">

                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>


                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Planilla</label>
                            <div class="controls" id="Div2">
                                <select id="cbo_planilla" name="cbo_planilla" class="bloquear span12 " data-placeholder="Seleccionar Planilla" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Generado Por</label>
                            <div class="controls" id="Div3">
                                <input id="txt_usua_id" class="b span10  limpiar" disabled="disabled" type="text">
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Fecha</label>
                            <div class="controls" id="Div4">
                                <input type="text" disabled="disabled" id="txt_fec_generacion" class="span12 date-picker" placeholder="dd/mm/yyyy" id=">" data-date-format="dd/mm/yyyy" style="text-align: left">
                                   
                            </div>
                        </div>
                    </div>



                </div>


                <div class="row-fluid" style="display:none;" id="div_btn_generar">
                    <div class="span5"></div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_generar"  type="button" class=" btn black span5"><i class="icon-cogs"></i>&nbsp;&nbsp;Generar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid borrar">
                    <br />
                </div>
                
                  <div class="row-fluid" id="div_btn_detalle" style="display:none ;">
                    <div class="span5"></div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_ver_detalle"  type="button" class=" btn black span8"><i class="icon-arrow-down"></i>&nbsp;&nbsp;Ver Detalle</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                 <div class="row-fluid borrar">
                    <br />
                    <br />
                </div>
                <h3 style="display:none;text-align: center;" id="titulo" >Planilla Noviembre 2015 - Orbitum</h3>
                <div class="row-fluid" style="display:none" id="div_table">
                   <div class="span2"></div>
                     <div class="span8">
                                 <table class="table table-bordered table-striped">
									<thead style="background-color: #23779B;color: white;">
										<tr>
											<th>Descripcion afp</th>
											<th>Numero Empleados</th>
											<th>Total Fondo</th>
                                            <th>Total Retencion</th>
										</tr>
									</thead>
									<tbody id="body_table">
										

									</tbody>
								</table>
                     </div>
                      <div class="span2"></div>
                    </div>
            
                </div>

                <div id="modal_progress"  data-keyboard="false" data-backdrop="static" class="modal hide fade" tabindex="-2" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true" style="display: none;left:50%;top:40%;height:109px">
                    <div class="modal-header">
										
										<h3 id="myModalLabel1">GENERANDO...</h3>
									</div>
                    <div class="modal-body">
                        <div class="progress">
									<div id="barra_progreso" style="width: 0%;" class="bar"></div>
								</div>
                    </div>

                </div>

            </div>
        </div>
    </div>





<script type="text/javascript" src="../vistas/NN/js/NNMPAFP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMPAFP.init();
    });

</script>
