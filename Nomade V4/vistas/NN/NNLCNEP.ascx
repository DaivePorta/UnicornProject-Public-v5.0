<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLCNEP.ascx.vb" Inherits="vistas_NN_NNLCNEP" %>
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
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ASIGANCION CONCEPTO EMPLEADO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nnmcnep" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nnlcnep" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <%--      <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hfempresa" runat="server" />
                                    <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcSucural" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_concepto">
                                    Concepto</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls" id="Div2">
                                    <select id="cbo_concepto" class="combo m-wrap span12 required" name="cbo_concepto" data-placeholder="Concepto" tabindex="1">
                                      
                                    </select>
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                </div>--%>
                <br />
                <div class="row-fluid">
                    <div class="span4">

                        <fieldset>
                            <legend>BUSQUEDA
                            </legend>


                        </fieldset>

                    </div>
                </div>
                <div class="span2"></div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label">
                                    <div class="radio" id="Div3">
                                        <span class="">
                                            <input type="radio" class="m-wrap span12" name="tipo" id="rb_avanzada" style="opacity: 0;"></span>
                                    </div>
                                    Avanzada
                                </label>

                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label">
                                    <div class="radio" id="uniform-rbtipo_fijo">
                                        <span class="">
                                            <input type="radio" class="m-wrap span12" name="tipo" id="rb_todos" style="opacity: 0;" checked="checked"></span>
                                    </div>
                                    Todos
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" id="busq_avanz" style="display: none;">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkemp">
                                        <div class="checker" id="uniform-chkemp">
                                            <span class="checked">
                                                <input type="checkbox" id="chkemp" name="chkemp" checked="" style="opacity: 0;"></span>
                                        </div>
                                        Empresa</label>
                                </div>
                            </div>
                            <div class="span4" id="empresa" style="display: none;">
                                <div class="control-group">
                                    <div class="controls" id="controlempresa">
                                        <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                            <option></option>
                                        </select>
                                        <asp:HiddenField ID="hfempresa" runat="server" />
                                        <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkscsl">
                                        <div class="checker" id="uniform-chkscsl">
                                            <span class="checked">
                                                <input type="checkbox" id="chkscsl" name="chkscsl" checked="" style="opacity: 0;"></span>
                                        </div>
                                        Establecimiento</label>
                                </div>
                            </div>
                            <div class="span3" id="sucursal" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="slcSucural" name="slcSucural" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                            <option></option>
                                        </select>
                                        <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chktipla">
                                        <div class="checker" id="uniform-chktipla">
                                            <span class="checked">
                                                <input type="checkbox" id="chktipla" name="chktipla" checked="" style="opacity: 0;"></span>
                                        </div>
                                        Tipo Planilla</label>
                                </div>
                            </div>
                            <div class="span3" id="tipo_pla" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cbo_tipla" name="cbo_tipla" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Planilla" tabindex="1">
                                            <option></option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chkConcepto">
                                        <div class="checker" id="uniform-chkConcepto">
                                            <span class="checked">
                                                <input type="checkbox" id="chkConcepto" name="chkConcepto" checked="" style="opacity: 0;"></span>
                                        </div>
                                        Concepto</label>
                                </div>
                            </div>
                            <div class="span3" id="concepto" style="display: none;">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cbo_concepto" class="combo m-wrap span12 required" name="cbo_concepto" data-placeholder="Concepto" tabindex="1">
                                      
                                    </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span5"></div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">


                                <button id="btn_filtrar" type="button" style="border-radius: 4px!important; height: 34px;" class="b btn purple span12">Filtrar&nbsp;<i class="icon-search"></i></button>

                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <br />
                <div class="row-fluid">
                    <div class="span11"></div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_eliminar" type="button" class=" btn red span12" style="margin-left:-10px;">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">

                        <table id="tbl_asig_conp_empl" class="table DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>EMPLEADO
                                    </th>
                                    <th>CONCEPTO
                                    </th>
                                    <th>TIPO PLANILLA
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                     <th>#
                                    </th>
                                </tr>
                            </thead>

                        </table>
                        <asp:HiddenField ID="hfObjJson" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="Confirm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 50% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Eliminar Asigancion Conceptos</h3>
    </div>
    <div class="modal-body">
        <p>
            ¿Esta realmente seguro de eliminar la asignacion de los conceptos seleccionados?
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_aceptar" data-dismiss="modal" class="btn black">
            Aceptar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMCNEP.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLCNEP.init();

    });
</script>
