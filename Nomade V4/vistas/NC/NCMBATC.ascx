<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMBATC.ascx.vb" Inherits="vistas_NC_NCMBATC" %>
<div class="row-fluid">
     <div class="span12">
         <div id="ventana"  class="portlet box blue">
             <div  class="portlet-title">
                 <h4><i class="icon-reorder"></i>Mantimiento de Procesos Batch</h4>
                 <div class="actions">
                    <a href="?f=ncmbatc" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclbatc" class="btn red"><i class="icon-list"></i> Listar</a>
                 </div>
             </div>


             <div class="portlet-body" id="ventana1">
                 <div class="row-fluid">
                     <div class="span12">
                          <div class="span1">
                              <label class="control-label">Proceso</label>
                          </div>
                          <div class="span2">
                              <input type="text" id="txtnombreproceso" class=" span12" />
                          </div>
                          <div class="span1">
                              <label class="control-label">Procedimiento</label>
                          </div>
                          <div class="span2">
                              <input type="text" id="txtprocedimiento" class=" span12" disabled="disabled" " />
                          </div>
                          <div class="span1" >
                               <div class="control-group">
                                    <div class="controls" style="padding-top: 4px">
                                        <a id="BuscaSP" class="btn blue" ><i class="icon-filter"></i></a>
                                    </div>
                                </div>
                          </div>
                          <div class="span1">
                              <label class="control-label">Ejecucion</label>
                         </div>
                          <div class="span2">
                             <div class="control-group">
                                 <div class="controls">
                                     <select id="cboEjecucion" class="span12"  ></select>
                                 </div>
                             </div>
                         </div>
                         <div class="span2"></div>

                      </div>
                 </div>
                 <div class="row-fluid">
                     <div class="span12">
                         <div class="span1">
                              <label class="control-label">Estado:</label>
                          </div>
                         <div class="span2">
                             <div class="control-group">
                                 
                                 <input id="chkEstado" type="checkbox" />
                                 Activo
                             </div>
                         </div>
                         <div class="span1">
                             <label class="control-label">Nivel</label>
                         </div>
                         <div class ="span1">
                             <div class="control-group">
                                 <div class="controls">
                                     <select id="cboNivel" class="span12" data-placeholder="Nivel" ></select>
                                 </div>
                             </div>
                         </div>
                         <div class="span1"></div>
                         
                         <div class="span1">
                             <label class="control-label">Proc-Ref</label>
                         </div>
                         <div class="span2">
                             <div class="control-group">
                                 <div class="controls">
                                     <select id="cboProcRef" class="span12"></select>
                                 </div>
                             </div>
                         </div>

                       <%-- <div class="span3"></div>--%>
                         <div class="span1">
                             <label class="control-label">Tpo Proceso</label>
                         </div>
                         <div class="span2">
                             <div class="control-group">
                                 <div class="controls">
                                     <select id="cboProceso" class="span12"></select>
                                 </div>
                             </div>
                         </div>
                    </div>
                 </div>
<%--                 <div class="row-fluid">
                     <div class="span12">
                         <div class="span1">
                             <label class="control-label">Tpo Proceso</label>
                         </div>
                         <div class="span2">
                             <div class="control-group">
                                 <div class="controls">
                                     <select id="cboProceso" class="span12"></select>
                                 </div>
                             </div>
                         </div>
                         <div class="span9"></div>
                     </div>
                 </div>--%>
                 <div class="form-actions">
                     <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                     <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                 </div>
             </div>
         </div>
     </div>
</div>

<div id="SP" style="width: 900px; display: none; left: 45%;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4><i class="icon-reorder"></i>LISTA DE PROCEDIMIENTOS</h4>
    </div>
    <div class="modal-body" aria-hidden="true">
        <div class="row-fluid">
            <div class="span12" id="divmodal">
                <!--aki se carga el contenido por jquery-->
                <table id="tblbandeja" class="display  DTTT_selectable" border="0">
                    <thead>
                        <tr align="center">
                            <th>DB</th> 
                            <th>NOMBRE</th>
                            <th>DEFINER</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer"></div>
</div>

<script type="text/javascript" src="../../vistas/NC/JS/NCMBATC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMBATC.init();

    });
</script>
