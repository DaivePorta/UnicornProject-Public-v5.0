<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CCMLCCL.ascx.vb" Inherits="vistas_CC_CCMLCCL" %>

<style>
    div#menuEditar {
        width:100px;        
        background-color:whitesmoke;
        position: absolute;
        z-index: 1151;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #8888;
        box-shadow: 0 0 5px #298ACA;
       
    }

</style>


<div class="row-fluid">
    <div class="span12 ">
         <div class="portlet box blue" id="ventana">
              <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>CREACION DE LINEA DE CREDITO CLIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ccmlccl" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=ccllccl" class="btn red"><i class="icon-list"></i> Listar</a>  
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                     <div class="span1">
                        <div class="control-group ">
                            <label>Empresa</label>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresas" class="span12 empresa" data-placeholder="Empresa"></select>
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                        <div class="control-group ">
                            <label>Clientes</label>
                        </div>
                    </div>
                    <div class="span4">
                        <%--<div class="control-group">
                            <div class="controls">
                                  <input type="text"  id="txtProv" />
                            </div>
                        </div>--%>
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboClientes" class="span12" data-placeholder="Cliente"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-bottom:10px;">
                    <div class="span4">
                        <%-- <a href="javascript:adicionarow();" class="btn green"><i class="icon-list"></i> Agregar Nueva Linea</a>--%>
                        <button id="agregar" type="button" class="btn green">	Agregar Nueva Linea <i class="icon-plus"></i></button>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                    <table id="tblBandeja" class="display  DTTT_selectable" border="0" >
                        <thead>
                        <tr align="center">
                            <th></th>
                            <th></th>
                            <th>SECUENCIA</th>
                            <th>MONTO</th>
                            <th>MONEDA</th>
                            <th>PLAZO (DIAS)</th>
                            <th>FECHA INICIO</th>
                            <th>FECHA FIN</th>
                            <th>ESTADO</th>
                            <th>USUARIO</th>
                        </tr> 
                    </thead>
                    </table>
                  </div>
                </div>
                <asp:HiddenField ID="hfLineas" runat="server" />
                <input type="hidden"  id="hfPIDM" />
            </div>
         </div>
    </div>
</div>

<div id="menuEditar" style="display:none;width: 125px;">
     <span><button type="button" class="btn blue span12" id="btnEditar"  ><i class="icon-pencil"></i> Dar de Baja</button></span>
</div>

<div id="ModalConfirmacion" style="width: 650px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3>¡ADVERTENCIA!</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="control-group">
                                <label class="control-label" for="question">
                                    ¿Está seguro que desea quitar esta fila?
                                </label>                                  
                            </div>
                        </div>                            
                    </div>
                    <div class="row-fluid" style="text-align:center;">
                        <div class="">                                   
                            <button id="btnQuitarRow" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;SI</button> 
                            <button id="btnCancelarRow" type="button" class="btn red"><i class="icon-remove"></i>&nbsp;NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/CC/js/CCLLCCL.js"></script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<script src="../../recursos/plugins/jquery.numeric.js"></script>
<link rel="stylesheet" type="text/css" href="../../recursos/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css" />

<script>

    jQuery(document).ready(function () {
        $(document).click(function (e) { if (e.button == 0) { $("#menuEditar").css("display", "none"); } });
        $(document).keydown(function (e) { if (e.keyCode == 27) { $("#menuEditar").css("display", "none"); } });
        CCMLCCL.init();
    });
</script>
