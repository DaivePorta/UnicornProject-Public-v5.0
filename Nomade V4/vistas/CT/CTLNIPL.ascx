<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLNIPL.ascx.vb" Inherits="vistas_CT_CTLNIPL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ESTRUCTURA DE PLAN CONTABLE</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ctmnipl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=ctlnipl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
                <!-- Se agregó el Combobox de Empresa 20/08/18-->
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    
            </div>
            <div class="portlet-body">
               
                <div class="row-fluid">

                    <div class="span12">
                        <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                        <table id="tblEPlanContable" border="0" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CÓDIGO
                                    </th>
                                    <th>TIPO
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>NIVELES
                                    </th>
                                    <th>DIGITOS NIVEL
                                    </th>
                                    <th>FECHA INICIO
                                    </th>
                                    <th>FECHA FIN
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>PREDETERMINADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CT/js/CTMNIPL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLNIPL.init();
        
    });
</script>