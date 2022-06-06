<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLLCANP.ascx.vb" Inherits="vistas_GL_GLLCANP" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CANJES LETRAS Y FACTURAS POR PAGAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=GLMCANP" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=GLLCANP" class="btn red"><i class="icon-list"></i>Listar</a>
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
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresas">
                                    </select>
                                </div>
                            </div>
                        </div>                        
                    </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CODIGO
                                    </th>
                                    <th>PROVEEDOR
                                    </th>                                    
                                    <th>FECHA EMISION
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>MONTO
                                    </th>          
                                </tr>
                            </thead>
                        </table>                                                
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/GL/js/GLMCANJ.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLLCANP.init();

    });
</script>