<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CAAPREN.ascx.vb" Inherits="vistas_CA_CAAPREN" %>

<style>
    .noa {
        background-color: antiquewhite;
    }

    .sia {
        background-color: lightcyan;
    }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box red">
            <div class="portlet-title">
                <h4><i class="icon-check"></i>APROBAR RENDICIÓN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=caapren"><i class="icon-plus"></i>Nuevo</a>
                    <%--<a class="btn red" href="?f=calascr"><i class="icon-list"></i> Listar</a>--%>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="8" />
                <input type="hidden" id="hf_codigo" value="" />
                <div class="alert alert-error hide">
                    <button class="close" data-dismiss="alert"></button>
                    Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                </div>
                <div class="alert alert-success hide">
                    <button class="close" data-dismiss="alert"></button>
                    Datos ingresados correctamente.
                </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" disabled data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" disabled data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hf_establecimiento" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtempleado">
                                Empleado</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtempleado" name="txtempleado" class="span12 m-wrap required" disabled placeholder="Digite Apellidos y Nombres" type="text" />
                                <input type="hidden" id="hf_pidm" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcodduenta">
                                Cuenta</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcodcuenta" name="txtcodcuenta" class="span12 m-wrap required" type="text" disabled />

                            </div>
                        </div>
                    </div>


                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcentrocosto">
                                Centro Costo</label>

                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcentrocosto" name="txtcentrocosto" class="span12 m-wrap required" type="text" disabled />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtglosa">
                                Glosa</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtglosa" name="txtglosa" class="span12 m-wrap required" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <label for="cbomoneda" class="control-label">
                                    Moneda
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="span2 disabled">
                        <div class="control-group">
                            <div class="controls" id="con_moneda">
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtmonto">
                                Monto</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtmonto" name="txtmonto" value="0.00" class="m-wrap span12 number required" onkeypress="return ValidaDecimales(event,this)" disabled />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span10">
                        <h4>COMPROBANTES</h4>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div id="dataDocumentos" class="span12" style="overflow-x: scroll;">
                        <table id="tblDocumentos" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Fecha</th>
                                    <th>Comprobante</th>
                                    <th>Serie</th>
                                    <th>Número</th>
                                    <th>Razon Social</th>
                                    <th>Gravada</th>
                                    <th>Total</th>
                                    <th>Cuenta</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span10">
                        <h4>GASTOS</h4>
                    </div>
                </div>
                <!---fin linea -->
                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span12">
                                <div id="Div2" class="alert alert-success" style="text-align: center;">
                                    <i class="icon-check"></i>&nbsp<strong>DOCUMENTO BALANCEADO!</strong>.
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" for="txt_comentario">
                                        Enviar mensaje al Empleado ....
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txt_comentario" name="txt_comentario" class="span12 m-wrap" placeholder="Ingrese un comentario...." />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span1"></div>
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txt_rasignado">
                                        Asignado
                                    </label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="controls">
                                    <input type="text" value="0.00" id="txt_rasignado" name="txt_rasignado" class="span12 m-wrap" disabled />
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="span1"></div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_rmonto">
                                                Monto
                                            </label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="controls">
                                            <input type="text" value="0.00" id="txt_rmonto" name="txt_rmonto" class="span12 m-wrap" disabled />
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="controls">
                                            <input type="text" value="0.00" id="txt_tcambio" name="txt_tcambio" class="span12 m-wrap" disabled="disabled" />
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-label">
                                            <label class="control-label" for="txt_rasignado">
                                                <b>T.C.</b>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <div class="controls">
                                        <div class="span1"></div>
                                        <div class="span3">
                                            <div class="control-group">
                                                <label class="control-label" for="txt_rdevolver">
                                                    Devolver
                                                </label>
                                            </div>
                                        </div>
                                        <div class="span3">
                                            <div class="controls">
                                                <input type="text" value="0.00" id="txt_rdevolver" name="txt_rdevolver" class="span12 m-wrap" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp Cancelar</a>
                </div>
                <!---fin linea -->

            </div>
        </div>
    </div>

</div>

<script type="text/javascript" src="../vistas/CA/js/CAAPREN.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        $(".combo").select2();
        CAAPREN.init();
    });
</script>
