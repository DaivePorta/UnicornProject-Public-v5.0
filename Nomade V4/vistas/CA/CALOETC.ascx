<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALOETC.ascx.vb" Inherits="vistas_CA_CALOETC" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE OPERACIONES ESPECIALES DE TIPO DE CAMBIO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMOETC" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CALOETC" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid" id="divTblNotasCredito">
                            <table id="tOETC" class="display DTTT_selectable bordered dataTable no-footer" style='width: 100%;'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>EMPRESA</th>
                                        <th>SUCURSAL</th>
                                        <th>CAJA</th>
                                        <th>CASA DE CAMBIO</th>
                                        <th>MODO DE CAMBIO</th>
                                        <th>MONEDA BASE</th>
                                        <th>MONTO</th>
                                        <th>MONEDA CAMBIO</th>
                                        <th>MONTO</th>
                                        <th>VALOR DE CAMBIO</th>
                                        <th>FECHA OPERACIÓN</th>
                                        <th>FECHA SISTEMA</th>
                                    </tr>
                                </thead>
                            </table>
                            <asp:HiddenField ID="hfOETC" runat="server" />
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMOETC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALOETC.init();
    });
</script>
