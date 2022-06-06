<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNLBAPL.ascx.vb" Inherits="vistas_NN_NNLBAPL" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>NOMBRE FORMULARIO</h4>
                <div class="actions">
                    <%--<a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp;Enviar Mail</a>--%>
                    <a class="btn black printlist"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NNMBAPL" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NNLBAPL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEstablecimiento">
                                    Banco</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboBanco" class="span12" data-placeholder="Banco">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


         


                  
                <div class="row-fluid">
                    <div class="row-fluid" style="margin-top: 10px;">
                        <div id="divPlaBanc"  style="overflow: auto">
                            <table id="tbl_PlaBanc" class="table display DTTT_selectable">
                                <thead>
                                    <tr>
                                        <th style="display: none;">CODE</th>
                                        <th style="text-align: center;">Codigo</th>
                                        <th style="text-align: center;">Descripción</th>
                                        <th style="text-align: center;">Empresa</th>
                                        <th style="text-align: center;">Banco</th>
                                        <th style="text-align: center;">Moneda</th>
                                        <th style="text-align: center;">Nro. Cuenta</th>
                                        <th style="text-align: center;">Tipo Planilla</th>
                                        <th style="text-align: center;">Dia Pago</th>
                                        <th style="text-align: center;">Estado</th>
                                        <th style="text-align: center;"> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


         
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NN/js/NNMBAPL.js"></script>
<script>
                jQuery(document).ready(function () {        
                    NNLBAPL.init();
                });
</script>
