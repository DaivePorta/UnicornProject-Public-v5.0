function Grabar() {
    var tipo = $("input:radio[name=tipo]:checked").val();
    var activo = $("#chkactivo").is(':checked') ? 1 : 0;
    var nombre = $("#txtnombre").val();
    var marca = $("#cbomarca").val();
    var barras = $("#txtcodigo").val();
    var fecha = $("#txtfecha").val();
    var descripcion = $("#txtdescripcion").val();
 
    Bloquear("ventana");
    $.post("vistas/NG/ajax/NGPRUEB.ASHX", {codigo:1,tipo:tipo,estado:activo,nombre:nombre,marca:marca,barras:barras,fecha:fecha,descripcion:descripcion},
        function (res) {
            Desbloquear("ventana");
            //if (res.toString.length=10) {
                $("#txtcode").val(res);
            //    exito();
            //    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            //    $("#grabar").attr("href", "javascript:Modificar();");
            //} else {
            //    noexito();
            //}
        });
}

function Modificar() {
    var tipo = $("input:radio[name=tipo]:checked").val();
    var activo = $("#chkactivo").is(':checked') ? 1 : 0;
    var nombre = $("#txtnombre").val();
    var marca = $("#cbomarca").val();
    var barras = $("#txtcodigo").val();
    var fecha = $("#txtfecha").val();
    var descripcion = $("#txtdescripcion").val();
    var codigo = $("#txtcode").val();


    Bloquear("ventana");
    $.post("vistas/NG/ajax/NGPRUEB.ASHX", { codigo: codigo, activo: activo, nombre: nombre, marca: marca, barras: barras, fecha: fecha, descripcion: descripcion },
        function (res) {
            Desbloquear("ventana");
            if (res = "OK") {
                exito();            } else {
                noexito();
            }
        });
}


	
   var NGPRUEB = function () {


       var datatable = function () {

           $('#tblBandeja').dataTable({
               "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
               // set the initial value
               "iDisplayLength": 5,
               "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
               "sPaginationType": "bootstrap",
               "oLanguage": {
                   "sLengthMenu": "_MENU_ filas por pagina",
                   "oPaginate": {
                       "sPrevious": "Anterior",
                       "sNext": "Siguiente"
                   }
               },
               "aoColumnDefs": [{
                   'bSortable': false,
                   'aTargets': [0]
               }
                ]
           });
       }


       var plugins = function () {

           $('#cbomarca').select2({
               placeholder: "Seleccione Tipo Documento",
               allowClear: true
           });

           $("#txtcodigo").inputmask("9999999999");
           $("#txtfecha").inputmask("99/99/9999");
           $('#txtfecha').datepicker();

       }


       return {
           init: function () {
               plugins();
               datatable();
           }
       };
   } ();
