<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLLICO.ascx.vb" Inherits="vistas_CT_CTLLICO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LIBROS DE CONTABLES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=CTMLICO" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CTLLICO" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                </div>

                <div class="row-fluid" style="margin-top:10px;">
                    <table id="tblLista" class="display DTTT_selectable" border="0">
                        <tfoot>
                            <tr>
                                <th>CODIGO
                                </th>
                                <th>COD SUNAT
                                </th>
                                <th>DESCRIPCION
                                </th>
                                <th>ESTADO
                                </th>
                                <th>
                                </th>
                            </tr>
                        </tfoot>
                        <thead>
                            <tr>
                                <th>CODIGO
                                </th>
                                <th>COD SUNAT
                                </th>
                                <th>DESCRIPCION
                                </th>
                                <th>ESTADO
                                </th>
                                <th>CAMBIAR ESTADO
                                </th>
                            </tr>
                        </thead>
                    </table>                                                    
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMLICO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLLICO.init();
       
    });
</script>