<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NMMTEXI.ascx.vb" Inherits="vistas_NM_NMMTEXI" %>
<div class="row-fluid">
    <div class="span12">
        <div class="portlet box blue" id="ventana">
            <div class="portlet-title">
                <h4><i class="icon-reorder"></i>Tipos de Existencias</h4>

                <div class="actions">
                    <a href="?f=nmmtexi" class="btn green"><i class="icon-plus"></i> Nuevo</a> 
                    <a href="?f=nmltexi" class="btn red"><i class="icon-list"></i> Listar</a>                        
                </div>
            </div>         
             <div class="portlet-body">
                 <div class="row-fluid">
                                          
                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">Código</label>
                         </div>
                     </div>

                    <div class="span1">
                         <div class="control-group">
                             <div class="controls">
                                 <input type="text" id="txtCodigo" class="span12" disabled>
                             </div>
                         </div>
                    </div>

                    <div class="span1"></div>

                    <div class="span1">
                        <label>Cod SUNAT</label>
                    </div>
                    <div class="span1">
                        <input type="text" id="txtCodSunat" class="span12">
                    </div>
                    <div class="span1">
                        <!--label>Estado</label-->
                    </div>
                    <div class="span2">
                        <div style="text-align: left;">
                            <input id="chkEstado" type="checkbox" name="activo" checked="checked" value="A" style="opacity: 0;" />Activo
                        </div>
                    </div>
                 </div>
                 
                 <div class="row-fluid">
                    <div class="span1">
                        <div class="control-group">
                            <label class="control-label" for="txtdescripcion">Descripción</label>
                        </div>
                    </div>

                    <div class="span4">
                        <input type="text" id="txtdescripcion" class=" span12" placeholder="Descripción" maxlength="150" />
                    </div>
                    <div class="span1">  
                    </div>
                    <div class="span2">
                        <div style="text-align: left;">
                            <input id="chkAlmacenable" type="checkbox" name="almacenable" checked="checked" value="S" style="opacity: 0;" />Almacenable
                        </div>
                    </div>
                 </div>
                 
                 <div class="form-actions">
                     <a id="grabar" class="btn blue" href="javascript:Crear_Existencias();"><i class="icon-save"></i> Grabar</a> <a href="javascript:Cancelar();" class="btn"><i class="icon-remove"></i> Cancelar</a>
                 </div>

                 <h3 class="contabilidad">Configuración contable de Almacén</h3>
                 <hr class="contabilidad" />
                 
                 <div class="row-fluid contabilidad">
                     <div class="span1">
                         <div class="control-group">
                             <label class="control-label" for="cboEmpresa">Empresa</label>
                         </div>
                     </div>
                     <div class="span4">
                         <div class="control-group">
                             <div class="controls">
                                 <select class="span12 combobox empresa" data-placeholder="Seleccionar Empresa" id="cboEmpresa">
                                     <option></option>
                                 </select>
                             </div>
                         </div>
                     </div>
                 </div>                                                   
                 
                <div class="row-fluid contabilidad">
                    <div class="span12">
                        <table id="tblConfigContab" class="table table-bordered" style="width:100%">
                            <colgroup>
                                <col span="1" style="width: 25%;">
                                <col span="1" style="width: 5%;">
                                <col span="1" style="width: 5%;">
                                <col span="1" style="width: 30%;">
                                <col span="1" style="width: 30%;">
                                <col span="1" style="width: 5%;">
                            </colgroup>
                            <thead>
                                <tr style="background-color:#D3D3D3;">
                                    <th class="centro" colspan="2">Tipo de Existencia 
                                    </th>
                                    <th id="tipoexist" class="centro" colspan="4">MERCADERÍA
                                    </th>
                                </tr>
                                <tr>
                                    <th onclick="w3.sortHTML('#tblConfigContab','.ordenar', 'td:nth-child(1)')" class="centro">Movimiento
                                    </th>
                                    <th onclick="w3.sortHTML('#tblConfigContab','.ordenar', 'td:nth-child(2)')" class="centro">Tipo
                                    </th>
                                    <th class="centro">Configurar
                                    </th>
                                    <th class="centro">Debe
                                    </th>
                                    <th class="centro">Haber
                                    </th>
                                    <th class="centro">Eliminar
                                    </th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                 
             </div>
        </div>
    </div>  
</div>

<!-- Modal -->
<div id="modal-ctascontab" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title">CUENTAS CONTABES</h4>
      </div>
      <div class="modal-body">

        <div class="row-fluid">
            <div class="span1">
            </div>
            <div class="span2">
                <div class="control-group">
                    <label class="control-label" for="cboCtaDebe">Debe</label>
                </div>
            </div>
            <div class="span8">
                <div class="control-group ">
                    <div class="controls">
                        <select id="cboCtaDebe" class="span12 combobox" data-placeholder="Seleccionar Cuenta">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span1">
            </div>
            <div class="span2">
                <div class="control-group">
                    <label class="control-label" for="cboCtaHaber">Haber</label>
                </div>
            </div>
            <div class="span8">
                <div class="control-group ">
                    <div class="controls">
                        <select id="cboCtaHaber" class="span12 combobox" data-placeholder="Seleccionar Cuenta">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnGrabarConfig" class="btn btn-secondary blue"><i class="icon-save"></i>&nbsp;Grabar Configuración</button>
        <button type="button" id="btnCancelarCtaContab" class="btn btn-primary red" data-dismiss="modal"><i class="icon-signout"></i>&nbsp;Cancelar</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="../../Scripts/w3.js"></script>
<script type="text/javascript" src="../../vistas/NM/JS/NMMTEXI.js"></script>
<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NMMTEXI.init();

    });
</script>
