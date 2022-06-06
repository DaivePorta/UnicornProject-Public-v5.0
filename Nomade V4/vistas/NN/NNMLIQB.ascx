<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NNMLIQB.ascx.vb" Inherits="vistas_NN_NNMLIQB" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LIQUIDACION BENEFICIOS EMPLEADO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nnmliqb"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nnlliqb"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
               
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
                    <div class="span12">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hfempresa" runat="server" />
                                    <asp:HiddenField ID="HiddenField1" runat="server" Value="2" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcSucural">
                                    Establecimiento</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcSucural" class="bloquear combo m-wrap span12 required" name="slcSucural" data-placeholder="Seleccionar Establecimiento" tabindex="1">
                                        <option></option>
                                    </select>
                                    <asp:HiddenField ID="hf_establecimiento" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <!-- FIN PRIMERA LINEA -->

                <div class="row-fluid">
                    <div class="span5"></div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEmpleado" class="control-label" for="cboEmpleado">
                                Empleado:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>                    

                    <%--<div class="span4">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txt_empleado" class="m-wrap span12" type="text" placeholder="Buscar Empleado ...">
                            </div>
                        </div>
                    </div>--%>
                    <div class="span2">
                        <a class="btn purple" style="border-radius: 10px!important;" id="btn_consultar"><i class="icon-search"></i>&nbsp;Consultar</a>
                    </div>
                </div>

                <br />


                <div id="mostrar" style="display: none">

                    <div class="row-fluid">
                        <div class="span12" id="div_datos_empleado">

                            <fieldset>
                                <legend>DATOS EMPLEADO
                                </legend>
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="nombres" style="font-weight: 600;">NOMBRES</label>
                                        </div>

                                    </div>
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="documento" style="font-weight: 600;">DNI</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="fecha_cese" style="font-weight: 600;"></label>
                                        </div>
                                    </div>
                                </div>


                            </fieldset>

                        </div>
                    </div>


                    <div class="row-fluid">
                        <div class="span12" id="div_datos_contratos">

                            <fieldset>
                                <legend>DATOS BASICOS ULTIMO CONTRATO
                                </legend>
                                <div class="row-fluid">
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="nro_contrato" style="font-weight: 600;">N° CONTRATO</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="fec_inicio" style="font-weight: 600;">FECHA INICIO</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="fec_fin" style="font-weight: 600;">FECHA FIN</label>
                                        </div>
                                    </div>
                                    <div class="span3">
                                        <div class="control-group alert alert-info">
                                            <label class="control-label" id="estado" style="font-weight: 600;">ESTADO</label>
                                        </div>
                                    </div>
                                </div>


                            </fieldset>

                        </div>
                    </div>


                    <div class="row-fluid">
                        <div class="span12" id="div_liquidacion">

                            <fieldset>
                                <legend>LIQUIDACION
                                </legend>
                                <div class="row-fluid" id="error" style="display: none;">
                                    <div class="span12">
                                        <div class="control-group alert alert-error">
                                            <label class="control-label" id="Label1" style="text-align: -webkit-center;">CONTRATO ESTA VIGENTE&nbsp;&nbsp;ó&nbsp;&nbsp;NO POSEE CONTRATO&nbsp;&nbsp;<i class="icon-remove-sign"></i> </label>
                                        </div>
                                    </div>

                                </div>
                              
                              
                                <div class="row-fluid">
                                    <div class="span8">
                                        <div class="row-fluid">
                                             <div class="span10"></div>
                                             <div class="span1" id="div_vac_gozadas" style="display: block;">
                                        <a class="btn blue" style="border-radius: 10px!important; " id="btn_vac_gozadas"><i class="icon-eye-open"></i>&nbsp;Vacaciones</a>
                                    </div>
                                        </div>
                                    </div>
                                    
                                    <div class="span1" id="div_visualizar" style="display: none;">
                                        <a class="btn red" style="border-radius: 10px!important; " id="btn_visualizar"><i class="icon-search"></i>&nbsp;Visualizar</a>
                                    </div>
                                    <div class="span1" id="div_liquidar" style="display: none;">
                                        <a class="btn green" style="border-radius: 10px!important;" href="javascript:ShowAceptar();" id="btn_liquidar"><i class="icon-money"></i>&nbsp;Liquidar</a>
                                    </div>
                                    <div class="span1"  style="display: none;" >
                                           <asp:Button class="btn green" ID="btnliqbe" CssClass="btnLibroPDF btn green" runat="server"    />
                                    </div>
                                </div>
                                <br />
                                    <div class="row-fluid" id="error_liq" style="display: none;">
                                    <div class="span12">
                                        <div class="control-group alert alert-success">
                                            <label class="control-label" id="Label2" style="text-align: -webkit-center;">CONTRATO LIQUIDADO!</label>
                                        </div>
                                    </div>

                                </div>
                                  <div class="row-fluid" id="success" style="display: none;">
                                    <div class="span12">
                                        <div class="control-group alert alert-success">
                                            <label class="control-label" id="Label3" style="text-align: -webkit-center;">LA LIQUIDACION SE COMPLETO CON EXITO &nbsp;&nbsp;<i class="icon-ok-sign"></i></label>
                                        </div>
                                    </div>

                                </div>
                                <br /><br />
                                 <div class="row-fluid" >
                    <div id="divHojaLiquidacion" style="overflow: scroll;height:450px; margin-bottom:20px;resize:vertical;display:none;">
                    </div>
                </div>
                            </fieldset>

                        </div>
                    </div>

                </div>

                
            </div>
        </div>

    </div>
</div>


<div id="MuestraModalAceptar"  class="modal hide fade" tabindex="-1" role="dialog" style="width: 27%;" aria-hidden="true" aria-labelledby="myModalLabel2">
    <div class="modal-content" id="modal2">
        <div class="modal-header" style="padding: 1px 15px; background: #F52727; color:#ffffff;">
             <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                                <i class="icon-remove"></i>
                            </button> 
            
            <h4 id="myModalLabel2"><i class="icon-warning-sign"></i>&nbsp;INFORMACION</h4>
        </div>
        <div class="modal-body" aria-hidden="true" style="text-align: center;font-family: sans-serif;font-size: large;">
       
            
            ¿Deseas realmente Liquidar ?
           
           
           

         
        </div>
        <div class="modal-footer" aria-hidden="true" style="text-align:center;">
            
                 
                    <a id="ok" class="btn blue" href="javascript:HideAceptar();" style="border-radius:7px !important;" ><i class="icon-ok"></i> Si</a>
                    <a id="no" class="btn red"  data-dismiss="modal"  style="border-radius:7px !important;"><i class="icon-remove"></i> No</a>
                    
                
            </div>
    </div>
</div>

<input type="hidden" id="hfpidm" />
<input type="hidden" id="hfest_contrato" />
<input type="hidden" id="hfest_LIQ" />
<input type="hidden" id="hfest_contrato_desc" />
<input type="hidden" id="hfnombres" />
<input type="hidden" id="hfdni" />
<input type="hidden" id="hfruc" />
<input type="hidden" id="hfnro_contrato" />
<input type="hidden" id="hffec_ini" />
<input type="hidden" id="hffec_fin" />
<input type="hidden" id="hffecha_cese" />
<asp:HiddenField ID="hfarchivo" runat="server" />



<script type="text/javascript" src="../vistas/NN/js/NNMLIQB.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NNMLIQB.init();
    });
</script>
