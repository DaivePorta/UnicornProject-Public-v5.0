<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLMCLC.ascx.vb" Inherits="vistas_CT_CTLMCLC" %>
<style type="text/css">
    .auto-style1
    {
        height: 24px;
    }
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=CTLMCLC" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">                
                <div class="row-fluid">
                    <div class="span12">
                        <%--EMPRESA--%>
                        <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="cboEmpresa">Empresa</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12 ComboBox empresa" data-placeholder="Seleccionar Empresa" id="cboEmpresa">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <%--ESTABLECIMIENTO--%>
                        <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="cboEstablecimiento">Establecimiento</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12 ComboBox establecimiento" data-placeholder="Seleccionar Establecimiento" id="cboEstablecimiento">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                                   
                        <%--MONEDA--%>
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboTipoMoneda">Moneda</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <select id="cboTipoMoneda" class="span12 ComboBox" data-placeholder="MONEDA">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>


                              <%--BOTÓN DE BÚSQUEDA --%>
                        <div class="span2">
                            <button type="button" id="btnBuscar" class="btn blue"><i class="icon-search"></i>&nbsp Buscar</button>
                        </div>

                    </div>
                </div>
                <div class="row-fluid" style="display:none;">
                    <div class="span12">
                        <%--TIPO ASIENTO --%>
                        <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="cboTipoAsiento">Tipo Asiento</label>
                            </div>
                        </div>
                        <div class="span2" >
                            <div class="control-group">
                                <div class="controls">
                                    <select class="span12 ComboBox" data-placeholder="Seleccionar TipoAsiento" id="cboTipoAsiento">
                                        <option value="">TODOS</option>
                                        <option value="A">AUTOMATICO</option>
                                        <option value="M">MANUAL</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    
                        <%--RANGO DE FECHAS --%>
                       
                            <div class="control-group span1">
                                <label id="Label1" class="control-label" for="txtDesde">
                                    Desde</label>
                            </div>
                            <div class="control-group span2">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                            <div class="control-group span1">
                                <label id="Label3" class="control-label" for="txtHasta">
                                    Hasta</label>
                            </div>
                            <div class="control-group span2">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        
                  
                    </div>
                </div>

                <%--TABLA DE RESULTADOS--%>
             <div class="row-fluid" style="margin-top: 10px;">
                    <table id="tblLista" class="display DTTT_selectable" border="0">
                        <tfoot>
                            <tr>
                                <th>CUO
                                </th>
                                <th>NroMov
                                </th>
                                <th>TODOS
                                </th>
                                <th>TODOS
                                </th>
                                <th>DESCRIPCION
                                </th>
                                <th>TODOS
                                </th>
                                <th>Fecha Emisión
                                </th>
                                <th>Fecha Transacción
                                </th>
                                <th>TODOS
                                </th>
                                <th>TODOS
                                </th>
                                <th>Tipo Cambio
                                </th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <thead>
                            <tr>
                                <th>CUO
                                </th>
                                <th>NroMov
                                </th>
                                <th>Año
                                </th>
                                <th>Mes
                                </th>
                                <th>Descripción
                                </th>
                                <th>Tipo Asiento
                                </th>
                                <th>Fecha Emisión
                                </th>
                                <th>Fecha Transacción
                                </th>
                                <th>Declarado
                                </th>
                                <th>Moneda
                                </th>
                                <th>Tipo Cambio
                                </th>
                                <th>Ver Detalle
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTLMCLC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLMCLC.init(); 
    });
</script>
