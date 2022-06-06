<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CALNCCL.ascx.vb" Inherits="vistas_CA_CALNCCL" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTADO NOTA DE CRÉDITO CLIENTE</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>

            </div>

            <div class="portlet-body">

                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4" id="divCboEmpresa">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>                    
                    <div class="span1 offset1">
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
                     <div class="span1">
                        <%--<div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Estado</label>
                        </div>--%>
                    </div>
                    <div class="span2"">
                        <%--<div class="control-group">
                            <div class="controls">
                                <select id="cboEstado" class="span12" data-placeholder="Estado">
                                    <option value="V" selected="selected">VIGENTES</option>
                                    <option value="A">ANULADOS</option>
                                    <option value="T">TODOS</option>
                                </select>
                            </div>
                        </div>--%>
                    </div>
                    <div class="span7">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                </div>

               <div class="row-fluid" style="margin-bottom: 25px; border: solid 1px;">
                    <div class="span2 offset1">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: black"></i>&nbsp;GENERAL</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: blue"></i>&nbsp;CAMBIO PRODUCTOS</label></strong>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <div class="control-label">
                                <strong>
                                    <label style="font-weight: 600;"><i class="icon-pushpin" style="color: red"></i>&nbsp;ANULADA</label></strong>
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
                                        <th></th>
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
<script type="text/javascript" src="../vistas/CA/js/CAMANCL.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CALNCCL.init();

    });
</script>