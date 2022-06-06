<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPMPASU.ascx.vb" Inherits="vistas_CP_CPMPASU" %>
<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 80000;
        background-color: rgb(0, 0, 0);
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PAGO DE SUELDOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=CPMPASU"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=CPLPASU" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>  
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid" id="msg">
                </div>
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls" id="Div1">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>



                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label">Planilla Bancaria</label>
                            <div class="controls" id="Div3">
                                <select id="cbo_planilla_banc" name="cbo_planilla_banc" class="bloquear span12 " data-placeholder="Seleccionar Planilla" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span4" style="font-size: medium; font-weight: bold; margin-top: 19px;">
                        BANCO :&nbsp;&nbsp;<span id="sp_banc_desc" style="color: blue">~</span><br />
                        CTA ORIGEN:&nbsp;&nbsp;<span id="sp_nro_cta" style="color: blue">~</span>
                    </div>







                </div>
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">Planilla </label>
                            <div class="controls" id="Div2">
                                <select id="cbo_planilla" name="cbo_planilla" class="bloquear span12 " data-placeholder="Seleccionar Planilla" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_proceso">
                                Fec. Proceso</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="txt_fec_proceso" class="bloquear span10 date-picker" placeholder="dd/mm/yyyy" data-date-format="dd/mm/yyyy" style="text-align: left">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_fec_proceso">
                                N° Operacion</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="txt_ope" class="bloquear span7" onkeypress="return ValidaNumeros(event,this)" style="text-align: right">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <button id="btn_consultar" style="margin-top: 24px;" type="button" class=" btn black span6"><i class="icon-search"></i>&nbsp;&nbsp;Consultar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>





                <div class="row-fluid" style="display: block" id="div_table">
                    <div class="span1"></div>
                    <div class="span10">
                        <div class="row-fluid">
                           
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <button id="btn_limpiar" type="button" class=" btn red span7" style="margin-left: -10px;" disabled="disabled">Limpiar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <table class="table table-bordered table-striped" id="tbl_planilla" style="width: 100%">
                                <thead style="background-color: #0D6BA2; color: white;">
                                    <tr>
                                        <th style="width: 3%; text-align: center;">N°</th>
                                        <th style="width: 5%">CUENTA</th>
                                        <th style="width: 5%">BANCO</th>
                                        <th style="width: 20%">TITULAR</th>
                                        <th style="width: 2%">DOC. IDENTIDAD</th>
                                        <th style="width: 2%">MONE. CTA ABONO.</th>
                                        <th style="width: 2%">SUELDO PENDIENTE</th>
                                        <th style="width: 5%">IMPORTE</th>
                                    </tr>
                                </thead>

                            </table>
                        </div>

                    </div>
                    <div class="span1"></div>
                </div>
                <div class="row-fluid" style="display: block; text-align: center; font-size: larger;">


                    <b>TOTAL (<span id="desc_mone_base">PENDIENTE</span>) : </b><span id="simb_mone_base">S/.</span><span id="total_pendiente">0.00</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <b>TOTAL (<span id="desc_mone_alt">IMPORTE</span>) : </b><span id="simb_mone_alt">S/.</span> <span style="color: blue;" id="total_importe">0.00</span>

                </div>
                <div class="form-actions" style="text-align: center">
                    <button id="btn_pagar" type="button" class=" btn green "><i class="icon-legal"></i>&nbsp;&nbsp;Pagar</button>

                </div>


            </div>

            <div id="modal_progress" data-keyboard="false" data-backdrop="static" class="modal hide fade" tabindex="-2" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true" style="display: none; left: 50%; top: 40%; height: 109px">
                <div class="modal-header">

                    <h3 id="myModalLabel1">GENERANDO...</h3>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div id="barra_progreso" style="width: 0%;" class="bar"></div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<div id="Confirm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Realizar Pago Planilla</h3>
    </div>
    <div class="modal-body">
        <p>
            ¿Esta realmente seguro de realizar el pago de la  planilla?
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="btn_aceptar" data-dismiss="modal" class="btn black">
            Aceptar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>
<input type="hidden" id="hfcod_ctlg" />
<input type="hidden" id="hfcod_pla" />
<input type="hidden" id="hfcod_pla_banc" />
<input type="hidden" id="hfcod_cuen_emp" />


<script type="text/javascript" src="../vistas/CP/js/CPMPASU.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPMPASU.init();
    });

</script>
