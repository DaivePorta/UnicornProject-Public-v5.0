<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMFAVO.ascx.vb" Inherits="vistas_NC_NCMFAVO" %>

    <style>
        .frame {
        width:975px;
        height:580px;
        border:none;
        -moz-transform: scale(0.69);
        -moz-transform-origin: 0 0;
        -o-transform:scale(0.69);
        -o-transform-origin: 0 0;
        -webkit-transform:scale(0.69);
        -webkit-transform-origin: 0 0;
        }


    </style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ESTABLECER VISTAS FAVORITAS</h4>
                <div class="actions">
                  
                </div>

            </div>
            <div class="portlet-body">

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtcodvista">
                                Código Vista</label>

                        </div>
                    </div>

                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                              <select id="cboVista" data-placeholder="Buscar Vista..." class="span12">
                                        <option></option>
                               </select>
                   
                            </div>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="contrl-group">
                            <div class="controls">
                                <button id="abuscar" type="button" disabled="disabled" data-toggle="modal" data-target="#muestraVistaPrev" class="btn purple"><i class="icon-eye-open"></i> Vista previa</button>
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtnombre">
                                Nombre Vista</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtnombre" class="span12" placeholder="Nombre de vista" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txttipo">
                                Tipo</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txttipo" class="span12" placeholder="REPORTE,MANTENIMIENTO,CONSULTA" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>

                </div>
                <!---fin linea -->

                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:_CrearFavoritos();"><i class="icon-plus"></i> Agregar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- EMPIEZA DIVISION PARA FAVORITOS-->
<div class="row-fluid" id="sortable_portlets">
</div>

<!-- FIN FAVORITOS-->

<div id="muestraVistaPrev" style="width: 700px; display: none;"  class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" >

    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h4 id="myModalLabel"></h4>
        </div>
        <div id="divmodal" class="modal-body" aria-hidden="true" style="overflow: hidden;" >
            <!--aki se carga el contenido por jquery-->

             <iframe class="frame"></iframe>

            <div style="
    display: block;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(219, 78, 78);
    opacity: 0;
"></div>
        </div>
    </div>
</div>



<script type="text/javascript" src="../vistas/NC/js/NCMFAVO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        defineVariable(1);
        NCMFAVO.init();
        CargarFavoritos();
        fillCboVistaFavoritos();
    });
</script>
