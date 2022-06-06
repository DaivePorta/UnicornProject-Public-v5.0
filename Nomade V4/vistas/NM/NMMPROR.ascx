<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMPROR.ascx.vb" Inherits="vistas_NM_NMMPROR" %>
<style>
    .frame {
        width: 975px;
        height: 580px;
        border: none;
        -moz-transform: scale(0.69);
        -moz-transform-origin: 0 0;
        -o-transform: scale(0.69);
        -o-transform-origin: 0 0;
        -webkit-transform: scale(0.69);
        -webkit-transform-origin: 0 0;
    }
</style>
<style type="text/css">
    /* Stylos par la validacion ------ */
    label.error {
        background: url("recursos/img/unchecked.gif") no-repeat scroll 0 0 transparent;
        color: #EA5200;
        font-weight: bold;
        padding-bottom: 2px;
        padding-left: 16px;
    }

    label.valid {
        background: url("recursos/img/checked.png") no-repeat scroll 0 0 transparent;
        color: Silver;
        font-weight: bold;
        padding-bottom: 2px;
        padding-left: 16px;
    }

    .contenedor {
        width: 160px;
        float: left;
        margin-top: 10px;
    }

    .contenedor2 {
        width: 320px;
        float: left;
        margin-right: 10px;
    }

    .titulo {
        font-size: 12pt;
        font-weight: bold;
    }

    #foto {
        width: 150px;
        min-height: 180px;
        border: 2px solid #1e93e8;
    }

    #camara {
        width: 320px;
        height: 240px;
        border: 2px solid #1e93e8;
    }
</style>
<asp:HiddenField ID="hf_imag_code" runat="server" />
<asp:HiddenField ID="hf_prod_code" runat="server" />

<div class="row-fluid">
    <div class="span12">
        <!-- SE INICIA EL CUADRO DE LA FORMA-->
        <div class="portlet box blue">
            <!-- TITULO DE LA FORMA-->
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>MANTENIMIENTO PRODUCTOS/SERVICIOS RAPIDO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmpror"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlpror"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="producto">

                <div class="row-fluid">
                    <div class="alert alert-error hide">
                        <button class="close" data-dismiss="alert"></button>
                        Los datos ingresados no son correctos. Por favor vuelva a intentarlo!!!
                    </div>
                    <div class="alert alert-success hide">
                        <button class="close" data-dismiss="alert"></button>
                        Datos ingresados correctamente.
                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span8">
                        <div class="span2">
                            <div class="control-group">
                                <label class="control-label" for="slcEmpresa">
                                    Empresa</label>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="control-group">
                                <div class="controls" id="controlempresa">
                                    <select id="slcEmpresa" name="slcEmpresa" class="m-wrap span12 required" data-placeholder="Seleccionar Empresa" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <label class="control-label" for="txtcodigo">
                                    Código</label>
                            </div>
                        </div>

                        <div class="span2">
                            <div class="control-group ">
                                <div class="controls">
                                    <input id="txtcodigo" class="m-wrap span12" disabled="disabled" type="text" placeholder="Generado" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="span4">

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="control-group">
                                    <label class="control-label" for="chkactivo">
                                        <input type="checkbox" id="chkactivo" name="chkactivo" checked class="m-wrap" />
                                        Activo</label>
                                </div>
                            </div>
                            <div class="span6">
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="chklista">
                                        <input type="checkbox" id="chklista" name="chklista" checked />
                                        <%-- Mostrar en Lista--%>Vendible</label>
                                </div>
                            </div>
                            <div class="span3">
                                <div class="control-group">
                                    <label class="control-label" for="chkComprable">
                                        <input type="checkbox" id="chkComprable" name="chkComprable" checked />
                                        Comprable</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row-fluid">

                    <div class="span8">

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboexistencia">
                                        Tipo Existencia</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboExistencia">
                                        <select id="cboexistencia" name="cboexistencia" class="m-wrap span12 required" data-placeholder="Seleccionar Tipo Existencia" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group" id="divProductoEnBruto">
                                    <label class="control-label" for="chkProductoEnBruto">
                                        <input type="checkbox" id="chkProductoEnBruto" name="chkProductoBruto" disabled="disabled" />
                                        Producto en Bruto</label>
                                </div>
                            </div>

                             <div class="span3">
                                <div class="control-group" id="divPeso">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label class="control-label" for="txtPeso">
                                                Peso (Kg.)</label>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="controls">
                                            <input type="text" id="txtPeso" name="txtPeso" class="m-wrap span12 number" onkeypress="return ValidaDecimales(event,this,3)" placeholder="0.00" disabled="disabled"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
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

                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="control-label">
                                            <input type="radio" class="m-wrap span12" id="rbsinserie" name="tipoSeria" checked="checked" />
                                            Sin Serie
                                        </label>

                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="rbseriada">
                                        <input type="radio" class="m-wrap span12" id="rbseriada" name="tipoSeria" />
                                        Seriada
                                    </label>
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
                                        <select id="cbosubgrupo" name="cbosubgrupo" class="m-wrap span12 required" data-placeholder="Seleccionar SubGrupo" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbounidad">
                                        Unidad</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboUnidad">
                                        <select id="cbounidad" name="cbounidad" class="m-wrap span12 required" data-placeholder="Seleccionar Unidad" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cbomarca">
                                        Marca</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboMarca">
                                        <select id="cbomarca" name="cbomarca" class="m-wrap span12 required" data-placeholder="Seleccionar Marca" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtvolumen">
                                        Volumen</label>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="controls">
                                    <input type="text" id="txtvolumen" name="txtvolumen" class="m-wrap span12 number" onkeypress="return ValidaDecimales(event,this,5)" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls" id="divCboVolumen">
                                        <select id="cbovolumen" name="cbovolumen" class="span12" data-placeholder="Seleccionar Volumen" tabindex="1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="span2">
                                <label class="control-label" for="cboPresentacion">Presentación</label>

                            </div>
                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls" id="divCboPresentacion">
                                        <select id="cboPresentacion" class="span12" data-placeholder="Presentación">
                                            <option value="" selected></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtmodelo">
                                        Modelo</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtmodelo" name="txtmodelo" class="m-wrap span12 required" placeholder="Ej. FX890" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="txtproducto" class="control-label">
                                            Nombre Producto
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtproducto" name="txtproducto" class="m-wrap span12 required" placeholder="Marca + SubGrupo + Modelo" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="codproducto" class="control-label">
                                            Código  Producto
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="codproducto" name="codproducto" class="m-wrap span12 required" placeholder="Ej. 1001214521" />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                               <div class="control-group">
                                   <div class="controls">
                                       <button type="button" id="btnGenerarCode" class="btn black" title="Generar Código"><i class="icon-plus-sign" style="line-height: initial;"></i></button>
                                   </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="cbomoneda" class="control-label">
                                            Moneda Precios
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls" id="con_moneda">
                                        <select id="cbomoneda" class="span12 required" data-placeholder="Moneda">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="codauxiliar" class="control-label">
                                            Código  Auxiliar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="codauxiliar" name="codauxiliar" class="m-wrap span12" maxlength="30" placeholder="Ej. SA45R5A" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="txtnomcomercial" class="control-label">
                                            Nombre Comercial
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span9">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtnomcomercial" name="txtnomcomercial" class="m-wrap span12" placeholder="Nombre por el cual se le conoce al Producto." />
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="button" id="btnNombreAlt" class="fila_0 btn black" title="Nombres Alternativos"><i class="icon-plus-sign" style="line-height: initial;"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="txtEspAdicional" class="control-label">
                                            Esp. Adicional
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span10">
                                <%--<input type="text" id="txtEspAdicional" name="txtEspAdicional" maxlength="99" class="m-wrap span12" placeholder="Especificación adicional" />--%>

                                <div class="controls">
                                    <textarea id="txtEspAdicional" maxlength="200" rows="2" class="m-wrap span12" placeholder="Especificación adicional" style="resize: vertical; max-height: 200px;"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label for="chkDetraccion" class="control-label">
                                            Sujeto a Detracción
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="span1">
                                <div class="control-group">
                                    <input type="checkbox" id="chkDetraccion" name="chkDetraccion" />
                                </div>
                            </div>
                            <div class="span7">
                                <div class="control-group span11">
                                    <select id="cboDetraccion" name="cboDetraccion" class="m-wrap span12" data-placeholder="Seleccionar Tipo Detracción" tabindex="15" disabled="disabled">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="span1">
                                    <span id="info_btnf"><i style="color: #888; cursor: help;" class="icon-info-sign"></i></span>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group span11">
                                    <input type="text" id="txtDetraccion" name="txtDetraccion" class="m-wrap span12" disabled="disabled" />
                                </div>
                                <div class="span1">
                                    <p style="margin-top: 8px;">%</p>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid">
                            <div class="span1">
                                <label for="tipoBien" class="control-label">
                                    Bien
                                </label>
                            </div>

                            <div class="span2 offset1">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="control-label">
                                            <input type="radio" class="m-wrap span12" id="rbGravado" name="rbTipoBien" value="GRA" checked="checked" />
                                            Gravado
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span2 offset">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="control-label">
                                            <input type="radio" class="m-wrap span12" id="rbExonerado" name="rbTipoBien" value="EXO" />
                                            Exonerado
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="tipoBien">
                                        <input type="radio" class="m-wrap span12" id="rbInafecto" value="INA" name="rbTipoBien" />
                                        Inafecto
                                    </label>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group">
                                    <div class="controls">
                                        <label class="radio">
                                            <div class="radio disabled">
                                                <span>
                                                    <input type="checkbox" style="opacity: 0;" value="ISC" id="rbIsc" />
                                                </span>
                                            </div>
                                            ISC en Venta
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span2">
                                <div class="control-group span11">
                                    <input type="text" id="txtIsc" name="txtIsc" onkeyup="javascript:validaMaximoIsc();" onkeypress=' return ValidaPorcentaje(this.id)' class="m-wrap span12" disabled="disabled" placeholder="ISC" />
                                </div>
                                <div class="span1">
                                    <p style="margin-top: 8px;">%</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="span4">
                        <div class="row-fluid">
                            <ul class="thumbnails">
                                <li class="span11">
                                    <img id="imgDNI" style="height: 200px; width: 200px;" class="thumbnail" src="data:image/jpeg;base64,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" />
                                    <div class="span12">
                                        <input type="file" class="btn lightblue" id="fileDNI" name="fileDNI" value="../../recursos/img/150x150.gif" />
                                    </div>
                                    <div class="span12" style="margin-top: 5px;">
                                        <button style="width: 148px;" type="button" id="A1" onclick="javascript:TomaFoto();" class="span8 btn purple"><i class="icon-camera"></i>Tomar Foto</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="span8">
                            <br />
                            Link Ficha Técnica:
                        <br />
                            <div class="control-group">
                                <div class="controls">
                                    <input type="text" id="txtfichatecnica" name="txtfichatecnica" class="m-wrap span12" placeholder="URL ficha Técnica" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <a id="grabarProducto" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cerrar</a>
                </div>
            </div>
        </div>
    </div>
        
    <div id="ModalFoto" style="width: 520px;" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
                <h3 id="H4">Cámara</h3>
            </div>
            <div class="modal-body" aria-hidden="true">

                <div class="contenedor2">
                    <div class="titulo">Video</div>
                    <video id="camara" autoplay></video>
                </div>
                <div id='botonera' align="center">
                    <button id="botonfoto" type="button" class="btn red ">Capturar Imagen</button>
                </div>
                <div class="contenedor">
                    <div class="titulo">Foto</div>
                    <canvas id="foto"></canvas>
                </div>

            </div>
            <div class="modal-footer">
                <a href="javascript:rptano();" class="btn">Cancelar</a>
                <a href="javascript:rptasi();" class="btn blue">Insertar</a>
            </div>
        </div>
    </div>

    <div id="muestraVistaPrev" style="width: 700px; height: 80%; display: none;" class="modal fade" tabindex="-2" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel2">
        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
                <h4 id="myModalLabel2"></h4>
            </div>
            <div id="divmodal" class="modal-body" aria-hidden="true" style="overflow: hidden;">
                <!--aki se carga el contenido por jquery-->
                <iframe class="frame"></iframe>
            </div>
        </div>
    </div>

    
    <div id="ModalNombreAlt" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="width: 50%;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #fff;">
                    <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
                        <i class="icon-remove"></i>
                    </button>
                    <h4 class="modal-title">Nombres Alternativos</h4>
                </div>
                <div class="modal-body">
                    <div class="row-fluid">
                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <label for="txtNombreAlt" class="control-label">
                                        Nombre:
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="span9">
                            <div>
                                <div>
                                    <input type="text" id="txtNombreAlt" class="span12 m-wrap" maxlength="250" placeholder="INGRESE NOMBRE ALT" />
                                </div>
                            </div>
                        </div>

                        <div class="span1">
                            <div class="control-group">
                                <div class="controls">
                                    <button type="button" id="btnAddNombreAlt" class="btn green" title="Agregar"><i class="icon-plus" style="line-height: initial;"></i></button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row-fluid">
                        <div class="span12">
                            <table id="tblNombreAlt" class="table display table-bordered DTTT_selectable" role="grid">
                                <thead style="background-color: #4b8df8; color: aliceblue;">
                                    <tr>
                                        <th>NOMBRES</th>
                                        <th style="width: 5%;">#</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>




</div>

<input type="hidden" id="hfPrecioInd" value="E" />

<script src="vistas/NM/js/NMMPROR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMPROR.init();
    });
</script>
