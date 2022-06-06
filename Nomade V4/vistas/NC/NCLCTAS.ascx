<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCTAS.ascx.vb" Inherits="vistas_NC_NCLCTAS" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmctas" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclctas" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12" data-placeholder="EMPRESA">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Plan de Cuentas</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboPC" class="span12" data-placeholder="Plan de Cuentas">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Niveles</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNiveles" class="span12" data-placeholder="Niveles">
                                    <option value=" ">TODOS</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

               <div>
				<a id="btnVerResp" class="btn green">Mostrar / Ocultar Columnas</a>
                <a href="#" class="toggle-vis" data-column="0">CODIGO</a>  -  
                <a href="#" class="toggle-vis" data-column="1">NOMBRE CUENTA</a>  -  
                <a href="#" class="toggle-vis" data-column="2">CLASE</a>  -  
                <a href="#" class="toggle-vis" data-column="3">NIVEL</a>  -  
                <a href="#" class="toggle-vis" data-column="4">C.COSTO</a>  -  
                <a href="#" class="toggle-vis" data-column="5">DIF.CAMBIO</a>  - 
                <a href="#" class="toggle-vis" data-column="6">ACT.FLUJO</a>  - 
                <a href="#" class="toggle-vis" data-column="7">ESTADO</a>
			  </div>

                <div class="row-fluid" style="margin-top:10px;">
                    <table id="tblPlanCuentas" class="display DTTT_selectable" border="0">
                        <thead>
                            <tr>
                                <th>CODIGO
                                </th>
                                <th>NOMBRE CUENTA
                                </th>
                                <th>CLASE
                                </th>
                                <th>NIVEL
                                </th>
                                <th>C.COSTO
                                </th>
                                <th>DIF.CAMBIO
                                </th>
                                <th>ACT.FLUJO
                                </th>
                                <th>ESTADO
                                </th>
                                <th>CTLG_CODE
                                </th>
                                <th>NIPC_CODE
                                </th>
                                <th>CUCO_CODE
                                </th>
                                <th>ID
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <asp:HiddenField ID="hfObjPlanCuentas" runat="server" />                                                       
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCTAS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLCTAS.init();
       
    });
</script>
