<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALREPR.ascx.vb" Inherits="vistas_CA_CALREPR" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE RENDICIONES EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMRENC" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CALREPR" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
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
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEstado">
                                Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="Div2">
                                <select id="slcEstado" name="slcEstado" class="combo m-wrap span12 required" data-placeholder="Seleccionar Estado" tabindex="1">
                                    <option value="">TODOS</option>
                                    <option value="S">COMPLETADOS</option>
                                    <option value="N">EN PROCESO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <a id="btn_filtrar" class="btn purple" >Buscar</a>
                    </div>
                    
                
                </div>
                <!-- FIN PRIMERA LINEA -->

                           <br />
                <div class="row-fluid">
                    <div class="span12">

                        <table id="tbl_bandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>FECHA LIMITE
                                    </th>
                                    <th>EMPLEADO
                                    </th>
                                    <th>GLOSA
                                    </th>
                                    <th>MONEDA
                                    </th>
                                    <th>MONTO ASIGNADO
                                    </th>
                                    <th>MONTO RENDIDO
                                    </th>
                                    <th>PROGRESO
                                    </th>
                                    <th>USUARIO
                                    </th>
                                    <th>COMPLETO
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

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMASCR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALREPR.init();

    });
</script>
