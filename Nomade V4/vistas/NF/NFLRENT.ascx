<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLRENT.ascx.vb" Inherits="vistas_NF_NFLRENT" %>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
             <div  class="portlet-title">
                 <h4><i class="icon-reorder"></i>Reporte de la Declaracion del Impuesto de la Renta</h4>
                 <div class="actions">
                     <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                     <a href="?f=nflunid" class="btn red"><i class="icon-list"></i>Listar</a>
                 </div>
             </div>

            <div class="portlet-body">
                 <div class="row-fluid">
                     <div class="span1">
                          <label class="control-label" for="slcAnio">Año</label>
                     </div>
                     
                     <div class="span2">
                         <div class="control-group">
                             <div class="controls">
                                 <select class="span6" id="slcAnio">
                                    <option></option>
                                </select>
                             </div>
                         </div>
                     </div>

                     <div class="span1">
                          <label class="control-label" for="slcMes">Mes</label>
                     </div>
                     <div class="span2">
                         <div class="control-group">
                             <div class="controls">
                                 <input type="text" class="span6" id="slcMes" data-date-format="MM"/>
                                    
                             </div>
                         </div>
                     </div>
                     <div class="span2">
                         <a id="buscar" class="btn blue"><i class="icon-find"></i> Buscar</a>
                     </div>
                 </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span2">
                         <label id="NombreEmpresa" class="control-label"></label>
                     </div>
                </div>

                <div class="row-fluid" align="center" id="txtTitulo">
                   
                </div>
                 <div class="row-fluid" align="center" id="txtFecha">
                   
                </div>

                 <table id="tblBandeja" class="display  DTTT_selectable" border="0">
                     <thead>
                          <tr align="center">
                              <th>MES</th>
                              <th>BASE IMPONIBLE</th>
                              <th>PAGO A CUENTA</th>
                              <th>METODO</th>
                              <th>TASA</th>
                          </tr>
                     </thead>
                 </table>
                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    <div/>
</div>
</div>
 <script type="text/javascript" src="../vistas/NF/js/NFLRENT.js"></script>

<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLRENT.init();

    });
</script>

