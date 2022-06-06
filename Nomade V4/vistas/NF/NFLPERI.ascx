<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NFLPERI.ascx.vb" Inherits="vistas_NF_NFLPERI" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PERIODOS TRIBUTARIOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>&nbsp;Imprimir</a>
                    <a href="?f=nfmperi" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nflperi" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Empresa</label>
                            <div class="controls">
                                <select id="slcEmpresa" name="slcEmpresa" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Empresa" tabindex="1">
                                    <option></option>
                                </select>
                                <asp:HiddenField ID="hfempresa" runat="server" />
                                <asp:HiddenField ID="hf_opcion" runat="server" Value="2" />
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label">Año</label>
                            <div class="controls">
                                <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">FILTRAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                </div>
                <table id="tblperiodos" class="display table-bordered">
                    <thead>
                        <tr>
                            <th>PERIODO</th>
                            <th>EMPRESA</th>
                            <th>AÑO</th>
                            <th>MES</th>
                            <th>NUMERO MES</th>
                            <th>FEC. CIERRE</th>
                            <th>USUARIO CIERRE</th>
                            <th>FEC. REAPERTURA</th>
                            <th>USUARIO REAPERTURA</th>
                            <th>ESTADO</th>
                            <th>COEFICIENTE(%)</th>
                            <th>#</th>
                            <%--  <th>CAMBIAR ESTADO
                                    </th>--%>
                        </tr>
                    </thead>
                </table>
                <asp:HiddenField ID="hfObjJson" runat="server" />
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<div id="modalModificar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 30%; left: 60% !important; display: block;" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
        </button>
        <h4 id="myModalLabel">Modificar Periodo Tributario</h4>
    </div>
    <div class="modal-body">
        <div class="row-fluid">

            <div class="span8 offset2">
                <div class="control-group">
                    <label class="control-label">Periodo</label>
                    <div class="controls">
                        <input id="hfCtlg" type="hidden" />
                        <input id="hfCod" type="hidden" />
                        <input class="span12" id="txtPëriodo" type="text" disabled="disabled" style="text-align:center" />

                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span8 offset2">
                <div class="control-group">
                    <label class="control-label">Coeficiente/Porcentaje</label>
                    <div class="controls">
                        <input class="span6 offset3" id="txtCoeficiente" type="text" maxlength="6" onkeypress='return ValidaDecimales(event,this,2)' style="text-align:center" placeholder="(%)"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer">
        <button type="button" id="btnModificar" class="btn black">
            Modificar
        </button>
        <button class="btn red" type="button" data-dismiss="modal" aria-hidden="true">
            Cancelar 
        </button>
    </div>
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NF/js/NFMPERI.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NFLPERI.init();

    });
</script>

