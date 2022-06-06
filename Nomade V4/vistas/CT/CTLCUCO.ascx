<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTLCUCO.ascx.vb" Inherits="vistas_CT_CTLCUCO" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PLAN DE CUENTAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=CTMCUCO" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=CTLCUCO" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="cboEmpresa">Empresa</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12 ComboBox" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <label class="control-label" for="cboPlanContable">Plan Cont</label>
                        </div>
                    </div>

                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboPlanContable" class="span12 ComboBox" data-placeholder="Plan de Cuentas">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                </div>

                <div class="row-fluid">
                    

                    <%--<div class="span1">
                        <div class="control-group ">
                            <label>Nivel</label>
                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboNiveles" class="span12 ComboBox" data-placeholder="Niveles">
                                    <option value=" ">TODOS</option>
                                </select>
                            </div>
                        </div>
                    </div>--%>
                </div>

               <%--<div>
				<a id="btnVerResp" class="btn green">Mostrar / Ocultar Columnas</a>
                <a href="#" class="toggle-vis" data-column="0">CodEMPRESA</a>  -  
                <a href="#" class="toggle-vis" data-column="1">CodPlanCONTAB</a>  -  
                <a href="#" class="toggle-vis" data-column="2">CUENTA</a>  -  
                <a href="#" class="toggle-vis" data-column="3">NOMBRE CUENTA</a>  -  
                <a href="#" class="toggle-vis" data-column="4">CLASE</a>  -  
                <a href="#" class="toggle-vis" data-column="5">NIVEL</a>  -  
                <a href="#" class="toggle-vis" data-column="6">DIF.CAMBIO</a>  - 
                <a href="#" class="toggle-vis" data-column="7">ACT.FLUJO</a>  - 
                <a href="#" class="toggle-vis" data-column="8">C.COSTO</a>
                <a href="#" class="toggle-vis" data-column="9">ESTADO</a>
			  </div>--%>

                <div class="row-fluid" style="margin-top:10px;">
                    <table id="tblPlanCuentas" class="display DTTT_selectable" border="0">
                        <tfoot>
                            <tr>
                   
                                <th>CUENTA
                                </th>
                                <th>NOMBRE CUENTA
                                </th>
                                <th>CLASE
                                </th>
                                <th>NIVEL
                                </th>
                                <th>TIPO CAMBIO
                                </th>                               
                                <th>C.COSTO
                                </th>                           
                                <th>DESTINO
                                </th>
                                <th>ESTADO
                                </th>
                                <th>USAR BALANCE
                                </th>
                                <th>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </tfoot>
                        <thead>
                            <tr>

                                <th>CUENTA
                                </th>
                                <th>NOMBRE CUENTA
                                </th>
                                <th>CLASE
                                </th>
                                <th>NIVEL
                                </th>
                                <th>TIPO CAMBIO
                                </th>                                
                                <th>C.COSTO
                                </th>                         
                                <th>DESTINO
                                </th>
                                <th>ESTADO
                                </th>
                                <th>USAR BALANCE
                                </th>
                                <th>CAMBIAR ESTADO
                                </th>
                                <th>CAMBIAR USO
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <%--<asp:HiddenField ID="hfObjPlanCuentas" runat="server" />--%>                                                       
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMCUCO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTLCUCO.init();
       
    });
</script>
