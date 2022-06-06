var oTable;
var pidm_activo = 0;

var DSMZONA = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2(); 
        $('#cboVendedor').select2();
    }

    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0])); },
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    //$('#cboEmpresa').select2('val', '');
                    $("select.empresa").val($("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                },
                complete: function () {
                    Desbloquear($($('#cboEmpresa').parents("div")[0]));
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
        }

    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    //$('#cboEstablecimiento').select2('val', 'TODOS');
                    //selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    //$('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }
        
    var fillCboVendedor = function () {
        var selectEstx = $('#cboVendedor');
        $.ajax({
            type: "post",
            url: "vistas/DS/ajax/DSMZONA.ashx?OPCION=4&p_CTLG_CODE=" + $("#cboEmpresa").val() + "&p_SCSL_CODE=" + $("#cboEstablecimiento").val()
                                                                   + "&p_PIDM_VEND=0&p_TIPO_IND=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEstx.empty();
                selectEstx.append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].PIDM_VENDEDOR == pidm_activo.toString())
                            selectEstx.append('<option value="' + datos[i].PIDM_VENDEDOR + '">' + datos[i].VENDEDOR + '</option>');
                        else {
                            var cadena = (datos[i].DISPONIBLE == 'N') ? 'disabled=true ' : '';
                            selectEstx.append('<option ' + cadena + 'value="' + datos[i].PIDM_VENDEDOR + '">' + datos[i].VENDEDOR + '</option>');
                        }
                    }
                    $('#cboVendedor').select2('val', '');
                } else {
                    selectEstx.empty();
                    selectEstx.append('<option></option>');
                    //$('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var eventoControles = function () {
        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento();
        });

        $("#cboEstablecimiento").on("change", function () {
            pidm_activo = 0;
            fillCboVendedor();
        });
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");        
        if (cod != null) {            
            var data = new FormData();
            data.append('p_CODE', cod);
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/DS/ajax/DSMZONA.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
           .success(function (datos) {
               Desbloquear("ventana");
               if (datos != null && datos.length > 0) {
                   $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                   $("#grabar").attr("href", "javascript:Modificar();");
                   //F1
                   $("#txtCodigo").val(datos[0].CODIGO)               
                   if (datos[0].ESTADO_IND == 'A') {
                       $('#chkEstado').attr('checked', true);
                       $('#chkEstado').parent().addClass("checked");
                   }
                   else {
                       $('#chkEstado').attr('checked', false);
                       $('#chkEstado').parent().removeClass("checked");
                   }                
                   
                   pidm_activo = datos[0].PIDM_VENDEDOR;

                   $("#cboEmpresa").select2("val", datos[0].CTLG_CODE);
                   $("#cboEmpresa").attr('disabled',true);

                   $("#cboEstablecimiento").select2("val", datos[0].SCSL_CODE);
                   $("#cboEstablecimiento").attr('disabled', true);

                   fillCboVendedor();

                   $("#cboVendedor").select2("val", datos[0].PIDM_VENDEDOR);

                   pidm_activo = 0;
                   
                   $("#txtNombre").val(datos[0].NOMBRE);

                   $("#txtCodigoAux").val(datos[0].CODIGO_AUX);
                   
                   $("#txtDescripcion").val(datos[0].DESCRIPCION);


               } else {
                   infoCustom2("No se pudo cargar registro con código '" + cod + "', puede ser que no exista o esté eliminado"); //noexito();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               infoCustom2("No se pudo cargar registro con código '" + cod + "', puede ser que no exista o esté eliminado"); // noexito();
           });
        } /*else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }*/
    }

    return {
        init: function () {
            pidm_activo = 0;
            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento();
            fillCboVendedor();
            cargaInicial();
            eventoControles();            
        }
    };

}();


//TRANSACCINOES
function Grabar() {

    var continuar = false;
    if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'cboVendedor', 'txtNombre', 'txtDescripcion'])) {
        continuar = true;
    }
    if (continuar) {
         var data = new FormData();

         data.append('p_CODIGO_AUX', $("#txtCodigoAux").val());
         data.append('p_CTLG_CODE', $("#cboEmpresa").val());
         data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
         data.append('p_NOMBRE', $("#txtNombre").val());
         data.append('p_DESC', $("#txtDescripcion").val());
         data.append('p_PIDM_VEND', $("#cboVendedor").val());
         data.append('p_ESTADO_IND', ($("#chkEstado").is(":checked")) ? "A" : "I");
         data.append('p_USUA_ID', $("#ctl00_txtus").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/DS/ajax/DSMZONA.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (!isEmpty(datos)) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();
                   $("#txtCodigo").val(datos[0].CODIGO);
                   //BloquearCampos
                   $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                   $("#grabar").attr("href", "javascript:Modificar();");                   
               } else {
                   infoCustom2(datos[0].RESPUESTA);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }
}

function Modificar() {

    var continuar = false;
    if (vErrors(['cboVendedor', 'txtNombre', 'txtDescripcion'])) {
        continuar = true;
    }
    if (continuar) {
        var data = new FormData();
        data.append('p_CODE', $("#txtCodigo").val());
        data.append('p_CODIGO_AUX', $("#txtCodigoAux").val());
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_NOMBRE', $("#txtNombre").val());
        data.append('p_DESC', $("#txtDescripcion").val());
        data.append('p_PIDM_VEND', $("#cboVendedor").val());
        data.append('p_ESTADO_IND', ($("#chkEstado").is(":checked")) ? "A" : "I");
        data.append('p_USUA_ID', $("#ctl00_txtus").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/DS/ajax/DSMZONA.ashx?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos.length > 0) {
               if (datos[0].RESPUESTA == "OK") {
                   exito(); 
               } else {
                   alertCustom(datos[0].RESPUESTA);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }
}

//--------LISTADO

var DSLZONA = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento,#cboEstado").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }
     
    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    //$('#cboEstablecimiento').select2('val', 'TODOS');
                    //selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    //$('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento();
        });
        
        $("#buscar").on("click", function () {
            Listar();
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa', 'cboEstablecimiento'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
            data.append('p_ESTADO_IND', $('#cboEstado').val());
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/DS/ajax/DSMZONA.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable.fnClearTable();
               if (!isEmpty(datos)) {
                   oTable.fnAddData(datos);
                   oTable.fnAdjustColumnSizing();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    visible:false
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "NOMBRE_VENDEDOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "SCSL_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.ESTADO_IND == "A") {
                            $(td).html("ACTIVO");
                        } else {
                            $(td).html("INACTIVO");
                        }
                    }
                }
            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
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
                        "sButtonText": "Exportar a Excel "
                    }
                ]
            }
           , "paginate": true
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);

        $('#tblDatos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=DSMZONA&codigo=' + code;
            }
        });

        actualizarEstilos();

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboEstablecimiento();
            IniciaTabla();
            Listar();
        }
    };
}();

