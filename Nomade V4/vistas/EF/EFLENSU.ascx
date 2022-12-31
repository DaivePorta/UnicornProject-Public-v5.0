<%@ Control Language="VB" AutoEventWireup="false" CodeFile="EFLENSU.ascx.vb" Inherits="vistas_EF_EFLENSU" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<style>
    .btnTbl {
        margin: 2px;
    }

</style>

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTADO DE FACTURAS ELECTRONICAS EMITIDAS Y NO EMITIDAS</h4>
                <div class="actions">
                    <%--<a id="btnMail" class="btn purple"><i class="icon-envelope"></i>&nbsp Mail</a>--%>
                    <a class="btn green" onclick="javascript:NuevaPantalla();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn black" onclick="javascript:imprimirDiv('divDocumento');"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <%-- <a id="idTestConexion" class="btn green"><i class="icon-plus"></i>&nbsp;Test-Conexion Efact</a>--%>
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
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
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
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>    
                    
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboDocumento">
                                Documento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboDocumento" class="span12" data-placeholder="T. Documento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboCliente">
                                Cliente</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="divCboCliente">
                                <select id="cboCliente" class="span12" data-placeholder="Cliente">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    

                                
                </div>

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label id="Label1" class="control-label" for="txtDesde">Desde</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" maxlength="10">
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>                                            
                        <div class="span3">
                            <div class="control-group">
                                <label id="Label3" class="control-label" for="txtHasta" style="text-align: center;">Hasta</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" maxlength="10">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmision">
                                Estado</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboEmision" class="span12" data-placeholder="Emision">
                                    <option value="">TODOS</option>
                                    <option value="A">ACEPTADOS</option>
                                    <option value="P">PENDIENTE</option>
                                    <option value="S">ENVIADOS</option>
                                    <option value="N">NO ENVIADOS</option>
                                    <option value="X">ERROR</option>                                  
                                    <option value="B">DE BAJA</option>                          
                                    <option value="Q">PENDIENTE DE BAJA</option>
                                </select>
                            </div>
                        </div>
                    </div>        
                     <div class="span2" >
                        <div class="controls">
                            <a id="btnFiltrarFactElec" class="btn blue"><i class="icon-filter"></i>&nbsp;FILTRAR</a>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">         
                        <a id="btnEnviarTodos" class="btn green" style='width:160px'><i class="fa fa-paper-plane"></i>&nbsp;ENVIAR LOTE</a>
                    </div>
                    <div class="span2">         
                        <a id="btnVerificarTodos" class="btn blue" style='width:160px'><i class="fa fa-clock-o"></i>&nbsp;VERIFICAR</a>
                    </div>
                    <!--
                    <div class="span2">         
                        <a id="btnDescargarPdf" class="btn red" style='width:160px'><i class="fa fa-download"></i>&nbsp;DESCARGAR PDF</a>
                    </div>
                    <div class="span2">         
                        <a id="btnDescargarCdr" class="btn red" style='width:160px'><i class="fa fa-download"></i>&nbsp;DESCARGAR CDR</a>
                    </div>
                    <div class="span2">         
                        <a id="btnEnviarEmail" class="btn blue" style='width:160px'><i class="fa fa-envelope-o"></i>&nbsp;ENVIAR EMAIL</a>
                    </div>
                    -->
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblDocumento" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>TODO
                                        <div class="control-group">
                                            <label class="control-label" for="chkDescripcion">
                                                <input type="checkbox" class="chkSeleccionarTodo" />
                                            </label>
                                        </div>
                                    </th>
                                    <th>COD. DOCUMENTO</th>
                                    <th>DOC. CLIENTE</th>
                                    <th>CLIENTE</th>
                                    <th>SERIE-NRO</th>
                                    <th>FECHA EMISIÓN</th>
                                    <th>FORMA DE PAGO</th>
                                    <th>TOTAL</th>
                                    <th>ESTADO</th>
                                    <th></th>                                    
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

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>


<div id="divConfirmacion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 35%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn close_mail red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-question-sign" style="line-height: initial;"></i>&nbsp <span id="div_title"></span></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divDocElegido">
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" id="lblSerie"><strong>Serie:</strong></label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" id="lblDocumento"></label>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label"><strong>F. Emisión:</strong></label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" id="lblFecha"></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label"><strong>Cliente:</strong></label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" id="lblCliente"></label>
                            </div>
                        </div>
                    </div>
                </div>      
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label"><strong>Monto Total:</strong></label>
                        </div>
                    </div>
                    <div class="span10">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" id="lblMonto"></label>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>

            <div class="span11" id="divDocTodos">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="control-group">
                            <label class="control-label" style="text-align:center; color:red; font-size:16px;"><strong>MENSAJE DE CONFIRMACIÓN</strong></label>
                        </div>
                        <div class="control-group">
                            <label id="txtMensajeConfirmar" class="control-label" style="text-align:center; font-size:12px;"><strong>¿Estas Seguro de enviar todos los documentos?</strong></label>
                        </div>
                    </div>    
                    
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn green" type="button" id="btnEnviar"><i class="icon-ok"></i>&nbsp;Confirmar</button>
        <button class="btn green" type="button" id="btnEnviarBaja"><i class="icon-ok"></i>&nbsp;Confirmar</button>
        <button class="btn green" type="button" id="btnConfirmarEnviarTodos"><i class="icon-ok"></i>&nbsp;Confirmar</button>
        <button class="btn green" type="button" id="btnConfirmarVerificarTodos"><i class="icon-ok"></i>&nbsp;Confirmar</button>
        <button class="btn" type="button" id="btnCancelar"><i class="icon-remove"></i>&nbsp;Cancelar</button>
    </div>
</div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type='text/javascript' src='../vistas/EF/js/EFLENSU.js?<%=aleatorio%>'></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        EFLENSU.init();
    });
</script>