<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLOPAC.ascx.vb" Inherits="vistas_CT_CTLOPAC" %>



<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TIPO DE OPERACIONES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CTMOPAC" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CTLOPAC" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblOperAsntCont"class="table display table-bordered DTTT_selectable" role="grid">
                            <thead><!-- style="background-color: rgba(3, 121, 56, 0.7); color:#eeeeee;"-->
                                <tr>
                                    <th>CODIGO</th>
                                    <th>OPERACION</th>
                                    <th>ASIENTO CONTABLES</th>
                                    <th>LIBROS CONTABLES</th>
                                    <th>MONEDA</th>
                                    <th>ESTADO</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                        <asp:HiddenField ID="hfCajas" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/ct/js/CTMOPAC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLOPAC.init();
    });
</script>