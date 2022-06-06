<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NSLGHEM.ascx.vb" Inherits="vistas_NS_NSLGHEM" %>
<div class="row-fluid">
    <div class="span12 ">
        <!-- INICIA CUADRO PARA LA FORMA -->
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4>
                    <i class="icon-reorder"></i>LISTA GESTION DE HORARIO DE EMPLEADOS</h4>
                <div class="actions">
                    <a class="btn black printlist "><i class="icon-print"></i> Imprimir</a>
                    <a href="?f=nsmghem" class="btn green"><i class="icon-plus"></i> Nuevo</a>
                    <a href="?f=nslghem" class="btn red"><i class="icon-list"></i> Listar</a>
                </div>

            </div>
            <div class="portlet-body">
                <div class="row-fluid">
                    
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEstado">
                                Empresa</label>
                        </div>
                    </div>
                    <div class="span4">
                        <div class="control-group">
                            <div class="controls">
                                <select id="cboEmpresa" class="span12" data-placeholder="Empresa">                                        
                                </select>
                            </div>
                        </div>
                    </div>
                    
                   
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="slcEstado">
                                Estado</label>
                        </div>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <div class="controls">
                                <select id="slcEstado" class="span12" data-placeholder="Empresa">
                                    <option value="">Todos</option>
                                    <option value="A" selected="selected">Activos</option>
                                    <option value="I">Inactivos</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <table id="tblHorarios" class="display DTTT_selectable" border="0" style="display:none;">
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>EMPLEADO</th>
                            <th>FECHA INICIO</th> 
                            <th>FECHA LIMITE</th>
                            <th>ESTADO</th>
                            <th>CAMBIAR ESTADO</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>
            

            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../vistas/NS/js/NSMGHEM.js"></script>
<script>
    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NSLGHEM.init();
        
    });
</script>


