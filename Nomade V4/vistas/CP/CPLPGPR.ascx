<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLPGPR.ascx.vb" Inherits="vistas_CP_CPLPGPR" %>

<style>

        .bloc {}
 .bloc select { height:0px;}

 #divVerImagen {
        margin-left: 0px !important;
    }

    @media (max-width:900px) {
        #divVerImagen {
            left: 5% !important;
            width: 90% !important;
        }
    }

    #imgProtesto {
        height: 400px;
        width:  400px;
    }

</style>


<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PAGOS A PROVEEDOR</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=cpmpgpr" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=cplpgpr" class="btn red"><i class="icon-list"></i> Listar</a>  
                </div>

            </div>
            <div class="portlet-body">
                 <div class="row-fluid">
                  
                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="cboempresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboempresa" class="span12 empresa" data-placeholder="Empresa"><option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="span1">

                        <label>Establecimiento</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="slcEstablec" class="span12" data-placeholder="TODOS LOS ESTABLECIMIENTOS" multiple="multiple"></select>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="row-fluid">
                     
                    <div class="span1">

                        <label>Proveedor</label>

                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls bloc">
                                <select id="slcProveedor" class="span12" data-placeholder="TODOS LOS PROVEEDORES" multiple="multiple"></select>
                            </div>
                        </div>
                    </div>
                    <div class="span5">
                        <div class="span2">

                            <label>Fecha Inicio</label>

                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFeIn" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="span2">

                            <label>Fecha Fin</label>

                        </div>
                        <div class="span3">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFeFi" data-date-format="dd/mm/yyyy" />
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="span1"><button type="button" id="btnFiltrar" class="btn blue span10"><i class="icon-filter"></i>&nbsp;Filtrar</button></div>
                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPagoPr" border="0" class="display">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>PROVEEDOR 
                                    </th>
                                    <th>FECHA PAGO
                                    </th>
                                    <th>MONEDA
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>ORIGEN
                                    </th>
                                    <th>CAJA/BCO
                                    </th>
                                    <th>FORMA DE PAGO
                                    </th>
                                    <th>NRO DE OP
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                        </table>
                        <asp:HiddenField ID="hfObjEPSS" runat="server" />
                    </div>
                </div>


            </div>
        </div>
    </div>

    <div id="divVerImagen" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: auto;left:50em;" aria-hidden="true">
        <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
            <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                <i class="icon-remove"></i>
            </button>
            <h4 id="divBuscarDoc_title"><i class="icon-picture" style="line-height: initial;"></i>&nbsp;IMAGEN SUSTENTO</h4>
        </div>
        <div class="modal-body" style="max-height:fit-content;">
            <div class="row-fluid">     
                <img id ="imgProtesto"> 
            </div>
        </div>
        <div class="modal-footer">   
        </div>
    </div>

    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPMPGPR.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLPGPR.init();

    });
</script>


