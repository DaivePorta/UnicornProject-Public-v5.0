<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NKMSGCL.ascx.vb" Inherits="vistas_NK_NKMSGCL" %>


<!-- INICIA EL CUERPO DE LA FORMA-->
<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>SEGMENTACION CLIENTE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NKMSGCL"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NKLSGCL"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label span12" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select class="span12 empresa" id="cboEmpresa">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">

                    <div class="span4">
                        <div class="actions">
                            <a class="btn transparent add" title="Agregar" style=""><i class="icon-plus-sign"></i></a>
                            <a class="btn transparent ref" title="Refrescar" style=""><i class="icon-refresh"></i></a>
                            <a class="btn transparent edt" title="Editar" style=""><i class="icon-pencil"></i></a>
                            <a class="btn transparent del" title="Cambiar Estado" style=""><i class="icon-remove"></i></a>
                        </div>
                        <div>
                            <table id="tblCanal" class="display DTTT_selectable">
                                <thead>
                                    <tr role="row">
                                        <th colspan="3" rowspan="1" style="text-align: center">CANAL</th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>DESCRIPCION</th>
                                        <th>ESTADO</th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="actions">
                            <a class="btn transparent add" title="Agregar" style=""><i class="icon-plus-sign"></i></a>
                            <a class="btn transparent ref" title="Refrescar" style=""><i class="icon-refresh"></i></a>
                            <a class="btn transparent edt" title="Editar" style=""><i class="icon-pencil"></i></a>
                            <a class="btn transparent del" title="Cambiar Estado" style=""><i class="icon-remove"></i></a>
                        </div>
                        <div>
                            <table id="tblSubCanal" class="display DTTT_selectable">
                                <thead>
                                    <tr role="row">
                                        <th colspan="3" rowspan="1" style="text-align: center">SUBCANAL</th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>DESCRIPCION</th>
                                        <th>ESTADO</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="actions">
                            <a class="btn transparent add" title="Agregar" style=""><i class="icon-plus-sign"></i></a>
                            <a class="btn transparent ref" title="Refrescar" style=""><i class="icon-refresh"></i></a>
                            <a class="btn transparent edt" title="Editar" style=""><i class="icon-pencil"></i></a>
                            <a class="btn transparent del" title="Cambiar Estado" style=""><i class="icon-remove"></i></a>
                        </div>
                        <div>
                            <table id="tblTipoNegocio" class="display DTTT_selectable">
                                <thead>
                                    <tr role="row">
                                        <th colspan="3" rowspan="1" style="text-align: center">TIPO NEGOCIO</th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>DESCRIPCION</th>
                                        <th>ESTADO</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <!-- FIN DEL CUERPO DE LA FORMA-->
        </div>
    </div>
</div>


<div id="modalEditaNuevo" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" style="top: 20%; left: 58%;">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalGConfirmacion_title"><span id="txtTitleTipo"></span></h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span3">
                <label>Código</label>
            </div>
            <div class="span4">
                <input type="text" class="span12" id="txtCodigo" disabled="disabled" readonly="true" />
            </div>
        </div>

        <div class="row-fluid">
            <div class="span3">
                <label>Descripción</label>
            </div>
            <div class="span8">
                  <input type="text" class="span12" id="txtDescripcion" />
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn blue" type="button" id="modAceptar"><i class="icon-ok"></i>&nbsp;Aceptar</button>
        <button class="btn red" type="button" id="modCancelar" data-dismiss="modal"><i class="icon-remove"></i>&nbsp;Cancelar</button>
    </div>
</div>



<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../vistas/NK/JS/NKMSGCL.js"></script>
<script type="text/javascript" src="../../vistas/NC/estereotipos/js/Adicionales.js"></script>

<script type="text/javascript" src="../../vistas/NC/estereotipos/js/Cliente.js"></script>


<script>

    jQuery(document).ready(function () {
        NKMSGCL.init();

    });

</script>

