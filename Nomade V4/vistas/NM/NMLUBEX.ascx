<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMLUBEX.ascx.vb" Inherits="vistas_NM_NMLUBEX" %>
<style type="text/css">
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
</style>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>SEGUIMIENTO DE EXISTENCIAS CON SERIE</h4>
                <div class="actions">
                   

                </div>

            </div>
            <div class="portlet-body">
                <!-- PRIMERA LINEA -->
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
                      <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Grupo</label>
                            <div class="controls">
                                <select id="cbo_grupo" name="cbo_grupo" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Grupo" tabindex="1">
                                    <option></option>
                                </select>
                                
                            </div>
                        </div>
                    </div>
                      <div class="span3 ">
                        <div class="control-group">
                            <label class="control-label">Sub-Grupo</label>
                            <div class="controls">
                                <select id="cbo_subgrupo" name="cbo_subgrupo" class="bloquear combo m-wrap span12 requibisque" data-placeholder="Seleccionar Sub-Grupo" tabindex="1">
                                    <option></option>
                                </select>
                               
                            </div>
                        </div>
                    </div>
              
                </div>
                <div class="row-fluid">
                     <div class="span4 in">
                        <div class="control-group">
                            <label class="control-label">Origen/Destino</label>
                            <div class="controls" id="input_persona">
                                <input class="span12"  type="text" id="txtRazonSocial" name="txtRazonSocial"> 
                            </div>
                        </div>
                    </div>
                       <div class="span4 in">
                        <div class="control-group">
                            <label class="control-label">Producto</label>
                            <div class="controls" id="input_desc_prod">
                                <input class="span12"  type="text" id="txt_prod" name="txt_prod"> 
                            </div>
                        </div>
                    </div>
                     <div class="span2">
                        <a class="btn blue" id="btn_filtrar" style="margin-top: 25px;">BUSCAR&nbsp;<i class="icon-search"></i></a>
                    </div>
                </div>
                <br />
                

                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div> 
             
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tbl_detalle" class="display table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 10%;">TIPO MOV
                                    </th>
                                    <th style="width: 10%;">PRODUCTO
                                    </th>
                                    <th style="width: 10%;">NRO SERIE
                                    </th>
                                    <th style="width: 10%;">OPERACIÓN
                                    </th>
                                    <th style="width: 20%;">ORIGEN/DESTINO
                                    </th>     
                                    <th style="width: 10%;">FECHA MOV
                                    </th>
                                    <th style="width: 5%;">TIPO DCTO
                                    </th>
                                    <th style="width: 10%;">NUMERO DCTO
                                    </th>
                                     <th style="width: 5%;">#
                                    </th>
                                </tr>
                            </thead>
       
                        </table>
                    </div>
                   
                </div>
            </div>

        </div>

    </div>


</div>



<script type="text/javascript" src="../vistas/NM/js/NMLUBEX.js"></script>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css">
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css">

<input  type="hidden" id="hfPidm"/>
<input  type="hidden" id="hfCodProd"/>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMLUBEX.init();


    });


</script>