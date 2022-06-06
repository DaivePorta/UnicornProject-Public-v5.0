<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALCPOS.ascx.vb" Inherits="vistas_CA_CALCPOS" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CIERRES DE POS</h4>
                <div class="actions">
                   
                    <a href="?f=camcpos" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=calcpos" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                

                <div class="row-fluid">

                    <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="slcEmpr">Empresa</label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <select class="empresa obligatorio span9" id="slcEmpr" data-placeholder="EMPRESA"></select>
                                </div>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group ">
                                <label class="control-label" for="slcEstb">Establecimiento</label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group ">
                                <div class="controls">
                                    <select class="obligatorio span9" data-placeholder="ESTABLECIMIENTO" id="slcEstb"></select>
                                </div>
                            </div>
                        </div>


                </div>

               <div class="row-fluid">

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcPOS">
                                    POS
                                </label>

                            </div>
                        </div>

                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slcPOS" class="span11 obligatorio" data-placeholder="POS">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcMoneda">
                                    Moneda
                                </label>

                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="slcMoneda" data-placeholder="MONEDA" class="span10 obligatorio">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="span1">
                            
                            <button type="button" id="btnFiltrar" class="btn blue">Filtrar</button>
                            
                        </div>

                    </div>


                    <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none; ">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>CODIGO</th>
                                    <th>NUMERO LOTE</th>
                                    <th>FECHA</th>                                                         
                                    <th>CANTIDAD</th>
                                    <th>MONTO CIERRE</th>
                                    <th>OTROS CARGO/ABONO</th>                                              
                                    <th>USUARIO CIERRE</th>    
                                    
                                </tr>
                            </thead>
                        </table>
                       
                    </div>
                </div>


            </div>
            <div class="portlet-footer" align="right"><small style="color:white;"></small></div>
            </div>
        </div>
    </div>


<script type="text/javascript" src="../vistas/CA/js/CAMCPOS.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALCPOS.init();

    });
</script>
