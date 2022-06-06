<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLSOHO.ascx.vb" Inherits="vistas_NS_NSLSOHO" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">

            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Lista de solicitud horas extras</h4>
                <div class="actions">
                    <a id="btnImprimir" class="btn black" href="javascript:ImprimirBandeja('Soli');"><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=NSMSOHO" class="btn green" id="btnNuevo"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=NSLSOHO" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>


            <div class="portlet-body">

                <div class="row-fluid">
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

               
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEmpleado" class="control-label" for="cboEmpleado">
                                Empleado:</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpleado" class="span12" data-placeholder="Seleccione Empleado">
                                </select>
                            </div>
                        </div>
                    </div>



                    <div class="span1">
                        <div class="control-group">
                            <label id="Label3" class="control-label" for="optmes">
                                Periodo:</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <input class="span12" data-date-format="yyyy" type="text" id="optanho" name="optanho" placeholder="AÑO">
                                <input class="span12" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes" placeholder="MES">
                            </div>
                        </div>
                    </div>


                    <div class="span2">
                        <div class="control-group">
                            <a id="A1" class="btn blue"><i class="icon-search"></i>Buscar</a>
                        </div>
                    </div>

                </div>

            </div>

            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblHoraExtra" border="0" class="display DTTT_selectable" style="display: block;">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Empleado</th>
                                    <th>Fec. Proc.</th>
                                    <th>Fec. Aut.</th>
                                    <th>Inicio</th>
                                    <th>Fin</th>
                                    <th>Solicita</th>                                    
                                    <th>Autoriza</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                        </table>
                        <asp:HiddenField ID="hffecha" runat="server" />
                        <asp:HiddenField ID="opcion" runat="server" />
                    </div>
                </div>
            </div>
</div>
</div>
</div>

<script type="text/javascript" src="../vistas/NS/js/NSMSOHO.js"></script>

<script>

    jQuery(document).ready(function () {
        NSLSOHO.init();
    });
</script>