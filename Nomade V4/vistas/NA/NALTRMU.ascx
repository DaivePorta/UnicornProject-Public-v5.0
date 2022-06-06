<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NALTRMU.ascx.vb" Inherits="vistas_NA_NALTRMU" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TRANSFERENCIA DE SALIDA MULTIPLE A ALMACENES</h4>
                <div class="actions">
                    <a class="btn green" onclick=""><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="#"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblAlmacenOrigen" class="control-label" for="cboAlamacenOrigen">
                                Almacén Origen</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboAlmacenOrigen" class="span12" data-placeholder="Almacenes">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                                <label id="Label1" class="control-label" for="txtFecha">Fecha</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div  class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFecha" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboRegistro">
                                Doc. Registro</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboDocRegistro" class="span12" data-placeholder="Seleccione">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtSerie">
                                Serie</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">                                
                                <select id="cboSerie" class="span12" data-placeholder="Seleccione">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <button type="button" id="btnBusquedaAvanz" class="btn btn-link" data-ver="false"><i id="iconAvanz" class="icon-chevron-down"></i>  Busqueda Avanzada....</button>
                            </div>
                        </div>
                    </div> 
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnFiltrar" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnTransferir" class="btn green">TRANSFERIR</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="row-fluid bavanzado" >
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtGrupo">
                                Grupo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboGrupo" name="cboGrupo" class="m-wrap span12 required" data-placeholder="Seleccionar Grupo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtSubGrupo">
                                Sub Grupo</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="row-fluid">
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls" id="divCboSubgrupo">
                                        <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>

                </div>
                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divTblPrecios">
                        <%--Cargar Tabla--%>
                    </div>
                    

                   

                </div>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NA/js/NALTRMU.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NALTRMU.init();
    });
</script>