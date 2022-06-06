var oTable;

var NVMMOAN = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#cboTipoMotivo").select2({ minimumResultsForSearch: Infinity });
    }

    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
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
                    $('#cboEmpresa').select2('val', '');
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
        
    var eventoControles = function () {
             
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {

            var data = new FormData();
            data.append('p_CODE', cod);
            data.append('p_CTLG_CODE', "");
            data.append('p_TIPO_DCTO', "");
            data.append('p_ESTADO_IND', "");
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/NVMMOAN.ashx?OPCION=3",
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
                   //F2
                   $("#cboEmpresa").select2("val", datos[0].CTLG_CODE);                 
                   //F3
                   $("#txtMotivo").val(datos[0].MOTIVO);
                   //F4
                   $("#txtDescripcion").val(datos[0].DESC_MOTIVO);

                   $("#cboTipoMotivo").select2('val',datos[0].TIPO_DCTO);
               } else {
                   noexito();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var EventosCargaInicial = function () {
      
    }

    return {
        init: function () {

            plugins();
            if (ObtenerQueryString("codigo") != null) {
                EventosCargaInicial();
            } else {

            }
            eventoControles();
            fillCboEmpresa();
            cargaInicial();

        }
    };

}();


//TRANSACCINOES
function Grabar() {

    var continuar = false;
    if (vErrors(['cboEmpresa', 'txtMotivo', 'txtDescripcion'])) {
        continuar = true;
    }
    if (continuar) {
         var data = new FormData();
        //data.append('p_CODE', $("#txtCodigo").val());
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_MOTIVO', $("#txtMotivo").val());
        data.append('p_DESC_MOTIVO', $("#txtDescripcion").val());
        data.append('p_TIPO_DCTO', $("#cboTipoMotivo").val());
        data.append('p_ESTADO_IND', ($("#chkEstado").is(":checked")) ? "A" : "I");
        data.append('USUA_ID', $("#ctl00_txtus").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMMOAN.ashx?OPCION=1",
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
                   $("#txtCodigo").val(datos[0].CODIGO);
                   //BloquearCampos
                   $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                   $("#grabar").attr("href", "javascript:Modificar();");                   
               } else {
                   alertCustom(datos[0].CODIGO);//Mensaje de error de bd
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
    if (vErrors(['cboEmpresa', 'txtMotivo', 'txtDescripcion','txtCodigo'])) {
        continuar = true;
    }
    if (continuar) {
        var data = new FormData();
        data.append('p_CODE', $("#txtCodigo").val());
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_MOTIVO', $("#txtMotivo").val());
        data.append('p_DESC_MOTIVO', $("#txtDescripcion").val());
        data.append('p_TIPO_DCTO', $("#cboTipoMotivo").val());
        data.append('p_ESTADO_IND', ($("#chkEstado").is(":checked")) ? "A" : "I");
        data.append('USUA_ID', $("#ctl00_txtus").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMMOAN.ashx?OPCION=2",
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
                   alertCustom(datos[0].CODIGO);//Mensaje de error de bd
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

var NVLMOAN = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
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
      
    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {          
        });
        
        $("#buscar").on("click", function () {
            Listar();
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_TIPO_DCTO', '');
            data.append('p_CODE', '');
            data.append('p_ESTADO_IND', '');
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/NVMMOAN.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable.fnClearTable();
               if (datos != null && datos.length > 0) {
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
        var jsonTipos = { 'RC': 'RECHAZO DEL CLIENTE', "AP": "ANULACION DE PEDIDO", "OM": "OTROS/OFICINA", "RS": "RECHAZO SUNAT"} ;
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MOTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_MOTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                 {
                     data: "TIPO_DCTO",
                     createdCell: function (td, cellData, rowData, row, col) {       


                         $(td).html( eval("jsonTipos."+cellData))
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
                },
                {
                    data: "USUA_ID",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'text-align:center');
                    }
                }
            ]
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
                window.location.href = '?f=NVMMOAN&codigo=' + code;
            }
        });

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            IniciaTabla();
            Listar();
        }
    };
}();

