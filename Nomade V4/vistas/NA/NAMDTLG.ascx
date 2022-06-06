<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NAMDTLG.ascx.vb" Inherits="vistas_NA_NAMDTLG" %>
<style>
    .multiselect-container.dropdown-menu label {
            white-space: normal !important;
    }
</style>
<div class="row-fluid">

    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>DATOS LOGISTICOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=namdtlg" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear:both"></div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Almacén</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="divAlmacenes">
                                <select id="hf10" multiple="multiple" class="span12" data-placeholder="ALMACEN">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="chkEstado">
                                <input type="checkbox" id="chkEstado" name="chkEstado" />
                                Incluir Descontinuados</label>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">   
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">Meses a medir Rotación</label>
                        </div>
                    </div>  

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" id="txtRotacion" class="span12 derecha" value="3" onkeypress="return ValidaNumeros(event,this)" maxlength="2"/>
                            </div>
                        </div>
                    </div>

                    <div class="span3">
                    </div>                 

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" class="btn blue">FILTRAR</a> &nbsp;&nbsp;  
                                <a id="actualizar" class="btn green"><i class="icon-refresh"></i>&nbsp;ACTUALIZAR</a>
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <div class="row-fluid">
                    <div id="tblProductos">
                        <table id="tblbmodal" class="display DTTT_selectable" border="0" style='width: 100%;'>
                            <thead>
                                <tr>
                                    <th>COD. PROD.</th>
                                    <th>PRODUCTO</th>
                                    <th>EMPRESA</th>
                                    <th>ALMACÉN</th>
                                    <th>Unidad<br />Medida</th>
                                    <th>Punto<br />Reorden</th>
                                    <th>Stock<br />Mínimo</th>
                                    <th>Stock<br />Máximo</th>
                                    <th>Stock<br />Actual</th>
                                    <th>Costo<br/>Unitario</th>
                                    <th>Rotación<br/>Mensual</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NA/js/NAMDTLG.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NAMDTLG.init();
    });

</script>
