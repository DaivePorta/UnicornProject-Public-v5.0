<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBLCCUE.ascx.vb" Inherits="vistas_NB_NBLCCUE" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE CUENTAS BANCARIAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NBMCCUE" class="btn green"><i class="icon-plus"></i>Nuevo</a> 
                    <a href="?f=NBLCCUE" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"><b>EMPRESA:</b></div>
                        <div class="span3" id="controlEmp">
                            <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA"></select>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <table id="tOETC" class="display DTTT_selectable bordered dataTable no-footer" style='width: 90%;'>
                                <thead>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>CUENTA</th>
                                        <th>DESCRIPCION</th>
                                        <th>CTA INTERBANCARIA</th>
                                        <th>CTA CONTABLE</th>
                                        <th>FIRMA</th>
                                        <th>ESTADO</th>
                                        <th>Cambiar Estado</th>
                                        <th>EMPRESA</th>
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
<script type="text/javascript" src="../vistas/NB/js/NBMCCUE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBLCCUE.init();
    });
</script>
