<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMMOCB.ascx.vb" Inherits="vistas_NB_NBMMOCB" %>
<style type="text/css">
    #divBuscarTicket{
        margin-left: 0px !important;
    }
    @media (max-width:900px) {
        #divBuscarTicket{
            left: 5% !important;
            width: 90% !important;
        }
    }
</style>

<div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajeModal">
        <p id="P1">
         
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano" data-dismiss="modal" class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>NUEVO MOVIMIENTO BANCARIO</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmmocb" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a id="listMov" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcEmpr">Empresa</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select class="empresa obligatorio span12 bl" id="slcEmpr"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcCta">Cuenta</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">

                                <select class="span12 obligatorio bl" data-placeholder="CUENTA BANCARIA" id="slcCta">
                                    <option></option>
                                </select>

                            </div>

                        </div>
                    </div>

                     <div class="span2 RCaja">
                        <div class="control-group ">
                            <div class="controls">
                               <input type="checkbox" id="chkRCaja" />&nbsp;Asignar a Caja
                            </div>
                        </div>
                    </div>
                   
                </div>
                <!-- FIN PRIMERA LINEA -->

                <div class="row-fluid RCaja" id ="divRCaja" style="display:none;">

                     <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcEmpr">Caja</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select class=" span12" id="slcCaja" data-placeholder="CAJA"><option></option></select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcResp">Responsable</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input class="span12 personasEmpleado" id="slcResp" placeholder="RESPONSABLE"/>

                            </div>
                        </div>
                    </div>


                     <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                               <input type="checkbox" id="chkChqPag" />&nbsp;Cheque Pagador
                            </div>
                        </div>
                    </div>  

                </div>  

                <div class="row-fluid RCaja" id="divCheque" style="display:none;">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcChq">Cheque</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select class=" span12" data-placeholder="N° CHEQUE" id="slcChq"></select>
                            </div>
                        </div>
                    </div>

                      <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <label>Girado A</label>
                            </div>
                        </div>
                    </div>
       
                     <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <label id="lblGiradoA"></label>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcOperacionEfectuada">Operación Efectuada</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">

                                <select class="span12" data-placeholder="OPERACION EFECTUADA POR:" id="slcOperacionEfectuada">
                                    <option></option>

                                </select>

                            </div>

                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcTipo">Tipo</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">

                                <select autocomplete="off" class="span10 bl obligatorio" data-placeholder="TIPO" id="slcTipo">
                                    <option></option>
                                    <option value="I">ABONO</option>
                                    <option value="E">CARGO</option>

                                </select>

                            </div>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtNroOpe">
                                Número de Operación</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtNroOpe" class="span12 obligatorio" placeholder="" type="text" />
                            </div>
                        </div>
                    </div>


                </div>
                <!-- FIN LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDescripcion" class="span12 bl obligatorio" placeholder="" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtOficina">
                                Oficina</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtOficina" class="span12" placeholder="" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCanal">
                                Canal</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCanal" class="span12" placeholder="" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>





                </div>
                <!-- FIN LINEA -->

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label id="lblmonto" class="control-label" for="txtMonto">
                                Monto</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtMonto" class="span12 obligatorio bl" placeholder="" type="text" style="text-align: right" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtFeOp">
                                Fecha Operación</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFeOp" class="span10 obligatorio bl" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" type="text" />
                            </div>
                        </div>
                    </div>
                    .
                    
                     <div class="span2">
                         <div class="control-group">
                             <label class="control-label" for="txtFeVa">
                                 Fecha Valor</label>

                         </div>
                     </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtFeVa" class="span10" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" type="text" />
                            </div>
                        </div>
                    </div>

                </div>
                <!-- FIN LINEA -->

                <div class="row-fluid" style="margin-bottom: 10px;">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="slcOperacion">Tipo Operacion</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12" id="slcOperacion">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcPersona">Persona</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="inputPersona">
                                <input id="slcPersona" class="span11" type="text" placeholder="Persona" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <a id="btnBuscarTicket" class="btn black pull-left" style="display: none"><i class=" icon-plus-sign"></i>&nbsp;Buscar Ticket(s)</a>
                        <a id="btnNuevaPersona" href="?f=NKMGECL" target="_blank" title="Nuevo" class="btn green" style="display: none; margin-bottom: 2px;"><i class="icon-plus"></i></a>
                        <a id="btnRecargarPersona" title="Recargar" class="btn blue" style="display: none;margin-bottom: 2px;"><i class="icon-refresh"></i></a>
                        <a id="btnNuevoClienteRapido" onclick="NuevoClienteRapido();" title="Nuevo Cliente Rápido" class="btn red" style="display: none; margin-bottom: 2px;"><i class="icon-plus"></i></a>
                    </div>
                </div>
                <!-- FIN LINEA -->
                <div class="row-fluid">
                    <div class="span12" id="divInfoTicket">
                        <table id="tblInfoTicket" border="0" class="display DTTT_selectable">
                            <thead>
                                <tr> 
                                    <th></th>
                                    <th>TICKET</th>
                                    <th>SERIE-DCTO</th>
                                    <th>CODIGO</th>
                                    <th>DESCRIPCION</th>
                                    <th>RAZON SOCIAL</th>
                                    <th>MONTO</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>                       
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:crearMovimiento();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <input type="hidden" id="hddauxiliar" value="" />
            </div>
        </div>
    </div>
</div>

<div id="divBuscarTicket" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%; left: 25%;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="divBuscarTicket_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;BUSCAR TICKET</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span12" id="divBuscarTicket_body">
                <table class="display DTTT_selectable" id="tblTicket" style="width: 100%;">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="chkTodos"></th>
                            <th style="text-align: center">TICKET</th>                            
                            <th style="text-align: center">DESCRIPCION</th>
                            <th style="text-align: center">CLIENTE</th>
                            <th style="text-align: center">MONTO</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <label class="control-label" style="font-style: italic;text-align: left">Clic en un Ticket para seleccionarlo</label>
        <button class="btn green" type="button" onclick="AgregarTicket()" id="btnAgregarTicket">&nbsp;Agregar Seleccionado(s)</button>
    </div>
</div>

<script type="text/javascript" src="../vistas/NB/js/NBMMOCB.js"></script>
<input id="hfPIDM" type="hidden" />
<input id="hfCODTIPODOC" type="hidden" />
<input id="hfNRODOCCLIENTE" type="hidden" />
<input id="hfESTADO" type="hidden" />
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMMOCB.init();

    });
</script>
