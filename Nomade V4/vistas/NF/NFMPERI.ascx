<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFMPERI.ascx.vb" Inherits="vistas_NF_NFMPERI" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>PERIODOS TRIBUTARIOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nfmperi"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nflperi"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
                <div class="row-fluid">
                  
                    <div class="span12">
                        <div class="alert alert-block alert-info fade in">									
						    <h4 class="alert-heading">INFO!</h4>
						    <p>
							    Para crear los periodos tributarios de todas las empresas del consorcio, por favor
							    dar click en el botón "Crear Periodos".
						    </p>
						    <p>
							    <a class="btn purple" id="btn_modal" >Crear Periodos</a> 
						    </p>
					    </div>                        
                    </div>    
                </div>
                <!-- FIN PRIMERA LINEA -->

            </div>
        </div>
    </div>
</div>
<!-- FIN CUADRO PARA LA FORMA-->

<div id="PerNoExiste" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h3 id="myModalLabel">Registro de Periodos</h3>
    </div>
    <div class="modal-body">
        <p>            
            ¿Desea registrar los periodos para todas las empresas del consorcio?
       </p>
    </div>
    <div class="modal-footer">
        <button type="button" onclick="javascript:MuestraSunat();" id="btn_crear" data-dismiss="modal" class="btn black" >
            Crear
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMPERI.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFMPERI.init();
    });
</script>
