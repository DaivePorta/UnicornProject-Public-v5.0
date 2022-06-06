<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLSCSL.ascx.vb" Inherits="vistas_NC_NCLSCSL" %>


<style>
    dataTables_length.style {
        margin-top: 8px;
    }
</style>



<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA ESTABLECIMIENTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmscsl" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nclscsl" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid">

                    <div id="filter_emp2" class="span12" data-column="2">
                        <div class="span1"><b>CODIGO:</b> </div>
                        <div class="span1">
                            <input style="margin-bottom: 0px;" type="text" class="column_filter span12" id="filcod">
                        </div>


                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    EMPRESA</label>
                            </div>
                        </div>

                        <div id="filter_emp" class="span4" data-column="2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="combo m-wrap span12 required" data-placeholder="EMPRESA" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            
                        <table id="tblBandeja" cellspacing="0" class="display DTTT_selectable" border="0">
                            <thead>
                                <tr align="center">

                                    <th>CODIGO
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>FECHA INICIO
                                    </th>
                                    <th>FECHA TERMINO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                    <th>CAMBIAR ESTADO
                                    </th>
                                </tr>
                            </thead>
 </table>
              <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCSCSL.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.


        NCLSCSL.init();
        
    });
</script>


