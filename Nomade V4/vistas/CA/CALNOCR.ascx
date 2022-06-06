<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALNOCR.ascx.vb" Inherits="vistas_CA_CALNOCR" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA NOTAS DE CREDITO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=camnocr" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=calnocr" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
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
                    <div class="span1">
                        </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span10">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid" id="divTblNotasCredito">
                            <table id="tblNotasCredito" class="display DTTT_selectable bordered dataTable no-footer" style='width: 100%;'>
                                <thead>
                                    <tr>
                                        <th>CÓDIGO</th>
                                        <th>ESTABLECIMIENTO</th>
                                        <th>DOCUMENTO<br />
                                            ORIGEN</th>
                                        <th>IMPORTE<br />
                                            ORIGEN</th>
                                        <th>IMPORTE<br />
                                            NOTA CRÉDITO</th>
                                        <th>PERSONA</th>
                                        <th>EMISIÓN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="7" style="text-align: center;">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CALNOCR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALNOCR.init();

    });
</script>
