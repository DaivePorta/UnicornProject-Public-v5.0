<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMLICO.ascx.vb" Inherits="vistas_CT_CTMLICO" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;LIBROS CONTABLES</h4>
                <div class="actions">
                    <a href="?f=CTMLICO" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=CTLLICO" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <%-- Inicio Fila1 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodLibro" style="font-weight: bold">Código</label>
                                </div>
                            </div>
                            <div class="span2">
                                <div  class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtCodLibro" class="span12 derecha" placeholder="CÓDIGO" maxlength="4" disabled/>
                                    </div>
                                </div>
                            </div>

                            <div class="span1"></div>

                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodSunat">Código Sunat</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div  class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtCodSunat" class="span12 derecha" placeholder="COD SUNAT" maxlength="6"/>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div> 

                    <div class="span6">
                        <div class="row-fluid">                            
                            <div class="span2">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input type="checkbox" id="chboEstado" checked/>
                                        Activo
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>                
                </div>
                <%-- Fin Fila1 --%>

                <%-- Inicio Fila2 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtDescripcion">Descripción</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div  class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtDescripcion" class="span12" placeholder="DESCRIPCIÓN" maxlength="150"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       

                    <div class="span6">
                        <div class="row-fluid">
                        </div>
                    </div>     
                </div>
                <%-- Fin Fila2 --%>

                <%-- Inicio Fila3 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtDescripCorta">Descrip Corta</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div  class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtDescripCorta" class="span12" placeholder="DESCRIP CORTA" maxlength="50"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       

                    <div class="span6">
                        <div class="row-fluid">
                        </div>
                    </div>     
                </div>
                <%-- Fin Fila3 --%>
                                
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue" ><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnCancelar" class="btn" ><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CT/js/CTMLICO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMLICO.init();
    });
</script>
