<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLPESR.ascx.vb" Inherits="vistas_NN_NNLPESR" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA PERIODOS SIN REMUNERACION</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NNMPESR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NNLPESR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span4">

                        <fieldset>
                            <legend>BUSQUEDA
                            </legend>


                        </fieldset>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="HiddenField1" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_motivo">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_motivo" name="cbo_motivo" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Motivo" tabindex="1">
                                </select>

                            </div>
                        </div>
                    </div>
                   <div class="span2">
                        <div class="control-group">
                            <div class="controls">


                                <button id="btn_filtrar" type="button" style="border-radius: 4px!important; height: 34px;" class="b btn purple span12">Filtrar&nbsp;<i class="icon-search"></i></button>

                            </div>
                        </div>
                    </div>
                </div>
                <br />
       <%--         <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fecha_ini">
                                Desde</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="bloquear span9  required" data-date-format="dd/mm/yyyy" name="txt_fecha_ini" id="txt_fecha_ini">
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txt_fecha_fin">
                                Hasta</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" class="bloquear span9  required" data-date-format="dd/mm/yyyy" name="txt_fecha_fin" id="txt_fecha_fin">
                            </div>
                        </div>
                    </div>
                     
                </div>--%>
                <div class="row-fluid">

                    <div class="span4">

                        <fieldset>
                            <legend>LISTADO
                            </legend>


                        </fieldset>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12" id="table">
                        <table id="tbl_periodo_sin_remuneracion" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO 
                                    </th>
                                    <th>EMPLEADO
                                    </th>
                                    <th>MOTIVO
                                    </th>
                                    <th>FEC. INI
                                    </th>
                                    <th>FEC. FIN 
                                    </th>
                                    <th>ESTADO
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


<script type="text/javascript" src="../vistas/NN/js/NNMPESR.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNLPESR.init();

    });
</script>
