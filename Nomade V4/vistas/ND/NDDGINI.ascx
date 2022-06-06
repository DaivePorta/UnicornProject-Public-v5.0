<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NDDGINI.ascx.vb" Inherits="vistas_ND_NDDGINI" %>
  
               
<div class="row-fluid">
    <%--<div class="span10">
        <div class="span8">
            <select id="cboVista"data-placeholder="Buscar Vista..." class="span12">
                <option></option>
            </select>                   
        </div>
        <div class="span4" >        
            <a  href="#"  onclick="EnviarPagina();"  id="buscar" class="btn blue" data-toggle="modal">
                <i class="icon-search" style="line-height: initial;"></i>
            </a>
        </div>
    </div>--%>
</div>
                        
<!-- EMPIEZA DIVISION PARA FAVORITOS-->
				<div  class="row-fluid" id="sortable_portlets" style="margin-top:20px">
			
				</div>
    <script type="text/javascript" src="../vistas/NC/js/NCMFAVO.js"></script>

    <script type="text/javascript">
        jQuery(document).ready(function () {
            // Se Inicializa el modulo de javascript para esta forma.
  
            CargarFavoritos();
      
        });

   
    </script>
  <script type="text/javascript">
     function EnviarPagina() {
            var forma = $('#cboVista').val();
            location.href = '?f=' + forma.toLowerCase();
     }


     $('.select2-input').keypress(function (tecla) {
         //console.log('ENTER SE PRESIONO');

         if ( tecla.which == 13 ) {
             //EnviarPagina();
             //console.log('ENTER SE PRESIONO');
             $('#buscar').focus();
         }
         });
    </script>
