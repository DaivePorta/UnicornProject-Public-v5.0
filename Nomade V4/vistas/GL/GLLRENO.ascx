<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLLRENO.ascx.vb" Inherits="vistas_GL_GLLRENO" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LETRAS RENOVADAS POR COBRAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=glmRENO" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=gllRENO" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid">

                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 empresa" tipo="C" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>CODIGO
                                    </th>
                                    
                                    <th>NUMERO
                                    </th>
                                    <th>FECHA EMISION
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>GLOSA</th>
                                </tr>
                            </thead>
                        </table>                        
                        <asp:HiddenField ID="hfObjJSON" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/GL/js/GLMRENO.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLLRENO.init();

    });
</script>