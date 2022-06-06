<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLRTEP.ascx.vb" Inherits="vistas_NC_NCLRTEP" %>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TARJETAS EMPRESARIALES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmrtep" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclrtep" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span5">
                     
                        <div class="span3"><b>EMPRESA:</b></div>
                        <div  class="span7"><select class="span12 empresa" data-placeholder="EMPRESA" id="filemp"><option></option></select></div>

                    </div>

                      <div id="filter_cta" class="span5">
                     
                        <div class="span3"><b>CUENTA:</b></div>
                        <div  class="span8"><select class="span12" id="filcta" data-placeholder="CUENTA"><option></option></select></div>

                    </div>

                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>DESCRIPCION
                                    </th>
                                    <th>NUMERO
                                    </th>
                                    <th>PERSONA RESPONSABLE
                                    </th>
                                    <th>TIPO
                                    </th>
                                    <th>ESTADO
                                    </th>
                                  
                                </tr>
                            </thead>
                        </table>                     
               
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMRTEP.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLRTEP.init();

    });
</script>
