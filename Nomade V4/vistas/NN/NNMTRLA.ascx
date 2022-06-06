<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMTRLA.ascx.vb" Inherits="vistas_NN_NNMTRLAB" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TRIBUTOS LABORALES</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NNMTRLA"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NNLTRLA"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                


                <div class="row-fluid">
                    <div id="divSpanTablesGruposSubgrupos" class="span12">
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsGrupo" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddGrupo" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefGrupo" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditGrupo" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                     <table id="tbl_grupo" class="display DTTT_selectable" style="height: 50px;">
                                            <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                                <tr>
                                                    <th>CÓDIGO
                                            </th>
                                            <th>DESCRIPCION
                                            </th>
                                            <th>ESTADO
                                            </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="row-fluid">
                                    <div id="divSpanButtonsSubgrupo" class="span12">
                                        <div class="control-group">
                                            <div class="controls">
                                                <a id="aAddSubGrupo" class="span1 btn transparent" href="javascript:;" title="Agregar"><i class="icon-plus-sign"></i></a>
                                                <a id="aRefSubGrupo" class="span1 btn transparent" href="javascript:;" title="Refrescar"><i class="icon-refresh"></i></a>
                                                <a id="aEditSubGrupo" class="span1 btn transparent" href="javascript:;" title="Editar"><i class="icon-pencil"></i></a>
                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                     <table id="tbl_Subgrupo" class="display DTTT_selectable" style="height: 50px;">
                                            <thead style="background-color: rgb(12, 1, 71); color: aliceblue;">
                                                <tr>
                                                    <th>CÓDIGO
                                            </th>
                                            <th>DESCRIPCION
                                            </th>
                                            <th>ESTADO
                                            </th>
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
        </div>
    </div>
</div>
<div id="MuestraModal"  class="modal hide fade" tabindex="-1" role="dialog" style="width: 40%;" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button> 
            <h4 id="myModalLabel"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoModal">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoModal" class="limpiar span6" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div> 
                          <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="chkactivoModal">
                                <div class="checker" id="uniform-chkactivoModal"><span class="checked">
                                    <input type="checkbox" id="chkactivoModal" name="chkactivoModal" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                Activo</label>
                        </div>
                    </div>          
                     </div>
             
                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionModal">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcionModal" class="limpiar m-wrap span12" type="text"    style="text-transform:uppercase ;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             
           
             <div class="form-actions" style="text-align:right ;" id="botones_grupo">
                    <a id="grabarModal" class="btn blue" href="javascript:;"><i class="icon-save"></i> Grabar</a>
                    <a id="cancelarModal" class="btn" href="javascript:CancelarModal();"><i class="icon-remove"></i> Cancelar</a>
                </div>
           

         
        </div>
    </div>
</div>



<div id="MuestraModalSubGrupo"  class="modal hide fade" tabindex="-1" role="dialog" style="width: 40%;" aria-hidden="true" aria-labelledby="myModalLabel2">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button> 
            
            <h4 id="myModalLabel2"></h4>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCodigoSubGrupo">
                                    Código</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtCodigoSubGrupo" class="limpiar span6" disabled="disabled" type="text" />
                                </div>
                            </div>
                        </div> 
                          <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="chkactivoSubGru">
                                <div class="checker" id="uniform-chkactivoSubGru"><span class="checked">
                                    <input type="checkbox" id="chkactivoSubGru" name="chkactivoSubGru" checked="" class="m-wrap" style="opacity: 0;"></span></div>
                                Activo</label>
                        </div>
                    </div>          
                     </div>
             
                </div>
            </div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtDescripcionSubGrupo">
                                    Descripción</label>
                            </div>
                        </div>
                        <div class="span10">
                            <div class="control-group">
                                <div class="controls">
                                    <input id="txtDescripcionSubGrupo" class="limpiar m-wrap span12" type="text"    style="text-transform:uppercase ;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             
           
             <div class="form-actions" style="text-align:right ;" id="botones_subgrupo">
                    <a id="grabarModalSubGrupo" class="btn blue" href="javascript:;"><i class="icon-save"></i> Grabar</a>
                    <a id="cancelarModalSubGrupo" class="btn" href="javascript:cancelarModalSubGrupo();"><i class="icon-remove"></i> Cancelar</a>
                </div>
           

         
        </div>
    </div>
</div>

                <input id="hfCOD_GRUPO" type="hidden" />
                <input id="hfDESC_GRUPO" type="hidden" />
                <input id="hfESTADO_GRUPO" type="hidden" />
                <input id="hfCOD_SGRUPO" type="hidden" />
                <input id="hfDESC_SGRUPO" type="hidden" />
                <input id="hfESTADO_SGRUPO" type="hidden" />

<script type="text/javascript" src="../vistas/NN/js/NNMTRLA.js"></script>

<script>
    jQuery(document).ready(function () {
        NNMTRLA.init();

    });
</script>