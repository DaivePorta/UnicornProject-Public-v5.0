<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMAFIG.ascx.vb" Inherits="vistas_NC_NCMAFIG" %>


<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPOS DE AFECTACIÓN DE IGV</h4>
                <div class="actions">
                    <a class="btn green" href="?f=ncmafig"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nclafig"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigo">
                                Código
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span2"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtcosu">
                                Código Sunat</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcosu" class="span12" placeholder="Código Sunat" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">
                                Descripción</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcion" class="span12" placeholder="Descripción" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_tipo_bien">
                                Tipo Bien</label>
                        </div>
                    </div>
                    
                    <div class="span3">                        
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cbo_tipo_bien" class="span12" data-placeholder="Tipo Bien" required>
                                    <option></option>
                                    <option value="GRA">GRAVADO</option>
                                    <option value="INA">INAFECTO</option>
                                    <option value="EXO">EXONERADO</option>
                                    <option value="EXP">EXPORTACION</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">
                    
                </div>
                <div class="row-fluid">
                    
                </div>


                <!---fin linea -->



                <div class="form-actions">
                    <button type="button" id="grabar" class="btn blue" onclick="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NC/js/NCMAFIG.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMAFIG.init();

    });
</script>