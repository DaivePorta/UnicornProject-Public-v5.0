<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NCMTCAM.ascx.vb" Inherits="vistas_NC_NCMTCAM" %>

<div class="row-fluid">
    <div class="span12">
        <div id="ventana" class="portlet box blue">
             <div class="portlet-title">
                <h4><i class="icon-reorder"></i>TIPO DE CAMBIO</h4>
                <div class="actions">
                    <a class="btn green" href="?f=NCMTCAM"><i class="icon-plus"></i> Nuevo</a>
                    <a class="btn red" href="?f=NCLTCAM"><i class="icon-list"></i> Listar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="portlet-body">

        <div class="row-fluid">
         
         
             <div class="span2"> <!-- Label de Moneda Oficial -->       
                  <div class="control-group">
                         <label class="control-label" for="txtMonedaOficial"> Moneda Oficial</label>  
                  </div>
             </div>

             <div class="span1"> <!-- Caja de Texto Moneda Alterna -->
                 <div class="control-group ">
                       <div class="controls">
                             <input id="txtCodMonOficial" class="span12" disabled="disabled" type="text" />
                       </div>
                </div>
             </div>

             <div class="span2"> <!-- Caja de Texto Moneda Alterna -->
                 <div class="control-group ">
                       <div class="controls">
                             <input id="txtMonedaOficial" class="span12" disabled="disabled" type="text" />
                       </div>
                </div>
             </div>

             <div class="span2"> <!-- Label de Moneda Alterna -->
                  <div class="control-group">
                         <label class="control-label" for="txtMonedaAlterna"> Moneda Alterna</label>
                  </div>
             </div>

         
             <div class="span1"> <!-- Caja de Texto Moneda Alterna -->
                 <div class="control-group ">
                       <div class="controls">
                             <input id="txtCodMonAlterna" class="span12" disabled="disabled" type="text" />
                       </div>
                </div>
             </div>

             <div class="span2"> <!-- Caja de Texto Moneda Alterna -->
                 <div class="control-group ">
                       <div class="controls">
                             <input id="txtMonedaAlterna" class="span12" disabled="disabled" type="text" />
                       </div>
                </div>
             </div>
       </div>

    <!-- Siguiente Linea -->
        <div class="row-fluid">

            <div class="span2">
                 <div class="control-group">
                         <label class="control-label" for="txtFechaVigencia"> Fecha Vigencia</label>
                  </div>
            </div>

            <div class="span2">
                <div class="control-group ">
                       <div class="controls">
                             <input id="txtFechaVigencia" class="span12" disabled="disabled" type="text" />
                       </div>
                </div>
            </div>

            <div class="span4">
                  <div class="control-group">
                         <label class="control-label"> Tipo de Cambio Oficial</label>
                  </div>
            </div>

            <div class="span4">
                  <div class="control-group">
                         <label id="msg_tipo_cambio" class="control-label"> Tipo de Cambio Interno</label><!-- DAPO -->
                  </div>
            </div>
        </div>

    <!-- Siguiente Linea -->
         <div class="row-fluid">
             <div class="span4"> <!-- Espacio en blanco -->
             </div>

             <div class="span2">
                 <div class="control-group">
                         <label class="control-label" for= "txtCompraOficial"> Compra</label>
                  </div>
             </div>

             <div class="span2">
                   <div class="control-group ">
                       <div class="controls">
                             <input id="txtCompraOficial" class="span12" disabled="disabled" type="text" onkeypress=" return ValidaDecimales(event,this)" />
                       </div>
                </div>
             </div>

             <div class="span2">
                 <div class="control-group">
                         <label class="control-label" for "txtVentaAlterna"> Compra</label>
                  </div>
             </div>

             <div class="span2">
                   <div class="control-group ">
                       <div class="controls">
                             <input id="txtCompraAlterna" class="span12" type="text"  onkeypress=" return ValidaDecimales(event,this)"/>
                       </div>
                </div>
             </div>

         </div>

    <!-- Siguiente Linea -->
         <div class="row-fluid">

             <div class="row-fluid">
             <div class="span4"> <!-- Espacio en blanco -->
             </div>

             <div class="span2">
                 <div class="control-group">
                         <label class="control-label" for "txtVentaOficial"> Venta</label>
                  </div>
             </div>

             <div class="span2">
                   <div class="control-group ">
                       <div class="controls">
                             <input id="txtVentaOficial" class="span12" disabled="disabled" type="text" onkeypress=" return ValidaDecimales(event,this)" />
                       </div>
                </div>
             </div>

             <div class="span2">
                 <div class="control-group">
                         <label class="control-label" for "txtVentaAlterna"> Venta</label>
                  </div>
             </div>

             <div class="span2">
                   <div class="control-group ">
                       <div class="controls">
                             <input id="txtVentaAlterna" class="span12" type="text"  onkeypress=" return ValidaDecimales(event,this)"/>
                       </div>
                </div>
             </div>
         </div>

         <div class="form-actions">
                    <a id="grabar" class="btn blue" href="javascript:GrabarTC();"><i class="icon-save"></i> Grabar</a>
             <a id="cancelar" class="btn" href="?f=NCMTCAM"><i class="icon-remove"></i>&nbsp;Cancelar</a>
          </div>
     </div>
</div>

<input type="hidden" id="hfhms" />
<script type="text/javascript" src="../vistas/NC/js/NCTCAM.js"></script>

<script>

    jQuery(document).ready(function () {
        // Se Inicializa el modulo de javascript para esta forma.
        NCTCAM.init();
    });

</script>