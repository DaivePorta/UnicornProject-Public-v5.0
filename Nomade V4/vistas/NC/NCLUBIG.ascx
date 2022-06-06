<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLUBIG.ascx.vb" Inherits="vistas_NC_NCLUBIG" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA UBIGEOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmubig" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nclubig" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label">
                                País
                            </label>
                            <div class="controls">
                                <select id="cboPais" class="span12" data-placeholder="País">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="row-fluid">
                    <div class="span12">
                        <div id="divBandejaUbigeo" class="span12">
                        </div>
                    </div>
                </div>
                <input id="hfUbigeo" type="hidden" />
                <input id="hfJsonPais" type="hidden" />
            </div>
        </div>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMUBIG.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLUBIG.init();
        
    });
</script>
