<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMPROD.ascx.vb" Inherits="vistas_NM_NMMPROD" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/bootstrap-treeview/bootstrap.css" type="text/css" />
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
                <h4><i class="icon-reorder"></i>MANTENIMIENTO PRODUCTOS/SERVICIOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=nmmprod"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=nmlprod"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <!-- FN DEL TITULO-->
            <!-- INICIA EL CUERPO DE LA FORMA-->
            <div class="portlet-body" id="producto">

                <!-- SE INICIAN LOS TABS-->
                <div class="tabbable tabbable-custom boxless">

                    <!-- TITULO DE LOS TABS-->
                    <ul class="nav nav-tabs">
                        <li class="active"><a id="tabGeneral" href="#general" data-toggle="tab"><i class="icon-file"></i>&nbsp; General</a></li>
                        <li class="advance_form_with_chosen_element"><a id="tabMantPre" href="#Precio" data-toggle="tab"><i class="icon-file"></i>&nbsp; Precio</a></li>
                        <li class="advance_form_with_chosen_element"><a id="tabCatCali" href="#Calidad" data-toggle="tab"><i class="icon-file"></i>&nbsp; Calidad</a></li>
                        <li><a class="advance_form_with_chosen_element" id="tabContable" href="#contable" data-toggle="tab"><i class="icon-cog"></i>&nbsp; Contable</a></li>
                    </ul>

                    <div class="tab-content">
                        <!-- INICIO DEL TAB GENERAL-->
                        <div class="tab-pane active" id="general">
                            <br />
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
                                            <label class="control-label" for="slcEmpresa">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <div class="control-group">
                                            <div class="controls" id="controlempresa">
                                                <select id="slcEmpresa" name="slcEmpresa" class="m-wrap span12 required empresa" data-placeholder="Seleccionar Empresa" tabindex="1">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span1">
                                        <div class="control-group">
                                            <label class="control-label" for="txtcodigo">Código</label>
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
                                                <label class="control-label" for="cboexistencia">Tipo Existencia</label>
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
                                                        <label class="control-label" for="txtPeso">Peso (Kg.)</label>
                                                    </div>
                                                </div>
                                                <div class="span6">
                                                    <div class="controls">
                                                        <input type="text" id="txtPeso" name="txtPeso" class="m-wrap span12 number" onkeypress="return ValidaDecimales(event,this,3)" placeholder="0.00" disabled="disabled" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row-fluid">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="cbogrupo">Grupo</label>
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
                                                <label class="control-label" for="cbosubgrupo">Sub-Grupo</label>
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
                                                <label class="control-label" for="cbounidad" style="background-color: #F5B400; padding-bottom: 3px; padding-left: 17px; padding-top: 3px; border-radius: 3px;">
                                                    Unidad venta</label>
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
                                                <label class="control-label" for="cbomarca">Marca</label>
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
                                                <label class="control-label" for="txtvolumen">Volumen</label>
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
                                                <label class="control-label" for="txtmodelo">Modelo</label>
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
                                                    <label for="txtproducto" class="control-label">Nombre Producto</label>
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
                                                    <input type="text" id="codproducto" name="codproducto" class="m-wrap span12 required" placeholder="Ej. 1001214521" onkeyup="this.value=solonumletra(this.value)"/>
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
                                                        Cód. Auxiliar
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
                                                    <input type="text" id="txtnomcomercial" name="txtnomcomercial" class="span12" placeholder="Nombre por el cual se le conoce al Producto." />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="span1">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <button type="button" id="btnNombreAlt" class="btn black" title="Nombres Alternativos"><i class="icon-plus-sign" style="line-height: initial;"></i></button>
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

                                       <%-- <div class="span2">
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
                                        </div>--%>

                                    </div>

                                    <div class="row-fluid">
                                        <div class="span2">
                                            <label for="afectoIsc" class="control-label">
                                                Afecto a ISC al venderlo
                                            </label>
                                        </div>
                                         <div class="span1">
                                            <div class="control-group">
                                                <input type="checkbox" style="opacity: 0;" value="ISC" id="rbIsc" />
                                            </div>
                                        </div>
                                        <div class="span7">
                                            <div class="control-group span11">
                                                <select id="cboTipoSistema" name="cboDetraccion" class="m-wrap span12" data-placeholder="Seleccionar Tipo Sistema del ISC" tabindex="15" disabled="disabled">
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="span1">
                                                <span id="btn_info_isc"><i style="color: #888; cursor: help;" class="icon-info-sign"></i></span>
                                            </div>
                                        </div>

                                        <div class="span2">
                                            <div class="control-group span11">
                                                <input type="text" id="txtIsc" name="txtIsc" onkeyup="javascript:validaMaximoIsc();" onkeypress=' return ValidaDecimales(event, this, 2)' class="m-wrap span12" maxlength="6" disabled="disabled" placeholder="ISC" />
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
                                                <img id="imgDNI" style="height: 200px; width: 200px;" class="thumbnail" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAFeAV4DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQG/8QALRABAAIBAQUIAwACAwAAAAAAAAECEQMEEhMhMRQyM0FRUmFxIoGRQlMjJEP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAlAaCJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJlAXKpEKAAAAAkwoDLUSkwgNCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmSUAWIIhQAAAAAAAAGZhoBlqJSYQGgiQAAAAAAAAAAAAAAAAAAAAAAAABDKALgiFAAAAAAAAAAAAATCgMqkgNBAAAAAAAAAAAAAAAAAAAAAAkySgCxBCgAAAAAAAAAAAAAAAAJhQGY6tZZkgGgAAAAAAAAAAAAAAAAAElUwCLEKAAAAAAAAAAAAAAAAAAAAAGAAAAGZvWJxNo/pxKe6P6DQzxKe6P6cSnuj+g0M8Snuj+rFonpMSCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMcTTzjfhq3ct9PJo7LS9d6esyCV2euta9ptPXliW+w6fut/XopStK7tYaB5ew6fut/TsOn7rf16gHl7Dp+639dNOlNDlNuXy7Oero11u9ALxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyD0VvW3dnKuOlpV0cxXzdgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1MHKDOQMGAA6DN5xWZyUtF6xaAaAABYgEFzhnejpmAUAAAGZ7zTM95oAAAAAAAAAAAAAAAAAAAAAAAAEt3Z+nPZvC/bpbuz9OezeF+wdJjMT5S81p2qszFaxMer1APHxNr/ANcG/tn+uHsAePd2nW/G8RWvm9VKRSsVjyaAAAInHNjV1I0qTe8tebx68Tr7RFP8a9QY3tfaZzWZpRY2O3WdS2ft7aVitYx0hqZ+AeKOPoTnO9V6tO8alcwTiLYnzc614ery6WB2ifLzhWLTu3iZ8+TYMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9OezeF+3S3dn6c9m8L9g6gAAAAAAAkd559OP+xfLvM4t8SxemL78fsFrf8ALddHDV05vGazizhNtq7sY+8A662pE7RStec+braMy5bPocOd605tL0Y/sg5a84mkesuzyzbjbXuxzrR6gZnvNMz3mgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1AAAAAAABnUrNq4jq56etEzu35Wj1dnPV0aakYnlPqDW7ELux5y8u5tOl3Ji8fJOttOPA5g9fKvR5to2j/AA0vyvPp5OW5tWvOLzuQ9Gjs9NLpznzkDZtLhU596esux5gMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9Oez+H+3WYzWY9WNGm5TE+oNigIKAgoCCgIKAgoCCgIKAx/k0mOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAluks6U5plq3dljR8MHTMepmPVx0672cz5lazvzXPKAdsxPSRxmNzUjd6S3qRWcb04gG8x6jhmIvG7M4b1JmbVr6g3mPVXO2nEV5ZhmLTXRz8g7Zj1HCIpjM25/bVJzSecg65j1HHTpvVzMyunmLzXyB1cdW0xeIj0dnO3jR9A3Wd6rGZ40x8JH/AB3x5SsePP0DomY9XO2b6m75QXpu1zXPIHUSk5rEqAAAAAAAAAAAAAAAAAAAAAACW7ssaUTGm6HTkDnpZiJK+NLpjADlqd+pacamZ5w6pMRPWAcrTm1d2OS6mYtW3lDriPRm1t3rGQZtqRNeXOWYrNtHHyTbe/GtebpSu7WIBiLVxzjm1ymk4hrEZ6L+gY0o/DCVieLMuhjzAc7RPGrPw6HyDN670Oennic3Y/QOVs01N6Y5SXvFo3a55uqRGAKRisR6KAAAAAAAAAAAAAAAAAAAAAAABkc9XnaseoOmfkc+FHlMlJmLTSZ+gbzGcZVnFd/5LXrXrINCRaJjMJN646g0JW0W6SWtFeoKMxeszylZtEYyCk8meJXOMrbE159AMxjKxzc78tPl0K3rERGQdEic9CJi1cwxpef2DoMzesTiZhYmLdJBQAAAAAAAAAAAAAAAAAASZAyIoKAA56vfo6OerE5rMRnAOjlPPWjHku9eeUVwtKYzM9ZBn/3n6TuWnejMS1uzxc/BN55xNcg1GJrOGNGsTEzK0rMUtM+fkxp2msdMwDUxu6sY6FY3rzMlYm1t63ImLUtmIzEgatYrG9HKU1Oe4s72pOMYhb1zNceQLesbnJnnOjLd4zWYZ3Z4UwDNvAbpWN3nEJNZ4OMc0i1q1iJqBTle0eSUmYraWqVmM2nrJSs4tE+YMUtGMzWZmWtOfznliErM0jG7l0rMz5YBoAElIlpkGhmGoAAAAAAAAAAABJkCZQWIAhQAAAAAAAABJzhnTru1xLYAAAAAAAAAAAAAAAYAGZjA1LINCKAAAAAAACTIEygsAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMkLhJjANDLQAAAJIEygoGFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAZVWQaGYaATCgJEKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgATCgD//2Q==" />
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
                                                <%--data-toggle="modal" data-target="#muestraVistaPrev"/>--%>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-actions">
                                <a id="grabarProducto" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                                <a id="cancelar" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>&nbsp;Cerrar</a>
                            </div>

                           
                           

                        </div>
                        <!-- FIN DE GENERAL-->

                        <!-- INICIO DEL TAB PRECIO-->
                        <div class="tab-pane" id="Precio">
                            <%--VENTANA PRECIOS--%>
                            <div class="span6" id="p_precios">
                                <div class="portlet box red">
                                    <div class="portlet-title">
                                        <h4><i class="icon-tags"></i>Mantenimiento de Precios</h4>
                                        <div class="tools">
                                            <a id="btnCargarCostos" href="#portlet-costos" data-toggle="modal" class="config" title="Costeo del Producto"></a>
                                        </div>
                                    </div>
                                    <div class="portlet-body">

                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboAlmacen">Almacen</label>
                                                </div>
                                            </div>
                                            <div class="span9">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <select id="cboAlmacen" name="cboAlmacen" class="m-wrap span12 required combobox" data-placeholder="Seleccionar Almacen" tabindex="1">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row-fluid">
                                            <div class="span3">
                                                <div class="control-group">
                                                    <label class="control-label" for="cboAlmacen">Costo</label>
                                                </div>
                                            </div>
                                            <div class="span4">
                                                <div class="control-group">
                                                    <div class="controls">
                                                        <input type="text" class="m-wrap span12 derecha" id="txtCosto" value="0" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row-fluid" style="margin-bottom: 10px;">

                                            <div class="span10">
                                                <div class="controls">
                                                    <label class="radio">
                                                        <div class="radio" id="Div1">
                                                            <span>
                                                                <input type="radio" name="rbPrecio" id="rbPrecioEstandar" style="opacity: 0;" value="E" checked="checked" />
                                                            </span>
                                                        </div>
                                                        Estándar
                                                    </label>
                                                    <label class="radio">
                                                        <div class="radio" id="Div2">
                                                            <span>
                                                                <input type="radio" name="rbPrecio" id="rbPrecioCantidad" style="opacity: 0;" value="C" />
                                                            </span>
                                                        </div>
                                                        Cantidad
                                                    </label>
                                                    <label class="radio">
                                                        <div class="radio" id="Div3">
                                                            <span>
                                                                <input type="radio" name="rbPrecio" id="rbPrecioCliente" style="opacity: 0;" value="L" />
                                                            </span>
                                                        </div>
                                                        Clientes
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="span2">
                                                <a id="btnActualizarPrecioInd" title="Guardar indicador de precio" href="javascript:ActualizarIndicadorPrecio();" class="btn blue" style="margin-top: 7px;"><i class="icon-ok-sign"></i></a>
                                            </div>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span12">
                                                <!--BEGIN TABS-->
                                                <div class="tabbable tabbable-custom">
                                                    <ul class="nav nav-tabs">
                                                        <li id="btnTab1" class="active"><a href="#tab_1_1" data-toggle="tab">Precio Estándar</a></li>
                                                        <li id="btnTab2"><a href="#tab_1_2" data-toggle="tab">Precio por Cantidad</a></li>
                                                        <li id="btnTab3"><a href="#tab_1_3" data-toggle="tab">Precio por Cliente</a></li>
                                                    </ul>
                                                    <div class="tab-content">
                                                        <div class="tab-pane active" id="tab_1_1">

                                                            <div class="row-fluid">
                                                                <div class="span3 offset5">
                                                                    <p class="pull-right">Utilidad %</p>
                                                                </div>
                                                                <div class="span4">
                                                                    <p class="pull-right">Precio</p>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span5">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label for="txtprenormal" class="control-label">
                                                                                Precio Normal
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtUtilidadNormal" onkeyup="return ValidaPorcentaje(this.id)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtprenormal" onkeypress="return ValidaDecimales(event,this,6)" style="text-align: right;" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span5">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label for="txtpreminimo" onkeypress="return ValidaDecimales(event,this,6)" class="control-label">
                                                                                Precio Mínimo
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtUtilidadMinimo" onkeyup="return ValidaPorcentaje(this.id)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtpreminimo" onkeypress="return ValidaDecimales(event,this,6)" style="text-align: right;" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-actions">
                                                                <a id="btnCalcularPreciosEstandar" class="btn green" title="Calcular precio basado en costo"><i class="icon-beaker"></i>&nbsp;Calcular</a>
                                                                <a id="g_pre_estandar" class="btn blue" href="javascript:GrabarPrecioEstandar();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                                                <!--a id="A3" class="btn" href="javascript:CerrarModalPersonaNatural();"><i class="icon-remove"></i>&nbsp;Cerrar</a-->
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane" id="tab_1_2">

                                                            <div class="row-fluid">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtUtilidadCantidad" title="Utilidad">
                                                                                Rango
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span9">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <select id="cboRango" name="cboRango" class="m-wrap span12" data-placeholder="Rango" tabindex="1">
                                                                                <option></option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtUtilidadCantidad" title="Utilidad">
                                                                                Ut.%
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtUtilidadCantidad" onkeyup="return ValidaPorcentaje(this.id)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtprecantidad">
                                                                                Precio
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtprecantidad" onkeypress="return ValidaDecimales(event,this,6)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row-fluid">
                                                                <div class="span12">
                                                                    <div class="pull-right">
                                                                        <a id="btnCalcularPreciosCantidad" class="btn green" title="Calcular precio basado en costo" style="margin-bottom: 5px;"><i class="icon-beaker"></i></a>
                                                                        <a id="btnGrabarPreCantidad" href="javascript:GrabarPrecioCantidad();" class="btn blue icn-only" style="margin-bottom: 5px;"><i class="icon-plus icon-white"></i></a>
                                                                        <a id="btnRecargarPreCantidad" href="javascript:recargarPrecioCantidad();" class="btn green icn-only" style="margin-bottom: 5px;"><i class="icon-refresh icon-white"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span12 scroller" data-height="150px" id="lista_precios_cantidad">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="tab-pane" id="tab_1_3">

                                                            <div class="row-fluid">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtUtilidadCliente" title="Utilidad">
                                                                                Lista
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span9">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <select id="cboLista" name="cboLista" class="m-wrap span12" data-placeholder="Seleccione una lista" tabindex="1">
                                                                                <option></option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtUtilidadCliente" title="Utilidad">
                                                                                Ut.%
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span3">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtUtilidadCliente" onkeyup="return ValidaPorcentaje(this.id)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span2">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <label class="control-label" for="txtprecliente">
                                                                                Precio
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="span4">
                                                                    <div class="control-group">
                                                                        <div class="controls">
                                                                            <input type="text" class="m-wrap span12" id="txtprecliente" onkeypress="return ValidaDecimales(event,this,6)" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row-fluid">
                                                                <div class="span12">
                                                                    <div class="form-actions">
                                                                        <a id="btnCalcularPreciosCliente" class="btn green" title="Calcular precio basado en costo"><i class="icon-beaker"></i>&nbsp;Calcular</a>
                                                                        <a id="btnGrabarPreCliente" class="btn blue" href="javascript:GrabarPrecioCliente();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                                                        <!--a id="A3" class="btn" href="javascript:CerrarModalPersonaNatural();"><i class="icon-remove"></i>&nbsp;Cerrar</a-->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row-fluid">
                                                                <div class="span12 scroller" data-height="150px" id="lista_precios_cliente">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--END TABS-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6" id="p_categoria">
                                <div class="portlet box yellow">
                                    <div class="portlet-title">
                                        <h4><i class="icon-user-md"></i>Descuentos por Categoría de Clientes</h4>
                                        <div class="tools">
                                        </div>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="row-fluid">
                                            <div class="span12" id="tbl_det_categoria">
                                            </div>                                          
                                        </div>

                                        <div class="form-actions">
                                            <a id="registrar_descuento" class="btn blue"><i class="icon-save"></i>&nbsp;Grabar</a>
                                            <!--a id="A3" class="btn" href="javascript:CerrarModalPersonaNatural();"><i class="icon-remove"></i>&nbsp;Cerrar</a-->
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- FIN DEL TAB PRECIO-->

                        <!-- INICIO DEL TAB CLIENTE-->
                        <div class="tab-pane" id="Calidad">
                            <%--VENTANA CALIDAD--%>
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span1" style="text-align:right">
                                        <div class="control-group">
                                            <label class="control-label" for="cbo_acreditacion">Acreditación</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <select id="cbo_acreditacion" name="cbo_acreditacion" class="m-wrap span12" data-placeholder="Seleccionar Acreditacion" tabindex="1">
                                                    <option></option>                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>   
                                    
                                    <div class="span1"  style="text-align:right">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_unico">Nro Unico</label>
                                        </div>
                                    </div>
                                    <div class="span2">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" id="txt_unico" name="txt_unico" class="span12" placeholder="Nro Unico" maxlength="50" >
                                            </div>
                                        </div>
                                    </div>                                       

                                    <div class="span1"  style="text-align:right">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fechaInicio">F. Inicio</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fechaInicio" data-date-format="dd/mm/yyyy" maxlength="10">
                                            </div>
                                        </div>
                                    </div> 
                                    
                                    <div class="span1"  style="text-align:right">
                                        <div class="control-group">
                                            <label class="control-label" for="txt_fechaFin">F.Fin</label>
                                        </div>
                                    </div>
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txt_fechaFin" data-date-format="dd/mm/yyyy" maxlength="10">
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="span1">
                                        <div class="control-group">
                                            <div class="controls">
                                                <button type="button" id="add_calidad" class="btn green" title="Agregar Acreditación" onclick="fnAgregarAcreditacion();"><i class="icon-plus-sign" style="line-height: initial;"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            
                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="span6">
                                        <div class="control-group">
                                            <div class="checkbox" id="dchkactivocre">
                                                <label>
                                                    <input type="checkbox" id="chkactivoAcre" value="" onclick="fnSoloActivo();"> Ver sólo Acreditaciones Activas
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>

                            <div class="row-fluid">
                                <div class="span12">
                                    <div class="portlet box purple">
                                    <div class="portlet-title">
                                        <h4><i class="icon-user-md"></i>&nbsp;Acreditaciones de Producto</h4>
                                        <div class="tools">
                                        </div>
                                    </div>
                                    <div class="portlet-body" style="position: relative; zoom: 1;">
                                        <div class="row-fluid" style="margin-top: 10px;">
                                            <div id="divDocumento">
                                                <table id="tblAcreditacion" class="display DTTT_selectable bordered dataTable no-footer" style="border: 1px solid #cbcbcb; width:100%;">
                                                    <thead class="fondoHeader">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>ACREDITACION</th>
                                                            <th>TIPO</th>
                                                            <th>NRO UNICO</th>
                                                            <th>F.INICIO</th>
                                                            <th>F.FIN</th>
                                                            <th>ESTADO</th>                                                            
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="form-actions">
                                            <a id="registrar_acreditaciones" class="btn blue" onclick="fnGuardarAcreditacion();"><i class="icon-save"></i>&nbsp;Grabar</a>                                            
                                        </div>
                                    </div>
                                </div>
                                </div>                                
                            </div>
                        </div>
                        <!-- FIN DEL TAB CLIENTE-->     

                        <!-- INICIO DEL TAB CONTABILIDAD-->
                        <div class="tab-pane" id="contable">
                            <div class="row-fluid">
                                <div class="span12" id="p_centroCostos">
                                    <div class="portlet box yellow">
                                        <div class="portlet-title">
                                            <h4><i class="icon-user-md"></i>Centro de Costo</h4>
                                            <div class="tools">
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row-fluid">
                                                <div class="span3">Centro Costo</div>
                                                <div class="span7">
                                                    <input type="text" id="txt_centro_costo" class="m-wrap span12 centroCostos" disabled="disabled" />
                                                </div>
                                                <div class="span1">
                                                    <button id="btnBuscarCentroCto" class="btn green centroCostos" type="button"><i class="icon-search" style="line-height: initial"></i></button>
                                                    <%--<input type="button" class="btn green" value="..." id="btnAddCeCo"  />--%>
                                                </div>
                                            </div>
                                            <div class="row-fluid">
                                                <div class="form-actions">
                                                    <a id="btnActualiza" class="btn blue" href="javascript:ActualizaCeco();"><i class="icon-save"></i>&nbsp;Actualizar Centro</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span12" id="p_cuentas">
                                    <div class="portlet box green">
                                        <div class="portlet-title">
                                            <h4><i class="icon-book" contenteditable="true"></i>Cuentas Contables</h4>
                                            <div class="tools">
                                                <%--<a href="#portlet-config" data-toggle="modal" class="config"></a>--%>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="scroller" data-height="550px">
                                                <div class="row-fluid">
                                                    <div class="span10">
                                                        <h5 id="configcompras" style="color: blue"></h5>
                                                        <h5 id="configVentas" style="color: blue"></h5>
                                                    </div>
                                                    <div class="span2">
                                                        <a id="A3" class="btn blue" href="javascript:ActualizarNuevaConfig();"><i class="icon-save"></i>&nbsp;Grabar</a>
                                                    </div>
                                                </div>

                                                <br />
                                                <div class="row-fluid">
                                                    <div class="tabbable tabbable-custom boxless" style="display: block;" id="estereotipos">
                                                        <!-- TITULO DE LOS TABS-->
                                                        <ul class="nav nav-tabs">
                                                            <li id="liCompras" class="active"><a id="tabCompras" href="#Compras" data-toggle="tab"><i class=""></i>COMPRAS</a></li>
                                                            <li id="liVentas"><a class="advance_form_with_chosen_element" id="tabVentas" href="#Ventas" data-toggle="tab"><i class=""></i>VENTAS</a></li>
                                                            <li id="liAlmacen"><a class="advance_form_with_chosen_element" id="tabAlmacen" href="#Almacen" data-toggle="tab"><i class=""></i>ALMACEN</a></li>
                                                        </ul>
                                                        <div class="tab-content">
                                                            <!-- PANEL DE DÍNAMICA DE COMPRAS-->
                                                            <div class="tab-pane active" id="Compras">
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <table id="tbldinamicaCompras" class="table table-bordered">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td style="text-align: center"></td>
                                                                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                                                                    <td style="text-align: center">Debe</td>
                                                                                    <td style="text-align: center">Haber</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>COMPRA</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaCompra_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaCompra" class="cuentas span12" data-placeholder="Cuentas compra"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe1" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber1" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <!-- Deshabilita configuración cuentas contables - ERICK (13/02/2018)
                                                                                <tr>
                                                                                    <td>IGV</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaIgv_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaIgv" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe2" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber2" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Compra MN</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaCompraMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaCompraMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe3" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber3" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Compra ME</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaCompraME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaCompraME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe4" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber4" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Compra Relac. MN</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaCompraRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaCompraRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe5" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber5" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Compra Relac. ME</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaCompraRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaCompraRelME" class="cuentas span12" data-placeholder="Cuentas Documento Compra MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebe6" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaber6" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                -->
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- PANEL DE DÍNAMICA DE VENTAS-->
                                                            <div class="tab-pane" id="Ventas">
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <table id="tbldinamicaVentas" class="table table-bordered">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td style="text-align: center"></td>
                                                                                    <td style="text-align: center" colspan="2">Cuenta Contable</td>
                                                                                    <td style="text-align: center">Debe</td>
                                                                                    <td style="text-align: center">Haber</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>VENTA</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaVenta_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaVenta" class="cuentas span12" data-placeholder="Cuentas venta"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev1" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv1" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>

                                                                                <!-- Deshabilita configuración cuentas contables - ERICK (13/02/2018)
                                                                                <tr>
                                                                                    <td>IGV</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaIgv_venta_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaIgv_venta" class="cuentas span12" data-placeholder="Cuentas Impuesto IGV"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev2" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv2" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Venta MN</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaVentaMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaVentaMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev3" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv3" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Venta ME</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaVentaME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaVentaME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev4" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv4" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Venta Relac. MN</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaVentaRelMN_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaVentaRelMN" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev5" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv5" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doc. Venta Relac. ME</td>
                                                                                    <td>
                                                                                        <span id="cbo_cuentaVentaRelME_desc" class="cuentasdesc span12" style="color: rgb(3, 112, 3); font-weight: bolder;"></span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <select id="cbo_cuentaVentaRelME" class="cuentas span12" data-placeholder="Cuentas Documento Venta MN"></select>
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxDebev6" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                    <td style="text-align: center">
                                                                                        <input id="chxHaberv6" type="checkbox" style="opacity: 0;">
                                                                                    </td>
                                                                                </tr>
                                                                                -->

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="tab-pane" id="Almacen">
                                                                <div class="row-fluid">
                                                                    <div class="span12">
                                                                        <!-- CONFIG ALMACEN -->

                                                                        <div class="row-fluid contabilidad">
                                                                            <div class="span12">
                                                                                <table id="tblConfigContabAlmacen" class="table table-bordered" style="width: 100%">
                                                                                    <colgroup>
                                                                                        <col span="1" style="width: 25%;">
                                                                                        <col span="1" style="width: 5%;">
                                                                                        <col span="1" style="width: 5%;">
                                                                                        <col span="1" style="width: 30%;">
                                                                                        <col span="1" style="width: 30%;">
                                                                                        <col span="1" style="width: 5%;">
                                                                                    </colgroup>
                                                                                    <thead>
                                                                                        <tr style="background-color: #D3D3D3;">
                                                                                            <th class="centro" colspan="2">Tipo de Existencia 
                                                                                            </th>
                                                                                            <th id="tipoexist" class="centro" colspan="4">MERCADERÍA
                                                                                            </th>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th onclick="w3.sortHTML('#tblConfigContabAlmacen','.ordenar', 'td:nth-child(1)')" class="centro">Movimiento
                                                                                            </th>
                                                                                            <th onclick="w3.sortHTML('#tblConfigContabAlmacen','.ordenar', 'td:nth-child(2)')" class="centro">Tipo
                                                                                            </th>
                                                                                            <th class="centro">Configurar
                                                                                            </th>
                                                                                            <th class="centro">Debe
                                                                                            </th>
                                                                                            <th class="centro">Haber
                                                                                            </th>
                                                                                            <th class="centro">Eliminar
                                                                                            </th>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <!-- FIN DE CONTABILIDAD-->

                    </div>

                </div>
                <!-- FIN DE LOS TABS-->

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
                    <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>--%>
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

<!-- VENTANAS MODALES-->
<div id="portlet-costos" class="modal hide">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button data-dismiss="modal" class=" btn red" style="margin-top: 6px; float: right;" type="button"><i class="icon-remove"></i></button>
        <h3>Valor de Costeo del Producto</h3>
    </div>
    <div class="modal-body">
        <table style="width: 90%;" align="center">
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <label for="txtUltimaCompra" class="control-label">
                                    Establecimiento
                                </label>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span11 offset1" data-placeholder="Establecimiento">
                                </select>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <label for="txtUltimaCompra" class="control-label">
                                    Valor Última Compra
                                </label>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <span class="simboloMoneda" style="vertical-align: sub;"></span>
                                <input type="text" id="txtUltimaCompra" class="m-wrap span5 offset1" disabled="disabled" style="text-align: right;" />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <label for="txtValorizado" class="control-label">
                                    Valorizado
                                </label>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <span class="simboloMoneda" style="vertical-align: sub;"></span>
                                <input type="text" id="txtValorizado" class="m-wrap span5 offset1" disabled="disabled" style="text-align: right;" />
                            </div>
                        </div>

                    </td>

                </tr>
                <tr>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <label for="txtNeto" class="control-label">
                                    Valor Neto
                                </label>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="control-group">
                            <div class="controls">
                                <span class="simboloMoneda" style="vertical-align: sub;"></span>
                                <input type="text" id="txtNeto" class="m-wrap span5 offset1" disabled="disabled" style="text-align: right;" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal Centro de Costo -->
<div id="modal-centrocosto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title">CENTROS DE COSTO</h4>
            </div>
            <div class="modal-body">
                <div class="row-fluid">
                    <div class="span2"></div>
                    <div class="span8">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtFiltrarCentroCosto">Buscar</label>
                                </div>
                            </div>
                            <div class="span8">
                                <div class="control-group ">
                                    <div class="controls">
                                        <input id="txtFiltrarCentroCosto" class="span12 " type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span2"></div>
                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span10">
                        <div id="treeCentroCostos" class="treeview">
                        </div>
                    </div>
                    <div class="span1"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnAceptarCentroCosto" class="btn btn-secondary green"><i class="icon-ok"></i>&nbsp;Aceptar</button>
                <button type="button" id="btnCancelarCentroCosto" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
            </div>
        </div>
    </div>
</div>
<!-- FIN DE LA VENTANA MODAL-->



<!-- Modal -->
<div id="modal-ctascontabalmacen" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title">CUENTAS CONTABES</h4>
            </div>
            <div class="modal-body">

                <div class="row-fluid">
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboCtaDebeAlmacen">Debe</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboCtaDebeAlmacen" class="span12 combobox" data-placeholder="Seleccionar Cuenta">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span1">
                    </div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboCtaHaberAlmacen">Haber</label>
                        </div>
                    </div>
                    <div class="span8">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboCtaHaberAlmacen" class="span12 combobox" data-placeholder="Seleccionar Cuenta">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnGrabarConfigContabAlmacen" class="btn btn-secondary blue"><i class="icon-save"></i>&nbsp;Grabar Configuración</button>
                <button type="button" id="btnCancelarCtaContabAlmacen" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
            </div>
        </div>
    </div>
</div>

<%--<script type="text/javascript" async src="recursos/plugins/data-tables/js/jquery.jeditable.js"></script>
<script type="text/javascript" async  src="recursos/plugins/data-tables/js/jquery.dataTables.editable.js"></script>
<script type="text/javascript" async src="recursos/plugins/data-tables/js/validate.js"></script>--%>
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../../recursos/plugins/bootstrap-treeview/bootstrap-treeview.js?<%=aleatorio%>"></script>
<script src="vistas/NM/js/NMMPROD.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMPROD.init();
    });
</script>
