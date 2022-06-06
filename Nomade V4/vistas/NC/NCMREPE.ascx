<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMREPE.ascx.vb" Inherits="vistas_NC_NCMREPE" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>AFP Y REGIMEN PENSIONARIO</h4>

                <div class="actions">
                    <a href="?f=ncmrepe" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclrepe" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">CÓDIGO</label>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" type="text" class="span12" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigoSunat">CÓDIGO SUNAT</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigoSunat" type="text" class="span12" maxlength="6" />
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div style="text-align: center;">
                            <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" />ACTIVO
                        </div>
                    </div>
                    <div class="span3">
                    </div>
                </div>
                <!-- FIN PRIMERA LINEA -->
                <!-- INICIO SEGUNDA LINEA -->
                <div class="row-fluid">
                    <!-- INICIO NOMBRE -->
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                PERSONA</label>

                        </div>
                    </div>
                    <!-- FIN NOMBRE -->
                    <!-- INICIO FECHA -->
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" disabled="disabled" class="span10" placeholder="Nombre de la persona." type="text" />
                                <a id="BuscaPJ" class="btn blue" data-toggle="modal"
                                    data-target="#muestralistap"><i class="icon-search"></i>&nbsp;</a>   
                            </div>
                        </div>
                    </div>

                    <!-- -->
                    
                    <div class="span6">
                        <div class="control-group">
                            <div class="controls">

                                        
                                &nbsp;TIPO &nbsp; &nbsp;<select id="cboTipo" class="combo m-wrap span6 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option value="1">AFP</option>
                                    <option value="2">ONP</option>
                                    <option value="3">OTROS</option>
                                </select>
                                <asp:HiddenField ID="HiddenField2" runat="server" />
                            </div>
                        </div>

                    </div>
                    <%--      <div class="span6">
                        <div class="control-group">
                            <div class="controls">
                                <select id="Select1" class="combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="HiddenField1" runat="server" />
                            </div>
                        </div>
                    </div>--%>
                    <!-- FIN FECHA -->
                </div>
                <!-- FIN SEGUNDA LINEA -->

                <!-- INICIO TERCERA LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtPension">DESCRIPCIÓN</label>
                        </div>
                    </div>

                    <div class="span8">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtPension"   type="text" class="span12" placeholder="Descripción." maxlength="150" />
                            </div>
                        </div>
                    </div>

                    <div class="span6">
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechainicio">FECHA INICIO</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechainicio" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtfechfin">FECHA FINAL</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" data-date-format="dd/mm/yyyy" class="span12" id="txtfechfin" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>




                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarPension();"><i class="icon-save"></i>Grabar</a>
                    <a href="?f=ncmrepe" class="btn"><i class="icon-remove"></i>Cancelar</a>
                </div>

            </div>
            <div id="muestralistap" style="width: 700px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">

                <div class="modal-content" id="ContenedorPersonas">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>

                        <div class="row-fluid">
                            <div class="span8">
                                <h3 id="myModalLabel">LISTA DE PERSONAS JURIDICAS</h3>
                            </div>
                            <div class="span3">
                                <a class="btn green" style="padding: 2px 8px;" href="javascript:editareps();"><i class="icon-pencil"></i>Nuevo</a>
                                <a class="btn red" style="padding: 2px 8px;" href="javascript:listareps();"><i class="icon-plus"></i>Listar</a>
                            </div>
                        </div>
                    </div>
                    <div id="divmodal" class="modal-body" aria-hidden="true">
                        <!--aki se carga el contenido por jquery-->
                    </div>
                </div>
            </div>
            <div id="MuestraModal" style="display: none;">

                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtDESCRIPCIONmodal">
                                DESCRIPCION</label>

                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtDESCRIPCIONmodal" class="span12" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span2">
                        <label class="control-label" for="txtrazonsocial">
                            Razón Social</label>
                    </div>
                    <div class="span6">
                        <div class="control-group">

                            <div class="controls">
                                <input type="text" class="span12" id="txtrazonsocial" placeholder="Razón Social" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row-fluid">

                    <div class="span2">
                        <label class="control-label" for="txtrucmodal">
                            RUC</label>
                    </div>

                    <div class="span6">
                        <div class="control-group">

                            <div class="controls">
                                <input class="span12" type="text" id="txtrucmodal" placeholder="RUC" />
                            </div>
                        </div>
                    </div>
                </div>




                <div class="form-actions">
                    <a id="grabarModalEPS" class="btn blue" href="javascript:creareps();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <button id="cerrarModalEPS" data-dismiss="modal" class="btn" type="button" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Cerrar</button>

                </div>
            </div>
        </div>
    </div>
</div>
<%-- se usa un hidden para poder almacenar el codigo de usuario --%>
<asp:HiddenField ID="hfCodigoUsuario" runat="server" />
<asp:HiddenField ID="hfPDIM" runat="server" />
<script type="text/javascript" src="../vistas/NC/js/NCMREPE.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMREPE.init();

    });
</script>
