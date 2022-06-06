<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMCHEQ.ascx.vb" Inherits="vistas_NB_NBMCHEQ" %>


    <div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajemodal">
        
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano"  class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>



<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CHEQUES</h4>
                <div class="actions">
                    <a class="btn black" id="btnimprimir"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=nbmcheq"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nblcheq"><i class="icon-list"></i>Listar</a>

                </div>

            </div>
            <div class="portlet-body" id="div_cheque">

                <div class="row-fluid">
                    <div class="span1">
                        <label for="slcEmpresa">Empresa:</label>

                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12 obligatorio empresa" data-placeholder="EMPRESA">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span7" align="right">
                        <label id="lbltcambio"></label>

                    </div>

                </div>
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>

                <div class="row-fluid noimpr">
                    <div class="span1">
                        <label>Fecha Emisión</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input name="txt_fecha_emision" type="text" id="txt_fecha_emision" class="span10 obligatorio" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                            </div>
                        </div>
                    </div>
                    <div class="span1 noimpr">
                        <label>Fecha a Cobrar</label>
                    </div>
                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">
                                <input name="txt_fecha_cobrar" type="text" id="txt_fecha_cobrar" class="span10" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                            </div>
                        </div>
                    </div>

                    <div class="span1 noimpr">
                        <label>Fecha Reg.</label>
                    </div>
                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">
                                <input name="txt_fecha_rgto" type="text" id="txt_fecha_rgto" class="span10" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy" disabled="disabled">
                            </div>
                        </div>
                    </div>


                    <div class="span1 noimpr">
                        <label>Destino</label>
                    </div>
                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">
                                <select name="slcdestino" id="slcdestino" class="span12 obligatorio" data-placeholder="DESTINO">
                                    <option></option>
                                    <option value="P">PAGO</option>
                                    <option value="G">GARANTIA</option>
                                </select>
                            </div>
                        </div>

                    </div>



                </div>


                <div class="row-fluid">

                    <div class="span1">
                        <label for="slcctaban">Cta Bancaria</label>

                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcctaban" data-placeholder="CUENTA BANCARIA" class="span10 obligatorio">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">
                                <input id="rb_comun" name="rb_tipo" type="radio" value="C" class="span12" checked="checked">
                                &nbsp; Comerciales
                              
                            </div>

                        </div>
                    </div>

                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">

                                <input id="rb_difer" name="rb_tipo" type="radio" value="D" class="span12">
                                &nbsp; Pago Diferido
                            </div>

                        </div>
                    </div>



                </div>

                <div class="row-fluid noimpr">




                    <div class="span1">
                        <label>Nro Cheque</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span10 obligatorio" disabled="disabled" type="text" id="txt_nro_cheque">
                            </div>
                        </div>
                    </div>



                    <div class="span1">
                        <label>Monto</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input name="txt_monto" type="text" id="txt_monto" class="span10 obligatorio">
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <label>Moneda</label>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcMoneda" disabled="disabled" class="span12 obligatorio">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1 noimpr">
                        <label>Estado</label>
                    </div>
                    <div class="span2 noimpr">
                        <div class="control-group">
                            <div class="controls">
                                <select name="slcestado" id="slcestado" class="span12" data-placeholder="ESTADO" disabled="disabled">
                                    <option value="F">POR FIRMAR</option>
                                    <option value="E">EMITIDO</option>
                                    <option value="A">ANULADO</option>
                                    <option value="P">PAGADO</option>
                                    <option value="R">RECHAZADO</option>
                                    <option value="C">COBRADO</option>
                                </select>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span6">

                        <div class="row-fluid">

                            <div class="span2">
                                <label id="txt_girado">Girado a</label>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input name="txt_giradoa" type="text" id="txt_giradoa" placeholder="Digite Nombres o Razon Social" class="personas span10 obligatorio activo">
                                        <a class="btn buscaPersona" style="background-color: white; padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div id="cont_nuevo"></div>
                        <div class="row-fluid">


                            <div class="span2">
                                <label id="txt_firmant">Firmante</label>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input name="txt_firmante" type="text" id="txt_firmante" placeholder="Digite Nombres o Razon Social" style="display: none" class="firmante f2 span10 ff1">
                                        <select name="slc_firmante" id="slc_firmante" data-placeholder="Digite Nombres o Razon Social" class="firmante f1 span10 ff1" disabled="disabled"></select>
                                        <a class="btn buscaPersona" style="background-color: white; padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                                        <button type="button" fctn="+" class="btn blue f1" id="agregar_firmante" style="display: none; position: absolute;"><i class="icon-plus" style="line-height: initial;"></i></button>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="row-fluid f2 noimpr" id="div_f2" style="display: none">
                            <div class="span2">
                                <label>Firmante 2</label>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input name="txt_firmante2" type="text" id="txt_firmante2" placeholder="Digite Nombres o Razon Social" class="firmante span10 activo">
                                        <a class="btn buscaPersona" style="background-color: white; padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                                        <button type="button" fctn="-" class="btn red f1 removeFirmante" style="display:none; position: absolute;"><i class="icon-minus" style="line-height: initial;"></i></button>
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="span6 noimpr">

                        <div class="row-fluid ">

                            <div class="span2">
                                <label>Glosa</label>
                            </div>

                            <div class="span8">
                                <div class="control-group">
                                    <div class="controls">
                                        <textarea name="txt_glosa" type="text" rows="3" id="txt_glosa" class="span12"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <input type="hidden" id="hddauxiliar" value="" />
                <input type="hidden" id="hddauxiliar2" value="" />
                <input type="hidden" id="hddauxiliar3" value="" />

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>

            </div>
        </div>
    </div>
</div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMCHEQ.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMCHEQ.init();

    });
</script>
