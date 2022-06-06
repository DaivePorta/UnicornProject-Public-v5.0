<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMUNME.ascx.vb" Inherits="vistas_NM_NMMUNME" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>UNIDADES DE MEDIDA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmunme"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlunme"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodigo">
                                Código
                            </label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtcodigo" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox" checked />&nbsp;Activo
                            </div>
                        </div>
                    </div>
                    <div class="span2">
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
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcosu">
                                Código Sunat</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtcosu" class="span12" placeholder="Código Sunat" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkunvo" type="checkbox" checked />&nbsp;Unidad de Volumen
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcioninternacional">
                                Descripción Internacional</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtdescripcioninternacional" class="span12" placeholder="Descripción Internacional" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombrecorto">
                                Descripción Corta</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombrecorto" class="span12" placeholder="Descripción Corto" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cbo_tipo_unidad">
                                Tipo Unidad</label>

                        </div>
                    </div>
                    
                    <div class="span2">                        
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cbo_tipo_unidad" class="span12" data-placeholder="Tipo Unidad">
                                    <option value=""></option>                                    
                                    <option value="1">LIQUIDO</option>
                                    <option value="2">POR CANTIDAD</option>
                                    <option value="3">LONGITUD</option>
                                    <option value="4">MASA</option>
                                    <option value="5">AREA</option>
                                    <option value="6">ELECTRICIDAD</option>
                                    <option value="7">ESPECIAL</option>
                                    <option value="8">FISICA</option>
                                    <option value="9">FUERZA</option>
                                    <option value="10">LUZ</option>
                                    <option value="11">PESO</option>
                                    <option value="13">TEMPERATURA</option>
                                    <option value="14">TIEMPO</option>
                                    <option value="15">VELOCIDAD</option>
                                    <option value="16">VOLUMEN</option>
                                    <option value="0">NINGUNO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcunba">
                                Unidad Base</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcunba" class="span12" data-placeholder="Unidad Base">
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
<script type="text/javascript" src="../vistas/NM/js/NMMUNME.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMUNME.init();

    });
</script>
