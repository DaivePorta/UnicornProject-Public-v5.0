var NMLACCA = function () {

    var plugins = function () {

    }

    var obtenerDocumentos = function () {
        var data = new FormData();

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMACCA.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#divDocumento').html(datos);

                    $("#tblDocumento").dataTable({
                        "sDom": 'TC<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
                        "scrollX": true,
                        "bAutoWidth": false,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        },
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
                    });

                    var oTable = $('#tblDocumento').dataTable();
                    oTable.fnSort([[0, "desc"]]);

                    $("#tblDocumento").DataTable();
                    //actualizarEstilos()
                    var iSeleccionEstado = 0;
                    $('#tblDocumento tbody').on('click', 'a', function () {
                        $(this).parent().parent().addClass('selected');
                        iSeleccionEstado = 1;
                    });
                    $('#tblDocumento tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            table = $('#tblDocumento').dataTable();
                            //table.$('tr.selected').removeClass('selected');
                            // $(this).addClass('selected');
                            var pos = table.fnGetPosition(this);
                            var row = table.fnGetData(pos);
                            var code = row[0];
                            if (iSeleccionEstado == 0) {
                                window.location.href = "?f=NMMACCA&pCodigo=" + code;                               
                            }
                            iSeleccionEstado = 0;

                            
                        }
                    });


                   

                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

    function cargainicial() {

        obtenerDocumentos();
        
    }

    return {
        init: function () {
            plugins();
            cargainicial();

        }
    };
}();
var NMMACCA = function () {
    var Guardar = function () {
        
        var sTipoAcreditacion = $("#cboTipoAcredita").val();
        var sDescripcion = $("#txtDescripcion").val();
        var sDetalle = $("#txtDetalle").val();
        var sProcedencia = $("#cboProcedencia").val();
        var sCodigo = $("#txtCodigo").val()

        if (sTipoAcreditacion == '0') {
            infoCustom("Por favor seleccione el Tipo de Acreditación.");
            return;
        }
        if (sDescripcion == '') {
            infoCustom('Por favor ingrese el nombre de la Acreditación.');
            return;
        }
        if (sDetalle == '') {
            infoCustom('Por favor ingrese el detalle de la Acreditación.');
            return;
        }
        if (sProcedencia == '0') {
            infoCustom('Porfavor seleccione la procedencia de la  Acreditación.');
            return;
        }



        var data = new FormData();
        
        var sOpcion = "3";

        if (sCodigo == "" || sOpcion == null || sOpcion == undefined) {
            sOpcion = "2";
        }
        data.append('OPCION', sOpcion);
        data.append('p_FTVACRE_CODIGO', sCodigo);
        data.append('p_FTVACRE_TIPO_ACREDITA', sTipoAcreditacion);
        data.append('p_FTVACRE_DESCRIPCION', sDescripcion);
        data.append('p_FTVACRE_DETALLE', sDetalle);
        data.append('p_FTVACRE_PROCEDENCIA', sProcedencia);

        $.ajax({
            url: "vistas/NM/ajax/NMMACCA.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })

            .success(function (datos) {
                if (datos != null && datos != "") {
                    //switch (datos) {
                    //    case "OK":
                    //        exito();
                    //        break;
                    //}
                    if (parseInt(datos) > 0 && sOpcion=="2" ) {
                        $("#txtCodigo").val(datos);
                        $("#sNombrebtn").html("Modificar");
                        exito();
                    } else if (sOpcion == "3") {
                        exito();
                    } else {
                        noexitoCustom("Error al Registrar!")
                    }
                } else {
                    noexitoCustom("Error al Registrar!")
                }

                Desbloquear("ventana2")

            })
            .error(function () {
                Desbloquear("ventana2");
                noexitoCustom("Error al Registrar!")
            })

    }
    var obtener = function () {
        var pCodigo = ObtenerQueryString("pCodigo");
        if (pCodigo == "" || pCodigo == undefined || pCodigo == "undefined" || pCodigo == null ) {
        }
        else {
            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMACCA.ashx?OPCION=4&p_FTVACRE_CODIGO=" + pCodigo,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    console.log(datos);
                    $("#txtCodigo").val(datos[0].CODIGO);
                    $("#cboTipoAcredita").select2("val", datos[0].TIPO_ACREDITA_ID);//val(datos[0].TIPO_ACREDITA_ID);                    
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    $("#txtDetalle").val(datos[0].DETALLE);
                    $("#cboProcedencia").select2("val", datos[0].PROCEDENCIA_ID);// val(datos[0].PROCEDENCIA_ID);
                    //var iCodigo = parseInt($("#txtCodigo").val());
                    //if (iCodigo > 0) {
                    //    $("#sNombrebtn").html("Modificar");
                    //} else {
                    //    $("#sNombrebtn").html("Grabar");
                    //}
                    $("#sNombrebtn").html("Modificar");
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        }
    }
   
    var plugins = function () {
        $("#cboTipoAcredita,#cboProcedencia").select2();
    }
    function cargainicial() {

        obtener();
        $("#btnGrabar").click(function () {
            Guardar();
        });
        
    }
    return {
        init: function () {
            plugins();
            cargainicial();

        }
    };
}();

function Actualiza(pCodigo) {
    //    $("table tbody td").each(function () {
    //        alert($(this).text());

    //    });
    window.location = "?f=NMMACCA&pCodigo=" + pCodigo;
}
function Cancelar() {
    limpiar();
}
function limpiar() {

    $("#cboTipoAcredita").select2("val","0");
    $("#txtDescripcion").val("");
    $("#txtDetalle").val("");
    $("#cboProcedencia").select2("val", "0");
    $("#txtCodigo").val("");
}
function ActualizaEstado(pCodigo) {

    var data = new FormData();
    data.append('OPCION', '7');
    data.append('p_FTVACRE_CODIGO', pCodigo);
    $.ajax({
        url: "vistas/NM/ajax/NMMACCA.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    })

        .success(function (datos) {
            if (datos != null && datos != "") {
                window.location = "?f=NMLACCA";                 
            } else {
                noexitoCustom("Error al Registrar!")
            }

            Desbloquear("ventana2")

        })
        .error(function () {
            Desbloquear("ventana2");
            noexitoCustom("Error al Registrar!")
        })
}