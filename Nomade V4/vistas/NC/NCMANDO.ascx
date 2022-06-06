<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMANDO.ascx.vb" Inherits="vistas_NC_NCMANDO" %>

<div class="row-fluid" id="contenedor">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>ANULACION DE DOCUMENTOS EN BLANCO</h4>
                <div class="actions">
                    <a class="btn green" onclick=""><i class="icon-plus"></i>&nbsp;Nuevo</a>
                    <a class="btn red" href="#"><i class="icon-list"></i>&nbsp;Listar</a>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboEmpresa">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresas">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label id="lblEstablecimiento" class="control-label" for="cboEstablecimiento">
                                Establecimiento</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEstablecimiento" class="span12" data-placeholder="Establecimientos">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                                <label id="Label1" class="control-label" for="txtFecha">Fecha</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div  class="control-group">
                            <div class="controls">
                                <input type="text" class="span12 date-picker" placeholder="dd/mm/yyyy" id="txtFecha" data-date-format="dd/mm/yyyy" maxlength="10" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="cboTipoDoc">
                                Tipo Doc.</label>
                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <select id="cboTipoDoc" class="span12" data-placeholder="Tipo Documento">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtSerie">
                                Serie</label>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtSerie" class="span12" maxlength="5" onkeyup="this.value=solonumbef(this.value)"/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtDesde">
                                Desde</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtDesde" class="span12"/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtHasta">
                                Hasta</label>
                        </div>
                    </div>
                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtHasta" class="span12"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtMotivo">
                                Motivo</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtMotivo" class="span12"/>
                            </div>
                        </div>
                    </div>
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtComentario">
                                Comentario</label>
                        </div>
                    </div>
                    <div class="span7">
                        <div class="control-group ">
                            <div class="controls">
                                <input type="text" id="txtComentario" class="span12"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row-fluid">
                    <div class="span1"></div>
                    <div class="span2">
                        <div class="control-group">
                            <div class="controls">
                                <a id="btnAnularDoc" class="btn blue">ANULAR</a>
                            </div>
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
<script type="text/javascript" src="../vistas/NC/js/NCMANDO.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMANDO.init();
    });
</script>
