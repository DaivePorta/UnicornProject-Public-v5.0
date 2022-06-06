<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NOLORDD.ascx.vb" Inherits="vistas_NO_NOLORDD" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA ORDEN DIRECTA DE BIENES Y SERVICIOS</h4>
                <div class="actions">
                    <a class="btn black" href="javascript:imprimirDiv(['filtros_1','filtros_2','tblProductos']);"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=NOMORDD"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                </div>
            </div>
            <div id="div" class="portlet-body">

                <div id="Div1" class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label>Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="controls">
                            <a id="buscar" class="btn blue">FILTRAR</a>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div id="listaOrden" class="span12">
                        <table id="detalle" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>CORRELATIVO</th>
                                    <th>GLOSA</th>
                                    <th>TIPO DE ORDEN</th>
                                    <th>PROVEEDOR</th>
                                    <th>MONEDA</th>
                                    <th>TOTAL</th>
                                    <th>ESTADO</th>
                                    
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NO/js/NOLORDD.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NOLORDD.init();
    });
</script>
