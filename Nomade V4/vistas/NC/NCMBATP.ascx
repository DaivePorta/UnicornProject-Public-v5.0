<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMBATP.ascx.vb" Inherits="vistas_NC_NCMBATP" %>
<div class="row-fluid">
    <div class="span12">
         <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE PROCESOS MATRICULADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMBATP" class="btn green"><i class="icon-plus"></i>Nuevo</a> 
                    <a href="?f=NCMBATP" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>


            <%--<div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2"><label>Fecha de Proceso</label></div>
                </div>
                <div class="span2">
                    <div class="control-group">
                          <div class="controls">
                                <input name="txtFechaProceso" type="text" id="txtFechaProceso"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                          </div>
                    </div>
                </div>
            </div>--%>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span1"><label>Fecha de Proceso</label></div>
                     <div class="span2">
                        <div class="control-group">
                              <div class="controls">
                                    <input name="txtFechaProceso" type="text" id="txtFechaProceso"  class="span10 obligatorio"  data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy">
                              </div>
                        </div>                         
                    </div>
                  </div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <div class="span6">
                             <div class="row-fluid">
                                  <%--Se empieza crear el arbol--%>
                                 <div id="jqxTree">

                                 </div>
                             </div>
                        </div>
                        <div class="span6" id="contenedor">
                            <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
                                <div class="span12">
                                    <div class="row-fluid">
                                        <div class="span12">
                                               <label id="lblProceso" class="control-label"></label>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                         <div class="span12">
                                             <div style='margin-top: 10px; overflow: hidden;' id="jqxProgressBar"></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span4">
                            <a id="procesar" class="btn blue"><i class="icon-find"></i>Procesar</a>
                        </div>
                        <div class="span8"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

 <div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajemodal">
        <p id="P1">        
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano" data-dismiss="modal" class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>

 <%--<script type="text/javascript" src="../recursos/plugins/jqwidgets/jqxprogressbar.js"></script>--%>
 <script type="text/javascript" src="../vistas/NC/js/NCMBATP.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMBATP.init();
    });
</script>
