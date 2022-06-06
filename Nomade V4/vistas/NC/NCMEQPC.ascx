<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMEQPC.ascx.vb" Inherits="vistas_NC_NCMEQPC" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>EQUIVALENCIA DE PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmeqpc"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=ncleqpc"><i class="icon-list"></i> Listar</a>
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


                    <div class="span1">
                        <div class="control-group ">
                            <label align="center" class="control-label" for="chkactivo">
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


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="slcEmpresa">Empresa</label>

                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group ">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" class="span12" data-placeholder="EMPRESA">
                                    <option></option>
                                </select>
                            </div>

                        </div>

                    </div>

                    <div class="span1">
                    </div>

                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcplandectsba">
                                Plan De Cuentas Base</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlplandects">
                                <select id="slcplandectsba" class="span12" data-placeholder="PLAN DE CUENTAS BASE" disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCentroCostoBase">
                                Cuenta Base</label>

                        </div>
                    </div>

                    <div class="span4">


                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCentroCostoBase" class="span12" data-placeholder="DETALLE" disabled> <option></option></select>
                                </div>
                            </div>


                    </div>

                </div>

                <!---fin linea -->


                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcplandectseq">
                                Plan De Cuentas Equivalente</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcplandectseq" class="span12" data-placeholder="PLAN DE CUENTAS EQ." disabled>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCentroCostoEquivalente">
                                Cuenta Equivalente</label>

                        </div>
                    </div>


                    <div class="span4">


                      
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboCentroCostoEquivalente" class="span12" disabled data-placeholder="DETALLE" >
                                        <option></option> </select>
                                </div>
                            </div>
                      
                       
                    </div>



                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechai">Fecha Inicio</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text"  data-date-format="dd/mm/yyyy" class="span12" id="txtfechai" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span1"></div>


                    <div class="span2">
                        <div class="control-group ">
                            <label>Fecha de Término</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text"  data-date-format="dd/mm/yyyy" class="span12" id="txtfechat" placeholder="dd/mm/yyyy" disabled />
                            </div>
                        </div>
                    </div>

                    <div class="span3"></div>

                </div>

                <!---fin linea -->

                <input type="hidden" id="hddauxiliar" value=""/>
                <input type="hidden" id="hddauxiliar2" value=""/>

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="../vistas/NC/js/NCMEQPC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMEQPC.init();
        
    });
</script>
