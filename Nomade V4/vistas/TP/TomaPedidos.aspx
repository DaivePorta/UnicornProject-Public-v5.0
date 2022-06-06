<%@ Page Language="VB" AutoEventWireup="false" CodeFile="TomaPedidos.aspx.vb" Inherits="vistas_TP_TomaPedidos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link href="../../recursos/plugins/data-tables/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
    <link href="css/TomaPedidos.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/css/style-metro.css" rel="stylesheet" />
    <link href="../../recursos/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/font-awesome/css1/font-awesome.css" rel="stylesheet" />
    <link href="../../recursos/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.css" rel="stylesheet" />

    <script src="../../recursos/plugins/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="../../recursos/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
    <script src="../../recursos/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.js"></script>
    <script src="../../recursos/plugins/jquery.blockui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../recursos/plugins/gritter/js/jquery.gritter.js"></script>
    <script src="../../recursos/scripts/UTILES.js" type="text/javascript"></script>


    <title></title>
</head>
<body>
    <%-- <form id="form1" runat="server">
        <div>
        </div>
    </form>--%>

    <div class="modal-backdrop fade in" id="divLoad" style="z-index: 999999!important;">
        <div class="fullScreen_Msg" align="center">
            <label style="color: white">PARA UN MEJOR USO DE LA APLICACIÓN, LA PANTALLA SE MAXIMIZARÁ</label>
            <button id="btnMaxOk" type="button">Aceptar</button>
        </div>
    </div>

    <div class="row-fluid contenedor">
        <div class="span12">

            <div id="cont_cabecera">
                <!-- SECCION SOLO TITULO Y BOTONES -->
                <div class="row-fluid titulo">
                    <div class="logo">
                        <span class="cabecera">TOMA PEDIDOS</span>
                    </div>
                    <div class="carrito" style="margin-left:30px;">
                        <i class="fa fa-shopping-cart cabecera" id="detalle_pedido" aria-hidden="true"></i>
                        <div id="counter" align="center">0</div>
                    </div>
                    
                    <div class="carrito">
                        <i class="fa fa-list" id="list_pedidos" aria-hidden="true"></i> 
                        <div id="counter2" align="center">0</div>
                    </div>

                    <div class="carrito">
                        <i class="icon-fullscreen" id="full_sreem" aria-hidden="true"></i>                                         
                    </div>

                    <div class="carrito">                       
                        <i class="fa fa-sign-out" id="cerrar_sesion" aria-hidden="true"></i>                                         
                    </div>                  
                    
                </div>
                <div class="row-fluid adicionales" style="display: none">
                    <div class="busqueda" id="busInput">
                        <input type="text" class="m-wrap" id="txtBusqProd" name ="txtBusqProd" placeholder="Buscar..." style="width:90%"/>  
                        <button id="limpiar_producto" style="width:50px; height:48px; background:#AD193E; border:none;"><i class="fa fa-paint-brush" style="color: #ffff;"></i></button>
                    </div>
                                           
                        
                    
                    <div class="filtro">
                        <span id="add_filtro"><i class="fa fa-filter"></i>&nbsp;Filtrar</span>
                    </div>
                </div>
            </div>

            <div id="cont_listado" class="pantalla">
                <!-- SECCION LISTADO DE ORDENES PEDIDO -->
                <div class="row-fluid span12" style="margin-top: 15px; display:block;">
                    <div style="width: 60%; float: left;">
                        <h2>LISTADO DE PEDIDOS</h2>
                    </div>
                    <div style="width: 20%; float: left; margin-top: 20px;">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" for="txtTotalVenta" style="font-weight: bold; text-align:right; color:red">Total (S/)</label>
                            </div>                            
                        </div>
                    </div>
                    <div style="width: 20%; float: left; margin-top: 20px;">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" style="font-weight: bold; text-align:left; color:red; padding-left: 5%" id="lblTotalVenta">0.00</label>
                            </div>
                        </div>
                    </div>                    
                    
                </div>
                <hr />
                <div class="row-fluid" style="margin-top: 10px;">
                    <table id="tblPedidos" class="display DTTT_selectable table-bordered" border="0" width="100%">
                        <thead>
                            <tr>
                                <th>CÓDIGO
                                </th>
                                <th>CLIENTE
                                </th>
                                <th>MONTO
                                </th>
                                <th>ESTADO
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <%--<div class="row-fluid" style="margin-top: 15px;">
                    <div class="span10">
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtTotalVenta" style="font-weight: bold; text-align:right; color:red">Total (S/.)</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <div class="controls">
                                <label class="control-label" style="font-weight: bold; text-align:right; color:red" id="lblTotalVenta">0.00</label>
                            </div>
                        </div>
                    </div>
                </div>--%>
            </div>
            <div id="divMensajeStock" class="alert alert-error hide">
                <button class="close" data-dismiss="alert"></button>
                Producto con stock insuficiente.
                <br/>
                Por favor ingresar cantidad menor o igual al stock.
            </div>

            <div id="divMensajeAgregado" class="alert alert-error hide">
                <button class="close" data-dismiss="alert"></button>
                Producto ya ha sido agregado.
                <br/>
                Por favor ingrese un producto diferente.
            </div>

            <div id="cont_agregar_detalle" style="display: none;" class="pantalla">
                <!-- SECCION AGREGAR DETALLE -->
                 <div class="row-fluid">
                    <div class="span12">
                        <label id="mensaje" style="color:red; font-size:16px; font-weight:bold;"></label>
                    </div>
                </div>
                <div class="row-fluid cabecera">
                    <div class="span12" id="infoProducto">
                    </div>
                </div>

                <div class="row-fluid footer-prod">

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtCantidad" style="font-weight: bold">Cantidad</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="number" id="txtCantidad" name="txtCantidad" style="width:100%" value="1" min="1" onClick="this.select();"/>
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtUniMedida" style="font-weight: bold">Unidad Medida</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtUniMedida" name="txtUniMedida" style="width:100%"  disabled="disabled"/>
                                </div>
                            </div>
                        </div>                      
                    </div>

                    <div class="row-fluid">

                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtPrecUnitario" style="font-weight: bold;">Precio Unitario</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtPrecUnitario" placeholder="0.00" style="width:100%"  disabled />
                                </div>
                            </div>
                        </div>
                        <div class="span2">
                        </div>

                         <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtPrecTotal" style="font-weight: bold;">Precio Total</label>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtPrecTotal" placeholder="0.00" style="width:100%" disabled />
                                </div>
                            </div>
                        </div>                       
                    </div>     

                    <div class="row-fluid">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txt_glosa_prod" style="font-weight: bold;">Glosa</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group">
                                <div class="controls">
                                    <textarea id="txt_glosa_prod" class="span12" maxlength="100" style="resize: vertical; max-height: 120px;" onkeyup="javascript:this.value=this.value.toUpperCase();"></textarea>
                                </div>
                            </div>
                        </div>

                         <div class="span2">
                        </div>

                        <div class="span3">
                            <div class="control-group">
                                <label class="control-label" for="chkAlmacen">
                                    <input type="checkbox" id="chkAlmacen" name="chkAlmacen" />&nbsp;Despacho por tienda.</label>
                            </div>
                        </div>                           
                    </div>     
                    
  

                    <div align="center" style="border-top: solid 1px gray; padding-top:20px;">
                        <button class="btn blue" id="agregarProducto"><i class="fa fa-cart-plus"></i>&nbsp;Agregar</button>
                    </div>

                </div>

            </div>

            <%--            <div class="row-fluid">
                <div style="float: left; position: relative; left: 45%;">
                    <div>
                        <div class="control-group">
                            <button class="btn blue" id="regresar_listado"><i class="icon-chevron-left"></i></button>
                            <button class="btn blue" id="list_pedido"><i class="icon-chevron-right"></i></button>
                        </div>

                    </div>
                </div>
            </div>--%>

            <div id="cont_filtros" style="display: none;" class="pantalla">
                <!-- SECCION AGREGAR FILTROS -->
                <div class="row-fluid cbo_grupos">
                    <h2>FILTROS DE BUSQUEDA</h2>
                    <hr />
                </div>
                <div class="row-fluid cbo_grupos">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="cbo_grupos" style="font-weight: bold">GRUPOS</label>
                        </div>
                    </div>
                    <div class="span9">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_grupos" class="span12" data-placeholder="Grupos">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid cbo_subgrupos">
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="cbo_subgrupos" style="font-weight: bold">SUB-GRUPOS</label>
                        </div>
                    </div>
                    <div class="span9">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cbo_subgrupos" class="span12" data-placeholder="Sub-Grupos">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid" style="margin-top: 150px;">
                    <div class="span12" style="text-align: center">
                        <button class="btn blue" id="regresar_pedido"><i class="icon-chevron-left"></i></button>
                    </div>
                </div>
            </div>


            <div id="divMensajeGrabar" class="alert alert-success hide">
                Venta guardada correctamente.
                <br/>
                Codigo de Venta:
                <span style="font-size: 1.2em;" id="txtCodigoVenta"/>
            </div>
            <div id="cont_det_pedido" style="display: none;" class="pantalla">
                <!-- SECCION AGREGAR DETALLE -->
                <div class="row-fluid" style="margin-top: 10px;">
                    <h2>DETALLE PEDIDO</h2>
                    <hr />
                </div>

                 <%--<div class="row-fluid" style="margin-top: 10px;">
                     <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombre" style="font-weight: bold">Nombre Referencia</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombre" name="txtNombre" style="width:100%" onkeyup="javascript:this.value=this.value.toUpperCase();"/>
                                </div>
                            </div>
                        </div>
                </div>--%>

                 <div class="row-fluid" style="margin-top: 10px;">
                     <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="txtNombre" style="font-weight: bold">Nombre Referencia</label>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtNombre" name="txtNombre" style="width:100%" onkeyup="javascript:this.value=this.value.toUpperCase();"/>
                                </div>
                            </div>
                        </div>
                </div>

                <div class="row-fluid" style="margin-top: 10px;">
                    <table id="tblDetallePedidos" class="display DTTT_selectable table-bordered" border="0" width="100%">
                        <thead>
                            <tr>                               
                                <th>CANT
                                </th>
                                <th>PRODUCTO
                                </th>
                                <th>DESPACHO
                                </th>
                                <th>P.UNIT
                                </th>
                                <th>P.TOTAL
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div class="row-fluid" style="margin-top: 15px;">
                    <div style="float: right; position: relative;">
                        <div>
                            <div class="control-group">
                                <span style="padding: 5px;">SubTotal (S/ )</span>
                                <input type="text" id="txtSubTotal" style="width: 180px;" class="monto" placeholder="0.00" disabled />
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div style="float: right; position: relative;">
                        <div>
                            <div class="control-group">
                                <span style="padding: 5px;">IGV (S/ )</span>
                                <input type="text" id="txtIgv" style="width: 180px;" class="monto" placeholder="0.00" disabled />
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div style="float: right; position: relative;">
                        <div>
                            <div class="control-group">
                                <span style="padding: 5px;">Total (S/ )</span>
                                <input type="text" id="txtTotal" style="width: 180px;" class="monto" placeholder="0.00" disabled />
                            </div>

                        </div>
                    </div>

                    
                </div>

                <div class="row-fluid">
                    <div style="float: left; position: relative; left: 30%;">
                        <div>
                            <div class="control-group">
                                <button class="btn blue" id="regresar_venta"><i class="icon-plus"></i></button>
                                <button class="btn blue" id="grabar_pedido"><i class="icon-save"></i>&nbsp;Grabar</button>
                                <button class="btn blue" id="modificar_pedido"><i class="icon-pencil"></i>&nbsp;Modificar</button>
                                <%--   <button class="btn green" id="completar_venta"><i class="icon-check"></i>&nbsp;Completar</button>--%>
                            </div>

                        </div>
                    </div>
                </div>
            </div>        

            <div id="divProdAgregado" align="center" style="display: none; color: white; background-color: #006f00; opacity: 0.5; padding: 15%; margin: 1%;">
                <p><i style="font-size: 15vw;" class="fa fa-cart-plus"></i></p>
                <p><span id="spnMessageProdAdded"></span></p>
            </div>

        </div>
    </div>

    <div id="ModalExito" style="width: 650px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
                <h3>¡EXITO!</h3>
            </div>
            <div class="modal-body" aria-hidden="true">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12">
                                <div class="control-group">
                                    <label class="control-label" for="">
                                        Se <span id="sOperacion"></span> correctamente: Código - <span id="sCodigo"></span></label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row-fluid" style="text-align:center;">
                            <div class="">
                                <button id="aceptarExito" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;Aceptar</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="ModalAdvertencia" style="width: 650px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
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
                                    <label class="control-label" for="">
                                        Existe detalles por registrar. ¿Desea <span id="tipOperacion"></span> la venta?</label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row-fluid" style="text-align:center;">
                            <div class="">
                                <button id="regCompra" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;SI</button> 
                                <button id="noRegCompra" type="button" class="btn red"><i class="icon-remove"></i>&nbsp;NO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="ModalAdvertencia2" style="width: 650px; display: none;" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
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
                                    <label class="control-label" for="">
                                         No se puede editar, la venta ya ha sido cancelada.</label>
                                </div>
                            </div>                            
                        </div>
                        <div class="row-fluid" style="text-align:center;">
                            <div class="">
                                <button id="venta_completada" type="button" class="btn green"><i class="icon-ok"></i>&nbsp;OK</button>                                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script runat="server">
        Dim numAleatorio As New Random()
        Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
    </script>
    <script type='text/javascript' src='js/TomaPedidos.js?<%=aleatorio%>'></script>



   <%-- <script src="js/TomaPedidos.js"></script>--%>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            tomaPedidos.init();
        });
    </script>

</body>
</html>
