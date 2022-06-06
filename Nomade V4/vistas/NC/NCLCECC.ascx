<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLCECC.ascx.vb" Inherits="vistas_NC_NCLCECC" %>

<style>
   /* #tblCCostos td {
        vertical-align: top;
    }*/
   #tblCCostos td {
        vertical-align:middle;
    }
    td {
        background-color: #FFFFFF!important;
        border: solid 1px #DDDDDD!important;    
    }
    .dataTables_scrollBody {
        resize:vertical;
    }
</style>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CENTRO DE COSTOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=ncmcecc" class="btn green"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a href="?f=nclcecc" class="btn red"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">

                <div class="row-fluid">
                     <div class="span1">
                          <div class="control-group">
                               <label class="control-label" for="cboEmpresa">Empresa</label>
                          </div>
                     </div>
                     <div class="span2">
                          <div class="control-group">
                               <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa"><option></option></select>
                                </div>
                          </div>
                     </div>

                    <div class="span1">
                          <div class="control-group">
                               <label class="control-label" for="cboPlan">Plan de Costo</label>
                          </div>
                     </div>
                     <div class="span2">
                          <div class="control-group">
                               <div class="controls">
                                    <select id="cboPlanCostos" class="span12" data-placeholder="Plan de Costo"><option></option></select>
                                </div>
                          </div>
                     </div>


                    <div class="span1">
                          <div class="control-group">
                               <label class="control-label" for="cboNiveles">Niveles</label>
                          </div>
                     </div>
                     <div class="span2">
                          <div class="control-group">
                               <div class="controls">
                                    <select id="cboNiveles" class="span12" data-placeholder="Niveles"><option></option></select>
                                </div>
                          </div>
                     </div>

                    <div class="span2">
                          <div class="control-group">
                               <div class="controls">
                                    <a id="btnBuscar" class="btn blue" ><i class="icon-search"></i> &nbsp Buscar</a>
                                </div>
                          </div>
                     </div>
                    </div>
                 <div class="row-fluid">
                    <div class="span12" id="tabla" >             
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NC/js/NCMCECC.js"></script>
<script>
    jQuery(document).ready(function () {
        NCLCECC.init();

    });
</script>
