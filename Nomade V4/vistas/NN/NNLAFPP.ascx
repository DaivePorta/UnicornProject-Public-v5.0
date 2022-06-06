<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLAFPP.ascx.vb" Inherits="vistas_NN_NNLAFPP" %>


<div class="body row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA PLANILLAS  AFP</h4>
                <div class="actions">
                  
                 <%--   <a class="btn green" href="?f=NNMAFPP"><i class="icon-plus"></i>&nbsp;Nuevo</a>--%>
                    <a href="?f=NNLAFPP" class="btn red"><i class="icon-list"></i>Listar</a>
                    
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo  span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Estado</label>
                            <div class="controls" id="Div2">
                                <select id="cbo_estado" class="bloquear combo span12 " data-placeholder="Seleccionar Estado" tabindex="1">
                                    <option value="T">TODOS</option>
                                    <option value="1">GENERADO</option>
                                    <option value="2">PRESENTADO</option>
                                    <option value="3">PAGADO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Afp</label>
                            <div class="controls" id="Div3">
                                <select id="cbo_afp" class="bloquear combo span12 " data-placeholder="Seleccionar Afp" tabindex="1">
                                    <option></option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span8" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                    <div class="span3 ">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>

                </div>

                <br />
                <div class="row-fluid" style="text-align: center; font-weight: bold">
                    <div class="span6"></div>
                    <div class="span6">
                        <div class="span6">
                        </div>
                        <div class="span6">
                            <div class="span6">
                                <div class="span12 alert-success">
                                    TOTAL FONDO<br>
                                    <label id="lbl_total_fondo">-</label>

                                </div>
                            </div>
                            <div class="span6">
                                <div class="span12 alert-success">
                                    TOTAL RETENCION<br>
                                    <label id="lbl_total_retencion">-</label>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <br />
                <br />
                <div class="row-fluid">
                    <div class="span12" id="table">
                        <table id="tbl_afp" class="table   table-bordered DTTT_selectable table-hover">
                            <thead style="background-color: #23779B; color: white;">
                                <tr>

                                    <th>EMPRESA 
                                    </th>
                                    <th>PERIODO DEVENGUE
                                    </th>
                                    <th>AFP
                                    </th>
                                    <th>NRO PLANILLA
                                    </th>
                                    <th>NRO EMPLEADOS
                                    </th>
                                    <th>TOTAL FONDO(S/.)
                                    </th>
                                    <th>TOTAL RETENCIONES(S/.)
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>FEC. GENERACION
                                    </th>
                                    <th>FEC. PRESENTACION
                                    </th>
                                    <th>PRESENTADO POR
                                    </th>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>

            </div>



        </div>
    </div>
</div>






<script type="text/javascript" src="../vistas/NN/js/NNMAFPP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLAFPP.init();
    });

</script>
