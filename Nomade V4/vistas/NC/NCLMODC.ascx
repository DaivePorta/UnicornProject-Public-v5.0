<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLMODC.ascx.vb" Inherits="vistas_NC_NCLMODC" %>
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
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;LISTA DE MODULOS CONTABLES</h4>
                <div class="actions">                   
                    <a class="btn green" href="?f=NCMMODC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLMODC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>

            <div class="portlet-body">                

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <table id="tblModulo" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb;">
                        <thead class="fondoHeader">
                            <tr>
                                <th>CÓDIGO</th>
                                <th>NOMBRE</th>
                                <th>DESCRIPCION</th>
                                <th>ESTADO</th>                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
    <div>
        <input type="hidden" id="hfCOD_NRESP" />
        <input type="hidden" id="hfCOD_RESP" />
        <input type="hidden" id="hfRESP" />
    </div>

</div>

<div id="detalleImpresion" style="display: block;"></div>
<div id="divDctoImprimir" style="display: none;"></div>

<script type="text/javascript" src="../vistas/NC/js/NCLMODC.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLMODC.init();
    });
</script>