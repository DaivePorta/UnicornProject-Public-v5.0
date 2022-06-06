<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAMCPOS.ascx.vb" Inherits="vistas_CA_CAMCPOS" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CIERRE DE LOTE POS</h4>
                <div class="actions">
                  
                    <a href="?f=camcpos" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=calcpos" class="btn red"><i class="icon-list"></i>Listar</a>

                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="slcEmpr">Empresa</label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <select class="empresa obligatorio span9" id="slcEmpr" data-placeholder="EMPRESA"></select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group ">
                                <label class="control-label" for="slcEstb">Establecimiento</label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <select class="obligatorio span9" data-placeholder="ESTABLECIMIENTO" id="slcEstb"></select>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="row-fluid">


                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNroLote">
                                    Nro Lote</label>

                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtNroLote" class="span12 obligatorio" placeholder="" type="text" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtFecha">
                                    Fecha
                                </label>

                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtFecha" class="span10 obligatorio" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" type="text" />
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtMontoCierre">
                                    Monto Cierre</label>

                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtMontoCierre" disabled="disabled" monto="" class="span10 obligatorio" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcPOS">
                                    POS
                                </label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slcPOS" class="span11 obligatorio" data-placeholder="POS">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcMoneda">
                                    Moneda
                                </label>

                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slcMoneda" data-placeholder="MONEDA" class="span10 obligatorio" type="text">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="span1">
                            
                            <button type="button" id="btnFiltrar" class="btn blue">Filtrar</button>
                            
                        </div>

                    </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;margin-top: 10px;"></div>

                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0">
                                <thead>
                                    <tr align="center">
                                        <th><input type="checkbox" class="chkTdo" title="Marcar Todos"/></th>
                                        <th>FECHA</th>
                                        <th>DOC. VTA.</th>
                                        <th style="width:28%">RESPONSABLE DE PAGO</th>
                                        <th>BCO.</th>
                                        <th>MARCA</th>
                                        <th>ULT. DIG</th>
                                        <th>COD. AUT.</th>
                                        <th>MONTO</th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                    </div>

                </div>
                  <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:cerrarLote();"><i class="icon-download-alt"></i> Cerrar Lote</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CA/js/CAMCPOS.js"></script>
<script>
    jQuery(document).ready(function () {
        CAMCPOS.init();
    });
</script>
