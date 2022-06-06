<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NRLGETR.ascx.vb" Inherits="vistas_NR_NRLGETR" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA TRANSPORTISTA</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=NRMGETR" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=NRLGETR" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblPersonas" class="display DTTT_selectable" style="display:none;" >
                            <thead>
                                <tr> 
                                    <th>RAZON SOCIAL
                                    </th>
                                    <th>TIPO DOCUMENTO
                                    </th>
                                    <th>NRO. DOCUMENTO
                                    </th>
                                    <th>CATEGORIA
                                    </th>
                                    <th>FEC. INICIO
                                    </th>
                                    <th>EMPRESA
                                    </th>
                                    <th>NIVEL
                                    </th>
                                    <th>DIRECCION
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

<script type="text/javascript" src="../vistas/NR/JS/NRMGETR.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NRLGETR.init();

    });
</script>
