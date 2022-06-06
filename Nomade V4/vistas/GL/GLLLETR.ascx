<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLLLETR.ascx.vb" Inherits="vistas_GL_GLLLETR" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LETRAS POR PAGAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=GLMLETR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=GLLLETR" class="btn red"><i class="icon-list"></i>Listar</a>
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
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <button type="button" id="btnFiltrar" class="btn blue"><i class="icon-filter"></i>&nbsp;FILTRAR</button>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>NUMERO LETRA
                                    </th>
                                    <th>EMPRESA</th>
                                    <th>FECHA GIRO
                                    </th>
                                    <th>FECHA VENCIMIENTO
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>GIRADOR
                                    </th>
                                    <th>GIRADOR A
                                    </th>
                                    <th>AVALISTA
                                    </th>
                                    <th>BANCO
                                    </th>
                                    <th>NUMERO UNICO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                     <th>CANJEADO / RENOVADO
                                    </th>
                                    <th>DESTINO</th>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/GL/js/GLMLETR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLLLETR.init("P");

    });
</script>
