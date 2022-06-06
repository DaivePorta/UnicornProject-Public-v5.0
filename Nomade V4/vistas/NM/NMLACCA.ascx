<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLACCA.ascx.vb" Inherits="vistas_NM_NMLACCA" %>

<div class="row-fluid" id="contenedor">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>BÚSQUEDA DE ACREDITACIÓN DE CALIDAD </h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:imprimirListaDctosVenta();"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a class="btn green" href="?f=NMMACCA"><i class="icon-plus"></i>&nbsp;Nuevo</a>                     
                    <a href="?f=NMLACCA" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>

            <div class="portlet-body">
                <%--            <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>--%>
                <div class="row-fluid">
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <div id="divDocumento">
                        <%--Cargar Tabla--%>
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

<div id="detalleImpresion" style="display: block;">
</div>

<div id="divDctoImprimir" style="display: none;">
</div>

<script type="text/javascript" src="../vistas/NM/js/NMMACCA.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLACCA.init();
    });
</script>
