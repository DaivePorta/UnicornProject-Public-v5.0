<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLPRMT.ascx.vb" Inherits="vistas_NC_NCLPRMT" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PARAMETROS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmprmt" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclprmt" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid"> 
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="cboSistema">SISTEMA</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="controls">
                            <select id="cboSistema" class="span12" data-placeholder="Sistema">
                                <option>TODOS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblParametros" class="display DTTT_selectable" border="0" style="display:none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>
                                    <th>DESCRIPCION 
                                    </th>
                                    <th>CODIGO SISTEMA
                                    </th>
                                    <th>SISTEMA
                                    </th>
                                    <th>VALOR
                                    </th>
                                    <th>FECHA CREACIÓN
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjParametros" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCPRMT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLPRMT.init();
        
    });
</script>
