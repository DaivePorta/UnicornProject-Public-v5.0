<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLPGAF.ascx.vb" Inherits="vistas_CP_CPLPGAF" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA DE PAGOS AFP</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=cpmpgaf" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=cplpgaf" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span6" data-column="3">
                     
                        <div class="span2"><b>EMPRESA:</b></div>
                        <div class="span8" id ="divEmpr">
                            <select id="cboEmpresa" class="empresa span12"> <option></option></select>
                        </div>

                    </div>

                     <div class="span6">
                     
                        <div class="span2"><b>FEC. INICIO:</b></div>
                        <div class="span3"><input class="span10" type="text" id="minfecha" name="minfecha" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"></div>
                        <div class="span2"><b>FEC. FIN:</b></div>
                        <div class="span3"><input class="span10" type="text" id="maxfecha" name="maxfecha" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"></div>
                    </div>

                </div>

                  <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_gir" class="span6" data-column="0">
                     
                        <div class="span2"><b>AFP:</b></div>
                        <div class="span8" id="divAfp">
                            <select id="cboAfp" class="span12"> <option></option></select>
                        </div>

                    </div>

                    <div class="span6">
                         <button class="btn blue fill" type="button">Filtrar&nbsp;<i class="icon-filter"></i></button>
                    </div>

                  </div>

                <div class="row-fluid">
                    <div class="span12" id="divTbl">
                        <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                            <thead>
                                <tr>

                                    <th>PERIODO
                                    </th>
                                    <th>DESCRIPCION
                                    </th>
                                    <th>FECHA PAGO
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>INTERES
                                    </th>
                                    <th>ORIGEN
                                    </th>                                    
                                    <th>CAJA/BCO
                                    </th>
                                    <th>NRO DE OP
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
<script type="text/javascript" src="../vistas/CP/js/CPMPGAF.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLPGAF.init();

    });
</script>