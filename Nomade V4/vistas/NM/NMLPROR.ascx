<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLPROR.ascx.vb" Inherits="vistas_NM_NMLPROR" %>
<style>             
    @media print {
         #datos {
             overflow-x:initial !important;
         }     
         .dn, .btn{
            display: none !important;
        }
    }  
</style>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE PRODUCTOS/SERVICIOS RAPIDOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nmmpror" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nmlpror" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
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
                                <select id="slcEmpresa" class="m-wrap span12" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="span5 offset1">
                        <div class="control-group">
                            <label class="control-label" for="chkEstado">
                                <input type="checkbox" id="chkEstado" name="chkEstado" />
                                Incluir Descontinuados</label>
                        </div>
                    </div>
                </div>
                <div id="datos" style="overflow-x:auto;">
                      <table id='tblLista' class='display DTTT_selectable' border='0'>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>CODIGO</th>
                                <th>DESCRIPCION</th>
                                <th>MARCA</th>
                                <th>GRUPO</th>
                                <th>SUBGRUPO</th>
                                <th>TIPO EXISTENCIA</th>
                                <th>UNIDAD DE MEDIDA</th>
                                <th>CODIGO AUXILIAR</th>
                                <th>TODOS</th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CODIGO</th>
                                <th>DESCRIPCION</th>
                                <th>MARCA</th>
                                <th>GRUPO</th>
                                <th>SUBGRUPO</th>
                                <th>TIPO EXISTENCIA</th>
                                <th>UNIDAD DE MEDIDA</th>
                                <th>CODIGO AUXILIAR</th>
                                <th>ESTADO</th>
                                <th>CAMBIAR ESTADO</th>
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
<script type="text/javascript" src="../vistas/NM/js/NMMPROR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLPROR.init();
    });
</script>