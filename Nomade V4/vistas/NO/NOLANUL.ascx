<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLANUL.ascx.vb" Inherits="vistas_NO_NOLANUL" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA  ANULAR DOCUMENTOS COMPRA</h4>
                <div class="actions">

                    <a href="?f=NOLANUL" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_Empresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="divCboEmpresa">
                                    <select id="cbo_Emp" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cbo_establecimiento">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="divCboEstablecimiento">
                                    <select id="cbo_establecimiento" class="span12" data-placeholder="Establecimiento">
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoDcto">Tipo de Dcto.</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="divCboTipoDcto">
                                    <select id="cboTipoDcto" class="span12" data-placeholder="Tipo Dcto.">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtSerie">Serie</label>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtSerie" class="span12" maxlength="10">
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtNumero">Número</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input type="text" id="txtNumero" class="span12" maxlength="25">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProducto">Producto:</label>
                        </div>
                    </div>

                    <div class="span4" id="divCboProducto">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboProducto" class="span12" data-placeholder="Producto">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                      <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboProveedor">Proveedor</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divCboCliente">
                                <select id="cboProveedor" class="span12" data-placeholder="Proveedor">
                                    <option value="0">TODOS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboAnulado">Estado</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEstado" data-placeholder="Estado" class="span7">
                                    <option value="TODOS">TODOS</option>
                                     <option value="N">VIGENTES</option>
                                    <option value="S">ANULADOS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaEmisionI" style="text-align:left;">Desde</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaEmisionI" placeholder="dd/mm/yyyy" class="span12" />
                                </div>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="txtFechaEmisionF" style="text-align:center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtFechaEmisionF" placeholder="dd/mm/yyyy" class="span12" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group span2">
                            <div class="controls">
                                <a id="btnBuscarDoc" class="btn blue">BUSCAR</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row-fluid">
                    <div class="span12">
                        
                    </div>
                </div>
                <div class="row-fluid">
                </div>
                <div class="row-fluid">
                    <div class="span12" id="div_tabla_dctos_pagar">
                        <table id="tabla_general" class="table table-hover">
                            <thead>
                                <tr>
                                   
                                    <th style="text-align: center">CODIGO</th>
                                    <th style="text-align: center">TIPO DCTO</th>
                                    <th style="text-align: center">NRO DCTO</th>
                                    <th style="text-align: center">EMISION</th>
                                    <th>PROVEEDOR</th>
                                    <th style="text-align: center">MONEDA</th>
                                    <th style="text-align: right">BASE IMP</th>
                                     <th style="text-align: center">COMPLETO</th>
                                     <th style="text-align: center">PROVISIONADO</th>
                                     <th style="text-align: center">ANULADO</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer"></tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NO/js/NOMANUL.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLANUL.init();

    });
</script>
