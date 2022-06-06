﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLRECE.ascx.vb" Inherits="vistas_NF_NFLRECE" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE RECEPCIÓN SOPORTE</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmrece"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=nflrece"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <input type="hidden" id="hf_opcion" value="3" />
                <div class="alert alert-error hide">
                              <button class="close" data-dismiss="alert"></button>
                              Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                           </div>
                <div class="alert alert-success hide">
                              <button class="close" data-dismiss="alert"></button>
                              Datos ingresados correctamente.
                           </div>
                <!-- primera linea --->
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="controlempresa">
                                <select id="slcEmpresa" name="slcEmpresa" class="combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls" id="Div1">
                                <select id="slcSucural" name="slcSucural" class="combo m-wrap span12 required" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" style="display: inline-block;">Mostrar Terminados</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <input type="checkbox" id="chkTodos" name="chkTodos"/>
                        </div>
                    </div>
<%--                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboestado">
                                Estado</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboestado" name="cboestado" class="m-wrap span12 combo required">
                                    <option value="0000">Todos</option>
                                    <option value="0001">Solicitado</option>
                                    <option value="0002">Aprobado</option>
                                    <option value="0003">Pagado</option>
                                    <option value="0004">Vencido</option>
                                    <option value="0005">Rendido</option>
                                    <option value="0006">Rechazado</option>
                                </select>
                            </div>
                        </div>
                    </div>--%>

                    <%--<div class="span1">
                        <a class="btn purple" href="javascript:listarAprobados();"><i class="icon-search"></i> Buscar</a>
                    </div>--%>

                    </div>
                <!-- FIN PRIMERA LINEA -->
                <div class="row-fluid">
                    <div style="width:100%;" id="tblDatos">

                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="alert alert-success" style="background-color:#90D101;color:#000;text-align:center;">
									<strong>RECEPCIONADO</strong>
								</div>
                    </div>
                    <div class="span2">
                        <div class="alert alert-success" style="background-color:#D24726;color:#000;text-align:center;">
									<strong>DIAGNOSTICADO</strong>
								</div>
                    </div>
                    <div class="span2">
                        <div class="alert alert-success" style="background-color:#F5B400;color:#000;text-align:center;">
									<strong>EN REPARACIÓN</strong>
								</div>
                    </div>
                    <div class="span2">
                        <div class="alert alert-success" style="background-color:#00ffff;color:#000;text-align:center;">
									<strong>REPARADO</strong>
								</div>
                    </div>
                </div>
            </div>
        </div>
</div>
</div>
<script type="text/javascript" src="../vistas/NF/js/NFMRECE.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLRECE.init();
    });
</script>
