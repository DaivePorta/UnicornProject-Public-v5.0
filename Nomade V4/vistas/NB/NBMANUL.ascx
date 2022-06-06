<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NBMANUL.ascx.vb" Inherits="vistas_NB_NBMANUL" %>

<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>ANULAR CHEQUES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nbmANUL" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nblANUL" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div> 
            <div class="portlet-body">

               
                 <div class="row-fluid" style="margin-bottom: 10px;">


                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">
                                 EMPRESA</label>
                         </div>
                     </div>

                    <div id="filter_emp" class="span4" data-column="2">
                            <div class="control-group">
                                <div class="controls">
                                    <select id="cboEmpresa" class="combo m-wrap span12 required" data-placeholder="EMPRESA" tabindex="1">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                    </div>


                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">
                                 CUENTA</label>
                         </div>
                     </div>
                     <div id="filter_cta" class="span4" data-column="2">
                         <div class="control-group">
                             <div class="controls">
                                 <select id="cbocta" class="combo m-wrap span12 required" data-placeholder="CUENTA" tabindex="1">
                                     <option></option>
                                 </select>
                             </div>
                         </div>
                     </div>

                </div>


                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1" style="display: none;">
                            <thead>
                                <tr>
                                    <th>&nbsp;
                                    </th>
                                    <th>NRO DE CHEQUE
                                    </th>
                                    <th>CUENTA
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>TIPO</th>
                                    <th>GIRADO A
                                    </th>
                                    <th>MONTO
                                    </th>
                                    <th>FECHA EMISION
                                    </th>                      
                                    <th>ESTADO
                                    </th>  
                                  
                                    
                                </tr>
                            </thead>
                        </table>                        
                       
                    </div>
                </div>
                <div class="row-fluid" >
                    <div class="span12" align="right" style="margin-top: 10px;">
                        <button type="button" id="btnanular" class="btn green">Anular cheque no registrado</button>
                    </div>
                </div>
                <div class="form-actions">
                    <a id="grabarA" class="btn blue" href="javascript:CrearAnulacion('A');"><i class="icon-ok"></i> Aceptar</a>
                    <a id="grabarR" class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- FIN CUADRO PARA LA FORMA-->
</div>
<input type="hidden" id="hddauxiliar" value="">
<input type="hidden" id="hddauxiliar2" value="0">
<!-- IMPORTAMOS LOS PLUGINS QUE SE USARAN-->
<script runat="server">
    Dim numAleatorio As New Random()
    Dim aleatorio As String = System.Convert.ToString(numAleatorio.Next)
</script>
<script type="text/javascript" src="../vistas/NB/js/NBMANUL.js?<%=aleatorio%>"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NBMANUL.init();
     

    });
</script>