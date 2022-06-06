<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMPRDI.ascx.vb" Inherits="vistas_NM_NMMPRDI" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACIÓN PRECIO DE DISTRIBUIDOR</h4>               
            </div>

            <div class="portlet-body" id="content_precio_distribuidor">
                <!-- primera linea --->

                <div class="row-fluid">                    
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>             
                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtRango">
                                Rango a Asignar al Distribuidor</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <div class="span10">
                                    <select id="cbo_rango" name="cbo_rango" class="limpiar combo m-wrap span12 required" data-placeholder="Seleccionar Rango" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="span2">
                                    <a class="btn" id="info_btnf"><span ><i style="color: #888; cursor: help; font-size: 18px; vertical-align: middle;" class="icon-question-sign"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="row-fluid" id="bloqueInfo" style="margin-top: 5px; display: none;">
                    <div class="span12">
                        <div class="form-actions" style="margin-top: 0">
                            <p style="font-style: italic; margin-bottom: 0px;">* Es el Rango de precios que se tomará en cuenta para venderle al distribuidor desde uno hasta el Limite Superior de ese rango.</p>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtLimite">
                                Límite Cantidad Superior</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtLimite" class="span6" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cbo_tipo_unidad">
                                Descuento sobre Límite</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <div class="span6">
                                    <input id="txtDescuento" type="number" class="span12" name="txtDescuento" value="0" min="0" max="100" maxlength="3" oninput="this.value=this.value.slice(0,this.maxLength||1/1);this.value=(this.value < 1) ? 0 : this.value;" required>
                                </div>
                                <div class="span2" style="padding-top: 3%">
                                    <label > % </label>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>                

                <!---fin linea -->



                <div class="form-actions">
                    <button type="button" id="grabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" id="actualizar" class="btn blue" style="display: none;"><i class="icon-pencil"></i>&nbsp;Actualizar</button>
                    <button type="button" id="cancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NM/js/NMMPRDI.js?<%=aleatorio%>"></script>
<script>
    jQuery(document).ready(function () {        
        NMMPRDI.init();
    });
</script>