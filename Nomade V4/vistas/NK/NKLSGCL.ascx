<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NKLSGCL.ascx.vb" Inherits="vistas_NK_NKLSGCL" %>

<div class="row-fluid">
    <div class="span12 ">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA CLIENTES</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i>Imprimir</a>
                    <a href="?f=nkmsgcl" class="btn green"><i class="icon-plus"></i>Nuevo</a>
                    <a href="?f=nklsgcl" class="btn red"><i class="icon-list"></i>Listar</a>
                </div>

            </div>
            <div class="portlet-body">

                <div class="row-fluid" style="margin-bottom: 10px;">

                    <div id="filter_emp" class="span12" data-column="5">

                        <div class="span1"><b>EMPRESA:</b></div>
                        <div id="filemp" class="span3">
                            <select id="cboEmpresa" class="span12 empresa" data-placeholder="Empresa">
                                <option></option>
                            </select>
                        </div>

                    </div>


                </div>

                <div class="row-fluid">
                    <div class="span12">
                        <table id="tblBandeja" class="display DTTT_selectable" style="display: none;">
                            <thead>
                                <tr>
                                    <th>CANAL
                                    </th>
                                    <th>SUBCANAL
                                    </th>
                                    <th>TIPO NEGOCIO
                                    </th>                                    
                                    <th>ESTADO
                                    </th>
                                </tr>
                            </thead>
                        </table>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../vistas/NK/js/NKMSGCL.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NKLSGCL.init();

    });
</script>
