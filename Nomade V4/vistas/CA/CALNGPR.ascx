<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALNGPR.ascx.vb" Inherits="vistas_CA_CALNGPR" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA NOTA DE CRÉDITO GENÉRICA PROVEEDOR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=CAMNGPR" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>                   
                </div>

            </div>

            <div class="portlet-body">

                <div class="row-fluid">

                    <div class="span1" id="divCboEmpresa">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa" >
                                </select>
                            </div>
                        </div>
                    </div>                  
                    <div class="span1 offset1" >
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4" id="divCboEstablecimiento">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">                    
                    <div class="span2 offset10">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid" id="divTblNotasCredito">
                            <table id="tblNotasCredito" class="display DTTT_selectable bordered dataTable no-footer" style='width: 100%;'>
                                <thead >
                                    <tr>
                                        <th>CÓDIGO</th>
                                        <th>DOCUMENTO</th>                                                                           
                                        <th>MOTIVO</th>                                                                           
                                        <th>MONEDA</th>
                                        <th>IMPORTE</th>
                                        <th>CLIENTE</th>
                                        <th>EMISIÓN</th>
                                        <th>ESTADO</th>
                                         <th>DOCUMENTO<br />
                                            ORIGEN</th>  
                                    </tr>
                                </thead>
                       
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>


<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CA/js/CAMNGPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALNGPR.init();

    });
</script>