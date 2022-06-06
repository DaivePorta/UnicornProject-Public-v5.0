<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMFDOC.ascx.vb" Inherits="vistas_NC_NCMFDOC" %>
<link href="../../../recursos/plugins/bootstrap-colorpicker/css/colorpicker.css" rel="stylesheet" />
<style>
    .campo {
        cursor: pointer;
    }

        .campo:hover {
            color: blue;
        }


</style>
<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONFIGURACION DE FORMATOS IMPRESOS</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMFDOC"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="?f=NCLFDOC"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
            </div>
            <div class="portlet-body">
                <!-- TITULO DE LOS TABS-->
                <ul class="nav nav-tabs">
                    <li id="liCabecera" class="active"><a id="tab_cab" href="#tabGenerales" data-toggle="tab"><i class=""></i>Datos Generales</a></li>
                    <li id="liDetalles"><a id="tab_det" class="advance_form_with_chosen_element" href="#tabDetalle" data-toggle="tab"><i class=""></i>Detalle</a></li>
                </ul>
                <div class="tab-content">
                    <div id="tabGenerales" class="tab-pane active">

                        <div class="row-fluid" style="padding: 4px">

                            <div class="span11">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtcodigo">
                                            Código</label>
                                    </div>
                                </div>
                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="txtcodigo" class="span10" disabled="disabled" type="text" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="chkEstado">
                                            Activo</label>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="chkEstado" type="checkbox" checked="checked" class="span12" />
                                        </div>
                                    </div>
                                </div>

                                <!----------->
                                <div class="span6" align="right">
                                    <div class="span12" style="margin-top: 5px;">
                                        <input type="file" class="btn blue" id="flImagen" />
                                    </div>
                                </div>
                                <!----------->
                            </div>

                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEmpresa">
                                            Empresa</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEstablecimiento">
                                            Establecimiento</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimiento">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="cboTipoDocumento">
                                            Tipo Documento</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboTipoDocumento" class="span12" data-placeholder="Tipo de Documento">
                                                <option></option>
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtImpresora">
                                            Impresora</label>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtImpresora" style="text-transform: uppercase" placeholder="Impresoras" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtnroitems">
                                            Número de Items
                                        </label>
                                    </div>
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtnroitems" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtespacioitms">
                                            Espacio entre Items (mm)
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtespacioitms" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group" style="text-align: right;">
                                        <label class="control-label" for="cboUnMeTam">
                                            Unidad de Medida 
                                        </label>
                                        <small style="color: GrayText">(Margenes y Dimensiones)</small>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select class="span8" id="cboUnMeTam" data-placeholder="U. MEDIDA">
                                                <option></option>
                                                <option value="in">PULGADA</option>
                                                <option value="cm">CENTIMETRO</option>
                                                <option value="mm">MILIMETRO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <!-------------------------->
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">

                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtmargx">
                                            Margen Izquierdo
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtmargx" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtmagy">
                                            Margen Superior
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtmagy" style="text-align: center" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" align="center">
                                    <div class="control-group">
                                        <label class="control-label" for="txtAlto">
                                            Alto Documento
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtAlto" value="0" style="text-align: center" onkeypress="return ValidaDecimales(event,this,2)" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" align="center">
                                    <div class="control-group">
                                        <label class="control-label" for="txtAncho">
                                            Ancho Documento
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtAncho" value="0" style="text-align: center" onkeypress="return ValidaDecimales(event,this,2)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-------------------------->
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtdescformato">
                                            Descripción
                                        </label>

                                    </div>
                                </div>

                                <div class="span10">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtdescformato" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <a id="btngrabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>&nbsp;Grabar</a>

                            <a id="btncancelar" class="btn"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>

                    <div id="tabDetalle" class="tab-pane">

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">


                                <div class="span2 " style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtvalory">
                                            Tipo Campo
                                        </label>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls" data-placeholder="Tipo de Campo">
                                            <select id="cboTipoCampo" class="span12">
                                                <option value="EC">Estático - Cabecera</option>
                                                <option value="DC" selected>Dinámico - Cabecera</option>
                                                <option value="DI">Dinámico - Item</option>
                                                <option value="EF">Estático - Pie</option>
                                                <option value="DF">Dinámico - Pie</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="cboCampoAsociado">
                                            Campo Asociado
                                        </label>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboCampoAsociado" class="span12" data-placeholder="Campo Asociado" disabled>
                                                <option value="" selected>NINGUNO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="chxconvlet">
                                            Convertir a Letras</label>
                                    </div>
                                </div>

                                <div class="span1" style="margin-left: 5px;">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input id="chxconvlet" type="checkbox" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtnombrecampo">
                                            Nombre Campo
                                        </label>

                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="span12" id="divNombreDinamico">
                                        <div class="control-group">
                                            <div class="controls" id="divCboCampos">
                                                <select id="cbCampos" class="span12" data-placeholder="Nombre Campo">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span12" id="divNombreEstatico" style="display: none;">
                                        <div class="control-group">
                                            <div class="controls" id="div2">
                                                <input id="txtNombreCampo" type="text" class="span12" placeholder="Nombre" maxlength="100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtTamanioLetra">
                                            Tamaño Letra
                                        </label>

                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="number" class="span12" id="txtTamanioLetra" value="11" style="text-align: left" onkeypress="return ValidaDecimales(event,this,2)" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="cboTipoLetra">
                                            Letra
                                        </label>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <%-- <input type="text" class="span12" id="txttamanioletra" style="text-align: center" />--%>
                                            <select id="cboTipoLetra" class="span12" placeholder="Fuente de Letra">
                                                <option value="Arial" style="font-family: Arial;">Arial</option>
                                                <option value="sans-serif" style="font-family: sans-serif;">Sans-serif</option>
                                                <option value="monospace" style="font-family: monospace;">Monospace</option>
                                                <option value="cursive" style="font-family: cursive;">Cursive</option>
                                                <option value="Lucida Console" style="font-family: Lucida Console;">Lucida Console</option>
                                                <option value="fantasy" style="font-family: fantasy;">Fantasy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">


                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtValor">
                                            Valor
                                        </label>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtValor" value="DINAMICO" placeholder="Valor" disabled />
                                        </div>
                                    </div>
                                </div>



                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtdescripcioncampo">
                                            Descripción
                                        </label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtdescripcioncampo" style="text-align: left" maxlength="50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span12">
                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txttamaniomaximo">
                                            Long Máxima Campo
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txttamaniomaximo" value="100" style="text-align: center" onkeypress="return ValidaNumeros(event,this)" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtvalorx">
                                            Valor X
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtvalorx" value="0" style="text-align: center" onkeypress="return ValidaDecimales(event,this,2)" />
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txtvalory">
                                            Valor Y
                                        </label>

                                    </div>
                                </div>

                                <div class="span1">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" class="span12" id="txtvalory" value="0" style="text-align: center" onkeypress="return ValidaDecimales(event,this,2)" />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">
                                <div class="span2" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="txttamaniomaximo">
                                            Color (RGB)
                                        </label>

                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <div class="controls">
                                            <div class="input-append color colorpicker-default" data-color="rgb(0,0,0)" data-color-format="rgb">
                                                <input type="text" id="txtColor" class="m-wrap span10" value="rgb(0,0,0)" readonly />
                                                <span class="add-on"><i style="background-color: #000000;"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="cboEstiloLetra">
                                            Estilo
                                        </label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <select id="cboEstiloLetra" class="span12">
                                                <option value="0">Normal</option>
                                                <option value="1">Negrita</option>
                                                <option value="2">Cursiva</option>
                                                <option value="4">Subrayado</option>
                                                <option value="8">Tachado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="span1" style="text-align: right;">
                                    <div class="control-group">
                                        <label class="control-label" for="cboAlineacion">
                                            Alineación
                                        </label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls" class="span12">
                                            <select id="cboAlineacion">
                                                <option value="left" selected>Izquieda</option>
                                                <option value="center">Centro</option>
                                                <option value="right">Derecha</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="row-fluid" style="padding: 4px">
                            <div class="span11">


                                <div class="span4 offset2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <a id="btnAgregarDet" class="btn green"><i class="icon-plus" style="line-height: initial"></i>&nbsp;Agregar</a>
                                            <a id="btnPrevisualizar" class="btn blue"><i class="icon-search" style="line-height: initial"></i>&nbsp;Vista Previa</a>
                                            <a id="btnImprimir" class="btn black" style="display:none"><i class="icon-print" style="line-height: initial"></i>&nbsp;Probar Impresión</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12" id="div_tabla_det">
                                <table id="tabla_det" class="table" border="0">
                                    <thead>
                                        <tr>
                                            <th>CODIGO</th>
                                            <th style="text-align: left">NOMBRE CAMPO</th>
                                            <th style="text-align: left">DESCRIPCION</th>
                                            <th style="text-align: left">TIPO</th>
                                            <th style="text-align: center">LONG. MAXIMA</th>
                                            <th style="text-align: center">TIPO LETRA</th>
                                            <th style="text-align: center">TAMAÑO LETRA</th>
                                            <th style="text-align: center">ESTILO LETRA</th>
                                            <th style="text-align: center">COLOR</th>
                                            <th style="text-align: center">ALINEACION</th>
                                            <th style="text-align: center">VALOR</th>
                                            <th style="text-align: center">VALOR X</th>
                                            <th style="text-align: center">VALOR Y</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <input type="hidden" id="HF_IMPR_CODE" />
            </div>
        </div>
    </div>
</div>

<div id="modalPrev" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: auto; left: 20%; margin-left: 0px;" aria-hidden="true">
    <div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color: #ffffff;">
        <button type="button" class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">
            <i class="icon-remove"></i>
        </button>
        <h4 id="modalPrev_title"><i class="icon-search" style="line-height: initial;"></i>&nbsp;VISTA PREVIA</h4>
    </div>
    <div class="modal-body" style="max-height: 600px;">
        <div class="row-fluid">
            <div class="span12" align="left">
                <style>
                    #divPrev {
                        /*border: 1px solid black;*/
                        padding: 0px;
                        position: relative;
                        margin: auto;
                        background-repeat: no-repeat!important;
                        background-position: left!important;
                        width: auto;
                    }

                    #divPrevContenido {
                        border: 1px dashed #cbcbcb;
                        padding: 0px;
                        height: inherit;
                        position: relative;
                    }

                    .campo {
                        position: absolute;
                    }
                </style>
                <div id="divPrev" align="left">
                    <div id="divPrevContenido">
                        <%--<span class="campo" style="top: 10px; left: 10px;">ss</span>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <small style="float: left">(<span style="color: GrayText">---</span>)&nbsp;Zona de Impresion.</small>
        <small>*Importante: Esta visualización previa muestra una aproximación de como se mostrarán los campos en la impresión (Dependerá mucho de la imagen y dimensiones brindadas) .</small>
    </div>
</div>




<script src="../../../recursos/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>
<script type="text/javascript" src="../vistas/NC/js/NCMFDOC.js"></script>
<script>
    jQuery(document).ready(function () {
        NCMFDOC.init();
    });
</script>
