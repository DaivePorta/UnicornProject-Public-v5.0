<%@ Control Language="VB" AutoEventWireup="false" CodeFile="GLLPROP.ascx.vb" Inherits="vistas_GL_GLLPROP" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA LETRAS PROTESTADAS POR PAGAR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=glmprot" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=gllprot" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

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
                                    <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresas">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span6">
                            <div class="control-group span2">
                                <label id="Label1" class="control-label" for="minfecha">
                                    Fec. Inicio:</label>
                            </div>
                            <div style="padding-left: 7px;" class="control-group span3">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="minfecha" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                            <div class="control-group span2">
                                <label id="Label3" class="control-label" for="maxfecha" style="text-align: center;">
                                    Fec. Fin:</label>
                            </div>

                            <div class="control-group span3">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="maxfecha" data-date-format="dd/mm/yyyy" maxlength="10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid" style="margin-bottom: 10px;">

                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboGirador">
                                    Girador</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboGirador" class="span12 empresa" data-placeholder="Empresas">
                                    </select>
                                </div>
                            </div>
                        </div>                       
                        <div class="span1">
                            <div class="control-group span2">
                                <div class="controls">
                                    <a id="btnBuscar" class="btn blue">BUSCAR</a>
                                </div>
                            </div>
                        </div>
                    </div>

                  </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>
                                    
                                    <th>GIRADOR
                                    </th>
                                    <th>NRO LETRA
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>FECHA EMISION
                                    </th>
                                    <th>FECHA VENCIMIENTO
                                    </th>                                    
                                    <th>FECHA PROTESTO
                                    </th>
                                    <th>NOTARIA
                                    </th>
                                    <th>USUARIO
                                    </th>
                                    
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
<script type="text/javascript" src="../vistas/GL/js/GLMPROT.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        GLLPROP.init();

    });
</script>