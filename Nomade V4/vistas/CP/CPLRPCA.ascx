<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CPLRPCA.ascx.vb" Inherits="vistas_CP_CPLRPCA" %>
<style>
    .typeahead.dropdown-menu li > a {
        padding: 6px 12px 6px 12px;
    }


    .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover {
        text-decoration: none;
        background-image: none;
        background-color: #0081c2;
        color: #fff;
        filter: none;
    }

    .dropdown-menu li > a {
        padding: 1% 1% 1% 1%;
    }

    /*table.dataTable tbody tr.odd{
        background-color:#e1f0f7;
    }*/
</style>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>REPORTE PAGO PLANILLAS C/AMORTIZACIONES</h4>
                <div class="actions">
                    <a class="btn black printlist" ><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
            </div>

            <div class="portlet-body">

                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEmpresa" class="span12" data-placeholder="Empresa">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="buscar" style="margin-top:-4px" class="btn blue">FILTRAR</a>
                            </div>
                        </div>
                    </div>
                  <%--  <div class="span2">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="slcSucural">
                                Establecimiento</label>
                        </div>
                    </div>--%>
                  <%--  <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcSucural" class="span12" data-placeholder="Establecimiento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>--%>
                </div>

                <div class="row-fluid">
                    <%--<div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Persona</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls" id="input_empl">
                         
                                <input type="text" class="span12" id="txt_empleado" data-provide="typeahead">
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group span2">
                            <label id="Label1" class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtDesde" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div class="control-group span2">
                            <label id="Label3" class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>
                        <div class="control-group span4">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtHasta" data-date-format="dd/mm/yyyy" />
                            </div>
                        </div>
                    </div>--%>
                    
                </div>
                <br />
              
                <div class="row-fluid" style="display: block; text-align:center; font-size:larger;">
                    
                   
                    <b>MONTO TOTAL (<span id="desc_mone_base">PEN</span>) : </b><span id="simb_mone_base">S/.</span><span id="total_monto_soles">0.00</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <b>DEUDA TOTAL(<span id="desc_mone_alt">PEN</span>) : </b><span id="simb_mone_alt">S/.</span> <span id="total_deuda_soles">0.00</span> 

                </div>
    
                <br />
                <div class="row-fluid" id="tabla">
                    <%--table-bordered table-striped--%>
                   
                  <table class="table q" id="tbl_creditos" style="width: 100%">
                            <thead style="background-color: #eee;">
                                <tr>
                                   <%-- <th style="width: 2%"></th>--%>
                                    <th style="width: 10%">DOCUMENTO</th>
                                    <%--<th style="width: 5% ;text-align:center ">FECHA</th>--%>
                                    <th style="width: 5%;text-align:center">MONEDA</th>
                                    <th style="width: 7%;text-align:center">MONTO</th>
                                    <th style="width: 7%;text-align:center">DEUDA (PEN)</th>
                                    <th style="width: 3%;text-align:center">PAGADO</th>
                                     <th style="width: 2%;text-align:center">#</th>

                                </tr>
                            </thead>

                        </table>
                </div>
            </div>

        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>

<div id="modal_info" class="modal hide" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel1" style="left: 33%; width: 75%; max-width: 80% !important; display: none;">
    <div class="modal-header" style="padding: 1px 15px; background: #3a87ad; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true"><i class="icon-remove"></i></button>
        <h4 id="modalTitulo">AMORTIZACIONES PAGOS A EMPLEADOS</h4>
    </div>
    <div class="modal-body" id="ventanaInfo" style="overflow-x:hidden;overflow-y :auto   ;">
      

     
        <br />
        <div class="row-fluid">

            <div class="span12" >
                 <label id="lbl_planilla" style="text-align: center;font-size: large;font-weight: bold;color: black ;">-</label>
                <table id="tbl_amortizaciones" class="table">
                    <thead>
                        <tr style="background-color: #eee;">
                             <th style="width: 15%; text-align: center">EMPLEADO</th>
                            <th style="width: 5%; text-align: center">FECHA</th>
                            <th style="width: 15%; text-align: center;">ORIGEN</th>
                            <th style="width: 15%; text-align: center">DESTINO</th>
                             <th style="width: 20%; text-align: center">FORMA_PAGO</th>
                            <th style="width: 10%; text-align: center">DOCUMENTO</th>
                            <th style="width: 20%; text-align: center">MONTO</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
         
        </div>
       
 
        <br />
    </div>

    </div>


<input id="hfpidm" type="hidden" />

<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/CP/js/CPLRPCA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CPLRPCA.init();

    });
</script>
