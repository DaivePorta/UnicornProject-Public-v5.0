<%@ Control Language="VB" AutoEventWireup="false" CodeFile="EFLEXML.ascx.vb" Inherits="vistas_EF_EFLEXML" %>
<script type="text/javascript" src="../../recursos/plugins/selectize/js/standalone/selectize.js"></script>
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.css" />
<link rel="stylesheet" href="../../recursos/plugins/selectize/css/selectize.bootstrap2.css" />

<style>
    .btnTbl {
        margin: 2px;
    }

    input[type=text] {
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    }
    button{
  background-color: black;
    border: 1px solid #ccc;
    color: white;
    padding: 10px 30px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
    }
    canvas{
  /*interacción con el canvas*/
    pointer-events:none;
    /*padding: 20px 70px;*/
    /*display: inline-block;*/
    /*border-radius: 8px;*/
    /*box-sizing: border-box;*/
    }

</style>


<div class="row-fluid" style="max-width: 1580px;">
    <div class="span4 "></div>
    <div class="span3 ">
        <img src="../recursos/img/unicorn_Logo.png" />
        </div>
</div>
<div class="row-fluid">
    <div class="span1 "></div>
</div>
<div class="row-fluid" id="contenedor" style="max-width: 2000px;">
    <div class="span1 ">
        </div>
    <div class="span10 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box" style="border: 1px solid #ccc;" id="ventana">
            <div class="portlet-title" style="background-color: black;">
                <h4><i class="icon-reorder"></i>DESCARGA DE ARCHIVOS</h4>
                <div class="actions">
                    <a class="btn green" onclick="javascript:Nuevo();"><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red"  href="cerrar_sesion.aspx"><i class="icon-remove"></i>&nbsp;Cerrar</a>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row-fluid"><div class="span1"></div></div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="cboDocumento">
                               <strong>DOCUMENTO</strong> </label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboDocumento" class="span12" data-placeholder="T. Documento">
                                    <option value="01">FACTURA ELECTRÓNICA</option>
                                    <option value="03">BOLETA ELECTRÓNICA</option>
                                    <option value="07">NOTA DE CRÉDITO</option>
                                    <option value="08">NOTA DE DÉBITO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_RucEmpresa">
                             <strong>RUC EMISOR</strong> </label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="span12" >
                                 <input id="txt_RucEmpresa" placeholder="RUC" class=" span12  "  type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: left;">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row-fluid">
                        <div class="control-group">
                            <div class="span8 "></div>
                            <p style="font-style: italic; color: lightsteelblue; text-align: justify" class="span4">
                                <span id="divComunicado">*RUC empresa que emite el documento*</span>
                            </p>
                        </div>
                </div>
                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_serie">
                           <strong>SERIE</strong></label>
                        </div>
                    </div>
                    <div class="span3" id="Div_serie">
                        <div class="control-group">
                            <div class="span12" id="Div7">
                                 <input id="txt_serie" placeholder="Serie Doc. Electrónico" class=" span12  "  type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: left;">
                            </div>
                        </div>
                    </div>
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txt_serie">
                             <strong>NÚMERO</strong></label>
                        </div>
                    </div>
                    <div class="span3" id="Div_DocReferencia">
                        <div class="control-group">
                            <div class="span12" id="Div9">
                                <input id="txt_dcto_ref" placeholder="Número Doc. Electrónico" class="span12  " type="text" onkeypress="return ValidaNumeros(event,this)" style="text-align: left; ">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid"><div class="span1"></div></div>
                <div class="row-fluid"><div class="span1"></div></div>
                <div class="span4"></div>
                <div class="row-fluid">
                    <div class="span8">
                        <div id="captcha" class="span2">

                        </div>
                        <div class="span2">
                            <input id="cpatchaTextBox" placeholder="Código" class="span12  " type="text" style="text-align: center; ">
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span2"></div>
                </div>
                <div class="span4"></div>
                <div class="row-fluid">
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <button class="btn blue span6" type="button" id="btnVerificarCaptcha" title="Buscar Documento"><i class="icon-search"></i>&nbsp;Buscar</button>
                            </div>
                            <div class="controls">
                                <button class="btn black span6" type="button"  id="btnRefrescar" title="Nuevo Cod. Captcha"><i class="icon-refresh"></i>&nbsp;Refrescar</button>
                            </div>
                        </div>
                        <div class="span1"></div>
                        <div class="control-group">
                            <div class="controls">
                                <asp:Button class="btn green" ID="btnLibroTXT" CssClass="btnLibroTXT btn green span12" runat="server" Text="Descargar Archivo XML" />
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="controls">
                                <asp:Button class="btn red" ID="btnLibroPDF" CssClass="btnLibroPDF btn red span12" runat="server" Text="Descargar Archivo CDR" />
                            </div>
                        </div>
                    </div> 
                 </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->

</div>
 <div class="row-fluid">
                    <asp:HiddenField ID="hddRuc" runat="server" />
                    <asp:HiddenField ID="hddSerie" runat="server" />
                    <asp:HiddenField ID="hddCodDoc" runat="server" />
                    <asp:HiddenField ID="hddNumDoc" runat="server" />
                    <asp:HiddenField ID="hddDesca" runat="server" />
 </div>

<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type='text/javascript' src='../vistas/EF/js/EFLEXML.js?<%=aleatorio%>'></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        EFLEXML.init();
    });
</script>