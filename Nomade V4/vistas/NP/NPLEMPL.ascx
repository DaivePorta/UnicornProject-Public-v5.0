<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPLEMPL.ascx.vb" Inherits="vistas_NP_NPLEMPL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=npmempl" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nplempl" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                 <div class="row-fluid" style="margin-bottom: 10px;">

                     <div class="span1">
                         <div class="control-group">
                             <label id="Label1" class="control-label" for="cboEmpresa">
                                 Empresa:</label>
                         </div>
                     </div>
                     <div class="span4">
                         <div class="control-group">
                             <div class="controls">
                                 <select id="cboEmpresa" class="span12" data-placeholder="Seleccione Empresa">
                                 </select>
                             </div>
                         </div>
                     </div>

                     <div class="span1">
                         <div class="control-group">
                             <label id="Label2" class="control-label" for="cboSucursal">
                                 Sucursal:</label>
                         </div>
                     </div>
                     <div class="span4">
                         <div class="control-group">
                             <div class="controls">
                                 <select id="cboSucursal" class="span12" data-placeholder="Seleccione Sucursal">
                                 </select>
                             </div>
                         </div>
                     </div>                     
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblEmpleados" border="0" class="display DTTT_selectable">
                            <thead>
                                <tr> 
                                    <th>EMPLEADO
                                    </th>
                                    <th>DNI
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>SUCURSAL
                                    </th>    
                                    <th>CARGO
                                    </th>                                      
                                    <th>ESTADO
                                    </th>                                                                                                              
                                    <th>REG. SALUD
                                    </th>  
                                    <th >CTLG_CODE
                                    </th>                              
                                </tr>
                            </thead>
                        </table>                       
                        <asp:HiddenField ID="hfObjPersona" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NP/JS/NPMEMPL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NPLEMPL.init();
    });
</script>