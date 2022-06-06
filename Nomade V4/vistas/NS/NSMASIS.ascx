<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMASIS.ascx.vb" Inherits="vistas_NS_NSMASIST" %>

<div id="Ventana" class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <%--  <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>MATENEDOR DE ASISTENCIAS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmcarg" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nslcarg" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>--%>














        <div class="row-fluid">
            <div class="span12">
                <div id="Div1" class="portlet box blue">
                    <div class="portlet-title">
                        <h4><i class="icon-reorder"></i>MATENEDOR DE ASISTENCIAS</h4>
                        <div class="actions">
                            <a class="btn green" href="?f=nsmform"><i class="icon-plus"></i>Nuevo</a>
                            <a class="btn red" href="?f=nslform"><i class="icon-list"></i>Listar</a>
                        </div>

                    </div>
                    <div class="portlet-body">
                        <%--  <div class="row-fluid" style="text-align:center;">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2" >
                                <div class="control-group">
                                    <label class="control-label" for="txtCodigo">
                                        Código</label>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCodigo" class="span12" type="text" placeholder="Código" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--%>
                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label" for="cboSucursal">
                                                SUCURSAL</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                <select id="cboSucursal" style="width: 200px;" onchange="javascript:CargaConfiguracion();">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="control-group">
                                    <%--<a id="A1" class="btn blue" href="javascript:CargaConfiguracion();"><i class="icon-search"></i>  MOSTRAR</a>--%>
                                </div>
                            </div>
                        </div>


                        <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin: 10px;">
                            <h3 id="lblTitulo">CONFIGURACIÓN DE COLUMNAS</h3>
                            <br />
                            <input type="hidden" id="hfCodigo" value="0" />
                            <asp:HiddenField ID="hfEmpresa" runat="server" value="0"/>
                            <asp:HiddenField ID="hfSucursal" runat="server" value="0"/>
                            <asp:HiddenField ID="hfUsuario" runat="server" value="0"/>
                            <asp:HiddenField ID="hfTable" runat="server" value="0"/>
                            <asp:HiddenField ID="hfPeriodo" runat="server" value="0"/>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span4">
                                            <div class="control-group">
                                                <label class="control-label" for="cboBiometrico">
                                                    &nbsp;CÓDIGO BIOMÉTRICO</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                    <select id="cboBiometrico" style="width: 200px;">
                                                        <option selected="selected" value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span4">
                                            <div class="control-group">
                                                <label class="control-label" for="cboFecha">
                                                    &nbsp;FECHA</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                    <select id="cboFecha" style="width: 200px;">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option selected="selected" value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span4">
                                            <div class="control-group">
                                                <label class="control-label" for="cboHoraEntrada">
                                                    &nbsp;HORA ENTRADA</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                    <select id="cboHoraEntrada" style="width: 200px;">
                                                        <option value="1">1</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option selected="selected" value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">

                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label" for="cboHoraSalida">
                                                &nbsp;HORA SALIDA</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                <select id="cboHoraSalida" style="width: 200px;">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option selected="selected" value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span4">
                                            <div class="control-group">
                                                <label class="control-label" for="cboHoraEntradaTrabajador">
                                                    &nbsp;HORA ENTRADA TRAB.</label>
                                            </div>
                                        </div>
                                        <div class="span8">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                    <select id="cboHoraEntradaTrabajador" style="width: 200px;">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option selected="selected" value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">

                                    <div class="span4">
                                        <div class="control-group">
                                            <label class="control-label" for="cboHoraSalidaTrabajador">
                                                &nbsp;HORA SALIDA TRAB.</label>
                                        </div>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <%--<input id="txtBiometrico" class="span12" type="number" min="0" max="7"/>--%>
                                                <select id="cboHoraSalidaTrabajador" style="width: 200px;">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option selected="selected" value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row-fluid">
                                <div class="span5">
                                </div>
                                <div class="span3">
                                    <div class="control-group">
                                        <a id="A4" class="btn blue" href="javascript:Modificar();"><i class="icon-save"></i>  MODIFICAR</a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin: 10px;">
                            <br />
                            <div class="row-fluid">
                                <div class="span3">
                                </div>
                                <div class="span1">
                                    <div class="control-group">
                                        <label class="control-label" for="txtCodigo">&nbsp;PERIODO</label>
                                    </div>
                                </div>

                                <div class="span2">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input class="span10" data-date-format="yyyy" type="text" id="optanho" name="optanho">
                                            <input class="span10" type="text" id="optmes" data-date-format="MM" aria-disabled="true" name="optmes">
                                        </div>
                                    </div>
                                </div>

                                <div class="span3">
                                    <div class="control-group">
                                        <a id="A3" class="btn blue" href="javascript:ListarAsistencia();"><i class="icon-search"></i>BUSCAR</a>
                                    </div>
                                </div>


                                <div class="span1" id="DivFecha">
                                    <asp:HiddenField ID="hfComision" runat="server" Value="0" />

                                    <input type="hidden" value="0" />
                                </div>
                            </div>
                        </div>
                        <br />

                        <div class="row-fluid">
                            <div class="span6">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <%--<div class="control-group">
                                            <label class="control-label" for="cboHoraentrada">
                                                HORA ENTRADA</label>
                                        </div>--%>
                                    </div>
                                    <div class="span8">
                                        <div class="control-group">
                                            <div class="controls">
                                                <asp:FileUpload ID="fuDocumento" runat="server" />
                                            &nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="span6">

                                <%--<div class="span4">
                                        <div class="control-group">
                                            <label class="control-label" for="cboHoraEntrada">
                                                HORA SALIDA</label>
                                        </div>
                                    </div>--%>
                                <div class="span12">
                                    <div class="control-group">
                                        <div class="controls">
                                            <%--<a id="A2" class="btn blue" href="javascript:ListarConfiguracion();"><i class="icon-play"></i>GENERAR</a>--%>
                                            <asp:LinkButton ID="btlGenerar"  Cssclass="btn blue" runat="server">  GENERAR</asp:LinkButton>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <p> El formato del archivo es .xls</p>

                        <div id="Tabla">

                           </div>


                        <div class="row-fluid">                            

                            <br />
                            
                        </div>
                        <%-- <div class="row-fluid">
                                <div class="span6">
                                    <div class="row-fluid">
                                        <div class="span2">
                                            <div class="control-group">
                                                <label class="control-label" for="txtDescripcion">
                                                    Descripción</label>
                                            </div>
                                        </div>
                                        <div class="span10">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <input id="txtDescripcion" class="span12" type="text" placeholder="Descripción" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>--%>                        <%--    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboSistema">
                                        Sistema</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <select id="cboSistema" class="span12" data-placeholder="Sistema">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                        <%--  <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                                    <label class="control-label" for="txtayuda">
                                        Ayuda</label>
                            </div>
                    </div>
                    <div class="span11">
                        <div class="control-group">
                            <div class="controls">
                                <textarea id="txtayuda" class="m-wrap wysihtml5 span12" cols="6" rows="6" placeholder="Ingrese texto que sea de ayuda para el usuario..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>--%>
                       <%-- <div class="form-actions">
                            <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i>Grabar</a>
                            <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i>Cancelar</a>
                        </div>--%>



                    </div>
                </div>
            </div>
        </div>















        <div class="portlet-body">

            <table id="tblBandeja" class="display DTTT_selectable" border="0" style="display: none;">
                <thead>
                    <tr>
                        <th>CODIGO
                        </th>

                        <th>DESCRIPCION
                        </th>
                        <th>NIVEL
                        </th>

                        <th>ESTADO
                        </th>
                        <th>CAMBIAR ESTADO
                        </th>
                    </tr>
                </thead>

            </table>
            <asp:HiddenField ID="hfObjJson" runat="server" />
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSMASIS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSMASIS.init();
        //$('.wysihtml5').wysihtml5({
        //    "stylesheets": false
        //});
    });
</script>
