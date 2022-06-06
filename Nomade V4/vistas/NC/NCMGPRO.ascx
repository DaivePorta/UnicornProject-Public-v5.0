<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMGPRO.ascx.vb" Inherits="vistas_NC_NCMGPRO" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>GRUPO DE PROVEEDORES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmgpro"><i class="icon-plus"></i>Nuevo</a>
                    <a class="btn red" href="?f=nclgpro"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">

                    <div class="span5">
                        <div class="portlet box red" id="div_grupo">
                            <div class="portlet-title">
                                <h4>Paso 1 : Registrar Grupo</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txtcodigo">
                                                Codigo</label>

                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="control-group ">
                                            <div class="controls">
                                                <input id="txtcodigo" class="m-wrap span7" disabled="disabled" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="chkactivo" style="margin-left: 26px;">
                                                <div class="checker" id="uniform-chkactivo"><span>
                                                    <input type="checkbox" id="chkactivo" name="chkactivo" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                                Activo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_nombre">
                                                Nombre</label>

                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <textarea id="txt_nombre" class="m-wrap span12" placeholder="Nombre..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_descripcion">
                                                Descripcion</label>

                                        </div>
                                    </div>
                                    <div class="span9">
                                        <div class="control-group">
                                            <div class="controls">
                                                <textarea id="txt_descripcion" class="m-wrap span12" style="margin-top: 0px; margin-bottom: 10px; height: 157px;" placeholder="Descripcion..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row-fluid" style="text-align: right;">
                                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>  Grabar</a>
                                    <a class="btn" href="?f=ncmgpro"><i class="icon-remove"></i>  Cancelar</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="span7">
                        <div class="portlet box green" id="divadd_prov">
                            <div class="portlet-title">
                                <h4>Paso 2 : Agregar Proveedores</h4>
                            </div>
                            <div class="portlet-body">
                                <div class="row-fluid">
                                    <div class="span11">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cboProveedor" class="span12" data-placeholder="Proveedor" disabled="disabled" >
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span1">
                                     <a id="btn_add" class="btn red" style="display:none; border-radius: 4px !important;height: 13px;"><i class="icon-plus"></i></a>
                                    </div>

                                </div>
                                <div class="row-fluid">
                                    <div class="span12">
                                            <table id="tblgrupo_proveedor" class="table table-bordered table-hover dataTable no-footer" border="0">
                                    <thead>
                                        <tr>
                                             <th>PIDM
                                            </th>
                                             <th>CODIGO_GRUPO
                                            </th>
                                            <th>TIPO DCTO.
                                            </th>
                                            <th>NUMERO DCTO.
                                            </th>
                                            <th>RAZON SOCIAL
                                            </th>
                                            <th>NUMERO SEQ
                                            </th>
                                             <th>OPCION
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
                <!-- FIN PRIMERA LINEA -->


            





            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->




<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->


<script type="text/javascript" src="../vistas/NC/js/NCMGPRO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMGPRO.init();
        $('#uniform-chkactivo span').removeClass().addClass("checked");
        $('#chkactivo').attr('checked', true);


    });


</script>
