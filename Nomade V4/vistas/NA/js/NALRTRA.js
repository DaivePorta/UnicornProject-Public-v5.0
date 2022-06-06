var NALRTRA = function () {
    
    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboAlmacen').select2();
        $('#cboALmc_tranf').select2();
        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });

    }


    var cargaInicial = function () {
        
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
       
    }


    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    //Iniciar valores con valores de login
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());
                    
                    ListarAlmacenes($('#cboEmpresas').val());
                    

                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function ListaAlmacenesFiltro(ctlg, cod_almc) {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=1&CTLG_CODE=" + ctlg + "&COD_ALMC=" + cod_almc + "&TIPO=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboALmc_tranf').empty();
                
                if (datos[0].CODIGO != "" && datos[0].DESCRIPCION != "") {
                    $('#cboALmc_tranf').append('<option value=" ">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboALmc_tranf').append('<option value="' + datos[i].CODIGO + '" direccion="' + datos[i].DIRECCION + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                else {
                    $('#cboAlmacen').append('<option></option>');
                    $('#cboAlmacen').select2('val', '');
                }
                $('#cboALmc_tranf').select2('val', '');

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    function ListarAlmacenes(ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + ctlg + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboAlmacen').empty();
               
                if (datos != null) {
                    $('#cboAlmacen').append('<option value=" ">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboAlmacen').val(datos[0].CODIGO);
                }
                else {
                    $('#cboAlmacen').append('<option></option>');
                    $('#cboAlmacen').select2('val', '');

                    //$('#cboAlmacen').attr('disabled', true);
                    //$('#cboALmc_tranf').attr('disabled', true);
                    //$('#buscar').attr('disabled', true);
                }

                //Iniciar valores con valores de login
                $("#cboAlmacen").select2("val", "");

                //ListaAlmacenesFiltro(ctlg, datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboAlmacen').select2('destroy').select2();
        ListaAlmacenesFiltro(ctlg, $('#cboAlmacen').val());
    }


    var eventoControles = function () {

        $('#cboEmpresas').on('change', function () {
           
            ListarAlmacenes($(this).val());
        });

        $('#cboAlmacen').on('change', function () {

            ListaAlmacenesFiltro($('#cboEmpresas').val(), $('#cboAlmacen').val());
        });


        $('#buscar').on('click', function () {
            //if (vErrors(["cboAlmacen", "cboALmc_tranf", "txtDesde"])) {
            if ($("#cboAlmacen").val() != "" && $("#cboALmc_tranf").val() != "") {
                if ($('#txtDesde').val() != "" && $('#txtHasta').val() != "" ) {
                    listarTrasnferencia($('#cboAlmacen').val(), $('#cboALmc_tranf').val(), $('#txtDesde').val(), $('#txtHasta').val());
                }
                else {
                    alertCustom("Ingrese Fechas")
                } 
            }
            else {
                alertCustom("Seleccione Origen o Destino")
            }
               
            //}
        });

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);

    }



    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
        }
    };

}();

var actualizarEstilos = function () {
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
}

function listarTrasnferencia(origen, destino, desde, hasta)
    {
    Bloquear("div");
    $.ajax({
        type: "POST",
        url: "vistas/na/ajax/NALRTRA.ashx?OPCION=1&orgien=" + origen + "&destino=" + destino + "&p_DESDE=" + desde + "&p_HASTA=" + hasta,
        async: false,
        success: function (datos) {
            Desbloquear("div");
            if (datos != null) {

                $('#tblProductos').html(datos)

                $("#tblbmodal").DataTable({

                    "scrollX": "true",
                    "sDom": 'T<"clear">lfrtip',
                    "sPaginationType": "full_numbers",
                    "oTableTools": {
                        "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                        "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel"
                    }
                        ]
                    }
                })



                $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">FECHA SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">FECHA ENTRADA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">ALMACEN ORIGEN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">ALMACEN DESTINO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">TIPO DE DOCUMENTO / MODELO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">NRO DOCUMENTO DE SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">ESTADO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">GLOSARIO DE SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="8" href="#">GLOSARIO DE ENTRADA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="9" href="#">VER SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="10" href="#">VER ENTRADA </a>\
                    </div>');

                $('a.toggle-vis').on('click', function (e) {
                    e.preventDefault();
                    var column = $('#tblbmodal').DataTable().column($(this).attr('data-column'));
                    column.visible(!column.visible());
                });


            }
        },
        error: function (msg) {
            Desbloquear("div");
            alert(msg);

        }
    });
    }



$("#buscar1").attr("target", "_blank");
function VerDetalles(codigoCaja) {

    //alert(codigoCaja);
  
    window.location.href = "?f=naminsa&codigo=" + codigoCaja 
}

