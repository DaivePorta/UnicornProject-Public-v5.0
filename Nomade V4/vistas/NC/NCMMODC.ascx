<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMMODC.ascx.vb" Inherits="vistas_NC_NCMMODC" %>
<style type="text/css">
    @media print {

        .navbar-inner {
            display: none !important;
        }

        .page-sidebar {
            display: none !important;
        }

        .footer {
            display: none !important;
        }

        .page-content {
            margin-left: 0px !important;
        }

        #gritter-notice-wrapper {
            display: none !important;
        }

        /*#ventana parent {*/
        #contenedor {
            display: none !important;
        }

        /*.breadcrumb parent{*/
        #contenedorBreadcrumb {
            display: none !important;
        }

        .page-container {
            margin-top: 0px !important;
        }

        #divDctoImprimir {
            display: block !important;
            width: 100% !important;
            font-size: 10px !important;
            line-height: 11px !important;
            /*font-family: 'Lucida Console' !important;*/
            font-family: Arial !important;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .chat-window {
            display:none;
            margin:0px !important;
        }
    }
</style>
<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;MODULO CONTABLE</h4>
                <div class="actions">                    
                    <a class="btn green" href="?f=NCMMODC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLMODC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtCodigo">
                                Código</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtCodigo" class="span3" style="text-align: left" disabled="disabled" />
                            </div>
                        </div>
                    </div> 
                    <div id="estado" style="display:none;">
                        <div class="span1">
                            <div class="control-group ">
                                <label class="control-label" for="chkEstado">
                                Activo</label>
                             </div>
                        </div>

                         <div class="span1" >
                           <div class="control-group">
                               <div class="controls">
                                    <input id="chkEstado" type="checkbox" checked />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtNombre">
                                Nombre</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtNombre" class="span12" style="text-align: left"/>
                            </div>
                        </div>
                    </div>                                        
                </div>
                                               
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtDescripcion">
                                Descripción</label>
                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <textarea class="form-control span12" rows="5" id="txtDescripcion"></textarea>
                            </div>
                        </div>
                    </div>                                        
                </div>

                <div id="divNemo" style="display:none;">
                <br />
                <div class="row-fluid">
                    <div class="span2">
                    </div>
                    <h4 style="text-decoration: underline">Mnemónico</h4>
                </div>
                <br />
                <!-- INICIO DE CUARTA LINEA-->
                
                    <div class="row-fluid">
                        <div class="span1 offset2">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa:</label>
                            </div>
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <div class="controls" id="Div1">
                                    <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>  
                        
                         <div class="span1" style="text-align:right">
                            <div class="control-group">
                                <label class="control-label" for="txtValor">
                                    Abrev:</label>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="txtValor" class="span12" style="text-align: left" maxlength="3"/>
                                </div>
                            </div>
                        </div>
                        <div class="span1">
                            <button id="btnAddNemo" class="btn purple" type="button"><i class="icon-plus" style="line-height: initial"></i></button>
                        </div>

                    </div>


                    <div class="row-fluid">
                        <div class="span8 offset2">
                            <table id="tblDetalleNemo" class="display DTTT_selectable bordered dataTable no-footer" border="0">
                                <thead>
                                    <tr>
                                        <th>EMPRESA
                                        </th>
                                        <th>ABREVIATURA
                                        </th>
                                        <th>#
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>                            
                        </div>
                    </div>

                </div>

                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnActualizar" class="btn blue" style="display: none"><i class="icon-pencil"></i>&nbsp;Modificar</a>
                    <a id="cancelar" class="btn" onclick="Cancelar();"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->   

</div>

<div id="detalleImpresion" style="display: block;"></div>
<div id="divDctoImprimir" style="display: none;"></div>

<script type="text/javascript" src="../vistas/NC/js/NCLMODC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMMODC.init();
    });
</script>