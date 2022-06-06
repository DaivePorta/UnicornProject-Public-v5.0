<%@ Control Language="VB" AutoEventWireup="false" CodeFile="AFLACFI.ascx.vb" Inherits="vistas_AF_AFLACFI" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE ACTIVOS FIJOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=AFMACFI" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=AFLACFI" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span12">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEmpresa">EMPRESA:</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12 empresa" id="cboEmpresa"></select>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label span12" for="cboEmpresa">ESTABLECIMIENTO:</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboSucursal" class="span12"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 

                 <div class="row-fluid" id="bloqueTotales" style="margin-bottom: 10px;">
                    <div class="span12">
                        <div class="row-fluid">
                              <div class="span2 offset1">
                                <strong>VALOR ACTUAL TOTAL:</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="txtTotalValorActual">-</span>
                            </div>       
                               <div class="span2 offset1">
                                <strong>VALOR INICIAL TOTAL:</strong>
                            </div>
                            <div class="span3" style="font-size: 16px;">
                                <span id="txtTotalValorInicial">-</span>
                            </div>                          
                        </div>                       
                    </div>                  
                </div>


                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblLISTA" class="display DTTT_selectable">
                            <thead>
                                <tr>
                                    <th>CODIGO A.F.</th>
                                    <th>EMPRESA</th>
                                    <th>ESTABLECIMIENTO</th>
                                    <th style="text-align: left">BIEN</th>
                                    <th>SERIE</th>
                                    <th>FECHA INCIAL</th>
                                    <th>VALOR INICIAL</th>
                                    <th>VALOR ACTUAL</th>
                                    <th>ESTADO</th>
                                    <th>Cambiar Estado</th>
                                    <th>CODIGO</th>
                                    <th>CTLG_CODE</th>
                                    <th>SCSL_CODE</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hfLISTA" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/AF/js/AFMACFI.js"></script>
<script>
    jQuery(document).ready(function () {
        AFLACFI.init();
    });
</script>
