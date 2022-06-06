<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NVLTPRO.ascx.vb" Inherits="vistas_NV_NVLTPRO" %>

<style>
    .fondoHeader {
        /*background-color: #3A5567;*/
        background-color: white;
        text-align: center;
        /*color: #FFFFFF;*/
        color: black;
    }

    .fondoPrecio {
        /*background-color: #597890;*/
        background-color: rgb(89,89,89);
        text-align: center;
        color: #FFFFFF;
        font-weight: bolder;
    }

    .fondoGrupo {
        /*background-color: #3A6688;*/
        background-color: rgb(61,61,61);
        color: #FFFFFF;
        font-weight: 700;
        padding: 5px !important;
        cursor:default !important;
    }

    .fondoSubgrupo {
        /*background-color: #E2EBF1;*/
        background-color: rgb(89,89,89);
        color: white;
        padding: 5px !important;
        cursor:default !important;
    }

    .precio {
        text-align: right !important;
        font-size: 1.3em;
    }

    .right {
        text-align: right !important;
    }

    .center {
        text-align: center !important;
    }

    .img_hover:hover {      
        cursor:pointer;
    }

    .nohover:hover {
       cursor:default !important;
    }

    .td_wrap {
        word-break: break-all;
    }


    #bModalDetalles {
        display: none;
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0%;
        top: 0%;
        background-color: black;
        z-index: 1999;
        opacity: 0.7;
    }

    #modalBusqueda {
        display: none;
        background-color: white;
        z-index: 1030;
        width: 100%;
        position: fixed;
        left: 0%;
        top: 0%;
        border-bottom: 1px solid #595959;
    }

    #modalDetalles {
        display: none;
        height: 80%;
        width: 80%;
        /*width: 100%;*/
        min-width: 200px;
        min-height: 200px;
        position: fixed;
        left: 10%;
        top: 10%;
        background-color: white;
        z-index: 2000;
        border: 2px solid #275194;
        overflow: hidden;
    }

    #divBtnCerrar {
        position: relative;
        display: inline-block;
    }

 

    #tblProductos > tbody img {
        width:230px;
        height:230px;
        border:1px solid white;
        padding:2px;

        opacity:0.9;
           -webkit-transition : all .5s ease-out;
          -moz-transition : all .5s ease-out;
          -o-transition : all .5s ease-out;
          transition : all .5s ease-out;    
    }

     #tblProductos > tbody img:hover {
        border-color:#3D3D3D;  
        opacity:1;
         -webkit-transition : all .8s ease;
          -moz-transition : all .8s ease;
          -o-transition : all .8s ease;
          transition : all .8s ease;      
    }

     
    .divimg {     
        display:inline-block;
        max-width:230px;
        padding:5px;
        vertical-align: top;
        min-height:230px;
        min-width:230px;
    }

   
    #divTblProductos th {
        border: none !important;
    }
    
    @media screen and (max-width: 500px) {
        #modalDetalles {
            width: 100%;
            left: 0%;
            border-left: none;
            border-right: none;

        }

    }
</style>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CATÁLOGO TARJETAS PRODUCTOS</h4>
                <div class="actions">
                    <a class="btn black" onclick="javascript:ImprimirCatalogo();" style="margin-top: -10px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">

                <div id="divBloqueo">

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="cboEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="span12" data-placeholder="Empresa">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span6" >
                            <div class="control-group">
                                <div class="controls">
                                    <a id="btnVerFiltros" class="btn blue" style="margin-left: 5px;"><i class="icon-chevron-down"></i><span>&nbsp;Ver Filtros</span></a>
                                    <a id="buscar" class="btn blue" style="margin-left: 5px;"><i class="icon-search"></i>&nbsp;Filtrar</a>
                                </div>
                            </div>
                        </div>                      

                    </div>

                    <div id="divFiltros" style="display: none;">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboAlmacen">
                                        Almacenes</label>
                                </div>
                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboAlmacen" class="span12" data-placeholder="Establecimiento" multiple="multiple" style="display: none;">
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbogrupo">
                                        Grupo</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboGrupo">
                                        <select id="cbogrupo" name="cbogrupo" class="m-wrap span12 required" data-placeholder="Seleccionar Grupo" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbosubgrupo">
                                        Sub-Grupo</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboSubgrupo">
                                        <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbomarca">
                                        Marca</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboMarca">
                                        <select id="cbomarca" name="cbomarca" class="m-wrap span12 required" data-placeholder="Seleccionar Marca" tabindex="1" disabled="disabled">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span4 offset2">
                                <div class="control-group">
                                    <label class="control-label" for="chkStock">
                                        <input type="checkbox" id="chkStock" name="chkStock" checked="checked" />
                                        Incluir productos sin stock</label>
                                </div>
                            </div>

                            <div class="span4 offset2">
                                <div class="control-group">
                                    <label class="control-label" for="chkEstado">
                                        <input type="checkbox" id="chkEstado" name="chkEstado" />
                                        Incluir productos descontinuados</label>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                        </div>
                    </div>
                </div>

                <div class="row-fluid">                 


                </div>

                <div class="row-fluid">
                    <div class="span12" id="divTblProductos">

                        <table id="tblProductos" class="table" border="0" style="width: 100%; border: 0px solid #cbcbcb;" >
                            <thead class="fondoHeader">
                                <tr>
                                    <%--<th class="center">#</th>
                                    <th class="center">NOMBRE PRODUCTO</th>
                                    <th class="center">PRECIO</th>
                                    <th class="center">STOCK</th>--%>
                                     <th class="center"></th>                               
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="modalBusqueda">
    <div class="span10 offset1">
        <input type="text" id="txtBuscar" class="span12" placeholder="Buscar Producto (mín 3 caracteres)" style="margin-bottom: 5px; margin-top: 5px;" />
    </div>

    <div class="control-group">
										<div class="controls">
											<div class="input-prepend">
												<span class="add-on"><i class="icon-envelope"></i></span><input class="m-wrap" id="inputIcon" type="text" placeholder="Email address">
											</div>
										</div>
									</div>
</div>
<div id="bModalDetalles"></div>
<div id="modalDetalles">
    <div id="divBtnCerrar" class="pull-right">
        <a id="btnCerrarModal" class="btn red" style="margin-right: 3%; color: white;"><i class="icon-remove"></i></a>
    </div>
    <%--    <div class="row-fluid" style="background-color: #275194;">
        <div class="span12 " style="margin-left: 5px; padding: 0.5%;">        
            <a id="btnCerrarModal" class="btn red pull-right" style="margin-right: 3%; color: white;"><i class="icon-remove"></i></a>
          </div>
    </div>--%>
    <div class="row-fluid" style="height: 94% !important; overflow-y: auto">
        <div class="span12" style="padding: 1%;">
            <div class="row-fluid">

                <div class="span3">
                    <div class="row-fluid">
                        <img id="txtImgProducto" style="height: 200px; width: 200px; margin: auto;" class="thumbnail" src="../../recursos/img/150x150.gif" />
                    </div>

                    <div class="row-fluid" id="divTblPrecios" style="overflow-x: auto">
                        <table id="tblPreciosEstandar" class="table" style="width: 100%; border: 1px solid #cbcbcb; margin-top: 2%;" cellpadding="8px">
                            <thead>
                                <tr>
                                    <th colspan="2" class="fondoHeader center">PRECIO ESTÁNDAR<br />
                                        <small class="txtAlamcen"></small></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                        <table id="tblPreciosCantidad" class="table" style="width: 100%; border: 1px solid #cbcbcb; margin-top: 2%;" cellpadding="8px">
                            <thead>
                                <tr>
                                    <th colspan="2" class="fondoHeader center">PRECIO CANTIDAD<br />
                                        <small class="txtAlamcen"></small></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="span5">

                    <table class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="6px">
                        <tbody>
                            <tr>
                                <td colspan="2" class="fondoHeader" style="word-break: break-all;">
                                    <h4><strong id="txtNombre"></strong></h4>
                                    <p>
                                        <h5><span id="txtNombreComercial"></span></h5>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>CODIGO</strong></td>
                                <td><span class="txtCodigoProd"></span></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>CODIGO AUX</strong></td>
                                <td><span class="txtCodigoAux"></span></td>
                            </tr>
                              <tr>
                                <td class="fondoPrecio"><strong>ESP. ADICIONAL</strong></td>
                                <td style="word-break: break-all;"><span id="txtEspAdicional"></span></td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" class="fondoPrecio"><strong>FICHA TÉCNICA:</strong></td>
                                <td style="word-break: break-all;"><a id="txtFichaTecnica" href="#" target="_blank" style="color: blue; text-decoration: underline">safdsafsafds</a></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>TIPO EXISTENCIA:</strong></td>
                                <td style="word-break: break-all;" id="txtExistencia"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>GRUPO:</strong></td>
                                <td style="word-break: break-all;" id="txtGrupo"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>SUBGRUPO:</strong></td>
                                <td style="word-break: break-all;" id="txtSubgrupo"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>MARCA:</strong></td>
                                <td style="word-break: break-all;" id="txtMarca"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>MODELO:</strong></td>
                                <td style="word-break: break-all;" id="txtModelo"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>PRESENTACIÓN:</strong></td>
                                <td style="word-break: break-all;" id="txtPresentacion"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>UNIDAD DESPACHO:</strong></td>
                                <td style="word-break: break-all;" id="txtUnidadDespacho"></td>
                            </tr>
                            <tr>
                                <td class="fondoPrecio"><strong>VOLUMEN:</strong></td>
                                <td style="word-break: break-all;" id="txtVolumen"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="span4">
                    <div class="row-fluid">
                        <table class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="6px">
                            <tbody>
                                <tr>
                                    <td style="width: 120px;" class="fondoPrecio">ESTADO</td>
                                    <td id="txtEstado"></td>
                                </tr>
                                <tr>
                                    <td class="fondoPrecio">SERIADO</td>
                                    <td id="txtSeriado"></td>
                                </tr>
                                <tr>
                                    <td class="fondoPrecio">TIPO BIEN</td>
                                    <td id="txtTipoBien"></td>
                                </tr>
                                <tr>
                                    <td class="fondoPrecio">DETRACCIÓN</td>
                                    <td id="txtDetraccion"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row-fluid">
                        <div class="span12" id="divTblAlmacenes">
                            <table id="tblAlmacenes" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">
                                <thead class="fondoPrecio">
                                    <tr>
                                        <th class="center">ALMACÉN </th>
                                        <th class="center">STOCK</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hfParamStock" value="-1" />
<div id="divDctoImprimir" style="display: none;"></div>
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script type="text/javascript" src="../vistas/NV/js/NVLTPRO.js"></script>
<script>
    jQuery(document).ready(function () {
        NVLTPRO.init();
    });
</script>


