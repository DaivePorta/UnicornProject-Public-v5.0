<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLJUST.ascx.vb" Inherits="vistas_NS_NSLJUST" %>
<style>
  table.dataTable tr.DTTT_selected2.odd {
	background-color: #9FAFD1;
}

table.dataTable tr.DTTT_selected2.odd td.sorting_1 {
	background-color: #9FAFD1;
}

table.dataTable tr.DTTT_selected2.odd td.sorting_2 {
	background-color: #9FAFD1;
}

table.dataTable tr.DTTT_selected2.odd td.sorting_3 {
	background-color: #9FAFD1;
}


table.dataTable tr.DTTT_selected2.even {
	background-color: #B0BED9;
}

table.dataTable tr.DTTT_selected2.even td.sorting_1 {
	background-color: #B0BED9;
}

table.dataTable tr.DTTT_selected2.even td.sorting_2 {
	background-color: #B0BED9;
}

table.dataTable tr.DTTT_selected2.even td.sorting_3 {
	background-color: #B0BED9;
}

table.dataTable tbody tr.selected2 {
  background-color: #b0bed9;
}

</style>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE PERMISOS</h4>
                <div class="actions">
                 <a class="btn black" id="btn_imprime"><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=NSMJUST" class="btn green" id="btnNuevo"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NSLJUST" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>


            <div class="portlet-body">
                    <div class="row-fluid">
                   <%-- <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">Periodo</label>
                        </div>
                    </div>--%>

                 <%--   <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                               
                            </div>
                        </div>
                    </div>--%>
                       <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Periodo</label>
                            <div class="controls">
                                <input class="span4" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                <input class="span8" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <!--/span-->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">Establecimiento</label>
                            <div class="controls">
                                <select id="slcSucural" class="bloquear combo span12 requibisque" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                              <div class="span2">
                        <label class="control-label">Tipo Justificacion</label>
                       <div class="control-group">
                            <div class="controls">
                                <select id="cbo_tip_just" class="bloquear combo span9 requibisque"  data-placeholder="Seleccionar Tipo" tabindex="1">
                                    <option value="1">DIA</option>
                                    <option value="2">HORAS</option>
                                    <option value="S">TODOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <label class="control-label">Estado</label>
                       <div class="control-group">
                            <div class="controls">
                                <select id="cbo_estado" class="bloquear combo span12 requibisque"  data-placeholder="Seleccionar Estado" tabindex="1">
                                    <option value="C">COMPLETOS</option>
                                    <option value="I">INCOMPLETOS</option>
                                    <option value="S">TODOS</option>
                                </select>
                               <%-- <label class="radio">
                                    <div class="radio" id="uniform-rbcompletos">
                                        <span class="">
                                            <div class="radio" id="uniform-rb_completos"><span class="checked"><input id="rb_completos" type="radio" name="optionsRadios2" value="C" style="opacity: 0;" ></span></div></span>
                                    </div>
                                    Completos
                                </label>
                                <label class="radio">
                                    <div class="radio" id="uniform-rbincompletos">
                                        <span class="">
                                            <div class="radio" id="uniform-rb_incompletos"><span><input id="rb_incompletos" type="radio" name="optionsRadios2" value="I" style="opacity: 0;"></span></div></span>
                                    </div>
                                    Incompletos
                                </label>
                                 <label class="radio">
                                    <div class="radio" id="uniform-rbtodos">
                                        <span class="checked">
                                            <div class="radio" id="uniform-rb_rbtodos"><span><input id="rb_todos" type="radio" name="optionsRadios2" value="S" style="opacity: 0;" checked="checked"></span></div></span>
                                    </div>
                                    Todos
                                </label>--%>
                            </div>
                        </div>
                    </div>
                     
                          <div class="span2">
                        <label class="control-label">.</label>
                       <div class="control-group">
                            <div class="controls">
                                <a id="btn_listar" class="btn blue" ><i class="icon-search"></i>&nbsp;Flitrar</a>
                            </div>
                        </div>
                    </div>

                    <div class="span1" id="DivFecha">
                        <asp:HiddenField ID="hfComision" runat="server" Value="0" />

                        <input type="hidden" value="0" />
                    </div>
                </div>
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 10px;"></div>
                <div class="row-fluid">
                    <div class="span11"></div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_editar" type="button" class=" btn purple span12" style="margin-left:-10px;">Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12" id="Div_imprime">
                        <table id="tblJustigicacion" border="0" class="table DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th style="text-align:center;">CÓDIGO</th>
                                    <th style="text-align:center;">TIPO</th>
                                    <th style="text-align:center;">MOTIVO</th>
                                    <th style="text-align:center;">EMPLEADO</th>
                                    <th style="text-align:center;">D. INICIO</th>
                                    <th style="text-align:center;">D. FIN</th>
                                    <th style="text-align:center;">H. INI</th>
                                    <th style="text-align:center;">H. FIN</th>
                                    <th style="text-align:center;">AUTORIZA</th>
                                    <th style="text-align:center;"><input type="checkbox" id="check_todos"  style="height:25px!important;width:25px!important;"/></th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hffecha" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="Modal_edit" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="display:none;left:50%;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Editar Faltas y/o Permisos</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
              <div class="span6">
                        <div class="control-group">
                            <label class="control-label">Tipo Motivo</label>
                            <div class="controls" id="Div6">
                                <select id="cbo_tipo_motivo" class="bloquear span10" placeholder="Selecciona tipo">
                                   
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label">Tipo de Justificación</label>
                            <div class="controls">
                                <select id="cbo_tipo_justificacion" class="bloquear span10" placeholder="Selecciona tipo">
                                </select>
                            </div>
                        </div>
                    </div>
                    
        </div>
        <div class="row-fluid">
            <div class="span12">
                        <div class="control-group">
                            <label class="control-label">Motivo</label>
                            <div class="controls" id="Div7">
                                <textarea id="txt_motivo" class="bloquear span12" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_modificar"  class="btn black">
            Modificar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSLJUST.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLJUST.init();

    });
</script>
