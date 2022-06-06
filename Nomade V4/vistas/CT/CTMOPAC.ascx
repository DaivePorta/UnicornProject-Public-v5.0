<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMOPAC.ascx.vb" Inherits="vistas_CT_CTMOPAC" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ASOCIACION DE OPERACIONES CON ASIENTOS CONTABLES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CTMOPAC"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=CTLOPAC"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <!-- primera linea 
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                   
                </div>--->
                <!-- FIN PRIMERA LINEA -->
                <!-- INICIO  LINEA -->

                 <div class="row-fluid">
                    
                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoOperacion">
                                Tipo Operación</label>
                        </div>
                    </div>
                    
                     <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboTipoOperacion" class="m-wrap combo span12" data-placeholder="Tipo Operación">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboOperacion">
                                Seleccionar Operacion</label>
                        </div>
                    </div>
                    
                     <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboOperacion" class="m-wrap combo span12" data-placeholder="Seleccionar Operación">
                                    <option></option>
                                </select>
                                <%--<input id="txtOperacion" class="span12" placeholder="Nombre" type="text" />--%>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcsistema">
                               Tipo de Moneda</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboMoneda" class="span12" data-placeholder="Seleccione moneda">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="libro">
                                Libro Contable</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboLibrosCont" class="span12" data-placeholder="libro">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="asiento">
                                Asiento Contable</label>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls" id="txtascont">
                                <input id="txtAsienCont" class="span12" placeholder="Asiento contable" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span10" id="divDetalle">

                    </div>
                    <div class="span1"></div>
                </div>
                <%--<div class="row-fluid" id="dvDetalleAsit" style="display:none;">
                    <div class="span1">

                    </div>
                     <div class="span10">
                        <table id="tblAsientCont" class="table display table-bordered DTTT_selectable" role="grid">
                            <thead style="background-color: rgb(3, 121, 56); color: aliceblue;">
                                <tr>
                                    <th>CODIGO</th>
                                    <th>OPERACION</th>
                                    <th>LIBRO</th>
                                    <th>MONEDA</th>
                                    <th>ASIENTO</th>
                                    <th>CUENTAS</th>
                                    <th>ESTADO</th>
                                    <th>ACCION</th>
                                    <th style="display:none;">CODE OPERACION</th>
                                    <th style="display:none;">CODE ASIENTO CONT.</th>
                                </tr>
                            </thead>
                            <tbody style="cursor: pointer" id="tblDetAsienCont"></tbody>
                        </table>
                      
                    </div>
                </div>--%>
                 <input type="hidden" id="hfCODE_OP" />
                 <input type="hidden" id="hfCODE_ASCT"/>

                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp Grabar </a>
                    <a id="btnCancelar" class="btn" ><i class="icon-remove"></i>&nbsp Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>
 

<script type="text/javascript" src="../vistas/CT/js/CTMOPAC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMOPAC.init();
        
    });
</script>

