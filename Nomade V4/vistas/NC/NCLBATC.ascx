<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLBATC.ascx.vb" Inherits="vistas_NC_NCLBATC" %>
<div class="row-fluid">
    <div class="span12">
         <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>LISTA DE PROCESOS MATRICULADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=NCMBATC" class="btn green"><i class="icon-plus"></i>Nuevo</a> 
                    <a href="?f=NCLBATC" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                         <div class="row-fluid">
                              <%--Se empieza crear el arbol--%>
                             <div id="jqxTree">

                             </div>
                         </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NC/js/NCMBATC.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLBATC.init();
    });
</script>