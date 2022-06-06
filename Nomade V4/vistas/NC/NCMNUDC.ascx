<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMNUDC.ascx.vb" Inherits="vistas_NC_NCMNUDC" %>
<style type="text/css">
    .select2-container {
        height: 40px;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>AUTORIZACION COMPROBANTE DE PAGO O DOCUMENTOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmnudc"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nclnudc"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">


                <!-- primera linea --->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Codigo</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="chkactivo">
                                Activo</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />
                            </div>
                        </div>
                    </div>



                    <div class="span5">
                    </div>

                </div>
                <!-------->


                <!-- 2 primera linea --->
                <div class="row-fluid">



                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Formato Papel</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slccompro" data-placeholder="FORMATO PAPEL" class="span12 ">
                                    <option></option>
                                    <option value="M">FORMATO CONTINUO</option>
                                    <option value="T">TICKETS</option>

                                </select>
                            </div>
                        </div>
                    </div>



                    <div class="span1">
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">
                                Correlativo<small> (Req. Tipo Documento)</small></label>
                        </div>
                    </div>

                    <div class="span3">

                        <div class="control-group">
                            <div class="controls">
                                <select id="slccorre" data-placeholder="CORRELATIVO" class="span12" disabled="disabled">
                                    <option></option>
                                    <option value="C">CENTRALIZADO</option>
                                    <option value="P">PUNTO DE VENTA</option>

                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="span2">
                    </div>






                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- 3.5 INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">
                                Empresa</label>
                        </div>
                    </div>

                    <div class="span3">

                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" class="span12 " data-placeholder="EMPRESA">
                                    <option></option>
                                </select>

                            </div>
                        </div>

                    </div>



                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">
                                Establecimiento</label>
                        </div>
                    </div>

                    <div class="span3">

                        <div class="control-group">
                            <div class="controls" id="controlsucursal">
                               
                                <select id="slcscsl" class="span12 " data-placeholder="ESTABLECIMIENTO" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>


                    <div class="span2">
                    </div>

                </div>

                <!---fin linea -->


                <!-- 3 INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Tipo Documento<small> (Req. Formato)</small></label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controltipodoc">
                                 <select id="slctipodoc" class="span12 " data-placeholder="TIPO DOCUMENTO" disabled >
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                                      
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                               Numero de Autorización</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodauto" class="span12" placeholder="Codigo Autorización" type="text" />
                            </div>
                        </div>
                    </div>
                    <%--<div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Impresora</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlimpresora">
                                <!--slcimprgen-->
                                <select class="span12" id="slcimpr" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>--%>


                    <div class="span2">
                    </div>

                </div>

                <!---fin linea -->


                <!-- 4 INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Tipo Campo</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slccampo" class="span12 ">
                                    <option value="A">ALFANUMERICO</option>
                                    <option value="N">NUMERICO</option>

                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="span1">
                    </div>

                    <div class="span2">

                        <div class="control-group">
                            <label class="control-label">
                                Nro Digitos</label>

                        </div>

                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnrodig" class="span12" placeholder="" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">

                        <div class="control-group">
                            <label class="control-label">
                                Nro Lineas</label>

                        </div>

                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnrolinea" class="span12" placeholder="" type="text" />
                            </div>
                        </div>
                    </div>


                </div>

                <!---fin linea -->


                <!-- 5 INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Serie</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtserie" class="span12" placeholder="Serie" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Valor Ini</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtvalorini" class="span12" placeholder="Valor Inicial" type="text" />
                            </div>
                        </div>
                    </div>

                     <div class="span4">
                       
                              
                     
                   

                    <div class="span3">
                        <div class="control-group">
                             <input id="chkvfin" type="checkbox" />
                               <span style="font-size: 14px;font-weight: normal;line-height: 20px;">Valor Fin</span> 

                        </div>
                    </div>

                    <div class="span7">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtvalorfin" class="span12" placeholder="Valor Final" type="text" disabled />
                            </div>
                        </div>
                    </div>

                     </div>

                </div>

                <!---fin linea -->

                <!-- 6 INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label id="txtcajaalmacen" class="control-label">
                                Caja</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls" id="controlcaja">
                                <!--slccajaalmacengen-->

                                <select class="span12" id="slccajaalmacen" data-placeholder="CAJA" disabled>
                                    <option></option>
                                </select>

                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label">
                                Impresora</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlimpresora">
                                <!--slcimprgen-->
                                <select class="span12" id="slcimpr" data-placeholder="IMPRESORA" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                    </div>

                </div>

                <!---fin linea -->

                <!-- 7 INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label">
                                Imprenta</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">

                                <input id="txtimprenta" class="span12" placeholder="Imprenta" type="text" disabled />

                            </div>
                        </div>
                    </div>


                    <div class="span5">
                    </div>

                </div>

                <!---fin linea -->



                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i>Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCNUDC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        $("#slccajaalmacen").select2({
            placeholder: "CAJA",
            allowclear: true

        });

        $("#slcimpr").select2({
            placeholder: "IMPRESORA",
            allowclear: true

        });

        $("#slcscsl").select2({
            placeholder: "SUCURSAL",
            allowclear: true

        });


        NCNUDC.init();

    });
</script>
