<%@ Control Language="VB" AutoEventWireup="false" CodeFile="CTMDICU.ascx.vb" Inherits="vistas_CT_CTMDICU" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>&nbsp;DINAMICA DE CUENTAS</h4>
                <div class="actions">
                    <a href="?f=CTMDICU" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=CTLDICU" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">                            
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtCodOperacion" style="font-weight: bold">Código</label>
                                </div>
                            </div>
                            
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCodOperacion" type="text" class="span12 centro" placeholder="COD-OPERA" disabled/>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="btnBuscarOperacion" class="btn black"><i class="icon-search" style="line-height: initial;"></i></a>
                                    </div>
                                </div>
                            </div>
                                                
                            <div class="span1"></div>

                            <div class="span1">
                                <div class="control-group">
                                    <label class="control-label" for="txtTipoOperacion">Tipo</label>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtTipoOperacion" class="span12 centro" placeholder="TIPO" disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span6">  
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboTipoMoneda">Moneda</label>
                                </div>
                            </div>

                            <div class="span8">
                                <div class="control-group ">
                                    <div class="controls">
                                        <select id="cboTipoMoneda" class="span12 ComboBox" data-placeholder="MONEDA">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div> 
                </div>

                <%-- Inicio Fila2 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="row-fluid">
                                <div class="span2">
                                    <div class="control-group">
                                        <label class="control-label" for="txtOperacion" style="font-weight: bold">Operación</label>
                                    </div>
                                </div>

                                <div class="span10">
                                    <div class="control-group">
                                        <div class="controls">
                                            <input type="text" id="txtOperacion" class="span12" placeholder="OPERACIÓN" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   

                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="cboLibroContable">Libro</label>
                                </div>
                            </div>

                            <div class="span8">
                                <div class="control-group ">
                                    <div class="controls">
                                        <select id="cboLibroContable" class="span12 ComboBox" data-placeholder="LIBRO CONTABLE">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                <%-- Fin Fila2 --%>

                <%-- Inicio Fila3 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtDescripcion">Descripción</label>
                                </div>
                            </div>

                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="txtDescripcion" class="span12" placeholder="DESCRIPCIÓN" maxlength="150"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       

                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="chboEstado">Habilitado</label>
                                </div>
                            </div>
                                                    
                            <div class="span1">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="chboEstado" type="checkbox" checked/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
                <%-- Fin Fila3 --%>

                <%-- Inicio Fila4 --%>
                <div class="row-fluid">
                    <div class="span12">
                        <h3>Cuentas</h3>
                    </div>
                </div>
                <%-- Fin Fila4 --%>

                <%-- Inicio Fila4 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtCuenta">Cuenta</label>
                                </div>
                            </div>
                            <div class="span5">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCuenta" class="span12" type="text" onkeypress="return ValidaNumeros(event,this)" placeholder="CUENTA" />
                                    </div>
                                    <p style="font-style:italic;color:gray;"><span>*Indicio de busqueda.</span> </p>
                                </div>
                            </div>                                            
                            <div class="span3">
                                <div class="control-group">
                                    <div class="controls">
                                        <a id="linkModalCuentas" class="btn black AgregaCuenta" data-toggle="modal" ><i class="icon-search" style="line-height: initial;"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       

                    <div class="span6">
                        <div class="row-fluid">

                        </div>
                    </div>     
                </div>
                <%-- Fin Fila4 --%>

                <%-- Inicio Fila5 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">
                            <div class="span2">
                                <div class="control-group">
                                    <label class="control-label" for="txtCuentaDescrip">Descripción</label>
                                </div>
                            </div>
                            <div class="span10">
                                <div class="control-group">
                                    <div class="controls">
                                        <input id="txtCuentaDescrip" class="span12" type="text" placeholder="Descripcion" disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span6">
                        <div class="row-fluid">

                        </div>
                    </div>
                </div>   
                <%-- Fin Fila5 --%>

                <%-- Inicio Fila6 --%>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="row-fluid">      
                            <div class="span2"></div>
                            <div class="span2">
                                <div class="control-group ">
                                    <div class="controls">
                                        <label class="radio">
                                            <input id="rbtnDebe" type="radio" name="radioCuentas" checked/>Debe
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="span3">
                                <div class="control-group ">
                                    <div class="controls">
                                        <label class="radio">
                                        <input id="rbtnHaber" type="radio" name="radioCuentas" />Haber
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="span5">
                                <div class="row-fluid">      
                                    <div class="span12">
                                        <a id="btnAgregaCuenta" class="btn green"><i class="icon-plus" style="line-height: initial;"></i> Agregar Cuenta</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="span6">
                        <div class="row-fluid">

                        </div>
                    </div>
                </div>   
                <%-- Fin Fila6 --%>
             
                <%-- Inicio Fila8 --%>
                <div class="row-fluid">
                    <div class="span12">
                    </div>
                </div>
                <%-- Fin Fila8 --%>
                                
                <%-- Inicio Fila9 --%>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12" id="divTblCuentas">
                                <table id="tblCuentas" class="table table-bordered">
                                    <thead>
                                        <tr><!--style="background-color: rgb(3, 121, 56); color: aliceblue;"-->
                                            <th style="text-align:center;font-weight: 600;">Cuenta</th>
                                            <th style="text-align:center;font-weight: 600;">Descripción</th>
                                            <th style="text-align:center;font-weight: 600;">Debe</th>
                                            <th style="text-align:center;font-weight: 600;">Haber</th>
                                            <th style="text-align:center;font-weight: 600;">#</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <%--Fin Fila9 --%>

                <%-- Inicio Fila10 --%>
                <div class="row-fluid CtaDestino" style="display:none;">
                    <div class="span12">
                    </div>
                </div>
                <%-- Fin Fila10 --%>      

                <%-- Inicio Fila4 --%>
                <div class="row-fluid CtaDestino" style="display:none;">
                    <div class="span12">
                        <h3>Cuentas Destinos</h3>
                    </div>
                </div>
                <%-- Fin Fila4 --%>
                                
                <%-- Inicio Fila12 --%>
                <div class="row-fluid CtaDestino" style="display:none;">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span12" id="divTblCtasDestino">
                                <table id="tblCtasDestino" class="table table-bordered">
                                    <thead>
                                        <tr style="background-color: rgb(3, 121, 56); color: aliceblue;">
                                            <th style="text-align:center;font-weight: 600;">Cuenta</th>
                                            <th style="text-align:center;font-weight: 600;">Descripción</th>
                                            <th style="text-align:center;font-weight: 600;">Debe</th>
                                            <th style="text-align:center;font-weight: 600;">Haber</th>
                                            <th style="text-align:center;font-weight: 600;">%</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <%--Fin Fila12 --%>
                                
                <div class="form-actions">
                    <a id="btnGrabar" class="btn blue" ><i class="icon-save"></i>&nbsp;Grabar</a>
                    <a id="btnCancelar" class="btn" ><i class="icon-remove"></i>&nbsp;Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="divModalBusqueda" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel">
    <div class="modal-content" id="modal2">
        <div class="modal-header"><!--style="background: #7EB620; color: #ffffff;"-->
            <button data-dismiss="modal" class="close" type="button" aria-hidden="true"></button>
            <h3 id="myModalLabel">Titulo</h3>
        </div>
        <div class="modal-body" aria-hidden="true">
            <div class="row-fluid">
                <div class="span12">
                </div>
            </div>
        </div>
        <div class="modal-footer" aria-hidden="true">

        </div>
    </div>
</div>

<div id="divModal" class="modal hide">
    <div class="modal-header" style="padding: 1px 15px;"> <!--background: #7EB620; color: #ffffff;-->
        <button data-dismiss="modal" class="close" type="button"></button>
        <h4 id="tituloModal">Titulo</h4>
    </div>
    <div id="divModalContenido" class="modal-body">
    </div>
    <div id="divModalPie" class="modal-footer">

    </div>
</div>

<script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.columnFilter.js"></script>
<script type="text/javascript" src="../vistas/CT/js/CTMDICU.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        CTMDICU.init();
    });
</script>
