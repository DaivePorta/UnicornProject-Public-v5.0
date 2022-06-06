<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMMOCB.ascx.vb" Inherits="vistas_NB_NBMMOCB" %>

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
                            <label class="control-label" for="slcOperacionTipo">Operación Efectuada</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">

                                <select class="span12" data-placeholder="OPERACION EFECTUADA POR:" id="slcOperacionTipo">
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

                                <select class="span10 bl obligatorio" data-placeholder="TIPO" id="slcTipo">
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

                <!---fin linea -->


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
                <!---fin linea -->





                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:crearMovimiento();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <input type="hidden" id="hddauxiliar" value="" />
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NB/js/NBMMOCB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMMOCB.init();

    });
</script>
