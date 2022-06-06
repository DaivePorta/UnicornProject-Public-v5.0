<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSMPASS.ascx.vb" Inherits="vistas_NS_NSMPASS" %>

<asp:HiddenField ID="hfUsuario" runat="server" />

<style>
    div#pswd_info {
        background-color: whitesmoke;
        border-radius: 3px !important;
        position: absolute;
        z-index: 1151;
        -moz-box-shadow: 0 0 5px #888;
        -webkit-box-shadow: 0 0 5px #8888;
        box-shadow: 0 0 5px #298ACA;
    }

        div#pswd_info p {
            margin: 5px;
            font-weight: bold;
        }
</style>

<div class="row-fluid">
    <div class="span12">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div id="ventana" class="portlet box blue">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>CONTRASEÑA</h4>
                <div class="actions" id="edit">
                    <a href="?f=nslpass" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body" id="cambcontra">

                <!-- primera linea --->
                <div class="row-fluid">


                    <div class="span2">
                        <div class="control-group ">
                            <label class="control-label">Usuario</label>

                        </div>
                    </div>

                    <div class="span2">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="txtusuario" disabled="disabled" class="span12" type="text" />
                            </div>
                        </div>
                    </div>

                    <div class="span1">
                    </div>

                    <div class="span3">
                        <div class="control-group ">
                            <div class="controls">
                                <input id="chkactivo" type="checkbox">&nbsp;
                            Ver Caracteres</input>
                            </div>
                        </div>
                    </div>



                </div>
                <!-- FIN PRIMERA LINEA -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpassword0">
                                Contraseña Actual</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpassword0" class="span12" placeholder="Min. 8 Caracteres" type="password" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->
                <div style="border-color: #e5e5e5; border-style: solid; border-width: 1px; margin-bottom: 30px;"></div>
                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpassword1">
                                Contraseña Nueva</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpassword1" class="span12 contrasena" placeholder="Min. 8 Caracteres"  type="password" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <!-- INICIO  LINEA -->
                <div class="row-fluid">

                    <div class="span2">
                        <div class="control-group">
                            <label class="control-label" for="txtpassword2">
                                Repetir Contraseña Nueva</label>

                        </div>
                    </div>

                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <input id="txtpassword2" class="span12 contrasena" placeholder="Min. 8 Caracteres"  type="password" />
                            </div>
                        </div>
                    </div>

                </div>

                <!---fin linea -->

                <div align="right"><small>Otros símbolos admitidos: guión, guión bajo y punto.</small></div>
                <div class="form-actions">
                    <button id="grabar" type="button" class="btn blue"><i class="icon-save"></i> Grabar</button>
                    <a class="btn" href="javascript:Cancelar();"><i class="icon-remove"></i> Cancelar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NS/js/NSMPASS.js"></script>

<script>

    jQuery(document).ready(function () {


        // Se Inicializa el modulo de javascript para esta forma.
        NSMPASS.init();
        

    });


</script>
