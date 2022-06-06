<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCLPERS.ascx.vb" Inherits="vistas_NC_NCLPERS" %>
<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA PERSONA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=ncmpers" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nclpers" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPersonas" class="display DTTT_selectable" style="display:none;" >
                            <thead>
                                <tr>
                                    <th>ID
                                    </th>
                                    <th>NOMBRES
                                    </th>
                                    <th>TIPO DOCUMENTO
                                    </th>
                                    <th>NRO. DOCUMENTO
                                    </th>
                                    <th>TIPO PERSONA
                                    </th>
                                    <th>FEC. NAC./FEC. CREACION
                                    </th>
                                    <th>TELEFONO
                                    </th>
                                    <th>CORREO
                                    </th>
                                    <th>DIRECCION
                                    </th>
                                    <th>CODIGO_TIPO_PERSONA
                                    </th>
                                    <th>CODIGO_TIPO_DOCUMENTO
                                    </th>
                                </tr>
                            </thead>
                        </table>                       
                        <asp:HiddenField ID="hfObjPersona" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NC/js/NCMPERS.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCLPERS.init();
        
    });
</script>
