
<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMNOTA.ascx.vb" Inherits="vistas_NC_NCMNOTA" %>
<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>REGISTRAR NOTARIA</h4>


            </div>
            <div class="portlet-body">


                <div class="row-fluid">
                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label" for="txtpersona">
                                Persona</label>
                        </div>
                    </div>
                  <div class="span5">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtpersona" placeholder="Ingrese Apellidos y Nombres" class="span10 personas"   type="text" />
                                <a class="btn buscaPersona" style="background-color: white;padding-bottom: 17px;"><i class="icon-search" style="line-height: initial; color: black;"></i></a>
                            </div>
                        </div>
                    </div>
                       <div class="span1">
                        <div class="control-group ">
                           <button type="button"class="span8 btn blue" id="agregaPersona"><i class="icon-plus" ></i></button>
                        </div>
                        </div>
                     <div class="span1">
                        <div class="control-group ">
                           <button type="button"class="span8 btn red" id="eliminaPersona"><i class="icon-remove" ></i></button>
                        </div>
                        </div>

                </div>


                <div>

                    
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" border="1" style="display:none;" >
                            <thead>
                                <tr>
                                   
                                    <th>NOMBRE
                                    </th>
                                    <th>DOCUMENTO
                                    </th>
                                     <th>NUMERO
                                    </th>
                                    <th>DIRECCION
                                    </th>
                                    <th>TELEFONO</th>
                                    <th>EMAIL</th>
                                   
                                  
                                    
                                </tr>
                            </thead>
                        </table>                        
                       
                    </div>
                </div>

                </div>


                <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:Grabar();"><i class="icon-save"></i> Grabar</a>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>

                <asp:HiddenField runat="server" ID="hfCodigoUsuario" />

                <input type="hidden" id="cod_actual" value=""/>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMNOTA.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCMNOTA.init();


    });
</script>
