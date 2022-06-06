<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMDETR.ascx.vb" Inherits="vistas_NC_NCMDETR" %>

<style>
    div#menuEditar {
        width:100px;
        
        background-color:whitesmoke;
        position: absolute;
        z-index: 1151;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #888;
        box-shadow: 0 0 5px #298ACA;
       
    }

</style>

    <div id="modalconfir" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Confirmación</h3>
    </div>
    <div class="modal-body" id="mensajemodal">
        <p id="mensajeModal">
         
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" id="rptano" data-dismiss="modal" class="btn">No</button> 
       <button  type="button" id="rptasi"  class="btn blue">Si</button>
    </div>
</div>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO DETRACCION</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmdetr"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=ncldetr"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtcodigo">Código</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtCodigo" class="span12" disabled="disabled" type="text" maxlength="4" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="txtAnexo">Anexo</label>

                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcAnexo" class="span12">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>

                                </select>
                                     
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div style="text-align: center;">
                            <input id="chkactivo" type="checkbox" name="activo" checked="checked" value="A" />Activo
                        </div>
                    </div>

                    <div class="span1">
                         <div class="control-group ">
                            <label class="control-label" for="txtCodSunat">Cod. Sunat</label>

                        </div>
                    </div>

                     <div class="span1">
                         <div class="control-group ">
                            <div class="controls">
                            <input id="txtCodSunat" type="text" checked="checked" class="span12" maxlength="4" />
                       </div></div>
                    </div>
                 
                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDefinicion">
                                Definición</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtDefinicion" class="span12" placeholder="Definición del tipo detración"  type="text" maxlength="50" />
                            </div>
                        </div>
                    </div>

                     <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcTipoExistencia">
                                Tipo Existencia</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcTipoExistencia" class="span12" data-placeholder="Existencia">
                                 </select>
                            </div>
                        </div>
                    </div>

                    

                </div>

                <div class="row-fluid">
                        <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcTipoExistencia">
                                Información</label>
                        </div>
                    </div>

                    <div class="span9">

                         <div class="control-group">
                            <div class="controls">
                                <textarea name="txt_info" type="text" rows="5" id="txt_info" class="span12"></textarea>
                            </div>
                        </div>

                    </div>

                </div>


                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>

                <!---fin sgda linea -->

                <!---inicio tercera-->

               <div id="detalle_detraccion" style="display:none">
                    <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechai">Fecha Inicio</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text"  data-date-format="dd/mm/yyyy" class="span10" id="txtfechai" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <label>Fecha Fin</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text"  data-date-format="dd/mm/yyyy" class="span10" id="txtfechat" placeholder="dd/mm/yyyy"  />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtPorcentaje">
                                Porcentaje</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtPorcentaje" class="span6" placeholder="0"  type="text" maxlength="7" />&nbsp;%
                            </div>
                        </div>
                    </div>

                     <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnagregar" class="btn blue" href="javascript:Confirmacion();"><i class="icon-plus"></i> </a>
                            </div>
                        </div>
                    </div>

                </div>

                 <div class="row-fluid">
                     <div class="span3"></div>
                     <div class="span6">

                         <table id="tblDetrDetalle" border="1" class="display DTTT_selectable" style="display:none;">
                             <thead>
                                  <tr>
                                     <th>FECHA INICIO
                                     </th>
                                     <th>FECHA FIN
                                     </th>
                                     <th>PORCENTAJE (%)
                                     </th>
                                     <th>ESTADO
                                     </th>
                                  </tr>
                              </thead>
                        </table>    

                     </div>

                 </div>

                <!-- FIN TERCERA LINEA -->
                </div>
                
              


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Crear();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>

                </div>
                <asp:HiddenField ID="hfCodigoUsuario" runat="server" />
                <asp:HiddenField ID="hfIndiceDetalle" runat="server" />
              
            
    </div>
    
       </div>
    </div>
 </div>

<div id="menuEditar" style="display:none;">
                
            <span><button type="button" class="btn blue span12" id="btnEditar" ><i class="icon-pencil"></i> Editar</button></span>

</div>


    <script type="text/javascript" src="../../vistas/NC/JS/NCMDETR.js"></script>
    <script>

        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
            

            $(document).click(function (e) { if (e.button == 0) { $("#menuEditar").css("display", "none"); } });
            $(document).keydown(function (e) { if (e.keyCode == 27) { $("#menuEditar").css("display", "none"); } });


            NCMDETR.init();

        });
    </script>
