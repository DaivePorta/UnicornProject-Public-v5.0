<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMEQUN.ascx.vb" Inherits="vistas_NM_NMMEQUN" %>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i> EQUIVALENCIA DE UNIDADES DE MEDIDA</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmequn"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlequn"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtequivalencia">
                                Base
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtequivalencia" class="span8" type="text" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcbase" class="span12" data-placeholder="Unidad Base" >
                                    <option></option>

                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcequivalente">
                                Equivalen A
                            </label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="Text1" value="1" class="span8" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="slcequivalente" class="span12" data-placeholder="Unidad Equivalente" >
                                    
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span5">
                        <div class="control-group" align="center">
                            <label id="textoanidado" class="control-label">
                                <span id="base"></span>
                                <span id="nbase"></span>
                                <span id="equi" style="display:none;"> = 1</span>
                                <span id="nequi"></span>
                            </label>
                        </div>
                    </div>
                 
                </div>
                
                
                <div class="form-actions">
                    <button type="button" id="grabar" class="btn blue" onclick="javascript:Crear();"><i class="icon-save"></i>&nbsp;Grabar</button>
                    <button type="button" class="btn" onclick="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="cbounme" value=""/>
<input type="hidden" id="hdbase" value=""/>
<input type="hidden" id="hdequi" value=""/>

<script type="text/javascript" src="../vistas/NM/js/NMMEQUN.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMEQUN.init();

    });
</script>